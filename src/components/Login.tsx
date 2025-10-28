import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:90/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.status == 401) {
        alert("Invalid username or password");
      }
      if (response.status == 200) {
        alert(
          "Login successful and jwt token will be set with expiration of 30 minutes"
        );
        const token = await response.text();
        sessionStorage.setItem("jwt", token);
        setPassword("");
        setUsername("");
      }
    } catch (err) {
      alert("Something went wrong");
    }
  };
  return (
    <>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        color="primary"
        variant="contained"
        fullWidth
        onClick={() => handleLogin()}
      >
        Login
      </Button>
    </>
  );
};
