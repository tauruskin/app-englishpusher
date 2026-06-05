export interface C1Word {
  word: string;
  partOfSpeech: string;
  definition?: string; // use ___ as a placeholder for the word/phrase in the sentence
  translation?: string; // Ukrainian — used instead of definition for translation-mode topics
  example: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  icon: string;
  words: C1Word[];
  triviaUrl?: string; // link to corresponding trivia topic
}

export const TOPICS: Topic[] = [
  {
    id: "innovation",
    title: "Innovation",
    description: "Vocabulary for discussing technology, creativity and change",
    icon: "💡",
    triviaUrl: "/c1-trivia/?topic=innovation",
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
  {
    id: "leadership-equality",
    title: "Leadership & Equality",
    description: "Vocabulary for discussing gender, fairness and leadership in the workplace",
    icon: "⚖️",
    triviaUrl: "/c1-trivia/?topic=leadership-equality",
    words: [
      {
        word: "glass ceiling",
        partOfSpeech: "noun phrase",
        definition: "an invisible barrier that prevents someone, especially a woman, from advancing beyond a certain level in their career",
        example: "Despite her qualifications and results, she kept hitting the ___ that blocked her path to the boardroom.",
      },
      {
        word: "gender parity",
        partOfSpeech: "noun phrase",
        definition: "equal representation and opportunity for women and men, especially in leadership roles",
        example: "The company set a five-year target to achieve ___ across all senior management positions.",
      },
      {
        word: "redress",
        partOfSpeech: "verb",
        definition: "to correct an unfair situation and make it more fair or equal",
        example: "New pay transparency policies were introduced to ___ the persistent imbalance between male and female salaries.",
      },
      {
        word: "motherhood penalty",
        partOfSpeech: "noun phrase",
        definition: "the economic disadvantages — lower pay, fewer promotions, reduced opportunities — that mothers face at work compared to childless colleagues",
        example: "Studies show the ___ continues to affect women's earnings and career progression long after they return from maternity leave.",
      },
      {
        word: "tout",
        partOfSpeech: "verb",
        definition: "to promote or praise something enthusiastically, often to attract support or attention",
        example: "Organisations tend to ___ their diversity programmes as evidence of progress, even when structural inequalities remain unchanged.",
      },
      {
        word: "bias",
        partOfSpeech: "noun",
        definition: "an unfair judgement or preference influenced by personal opinion rather than facts",
        example: "Unconscious ___ in the hiring process can quietly prevent talented candidates from ever being considered.",
      },
      {
        word: "glass cliff",
        partOfSpeech: "noun phrase",
        definition: "a situation where someone, often a woman, is promoted to a senior role during a crisis — when the risk of failure is highest",
        example: "She accepted the promotion not realising she was on a ___ — appointed to lead a struggling division with minimal resources or backing.",
      },
    ],
  },
  {
    id: "ceo-communication",
    title: "Writing CEO Communication",
    description: "Professional phrases for executive-level business writing",
    icon: "✍️",
    triviaUrl: "/c1-trivia/?topic=ceo-communication",
    words: [
      {
        word: "roll out a new approach",
        partOfSpeech: "phrase",
        definition: "to introduce changes in a planned, phased way (instead of: introduce changes)",
        example: "We will ___ to performance reviews starting next quarter.",
      },
      {
        word: "drive sustainable growth",
        partOfSpeech: "phrase",
        definition: "to create conditions that allow a business to expand steadily without compromising future potential (instead of: help us grow)",
        example: "Our five-year strategy is designed to ___ by investing in people and technology.",
      },
      {
        word: "leverage innovative solutions",
        partOfSpeech: "phrase",
        definition: "to use new ideas and tools to maximum advantage (instead of: use new ideas)",
        example: "We must ___ to stay ahead in a rapidly changing market.",
      },
      {
        word: "maintain a competitive edge",
        partOfSpeech: "phrase",
        definition: "to keep an advantage over rivals; to stay ahead of competitors (instead of: stay competitive)",
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
    ],
  },
  {
    id: "innovation-leadership",
    title: "Innovation & Leadership",
    description: "Phrases for talking about innovation, leadership and problem-solving",
    icon: "🚀",
    triviaUrl: "/c1-trivia/?topic=innovation-leadership",
    words: [
      // ── Innovation & Leadership ──────────────────────────────────────────────
      { word: "geek out about something", partOfSpeech: "phrasal verb", translation: "захоплено говорити про щось / занурюватися в тему", example: "It is easy to ___ when you are surrounded by curious, enthusiastic people." },
      { word: "drive something towards the future", partOfSpeech: "phrase", translation: "рухати щось у майбутнє / розвивати", example: "Good leaders inspire their teams to ___ by making bold, creative decisions." },
      { word: "new developments are happening", partOfSpeech: "phrase", translation: "з'являються нові розробки", example: "In the field of artificial intelligence, ___ so fast that it is hard to keep up." },
      { word: "apply something to people's lives", partOfSpeech: "phrase", translation: "застосовувати щось у реальному житті", example: "The real challenge is not inventing solutions but knowing how to ___." },
      { word: "make an impact", partOfSpeech: "phrase", translation: "мати вплив / впливати", example: "To truly ___, you need both a great idea and the determination to follow it through." },
      { word: "think more broadly", partOfSpeech: "phrase", translation: "мислити ширше", example: "To solve complex problems, leaders need to ___ and consider perspectives from many different fields." },
      { word: "on this journey", partOfSpeech: "phrase", translation: "на цьому шляху", example: "We are grateful to have so many talented, passionate people with us ___." },
      { word: "chase your passion", partOfSpeech: "phrase", translation: "слідувати своїй пристрасті", example: "It can be scary to ___, but those who do often find the most fulfilment." },
      { word: "take someone all over the world", partOfSpeech: "phrase", translation: "дати можливість побувати по всьому світу", example: "A career in international business can ___ and expose you to new cultures every year." },
      { word: "get into technology", partOfSpeech: "phrasal verb", translation: "почати займатися технологіями", example: "She decided to ___ after building her first website at the age of twelve." },
      { word: "get your hands dirty", partOfSpeech: "idiom", translation: "братися до справи на практиці / не боятися складної роботи", example: "You can read all the theory you want, but at some point you need to ___." },
      { word: "show passion for something", partOfSpeech: "phrase", translation: "демонструвати захоплення чимось", example: "The best way to stand out in an interview is to ___ and explain why it matters to you." },
      { word: "come along on a journey", partOfSpeech: "phrase", translation: "приєднатися до когось у його справі", example: "We invite all curious minds to ___ as we explore the future of sustainable technology." },
      // ── Problem Solving & Innovation ─────────────────────────────────────────
      { word: "like-minded people", partOfSpeech: "noun phrase", translation: "однодумці", example: "Working with ___ makes collaboration easier and keeps everyone motivated." },
      { word: "brainstorm together", partOfSpeech: "phrase", translation: "генерувати ідеї разом", example: "When facing a complex challenge, it always helps to ___ before committing to a single solution." },
      { word: "tackle a challenge", partOfSpeech: "phrase", translation: "братися за складне завдання", example: "You will never know what you are truly capable of until you ___ that seems impossible." },
      { word: "tackle a problem", partOfSpeech: "phrase", translation: "вирішувати проблему", example: "The most effective way to ___ is to break it down into smaller, manageable steps." },
      { word: "make a difference", partOfSpeech: "phrase", translation: "змінювати щось на краще", example: "Even small everyday actions can ___ when enough people are committed to change." },
      { word: "gain insight", partOfSpeech: "phrase", translation: "отримати глибше розуміння", example: "Spending time with real users is the best way to ___ into what they actually need." },
      { word: "get to the heart of the problem", partOfSpeech: "idiom", translation: "дістатися суті проблеми", example: "Good leaders ask the right questions because they know how to ___." },
      { word: "face a problem", partOfSpeech: "phrase", translation: "зіткнутися з проблемою", example: "Every entrepreneur will ___ at some point — what matters most is how you respond." },
      { word: "find a workaround", partOfSpeech: "phrase", translation: "знайти обхідне рішення", example: "When the main approach failed, the team had to quickly ___ to keep the project on track." },
      { word: "create prototypes", partOfSpeech: "phrase", translation: "створювати прототипи", example: "Before launching the final product, engineers need to ___ and test them with real users." },
      { word: "try out ideas", partOfSpeech: "phrasal verb", translation: "тестувати ідеї", example: "The best innovation labs give employees time to ___ without any fear of failure." },
      { word: "deploy an idea", partOfSpeech: "phrase", translation: "впровадити ідею", example: "Having a great concept is only the beginning — the real challenge is to ___ at scale." },
      { word: "get the biggest bang for your buck", partOfSpeech: "idiom", translation: "отримати максимальний результат за вкладені ресурси", example: "When resources are limited, always focus on solutions that will help you ___." },
    ],
  },
];
