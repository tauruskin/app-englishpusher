export type HubLevel = "A2" | "A2+" | "B1" | "B1+" | "B2+" | "C1";

const ALL_LEVELS: HubLevel[] = ["A2", "A2+", "B1", "B1+", "B2+", "C1"];
// Levels that can still be "Coming soon"; B1 and C1 always have topics.
type NewLevel = "A2" | "A2+" | "B1+" | "B2+";

// Hub order (teacher's rule, 2026-10-26; B1+ added 2026-10-29, B2+ 2026-10-30): levels with topics come first,
// easiest first (A2, A2+, B1, B1+, B2+, C1); levels still "Coming soon" go last.
export function hubLevelOrder(live: Record<NewLevel, boolean>): HubLevel[] {
  const isLive = (l: HubLevel) => (l in live ? live[l as NewLevel] : true);
  return [...ALL_LEVELS.filter(isLive), ...ALL_LEVELS.filter((l) => !isLive(l))];
}

// Stable sort by level position, so cards of one level keep their written order.
export function sortByLevel<T extends { level: HubLevel }>(items: T[], order: HubLevel[]): T[] {
  return [...items].sort((a, b) => order.indexOf(a.level) - order.indexOf(b.level));
}
