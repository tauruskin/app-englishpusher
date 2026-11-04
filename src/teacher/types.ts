// Shapes returned by the public.analytics_* RPCs (moodle-task-builder plan 1).
// No imports: tests load this file directly.

export type Role = "student" | "teacher" | "admin";
export type Mastery = "not_enough_data" | "needs_work" | "learning" | "strong" | "mastered";
export type BySource = Record<string, number>;

export interface Me {
  person_id: string;
  display_name: string | null;
  role: Role;
  telegram_linked: boolean;
}

export interface Attention {
  type: "inactive" | "dropping" | "hard_topic";
  person_id: string | null;
  display_name: string | null;
  topic_key: string | null;
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
}

export interface TopicDetail {
  topic_key: string;
  title: string;
  answers: number;
  accuracy: number | null;
  students: { person_id: string; display_name: string | null; answers: number; accuracy: number | null }[];
  most_missed: { item: string; label: string | null; wrong: number; answers: number }[];
  sources: string[];
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
    source: string; activity: string; occurred_at: string;
  }[];
}

export type Result<T> = { data: T; error: null } | { data: null; error: string };
