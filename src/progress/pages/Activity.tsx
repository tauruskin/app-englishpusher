import { kyivToday } from "../../teacher/charts/columns.ts";
import { sourceLabel } from "../../teacher/format.ts";
import { sourceColor } from "../../teacher/theme.ts";
import { Card, StatTile } from "../../teacher/ui.tsx";
import { MonthCalendar } from "../charts/MonthCalendar.tsx";
import { sourceShares } from "../shape.ts";
import type { Progress } from "../types.ts";

export function Activity({ data }: { data: Progress }) {
  const s = data.summary;
  const today = kyivToday();
  const shares = sourceShares(data.sources);

  return (
    <Card title="Activity" subtitle="Last 3 months, every platform">
      <MonthCalendar calendar={data.calendar} today={today} />
      <div className="mt-4 grid grid-cols-2 gap-3">
        <StatTile label="Active days this month" value={`${s.active_days_month}`} />
        <StatTile label="Answers (30 days)" value={`${s.answers}`} />
      </div>
      {shares.length >= 2 && (
        <div className="mt-4">
          <h3 className="mb-2 font-display text-sm font-semibold text-neutral-700">Where you practise</h3>
          {shares.map((r) => (
            <div key={r.source} className="grid grid-cols-[6rem_1fr_3rem] items-center gap-3 py-1 font-body text-sm text-neutral-800">
              <span>{sourceLabel(r.source)}</span>
              <div className="h-3 rounded-r bg-neutral-100" aria-hidden>
                <div className="h-3 rounded-r" style={{ width: `${Math.max(1, r.share)}%`, background: sourceColor(r.source) }} />
              </div>
              <span className="text-right tabular-nums text-neutral-600">{r.tiny ? "<1%" : `${r.share}%`}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
