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

export function grammarFlashcardsAppId(level: GrammarLevel): `${GrammarLevelSlug}-grammar-flashcards` {
  return `${level.slug}-grammar-flashcards`;
}

export function grammarFlashcardsUrl(level: GrammarLevel, topicId?: string): string {
  const base = `/${level.slug}-grammar-flashcards/`;
  return topicId ? `${base}?topic=${encodeURIComponent(topicId)}` : base;
}

/** The grammar test topic list (target of the level page's Grammar Test card). */
export function grammarTopicsUrl(level: GrammarLevel): string {
  return `/${level.slug}-grammar/?view=topics`;
}

export type GrammarView = { kind: "level" } | { kind: "topics" } | { kind: "test"; topicId: string };

/** What /<level>-grammar/ shows: ?topic=<known id> = the test (old links keep working), an unknown
 *  ?topic or ?view=topics = the topic list, nothing = the level page. */
export function grammarView(search: string, topicIds: string[]): GrammarView {
  const params = new URLSearchParams(search);
  const topic = params.get("topic");
  if (topic !== null) return topicIds.includes(topic) ? { kind: "test", topicId: topic } : { kind: "topics" };
  return params.get("view") === "topics" ? { kind: "topics" } : { kind: "level" };
}

export function topicsForLevel<T extends { level: GrammarLevelId }>(topics: T[], level: GrammarLevelId): T[] {
  return topics.filter((t) => t.level === level);
}

// A level shows "coming soon" until the teacher publishes its first grammar topic.
export function isGrammarComingSoon(topics: { level: GrammarLevelId }[], level: GrammarLevelId): boolean {
  return topicsForLevel(topics, level).length === 0;
}

// Levels that have at least one grammar topic, in course order. vite.config.ts runs this over the topic
// registry at build time, so the hub's Grammar card switches on when a level's first topic is published.
export function liveGrammarLevels(topics: { level: GrammarLevelId }[]): GrammarLevelId[] {
  return GRAMMAR_LEVELS.map((l) => l.id).filter((id) => topics.some((t) => t.level === id));
}
