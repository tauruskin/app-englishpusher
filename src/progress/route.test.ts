import { test } from "node:test";
import assert from "node:assert/strict";
import { parseRoute, routeHash } from "./route.ts";

test("empty, unknown or incomplete hash is home", () => {
  assert.deepEqual(parseRoute(""), { page: "home" });
  assert.deepEqual(parseRoute("#/"), { page: "home" });
  assert.deepEqual(parseRoute("#/nonsense"), { page: "home" });
  assert.deepEqual(parseRoute("#/topic/"), { page: "home" });
});

test("topic route decodes its key", () => {
  assert.deepEqual(parseRoute("#/topic/b1%3Agrammar%3Amodifiers"), { page: "topic", topicKey: "b1:grammar:modifiers" });
});

test("a malformed % does not throw", () => {
  assert.deepEqual(parseRoute("#/topic/%"), { page: "topic", topicKey: "%" });
});

test("routeHash round-trips, including / ? & in keys", () => {
  const r = { page: "topic" as const, topicKey: "b1:vocab:jobs & work/2?x" };
  assert.deepEqual(parseRoute(routeHash(r)), r);
  assert.equal(routeHash({ page: "home" }), "#/");
});
