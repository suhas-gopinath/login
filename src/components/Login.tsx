import React, { useState } from "react";

import { useApi } from "container/useApi";
import { validation } from "../utils/validation";
import "./Login.css";

export const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSuccess = (message: string) => {
    alert("Login successful! JWT Token set and it expires in 30 minutes.");
    setUsername("");
    setPassword("");
    window.location.href = "http://localhost:3003/verify";
  };

  const handleError = (message: string) => {
    alert(message);
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
};
