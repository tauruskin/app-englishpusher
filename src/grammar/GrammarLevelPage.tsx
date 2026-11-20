import { CreditCard, ListChecks } from "lucide-react";
import ActivityChoicePage, { type ActivityItem } from "../shared/ActivityChoicePage.tsx";
import type { GrammarTopic } from "./types.ts";
import { grammarFlashcardsUrl, grammarTopicsUrl, type GrammarLevel } from "./levels.ts";

function activityItems(level: GrammarLevel, hasCards: boolean): ActivityItem[] {
  return [
    {
      id: 1,
      label: "Flash Cards",
      description: `Learn the ${level.id} grammar rules with short cards`,
      cta: "Study now",
      href: grammarFlashcardsUrl(level),
      Icon: CreditCard,
      bgFrom: "#b45309",
      bgTo: "#78350f",
      accentColor: "#fbbf24",
      disabled: !hasCards,
      badge: hasCards ? undefined : "Coming soon",
    },
    {
      id: 2,
      label: "Grammar Test",
      description: "Gap-fill, error-spot, word order and more",
      cta: "Start test",
      href: grammarTopicsUrl(level),
      Icon: ListChecks,
      bgFrom: "#4338ca",
      bgTo: "#1e1b4b",
      accentColor: "#a5b4fc",
      disabled: false,
    },
  ];
}

// /<level>-grammar/ with no query: choose between the rule flashcards and the grammar test.
// Flash Cards is switched off while no topic of the level has rule cards yet.
export default function GrammarLevelPage({ level, topics }: { level: GrammarLevel; topics: GrammarTopic[] }) {
  const hasCards = topics.some((t) => (t.cards?.length ?? 0) > 0);
  return (
    <ActivityChoicePage
      headerTitle={`${level.id} Grammar`}
      badge={`${level.id} Grammar`}
      items={activityItems(level, hasCards)}
      comingSoon={false}
      comingSoonText=""
    />
  );
}
