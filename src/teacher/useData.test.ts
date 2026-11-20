import { test } from "node:test";
import assert from "node:assert/strict";
import { visibleData } from "./useData.ts";

test("visibleData keeps data for the same entity (filter or period change)", () => {
  assert.deepEqual(visibleData({ entity: "student:a", data: [1] }, "student:a"), [1]);
});

test("visibleData hides data that belongs to another entity", () => {
  assert.equal(visibleData({ entity: "student:a", data: [1] }, "student:b"), null);
  assert.equal(visibleData(null, "student:b"), null);
});
