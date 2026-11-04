import { test } from "node:test";
import assert from "node:assert/strict";
import type { StudentTopic } from "../teacher/types.ts";
import type { Progress, TopicProgress } from "./types.ts";
import { firstName, greeting, groupTopics, hasActivity, kyivHour, sourceShares, topicExists } from "./shape.ts";

const topic = (topic_key: string, kind: string, level: string, title: string): StudentTopic => ({
  topic_key, kind, level, title, answers: 5, accuracy: 70, mastery: "learning", last_at: null,
});

const empty: Progress = {
  person: { id: "p", display_name: "Anna", role: "student" },
  summary: { accuracy: null, accuracy_prev: null, answers: 0, streak: 0, words_learned: 0, active_days_month: 0, last_active: null },
  weak_topics: [], topics: [], trend: [], calendar: [], sources: {},
};

test("firstName takes the first word, with a friendly fallback", () => {
  assert.equal(firstName("  Anna Petrenko "), "Anna");
  assert.equal(firstName(null), "there");
  assert.equal(firstName("   "), "there");
});

test("greeting follows the hour", () => {
  assert.equal(greeting(8), "Good morning");
  assert.equal(greeting(12), "Good afternoon");
  assert.equal(greeting(17), "Good afternoon");
  assert.equal(greeting(18), "Good evening");
  assert.equal(greeting(3), "Good evening");
});

test("kyivHour uses Europe/Kyiv, including summer time", () => {
  assert.equal(kyivHour(new Date("2026-11-04T06:30:00Z")), 8);  // UTC+2
  assert.equal(kyivHour(new Date("2026-07-01T16:30:00Z")), 19); // UTC+3
});

test("groupTopics: grammar first, then vocabulary; levels in course order, then title", () => {
  const groups = groupTopics([
    topic("b1:vocab:z", "vocab", "b1", "Zoo"),
    topic("b1plus:grammar:a", "grammar", "b1plus", "Articles"),
    topic("a2:grammar:p", "grammar", "a2", "Present Simple"),
    topic("b1:vocab:a", "vocab", "b1", "Animals"),
  ]);
  assert.deepEqual(groups.map((g) => g.label), ["Grammar", "Vocabulary"]);
  assert.deepEqual(groups[0].topics.map((t) => t.title), ["Present Simple", "Articles"]);
  assert.deepEqual(groups[1].topics.map((t) => t.title), ["Animals", "Zoo"]);
});

test("groupTopics: empty list gives no groups", () => {
  assert.deepEqual(groupTopics([]), []);
});

test("sourceShares: known order, whole percentages, zero sources hidden", () => {
  assert.deepEqual(sourceShares({ app: 1, bot: 3 }), [
    { source: "bot", count: 3, share: 75 },
    { source: "app", count: 1, share: 25 },
  ]);
  assert.deepEqual(sourceShares({ bot: 5, app: 0 }), [{ source: "bot", count: 5, share: 100 }]);
  assert.deepEqual(sourceShares({}), []);
});

test("hasActivity is false only when there is nothing at all", () => {
  assert.equal(hasActivity(empty), false);
  assert.equal(hasActivity({ ...empty, topics: [topic("b1:vocab:a", "vocab", "b1", "A")] }), true);
  assert.equal(hasActivity({ ...empty, calendar: [{ day: "2026-11-04", events: 2, by_source: { app: 2 } }] }), true);
});

test("topicExists: unknown keys come back with an empty title and no data", () => {
  const unknown: TopicProgress = { topic_key: "x", title: "", trend: [{ week: "2026-11-02", answers: 0, accuracy: null }], recent_mistakes: [] };
  assert.equal(topicExists(unknown), false);
  assert.equal(topicExists({ ...unknown, title: "Modifiers" }), true);
});
