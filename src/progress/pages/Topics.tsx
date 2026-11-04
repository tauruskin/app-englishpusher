import { levelLabel } from "../../teacher/format.ts";
import { AccuracyCell, Card, MasteryBadge } from "../../teacher/ui.tsx";
import { routeHash } from "../route.ts";
import { groupTopics } from "../shape.ts";
import type { Progress } from "../types.ts";

export function TopicsTab({ data }: { data: Progress }) {
  const groups = groupTopics(data.topics);
  return (
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
  );
}
