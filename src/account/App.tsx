import { AppHeader, AppFooter } from "../shared/AppShell.tsx";

// Placeholder shell — replaced by the real login form + personal page in US1.
export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader title="My Account" subtitle="by Englishpusher" />
      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <p className="font-body text-neutral-500">Coming soon.</p>
      </main>
      <AppFooter />
    </div>
  );
}
