import type { GrammarLevelId } from "./types.ts";

export type GrammarLevelSlug = "a2" | "a2plus" | "b1" | "b1plus" | "b2plus" | "c1";

export interface GrammarLevel {
  id: GrammarLevelId; // shown to students: "A2+ Grammar"
  slug: GrammarLevelSlug; // URL prefix: /<slug>-grammar/
}

// Every level of the course. Grammar questions have one shape at all levels, so C1 is a normal
// level here (C1 vocabulary has its own pages only because its words use definitions).
export const GRAMMAR_LEVELS: GrammarLevel[] = [
  { id: "A2", slug: "a2" },
  { id: "A2+", slug: "a2plus" },
  { id: "B1", slug: "b1" },
  { id: "B1+", slug: "b1plus" },
  { id: "B2+", slug: "b2plus" },
  { id: "C1", slug: "c1" },
];

export function levelBySlug(slug: string): GrammarLevel {
  const level = GRAMMAR_LEVELS.find((l) => l.slug === slug);
  if (!level) throw new Error(`unknown grammar level slug: ${slug}`);
  return level;
}

export function grammarAppId(level: GrammarLevel): `${GrammarLevelSlug}-grammar` {
  return `${level.slug}-grammar`;
}

export function grammarUrl(level: GrammarLevel, topicId?: string): string {
  const base = `/${level.slug}-grammar/`;
  return topicId ? `${base}?topic=${encodeURIComponent(topicId)}` : base;
}

export function topicsForLevel<T extends { level: GrammarLevelId }>(topics: T[], level: GrammarLevelId): T[] {
  return topics.filter((t) => t.level === level);
}

// A level shows "coming soon" until the teacher publishes its first grammar topic.
export function isGrammarComingSoon(topics: { level: GrammarLevelId }[], level: GrammarLevelId): boolean {
  return topicsForLevel(topics, level).length === 0;
}
