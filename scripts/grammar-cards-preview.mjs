// Static review page for the grammar rule cards of one level (teacher + owner review before merge).
//
// Run (Node 22 strips the types from the .ts registry; the flag is needed on Node 22.x < 22.18 and is
// harmless on newer versions):
//   node --experimental-strip-types scripts/grammar-cards-preview.mjs B1 D:\tmp\b1-cards.html
// Then open the written file in a browser.
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// Escape & < > " only: apostrophes are safe in text content and stay readable.
function esc(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const GAP = "___";

// Escapes the sentence and replaces its single gap with `fill(escapedAnswer)`.
function withGap(example, answer, fill) {
  const parts = String(example ?? "").split(GAP).map(esc);
  return parts.join(fill(esc(answer)));
}

function renderCard(card, index) {
  const front = withGap(card.example, card.answer, () => `<span class="blank">${GAP}</span>`);
  const back = withGap(card.example, card.answer, (a) => `<strong>${a}</strong>`);
  const examples = (card.examples ?? []).map((e) => `<li>${esc(e)}</li>`).join("");
  const ua = card.ua ? `\n    <p class="ua"><span class="label">UA</span> ${esc(card.ua)}</p>` : "";
  return `  <div class="card">
    <p class="rule"><span class="num">${index + 1}</span> ${esc(card.rule)}</p>
    <p><span class="label">Front</span> ${front}</p>
    <p><span class="label">Back</span> ${back}</p>
    <p class="explanation">${esc(card.explanation)}</p>
    <ul>${examples}</ul>${ua}
  </div>`;
}

function renderTopic(topic) {
  const cards = topic.cards ?? [];
  const head = `${topic.icon ? esc(topic.icon) + " " : ""}${esc(topic.name)}`;
  if (cards.length === 0) {
    return `<h2>${head} <span class="count">no cards yet</span></h2>`;
  }
  const count = `${cards.length} ${cards.length === 1 ? "card" : "cards"}`;
  return `<h2>${head} <span class="count">${count}</span></h2>\n${cards.map(renderCard).join("\n")}`;
}

export function renderLevel(levelId, topics) {
  const mine = topics.filter((t) => t.level === levelId);
  const total = mine.reduce((n, t) => n + (t.cards?.length ?? 0), 0);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(levelId)} grammar cards — review</title>
<style>
  body { font-family: -apple-system, "Segoe UI", Roboto, sans-serif; max-width: 700px;
    margin: 0 auto; padding: 16px; background: #fdf6ec; color: #2b2b2b; line-height: 1.5; }
  h1 { color: #c0392b; font-size: 1.4rem; margin-bottom: 4px; }
  .meta { color: #6b6b6b; font-size: 0.9rem; margin-bottom: 24px; }
  h2 { color: #e67e22; font-size: 1.1rem; border-bottom: 2px solid #e67e22;
    padding-bottom: 4px; margin-top: 32px; }
  .count { color: #6b6b6b; font-size: 0.85rem; font-weight: normal; margin-left: 8px; }
  .card { background: #fff; border-radius: 8px; padding: 12px 16px; margin: 12px 0;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
  .card p { margin: 0 0 8px; }
  .rule { font-weight: bold; }
  .num { display: inline-block; min-width: 1.6em; color: #c0392b; }
  .label { display: inline-block; min-width: 3em; color: #6b6b6b; font-size: 0.8rem;
    text-transform: uppercase; letter-spacing: 0.04em; }
  .blank { color: #c0392b; font-weight: bold; text-decoration: underline; }
  strong { color: #27ae60; }
  .explanation { color: #444; }
  .card ul { margin: 0 0 8px; padding-left: 20px; color: #444; }
  .ua { color: #6b6b6b; }
</style>
</head>
<body>
<h1>${esc(levelId)} grammar cards — review</h1>
<div class="meta">${mine.length} topics, ${total} cards</div>
${mine.map(renderTopic).join("\n")}
</body>
</html>
`;
}

// CLI: node --experimental-strip-types scripts/grammar-cards-preview.mjs <level> <out.html>
const isMain = process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;
if (isMain) {
  const [level, out] = process.argv.slice(2);
  if (!level || !out) {
    console.error("usage: node --experimental-strip-types scripts/grammar-cards-preview.mjs <level> <out.html>");
    process.exit(1);
  }
  const registry = pathToFileURL(fileURLToPath(new URL("../src/grammar/topics/index.ts", import.meta.url))).href;
  const topics = (await import(registry)).default;
  writeFileSync(resolve(out), renderLevel(level, topics), "utf8");
  console.log(`wrote ${resolve(out)}`);
}
