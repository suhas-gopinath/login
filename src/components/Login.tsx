import React, { useState } from "react";
import { submit } from "../utils/submit";
import { validation } from "../utils/validation";
import "./Login.css";

export const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
          onClick={() =>
            submit(username, password, setUsername, setPassword, setIsLoading)
          }
        >
          {isLoading ? <div className="loading-spinner"></div> : "Login"}
        </button>
      </div>
    </div>
  );
};
