import type { BySource, DailyRow } from "../types.ts";

export interface StackDatum { key: string; label: string; values: BySource }
export interface Segment { series: string; value: number; y: number; height: number; top: boolean }
export interface Column {
  key: string; label: string; total: number;
  x: number; width: number; slotX: number; slotWidth: number;
  segments: Segment[];
}
export interface ColumnLayout { columns: Column[]; ticks: { value: number; y: number }[]; plotTop: number; plotBottom: number }
export interface Size { width: number; height: number; left: number; bottom: number; top: number }

export const GAP = 2;      // surface gap between stacked segments
export const MAX_BAR = 24; // columns never thicker than this

export function addDays(iso: string, n: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export function dayLabel(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
}

export function kyivToday(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Kyiv", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

// One datum per Kyiv day from (today - days) to today; all time starts at the first day with data.
export function fillDays(daily: DailyRow[], today: string, days: number | null): StackDatum[] {
  const byDay = new Map(daily.map((r) => [r.day, r.by_source]));
  const first = days === null
    ? (daily.length ? [...daily.map((r) => r.day)].sort()[0] : today)
    : addDays(today, -days);
  const out: StackDatum[] = [];
  for (let d = first; d <= today; d = addDays(d, 1)) {
    out.push({ key: d, label: dayLabel(d), values: byDay.get(d) ?? {} });
  }
  return out;
}

export function niceStep(max: number, count = 4): number {
  if (max <= 0) return 1;
  const raw = max / count;
  const exp = Math.pow(10, Math.floor(Math.log10(raw)));
  for (const m of [1, 2, 5, 10]) {
    if (m * exp >= raw) return Math.max(1, m * exp);
  }
  return Math.max(1, 10 * exp);
}

export function layoutColumns(data: StackDatum[], series: string[], size: Size): ColumnLayout {
  const plotTop = size.top;
  const plotBottom = size.height - size.bottom;
  const plotH = plotBottom - plotTop;
  const plotW = size.width - size.left;
  const totals = data.map((d) => series.reduce((sum, s) => sum + (d.values[s] ?? 0), 0));
  const maxTotal = Math.max(0, ...totals);
  const step = niceStep(maxTotal);
  const scaleTop = Math.max(step, Math.ceil(maxTotal / step) * step);

  const ticks: { value: number; y: number }[] = [];
  for (let v = 0; v <= scaleTop; v += step) ticks.push({ value: v, y: plotBottom - (v / scaleTop) * plotH });

  const slot = data.length ? plotW / data.length : plotW;
  const width = Math.max(1, Math.min(MAX_BAR, slot * 0.6));

  const columns = data.map((d, i) => {
    const slotX = size.left + i * slot;
    const x = slotX + (slot - width) / 2;
    const present = series.filter((s) => (d.values[s] ?? 0) > 0);
    let base = plotBottom;
    const segments = present.map((s, j) => {
      const value = d.values[s];
      const h = (value / scaleTop) * plotH;
      const top = j === present.length - 1;
      const yTop = base - h;
      base = yTop;
      return top
        ? { series: s, value, y: yTop, height: h, top }
        : { series: s, value, y: yTop + GAP, height: Math.max(0, h - GAP), top };
    });
    return { key: d.key, label: d.label, total: totals[i], x, width, slotX, slotWidth: slot, segments };
  });

  return { columns, ticks, plotTop, plotBottom };
}

// Rect path with the top two corners rounded; square at the baseline.
export function roundedTopPath(x: number, y: number, w: number, h: number, r: number): string {
  const rr = Math.min(r, w / 2, h);
  return `M${x},${y + h}V${y + rr}Q${x},${y} ${x + rr},${y}H${x + w - rr}Q${x + w},${y} ${x + w},${y + rr}V${y + h}Z`;
}
