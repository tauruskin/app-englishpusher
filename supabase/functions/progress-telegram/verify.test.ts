import { test } from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { dataCheckString, MAX_AGE_SECONDS, verifyInitData } from "./verify.ts";

const TOKEN = "123456789:TEST_TOKEN_not_a_real_bot_token_xxxxx";
const NOW = 1_800_000_000;
const USER = JSON.stringify({ id: 818309126, first_name: "Тетяна", language_code: "uk" });

function sign(fields: Record<string, string>, token = TOKEN): string {
  const dcs = Object.keys(fields).sort().map((k) => `${k}=${fields[k]}`).join("\n");
  const secret = createHmac("sha256", "WebAppData").update(token).digest();
  const hash = createHmac("sha256", secret).update(dcs).digest("hex");
  return new URLSearchParams({ ...fields, hash }).toString();
}
const fields = (over: Record<string, string> = {}) => ({ auth_date: String(NOW - 60), query_id: "AAE1", user: USER, ...over });

test("valid initData returns the user", async () => {
  const r = await verifyInitData(sign(fields()), TOKEN, NOW);
  assert.deepEqual(r, { ok: true, user: { id: 818309126, first_name: "Тетяна" }, authDate: NOW - 60 });
});

test("a signature field stays in the data-check-string", async () => {
  const r = await verifyInitData(sign(fields({ signature: "abc_DEF-123" })), TOKEN, NOW);
  assert.equal(r.ok, true);
});

test("dataCheckString drops hash and sorts keys", () => {
  assert.equal(dataCheckString(new URLSearchParams("user=u&hash=h&auth_date=1")), "auth_date=1\nuser=u");
});

test("tampered user is rejected", async () => {
  const signed = new URLSearchParams(sign(fields()));
  signed.set("user", JSON.stringify({ id: 1, first_name: "Mallory" }));
  assert.deepEqual(await verifyInitData(signed.toString(), TOKEN, NOW), { ok: false, reason: "bad_signature" });
});

test("another bot's token is rejected", async () => {
  const r = await verifyInitData(sign(fields(), "987654321:OTHER_TOKEN_xxxxxxxxxxxxxxxxxxxxxxxx"), TOKEN, NOW);
  assert.deepEqual(r, { ok: false, reason: "bad_signature" });
});

test("older than 24 hours is expired, just under is fine", async () => {
  const old = sign(fields({ auth_date: String(NOW - MAX_AGE_SECONDS - 1) }));
  assert.deepEqual(await verifyInitData(old, TOKEN, NOW), { ok: false, reason: "expired" });
  const fresh = sign(fields({ auth_date: String(NOW - MAX_AGE_SECONDS + 60) }));
  assert.equal((await verifyInitData(fresh, TOKEN, NOW)).ok, true);
});

test("auth_date far in the future is expired", async () => {
  const r = await verifyInitData(sign(fields({ auth_date: String(NOW + 600) })), TOKEN, NOW);
  assert.deepEqual(r, { ok: false, reason: "expired" });
});

test("missing or malformed hash", async () => {
  assert.deepEqual(await verifyInitData("auth_date=1&user=x", TOKEN, NOW), { ok: false, reason: "malformed" });
  assert.deepEqual(await verifyInitData("auth_date=1&hash=xyz", TOKEN, NOW), { ok: false, reason: "malformed" });
  assert.deepEqual(await verifyInitData("", TOKEN, NOW), { ok: false, reason: "malformed" });
});

test("duplicate keys are malformed", async () => {
  const dup = sign(fields()) + "&user=" + encodeURIComponent(USER);
  assert.deepEqual(await verifyInitData(dup, TOKEN, NOW), { ok: false, reason: "malformed" });
});

test("non-numeric auth_date is malformed", async () => {
  assert.deepEqual(await verifyInitData(sign(fields({ auth_date: "soon" })), TOKEN, NOW), { ok: false, reason: "malformed" });
});

test("signed but without a usable user", async () => {
  const noUser = sign({ auth_date: String(NOW - 60), query_id: "AAE1" });
  assert.deepEqual(await verifyInitData(noUser, TOKEN, NOW), { ok: false, reason: "no_user" });
  const badId = sign(fields({ user: JSON.stringify({ id: -5, first_name: "x" }) }));
  assert.deepEqual(await verifyInitData(badId, TOKEN, NOW), { ok: false, reason: "no_user" });
  const notJson = sign(fields({ user: "{oops" }));
  assert.deepEqual(await verifyInitData(notJson, TOKEN, NOW), { ok: false, reason: "no_user" });
});

test("an empty bot token never verifies, even data signed with an empty key", async () => {
  const forged = sign(fields(), "");
  assert.deepEqual(await verifyInitData(forged, "", NOW), { ok: false, reason: "malformed" });
});

test("a user without first_name gets an empty name", async () => {
  const r = await verifyInitData(sign(fields({ user: JSON.stringify({ id: 42 }) })), TOKEN, NOW);
  assert.deepEqual(r, { ok: true, user: { id: 42, first_name: "" }, authDate: NOW - 60 });
});
