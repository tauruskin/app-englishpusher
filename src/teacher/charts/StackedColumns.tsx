import { useLayoutEffect, useRef, useState } from "react";
import { layoutColumns, roundedTopPath, type StackDatum } from "./columns.ts";
import { INK, orderSources, sourceColor } from "../theme.ts";
import { sourceLabel } from "../format.ts";

const SIZE = { left: 36, bottom: 24, top: 8 };

// Stacked columns per day (or week). Hover or focus a column for the readout; table view below.
// `color` defaults to the fixed source colors; single-series charts pass their own.
export function StackedColumns({ data, series, height = 220, unit, label, color = sourceColor }: {
  data: StackDatum[]; series: string[]; height?: number; unit: string; label: string;
  color?: (series: string) => string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(640);
  const [hover, setHover] = useState<number | null>(null);
  const ordered = orderSources(series);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(Math.max(240, el.clientWidth)));
    ro.observe(el);
    setWidth(Math.max(240, el.clientWidth));
    return () => ro.disconnect();
  }, []);

  const layout = layoutColumns(data, ordered, { width, height, ...SIZE });
  const every = Math.max(1, Math.ceil(data.length / 6));
  const hovered = hover === null ? null : layout.columns[hover];

  return (
    <div>
      <div ref={ref} className="relative">
        <svg width={width} height={height} role="img" aria-label={label}>
          {layout.ticks.map((t) => (
            <g key={t.value}>
              <line x1={SIZE.left} x2={width} y1={t.y} y2={t.y} stroke={t.value === 0 ? INK.axis : INK.grid} strokeWidth={1} />
              <text x={SIZE.left - 6} y={t.y + 4} textAnchor="end" fontSize={11} fill={INK.muted} style={{ fontVariantNumeric: "tabular-nums" }}>
                {t.value}
              </text>
            </g>
          ))}
          {layout.columns.map((c, i) => (
            <g key={c.key} opacity={hover === null || hover === i ? 1 : 0.55}>
              {c.segments.map((s) =>
                s.top ? (
                  <path key={s.series} d={roundedTopPath(c.x, s.y, c.width, s.height, 4)} fill={color(s.series)} />
                ) : (
                  <rect key={s.series} x={c.x} y={s.y} width={c.width} height={s.height} fill={color(s.series)} />
                ),
              )}
              {i % every === 0 && (
                <text x={c.x + c.width / 2} y={height - 6} textAnchor="middle" fontSize={11} fill={INK.muted}>{c.label}</text>
              )}
              <rect
                x={c.slotX} y={layout.plotTop} width={c.slotWidth} height={layout.plotBottom - layout.plotTop}
                fill="transparent" tabIndex={0} aria-label={`${c.label}: ${c.total} ${unit}`}
                onPointerEnter={() => setHover(i)} onPointerLeave={() => setHover(null)}
                onFocus={() => setHover(i)} onBlur={() => setHover(null)}
              />
            </g>
          ))}
        </svg>
        {hovered && (
          <div
            className="pointer-events-none absolute top-0 z-10 rounded-lg border border-neutral-200 bg-white px-3 py-2 font-body text-xs shadow-md"
            style={{ left: Math.min(Math.max(0, hovered.x - 60), width - 150) }}
          >
            <p className="mb-1 text-neutral-500">{hovered.label}</p>
            {ordered.map((s) => (
              <p key={s} className="flex items-center gap-2">
                <span className="inline-block h-0.5 w-3" style={{ background: color(s) }} aria-hidden />
                <span className="font-semibold tabular-nums text-neutral-900">{data[hover!].values[s] ?? 0}</span>
                <span className="text-neutral-500">{sourceLabel(s)}</span>
              </p>
            ))}
          </div>
        )}
      </div>
      {ordered.length >= 2 && (
        <div className="mt-2 flex gap-4 font-body text-xs text-neutral-600">
          {ordered.map((s) => (
            <span key={s} className="inline-flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 rounded-sm" style={{ background: color(s) }} aria-hidden />
              {sourceLabel(s)}
            </span>
          ))}
        </div>
      )}
      <details className="mt-2 font-body text-xs text-neutral-500">
        <summary className="cursor-pointer hover:text-neutral-800">Show as table</summary>
        <table className="mt-2 w-full text-left tabular-nums">
          <thead><tr><th className="py-1 pr-3">Date</th>{ordered.map((s) => <th key={s} className="py-1 pr-3">{sourceLabel(s)}</th>)}</tr></thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.key} className="border-t border-neutral-100">
                <td className="py-1 pr-3">{d.label}</td>
                {ordered.map((s) => <td key={s} className="py-1 pr-3">{d.values[s] ?? 0}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}
