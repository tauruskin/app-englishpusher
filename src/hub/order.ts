export type HubLevel = "A2" | "A2+" | "B1" | "C1";

const A_LEVELS = ["A2", "A2+"] as const;

// Hub order (teacher's rule, 2026-10-26): A-levels with topics come first, easiest first;
// then B1 and C1; A-levels still "Coming soon" go last.
export function hubLevelOrder(live: Record<(typeof A_LEVELS)[number], boolean>): HubLevel[] {
  const liveA = A_LEVELS.filter((l) => live[l]);
  const soonA = A_LEVELS.filter((l) => !live[l]);
  return [...liveA, "B1", "C1", ...soonA];
}

// Stable sort by level position, so cards of one level keep their written order.
export function sortByLevel<T extends { level: HubLevel }>(items: T[], order: HubLevel[]): T[] {
  return [...items].sort((a, b) => order.indexOf(a.level) - order.indexOf(b.level));
}
