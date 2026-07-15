import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { motion } from "motion/react";
import { LogOut, BarChart3, Star, Clock, Eye, EyeOff } from "lucide-react";
import { AppHeader, AppFooter } from "../shared/AppShell.tsx";
import { useAuth } from "../shared/auth.tsx";
import { supabase, isSupabaseConfigured } from "../shared/supabase.ts";
import {
  fetchProgress,
  type AppId, type Level, type TriviaResultRow, type WeakWord, type StudyEventRow,
} from "../shared/progress.ts";
import { useSavedWords } from "../shared/savedWords.tsx";
import { TOPICS as B1_TOPICS } from "../b1-flashcards/data.ts";
import { TOPICS as C1_TOPICS } from "../c1-flashcards/data.ts";

// Resolve a stored topic reference against app content; null when the topic
// no longer exists (renamed/removed) — callers drop those rows silently.
function topicTitle(app: AppId, topicId: string): string | null {
  const topics = app.startsWith("b1") ? B1_TOPICS : C1_TOPICS;
  return topics.find((t) => t.id === topicId)?.title ?? null;
}

const APP_LABEL: Record<AppId, string> = {
  "b1-trivia": "B1 Trivia",
  "c1-trivia": "C1 Trivia",
  "b1-flashcards": "B1 Flash Cards",
  "c1-flashcards": "C1 Flash Cards",
};

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

