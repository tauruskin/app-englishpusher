import { api } from "../api.ts";
import { addDays, dayLabel } from "../charts/columns.ts";
import { StackedColumns } from "../charts/StackedColumns.tsx";
import { daysAgo, levelLabel, pct, personName, scoreText, sourceLabel } from "../format.ts";
import { lookup } from "../lookup.ts";
import { INK } from "../theme.ts";
import { useData } from "../useData.ts";
import { AccuracyCell, Card, Dimmed, MasteryBadge, MistakeAnswers, MoodleRange, SourceDots, StatTile, StateBox } from "../ui.tsx";
import type { PageProps } from "./types.ts";

const KIND_LABEL: Record<string, string> = { grammar: "Grammar", vocab: "Vocab" };
// One series (all platforms together): neutral ink, no legend. Source colors belong to single platforms.
const SERIES_INK = "#4b5563";

// Loaded only when the Moodle card is shown; its own entity key keeps one student's attempts off another's page.
function MoodleAttempts({ personId }: { personId: string }) {
  const { data, error, retry } = useData(() => api.studentMoodleAttempts(personId), personId, `moodle-attempts:${personId}`);
  if (!data) return error ? <StateBox error={error} onRetry={retry} /> : <StateBox>Loading attempts…</StateBox>;
  if (data.length === 0) return <StateBox>No attempts yet.</StateBox>;
  return (
    <ul className="divide-y divide-neutral-100">
      {data.map((a) => (
        <li key={a.attempt_id} className="flex flex-wrap items-baseline justify-between gap-2 py-2 font-body text-sm">
          <span className="min-w-0">
            <span className="text-neutral-800">{a.title}</span>
            <span className="block text-xs text-neutral-500">{a.topic_title ?? a.section_name ?? "No topic"} · {daysAgo(a.occurred_at)}</span>
          </span>
          <span className="flex items-center gap-2 tabular-nums">
            {scoreText(a.raw_score, a.max_score)}
            {a.before_tracking && <span title="Made before we started reading Moodle results; never counted as the first try" className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-500">before tracking</span>}
            {a.is_first_try && <span title="The first attempt we saw for this lesson" className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600">first try</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}

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
  const mf = data.moodle?.first_try ?? null;
  const ml = data.moodle?.latest ?? null;
  const moodleTrend = mf !== null && ml !== null && ml !== mf ? (ml > mf ? "up" : "down") : null; // same colouring as MoodleRange
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
              <StateBox>No Bot or App answers in the last 8 weeks.</StateBox>
            )}
          </Card>
          <Card title="Topics" subtitle="Mastery over the last 20 answers per topic">
            {data.topics.length === 0 ? (
              <StateBox>No Bot or App answers yet.</StateBox>
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
          {data.moodle && (
            <Card title="Moodle lessons" subtitle="H5P lesson scores. Not part of accuracy or mastery.">
              <p className="mb-3 font-body text-sm text-neutral-700">
                {data.moodle.lessons} {data.moodle.lessons === 1 ? "lesson" : "lessons"} · first try {pct(data.moodle.first_try)} →{" "}
                <span className="sr-only">then </span>latest{" "}
                <span
                  style={{ color: moodleTrend === "up" ? INK.good : moodleTrend === "down" ? INK.bad : undefined }}
                  className={moodleTrend ? "font-semibold" : undefined}
                >
                  {pct(data.moodle.latest)}
                </span>
              </p>
              {data.moodle.topics.length > 0 && (
                <ul className="divide-y divide-neutral-100">
                  {data.moodle.topics.map((t) => (
                    <li key={t.topic_key} className="flex items-center justify-between gap-3 py-2 font-body text-sm">
                      <a href={href({ page: "topic", topicKey: t.topic_key })} className="truncate hover:text-brand hover:underline">{t.title}</a>
                      <span className="flex items-center gap-3">
                        <MoodleRange first={t.first_try} latest={t.latest} />
                        <span className="text-xs text-neutral-400">{t.attempts} {t.attempts === 1 ? "attempt" : "attempts"}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {data.moodle.other_lessons.length > 0 && (
                <>
                  <h3 className="mb-1 mt-4 font-display text-sm font-semibold text-neutral-700">Other lessons</h3>
                  <p className="mb-1 font-body text-xs text-neutral-400">Lessons whose Moodle section has no topic yet</p>
                  <ul className="divide-y divide-neutral-100">
                    {data.moodle.other_lessons.map((l) => (
                      <li key={l.hvp_id} className="flex items-center justify-between gap-3 py-2 font-body text-sm">
                        <span className="min-w-0 truncate text-neutral-800" title={l.section_name ?? undefined}>{l.title}</span>
                        <MoodleRange first={l.first_try} latest={l.latest} />
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <h3 className="mb-1 mt-4 font-display text-sm font-semibold text-neutral-700">Attempts</h3>
              <p className="mb-1 font-body text-xs text-neutral-400">Latest 100 attempts. Results are read every 15 minutes; two retries less than 15 minutes apart may show as one.</p>
              <MoodleAttempts personId={personId} />
            </Card>
          )}
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
