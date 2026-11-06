import type { Attention, WrongAnswer } from "./types.ts";
import { kyivToday } from "./charts/columns.ts";
import { lookup } from "./lookup.ts";

const SOURCE_LABEL: Record<string, string> = {
  bot: "Quiz Bot",
  app: "App",
  moodle: "Moodle",
  grammar: "Grammar site",
};

export function sourceLabel(source: string): string {
  // Unknown names (including chart series such as "answers") fall back to a capitalised form.
  return lookup(SOURCE_LABEL, source) ?? source.charAt(0).toUpperCase() + source.slice(1);
}

/** One-line text, cut to `max` characters with "…" (the full text goes in a title tooltip). */
export function shorten(text: string, max = 80): string {
  const t = text.replace(/\s+/g, " ").trim();
  return t.length <= max ? t : t.slice(0, max - 1).trimEnd() + "…";
}

/** "flied (2), flown (1)" for the teacher's "Most missed" list, or null when nothing was saved. */
export function wrongAnswersText(list: WrongAnswer[] | null | undefined): string | null {
  const parts = (list ?? []).filter((w) => w.answer.trim() !== "").map((w) => `${w.answer.trim()} (${w.count})`);
  return parts.length ? parts.join(", ") : null;
}

export function pct(value: number | null | undefined): string {
  return value === null || value === undefined || !Number.isFinite(value) ? "–" : `${Math.round(value)}%`;
}

/** "60% → 80%": a Moodle first try and the latest score. */
export function moodleRange(first: number | null | undefined, latest: number | null | undefined): string {
  return `${pct(first)} → ${pct(latest)}`;
}

/** Attempts: whole numbers as is, averages with one decimal. */
export function attemptsText(n: number | null | undefined): string {
  if (n === null || n === undefined || !Number.isFinite(n)) return "–";
  return Number.isInteger(n) ? `${n}` : n.toFixed(1);
}

const score = (n: number) => (Number.isInteger(n) ? `${n}` : n.toFixed(1));

/** "8 / 10" for one Moodle attempt (the max may be unknown). */
export function scoreText(raw: number, max: number | null): string {
  return max === null || !Number.isFinite(max) ? score(raw) : `${score(raw)} / ${score(max)}`;
}

export function delta(now: number | null, before: number | null): { text: string; direction: "up" | "down" | "flat" } | null {
  if (now === null || before === null || !Number.isFinite(now) || !Number.isFinite(before)) return null;
  const d = Math.round(now - before);
  if (d === 0) return { text: "±0", direction: "flat" };
  return { text: `${d > 0 ? "+" : "−"}${Math.abs(d)} pts`, direction: d > 0 ? "up" : "down" };
}

// 'b1plus' -> 'B1+'
export function levelLabel(code: string): string {
  return code.toUpperCase().replace("PLUS", "+");
}

export function periodLabel(days: number | null): string {
  return days === null ? "all time" : `last ${days} days`;
}

export function personName(name: string | null | undefined): string {
  return name?.trim() || "Unnamed student";
}

const DAY_MS = 86_400_000;

// Whole Kyiv calendar days between `iso` and `now`; "unknown" for unparseable input.
export function daysAgo(iso: string | null, now: number = Date.now()): string {
  if (!iso) return "never";
  const then = Date.parse(iso);
  if (!Number.isFinite(then) || !Number.isFinite(now)) return "unknown";
  const days = Math.round((Date.parse(kyivToday(new Date(now))) - Date.parse(kyivToday(new Date(then)))) / DAY_MS);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  return `${days} days ago`;
}

function num(v: number | null | undefined): number | null {
  return typeof v === "number" && Number.isFinite(v) ? Math.round(v) : null;
}

export function attentionText(a: Attention): string {
  const name = personName(a.display_name);
  const value = num(a.value);
  const value2 = num(a.value2);
  if (a.type === "inactive") {
    return value === null ? `${name} hasn't practised recently` : `${name} hasn't practised for ${value} days`;
  }
  if (a.type === "dropping") {
    return value === null || value2 === null
      ? `${name}'s accuracy has dropped recently`
      : `${name}'s accuracy fell from ${value2}% to ${value}% in the last 14 days`;
  }
  if (a.type === "hard_lesson") {
    const lesson = a.title || "A Moodle lesson";
    if (value === null) return `${lesson} is hard for the group`;
    return value2 === null
      ? `${lesson} (Moodle): first try ${value}%`
      : `${lesson} (Moodle): first try ${value}% from ${value2} students`;
  }
  const topic = a.title || a.topic_key || "A topic";
  if (value === null) return `${topic} is hard for the group`;
  return value2 === null
    ? `${topic} is hard for the group: ${value}%`
    : `${topic} is hard for the group: ${value}% from ${value2} students`;
}

const SESSION_CODES = new Set(["PGRST301", "PGRST302", "PGRST303"]);
export const SESSION_EXPIRED = "Your session has expired. Please sign in again.";

export function friendlyError(error: { code?: string; message?: string; status?: number }): string {
  if (error.code === "42501") return "You don't have access to this page.";
  if (
    (error.code !== undefined && SESSION_CODES.has(error.code)) ||
    error.status === 401 ||
    /\bJWT\b/i.test(error.message ?? "")
  ) {
    return SESSION_EXPIRED;
  }
  if (error.code === "22023" || error.code === "22P02") return "That student or topic doesn't exist.";
  return "Couldn't load the data. Check your connection and try again.";
}

export const MASTERY_LABEL: Record<string, string> = {
  not_enough_data: "Not enough data",
  needs_work: "Needs work",
  learning: "Learning",
  strong: "Strong",
  mastered: "Mastered",
};
