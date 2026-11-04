import { useRef, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { api } from "../api.ts";
import { daysAgo, delta, personName } from "../format.ts";
import { sortRows, type SortDir } from "../sort.ts";
import { useData } from "../useData.ts";
import { AccuracyCell, Card, Dimmed, FiltersRow, SourceDots, StateBox } from "../ui.tsx";
import type { RosterRow } from "../types.ts";
import type { PageProps } from "./types.ts";

type Key = "name" | "accuracy" | "answers" | "last_active";
const GET: Record<Key, (r: RosterRow) => string | number | null> = {
  name: (r) => personName(r.display_name),
  accuracy: (r) => r.accuracy,
  answers: (r) => r.answers,
  last_active: (r) => {
    const t = r.last_active ? Date.parse(r.last_active) : NaN;
    return Number.isFinite(t) ? t : null;
  },
};

export function Students({ filters, setFilters, href }: PageProps) {
  const { data, error, loading, retry } = useData(() => api.students(filters), JSON.stringify(filters));
  const [sort, setSort] = useState<{ key: Key; dir: SortDir }>({ key: "accuracy", dir: "asc" });
  // The roster has no separate source list. Remember every source seen so the source
  // filter stays available after choosing one (a filtered roster only lists that source).
  const seen = useRef(new Set<string>());
  if (!data) return error ? <StateBox error={error} onRetry={retry} /> : <StateBox>Loading…</StateBox>;

  for (const r of data) for (const s of r.sources) seen.current.add(s);
  if (filters.source) seen.current.add(filters.source);
  const sources = [...seen.current];
  const rows = sortRows(data, GET[sort.key], sort.dir);
  const header = (key: Key, label: string, align = "text-left") => (
    <th className={`py-2 pr-3 ${align}`} aria-sort={sort.key === key ? (sort.dir === "asc" ? "ascending" : "descending") : "none"}>
      <button
        className="inline-flex items-center gap-1 font-semibold hover:text-neutral-900"
        onClick={() => setSort({ key, dir: sort.key === key && sort.dir === "asc" ? "desc" : "asc" })}
      >
        {label}
        {sort.key === key && (sort.dir === "asc" ? <ArrowUp size={12} aria-hidden /> : <ArrowDown size={12} aria-hidden />)}
      </button>
    </th>
  );

  return (
    <div className="space-y-5">
      <FiltersRow filters={filters} sources={sources} onChange={setFilters} />
      {error && <StateBox error={error} onRetry={retry} />}
      <Dimmed when={loading}>
        <Card title="Students" subtitle="Accuracy and answers for the chosen period; weakest topic over each student's last answers">
          {data.length === 0 ? (
            <StateBox>No students yet.</StateBox>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[40rem] font-body text-sm">
                <thead className="text-xs text-neutral-500">
                  <tr className="border-b border-neutral-200">
                    {header("name", "Student")}
                    {header("accuracy", "Accuracy")}
                    {header("answers", "Answers", "text-right")}
                    {header("last_active", "Last active")}
                    <th className="py-2 pr-3 text-left font-semibold">Weakest topic</th>
                    <th className="py-2 text-left font-semibold">Uses</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => {
                    const d = delta(r.accuracy, r.accuracy_prev);
                    return (
                      <tr key={r.person_id} className="border-b border-neutral-100 hover:bg-neutral-50">
                        <td className="py-2 pr-3">
                          <a href={href({ page: "student", personId: r.person_id })} className="font-semibold text-neutral-900 hover:text-brand hover:underline">
                            {personName(r.display_name)}
                          </a>
                        </td>
                        <td className="py-2 pr-3">
                          <AccuracyCell accuracy={r.accuracy} answers={r.answers} />
                          {d && d.direction !== "flat" && <span className="ml-2 text-xs text-neutral-500">{d.text}</span>}
                        </td>
                        <td className="py-2 pr-3 text-right tabular-nums">{r.answers}</td>
                        <td className="py-2 pr-3 text-neutral-600">{daysAgo(r.last_active)}</td>
                        <td className="py-2 pr-3">
                          {r.weakest_topic ? (
                            <a href={href({ page: "topic", topicKey: r.weakest_topic.topic_key })} className="hover:text-brand hover:underline">
                              {r.weakest_topic.title}
                            </a>
                          ) : <span className="text-neutral-400">–</span>}
                        </td>
                        <td className="py-2"><SourceDots sources={r.sources} /></td>
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
