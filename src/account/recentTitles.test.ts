import { test } from "node:test";
import assert from "node:assert/strict";
import { isGrammarFlashcardsApp, studyTitle } from "./recentTitles.ts";

test("grammar flashcards rows take the grammar topic name", () => {
  assert.equal(isGrammarFlashcardsApp("b1-grammar-flashcards"), true);
  assert.equal(isGrammarFlashcardsApp("b1-flashcards"), false);
  const grammar = new Map([["modifiers", "Modifiers"]]);
  const vocab = (_app: string, id: string) => (id === "food" ? "Food" : null);
  assert.equal(studyTitle("b1-grammar-flashcards", "modifiers", grammar, vocab), "Modifiers");
  assert.equal(studyTitle("b1-grammar-flashcards", "modifiers", null, vocab), null); // names not loaded yet
  assert.equal(studyTitle("b1-flashcards", "food", grammar, vocab), "Food");
  assert.equal(studyTitle("b1-flashcards", "my-words", grammar, vocab), "My Words");
});
