import { Send } from "lucide-react";
import { addDays, dayLabel, kyivToday } from "../../teacher/charts/columns.ts";
import { levelLabel, pct, sourceLabel } from "../../teacher/format.ts";
import { sourceColor } from "../../teacher/theme.ts";
import { useData } from "../../teacher/useData.ts";
import { AccuracyCell, BarRow, Card, Dimmed, MasteryBadge, StateBox, StatTile } from "../../teacher/ui.tsx";
import { progressApi } from "../api.ts";
import { LineChart } from "../charts/LineChart.tsx";
import { MonthCalendar } from "../charts/MonthCalendar.tsx";
import { routeHash } from "../route.ts";
import { greetingLine, groupTopics, hasActivity, hiLine, kyivHour, PRACTICE_URL, sourceShares } from "../shape.ts";

const BUTTON = "inline-flex items-center gap-2 rounded-lg px-4 py-2.5 font-display text-sm font-bold transition-colors";

function GetStarted({ name }: { name: string | null }) {
  return (
    <Card>
      <h2 className="font-display text-2xl font-bold text-neutral-900">{hiLine(name)} 👋</h2>
      <p className="mt-2 font-body text-sm text-neutral-600">
        Your progress appears here after your first answers. Practise in the App or in the Quiz Bot: both count.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <a href="/" className={`${BUTTON} bg-brand text-white hover:bg-brand/90`}>Practise in the App</a>
        <a href={PRACTICE_URL} target="_blank" rel="noopener noreferrer" className={`${BUTTON} border border-neutral-300 text-neutral-800 hover:border-neutral-400`}>
          <Send size={16} aria-hidden /> Open the Quiz Bot<span className="sr-only"> (opens Telegram)</span>
        </a>
      </div>
    </Card>
  );
}

export function Home({ userId }: { userId: string }) {
  const { data, error, loading, retry } = useData(() => progressApi.me(), `progress:${userId}`, `progress:${userId}`);
  if (!data) return error ? <StateBox error={error} onRetry={retry} /> : <StateBox>Loading…</StateBox>;
  if (!hasActivity(data)) {
    return (
      <div className="space-y-5">
        {error && <StateBox error={error} onRetry={retry} />}
        <GetStarted name={data.person?.display_name ?? null} />
      </div>
    );
  }

  const s = data.summary;
  const today = kyivToday();
  const weeks = data.trend.map((w) => ({
    key: w.week,
    label: `${dayLabel(w.week)}–${dayLabel(addDays(w.week, 6))}`,
    axisLabel: dayLabel(w.week),
    value: w.accuracy,
    answers: w.answers,
  }));
  const groups = groupTopics(data.topics);
  const shares = sourceShares(data.sources);

  return (
    <div className="space-y-5">
      {error && <StateBox error={error} onRetry={retry} />}
      <Dimmed when={loading || !!error}>
        <div className="space-y-5">
          {/* 1. Coach */}
          <h2 className="font-display text-2xl font-bold text-neutral-900">
            {greetingLine(kyivHour(), data.person?.display_name)} 👋
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="col-span-2 sm:col-span-1">
              <StatTile label="Accuracy (30 days)" value={pct(s.accuracy)} now={s.accuracy} before={s.accuracy_prev} />
            </div>
            <StatTile label="Streak" value={`🔥 ${s.streak}`} hint={s.streak === 1 ? "day" : "days"} />
            <StatTile label="Words learned" value={`${s.words_learned}`} />
          </div>

          <Card title="Your weak topics" subtitle="Lowest accuracy, practised in the last 60 days">
            {data.weak_topics.length === 0 ? (
              <p className="font-body text-sm text-neutral-500">No weak topics right now. Keep practising and they will show up here.</p>
            ) : (
              <div>
                {data.weak_topics.map((t) => (
                  <BarRow
                    key={t.topic_key}
                    label={t.title}
                    value={t.accuracy}
                    max={100}
                    href={routeHash({ page: "topic", topicKey: t.topic_key })}
                    note={`(${t.answers})`}
                  />
                ))}
              </div>
            )}
            <a href={PRACTICE_URL} target="_blank" rel="noopener noreferrer" className={`${BUTTON} mt-4 bg-brand text-white hover:bg-brand/90`}>
              <Send size={16} aria-hidden /> {data.weak_topics.length === 0 ? "Open the Quiz Bot" : "Practise weak topics"}
              <span className="sr-only"> (opens Telegram)</span>
            </a>
            <p className="mt-2 font-body text-xs text-neutral-500">
              Opens the Quiz Bot in Telegram. Send <span className="font-semibold">/practice</span> there for 5 questions on your weakest grammar topic.
            </p>
          </Card>

          <Card title="Accuracy per week" subtitle="Last 8 weeks, every platform">
            {weeks.some((w) => w.value !== null) ? (
              <LineChart points={weeks} label="Accuracy per week" height={150} />
            ) : (
              <StateBox>No graded answers in the last 8 weeks.</StateBox>
            )}
          </Card>

          {/* 2. Mastery map */}
          <Card title="Mastery map" subtitle="Every topic you have practised, judged by your last 20 answers">
            {groups.map((g) => (
              <div key={g.kind} className="mt-4 first:mt-0">
                <h3 className="mb-1 font-display text-sm font-semibold text-neutral-700">{g.label}</h3>
                <ul className="divide-y divide-neutral-100">
                  {g.topics.map((t) => (
                    <li key={t.topic_key}>
                      <a
                        href={routeHash({ page: "topic", topicKey: t.topic_key })}
                        className="flex items-center justify-between gap-3 rounded-md py-2 font-body text-sm hover:bg-neutral-50"
                      >
                        <span className="min-w-0">
                          <span className="block truncate text-neutral-900" title={t.title}>{t.title}</span>
                          <span className="text-xs text-neutral-500">
                            {levelLabel(t.level)} · {t.answers} {t.answers === 1 ? "answer" : "answers"}
                          </span>
                        </span>
                        <span className="flex shrink-0 items-center gap-2">
                          <AccuracyCell accuracy={t.accuracy} answers={t.answers} />
                          <MasteryBadge mastery={t.mastery} />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Card>

          {/* 3. Activity */}
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
        </div>
      </Dimmed>
    </div>
  );
}
