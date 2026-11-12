import { test } from "node:test";
import assert from "node:assert/strict";
import { uaRuleForLevel, topicCardErrors, cardCountLabel } from "./cards.ts";
import type { GrammarTopic, RuleCard } from "./types.ts";

const card = (i: number, ua?: string): RuleCard => ({
  id: `c-${i}`, rule: "quite + adjective", example: `Card ${i} is ___ easy.`, answer: "quite",
  explanation: "Quite is weaker than very.", examples: ["It's quite cold.", "She's quite tall."], ...(ua ? { ua } : {}),
});
const topic = (level: GrammarTopic["level"], cards?: RuleCard[], icon = "📏"): GrammarTopic => ({
  id: "t", level, name: "T", description: "d", icon, cards,
  rules: [{ id: "q1", topic: "t", type: "gap-fill", difficulty: "beginner", sentence: "It's ___ difficult to find a job.",
            grammarRule: "r", explanation: "e", gapFill: { gapIndex: 1, correctAnswer: "quite", options: ["quite", "very"] } }],
});
const six = (ua?: string) => [1, 2, 3, 4, 5, 6].map((i) => card(i, ua));

test("Ukrainian rule by level", () => {
  assert.equal(uaRuleForLevel("A2"), "full");
  assert.equal(uaRuleForLevel("A2+"), "full");
  assert.equal(uaRuleForLevel("B1"), "short");
  assert.equal(uaRuleForLevel("B1+"), "short");
  assert.equal(uaRuleForLevel("B2+"), "none");
  assert.equal(uaRuleForLevel("C1"), "none");
});

test("a topic without cards is valid and has no count", () => {
  assert.deepEqual(topicCardErrors(topic("B1", undefined, undefined as unknown as string)), []);
  assert.equal(cardCountLabel(topic("B1")), null);
});

test("valid B1 cards pass and count", () => {
  assert.deepEqual(topicCardErrors(topic("B1", six("quite ≈ досить"))), []);
  assert.equal(cardCountLabel(topic("B1", six("quite ≈ досить"))), "6 cards");
});

test("card count must be 6-10", () => {
  assert.match(topicCardErrors(topic("B2+", six().slice(0, 5))).join(), /6-10 cards/);
  assert.match(topicCardErrors(topic("B2+", [...six(), ...six().map((c, i) => ({ ...c, id: `x${i}` }))])).join(), /6-10 cards/);
});

test("ids unique, one gap, non-empty fields", () => {
  const bad = six(); bad[1] = { ...bad[1], id: "c-1" }; bad[2] = { ...bad[2], example: "No gap here." };
  bad[3] = { ...bad[3], explanation: " " };
  const errors = topicCardErrors(topic("C1", bad)).join("\n");
  assert.match(errors, /duplicate card id c-1/);
  assert.match(errors, /c-3: example needs exactly one ___/);
  assert.match(errors, /c-4: explanation is empty/);
});

test("Ukrainian must follow the level", () => {
  assert.match(topicCardErrors(topic("B1", six())).join(), /needs a short Ukrainian line/);
  assert.match(topicCardErrors(topic("B1", six("x".repeat(121)))).join(), /Ukrainian line longer than 120/);
  assert.match(topicCardErrors(topic("A2", six())).join(), /needs a Ukrainian explanation/);
  assert.match(topicCardErrors(topic("C1", six("досить"))).join(), /no Ukrainian at B2\+\/C1/);
});

test("cards with cards need one emoji icon", () => {
  assert.match(topicCardErrors(topic("C1", six(), "ab")).join(), /icon must be one emoji/);
  assert.deepEqual(topicCardErrors(topic("C1", six(), "⏳")), []);
});

test("a card must not copy a test sentence", () => {
  const cards = six(); cards[0] = { ...cards[0], example: "It's ___ difficult to find a job." };
  assert.match(topicCardErrors(topic("C1", cards)).join(), /c-1: copies a test sentence/);
});
