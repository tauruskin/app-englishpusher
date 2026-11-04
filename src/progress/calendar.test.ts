import { test } from "node:test";
import assert from "node:assert/strict";
import { intensity, monthGrid, monthLabel, monthStats, recentMonths } from "./calendar.ts";

const cal = [
  { day: "2026-11-04", events: 6, by_source: { bot: 6 } },
  { day: "2026-11-01", events: 1, by_source: { app: 1 } },
  { day: "2026-10-31", events: 12, by_source: { bot: 12 } },
];

test("recentMonths: newest first, across a year boundary", () => {
  assert.deepEqual(recentMonths("2026-11-04", 3), ["2026-11", "2026-10", "2026-09"]);
  assert.deepEqual(recentMonths("2026-01-15", 3), ["2026-01", "2025-12", "2025-11"]);
});

test("monthLabel", () => {
  assert.equal(monthLabel("2026-11"), "November 2026");
});

test("monthGrid: Monday-first weeks, padded with nulls", () => {
  // 1 November 2026 is a Sunday; November has 30 days → 6 weeks.
  const weeks = monthGrid("2026-11", cal, "2026-11-04");
  assert.equal(weeks.length, 6);
  assert.ok(weeks.every((w) => w.length === 7));
  assert.equal(weeks[0][5], null);
  assert.equal(weeks[0][6]?.day, "2026-11-01");
  assert.equal(weeks[0][6]?.events, 1);
  const nov4 = weeks.flat().find((c) => c?.day === "2026-11-04");
  assert.equal(nov4?.events, 6);
  assert.equal(nov4?.future, false);
  assert.equal(weeks.flat().find((c) => c?.day === "2026-11-05")?.future, true);
  assert.equal(weeks[5][0]?.day, "2026-11-30");
  assert.equal(weeks[5][1], null);
});

test("intensity buckets", () => {
  assert.deepEqual([0, 1, 4, 5, 9, 10, 19, 20, 99].map(intensity), [0, 1, 1, 2, 2, 3, 3, 4, 4]);
});

test("monthStats counts only that month", () => {
  assert.deepEqual(monthStats("2026-11", cal), { activeDays: 2, events: 7 });
  assert.deepEqual(monthStats("2026-09", cal), { activeDays: 0, events: 0 });
});
