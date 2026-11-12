import { test } from "node:test";
import assert from "node:assert/strict";
import { renderLevel } from "./grammar-cards-preview.mjs";

const topics = [
  { id: "t", level: "B1", name: "T <1>", icon: "📏", rules: [], cards: [
    { id: "c1", rule: "quite + adj", example: "It's ___ cold.", answer: "quite", explanation: "Weaker.", examples: ["A.", "B."], ua: "досить" } ] },
  { id: "u", level: "A2", name: "Other", rules: [], cards: [] },
];

test("renders every card of a level, escaped, with the answer filled in", () => {
  const html = renderLevel("B1", topics);
  assert.match(html, /T &lt;1&gt;/);
  assert.match(html, /It's <strong>quite<\/strong> cold\./);
  assert.match(html, /досить/);
  assert.doesNotMatch(html, /Other/);
});

test("shows a per-topic card count and lists topics without cards as 'no cards yet'", () => {
  const html = renderLevel("B1", [
    ...topics,
    { id: "v", level: "B1", name: "Empty topic", rules: [] },
  ]);
  assert.match(html, /1 card\b/);
  assert.match(html, /Empty topic/);
  assert.match(html, /no cards yet/);
  assert.match(html, /<title>B1 grammar cards — review<\/title>/);
});

test("escapes html in every field and shows the gap as a visible blank on the front", () => {
  const html = renderLevel("B1", [
    { id: "x", level: "B1", name: "X", rules: [], cards: [
      { id: "c", rule: "<b>r</b>", example: "A ___ & <i>b</i>", answer: "<u>", explanation: "\"e\"", examples: ["<s>", "2"] } ] },
  ]);
  assert.doesNotMatch(html, /<b>r<\/b>/);
  assert.match(html, /&lt;b&gt;r&lt;\/b&gt;/);
  assert.match(html, /<span class="blank">___<\/span> &amp; &lt;i&gt;b&lt;\/i&gt;/);
  assert.match(html, /<strong>&lt;u&gt;<\/strong>/);
  assert.match(html, /&quot;e&quot;/);
});

test("the back drops the hint after the gap, the front keeps it", () => {
  const html = renderLevel("B1", [
    { id: "t", level: "B1", name: "T", icon: "📏", rules: [], cards: [
      { id: "c1", rule: "r", example: "He ___ (go) to work.", answer: "goes", explanation: "e", examples: ["A.", "B."], ua: "u" } ] },
  ]);
  assert.match(html, /He <strong>goes<\/strong> to work\./);
  assert.match(html, /<span class="blank">___<\/span> \(go\) to work\./);
});
