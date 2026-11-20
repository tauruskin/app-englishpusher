import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// Vitest runs only the grammar tests (*.vitest.ts / *.vitest.tsx). Everything else in the App is
// tested with `node --test` on *.test.ts, so the two runners never pick up each other's files.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/grammar/test/setup.ts"],
    include: ["src/grammar/**/*.vitest.{ts,tsx}", "src/shared/**/*.vitest.{ts,tsx}", "src/levels/**/*.vitest.{ts,tsx}"],
  },
});
