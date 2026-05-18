import React, { useState } from "react";
import { ValidationMessage } from "../ValidationMessage";
import { useApi } from "container/useApi";
import {
  hasWhitespace,
  isPasswordLengthValid,
  isPasswordMatch,
  isStrongPassword,
  isUsernameLengthValid,
  isUsernamePatternValid,
} from "../../utils/validation";
import { useMessage } from "container/useMessage";
import "./index.css";

export const RegisterForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const { showMessage } = useMessage();

  const handleSuccess = (data: any) => {
    setDisableButton(true);
    showMessage(
      "success",
      `${data.message}. You will be redirected to login page.`,
    );
    setTimeout(() => {
      window.location.href = "/login";
    }, 5000);
  };

  const handleError = (data: any) => {
    showMessage("error", data.message || "Registration failed. Please try again.");
  };

  const { callApi, isLoading } = useApi(
    "/register",
    handleSuccess,
    handleError,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    },
  );

  const isDisabled =
    isLoading ||
    disableButton ||
    !isUsernameLengthValid(username) ||
    !isUsernamePatternValid(username) ||
    !isPasswordMatch(password, password2) ||
    hasWhitespace(password) ||
    !isStrongPassword(password) ||
    !isPasswordLengthValid(password);

  return (
    <div className="register-container">
      <div className="register-layout">
        <div className="register-form">
          <h2 className="register-title">Create Account</h2>

          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase().trim())}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="retypePassword" className="form-label">
              Retype Password
            </label>
            <input
              type="password"
              id="retypePassword"
              className="form-input"
              placeholder="Confirm your password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>

          <button
            className="register-button"
            disabled={isDisabled}
            onClick={callApi}
          >
            Register
          </button>
        </div>

        <div className="validation-panel">
          <h3 className="validation-title">Requirements</h3>
          <div className="validation-section">
            <ValidationMessage
              username={username}
              password1={password}
              password2={password2}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
