// Seasonal decorations: which theme is on for a date, how much each page gets, and each theme's art
// and words. The same themes run on Moodle (moodle-task-builder/seasonal-decorations/moodle-seasonal.html):
// when a theme changes there, copy the art, words and dates here too.

export type PageLevel = "full" | "quiet" | "";

export type Season =
  | { theme: string; from: [number, number]; to: [number, number] } // [month, day], inclusive
  | { theme: string; easter: [number, number] }; // days before / after Orthodox Easter

export interface Theme {
  name: string;
  greeting: string; // chip next to the hero badge on the hub page
  accent: { ink: string; soft: string }; // ink: menu, card label and chip text; soft: chip and pressed-button background
  flight: "across" | "fall" | "rise"; // how the flyer moves
  corner: string; // SVG: top right corner picture
  hanger: string; // SVG: hangs from the corner on a thread (clickable)
  ground: string; // SVG: sits in the bottom left (clickable)
  flyer: string; // SVG: crosses the screen now and then
  words: [english: string, ukrainian: string, example: string][];
  fact?: { title: string; uk: string; text: string }; // "Did you know?" card
}

// A row is either from/to ([month, day], both inclusive; a range may run over New Year, from
// [12, 6] to [1, 10]) or easter: [daysBefore, daysAfter] around Orthodox Easter, e.g.
// { theme: "easter", easter: [-7, 7] }. Add a row when a theme's art is ready.
export const SEASONS: Season[] = [{ theme: "halloween", from: [10, 24], to: [11, 1] }];

// Orthodox Easter for a year (Meeus' Julian formula, moved to our calendar; right for 1900-2099).
export function orthodoxEaster(year: number): Date {
  const a = year % 4, b = year % 7, c = year % 19;
  const d = (19 * c + 15) % 30, e = (2 * a + 4 * b - d + 34) % 7, n = d + e + 114;
  return new Date(year, Math.floor(n / 31) - 1, (n % 31) + 1 + 13);
}

export function seasonFor(date: Date, seasons: Season[] = SEASONS): string {
  const md = (date.getMonth() + 1) * 100 + date.getDate();
  const day = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const hit = seasons.find((s) => {
    if ("easter" in s) {
      const diff = Math.round((day.getTime() - orthodoxEaster(day.getFullYear()).getTime()) / 86400000);
      return diff >= s.easter[0] && diff <= s.easter[1];
    }
    const from = s.from[0] * 100 + s.from[1];
    const to = s.to[0] * 100 + s.to[1];
    return from <= to ? md >= from && md <= to : md >= from || md <= to;
  });
  return hit ? hit.theme : "";
}

// Pages where students choose what to do get everything; practice pages (flash cards, trivia,
// games) get the same pictures completely still, with no bats and no pop-up card.
const FULL_PAGES = ["", "account", "a2-vocabulary", "a2plus-vocabulary", "b1-vocabulary", "c1-business"];

export function pageLevel(pathname: string): PageLevel {
  const first = pathname.replace(/index\.html$/, "").split("/").filter(Boolean)[0] ?? "";
  return FULL_PAGES.includes(first) ? "full" : "quiet";
}

