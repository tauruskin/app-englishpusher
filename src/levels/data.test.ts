import { test } from "node:test";
import assert from "node:assert/strict";
import { pageUrl } from "./level.ts";
import { A2 } from "../a2-flashcards/level.ts";
import { A2PLUS } from "../a2plus-flashcards/level.ts";
import { B1 } from "../b1-flashcards/level.ts";
import { B1PLUS } from "../b1plus-flashcards/level.ts";

// Topics are written by the add-*-topic skills; a copied triviaUrl must never send students to another level's quiz.
for (const level of [A2, A2PLUS, B1, B1PLUS]) {
  test(`${level.id} topics link to their own trivia and have unique ids`, () => {
    const ids = level.topics.map((t) => t.id);
    assert.equal(new Set(ids).size, ids.length, "duplicate topic id");
    for (const topic of level.topics) {
      if (topic.triviaUrl !== undefined) {
        assert.equal(topic.triviaUrl, `${pageUrl(level, "trivia")}?topic=${topic.id}`);
      }
    }
  });
}
