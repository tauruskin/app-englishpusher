export interface C1Word {
  word: string;
  partOfSpeech: string;
  definition: string;
  example: string; // use ___ as a placeholder for the word/phrase in the sentence
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  icon: string;
  words: C1Word[];
}

export const TOPICS: Topic[] = [
  {
    id: "innovation",
    title: "Innovation",
    description: "Vocabulary for discussing technology, creativity and change",
    icon: "💡",
    words: [
      // ── Vocabulary ──────────────────────────────────────────────────────────
      {
        word: "disruptor",
        partOfSpeech: "noun",
        definition: "a person or company that radically changes an industry or market through innovation",
        example: "Airbnb emerged as a major ___ in the hotel industry, challenging traditional business models.",
      },
      {
        word: "well thought out",
        partOfSpeech: "adjective",
        definition: "planned and organised carefully, with attention to every detail",
        example: "Her ___ proposal covered every aspect of the project, from budget to timeline.",
      },
      {
        word: "unorthodox",
        partOfSpeech: "adjective",
        definition: "different from what is usual or accepted by most people; unconventional",
        example: "His ___ management style — giving teams complete autonomy — led to some remarkable breakthroughs.",
      },
      {
        word: "do research",
        partOfSpeech: "phrase",
        definition: "to study a subject in detail, especially to discover new information or reach a new understanding",
        example: "We need to ___ before making any decisions about entering the new market.",
      },
      {
        word: "innovation-driven",
        partOfSpeech: "adjective",
        definition: "focused on creating new ideas and solutions as a core strategic value",
        example: "An ___ culture encourages employees to question existing processes and propose improvements.",
      },
      {
        word: "leverage",
        partOfSpeech: "verb",
        definition: "to use something to maximum advantage",
        example: "The startup managed to ___ its small size to move faster than larger competitors.",
      },
      {
        word: "iterate",
        partOfSpeech: "verb",
        definition: "to improve a product or process step by step through repeated cycles of testing and feedback",
        example: "The development team ___ on each version of the app until the experience felt seamless.",
      },
      {
        word: "cutting-edge",
        partOfSpeech: "adjective",
        definition: "extremely modern and using the most advanced techniques or technology available",
        example: "The firm invested heavily in ___ AI tools to stay ahead of the competition.",
      },
      {
        word: "agility",
        partOfSpeech: "noun",
        definition: "the ability to adapt quickly and effectively to changing conditions",
        example: "Organisational ___ became the company's greatest asset during the market disruption.",
      },
      {
        word: "glass ceiling",
        partOfSpeech: "noun",
        definition: "an invisible barrier that prevents someone, especially women or minorities, from advancing beyond a certain level in their career",
        example: "She was determined to shatter the ___ and become the company's first female director.",
      },

      // ── Business collocations ────────────────────────────────────────────────
      {
        word: "roll out",
        partOfSpeech: "phrasal verb",
        definition: "to introduce or launch something new in a planned, phased way (instead of: introduce changes)",
        example: "The team will ___ the updated platform to all users over the next three months.",
      },
      {
        word: "drive sustainable growth",
        partOfSpeech: "phrase",
        definition: "to create conditions that allow a business to expand steadily without compromising future potential (instead of: help us grow)",
        example: "Our five-year strategy is designed to ___ by investing in people and technology.",
      },
      {
        word: "maintain a competitive edge",
        partOfSpeech: "phrase",
        definition: "to keep an advantage over rivals; to stay ahead of or at the same level as competitors (instead of: stay competitive)",
        example: "Companies must ___ by continuously improving their products and services.",
      },
      {
        word: "address key challenges",
        partOfSpeech: "phrase",
        definition: "to deal with important problems in a focused and effective way (instead of: solve problems)",
        example: "The report outlined several ways to ___ facing the tech industry today.",
      },
      {
        word: "optimize performance",
        partOfSpeech: "phrase",
        definition: "to improve something so it works as efficiently and effectively as possible (instead of: make it better)",
        example: "We regularly review our processes to ___ across all departments.",
      },
      {
        word: "strategic shift",
        partOfSpeech: "noun phrase",
        definition: "a significant and deliberate change in direction or priorities within an organisation (instead of: big change)",
        example: "Moving from a product-based to a service-based model represented a major ___ for the business.",
      },
      {
        word: "align across teams",
        partOfSpeech: "phrase",
        definition: "to ensure all teams are working towards the same goals and priorities (instead of: work together)",
        example: "Leadership must ___ to ensure consistent delivery and avoid duplication of effort.",
      },

      // ── Phrasal verbs ────────────────────────────────────────────────────────
      {
        word: "get round",
        partOfSpeech: "phrasal verb",
        definition: "to find a way to avoid or solve a difficulty",
        example: "We managed to ___ the budget issue by sourcing cheaper materials.",
      },
      {
        word: "try out",
        partOfSpeech: "phrasal verb",
        definition: "to test something to see if it works or is suitable",
        example: "They decided to ___ the prototype with a small group of users before the official launch.",
      },
      {
        word: "tinker with",
        partOfSpeech: "phrasal verb",
        definition: "to make small adjustments to something in order to improve or fix it",
        example: "Engineers love to ___ the design until every detail is exactly right.",
      },
      {
        word: "go about",
        partOfSpeech: "phrasal verb",
        definition: "to start or deal with a task in a particular way",
        example: "How would you ___ solving a problem that has no obvious solution?",
      },
      {
        word: "read up on",
        partOfSpeech: "phrasal verb",
        definition: "to study a subject thoroughly by reading a lot about it",
        example: "She spent the weekend ___ the latest developments in machine learning.",
      },
      {
        word: "catch on",
        partOfSpeech: "phrasal verb",
        definition: "to become popular or widely accepted",
        example: "Electric vehicles took a while to ___, but now demand is surging globally.",
      },
      {
        word: "get into",
        partOfSpeech: "phrasal verb",
        definition: "to become interested or involved in something",
        example: "He first ___ programming during a school hackathon and never looked back.",
      },
      {
        word: "dream up",
        partOfSpeech: "phrasal verb",
        definition: "to think of a creative or unusual idea",
        example: "It took months to ___ a solution that was both practical and affordable.",
      },
      {
        word: "come up with",
        partOfSpeech: "phrasal verb",
        definition: "to think of or produce an idea, plan, or solution",
        example: "The team managed to ___ a completely new business model in just three days.",
      },
    ],
  },
];
