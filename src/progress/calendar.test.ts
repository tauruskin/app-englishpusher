import { test } from "node:test";
import assert from "node:assert/strict";
import { intensity, monthGrid, monthLabel, monthStats, recentMonths, windowStart } from "./calendar.ts";
import type { CalendarDay } from "./types.ts";

const cal: CalendarDay[] = [
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
  const weeks = monthGrid("2026-11", cal, "2026-11-04", windowStart("2026-11-04"));
  assert.equal(weeks.length, 6);
  assert.ok(weeks.every((w) => w.length === 7));
  assert.equal(weeks[0][5], null);
  assert.equal(weeks[0][6]?.day, "2026-11-01");
  assert.equal(weeks[0][6]?.events, 1);
  const nov4 = weeks.flat().find((c) => c?.day === "2026-11-04");
  assert.equal(nov4?.events, 6);
  assert.equal(nov4?.future, false);
  assert.equal(nov4?.outside, false);
  assert.equal(weeks.flat().find((c) => c?.day === "2026-11-05")?.future, true);
  assert.equal(weeks[5][0]?.day, "2026-11-30");
  assert.equal(weeks[5][1], null);
});

test("windowStart: the first day of a 90-day window ending today", () => {
  assert.equal(windowStart("2026-11-04"), "2026-08-07");
  assert.equal(windowStart("2026-12-31"), "2026-10-03");
  assert.equal(windowStart("2026-11-04", 1), "2026-11-04");
});

test("monthGrid: days before the data window and after today are outside", () => {
  const today = "2026-12-31";
  const weeks = monthGrid("2026-10", [], today, windowStart(today));
  const byDay = new Map(weeks.flat().filter((c) => c !== null).map((c) => [c.day, c]));
  assert.equal(byDay.get("2026-10-01")?.outside, true);
  assert.equal(byDay.get("2026-10-02")?.outside, true);
  assert.equal(byDay.get("2026-10-03")?.outside, false);
  assert.equal(byDay.get("2026-10-31")?.outside, false);
  const dec = monthGrid("2026-12", [], today, windowStart(today)).flat().filter((c) => c !== null);
  assert.ok(dec.every((c) => !c.outside));
  const nov = monthGrid("2026-11", [], "2026-11-04", windowStart("2026-11-04")).flat().filter((c) => c !== null);
  assert.equal(nov.find((c) => c.day === "2026-11-05")?.outside, true);
  assert.equal(nov.find((c) => c.day === "2026-11-04")?.outside, false);
});

test("monthGrid: leap-year February starts on a Tuesday and needs 5 weeks", () => {
  const weeks = monthGrid("2028-02", [], "2028-03-01", "2027-12-04");
  assert.equal(weeks.length, 5);
  assert.deepEqual(weeks[0].map((c) => c?.date ?? null), [null, 1, 2, 3, 4, 5, 6]);
  assert.equal(weeks.flat().filter((c) => c !== null).length, 29);
  assert.equal(weeks[4][1]?.day, "2028-02-29");
  assert.equal(weeks[4][2], null);
});

test("monthGrid: a month starting on Monday has no leading padding", () => {
  const weeks = monthGrid("2027-02", [], "2027-03-01", "2026-12-02");
  assert.equal(weeks.length, 4);
  assert.equal(weeks[0][0]?.day, "2027-02-01");
  assert.equal(weeks[3][6]?.day, "2027-02-28");
});

test("intensity buckets", () => {
  assert.deepEqual([0, 1, 4, 5, 9, 10, 19, 20, 99].map(intensity), [0, 1, 1, 2, 2, 3, 3, 4, 4]);
});

test("monthStats counts only that month", () => {
  assert.deepEqual(monthStats("2026-11", cal), { activeDays: 2, events: 7 });
  assert.deepEqual(monthStats("2026-09", cal), { activeDays: 0, events: 0 });
});
