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
export const SEASONS: Season[] = [
  { theme: "valentine", from: [2, 10], to: [2, 15] },
  { theme: "easter", easter: [-7, 7] },
  { theme: "halloween", from: [10, 24], to: [11, 1] },
  { theme: "winter", from: [12, 6], to: [1, 10] },
];

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
const FULL_PAGES = ["", "account", "a2-vocabulary", "a2plus-vocabulary", "b1-vocabulary", "b1plus-vocabulary", "c1-business"];

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
  winter: {
    name: "Winter",
    greeting: "Merry Christmas & Happy New Year!",
    accent: { ink: "#1d4ed8", soft: "#dbeafe" },
    flight: "fall",
    corner:
      `<svg ${SVG} viewBox="0 0 170 170">` +
      `<path d="M174 4C140 12 110 4 80 10C60 14 44 14 24 20M167 -4C171 30 161 58 163 84M166 44C160 50 154 54 146 62" fill="none" stroke="#2a6e41" stroke-width="3" stroke-linecap="round"/>` +
      `<path d="M172 4l-11 -8M172 4l-7 12M168 5l-11 -8M168 5l-7 12M164 6l-10 -9M164 6l-7 11M161 6l-10 -9M161 6l-7 11M157 7l-10 -9M157 7l-8 11M154 7l-9 -9M154 7l-8 10M150 7l-9 -9M150 7l-8 10M146 8l-9 -9M146 8l-8 10M142 8l-8 -9M142 8l-8 9M139 8l-8 -9M139 8l-8 9M135 8l-8 -9M135 8l-8 9M132 8l-8 -9M132 8l-8 9M128 8l-8 -9M128 8l-8 9M124 8l-7 -9M124 8l-8 8M120 8l-7 -9M120 8l-8 8M117 8l-7 -8M117 8l-7 8M113 8l-7 -8M113 8l-7 8M109 8l-7 -8M109 8l-7 8M105 8l-7 -8M105 8l-7 8M102 8l-7 -7M102 8l-6 8M98 8l-7 -7M98 8l-6 8M94 8l-7 -7M94 8l-6 8M91 8l-7 -7M91 8l-6 8M87 9l-7 -6M87 9l-5 8M83 9l-7 -6M83 9l-5 8M80 10l-7 -5M80 10l-5 8M76 11l-7 -5M76 11l-5 8M72 11l-7 -5M72 11l-5 7M69 12l-6 -5M69 12l-5 7M65 12l-6 -5M65 12l-5 7M61 13l-6 -5M61 13l-4 7M58 13l-6 -5M58 13l-4 7M54 14l-6 -5M54 14l-4 6M51 14l-6 -5M51 14l-4 6M47 15l-6 -5M47 15l-4 6M43 16l-5 -4M43 16l-4 6M39 16l-5 -4M39 16l-3 6M36 17l-5 -4M36 17l-3 6M32 18l-5 -4M32 18l-3 6M29 19l-5 -4M29 19l-3 6M25 20l-5 -3M25 20l-3 5M167 -2l-8 9M167 -2l10 7M168 2l-8 8M168 2l9 7M168 6l-8 8M168 6l9 7M168 9l-8 7M168 9l8 7M168 13l-8 7M168 13l8 7M168 17l-8 7M168 17l8 7M168 20l-8 6M168 20l7 7M168 24l-8 6M168 24l7 7M167 28l-8 6M167 28l7 7M167 31l-7 5M167 31l6 7M167 35l-7 5M167 35l6 7M166 39l-7 5M166 39l6 6M166 43l-7 5M166 43l6 6M165 46l-7 5M165 46l5 6M165 50l-6 4M165 50l5 6M164 54l-6 4M164 54l5 6M164 57l-6 4M164 57l5 5M164 61l-6 4M164 61l5 5M163 64l-5 4M163 64l5 5M163 68l-5 4M163 68l4 4M163 72l-5 4M163 72l4 4M163 76l-4 4M163 76l4 4M163 79l-4 4M163 79l4 3M163 83l-4 4M163 83l4 3M165 45l-8 -1M165 45l0 8M162 48l-7 -1M162 48l0 7M159 50l-7 -1M159 50l0 7M156 53l-6 -1M156 53l0 6M153 55l-5 -1M153 55l0 6M151 58l-5 -1M151 58l0 5M148 60l-4 0M148 60l0 4" stroke="#2f7d4a" stroke-width="1.8" stroke-linecap="round"/>` +
      `<path d="M172 4l-9 -4M172 4l-7 7M164 6l-9 -4M164 6l-7 6M157 7l-8 -4M157 7l-7 6M150 7l-8 -5M150 7l-7 5M142 8l-7 -5M142 8l-7 5M135 8l-7 -5M135 8l-7 5M128 8l-7 -5M128 8l-7 4M120 8l-6 -5M120 8l-7 4M113 8l-6 -4M113 8l-6 4M105 8l-6 -4M105 8l-6 4M98 8l-6 -4M98 8l-6 4M91 8l-6 -3M91 8l-5 4M83 9l-6 -3M83 9l-5 4M76 11l-6 -3M76 11l-4 4M69 12l-5 -3M69 12l-4 4M61 13l-5 -3M61 13l-4 4M54 14l-5 -2M54 14l-4 4M47 15l-5 -2M47 15l-4 3M39 16l-4 -2M39 16l-3 3M32 18l-4 -2M32 18l-3 3M25 20l-4 -1M25 20l-3 3M167 -2l-4 7M167 -2l5 6M168 6l-4 7M168 6l5 6M168 13l-4 6M168 13l4 6M168 20l-4 6M168 20l4 6M167 28l-4 5M167 28l3 6M167 35l-4 5M167 35l3 5M166 43l-4 4M166 43l3 5M165 50l-4 4M165 50l2 5M164 57l-3 4M164 57l2 4M163 64l-3 4M163 64l2 4M163 72l-3 3M163 72l2 4M163 79l-2 3M163 79l2 3M165 45l-5 1M165 45l-1 5M159 50l-5 0M159 50l-1 4M153 55l-4 0M153 55l-1 4M148 60l-3 1M148 60l-1 3" stroke="#4caf6a" stroke-width="1.6" stroke-linecap="round"/>` +
      `<ellipse cx="146" cy="70" rx="4.4" ry="6.6" fill="#9a6233"/>` +
      `<path d="M146 62V64M142 66.5Q146 69 150 66.5M141.8 70.5Q146 73 150.2 70.5M142.8 74.3Q146 76.3 149.2 74.3" fill="none" stroke="#6e4220" stroke-width="1" stroke-linecap="round"/>` +
      `<path d="M166 12Q148 32.5 130 17Q113 32.5 96 12Q79 32.5 62 17Q48 38 34 23" fill="none" stroke="#4a5560" stroke-width="1"/>` +
      `<path d="M153.8 20.5h2.8v2.6h-2.8zM139.4 22.5h2.8v2.6h-2.8zM118.4 22.5h2.8v2.6h-2.8zM104.8 20.5h2.8v2.6h-2.8zM84.4 20.5h2.8v2.6h-2.8zM70.8 22.5h2.8v2.6h-2.8zM52.2 25.8h2.8v2.6h-2.8zM41 28.2h2.8v2.6h-2.8z" fill="#6b7280"/>` +
      `<circle cx="155.2" cy="25.7" r="3.8" fill="#e23d4b"/><circle cx="140.8" cy="27.7" r="3.8" fill="#f6c343"/>` +
      `<circle cx="119.8" cy="27.7" r="3.8" fill="#34a853"/><circle cx="106.2" cy="25.7" r="3.8" fill="#3b82f6"/>` +
      `<circle cx="85.8" cy="25.7" r="3.8" fill="#e23d4b"/><circle cx="72.2" cy="27.7" r="3.8" fill="#f6c343"/>` +
      `<circle cx="53.6" cy="31" r="3.8" fill="#34a853"/><circle cx="42.4" cy="33.4" r="3.8" fill="#3b82f6"/></svg>`,
    hanger:
      `<svg ${SVG} viewBox="0 0 44 40"><circle cx="22" cy="24" r="15.5" fill="#b8202c"/>` +
      `<circle cx="20.8" cy="22.8" r="14.2" fill="#d93240"/>` +
      `<ellipse cx="14.5" cy="16.5" rx="2.6" ry="5" fill="#fff" opacity=".85" transform="rotate(45 14.5 16.5)"/>` +
      `<circle cx="11.2" cy="23" r="1.2" fill="#fff" opacity=".85"/>` +
      `<path d="M8.5 26L11.5 22L14.5 26L17.5 22L20.5 26L23.5 22L26.5 26L29.5 22L32.5 26L35.5 22" fill="none" stroke="#f6c343" stroke-width="1.9" stroke-linejoin="round" stroke-linecap="round"/>` +
      `<circle cx="22" cy="3" r="2" fill="none" stroke="#e0a526" stroke-width="1.4"/>` +
      `<path d="M17.5 10V5.5Q17.5 4.5 18.5 4.5H25.5Q26.5 4.5 26.5 5.5V10Z" fill="#f6c343"/>` +
      `<path d="M20 5V9.5M22 5V9.5M24 5V9.5" stroke="#d39a1c" stroke-width=".8"/></svg>`,
    ground:
      `<svg ${SVG} viewBox="0 0 72 64"><ellipse cx="36" cy="60.5" rx="33" ry="3" fill="#dbe8f5"/>` +
      `<rect x="24.5" y="50" width="7" height="10" fill="#8b5a2b"/>` +
      `<path d="M28 27L49 52H7ZM28 16L43 37H13ZM28 9L38 23H18Z" fill="#2e8b57" stroke="#2e8b57" stroke-width="3" stroke-linejoin="round"/>` +
      `<circle cx="30" cy="19" r="2" fill="#f6c343"/><circle cx="21" cy="30" r="2.6" fill="#e23d4b"/>` +
      `<circle cx="35" cy="31" r="2.6" fill="#3b82f6"/><circle cx="15" cy="46" r="2.8" fill="#3b82f6"/>` +
      `<circle cx="28" cy="41" r="2.6" fill="#f6c343"/><circle cx="41" cy="46" r="2.8" fill="#e23d4b"/>` +
      `<path d="M28 0.5L29.6 4.8L34.2 5L30.6 7.8L31.8 12.3L28 9.7L24.2 12.3L25.4 7.8L21.8 5L26.4 4.8Z" fill="#f6c343" stroke="#e0a526" stroke-width=".8" stroke-linejoin="round"/>` +
      `<rect x="48" y="46" width="17" height="14" fill="#d93240"/>` +
      `<rect x="46.5" y="42.5" width="20" height="5" rx="1" fill="#c42633"/>` +
      `<rect x="54.8" y="42.5" width="3.4" height="17.5" fill="#f6c343"/>` +
      `<g fill="#f6c343" stroke="#e0a526" stroke-width=".8">` +
      `<ellipse cx="53" cy="39.6" rx="3.6" ry="2.3" transform="rotate(25 53 39.6)"/>` +
      `<ellipse cx="60" cy="39.6" rx="3.6" ry="2.3" transform="rotate(-25 60 39.6)"/>` +
      `<circle cx="56.5" cy="41.5" r="1.6"/></g></svg>`,
    flyer:
      `<svg ${SVG} viewBox="0 0 24 24"><g fill="none" stroke-linecap="round" stroke-linejoin="round">` +
      `<g stroke="#4f8fdc" stroke-width="3.2">` +
      `<path d="M12 2V22M12 6L9.5 3.8M12 6L14.5 3.8M12 18L9.5 20.2M12 18L14.5 20.2"/>` +
      `<path d="M12 2V22M12 6L9.5 3.8M12 6L14.5 3.8M12 18L9.5 20.2M12 18L14.5 20.2" transform="rotate(60 12 12)"/>` +
      `<path d="M12 2V22M12 6L9.5 3.8M12 6L14.5 3.8M12 18L9.5 20.2M12 18L14.5 20.2" transform="rotate(120 12 12)"/>` +
      `</g><g stroke="#eef6ff" stroke-width="1.3">` +
      `<path d="M12 2V22M12 6L9.5 3.8M12 6L14.5 3.8M12 18L9.5 20.2M12 18L14.5 20.2"/>` +
      `<path d="M12 2V22M12 6L9.5 3.8M12 6L14.5 3.8M12 18L9.5 20.2M12 18L14.5 20.2" transform="rotate(60 12 12)"/>` +
      `<path d="M12 2V22M12 6L9.5 3.8M12 6L14.5 3.8M12 18L9.5 20.2M12 18L14.5 20.2" transform="rotate(120 12 12)"/>` +
      `</g></g></svg>`,
    words: [
      ["snowflake", "сніжинка", "No two snowflakes are the same."],
      ["snowman", "сніговик", "Let's build a snowman in the yard!"],
      ["sledge (UK) / sled (US)", "санки", "The children went down the hill on a sledge."],
      ["bauble", "ялинкова іграшка", "She hung a glass bauble on the tree."],
      ["garland", "гірлянда", "We put a garland of lights in the window."],
      ["wrap a present", "загорнути подарунок", "I need some paper to wrap this present."],
      ["stocking", "різдвяна шкарпетка для подарунків", "Santa puts small gifts in the stocking."],
      ["Christmas Eve", "Святвечір", "We have a big family dinner on Christmas Eve."],
      ["fireworks", "феєрверк, феєрверки", "At midnight, everyone went outside to watch the fireworks."],
      ["New Year's resolution", "новорічна обіцянка собі", "My New Year's resolution is to read more books."],
      ["countdown", "зворотний відлік", "The countdown to midnight begins: ten, nine, eight..."],
      ["cosy (UK) / cozy (US)", "затишний", "It's so cosy by the fire."],
      ["mulled wine", "глінтвейн", "We drank hot mulled wine at the Christmas market."],
    ],
    fact: {
      title: "Boxing Day",
      uk: "«День подарунків»",
      text: "In the UK, 26 December is Boxing Day, a public holiday. People relax, eat Christmas leftovers, watch football or go to the big winter sales. The name comes from an old tradition: giving boxes with gifts to workers and servants.",
    },
  },
  valentine: {
    name: "Valentine's Day",
    greeting: "Happy Valentine's Day!",
    accent: { ink: "#be123c", soft: "#ffe4e6" },
    flight: "rise",
    corner:
      `<svg ${SVG} viewBox="0 0 170 170">` +
      `<path d="M12.6 13.9Q22.3 23.3 32.2 27.5L22.4 47.7ZM101.9 20.9Q109.1 31.1 116.9 38.9L109.4 56.9Z" fill="#fb7185"/>` +
      `<path d="M38.4 29.6Q47.8 32 57.3 29.5L47.9 56.6ZM122.1 43.9Q130.1 50.9 138.7 55.4L130.4 76.6Z" fill="#e11d48"/>` +
      `<path d="M63.7 27.4Q72.7 23.5 81.9 15.3L72.8 48.4ZM144.5 58.2Q153.3 62 162.7 63.3L153.6 87.8Z" fill="#fff" stroke="#f3b6c3" stroke-width="1.2" stroke-linejoin="round"/>` +
      `<path d="M22.4 33.3C20.2 31.7 18.4 30.2 18.4 28.3C18.4 27.1 19.3 26.2 20.5 26.2C21.3 26.2 22 26.7 22.4 27.4C22.8 26.7 23.5 26.2 24.2 26.2C25.4 26.2 26.3 27.1 26.3 28.3C26.3 30.2 24.5 31.7 22.4 33.3ZM47.9 42.2C45.7 40.5 43.9 39.1 43.9 37.2C43.9 36 44.8 35.1 46 35.1C46.8 35.1 47.5 35.5 47.9 36.3C48.3 35.5 49 35.1 49.7 35.1C50.9 35.1 51.8 36 51.8 37.2C51.8 39.1 50 40.5 47.9 42.2ZM109.4 42.5C107.2 40.9 105.4 39.4 105.4 37.5C105.4 36.3 106.4 35.4 107.5 35.4C108.3 35.4 109 35.9 109.4 36.6C109.8 35.9 110.5 35.4 111.3 35.4C112.4 35.4 113.3 36.3 113.3 37.5C113.3 39.4 111.5 40.9 109.4 42.5ZM130.4 62.2C128.2 60.6 126.4 59.2 126.4 57.3C126.4 56 127.4 55.1 128.5 55.1C129.3 55.1 130 55.6 130.4 56.3C130.8 55.6 131.5 55.1 132.3 55.1C133.4 55.1 134.4 56 134.4 57.3C134.4 59.2 132.6 60.6 130.4 62.2Z" fill="#fff"/>` +
      `<path d="M72.8 34C70.6 32.3 68.8 30.9 68.8 29C68.8 27.8 69.8 26.9 70.9 26.9C71.7 26.9 72.4 27.3 72.8 28.1C73.2 27.3 73.9 26.9 74.7 26.9C75.8 26.9 76.7 27.8 76.7 29C76.7 30.9 74.9 32.3 72.8 34ZM153.6 73.4C151.5 71.8 149.7 70.3 149.7 68.4C149.7 67.2 150.6 66.3 151.7 66.3C152.5 66.3 153.2 66.7 153.6 67.5C154 66.7 154.7 66.3 155.5 66.3C156.6 66.3 157.6 67.2 157.6 68.4C157.6 70.3 155.8 71.8 153.6 73.4Z" fill="#e11d48"/>` +
      `<path d="M2 2Q46 58 92 5M92 5Q124 62 170 64" fill="none" stroke="#b9848d" stroke-width="1.5"/>` +
      `<path d="M92 5C88.5 1.5 85 2 85.5 5C85 8 88.5 8.5 92 5ZM92 5C95.5 1.5 99 2 98.5 5C99 8 95.5 8.5 92 5Z" fill="#be123c"/>` +
      `<circle cx="92" cy="5" r="1.8" fill="#9f1239"/></svg>`,
    hanger:
      `<svg ${SVG} viewBox="0 0 44 40"><path d="M22 0V9" stroke="#7d8790" stroke-width="1"/>` +
      `<path d="M22 39C12 32 3 25.5 3 16.5C3 10.5 7.5 6 13 6C17 6 20.2 8.2 22 11.5C23.8 8.2 27 6 31 6C36.5 6 41 10.5 41 16.5C41 25.5 32 32 22 39Z" fill="#e11d48"/>` +
      `<path d="M31 6C36.5 6 41 10.5 41 16.5C41 25.5 32 32 22 39C29 31 35 25 35 17C35 11.5 33.5 8 31 6Z" fill="#be123c"/>` +
      `<ellipse cx="10.2" cy="15.2" rx="2.3" ry="4" transform="rotate(38 10.2 15.2)" fill="#fff" opacity=".85"/>` +
      `<circle cx="15.4" cy="10.6" r="1.3" fill="#fff" opacity=".85"/>` +
      `<path d="M22 9.5C19 6 15.5 6.5 16 9.5C15.5 12.5 19 13 22 9.5ZM22 9.5C25 6 28.5 6.5 28 9.5C28.5 12.5 25 13 22 9.5Z" fill="#fda4af"/>` +
      `<circle cx="22" cy="9.5" r="2" fill="#fecdd3"/></svg>`,
    ground:
      `<svg ${SVG} viewBox="0 0 72 64">` +
      `<path d="M7 31L36 8L65 31Z" fill="#f6e3d6" stroke="#d9869c" stroke-width="2" stroke-linejoin="round"/>` +
      `<rect x="6" y="30" width="60" height="31" rx="3" fill="#f6e3d6"/>` +
      `<rect x="15" y="14" width="42" height="34" rx="2" fill="#f9a8c0"/>` +
      `<path d="M21 22H51M21 28H47M21 34H43" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>` +
      `<path d="M6 32L36 48L66 32V58Q66 61 63 61H9Q6 61 6 58Z" fill="#fffaf5" stroke="#d9869c" stroke-width="2" stroke-linejoin="round"/>` +
      `<path d="M8 59L28 45M64 59L44 45" stroke="#f2cbd3" stroke-width="1.5" stroke-linecap="round"/>` +
      `<path d="M36 54.5C31.8 51.4 28.3 48.6 28.3 44.8C28.3 42.5 30.1 40.7 32.4 40.7C33.9 40.7 35.2 41.6 36 43C36.8 41.6 38.1 40.7 39.6 40.7C41.9 40.7 43.7 42.5 43.7 44.8C43.7 48.6 40.2 51.4 36 54.5Z" fill="#e11d48"/>` +
      `<path d="M31.5 45.5Q31.6 43 33.8 42.6" fill="none" stroke="#fff" stroke-width="1.3" stroke-linecap="round" opacity=".8"/>` +
      `</svg>`,
    flyer:
      `<svg ${SVG} viewBox="0 0 24 22">` +
      `<path d="M12 21C6 16.5 1 12.5 1 7.2C1 3.8 3.6 1.3 6.8 1.3C9 1.3 10.9 2.6 12 4.6C13.1 2.6 15 1.3 17.2 1.3C20.4 1.3 23 3.8 23 7.2C23 12.5 18 16.5 12 21Z" fill="#f43f5e"/>` +
      `<ellipse cx="6" cy="6.6" rx="1.5" ry="2.6" transform="rotate(38 6 6.6)" fill="#fff" opacity=".8"/></svg>`,
    words: [
      ["valentine", "валентинка", "Did you get any valentines this year?"],
      ["have a crush on", "бути закоханим у", "I think Tom has a crush on you!"],
      ["go on a date", "піти на побачення", "We're going on a date on Friday."],
      ["go out with", "зустрічатися з", "How long has she been going out with him?"],
      ["sweetheart", "коханий, кохана", "Good morning, sweetheart!"],
      ["secret admirer", "таємний шанувальник", 'The card said: "From your secret admirer."'],
      ["fall in love", "закохатися", "They fell in love at first sight."],
      ["romantic", "романтичний", "What a romantic dinner!"],
      ["bouquet", "букет", "He gave her a bouquet of red roses."],
      ["heart-shaped", "у формі серця", "She baked heart-shaped cookies."],
      ["propose", "зробити пропозицію", "He proposed to her on Valentine's Day."],
      ["be into someone", "бути захопленим кимось", "I'm really into him, but he doesn't know."],
    ],
    fact: {
      title: "Secret admirer",
      uk: "«Таємний шанувальник»",
      text: 'In the UK, people often send Valentine cards without their name. They sign "From your secret admirer" or just draw a question mark, and the person has to guess who sent it!',
    },
  },
  easter: {
    name: "Easter",
    greeting: "Happy Easter!",
    accent: { ink: "#15803d", soft: "#dcfce7" },
    flight: "across",
    corner:
      `<svg ${SVG} viewBox="0 0 170 170"><g fill="none" stroke="#7b5234" stroke-linecap="round">` +
      `<path d="M174 3C150 8 126 5 104 9" stroke-width="5"/><path d="M104 9C88 12 74 16 60 24" stroke-width="3.6"/>` +
      `<path d="M60 24C46 32 34 42 24 56" stroke-width="2.4"/>` +
      `<path d="M174 18C162 38 150 58 132 74C124 81 118 88 114 98" stroke-width="3"/>` +
      `<path d="M138 6C134 18 130 26 124 36M74 17C72 26 72 34 70 42M50 30C46 22 40 16 32 14M156 46C164 56 166 70 162 82" stroke-width="1.8"/>` +
      `</g><g fill="#7cb342"><path d="M0 0q6.5-4.5 13 0q-6.5 4.5-13 0z" transform="translate(141 9) rotate(-18)"/>` +
      `<path d="M0 0q6.5-4.5 13 0q-6.5 4.5-13 0z" transform="translate(112 9) rotate(165)"/>` +
      `<path d="M0 0q6.5-4.5 13 0q-6.5 4.5-13 0z" transform="translate(82 14) rotate(-125)"/>` +
      `<path d="M0 0q6.5-4.5 13 0q-6.5 4.5-13 0z" transform="translate(56 26) rotate(120)"/>` +
      `<path d="M0 0q6.5-4.5 13 0q-6.5 4.5-13 0z" transform="translate(132 23) rotate(195)"/>` +
      `<path d="M0 0q6.5-4.5 13 0q-6.5 4.5-13 0z" transform="translate(162 34) rotate(35)"/>` +
      `<path d="M0 0q6.5-4.5 13 0q-6.5 4.5-13 0z" transform="translate(152 64) rotate(150)"/>` +
      `<path d="M0 0q6.5-4.5 13 0q-6.5 4.5-13 0z" transform="translate(121 87) rotate(-25)"/>` +
      `<path d="M0 0q6.5-4.5 13 0q-6.5 4.5-13 0z" transform="translate(41 21) rotate(165)"/>` +
      `<path d="M0 0q6.5-4.5 13 0q-6.5 4.5-13 0z" transform="translate(33 46) rotate(-70)"/></g><g fill="#f4a3bc">` +
      `<circle cx="98" cy="7" r="2.4"/><circle cx="72" cy="30" r="2.2"/><circle cx="140" cy="70" r="2.4"/>` +
      `<circle cx="168" cy="58" r="2.2"/></g><g fill="#f9bfd2" stroke="#de7b9e" stroke-width=".6">` +
      `<g transform="translate(158 12) scale(1.6)">` +
      `<path d="M-1.2-1.6A2.8 2.8 0 1 1 1.2-1.6A2.8 2.8 0 1 1 1.9.6A2.8 2.8 0 1 1 0 2A2.8 2.8 0 1 1-1.9.6A2.8 2.8 0 1 1-1.2-1.6Z"/>` +
      `<circle r="1.5" fill="#f2b437" stroke="none"/></g><g transform="translate(124 12) scale(1.35)">` +
      `<path d="M-1.2-1.6A2.8 2.8 0 1 1 1.2-1.6A2.8 2.8 0 1 1 1.9.6A2.8 2.8 0 1 1 0 2A2.8 2.8 0 1 1-1.9.6A2.8 2.8 0 1 1-1.2-1.6Z"/>` +
      `<circle r="1.5" fill="#f2b437" stroke="none"/></g><g transform="translate(124 36) scale(1.2)">` +
      `<path d="M-1.2-1.6A2.8 2.8 0 1 1 1.2-1.6A2.8 2.8 0 1 1 1.9.6A2.8 2.8 0 1 1 0 2A2.8 2.8 0 1 1-1.9.6A2.8 2.8 0 1 1-1.2-1.6Z"/>` +
      `<circle r="1.5" fill="#f2b437" stroke="none"/></g><g transform="translate(66 20) scale(1.3)">` +
      `<path d="M-1.2-1.6A2.8 2.8 0 1 1 1.2-1.6A2.8 2.8 0 1 1 1.9.6A2.8 2.8 0 1 1 0 2A2.8 2.8 0 1 1-1.9.6A2.8 2.8 0 1 1-1.2-1.6Z"/>` +
      `<circle r="1.5" fill="#f2b437" stroke="none"/></g><g transform="translate(70 42) scale(1.1)">` +
      `<path d="M-1.2-1.6A2.8 2.8 0 1 1 1.2-1.6A2.8 2.8 0 1 1 1.9.6A2.8 2.8 0 1 1 0 2A2.8 2.8 0 1 1-1.9.6A2.8 2.8 0 1 1-1.2-1.6Z"/>` +
      `<circle r="1.5" fill="#f2b437" stroke="none"/></g><g transform="translate(32 14) scale(1.1)">` +
      `<path d="M-1.2-1.6A2.8 2.8 0 1 1 1.2-1.6A2.8 2.8 0 1 1 1.9.6A2.8 2.8 0 1 1 0 2A2.8 2.8 0 1 1-1.9.6A2.8 2.8 0 1 1-1.2-1.6Z"/>` +
      `<circle r="1.5" fill="#f2b437" stroke="none"/></g><g transform="translate(24 56) scale(1.15)">` +
      `<path d="M-1.2-1.6A2.8 2.8 0 1 1 1.2-1.6A2.8 2.8 0 1 1 1.9.6A2.8 2.8 0 1 1 0 2A2.8 2.8 0 1 1-1.9.6A2.8 2.8 0 1 1-1.2-1.6Z"/>` +
      `<circle r="1.5" fill="#f2b437" stroke="none"/></g><g transform="translate(148 56) scale(1.4)">` +
      `<path d="M-1.2-1.6A2.8 2.8 0 1 1 1.2-1.6A2.8 2.8 0 1 1 1.9.6A2.8 2.8 0 1 1 0 2A2.8 2.8 0 1 1-1.9.6A2.8 2.8 0 1 1-1.2-1.6Z"/>` +
      `<circle r="1.5" fill="#f2b437" stroke="none"/></g><g transform="translate(114 98) scale(1.2)">` +
      `<path d="M-1.2-1.6A2.8 2.8 0 1 1 1.2-1.6A2.8 2.8 0 1 1 1.9.6A2.8 2.8 0 1 1 0 2A2.8 2.8 0 1 1-1.9.6A2.8 2.8 0 1 1-1.2-1.6Z"/>` +
      `<circle r="1.5" fill="#f2b437" stroke="none"/></g><g transform="translate(162 82) scale(1.05)">` +
      `<path d="M-1.2-1.6A2.8 2.8 0 1 1 1.2-1.6A2.8 2.8 0 1 1 1.9.6A2.8 2.8 0 1 1 0 2A2.8 2.8 0 1 1-1.9.6A2.8 2.8 0 1 1-1.2-1.6Z"/>` +
      `<circle r="1.5" fill="#f2b437" stroke="none"/></g></g></svg>`,
    hanger:
      `<svg ${SVG} viewBox="0 0 40 48">` +
      `<ellipse cx="20" cy="3.6" rx="2" ry="2.8" fill="none" stroke="#c9a227" stroke-width="1.3"/>` +
      `<path d="M20 6C29 6 35 20 35 31C35 41 28.5 47 20 47C11.5 47 5 41 5 31C5 20 11 6 20 6Z" fill="#d62f2f"/>` +
      `<path d="M8.9 15H31.1L32.2 18H7.8ZM6 23H34L34.4 26L34.8 29L34.8 32L34.3 35H5.7L5.2 32L5.2 29L5.6 26ZM7 39H33L31.5 41.5H8.5Z" fill="#f7c843"/>` +
      `<path d="M7.8 18H32.2M6 23H34M5.7 35H34.3M7 39H33" fill="none" stroke="#3a1c12" stroke-width="1.3"/>` +
      `<path d="M7 29L10 26L13 32L16 26L19 32L22 26L25 32L28 26L31 32L33 29" fill="none" stroke="#d62f2f" stroke-width="1.5" stroke-linejoin="round"/>` +
      `<g fill="#3a1c12"><circle cx="10" cy="20.5" r="1"/><circle cx="15" cy="20.5" r="1"/>` +
      `<circle cx="20" cy="20.5" r="1"/><circle cx="25" cy="20.5" r="1"/><circle cx="30" cy="20.5" r="1"/></g>` +
      `<g fill="#f7c843"><circle cx="14.5" cy="12.5" r="1.2"/><circle cx="20" cy="10.5" r="1.4"/>` +
      `<circle cx="25.5" cy="12.5" r="1.2"/><circle cx="20" cy="44" r="1.3"/><circle cx="11" cy="37" r=".9"/>` +
      `<circle cx="16.5" cy="37" r=".9"/><circle cx="23.5" cy="37" r=".9"/><circle cx="29" cy="37" r=".9"/></g>` +
      `<path d="M20 6C29 6 35 20 35 31C35 41 28.5 47 20 47C11.5 47 5 41 5 31C5 20 11 6 20 6Z" fill="none" stroke="#9e1f1f" stroke-width="1.2"/>` +
      `</svg>`,
    ground:
      `<svg ${SVG} viewBox="0 0 72 64">` +
      `<path d="M13 37C13 4 59 4 59 37" fill="none" stroke="#a8692f" stroke-width="4" stroke-linecap="round"/>` +
      `<ellipse cx="23" cy="30" rx="8" ry="10.5" transform="rotate(-15 23 30)" fill="#4f9bd9"/>` +
      `<ellipse cx="49" cy="30" rx="8" ry="10.5" transform="rotate(15 49 30)" fill="#e85d8a"/>` +
      `<ellipse cx="36" cy="26" rx="8.5" ry="11" fill="#f5c242"/>` +
      `<path d="M16.5 29l2.5-2.5 2.5 2.5 2.5-2.5 2.5 2.5 2.5-2.5M28 24l2.7-2.7 2.7 2.7 2.7-2.7 2.7 2.7 2.7-2.7M43 25l2.5 2.5 2.5-2.5 2.5 2.5 2.5-2.5 2.5 2.5" fill="none" stroke="#fff" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round"/>` +
      `<g fill="#7cb342"><path d="M8 37q-2-7 3-9q1 5-3 9z"/><path d="M64 37q2-7-3-9q-1 5 3 9z"/></g>` +
      `<g transform="translate(9 31)" fill="#f48fb1">` +
      `<path d="M-1.2-1.6A2.8 2.8 0 1 1 1.2-1.6A2.8 2.8 0 1 1 1.9.6A2.8 2.8 0 1 1 0 2A2.8 2.8 0 1 1-1.9.6A2.8 2.8 0 1 1-1.2-1.6Z"/>` +
      `<circle r="1.6" fill="#f2b437"/></g><g transform="translate(63 31)" fill="#b388eb">` +
      `<path d="M-1.2-1.6A2.8 2.8 0 1 1 1.2-1.6A2.8 2.8 0 1 1 1.9.6A2.8 2.8 0 1 1 0 2A2.8 2.8 0 1 1-1.9.6A2.8 2.8 0 1 1-1.2-1.6Z"/>` +
      `<circle r="1.6" fill="#f2b437"/></g><path d="M6 37H66L60 60Q59 63 56 63H16Q13 63 12 60Z" fill="#dca15c"/>` +
      `<g fill="none" stroke="#b5773a" stroke-width="4" stroke-linecap="round" stroke-dasharray="2 6">` +
      `<path d="M12 45H61"/><path d="M14 51H59" stroke-dashoffset="4"/><path d="M15.5 57H57"/></g>` +
      `<rect x="4" y="34" width="64" height="7" rx="3.5" fill="#b5773a"/></svg>`,
    flyer:
      `<svg ${SVG} viewBox="0 0 60 28"><g fill="#f59e0b" stroke="#5b2a0e" stroke-width="1.3" stroke-linejoin="round">` +
      `<path d="M29 13C24 4 12 0 5 3C1 5 3 12 8 14C14 16 22 15 29 14ZM31 13C36 4 48 0 55 3C59 5 57 12 52 14C46 16 38 15 31 14Z"/>` +
      `<path d="M29 15C22 15 14 17 12 22C11 26 16 27 20 25C24 23 27 19 29 16ZM31 15C38 15 46 17 48 22C49 26 44 27 40 25C36 23 33 19 31 16Z"/>` +
      `</g><g fill="#5b2a0e"><circle cx="8.5" cy="6.5" r="2.2"/><circle cx="51.5" cy="6.5" r="2.2"/></g>` +
      `<g fill="#fde68a"><circle cx="13" cy="5" r="1.1"/><circle cx="47" cy="5" r="1.1"/>` +
      `<circle cx="17" cy="22.5" r="1.2"/><circle cx="43" cy="22.5" r="1.2"/></g>` +
      `<path d="M29.3 7Q27.5 2.5 25 2M30.7 7Q32.5 2.5 35 2" fill="none" stroke="#3b2412" stroke-width="1" stroke-linecap="round"/>` +
      `<g fill="#3b2412"><circle cx="25" cy="2" r="1"/><circle cx="35" cy="2" r="1"/>` +
      `<ellipse cx="30" cy="15.5" rx="1.8" ry="7"/><circle cx="30" cy="8" r="2"/></g></svg>`,
    words: [
      ["Easter egg", "великоднє яйце, писанка", "In the UK, Easter eggs are usually made of chocolate."],
      ["paint eggs", "розписувати яйця", "We paint eggs with my grandma every year."],
      ["Easter basket", "великодній кошик", "Our Easter basket is full of eggs and paska."],
      ["Easter bunny", "великодній кролик", "Children say the Easter bunny brings chocolate eggs."],
      ["Easter egg hunt", "пошук великодніх яєць", "The kids found ten eggs in the Easter egg hunt."],
      ["blossom", "цвіт", "The cherry trees are in blossom."],
      ["spring", "весна", "Spring is my favourite season."],
      ["lamb", "ягня", "A little lamb is a symbol of Easter."],
      ["bake", "пекти", "My mum bakes paska every Easter."],
      ["church service", "церковна служба", "We go to the church service early in the morning."],
      ["butterfly", "метелик", "A butterfly landed on the flowers."],
      ["chick", "курча", "The card has a little yellow chick on it."],
    ],
    fact: {
      title: "Easter egg hunt",
      uk: "«Пошук великодніх яєць»",
      text: "In the UK and the US, parents hide small chocolate eggs in the garden or around the house on Easter morning. Children run around with baskets and try to find as many as they can!",
    },
  },
};

// The theme on today (or the one in ?ep-season=<theme>, to check a theme on any date).
export function activeTheme(search: string, now: Date = new Date()): string {
  const forced = /[?&]ep-season=([a-z]+)/.exec(search)?.[1];
  if (forced && Object.prototype.hasOwnProperty.call(THEMES, forced)) return forced;
  const theme = seasonFor(now);
  return THEMES[theme] ? theme : "";
}
