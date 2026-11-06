import { api } from "../api.ts";
import { attemptsText, levelLabel, pct, personName, wrongAnswersText } from "../format.ts";
import { lookup } from "../lookup.ts";
import { sortRows } from "../sort.ts";
import { useData } from "../useData.ts";
import { BarRow, Card, Dimmed, FiltersRow, MistakeAnswers, MoodleRange, StatTile, StateBox } from "../ui.tsx";
import type { PageProps } from "./types.ts";

const KIND_LABEL: Record<string, string> = { grammar: "Grammar", vocab: "Vocabulary" };
const TOPIC_KEY = /^[a-z0-9]+:(grammar|vocab):/;

export function TopicPage({ filters, setFilters, href, topicKey }: PageProps & { topicKey: string }) {
  // Entity page: entityKey keeps another topic's numbers from showing under this one; key covers topic + filters.
  const { data, error, loading, retry } = useData(
    () => api.topic(topicKey, filters),
    JSON.stringify([topicKey, filters]),
    `topic:${topicKey}`,
  );
  const back = (
    <a href={href({ page: "topics" })} className="font-body text-sm text-neutral-500 hover:text-brand">← Topics</a>
  );
  if (!data) {
    return (
      <div className="space-y-3">
        {back}
        {error ? <StateBox error={error} onRetry={retry} /> : <StateBox>Loading…</StateBox>}
      </div>
    );
  }

  // Topic keys look like "b1:grammar:irregular-verbs"; the RPC does not return level/kind, so read them from the key.
  // The RPC does not raise for an unknown key (empty title, 0 answers), so only a well-formed key gets a subtitle.
  const [level, kind] = topicKey.split(":");
  const subtitle = TOPIC_KEY.test(topicKey)
    ? [levelLabel(level), lookup(KIND_LABEL, kind) ?? kind].join(" · ")
    : "";
  if (!data.title && data.answers === 0 && !data.moodle) {
    return (
      <div className="space-y-3">
        {back}
        <h1 className="mt-1 font-display text-2xl font-bold text-neutral-900">Unknown topic</h1>
        <StateBox>That topic doesn't exist.</StateBox>
      </div>
    );
  }
  const sources = [...new Set([...data.sources, ...(filters.source ? [filters.source] : [])])];
  const students = sortRows(data.students, (s) => s.accuracy, "asc"); // weakest first, no data last

  return (
    <div className="space-y-5">
      <div>
        {back}
        <h1 className="mt-1 font-display text-2xl font-bold text-neutral-900">{data.title || "Unknown topic"}</h1>
        {subtitle && <p className="font-body text-sm text-neutral-500">{subtitle}</p>}
      </div>
      <FiltersRow filters={filters} sources={sources} onChange={setFilters} />
      {error && <StateBox error={error} onRetry={retry} />}
      <Dimmed when={loading || !!error}>
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <StatTile label="Group accuracy" value={pct(data.accuracy)} />
            <StatTile label="Answers" value={`${data.answers}`} />
            <StatTile label="Students" value={`${data.students.length}`} />
          </div>
          {data.moodle && (
            <Card title="Moodle lessons on this topic" subtitle="H5P lesson scores. First try = the first attempt we saw. Moodle never changes the Bot and App accuracy.">
              <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                <StatTile label="First try" value={pct(data.moodle.first_try)} />
                <StatTile label="Latest" value={pct(data.moodle.latest)} />
                <StatTile label="Attempts" value={attemptsText(data.moodle.attempts)} hint="per student per lesson" />
                <StatTile label="Students (Moodle)" value={`${data.moodle.students}`} />
              </div>
              <table className="w-full font-body text-sm">
                <thead className="text-xs text-neutral-500">
                  <tr className="border-b border-neutral-200">
                    <th scope="col" className="py-2 pr-3 text-left font-semibold">Lesson</th>
                    <th scope="col" className="py-2 pr-3 text-left font-semibold">First try → latest</th>
                    <th scope="col" className="py-2 text-right font-semibold">Attempts</th>
                  </tr>
                </thead>
                <tbody>
                  {(data.moodle.lessons ?? []).map((l) => (
                    <tr key={l.hvp_id} className="border-b border-neutral-100">
                      <td className="py-2 pr-3 text-neutral-800">{l.title}{l.section_name && <span className="block text-xs text-neutral-400">{l.section_name}</span>}</td>
                      <td className="py-2 pr-3"><MoodleRange first={l.first_try} latest={l.latest} /></td>
                      <td className="py-2 text-right tabular-nums text-neutral-600">{attemptsText(l.attempts)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h3 className="mb-1 mt-5 font-display text-sm font-semibold text-neutral-700">Students</h3>
              <ul className="divide-y divide-neutral-100">
                {(data.moodle.by_student ?? []).map((s) => (
                  <li key={s.person_id} className="flex items-center justify-between gap-3 py-2 font-body text-sm">
                    <a href={href({ page: "student", personId: s.person_id })} className="truncate hover:text-brand hover:underline">{personName(s.display_name)}</a>
                    <span className="flex items-center gap-3">
                      <MoodleRange first={s.first_try} latest={s.latest} />
                      <span className="text-xs text-neutral-400">{s.attempts} {s.attempts === 1 ? "attempt" : "attempts"}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
          <Card title="Students on this topic" subtitle="Weakest first">
            {students.length === 0 ? (
              <StateBox>No answers for these filters.</StateBox>
            ) : (
              <div>
                {students.map((s) => (
                  <BarRow
                    key={s.person_id}
                    label={personName(s.display_name)}
                    value={s.accuracy}
                    max={100}
                    href={href({ page: "student", personId: s.person_id })}
                    note={`(${s.answers})`}
                  />
                ))}
              </div>
            )}
          </Card>
          <Card title="Most missed" subtitle="Questions and words answered wrong most often, worth reteaching">
            {data.most_missed.length === 0 ? (
              <StateBox>No mistakes on this topic.</StateBox>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full font-body text-sm">
                  <thead className="text-xs text-neutral-500">
                    <tr className="border-b border-neutral-200">
                      <th scope="col" className="py-2 pr-3 text-left font-semibold">Question / word</th>
                      <th scope="col" className="whitespace-nowrap py-2 text-right font-semibold">Wrong</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.most_missed.map((m, i) => (
                      <tr key={m.item ?? `row-${i}`} className="border-b border-neutral-100">
                        <td className="min-w-0 py-2 pr-3 text-neutral-800 [overflow-wrap:anywhere]">
                          {m.label ?? m.item ?? "(no label)"}
                          <MistakeAnswers yours={wrongAnswersText(m.wrong_answers)} correct={m.correct_answer} yoursLabel="Wrong answers" />
                        </td>
                        <td className="whitespace-nowrap py-2 text-right tabular-nums text-neutral-600">{m.wrong} of {m.answers}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
      </Dimmed>
    </div>
  );
}
