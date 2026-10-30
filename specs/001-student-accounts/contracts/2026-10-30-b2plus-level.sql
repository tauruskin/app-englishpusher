-- B2+ vocabulary level (2026-10-30). Widens the allowed values only.
-- Apply to the App's Supabase project (cwtidnvbazepqkfweaed) as migration "b2plus_level".
alter table public.trivia_results
  drop constraint trivia_results_app_check,
  add constraint trivia_results_app_check
    check (app in ('a2-trivia', 'a2plus-trivia', 'b1-trivia', 'b1plus-trivia', 'b2plus-trivia', 'c1-trivia'));

alter table public.saved_words
  drop constraint saved_words_level_check,
  add constraint saved_words_level_check
    check (level in ('A2', 'A2+', 'B1', 'B1+', 'B2+', 'C1'));

alter table public.study_events
  drop constraint study_events_app_check,
  add constraint study_events_app_check
    check (app in ('a2-flashcards', 'a2plus-flashcards', 'b1-flashcards', 'b1plus-flashcards', 'b2plus-flashcards', 'c1-flashcards'));
