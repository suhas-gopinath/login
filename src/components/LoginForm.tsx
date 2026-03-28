import React, { useState } from "react";
import { useApi } from "container/useApi";
import { validation } from "../utils/validation";
import { useMessage } from "container/useMessage";
import "./Login.css";

export default function LoginForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { showMessage } = useMessage();

  const handleSuccess = (message: string) => {
    window.location.href = "http://localhost:3003/verify";
  };

  const handleError = (message: string) => {
    showMessage("error", message);
  };

  const { callApi, isLoading } = useApi("/login", handleSuccess, handleError, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="register-title">Create Account</h2>
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            id="username"
            type="text"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        <button
          className="login-button"
          disabled={!validation(username, password) || isLoading}
          onClick={callApi}
        >
          {isLoading ? <div className="loading-spinner"></div> : "Login"}
        </button>
      </div>
    </div>
  );
}
