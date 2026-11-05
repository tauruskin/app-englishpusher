// Telegram Mini App initData check (core.telegram.org/bots/webapps, "Validating data received via the
// Mini App"). Pure: Web Crypto only, so it runs in the Edge Function (Deno) and in node:test.

export interface TelegramUser { id: number; first_name: string }
export type VerifyResult =
  | { ok: true; user: TelegramUser; authDate: number }
  | { ok: false; reason: "malformed" | "bad_signature" | "expired" | "no_user" };

export const MAX_AGE_SECONDS = 24 * 60 * 60; // spec: reject auth_date older than 24 hours
const FUTURE_SKEW_SECONDS = 300;              // allow a little clock drift, nothing more

const enc = new TextEncoder();

async function hmac(key: BufferSource, message: string): Promise<ArrayBuffer> {
  const k = await crypto.subtle.importKey("raw", key, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return crypto.subtle.sign("HMAC", k, enc.encode(message));
}

function hex(buf: ArrayBuffer): string {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Constant-time for equal lengths (both are 64 hex chars by the time we compare).
function sameText(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// Every received field except `hash`, sorted by key, "key=value" joined by "\n".
export function dataCheckString(params: URLSearchParams): string {
  return [...params.entries()]
    .filter(([k]) => k !== "hash")
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([k, v]) => `${k}=${v}`)
    .join("\n");
}

export async function verifyInitData(
  initData: string,
  botToken: string,
  nowSeconds: number,
  maxAgeSeconds: number = MAX_AGE_SECONDS,
): Promise<VerifyResult> {
  if (!botToken) return { ok: false, reason: "malformed" }; // an empty key would let anyone forge data
  const params = new URLSearchParams(initData);
  const keys = [...params.keys()];
  const hash = params.get("hash");
  if (!hash || !/^[0-9a-f]{64}$/.test(hash) || new Set(keys).size !== keys.length) {
    return { ok: false, reason: "malformed" };
  }

  const secret = await hmac(enc.encode("WebAppData"), botToken);
  const expected = hex(await hmac(secret, dataCheckString(params)));
  if (!sameText(expected, hash)) return { ok: false, reason: "bad_signature" };

  const authDate = Number(params.get("auth_date"));
  if (!Number.isInteger(authDate) || authDate <= 0) return { ok: false, reason: "malformed" };
  if (nowSeconds - authDate > maxAgeSeconds || authDate - nowSeconds > FUTURE_SKEW_SECONDS) {
    return { ok: false, reason: "expired" };
  }

  let user: unknown;
  try {
    user = JSON.parse(params.get("user") ?? "");
  } catch {
    return { ok: false, reason: "no_user" };
  }
  const u = user as { id?: unknown; first_name?: unknown } | null;
  if (!u || typeof u.id !== "number" || !Number.isSafeInteger(u.id) || u.id <= 0) {
    return { ok: false, reason: "no_user" };
  }
  return { ok: true, user: { id: u.id, first_name: typeof u.first_name === "string" ? u.first_name : "" }, authDate };
}
