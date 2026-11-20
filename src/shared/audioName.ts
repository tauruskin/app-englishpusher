// Word → recording file name. Shared by the app (src/shared/speakWord.ts) and the generator
// (scripts/generate-audio.ts), so both always agree. Pure: no DOM or Node APIs.
// Name = readable slug + FNV-1a hash of the lowercase text, so case variants share one file,
// look-alike words never collide, and a corrected word gets a new file.

/** Folder under public/ (and under the site root) holding the current voice's recordings. */
export const AUDIO_VOICE_DIR = "audio/jane";

const SLUG_MAX = 40;

export function audioKey(word: string): string {
  return word.normalize("NFC").trim().replace(/\s+/g, " ").toLowerCase();
}

function fnv1a32(text: string): string {
  let hash = 0x811c9dc5;
  for (const byte of new TextEncoder().encode(text)) {
    hash ^= byte;
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

function slugify(key: string): string {
  const slug = key
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, SLUG_MAX)
    .replace(/-+$/, "");
  return slug || "w";
}

export function audioFileName(word: string): string {
  const key = audioKey(word);
  return `${slugify(key)}-${fnv1a32(key)}.mp3`;
}
