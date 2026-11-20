import { Trophy, CreditCard, Grid2x2 } from "lucide-react";
import ActivityChoicePage, { type ActivityItem } from "../shared/ActivityChoicePage.tsx";
import type { LevelConfig } from "./types.ts";
import { useLevel } from "./mount.tsx";
import { isComingSoon, pageUrl } from "./level.ts";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

function activityItems(level: LevelConfig): ActivityItem[] {
  return [
    {
      id: 1,
      label: "Flash Cards",
      description:
        `Study and memorise ${level.id} vocabulary with interactive flashcards — Ukrainian translations included`,
      cta: "Study now",
      href: pageUrl(level, "flashcards"),
      Icon: CreditCard,
      bgFrom: "#9f1239",
      bgTo: "#4c0519",
      accentColor: "#fb7185",
      disabled: false,
    },
    {
      id: 2,
      label: "Vocabulary Trivia",
      description:
        "Fun trivia questions ordered easy to hard · track your weak words and practise again",
      cta: "Start quiz",
      href: pageUrl(level, "trivia"),
      Icon: Trophy,
      bgFrom: "#1d4ed8",
      bgTo: "#1e3a8a",
      accentColor: "#60a5fa",
      disabled: false,
    },
    {
      id: 3,
      label: "Word Connections",
      description: "Group 16 words into 4 categories — can you find them all?",
      cta: "Start playing",
      href: "/word-connections/",
      Icon: Grid2x2,
      bgFrom: "#065f46",
      bgTo: "#022c22",
      accentColor: "#34d399",
      disabled: false,
      hidden: true, // hidden by teacher request — re-enable by removing this line
    },
  ];
}

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------

export default function VocabularyPage() {
  const level = useLevel();

  return (
    <ActivityChoicePage
      headerTitle={level.title}
      badge={level.title}
      items={activityItems(level)}
      comingSoon={isComingSoon(level)}
      comingSoonText={`${level.id} topics are being prepared. Check back soon!`}
    />
  );
}
