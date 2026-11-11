/**
 * Generic validation for ALL grammar topics in the registry.
 * Runs automatically against every topic — when adding a new topic,
 * registering it in index.ts is enough for it to be covered here.
 *
 * Run: npx vitest run src/grammar/topics/topics-validation.vitest.ts
 */
import { describe, it, expect } from "vitest";
import topics from "./index.ts";
import type { GrammarQuestion } from "../types.ts";

const VALID_TYPES = [
  "gap-fill",
  "error-spot",
  "multiple-choice",
  "word-transform",
  "sentence-match",
];

const VALID_DIFFICULTIES = ["beginner", "intermediate", "advanced"];

/** Normalize apostrophe variants so key/option comparison isn't broken by curly quotes */
const norm = (s: string) => s.replace(/['‘’ʼ`´]/g, "'").trim();

/** Strip trailing punctuation from a token for word-index comparisons */
const stripPunct = (s: string) => s.replace(/[.,!?;:]+$/, "");

describe("topic registry", () => {
  it("has unique topic ids", () => {
    const ids = topics.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has unique question ids across all topics", () => {
    const ids = topics.flatMap((t) => t.rules.map((q) => q.id));
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(dupes).toEqual([]);
  });

  it("gives every topic one of the six course levels", () => {
    const LEVELS = ["A2", "A2+", "B1", "B1+", "B2+", "C1"];
    const bad = topics.filter((t) => !LEVELS.includes(t.level)).map((t) => t.id);
    expect(bad).toEqual([]);
  });
});

describe.each(topics.map((t) => [t.id, t] as const))("topic: %s", (_id, topic) => {
  it("has id, name, description and at least 20 questions", () => {
    expect(topic.id).toMatch(/^[a-z0-9-]+$/);
    expect(topic.name.length).toBeGreaterThan(0);
    expect(topic.description.length).toBeGreaterThan(0);
    expect(topic.rules.length).toBeGreaterThanOrEqual(20);
  });

  describe.each(topic.rules.map((q) => [q.id, q] as const))("question: %s", (_qid, q: GrammarQuestion) => {
    it("has valid base fields", () => {
      expect(q.topic).toBe(topic.id);
      expect(VALID_TYPES).toContain(q.type);
      expect(VALID_DIFFICULTIES).toContain(q.difficulty);
      expect(q.sentence.length).toBeGreaterThan(0);
      expect(q.grammarRule.length).toBeGreaterThan(0);
      expect(q.explanation.length).toBeGreaterThan(0);
    });

    if (q.type === "gap-fill") {
      it("gap-fill: exactly one ___ and consistent options", () => {
        const data = q.gapFill!;
        expect(data).toBeDefined();
        // Renderer splits the sentence on ___; two blanks would render the
        // same answer twice (real bug fixed in present-simple-vs-continuous)
        expect(q.sentence.split("___").length - 1).toBe(1);
        expect(data.options).toContain(data.correctAnswer);
        if (data.correctOptionIndex !== undefined) {
          expect(data.options[data.correctOptionIndex]).toBe(data.correctAnswer);
        }
        // NOTE: gapIndex is not checked — the renderer splits on ___ and
        // never reads it, and several older topics have stale indexes.
        // 4 distinct options
        expect(data.options.length).toBe(4);
        expect(new Set(data.options.map(norm)).size).toBe(4);
      });
    }

    if (q.type === "error-spot") {
      it("error-spot: index points at the wrong word, correction offered", () => {
        const data = q.errorSpot!;
        expect(data).toBeDefined();
        const token = q.sentence.split(" ")[data.errorWordIndex] ?? "";
        expect(stripPunct(norm(token))).toBe(stripPunct(norm(data.wrongWord)));
        expect(norm(data.correction)).not.toBe(norm(data.wrongWord));
        if (data.correctionOptions) {
          expect(data.correctionOptions.map(norm)).toContain(norm(data.correction));
          expect(new Set(data.correctionOptions.map(norm)).size).toBe(
            data.correctionOptions.length,
          );
        }
      });
    }

    if (q.type === "multiple-choice") {
      it("multiple-choice: correct option exists, explanations keyed by options", () => {
        const data = q.multipleChoice!;
        expect(data).toBeDefined();
        expect(data.options.map(norm)).toContain(norm(data.correctOption));
        expect(data.options.length).toBe(4);
        expect(new Set(data.options.map(norm)).size).toBe(4);
        if (data.optionExplanations) {
          // The renderer doesn't read optionExplanations (authoring metadata),
          // and existing topics use two key styles: full option text, or the
          // option's index as a string ("0".."3"). Accept both.
          const optionSet = new Set(data.options.map(norm));
          const indexKeys = data.options.map((_, i) => String(i));
          for (const key of Object.keys(data.optionExplanations)) {
            const ok = optionSet.has(norm(key)) || indexKeys.includes(key);
            expect(ok, `explanation key is neither an option nor an index: "${key}"`).toBe(true);
          }
        }
      });

      // --- Regression guards: the learner must actually SEE the stem ---
      // MultipleChoiceView always renders `multipleChoice.question`, and
      // renders `sentence` unless a gapless `sentence` spells out an option.
      // A "completes the sentence" prompt with no gap anywhere therefore
      // renders as a bare instruction with nothing to complete.
      it("multiple-choice: a completion prompt has a gap to complete", () => {
        const data = q.multipleChoice!;
        if (/\b(completes?|fills?)\b/i.test(data.question)) {
          const hasGap = data.question.includes("___") || q.sentence.includes("___");
          expect(
            hasGap,
            `prompt asks to complete something but neither question nor sentence has a "___" gap`,
          ).toBe(true);
        }
      });
    }

    if (q.type === "word-transform") {
      it("word-transform: base word, answer and a single blank", () => {
        const data = q.wordTransform!;
        expect(data).toBeDefined();
        expect(data.baseWord.trim().length).toBeGreaterThan(0);
        expect(data.correctAnswer.trim().length).toBeGreaterThan(0);
        expect(q.sentence.split("___").length - 1).toBe(1);
      });
    }

    if (q.type === "sentence-match") {
      it("sentence-match: unique beginnings and endings", () => {
        const data = q.sentenceMatch!;
        expect(data).toBeDefined();
        expect(data.pairs.length).toBeGreaterThanOrEqual(3);
        const beginnings = data.pairs.map((p) => norm(p.beginning));
        const endings = data.pairs.map((p) => norm(p.ending));
        expect(new Set(beginnings).size).toBe(beginnings.length);
        expect(new Set(endings).size).toBe(endings.length);
      });
    }
  });
});
