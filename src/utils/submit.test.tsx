import { submit } from "./submit";

describe("submit()", () => {
  const mockSetUsername = jest.fn();
  const mockSetPassword = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.spyOn(Storage.prototype, "setItem");
  });

  test("stores JWT, clears inputs, and alerts on successful login", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ message: "jwt-token-123" }),
    } as Response);

    await submit("user", "password", mockSetUsername, mockSetPassword);

    expect(Storage.prototype.setItem).toHaveBeenCalledWith(
      "jwt",
      "jwt-token-123"
    );

    expect(window.alert).toHaveBeenCalledWith(
      "Login successful! JWT Token set and it expires in 30 minutes."
    );

    expect(mockSetUsername).toHaveBeenCalledWith("");
    expect(mockSetPassword).toHaveBeenCalledWith("");
  });

  test("alerts backend error message when response is not ok", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ message: "Invalid credentials" }),
    } as Response);

    await submit("user", "wrongpass", mockSetUsername, mockSetPassword);

    expect(window.alert).toHaveBeenCalledWith("Invalid credentials");
    expect(Storage.prototype.setItem).not.toHaveBeenCalled();
    expect(mockSetUsername).not.toHaveBeenCalled();
    expect(mockSetPassword).not.toHaveBeenCalled();
  });

  test("alerts generic error message when fetch throws", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));

    await submit("user", "password", mockSetUsername, mockSetPassword);

    expect(window.alert).toHaveBeenCalledWith(
      "Something went wrong. Please try again later."
    );
  });
});
