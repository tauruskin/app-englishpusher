import { api } from "../api.ts";
import { addDays, dayLabel } from "../charts/columns.ts";
import { StackedColumns } from "../charts/StackedColumns.tsx";
import { daysAgo, levelLabel, pct, personName, sourceLabel } from "../format.ts";
import { lookup } from "../lookup.ts";
import { useData } from "../useData.ts";
import { AccuracyCell, Card, Dimmed, MasteryBadge, MistakeAnswers, SourceDots, StatTile, StateBox } from "../ui.tsx";
import type { PageProps } from "./types.ts";

const KIND_LABEL: Record<string, string> = { grammar: "Grammar", vocab: "Vocab" };
// One series (all platforms together): neutral ink, no legend. Source colors belong to single platforms.
const SERIES_INK = "#4b5563";

export function StudentPage({ href, personId }: PageProps & { personId: string }) {
  // Entity page: entityKey keeps student A's numbers from showing under student B.
  const { data, error, loading, retry } = useData(() => api.student(personId), personId, `student:${personId}`);
  const back = (
    <a href={href({ page: "students" })} className="font-body text-sm text-neutral-500 hover:text-brand">← Students</a>
  );
  if (!data) {
    return (
      <div className="space-y-3">
        {back}
        {error ? <StateBox error={error} onRetry={retry} /> : <StateBox>Loading…</StateBox>}
      </div>
    );
  }

  const s = data.summary;
  const weeks = data.trend.map((w) => ({
    key: w.week,
    label: `${dayLabel(w.week)}–${dayLabel(addDays(w.week, 6))}`, // tooltip and table
    axisLabel: dayLabel(w.week), // short week-start label on the x-axis
    values: { answers: w.answers },
  }));
  const hasWeeks = weeks.some((w) => w.values.answers > 0);

  return (
    <div className="space-y-5">
      <div>
        {back}
        <h1 className="mt-1 font-display text-2xl font-bold text-neutral-900">{personName(data.person?.display_name)}</h1>
        <p className="mt-1 flex flex-wrap items-center gap-3 font-body text-sm text-neutral-500">
          Last active {daysAgo(s.last_active)} <SourceDots sources={Object.keys(data.sources)} />
        </p>
      </div>
      {error && <StateBox error={error} onRetry={retry} />}
      <Dimmed when={loading || !!error}>
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <StatTile label="Accuracy (30 days)" value={pct(s.accuracy)} now={s.accuracy} before={s.accuracy_prev} />
            <StatTile label="Streak" value={`🔥 ${s.streak}`} hint={s.streak === 1 ? "day" : "days"} />
            <StatTile label="Words learned" value={`${s.words_learned}`} />
            <StatTile label="Answers (30 days)" value={`${s.answers}`} hint={`${s.active_days_month} active ${s.active_days_month === 1 ? "day" : "days"} this month`} />
          </div>
          <Card title="Answers per week" subtitle="Last 8 weeks, every platform">
            {hasWeeks ? (
              <StackedColumns
                data={weeks}
                series={["answers"]}
                height={180}
                unit="answers"
                label="Answers per week"
                color={() => SERIES_INK}
              />
            ) : (
              <StateBox>No activity in the last 8 weeks.</StateBox>
            )}
          </Card>
          <Card title="Topics" subtitle="Mastery over the last 20 answers per topic">
            {data.topics.length === 0 ? (
              <StateBox>No activity yet.</StateBox>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[32rem] font-body text-sm">
                  <thead className="text-xs text-neutral-500">
                    <tr className="border-b border-neutral-200">
                      <th scope="col" className="py-2 pr-3 text-left font-semibold">Topic</th>
                      <th scope="col" className="py-2 pr-3 text-left font-semibold">Level</th>
                      <th scope="col" className="py-2 pr-3 text-left font-semibold">Accuracy</th>
                      <th scope="col" className="py-2 pr-3 text-right font-semibold">Answers</th>
                      <th scope="col" className="py-2 text-left font-semibold">Mastery</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.topics.map((t) => (
                      <tr key={t.topic_key} className="border-b border-neutral-100">
                        <td className="py-2 pr-3">
                          <a href={href({ page: "topic", topicKey: t.topic_key })} className="hover:text-brand hover:underline">{t.title}</a>
                        </td>
                        <td className="whitespace-nowrap py-2 pr-3 text-neutral-600">{levelLabel(t.level)} {lookup(KIND_LABEL, t.kind) ?? t.kind}</td>
                        <td className="py-2 pr-3"><AccuracyCell accuracy={t.accuracy} answers={t.answers} /></td>
                        <td className="py-2 pr-3 text-right tabular-nums">{t.answers}</td>
                        <td className="py-2"><MasteryBadge mastery={t.mastery} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
          <Card title="Recent mistakes" subtitle="Latest wrong answers on every platform">
            {data.recent_mistakes.length === 0 ? (
              <StateBox>No mistakes yet.</StateBox>
            ) : (
              <ul className="divide-y divide-neutral-100">
                {data.recent_mistakes.map((m, i) => (
                  <li key={`${m.occurred_at}:${m.item ?? ""}:${i}`} className="flex flex-wrap items-baseline justify-between gap-2 py-2 font-body text-sm">
                    <div className="min-w-0">
                      <span className="break-words text-neutral-800">{m.item_label ?? m.item ?? "–"}</span>
                      <MistakeAnswers yours={m.your_answer} correct={m.correct_answer} yoursLabel="Student's answer" />
                    </div>
                    <span className="min-w-0 break-words text-xs text-neutral-500">
                      {m.title} · {m.source ? sourceLabel(m.source) : "unknown source"} · {daysAgo(m.occurred_at)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </Dimmed>
    </div>
  );
}
