# Contract: Shared Client Modules

The surface the four activity apps + account app + AppShell consume. Internals may change freely; these signatures may not (without updating all consumers).

## `src/shared/supabase.ts`

```ts
export const supabase: SupabaseClient; // singleton, created from import.meta.env
export const isSupabaseConfigured: boolean; // false when env vars are missing
```

`isSupabaseConfigured === false` (e.g. a fork without env vars, or prod before release merge) MUST degrade the whole feature to guest mode: no auth UI errors, apps behave exactly as today.

## `src/shared/auth.tsx`

```ts
export function AuthProvider(props: { children: ReactNode }): JSX.Element;

export function useAuth(): {
  user: User | null;        // null = guest (or still loading)
  loading: boolean;         // true until getSession() resolves
  signUp(email: string, password: string): Promise<{ error: string | null }>;
  signIn(email: string, password: string): Promise<{ error: string | null }>;
  signOut(): Promise<void>;
  resetPassword(email: string): Promise<{ error: string | null }>;
};
```

Rules for consumers:
- Render guest UI while `loading`; auth-gated controls (stars, account state) appear only when `user !== null`.
- Errors are returned as user-displayable strings, never thrown.

## `src/shared/progress.ts`

```ts
export type AppId = "b1-trivia" | "c1-trivia" | "b1-flashcards" | "c1-flashcards";
export type Level = "B1" | "C1";

export interface SavedWord { word: string; level: Level; topicId: string; source: "flashcards" | "trivia"; }
export interface TriviaResultInput { app: AppId; topicId: string; scorePct: number; correctWords: string[]; missedWords: string[]; }

// Fire-and-forget writes — resolve to an error string or null, NEVER throw, NEVER block UI:
export function saveTriviaResult(input: TriviaResultInput): Promise<string | null>;
export function logStudyEvent(app: AppId, topicId: string): Promise<string | null>;
export function saveWord(w: SavedWord): Promise<string | null>;      // upsert, no-op if exists
export function unsaveWord(word: string, level: Level): Promise<string | null>;

// Reads (personal page + My Words assembly):
export function listSavedWords(level?: Level): Promise<SavedWord[]>;
export function fetchProgress(): Promise<{
  results: Array<{ app: AppId; topicId: string; scorePct: number; correctWords: string[]; missedWords: string[]; createdAt: string }>;
  weakWords: Array<{ word: string; topicId: string; app: AppId }>;  // derived, newest-occurrence rule
  recentStudy: Array<{ app: AppId; topicId: string; createdAt: string }>; // max 20, newest first
}>;
```

All functions silently no-op / return empty when there is no session or `isSupabaseConfigured === false`.

## `src/shared/AppShell.tsx` (additions)

```ts
// AppHeader gains an auth-aware account element rendered automatically —
// no new required props. It links to /account/:
//   guest:      outline user icon
//   signed in:  filled user icon (brand-colored)
// Existing prop signatures are unchanged; all apps inherit with zero diffs.
```

## UI contracts in existing apps

- **Trivia end screen**: after session completes → `saveTriviaResult(...)` once (guard against double-fire on re-render); on error string → small dismissible notice. Word rows in results lists get a star toggle (`saveWord`/`unsaveWord`, optimistic). Guests: no stars, one subtle "Sign in to save your progress" link → `/account/`.
- **Flashcards**: card face gets a star toggle when signed in (placement per app's existing control row; absent for guests). Topic open → `logStudyEvent(...)` once per selection.
- **My Words virtual topic**: id `"my-words"` (reserved — `?topic=my-words` deep link resolves only when signed in with ≥1 resolvable word, else falls back to topic list). Appears first in the topic list with a star icon when it has ≥1 resolvable word. Contents = `listSavedWords(level)` resolved against local `TOPICS` (exact `topic_id` + `word` match; misses dropped).
