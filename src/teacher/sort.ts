export type SortDir = "asc" | "desc";

// Stable sort; null/undefined values always go last, whatever the direction.
export function sortRows<T>(rows: T[], get: (row: T) => string | number | null | undefined, dir: SortDir): T[] {
  return [...rows].sort((a, b) => {
    const x = get(a);
    const y = get(b);
    const xn = x === null || x === undefined;
    const yn = y === null || y === undefined;
    if (xn && yn) return 0;
    if (xn) return 1;
    if (yn) return -1;
    const c = typeof x === "number" && typeof y === "number"
      ? x - y
      : String(x).localeCompare(String(y), "en", { sensitivity: "base" });
    return dir === "asc" ? c : -c;
  });
}
