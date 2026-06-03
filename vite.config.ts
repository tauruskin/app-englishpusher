import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { resolve } from "path";
import { copyFileSync, mkdirSync, rmSync, existsSync } from "fs";

const APPS = [
  "b1-trivia",
  "b1-flashcards",
  "c1-business",
  "c1-flashcards",
  "c1-trivia",
  "word-connections",
];

// Dev server middleware: rewrite /<app>/* → /apps/<app>/*
// so local dev URLs match the deployed URLs exactly.
function devRewritePlugin() {
  return {
    name: "dev-rewrite-app-paths",
    configureServer(server: import("vite").ViteDevServer) {
      server.middlewares.use((req, _res, next) => {
        if (req.url) {
          for (const app of APPS) {
            if (req.url === `/${app}` || req.url?.startsWith(`/${app}/`) || req.url?.startsWith(`/${app}?`)) {
              req.url = req.url.replace(`/${app}`, `/apps/${app}`);
              break;
            }
          }
        }
        next();
      });
    },
  };
}

// After build, move dist/apps/<name>/index.html → dist/<name>/index.html
// so deployed URLs stay as /<name>/ even though source lives in apps/
function remapAppPaths() {
  return {
    name: "remap-app-paths",
    closeBundle() {
      for (const app of APPS) {
        const src = resolve(__dirname, `dist/apps/${app}/index.html`);
        const destDir = resolve(__dirname, `dist/${app}`);
        if (existsSync(src)) {
          mkdirSync(destDir, { recursive: true });
          copyFileSync(src, resolve(destDir, "index.html"));
        }
      }
      const appsDir = resolve(__dirname, "dist/apps");
      if (existsSync(appsDir)) rmSync(appsDir, { recursive: true, force: true });
    },
  };
}

export default defineConfig({
  plugins: [react(), ViteImageOptimizer({ png: { quality: 80 } }), devRewritePlugin(), remapAppPaths()],
  base: process.env.VITE_BASE_PATH || "/",
  build: {
    rollupOptions: {
      input: {
        main:            resolve(__dirname, "index.html"),
        wordConnections: resolve(__dirname, "apps/word-connections/index.html"),
        c1Trivia:        resolve(__dirname, "apps/c1-trivia/index.html"),
        c1Business:      resolve(__dirname, "apps/c1-business/index.html"),
        c1Flashcards:    resolve(__dirname, "apps/c1-flashcards/index.html"),
        b1Flashcards:    resolve(__dirname, "apps/b1-flashcards/index.html"),
        b1Trivia:        resolve(__dirname, "apps/b1-trivia/index.html"),
      },
    },
  },
  server: {
    host: true,
    watch: {
      usePolling: true,
    },
  },
});
