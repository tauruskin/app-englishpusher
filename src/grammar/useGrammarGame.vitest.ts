import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useGrammarGame } from "./useGrammarGame.ts";
import type { GrammarQuestion } from "./types.ts";


const mockQuestionsSimple: GrammarQuestion[] = [
    {
      id: "reorder-simple",
      topic: "test",
      type: "sentence-reorder",
      difficulty: "beginner",
      sentence: "He is here.",
      grammarRule: "Word Order",
      explanation: "Test",
      sentenceReorder: {
        words: ["He", "is", "here"],
        correctOrders: [
          [0, 1, 2], // He is here
          [2, 1, 0], // Here is he (technically poetic but let's test multiple)
        ],
      },
    },
];

describe("useGrammarGame - REORDER fixes", () => {
  it("should correctly identify all valid orders for a sentence-reorder question", () => {
    const { result } = renderHook(() => useGrammarGame(mockQuestionsSimple));
    
    // Test first valid order
    act(() => {
      result.current.submitAnswer("He is here");
    });
    expect(result.current.isCorrect).toBe(true);
    
    // Reset and test second valid order
    act(() => {
        result.current.restart(mockQuestionsSimple);
    });
    
    act(() => {
        result.current.submitAnswer("here is He");
    });
    expect(result.current.isCorrect).toBe(true);
  });

  it("should mark incorrect order as wrong", () => {
    const { result } = renderHook(() => useGrammarGame(mockQuestionsSimple));
    
    act(() => {
      result.current.submitAnswer("is He here");
    });
    expect(result.current.isCorrect).toBe(false);
  });
});
