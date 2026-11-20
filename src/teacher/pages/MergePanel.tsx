import { useState } from "react";
import { api } from "../api.ts";
import { accountsText, dateLabel, daysAgo, filterCandidates, mergeWarning, personName } from "../format.ts";
import { useData } from "../useData.ts";
import { Card, SECONDARY_BUTTON, StateBox } from "../ui.tsx";
import type { MergeCard, MergeResult } from "../types.ts";

const DANGER_BUTTON =
  "min-h-[44px] rounded-lg bg-red-700 px-4 py-2 font-body text-sm font-semibold text-white transition-colors hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50";

function eventsText(n: number): string {
  return `${n} ${n === 1 ? "answer or lesson" : "answers and lessons"}`;
}

// One person, as both columns of the confirmation show them.
function PersonFacts({ card, heading }: { card: MergeCard; heading: string }) {
  return (
    <div className="min-w-0 flex-1 rounded-lg border border-neutral-200 p-4">
      <p className="font-body text-xs font-semibold uppercase tracking-wide text-neutral-500">{heading}</p>
      <p className="mt-1 break-words font-display text-lg font-bold text-neutral-900">{personName(card.display_name)}</p>
      <dl className="mt-2 space-y-1 font-body text-sm text-neutral-700">
        <div><dt className="inline text-neutral-500">Accounts: </dt><dd className="inline">{accountsText(card.accounts)}</dd></div>
        <div><dt className="inline text-neutral-500">History: </dt><dd className="inline">{eventsText(card.events)}</dd></div>
        <div><dt className="inline text-neutral-500">Last active: </dt><dd className="inline">{daysAgo(card.last_active)}</dd></div>
        <div><dt className="inline text-neutral-500">First seen: </dt><dd className="inline">{dateLabel(card.created_at)}</dd></div>
        {card.archived_at && <div className="text-amber-800">Archived on {dateLabel(card.archived_at)}</div>}
      </dl>
    </div>
  );
}

/**
 * "Merge with another student" on a student page. The student of the page is KEPT; the one picked here is merged
 * into them (their accounts and history move over, their entry disappears). Two steps: pick, then confirm with
 * both people side by side.
 */
export function MergePanel({ personId, onCancel, onMerged }: {
  personId: string;
  onCancel: () => void;
  onMerged: (result: MergeResult, droppedName: string) => void;
}) {
  const { data, error, retry } = useData(() => api.mergeCandidates(personId), personId, `merge:${personId}`);
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState<MergeCard | null>(null);
  const [saving, setSaving] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);

  const merge = async () => {
    if (!picked) return;
    setSaving(true);
    setFailure(null);
    const r = await api.mergeStudents(personId, picked.person_id);
    setSaving(false);
    if (r.error !== null) { setFailure(r.error); return; }
    onMerged(r.data, personName(picked.display_name));
  };

  const close = (
    <button type="button" className={SECONDARY_BUTTON} disabled={saving} onClick={onCancel}>Cancel</button>
  );

  if (!data) {
    return (
      <Card title="Merge with another student" right={close}>
        {error ? <StateBox error={error} onRetry={retry} /> : <StateBox>Loading students…</StateBox>}
      </Card>
    );
  }

  const name = personName(data.person.display_name);

  if (picked) {
    return (
      <Card title="Check before merging" subtitle="Make sure these two are the same person." right={close}>
        <div className="flex flex-col gap-3 md:flex-row">
          <PersonFacts card={data.person} heading="Stays (this page)" />
          <PersonFacts card={picked} heading="Merges into it" />
        </div>
        <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 font-body text-sm text-amber-900">
          {mergeWarning(data.person.display_name, picked.display_name)}
        </p>
        {failure && <div className="mt-3"><StateBox error={failure} /></div>}
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" className={DANGER_BUTTON} disabled={saving} onClick={() => void merge()}>
            {saving ? "Merging…" : `Merge ${personName(picked.display_name)} into ${name}`}
          </button>
          <button type="button" className={SECONDARY_BUTTON} disabled={saving} onClick={() => { setPicked(null); setFailure(null); }}>
            Back
          </button>
        </div>
      </Card>
    );
  }

  const shown = filterCandidates(data.candidates, query);
  return (
    <Card
      title="Merge with another student"
      subtitle={`Pick the entry that is the same person as ${name}. Its accounts and history move to ${name}.`}
      right={close}
    >
      <label className="block font-body text-sm text-neutral-600">
        <span className="sr-only">Search by name</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name"
          className="min-h-[44px] w-full rounded-lg border border-neutral-300 px-3 py-2 font-body text-base text-neutral-900 focus:border-brand focus:outline-none md:text-sm"
        />
      </label>
      {data.candidates.length === 0 ? (
        <div className="mt-3"><StateBox>No other students to merge with.</StateBox></div>
      ) : shown.length === 0 ? (
        <div className="mt-3"><StateBox>No student matches “{query.trim()}”.</StateBox></div>
      ) : (
        <ul className="mt-3 max-h-[28rem] divide-y divide-neutral-100 overflow-y-auto">
          {shown.map((c) => (
            <li key={c.person_id}>
              <button
                type="button"
                onClick={() => setPicked(c)}
                className="flex min-h-[44px] w-full flex-wrap items-baseline justify-between gap-2 px-1 py-2 text-left font-body text-sm hover:bg-neutral-50"
              >
                <span className="min-w-0">
                  <span className="break-words font-semibold text-neutral-900">{personName(c.display_name)}</span>
                  {c.archived_at && <span className="ml-2 rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-500">archived</span>}
                  <span className="block text-xs text-neutral-500">{accountsText(c.accounts)} · {eventsText(c.events)}</span>
                </span>
                <span className="text-xs text-neutral-500">Last active {daysAgo(c.last_active)}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
