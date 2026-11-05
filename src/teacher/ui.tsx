import { lookup } from "./lookup.ts";
import type { ReactNode } from "react";
import { AlertCircle, ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { BAND_STYLE, band } from "./heat.ts";
import { delta, MASTERY_LABEL, periodLabel, pct, SESSION_EXPIRED, shorten, sourceLabel } from "./format.ts";
import { DAY_OPTIONS, type Filters } from "./route.ts";
import { ANSWER_COLORS, INK, orderSources, sourceColor } from "./theme.ts";
import type { Mastery } from "./types.ts";

export function Card({ title, subtitle, children, right }: { title?: string; subtitle?: string; children: ReactNode; right?: ReactNode }) {
  return (
    <section className="rounded-xl border border-neutral-200 bg-white p-5">
      {(title || right) && (
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            {title && <h2 className="font-display text-base font-bold text-neutral-900">{title}</h2>}
            {subtitle && <p className="font-body text-xs text-neutral-500">{subtitle}</p>}
          </div>
          {right}
        </div>
      )}
      {children}
    </section>
  );
}

// Stat tile: label · value · optional delta vs a named period (up is good for accuracy).
export function StatTile({ label, value, now, before, hint }: { label: string; value: string; now?: number | null; before?: number | null; hint?: string }) {
  const d = now !== undefined && before !== undefined ? delta(now, before) : null;
  const Icon = d?.direction === "up" ? ArrowUpRight : d?.direction === "down" ? ArrowDownRight : Minus;
  const color = d?.direction === "up" ? INK.good : d?.direction === "down" ? INK.bad : INK.muted;
  return (
    <div className="rounded-xl border border-neutral-200 bg-white px-4 py-3">
      <p className="font-body text-xs text-neutral-500">{label}</p>
      <p className="mt-1 font-body text-2xl font-semibold text-neutral-900">{value}</p>
      {d && (
        <p className="mt-0.5 font-body text-xs" style={{ color }}>
          <span className="whitespace-nowrap">
            <Icon size={12} aria-hidden className="mr-1 inline align-[-1px]" />{d.text}
          </span>{" "}
          <span className="text-neutral-400">vs previous period</span>
        </p>
      )}
      {hint && <p className="mt-0.5 font-body text-xs text-neutral-400">{hint}</p>}
    </div>
  );
}

export function StateBox({ error, onRetry, children }: { error?: string | null; onRetry?: () => void; children?: ReactNode }) {
  if (error) {
    return (
      <div role="alert" className="flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-body text-sm text-red-700">
        <span className="flex items-center gap-2"><AlertCircle size={16} aria-hidden /> {error}</span>
        {error === SESSION_EXPIRED ? (
          <a href="/account/" className="rounded-md border border-red-300 px-2 py-1 text-xs hover:bg-red-100">Sign in</a>
        ) : (
          onRetry && <button onClick={onRetry} className="rounded-md border border-red-300 px-2 py-1 text-xs hover:bg-red-100">Retry</button>
        )}
      </div>
    );
  }
  return <p role="status" className="font-body text-sm text-neutral-400">{children}</p>;
}

// While reloading, keep the previous render at reduced opacity (no skeleton, no jump).
export function Dimmed({ when, children }: { when: boolean; children: ReactNode }) {
  return <div className={`transition-opacity ${when ? "opacity-50" : "opacity-100"}`} aria-busy={when}>{children}</div>;
}

export function SourceDots({ sources }: { sources: string[] }) {
  return (
    <span className="inline-flex flex-wrap gap-2">
      {orderSources(sources).map((s) => (
        <span key={s} className="inline-flex items-center gap-1 font-body text-xs text-neutral-600">
          <span className="inline-block h-2 w-2 rounded-full" style={{ background: sourceColor(s) }} aria-hidden />
          {sourceLabel(s)}
        </span>
      ))}
    </span>
  );
}

const MASTERY_BAND: Record<Mastery, keyof typeof BAND_STYLE> = {
  not_enough_data: "none", needs_work: "low", learning: "mid", strong: "high", mastered: "high",
};

export function MasteryBadge({ mastery }: { mastery: Mastery }) {
  const s = BAND_STYLE[lookup(MASTERY_BAND, mastery) ?? "none"];
  return (
    <span className="inline-block rounded-full px-2 py-0.5 font-body text-xs font-semibold" style={{ background: s.bg, color: s.fg }}>
      {lookup(MASTERY_LABEL, mastery) ?? mastery}
    </span>
  );
}

export function AccuracyCell({ accuracy, answers }: { accuracy: number | null; answers?: number }) {
  const s = BAND_STYLE[band(accuracy)];
  return (
    <span
      className="inline-flex min-w-[3rem] justify-center rounded-md px-2 py-0.5 font-body text-xs font-semibold tabular-nums"
      style={{ background: s.bg, color: s.fg }}
      title={answers !== undefined ? `${pct(accuracy)} of ${answers} answers` : undefined}
    >
      {pct(accuracy)}
    </span>
  );
}

// Horizontal bar: 4px rounded end, square at the start, <= 24px thick, value at the tip.
export function BarRow({ label, value, max, href, note }: { label: string; value: number | null; max: number; href?: string; note?: string }) {
  const w = value === null || max <= 0 || !Number.isFinite(value) ? 0 : Math.min(100, Math.max(1, (value / max) * 100));
  const name = href
    ? <a href={href} title={label} className="truncate hover:text-brand hover:underline">{label}</a>
    : <span title={label} className="truncate">{label}</span>;
  return (
    <div className="grid grid-cols-[8rem_1fr_auto] items-center gap-3 py-1.5 font-body text-sm text-neutral-800">
      {name}
      <div className="h-3 rounded-r bg-neutral-100" aria-hidden>
        <div className="h-3 rounded-r" style={{ width: `${w}%`, background: BAND_STYLE[band(value)].bg }} />
      </div>
      <span className="tabular-nums text-neutral-600">{pct(value)}{note && <span className="ml-1 text-xs text-neutral-400">{note}</span>}</span>
    </div>
  );
}

export function FiltersRow({ filters, sources, onChange }: { filters: Filters; sources: string[]; onChange: (f: Filters) => void }) {
  const btn = (active: boolean) =>
    `rounded-md px-3 py-1.5 font-body text-sm transition-colors ${active ? "bg-neutral-900 text-white" : "text-neutral-600 hover:bg-neutral-200/70"}`;
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex rounded-lg bg-neutral-100 p-1" role="group" aria-label="Period">
        {DAY_OPTIONS.map((d) => (
          <button key={String(d)} className={btn(filters.days === d)} aria-pressed={filters.days === d} onClick={() => onChange({ ...filters, days: d })}>
            {d === null ? "All time" : `${d} days`}
          </button>
        ))}
      </div>
      {sources.length > 1 && (
        <div className="flex rounded-lg bg-neutral-100 p-1" role="group" aria-label="Source">
          <button className={btn(filters.source === null)} aria-pressed={filters.source === null} onClick={() => onChange({ ...filters, source: null })}>
            All sources
          </button>
          {orderSources(sources).map((s) => (
            <button key={s} className={btn(filters.source === s)} aria-pressed={filters.source === s} onClick={() => onChange({ ...filters, source: s })}>
              {sourceLabel(s)}
            </button>
          ))}
        </div>
      )}
      <span className="font-body text-xs text-neutral-400">Showing {periodLabel(filters.days)}</span>
    </div>
  );
}

export function BandLegend() {
  return (
    <div className="flex flex-wrap gap-3 font-body text-xs text-neutral-600">
      {(["low", "mid", "high", "none"] as const).map((b) => (
        <span key={b} className="inline-flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm" style={{ background: BAND_STYLE[b].bg }} aria-hidden />
          {BAND_STYLE[b].label}
        </span>
      ))}
    </div>
  );
}

export function MistakeAnswers({ yours, correct, yoursLabel = "Your answer" }: {
  yours?: string | null; correct?: string | null; yoursLabel?: string;
}) {
  if (!yours?.trim() && !correct?.trim()) return null;
  return (
    <div className="mt-0.5 space-y-0.5 break-words text-xs">
      {yours?.trim() ? (
        <div style={{ color: ANSWER_COLORS.wrong }} title={yours}>
          <span aria-hidden>❌ </span>{yoursLabel}: <span className="font-medium">{shorten(yours)}</span>
        </div>
      ) : null}
      {correct?.trim() ? (
        <div style={{ color: ANSWER_COLORS.right }} title={correct}>
          <span aria-hidden>✅ </span>Correct: <span className="font-medium">{shorten(correct)}</span>
        </div>
      ) : null}
    </div>
  );
}
