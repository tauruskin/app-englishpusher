import { rpc } from "../teacher/rpc.ts";
import { progressError } from "./errors.ts";
import { telegramInitData } from "./telegram.ts";
import { telegramRpc } from "./telegramApi.ts";
import type { Progress, TopicProgress } from "./types.ts";

// DEV-only fixtures; in production `import.meta.env.DEV` is the literal false and this is removed.
const loadDemo = import.meta.env.DEV ? async () => (await import("./demo.ts")).PROGRESS_DEMO : null;
type Demo = typeof import("./demo.ts").PROGRESS_DEMO;

function call<T>(fn: string, args: Record<string, unknown>, pick: (d: Demo) => T) {
  const load = loadDemo;
  return rpc<T>(fn, args, load && (async () => pick(await load())), progressError);
}

const FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL ?? ""}/functions/v1/progress-telegram`;
const viaTelegram = <T>(initData: string, topicKey?: string) =>
  telegramRpc<T>({ url: FUNCTION_URL, apiKey: import.meta.env.VITE_SUPABASE_ANON_KEY ?? "", initData, topicKey });

// The only data access of the page: the App login (RPC), or inside Telegram the progress-telegram function.
export const progressApi = {
  me: () => {
    const tg = telegramInitData();
    return tg ? viaTelegram<Progress>(tg) : call<Progress>("analytics_student", {}, (d) => d.progress);
  },
  topic: (topicKey: string) => {
    const tg = telegramInitData();
    return tg
      ? viaTelegram<TopicProgress>(tg, topicKey)
      : call<TopicProgress>("analytics_student_topic", { p_topic_key: topicKey }, (d) => d.topic(topicKey));
  },
};
