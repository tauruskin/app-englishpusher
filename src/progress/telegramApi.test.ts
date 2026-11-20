import { test } from "node:test";
import assert from "node:assert/strict";
import { TELEGRAM_EXPIRED } from "./errors.ts";
import { telegramRpc } from "./telegramApi.ts";

type Seen = { url: string; init: RequestInit };
function fakeFetch(status: number, body: unknown, seen: Seen[] = []): typeof fetch {
  return (async (url: string, init: RequestInit) => {
    seen.push({ url, init });
    return new Response(typeof body === "string" ? body : JSON.stringify(body), { status });
  }) as unknown as typeof fetch;
}
const base = { url: "https://s.supabase.co/functions/v1/progress-telegram", apiKey: "anon", initData: "a=1&hash=h" };

test("posts init_data and returns data", async () => {
  const seen: Seen[] = [];
  const r = await telegramRpc<{ ok: number }>({ ...base, fetchImpl: fakeFetch(200, { data: { ok: 1 } }, seen) });
  assert.deepEqual(r, { data: { ok: 1 }, error: null });
  assert.equal(seen[0].url, base.url);
  assert.equal(seen[0].init.method, "POST");
  assert.deepEqual(JSON.parse(String(seen[0].init.body)), { init_data: "a=1&hash=h" });
  assert.equal((seen[0].init.headers as Record<string, string>).apikey, "anon");
});

test("sends topic_key for a topic", async () => {
  const seen: Seen[] = [];
  await telegramRpc({ ...base, topicKey: "b1:grammar:x", fetchImpl: fakeFetch(200, { data: {} }, seen) });
  assert.deepEqual(JSON.parse(String(seen[0].init.body)), { init_data: "a=1&hash=h", topic_key: "b1:grammar:x" });
});

test("401 expired → expired sentence", async () => {
  const r = await telegramRpc({ ...base, fetchImpl: fakeFetch(401, { error: "expired" }) });
  assert.deepEqual(r, { data: null, error: TELEGRAM_EXPIRED });
});

test("non-JSON error body, null data and network failure", async () => {
  const generic = "Couldn't load the data. Check your connection and try again.";
  assert.equal((await telegramRpc({ ...base, fetchImpl: fakeFetch(502, "<html>") })).error, generic);
  assert.equal((await telegramRpc({ ...base, fetchImpl: fakeFetch(200, { data: null }) })).error, generic);
  const failing = (async () => { throw new TypeError("network"); }) as unknown as typeof fetch;
  assert.equal((await telegramRpc({ ...base, fetchImpl: failing })).error, generic);
});
