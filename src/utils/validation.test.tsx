import {
  hasWhitespace,
  isPasswordLengthValid,
  isPasswordMatch,
  isStrongPassword,
  isUsernameLengthValid,
  isUsernamePatternValid,
  validation,
} from "./validation";

describe("Login validation", () => {
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

describe("Register validation", () => {
  describe("isUsernameLengthValid", () => {
    test("rejects usernames shorter than or equal to 5 characters", () => {
      expect(isUsernameLengthValid("abcde")).toBe(false);
      expect(isUsernameLengthValid("abcd")).toBe(false);
    });

    test("accepts usernames within valid range", () => {
      expect(isUsernameLengthValid("abcdef")).toBe(true);
      expect(isUsernameLengthValid("a".repeat(30))).toBe(true);
    });

    test("rejects usernames longer than or equal to 31 characters", () => {
      expect(isUsernameLengthValid("a".repeat(31))).toBe(false);
      expect(isUsernameLengthValid("a".repeat(40))).toBe(false);
    });
  });

  describe("isUsernamePatternValid", () => {
    test("accepts alphanumeric and allowed special characters", () => {
      expect(isUsernamePatternValid("john_doe")).toBe(true);
      expect(isUsernamePatternValid("john.doe-123")).toBe(true);
    });

    test("rejects spaces and disallowed characters", () => {
      expect(isUsernamePatternValid("john doe")).toBe(false);
      expect(isUsernamePatternValid("john@doe")).toBe(false);
      expect(isUsernamePatternValid("john#doe")).toBe(false);
    });
  });
});

describe("Password validation", () => {
  describe("isPasswordMatch", () => {
    test("returns true when passwords are identical", () => {
      expect(isPasswordMatch("Password123!", "Password123!")).toBe(true);
    });

    test("returns false when passwords differ", () => {
      expect(isPasswordMatch("Password123!", "password123!")).toBe(false);
    });
  });

  describe("hasWhitespace", () => {
    test("detects whitespace characters", () => {
      expect(hasWhitespace("pass word")).toBe(true);
      expect(hasWhitespace("pass\tword")).toBe(true);
      expect(hasWhitespace("pass\nword")).toBe(true);
    });

    test("returns false when no whitespace is present", () => {
      expect(hasWhitespace("Password123!")).toBe(false);
    });
  });

  describe("isStrongPassword", () => {
    test("accepts passwords meeting all strength requirements", () => {
      expect(isStrongPassword("StrongP@ss1")).toBe(true);
      expect(isStrongPassword("A1b@Cdef")).toBe(true);
    });

    test("rejects passwords missing required character classes", () => {
      expect(isStrongPassword("password1@")).toBe(false); //uppercase
      expect(isStrongPassword("PASSWORD1@")).toBe(false); //lowercase
      expect(isStrongPassword("Password@")).toBe(false); //digit
      expect(isStrongPassword("Password1")).toBe(false); //special char
    });

    test("rejects passwords with unsupported characters", () => {
      expect(isStrongPassword("Password1#")).toBe(false); // #
      expect(isStrongPassword("Password1 ")).toBe(false); // whitespace
    });
  });

  describe("isPasswordLengthValid", () => {
    test("rejects passwords shorter than or equal to 7 characters", () => {
      expect(isPasswordLengthValid("1234567")).toBe(false);
    });

    test("accepts passwords within valid length range", () => {
      expect(isPasswordLengthValid("12345678")).toBe(true);
      expect(isPasswordLengthValid("a".repeat(64))).toBe(true);
    });

    test("rejects passwords longer than or equal to 65 characters", () => {
      expect(isPasswordLengthValid("a".repeat(65))).toBe(false);
    });
  });
});
