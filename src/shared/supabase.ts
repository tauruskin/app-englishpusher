import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// ---------------------------------------------------------------------------
// Shared Supabase client — one instance per page load, session persisted in
// localStorage so login carries across all MPA pages on the same origin.
//
// The anon key is public by design; Row Level Security is the security
// boundary. When env vars are missing (fork, or prod before the release
// merge wires them into CI), isSupabaseConfigured is false and every
// account feature must silently degrade to guest mode.
// ---------------------------------------------------------------------------

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(url && anonKey);

// When unconfigured, point the client at a syntactically valid dummy host.
// It is never contacted: all consumers gate on isSupabaseConfigured first.
export const supabase: SupabaseClient = createClient(
  url || "https://unconfigured.supabase.co",
  anonKey || "unconfigured",
);
