import { test } from "node:test";
import assert from "node:assert/strict";
import { addDays, dayLabel, fillDays, layoutColumns, niceStep, roundedTopPath } from "./columns.ts";

test("addDays and dayLabel work on plain ISO dates", () => {
  assert.equal(addDays("2026-10-31", 1), "2026-11-01");
  assert.equal(addDays("2026-03-01", -1), "2026-02-28");
  assert.equal(dayLabel("2026-11-04"), "4 Nov");
});

test("fillDays covers the whole period, empty days included", () => {
  const out = fillDays([{ day: "2026-11-03", by_source: { bot: 2 } }], "2026-11-04", 2);
  assert.deepEqual(out.map((d) => d.key), ["2026-11-02", "2026-11-03", "2026-11-04"]);
  assert.deepEqual(out[1].values, { bot: 2 });
  assert.deepEqual(out[0].values, {});
});

test("fillDays for all time starts at the first day with data", () => {
  const out = fillDays([{ day: "2026-11-02", by_source: { app: 1 } }], "2026-11-04", null);
  assert.deepEqual(out.map((d) => d.key), ["2026-11-02", "2026-11-03", "2026-11-04"]);
  assert.deepEqual(fillDays([], "2026-11-04", null).map((d) => d.key), ["2026-11-04"]);
});

test("niceStep picks 1/2/5 x 10^k steps for about 4 ticks", () => {
  assert.equal(niceStep(0), 1);
  assert.equal(niceStep(3), 1);
  assert.equal(niceStep(7), 2);
  assert.equal(niceStep(100), 50);
});

test("stacked segments: fixed order, 2px gap below the top segment, top one rounded", () => {
  const layout = layoutColumns(
    [{ key: "d1", label: "1 Nov", values: { app: 2, bot: 2 } }],
    ["bot", "app"],
    { width: 136, height: 124, left: 36, bottom: 24, top: 0 },
  );
  // plot height 100, top of scale 4 (step 1)
  const [col] = layout.columns;
  assert.equal(col.total, 4);
  assert.equal(col.width, 24); // capped at 24px
  assert.deepEqual(col.segments.map((s) => s.series), ["bot", "app"]);
  assert.deepEqual(col.segments.map((s) => s.top), [false, true]);
  assert.deepEqual(col.segments[0], { series: "bot", value: 2, y: 52, height: 48, top: false });
  assert.deepEqual(col.segments[1], { series: "app", value: 2, y: 0, height: 50, top: true });
  assert.deepEqual(layout.ticks.map((t) => t.value), [0, 1, 2, 3, 4]);
});

test("zero values draw nothing", () => {
  const layout = layoutColumns(
    [{ key: "d1", label: "1 Nov", values: { bot: 0 } }],
    ["bot", "app"],
    { width: 136, height: 124, left: 36, bottom: 24, top: 0 },
  );
  assert.deepEqual(layout.columns[0].segments, []);
  assert.equal(layout.columns[0].total, 0);
});

test("roundedTopPath rounds only the top corners", () => {
  assert.equal(roundedTopPath(0, 0, 10, 20, 4), "M0,20V4Q0,0 4,0H6Q10,0 10,4V20Z");
  // radius never exceeds half the width or the height
  assert.equal(roundedTopPath(0, 0, 4, 1, 4), "M0,1V1Q0,0 1,0H3Q4,0 4,1V1Z");
});
