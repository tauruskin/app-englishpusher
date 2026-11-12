import { test } from "node:test";
import assert from "node:assert/strict";
import { grammarCard, cardsForLevel, levelSummaries, levelIsLive, type HubCard } from "./cards.ts";

const vocab = (level: HubCard["level"], disabled = false): HubCard => ({
  key: `vocab-${level}`, level, kind: "vocabulary", label: `${level} Vocabulary`, description: "d",
  href: `/${level}-vocabulary/`, bgFrom: "#111111", bgTo: "#222222", borderColor: "#333333",
  icon: "layers", disabled, badge: disabled ? "Coming soon" : undefined,
});

test("grammar card links to the level's grammar page when the level has topics", () => {
  const c = grammarCard("A2+", true);
  assert.equal(c.label, "A2+ Grammar");
  assert.equal(c.href, "/a2plus-grammar/");
  assert.equal(c.kind, "grammar");
  assert.equal(c.disabled, false);
  assert.equal(c.badge, undefined);
});

test("grammar card is a disabled 'Coming soon' card without topics", () => {
  const c = grammarCard("C1", false);
  assert.equal(c.label, "C1 Grammar");
  assert.equal(c.disabled, true);
  assert.equal(c.badge, "Coming soon");
  assert.equal(c.description, "Grammar practice for C1 is on its way");
  assert.equal(c.bgFrom, "#a8a29e");
  assert.equal(c.bgTo, "#57534e");
});

test("a level tab shows vocabulary first, then grammar", () => {
  const cards = [grammarCard("B1", true), vocab("B1"), vocab("A2")];
  assert.deepEqual(cardsForLevel(cards, "B1").map((c) => c.kind), ["vocabulary", "grammar"]);
});

test("a level is live when any of its cards is active", () => {
  assert.equal(levelIsLive([vocab("A2", true), grammarCard("A2", false)], "A2"), false);
  assert.equal(levelIsLive([vocab("A2", true), grammarCard("A2", true)], "A2"), true);
  assert.equal(levelIsLive([vocab("A2"), grammarCard("A2", false)], "A2"), true);
});

test("All levels: one summary per live level, in the given order, naming only active parts", () => {
  const cards = [
    vocab("B1"), grammarCard("B1", true),
    vocab("A2"), grammarCard("A2", false),
    vocab("B2+", true), grammarCard("B2+", false),
  ];
  const s = levelSummaries(cards, ["A2", "B1", "B2+"]);
  assert.deepEqual(s.map((x) => x.level), ["A2", "B1"]);
  assert.deepEqual(s.map((x) => x.parts), [["Vocabulary"], ["Vocabulary", "Grammar"]]);
  assert.equal(s[0].bgFrom, "#111111"); // colours come from the level's vocabulary card
});
