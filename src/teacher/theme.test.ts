import { test } from "node:test";
import assert from "node:assert/strict";
import { BAND_STYLE } from "./heat.ts";
import { ANSWER_COLORS, orderSources, sourceColor } from "./theme.ts";

test("sources keep a fixed order and fixed colors", () => {
  assert.deepEqual(orderSources(["app", "zzz", "bot"]), ["bot", "app", "zzz"]);
  assert.equal(sourceColor("bot"), "#2a78d6");
  assert.equal(sourceColor("app"), "#eb6834");
  assert.equal(sourceColor("unknown"), "#898781");
});

test("prototype keys are not treated as known sources", () => {
  assert.equal(sourceColor("constructor"), "#898781");
  assert.equal(sourceColor("toString"), "#898781");
  assert.deepEqual(orderSources([]), []);
});

test("answer colours reuse the heat-map red and a darker heat-map green", () => {
  assert.equal(ANSWER_COLORS.wrong, BAND_STYLE.low.bg); // #d03b3b, 4.8:1 on white
  assert.equal(ANSWER_COLORS.right, "#087a08"); // #0ca30c is 3.3:1 on white, too light for small text
});
