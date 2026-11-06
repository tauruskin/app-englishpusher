import { test } from "node:test";
import assert from "node:assert/strict";
import {
  attemptsText, attentionText, daysAgo, delta, friendlyError, levelLabel, moodleRange, pct, periodLabel, personName, scoreText, shorten, sourceLabel, wrongAnswersText,
} from "./format.ts";

test("moodleRange shows first try and latest", () => {
  assert.equal(moodleRange(60, 80), "60% → 80%");
  assert.equal(moodleRange(null, 90), "– → 90%");
  assert.equal(moodleRange(undefined, null), "– → –");
});
test("attemptsText keeps one decimal for averages", () => {
  assert.equal(attemptsText(2), "2");
  assert.equal(attemptsText(1.8), "1.8");
  assert.equal(attemptsText(null), "–");
});
test("scoreText shows raw / max", () => {
  assert.equal(scoreText(8, 10), "8 / 10");
  assert.equal(scoreText(8.06, 10), "8.1 / 10");
  assert.equal(scoreText(5, null), "5");
});
test("attentionText for a hard Moodle lesson", () => {
  const base = { type: "hard_lesson" as const, person_id: null, display_name: null, topic_key: null, hvp_id: 460 };
  assert.equal(attentionText({ ...base, title: "Lesson 1. Activation", value: 48, value2: 5 }),
    "Lesson 1. Activation (Moodle): first try 48% from 5 students");
  assert.equal(attentionText({ ...base, title: null, value: null, value2: null }), "A Moodle lesson is hard for the group");
});

test("wrongAnswersText joins answers with counts, most frequent first as given", () => {
  assert.equal(wrongAnswersText([{ answer: "flied", count: 2 }, { answer: "flown", count: 1 }]), "flied (2), flown (1)");
});
test("wrongAnswersText is null for an empty or missing list", () => {
  assert.equal(wrongAnswersText([]), null);
  assert.equal(wrongAnswersText(undefined), null);
});
test("wrongAnswersText skips blank answers", () => {
  assert.equal(wrongAnswersText([{ answer: "  ", count: 3 }, { answer: "go", count: 1 }]), "go (1)");
});

test("pct shows a dash for no data", () => {
  assert.equal(pct(76), "76%");
  assert.equal(pct(0), "0%");
  assert.equal(pct(null), "–");
});

test("delta is signed, in points, with a direction", () => {
  assert.deepEqual(delta(75, 80), { text: "−5 pts", direction: "down" });
  assert.deepEqual(delta(80, 75), { text: "+5 pts", direction: "up" });
  assert.deepEqual(delta(70, 70), { text: "±0", direction: "flat" });
  assert.equal(delta(70, null), null);
  assert.equal(delta(null, 70), null);
});

test("labels for levels, sources, periods and names", () => {
  assert.equal(levelLabel("b1plus"), "B1+");
  assert.equal(levelLabel("c1"), "C1");
  assert.equal(sourceLabel("bot"), "Quiz Bot");
  assert.equal(sourceLabel("app"), "App");
  assert.equal(sourceLabel("other"), "Other");
  assert.equal(sourceLabel("answers"), "Answers");
  assert.equal(periodLabel(30), "last 30 days");
  assert.equal(periodLabel(null), "all time");
  assert.equal(personName("  "), "Unnamed student");
  assert.equal(personName("Olena"), "Olena");
});

test("daysAgo counts whole days", () => {
  const now = Date.parse("2026-11-04T12:00:00Z");
  assert.equal(daysAgo("2026-11-04T08:00:00Z", now), "today");
  assert.equal(daysAgo("2026-11-03T10:00:00Z", now), "yesterday");
  assert.equal(daysAgo("2026-10-25T12:00:00Z", now), "10 days ago");
  assert.equal(daysAgo(null, now), "never");
});

test("needs-attention sentences", () => {
  const base = { person_id: "p", display_name: "Nelpy", topic_key: null, title: null, value: null, value2: null };
  assert.equal(attentionText({ ...base, type: "inactive", value: 10 }), "Nelpy hasn't practised for 10 days");
  assert.equal(attentionText({ ...base, type: "dropping", value: 74, value2: 89 }), "Nelpy's accuracy fell from 89% to 74% in the last 14 days");
  assert.equal(
    attentionText({ ...base, type: "hard_topic", person_id: null, display_name: null, topic_key: "b1:grammar:irregular-verbs", title: "Irregular Verbs", value: 56, value2: 4 }),
    "Irregular Verbs is hard for the group: 56% from 4 students",
  );
});

