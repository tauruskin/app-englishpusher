# Contract: Database Schema (Supabase)

Authoritative DDL — run once in the Supabase SQL editor (idempotent where practical). Any schema change updates this file first.

```sql
-- ============ profiles ============
create table public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default '',
  created_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "own profile select" on public.profiles
  for select using (auth.uid() = id);
create policy "own profile update" on public.profiles
  for update using (auth.uid() = id);

-- Auto-create profile on signup (display_name = email local part)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(split_part(new.email, '@', 1), ''));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============ trivia_results ============
create table public.trivia_results (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users (id) on delete cascade,
  app           text not null check (app in ('b1-trivia', 'c1-trivia')),
  topic_id      text not null,
  score_pct     smallint not null check (score_pct between 0 and 100),
  correct_words text[] not null default '{}',
  missed_words  text[] not null default '{}',
  created_at    timestamptz not null default now()
);

create index trivia_results_user_created on public.trivia_results (user_id, created_at desc);

alter table public.trivia_results enable row level security;

create policy "own results select" on public.trivia_results
  for select using (auth.uid() = user_id);
create policy "own results insert" on public.trivia_results
  for insert with check (auth.uid() = user_id);
create policy "own results delete" on public.trivia_results
  for delete using (auth.uid() = user_id);

-- ============ saved_words ============
create table public.saved_words (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  word       text not null,
  level      text not null check (level in ('B1', 'C1')),
  topic_id   text not null,
  source     text not null check (source in ('flashcards', 'trivia')),
  created_at timestamptz not null default now(),
  unique (user_id, word, level)
);

create index saved_words_user_level on public.saved_words (user_id, level);

alter table public.saved_words enable row level security;

create policy "own saved select" on public.saved_words
  for select using (auth.uid() = user_id);
create policy "own saved insert" on public.saved_words
  for insert with check (auth.uid() = user_id);
create policy "own saved delete" on public.saved_words
  for delete using (auth.uid() = user_id);

-- ============ study_events ============
create table public.study_events (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  app        text not null check (app in ('b1-flashcards', 'c1-flashcards')),
  topic_id   text not null,
  created_at timestamptz not null default now()
);

create index study_events_user_created on public.study_events (user_id, created_at desc);

alter table public.study_events enable row level security;

create policy "own events select" on public.study_events
  for select using (auth.uid() = user_id);
create policy "own events insert" on public.study_events
  for insert with check (auth.uid() = user_id);
```

## Auth configuration (Supabase dashboard, not SQL)

| Setting | Value |
|---|---|
| Email provider | enabled, **Confirm email = OFF** (v1, per spec) |
| Site URL | `https://app.englishpusher.in.ua` |
| Additional redirect URLs | `https://<cf-project>.pages.dev/**`, `http://localhost:5173/**` |
| Password reset redirect | `/account/` on the requesting origin |

## Invariants

- No table stores definitions/translations/examples — word references only (FR-018).
- `user_id`/`id` ownership policies are the entire access-control model; no service-role key ever ships to the client.
- `profiles` rows are created only by the trigger; clients only UPDATE `display_name`.
- Phase-2 teacher dashboard = additive migration: `alter table profiles add column role text not null default 'student'` + teacher-read policies. Nothing in v1 blocks it.
