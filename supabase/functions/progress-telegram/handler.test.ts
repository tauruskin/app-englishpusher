import { test } from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { ALLOWED_ORIGINS, handle, type Deps } from "./handler.ts";

const TOKEN = "123456789:TEST_TOKEN_not_a_real_bot_token_xxxxx";
const NOW = 1_800_000_000;
const ORIGIN = "https://app.englishpusher.in.ua";

function signed(user: object = { id: 818309126, first_name: "Tanya" }, authDate = NOW - 60): string {
  const fields: Record<string, string> = { auth_date: String(authDate), user: JSON.stringify(user) };
  const dcs = Object.keys(fields).sort().map((k) => `${k}=${fields[k]}`).join("\n");
  const secret = createHmac("sha256", "WebAppData").update(TOKEN).digest();
  return new URLSearchParams({ ...fields, hash: createHmac("sha256", secret).update(dcs).digest("hex") }).toString();
}

function deps(over: Partial<Deps> = {}) {
  const calls: string[] = [];
  const d: Deps = {
    botToken: TOKEN,
    nowSeconds: () => NOW,
    allowedOrigins: ALLOWED_ORIGINS,
    personFor: async (id, name) => { calls.push(`person:${id}:${name}`); return "p-1"; },
    student: async (p) => { calls.push(`student:${p}`); return { person: { id: p } }; },
    topic: async (p, k) => { calls.push(`topic:${p}:${k}`); return { topic_key: k }; },
    log: () => {},
    ...over,
  };
  return { d, calls };
}

const post = (body: unknown, origin = ORIGIN) =>
  new Request("https://x.supabase.co/functions/v1/progress-telegram", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: origin },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

test("student page for a verified user", async () => {
  const { d, calls } = deps();
  const res = await handle(post({ init_data: signed() }), d);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { data: { person: { id: "p-1" } } });
  assert.deepEqual(calls, ["person:818309126:Tanya", "student:p-1"]);
  assert.equal(res.headers.get("Access-Control-Allow-Origin"), ORIGIN);
  assert.equal(res.headers.get("Cache-Control"), "no-store");
});

test("topic page when topic_key is given", async () => {
  const { d, calls } = deps();
  const res = await handle(post({ init_data: signed(), topic_key: "b1:grammar:x" }), d);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { data: { topic_key: "b1:grammar:x" } });
  assert.deepEqual(calls, ["person:818309126:Tanya", "topic:p-1:b1:grammar:x"]);
});

test("preflight", async () => {
  const res = await handle(new Request("https://x/f", { method: "OPTIONS", headers: { Origin: ORIGIN } }), deps().d);
  assert.equal(res.status, 204);
  assert.equal(res.headers.get("Access-Control-Allow-Origin"), ORIGIN);
  assert.match(res.headers.get("Access-Control-Allow-Headers") ?? "", /content-type/);
});

test("unknown origin gets no CORS allow header", async () => {
  const res = await handle(post({ init_data: signed() }, "https://evil.example"), deps().d);
  assert.equal(res.headers.get("Access-Control-Allow-Origin"), null);
});

test("preflight from an unknown origin is 204 without an allow-origin header", async () => {
  const res = await handle(new Request("https://x/f", { method: "OPTIONS", headers: { Origin: "https://evil.example" } }), deps().d);
  assert.equal(res.status, 204);
  assert.equal(res.headers.get("Access-Control-Allow-Origin"), null);
});

test("bad signature is 401 invalid and touches no data", async () => {
  const { d, calls } = deps();
  const res = await handle(post({ init_data: signed().replace(/hash=[0-9a-f]{64}/, `hash=${"0".repeat(64)}`) }), d);
  assert.equal(res.status, 401);
  assert.deepEqual(await res.json(), { error: "invalid" });
  assert.deepEqual(calls, []);
});

test("old initData is 401 expired", async () => {
  const res = await handle(post({ init_data: signed(undefined, NOW - 2 * 86400) }), deps().d);
  assert.equal(res.status, 401);
  assert.deepEqual(await res.json(), { error: "expired" });
});

test("bad requests", async () => {
  for (const body of ["not json", "null", "[]", "\"str\"", "5", {},{ init_data: "" }, { init_data: 5 }, { init_data: "x".repeat(4097) },
                      { init_data: signed(), topic_key: "" }, { init_data: signed(), topic_key: 7 },
                      { init_data: signed(), topic_key: "k".repeat(201) }]) {
    const res = await handle(post(body), deps().d);
    assert.equal(res.status, 400, JSON.stringify(body));
    assert.deepEqual(await res.json(), { error: "bad_request" });
  }
});

test("GET is 405", async () => {
  const res = await handle(new Request("https://x/f", { method: "GET" }), deps().d);
  assert.equal(res.status, 405);
});

test("missing token secret is 500 not_configured", async () => {
  const logs: string[] = [];
  const res = await handle(post({ init_data: signed() }), deps({ botToken: undefined, log: (m) => logs.push(m) }).d);
  assert.equal(res.status, 500);
  assert.deepEqual(await res.json(), { error: "not_configured" });
  assert.match(logs.join(), /QUIZ_BOT_TOKEN is not set/);
});

test("RPC failure is 500 server_error and the log has no initData", async () => {
  const logs: string[] = [];
  const init = signed();
  const res = await handle(post({ init_data: init }),
    deps({ student: async () => { throw new Error("db down"); }, log: (m) => logs.push(m) }).d);
  assert.equal(res.status, 500);
  assert.deepEqual(await res.json(), { error: "server_error" });
  assert.ok(!logs.join().includes(init));
});
