export const submit = async (
  username: string,
  password: string,
  setUsername: (value: string) => void,
  setPassword: (value: string) => void
) => {
  try {
    const response = await fetch("http://localhost:8080/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
    } else {
      const token = data.message;
      sessionStorage.setItem("jwt", token);
      alert("Login successful! JWT Token set and it expires in 30 minutes.");
      setUsername("");
      setPassword("");
    }
  } catch {
    alert("Something went wrong. Please try again later.");
  }
};
