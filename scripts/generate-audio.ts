// Makes the recorded word pronunciations in public/audio/jane/ (see specs/002-word-audio/).
// Voices only words that have no recording yet, deletes recordings of words that no longer
// exist, and refuses to spend more than LIMIT characters unless run with --all.
//
//   node scripts/generate-audio.ts [--all] [--dry-run]      env: OPENROUTER_API_KEY
//
// Runs in the deploy workflow before every build. A failing voice service never fails the
// deploy: the app falls back to the device voice for words without a recording.
import { readdirSync, writeFileSync, rmSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { AUDIO_VOICE_DIR, audioKey, audioFileName } from "../src/shared/audioName.ts";

const MODEL = "mistralai/voxtral-mini-tts-2603";
const VOICE = "gb_jane_neutral";
const PRICE_PER_CHAR = 0.000016; // OpenRouter price for MODEL, 2026-11-20
const LIMIT = 5000;
const MAX_FAILS_IN_A_ROW = 5;
const LEVELS = ["a2", "a2plus", "b1", "b1plus", "b2plus", "c1"];

export interface AudioPlan {
  create: { file: string; text: string }[];
  remove: string[];
  /** Characters of the words that need a recording (whether or not they will be voiced). */
  chars: number;
  overLimit: boolean;
}

/** Pure: decide what to voice and what to delete. */
export function planAudio(
  words: string[],
  existingFiles: string[],
  { all, limit }: { all: boolean; limit: number },
): AudioPlan {
  const wanted = new Map<string, string>(); // file → first text met
  for (const raw of words) {
    const text = raw.trim();
    if (!text) continue;
    const file = audioFileName(text);
    if (!wanted.has(file)) wanted.set(file, text);
  }
  const existing = new Set(existingFiles);
  const missing = [...wanted].filter(([file]) => !existing.has(file)).map(([file, text]) => ({ file, text }));
  const chars = missing.reduce((sum, m) => sum + m.text.length, 0);
  const overLimit = !all && chars > limit;
  const remove = existingFiles.filter((f) => f.endsWith(".mp3") && !wanted.has(f));
  return { create: overLimit ? [] : missing, remove, chars, overLimit };
}

async function loadWords(): Promise<string[]> {
  const words: string[] = [];
  for (const level of LEVELS) {
    const url = new URL(`../src/${level}-flashcards/data.ts`, import.meta.url);
    const { TOPICS } = (await import(url.href)) as { TOPICS: { words: { word: string }[] }[] };
    for (const topic of TOPICS) for (const w of topic.words) words.push(w.word);
  }
  return words;
}

async function voice(text: string, key: string): Promise<Buffer> {
  const res = await fetch("https://openrouter.ai/api/v1/audio/speech", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({ model: MODEL, voice: VOICE, input: text, response_format: "mp3" }),
  });
  if (!res.ok) throw new Error(`${res.status} ${(await res.text()).slice(0, 200)}`);
  const bytes = Buffer.from(await res.arrayBuffer());
  if (bytes.length < 500) throw new Error(`audio too small (${bytes.length} bytes)`);
  return bytes;
}

const cost = (chars: number) => `~$${(chars * PRICE_PER_CHAR).toFixed(2)}`;

async function main(): Promise<void> {
  const args = new Set(process.argv.slice(2));
  const all = args.has("--all");
  const dryRun = args.has("--dry-run");
  const dir = fileURLToPath(new URL(`../public/${AUDIO_VOICE_DIR}/`, import.meta.url));
  mkdirSync(dir, { recursive: true });

  const words = await loadWords();
  const plan = planAudio(words, readdirSync(dir), { all, limit: LIMIT });
  const unique = new Set(words.map(audioKey)).size;
  console.log(`Words: ${words.length} (${unique} unique). Need a recording: ${plan.overLimit ? "" : plan.create.length + " "}` +
    `(${plan.chars} characters, ${cost(plan.chars)}). Orphans to remove: ${plan.remove.length}.`);
  if (plan.overLimit) {
    console.log(`::warning::Audio: ${plan.chars} characters is over the ${LIMIT}-character limit for an automatic run. ` +
      `Nothing voiced. Run "node scripts/generate-audio.ts --all" once to voice them all (${cost(plan.chars)}).`);
  }
  if (dryRun) {
    for (const c of plan.create.slice(0, 20)) console.log(`  + ${c.file}  "${c.text}"`);
    if (plan.create.length > 20) console.log(`  … and ${plan.create.length - 20} more`);
    for (const f of plan.remove) console.log(`  - ${f}`);
    console.log("Dry run: nothing written or deleted.");
    return;
  }

  for (const f of plan.remove) rmSync(resolve(dir, f));

  const key = process.env.OPENROUTER_API_KEY?.trim();
  let made = 0, skipped = 0, chars = 0, failsInARow = 0;
  if (!key && plan.create.length) {
    console.log("::notice::Audio: no OPENROUTER_API_KEY, skipping voicing (the app uses the device voice for these words).");
    skipped = plan.create.length;
  } else {
    for (const [i, item] of plan.create.entries()) {
      if (failsInARow >= MAX_FAILS_IN_A_ROW) {
        skipped += plan.create.length - i;
        console.log(`::warning::Audio: ${MAX_FAILS_IN_A_ROW} failures in a row, stopping. Remaining words use the device voice.`);
        break;
      }
      try {
        writeFileSync(resolve(dir, item.file), await voice(item.text, key!));
        made++; chars += item.text.length; failsInARow = 0;
        if (made % 100 === 0) console.log(`  … ${made} made`);
      } catch (err) {
        skipped++; failsInARow++;
        console.log(`::warning::Audio: could not voice "${item.text}": ${(err as Error).message}`);
      }
    }
  }
  console.log(`Audio: ${made} new, ${plan.remove.length} removed, ${skipped} skipped, ${chars} characters (${cost(chars)})`);
}

const runDirectly = process.argv[1] &&
  resolve(fileURLToPath(import.meta.url)).toLowerCase() === resolve(process.argv[1]).toLowerCase();
if (runDirectly) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
