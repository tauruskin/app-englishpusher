# Data Model: Student Accounts, Progress & Saved Words

Authoritative SQL (DDL, RLS policies, trigger) lives in [contracts/database.md](./contracts/database.md). This file describes the model conceptually.

## Entities

### profiles

One row per account, auto-created by trigger when the auth user is created.

| Field | Type | Rules |
|---|---|---|
| `id` | uuid, PK | = `auth.users.id` (FK, cascade delete) |
| `display_name` | text | student-provided name at signup, else the part of email before `@` |
| `email` | text | copied from `auth.users.email` at signup by the trigger; disambiguates same-named students for a future teacher view. Not the source of truth (`auth.users` is) and not kept in sync if the student later changes their email — acceptable since it only feeds a not-yet-built read view |
| `created_at` | timestamptz | default `now()` |

Forward-compatibility: a `role text default 'student'` column is **not** added now but the phase-2 teacher dashboard adds it plus teacher-read policies without touching other tables (FR-015). `email` is added ahead of that work so the dashboard needs no migration when it ships.

### trivia_results

One row per finished trivia session by a signed-in student.

| Field | Type | Rules |
|---|---|---|
| `id` | uuid, PK | default `gen_random_uuid()` |
| `user_id` | uuid, FK → auth.users | RLS owner column |
| `app` | text | `'b1-trivia'` \| `'c1-trivia'` (CHECK) |
| `topic_id` | text | matches `TOPICS[].id` in the app's `data.ts` |
| `score_pct` | smallint | 0–100 (CHECK) |
| `correct_words` | text[] | word strings as they appear in `data.ts` |
| `missed_words` | text[] | 〃 |
| `created_at` | timestamptz | default `now()` |

**Derived — weak words** (client-side, no table): for each distinct word across a student's results ordered newest→oldest, the first occurrence decides: in `missed_words` → weak, in `correct_words` → not weak.

**Derived — per-topic summary** (client-side): best = max(`score_pct`), latest = row with max(`created_at`) per (`app`, `topic_id`).

### saved_words

One row per student + word + level (dedup per FR-009).

| Field | Type | Rules |
|---|---|---|
| `id` | uuid, PK | default `gen_random_uuid()` |
| `user_id` | uuid, FK → auth.users | RLS owner column |
| `word` | text | exact string from `data.ts` |
| `level` | text | `'B1'` \| `'C1'` (CHECK) |
| `topic_id` | text | topic the word was saved from (resolution scope) |
| `source` | text | `'flashcards'` \| `'trivia'` (CHECK) |
| `created_at` | timestamptz | default `now()` |
| — | UNIQUE | (`user_id`, `word`, `level`) |

Saving an already-saved word from a different source/topic is a no-op (upsert on the unique constraint, first save wins). Unsave = DELETE by (`user_id`, `word`, `level`).

### study_events

One row per flashcard-topic open by a signed-in student.

| Field | Type | Rules |
|---|---|---|
| `id` | uuid, PK | default `gen_random_uuid()` |
| `user_id` | uuid, FK → auth.users | RLS owner column |
| `app` | text | `'b1-flashcards'` \| `'c1-flashcards'` (CHECK) |
| `topic_id` | text | matches `TOPICS[].id` |
| `created_at` | timestamptz | default `now()` |

No dedup — repeated opens are separate events; the personal page groups/limits for display (most recent 20).

## Relationships

```
auth.users 1 ── 1 profiles          (trigger-created)
auth.users 1 ── * trivia_results
auth.users 1 ── * saved_words       (unique per word+level)
auth.users 1 ── * study_events
```

No FKs between the data tables — words/topics are references into app content (`data.ts`), resolved at render and silently filtered when unresolvable (FR-011, FR-018).

## Access rules (RLS)

Every table: RLS enabled; policies allow SELECT / INSERT / UPDATE / DELETE only where `auth.uid() = user_id` (`profiles`: `auth.uid() = id`; UPDATE only, no user-facing INSERT/DELETE — the trigger owns creation). Anonymous (guest) sessions match no policy → no access. This is the entire security boundary (R2).

## Content resolution contract

Stored word references resolve against `data.ts` as: find topic where `TOPICS[].id === topic_id` → find entry where `word === stored word` (exact match, case-sensitive). Miss at either step ⇒ the reference is dropped from UI (My Words, weak words, saved list) without error.
