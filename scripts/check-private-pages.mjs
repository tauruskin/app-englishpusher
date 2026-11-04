// Build-time privacy assertion: private pages must not load Google Tag Manager / Clarity.
// Runs after `vite build` (see the "build" script in package.json).
// Keep PRIVATE_PAGES in sync with PRIVATE_APPS in vite.config.ts.
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const PRIVATE_PAGES = ["teacher", "progress"];
const MARKER = "googletagmanager";
const dist = resolve(import.meta.dirname, "..", "dist");

const read = (file) => (existsSync(file) ? readFileSync(file, "utf8") : null);
const problems = [];

// Sanity check: a public page must contain the marker, otherwise this check detects nothing.
const home = read(resolve(dist, "index.html"));
if (home === null) problems.push("dist/index.html is missing (did vite build run?)");
else if (!home.includes(MARKER)) problems.push(`dist/index.html does not contain "${MARKER}": the privacy check cannot detect anything`);

for (const app of PRIVATE_PAGES) {
  const html = read(resolve(dist, app, "index.html"));
  if (html === null) problems.push(`dist/${app}/index.html is missing`);
  else if (html.includes(MARKER)) problems.push(`dist/${app}/index.html loads Google Tag Manager, but it is a private page`);
}

if (problems.length > 0) {
  console.error("Private page check FAILED:");
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log(`Private page check OK: ${PRIVATE_PAGES.join(", ")} have no ${MARKER}; the public home page does.`);
