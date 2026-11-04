import type { StudentTopic } from "../teacher/types.ts";
import type { Progress, TopicProgress, Week } from "./types.ts";

// Used only when the dev server runs with ?demo in the URL (see api.ts). Invented data.
const now = new Date();
const iso = (daysBack: number) => new Date(now.getTime() - daysBack * 86_400_000).toISOString();
const day = (daysBack: number) => iso(daysBack).slice(0, 10);
// Monday of the week `weeksBack` weeks ago (UTC; close enough for fixtures).
function monday(weeksBack: number): string {
  const d = new Date(now.getTime());
  d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7) - weeksBack * 7);
  return d.toISOString().slice(0, 10);
}
function weeks(count: number, answers: number[], accuracy: (number | null)[]): Week[] {
  return Array.from({ length: count }, (_, i) => ({ week: monday(count - 1 - i), answers: answers[i] ?? 0, accuracy: accuracy[i] ?? null }));
}

const topics: StudentTopic[] = [
  { topic_key: "b1:grammar:modifiers", kind: "grammar", level: "b1", title: "Modifiers", answers: 14, accuracy: 57, mastery: "needs_work", last_at: iso(2) },
  { topic_key: "b1:grammar:irregular-verbs", kind: "grammar", level: "b1", title: "Irregular Verbs", answers: 20, accuracy: 65, mastery: "learning", last_at: iso(1) },
  { topic_key: "a2:grammar:present-simple", kind: "grammar", level: "a2", title: "Present Simple", answers: 20, accuracy: 95, mastery: "mastered", last_at: iso(20) },
  { topic_key: "b1:vocab:jobs", kind: "vocab", level: "b1", title: "Lesson 6: Jobs & Work", answers: 18, accuracy: 83, mastery: "strong", last_at: iso(0) },
  { topic_key: "b1:vocab:travel", kind: "vocab", level: "b1", title: "Lesson 4: Travel", answers: 9, accuracy: 70, mastery: "learning", last_at: iso(5) },
  { topic_key: "b1plus:vocab:feelings", kind: "vocab", level: "b1plus", title: "Feelings and Emotions", answers: 3, accuracy: 67, mastery: "not_enough_data", last_at: iso(9) },
];

const calendar = Array.from({ length: 90 }, (_, i) => {
  const events = i % 3 === 1 ? 0 : (i * 7) % 23;
  const bot = Math.ceil(events * 0.7);
  return { day: day(i), events, by_source: { bot, app: events - bot } };
}).filter((d) => d.events > 0);

export const PROGRESS_DEMO = {
  progress: {
    person: { id: "demo-student", display_name: "Demo Student", role: "student" },
    summary: { accuracy: 78, accuracy_prev: 71, answers: 164, streak: 4, words_learned: 96, active_days_month: 3, last_active: iso(0) },
    weak_topics: topics
      .filter((t) => t.answers >= 5)
      .sort((a, b) => (a.accuracy ?? 0) - (b.accuracy ?? 0))
      .slice(0, 3)
      .map(({ last_at: _lastAt, ...t }) => t),
    topics,
    trend: weeks(8, [12, 0, 18, 22, 15, 25, 19, 14], [64, null, 69, 72, 70, 76, 79, 81]),
    calendar,
    sources: { bot: 120, app: 44 },
  } as Progress,
  topic: (topicKey: string): TopicProgress => {
    const title = topics.find((t) => t.topic_key === topicKey)?.title ?? "";
    // Like the real RPC for an unknown key: empty title, 12 empty weeks, no mistakes.
    if (!title) return { topic_key: topicKey, title: "", trend: weeks(12, [], []), recent_mistakes: [] };
    return {
      topic_key: topicKey,
      title,
      trend: weeks(12, [0, 0, 4, 6, 0, 5, 8, 3, 6, 7, 4, 5], [null, null, 50, 50, null, 60, 63, 67, 50, 71, 75, 60]),
      recent_mistakes: [
        { topic_key: topicKey, title, item: "q40", item_label: "It was ___ cold that we stayed inside.", source: "bot", activity: "quiz", occurred_at: iso(1) },
        { topic_key: topicKey, title, item: "q12", item_label: "She speaks English ___ well.", source: "app", activity: "trivia", occurred_at: iso(3) },
      ],
    };
  },
};
