import { useEffect, useState, type ReactNode } from "react";
import { AppFooter, AppHeader } from "../shared/AppShell.tsx";
import { useAuth } from "../shared/auth.tsx";
import { isSupabaseConfigured } from "../shared/supabase.ts";
import { isDemo } from "../teacher/rpc.ts";
import { StateBox } from "../teacher/ui.tsx";
import { parseRoute, type Route } from "./route.ts";
import { Home } from "./pages/Home.tsx";
import { TopicPage } from "./pages/TopicPage.tsx";

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

function ProgressPages({ userId }: { userId: string }) {
  const route = useRoute();
  return (
    <div className="w-full max-w-3xl">
      {route.page === "topic" ? <TopicPage userId={userId} topicKey={route.topicKey} /> : <Home userId={userId} />}
    </div>
  );
}

export default function App() {
  const { user, loading } = useAuth();
  let body: ReactNode;
  if (isDemo) body = <ProgressPages userId="demo" />;
  else if (!isSupabaseConfigured) body = <p className="font-body text-sm text-neutral-700">Progress is not available right now.</p>;
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