// A corner spider web, drawn from the top right corner of a 170 x 170 box.
function webSvg(): string {
  const size = 170;
  const angles: number[] = [];
  for (let a = 90; a <= 180; a += 15) angles.push((a * Math.PI) / 180);
  const pt = (rad: number, ang: number) =>
    `${(size + rad * Math.cos(ang)).toFixed(1)} ${(rad * Math.sin(ang)).toFixed(1)}`;
  let d = angles.map((ang) => `M${size} 0L${pt(size, ang)}`).join("");
  for (const rad of [26, 50, 76, 104, 134]) {
    for (let i = 0; i < angles.length - 1; i++) {
      d += `M${pt(rad, angles[i])}Q${pt(rad * 0.86, (angles[i] + angles[i + 1]) / 2)} ${pt(rad, angles[i + 1])}`;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 170"><path d="${d}" fill="none" stroke="#7d8790" stroke-width="1" stroke-opacity=".7"/></svg>`;
}

const SVG = 'xmlns="http://www.w3.org/2000/svg"';

export const THEMES: Record<string, Theme> = {
  halloween: {
    name: "Halloween",
    greeting: "Happy Halloween!",
    accent: { ink: "#6b21a8", soft: "#f3e8ff" },
    flight: "across",
    corner: webSvg(),
    hanger:
      `<svg ${SVG} viewBox="0 0 44 40"><g fill="none" stroke="#2b2d31" stroke-width="2" stroke-linecap="round">` +
      '<path d="M15 20Q7 12 3 16M14 23Q6 20 2 24M14 26Q6 28 3 33M15 29Q9 34 6 39M29 20Q37 12 41 16M30 23Q38 20 42 24M30 26Q38 28 41 33M29 29Q35 34 38 39"/></g>' +
      '<ellipse cx="22" cy="25" rx="9" ry="8.5" fill="#2b2d31"/><circle cx="22" cy="15" r="6.5" fill="#2b2d31"/>' +
      '<circle cx="19.4" cy="14" r="2.6" fill="#fff"/><circle cx="24.6" cy="14" r="2.6" fill="#fff"/>' +
      '<circle cx="19.9" cy="14.6" r="1.2" fill="#111"/><circle cx="25.1" cy="14.6" r="1.2" fill="#111"/>' +
      '<path d="M19.5 18.2Q22 20 24.5 18.2" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round"/></svg>',
    ground:
      `<svg ${SVG} viewBox="0 0 72 64">` +
      '<path d="M34 16C33 9 35 5 39 2L42 5C39 7 38.5 11 39.5 16Z" fill="#5b7a2e"/>' +
      '<path d="M40 8C46 3 52 6 50 11" fill="none" stroke="#5b7a2e" stroke-width="2" stroke-linecap="round"/>' +
      '<ellipse cx="22" cy="40" rx="18" ry="21" fill="#e2691a"/><ellipse cx="50" cy="40" rx="18" ry="21" fill="#e2691a"/>' +
      '<ellipse cx="36" cy="40" rx="16" ry="23" fill="#f5862b"/>' +
      '<path d="M28 19Q22 40 28 62M44 19Q50 40 44 62" fill="none" stroke="#c75a12" stroke-width="1.5" opacity=".6"/>' +
      '<path d="M24 35L29 27L33 36ZM39 36L43 27L48 35ZM34 41L36 38L38 41Z" fill="#5a2a0a"/>' +
      '<path d="M23 45Q36 57 49 45Q45 49 42 47L40 50L36 48L32 50L30 47Q27 49 23 45Z" fill="#5a2a0a"/></svg>',
    flyer:
      `<svg ${SVG} viewBox="0 0 60 28" fill="#2b2d31">` +
      '<path d="M30 11C24 3 14 1 2 7C8 9 9 13 8 17C12 14 16 15 18 19C21 15 25 15 28 17ZM30 11C36 3 46 1 58 7C52 9 51 13 52 17C48 14 44 15 42 19C39 15 35 15 32 17Z"/>' +
      '<ellipse cx="30" cy="15" rx="4" ry="6"/><path d="M27 10L27.5 6L29 9ZM33 10L32.5 6L31 9Z"/></svg>',
    words: [
      ["pumpkin", "гарбуз", "We carve a pumpkin every October."],
      ["jack-o'-lantern", "ліхтар із гарбуза", "Our jack-o'-lantern has a big smile."],
      ["cobweb", "павутина", "There is an old cobweb in the corner."],
      ["spider", "павук", "Don't worry, this spider is friendly."],
      ["bat", "кажан", "Bats sleep during the day."],
      ["Trick or treat!", "Солодощі або капость!", 'Children knock on doors and shout "Trick or treat!"'],
      ["costume", "костюм", "What costume are you wearing this year?"],
      ["spooky", "моторошний", "This old house looks spooky at night."],
      ["haunted house", "будинок із привидами", "Would you spend a night in a haunted house?"],
      ["witch", "відьма", "The witch flies on a broomstick."],
      ["ghost", "привид", "Do you believe in ghosts?"],
      ["sweets (UK) / candy (US)", "цукерки", "The kids collected a bag of sweets."],
      ["be scared of", "боятися", "I'm scared of spiders. Are you?"],
    ],
    fact: {
      title: "Trick or treat!",
      uk: "«Солодощі або капость!»",
      text: 'On 31 October, children in costumes go from door to door and say "Trick or treat!" It means: give us a treat (sweets), or we will play a trick (a joke) on you. Most people simply give sweets!',
    },
  },
};

// The theme on today (or the one in ?ep-season=<theme>, to check a theme on any date).
export function activeTheme(search: string, now: Date = new Date()): string {
  const forced = /[?&]ep-season=([a-z]+)/.exec(search)?.[1];
  if (forced && THEMES[forced]) return forced;
  const theme = seasonFor(now);
  return THEMES[theme] ? theme : "";
}
