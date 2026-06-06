# Favorites Feature — Future Backend Plan

**Status:** Shelved (2026-06-06). localStorage was considered and rejected: it is device-specific, so a student who marks favorites on their phone sees nothing when they open the app on a laptop. This document captures the full plan for when the teacher decides to revisit.

---

## Why a backend is required

Flashcard apps are static HTML/JS with no server. localStorage is the only built-in persistence — but it is scoped to one browser on one device. There is no way to sync it without a backend. Any favorites feature worth building needs a small database behind it.

---

## Recommended stack

**Supabase** — open-source Firebase alternative, free tier is generous enough for a small teaching app.

| What | Choice | Why |
|---|---|---|
| Database | Supabase (PostgreSQL) | SQL, free tier, open source, easy to migrate off |
| Auth | Supabase Auth | Built-in; supports anonymous + Google OAuth |
| API | Supabase auto-generated REST + JS client | No custom server needed |
| Hosting | Unchanged — GitHub Pages | Supabase is the only new service |

Alternative: **Firebase Firestore** (Google). Same idea, slightly more vendor lock-in, NoSQL schema is less clean for this use case. Supabase is recommended.

---

## Authentication strategy

Two-tier approach — frictionless by default, full sync on opt-in:

### Tier 1 — Anonymous session (auto, no login required)
On first visit, Supabase creates an anonymous user (UUID). This UUID is tied to the browser session. Favorites persist cross-session on the **same device and browser** — already better than plain localStorage. No login prompt, zero friction.

### Tier 2 — Named account (opt-in, unlocks cross-device sync)
A small "Sign in to sync across devices" button in the app (or header). Supports Google OAuth via Supabase. On sign-in, anonymous favorites are **merged** into the named account — the student doesn't lose what they already saved.

This is the standard "anonymous → named" upgrade pattern. The student never loses data.

---

## Data model

One table in Supabase:

```sql
create table favorites (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  app        text not null check (app in ('b1', 'c1')),
  topic_id   text not null,   -- e.g. 'adjectives-feelings' (from data.ts TOPICS[n].id)
  word       text not null,   -- English word/phrase (stable key from data.ts)
  created_at timestamptz not null default now(),

  unique (user_id, app, topic_id, word)
);

-- Row-level security: users can only see/write their own rows
alter table favorites enable row level security;

create policy "own rows only" on favorites
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
```

**Key design decision — store only the identity, not the word content.**
The word's English text is the stable key. Word content (translation, example, transcription) is always read fresh from `data.ts` at render time. This means:
- Teacher fixes a typo → student immediately sees the fix
- Teacher removes a word → it silently disappears from favorites (no orphan records shown)
- No content duplication between the database and `data.ts`

---

## Application architecture

### New shared file: `src/shared/favorites.ts`

A React hook + thin service layer. Both B1 and C1 apps import from here.

```ts
// Conceptual API — implementation will differ slightly based on Supabase client version

export type FavoriteKey = {
  app: "b1" | "c1";
  topicId: string;
  word: string;        // English word text
};

// Hook used inside FlashCard / App
export function useFavorites(app: "b1" | "c1") {
  // Returns:
  //   favorites: Set<string>   -- "topicId:word" keys for fast lookup
  //   toggle(key): void        -- add if absent, remove if present
  //   isFavorite(key): boolean
  //   loading: boolean
}
```

Internally the hook:
1. Subscribes to Supabase realtime for the current user's rows (optional — can poll instead)
2. Maintains an in-memory `Set<string>` for O(1) `isFavorite()` checks
3. Caches in localStorage as an offline fallback — if Supabase is unreachable, the last-known set is used and synced on reconnect
4. Debounces writes (toggle queues a write, fires after 300 ms) to avoid hammering the API on rapid clicks

### New shared file: `src/shared/AuthButton.tsx`

A small component dropped into `AppHeader` via the `controls` prop (already supported). Shows:
- "Sign in" when anonymous
- User avatar / email when signed in
- "Sign out" option

This is optional UI — the favorites feature works without it (anonymous tier).

### Changes to `src/b1-flashcards/App.tsx` and `src/c1-flashcards/App.tsx`

1. Import `useFavorites` hook
2. Add a heart/star `FavoriteButton` to the `FlashCard` component (visible on front and back faces)
3. Add a "Favorites" pseudo-topic to the `TopicSelectScreen` — rendered only when `favorites.size > 0`
4. In the studying phase, when the active topic is "favorites", pass `favoritedWords` (resolved from `data.ts`) as the word list instead of `topic.words`

No changes to `data.ts`, `AppShell.tsx`, or any trivia apps.

---

## Favorite button placement on the card

The button should appear in the **top-left corner** of every card face (front and back), so the student can mark a word at any point — before or after seeing the translation. A heart icon works well: outlined when not favorited, filled when favorited.

The button does NOT trigger a flip — it only toggles the favorite state. It should have a satisfying micro-animation (scale pulse) on toggle.

---

## Favorites review screen

When the student selects "Favorites" from the topic select screen, they enter the normal studying phase with `favoritedWords` as the word list. Everything else (FlashCard, navigation buttons, reverse mode, progress bar, teacher character) works identically — no new screen needed.

Edge case: if the student removes all favorites while reviewing, navigate back to the topic select screen automatically.

---

## Offline handling

1. On load: fetch favorites from Supabase → store in localStorage as `"b1-favorites-cache"` / `"c1-favorites-cache"`
2. If Supabase fetch fails: use localStorage cache and show a subtle "offline" indicator
3. On toggle while offline: write to localStorage cache; queue the change
4. When connectivity returns: flush the queue to Supabase; resolve conflicts by union (if marked on two devices independently, keep both)

---

## Effort estimate

| Task | Estimate |
|---|---|
| Supabase project setup, table creation, RLS policies | 1–2 h |
| Supabase Auth: anonymous + Google OAuth | 3–4 h |
| `src/shared/favorites.ts` hook + offline cache | 3–4 h |
| `src/shared/AuthButton.tsx` | 2 h |
| B1 flashcard integration (button + favorites topic) | 2–3 h |
| C1 flashcard integration (same) | 1–2 h |
| Testing across devices | 2 h |
| **Total** | **~14–17 h** |

This is a 2–3 day feature for one developer.

---

## Pre-requisites before starting

1. Create a Supabase account and project at https://supabase.com
2. Enable Google OAuth in Supabase Auth settings (requires a Google Cloud project)
3. Add Supabase JS client: `npm install @supabase/supabase-js`
4. Store Supabase URL + anon key in a `.env` file (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) — the anon key is safe to expose in frontend code when RLS is correctly configured
5. Add `.env` to `.gitignore` (already should be; double-check)

---

## Open questions to resolve before implementation

- Should the "Sign in to sync" button be prominent or hidden (power-user only)?
- Should favorites be shown as a topic card in the same grid as regular topics, or as a separate section at the top?
- What icon — heart (❤️) or star (⭐)? Heart implies emotional connection; star implies "important". Both are fine.
- Should the teacher be able to see all students' favorites in aggregate (requires a teacher-facing dashboard — out of scope for now)?
