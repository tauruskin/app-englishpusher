import type { Topic } from "../levels/types.ts";

// A2 vocabulary topics. Added by the add-a2-topic skill (via @Englishpusher_bot or Claude Code).
// While this list is empty, the App shows A2 as "Coming soon".
export const TOPICS: Topic[] = [
  {
    id: "food",
    title: "Food",
    icon: "🍎",
    description: "Everyday words for food, meals and feeling hungry",
    triviaUrl: "/a2-trivia/?topic=food",
    words: [
      {
        word: "apple",
        translation: "яблуко",
        transcription: "/ˈæpl/",
        example: "I eat an ___ for a snack every day.",
      },
      {
        word: "bread",
        translation: "хліб",
        transcription: "/bred/",
        example: "We need to buy a loaf of ___ for dinner.",
      },
      {
        word: "cheese",
        translation: "сир",
        transcription: "/tʃiːz/",
        example: "This ___ is made from milk and often has a strong smell.",
      },
      {
        word: "breakfast",
        translation: "сніданок",
        transcription: "/ˈbrekfəst/",
        example: "What do you usually eat for ___?",
      },
      {
        word: "hungry",
        translation: "голодний",
        transcription: "/ˈhʌŋgri/",
        example: "After the walk, I felt very ___ and wanted to eat something.",
      },
      {
        word: "cook",
        translation: "готувати",
        transcription: "/kʊk/",
        example: "My dad likes to ___ dinner on Sundays.",
      },
    ],
  },
];
