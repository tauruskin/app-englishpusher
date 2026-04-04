import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../c1-trivia/index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
