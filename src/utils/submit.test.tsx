import { submit } from "./submit";
import * as containerStore from "container/store";

jest.mock("container/store");

const mockSetAccessToken = jest.fn((token: string) => ({
  type: "auth/setAccessToken",
  payload: token,
}));

(containerStore.setAccessToken as jest.Mock) = mockSetAccessToken;

describe("submit()", () => {
  const mockSetUsername = jest.fn();
  const mockSetPassword = jest.fn();
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockSetAccessToken.mockClear();
    jest.spyOn(globalThis, "alert").mockImplementation(() => {});
    jest.spyOn(Storage.prototype, "setItem");
  });

  test("stores JWT, clears inputs, and alerts on successful login", async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ message: "jwt-token-123" }),
    } as Response);

    await submit(
      "user",
      "password",
      mockSetUsername,
      mockSetPassword,
      mockDispatch,
    );

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "auth/setAccessToken",
        payload: "jwt-token-123",
      }),
    );

    expect(globalThis.alert).toHaveBeenCalledWith(
      "Login successful! JWT Token set and it expires in 30 minutes.",
    );

    expect(mockSetUsername).toHaveBeenCalledWith("");
    expect(mockSetPassword).toHaveBeenCalledWith("");
  });

  test("alerts backend error message when response is not ok", async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ message: "Invalid credentials" }),
    } as Response);

    await submit(
      "user",
      "wrongpass",
      mockSetUsername,
      mockSetPassword,
      mockDispatch,
    );

    expect(globalThis.alert).toHaveBeenCalledWith("Invalid credentials");
    expect(mockDispatch).not.toHaveBeenCalled();
    expect(mockSetUsername).not.toHaveBeenCalled();
    expect(mockSetPassword).not.toHaveBeenCalled();
  });

  test("alerts generic error message when fetch throws", async () => {
    globalThis.fetch = jest.fn().mockRejectedValue(new Error("Network error"));

    await submit(
      "user",
      "password",
      mockSetUsername,
      mockSetPassword,
      mockDispatch,
    );

    expect(globalThis.alert).toHaveBeenCalledWith(
      "Something went wrong. Please try again later.",
    );
  });
});
