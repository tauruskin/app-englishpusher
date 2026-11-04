import type { Attention } from "./types.ts";

const SOURCE_LABEL: Record<string, string> = {
  bot: "Quiz Bot",
  app: "App",
  moodle: "Moodle",
  grammar: "Grammar site",
};

export function sourceLabel(source: string): string {
  return SOURCE_LABEL[source] ?? source;
}

export function pct(value: number | null | undefined): string {
  return value === null || value === undefined ? "–" : `${value}%`;
}

export function delta(now: number | null, before: number | null): { text: string; direction: "up" | "down" | "flat" } | null {
  if (now === null || before === null) return null;
  const d = now - before;
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

export function daysAgo(iso: string | null, now: number = Date.now()): string {
  if (!iso) return "never";
  const days = Math.floor((now - Date.parse(iso)) / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  return `${days} days ago`;
}

export function attentionText(a: Attention): string {
  const name = personName(a.display_name);
  if (a.type === "inactive") return `${name} hasn't practised for ${a.value} days`;
  if (a.type === "dropping") return `${name}'s accuracy fell from ${a.value2}% to ${a.value}% in the last 14 days`;
  return `${a.title ?? a.topic_key} is hard for the group: ${a.value}% from ${a.value2} students`;
}

export function friendlyError(error: { code?: string; message?: string }): string {
  if (error.code === "42501") return "You don't have access to this page.";
  if (error.code === "22023") return "That student or topic doesn't exist.";
  return "Couldn't load the data. Check your connection and try again.";
}

export const MASTERY_LABEL: Record<string, string> = {
  not_enough_data: "Not enough data",
  needs_work: "Needs work",
  learning: "Learning",
  strong: "Strong",
  mastered: "Mastered",
};
