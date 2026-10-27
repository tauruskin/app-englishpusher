// Draws the seasonal decorations straight into the page (outside React, like the Moodle snippet):
// corner picture, hanger on a thread, ground picture, now-and-then flyers, word cards and the
// Animated / Still / Off switch. Start it with startSeasonal(); the returned function removes it all.
import "./seasonal.css";
import { THEMES, type PageLevel, type Theme } from "./themes.ts";

type Mode = "full" | "still" | "off";

const MODE_KEY = "ep-season-mode";
const FLY_GAP = 15; // minutes between flights after the first one of the day
const ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 3l1.8 4.7L16.5 9.5l-4.7 1.8L10 16l-1.8-4.7L3.5 9.5l4.7-1.8z"/><path d="M18 14l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z"/></svg>';

function read(store: "localStorage" | "sessionStorage", key: string): string | null {
  try {
    return window[store].getItem(key);
  } catch {
    return null;
  }
}

function write(store: "localStorage" | "sessionStorage", key: string, value: string) {
  try {
    window[store].setItem(key, value);
  } catch {
    // private window: decorations still work, they just forget
  }
}

function el(tag: string, cls = "", html = ""): HTMLElement {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (html) node.innerHTML = html;
  return node;
}

function startMode(): Mode {
  const saved = read("localStorage", MODE_KEY);
  if (saved === "full" || saved === "still" || saved === "off") return saved;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "still" : "full";
}

// The running decorations, so the hub's greeting chip can open the "Did you know?" card.
let showFactHook: ((from: HTMLElement) => void) | null = null;

export function showSeasonFact(from: HTMLElement) {
  showFactHook?.(from);
}

