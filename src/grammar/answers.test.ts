import { test } from "node:test";
import assert from "node:assert/strict";
import { buildGrammarAnswerRows, QUESTION_TEXT_MAX, ANSWER_MAX } from "./answers.ts";

const SESSION = "00000000-0000-4000-8000-000000000001";
const base = { app: "b1-grammar" as const, topicId: "modifiers", sessionId: SESSION };

function result(id: string, over: Partial<{ type: string; sentence: string; userAnswer: string; correctAnswer: string; correct: boolean }> = {}) {
  return {
    question: { id, type: over.type ?? "gap-fill", sentence: over.sentence ?? "It was ___ cold." },
    userAnswer: over.userAnswer ?? "such",
    correctAnswer: over.correctAnswer ?? "so",
    correct: over.correct ?? false,
  };
}

test("one row per answered question, in the table's column names", () => {
  const rows = buildGrammarAnswerRows([result("mod-gap-1"), result("mod-mc-2", { type: "multiple-choice", correct: true })], base);
  assert.deepEqual(rows, [
    {
      app: "b1-grammar", topic_id: "modifiers", question_id: "mod-gap-1", question_type: "gap-fill",
      question_text: "It was ___ cold.", user_answer: "such", correct_answer: "so", correct: false, session_id: SESSION,
    },
    {
      app: "b1-grammar", topic_id: "modifiers", question_id: "mod-mc-2", question_type: "multiple-choice",
      question_text: "It was ___ cold.", user_answer: "such", correct_answer: "so", correct: true, session_id: SESSION,
    },
  ]);
});

test("texts are cut to the database limits", () => {
  const [row] = buildGrammarAnswerRows(
    [result("q1", { sentence: "s".repeat(400), userAnswer: "u".repeat(600), correctAnswer: "c".repeat(600) })],
    base,
  );
  assert.equal(row.question_text.length, QUESTION_TEXT_MAX);
  assert.equal(row.user_answer.length, ANSWER_MAX);
  assert.equal(row.correct_answer.length, ANSWER_MAX);
  assert.equal(QUESTION_TEXT_MAX, 300);
  assert.equal(ANSWER_MAX, 500);
});

test("a question answered twice in one session is stored once (the first answer)", () => {
  const rows = buildGrammarAnswerRows([result("q1", { userAnswer: "first" }), result("q1", { userAnswer: "second" })], base);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].user_answer, "first");
});

test("no answers, no rows", () => {
  assert.deepEqual(buildGrammarAnswerRows([], base), []);
});
