import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginForm from ".";
import { validation } from "../../utils/validation";
import { useApi } from "container/useApi";
import { useMessage } from "container/useMessage";

const mockCallApi = jest.fn();
const mockShowMessage = jest.fn();

jest.mock("container/useApi");
jest.mock("container/useMessage");

jest.mock("../utils/validation", () => ({
  validation: jest.fn(),
}));

describe("LoginForm component", () => {
  let mockHandleSuccess: (message: string) => void;
  let mockHandleError: (message: string) => void;

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock useMessage hook
    (useMessage as jest.Mock).mockReturnValue({
      showMessage: mockShowMessage,
    });

    // Capture the callbacks passed to useApi
    (useApi as jest.Mock).mockImplementation(
      (path, onSuccess, onError, options) => {
        mockHandleSuccess = onSuccess;
        mockHandleError = onError;
        return {
          callApi: mockCallApi,
          isLoading: false,
        };
      },
    );

    // Mock window.location.href
    delete (window as any).location;
    (window as any).location = { href: "" };
  });

  test("disables login button when validation fails", () => {
    (validation as jest.Mock).mockReturnValue(false);

    render(<LoginForm />);

    const button = screen.getByRole("button", { name: /login/i });
    expect(button).toBeDisabled();
  });

  test("enables login button when validation passes", () => {
    (validation as jest.Mock).mockReturnValue(true);

    render(<LoginForm />);

    const button = screen.getByRole("button", { name: /login/i });
    expect(button).toBeEnabled();
  });

  test("calls useApi hook with correct arguments and callApi when login button is clicked", () => {
    (validation as jest.Mock).mockReturnValue(true);

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "john" },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "Password@123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(mockCallApi).toHaveBeenCalledTimes(1);
    expect(useApi).toHaveBeenCalledWith(
      "/login",
      expect.any(Function),
      expect.any(Function),
      expect.objectContaining({
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );
  });

  test("handleSuccess callback redirects to verify page", () => {
    (validation as jest.Mock).mockReturnValue(true);

    render(<LoginForm />);

    // Call the handleSuccess callback directly wrapped in act
    act(() => {
      mockHandleSuccess("LoginForm successful");
    });

    // Verify window.location.href is set to redirect URL
    expect(window.location.href).toBe("/verify");
  });

  test("handleError callback calls showMessage with error type and message", () => {
    (validation as jest.Mock).mockReturnValue(true);

    render(<LoginForm />);

    const errorMessage = "Invalid credentials";

    // Call the handleError callback directly
    mockHandleError(errorMessage);

    // Verify showMessage was called with "error" type and the error message
    expect(mockShowMessage).toHaveBeenCalledWith("error", errorMessage);
  });

  test("handleError callback calls showMessage with different error messages", () => {
    (validation as jest.Mock).mockReturnValue(true);

    render(<LoginForm />);

    // Test with different error message
    const errorMessage = "Service is down. Please try again later";
    mockHandleError(errorMessage);

    // Verify showMessage was called with "error" type and the error message
    expect(mockShowMessage).toHaveBeenCalledWith("error", errorMessage);
  });
});
