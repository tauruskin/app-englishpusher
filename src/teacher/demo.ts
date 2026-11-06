import type { Me, MoodleAttempt, Overview, RosterRow, StudentDetail, TopicDetail, TopicMatrix } from "./types.ts";

// Used only when the dev server runs with ?demo in the URL (see api.ts).
const today = new Date();
const iso = (daysBack: number) => new Date(today.getTime() - daysBack * 86_400_000).toISOString();
const day = (daysBack: number) => iso(daysBack).slice(0, 10);

const people = [
  { person_id: "d1", display_name: "Anna" },
  { person_id: "d2", display_name: "Bohdan" },
  { person_id: "d3", display_name: "Chrystia" },
  { person_id: "d4", display_name: "Dmytro" },
];

export const DEMO = {
  me: { person_id: "d0", display_name: "Demo Teacher", role: "teacher", telegram_linked: true } as Me,
  overview: {
    total_students: 4, active_students: 3, accuracy: 74, accuracy_prev: 79, answers: 262,
    daily: Array.from({ length: 30 }, (_, i) => ({
      day: day(i),
      by_source: i % 4 === 3 ? {} : { bot: 3 + ((i * 7) % 9), ...(i % 3 === 0 ? { app: 2 + (i % 4) } : {}) },
    })),
    sources: ["app", "bot", "moodle"],
    needs_attention: [
      { type: "dropping", person_id: "d2", display_name: "Bohdan", topic_key: null, title: null, value: 61, value2: 84 },
      { type: "hard_topic", person_id: null, display_name: null, topic_key: "b1:grammar:irregular-verbs", title: "Irregular Verbs", value: 56, value2: 4 },
      { type: "inactive", person_id: "d4", display_name: "Dmytro", topic_key: null, title: null, value: 12, value2: null },
      { type: "hard_lesson", person_id: null, display_name: null, topic_key: null, title: "Lesson 9. Irregular Verbs", value: 52, value2: 3, hvp_id: 567 },
    ],
  } as Overview,
  students: [
    { ...people[0], accuracy: 86, accuracy_prev: 80, answers: 120, last_active: iso(0), weakest_topic: { topic_key: "b1:grammar:modifiers", title: "Modifiers", accuracy: 58 }, sources: ["app", "bot"] },
    { ...people[1], accuracy: 61, accuracy_prev: 84, answers: 74, last_active: iso(1), weakest_topic: { topic_key: "b1:grammar:irregular-verbs", title: "Irregular Verbs", accuracy: 40 }, sources: ["bot"] },
    { ...people[2], accuracy: 77, accuracy_prev: null, answers: 55, last_active: iso(3), weakest_topic: null, sources: ["bot"] },
    { ...people[3], accuracy: null, accuracy_prev: 70, answers: 0, last_active: iso(12), weakest_topic: null, sources: ["app"] },
  ] as RosterRow[],
  topics: {
    topics: [
      { topic_key: "b1:grammar:irregular-verbs", title: "Irregular Verbs", kind: "grammar", level: "b1", answers: 60, accuracy: 56 },
      { topic_key: "b1:grammar:modifiers", title: "Modifiers", kind: "grammar", level: "b1", answers: 44, accuracy: 68 },
      { topic_key: "b1:vocab:jobs", title: "Lesson 6: Jobs & Work", kind: "vocab", level: "b1", answers: 30, accuracy: 83 },
    ],
    students: people,
    cells: [
      { person_id: "d1", topic_key: "b1:grammar:irregular-verbs", answers: 20, accuracy: 75 },
      { person_id: "d1", topic_key: "b1:grammar:modifiers", answers: 12, accuracy: 58 },
      { person_id: "d1", topic_key: "b1:vocab:jobs", answers: 18, accuracy: 94 },
      { person_id: "d2", topic_key: "b1:grammar:irregular-verbs", answers: 25, accuracy: 40 },
      { person_id: "d2", topic_key: "b1:grammar:modifiers", answers: 20, accuracy: 70 },
      { person_id: "d3", topic_key: "b1:grammar:irregular-verbs", answers: 15, accuracy: 60 },
      { person_id: "d3", topic_key: "b1:vocab:jobs", answers: 12, accuracy: 67 },
    ],
    sources: ["app", "bot", "moodle"],
    // Topic rows are the rounded averages of their cells (students = number of cells).
    moodle: {
      topics: [
        { topic_key: "b1:grammar:irregular-verbs", title: "Irregular Verbs", kind: "grammar", level: "b1", first_try: 58, latest: 85, attempts: 2, students: 3 },
        { topic_key: "b1:grammar:modifiers", title: "Modifiers", kind: "grammar", level: "b1", first_try: 45, latest: 85, attempts: 2, students: 2 },
        { topic_key: "b1:grammar:adverbs-of-frequency", title: "Adverbs of Frequency", kind: "grammar", level: "b1", first_try: 70, latest: 70, attempts: 1, students: 1 },
      ],
      cells: [
        { person_id: "d1", topic_key: "b1:grammar:irregular-verbs", first_try: 50, latest: 90, attempts: 3 },
        { person_id: "d2", topic_key: "b1:grammar:irregular-verbs", first_try: 40, latest: 80, attempts: 2 },
        { person_id: "d3", topic_key: "b1:grammar:irregular-verbs", first_try: 85, latest: 85, attempts: 1 },
        { person_id: "d1", topic_key: "b1:grammar:modifiers", first_try: 50, latest: 90, attempts: 2 },
        { person_id: "d2", topic_key: "b1:grammar:modifiers", first_try: 40, latest: 80, attempts: 2 },
        { person_id: "d3", topic_key: "b1:grammar:adverbs-of-frequency", first_try: 70, latest: 70, attempts: 1 },
      ],
    },
  } as TopicMatrix,
  topic: {
    topic_key: "b1:grammar:irregular-verbs", title: "Irregular Verbs", answers: 60, accuracy: 56,
    students: [
      { person_id: "d2", display_name: "Bohdan", answers: 25, accuracy: 40 },
      { person_id: "d3", display_name: "Chrystia", answers: 15, accuracy: 60 },
      { person_id: "d1", display_name: "Anna", answers: 20, accuracy: 75 },
    ],
    most_missed: [
      { item: "b12", label: "Yesterday I ___ (go) to the cinema with my friends.", wrong: 9, answers: 14,
        correct_answer: "went", wrong_answers: [{ answer: "goed", count: 5 }, { answer: "gone", count: 3 }] },
      { item: "b15", label: "She has ___ (write) three books so far.", wrong: 6, answers: 12,
        correct_answer: "written", wrong_answers: [] },
    ],
    sources: ["app", "bot"],
    moodle: {
      first_try: 58, latest: 85, attempts: 2, students: 3,
      lessons: [
        { hvp_id: 567, title: "Lesson 9. Irregular Verbs", section_name: "Lesson 9. PAST SIMPLE", first_try: 52, latest: 82, attempts: 2.3, students: 3 },
        { hvp_id: 653, title: "Lesson 9. Activation", section_name: "Lesson 9. PAST SIMPLE", first_try: 64, latest: 88, attempts: 1.7, students: 3 },
      ],
      by_student: [
        { person_id: "d2", display_name: "Bohdan", first_try: 40, latest: 80, attempts: 2 },
        { person_id: "d1", display_name: "Anna", first_try: 50, latest: 90, attempts: 3 },
        { person_id: "d3", display_name: "Chrystia", first_try: 85, latest: 85, attempts: 1 },
      ],
    },
  } as TopicDetail,
  student: {
    person: { id: "d1", display_name: "Anna", role: "student" },
    summary: { accuracy: 86, accuracy_prev: 80, answers: 120, streak: 6, words_learned: 214, active_days_month: 9, last_active: iso(0) },
    weak_topics: [],
    topics: [
      { topic_key: "b1:grammar:modifiers", kind: "grammar", level: "b1", title: "Modifiers", answers: 12, accuracy: 58, mastery: "needs_work", last_at: iso(2) },
      { topic_key: "b1:grammar:irregular-verbs", kind: "grammar", level: "b1", title: "Irregular Verbs", answers: 20, accuracy: 75, mastery: "learning", last_at: iso(1) },
      { topic_key: "b1:vocab:jobs", kind: "vocab", level: "b1", title: "Lesson 6: Jobs & Work", answers: 18, accuracy: 94, mastery: "mastered", last_at: iso(0) },
      { topic_key: "b1:vocab:stative-verbs", kind: "vocab", level: "b1", title: "Stative Verbs", answers: 2, accuracy: 50, mastery: "not_enough_data", last_at: iso(9) },
    ],
    trend: Array.from({ length: 8 }, (_, i) => ({ week: day((7 - i) * 7), answers: 8 + ((i * 5) % 11), accuracy: 70 + i * 2 })),
    calendar: [],
    sources: { bot: 100, app: 20 },
    recent_mistakes: [
      { topic_key: "b1:grammar:modifiers", title: "Modifiers", item: "b40", item_label: "It was ___ cold that we stayed inside.", source: "bot", activity: "quiz", occurred_at: iso(1), correct_answer: "so", your_answer: "such" },
      { topic_key: "b1:vocab:jobs", title: "Lesson 6: Jobs & Work", item: "w:plumber", item_label: "plumber", source: "app", activity: "trivia", occurred_at: iso(2), correct_answer: null, your_answer: null },
      // Long answers are cut with "…" (full text in the tooltip).
      { topic_key: "b1:grammar:modifiers", title: "Modifiers", item: "b77", item_label: "Choose the sentence that is correct.", source: "bot", activity: "quiz", occurred_at: iso(3), correct_answer: "If I had known about the delay, I would have taken an earlier train to the station.", your_answer: "If I would have known about the delay, I would have taken an earlier train to the station." },
    ],
    moodle: {
      // 2 lessons shown; the average first try skips the lesson without one.
      lessons: 2, first_try: 50, latest: 90,
      topics: [
        { topic_key: "b1:grammar:modifiers", title: "Modifiers", first_try: 50, latest: 90, attempts: 2, lessons: 1 },
      ],
      other_lessons: [
        { hvp_id: 460, title: "Lesson 1. Activation", section_name: "Lesson 1. WHO ARE YOU", first_try: null, latest: 90, attempts: 1 },
      ],
    },
  } as StudentDetail,
  moodleAttempts: [
    { attempt_id: 3, occurred_at: iso(0), hvp_id: 571, title: "Lesson 7. Modifiers", section_name: "Lesson 7. MODIFIERS", topic_key: "b1:grammar:modifiers", topic_title: "Modifiers", raw_score: 9, max_score: 10, pct: 90, before_tracking: false, is_first_try: false },
    { attempt_id: 2, occurred_at: iso(0), hvp_id: 571, title: "Lesson 7. Modifiers", section_name: "Lesson 7. MODIFIERS", topic_key: "b1:grammar:modifiers", topic_title: "Modifiers", raw_score: 5, max_score: 10, pct: 50, before_tracking: false, is_first_try: true },
    { attempt_id: 1, occurred_at: iso(60), hvp_id: 460, title: "Lesson 1. Activation", section_name: "Lesson 1. WHO ARE YOU", topic_key: null, topic_title: null, raw_score: 9, max_score: 10, pct: 90, before_tracking: true, is_first_try: false },
  ] as MoodleAttempt[],
};
