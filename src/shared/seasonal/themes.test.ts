import { test } from "node:test";
import assert from "node:assert/strict";
import { SEASONS, THEMES, activeTheme, orthodoxEaster, pageLevel, seasonFor, type Season } from "./themes.ts";

const ymd = (d: Date) => [d.getFullYear(), d.getMonth() + 1, d.getDate()];

const on = (month: number, day: number, seasons = SEASONS) => seasonFor(new Date(2026, month - 1, day), seasons);

test("Halloween runs from 24 October to 1 November", () => {
  assert.equal(on(10, 23), "");
  assert.equal(on(10, 24), "halloween");
  assert.equal(on(11, 1), "halloween");
  assert.equal(on(11, 2), "");
});

test("winter runs from 6 December to 10 January", () => {
  assert.equal(on(12, 5), "");
  assert.equal(on(12, 6), "winter");
  assert.equal(on(1, 1), "winter");
  assert.equal(on(1, 10), "winter");
  assert.equal(on(1, 11), "");
});

test("Valentine's Day runs from 10 to 15 February", () => {
  assert.equal(on(2, 9), "");
  assert.equal(on(2, 10), "valentine");
  assert.equal(on(2, 15), "valentine");
  assert.equal(on(2, 16), "");
});

test("Easter runs from a week before to a week after Orthodox Easter", () => {
  const at = (y: number, m: number, d: number) => seasonFor(new Date(y, m - 1, d));
  assert.equal(at(2027, 4, 24), "");
  assert.equal(at(2027, 4, 25), "easter");
  assert.equal(at(2027, 5, 9), "easter");
  assert.equal(at(2027, 5, 10), "");
  assert.equal(at(2028, 4, 9), "easter");
});

test("a range can run over New Year", () => {
  const winter = [{ theme: "winter", from: [12, 6] as [number, number], to: [1, 10] as [number, number] }];
  assert.equal(on(12, 5, winter), "");
  assert.equal(on(12, 31, winter), "winter");
  assert.equal(on(1, 10, winter), "winter");
  assert.equal(on(1, 11, winter), "");
});

test("Orthodox Easter dates", () => {
  assert.deepEqual(ymd(orthodoxEaster(2025)), [2025, 4, 20]);
  assert.deepEqual(ymd(orthodoxEaster(2026)), [2026, 4, 12]);
  assert.deepEqual(ymd(orthodoxEaster(2027)), [2027, 5, 2]);
  assert.deepEqual(ymd(orthodoxEaster(2028)), [2028, 4, 16]);
  assert.deepEqual(ymd(orthodoxEaster(2029)), [2029, 4, 8]);
  assert.deepEqual(ymd(orthodoxEaster(2030)), [2030, 4, 28]);
});

test("an Easter row runs from days before to days after Easter, every year", () => {
  const easter: Season[] = [{ theme: "easter", easter: [-7, 7] }];
  const at = (y: number, m: number, d: number) => seasonFor(new Date(y, m - 1, d), easter);
  assert.equal(at(2027, 4, 24), "");
  assert.equal(at(2027, 4, 25), "easter");
  assert.equal(at(2027, 5, 9), "easter");
  assert.equal(at(2027, 5, 10), "");
  assert.equal(at(2026, 4, 5), "easter");
  assert.equal(at(2026, 4, 20), "");
});

test("no date is in two themes (2025-2035)", () => {
  for (let d = new Date(2025, 0, 1); d.getFullYear() <= 2035; d.setDate(d.getDate() + 1)) {
    const hits = SEASONS.filter((s) => seasonFor(d, [s])).length;
    assert.ok(hits <= 1, `${d.toDateString()} is in ${hits} themes`);
  }
});

test("every theme has an accent colour and a known flight", () => {
  for (const [name, t] of Object.entries(THEMES)) {
    assert.match(t.accent.ink, /^#[0-9a-f]{6}$/, name);
    assert.match(t.accent.soft, /^#[0-9a-f]{6}$/, name);
    assert.ok(["across", "fall", "rise"].includes(t.flight), name);
  }
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
  assert.equal(activeTheme("?ep-season=constructor", june), "");
  assert.equal(activeTheme("", new Date(2026, 9, 30)), "halloween");
});
