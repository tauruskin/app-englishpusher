import type { Result } from "../teacher/types.ts";
import { telegramError } from "./errors.ts";

export interface TelegramCall {
  url: string;          // <SUPABASE_URL>/functions/v1/progress-telegram
  apiKey: string;       // the public anon key (the gateway accepts it; the function checks initData)
  initData: string;
  topicKey?: string;
  fetchImpl?: typeof fetch;
}

// One call to the progress-telegram Edge Function → the same Result shape as rpc().
export async function telegramRpc<T>(c: TelegramCall): Promise<Result<T>> {
  try {
    const res = await (c.fetchImpl ?? fetch)(c.url, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: c.apiKey },
      body: JSON.stringify(c.topicKey === undefined ? { init_data: c.initData } : { init_data: c.initData, topic_key: c.topicKey }),
    });
    let body: { data?: unknown; error?: unknown } = {};
    try {
      body = ((await res.json()) ?? {}) as typeof body;
    } catch {
      /* not JSON */
    }
    if (res.ok && body.data !== undefined && body.data !== null) return { data: body.data as T, error: null };
    return { data: null, error: telegramError(res.status, typeof body.error === "string" ? body.error : undefined) };
  } catch {
    return { data: null, error: telegramError(0) };
  }
}
