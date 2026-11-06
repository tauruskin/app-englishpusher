import { levelLabel } from "../../teacher/format.ts";
import { AccuracyCell, Card, MasteryBadge, MoodleRange, StateBox } from "../../teacher/ui.tsx";
import { routeHash } from "../route.ts";
import { groupTopics } from "../shape.ts";
import type { Progress } from "../types.ts";

export function TopicsTab({ data }: { data: Progress }) {
  const groups = groupTopics(data.topics);
  const moodle = data.moodle;
  return (
    <>
      <Card title="Mastery map" subtitle="Every topic you have practised, judged by your last 20 answers">
        {groups.length === 0 && <StateBox>No quiz or App answers yet.</StateBox>}
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

      {moodle && (
        <Card title="Moodle lessons" subtitle="Lesson scores from the course. Not part of accuracy or mastery.">
          <p className="mb-3 font-body text-sm text-neutral-700">
            {moodle.lessons} {moodle.lessons === 1 ? "lesson" : "lessons"} · first try → latest{" "}
            <MoodleRange first={moodle.first_try} latest={moodle.latest} />
          </p>
          {moodle.topics.length > 0 && (
            <ul className="divide-y divide-neutral-100">
              {moodle.topics.map((t) => (
                <li key={t.topic_key}>
                  <a
                    href={routeHash({ page: "topic", topicKey: t.topic_key })}
                    className="flex items-center justify-between gap-3 rounded-md py-2 font-body text-sm hover:bg-neutral-50"
                  >
                    <span className="min-w-0 truncate text-neutral-900" title={t.title}>{t.title}</span>
                    <span className="flex shrink-0 items-center gap-3">
                      <MoodleRange first={t.first_try} latest={t.latest} />
                      <span className="text-xs text-neutral-400">{t.attempts} {t.attempts === 1 ? "attempt" : "attempts"}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
          {moodle.other_lessons.length > 0 && (
            <>
              <h3 className="mb-1 mt-4 font-display text-sm font-semibold text-neutral-700">Other lessons</h3>
              <p className="mb-1 font-body text-xs text-neutral-400">Lessons whose Moodle section has no topic yet</p>
              <ul className="divide-y divide-neutral-100">
                {moodle.other_lessons.map((l) => (
                  <li key={l.hvp_id} className="flex items-center justify-between gap-3 py-2 font-body text-sm">
                    <span className="min-w-0 truncate text-neutral-800" title={l.section_name ?? undefined}>{l.title}</span>
                    <MoodleRange first={l.first_try} latest={l.latest} />
                  </li>
                ))}
              </ul>
            </>
          )}
        </Card>
      )}
    </>
  );
}
