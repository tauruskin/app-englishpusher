import { test } from "node:test";
import assert from "node:assert/strict";
import { lineLayout } from "./line.ts";

const SIZE = { width: 240, height: 120, left: 30, right: 10, top: 10, bottom: 20 }; // plot: x 30..230, y 10..100

test("points are spread across the plot; 100% at the top, 0% at the bottom", () => {
  const l = lineLayout([{ key: "a", label: "A", value: 0 }, { key: "b", label: "B", value: 100 }], SIZE);
  assert.deepEqual(l.points.map((p) => [p.x, p.y]), [[30, 100], [230, 10]]);
  assert.deepEqual(l.paths, ["M30.0,100.0 L230.0,10.0"]);
  assert.deepEqual(l.ticks.map((t) => t.value), [0, 50, 100]);
});

test("a week without answers breaks the line instead of dropping to zero", () => {
  const l = lineLayout([
    { key: "a", label: "A", value: 50 },
    { key: "b", label: "B", value: null },
    { key: "c", label: "C", value: 100 },
    { key: "d", label: "D", value: 100 },
  ], SIZE);
  assert.equal(l.points[1].y, null);
  assert.equal(l.paths.length, 1); // the single point A is drawn as a dot only
  assert.ok(l.paths[0].startsWith("M163.3,10.0"));
});

test("one point sits in the middle; values are clamped to 0–100", () => {
  const l = lineLayout([{ key: "a", label: "A", value: 120 }], SIZE);
  assert.equal(l.points[0].x, 130);
  assert.equal(l.points[0].y, 10);
  assert.deepEqual(l.paths, []);
});

test("no points, no paths", () => {
  const l = lineLayout([], SIZE);
  assert.deepEqual(l.points, []);
  assert.deepEqual(l.paths, []);
});
