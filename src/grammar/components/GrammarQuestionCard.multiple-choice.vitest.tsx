/**
 * Regression tests for multiple-choice rendering.
 *
 * Bug: MultipleChoiceView rendered only `multipleChoice.question`. When the
 * gapped stem lives in `question.sentence` (the shape every topic uses after
 * the Quiz Bot de-duplication pass), the learner saw a bare prompt like
 * "Which option correctly completes the sentence?" with no sentence at all.
 */
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import GrammarQuestionCard from "./GrammarQuestionCard.tsx";
import type { GrammarQuestion } from "../types.ts";

const baseProps = {
  answered: false,
  selectedAnswer: null,
  isCorrect: null,
  streak: 0,
  transitioning: false,
  onSubmit: vi.fn(),
};

const makeQuestion = (over: Partial<GrammarQuestion> = {}): GrammarQuestion => ({
  id: "t-mc-1",
  topic: "test",
  type: "multiple-choice",
  difficulty: "intermediate",
  sentence: "He ___ the restaurant at 7pm and ordered a steak.",
  grammarRule: "Past Simple",
  explanation: "Sequence of completed past actions.",
  multipleChoice: {
    question: "Which option correctly completes the sentence?",
    correctOption: "arrived at",
    options: ["arrived at", "arrives at", "had arrived at", "was arriving at"],
  },
  ...over,
});

/** Collapse the split-up blank spans so we can assert on the stem as a whole. */
const stemText = () =>
  (document.body.textContent ?? "").replace(/\s+/g, " ");

describe("multiple-choice: gapped stem", () => {
  it("renders the reference sentence when the stem carries the gap", () => {
    render(<GrammarQuestionCard {...baseProps} question={makeQuestion()} />);

    expect(stemText()).toContain("He");
    expect(stemText()).toContain("the restaurant at 7pm and ordered a steak.");
  });

  it("does not leak the answer into the blank before the learner answers", () => {
    render(<GrammarQuestionCard {...baseProps} question={makeQuestion()} />);

    const stem = screen.getByTestId("mc-stem");
    expect(stem.textContent).not.toContain("arrived at");
  });

  it("shows the correct answer in the blank once answered", () => {
    render(
      <GrammarQuestionCard
        {...baseProps}
        answered
        isCorrect
        selectedAnswer="arrived at"
        question={makeQuestion()}
      />,
    );

    expect(screen.getByTestId("mc-stem").textContent).toContain("arrived at");
  });

  it("still shows the prompt alongside the stem", () => {
    render(<GrammarQuestionCard {...baseProps} question={makeQuestion()} />);

    expect(
      screen.getByText("Which option correctly completes the sentence?"),
    ).toBeInTheDocument();
  });
});

describe("multiple-choice: gapless stem", () => {
  it("hides a sentence that restates the whole correct option", () => {
    // irregular-verbs irr-v-mc-4 shape: `sentence` IS the correct option.
    render(
      <GrammarQuestionCard
        {...baseProps}
        question={makeQuestion({
          sentence: "I have seen this film three times.",
          multipleChoice: {
            question: "Which sentence is grammatically correct?",
            correctOption: "I have seen this film three times.",
            options: [
              "I have seen this film three times.",
              "I have saw this film three times.",
              "I have see this film three times.",
              "I has seen this film three times.",
            ],
          },
        })}
      />,
    );

    expect(screen.queryByTestId("mc-stem")).not.toBeInTheDocument();
  });

  it("hides a sentence containing a ONE-WORD answer", () => {
    // irregular-verbs irr-v-mc-1 shape: the prompt asks for the Past Simple of
    // 'bring' while `sentence` already contains "brought".
    render(
      <GrammarQuestionCard
        {...baseProps}
        question={makeQuestion({
          sentence: "She brought flowers to the dinner party.",
          multipleChoice: {
            question: "She ___ flowers last Saturday. Past Simple of 'bring':",
            correctOption: "brought",
            options: ["brought", "bringed", "brang", "bring"],
          },
        })}
      />,
    );

    expect(screen.queryByTestId("mc-stem")).not.toBeInTheDocument();
  });

  it("shows a gapless sentence that is genuine context, not the answer", () => {
    // stative-dynamic sdv-mc-4 shape: the prompt says "this", so the sentence
    // must be visible or the question is unanswerable.
    render(
      <GrammarQuestionCard
        {...baseProps}
        question={makeQuestion({
          sentence: "She is being very generous today.",
          multipleChoice: {
            question: "What does this tell us about her generosity?",
            correctOption: "She is acting generously now — it might not be usual.",
            options: [
              "She is acting generously now — it might not be usual.",
              "She is always a very generous person.",
              "She is gradually becoming more generous.",
              "She was generous in the past but is not now.",
            ],
          },
        })}
      />,
    );

    expect(screen.getByTestId("mc-stem").textContent).toContain(
      "She is being very generous today.",
    );
  });

  it("does not print the sentence twice when the prompt already quotes it", () => {
    // prepositions-of-time pot-mc-1 shape: the prompt embeds the whole stem.
    // Handled in the renderer so the shared topic data (which the Telegram
    // Quiz Bot also reads) never has to be edited for the web app's benefit.
    render(
      <GrammarQuestionCard
        {...baseProps}
        question={makeQuestion({
          sentence: "The conference finishes ___ three hours.",
          multipleChoice: {
            question:
              "Which preposition correctly completes: 'The conference finishes ___ three hours.'?",
            correctOption: "in",
            options: ["in", "after", "at", "within"],
          },
        })}
      />,
    );

    expect(screen.queryByTestId("mc-stem")).not.toBeInTheDocument();
    const shown = (document.body.textContent ?? "").match(/The conference finishes/g) ?? [];
    expect(shown).toHaveLength(1);
  });

  it("does not treat a substring match as an answer leak", () => {
    // "in" appears inside "finishes" — must not suppress the stem.
    render(
      <GrammarQuestionCard
        {...baseProps}
        question={makeQuestion({
          sentence: "The conference finishes ___ three hours.",
          multipleChoice: {
            question: "Which preposition correctly completes the sentence?",
            correctOption: "in",
            options: ["in", "after", "at", "within"],
          },
        })}
      />,
    );

    expect(screen.getByTestId("mc-stem").textContent).toContain("The conference finishes");
  });
});
