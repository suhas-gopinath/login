import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { submit } from "../utils/submit";
import { validation } from "../utils/validation";

export const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
        disabled={!validation(username, password)}
        fullWidth
        onClick={() => submit(username, password, setUsername, setPassword)}
      >
        Login
      </Button>
    </>
  );
};
