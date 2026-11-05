// Pure state helpers for the "Connect Telegram" card. No runtime imports: tests load this file
// directly (the rpc call lives in telegramSyncApi.ts because rpc.ts needs Vite's import.meta.env).
import type { RpcError } from "../teacher/rpc.ts";

export const BOT_LINK_PREFIX = "https://t.me/Englishpusher_quiz_bot?start=link_";

export type LinkCode =
  | { kind: "ready"; url: string; expiresAt: string }
  | { kind: "linked" }
  | { kind: "error"; message: string };

export function linkError(e: RpcError): string {
  if (e.code === "42501" || e.status === 401) return "Please sign in again to connect Telegram.";
  return "Couldn't create the link. Check your connection and try again.";
}

// The server's answer → what the card shows. Only a Quiz Bot link is ever opened.
export function parseLinkCode(d: unknown): LinkCode {
  const r = (d ?? {}) as { status?: unknown; url?: unknown; expires_at?: unknown };
  if (r.status === "already_linked") return { kind: "linked" };
  if (r.status === "ok" && typeof r.url === "string" && r.url.startsWith(BOT_LINK_PREFIX) && typeof r.expires_at === "string") {
    return { kind: "ready", url: r.url, expiresAt: r.expires_at };
  }
  return { kind: "error", message: linkError({}) };
}
