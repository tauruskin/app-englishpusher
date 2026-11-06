import { rpc, type RpcError } from "./rpc.ts";
import { archiveError, mergeError } from "./format.ts";
import type { Filters } from "./route.ts";
import type {
  ArchivedRow, ArchiveResult, Me, MergeCandidates, MergeResult, MoodleAttempt, Overview, RosterRow, StudentDetail, TopicDetail, TopicMatrix,
} from "./types.ts";

export { isDemo } from "./rpc.ts";

// DEV-only fixtures. In production `import.meta.env.DEV` is the literal false, so this branch and the
// import() of the fake names are removed from the bundle (checked by grepping dist in the final task).
const loadDemo = import.meta.env.DEV ? async () => (await import("./demo.ts")).DEMO : null;
type Demo = typeof import("./demo.ts").DEMO;

function call<T>(fn: string, args: Record<string, unknown>, pick: (d: Demo) => T, errorText?: (e: RpcError) => string) {
  const load = loadDemo; // a local const keeps TypeScript's null check inside the arrow function
  return rpc<T>(fn, args, load && (async () => pick(await load())), errorText);
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
    call<StudentDetail>("analytics_student_detail", { p_person: personId }, (d) => d.studentFor(personId)),
  archived: () => call<ArchivedRow[]>("analytics_teacher_archived", {}, (d) => d.archived),
  setArchived: (personId: string, archived: boolean) =>
    call<ArchiveResult>(
      "analytics_set_archived", { p_person: personId, p_archived: archived }, (d) => d.archiveResult(personId, archived), archiveError,
    ),
  mergeCandidates: (personId: string) =>
    call<MergeCandidates>("analytics_merge_candidates", { p_person: personId }, (d) => d.mergeCandidates(personId)),
  mergeStudents: (keepId: string, dropId: string) =>
    call<MergeResult>(
      "analytics_merge_students", { p_keep: keepId, p_drop: dropId }, (d) => d.mergeResult(keepId, dropId), mergeError,
    ),
  studentMoodleAttempts: (personId: string) =>
    call<MoodleAttempt[]>("analytics_student_moodle_attempts", { p_person: personId }, (d) => d.moodleAttempts),
};
