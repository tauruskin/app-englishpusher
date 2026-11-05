import { test } from "node:test";
import assert from "node:assert/strict";
import { linkError, parseLinkCode, type LinkCode } from "./telegramSync.ts";

test("parseLinkCode: ok", () => {
  const r = parseLinkCode({ status: "ok", code: "a".repeat(32), url: "https://t.me/Englishpusher_quiz_bot?start=link_" + "a".repeat(32), expires_at: "2026-11-05T12:15:00Z" });
  assert.deepEqual(r, { kind: "ready", url: "https://t.me/Englishpusher_quiz_bot?start=link_" + "a".repeat(32), expiresAt: "2026-11-05T12:15:00Z" } satisfies LinkCode);
});

test("parseLinkCode: already linked", () => {
  assert.deepEqual(parseLinkCode({ status: "already_linked" }), { kind: "linked" });
});

test("parseLinkCode: refuses a url that is not the Quiz Bot", () => {
  assert.equal(parseLinkCode({ status: "ok", code: "x", url: "https://evil.example/", expires_at: "z" }).kind, "error");
  assert.equal(parseLinkCode(null).kind, "error");
  assert.equal(parseLinkCode({ status: "weird" }).kind, "error");
});

test("linkError", () => {
  assert.equal(linkError({ code: "42501" }), "Please sign in again to connect Telegram.");
  assert.equal(linkError({ status: 401 }), "Please sign in again to connect Telegram.");
  assert.equal(linkError({}),"Couldn't create the link. Check your connection and try again.");
});
