import { test } from "node:test";
import assert from "node:assert/strict";
import { SEASONS, THEMES, activeTheme, pageLevel, seasonFor } from "./themes.ts";

const on = (month: number, day: number, seasons = SEASONS) => seasonFor(new Date(2026, month - 1, day), seasons);

test("Halloween runs from 24 October to 1 November", () => {
  assert.equal(on(10, 23), "");
  assert.equal(on(10, 24), "halloween");
  assert.equal(on(11, 1), "halloween");
  assert.equal(on(11, 2), "");
});

test("a range can run over New Year", () => {
  const winter = [{ theme: "winter", from: [12, 6] as [number, number], to: [1, 10] as [number, number] }];
  assert.equal(on(12, 5, winter), "");
  assert.equal(on(12, 31, winter), "winter");
  assert.equal(on(1, 10, winter), "winter");
  assert.equal(on(1, 11, winter), "");
});

test("every theme in SEASONS has art, words and a ground picture", () => {
  for (const { theme } of SEASONS) {
    assert.ok(THEMES[theme], `no THEMES entry for ${theme}`);
    assert.ok(THEMES[theme].words.length > 1);
    assert.match(THEMES[theme].ground, /^<svg /);
  }
});

test("hub, level pages and account get everything", () => {
  for (const path of ["/", "/index.html", "/b1-vocabulary/", "/c1-business/", "/a2-vocabulary/", "/a2plus-vocabulary/", "/account/"]) {
    assert.equal(pageLevel(path), "full", path);
  }
});

test("flash cards, trivia and games stay still", () => {
  for (const path of ["/b1-flashcards/", "/b1-trivia/", "/c1-flashcards/", "/c1-trivia/", "/a2-flashcards/", "/word-connections/"]) {
    assert.equal(pageLevel(path), "quiet", path);
  }
});

test("?ep-season= shows a theme on any date; unknown names are ignored", () => {
  const june = new Date(2026, 5, 1);
  assert.equal(activeTheme("?ep-season=halloween", june), "halloween");
  assert.equal(activeTheme("?topic=jobs&ep-season=halloween", june), "halloween");
  assert.equal(activeTheme("?ep-season=nope", june), "");
  assert.equal(activeTheme("", new Date(2026, 9, 30)), "halloween");
});
