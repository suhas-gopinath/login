import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { Login } from "./Login";

import { validation } from "../utils/validation";
import { useApi } from "container/useApi";




const mockCallApi = jest.fn();

jest.mock("container/useApi");

jest.mock("../utils/validation", () => ({
  validation: jest.fn(),
}));

const mockStore = configureStore({
  reducer: {
    auth: (state = {}) => state,
  },
});

describe("Login component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useApi as jest.Mock).mockReturnValue({
      callApi: mockCallApi,
      isLoading: false,
    });
  });

  test("disables login button when validation fails", () => {
    (validation as jest.Mock).mockReturnValue(false);

    render(
      <Provider store={mockStore}>
        <Login />
      </Provider>,
    );

    const button = screen.getByRole("button", { name: /login/i });
    expect(button).toBeDisabled();
  });

  test("enables login button when validation passes", () => {
    (validation as jest.Mock).mockReturnValue(true);

    render(
      <Provider store={mockStore}>
        <Login />
      </Provider>,
    );

    const button = screen.getByRole("button", { name: /login/i });
    expect(button).toBeEnabled();
  });


  test("calls useApi hook with correct arguments and callApi when login button is clicked", () => {
    (validation as jest.Mock).mockReturnValue(true);

    render(
      <Provider store={mockStore}>
        <Login />
      </Provider>,
    );

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
});
