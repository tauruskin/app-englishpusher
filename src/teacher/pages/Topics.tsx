import { useState } from "react";
import { api } from "../api.ts";
import { levelLabel, pct, personName } from "../format.ts";
import { BAND_STYLE, band, cellIndex } from "../heat.ts";
import { useData } from "../useData.ts";
import { BandLegend, Card, Dimmed, FiltersRow, StateBox } from "../ui.tsx";
import type { PageProps } from "./types.ts";

const LEVELS = ["a2", "a2plus", "b1", "b1plus", "b2plus", "c1"];
const KINDS: { id: string | null; label: string }[] = [
  { id: null, label: "All" },
  { id: "grammar", label: "Grammar" },
  { id: "vocab", label: "Vocabulary" },
];

export function Topics({ filters, setFilters, href }: PageProps) {
  const [level, setLevel] = useState<string | null>(null);
  const [kind, setKind] = useState<string | null>(null);
  // List page, not one entity: no entityKey, so the previous matrix stays (dimmed) while a filter reloads.
  const { data, error, loading, retry } = useData(
    () => api.topics(filters, level, kind),
    JSON.stringify([filters, level, kind]),
  );
  if (!data) return error ? <StateBox error={error} onRetry={retry} /> : <StateBox>Loading…</StateBox>;
  const cells = cellIndex(data.cells);

  return (
    <div className="space-y-5">
      <FiltersRow filters={filters} sources={data.sources} onChange={setFilters} />
      <div className="flex flex-wrap items-center gap-3 font-body text-sm">
        <label className="flex items-center gap-2 text-neutral-600">
          Level
          <select
            className="rounded-md border border-neutral-300 bg-white px-2 py-1 text-neutral-800"
            value={level ?? ""}
            onChange={(e) => setLevel(e.target.value || null)}
          >
            <option value="">All levels</option>
            {LEVELS.map((l) => <option key={l} value={l}>{levelLabel(l)}</option>)}
          </select>
        </label>
        <div className="flex rounded-lg bg-neutral-100 p-1" role="group" aria-label="Kind">
          {KINDS.map((k) => (
            <button
              key={String(k.id)}
              aria-pressed={kind === k.id}
              onClick={() => setKind(k.id)}
              className={`rounded-md px-3 py-1 transition-colors ${kind === k.id ? "bg-neutral-900 text-white" : "text-neutral-600 hover:bg-neutral-200/70"}`}
            >
              {k.label}
            </button>
          ))}
        </div>
      </div>
      {error && <StateBox error={error} onRetry={retry} />}
      <Dimmed when={loading || !!error}>
        <Card title="Topics × students" subtitle="Accuracy per student and topic; hardest topics first" right={<BandLegend />}>
          {data.topics.length === 0 ? (
            <StateBox>No answers for these filters.</StateBox>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-max border-separate border-spacing-[2px] font-body text-xs">
                <thead>
                  <tr>
                    <th className="sticky left-0 z-10 bg-white"><span className="sr-only">Student</span></th>
                    {data.topics.map((t) => (
                      <th key={t.topic_key} scope="col" className="h-32 w-14 min-w-[3.5rem] align-bottom font-normal">
                        <a
                          href={href({ page: "topic", topicKey: t.topic_key })}
                          className="inline-block max-h-32 -rotate-180 overflow-hidden text-ellipsis whitespace-nowrap text-neutral-700 [writing-mode:vertical-rl] hover:text-brand"
                          title={`${t.title} (${levelLabel(t.level)})`}
                        >
                          {t.title}
                        </a>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" className="sticky left-0 z-10 bg-white pr-3 text-left font-display text-sm font-bold text-neutral-900">Group</th>
                    {data.topics.map((t) => {
                      const s = BAND_STYLE[band(t.accuracy)];
                      return (
                        <td
                          key={t.topic_key}
                          className="h-9 w-14 min-w-[3.5rem] rounded-md text-center font-bold tabular-nums"
                          style={{ background: s.bg, color: s.fg }}
                          title={`${t.title}: ${pct(t.accuracy)} of ${t.answers} answers`}
                        >
                          {pct(t.accuracy)}
                        </td>
                      );
                    })}
                  </tr>
                  {data.students.map((p) => {
                    const name = personName(p.display_name);
                    return (
                      <tr key={p.person_id}>
                        <th scope="row" className="sticky left-0 z-10 bg-white pr-3 text-left font-semibold">
                          <div className="max-w-[10rem] truncate">
                            <a href={href({ page: "student", personId: p.person_id })} title={name} className="text-neutral-800 hover:text-brand hover:underline">
                              {name}
                            </a>
                          </div>
                        </th>
                        {data.topics.map((t) => {
                          const c = cells.get(`${p.person_id}|${t.topic_key}`);
                          const s = BAND_STYLE[band(c?.accuracy ?? null)];
                          const tip = c
                            ? `${name} · ${t.title}: ${pct(c.accuracy)} of ${c.answers} answers`
                            : `${name} · ${t.title}: no data`;
                          return (
                            <td key={t.topic_key} className="h-9 w-14 min-w-[3.5rem] rounded-md text-center tabular-nums" style={{ background: s.bg, color: s.fg }} title={tip}>
                              {c ? pct(c.accuracy) : <span className="sr-only">No data</span>}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </Dimmed>
    </div>
  );
}
