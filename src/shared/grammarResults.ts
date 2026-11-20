import type { GrammarAppId } from "./progress.ts";

// Pure helper kept apart from progress.ts so node tests can import it without the Supabase client.

/** One finished grammar session, summarised for "My progress". */
export interface GrammarSessionResult {
  app: GrammarAppId;
  topicId: string;
  scorePct: number;
  createdAt: string;
}

/**
 * Turns answered-question rows into one result per session (percentage correct, time of the last
 * answer). Newest first; ties are ordered by session id so the order is stable.
 */
export function grammarSessionResults(
  rows: { app: GrammarAppId; topic_id: string; session_id: string; correct: boolean; created_at: string }[],
): GrammarSessionResult[] {
  const bySession = new Map<string, { app: GrammarAppId; topicId: string; correct: number; total: number; createdAt: string }>();
  for (const r of rows) {
    const s = bySession.get(r.session_id);
    if (s) {
      s.total += 1;
      if (r.correct) s.correct += 1;
      if (r.created_at > s.createdAt) s.createdAt = r.created_at;
    } else {
      bySession.set(r.session_id, {
        app: r.app, topicId: r.topic_id, correct: r.correct ? 1 : 0, total: 1, createdAt: r.created_at,
      });
    }
  }
  return [...bySession.entries()]
    .sort(([idA, a], [idB, b]) =>
      a.createdAt === b.createdAt ? (idA < idB ? -1 : idA > idB ? 1 : 0) : a.createdAt < b.createdAt ? 1 : -1)
    .map(([, s]) => ({
      app: s.app,
      topicId: s.topicId,
      scorePct: Math.round((100 * s.correct) / s.total),
      createdAt: s.createdAt,
    }));
}
