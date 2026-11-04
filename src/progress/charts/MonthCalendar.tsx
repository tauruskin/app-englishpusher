import { useState } from "react";
import { dayLabel } from "../../teacher/charts/columns.ts";
import { INTENSITY, intensity, monthGrid, monthLabel, monthStats, recentMonths, windowStart } from "../calendar.ts";
import type { CalendarDay } from "../types.ts";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// One month at a time (this month and the two before: the data covers 90 days).
export function MonthCalendar({ calendar, today }: { calendar: CalendarDay[]; today: string }) {
  const months = recentMonths(today, 3);
  const [index, setIndex] = useState(0);
  const key = months[index];
  const weeks = monthGrid(key, calendar, today, windowStart(today));
  const stats = monthStats(key, calendar);
  const title = monthLabel(key);

  return (
    <div className="mx-auto w-full max-w-xs">
      <div className="mb-2 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIndex(index + 1)}
          disabled={index >= months.length - 1}
          aria-label="Previous month"
          className="rounded-md px-3 py-1 text-neutral-600 hover:bg-neutral-100 disabled:opacity-30"
        >
          ←
        </button>
        <p className="font-display text-sm font-semibold text-neutral-900" aria-live="polite">{title}</p>
        <button
          type="button"
          onClick={() => setIndex(index - 1)}
          disabled={index === 0}
          aria-label="Next month"
          className="rounded-md px-3 py-1 text-neutral-600 hover:bg-neutral-100 disabled:opacity-30"
        >
          →
        </button>
      </div>
      <table className="w-full table-fixed border-separate border-spacing-1" aria-label={`Activity in ${title}`}>
        <thead>
          <tr>
            {WEEKDAYS.map((d) => (
              <th key={d} scope="col" className="font-body text-[11px] font-semibold text-neutral-400">{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, w) => (
            <tr key={w}>
              {week.map((cell, i) => {
                if (!cell) return <td key={i} />;
                // Outside the data window (or after today) there is no count: not "0 activities".
                const text = cell.outside ? "" : `${dayLabel(cell.day)}: ${cell.events} ${cell.events === 1 ? "activity" : "activities"}`;
                const style = INTENSITY[intensity(cell.events)];
                return (
                  <td key={i} className="p-0">
                    <div
                      title={text || undefined}
                      className={`flex aspect-square items-center justify-center rounded-md font-body text-xs tabular-nums ${
                        cell.day === today ? "ring-2 ring-brand" : ""
                      }`}
                      style={cell.outside ? { color: "#c3c2b7" } : { background: style.bg, color: style.fg }}
                    >
                      <span aria-hidden>{cell.date}</span>
                      {text && <span className="sr-only">{text}</span>}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 font-body text-xs text-neutral-500">
        <span>{stats.activeDays} active {stats.activeDays === 1 ? "day" : "days"} · {stats.events} {stats.events === 1 ? "activity" : "activities"}</span>
        <span className="flex items-center gap-1" aria-hidden>
          Less
          {INTENSITY.map((s, i) => <span key={i} className="inline-block h-3 w-3 rounded-sm" style={{ background: s.bg }} />)}
          More
        </span>
      </div>
    </div>
  );
}
