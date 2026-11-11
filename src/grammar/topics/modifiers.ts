import type { GrammarTopic } from "../types.ts";

/**
 * Modifiers — quite, fairly, relatively, pretty, reasonably, a bit more/less, a lot more/less
 * Covers:
 *   - quite + adjective (less strong than very)
 *   - quite a/an + adjective + noun (only 'quite' goes before a/an)
 *   - fairly, relatively, pretty, reasonably + adjective (similar meaning to quite)
 *   - a bit (more/less) = small degree
 *   - a lot (more/less) = large degree
 */
export const modifiersTopic: GrammarTopic = {
  id: "modifiers",
  level: "B1",
  name: "Modifiers",
  description:
    "Practise modifiers like quite, fairly, relatively, and a bit/a lot more — used to say how much or how little something is true.",
  lesson: "Lesson 10",
  rules: [

    // ─── GAP-FILL (7) ────────────────────────────────────────────────────────

    {
      id: "mod-gap-1",
      topic: "modifiers",
      type: "gap-fill",
      difficulty: "beginner",
      sentence: "That's ___ interesting — I wouldn't say it was very exciting though.",
      grammarRule: "quite — less strong than very",
      explanation:
        "'Quite' means less strong than 'very'. We use it when something is true to a moderate degree. 'That's quite interesting' = it's interesting, but not very interesting.",
      tip: "Quite = moderately true. Very = strongly true. Quite is always weaker than very.",
      gapFill: {
        gapIndex: 1,
        correctAnswer: "quite",
        options: ["quite", "very", "extremely", "absolutely"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "mod-gap-2",
      topic: "modifiers",
      type: "gap-fill",
      difficulty: "beginner",
      sentence: "It's ___ difficult to find a good job in this city at the moment.",
      grammarRule: "quite + adjective",
      explanation:
        "'Quite' + adjective describes something that is true to a moderate degree. 'Quite difficult' = difficult, but not extremely difficult.",
      tip: "quite + adjective: quite difficult, quite expensive, quite interesting.",
      gapFill: {
        gapIndex: 1,
        correctAnswer: "quite",
        options: ["quite", "a bit", "a lot", "much"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "mod-gap-3",
      topic: "modifiers",
      type: "gap-fill",
      difficulty: "beginner",
      sentence: "This area is ___ cheap to live in compared to the city centre.",
      grammarRule: "relatively + adjective",
      explanation:
        "'Relatively' means in comparison to other things. 'Relatively cheap' = cheap when you compare it to other options. It has a similar meaning to 'quite' and 'fairly'.",
      tip: "Relatively, fairly, quite, pretty — all mean 'to a moderate degree'. Use them before adjectives.",
      gapFill: {
        gapIndex: 3,
        correctAnswer: "relatively",
        options: ["relatively", "absolutely", "extremely", "very"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "mod-gap-4",
      topic: "modifiers",
      type: "gap-fill",
      difficulty: "intermediate",
      sentence: "She's ___ an easy-going person — that's why everyone gets along with her.",
      grammarRule: "quite a/an + adjective + noun",
      explanation:
        "Only 'quite' can go before 'a/an'. We say 'quite a difficult language', 'quite an easy-going person'. We cannot use fairly, relatively, or pretty in this structure.",
      tip: "quite a/an + adjective + noun. No other modifier (fairly, relatively, pretty) works in this structure.",
      gapFill: {
        gapIndex: 1,
        correctAnswer: "quite",
        options: ["quite", "fairly", "relatively", "pretty"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "mod-gap-5",
      topic: "modifiers",
      type: "gap-fill",
      difficulty: "intermediate",
      sentence: "He is ___ happy with his new lifestyle since moving to the countryside.",
      grammarRule: "fairly + adjective",
      explanation:
        "'Fairly' means to a moderate degree — similar to 'quite'. 'Fairly happy' = happy, but not very happy. It is used only before adjectives, not before 'a/an'.",
      tip: "Fairly, relatively, pretty, reasonably are all interchangeable with quite before adjectives.",
      gapFill: {
        gapIndex: 3,
        correctAnswer: "fairly",
        options: ["fairly", "absolutely", "completely", "extremely"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "mod-gap-6",
      topic: "modifiers",
      type: "gap-fill",
      difficulty: "intermediate",
      sentence: "I'd like to travel ___ more before I settle down and start a family.",
      grammarRule: "a bit more — small degree",
      explanation:
        "'A bit more' means a small amount more. 'I'd like to travel a bit more' = I want to travel slightly more than I do now. 'A bit' is used for small changes.",
      tip: "a bit more/less = small degree. a lot more/less = large degree.",
      gapFill: {
        gapIndex: 4,
        correctAnswer: "a bit",
        options: ["a bit", "a lot", "quite", "fairly"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "mod-gap-7",
      topic: "modifiers",
      type: "gap-fill",
      difficulty: "intermediate",
      sentence: "She'd like to spend ___ less on eating out and save more money each month.",
      grammarRule: "a lot less — large degree",
      explanation:
        "'A lot less' means a large amount less. It suggests a significant reduction. Compare: 'a bit less' (small change) vs 'a lot less' (big change).",
      tip: "a lot more/less = significantly more/less. Use when the change is large.",
      gapFill: {
        gapIndex: 4,
        correctAnswer: "a lot",
        options: ["a lot", "a bit", "quite", "fairly"],
        correctOptionIndex: 0,
      },
    },

    // ─── ERROR-SPOT (6) ──────────────────────────────────────────────────────

    {
      id: "mod-err-1",
      topic: "modifiers",
      type: "error-spot",
      difficulty: "beginner",
      sentence: "She'd like to be a bit more healthier than she is now.",
      grammarRule: "a bit more + adjective (base form)",
      explanation:
        "'A bit more' is already a comparative structure, so the adjective must stay in its base form. We say 'a bit more healthy', never 'a bit more healthier' — that's a double comparative.",
      tip: "a bit more + BASE adjective: a bit more healthy, a bit more careful. Never use -er after 'more'.",
      errorSpot: {
        errorWordIndex: 7,
        wrongWord: "healthier",
        correction: "healthy",
        reason: "'A bit more' already makes it comparative — don't add -er as well.",
        correctionOptions: ["healthy", "healthier", "healthiest", "health"],
      },
    },

    {
      id: "mod-err-2",
      topic: "modifiers",
      type: "error-spot",
      difficulty: "beginner",
      sentence: "He is fairly happier with his new lifestyle since moving abroad.",
      grammarRule: "fairly + adjective (base form)",
      explanation:
        "'Fairly' is a modifier used before the base form of an adjective. 'Happier' is comparative — you cannot combine a modifier like 'fairly' with a comparative adjective.",
      tip: "fairly/quite/relatively + BASE adjective. Never use them before -er comparative forms.",
      errorSpot: {
        errorWordIndex: 3,
        wrongWord: "happier",
        correction: "happy",
        reason: "'Fairly' goes before the base form of an adjective, not a comparative form.",
        correctionOptions: ["happy", "happier", "happiest", "happiness"],
      },
    },

    {
      id: "mod-err-3",
      topic: "modifiers",
      type: "error-spot",
      difficulty: "intermediate",
      sentence: "My life is pretty well at the moment, I have no complaints.",
      grammarRule: "pretty + adjective (not adverb)",
      explanation:
        "'Pretty' as a modifier goes before an adjective, not an adverb. 'Well' is an adverb — the adjective form is 'good'. We say 'My life is pretty good', not 'pretty well'.",
      tip: "pretty/quite/fairly + adjective. 'Well' is an adverb — use 'good' (adjective) after modifiers.",
      errorSpot: {
        errorWordIndex: 4,
        wrongWord: "well",
        correction: "good",
        reason: "Modifiers like 'pretty' go before adjectives, not adverbs. 'Well' is an adverb — use 'good'.",
        correctionOptions: ["good", "well", "better", "great"],
      },
    },

    {
      id: "mod-err-4",
      topic: "modifiers",
      type: "error-spot",
      difficulty: "intermediate",
      sentence: "It's quite hardly to find a parking space in the city centre.",
      grammarRule: "quite + adjective (not adverb)",
      explanation:
        "'Hardly' is an adverb meaning 'almost not'. The adjective here should be 'hard' (= difficult). We say 'quite hard to find', not 'quite hardly to find'.",
      tip: "Hard (adjective) = difficult. Hardly (adverb) = almost not. They have completely different meanings.",
      errorSpot: {
        errorWordIndex: 2,
        wrongWord: "hardly",
        correction: "hard",
        reason: "'Hardly' means 'almost not' — the adjective needed here is 'hard' (= difficult).",
        correctionOptions: ["hard", "hardly", "harder", "hardest"],
      },
    },

    {
      id: "mod-err-5",
      topic: "modifiers",
      type: "error-spot",
      difficulty: "intermediate",
      sentence: "That's quite a lot of money spending on a single meal out.",
      grammarRule: "quite a lot of money + to infinitive",
      explanation:
        "After 'money' we use a to infinitive (to spend), not an -ing form (spending). The -ing form is not grammatically correct here as a purpose/comment structure.",
      tip: "quite a lot of money to spend, to save, to waste — use to + infinitive after noun phrases like this.",
      errorSpot: {
        errorWordIndex: 6,
        wrongWord: "spending",
        correction: "to spend",
        reason: "After 'money' use to + infinitive, not -ing: 'a lot of money to spend'.",
        correctionOptions: ["to spend", "spending", "spent", "spend"],
      },
    },

    {
      id: "mod-err-6",
      topic: "modifiers",
      type: "error-spot",
      difficulty: "advanced",
      sentence: "She'd like to spend a lot fewer on eating out each month.",
      grammarRule: "a lot less (uncountable) vs a lot fewer (countable)",
      explanation:
        "'Spend' refers to money, which is uncountable. We use 'less' with uncountable nouns and 'fewer' with countable nouns. The correct form is 'a lot less', not 'a lot fewer'.",
      tip: "fewer = countable nouns (fewer friends, fewer meals). less = uncountable (less money, less time).",
      errorSpot: {
        errorWordIndex: 6,
        wrongWord: "fewer",
        correction: "less",
        reason: "Money is uncountable — use 'less', not 'fewer'.",
        correctionOptions: ["less", "fewer", "little", "least"],
      },
    },

    // ─── MULTIPLE-CHOICE (6) ─────────────────────────────────────────────────

    {
      id: "mod-mc-1",
      topic: "modifiers",
      type: "multiple-choice",
      difficulty: "beginner",
      sentence: "That's ___ an expensive hobby — most people can't afford it.",
      grammarRule: "quite a/an — only 'quite' before a/an",
      explanation:
        "Only 'quite' can be placed before 'a/an' in the structure quite a/an + adjective + noun. We cannot say 'fairly an expensive hobby' or 'pretty an expensive hobby'.",
      tip: "quite a/an + adjective + noun is a fixed structure. No other modifier works here.",
      multipleChoice: {
        question: "Which option correctly completes the sentence?",
        correctOption: "quite",
        options: ["quite", "fairly", "relatively", "pretty"],
        optionExplanations: {
          quite: "Correct! Only 'quite' can go before 'a/an': quite an expensive hobby.",
          fairly: "Wrong. 'Fairly' cannot go before 'a/an' — only 'quite' works in this structure.",
          relatively: "Wrong. 'Relatively' cannot go before 'a/an' — only 'quite' works here.",
          pretty: "Wrong. 'Pretty' cannot go before 'a/an' — only 'quite' works in this structure.",
        },
      },
    },

    {
      id: "mod-mc-2",
      topic: "modifiers",
      type: "multiple-choice",
      difficulty: "beginner",
      sentence: "The film was good, but I wouldn't say it was amazing — it was ___ entertaining.",
      grammarRule: "quite — moderate degree, less strong than very",
      explanation:
        "'Quite' is the right modifier here because it expresses a moderate degree — something that is true but not strongly so. The context ('good, but not amazing') confirms a moderate strength is needed.",
      tip: "Quite = moderate. Very/extremely = strong. When something is good but not amazing, use quite.",
      multipleChoice: {
        question: "Which option correctly completes the sentence?",
        correctOption: "quite",
        options: ["quite", "extremely", "absolutely", "incredibly"],
        optionExplanations: {
          quite: "Correct! 'Quite' expresses a moderate degree — matching the 'good but not amazing' context.",
          extremely: "Wrong. 'Extremely' is too strong — the context says it wasn't amazing.",
          absolutely: "Wrong. 'Absolutely' is used with extreme adjectives (absolutely fantastic), not moderate ones.",
          incredibly: "Wrong. 'Incredibly' is too strong for this context.",
        },
      },
    },

    {
      id: "mod-mc-3",
      topic: "modifiers",
      type: "multiple-choice",
      difficulty: "intermediate",
      sentence: "I'd like to exercise ___ more — maybe just an extra 20 minutes a day.",
      grammarRule: "a bit more — small degree",
      explanation:
        "'A bit more' expresses a small increase. The context ('just an extra 20 minutes') confirms the change is small. 'A lot more' would suggest a much bigger increase.",
      tip: "Context clues like 'just', 'slightly', 'a little' suggest 'a bit'. Words like 'much', 'significantly' suggest 'a lot'.",
      multipleChoice: {
        question: "Which option correctly completes the sentence?",
        correctOption: "a bit",
        options: ["a bit", "a lot", "quite", "fairly"],
        optionExplanations: {
          "a bit": "Correct! 'A bit more' = a small increase, matching 'just an extra 20 minutes'.",
          "a lot": "Wrong. 'A lot more' suggests a big increase — but the context says 'just an extra 20 minutes'.",
          quite: "Wrong. 'Quite more' is not a standard English expression.",
          fairly: "Wrong. 'Fairly more' is not correct — use 'fairly' before adjectives, not before 'more'.",
        },
      },
    },

    {
      id: "mod-mc-4",
      topic: "modifiers",
      type: "multiple-choice",
      difficulty: "intermediate",
      sentence: "The new office is ___ easy to get to — there are two bus routes and a metro stop.",
      grammarRule: "fairly/relatively/quite/pretty + adjective",
      explanation:
        "All four modifiers (fairly, relatively, quite, pretty) can be used before an adjective to express a moderate degree. Here 'fairly' or 'relatively' fit best as they suggest it's reasonably easy but not extremely so.",
      tip: "Fairly, relatively, quite, and pretty are largely interchangeable before adjectives. All mean 'moderately'.",
      multipleChoice: {
        question: "Which option correctly completes the sentence?",
        correctOption: "fairly",
        options: ["fairly", "absolutely", "terribly", "barely"],
        optionExplanations: {
          fairly: "Correct! 'Fairly easy' = moderately easy — the context supports a positive, moderate description.",
          absolutely: "Wrong. 'Absolutely easy' is not natural — 'absolutely' is used with extreme adjectives.",
          terribly: "Wrong. 'Terribly easy' sounds very informal and doesn't match the neutral tone here.",
          barely: "Wrong. 'Barely easy' means almost not easy — the opposite of what the context describes.",
        },
      },
    },

    {
      id: "mod-mc-5",
      topic: "modifiers",
      type: "multiple-choice",
      difficulty: "intermediate",
      sentence: "He'd like to earn ___ more so he can save up for a house.",
      grammarRule: "a lot more — large degree",
      explanation:
        "'A lot more' expresses a large increase. Saving for a house requires a significant change in earnings, so 'a lot more' is appropriate. 'A bit more' would suggest only a small increase.",
      tip: "Saving for a house, paying off a mortgage — these are large goals. Use 'a lot more', not 'a bit more'.",
      multipleChoice: {
        question: "Which option correctly completes the sentence?",
        correctOption: "a lot",
        options: ["a lot", "a bit", "quite", "pretty"],
        optionExplanations: {
          "a lot": "Correct! 'A lot more' = a significant increase, which fits saving for a house.",
          "a bit": "Possible, but 'a bit more' implies a small increase — unlikely to be enough to save for a house.",
          quite: "Wrong. 'Quite more' is not a standard English expression.",
          pretty: "Wrong. 'Pretty more' is not correct — use 'pretty' before adjectives only.",
        },
      },
    },

    {
      id: "mod-mc-6",
      topic: "modifiers",
      type: "multiple-choice",
      difficulty: "advanced",
      sentence: "That's ___ a difficult language to learn — even advanced students find it challenging.",
      grammarRule: "quite a/an + adjective + noun",
      explanation:
        "Only 'quite' can precede 'a/an' in this structure. The sentence 'quite a difficult language' = it is significantly difficult. This use of 'quite' before 'a/an' actually has a stronger meaning than 'quite' before a plain adjective.",
      tip: "Quite a/an + noun phrase can sometimes mean 'remarkably' — stronger than quite + adjective alone.",
      multipleChoice: {
        question: "Which option correctly completes the sentence?",
        correctOption: "quite",
        options: ["quite", "rather", "fairly", "pretty"],
        optionExplanations: {
          quite: "Correct! Only 'quite' goes before 'a/an' in this structure: quite a difficult language.",
          rather: "Wrong here — 'rather a difficult language' is possible in British English but unusual; 'quite' is the standard taught form.",
          fairly: "Wrong. 'Fairly a difficult language' is not grammatically possible.",
          pretty: "Wrong. 'Pretty a difficult language' is not grammatically possible.",
        },
      },
    },

    // ─── SENTENCE-REORDER (6) ────────────────────────────────────────────────

    {
      id: "mod-reorder-1",
      topic: "modifiers",
      type: "word-transform",
      difficulty: "beginner",
      sentence: "She explains things very ___.",
      grammarRule: "Adjective → adverb: add -ly",
      explanation: "To modify a verb, use an adverb. Add -ly to the adjective 'clear' to make the adverb 'clearly'.",
      tip: "Adjective + -ly = adverb: clear → clearly, slow → slowly, quiet → quietly.",
      wordTransform: {
        baseWord: "clear",
        correctAnswer: "clearly",
      },
    },

    {
      id: "mod-reorder-2",
      topic: "modifiers",
      type: "word-transform",
      difficulty: "beginner",
      sentence: "He is ___ happy with his new job.",
      grammarRule: "fairly + adjective — moderate degree",
      explanation: "'Fairly happy' means moderately happy. 'Fairly' comes before the adjective.",
      tip: "Fairly goes before the adjective: fairly easy, fairly cheap, fairly good.",
      wordTransform: {
        baseWord: "fair",
        correctAnswer: "fairly",
      },
    },

    {
      id: "mod-reorder-3",
      topic: "modifiers",
      type: "word-transform",
      difficulty: "intermediate",
      sentence: "The test was ___ easy.",
      grammarRule: "surprisingly + adjective",
      explanation: "'Surprisingly easy' means easier than expected. Add -ly to 'surprising' to form the adverb.",
      tip: "Surprising → surprisingly. Use -ly adverbs before adjectives to express unexpected degree.",
      wordTransform: {
        baseWord: "surprising",
        correctAnswer: "surprisingly",
      },
    },

    {
      id: "mod-reorder-4",
      topic: "modifiers",
      type: "word-transform",
      difficulty: "intermediate",
      sentence: "This area is ___ expensive to live in.",
      grammarRule: "relatively + adjective",
      explanation: "'Relatively expensive' means expensive compared to other places. Add -ly to 'relative' to form the adverb.",
      tip: "Relative → relatively. Comes before the adjective: relatively cheap, relatively easy.",
      wordTransform: {
        baseWord: "relative",
        correctAnswer: "relatively",
      },
    },

    {
      id: "mod-reorder-5",
      topic: "modifiers",
      type: "word-transform",
      difficulty: "intermediate",
      sentence: "He plays the piano ___.",
      grammarRule: "good (adjective) vs well (adverb)",
      explanation: "'Well' is the adverb form of 'good'. Use 'well' to describe how an action is done: plays well, speaks well.",
      tip: "Good (adjective) → well (adverb). 'He plays well' (not 'plays good').",
      wordTransform: {
        baseWord: "good",
        correctAnswer: "well",
      },
    },

    {
      id: "mod-reorder-6",
      topic: "modifiers",
      type: "word-transform",
      difficulty: "advanced",
      sentence: "She works ___ — often until midnight.",
      grammarRule: "hard (adverb) vs hardly (= almost not)",
      explanation: "'Hard' is both an adjective and adverb meaning 'with effort'. 'Hardly' means 'almost not' — a completely different meaning.",
      tip: "She works hard (= with effort). She hardly works (= almost not at all). These mean opposite things!",
      wordTransform: {
        baseWord: "hard/hardly",
        correctAnswer: "hard",
      },
    },

  ],
};
