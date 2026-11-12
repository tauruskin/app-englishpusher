import { test } from "node:test";
import assert from "node:assert/strict";
import { GRAMMAR_LEVELS, grammarAppId, grammarFlashcardsAppId, grammarFlashcardsUrl, grammarTopicsUrl, grammarView, grammarUrl, levelBySlug, topicsForLevel, isGrammarComingSoon, liveGrammarLevels } from "./levels.ts";

test("there are six grammar levels with URL-safe slugs", () => {
  assert.deepEqual(GRAMMAR_LEVELS.map((l) => l.id), ["A2", "A2+", "B1", "B1+", "B2+", "C1"]);
  assert.deepEqual(GRAMMAR_LEVELS.map((l) => l.slug), ["a2", "a2plus", "b1", "b1plus", "b2plus", "c1"]);
});

test("grammar URLs and app ids use the slug, never a plus sign", () => {
  const a2plus = levelBySlug("a2plus");
  assert.equal(grammarUrl(a2plus), "/a2plus-grammar/");
  assert.equal(grammarUrl(a2plus, "present-perfect"), "/a2plus-grammar/?topic=present-perfect");
  assert.equal(grammarAppId(levelBySlug("b1")), "b1-grammar");
});

test("an unknown slug is an error, not a silent default", () => {
  assert.throws(() => levelBySlug("b3"));
});

test("a level lists only its own topics and is coming soon without any", () => {
  const topics = [
    { id: "one", level: "B1" as const },
    { id: "two", level: "A2+" as const },
    { id: "three", level: "B1" as const },
  ];
  assert.deepEqual(topicsForLevel(topics, "B1").map((t) => t.id), ["one", "three"]);
  assert.equal(isGrammarComingSoon(topics, "B1"), false);
  assert.equal(isGrammarComingSoon(topics, "C1"), true);
});

test("live grammar levels are the levels with topics, in course order, each once", () => {
  const topics = [
    { level: "B1" as const }, { level: "A2+" as const }, { level: "B1" as const },
  ];
  assert.deepEqual(liveGrammarLevels(topics), ["A2+", "B1"]);
  assert.deepEqual(liveGrammarLevels([]), []);
});

test("the real registry today has B1 grammar", async () => {
  const { default: topics } = await import("./topics/index.ts");
  assert.ok(liveGrammarLevels(topics).includes("B1"));
});

test("grammar flashcards and topic list addresses", () => {
  const a2plus = levelBySlug("a2plus");
  assert.equal(grammarFlashcardsAppId(a2plus), "a2plus-grammar-flashcards");
  assert.equal(grammarFlashcardsUrl(a2plus), "/a2plus-grammar-flashcards/");
  assert.equal(grammarFlashcardsUrl(a2plus, "modifiers"), "/a2plus-grammar-flashcards/?topic=modifiers");
  assert.equal(grammarTopicsUrl(a2plus), "/a2plus-grammar/?view=topics");
});

test("grammarView routes /<level>-grammar/ by its query", () => {
  const ids = ["modifiers", "narrative-tenses"];
  assert.deepEqual(grammarView("", ids), { kind: "level" });
  assert.deepEqual(grammarView("?view=topics", ids), { kind: "topics" });
  assert.deepEqual(grammarView("?topic=modifiers", ids), { kind: "test", topicId: "modifiers" });
  assert.deepEqual(grammarView("?topic=gone", ids), { kind: "topics" });
  assert.deepEqual(grammarView("?topic=modifiers&view=topics", ids), { kind: "test", topicId: "modifiers" });
});
