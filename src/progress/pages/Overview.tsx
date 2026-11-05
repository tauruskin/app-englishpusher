import { Send } from "lucide-react";
import { addDays, dayLabel } from "../../teacher/charts/columns.ts";
import { pct } from "../../teacher/format.ts";
import { BarRow, Card, StateBox, StatTile } from "../../teacher/ui.tsx";
import { LineChart } from "../charts/LineChart.tsx";
import { routeHash } from "../route.ts";
import { greetingLine, kyivHour, PRACTICE_URL } from "../shape.ts";
import { onTelegramLinkClick } from "../telegram.ts";
import type { Progress } from "../types.ts";
import { BUTTON } from "./GetStarted.tsx";

export function Overview({ data }: { data: Progress }) {
  const s = data.summary;
  const weeks = data.trend.map((w) => ({
    key: w.week,
    label: `${dayLabel(w.week)}–${dayLabel(addDays(w.week, 6))}`,
    axisLabel: dayLabel(w.week),
    value: w.accuracy,
    answers: w.answers,
  }));

  return (
    <div className="space-y-5">
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
        <a href={PRACTICE_URL} onClick={onTelegramLinkClick} target="_blank" rel="noopener noreferrer" className={`${BUTTON} mt-4 bg-brand text-white hover:bg-brand/90`}>
          <Send size={16} aria-hidden /> {data.weak_topics.length === 0 ? "Open the Quiz Bot" : "Practise weak topics"}
          <span className="sr-only"> (opens Telegram)</span>
        </a>
        <p className="mt-2 font-body text-xs text-neutral-500">
          Opens the Quiz Bot in Telegram and starts 5 questions on your weakest grammar topic.
        </p>
      </Card>

      <Card title="Accuracy per week" subtitle="Last 8 weeks, every platform">
        {weeks.some((w) => w.value !== null) ? (
          <LineChart points={weeks} label="Accuracy per week" height={150} />
        ) : (
          <StateBox>No graded answers in the last 8 weeks.</StateBox>
        )}
      </Card>
    </div>
  );
}
