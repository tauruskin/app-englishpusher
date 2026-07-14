import { supabase, isSupabaseConfigured } from "./supabase.ts";

// ---------------------------------------------------------------------------
// Data access for student progress, saved words, and study events.
//
// Contract (specs/001-student-accounts/contracts/client-api.md):
//   - writes are fire-and-forget: resolve to an error string or null,
//     NEVER throw, NEVER block the UI
//   - everything no-ops / returns empty without a session or configuration
//   - word/topic content lives in the apps' data.ts; only references stored
// ---------------------------------------------------------------------------

export type AppId = "b1-trivia" | "c1-trivia" | "b1-flashcards" | "c1-flashcards";
export type Level = "B1" | "C1";

export interface SavedWord {
  word: string;
  level: Level;
  topicId: string;
  source: "flashcards" | "trivia";
}

export interface TriviaResultInput {
  app: AppId;
  topicId: string;
  scorePct: number;
  correctWords: string[];
  missedWords: string[];
}

export interface TriviaResultRow {
  app: AppId;
  topicId: string;
  scorePct: number;
  correctWords: string[];
  missedWords: string[];
  createdAt: string;
}

export interface WeakWord {
  word: string;
  topicId: string;
  app: AppId;
}

export interface StudyEventRow {
  app: AppId;
  topicId: string;
  createdAt: string;
}

const SAVE_ERROR = "Couldn't save — check your connection.";

async function userId(): Promise<string | null> {
  if (!isSupabaseConfigured) return null;
  const { data } = await supabase.auth.getSession();
  return data.session?.user.id ?? null;
}

export async function saveTriviaResult(input: TriviaResultInput): Promise<string | null> {
  try {
    const uid = await userId();
    if (!uid) return null; // guest — silently skip
    const { error } = await supabase.from("trivia_results").insert({
      user_id: uid,
      app: input.app,
      topic_id: input.topicId,
      score_pct: Math.round(input.scorePct),
      correct_words: input.correctWords,
      missed_words: input.missedWords,
    });
    return error ? SAVE_ERROR : null;
  } catch {
    return SAVE_ERROR;
  }
}

export async function logStudyEvent(app: AppId, topicId: string): Promise<string | null> {
  try {
    const uid = await userId();
    if (!uid) return null;
    const { error } = await supabase.from("study_events").insert({
      user_id: uid,
      app,
      topic_id: topicId,
    });
    return error ? SAVE_ERROR : null;
  } catch {
    return SAVE_ERROR;
  }
}

export async function saveWord(w: SavedWord): Promise<string | null> {
  try {
    const uid = await userId();
    if (!uid) return null;
    // Upsert on the (user_id, word, level) unique constraint — first save wins.
    const { error } = await supabase.from("saved_words").upsert(
      {
        user_id: uid,
        word: w.word,
        level: w.level,
        topic_id: w.topicId,
        source: w.source,
      },
      { onConflict: "user_id,word,level", ignoreDuplicates: true },
    );
    return error ? SAVE_ERROR : null;
  } catch {
    return SAVE_ERROR;
  }
}

export async function unsaveWord(word: string, level: Level): Promise<string | null> {
  try {
    const uid = await userId();
    if (!uid) return null;
    const { error } = await supabase
      .from("saved_words")
      .delete()
      .eq("user_id", uid)
      .eq("word", word)
      .eq("level", level);
    return error ? SAVE_ERROR : null;
  } catch {
    return SAVE_ERROR;
  }
}

export async function listSavedWords(level?: Level): Promise<SavedWord[]> {
  try {
    const uid = await userId();
    if (!uid) return [];
    let query = supabase
      .from("saved_words")
      .select("word, level, topic_id, source")
      .order("created_at", { ascending: false });
    if (level) query = query.eq("level", level);
    const { data, error } = await query;
    if (error || !data) return [];
    return data.map((r) => ({
      word: r.word as string,
      level: r.level as Level,
      topicId: r.topic_id as string,
      source: r.source as "flashcards" | "trivia",
    }));
  } catch {
    return [];
  }
}

export async function fetchProgress(): Promise<{
  results: TriviaResultRow[];
  weakWords: WeakWord[];
  recentStudy: StudyEventRow[];
}> {
  const empty = { results: [], weakWords: [], recentStudy: [] };
  try {
    const uid = await userId();
    if (!uid) return empty;

    const [resultsRes, eventsRes] = await Promise.all([
      supabase
        .from("trivia_results")
        .select("app, topic_id, score_pct, correct_words, missed_words, created_at")
        .order("created_at", { ascending: false }),
      supabase
        .from("study_events")
        .select("app, topic_id, created_at")
        .order("created_at", { ascending: false })
        .limit(20),
    ]);

    const results: TriviaResultRow[] = (resultsRes.data ?? []).map((r) => ({
      app: r.app as AppId,
      topicId: r.topic_id as string,
      scorePct: r.score_pct as number,
      correctWords: (r.correct_words as string[]) ?? [],
      missedWords: (r.missed_words as string[]) ?? [],
      createdAt: r.created_at as string,
    }));

    // Weak word rule: walking results newest → oldest, the FIRST occurrence
    // of each word decides — in missed_words ⇒ weak, in correct_words ⇒ not.
    const seen = new Set<string>();
    const weakWords: WeakWord[] = [];
    for (const r of results) {
      for (const word of r.missedWords) {
        const key = `${r.app}::${word}`;
        if (!seen.has(key)) {
          seen.add(key);
          weakWords.push({ word, topicId: r.topicId, app: r.app });
        }
      }
      for (const word of r.correctWords) {
        seen.add(`${r.app}::${word}`);
      }
    }

    const recentStudy: StudyEventRow[] = (eventsRes.data ?? []).map((e) => ({
      app: e.app as AppId,
      topicId: e.topic_id as string,
      createdAt: e.created_at as string,
    }));

    return { results, weakWords, recentStudy };
  } catch {
    return empty;
  }
}
