import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "./supabase.ts";

// ---------------------------------------------------------------------------
// useAuth() — shared auth state for every app.
//
// Rules for consumers (see specs/001-student-accounts/contracts/client-api.md):
//   - render guest UI while `loading`; auth-gated controls only when user !== null
//   - error results are user-displayable strings, never thrown
//   - when Supabase is unconfigured everything behaves as a signed-out guest
// ---------------------------------------------------------------------------

interface AuthState {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, name?: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthState | null>(null);

// Supabase error messages are already human-readable English; pass them
// through with a generic fallback for network-level failures.
function toMessage(error: { message?: string } | null): string | null {
  if (!error) return null;
  return error.message || "Something went wrong. Please try again.";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const value: AuthState = {
    user,
    loading,
    signUp: async (email, password, name) => {
      if (!isSupabaseConfigured) return { error: "Accounts are not available right now." };
      const trimmed = name?.trim();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        // Read by the on_auth_user_created trigger; falls back to the
        // email's local part there when omitted or blank.
        options: trimmed ? { data: { display_name: trimmed } } : undefined,
      });
      return { error: toMessage(error) };
    },
    signIn: async (email, password) => {
      if (!isSupabaseConfigured) return { error: "Accounts are not available right now." };
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error: toMessage(error) };
    },
    signOut: async () => {
      if (!isSupabaseConfigured) return;
      await supabase.auth.signOut();
    },
    resetPassword: async (email) => {
      if (!isSupabaseConfigured) return { error: "Accounts are not available right now." };
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/account/`,
      });
      return { error: toMessage(error) };
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

// ---------------------------------------------------------------------------
// useSessionUser() — lightweight session subscription for components that
// only need to know WHO is signed in (AppShell icon, star buttons, saves).
// Works without <AuthProvider>, so activity apps need no wrapping.
// ---------------------------------------------------------------------------

export function useSessionUser(): { user: User | null; loading: boolean } {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return { user, loading };
}
