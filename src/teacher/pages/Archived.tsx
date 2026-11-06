import { useState } from "react";
import { api } from "../api.ts";
import { daysAgo, personName } from "../format.ts";
import { useData } from "../useData.ts";
import { Card, Dimmed, SECONDARY_BUTTON, SourceDots, StateBox } from "../ui.tsx";
import type { PageProps } from "./types.ts";

// Students the teacher archived: hidden from every list and count, restorable here.
export function Archived({ href }: PageProps) {
  const { data, error, loading, retry } = useData(() => api.archived(), "archived", "archived");
  const [busy, setBusy] = useState<ReadonlySet<string>>(new Set());
  const [restored, setRestored] = useState<ReadonlySet<string>>(new Set()); // hidden at once, before the list reloads
  const [rowErrors, setRowErrors] = useState<ReadonlyMap<string, string>>(new Map());

  const back = <a href={href({ page: "students" })} className="font-body text-sm text-neutral-500 hover:text-brand">← Students</a>;
  if (!data) {
    return (
      <div className="space-y-3">
        {back}
        {error ? <StateBox error={error} onRetry={retry} /> : <StateBox>Loading…</StateBox>}
      </div>
    );
  }

  const unarchive = async (id: string) => {
    setBusy((s) => new Set(s).add(id));
    setRowErrors((m) => { const n = new Map(m); n.delete(id); return n; });
    const r = await api.setArchived(id, false);
    setBusy((s) => { const n = new Set(s); n.delete(id); return n; });
    if (r.error !== null) {
      const message = r.error;
      setRowErrors((m) => new Map(m).set(id, message));
      return;
    }
    setRestored((s) => new Set(s).add(id));
    retry();
  };

  const rows = data.filter((r) => !restored.has(r.person_id));
  return (
    <div className="space-y-3">
      {back}
      {error && <StateBox error={error} onRetry={retry} />}
      <Dimmed when={loading || !!error}>
        <Card title="Archived students" subtitle="Hidden from every list and count. Nothing is deleted; unarchive any time.">
          {rows.length === 0 ? (
            <StateBox>No archived students.</StateBox>
          ) : (
            <ul className="divide-y divide-neutral-100">
              {rows.map((r) => {
                const name = personName(r.display_name);
                const failed = rowErrors.get(r.person_id);
                return (
                  <li key={r.person_id} className="py-3 font-body text-sm">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="min-w-0">
                        <a href={href({ page: "student", personId: r.person_id })} className="font-semibold text-neutral-900 hover:text-brand hover:underline">
                          {name}
                        </a>
                        <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-500">
                          <span>archived {daysAgo(r.archived_at)}</span>
                          <span>last active {daysAgo(r.last_active)}</span>
                          <SourceDots sources={r.sources} />
                        </p>
                      </div>
                      <button
                        type="button"
                        className={SECONDARY_BUTTON}
                        disabled={busy.has(r.person_id)}
                        aria-label={`Unarchive ${name}`}
                        onClick={() => void unarchive(r.person_id)}
                      >
                        {busy.has(r.person_id) ? "Saving…" : "Unarchive"}
                      </button>
                    </div>
                    {failed && <div className="mt-2"><StateBox error={failed} /></div>}
                  </li>
                );
              })}
            </ul>
          )}
        </Card>
      </Dimmed>
    </div>
  );
}
