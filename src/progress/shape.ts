import { lookup } from "../teacher/lookup.ts";
import { orderSources } from "../teacher/theme.ts";
import type { BySource, StudentTopic } from "../teacher/types.ts";
import type { Progress, TopicProgress } from "./types.ts";

// Opens the Quiz Bot. Plan 4 adds a `practice` start payload to the bot and changes only this line.
export const PRACTICE_URL = "https://t.me/Englishpusher_quiz_bot";

export function firstName(name: string | null | undefined): string {
  return name?.trim().split(/\s+/)[0] || "there";
}

export function kyivHour(now: Date = new Date()): number {
  return Number(new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Kyiv", hour: "2-digit", hourCycle: "h23" }).format(now));
}

export function greeting(hour: number): string {
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 18) return "Good afternoon";
  return "Good evening";
}

const usableName = (name: string | null | undefined): string | null => name?.trim().split(/\s+/)[0] || null;

// "Good evening, Anna!", or "Good evening!" when there is no usable display name.
export function greetingLine(hour: number, name: string | null | undefined): string {
  const n = usableName(name);
  return n ? `${greeting(hour)}, ${n}!` : `${greeting(hour)}!`;
}

// "Hi, Anna!", or "Hi!" when there is no usable display name.
export function hiLine(name: string | null | undefined): string {
  const n = usableName(name);
  return n ? `Hi, ${n}!` : "Hi!";
}

const LEVEL_ORDER = ["a2", "a2plus", "b1", "b1plus", "b2", "b2plus", "c1"];
const KIND_ORDER = ["grammar", "vocab"];
const KIND_GROUP: Record<string, string> = { grammar: "Grammar", vocab: "Vocabulary" };
const rank = (list: string[], value: string) => {
  const i = list.indexOf(value);
  return i === -1 ? list.length : i;
};

export interface TopicGroup { kind: string; label: string; topics: StudentTopic[] }

// Mastery map groups: Grammar, then Vocabulary (unknown kinds after); inside, course level order, then title.
export function groupTopics(topics: StudentTopic[]): TopicGroup[] {
  const kinds = [...new Set(topics.map((t) => t.kind))].sort((a, b) => rank(KIND_ORDER, a) - rank(KIND_ORDER, b) || a.localeCompare(b));
  return kinds.map((kind) => ({
    kind,
    label: lookup(KIND_GROUP, kind) ?? kind.charAt(0).toUpperCase() + kind.slice(1),
    topics: topics
      .filter((t) => t.kind === kind)
      .sort((a, b) => rank(LEVEL_ORDER, a.level) - rank(LEVEL_ORDER, b.level) || a.title.localeCompare(b.title, undefined, { numeric: true })),
  }));
}

// tiny: the source was used, but its share rounds to 0% (show "<1%", not "0%").
export interface Share { source: string; count: number; share: number; tiny: boolean }

// Share of all activity per source, in whole percent that always add up to 100
// (largest-remainder rounding; ties go to the bigger source, then to the earlier one).
// Sources with no activity are left out.
export function sourceShares(sources: BySource): Share[] {
  const rows = orderSources(Object.keys(sources))
    .map((source) => ({ source, count: sources[source] ?? 0 }))
    .filter((r) => r.count > 0);
  const total = rows.reduce((n, r) => n + r.count, 0);
  if (total === 0) return [];
  const exact = rows.map((r) => (r.count / total) * 100);
  const shares = exact.map(Math.floor);
  const order = rows
    .map((_, i) => i)
    .sort((a, b) => exact[b] - shares[b] - (exact[a] - shares[a]) || rows[b].count - rows[a].count || a - b);
  const missing = 100 - shares.reduce((n, s) => n + s, 0);
  for (let k = 0; k < missing; k++) shares[order[k]] += 1;
  return rows.map((r, i) => ({ ...r, share: shares[i], tiny: shares[i] === 0 }));
}

// False for a brand-new student: show "get started" instead of empty charts.
export function hasActivity(p: Progress): boolean {
  return (
    p.topics.length > 0 ||
    p.summary.answers > 0 ||
    p.calendar.some((d) => d.events > 0) ||
    Object.values(p.sources).some((n) => n > 0)
  );
}

// analytics_student_topic raises no error for an unknown key; it returns an empty title and no data.
export function topicExists(t: TopicProgress): boolean {
  return t.title !== "" || t.trend.some((w) => w.answers > 0) || t.recent_mistakes.length > 0;
}
