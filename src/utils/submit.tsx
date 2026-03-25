import type { AppDispatch } from "container/store";
import { setAccessToken } from "container/store";

export const submit = async (
  username: string,
  password: string,
  setUsername: (value: string) => void,
  setPassword: (value: string) => void,
  dispatch: AppDispatch,
) => {
  try {
    const response = await fetch("http://localhost:90/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    const data = await response.json();

    if (response.ok) {
      const token = data.message;
      dispatch(setAccessToken(token));
      alert("Login successful! JWT Token set and it expires in 30 minutes.");
      setUsername("");
      setPassword("");
    } else {
      alert(data.message);
    }
  } catch {
    alert("Something went wrong. Please try again later.");
  }
};
