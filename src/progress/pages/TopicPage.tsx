import { addDays, dayLabel } from "../../teacher/charts/columns.ts";
import { daysAgo, sourceLabel } from "../../teacher/format.ts";
import { useData } from "../../teacher/useData.ts";
import { Card, Dimmed, MistakeAnswers, StateBox } from "../../teacher/ui.tsx";
import { progressApi } from "../api.ts";
import { LineChart } from "../charts/LineChart.tsx";
import { routeHash } from "../route.ts";
import { topicExists } from "../shape.ts";

export function TopicPage({ userId, topicKey }: { userId: string; topicKey: string }) {
  // Entity page: entityKey keeps topic A's numbers from showing under topic B while B loads.
  const { data, error, loading, retry } = useData(
    () => progressApi.topic(topicKey),
    `topic:${userId}:${topicKey}`,
    `topic:${topicKey}`,
  );
  const back = <a href={routeHash({ page: "topics" })} className="font-body text-sm text-neutral-500 hover:text-brand">← Topics</a>;

  if (!data) {
    return (
      <div className="space-y-3">
        {back}
        {error ? <StateBox error={error} onRetry={retry} /> : <StateBox>Loading…</StateBox>}
      </div>
    );
  }
  if (!topicExists(data)) {
    return (
      <div className="space-y-3">
        {back}
        <StateBox>That topic doesn't exist.</StateBox>
      </div>
    );
  }

  const weeks = data.trend.map((w) => ({
    key: w.week,
    label: `${dayLabel(w.week)}–${dayLabel(addDays(w.week, 6))}`,
    axisLabel: dayLabel(w.week),
    value: w.accuracy,
    answers: w.answers,
  }));
  const answered = data.trend.reduce((n, w) => n + w.answers, 0);

  return (
    <div className="space-y-5">
      <div>
        {back}
        <h2 className="mt-1 font-display text-2xl font-bold text-neutral-900">{data.title || "Topic"}</h2>
        <p className="mt-1 font-body text-sm text-neutral-500">
          {answered} {answered === 1 ? "answer" : "answers"} in the last 12 weeks
        </p>
      </div>
      {error && <StateBox error={error} onRetry={retry} />}
      <Dimmed when={loading || !!error}>
        <div className="space-y-5">
          <Card title="Accuracy per week" subtitle="Last 12 weeks, every platform">
            {weeks.some((w) => w.value !== null) ? (
              <LineChart points={weeks} label={`Accuracy per week for ${data.title || "this topic"}`} height={160} />
            ) : (
              <StateBox>No graded answers in the last 12 weeks.</StateBox>
            )}
          </Card>
          <Card title="Recent mistakes" subtitle="Your latest wrong answers on this topic">
            {data.recent_mistakes.length === 0 ? (
              <StateBox>No mistakes here yet. Nice!</StateBox>
            ) : (
              <ul className="divide-y divide-neutral-100">
                {data.recent_mistakes.map((m, i) => (
                  <li key={`${m.occurred_at}:${m.item ?? ""}:${i}`} className="flex flex-wrap items-baseline justify-between gap-2 py-2 font-body text-sm">
                    <div className="min-w-0">
                      <span className="break-words text-neutral-800">{m.item_label ?? m.item ?? "(no label)"}</span>
                      <MistakeAnswers yours={m.your_answer} correct={m.correct_answer} />
                    </div>
                    <span className="min-w-0 break-words text-xs text-neutral-500">
                      {m.source ? sourceLabel(m.source) : "unknown source"} · {daysAgo(m.occurred_at)}
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