export function startSeasonal(theme: string, level: PageLevel): () => void {
  const art: Theme | undefined = THEMES[theme];
  if (!art || !level || document.getElementById("ep-season")) return () => {};
  const quiet = level === "quiet";

  const root = el("div");
  root.id = "ep-season";
  root.setAttribute("data-theme", theme);
  if (quiet) root.setAttribute("data-quiet", "");
  // Below the dark header, so the corner never covers the logo or the account icon.
  const header = document.querySelector("header");
  const headerGap = Math.max(0, Math.round(header?.getBoundingClientRect().bottom ?? 0));
  root.style.setProperty("--ep-s-top", `${headerGap}px`);

  let mode = startMode();
  let lastWord = -1;
  let bubble: HTMLElement | null = null;
  let deco: HTMLElement[] = [];
  const timers: number[] = [];
  const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));

  // What this page shows: the student's choice, but never movement on a practice page.
  const shown = (): Mode => (quiet && mode === "full" ? "still" : mode);

  function closeBubble() {
    bubble?.remove();
    bubble = null;
  }

  // A card next to a decoration: a small label, the English, the Ukrainian and a sentence.
  function showCard(from: HTMLElement, label: string, english: string, ukrainian: string, sentence: string, cls: string, ms: number) {
    closeBubble();
    const card = el("div", `ep-s ep-s-bubble${cls ? ` ${cls}` : ""}`);
    card.setAttribute("role", "status");
    card.appendChild(el("small")).textContent = label;
    card.appendChild(el("b")).textContent = english;
    card.appendChild(el("span")).textContent = ukrainian;
    card.appendChild(el("i")).textContent = sentence;
    root.appendChild(card);
    bubble = card;
    const r = from.getBoundingClientRect();
    const bw = card.offsetWidth;
    const bh = card.offsetHeight;
    const left = Math.min(Math.max(12, r.left + r.width / 2 - bw / 2), window.innerWidth - bw - 12);
    // Above the decoration when it fits below the header, otherwise below it.
    const top = r.top - bh - 10 >= headerGap + 8 ? r.top - bh - 10 : r.bottom + 10;
    card.style.left = `${left}px`;
    card.style.top = `${Math.min(top, window.innerHeight - bh - 12)}px`;
    later(() => {
      if (bubble === card) closeBubble();
    }, ms);
  }

  // A new random word each click, never the same twice in a row.
  function showWord(from: HTMLElement) {
    let i: number;
    do i = Math.floor(Math.random() * art!.words.length);
    while (art!.words.length > 1 && i === lastWord);
    lastWord = i;
    const [english, ukrainian, example] = art!.words[i];
    showCard(from, `${art!.name} word`, english, ukrainian, example, "", 9000);
  }

  function showFact(from: HTMLElement) {
    if (art!.fact) showCard(from, "Did you know?", art!.fact.title, art!.fact.uk, art!.fact.text, "ep-s-fact", 20000);
  }

  // The fact pops up by itself once per browser session, a moment after the page opens.
  function factOnce(from: HTMLElement) {
    if (quiet || !art!.fact || read("sessionStorage", "ep-season-fact") === theme) return;
    write("sessionStorage", "ep-season-fact", theme);
    later(() => {
      if (from.isConnected && !bubble) showFact(from);
    }, 2500);
  }

  // Flyers cross the screen only when animated: three waves of three on the first page of the day,
  // then one wave at most every FLY_GAP minutes (shared by all tabs).
  function flyOnce() {
    if (shown() !== "full" || !art!.flyer) return;
    const now = Date.now();
    const today = new Date().toDateString();
    if (now - (Number(read("localStorage", "ep-season-flew-at")) || 0) < FLY_GAP * 60000) return;
    const waves = read("localStorage", "ep-season-flew-day") === today ? [0] : [0, 1, 2];
    write("localStorage", "ep-season-flew-at", String(now));
    write("localStorage", "ep-season-flew-day", today);
    for (const wave of waves) {
      [0, 900, 1700].forEach((delay, n) => {
        const f = el("div", "ep-s ep-s-fly", art!.flyer);
        f.setAttribute("aria-hidden", "true");
        f.style.top = `${12 + n * 9 + wave * 5}vh`;
        f.style.width = `${56 - n * 10}px`;
        f.style.animationDelay = `${wave * 7000 + delay}ms`;
        f.addEventListener("animationend", (e) => {
          if (e.target === f) f.remove();
        });
        root.appendChild(f);
      });
    }
  }

  function wordButton(html: string): HTMLButtonElement {
    const b = el("button", "", html) as HTMLButtonElement;
    b.type = "button";
    b.setAttribute("aria-label", `${art!.name} word`);
    b.title = `Click for a ${art!.name} word`;
    b.addEventListener("click", (e) => {
      e.stopPropagation();
      showWord(b);
    });
    return b;
  }

  const ctl = el("div", "ep-s ep-s-ctl");

  function draw() {
    deco.forEach((node) => node.remove());
    deco = [];
    closeBubble();
    root.className = `ep-s-${shown()}`;
    if (shown() === "off") return;
    const corner = el("div", "ep-s ep-s-corner", art!.corner);
    corner.setAttribute("aria-hidden", "true");
    const hang = el("div", "ep-s ep-s-hang");
    hang.appendChild(el("div", "ep-s-thread"));
    hang.appendChild(wordButton(art!.hanger));
    const ground = el("div", "ep-s ep-s-ground");
    const groundButton = wordButton(art!.ground);
    ground.appendChild(groundButton);
    deco = [corner, hang, ground];
    deco.forEach((node) => root.insertBefore(node, ctl));
    flyOnce();
    factOnce(groundButton);
  }

  const toggle = el("button", "", ICON) as HTMLButtonElement;
  toggle.type = "button";
  toggle.title = `${art.name} decorations`;
  toggle.setAttribute("aria-label", `${art.name} decorations: animated, still or off`);
  toggle.setAttribute("aria-expanded", "false");
  const menu = el("div", "ep-s-menu");
  menu.appendChild(el("strong")).textContent = `${art.name} decorations`;
  const choices: [Mode, string][] = [
    ["full", "Animated"],
    ["still", "Still (no movement)"],
    ["off", "Off"],
  ];
  const buttons = choices.map(([value, label]) => {
    const b = el("button") as HTMLButtonElement;
    b.type = "button";
    b.textContent = label;
    b.setAttribute("aria-pressed", String(value === mode));
    b.addEventListener("click", () => {
      mode = value;
      write("localStorage", MODE_KEY, mode);
      buttons.forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      draw();
    });
    menu.appendChild(b);
    return b;
  });
  if (quiet) menu.appendChild(el("p")).textContent = "Practice pages always stay still.";

  function openMenu(open: boolean) {
    menu.classList.toggle("ep-s-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  }
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    openMenu(!menu.classList.contains("ep-s-open"));
  });
  menu.addEventListener("click", (e) => e.stopPropagation());
  ctl.appendChild(menu);
  ctl.appendChild(toggle);
  root.appendChild(ctl);
  document.body.appendChild(root);
  draw();

  const onClick = () => {
    openMenu(false);
    closeBubble();
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClick();
  };
  document.addEventListener("click", onClick);
  document.addEventListener("keydown", onKey);
  showFactHook = showFact;

  return () => {
    timers.forEach((t) => window.clearTimeout(t));
    document.removeEventListener("click", onClick);
    document.removeEventListener("keydown", onKey);
    if (showFactHook === showFact) showFactHook = null;
    root.remove();
  };
}
