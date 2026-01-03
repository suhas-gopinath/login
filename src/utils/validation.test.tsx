import { validation } from "./validation";

describe("validation()", () => {
  test("returns true when username > 5 and password > 7 after trimming", () => {
    expect(validation("username", "password123")).toBe(true);
  });

  test("trims whitespace before validating lengths", () => {
    expect(validation("   username   ", "   password123   ")).toBe(true);
  });

  test("returns false when username is too short even if password is valid", () => {
    expect(validation("usr", "password123")).toBe(false);
  });

  test("returns false when password is too short even if username is valid", () => {
    expect(validation("username", "1234")).toBe(false);
  });
});
