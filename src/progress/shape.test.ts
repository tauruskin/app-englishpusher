import { test } from "node:test";
import assert from "node:assert/strict";
import type { StudentTopic } from "../teacher/types.ts";
import type { Progress, TopicProgress } from "./types.ts";
import { firstName, greeting, greetingLine, groupTopics, hiLine, hasActivity, kyivHour, PRACTICE_URL, sourceShares, topicExists } from "./shape.ts";

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

test("greetingLine and hiLine drop the name when there is none", () => {
  assert.equal(greetingLine(19, "Anna Petrenko"), "Good evening, Anna!");
  assert.equal(greetingLine(8, "Anna"), "Good morning, Anna!");
  assert.equal(greetingLine(19, null), "Good evening!");
  assert.equal(greetingLine(13, "   "), "Good afternoon!");
  assert.equal(greetingLine(13, undefined), "Good afternoon!");
  assert.equal(hiLine("Anna Petrenko"), "Hi, Anna!");
  assert.equal(hiLine(null), "Hi!");
  assert.equal(hiLine("  "), "Hi!");
});

test("kyivHour uses Europe/Kyiv, including summer time", () => {
  assert.equal(kyivHour(new Date("2026-11-04T06:30:00Z")), 8);  // UTC+2
  assert.equal(kyivHour(new Date("2026-07-01T16:30:00Z")), 19); // UTC+3
  assert.equal(kyivHour(new Date("2026-11-04T22:30:00Z")), 0);  // midnight hour is 0, never 24
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

test("groupTopics: titles sort by number, so Lesson 2 comes before Lesson 10", () => {
  const groups = groupTopics([
    topic("b1:vocab:10", "vocab", "b1", "Lesson 10: Y"),
    topic("b1:vocab:2", "vocab", "b1", "Lesson 2: X"),
  ]);
  assert.deepEqual(groups[0].topics.map((t) => t.title), ["Lesson 2: X", "Lesson 10: Y"]);
});

test("sourceShares: known order, whole percentages, zero sources hidden", () => {
  assert.deepEqual(sourceShares({ app: 1, bot: 3 }), [
    { source: "bot", count: 3, share: 75, tiny: false },
    { source: "app", count: 1, share: 25, tiny: false },
  ]);
  assert.deepEqual(sourceShares({ bot: 5, app: 0 }), [{ source: "bot", count: 5, share: 100, tiny: false }]);
  assert.deepEqual(sourceShares({}), []);
});

test("sourceShares: shares always add up to 100 (largest remainder)", () => {
  const sum = (s: Record<string, number>) => sourceShares(s).reduce((n, r) => n + r.share, 0);
  assert.deepEqual(sourceShares({ bot: 1, app: 7 }).map((r) => r.share), [12, 88]);
  assert.equal(sum({ bot: 1, app: 7 }), 100);
  assert.deepEqual(sourceShares({ bot: 1, app: 1, zeta: 1 }).map((r) => r.share), [34, 33, 33]);
  assert.equal(sum({ bot: 1, app: 1, zeta: 1 }), 100);
  assert.equal(sum({ bot: 5, app: 11, zeta: 13, other: 2 }), 100);
});

test("sourceShares: a used source that rounds to 0% is flagged tiny", () => {
  assert.deepEqual(sourceShares({ bot: 1000, app: 1 }), [
    { source: "bot", count: 1000, share: 100, tiny: false },
    { source: "app", count: 1, share: 0, tiny: true },
  ]);
});

test("hasActivity is false only when there is nothing at all", () => {
  assert.equal(hasActivity(empty), false);
  assert.equal(hasActivity({ ...empty, topics: [topic("b1:vocab:a", "vocab", "b1", "A")] }), true);
  assert.equal(hasActivity({ ...empty, calendar: [{ day: "2026-11-04", events: 2, by_source: { app: 2 } }] }), true);
  assert.equal(hasActivity({ ...empty, summary: { ...empty.summary, answers: 3 } }), true);
  assert.equal(hasActivity({ ...empty, sources: { bot: 4 } }), true);
  assert.equal(hasActivity({ ...empty, sources: { bot: 0 } }), false);
  assert.equal(hasActivity({ ...empty, moodle: { lessons: 1, first_try: null, latest: 80, topics: [], other_lessons: [] } }), true);
  assert.equal(hasActivity({ ...empty, moodle: null }), false);
});

test("topicExists: unknown keys come back with an empty title and no data", () => {
  const unknown: TopicProgress = { topic_key: "x", title: "", trend: [{ week: "2026-11-02", answers: 0, accuracy: null }], recent_mistakes: [] };
  assert.equal(topicExists(unknown), false);
  assert.equal(topicExists({ ...unknown, title: "Modifiers" }), true);
});

test("Practise opens the bot with the practice start payload", () => {
  assert.equal(PRACTICE_URL, "https://t.me/Englishpusher_quiz_bot?start=practice");
});
