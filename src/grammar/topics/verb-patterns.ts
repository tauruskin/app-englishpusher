import type { GrammarTopic } from "../types.ts";

/**
 * Verb Patterns — Verb + -ing / Verb + to infinitive
 * Covers:
 *   - -ing form as subject of a sentence
 *   - Preposition + -ing form
 *   - Verbs followed by -ing (enjoy, avoid, miss, finish, imagine, don't mind, stop, spend time)
 *   - Verbs followed by to infinitive (hope, decide, want, promise, agree, choose, need, expect, seem, help, would like)
 */
export const verbPatternsTopic: GrammarTopic = {
  id: "verb-patterns",
  level: "B1",
  name: "Verb Patterns",
  description:
    "Practise when to use verb + -ing (enjoy swimming) and when to use verb + to infinitive (hope to become).",
  lesson: "Lesson 7",
  rules: [

    // ─── GAP-FILL (7) ────────────────────────────────────────────────────────

    {
      id: "vp-gap-1",
      topic: "verb-patterns",
      type: "gap-fill",
      difficulty: "beginner",
      sentence: "She enjoys ___ tennis with her friends at the weekend.",
      grammarRule: "Verb + -ing form (enjoy)",
      explanation:
        "'Enjoy' is always followed by a verb in the -ing form. We say 'enjoy swimming', 'enjoy playing', never 'enjoy to play'.",
      tip: "Memory trick: if you enjoy something, you're already doing it — use the -ing form.",
      gapFill: {
        gapIndex: 2,
        correctAnswer: "playing",
        options: ["playing", "to play", "play", "played"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "vp-gap-2",
      topic: "verb-patterns",
      type: "gap-fill",
      difficulty: "beginner",
      sentence: "I hope ___ a doctor when I finish university.",
      grammarRule: "Verb + to infinitive (hope)",
      explanation:
        "'Hope' is followed by a to infinitive. We say 'hope to become', 'hope to find', never 'hope becoming'.",
      tip: "Verbs about future plans or wishes (hope, want, decide) use to + infinitive.",
      gapFill: {
        gapIndex: 2,
        correctAnswer: "to become",
        options: ["to become", "becoming", "become", "became"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "vp-gap-3",
      topic: "verb-patterns",
      type: "gap-fill",
      difficulty: "beginner",
      sentence: "They decided ___ a new car after their holiday.",
      grammarRule: "Verb + to infinitive (decide)",
      explanation:
        "'Decide' is followed by a to infinitive. We say 'decided to buy', 'decided to leave', never 'decided buying'.",
      tip: "Decide, choose, agree, promise — these all take to + infinitive.",
      gapFill: {
        gapIndex: 2,
        correctAnswer: "to buy",
        options: ["to buy", "buying", "buy", "bought"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "vp-gap-4",
      topic: "verb-patterns",
      type: "gap-fill",
      difficulty: "intermediate",
      sentence: "He finished ___ the report just before the deadline.",
      grammarRule: "Verb + -ing form (finish)",
      explanation:
        "'Finish' is always followed by -ing. We say 'finished writing', 'finished cooking', never 'finished to write'.",
      tip: "Think of finish as completing an action already in progress — so -ing feels natural.",
      gapFill: {
        gapIndex: 2,
        correctAnswer: "writing",
        options: ["writing", "to write", "write", "written"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "vp-gap-5",
      topic: "verb-patterns",
      type: "gap-fill",
      difficulty: "intermediate",
      sentence: "After ___ the film, we went for a walk in the park.",
      grammarRule: "Preposition + -ing form",
      explanation:
        "After a preposition (after, before, without, instead of), always use the -ing form. 'After seeing', never 'after to see'.",
      tip: "Prepositions (after, before, without, by, instead of) are always followed by -ing.",
      gapFill: {
        gapIndex: 1,
        correctAnswer: "seeing",
        options: ["seeing", "to see", "see", "saw"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "vp-gap-6",
      topic: "verb-patterns",
      type: "gap-fill",
      difficulty: "intermediate",
      sentence: "I can't imagine ___ in a foreign country without speaking the language.",
      grammarRule: "Verb + -ing form (imagine)",
      explanation:
        "'Imagine' is always followed by -ing. We say 'imagine living', 'imagine working', never 'imagine to live'.",
      tip: "Imagine, avoid, miss, enjoy — these verbs describe real or mental experiences, so they use -ing.",
      gapFill: {
        gapIndex: 3,
        correctAnswer: "living",
        options: ["living", "to live", "live", "lived"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "vp-gap-7",
      topic: "verb-patterns",
      type: "gap-fill",
      difficulty: "intermediate",
      sentence: "She promised ___ on time for the meeting.",
      grammarRule: "Verb + to infinitive (promise)",
      explanation:
        "'Promise' is followed by a to infinitive. We say 'promised to arrive', 'promised to help', never 'promised arriving'.",
      tip: "Promise is a commitment about a future action — use to + infinitive.",
      gapFill: {
        gapIndex: 2,
        correctAnswer: "to arrive",
        options: ["to arrive", "arriving", "arrive", "arrived"],
        correctOptionIndex: 0,
      },
    },

    // ─── ERROR-SPOT (6) ──────────────────────────────────────────────────────

    {
      id: "vp-err-1",
      topic: "verb-patterns",
      type: "error-spot",
      difficulty: "beginner",
      sentence: "I enjoy swam in the pool every morning.",
      grammarRule: "Verb + -ing form (enjoy)",
      explanation:
        "'Enjoy' must be followed by the -ing form, not a past tense verb. The correct form is 'enjoy swimming'.",
      tip: "After enjoy, always use -ing: enjoy swimming, enjoy cooking, enjoy reading.",
      errorSpot: {
        errorWordIndex: 2,
        wrongWord: "swam",
        correction: "swimming",
        reason: "'Enjoy' is followed by -ing, not a past tense verb.",
        correctionOptions: ["swimming", "swim", "to swim", "swum"],
      },
    },

    {
      id: "vp-err-2",
      topic: "verb-patterns",
      type: "error-spot",
      difficulty: "beginner",
      sentence: "She hopes passing the exam next week.",
      grammarRule: "Verb + to infinitive (hope)",
      explanation:
        "'Hope' must be followed by a to infinitive, not -ing. The correct form is 'hopes to pass'.",
      tip: "Hope is about a future wish — use to + infinitive: hope to pass, hope to win.",
      errorSpot: {
        errorWordIndex: 2,
        wrongWord: "passing",
        correction: "to pass",
        reason: "'Hope' is followed by to + infinitive, not -ing.",
        correctionOptions: ["to pass", "pass", "passed", "to passing"],
      },
    },

    {
      id: "vp-err-3",
      topic: "verb-patterns",
      type: "error-spot",
      difficulty: "intermediate",
      sentence: "He avoided travelled by bus to work every day.",
      grammarRule: "Verb + -ing form (avoid)",
      explanation:
        "'Avoid' must be followed by the -ing form, not past tense. The correct form is 'avoided travelling'.",
      tip: "Avoid is always followed by -ing: avoid travelling, avoid eating, avoid making.",
      errorSpot: {
        errorWordIndex: 2,
        wrongWord: "travelled",
        correction: "travelling",
        reason: "'Avoid' is followed by -ing, not past simple.",
        correctionOptions: ["travelling", "to travel", "travel", "travels"],
      },
    },

    {
      id: "vp-err-4",
      topic: "verb-patterns",
      type: "error-spot",
      difficulty: "intermediate",
      sentence: "They decided going to Paris for their summer holiday.",
      grammarRule: "Verb + to infinitive (decide)",
      explanation:
        "'Decide' must be followed by a to infinitive, not -ing. The correct form is 'decided to go'.",
      tip: "Decide always takes to + infinitive: decided to go, decided to stay, decided to buy.",
      errorSpot: {
        errorWordIndex: 2,
        wrongWord: "going",
        correction: "to go",
        reason: "'Decide' is followed by to + infinitive, not -ing.",
        correctionOptions: ["to go", "go", "went", "to going"],
      },
    },

    {
      id: "vp-err-5",
      topic: "verb-patterns",
      type: "error-spot",
      difficulty: "intermediate",
      sentence: "I miss see my old school friends from primary school.",
      grammarRule: "Verb + -ing form (miss)",
      explanation:
        "'Miss' must be followed by the -ing form. The correct form is 'miss seeing'.",
      tip: "Miss is followed by -ing: miss seeing, miss living, miss working.",
      errorSpot: {
        errorWordIndex: 2,
        wrongWord: "see",
        correction: "seeing",
        reason: "'Miss' is followed by -ing, not the base form.",
        correctionOptions: ["seeing", "to see", "saw", "seen"],
      },
    },

    {
      id: "vp-err-6",
      topic: "verb-patterns",
      type: "error-spot",
      difficulty: "intermediate",
      sentence: "She promised finishing the project before the end of the week.",
      grammarRule: "Verb + to infinitive (promise)",
      explanation:
        "'Promise' must be followed by a to infinitive, not -ing. The correct form is 'promised to finish'.",
      tip: "Promise always takes to + infinitive: promised to finish, promised to call, promised to help.",
      errorSpot: {
        errorWordIndex: 2,
        wrongWord: "finishing",
        correction: "to finish",
        reason: "'Promise' is followed by to + infinitive, not -ing.",
        correctionOptions: ["to finish", "finish", "finished", "to finishing"],
      },
    },

    // ─── MULTIPLE-CHOICE (6) ─────────────────────────────────────────────────

    {
      id: "vp-mc-1",
      topic: "verb-patterns",
      type: "multiple-choice",
      difficulty: "beginner",
      sentence: "Which verb is always followed by an -ing form?",
      grammarRule: "Verbs followed by -ing vs to infinitive",
      explanation:
        "'Enjoy' is always followed by -ing (enjoy swimming). 'Hope', 'want', and 'decide' are followed by to + infinitive.",
      tip: "Key -ing verbs: enjoy, avoid, miss, finish, imagine, don't mind, stop, spend time.",
      multipleChoice: {
        question: "Which option is correct?",
        correctOption: "enjoy",
        options: ["enjoy", "hope", "want", "decide"],
        optionExplanations: {
          enjoy: "Correct! 'Enjoy' is always followed by -ing: I enjoy swimming.",
          hope: "Wrong. 'Hope' takes to + infinitive: I hope to pass the exam.",
          want: "Wrong. 'Want' takes to + infinitive: I want to go home.",
          decide: "Wrong. 'Decide' takes to + infinitive: She decided to leave.",
        },
      },
    },

    {
      id: "vp-mc-2",
      topic: "verb-patterns",
      type: "multiple-choice",
      difficulty: "beginner",
      sentence: "I would like ___ to London next summer.",
      grammarRule: "Verb + to infinitive (would like)",
      explanation:
        "'Would like' is followed by a to infinitive, just like 'want'. We say 'would like to travel', never 'would like travelling'.",
      tip: "'Would like' = polite 'want'. Both take to + infinitive.",
      multipleChoice: {
        question: "Which option correctly completes the sentence?",
        correctOption: "to travel",
        options: ["to travel", "travelling", "travel", "travelled"],
        optionExplanations: {
          "to travel": "Correct! 'Would like' is followed by to + infinitive.",
          travelling: "Wrong. 'Would like' takes to + infinitive, not -ing.",
          travel: "Wrong. You need 'to' before the verb after 'would like'.",
          travelled: "Wrong. 'Would like' takes to + infinitive in present meaning.",
        },
      },
    },

    {
      id: "vp-mc-3",
      topic: "verb-patterns",
      type: "multiple-choice",
      difficulty: "beginner",
      sentence: "They agreed ___ the project together by the end of the month.",
      grammarRule: "Verb + to infinitive (agree)",
      explanation:
        "'Agree' is followed by a to infinitive. We say 'agreed to finish', 'agreed to help', never 'agreed finishing'.",
      tip: "'Agree' describes a decision or promise about the future — use to + infinitive.",
      multipleChoice: {
        question: "Which option correctly completes the sentence?",
        correctOption: "to finish",
        options: ["to finish", "finishing", "finish", "finished"],
        optionExplanations: {
          "to finish": "Correct! 'Agree' is followed by to + infinitive.",
          finishing: "Wrong. 'Agree' takes to + infinitive, not -ing.",
          finish: "Wrong. You need 'to' before the verb after 'agree'.",
          finished: "Wrong. 'Agree' takes to + infinitive, not past simple.",
        },
      },
    },

    {
      id: "vp-mc-4",
      topic: "verb-patterns",
      type: "multiple-choice",
      difficulty: "intermediate",
      sentence: "I don't mind ___ early if it means avoiding the traffic.",
      grammarRule: "Verb + -ing form (don't mind)",
      explanation:
        "'Don't mind' is always followed by -ing. We say 'don't mind getting up', 'don't mind waiting', never 'don't mind to get up'.",
      tip: "'Don't mind' means it's not a problem for you — use -ing to describe the action.",
      multipleChoice: {
        question: "Which option correctly completes the sentence?",
        correctOption: "getting up",
        options: ["getting up", "to get up", "get up", "got up"],
        optionExplanations: {
          "getting up": "Correct! 'Don't mind' is always followed by -ing.",
          "to get up": "Wrong. 'Don't mind' takes -ing, not to + infinitive.",
          "get up": "Wrong. 'Don't mind' must be followed by -ing.",
          "got up": "Wrong. 'Don't mind' takes -ing, not a past tense verb.",
        },
      },
    },

    {
      id: "vp-mc-5",
      topic: "verb-patterns",
      type: "multiple-choice",
      difficulty: "intermediate",
      sentence: "She needs ___ harder if she wants to pass the exam.",
      grammarRule: "Verb + to infinitive (need)",
      explanation:
        "'Need' is followed by a to infinitive. We say 'needs to study', 'needs to work', never 'needs studying' (in this meaning).",
      tip: "Need + to infinitive describes what must be done: need to study, need to hurry.",
      multipleChoice: {
        question: "Which option correctly completes the sentence?",
        correctOption: "to study",
        options: ["to study", "studying", "study", "studied"],
        optionExplanations: {
          "to study": "Correct! 'Need' (about a person) is followed by to + infinitive.",
          studying: "Wrong. 'Need' (about a person) takes to + infinitive, not -ing.",
          study: "Wrong. You need 'to' before the verb after 'need'.",
          studied: "Wrong. 'Need' takes to + infinitive, not past simple.",
        },
      },
    },

    {
      id: "vp-mc-6",
      topic: "verb-patterns",
      type: "multiple-choice",
      difficulty: "advanced",
      sentence: "___ in a foreign language can be very challenging at first.",
      grammarRule: "-ing form as subject of a sentence",
      explanation:
        "An -ing form can act as the subject of a sentence, just like a noun. 'Reading in a foreign language' is the subject here. We cannot use 'to read' as a subject in natural spoken English.",
      tip: "When a verb is the subject of a sentence, use -ing: Swimming is fun. Reading helps you learn.",
      multipleChoice: {
        question: "Which option correctly completes the sentence?",
        correctOption: "Reading",
        options: ["Reading", "To read", "Read", "Reads"],
        optionExplanations: {
          Reading: "Correct! The -ing form can act as the subject of a sentence.",
          "To read": "This can work in formal written English, but -ing is more natural here.",
          Read: "Wrong. The base form cannot be the subject of a sentence.",
          Reads: "Wrong. A conjugated verb cannot be the subject of a sentence.",
        },
      },
    },

    // ─── SENTENCE-REORDER (6) ────────────────────────────────────────────────

    {
      id: "vp-reorder-1",
      topic: "verb-patterns",
      type: "word-transform",
      difficulty: "beginner",
      sentence: "I love ___ in the sea.",
      grammarRule: "Verb + -ing form (love)",
      explanation: "'Love' is followed by the -ing form: 'love swimming'. Add -ing to the base verb.",
      tip: "Love, like, hate, enjoy — all followed by -ing: love swimming, enjoy reading.",
      wordTransform: {
        baseWord: "swim",
        correctAnswer: "swimming",
      },
    },

    {
      id: "vp-reorder-2",
      topic: "verb-patterns",
      type: "word-transform",
      difficulty: "beginner",
      sentence: "She decided ___ a new car.",
      grammarRule: "Verb + to infinitive (decide)",
      explanation: "'Decide' is followed by to + infinitive: 'decided to buy'. Use the full infinitive form.",
      tip: "Decide, choose, agree, promise — always followed by to + infinitive.",
      wordTransform: {
        baseWord: "buy",
        correctAnswer: "to buy",
      },
    },

    {
      id: "vp-reorder-3",
      topic: "verb-patterns",
      type: "word-transform",
      difficulty: "beginner",
      sentence: "They avoid ___ by bus.",
      grammarRule: "Verb + -ing form (avoid)",
      explanation: "'Avoid' is always followed by -ing: 'avoid travelling'. Never use to + infinitive after avoid.",
      tip: "Avoid + -ing: avoid travelling, avoid eating, avoid making mistakes.",
      wordTransform: {
        baseWord: "travel",
        correctAnswer: "travelling",
        alternativeAnswers: ["traveling"],
      },
    },

    {
      id: "vp-reorder-4",
      topic: "verb-patterns",
      type: "word-transform",
      difficulty: "intermediate",
      sentence: "He hopes ___ a doctor one day.",
      grammarRule: "Verb + to infinitive (hope)",
      explanation: "'Hope' is followed by to + infinitive: 'hopes to become'. Use the full infinitive form.",
      tip: "Hope describes a wish — always followed by to + infinitive: hope to become, hope to find.",
      wordTransform: {
        baseWord: "become",
        correctAnswer: "to become",
      },
    },

    {
      id: "vp-reorder-5",
      topic: "verb-patterns",
      type: "word-transform",
      difficulty: "intermediate",
      sentence: "I enjoy ___ in the park on weekends.",
      grammarRule: "-ing form after enjoy",
      explanation: "'Enjoy' is always followed by the -ing form, not the infinitive: 'enjoy walking'.",
      tip: "Enjoy + -ing: enjoy walking, enjoy cooking, enjoy watching. Never enjoy + to.",
      wordTransform: {
        baseWord: "walk",
        correctAnswer: "walking",
      },
    },

    {
      id: "vp-reorder-6",
      topic: "verb-patterns",
      type: "word-transform",
      difficulty: "intermediate",
      sentence: "I promised ___ on time.",
      grammarRule: "Verb + to infinitive (promise)",
      explanation: "'Promise' is followed by to + infinitive: 'promised to arrive'. Use the full infinitive.",
      tip: "Promise always takes to + infinitive: promise to call, promise to arrive, promise to help.",
      wordTransform: {
        baseWord: "arrive",
        correctAnswer: "to arrive",
      },
    },

  ],
};