// Password field with a show/hide toggle — shared by login/signup and the
// password-reset form.
function PasswordInput({
  value,
  onChange,
  placeholder,
  autoComplete,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  autoComplete: string;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <input
        type={visible ? "text" : "password"}
        required
        minLength={6}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`${inputCls} pr-10`}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        tabIndex={-1}
        className="absolute right-0 top-0 flex h-full w-10 items-center justify-center text-neutral-400 hover:text-neutral-600 transition-colors"
      >
        {visible ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}

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
          <PasswordInput
            value={password}
            onChange={setPassword}
            placeholder={mode === "signup" ? "Password (min. 6 characters)" : "Password"}
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
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
        <PasswordInput
          value={password}
          onChange={setPassword}
          placeholder="New password (min. 6 characters)"
          autoComplete="new-password"
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

interface TopicSummary {
  app: AppId;
  topicId: string;
  title: string;
  best: number;
  latest: number;
  latestDate: string;
  attempts: number;
}

function summarizeResults(results: TriviaResultRow[]): TopicSummary[] {
  const byTopic = new Map<string, TopicSummary>();
  // results arrive newest-first; the first row seen per topic is the latest
  for (const r of results) {
    const title = topicTitle(r.app, r.topicId);
    if (!title) continue; // topic removed from content — drop silently
    const key = `${r.app}::${r.topicId}`;
    const existing = byTopic.get(key);
    if (existing) {
      existing.best = Math.max(existing.best, r.scorePct);
      existing.attempts += 1;
    } else {
      byTopic.set(key, {
        app: r.app, topicId: r.topicId, title,
        best: r.scorePct, latest: r.scorePct,
        latestDate: r.createdAt, attempts: 1,
      });
    }
  }
  return [...byTopic.values()];
}

function ProgressSection({ summaries }: { summaries: TopicSummary[] }) {
  if (summaries.length === 0) {
    return <EmptyState>Nothing here yet — finish a trivia round and your scores will appear.</EmptyState>;
  }
  return (
    <div className="divide-y divide-neutral-100">
      {summaries.map((s) => (
        <div key={`${s.app}::${s.topicId}`} className="flex items-center justify-between gap-3 py-2.5">
          <div className="min-w-0">
            <p className="truncate font-body text-sm font-semibold text-neutral-800">{s.title}</p>
            <p className="font-body text-xs text-neutral-400">
              {APP_LABEL[s.app]} · {s.attempts} {s.attempts === 1 ? "round" : "rounds"}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-4 text-right">
            <div>
              <p className="font-display text-sm font-bold text-neutral-900">{s.best}%</p>
              <p className="font-body text-[11px] text-neutral-400">best</p>
            </div>
            <div>
              <p className="font-display text-sm font-bold text-brand">{s.latest}%</p>
              <p className="font-body text-[11px] text-neutral-400">latest</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function WeakWordsList({ weakWords }: { weakWords: WeakWord[] }) {
  const resolved = weakWords.filter((w) => topicTitle(w.app, w.topicId) !== null);
  if (resolved.length === 0) return null;
  return (
    <div className="mt-4 border-t border-neutral-100 pt-3">
      <p className="mb-2 font-body text-xs font-semibold uppercase tracking-wide text-neutral-400">
        Words to practice ({resolved.length})
      </p>
      <div className="flex flex-wrap gap-1.5">
        {resolved.map((w) => (
          <span
            key={`${w.app}::${w.word}`}
            title={topicTitle(w.app, w.topicId) ?? undefined}
            className="rounded-full bg-red-50 border border-red-100 px-2.5 py-1 font-body text-xs text-red-700"
          >
            {w.word}
          </span>
        ))}
      </div>
    </div>
  );
}

// Meaning shown next to a saved word: B1 words carry a Ukrainian
// translation; C1 words follow the definition-or-translation convention.
function wordMeaning(level: Level, topicId: string, word: string): string | null {
  if (level === "B1") {
    return B1_TOPICS.find((t) => t.id === topicId)?.words.find((w) => w.word === word)?.translation ?? null;
  }
  const w = C1_TOPICS.find((t) => t.id === topicId)?.words.find((x) => x.word === word);
  return w ? (w.definition ?? w.translation ?? null) : null;
}

function MyWordsSection() {
  const b1 = useSavedWords("B1");
  const c1 = useSavedWords("C1");

  const rows = [
    ...b1.savedWords.map((s) => ({ ...s, meaning: wordMeaning("B1", s.topicId, s.word) })),
    ...c1.savedWords.map((s) => ({ ...s, meaning: wordMeaning("C1", s.topicId, s.word) })),
  ].filter((r) => r.meaning !== null); // unresolvable references dropped silently

  if (rows.length === 0) {
    return <EmptyState>No saved words yet — tap the star on any flashcard to save a word.</EmptyState>;
  }

  const hasB1 = rows.some((r) => r.level === "B1");
  const hasC1 = rows.some((r) => r.level === "C1");

  return (
    <div>
      <div className="divide-y divide-neutral-100">
        {rows.map((r) => (
          <div key={`${r.level}::${r.word}`} className="flex items-center justify-between gap-3 py-2.5">
            <div className="min-w-0">
              <p className="font-body text-sm font-semibold text-neutral-800">
                {r.word}
                <span className="ml-2 rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-bold text-neutral-500">
                  {r.level}
                </span>
              </p>
              <p className="truncate font-body text-xs text-neutral-400">{r.meaning}</p>
            </div>
            <button
              onClick={() => (r.level === "B1" ? b1 : c1).toggle(r.word, r.topicId, r.source)}
              className="shrink-0 font-body text-xs text-neutral-400 hover:text-red-500 transition-colors"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2 border-t border-neutral-100 pt-3">
        {hasB1 && (
          <>
            <a href="/b1-flashcards/?topic=my-words" className="rounded-lg bg-brand/10 px-3 py-1.5 font-body text-xs font-semibold text-brand hover:bg-brand/20 transition-colors">
              Study B1 deck
            </a>
            <a href="/b1-trivia/?topic=my-words" className="rounded-lg bg-brand/10 px-3 py-1.5 font-body text-xs font-semibold text-brand hover:bg-brand/20 transition-colors">
              Quiz B1 deck
            </a>
          </>
        )}
        {hasC1 && (
          <>
            <a href="/c1-flashcards/?topic=my-words" className="rounded-lg bg-purple-100 px-3 py-1.5 font-body text-xs font-semibold text-purple-700 hover:bg-purple-200 transition-colors">
              Study C1 deck
            </a>
            <a href="/c1-trivia/?topic=my-words" className="rounded-lg bg-purple-100 px-3 py-1.5 font-body text-xs font-semibold text-purple-700 hover:bg-purple-200 transition-colors">
              Quiz C1 deck
            </a>
          </>
        )}
      </div>
    </div>
  );
}

function relativeDay(iso: string): string {
  const then = new Date(iso);
  const days = Math.floor((Date.now() - then.getTime()) / 86_400_000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return then.toLocaleDateString("en-GB", { weekday: "long" });
  return then.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function RecentActivity({ events }: { events: StudyEventRow[] }) {
  const rows = events
    .map((e) => ({
      ...e,
      title: e.topicId === "my-words" ? "My Words" : topicTitle(e.app, e.topicId),
    }))
    .filter((e) => e.title !== null);

  if (rows.length === 0) {
    return <EmptyState>No activity yet — open a flashcard topic to start studying.</EmptyState>;
  }
  return (
    <div className="divide-y divide-neutral-100">
      {rows.map((e, i) => (
        <div key={i} className="flex items-center justify-between gap-3 py-2">
          <p className="truncate font-body text-sm text-neutral-700">
            Studied <span className="font-semibold">{e.title}</span>
            <span className="ml-2 text-xs text-neutral-400">{APP_LABEL[e.app]}</span>
          </p>
          <p className="shrink-0 font-body text-xs text-neutral-400">{relativeDay(e.createdAt)}</p>
        </div>
      ))}
    </div>
  );
}

function PersonalPage() {
  const { user, signOut } = useAuth();
  const [displayName, setDisplayName] = useState<string>("");
  const [progress, setProgress] = useState<Awaited<ReturnType<typeof fetchProgress>> | null>(null);

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
    fetchProgress().then(setProgress);
  }, [user]);

  const summaries = progress ? summarizeResults(progress.results) : [];

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
        <ProgressSection summaries={summaries} />
        {progress && <WeakWordsList weakWords={progress.weakWords} />}
      </Section>

      <Section icon={<Star size={16} className="text-brand" />} title="My words">
        <MyWordsSection />
      </Section>

      <Section icon={<Clock size={16} className="text-brand" />} title="Recent activity">
        <RecentActivity events={progress?.recentStudy ?? []} />
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
