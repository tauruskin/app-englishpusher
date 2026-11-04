import { useLayoutEffect, useRef, useState } from "react";
import { axisLabelPlacement } from "../../teacher/charts/columns.ts";
import { pct } from "../../teacher/format.ts";
import { INK } from "../../teacher/theme.ts";
import { lineLayout, type LinePoint } from "../line.ts";

const SIZE = { left: 40, right: 12, top: 10, bottom: 24 };
// One series (every platform together): neutral ink, no legend.
const LINE_INK = "#4b5563";

function readout(p: LinePoint): string {
  const answers = p.answers === undefined ? "" : ` (${p.answers} ${p.answers === 1 ? "answer" : "answers"})`;
  return `${p.label}: ${pct(p.value)}${answers}`;
}

// Accuracy per week. Hover or focus a point for its value; "Show as table" lists every week.
export function LineChart({ points, label, height = 150 }: { points: LinePoint[]; label: string; height?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(480);
  const [active, setActive] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(Math.max(240, el.clientWidth)));
    ro.observe(el);
    setWidth(Math.max(240, el.clientWidth));
    return () => ro.disconnect();
  }, []);

  const layout = lineLayout(points, { width, height, ...SIZE });
  const every = Math.max(1, Math.ceil(points.length / Math.max(1, Math.floor(width / 64))));
  const shown = active !== null ? layout.points[active] : null;
  const hasAnswers = points.some((p) => p.answers !== undefined);

  return (
    <div ref={ref} className="w-full">
      <svg width={width} height={height} role="group" aria-label={label} className="block">
        {layout.ticks.map((t) => (
          <g key={t.value}>
            <line x1={SIZE.left} x2={width - SIZE.right} y1={t.y} y2={t.y} stroke={t.value === 0 ? INK.axis : INK.grid} />
            <text x={SIZE.left - 6} y={t.y + 4} textAnchor="end" fontSize={11} fill={INK.muted} className="tabular-nums">{t.value}%</text>
          </g>
        ))}
        {layout.paths.map((d, i) => (
          <path key={i} d={d} fill="none" stroke={LINE_INK} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        ))}
        {layout.points.map((p, i) => {
          const text = p.axisLabel ?? p.label;
          const place = axisLabelPlacement(p.x, text, width);
          return (
            <g key={p.key}>
              {i % every === 0 && (
                <text x={place.x} y={height - 6} textAnchor={place.anchor} fontSize={11} fill={INK.muted}>{text}</text>
              )}
              {p.y !== null && (
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={active === i ? 5 : 3.5}
                  fill={LINE_INK}
                  stroke="#ffffff"
                  strokeWidth={1.5}
                  tabIndex={0}
                  role="img"
                  aria-label={readout(p)}
                  onPointerEnter={() => setActive(i)}
                  onPointerLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  className="outline-none"
                />
              )}
            </g>
          );
        })}
      </svg>
      <p className="h-5 font-body text-xs text-neutral-600" aria-live="polite">{shown ? readout(shown) : ""}</p>
      <details className="mt-1 font-body text-xs text-neutral-500">
        <summary className="cursor-pointer">Show as table</summary>
        <table className="mt-2 w-full text-left">
          <thead>
            <tr className="border-b border-neutral-200">
              <th scope="col" className="py-1 pr-3 font-semibold">Week</th>
              <th scope="col" className="py-1 pr-3 text-right font-semibold">Accuracy</th>
              {hasAnswers && <th scope="col" className="py-1 text-right font-semibold">Answers</th>}
            </tr>
          </thead>
          <tbody>
            {points.map((p) => (
              <tr key={p.key} className="border-b border-neutral-100">
                <td className="py-1 pr-3">{p.label}</td>
                <td className="py-1 pr-3 text-right tabular-nums">{pct(p.value)}</td>
                {hasAnswers && <td className="py-1 text-right tabular-nums">{p.answers ?? "–"}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}
