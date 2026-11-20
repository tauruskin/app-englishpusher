import { test } from "node:test";
import assert from "node:assert/strict";
import { band, BAND_STYLE, cellIndex } from "./heat.ts";

test("accuracy bands match the mastery limits 60 / 80", () => {
  assert.equal(band(null), "none");
  assert.equal(band(0), "low");
  assert.equal(band(59), "low");
  assert.equal(band(60), "mid");
  assert.equal(band(79), "mid");
  assert.equal(band(80), "high");
  assert.equal(band(100), "high");
});

test("every band has a fill, a readable text color and a label", () => {
  for (const b of ["none", "low", "mid", "high"] as const) {
    assert.match(BAND_STYLE[b].bg, /^#[0-9a-f]{6}$/);
    assert.match(BAND_STYLE[b].fg, /^#[0-9a-f]{6}$/);
    assert.ok(BAND_STYLE[b].label.length > 0);
  }
  assert.equal(BAND_STYLE.mid.fg, "#0b0b0b"); // near-black on the yellow warning fill
});

test("cellIndex finds a cell by person and topic", () => {
  const idx = cellIndex([{ person_id: "p1", topic_key: "t1", answers: 3, accuracy: 67 }]);
  assert.equal(idx.get("p1|t1")?.accuracy, 67);
  assert.equal(idx.get("p1|t2"), undefined);
});

test("cellIndex of no cells is empty", () => {
  assert.equal(cellIndex([]).size, 0);
});
