import { test } from "node:test";
import assert from "node:assert/strict";
import { captureLaunch, initDataFromHash, openInTelegram, telegramInitData, type MiniStore } from "./telegram.ts";

const INIT = "query_id=AAE1&user=%7B%22id%22%3A1%7D&auth_date=1800000000&hash=abc";
const HASH = `#tgWebAppData=${encodeURIComponent(INIT)}&tgWebAppVersion=8.0&tgWebAppPlatform=ios`;

function memoryStore(): MiniStore & { data: Map<string, string> } {
  const data = new Map<string, string>();
  return { data, getItem: (k) => data.get(k) ?? null, setItem: (k, v) => void data.set(k, v) };
}

test("initDataFromHash", () => {
  assert.equal(initDataFromHash(HASH), INIT);
  assert.equal(initDataFromHash("#/topics"), null);
  assert.equal(initDataFromHash(""), null);
  assert.equal(initDataFromHash("#tgWebAppData="), null);
});

test("captureLaunch from the hash stores it", () => {
  const store = memoryStore();
  assert.equal(captureLaunch(HASH, store), INIT);
  assert.equal(telegramInitData(), INIT);
  assert.equal(store.data.size, 1);
});

test("captureLaunch after a reload reads the store", () => {
  const store = memoryStore();
  captureLaunch(HASH, store);
  assert.equal(captureLaunch("#/", store), INIT);
});

test("normal browser visit: no Telegram", () => {
  assert.equal(captureLaunch("#/topics", memoryStore()), null);
  assert.equal(telegramInitData(), null);
});

test("a store that throws (privacy mode) still works for this load", () => {
  const broken: MiniStore = { getItem: () => { throw new Error("denied"); }, setItem: () => { throw new Error("denied"); } };
  assert.equal(captureLaunch(HASH, broken), INIT);
  assert.equal(captureLaunch("#/", broken), null);
});

test("openInTelegram uses the SDK only in Telegram mode", () => {
  const opened: string[] = [];
  const sdk = { openTelegramLink: (u: string) => void opened.push(u) };
  captureLaunch("#/", memoryStore()); // not Telegram
  assert.equal(openInTelegram("https://t.me/x?start=practice", sdk), false);
  captureLaunch(HASH, memoryStore()); // Telegram
  assert.equal(openInTelegram("https://t.me/x?start=practice", sdk), true);
  assert.deepEqual(opened, ["https://t.me/x?start=practice"]);
  assert.equal(openInTelegram("https://t.me/x", undefined), false); // SDK failed to load: plain link
});
