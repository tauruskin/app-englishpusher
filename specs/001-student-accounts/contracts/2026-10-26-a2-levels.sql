-- A2 and A2+ vocabulary levels (2026-10-26). Widens the allowed values only.
-- Applied to the App's Supabase project (cwtidnvbazepqkfweaed) on 2026-10-27 as migration "a2_levels".
alter table public.trivia_results
  drop constraint trivia_results_app_check,
  add constraint trivia_results_app_check
    check (app in ('a2-trivia', 'a2plus-trivia', 'b1-trivia', 'c1-trivia'));

alter table public.saved_words
  drop constraint saved_words_level_check,
  add constraint saved_words_level_check
    check (level in ('A2', 'A2+', 'B1', 'C1'));

alter table public.study_events
  drop constraint study_events_app_check,
  add constraint study_events_app_check
    check (app in ('a2-flashcards', 'a2plus-flashcards', 'b1-flashcards', 'c1-flashcards'));
