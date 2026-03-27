import { createRoot } from "react-dom/client";
import { Login } from "./components/Login";
import "./index.css";

const App = () => (
  <div className="container">
    <Login />
  </div>
);

const rootElement = document.getElementById("app");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
