import { test } from "node:test";
import assert from "node:assert/strict";
import { hubLevelOrder, sortByLevel } from "./order.ts";

test("while A2 and A2+ are coming soon they go after B1 and C1", () => {
  assert.deepEqual(hubLevelOrder({ A2: false, "A2+": false }), ["B1", "C1", "A2", "A2+"]);
});

test("live A-levels move to the front, easiest first", () => {
  assert.deepEqual(hubLevelOrder({ A2: true, "A2+": true }), ["A2", "A2+", "B1", "C1"]);
});

test("only the live A-level moves; the other stays at the end", () => {
  assert.deepEqual(hubLevelOrder({ A2: false, "A2+": true }), ["A2+", "B1", "C1", "A2"]);
});

test("cards of the same level keep their order (B1 Grammar before B1 Vocabulary)", () => {
  const items = [
    { name: "B1 Grammar", level: "B1" as const },
    { name: "B1 Vocabulary", level: "B1" as const },
    { name: "C1 Vocabulary", level: "C1" as const },
    { name: "A2 Vocabulary", level: "A2" as const },
  ];
  const sorted = sortByLevel(items, ["A2", "A2+", "B1", "C1"]).map((i) => i.name);
  assert.deepEqual(sorted, ["A2 Vocabulary", "B1 Grammar", "B1 Vocabulary", "C1 Vocabulary"]);
});
