import { rpc } from "../teacher/rpc.ts";
import { progressError } from "./errors.ts";
import type { Progress, TopicProgress } from "./types.ts";

// DEV-only fixtures; in production `import.meta.env.DEV` is the literal false and this is removed.
const loadDemo = import.meta.env.DEV ? async () => (await import("./demo.ts")).PROGRESS_DEMO : null;
type Demo = typeof import("./demo.ts").PROGRESS_DEMO;

function call<T>(fn: string, args: Record<string, unknown>, pick: (d: Demo) => T) {
  const load = loadDemo;
  return rpc<T>(fn, args, load && (async () => pick(await load())), progressError);
}

// The only data access of the page. Plan 4 (Telegram Mini App) adds a second source here.
export const progressApi = {
  me: () => call<Progress>("analytics_student", {}, (d) => d.progress),
  topic: (topicKey: string) =>
    call<TopicProgress>("analytics_student_topic", { p_topic_key: topicKey }, (d) => d.topic(topicKey)),
};
