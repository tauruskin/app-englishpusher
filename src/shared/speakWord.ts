// Speaks a vocabulary word with its pre-recorded MP3 (public/audio/jane/, made by
// scripts/generate-audio.ts) and falls back to the device voice when the file is missing or
// won't play. One word at a time: a new call stops the previous one. Never throws.
// Mute and "only after the student has interacted" checks stay with the caller.
import { AUDIO_VOICE_DIR, audioFileName } from "./audioName.ts";

export interface SpeakOptions {
  /** Device-voice fallback rate (default 0.9). */
  rate?: number;
  /** Device-voice names to prefer for the fallback, e.g. ["Daniel", "Karen", "Samantha"]. */
  preferredVoices?: string[];
}

let audio: HTMLAudioElement | null = null;
let request = 0;

function hasSpeech(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

function pickVoice(preferred: string[]): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  for (const name of preferred) {
    const v = voices.find((v) => v.name.includes(name) && v.lang.startsWith("en"));
    if (v) return v;
  }
  return voices.find((v) => v.lang === "en-US") ?? voices.find((v) => v.lang.startsWith("en")) ?? null;
}

function speakWithDevice(word: string, opts: SpeakOptions): void {
  if (!hasSpeech()) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US";
  utterance.rate = opts.rate ?? 0.9;
  const voice = pickVoice(opts.preferredVoices ?? []);
  if (voice) utterance.voice = voice;
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  request++;
  if (audio) audio.pause();
  if (hasSpeech()) window.speechSynthesis.cancel();
}

export function speakWord(word: string, opts: SpeakOptions = {}): void {
  try {
    stopSpeaking();
    const mine = request;
    if (typeof Audio === "undefined") {
      speakWithDevice(word, opts);
      return;
    }
    if (!audio) audio = new Audio();
    const el = audio;
    // Load errors arrive both as an `error` event and a rejected play(): speak only once.
    let fellBack = false;
    const fallback = () => {
      if (fellBack || mine !== request) return;
      fellBack = true;
      speakWithDevice(word, opts);
    };
    el.onerror = fallback;
    el.src = `${import.meta.env.BASE_URL}${AUDIO_VOICE_DIR}/${audioFileName(word)}`;
    el.play().catch((err: unknown) => {
      // A newer call interrupting this one rejects with AbortError: not a failure.
      if (err instanceof DOMException && err.name === "AbortError") return;
      fallback();
    });
  } catch {
    speakWithDevice(word, opts);
  }
}
