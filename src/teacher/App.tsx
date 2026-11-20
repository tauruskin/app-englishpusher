import { useEffect, useState, type ReactNode } from "react";
import { AppFooter, AppHeader } from "../shared/AppShell.tsx";
import { useAuth } from "../shared/auth.tsx";
import { isSupabaseConfigured } from "../shared/supabase.ts";
import { api, isDemo } from "./api.ts";
import { parseHash, toHash, type Filters, type Route, type Tab } from "./route.ts";
import { useData } from "./useData.ts";
import { StateBox } from "./ui.tsx";
import { Overview } from "./pages/Overview.tsx";
import { Students } from "./pages/Students.tsx";
import { Topics } from "./pages/Topics.tsx";
import { TopicPage } from "./pages/TopicPage.tsx";
import { StudentPage } from "./pages/StudentPage.tsx";
import { Archived } from "./pages/Archived.tsx";

const TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "students", label: "Students" },
  { id: "topics", label: "Topics" },
];

// Identifies the page being shown; filter changes keep it, so they don't scroll to top.
function routeKey(r: Route): string {
  return r.page === "student" ? `student:${r.personId}` : r.page === "topic" ? `topic:${r.topicKey}` : r.page;
}

function useHashState() {
  const [state, setState] = useState(() => parseHash(window.location.hash));
  useEffect(() => {
    let shown = routeKey(parseHash(window.location.hash).route);
    const onHash = () => {
      const next = parseHash(window.location.hash);
      setState(next);
      const key = routeKey(next.route);
      if (key !== shown) window.scrollTo(0, 0);
      shown = key;
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return state;
}

function Dashboard({ userId }: { userId: string }) {
  const { route, filters } = useHashState();
  // The key includes the signed-in user, so a different account never sees the previous account's role check.
  const me = useData(() => api.me(), `me:${userId}`, `me:${userId}`);
  const href = (r: Route, f: Filters = filters) => toHash(r, f);
  const go = (r: Route) => { window.location.hash = href(r); };
  const setFilters = (f: Filters) => { window.location.hash = href(route, f); };
  const props = { filters, setFilters, go, href: (r: Route) => href(r) };

  if (me.error) return <StateBox error={me.error} onRetry={me.retry} />;
  if (!me.data) return <StateBox>Loading…</StateBox>;
  if (me.data.role !== "teacher" && me.data.role !== "admin") {
    return <StateBox>This page is for teachers. <a href="/account/" className="text-brand hover:underline">Go to My Account</a></StateBox>;
  }

  let page: ReactNode;
  if (route.page === "students") page = <Students {...props} />;
  else if (route.page === "topics") page = <Topics {...props} />;
  else if (route.page === "topic") page = <TopicPage {...props} topicKey={route.topicKey} />;
  else if (route.page === "student") page = <StudentPage {...props} personId={route.personId} />;
  else if (route.page === "archived") page = <Archived {...props} />;
  else page = <Overview {...props} />;

  const activeTab: Tab =
    route.page === "student" || route.page === "archived" ? "students" : route.page === "topic" ? "topics" : route.page;
  return (
    <div className="w-full max-w-5xl space-y-5">
      <nav className="flex gap-1 border-b border-neutral-200" aria-label="Dashboard sections">
        {TABS.map((t) => (
          <a
            key={t.id}
            href={href({ page: t.id })}
            aria-current={activeTab === t.id ? "page" : undefined}
            className={`-mb-px border-b-2 px-4 py-2 font-display text-sm font-semibold transition-colors ${
              activeTab === t.id ? "border-brand text-neutral-900" : "border-transparent text-neutral-500 hover:text-neutral-800"
            }`}
          >
            {t.label}
          </a>
        ))}
      </nav>
      {page}
    </div>
  );
}

export default function App() {
  const { user, loading } = useAuth();
  let body: ReactNode;
  if (isDemo) body = <Dashboard userId="demo" />;
  else if (!isSupabaseConfigured) body = <StateBox>Analytics are not available right now.</StateBox>;
  else if (loading) body = <StateBox>Loading…</StateBox>;
  else if (!user) body = <StateBox>Please <a href="/account/" className="text-brand hover:underline">sign in</a> with your teacher account.</StateBox>;
  else body = <Dashboard userId={user.id} />;

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <AppHeader title="Teacher dashboard" subtitle={isDemo ? "Demo data" : "by Englishpusher"} />
      <main className="flex flex-1 justify-center px-4 py-6 sm:px-6 sm:py-8">{body}</main>
      <AppFooter />
    </div>
  );
}
