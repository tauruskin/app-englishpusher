import type { GrammarTopic } from "../types.ts";

/**
 * How to... Apologise and Give Reasons
 * Covers:
 *   - Phrases to apologise: Sorry I'm late, Sorry to keep you waiting, I'm really sorry, I apologise, Sorry about that
 *   - Phrases to accept an apology: Don't worry, No problem, It's/That's fine, It's/That's OK, Never mind
 *   - Phrases to give a reason: There was a (delay/problem), My (train) was delayed, got cancelled, I got lost, The traffic was terrible
 *   - Phrases to accept responsibility: I made a mistake, It was my/our fault
 *   - Phrases to take action: I'll be there as soon as possible, I'll call you back
 */
export const apologiseAndGiveReasonsTopic: GrammarTopic = {
  id: "apologise-and-give-reasons",
  level: "B1",
  name: "Apologise & Give Reasons",
  description:
    "Practise the phrases used to apologise, give reasons, accept responsibility, and promise action in English.",
  icon: "🙏",
  cards: [
    {
      id: "apol-card-1",
      rule: "Sorry to + base verb",
      example: "Sorry ___ interrupt, but your taxi is here.",
      answer: "to",
      explanation: "Use sorry to + base verb when you apologise for something you are doing right now. Do not use -ing after sorry to.",
      examples: ["Sorry to bother you, but is this seat free?", "Sorry to call you so late in the evening."],
      ua: "Sorry to + дієслово: «Вибачте, що турбую» — Sorry to bother you.",
    },
    {
      id: "apol-card-2",
      rule: "sorry for / apologise for + -ing",
      example: "I'm really sorry for ___ (miss) your birthday party last night.",
      answer: "missing",
      explanation: "After a preposition such as for, use the -ing form. Say apologise for not replying or sorry for forgetting, never 'for to forget'.",
      examples: ["I apologise for not replying sooner.", "We are very sorry for causing so much trouble."],
      ua: "Після for — форма на -ing: «Вибач, що забув» — sorry for forgetting.",
    },
    {
      id: "apol-card-3",
      rule: "make a mistake (not do a mistake)",
      example: "It's easy to ___ a mistake when you are in a hurry.",
      answer: "make",
      explanation: "We make mistakes, errors and decisions. We do tasks and activities, for example do homework. Never say do a mistake.",
      examples: ["I'm sorry, I made a mistake with the price.", "Everyone makes mistakes when they are tired."],
      ua: "Українською «зробити помилку», а англійською — тільки make a mistake, не do.",
    },
    {
      id: "apol-card-4",
      rule: "It was my / our fault",
      example: "My colleague and I forgot to lock the office. It was ___ fault, not the cleaner's.",
      answer: "our",
      explanation: "Say it was my fault or it was our fault to accept responsibility. Fault is uncountable here, so it has no plural: never 'our faults'.",
      examples: ["It was my fault. I didn't check the time.", "Don't blame Anna. It was our fault, not hers."],
      ua: "«Це моя вина» — It was my fault. Fault тут без -s: не «our faults».",
    },
    {
      id: "apol-card-5",
      rule: "was / got + past participle (reasons)",
      example: "Sorry I was late yesterday. The road ___ (close) because of an accident.",
      answer: "was closed",
      explanation: "To give a reason, use was/were or got + past participle. It shows that something outside your control happened.",
      examples: ["Our train was delayed because of a signal failure.", "The 7:30 bus got cancelled, so I had to walk."],
      ua: "Причину пояснюємо пасивом: «Потяг затримався» — The train was delayed.",
    },
    {
      id: "apol-card-6",
      rule: "I got lost / I got the time wrong",
      example: "I thought our appointment was at three, but it was at two. I got the time ___.",
      answer: "wrong",
      explanation: "Use got + adjective to explain a mistake or a problem: I got lost, I got the time wrong, I got stuck.",
      examples: ["I got lost in the old town and my phone had no signal.", "Sorry, I got the address wrong and went to the old office."],
      ua: "Пояснюємо: «я заблукав» — I got lost, «я переплутав час» — I got the time wrong.",
    },
    {
      id: "apol-card-7",
      rule: "There was a problem with ...",
      example: "Sorry I didn't reply. There was a problem ___ my email password, and I couldn't log in.",
      answer: "with",
      explanation: "Use there was a problem/delay/issue with + noun to say that something went wrong without blaming anyone. It sounds polite and professional.",
      examples: ["There was a delay with the delivery, but it arrived today.", "There was a problem with the lift, so we used the stairs."],
      ua: "Без звинувачення: «Була проблема з...» — There was a problem with...",
    },
    {
      id: "apol-card-8",
      rule: "Don't worry about it / Never mind",
      example: "A: Sorry, I spilled coffee on your desk. B: Don't worry ___ it — I'll wipe it up.",
      answer: "about",
      explanation: "To accept an apology, say Don't worry, No problem, That's fine or Never mind. Don't worry about it is a friendly and very common reply.",
      examples: ["No problem, we have plenty of time.", "Never mind, it's only a small mistake."],
      ua: "Прийняти вибачення: «Нічого страшного» — Don't worry about it / No problem.",
    },
    {
      id: "apol-card-9",
      rule: "I'll call you back / as soon as possible",
      example: "I'm in a meeting right now, but I'll call you ___ at four o'clock.",
      answer: "back",
      explanation: "To promise action, use I'll + verb. Call you back means return someone's call: the pronoun goes between call and back. As soon as possible is a fixed phrase.",
      examples: ["I'll call you back as soon as I leave the office.", "I'll send you the file as soon as possible."],
      ua: "Обіцянка: «Передзвоню» — I'll call you back. Займенник стоїть між call і back.",
    },
    {
      id: "apol-card-10",
      rule: "should have + past participle",
      example: "I should ___ booked the tickets earlier, but I forgot. I'm so sorry.",
      answer: "have",
      explanation: "Use should have + past participle to say you regret something you did not do. It is a polite way to take responsibility.",
      examples: ["I should have told you about the change.", "We should have left earlier to avoid the traffic."],
      ua: "Жаль, що не зробив: «Треба було попередити» — I should have warned you.",
    },
  ],
  rules: [

    // ─── GAP-FILL (7) ────────────────────────────────────────────────────────

    {
      id: "apol-gap-1",
      topic: "apologise-and-give-reasons",
      type: "gap-fill",
      difficulty: "beginner",
      sentence: "Sorry I'm ___ and the traffic was absolutely terrible today.",
      grammarRule: "Apologising — Sorry I'm late",
      explanation:
        "'Sorry I'm late' is the standard phrase to apologise for arriving after the expected time. It is short, natural, and commonly used in both formal and informal situations.",
      tip: "Sorry I'm late / Sorry to keep you waiting / I'm really sorry — all are natural ways to apologise.",
      gapFill: {
        gapIndex: 2,
        correctAnswer: "late",
        options: ["late", "sorry", "here", "ready"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "apol-gap-2",
      topic: "apologise-and-give-reasons",
      type: "gap-fill",
      difficulty: "beginner",
      sentence: "I'm sorry I'm late. My train was ___ by over an hour.",
      grammarRule: "Giving a reason — My (train) was delayed",
      explanation:
        "'Was delayed' explains why you are late. It uses passive voice (the train was delayed by something outside your control). This is a common and natural way to give a reason.",
      tip: "My train/bus was delayed. My flight got cancelled. The traffic was terrible — all give reasons.",
      gapFill: {
        gapIndex: 7,
        correctAnswer: "delayed",
        options: ["delayed", "cancelled", "lost", "missed"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "apol-gap-3",
      topic: "apologise-and-give-reasons",
      type: "gap-fill",
      difficulty: "beginner",
      sentence: "I got the ___ wrong and came on Thursday instead of Friday.",
      grammarRule: "Giving a reason — I got the (date/time) wrong",
      explanation:
        "'I got the date wrong' means you had the wrong information about the date. This phrase is used to explain a mix-up or misunderstanding about when something was happening.",
      tip: "I got the date/time/address/name wrong — all follow the same pattern to explain a mistake.",
      gapFill: {
        gapIndex: 3,
        correctAnswer: "date",
        options: ["date", "meeting", "train", "person"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "apol-gap-4",
      topic: "apologise-and-give-reasons",
      type: "gap-fill",
      difficulty: "beginner",
      sentence: "I'll be there as soon as ___. Please don't start without me.",
      grammarRule: "Taking action — I'll be there as soon as possible",
      explanation:
        "'As soon as possible' is a fixed phrase meaning 'at the earliest moment'. It shows you are taking action to fix the problem quickly. Often shortened to ASAP.",
      tip: "'As soon as possible' is a fixed phrase — memorise it as a whole unit.",
      gapFill: {
        gapIndex: 6,
        correctAnswer: "possible",
        options: ["possible", "I want", "quickly", "fast"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "apol-gap-5",
      topic: "apologise-and-give-reasons",
      type: "gap-fill",
      difficulty: "intermediate",
      sentence: "My flight got ___ so I had to book a completely new ticket for the next day.",
      grammarRule: "Giving a reason — My (flight) got cancelled",
      explanation:
        "'Got cancelled' means the flight was cancelled (by the airline). 'Got cancelled' is more natural in spoken English than 'was cancelled', though both are correct.",
      tip: "My train/flight got cancelled — 'got' + past participle is common in spoken English for things that happened to you.",
      gapFill: {
        gapIndex: 3,
        correctAnswer: "cancelled",
        options: ["cancelled", "delayed", "missed", "changed"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "apol-gap-6",
      topic: "apologise-and-give-reasons",
      type: "gap-fill",
      difficulty: "intermediate",
      sentence: "There was a ___ with your reservation and your room wasn't ready on arrival.",
      grammarRule: "Giving a reason — There was a (problem/delay) with...",
      explanation:
        "'There was a problem with...' is used to explain that something went wrong, without necessarily saying whose fault it was. It is polite and professional.",
      tip: "There was a problem/delay/issue with... — use this when something went wrong with a system or service.",
      gapFill: {
        gapIndex: 3,
        correctAnswer: "problem",
        options: ["problem", "fault", "mistake", "reason"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "apol-gap-7",
      topic: "apologise-and-give-reasons",
      type: "gap-fill",
      difficulty: "intermediate",
      sentence: "It was ___ fault — I should have double-checked the meeting time.",
      grammarRule: "Accepting responsibility — It was my fault",
      explanation:
        "'It was my fault' is a direct and honest way to accept responsibility. It is stronger than just apologising — it clearly states who is to blame.",
      tip: "It was my/our fault. I made a mistake. — both accept responsibility directly and clearly.",
      gapFill: {
        gapIndex: 2,
        correctAnswer: "my",
        options: ["my", "me", "mine", "myself"],
        correctOptionIndex: 0,
      },
    },

    // ─── ERROR-SPOT (6) ──────────────────────────────────────────────────────

    {
      id: "apol-err-1",
      topic: "apologise-and-give-reasons",
      type: "error-spot",
      difficulty: "beginner",
      sentence: "Sorry to keeping you waiting — I got stuck in traffic.",
      grammarRule: "Sorry to + base form (not -ing)",
      explanation:
        "'Sorry to keep you waiting' is the correct fixed phrase. After 'sorry to', we use the base form of the verb, not the -ing form. 'Sorry to keeping' is not grammatically correct.",
      tip: "Sorry to + BASE FORM: Sorry to keep you waiting, Sorry to bother you, Sorry to interrupt.",
      errorSpot: {
        errorWordIndex: 2,
        wrongWord: "keeping",
        correction: "keep",
        reason: "After 'sorry to', use the base form — not the -ing form.",
        correctionOptions: ["keep", "keeping", "kept", "have kept"],
      },
    },

    {
      id: "apol-err-2",
      topic: "apologise-and-give-reasons",
      type: "error-spot",
      difficulty: "beginner",
      sentence: "I did a mistake and sent the wrong file to the client.",
      grammarRule: "Accept responsibility — make a mistake (not do)",
      explanation:
        "The correct collocation is 'make a mistake', not 'do a mistake'. In English, 'make' is used with mistakes, errors, and decisions. 'Do' is used with tasks and activities.",
      tip: "Make a mistake / make an error — never 'do a mistake'. Make = create something (including errors).",
      errorSpot: {
        errorWordIndex: 1,
        wrongWord: "did",
        correction: "made",
        reason: "The correct collocation is 'make a mistake', not 'do a mistake'.",
        correctionOptions: ["made", "did", "have", "got"],
      },
    },

    {
      id: "apol-err-3",
      topic: "apologise-and-give-reasons",
      type: "error-spot",
      difficulty: "intermediate",
      sentence: "The journey was terribly and I arrived two hours late.",
      grammarRule: "The (traffic/journey) was terrible — adjective, not adverb",
      explanation:
        "After 'was', we need an adjective ('terrible'), not an adverb ('terribly'). The subject 'journey' is described by an adjective. 'Terribly' is an adverb used to modify verbs or other adjectives, not after 'was'.",
      tip: "The traffic/journey was TERRIBLE (adjective). Not 'terribly' — that's an adverb.",
      errorSpot: {
        errorWordIndex: 3,
        wrongWord: "terribly",
        correction: "terrible",
        reason: "After 'was', use an adjective (terrible), not an adverb (terribly).",
        correctionOptions: ["terrible", "terribly", "terrified", "terrific"],
      },
    },

    {
      id: "apol-err-4",
      topic: "apologise-and-give-reasons",
      type: "error-spot",
      difficulty: "intermediate",
      sentence: "I'll call you backs later today once I have more information.",
      grammarRule: "Taking action — I'll call you back",
      explanation:
        "'Call you back' is a fixed phrasal verb meaning to return someone's phone call. 'Back' does not change form — it is an adverb in this phrase, not a noun, so it cannot be pluralised.",
      tip: "I'll call you back / I'll get back to you — fixed phrases. Never 'call you backs'.",
      errorSpot: {
        errorWordIndex: 3,
        wrongWord: "backs",
        correction: "back",
        reason: "'Back' in 'call you back' is an adverb — it cannot be made plural.",
        correctionOptions: ["back", "backs", "backward", "behind"],
      },
    },

    {
      id: "apol-err-5",
      topic: "apologise-and-give-reasons",
      type: "error-spot",
      difficulty: "intermediate",
      sentence: "It was our faults and we should have checked the schedule more carefully.",
      grammarRule: "Accept responsibility — It was my/our fault (uncountable)",
      explanation:
        "'Fault' in this context is uncountable and does not take a plural form. We say 'It was my fault' or 'It was our fault', never 'my faults' or 'our faults'.",
      tip: "It was my/our fault — 'fault' here is uncountable. No plural form.",
      errorSpot: {
        errorWordIndex: 3,
        wrongWord: "faults",
        correction: "fault",
        reason: "'Fault' in 'It was our fault' is uncountable — no plural form.",
        correctionOptions: ["fault", "faults", "mistake", "problem"],
      },
    },

    {
      id: "apol-err-6",
      topic: "apologise-and-give-reasons",
      type: "error-spot",
      difficulty: "advanced",
      sentence: "I apologise for been late to the presentation this morning.",
      grammarRule: "I apologise for + -ing form",
      explanation:
        "'Apologise for' is followed by a gerund (-ing form). 'Been' is a past participle, not a gerund. The correct form is 'being', which is the -ing form of 'be'.",
      tip: "Apologise for + -ing: apologise for being late, apologise for missing, apologise for causing.",
      errorSpot: {
        errorWordIndex: 3,
        wrongWord: "been",
        correction: "being",
        reason: "After 'apologise for', use the -ing form. 'Been' is past participle — 'being' is the gerund.",
        correctionOptions: ["being", "been", "be", "to be"],
      },
    },

    // ─── MULTIPLE-CHOICE (6) ─────────────────────────────────────────────────

    {
      id: "apol-mc-1",
      topic: "apologise-and-give-reasons",
      type: "multiple-choice",
      difficulty: "beginner",
      sentence: "A: I'm really sorry I missed the meeting. B: ___ — it happens to everyone.",
      grammarRule: "Accepting an apology — Don't worry",
      explanation:
        "'Don't worry' is a natural, friendly way to accept an apology and reassure someone. It tells the person that the situation is not serious.",
      tip: "Don't worry / No problem / It's fine / Never mind — all accept an apology and reassure the speaker.",
      multipleChoice: {
        question: "Which option correctly completes B's reply?",
        correctOption: "Don't worry",
        options: ["Don't worry", "Thank you", "I'm sorry", "That's wrong"],
        optionExplanations: {
          "Don't worry": "Correct! 'Don't worry' accepts the apology and reassures the person.",
          "Thank you": "Wrong. 'Thank you' is a response to thanks, not an apology.",
          "I'm sorry": "Wrong. 'I'm sorry' is an apology — here we need a response to an apology.",
          "That's wrong": "Wrong. This does not accept an apology — it suggests disagreement.",
        },
      },
    },

    {
      id: "apol-mc-2",
      topic: "apologise-and-give-reasons",
      type: "multiple-choice",
      difficulty: "beginner",
      sentence: "A: Sorry about that — I sent the wrong file. B: ___, just send me the correct one.",
      grammarRule: "Accepting an apology — No problem",
      explanation:
        "'No problem' dismisses the apology and focuses on the solution. It is casual and reassuring, commonly used in both spoken and written English.",
      tip: "No problem / Don't worry / It's fine / That's OK — all tell the person not to worry.",
      multipleChoice: {
        question: "Which option correctly completes B's reply?",
        correctOption: "No problem",
        options: ["No problem", "No thank you", "That's bad", "I disagree"],
        optionExplanations: {
          "No problem": "Correct! 'No problem' accepts the apology and moves on to the solution.",
          "No thank you": "Wrong. 'No thank you' refuses an offer — it is not used to accept an apology.",
          "That's bad": "Wrong. This would make the person feel worse, not better.",
          "I disagree": "Wrong. This is used to express disagreement, not to accept an apology.",
        },
      },
    },

    {
      id: "apol-mc-3",
      topic: "apologise-and-give-reasons",
      type: "multiple-choice",
      difficulty: "intermediate",
      sentence: "I'll ___ once I get out of the meeting — probably around 4pm.",
      grammarRule: "Taking action — I'll call you back",
      explanation:
        "'Call you back' is the correct word order for this phrasal verb. The object pronoun ('you') goes between the verb ('call') and the particle ('back').",
      tip: "Call you back — the pronoun always goes between 'call' and 'back'. Never 'call back you'.",
      multipleChoice: {
        question: "Which option correctly completes the sentence?",
        correctOption: "call you back",
        options: ["call you back", "call back you", "you call back", "back call you"],
        optionExplanations: {
          "call you back": "Correct! Pronoun goes between the verb and particle: call + you + back.",
          "call back you": "Wrong. With pronoun objects, the particle cannot come before the pronoun.",
          "you call back": "Wrong. This is an inversion — not correct in this context.",
          "back call you": "Wrong. This word order does not exist in English.",
        },
      },
    },

    {
      id: "apol-mc-4",
      topic: "apologise-and-give-reasons",
      type: "multiple-choice",
      difficulty: "intermediate",
      sentence: "The ___ was terrible, so I took the train instead of driving.",
      grammarRule: "Giving a reason — The (traffic/journey) was terrible",
      explanation:
        "The phrase 'The traffic was terrible' is used to explain a delay caused by bad road conditions. 'Traffic' fits perfectly here because the speaker decided to take the train instead of driving.",
      tip: "The traffic/journey was terrible — use this to explain a delay caused by travel conditions.",
      multipleChoice: {
        question: "Which option correctly completes the sentence?",
        correctOption: "traffic",
        options: ["traffic", "apology", "mistake", "problem"],
        optionExplanations: {
          traffic: "Correct! 'The traffic was terrible' explains why driving wasn't possible.",
          apology: "Wrong. An apology cannot be terrible in this context — we need a travel reason.",
          mistake: "Wrong. 'The mistake was terrible' doesn't explain why someone took the train.",
          problem: "Wrong. 'There was a problem' is a different structure — 'The problem was terrible' doesn't fit.",
        },
      },
    },

    {
      id: "apol-mc-5",
      topic: "apologise-and-give-reasons",
      type: "multiple-choice",
      difficulty: "intermediate",
      sentence: "I'm so sorry — I completely ___ and went to the wrong office.",
      grammarRule: "Giving a reason — I got lost",
      explanation:
        "'I got lost' means you lost your way and couldn't find the right place. It is a natural, common phrase to explain why you were late or went to the wrong place.",
      tip: "I got lost = I couldn't find my way. A fixed phrase — always 'got lost', not 'was lost' (in this meaning).",
      multipleChoice: {
        question: "Which option correctly completes the sentence?",
        correctOption: "got lost",
        options: ["got lost", "got late", "made lost", "was losing"],
        optionExplanations: {
          "got lost": "Correct! 'I got lost' is the natural phrase for losing your way.",
          "got late": "Wrong. 'Got late' is not a standard English phrase — use 'was late' or 'arrived late'.",
          "made lost": "Wrong. 'Make lost' is not an English collocation.",
          "was losing": "Wrong. 'Was losing' is continuous — it doesn't describe arriving at the wrong place.",
        },
      },
    },

    {
      id: "apol-mc-6",
      topic: "apologise-and-give-reasons",
      type: "multiple-choice",
      difficulty: "advanced",
      sentence: "A: I'm so sorry about the mix-up with your order. B: ___ — let's just sort it out now.",
      grammarRule: "Accepting an apology — Never mind",
      explanation:
        "'Never mind' is used to tell someone not to worry about something that has already happened. It accepts the apology and moves the conversation forward. It is slightly more formal than 'Don't worry'.",
      tip: "Never mind / Don't worry / No problem / That's OK — all accept an apology. 'Never mind' often implies 'let's move on'.",
      multipleChoice: {
        question: "Which option correctly completes B's reply?",
        correctOption: "Never mind",
        options: ["Never mind", "Never ever", "Don't ever", "No worry"],
        optionExplanations: {
          "Never mind": "Correct! 'Never mind' accepts the apology and suggests moving forward.",
          "Never ever": "Wrong. 'Never ever' is an emphatic form of 'never' — it doesn't accept an apology.",
          "Don't ever": "Wrong. 'Don't ever' is a warning or prohibition, not an apology acceptance.",
          "No worry": "Wrong. The correct phrase is 'No worries' (informal) or 'Don't worry' — 'No worry' is not standard.",
        },
      },
    },

    // ─── SENTENCE-REORDER (6) ────────────────────────────────────────────────

    {
      id: "apol-reorder-1",
      topic: "apologise-and-give-reasons",
      type: "word-transform",
      difficulty: "beginner",
      sentence: "I'm really sorry for ___ late.",
      grammarRule: "Gerund after preposition: sorry for + -ing",
      explanation: "After a preposition ('for'), we use the -ing form (gerund). 'Sorry for being late' = I apologise for my lateness.",
      tip: "Preposition + -ing: sorry for being, thank you for coming, responsible for missing.",
      wordTransform: {
        baseWord: "be",
        correctAnswer: "being",
      },
    },

    {
      id: "apol-reorder-2",
      topic: "apologise-and-give-reasons",
      type: "word-transform",
      difficulty: "beginner",
      sentence: "Please accept my ___.",
      grammarRule: "Noun plural: apology → apologies",
      explanation: "'Apologies' is the plural of 'apology'. It is the formal noun used in polite requests for forgiveness.",
      tip: "Apology → apologies (nouns ending in -y: change y to i + -es). Formal: please accept my apologies.",
      wordTransform: {
        baseWord: "apology",
        correctAnswer: "apologies",
      },
    },

    {
      id: "apol-reorder-3",
      topic: "apologise-and-give-reasons",
      type: "word-transform",
      difficulty: "beginner",
      sentence: "The train ___ by 20 minutes.",
      grammarRule: "Passive voice for giving reasons: was/were + past participle",
      explanation: "Use passive voice to explain what happened: 'was delayed' (by something outside your control). Delay → delayed (regular).",
      tip: "Giving reasons with passive: the train was delayed, my flight got cancelled, the road was closed.",
      wordTransform: {
        baseWord: "delay",
        correctAnswer: "was delayed",
      },
    },

    {
      id: "apol-reorder-4",
      topic: "apologise-and-give-reasons",
      type: "word-transform",
      difficulty: "intermediate",
      sentence: "I should have ___ you earlier. I'm sorry.",
      grammarRule: "Should have + past participle — missed obligation",
      explanation: "'Should have called' expresses regret about a past action that didn't happen. Structure: should have + past participle.",
      tip: "Should have + past participle = regret: should have called, should have told, should have come.",
      wordTransform: {
        baseWord: "call",
        correctAnswer: "called",
      },
    },

    {
      id: "apol-reorder-5",
      topic: "apologise-and-give-reasons",
      type: "word-transform",
      difficulty: "intermediate",
      sentence: "Sorry to ___ you waiting.",
      grammarRule: "Sorry to + base verb",
      explanation: "'Sorry to keep you waiting' is a fixed polite phrase. After 'sorry to', use the base form of the verb.",
      tip: "Sorry to + base verb: sorry to keep, sorry to bother, sorry to interrupt.",
      wordTransform: {
        baseWord: "keep",
        correctAnswer: "keep",
      },
    },

    {
      id: "apol-reorder-6",
      topic: "apologise-and-give-reasons",
      type: "word-transform",
      difficulty: "intermediate",
      sentence: "I ___ a big mistake and I take full responsibility.",
      grammarRule: "Past Simple — accepting responsibility (make/made)",
      explanation: "'Made' is the Past Simple of 'make'. 'Make a mistake' is a fixed collocation — never 'do a mistake'.",
      tip: "Make → made. Collocations: make a mistake, make an error, make a decision.",
      wordTransform: {
        baseWord: "make",
        correctAnswer: "made",
      },
    },

  ],
};
