// Telegram Mini App launch (plan 4). Telegram opens the page with #tgWebAppData=<signed initData>&…;
// the data goes to the progress-telegram Edge Function, which checks the signature.

export interface MiniStore { getItem(key: string): string | null; setItem(key: string, value: string): void }
interface TelegramWebApp { ready?: () => void; expand?: () => void; openTelegramLink?: (url: string) => void }
declare global { interface Window { Telegram?: { WebApp?: TelegramWebApp } } }

const KEY = "ep.progress.tgInitData";
const SDK_URL = "https://telegram.org/js/telegram-web-app.js";
let current: string | null = null;

export function initDataFromHash(hash: string): string | null {
  if (!hash.includes("tgWebAppData=")) return null;
  return new URLSearchParams(hash.replace(/^#/, "")).get("tgWebAppData") || null;
}

// The initData of this launch (from the hash, or after a reload from sessionStorage), or null.
export function captureLaunch(hash: string, store: MiniStore | null): string | null {
  current = initDataFromHash(hash);
  if (current) {
    try { store?.setItem(KEY, current); } catch { /* storage blocked: works until reload */ }
  } else {
    try { current = store?.getItem(KEY) ?? null; } catch { current = null; }
  }
  return current;
}

export function telegramInitData(): string | null {
  return current;
}

// Opens a t.me link through Telegram (stays in the app); false → let the browser follow the link.
export function openInTelegram(url: string, sdk: TelegramWebApp | undefined = globalThis.window?.Telegram?.WebApp): boolean {
  if (!current || !sdk?.openTelegramLink) return false;
  sdk.openTelegramLink(url);
  return true;
}

// For <a onClick>: open through Telegram when inside it, otherwise a normal link click.
export function onTelegramLinkClick(e: { preventDefault(): void; currentTarget: { href: string } }): void {
  if (openInTelegram(e.currentTarget.href)) e.preventDefault();
}

function loadSdk(doc: Document, timeoutMs: number): Promise<void> {
  return new Promise((resolve) => {
    const s = doc.createElement("script");
    s.src = SDK_URL;
    s.async = true;
    const done = () => resolve();
    s.onload = done;
    s.onerror = done; // the page still works without the SDK (plain links)
    setTimeout(done, timeoutMs);
    doc.head.appendChild(s);
  });
}

function sessionStore(w: Window): MiniStore | null {
  try { return w.sessionStorage; } catch { return null; }
}

// Called once before React renders (main.tsx).
export async function startTelegram(w: Window = window): Promise<void> {
  if (!captureLaunch(w.location.hash, sessionStore(w))) return;
  await loadSdk(w.document, 3000);
  w.Telegram?.WebApp?.ready?.();
  w.Telegram?.WebApp?.expand?.();
  if (initDataFromHash(w.location.hash)) {
    w.history.replaceState(null, "", `${w.location.pathname}${w.location.search}#/`);
  }
}
