import { test } from "node:test";
import assert from "node:assert/strict";
import { GRAMMAR_LEVELS } from "../levels.ts";

// The bot's Quiz Bot import (moodle-task-builder scripts/quiz/import_grammar.mjs) loads this registry with
// plain Node, no bundler. That works only while every topic file uses `import type` and `.ts` extensions.
test("the grammar registry loads under plain Node with valid ids and levels", async () => {
  const topics = (await import("./index.ts")).default;
  assert.ok(Array.isArray(topics) && topics.length >= 12);
  const levels = new Set(GRAMMAR_LEVELS.map((l) => l.id));
  for (const t of topics) {
    assert.match(t.id, /^[a-z0-9-]{1,80}$/);
    assert.ok(levels.has(t.level), `${t.id}: level ${t.level}`);
    assert.ok(t.name.length >= 1 && t.name.length <= 120, `${t.id}: name length`);
    for (const q of t.rules) assert.match(q.id, /^[A-Za-z0-9_-]{1,80}$/);
  }
});
