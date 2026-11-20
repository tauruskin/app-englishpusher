import type { CalendarDay } from "./types.ts";

const DAY_MS = 86_400_000;

// "2026-11-04" → ["2026-11", "2026-10", "2026-09"] (count months, newest first). Dates are plain
// calendar days (already Kyiv days from the database), so all arithmetic is in UTC.
export function recentMonths(today: string, count = 3): string[] {
  const [y, m] = today.split("-").map(Number);
  return Array.from({ length: count }, (_, i) => new Date(Date.UTC(y, m - 1 - i, 1)).toISOString().slice(0, 7));
}

export function monthLabel(key: string): string {
  const [y, m] = key.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });
}

// First day of the data window: `days` days ending today ("2026-11-04", 90 → "2026-08-07").
export function windowStart(today: string, days = 90): string {
  return new Date(Date.parse(today) - (days - 1) * DAY_MS).toISOString().slice(0, 10);
}

// outside: no data exists for this day (before the data window or after today), so it is not "0 activities".
export interface DayCell { day: string; date: number; events: number; future: boolean; outside: boolean }

// Weeks of 7 cells, Monday first; null pads the first and last week.
export function monthGrid(key: string, calendar: CalendarDay[], today: string, firstDay: string = windowStart(today)): (DayCell | null)[][] {
  const [y, m] = key.split("-").map(Number);
  const first = Date.UTC(y, m - 1, 1);
  const length = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const offset = (new Date(first).getUTCDay() + 6) % 7;
  const events = new Map(calendar.map((c) => [c.day, c.events]));
  const cells: (DayCell | null)[] = Array.from({ length: offset }, () => null);
  for (let d = 1; d <= length; d++) {
    const day = new Date(first + (d - 1) * DAY_MS).toISOString().slice(0, 10);
    cells.push({ day, date: d, events: events.get(day) ?? 0, future: day > today, outside: day < firstDay || day > today });
  }
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks: (DayCell | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export function intensity(events: number): 0 | 1 | 2 | 3 | 4 {
  if (events >= 20) return 4;
  if (events >= 10) return 3;
  if (events >= 5) return 2;
  if (events >= 1) return 1;
  return 0;
}

// Single-hue neutral ramp (activity from every platform together, so no source colour).
export const INTENSITY: { bg: string; fg: string }[] = [
  { bg: "#f0efec", fg: "#898781" },
  { bg: "#d1d5db", fg: "#0b0b0b" },
  { bg: "#9ca3af", fg: "#0b0b0b" },
  { bg: "#6b7280", fg: "#ffffff" },
  { bg: "#374151", fg: "#ffffff" },
];

export function monthStats(key: string, calendar: CalendarDay[]): { activeDays: number; events: number } {
  const rows = calendar.filter((c) => c.day.startsWith(`${key}-`) && c.events > 0);
  return { activeDays: rows.length, events: rows.reduce((n, c) => n + c.events, 0) };
}
