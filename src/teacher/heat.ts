import type { MatrixCell } from "./types.ts";

export type Band = "none" | "low" | "mid" | "high";

// Mirrors analytics.settings: mastery_learning_pct = 60, mastery_strong_pct = 80.
const MID = 60;
const HIGH = 80;

export function band(accuracy: number | null): Band {
  if (accuracy === null) return "none";
  if (accuracy >= HIGH) return "high";
  if (accuracy >= MID) return "mid";
  return "low";
}

// Status palette (dataviz reference): the printed number/label always accompanies the fill.
export const BAND_STYLE: Record<Band, { bg: string; fg: string; label: string }> = {
  none: { bg: "#f0efec", fg: "#898781", label: "No data" },
  low: { bg: "#d03b3b", fg: "#ffffff", label: "Below 60%" },
  mid: { bg: "#fab219", fg: "#0b0b0b", label: "60–79%" },
  high: { bg: "#0ca30c", fg: "#ffffff", label: "80% and up" },
};

export function cellIndex(cells: MatrixCell[]): Map<string, MatrixCell> {
  return new Map(cells.map((c) => [`${c.person_id}|${c.topic_key}`, c]));
}
