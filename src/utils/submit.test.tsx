import { submit } from "./submit";

describe("submit()", () => {
  const mockSetUsername = jest.fn();
  const mockSetPassword = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(globalThis, "alert").mockImplementation(() => {});
    jest.spyOn(Storage.prototype, "setItem");
  });

  test("stores JWT, clears inputs, and alerts on successful login", async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ message: "jwt-token-123" }),
    } as Response);

    await submit("user", "password", mockSetUsername, mockSetPassword);

    expect(Storage.prototype.setItem).toHaveBeenCalledWith(
      "jwt",
      "jwt-token-123",
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

    await submit("user", "wrongpass", mockSetUsername, mockSetPassword);

    expect(globalThis.alert).toHaveBeenCalledWith("Invalid credentials");
    expect(Storage.prototype.setItem).not.toHaveBeenCalled();
    expect(mockSetUsername).not.toHaveBeenCalled();
    expect(mockSetPassword).not.toHaveBeenCalled();
  });

  test("alerts generic error message when fetch throws", async () => {
    globalThis.fetch = jest.fn().mockRejectedValue(new Error("Network error"));

    await submit("user", "password", mockSetUsername, mockSetPassword);

    expect(globalThis.alert).toHaveBeenCalledWith(
      "Something went wrong. Please try again later.",
    );
  });
});
