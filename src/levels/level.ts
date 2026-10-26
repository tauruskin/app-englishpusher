import type { LevelConfig, LevelSlug } from "./types.ts";

export type LevelPage = "vocabulary" | "flashcards" | "trivia";

export function pageUrl(level: LevelConfig, page: LevelPage): string {
  return `/${level.slug}-${page}/`;
}

export function flashcardsAppId(level: LevelConfig): `${LevelSlug}-flashcards` {
  return `${level.slug}-flashcards`;
}

export function triviaAppId(level: LevelConfig): `${LevelSlug}-trivia` {
  return `${level.slug}-trivia`;
}

// A level shows "Coming soon" until the teacher publishes its first topic.
export function isComingSoon(level: LevelConfig): boolean {
  return level.topics.length === 0;
}
