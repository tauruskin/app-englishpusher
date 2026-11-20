import { test } from "node:test";
import assert from "node:assert/strict";
import { planAudio } from "./generate-audio.ts";
import { audioFileName } from "../src/shared/audioName.ts";

const opts = { all: false, limit: 5000 };

test("each unique word is voiced once, using the first text met", () => {
  const plan = planAudio(["Wednesday", "queue", "wednesday", "queue"], [], opts);
  assert.deepEqual(plan.create, [
    { file: audioFileName("Wednesday"), text: "Wednesday" },
    { file: audioFileName("queue"), text: "queue" },
  ]);
  assert.equal(plan.chars, "Wednesday".length + "queue".length);
  assert.equal(plan.overLimit, false);
});

test("existing recordings are kept and never voiced again", () => {
  const plan = planAudio(["queue", "calm"], [audioFileName("queue")], opts);
  assert.deepEqual(plan.create.map((c) => c.text), ["calm"]);
  assert.deepEqual(plan.remove, []);
});

test("recordings with no matching word are removed; other files are left alone", () => {
  const orphan = audioFileName("old word");
  const plan = planAudio(["calm"], [orphan, ".gitkeep", "notes.txt", audioFileName("calm")], opts);
  assert.deepEqual(plan.remove, [orphan]);
  assert.deepEqual(plan.create, []);
});

test("blank words are ignored", () => {
  assert.deepEqual(planAudio(["  ", ""], [], opts).create, []);
});

test("over the limit without --all: nothing voiced, orphans still removed", () => {
  const orphan = audioFileName("old word");
  const plan = planAudio(["abcdef", "ghijkl"], [orphan], { all: false, limit: 10 });
  assert.equal(plan.overLimit, true);
  assert.deepEqual(plan.create, []);
  assert.equal(plan.chars, 12);
  assert.deepEqual(plan.remove, [orphan]);
});

test("--all voices everything regardless of the limit", () => {
  const plan = planAudio(["abcdef", "ghijkl"], [], { all: true, limit: 10 });
  assert.equal(plan.overLimit, false);
  assert.equal(plan.create.length, 2);
});
