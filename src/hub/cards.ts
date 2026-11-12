import type { HubLevel } from "./order.ts";
import { grammarUrl, levelBySlug, GRAMMAR_LEVELS } from "../grammar/levels.ts";

export type HubIcon = "book" | "layers" | "zap" | "sprout" | "leaf" | "rocket" | "mountain";

export interface HubCard {
  key: string;
  level: HubLevel;
  kind: "vocabulary" | "grammar";
  label: string;
  description: string;
  href: string;
  bgFrom: string;
  bgTo: string;
  borderColor: string;
  icon: HubIcon;
  disabled: boolean;
  badge?: string;
}

export interface LevelSummary {
  level: HubLevel;
  parts: ("Vocabulary" | "Grammar")[];
  bgFrom: string;
  bgTo: string;
  borderColor: string;
  icon: HubIcon;
}

// Grammar card colours. Coming-soon cards use the approved warm stone grey (2026-11-12).
export const GRAMMAR_COLORS = { bgFrom: "#b45309", bgTo: "#78350f", borderColor: "#f07c1a" };
export const GREY_COLORS = { bgFrom: "#a8a29e", bgTo: "#57534e", borderColor: "#a8a29e" };

const KIND_PART = { vocabulary: "Vocabulary", grammar: "Grammar" } as const;
const KIND_ORDER = { vocabulary: 0, grammar: 1 } as const;

export function grammarCard(level: HubLevel, live: boolean): HubCard {
  const g = GRAMMAR_LEVELS.find((l) => l.id === level);
  if (!g) throw new Error(`no grammar level for ${level}`);
  return {
    key: `grammar-${g.slug}`,
    level,
    kind: "grammar",
    label: `${level} Grammar`,
    description: live ? "Rule flashcards and tests: gap-fill, error-spot and more" : `Grammar practice for ${level} is on its way`,
    href: grammarUrl(levelBySlug(g.slug)),
    ...(live ? GRAMMAR_COLORS : GREY_COLORS),
    icon: "book",
    disabled: !live,
    badge: live ? undefined : "Coming soon",
  };
}

export function cardsForLevel(cards: HubCard[], level: HubLevel): HubCard[] {
  return cards.filter((c) => c.level === level).sort((a, b) => KIND_ORDER[a.kind] - KIND_ORDER[b.kind]);
}

export function levelIsLive(cards: HubCard[], level: HubLevel): boolean {
  return cards.some((c) => c.level === level && !c.disabled);
}

export function levelSummaries(cards: HubCard[], order: HubLevel[]): LevelSummary[] {
  return order.filter((level) => levelIsLive(cards, level)).map((level) => {
    const own = cardsForLevel(cards, level);
    const look = own.find((c) => c.kind === "vocabulary") ?? own[0];
    return {
      level,
      parts: own.filter((c) => !c.disabled).map((c) => KIND_PART[c.kind]),
      bgFrom: look.bgFrom,
      bgTo: look.bgTo,
      borderColor: look.borderColor,
      icon: look.icon,
    };
  });
}
