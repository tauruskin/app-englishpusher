import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "../shared/auth.tsx";
import App from "./App.tsx";
import { startTelegram } from "./telegram.ts";
import "../index.css";

// Inside Telegram: keep initData, load the SDK, clean the hash, all before the router reads it.
// A failure there (e.g. a blocked history API) must not stop the page: render anyway.
void startTelegram().catch(() => {}).then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StrictMode>,
  );
});
