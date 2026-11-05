import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { createLinkCode } from "./telegramSyncApi.ts";
import type { LinkCode } from "./telegramSync.ts";

const buttonCls =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 font-display text-sm font-bold text-white " +
  "hover:bg-brand/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2";

// "Connect Telegram" card on /account/. `linked` is null while unknown: nothing is shown then.
export default function TelegramSync({ linked, onRecheck }: { linked: boolean | null; onRecheck: () => void }) {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<LinkCode | null>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const ready = result?.kind === "ready" ? result : null;

  // The button the student pressed is replaced by the link: hand the keyboard focus over to it.
  useEffect(() => {
    if (ready) linkRef.current?.focus();
  }, [ready]);

  // An expired link no longer works: go back to the idle card so the student can ask for a new one.
  useEffect(() => {
    if (!ready) return;
    const expiresAt = Date.parse(ready.expiresAt);
    if (Number.isNaN(expiresAt)) return;
    const timer = setTimeout(() => setResult(null), Math.max(0, expiresAt - Date.now()));
    return () => clearTimeout(timer);
  }, [ready]);

  if (linked === null) return null;

  if (linked) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-white px-5 py-4">
        <span className="flex items-center gap-2 font-display text-sm font-bold text-neutral-900">
          <Send size={16} className="text-brand" /> Telegram connected ✓
        </span>
        <span className="text-right font-body text-xs text-neutral-400">Your Quiz Bot progress counts here too.</span>
      </div>
    );
  }

  const connect = async () => {
    setBusy(true);
    const r = await createLinkCode();
    setBusy(false);
    if (r.kind === "linked") {
      setResult(null);
      onRecheck(); // linked already (e.g. in another tab): refresh the account state
      return;
    }
    setResult(r);
  };

  return (
    <section className="rounded-xl border border-neutral-200 bg-white p-5">
      <h2 className="mb-1 flex items-center gap-2 font-display text-base font-bold text-neutral-900">
        <Send size={16} className="text-brand" />
        Connect Telegram
      </h2>
      <p className="mb-4 font-body text-sm text-neutral-500">
        Link the Quiz Bot to your App account, so all your progress counts together. This does not subscribe you to daily questions.
      </p>

      {ready ? (
        <div>
          {/* data-clarity-mask: the href carries a one-time code */}
          <a ref={linkRef} href={ready.url} target="_blank" rel="noopener noreferrer" data-clarity-mask="true" className={buttonCls}>
            Open the Quiz Bot and tap Start
          </a>
          <p className="mt-2 font-body text-xs text-neutral-500">The link works for 15 minutes.</p>
          <button
            type="button"
            onClick={connect}
            disabled={busy}
            className="mt-2 rounded font-body text-xs font-semibold text-brand hover:underline disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
          >
            {busy ? "Creating link…" : "Get a new link"}
          </button>
        </div>
      ) : (
        <div>
          {result?.kind === "error" && (
            <p role="alert" className="mb-3 rounded-lg bg-red-50 px-3 py-2 font-body text-sm text-red-600">{result.message}</p>
          )}
          <button type="button" onClick={connect} disabled={busy} className={buttonCls}>
            {busy ? "Creating link…" : result?.kind === "error" ? "Try again" : "Connect Telegram"}
          </button>
        </div>
      )}
    </section>
  );
}
