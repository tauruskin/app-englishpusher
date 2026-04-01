export interface Group {
  id: number;
  category: string;
  words: [string, string, string, string];
  /** Difficulty tier: 0 = easiest (yellow), 1 = green, 2 = blue, 3 = hardest (purple) */
  difficulty: 0 | 1 | 2 | 3;
}

export interface Puzzle {
  id: number;
  title: string;
  groups: [Group, Group, Group, Group];
}

// Difficulty colour map (Tailwind classes)
export const DIFFICULTY_STYLES: Record<
  0 | 1 | 2 | 3,
  { bg: string; text: string; border: string; label: string }
> = {
  0: { bg: "bg-yellow-300",  text: "text-yellow-900",  border: "border-yellow-400", label: "Yellow" },
  1: { bg: "bg-green-400",   text: "text-green-900",   border: "border-green-500",  label: "Green"  },
  2: { bg: "bg-blue-400",    text: "text-blue-900",    border: "border-blue-500",   label: "Blue"   },
  3: { bg: "bg-purple-500",  text: "text-white",       border: "border-purple-600", label: "Purple" },
};

export const PUZZLES: Puzzle[] = [
  // ── Puzzle 1: Feelings Adjectives ──────────────────────────────────────────
  {
    id: 1,
    title: "Feelings & Emotions",
    groups: [
      {
        id: 10,
        category: "Positive feelings",
        words: ["EXCITED", "AMAZED", "CALM", "SURPRISED"],
        difficulty: 0,
      },
      {
        id: 11,
        category: "Scared or anxious",
        words: ["FRIGHTENED", "TERRIFIED", "NERVOUS", "WORRIED"],
        difficulty: 1,
      },
      {
        id: 12,
        category: "Uncomfortable feelings",
        words: ["EMBARRASSED", "ANNOYED", "JEALOUS", "DISAPPOINTED"],
        difficulty: 2,
      },
      {
        id: 13,
        category: "Describes a situation, not a person!",
        words: ["BORING", "EXCITING", "FRIGHTENING", "EXHAUSTING"],
        difficulty: 3,
      },
    ],
  },

  // ── Puzzle 2: Adverbs of Frequency ────────────────────────────────────────
  {
    id: 2,
    title: "Adverbs of Frequency",
    groups: [
      {
        id: 20,
        category: "Rarely or almost never",
        words: ["SELDOM", "RARELY", "HARDLY EVER", "ONCE IN A WHILE"],
        difficulty: 0,
      },
      {
        id: 21,
        category: "From time to time",
        words: ["OCCASIONALLY", "NOW AND THEN", "EVERY NOW AND AGAIN", "SEVERAL TIMES A YEAR"],
        difficulty: 1,
      },
      {
        id: 22,
        category: "On a regular schedule",
        words: ["EVERY OTHER DAY", "EVERY OTHER WEEK", "TWO TIMES A FORTNIGHT", "ON THURSDAYS"],
        difficulty: 2,
      },
      {
        id: 23,
        category: "Careful — one of these is a noun!",
        words: ["FREQUENCY", "FREQUENTLY", "GENERALLY", "ANNUALLY"],
        difficulty: 3,
      },
    ],
  },

  // ── Puzzle 3: Jobs ─────────────────────────────────────────────────────────
  {
    id: 3,
    title: "Jobs & Work",
    groups: [
      {
        id: 30,
        category: "Works with hands",
        words: ["MECHANIC", "PLUMBER", "GARDENER", "CHEF"],
        difficulty: 0,
      },
      {
        id: 31,
        category: "Works with people or ideas",
        words: ["MUSICIAN", "SHOP ASSISTANT", "FINANCIAL CONSULTANT", "JOURNALIST"],
        difficulty: 1,
      },
      {
        id: 32,
        category: "Work status",
        words: ["PART-TIME", "FULL-TIME", "OUT OF WORK", "VOLUNTEER"],
        difficulty: 2,
      },
      {
        id: 33,
        category: "Career vocabulary — all nouns",
        words: ["CAREER", "WAGES", "PROFESSION", "QUALIFICATIONS"],
        difficulty: 3,
      },
    ],
  },

  // ── Puzzle 4: Personality & Relationships ──────────────────────────────────
  {
    id: 4,
    title: "Personality & Relationships",
    groups: [
      {
        id: 40,
        category: "Positive personality",
        words: ["FRIENDLY", "CARING", "GENEROUS", "CHEERFUL"],
        difficulty: 0,
      },
      {
        id: 41,
        category: "Negative personality",
        words: ["BOSSY", "RUDE", "MEAN", "PASSIVE"],
        difficulty: 1,
      },
      {
        id: 42,
        category: "People in your life",
        words: ["COLLEAGUES", "TEAMMATES", "PARTNER", "MANAGER"],
        difficulty: 2,
      },
      {
        id: 43,
        category: "Phrasal verbs about relationships",
        words: ["GET ON WELL WITH", "TAKE AFTER", "LOOK UP TO", "STAY IN TOUCH WITH"],
        difficulty: 3,
      },
    ],
  },

  // ── Puzzle 5: Stative Verbs ────────────────────────────────────────────────
  {
    id: 5,
    title: "Stative Verbs",
    groups: [
      {
        id: 50,
        category: "Feelings & emotions",
        words: ["LIKE", "LOVE", "HATE", "PREFER"],
        difficulty: 0,
      },
      {
        id: 51,
        category: "Thinking & believing",
        words: ["KNOW", "BELIEVE", "UNDERSTAND", "THINK"],
        difficulty: 1,
      },
      {
        id: 52,
        category: "Senses",
        words: ["SEE", "HEAR", "TASTE", "SMELL"],
        difficulty: 2,
      },
      {
        id: 53,
        category: "Possession & belonging",
        words: ["OWN", "HAVE", "BELONG", "POSSESS"],
        difficulty: 3,
      },
    ],
  },
];
