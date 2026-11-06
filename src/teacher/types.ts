// Shapes returned by the public.analytics_* RPCs (moodle-task-builder plan 1).
// No imports: tests load this file directly.

export type Role = "student" | "teacher" | "admin";
export type Mastery = "not_enough_data" | "needs_work" | "learning" | "strong" | "mastered";
export type BySource = Record<string, number>;
/** A wrong answer students chose for one question, with how many times (topic "Most missed"). */
export interface WrongAnswer { answer: string; count: number }

/** Moodle H5P lesson scores (moodle-task-builder parts 10-11). Percentages 0-100; null = unknown. */
export interface MoodleMatrixTopic {
  topic_key: string; title: string; kind: string; level: string;
  first_try: number | null; latest: number | null; attempts: number | null; students: number;
}
export interface MoodleMatrixCell { person_id: string; topic_key: string; first_try: number | null; latest: number | null; attempts: number }
export interface MoodleMatrix { topics: MoodleMatrixTopic[]; cells: MoodleMatrixCell[] }
export interface MoodleLesson {
  hvp_id: number; title: string; section_name: string | null;
  first_try: number | null; latest: number | null; attempts: number | null; students?: number;
}
export interface MoodleTopicDetail {
  first_try: number | null; latest: number | null; attempts: number | null; students: number;
  lessons: MoodleLesson[];
  by_student: { person_id: string; display_name: string | null; first_try: number | null; latest: number | null; attempts: number }[];
}
export interface MoodleStudentTopic { topic_key: string; title: string; first_try: number | null; latest: number | null; attempts: number; lessons: number }
export interface MoodleStudent {
  lessons: number; first_try: number | null; latest: number | null;
  topics: MoodleStudentTopic[]; other_lessons: MoodleLesson[];
}
export interface MoodleAttempt {
  attempt_id: number; occurred_at: string; hvp_id: number; title: string; section_name: string | null;
  topic_key: string | null; topic_title: string | null; raw_score: number; max_score: number | null;
  pct: number | null; before_tracking: boolean; is_first_try: boolean;
}

export interface Me {
  person_id: string;
  display_name: string | null;
  role: Role;
  telegram_linked: boolean;
}

export interface Attention {
  type: "inactive" | "dropping" | "hard_topic" | "hard_lesson";
  person_id: string | null;
  display_name: string | null;
  topic_key: string | null;
  hvp_id?: number;
  title: string | null;
  value: number | null;
  value2: number | null;
}

export interface DailyRow { day: string; by_source: BySource }

export interface Overview {
  total_students: number;
  active_students: number;
  accuracy: number | null;
  accuracy_prev: number | null;
  answers: number;
  daily: DailyRow[];
  sources: string[];
  needs_attention: Attention[];
}

export interface RosterRow {
  person_id: string;
  display_name: string | null;
  accuracy: number | null;
  accuracy_prev: number | null;
  answers: number;
  last_active: string | null;
  weakest_topic: { topic_key: string; title: string; accuracy: number | null } | null;
  sources: string[];
}

export interface MatrixTopic { topic_key: string; title: string; kind: string; level: string; answers: number; accuracy: number | null }
export interface MatrixCell { person_id: string; topic_key: string; answers: number; accuracy: number | null }
export interface TopicMatrix {
  topics: MatrixTopic[];
  students: { person_id: string; display_name: string | null }[];
  cells: MatrixCell[];
  sources: string[];
  moodle?: MoodleMatrix | null;
}

export interface TopicDetail {
  topic_key: string;
  title: string;
  answers: number;
  accuracy: number | null;
  students: { person_id: string; display_name: string | null; answers: number; accuracy: number | null }[];
  most_missed: {
    item: string | null; label: string | null; wrong: number; answers: number;
    correct_answer?: string | null; wrong_answers?: WrongAnswer[];
  }[];
  sources: string[];
  moodle?: MoodleTopicDetail | null;
}

export interface StudentTopic {
  topic_key: string; kind: string; level: string; title: string;
  answers: number; accuracy: number | null; mastery: Mastery; last_at: string | null;
}

export interface StudentDetail {
  person: { id: string; display_name: string | null; role: Role } | null;
  summary: {
    accuracy: number | null; accuracy_prev: number | null; answers: number; streak: number;
    words_learned: number; active_days_month: number; last_active: string | null;
  };
  weak_topics: StudentTopic[];
  topics: StudentTopic[];
  trend: { week: string; answers: number; accuracy: number | null }[];
  calendar: { day: string; events: number; by_source: BySource }[];
  sources: BySource;
  recent_mistakes: {
    topic_key: string; title: string; item: string | null; item_label: string | null;
    source: string | null; activity: string; occurred_at: string;
    // Present only after the database RPC returns them; either may be null.
    correct_answer?: string | null; your_answer?: string | null;
  }[];
  moodle?: MoodleStudent | null;
  /** When the teacher archived this student; null or missing = active. */
  archived_at?: string | null;
}

/** One archived student in `analytics_teacher_archived` (newest archive first). */
export interface ArchivedRow {
  person_id: string;
  display_name: string | null;
  archived_at: string;
  last_active: string | null;
  sources: string[];
}

/** What `analytics_set_archived` returns. */
export interface ArchiveResult {
  person_id: string;
  archived: boolean;
  archived_at: string | null;
}

/** One person on the merge screen (`analytics_merge_candidates`). `accounts` are account sources
 *  (telegram, app, moodle); `events` = every answer and Moodle lesson attempt ever. */
export interface MergeCard {
  person_id: string;
  display_name: string | null;
  accounts: string[];
  events: number;
  last_active: string | null;
  archived_at: string | null;
  created_at: string;
}

export interface MergeCandidates {
  person: MergeCard;
  /** The other students of the same teacher, archived ones too, sorted by name. */
  candidates: MergeCard[];
}

export interface MergeResult {
  merge_id: number;
  kept_id: string;
  dropped_id: string;
  accounts_moved: number;
}

export type Result<T> = { data: T; error: null } | { data: null; error: string };
