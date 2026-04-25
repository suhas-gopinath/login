import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegisterForm } from ".";

import * as validation from "../utils/validation";

jest.mock("../utils/validation");

// Mock Module Federation remote module
jest.mock("container/useApi", () => ({
  useApi: jest.fn(),
}));

// Mock useMessage hook
jest.mock("container/useMessage", () => ({
  useMessage: jest.fn(),
}));

// Import the mocked modules
import { useApi } from "container/useApi";
import { useMessage } from "container/useMessage";

const mockUseApi = useApi as jest.Mock;
const mockUseMessage = useMessage as jest.Mock;

jest.mock("./ValidationMessage", () => ({
  ValidationMessage: () => <div data-testid="validation-message" />,
}));

describe("Register Component", () => {
  const mockCallApi = jest.fn();
  const mockShowMessage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Default mock implementation for useApi
    mockUseApi.mockReturnValue({
      callApi: mockCallApi,
      isLoading: false,
    });
    // Default mock implementation for useMessage
    mockUseMessage.mockReturnValue({
      showMessage: mockShowMessage,
    });
  });

  const mockAllValidations = (value: boolean) => {
    (validation.isUsernameLengthValid as jest.Mock).mockReturnValue(value);
    (validation.isUsernamePatternValid as jest.Mock).mockReturnValue(value);
    (validation.isPasswordMatch as jest.Mock).mockReturnValue(value);
    (validation.hasWhitespace as jest.Mock).mockReturnValue(!value);
    (validation.isStrongPassword as jest.Mock).mockReturnValue(value);
    (validation.isPasswordLengthValid as jest.Mock).mockReturnValue(value);
  };

  test("renders inputs and button", () => {
    render(<RegisterForm />);

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/retype password/i)).toBeInTheDocument();
    expect(screen.getByTestId("validation-message")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i }),
    ).toBeInTheDocument();
  });

  test("username is lowercased and trimmed", async () => {
    render(<RegisterForm />);

    const usernameInput = screen.getByLabelText(/username/i);

    await userEvent.type(usernameInput, "  TESTUser  ");

    expect(usernameInput).toHaveValue("testuser");
  });

  test("password fields update correctly", async () => {
    render(<RegisterForm />);

    const passwordInput = screen.getByLabelText(/^password$/i);
    const retypeInput = screen.getByLabelText(/retype password/i);

    await userEvent.type(passwordInput, "Password123!");
    await userEvent.type(retypeInput, "Password123!");

    expect(passwordInput).toHaveValue("Password123!");
    expect(retypeInput).toHaveValue("Password123!");
  });

  test("button is disabled when validations fail", () => {
    mockAllValidations(false);

    render(<RegisterForm />);
    const button = screen.getByRole("button", { name: /register/i });

    expect(button).toBeDisabled();
  });

  test("button is enabled when validations pass", () => {
    mockAllValidations(true);

    render(<RegisterForm />);
    const button = screen.getByRole("button", { name: /register/i });

    expect(button).toBeEnabled();
  });

  test("calls callApi when register button is clicked", async () => {
    mockAllValidations(true);

    render(<RegisterForm />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const button = screen.getByRole("button", { name: /register/i });

    await userEvent.type(usernameInput, "TestUser");
    await userEvent.type(passwordInput, "Password123!");
    await userEvent.click(button);

    expect(mockCallApi).toHaveBeenCalled();
  });

  test("calls showMessage with success message on successful registration", async () => {
    mockAllValidations(true);

    // Mock useApi to trigger success callback
    const mockCallApiWithSuccess = jest.fn(async () => {
      // Simulate successful API call by calling the onSuccess callback
      const onSuccess = mockUseApi.mock.calls[0][1];
      onSuccess("User registered successfully");
    });

    mockUseApi.mockReturnValue({
      callApi: mockCallApiWithSuccess,
      isLoading: false,
    });

    render(<RegisterForm />);

    await userEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(mockShowMessage).toHaveBeenCalledWith(
      "success",
      "User registered successfully. You will be redirected to login page.",
    );
  });

  test("calls showMessage with error message on failed registration", async () => {
    mockAllValidations(true);

    // Mock useApi to trigger error callback
    const mockCallApiWithError = jest.fn(async () => {
      // Simulate failed API call by calling the onError callback
      const onError = mockUseApi.mock.calls[0][2];
      onError("Username already exists");
    });

    mockUseApi.mockReturnValue({
      callApi: mockCallApiWithError,
      isLoading: false,
    });

    render(<RegisterForm />);

    await userEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(mockShowMessage).toHaveBeenCalledWith(
      "error",
      "Username already exists",
    );
  });
});
