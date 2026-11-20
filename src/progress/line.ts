export interface LinePoint { key: string; label: string; axisLabel?: string; value: number | null; answers?: number }
export interface LineSize { width: number; height: number; left: number; right: number; top: number; bottom: number }
export interface PlacedPoint extends LinePoint { x: number; y: number | null }
export interface LineLayout {
  points: PlacedPoint[];
  paths: string[];                       // one path per run of consecutive values
  ticks: { value: number; y: number }[]; // 0, 50, 100 %
  plotTop: number;
  plotBottom: number;
}

// Accuracy line, 0–100%. A null value (no graded answers that week) breaks the line.
export function lineLayout(points: LinePoint[], size: LineSize): LineLayout {
  const plotTop = size.top;
  const plotBottom = size.height - size.bottom;
  const plotWidth = Math.max(0, size.width - size.left - size.right);
  const yOf = (v: number) => plotBottom - (Math.min(100, Math.max(0, v)) / 100) * (plotBottom - plotTop);
  const step = points.length > 1 ? plotWidth / (points.length - 1) : 0;
  const placed: PlacedPoint[] = points.map((p, i) => ({
    ...p,
    x: size.left + (points.length > 1 ? i * step : plotWidth / 2),
    y: p.value === null || !Number.isFinite(p.value) ? null : yOf(p.value),
  }));
  const paths: string[] = [];
  let run: string[] = [];
  const flush = () => {
    if (run.length > 1) paths.push(run.join(" "));
    run = [];
  };
  for (const p of placed) {
    if (p.y === null) {
      flush();
      continue;
    }
    run.push(`${run.length === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`);
  }
  flush();
  return { points: placed, paths, ticks: [0, 50, 100].map((value) => ({ value, y: yOf(value) })), plotTop, plotBottom };
}
