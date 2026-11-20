import { test } from "node:test";
import assert from "node:assert/strict";
import { grammarSessionResults } from "./grammarResults.ts";

type Row = Parameters<typeof grammarSessionResults>[0][number];
const row = (session_id: string, topic_id: string, correct: boolean, created_at: string, app: Row["app"] = "b1-grammar"): Row =>
  ({ app, topic_id, session_id, correct, created_at });

test("grammarSessionResults: one result per session, newest first", () => {
  const rows: Row[] = [
    row("s1", "modifiers", true, "2026-11-01T10:00:00Z"),
    row("s1", "modifiers", false, "2026-11-01T10:01:00Z"),
    row("s2", "modifiers", true, "2026-11-03T10:00:00Z"),
    row("s2", "modifiers", true, "2026-11-03T10:01:00Z"),
    row("s3", "irregular-verbs", true, "2026-11-02T10:00:00Z"),
    row("s3", "irregular-verbs", false, "2026-11-02T10:01:00Z"),
    row("s3", "irregular-verbs", false, "2026-11-02T10:02:00Z"),
  ];
  assert.deepEqual(grammarSessionResults(rows), [
    { app: "b1-grammar", topicId: "modifiers", scorePct: 100, createdAt: "2026-11-03T10:01:00Z" },
    { app: "b1-grammar", topicId: "irregular-verbs", scorePct: 33, createdAt: "2026-11-02T10:02:00Z" },
    { app: "b1-grammar", topicId: "modifiers", scorePct: 50, createdAt: "2026-11-01T10:01:00Z" },
  ]);
});

test("grammarSessionResults: 2 of 3 correct rounds to 67", () => {
  const rows = [
    row("s1", "t", true, "2026-11-01T10:00:00Z"),
    row("s1", "t", true, "2026-11-01T10:00:01Z"),
    row("s1", "t", false, "2026-11-01T10:00:02Z"),
  ];
  assert.equal(grammarSessionResults(rows)[0].scorePct, 67);
});

test("grammarSessionResults: ties on createdAt are ordered by session id", () => {
  const rows = [
    row("b", "t", true, "2026-11-01T10:00:00Z"),
    row("a", "u", true, "2026-11-01T10:00:00Z"),
  ];
  assert.deepEqual(grammarSessionResults(rows).map((r) => r.topicId), ["u", "t"]);
});

test("grammarSessionResults: empty input", () => {
  assert.deepEqual(grammarSessionResults([]), []);
});
