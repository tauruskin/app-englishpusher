import { friendlyError } from "../teacher/format.ts";
import type { RpcError } from "../teacher/rpc.ts";

// Same as the teacher wording, except the two cases a student can actually hit.
export function progressError(e: RpcError): string {
  if (e.code === "42501") return "Please sign in to see your progress.";
  if (e.code === "22023" || e.code === "22P02") return "That topic doesn't exist.";
  return friendlyError(e);
}

export const TELEGRAM_EXPIRED = "This page has expired. Close it and tap “📊 My progress” in the Quiz Bot again.";
export const TELEGRAM_INVALID =
  "Couldn't confirm your Telegram account. Close this page and tap “📊 My progress” in the Quiz Bot again.";

// Errors of the progress-telegram Edge Function (status + its `error` code).
export function telegramError(status: number, code?: string): string {
  if (status === 401) return code === "expired" ? TELEGRAM_EXPIRED : TELEGRAM_INVALID;
  return friendlyError({});
}
