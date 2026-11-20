import { test } from "node:test";
import assert from "node:assert/strict";
import { AUDIO_VOICE_DIR, audioKey, audioFileName } from "./audioName.ts";
import { TOPICS as A2 } from "../a2-flashcards/data.ts";
import { TOPICS as A2PLUS } from "../a2plus-flashcards/data.ts";
import { TOPICS as B1 } from "../b1-flashcards/data.ts";
import { TOPICS as B1PLUS } from "../b1plus-flashcards/data.ts";
import { TOPICS as B2PLUS } from "../b2plus-flashcards/data.ts";
import { TOPICS as C1 } from "../c1-flashcards/data.ts";

const NAME = /^[a-z0-9-]{1,40}-[0-9a-f]{8}\.mp3$/;
const slugOf = (word: string) => audioFileName(word).replace(/-[0-9a-f]{8}\.mp3$/, "");

test("voice folder", () => {
  assert.equal(AUDIO_VOICE_DIR, "audio/jane");
});

test("audioKey trims, collapses spaces, lowercases, NFC-normalises", () => {
  assert.equal(audioKey("  Get   on\twith  "), "get on with");
  assert.equal(audioKey("café"), audioKey("café"));
});

test("file names are safe and stable", () => {
  for (const w of ["queue", "get on with", "blond(e)", "waiter/waitress", "from … to", "I'm full. That was delicious!"]) {
    assert.match(audioFileName(w), NAME, w);
    assert.equal(audioFileName(w), audioFileName(w));
  }
});

test("case and spacing variants share one file", () => {
  assert.equal(audioFileName("Wednesday"), audioFileName(" wednesday "));
});

test("words that slug the same still get different files", () => {
  assert.equal(slugOf("TV/television"), slugOf("TV television"));
  assert.notEqual(audioFileName("TV/television"), audioFileName("TV television"));
  assert.notEqual(audioFileName("light (weight)"), audioFileName("light (colour)"));
});

test("accents are removed from the readable part", () => {
  assert.ok(audioFileName("internet café").startsWith("internet-cafe-"));
});

test("long phrases keep the readable part at most 40 characters", () => {
  const slug = slugOf("to go/continue/walk straight on along the street and then some more");
  assert.ok(slug.length <= 40, slug);
  assert.ok(!slug.endsWith("-"), slug);
});

test("text with no letters or digits gets the fallback slug", () => {
  assert.equal(slugOf("..."), "w");
});

test("every real word gets a unique file name per unique key", () => {
  const byName = new Map<string, string>();
  for (const topics of [A2, A2PLUS, B1, B1PLUS, B2PLUS, C1]) {
    for (const topic of topics) {
      for (const { word } of topic.words) {
        const key = audioKey(word);
        const name = audioFileName(word);
        assert.match(name, NAME, word);
        const seen = byName.get(name);
        assert.ok(seen === undefined || seen === key, `"${seen}" and "${key}" share ${name}`);
        byName.set(name, key);
      }
    }
  }
  assert.ok(byName.size > 2000, `only ${byName.size} names`);
});
