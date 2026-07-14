import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { motion } from "motion/react";
import { LogOut, BarChart3, Star, Clock } from "lucide-react";
import { AppHeader, AppFooter } from "../shared/AppShell.tsx";
import { useAuth } from "../shared/auth.tsx";
import { supabase, isSupabaseConfigured } from "../shared/supabase.ts";

// ---------------------------------------------------------------------------
// /account/ — login & signup when signed out, personal page when signed in.
// Sections (Progress / My Words / Recent activity) are filled in by US2-US4.
// ---------------------------------------------------------------------------

const inputCls =
  "w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 font-body text-sm " +
  "focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30";

const primaryBtnCls =
  "w-full rounded-lg bg-brand px-4 py-2.5 font-display text-sm font-bold text-white " +
  "hover:bg-brand/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

// ------------------------------- auth form --------------------------------

type FormMode = "login" | "signup" | "reset";

function AuthForm() {
  const { signIn, signUp, resetPassword } = useAuth();
  const [mode, setMode] = useState<FormMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const switchMode = (m: FormMode) => {
    setMode(m);
    setError(null);
    setInfo(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setInfo(null);

    if (mode === "reset") {
      const { error } = await resetPassword(email);
      setBusy(false);
      if (error) setError(error);
      else setInfo("Check your email for a password reset link.");
      return;
    }

    const { error } =
      mode === "login" ? await signIn(email, password) : await signUp(email, password);
    setBusy(false);
    if (error) setError(error);
    // success: onAuthStateChange flips the page to the personal view
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full max-w-sm"
    >
      <h1 className="font-display text-2xl font-bold text-neutral-900 text-center">
        {mode === "reset" ? "Reset password" : "My Account"}
      </h1>
      <p className="mt-1 mb-6 text-center font-body text-sm text-neutral-500">
        {mode === "reset"
          ? "We'll email you a link to set a new password."
          : "Track your progress and save words for later."}
      </p>

      {mode !== "reset" && (
        <div className="mb-5 grid grid-cols-2 rounded-lg bg-neutral-200/70 p-1">
          {(["login", "signup"] as const).map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className={`rounded-md py-2 font-display text-sm font-semibold transition-colors ${
                mode === m ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              {m === "login" ? "Log in" : "Sign up"}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          autoComplete="email"
          className={inputCls}
        />
        {mode !== "reset" && (
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={mode === "signup" ? "Password (min. 6 characters)" : "Password"}
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
            className={inputCls}
          />
        )}

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 font-body text-sm text-red-600">{error}</p>
        )}
        {info && (
          <p className="rounded-lg bg-green-50 px-3 py-2 font-body text-sm text-green-700">{info}</p>
        )}

        <button type="submit" disabled={busy} className={primaryBtnCls}>
          {busy ? "Please wait…" : mode === "login" ? "Log in" : mode === "signup" ? "Create account" : "Send reset link"}
        </button>
      </form>

      <div className="mt-4 text-center">
        {mode === "reset" ? (
          <button onClick={() => switchMode("login")} className="font-body text-sm text-brand hover:underline">
            ← Back to log in
          </button>
        ) : (
          <button onClick={() => switchMode("reset")} className="font-body text-sm text-neutral-500 hover:text-brand hover:underline">
            Forgot password?
          </button>
        )}
      </div>
    </motion.div>
  );
}

// -------------------------- password recovery form -------------------------

function NewPasswordForm({ onDone }: { onDone: () => void }) {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) setError(error.message);
    else onDone();
  };

  return (
    <div className="w-full max-w-sm">
      <h1 className="font-display text-2xl font-bold text-neutral-900 text-center">Set a new password</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New password (min. 6 characters)"
          autoComplete="new-password"
          className={inputCls}
        />
        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 font-body text-sm text-red-600">{error}</p>
        )}
        <button type="submit" disabled={busy} className={primaryBtnCls}>
          {busy ? "Please wait…" : "Save new password"}
        </button>
      </form>
    </div>
  );
}

// ------------------------------ personal page ------------------------------

function Section({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <section className="rounded-xl border border-neutral-200 bg-white p-5">
      <h2 className="mb-3 flex items-center gap-2 font-display text-base font-bold text-neutral-900">
        {icon}
        {title}
      </h2>
      {children}
    </section>
  );
}

function EmptyState({ children }: { children: ReactNode }) {
  return <p className="font-body text-sm text-neutral-400">{children}</p>;
}

function PersonalPage() {
  const { user, signOut } = useAuth();
  const [displayName, setDisplayName] = useState<string>("");

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("display_name")
      .eq("id", user.id)
      .single()
      .then(({ data }) => {
        if (data?.display_name) setDisplayName(data.display_name);
      });
  }, [user]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full max-w-2xl space-y-4"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-neutral-900">
            Hi, {displayName || "there"}! 👋
          </h1>
          <p className="font-body text-sm text-neutral-500">{user?.email}</p>
        </div>
        <button
          onClick={signOut}
          className="flex items-center gap-1.5 rounded-lg border border-neutral-300 px-3 py-2 font-body text-sm text-neutral-600 hover:border-neutral-400 hover:text-neutral-900 transition-colors"
        >
          <LogOut size={14} />
          Sign out
        </button>
      </div>

      <Section icon={<BarChart3 size={16} className="text-brand" />} title="My progress">
        <EmptyState>Nothing here yet — finish a trivia round and your scores will appear.</EmptyState>
      </Section>

      <Section icon={<Star size={16} className="text-brand" />} title="My words">
        <EmptyState>No saved words yet — tap the star on any flashcard to save a word.</EmptyState>
      </Section>

      <Section icon={<Clock size={16} className="text-brand" />} title="Recent activity">
        <EmptyState>No activity yet — open a flashcard topic to start studying.</EmptyState>
      </Section>
    </motion.div>
  );
}

// --------------------------------- shell -----------------------------------

export default function App() {
  const { user, loading } = useAuth();
  // Supabase recovery links land with #access_token=…&type=recovery
  const [recovering, setRecovering] = useState(() => window.location.hash.includes("type=recovery"));

  let body: ReactNode;
  if (!isSupabaseConfigured) {
    body = <EmptyState>Accounts are not available right now — please check back later.</EmptyState>;
  } else if (loading) {
    body = null; // sub-100ms localStorage read; avoid a flash of the wrong view
  } else if (recovering && user) {
    body = (
      <NewPasswordForm
        onDone={() => {
          setRecovering(false);
          window.history.replaceState(null, "", "/account/");
        }}
      />
    );
  } else if (user) {
    body = <PersonalPage />;
  } else {
    body = <AuthForm />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader title="My Account" subtitle="by Englishpusher" />
      <main className="flex flex-1 items-start justify-center px-6 py-10 sm:py-14">{body}</main>
      <AppFooter />
    </div>
  );
}
