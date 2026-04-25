import React from "react";
import {
  isUsernameLengthValid,
  isUsernamePatternValid,
  isPasswordLengthValid,
  hasWhitespace,
  isPasswordMatch,
  isStrongPassword,
} from "../../utils/validation";
import "./index.css";

export type Props = {
  username: string;
  password1: string;
  password2: string;
};

export const ValidationMessage = ({
  username,
  password1,
  password2,
}: Props) => {
  return (
    <ul className="validation-list">
      <li
        className={`validation-item ${
          isUsernameLengthValid(username) ? "valid" : "invalid"
        }`}
      >
        Username should have minimum 6 and maximum 30 characters
      </li>
      <li
        className={`validation-item ${
          isUsernamePatternValid(username) ? "valid" : "invalid"
        }`}
      >
        Username can only contain Alphanumeric and ._- characters
      </li>
      <li
        className={`validation-item ${
          isPasswordLengthValid(password1) ? "valid" : "invalid"
        }`}
      >
        Password should have minimum 8 and maximum 64 characters
      </li>
      <li
        className={`validation-item ${
          hasWhitespace(password1) ? "invalid" : "valid"
        }`}
      >
        Password cannot contain whitespace
      </li>
      <li
        className={`validation-item ${
          isStrongPassword(password1) ? "valid" : "invalid"
        }`}
      >
        Password should contain lowercase, uppercase, digit and a special
        character(@$!%*?&)
      </li>
      <li
        className={`validation-item ${
          isPasswordMatch(password1, password2) ? "valid" : "invalid"
        }`}
      >
        Passwords should match
      </li>
    </ul>
  );
};
