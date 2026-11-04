import { test } from "node:test";
import assert from "node:assert/strict";
import { orderSources, sourceColor } from "./theme.ts";

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
