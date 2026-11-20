import type { GrammarAnswerRow, GrammarAppId } from "../shared/progress.ts";

// Limits of public.grammar_answers (moodle-task-builder deploy/analytics/sql, part 15).
export const QUESTION_TEXT_MAX = 300;
export const ANSWER_MAX = 500;

/** The part of a finished question the save needs (a GrammarAnswerResult fits). */
export interface AnsweredQuestion {
  question: { id: string; type: string; sentence: string };
  userAnswer: string;
  correctAnswer: string;
  correct: boolean;
}

/** The rows to store for one finished session: one per question, texts cut to the database limits. */
export function buildGrammarAnswerRows(
  results: AnsweredQuestion[],
  session: { app: GrammarAppId; topicId: string; sessionId: string },
): GrammarAnswerRow[] {
  const seen = new Set<string>();
  const rows: GrammarAnswerRow[] = [];
  for (const r of results) {
    if (seen.has(r.question.id)) continue;
    seen.add(r.question.id);
    rows.push({
      app: session.app,
      topic_id: session.topicId,
      question_id: r.question.id,
      question_type: r.question.type,
      question_text: r.question.sentence.slice(0, QUESTION_TEXT_MAX),
      user_answer: r.userAnswer.slice(0, ANSWER_MAX),
      correct_answer: r.correctAnswer.slice(0, ANSWER_MAX),
      correct: r.correct,
      session_id: session.sessionId,
    });
  }
  return rows;
}
