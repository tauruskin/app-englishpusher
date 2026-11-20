import type { GrammarQuestion, GrammarTopic } from "../types.ts";

// Unit 7C — How to make and respond to recommendations
// 27 questions: 6 gap-fill, 6 error-spot, 7 multiple-choice, 6 word-transform, 2 sentence-match

export const makingRespondingRecommendationsQuestions: GrammarQuestion[] = [
  // ===== GAP FILL (6) =====

  {
    id: "rec-gap-1",
    topic: "making-responding-recommendations",
    type: "gap-fill",
    difficulty: "beginner",
    sentence: "There's a night market in the old town that you absolutely have ___ visit.",
    // split: There's(0) a(1) night(2) market(3) in(4) the(5) old(6) town(7) that(8) you(9) absolutely(10) have(11) ___(12) visit.(13)
    grammarRule: "have to + base verb (strong recommendation)",
    explanation:
      "'Have to' + base verb makes a strong, enthusiastic recommendation. The structure is have + to + base verb.",
    tip: "You absolutely have to + base verb — a really strong recommendation.",
    gapFill: {
      gapIndex: 12,
      correctAnswer: "to",
      options: ["must", "to", "for", "so"],
      correctOptionIndex: 1, // options[1] === "to" ✓
    },
  },

  {
    id: "rec-gap-2",
    topic: "making-responding-recommendations",
    type: "gap-fill",
    difficulty: "beginner",
    sentence: "You ___ visit the old quarter. It's beautiful at night.",
    // split: You(0) ___(1) visit(2) the(3) old(4) quarter.(5) It's(6) beautiful(7) at(8) night.(9)
    grammarRule: "must + base verb for strong recommendation",
    explanation:
      "'Must' is followed directly by the base verb, with no 'to'. It gives a strong, personal recommendation.",
    tip: "You must + base verb — no 'to' after must.",
    gapFill: {
      gapIndex: 1,
      correctAnswer: "must",
      options: ["must", "musts", "mustn't", "must to"],
      correctOptionIndex: 0, // options[0] === "must" ✓
    },
  },

  {
    id: "rec-gap-3",
    topic: "making-responding-recommendations",
    type: "gap-fill",
    difficulty: "intermediate",
    sentence: "You should ___ try the seafood market. Everyone recommends it.",
    // split: You(0) should(1) ___(2) try(3) the(4) seafood(5) market.(6) Everyone(7) recommends(8) it.(9)
    grammarRule: "should definitely + base verb",
    explanation:
      "'Should definitely' makes a recommendation stronger than plain 'should'. The adverb 'definitely' goes between 'should' and the base verb.",
    tip: "Should definitely + base verb — a stronger version of should.",
    gapFill: {
      gapIndex: 2,
      correctAnswer: "definitely",
      options: ["definitely", "definite", "define", "definitive"],
      correctOptionIndex: 0, // options[0] === "definitely" ✓
    },
  },

  {
    id: "rec-gap-4",
    topic: "making-responding-recommendations",
    type: "gap-fill",
    difficulty: "intermediate",
    sentence: "Make sure ___ take comfortable shoes. You'll be walking a lot.",
    // split: Make(0) sure(1) ___(2) take(3) comfortable(4) shoes.(5) You'll(6) be(7) walking(8) a(9) lot.(10)
    grammarRule: "Make sure you + base verb",
    explanation:
      "'Make sure you' + base verb reminds someone to do something important. We need the subject pronoun 'you' after 'sure'.",
    tip: "Make sure you + base verb — a reminder about something important.",
    gapFill: {
      gapIndex: 2,
      correctAnswer: "you",
      options: ["you", "your", "yours", "to you"],
      correctOptionIndex: 0, // options[0] === "you" ✓
    },
  },

  {
    id: "rec-gap-5",
    topic: "making-responding-recommendations",
    type: "gap-fill",
    difficulty: "intermediate",
    sentence: "Visiting the night market is one of the best things ___ do in this city.",
    // split: Visiting(0) the(1) night(2) market(3) is(4) one(5) of(6) the(7) best(8) things(9) ___(10) do(11) in(12) this(13) city.(14)
    grammarRule: "one of the best things to do",
    explanation:
      "The fixed pattern is 'one of the best things to do/see/try'. We need 'to' before the base verb.",
    tip: "One of the best things to do — always with 'to'.",
    gapFill: {
      gapIndex: 10,
      correctAnswer: "to",
      options: ["to", "for", "that", "of"],
      correctOptionIndex: 0, // options[0] === "to" ✓
    },
  },

  {
    id: "rec-gap-6",
    topic: "making-responding-recommendations",
    type: "gap-fill",
    difficulty: "advanced",
    sentence: "Don't leave the island without ___ the famous sunset cliffs.",
    // split: Don't(0) leave(1) the(2) island(3) without(4) ___(5) the(6) famous(7) sunset(8) cliffs.(9)
    grammarRule: "Don't leave without + -ing",
    explanation:
      "After the preposition 'without', use the -ing form (gerund), not the base verb. 'Don't leave without seeing...' means you really should see it.",
    tip: "Don't leave without + -ing — a very strong 'you must do this' recommendation.",
    gapFill: {
      gapIndex: 5,
      correctAnswer: "seeing",
      options: ["seeing", "see", "to see", "saw"],
      correctOptionIndex: 0, // options[0] === "seeing" ✓
    },
  },

  // ===== ERROR SPOT (6) =====

  {
    id: "rec-error-1",
    topic: "making-responding-recommendations",
    type: "error-spot",
    difficulty: "beginner",
    sentence: "You must visiting the cathedral. It's amazing.",
    // split(" ") → [0=You, 1=must, 2=visiting, 3=the, 4=cathedral., 5=It's, 6=amazing.]
    // words[2]="visiting" ✅  corrected: "You must visit the cathedral. It's amazing." ✅
    grammarRule: "must + base verb (no -ing, no to)",
    explanation:
      "After 'must', use the base verb — never -ing and never 'to'. 'You must visit' is correct; 'you must visiting' is not.",
    tip: "Must + base verb: must visit, must see, must try.",
    errorSpot: {
      errorWordIndex: 2,
      wrongWord: "visiting",
      correction: "visit",
      reason: "After 'must', use the base verb form. No -ing and no 'to'.",
      correctionOptions: ["visit", "visiting", "visited", "visits"], // "visit" at index 0
    },
  },

  {
    id: "rec-error-2",
    topic: "making-responding-recommendations",
    type: "error-spot",
    difficulty: "beginner",
    sentence: "There are a few things you absolutely has to see here.",
    // split(" ") → [0=There, 1=are, 2=a, 3=few, 4=things, 5=you, 6=absolutely, 7=has, 8=to, 9=see, 10=here.]
    // words[7]="has" ✅  corrected: "There are a few things you absolutely have to see here." ✅
    grammarRule: "have to + base verb — subject-verb agreement",
    explanation:
      "The subject 'you' takes 'have', not 'has'. 'Have to' does not change for 'you'.",
    tip: "You/I/we/they have to... He/she/it has to...",
    errorSpot: {
      errorWordIndex: 7,
      wrongWord: "has",
      correction: "have",
      reason: "The subject 'you' takes 'have', not 'has'.",
      correctionOptions: ["have", "has", "had", "having"], // "have" at index 0
    },
  },

  {
    id: "rec-error-3",
    topic: "making-responding-recommendations",
    type: "error-spot",
    difficulty: "intermediate",
    sentence: "You should definite visit the botanical gardens while you're in town.",
    // split(" ") → [0=You, 1=should, 2=definite, 3=visit, 4=the, 5=botanical, 6=gardens, 7=while, 8=you're, 9=in, 10=town.]
    // words[2]="definite" ✅  corrected: "You should definitely visit the botanical gardens while you're in town." ✅
    grammarRule: "should definitely + base verb — adverb form",
    explanation:
      "We need the adverb 'definitely' to modify the verb 'visit', not the adjective 'definite'.",
    tip: "Definite is an adjective (describes a noun). Definitely is an adverb (describes a verb).",
    errorSpot: {
      errorWordIndex: 2,
      wrongWord: "definite",
      correction: "definitely",
      reason: "We need the adverb 'definitely' to modify the verb 'visit', not the adjective 'definite'.",
      correctionOptions: ["definitely", "definite", "definitively", "definition"], // "definitely" at index 0
    },
  },

  {
    id: "rec-error-4",
    topic: "making-responding-recommendations",
    type: "error-spot",
    difficulty: "intermediate",
    sentence: "Make sure your pack extra water for the hike.",
    // split(" ") → [0=Make, 1=sure, 2=your, 3=pack, 4=extra, 5=water, 6=for, 7=the, 8=hike.]
    // words[2]="your" ✅  corrected: "Make sure you pack extra water for the hike." ✅
    grammarRule: "Make sure you + base verb — pronoun form",
    explanation:
      "We need the subject pronoun 'you', not the possessive 'your', before the base verb 'pack'.",
    tip: "Make sure you + base verb — 'you' is the subject, not 'your'.",
    errorSpot: {
      errorWordIndex: 2,
      wrongWord: "your",
      correction: "you",
      reason: "We need the subject pronoun 'you', not the possessive 'your'.",
      correctionOptions: ["you", "your", "yours", "you're"], // "you" at index 0
    },
  },

  {
    id: "rec-error-5",
    topic: "making-responding-recommendations",
    type: "error-spot",
    difficulty: "intermediate",
    sentence: "Trying the local street food are one of the best things to do here.",
    // split(" ") → [0=Trying, 1=the, 2=local, 3=street, 4=food, 5=are, 6=one, 7=of, 8=the, 9=best, 10=things, 11=to, 12=do, 13=here.]
    // words[5]="are" ✅  corrected: "Trying the local street food is one of the best things to do here." ✅
    grammarRule: "one of the best things to do — subject-verb agreement with gerund subject",
    explanation:
      "A gerund phrase ('Trying the local street food') is treated as singular, so it takes 'is', not 'are'.",
    tip: "A gerund subject (Trying..., Visiting..., Walking...) is always singular: it takes 'is'.",
    errorSpot: {
      errorWordIndex: 5,
      wrongWord: "are",
      correction: "is",
      reason: "A gerund phrase is treated as singular, so it takes 'is', not 'are'.",
      correctionOptions: ["is", "are", "was", "were"], // "is" at index 0
    },
  },

  {
    id: "rec-error-6",
    topic: "making-responding-recommendations",
    type: "error-spot",
    difficulty: "advanced",
    sentence: "Don't leave the city without see the night market. It's unforgettable.",
    // split(" ") → [0=Don't, 1=leave, 2=the, 3=city, 4=without, 5=see, 6=the, 7=night, 8=market., 9=It's, 10=unforgettable.]
    // words[5]="see" ✅  corrected: "Don't leave the city without seeing the night market. It's unforgettable." ✅
    grammarRule: "Don't leave without + -ing",
    explanation:
      "After the preposition 'without', use the -ing form (gerund), not the base verb.",
    tip: "Without + -ing: without trying, without seeing, without visiting.",
    errorSpot: {
      errorWordIndex: 5,
      wrongWord: "see",
      correction: "seeing",
      reason: "After the preposition 'without', use the -ing form, not the base verb.",
      correctionOptions: ["seeing", "see", "saw", "seen"], // "seeing" at index 0
    },
  },

  // ===== MULTIPLE CHOICE (7) =====

  {
    id: "rec-mc-1",
    topic: "making-responding-recommendations",
    type: "multiple-choice",
    difficulty: "beginner",
    sentence: "Which sentence makes the strongest recommendation to visit a place?",
    grammarRule: "must for strong recommendations",
    explanation:
      "'Must' expresses the strongest recommendation among these modal verbs — it shows real enthusiasm for the place.",
    tip: "must > should definitely > could, for recommendation strength.",
    multipleChoice: {
      question: "Which option is correct?",
      correctOption: "You must visit the temple.",
      options: [
        "You could visit the temple.",
        "You must visit the temple.",
        "You might visit the temple.",
        "You may visit the temple.",
      ],
      optionExplanations: {
        "You could visit the temple.": "Wrong — 'could' suggests a weak possibility, not a strong recommendation.",
        "You must visit the temple.": "Correct — 'must' makes the strongest, most enthusiastic recommendation.",
        "You might visit the temple.": "Wrong — 'might' expresses only a weak possibility.",
        "You may visit the temple.": "Wrong — 'may' gives permission, it doesn't recommend strongly.",
      },
    },
  },

  {
    id: "rec-mc-2",
    topic: "making-responding-recommendations",
    type: "multiple-choice",
    difficulty: "beginner",
    sentence: "A friend recommends a new café you haven't tried yet. Which response politely shows interest?",
    grammarRule: "responding to recommendations — showing interest",
    explanation:
      "'That sounds interesting' politely shows you like the idea, even though you haven't tried it yet.",
    tip: "That sounds + adjective = a polite, flexible response to any new recommendation.",
    multipleChoice: {
      question: "Which response is correct?",
      correctOption: "That sounds interesting.",
      options: [
        "That sounds interesting.",
        "I don't like that.",
        "I've already done that.",
        "No, thanks.",
      ],
      optionExplanations: {
        "That sounds interesting.": "Correct — this politely shows interest in a new recommendation.",
        "I don't like that.": "Wrong — this rejects the recommendation rather than responding to it politely.",
        "I've already done that.": "Wrong — this doesn't fit a recommendation you've never tried.",
        "No, thanks.": "Wrong — this turns down the recommendation.",
      },
    },
  },

  {
    id: "rec-mc-3",
    topic: "making-responding-recommendations",
    type: "multiple-choice",
    difficulty: "intermediate",
    sentence: "Which phrase correctly completes: 'Make sure ___ a hat — it's very sunny today.'?",
    grammarRule: "Make sure you + base verb",
    explanation:
      "'Make sure' + you + base verb reminds someone to do something important, with no 'to' before the verb.",
    tip: "Make sure you + base verb: bring, take, check, book.",
    multipleChoice: {
      question: "Which option is correct?",
      correctOption: "you bring",
      options: ["you bring", "you to bring", "bring you", "you bringing"],
      optionExplanations: {
        "you bring": "Correct — 'make sure you' + base verb, with no 'to'.",
        "you to bring": "Wrong — there is no 'to' after 'make sure you'.",
        "bring you": "Wrong — the subject 'you' must come before the verb 'bring'.",
        "you bringing": "Wrong — we need the base verb, not the -ing form.",
      },
    },
  },

  {
    id: "rec-mc-4",
    topic: "making-responding-recommendations",
    type: "multiple-choice",
    difficulty: "intermediate",
    sentence: "Which sentence correctly uses the pattern 'one of the best things to do'?",
    grammarRule: "one of the best things to do — full pattern",
    explanation:
      "The fixed pattern is 'one of the best things to do', with plural 'things', the article 'the', and the infinitive 'to do'.",
    tip: "One of the best things to do — don't drop 'the', the plural -s, or 'to'.",
    multipleChoice: {
      question: "Which option is correct?",
      correctOption: "Climbing the hill is one of the best things to do here.",
      options: [
        "Climbing the hill is one of the best thing to do here.",
        "Climbing the hill is one of the best things to do here.",
        "Climbing the hill are one of the best things to do here.",
        "Climbing the hill is one of best things to do here.",
      ],
      optionExplanations: {
        "Climbing the hill is one of the best thing to do here.": "Wrong — 'thing' must be plural: 'things'.",
        "Climbing the hill is one of the best things to do here.": "Correct — plural 'things', 'the', and 'to do' are all needed.",
        "Climbing the hill are one of the best things to do here.": "Wrong — the gerund subject 'Climbing the hill' is singular, so it needs 'is', not 'are'.",
        "Climbing the hill is one of best things to do here.": "Wrong — 'the' is missing before 'best things'.",
      },
    },
  },

  {
    id: "rec-mc-5",
    topic: "making-responding-recommendations",
    type: "multiple-choice",
    difficulty: "intermediate",
    sentence: "Your friend tells you some exciting travel news. Which response shows the most enthusiasm?",
    grammarRule: "How + adjective! for enthusiasm",
    explanation:
      "'How exciting!' with stress on 'exciting' is the clear way to sound enthusiastic about someone's news.",
    tip: "How + adjective! — stress the adjective to sound enthusiastic.",
    multipleChoice: {
      question: "Which option is correct?",
      correctOption: "How exciting!",
      options: ["OK.", "That's fine.", "How exciting!", "I see."],
      optionExplanations: {
        "OK.": "Wrong — this sounds flat and shows no enthusiasm.",
        "That's fine.": "Wrong — this is a neutral, unenthusiastic response.",
        "How exciting!": "Correct — this exclamation clearly shows enthusiasm.",
        "I see.": "Wrong — this is a neutral acknowledgement, not an enthusiastic reaction.",
      },
    },
  },

  {
    id: "rec-mc-6",
    topic: "making-responding-recommendations",
    type: "multiple-choice",
    difficulty: "intermediate",
    sentence: "Which sentence correctly recommends an activity using 'It's a great place to...'?",
    grammarRule: "It's a great/lovely place to + base verb",
    explanation:
      "After 'It's a great/lovely place', use 'to' + base verb to recommend an activity you can do there.",
    tip: "It's a great place to + verb: to see, to eat, to relax.",
    multipleChoice: {
      question: "Which option is correct?",
      correctOption: "It's a great place to walk along the river.",
      options: [
        "It's a great place for walk along the river.",
        "It's a great place to walking along the river.",
        "It's a great place to walk along the river.",
        "It's great a place to walk along the river.",
      ],
      optionExplanations: {
        "It's a great place for walk along the river.": "Wrong — 'for' needs the -ing form, not the base verb: 'for walking'.",
        "It's a great place to walking along the river.": "Wrong — after 'to', use the base verb, not -ing.",
        "It's a great place to walk along the river.": "Correct — 'place to' + base verb.",
        "It's great a place to walk along the river.": "Wrong — word order is incorrect: 'a great place', not 'great a place'.",
      },
    },
  },

  {
    id: "rec-mc-7",
    topic: "making-responding-recommendations",
    type: "multiple-choice",
    difficulty: "advanced",
    sentence: "Which sentence correctly uses 'Don't leave without...' to give a strong recommendation?",
    grammarRule: "Don't leave without + -ing",
    explanation:
      "After 'without', use the -ing form (gerund). 'Don't leave without trying...' is the correct fixed phrase.",
    tip: "Don't leave without + -ing — never 'without' + base verb or 'to' + verb.",
    multipleChoice: {
      question: "Which option is correct?",
      correctOption: "Don't leave without trying the local cheese.",
      options: [
        "Don't leave without try the local cheese.",
        "Don't leave without to try the local cheese.",
        "Don't leave without trying the local cheese.",
        "Don't leave without tried the local cheese.",
      ],
      optionExplanations: {
        "Don't leave without try the local cheese.": "Wrong — 'without' needs the -ing form, not the base verb.",
        "Don't leave without to try the local cheese.": "Wrong — 'without' is never followed by 'to' + verb.",
        "Don't leave without trying the local cheese.": "Correct — 'without' + the -ing form.",
        "Don't leave without tried the local cheese.": "Wrong — 'tried' is a past form, not a gerund.",
      },
    },
  },

  // ===== WORD TRANSFORM (6) =====

  {
    id: "rec-wt-1",
    topic: "making-responding-recommendations",
    type: "word-transform",
    difficulty: "beginner",
    sentence: "You should ___ (definite) try the floating market before you leave.",
    grammarRule: "should definitely + base verb — adverb form",
    explanation:
      "'Definite' is an adjective; we need the adverb 'definitely' to modify the verb 'try'. 'Should definitely' makes the recommendation stronger.",
    tip: "Definite → definitely. An adjective describes a noun; an adverb describes a verb.",
    wordTransform: {
      baseWord: "definite",
      correctAnswer: "definitely",
    },
  },

  {
    id: "rec-wt-2",
    topic: "making-responding-recommendations",
    type: "word-transform",
    difficulty: "beginner",
    sentence: "Don't leave the city without ___ (try) the famous dumplings.",
    grammarRule: "Don't leave without + -ing",
    explanation:
      "After the preposition 'without', use the -ing form (gerund), not the base verb. 'Don't leave without trying' means you really should try it.",
    tip: "Without + -ing: without trying, without seeing, without visiting.",
    wordTransform: {
      baseWord: "try",
      correctAnswer: "trying",
    },
  },

  {
    id: "rec-wt-3",
    topic: "making-responding-recommendations",
    type: "word-transform",
    difficulty: "intermediate",
    sentence: "Walking along the old city walls is one of the best things ___ (do) in this town.",
    grammarRule: "one of the best things to do — infinitive with to",
    explanation:
      "The fixed pattern is 'one of the best things' + 'to' + base verb. We add 'to' before the verb.",
    tip: "One of the best things to do/see/try — always with 'to'.",
    wordTransform: {
      baseWord: "do",
      correctAnswer: "to do",
    },
  },

  {
    id: "rec-wt-4",
    topic: "making-responding-recommendations",
    type: "word-transform",
    difficulty: "intermediate",
    sentence: "It's a lovely place ___ (watch) the sunset over the harbour.",
    grammarRule: "It's a lovely/great place to + base verb",
    explanation:
      "After 'It's a lovely/great place', use 'to' + base verb to recommend an activity you can do there.",
    tip: "It's a great place to + verb: to see, to eat, to relax.",
    wordTransform: {
      baseWord: "watch",
      correctAnswer: "to watch",
    },
  },

  {
    id: "rec-wt-5",
    topic: "making-responding-recommendations",
    type: "word-transform",
    difficulty: "intermediate",
    sentence: "Make sure you ___ (bring) a reusable water bottle. It gets very hot here.",
    grammarRule: "Make sure you + base verb (no change)",
    explanation:
      "After 'Make sure you', use the base form of the verb with no changes — no -s, no -ing, no 'to'.",
    tip: "Make sure you + base verb: bring, take, check, book.",
    wordTransform: {
      baseWord: "bring",
      correctAnswer: "bring",
    },
  },

  {
    id: "rec-wt-6",
    topic: "making-responding-recommendations",
    type: "word-transform",
    difficulty: "advanced",
    sentence: "A: I'm going whale watching tomorrow! B: Oh wow! How ___ (excite)!",
    grammarRule: "excite → exciting (adjective from verb)",
    explanation:
      "Add '-ing' to the verb 'excite' to make the adjective 'exciting', used after 'How' to show enthusiasm.",
    tip: "Excite (verb) → exciting (adjective). How exciting! How interesting! How amazing!",
    wordTransform: {
      baseWord: "excite",
      correctAnswer: "exciting",
    },
  },

  // ===== SENTENCE MATCH (2) =====

  {
    id: "rec-match-1",
    topic: "making-responding-recommendations",
    type: "sentence-match",
    difficulty: "beginner",
    sentence: "Match each beginning of a recommendation to its correct ending.",
    grammarRule: "Making recommendations — fixed patterns",
    explanation:
      "Each recommendation phrase needs a specific grammatical form after it — a base verb, a 'to' infinitive, or a gerund. Only one ending fits each beginning.",
    tip: "Check the grammar after each phrase: have to/must need a base verb, 'one of the best things' needs 'to', and 'without' needs '-ing'.",
    sentenceMatch: {
      pairs: [
        { beginning: "You absolutely have to", ending: "ride the cable car up the mountain." },
        { beginning: "Walking through the old market is one of the best things", ending: "to do on a rainy day." },
        { beginning: "Don't leave without", ending: "buying a bag of roasted chestnuts." },
        { beginning: "It's a lovely place", ending: "to watch the boats go by." },
      ],
    },
  },

  {
    id: "rec-match-2",
    topic: "making-responding-recommendations",
    type: "sentence-match",
    difficulty: "beginner",
    sentence: "Match each response beginning to its correct ending.",
    grammarRule: "Responding to recommendations — fixed phrases",
    explanation:
      "These are fixed phrases used to respond to a recommendation. Each beginning has only one natural, correct ending.",
    tip: "Learn these as whole chunks: that's a good idea, how exciting!, I'll definitely check it out, sounds good — let's do it!",
    sentenceMatch: {
      pairs: [
        { beginning: "OK, that's a good", ending: "idea." },
        { beginning: "Oh wow! How", ending: "exciting!" },
        { beginning: "Thanks, I'll definitely", ending: "check it out." },
        { beginning: "Sounds good -", ending: "let's do it!" },
      ],
    },
  },
];

