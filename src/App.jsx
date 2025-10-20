import React from "react";
import ReactDOM from "react-dom";
import { Login } from "./components/Login";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

const App = () => (
  <div className="container">
    <div>Login Child App Standalone</div>
    <Login />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
