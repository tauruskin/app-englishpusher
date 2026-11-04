import { test } from "node:test";
import assert from "node:assert/strict";
import { sortRows } from "./sort.ts";

const rows = [
  { name: "Olena", acc: 70 },
  { name: "anna", acc: null },
  { name: "Bohdan", acc: 90 },
];

test("numbers sort both ways, nulls always last", () => {
  assert.deepEqual(sortRows(rows, (r) => r.acc, "asc").map((r) => r.name), ["Olena", "Bohdan", "anna"]);
  assert.deepEqual(sortRows(rows, (r) => r.acc, "desc").map((r) => r.name), ["Bohdan", "Olena", "anna"]);
});

test("text sorts case-insensitively and does not mutate the input", () => {
  const copy = [...rows];
  assert.deepEqual(sortRows(rows, (r) => r.name, "asc").map((r) => r.name), ["anna", "Bohdan", "Olena"]);
  assert.deepEqual(rows, copy);
});