export const makingRespondingRecommendationsTopic: GrammarTopic = {
  id: "making-responding-recommendations",
  level: "B1",
  name: "Making & Responding to Recommendations",
  description:
    "Practise phrases for recommending places and activities, and for responding to other people's recommendations.",
  lesson: "Unit 7C",
  icon: "📣",
  cards: [
    {
      id: "rec-card-1",
      rule: "have to + base verb (strong recommendation)",
      example:
        "There are so many things you absolutely have ___ try during a trip to Thailand - the street food is incredible.",
      answer: "to",
      explanation:
        "Have to + base verb makes a strong, enthusiastic recommendation. The structure is have + to + base verb, and it doesn't change for different subjects.",
      examples: [
        "You absolutely have to see the floating markets.",
        "There's a beach you have to visit - it's stunning.",
      ],
      ua: "have to + дієслово - «обов'язково треба» (сильна порада).",
    },
    {
      id: "rec-card-2",
      rule: "must + base verb (no 'to')",
      example: "You must ___ (to see / see) the cathedral - it's stunning inside.",
      answer: "see",
      explanation:
        "After 'must', use the base verb with no 'to'. 'Must to see' is incorrect.",
      examples: [
        "You must try the local cheese.",
        "You must visit the museum before you leave.",
      ],
      ua: "must + дієслово без to: «мусиш побачити» - you must see, не must to see.",
    },
    {
      id: "rec-card-3",
      rule: "should definitely + base verb",
      example: "You should ___ visit the night market before you go home.",
      answer: "definitely",
      explanation:
        "'Should definitely' makes a recommendation stronger than plain 'should'. The adverb goes between 'should' and the main verb.",
      examples: [
        "You should definitely try the street food.",
        "You should definitely watch the sunset from the bridge.",
      ],
      ua: "should definitely + дієслово - сильніша порада, ніж просто should.",
    },
    {
      id: "rec-card-4",
      rule: "Make sure you + base verb",
      example: "Make sure ___ take a map with you - the streets are confusing.",
      answer: "you",
      explanation:
        "'Make sure you' + base verb reminds someone to do something important. Don't forget 'you' after 'sure'.",
      examples: [
        "Make sure you book the tickets in advance.",
        "Make sure you try the coffee - it's famous here.",
      ],
      ua: "Make sure you + дієслово - «обов'язково зроби...» (нагадування).",
    },
    {
      id: "rec-card-5",
      rule: "one of the best things to do",
      example: "Walking along the river at sunset is one of the best things ___ do here.",
      answer: "to",
      explanation:
        "'One of the best things to do' + infinitive with 'to' describes a top recommendation among several good options.",
      examples: [
        "Visiting the old castle is one of the best things to do in the city.",
        "Trying the local market is one of the best things to do here.",
      ],
      ua: "one of the best things to do - «одна з найкращих речей» (топ-рекомендація).",
    },
    {
      id: "rec-card-6",
      rule: "It's a great/lovely place to + base verb",
      example: "It's a great place ___ watch the sunset over the bay.",
      answer: "to",
      explanation:
        "'It's a great/lovely place to' + base verb recommends an activity you can do at a specific place.",
      examples: [
        "It's a lovely place to relax after a long day.",
        "It's a great place to take photos of the skyline.",
      ],
      ua: "It's a great/lovely place to + дієслово - рекомендація, що там варто робити.",
    },
    {
      id: "rec-card-7",
      rule: "Don't leave without + -ing",
      example: "Don't leave the city without ___ (try) the famous street food.",
      answer: "trying",
      explanation:
        "'Don't leave without' + -ing form strongly recommends something you must not miss. Use the gerund after 'without'.",
      examples: [
        "Don't leave without visiting the botanical gardens.",
        "Don't leave without seeing the view from the tower.",
      ],
      ua: "Don't leave without + -ing - «не їдь, не...» (обов'язково зроби перед від'їздом).",
    },
    {
      id: "rec-card-8",
      rule: "responding: That sounds + adjective",
      example: "A: You should visit the floating market. B: That ___ interesting!",
      answer: "sounds",
      explanation:
        "Use 'That sounds' + adjective to respond positively to a recommendation you haven't tried yet.",
      examples: [
        "That sounds like a great idea.",
        "That sounds amazing - let's go there.",
      ],
      ua: "That sounds + прикметник - реакція на пораду: «Звучить цікаво!».",
    },
    {
      id: "rec-card-9",
      rule: "responding: That's a good idea",
      example: "A: Make sure you book early. B: OK, that's a good ___.",
      answer: "idea",
      explanation:
        "'That's a good idea' is a simple, friendly way to accept a recommendation or suggestion.",
      examples: [
        "That's a good idea - I'll do that.",
        "That's a good idea, thanks for telling me.",
      ],
      ua: "That's a good idea - проста фраза, щоб погодитися з порадою.",
    },
    {
      id: "rec-card-10",
      rule: "responding: How + adjective! (enthusiasm)",
      example: "A: I'm going to Shanghai next month. B: Oh wow! How ___!",
      answer: "exciting",
      explanation:
        "'How' + adjective! is an enthusiastic reaction to good news. Stress the adjective to sound more enthusiastic.",
      examples: [
        "How wonderful! I can't wait to hear about it.",
        "How amazing! You'll love the city.",
      ],
      ua: "How + прикметник! - емоційна реакція: «Як чудово!», «Як цікаво!».",
    },
  ],
  rules: makingRespondingRecommendationsQuestions,
};
