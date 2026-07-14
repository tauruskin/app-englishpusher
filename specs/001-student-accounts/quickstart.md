# Quickstart: Setup & Validation

Setup prerequisites and end-to-end validation scenarios for the student-accounts feature. Schema details: [contracts/database.md](./contracts/database.md); module surface: [contracts/client-api.md](./contracts/client-api.md).

## One-time setup

### 1. Supabase project (owner does this once)

1. In the existing Supabase account, create project `englishpusher` (region: EU).
2. SQL editor → run the DDL from [contracts/database.md](./contracts/database.md).
3. Auth → Providers → Email: enable, **turn OFF "Confirm email"**.
4. Auth → URL Configuration: Site URL `https://app.englishpusher.in.ua`; add redirect URLs `https://<cf-project>.pages.dev/**` and `http://localhost:5173/**`.
5. Copy Project URL + anon public key (Settings → API).

### 2. Local dev

```bash
# .env.local (gitignored)
VITE_SUPABASE_URL=https://<ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon key>

npm install        # brings in @supabase/supabase-js
npm run dev        # http://localhost:5173
```

### 3. Cloudflare Pages (beta)

1. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → select `tauruskin/app-englishpusher`.
2. Production branch: **`beta`**. Build command: `npm run build`. Output: `dist`.
3. Environment variables: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_BASE_PATH=/`, `NODE_VERSION=20`.
4. Deploy → note the stable `https://<project>.pages.dev` URL → add it to Supabase redirect allowlist (step 1.4) → send to teacher.

Keeping beta current with production lessons: `git checkout beta && git merge main && git push` after each lesson lands on `main`.

## Validation scenarios

Run against local dev or the beta URL. Browser automation uses the established playwright-core + system Edge recipe. **G** = guest-parity checks, run signed out.

| # | Scenario | Steps | Expected |
|---|---|---|---|
| V1 | Signup | `/account/` → sign up with fresh email + password | Signed in immediately (no confirm step); personal page renders; `profiles` row exists |
| V2 | Session across MPA | While signed in, visit `/`, `/b1-trivia/`, `/c1-flashcards/`, `/account/` | Filled user icon everywhere; no re-login |
| V3 | Session survives restart | Close browser, reopen `/account/` | Still signed in |
| V4 | Trivia auto-save | Finish a `/b1-trivia/` session signed in | End screen instant; row in `trivia_results` with correct topic/score/word arrays; result on personal page within 5 s |
| V5 | Save failure is non-blocking | Finish a session with DevTools offline | End screen works; small notice shown; no crash |
| V6 | Weak words rule | Miss word X in session 1, answer X correctly in session 2, miss X in session 3 | X listed as weak (newest occurrence wins); after a session 4 where X is correct → not weak |
| V7 | Star on flashcards | Star 2 words in `/b1-flashcards/`, unstar 1 | `saved_words` reflects both operations; stars persist across reload |
| V8 | Star from trivia results | Star a missed word on the end screen | Row in `saved_words` with `source='trivia'`; dedup: starring same word again elsewhere is a no-op |
| V9 | My Words deck | With ≥1 B1 saved word, open `/b1-flashcards/` and `/b1-trivia/` topic lists | "My Words" topic listed first with exactly the saved words; absent at C1 if no C1 words; disappears after unsaving all |
| V10 | Unresolvable word filtered | Manually insert a `saved_words` row with fake `topic_id` | Word silently absent from My Words + personal page; no error |
| V11 | Password reset | "Forgot password" → email link → new password | Reset email arrives; new password works; redirect lands on `/account/` |
| V12 | Sign out | Sign out on `/account/`; visit other apps | Outline icon everywhere; no personal data anywhere |
| V13 | RLS isolation | User A signed in: query user B's rows via `supabase.from('trivia_results').select()` filtered to B's id (console) | Zero rows returned (not an error — empty) |
| V14-G | Guest parity | Signed out: full pass through hub, both trivias, both flashcard apps, chooser pages, `?topic=` deep links | Behavior identical to production; no stars, no saves, only the subtle sign-in hint on trivia end screen |
| V15-G | Reserved deep link | Signed out: open `/b1-flashcards/?topic=my-words` | Falls back to topic list, no error |
| V16 | Beta isolation | Push a commit to `beta` | `<project>.pages.dev` updates; `app.englishpusher.in.ua` unchanged |
| V17 | Content sync | Merge `main` → `beta` after a lesson lands on main | New lesson visible on beta with account features intact |

## Release (after teacher approval)

1. Merge `beta` → `main`.
2. Add `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` to the GitHub Actions workflow (repo variables + `env:` in build step).
3. Verify V1/V2/V4 against production. CNAME safeguard untouched throughout.
