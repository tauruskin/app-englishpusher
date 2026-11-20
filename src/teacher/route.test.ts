import { test } from "node:test";
import assert from "node:assert/strict";
import { DEFAULT_FILTERS, parseHash, toHash } from "./route.ts";

test("empty hash is the overview with default filters", () => {
  assert.deepEqual(parseHash(""), { route: { page: "overview" }, filters: DEFAULT_FILTERS });
  assert.deepEqual(parseHash("#/"), { route: { page: "overview" }, filters: DEFAULT_FILTERS });
});

test("tabs and filters are read from the hash", () => {
  assert.deepEqual(parseHash("#/students?days=7&source=bot"), {
    route: { page: "students" },
    filters: { days: 7, source: "bot" },
  });
  assert.deepEqual(parseHash("#/topics?days=all").filters, { days: null, source: null });
});

test("unknown pages and bad filter values fall back to defaults", () => {
  assert.deepEqual(parseHash("#/nope?days=13&source=DROP%20TABLE"), {
    route: { page: "overview" },
    filters: DEFAULT_FILTERS,
  });
});

test("student and topic pages keep their id, including ':' in topic keys", () => {
  assert.deepEqual(parseHash("#/student/abc-123").route, { page: "student", personId: "abc-123" });
  const hash = toHash({ page: "topic", topicKey: "b1:grammar:past-simple" }, DEFAULT_FILTERS);
  assert.equal(hash, "#/topic/b1%3Agrammar%3Apast-simple");
  assert.deepEqual(parseHash(hash).route, { page: "topic", topicKey: "b1:grammar:past-simple" });
});

test("toHash writes only non-default filters", () => {
  assert.equal(toHash({ page: "students" }, DEFAULT_FILTERS), "#/students");
  assert.equal(toHash({ page: "students" }, { days: null, source: "app" }), "#/students?days=all&source=app");
});

test("the archived page parses, round-trips and keeps filters", () => {
  assert.deepEqual(parseHash("#/archived").route, { page: "archived" });
  assert.equal(toHash({ page: "archived" }, DEFAULT_FILTERS), "#/archived");
  const filters = { days: 7, source: "bot" };
  const hash = toHash({ page: "archived" }, filters);
  assert.equal(hash, "#/archived?days=7&source=bot");
  assert.deepEqual(parseHash(hash), { route: { page: "archived" }, filters });
});

test("a malformed % escape in the hash does not throw", () => {
  assert.deepEqual(parseHash("#/topic/%").route, { page: "topic", topicKey: "%" });
  assert.deepEqual(parseHash("#/student/%E0%A4%A").route, { page: "student", personId: "%E0%A4%A" });
});
