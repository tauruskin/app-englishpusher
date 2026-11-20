import type { GrammarLevelId, GrammarTopic } from "./types.ts";

export type UaRule = "full" | "short" | "none";
export const CARDS_MIN = 6;
export const CARDS_MAX = 10;
export const UA_SHORT_MAX = 120;
export const UA_FULL_MAX = 400;

export function uaRuleForLevel(level: GrammarLevelId): UaRule {
  if (level === "A2" || level === "A2+") return "full";
  if (level === "B1" || level === "B1+") return "short";
  return "none";
}

const ONE_EMOJI = /^\p{Extended_Pictographic}️?(‍\p{Extended_Pictographic}️?)*$/u;
const norm = (s: string) => s.toLowerCase().replace(/['‘’ʼ`´]/g, "'").replace(/\s+/g, " ").trim();
const blank = (s: string | undefined) => !s || s.trim().length === 0;

/** Every problem with a topic's icon and rule cards; [] when fine or when the topic has no cards. */
export function topicCardErrors(topic: GrammarTopic): string[] {
  const cards = topic.cards;
  if (!cards) return [];
  const errors: string[] = [];
  if (!topic.icon || !ONE_EMOJI.test(topic.icon)) errors.push(`${topic.id}: icon must be one emoji`);
  if (cards.length < CARDS_MIN || cards.length > CARDS_MAX) {
    errors.push(`${topic.id}: needs 6-10 cards, has ${cards.length}`);
  }
  const testSentences = new Set(topic.rules.map((q) => norm(q.sentence)));
  const seen = new Set<string>();
  const ua = uaRuleForLevel(topic.level);
  for (const c of cards) {
    if (!/^[A-Za-z0-9_-]{1,80}$/.test(c.id)) errors.push(`${topic.id}: bad card id ${c.id}`);
    if (seen.has(c.id)) errors.push(`${topic.id}: duplicate card id ${c.id}`);
    seen.add(c.id);
    if (c.example.split("___").length - 1 !== 1) errors.push(`${c.id}: example needs exactly one ___`);
    for (const f of ["rule", "answer", "explanation"] as const) {
      if (blank(c[f])) errors.push(`${c.id}: ${f} is empty`);
    }
    if (c.examples.length !== 2 || c.examples.some(blank)) errors.push(`${c.id}: needs two examples`);
    const full = norm(c.example.replace("___", c.answer));
    if (testSentences.has(norm(c.example)) || testSentences.has(full) || c.examples.some((e) => testSentences.has(norm(e)))) {
      errors.push(`${c.id}: copies a test sentence`);
    }
    if (ua === "none" && c.ua !== undefined) errors.push(`${c.id}: no Ukrainian at B2+/C1`);
    if (ua === "short") {
      if (blank(c.ua)) errors.push(`${c.id}: needs a short Ukrainian line`);
      else if (c.ua!.length > UA_SHORT_MAX) errors.push(`${c.id}: Ukrainian line longer than 120`);
    }
    if (ua === "full") {
      if (blank(c.ua)) errors.push(`${c.id}: needs a Ukrainian explanation`);
      else if (c.ua!.length > UA_FULL_MAX) errors.push(`${c.id}: Ukrainian explanation longer than 400`);
    }
  }
  return errors;
}

/** The tile count line on the flashcards list: "8 cards", or null (= Coming soon). */
export function cardCountLabel(topic: GrammarTopic): string | null {
  return topic.cards && topic.cards.length > 0 ? `${topic.cards.length} cards` : null;
}
