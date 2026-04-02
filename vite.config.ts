import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || "/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        wordConnections: resolve(__dirname, "word-connections/index.html"),
      },
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
});
