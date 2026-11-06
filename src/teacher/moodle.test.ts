import { test } from "node:test";
import assert from "node:assert/strict";
import { matrixColumns } from "./moodle.ts";
import type { MatrixTopic, MoodleMatrix } from "./types.ts";

const t = (key: string, accuracy: number): MatrixTopic =>
  ({ topic_key: key, title: key.split(":")[2], kind: key.split(":")[1], level: key.split(":")[0], answers: 10, accuracy });
const m = (key: string, first: number | null): MoodleMatrix["topics"][number] =>
  ({ topic_key: key, title: key.split(":")[2], kind: key.split(":")[1], level: key.split(":")[0], first_try: first, latest: 90, attempts: 1.5, students: 2 });

test("no Moodle: the Bot/App topics in their order", () => {
  const cols = matrixColumns([t("b1:grammar:a", 50), t("b1:vocab:b", 70)], null);
  assert.deepEqual(cols.map((c) => c.topic_key), ["b1:grammar:a", "b1:vocab:b"]);
  assert.ok(cols.every((c) => c.moodle === null && c.answers !== null));
});

test("Moodle data joins its topic; Moodle-only topics come last, lowest first try first", () => {
  const cols = matrixColumns([t("b1:grammar:a", 50)], {
    topics: [m("b1:vocab:z", 80), m("b1:grammar:a", 40), m("b1:vocab:y", null), m("b1:vocab:x", 30)],
    cells: [],
  });
  assert.deepEqual(cols.map((c) => c.topic_key), ["b1:grammar:a", "b1:vocab:x", "b1:vocab:z", "b1:vocab:y"]);
  assert.equal(cols[0].moodle?.first_try, 40);
  assert.equal(cols[0].answers, 10);
  assert.equal(cols[1].answers, null);
  assert.equal(cols[1].accuracy, null);
});
