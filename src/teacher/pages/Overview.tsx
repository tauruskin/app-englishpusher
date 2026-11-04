import { AlertTriangle, TrendingDown, UserX } from "lucide-react";
import { api } from "../api.ts";
import { fillDays, kyivToday } from "../charts/columns.ts";
import { StackedColumns } from "../charts/StackedColumns.tsx";
import { attentionText, periodLabel, pct } from "../format.ts";
import { lookup } from "../lookup.ts";
import { useData } from "../useData.ts";
import { Card, Dimmed, FiltersRow, StatTile, StateBox } from "../ui.tsx";
import type { Attention } from "../types.ts";
import type { PageProps } from "./types.ts";

const ICON = { inactive: UserX, dropping: TrendingDown, hard_topic: AlertTriangle };
const ICON_LABEL: Record<string, string> = { inactive: "Inactive", dropping: "Dropping", hard_topic: "Hard topic" };

function attentionHref(a: Attention, href: PageProps["href"]): string | null {
  if (a.type === "hard_topic" && a.topic_key) return href({ page: "topic", topicKey: a.topic_key });
  if (a.person_id) return href({ page: "student", personId: a.person_id });
  return null;
}

export function Overview({ filters, setFilters, href }: PageProps) {
  const { data, error, loading, retry } = useData(() => api.overview(filters), JSON.stringify(filters));
  if (!data) return error ? <StateBox error={error} onRetry={retry} /> : <StateBox>Loading…</StateBox>;

  const sources = filters.source ? [filters.source] : data.sources;
  const days = fillDays(data.daily, kyivToday(), filters.days);
  const hasActivity = days.some((d) => Object.values(d.values).some((v) => v > 0));
  return (
    <div className="space-y-5">
      <FiltersRow filters={filters} sources={data.sources} onChange={setFilters} />
      {error && <StateBox error={error} onRetry={retry} />}
      <Dimmed when={loading || !!error}>
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <StatTile label="Active students (7 days)" value={`${data.active_students}`} hint={`of ${data.total_students}`} />
            <StatTile label="Accuracy" value={pct(data.accuracy)} now={data.accuracy} before={data.accuracy_prev} />
            <StatTile label="Answers" value={data.answers.toLocaleString("en-GB")} hint={periodLabel(filters.days)} />
            <StatTile label="Needs attention" value={`${data.needs_attention.length}`} />
          </div>

          <Card title="Activity per day" subtitle="Answers and study sessions, by where they happened">
            {data.total_students === 0 ? (
              <StateBox>No students yet.</StateBox>
            ) : !hasActivity ? (
              <StateBox>No activity in this period.</StateBox>
            ) : (
              <StackedColumns
                data={days}
                series={sources}
                unit="activities"
                label="Activity per day by source"
              />
            )}
          </Card>

          <Card title="Needs attention" subtitle="Inactive students, dropping accuracy and topics the group finds hard">
            {data.needs_attention.length === 0 ? (
              <StateBox>Nothing needs attention right now.</StateBox>
            ) : (
              <ul className="divide-y divide-neutral-100">
                {data.needs_attention.map((a) => {
                  const Icon = lookup(ICON, a.type) ?? AlertTriangle;
                  const link = attentionHref(a, href);
                  const text = attentionText(a);
                  return (
                    <li key={`${a.type}:${a.person_id ?? ""}:${a.topic_key ?? ""}`} className="flex items-center gap-3 py-2.5 font-body text-sm text-neutral-800">
                      <Icon size={16} className="shrink-0 text-red-600" aria-hidden />
                      <span className="sr-only">{lookup(ICON_LABEL, a.type) ?? "Attention"}:</span>
                      {link ? <a href={link} className="hover:text-brand hover:underline">{text}</a> : <span>{text}</span>}
                    </li>
                  );
                })}
              </ul>
            )}
          </Card>
        </div>
      </Dimmed>
    </div>
  );
}
