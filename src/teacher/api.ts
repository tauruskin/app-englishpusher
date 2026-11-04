import { supabase, isSupabaseConfigured } from "../shared/supabase.ts";
import { friendlyError } from "./format.ts";
import type { Filters } from "./route.ts";
import type { Me, Overview, Result, RosterRow, StudentDetail, TopicDetail, TopicMatrix } from "./types.ts";

// Dev server only: /teacher/?demo serves fixtures so the layout can be checked without signing in.
export const isDemo: boolean = import.meta.env.DEV && new URLSearchParams(window.location.search).has("demo");

// Loaded lazily and only behind the DEV-only isDemo check, so the fixtures (fake names) are dropped from
// the production bundle: Vite replaces import.meta.env.DEV with false and the import() becomes dead code.
const loadDemo = async () => (await import("./demo.ts")).DEMO;
type Demo = Awaited<ReturnType<typeof loadDemo>>;

async function call<T>(fn: string, args: Record<string, unknown>, demo: (d: Demo) => T): Promise<Result<T>> {
  if (isDemo) return { data: demo(await loadDemo()), error: null };
  if (!isSupabaseConfigured) return { data: null, error: "Analytics are not available right now." };
  // .rpc() sends POST: these functions may create the caller's person row on first use.
  try {
    const { data, error, status } = await supabase.rpc(fn, args);
    if (error) return { data: null, error: friendlyError({ code: error.code, message: error.message, status }) };
    if (data === null || data === undefined) return { data: null, error: friendlyError({}) };
    return { data: data as T, error: null };
  } catch (e) {
    return { data: null, error: friendlyError({ message: e instanceof Error ? e.message : undefined }) };
  }
}

const period = (f: Filters) => ({ p_days: f.days, p_source: f.source });

export const api = {
  me: () => call<Me>("analytics_me", {}, (d) => d.me),
  overview: (f: Filters) => call<Overview>("analytics_teacher_overview", period(f), (d) => d.overview),
  students: (f: Filters) => call<RosterRow[]>("analytics_teacher_students", period(f), (d) => d.students),
  topics: (f: Filters, level: string | null, kind: string | null) =>
    call<TopicMatrix>("analytics_teacher_topics", { ...period(f), p_level: level, p_kind: kind }, (d) => d.topics),
  topic: (topicKey: string, f: Filters) =>
    call<TopicDetail>("analytics_topic_detail", { p_topic_key: topicKey, ...period(f) }, (d) => d.topic),
  student: (personId: string) =>
    call<StudentDetail>("analytics_student_detail", { p_person: personId }, (d) => d.student),
};
