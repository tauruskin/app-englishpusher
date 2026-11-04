import { test } from "node:test";
import assert from "node:assert/strict";
import { progressError } from "./errors.ts";
import { SESSION_EXPIRED } from "../teacher/format.ts";

test("progressError speaks to the student", () => {
  assert.equal(progressError({ code: "42501" }), "Please sign in to see your progress.");
  assert.equal(progressError({ code: "22023" }), "That topic doesn't exist.");
  assert.equal(progressError({ code: "22P02" }), "That topic doesn't exist.");
});

test("progressError keeps the shared session and network messages", () => {
  assert.equal(progressError({ code: "PGRST301" }), SESSION_EXPIRED);
  assert.equal(progressError({}), "Couldn't load the data. Check your connection and try again.");
});
