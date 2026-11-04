import { test } from "node:test";
import assert from "node:assert/strict";
import {
  attentionText, daysAgo, delta, friendlyError, levelLabel, pct, periodLabel, personName, sourceLabel,
} from "./format.ts";

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
  assert.equal(sourceLabel("other"), "other");
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
  assert.equal(friendlyError({ message: "fetch failed" }), "Couldn't load the data. Check your connection and try again.");
});
