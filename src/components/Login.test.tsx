import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { Login } from "./Login";
import { submit } from "../utils/submit";
import { validation } from "../utils/validation";

jest.mock("../utils/submit", () => ({
  submit: jest.fn(),
}));

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

  test("calls submit with correct arguments when login button is clicked", () => {
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

    expect(submit).toHaveBeenCalledTimes(1);
    expect(submit).toHaveBeenCalledWith(
      "john",
      "Password@123",
      expect.any(Function),
      expect.any(Function),
      expect.any(Function),
    );
  });
});
