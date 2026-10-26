import { test } from "node:test";
import assert from "node:assert/strict";
import { pageUrl, flashcardsAppId, triviaAppId, isComingSoon } from "./level.ts";
import type { LevelConfig } from "./types.ts";

const a2plus: LevelConfig = { id: "A2+", slug: "a2plus", title: "A2+", topics: [] };
const b1: LevelConfig = {
  id: "B1",
  slug: "b1",
  title: "B1 General",
  topics: [{ id: "food", title: "Food", icon: "x", description: "d", words: [] }],
};

test("page URLs use the slug, never the display name with a plus", () => {
  assert.equal(pageUrl(a2plus, "vocabulary"), "/a2plus-vocabulary/");
  assert.equal(pageUrl(a2plus, "trivia"), "/a2plus-trivia/");
  assert.equal(pageUrl(b1, "flashcards"), "/b1-flashcards/");
});

test("app ids match the values the database accepts", () => {
  assert.equal(flashcardsAppId(a2plus), "a2plus-flashcards");
  assert.equal(triviaAppId(b1), "b1-trivia");
});

test("a level is coming soon until it has a topic", () => {
  assert.equal(isComingSoon(a2plus), true);
  assert.equal(isComingSoon(b1), false);
});
