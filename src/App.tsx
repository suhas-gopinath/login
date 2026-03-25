import React from "react";
import { createRoot } from "react-dom/client";
import { Login } from "./components/Login";
import "./index.css";

const App = () => (
  <div className="container">
    <div>Login Child App Standalone</div>
    <Login />
  </div>
);

const rootElement = document.getElementById("app");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