test("RPC errors become friendly messages", () => {
  assert.equal(friendlyError({ code: "42501" }), "You don't have access to this page.");
  assert.equal(friendlyError({ code: "22023" }), "That student or topic doesn't exist.");
  assert.equal(friendlyError({ code: "22P02" }), "That student or topic doesn't exist.");
  assert.equal(friendlyError({ message: "fetch failed" }), "Couldn't load the data. Check your connection and try again.");
});

test("pct and delta round to whole numbers and reject NaN", () => {
  assert.equal(pct(75.6), "76%");
  assert.equal(pct(Number.NaN), "–");
  assert.deepEqual(delta(75.4, 80.2), { text: "−5 pts", direction: "down" });
  assert.deepEqual(delta(70.2, 70.4), { text: "±0", direction: "flat" });
  assert.equal(delta(Number.NaN, 70), null);
});

test("label lookups ignore prototype keys", () => {
  assert.equal(sourceLabel("constructor"), "Constructor");
  assert.equal(sourceLabel("toString"), "ToString");
  assert.equal(sourceLabel("__proto__"), "__proto__");
});

test("daysAgo counts Kyiv calendar days and survives bad input", () => {
  // 1 hour apart but across Kyiv midnight (winter time, UTC+2)
  assert.equal(daysAgo("2026-11-03T21:30:00Z", Date.parse("2026-11-03T22:30:00Z")), "yesterday");
  // 22:30Z is already the next Kyiv day in winter, so 20:30Z..21:59Z is still "today"
  assert.equal(daysAgo("2026-11-03T22:10:00Z", Date.parse("2026-11-04T08:00:00Z")), "today");
  assert.equal(daysAgo("not a date", Date.parse("2026-11-04T08:00:00Z")), "unknown");
  assert.equal(daysAgo("2026-11-05T08:00:00Z", Date.parse("2026-11-04T08:00:00Z")), "today");
  assert.equal(daysAgo("2026-11-04T08:00:00Z", Number.NaN), "unknown");
});

test("attentionText never prints null or NaN", () => {
  const base = { person_id: "p", display_name: "Nelpy", topic_key: null, title: null, value: null, value2: null };
  const texts = [
    attentionText({ ...base, type: "inactive" }),
    attentionText({ ...base, type: "dropping" }),
    attentionText({ ...base, type: "dropping", value: 70 }),
    attentionText({ ...base, type: "hard_topic", display_name: null }),
    attentionText({ ...base, type: "hard_topic", value: Number.NaN, value2: Number.NaN }),
  ];
  for (const t of texts) assert.doesNotMatch(t, /null|NaN|undefined/);
  assert.equal(texts[0], "Nelpy hasn't practised recently");
});

test("friendlyError asks for a new sign-in on expired or missing sessions", () => {
  const msg = "Your session has expired. Please sign in again.";
  assert.equal(friendlyError({ code: "PGRST301" }), msg);
  assert.equal(friendlyError({ code: "PGRST303" }), msg);
  assert.equal(friendlyError({ message: "JWT expired" }), msg);
  assert.equal(friendlyError({ message: "invalid JWT" }), msg);
  assert.equal(friendlyError({ status: 401 }), msg);
  // not-staff keeps its own message even when a 4xx status is attached
  assert.equal(friendlyError({ code: "42501", status: 403 }), "You don't have access to this page.");
  assert.equal(friendlyError({ message: "boom", status: 500 }), "Couldn't load the data. Check your connection and try again.");
});

test("shorten keeps short text and collapses whitespace", () => {
  assert.equal(shorten("  went \n home "), "went home");
});

test("shorten cuts long text with an ellipsis, max length included", () => {
  const out = shorten("a".repeat(100), 20);
  assert.equal(out.length, 20);
  assert.ok(out.endsWith("…"));
});

test("shorten default max is 80", () => {
  assert.equal(shorten("b".repeat(80)), "b".repeat(80));
  assert.equal(shorten("b".repeat(81)).length, 80);
});
