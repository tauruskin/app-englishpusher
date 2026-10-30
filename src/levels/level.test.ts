import { test } from "node:test";
import assert from "node:assert/strict";
import { pageUrl, flashcardsAppId, triviaAppId, isComingSoon } from "./level.ts";
import type { LevelConfig } from "./types.ts";

const a2plus: LevelConfig = { id: "A2+", slug: "a2plus", title: "A2+", topics: [] };
const b1plus: LevelConfig = { id: "B1+", slug: "b1plus", title: "B1+", topics: [] };
const b2plus: LevelConfig = { id: "B2+", slug: "b2plus", title: "B2+", topics: [] };
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
  assert.equal(pageUrl(b1plus, "vocabulary"), "/b1plus-vocabulary/");
  assert.equal(pageUrl(b2plus, "trivia"), "/b2plus-trivia/");
});

test("app ids match the values the database accepts", () => {
  assert.equal(flashcardsAppId(a2plus), "a2plus-flashcards");
  assert.equal(triviaAppId(b1), "b1-trivia");
  assert.equal(triviaAppId(b1plus), "b1plus-trivia");
  assert.equal(flashcardsAppId(b1plus), "b1plus-flashcards");
  assert.equal(triviaAppId(b2plus), "b2plus-trivia");
  assert.equal(flashcardsAppId(b2plus), "b2plus-flashcards");
});

test("a level is coming soon until it has a topic", () => {
  assert.equal(isComingSoon(a2plus), true);
  assert.equal(isComingSoon(b1plus), true);
  assert.equal(isComingSoon(b2plus), true);
  assert.equal(isComingSoon(b1), false);
});
