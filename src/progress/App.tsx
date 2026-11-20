import { useEffect, useState, type ReactNode } from "react";
import { AppFooter, AppHeader } from "../shared/AppShell.tsx";
import { useAuth } from "../shared/auth.tsx";
import { isSupabaseConfigured } from "../shared/supabase.ts";
import { isDemo } from "../teacher/rpc.ts";
import { useData } from "../teacher/useData.ts";
import { Dimmed, StateBox } from "../teacher/ui.tsx";
import { progressApi } from "./api.ts";
import { parseRoute, routeHash, type Route } from "./route.ts";
import { hasActivity } from "./shape.ts";
import { Activity } from "./pages/Activity.tsx";
import { GetStarted } from "./pages/GetStarted.tsx";
import { Overview } from "./pages/Overview.tsx";
import { TopicPage } from "./pages/TopicPage.tsx";
import { TopicsTab } from "./pages/Topics.tsx";
import { telegramInitData } from "./telegram.ts";

function useRoute(): Route {
  const [route, setRoute] = useState(() => parseRoute(window.location.hash));
  useEffect(() => {
    const onHash = () => {
      setRoute(parseRoute(window.location.hash));
      window.scrollTo(0, 0); // only page changes use the hash here (no filters)
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
}

const TABS: { page: "home" | "topics" | "activity"; label: string }[] = [
  { page: "home", label: "Overview" },
  { page: "topics", label: "Topics" },
  { page: "activity", label: "Activity" },
];

function ProgressPages({ userId }: { userId: string }) {
  const route = useRoute();
  // Loaded once for all three tabs, so switching tabs never refetches or shows "Loading…" again.
  const { data, error, loading, retry } = useData(() => progressApi.me(), `progress:${userId}`, `progress:${userId}`);

  let content: ReactNode;
  if (!data) {
    content = error ? <StateBox error={error} onRetry={retry} /> : <StateBox>Loading…</StateBox>;
  } else if (!hasActivity(data)) {
    content = (
      <div className="space-y-5">
        {error && <StateBox error={error} onRetry={retry} />}
        <GetStarted name={data.person?.display_name ?? null} />
      </div>
    );
  } else {
    const onTopic = route.page === "topic";
    const activeTab = onTopic ? "topics" : route.page;
    let tab: ReactNode;
    if (route.page === "topics") tab = <TopicsTab data={data} />;
    else if (route.page === "activity") tab = <Activity data={data} />;
    else tab = <Overview data={data} />;

    content = (
      <div className="space-y-5">
        <nav className="flex gap-1 border-b border-neutral-200" aria-label="My progress sections">
          {TABS.map((t) => (
            <a
              key={t.page}
              href={routeHash({ page: t.page })}
              aria-current={activeTab === t.page ? "page" : undefined}
              className={`-mb-px flex min-h-[44px] items-center whitespace-nowrap rounded-t-md border-b-2 px-4 font-display focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand text-sm font-semibold transition-colors ${
                activeTab === t.page ? "border-brand text-neutral-900" : "border-transparent text-neutral-500 hover:text-neutral-800"
              }`}
            >
              {t.label}
            </a>
          ))}
        </nav>
        {route.page === "topic" ? (
          <TopicPage userId={userId} topicKey={route.topicKey} />
        ) : (
          <>
            {error && <StateBox error={error} onRetry={retry} />}
            <Dimmed when={loading || !!error}>{tab}</Dimmed>
          </>
        )}
      </div>
    );
  }

  return <div className="w-full max-w-3xl">{content}</div>;
}

export default function App() {
  const { user, loading } = useAuth();
  const inTelegram = telegramInitData() !== null;
  let body: ReactNode;
  if (isDemo) body = <ProgressPages userId="demo" />;
  else if (!isSupabaseConfigured) body = <p className="font-body text-sm text-neutral-700">Progress is not available right now.</p>;
  else if (inTelegram) body = <ProgressPages userId="telegram" />;
  else if (loading) body = <StateBox>Loading…</StateBox>;
  else if (!user) {
    body = (
      <p className="font-body text-sm text-neutral-700">
        Please <a href="/account/" className="text-brand hover:underline">sign in</a> to see your progress.
      </p>
    );
  }
  else body = <ProgressPages userId={user.id} />;

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <AppHeader title="My progress" subtitle={isDemo ? "Demo data" : "by Englishpusher"} />
      <main className="flex flex-1 justify-center px-4 py-6 sm:px-6 sm:py-8">{body}</main>
      <AppFooter />
    </div>
  );
}
