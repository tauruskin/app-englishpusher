import type { MatrixTopic, MoodleMatrix, MoodleMatrixTopic } from "./types.ts";

/** One heatmap column: a topic with Bot/App numbers (null when Moodle-only) and Moodle numbers (null when none). */
export interface MatrixColumn {
  topic_key: string; title: string; kind: string; level: string;
  answers: number | null; accuracy: number | null; moodle: MoodleMatrixTopic | null;
}

// Bot/App topics keep their order (hardest first); Moodle-only topics follow, lowest first try first
// (unknown first try last), then by title.
export function matrixColumns(topics: MatrixTopic[], moodle: MoodleMatrix | null | undefined): MatrixColumn[] {
  const byKey = new Map((moodle?.topics ?? []).map((m) => [m.topic_key, m]));
  const cols: MatrixColumn[] = topics.map((t) => ({ ...t, moodle: byKey.get(t.topic_key) ?? null }));
  const known = new Set(topics.map((t) => t.topic_key));
  const extra = (moodle?.topics ?? [])
    .filter((m) => !known.has(m.topic_key))
    .sort((a, b) => (a.first_try ?? 101) - (b.first_try ?? 101) || a.title.localeCompare(b.title));
  for (const m of extra) {
    cols.push({ topic_key: m.topic_key, title: m.title, kind: m.kind, level: m.level, answers: null, accuracy: null, moodle: m });
  }
  return cols;
}
