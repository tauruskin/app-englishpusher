import { lookup } from "./lookup.ts";

// Colors follow the entity, never its rank (dataviz). Slots 1-4 of the reference palette.
const SOURCE_ORDER = ["bot", "app", "moodle", "grammar"];
const SOURCE_COLOR: Record<string, string> = {
  bot: "#2a78d6",
  app: "#eb6834",
  moodle: "#1baf7a",
  grammar: "#eda100",
};

export const INK = {
  primary: "#0b0b0b",
  secondary: "#52514e",
  muted: "#898781",
  grid: "#e1e0d9",
  axis: "#c3c2b7",
  surface: "#fcfcfb",
  good: "#006300",
  bad: "#d03b3b",
};

export function sourceColor(source: string): string {
  return lookup(SOURCE_COLOR, source) ?? INK.muted;
}

export function orderSources(sources: string[]): string[] {
  const known = SOURCE_ORDER.filter((s) => sources.includes(s));
  const rest = sources.filter((s) => !SOURCE_ORDER.includes(s)).sort();
  return [...known, ...rest];
}
