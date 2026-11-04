import { supabase, isSupabaseConfigured } from "../shared/supabase.ts";
import { DEMO } from "./demo.ts";
import { friendlyError } from "./format.ts";
import type { Filters } from "./route.ts";
import type { Me, Overview, Result, RosterRow, StudentDetail, TopicDetail, TopicMatrix } from "./types.ts";

// Dev server only: /teacher/?demo serves fixtures so the layout can be checked without signing in.
export const isDemo: boolean = import.meta.env.DEV && new URLSearchParams(window.location.search).has("demo");

async function call<T>(fn: string, args: Record<string, unknown>, demo: T): Promise<Result<T>> {
  if (isDemo) return { data: demo, error: null };
  if (!isSupabaseConfigured) return { data: null, error: "Analytics are not available right now." };
  // .rpc() sends POST: these functions may create the caller's person row on first use.
  const { data, error } = await supabase.rpc(fn, args);
  if (error) return { data: null, error: friendlyError(error) };
  return { data: data as T, error: null };
}

const period = (f: Filters) => ({ p_days: f.days, p_source: f.source });

export const api = {
  me: () => call<Me>("analytics_me", {}, DEMO.me),
  overview: (f: Filters) => call<Overview>("analytics_teacher_overview", period(f), DEMO.overview),
  students: (f: Filters) => call<RosterRow[]>("analytics_teacher_students", period(f), DEMO.students),
  topics: (f: Filters, level: string | null, kind: string | null) =>
    call<TopicMatrix>("analytics_teacher_topics", { ...period(f), p_level: level, p_kind: kind }, DEMO.topics),
  topic: (topicKey: string, f: Filters) =>
    call<TopicDetail>("analytics_topic_detail", { p_topic_key: topicKey, ...period(f) }, DEMO.topic),
  student: (personId: string) => call<StudentDetail>("analytics_student_detail", { p_person: personId }, DEMO.student),
};
