import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { resolve } from "path";
import { copyFileSync, mkdirSync, rmSync, existsSync } from "fs";

const APPS = [
  "account",
  "a2-flashcards",
  "a2-trivia",
  "a2-vocabulary",
  "a2plus-flashcards",
  "a2plus-trivia",
  "a2plus-vocabulary",
  "b1-trivia",
  "b1-flashcards",
  "b1-vocabulary",
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

// Inject the Google Tag Manager container (GA4 + Clarity live inside it) into
// every HTML entry point. Build-only, so local dev visits are not tracked.
const GTM_ID = "GTM-KJVX8GRG";
function injectGtm() {
  return {
    name: "inject-gtm",
    apply: "build" as const,
    transformIndexHtml() {
      return [
        {
          tag: "script",
          injectTo: "head-prepend" as const,
          children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
        },
        {
          tag: "noscript",
          injectTo: "body-prepend" as const,
          children: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        },
      ];
    },
  };
}

export default defineConfig({
  plugins: [react(), ViteImageOptimizer({ png: { quality: 80 } }), devRewritePlugin(), remapAppPaths(), injectGtm()],
  base: process.env.VITE_BASE_PATH || "/",
  build: {
    rollupOptions: {
      input: {
        main:            resolve(__dirname, "index.html"),
        account:         resolve(__dirname, "apps/account/index.html"),
        wordConnections: resolve(__dirname, "apps/word-connections/index.html"),
        c1Trivia:        resolve(__dirname, "apps/c1-trivia/index.html"),
        c1Business:      resolve(__dirname, "apps/c1-business/index.html"),
        c1Flashcards:    resolve(__dirname, "apps/c1-flashcards/index.html"),
        b1Flashcards:    resolve(__dirname, "apps/b1-flashcards/index.html"),
        a2Flashcards:    resolve(__dirname, "apps/a2-flashcards/index.html"),
        a2Trivia:        resolve(__dirname, "apps/a2-trivia/index.html"),
        a2Vocabulary:    resolve(__dirname, "apps/a2-vocabulary/index.html"),
        a2plusFlashcards: resolve(__dirname, "apps/a2plus-flashcards/index.html"),
        a2plusTrivia:    resolve(__dirname, "apps/a2plus-trivia/index.html"),
        a2plusVocabulary: resolve(__dirname, "apps/a2plus-vocabulary/index.html"),
        b1Trivia:        resolve(__dirname, "apps/b1-trivia/index.html"),
        b1Vocabulary:    resolve(__dirname, "apps/b1-vocabulary/index.html"),
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
