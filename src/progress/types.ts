// Shapes returned by analytics_student() and analytics_student_topic() (moodle-task-builder plan 1).
import type { BySource, MoodleStudent, Role, StudentTopic } from "../teacher/types.ts";

export type WeakTopic = Omit<StudentTopic, "last_at">;

export interface Week { week: string; answers: number; accuracy: number | null }

export interface CalendarDay { day: string; events: number; by_source: BySource }

export interface Mistake {
  topic_key: string; title: string; item: string | null; item_label: string | null;
  source: string | null; activity: string; occurred_at: string;
  // Present only after the database RPC returns them; either may be null.
  correct_answer?: string | null; your_answer?: string | null;
}

export interface Progress {
  person: { id: string; display_name: string | null; role: Role } | null;
  summary: {
    accuracy: number | null; accuracy_prev: number | null; answers: number; streak: number;
    words_learned: number; active_days_month: number; last_active: string | null;
  };
  weak_topics: WeakTopic[];
  topics: StudentTopic[];
  trend: Week[];
  calendar: CalendarDay[];
  sources: BySource;
  moodle?: MoodleStudent | null;
}

export interface TopicProgress {
  topic_key: string;
  title: string;
  trend: Week[];
  recent_mistakes: Mistake[];
}
