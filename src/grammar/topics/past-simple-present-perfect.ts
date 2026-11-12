import type { GrammarTopic } from "../types.ts";

/**
 * Past Simple and Present Perfect
 * Covers:
 *   - Present Perfect form: have/has + past participle
 *   - Present Perfect uses: general experiences, ever/never, relevant to present, unfinished periods
 *   - Past Simple: specific time in the past
 *   - Contrast: PP (no specific time) vs PS (specific time — last year, in 2019, yesterday)
 *   - Conversations: PP opens, PS adds detail
 */
export const pastSimplePresentPerfectTopic: GrammarTopic = {
  id: "past-simple-present-perfect",
  level: "B1",
  name: "Past Simple & Present Perfect",
  description:
    "Practise when to use the Present Perfect (I've been) and when to use the Past Simple (I went) — one of the most important distinctions in English.",
  icon: "⏳",
  cards: [
    {
      id: "ps-pp-card-1",
      rule: "have/has + past participle",
      example: "Dan ___ (already/send) the invoice, so you don't need to do it.",
      answer: "has already sent",
      explanation:
        "Present Perfect is have/has + past participle. Use has with he, she and it, and have with I, you, we and they. Already goes between has and the participle.",
      examples: [
        "I have already booked our table for tonight.",
        "The students have already finished the first test.",
      ],
      ua: "have/has + третя форма дієслова: he/she/it — has. already = «вже».",
    },
    {
      id: "ps-pp-card-2",
      rule: "ever / never + Present Perfect (life experience)",
      example: "I ___ (never/try) Georgian food, but I'd love to.",
      answer: "have never tried",
      explanation:
        "Use Present Perfect with ever and never to talk about your life up to now. We do not say when it happened.",
      examples: [
        "Have you ever driven a truck?",
        "My parents have never been to the sea.",
      ],
      ua: "ever = «коли-небудь», never = «ніколи». «Ти коли-небудь…?» — Have you ever…?",
    },
    {
      id: "ps-pp-card-3",
      rule: "Past Simple with a finished time (ago, yesterday, in 2019)",
      example: "We ___ (move) to this flat three years ago.",
      answer: "moved",
      explanation:
        "When we say exactly when something happened, we use Past Simple. We do not use Present Perfect with words like ago, yesterday, last year or in 2019.",
      examples: [
        "I met my husband in 2012.",
        "The shop closed two weeks ago.",
      ],
      ua: "ago, yesterday, in 2019 — точний минулий час: лише Past Simple (moved), не «have moved».",
    },
    {
      id: "ps-pp-card-4",
      rule: "Present Perfect for a past action with a result now",
      example: "Look! Somebody ___ (break) the car window!",
      answer: "has broken",
      explanation:
        "Use Present Perfect when a past action has a result that we can see or feel now. The result is important, not the time.",
      examples: [
        "I can't log in because I have forgotten my password.",
        "She has cut her finger, so she can't play the guitar today.",
      ],
      ua: "Наслідок видно зараз — has/have + V3: «розбили» (і вікно розбите) — has broken.",
    },
    {
      id: "ps-pp-card-5",
      rule: "Present Perfect with today, this week, this year",
      example: "I ___ (write) four reports this week, and it's only Wednesday.",
      answer: "have written",
      explanation:
        "Use Present Perfect for a time period that is not finished yet. This week, today and this year are still going on. Compare: last week is finished, so we use Past Simple.",
      examples: [
        "We have had two fire drills this year.",
        "Has the postman come today?",
      ],
      ua: "this week, today — період ще триває: have written, а не «wrote».",
    },
    {
      id: "ps-pp-card-6",
      rule: "for + period, since + point in time",
      example: "We've lived in this flat ___ six years, and we still love it.",
      answer: "for",
      explanation:
        "Use Present Perfect for a situation that started in the past and is still true now. Use for with a length of time and since with the starting point.",
      examples: [
        "My brother has worked in Warsaw for six years.",
        "It has rained since early morning.",
      ],
      ua: "for + проміжок («шість років»), since + момент («з ранку»): ситуація триває й досі.",
    },
    {
      id: "ps-pp-card-7",
      rule: "Present Perfect to start, Past Simple for details",
      example: "We've visited Lisbon twice. Last time, we ___ (stay) in a small hotel near the river.",
      answer: "stayed",
      explanation:
        "We often start with Present Perfect to talk about an experience. When we give details about one time, we switch to Past Simple.",
      examples: [
        "I've read that novel. I borrowed it from my sister last month.",
        "She has been to Italy. She went to Rome in 2019.",
      ],
      ua: "Спершу Present Perfect про досвід, потім Past Simple для деталей: last time — stayed.",
    },
    {
      id: "ps-pp-card-8",
      rule: "yet in questions and negatives",
      example: "I haven't booked the tickets ___, so I'll do it tonight.",
      answer: "yet",
      explanation:
        "Use yet with Present Perfect in questions and negative sentences. It means 'until now' and goes at the end of the sentence.",
      examples: [
        "Has the delivery arrived yet?",
        "We haven't decided where to go on holiday yet.",
      ],
      ua: "yet у питаннях і запереченнях = «ще (не)», стоїть у кінці: haven't booked … yet.",
    },
  ],
  rules: [

    // ─── GAP-FILL (7) ────────────────────────────────────────────────────────

    {
      id: "ps-pp-gap-1",
      topic: "past-simple-present-perfect",
      type: "gap-fill",
      difficulty: "beginner",
      sentence: "I ___ to Paris twice in my life — it's a beautiful city.",
      grammarRule: "Present Perfect — general experience (no specific time)",
      explanation:
        "We use Present Perfect for general life experiences when the time is not specified. 'I've been to Paris' tells us about the experience, not when it happened.",
      tip: "No time mentioned? Use Present Perfect. Specific time (last year, in 2019)? Use Past Simple.",
      gapFill: {
        gapIndex: 1,
        correctAnswer: "have been",
        options: ["have been", "went", "was", "had been"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "ps-pp-gap-2",
      topic: "past-simple-present-perfect",
      type: "gap-fill",
      difficulty: "beginner",
      sentence: "She ___ to Sweden in 2019 to attend an international conference.",
      grammarRule: "Past Simple — specific time in the past",
      explanation:
        "'In 2019' is a specific finished time in the past. Whenever we mention a specific past time (in 2019, last year, yesterday, this morning), we use Past Simple.",
      tip: "Specific time signals → Past Simple: in 2019, last year, yesterday, two days ago.",
      gapFill: {
        gapIndex: 1,
        correctAnswer: "went",
        options: ["went", "has gone", "has been", "had gone"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "ps-pp-gap-3",
      topic: "past-simple-present-perfect",
      type: "gap-fill",
      difficulty: "beginner",
      sentence: "Have you ___ been to New York? I'd love to visit one day.",
      grammarRule: "Present Perfect with ever — asking about life experience",
      explanation:
        "We use 'ever' with Present Perfect to ask about life experiences up to now. 'Have you ever been?' = at any point in your life, have you visited?",
      tip: "Ever and never are typical Present Perfect words. Have you EVER...? I've NEVER...",
      gapFill: {
        gapIndex: 2,
        correctAnswer: "ever",
        options: ["ever", "never", "already", "just"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "ps-pp-gap-4",
      topic: "past-simple-present-perfect",
      type: "gap-fill",
      difficulty: "intermediate",
      sentence: "I can't play tennis today because I ___ my leg during training.",
      grammarRule: "Present Perfect — past action relevant to the present",
      explanation:
        "We use Present Perfect when a past action has a result or consequence in the present. Hurting the leg happened in the past, but the result (can't play today) is happening now.",
      tip: "PP for present relevance: I've lost my keys (= I can't get in now). I've hurt my leg (= I can't play now).",
      gapFill: {
        gapIndex: 8,
        correctAnswer: "have hurt",
        options: ["have hurt", "hurt", "was hurting", "had hurt"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "ps-pp-gap-5",
      topic: "past-simple-present-perfect",
      type: "gap-fill",
      difficulty: "intermediate",
      sentence: "I ___ five kilometres today, but I might run a bit more this evening.",
      grammarRule: "Present Perfect — unfinished period of time",
      explanation:
        "We use Present Perfect when the time period is not finished. 'Today' is still ongoing, so we use Present Perfect. If the day were over, we'd use Past Simple.",
      tip: "Today, this week, this year = unfinished → Present Perfect. Yesterday, last week = finished → Past Simple.",
      gapFill: {
        gapIndex: 1,
        correctAnswer: "have run",
        options: ["have run", "ran", "was running", "had run"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "ps-pp-gap-6",
      topic: "past-simple-present-perfect",
      type: "gap-fill",
      difficulty: "intermediate",
      sentence: "He ___ here before, so everything in the building is new to him.",
      grammarRule: "Present Perfect negative — no specific time",
      explanation:
        "'Hasn't worked here before' describes a general experience up to now. There is no specific time mentioned, so we use Present Perfect. The result is visible in the present (everything is new to him).",
      tip: "Before, ever, never with no specific time → Present Perfect.",
      gapFill: {
        gapIndex: 1,
        correctAnswer: "hasn't worked",
        options: ["hasn't worked", "didn't work", "wasn't working", "hadn't worked"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "ps-pp-gap-7",
      topic: "past-simple-present-perfect",
      type: "gap-fill",
      difficulty: "intermediate",
      sentence: "A: Have you been to Colombia? B: Yes, I ___ there in 2021 with my family.",
      grammarRule: "Past Simple after Present Perfect opener — adding specific details",
      explanation:
        "Conversations about experiences often begin with Present Perfect. Once a specific time is mentioned (in 2021), we switch to Past Simple to add detail.",
      tip: "PP opens the topic → PS adds the specific story. 'Have you been?' 'Yes, I went in 2021.'",
      gapFill: {
        gapIndex: 9,
        correctAnswer: "went",
        options: ["went", "have been", "was", "had gone"],
        correctOptionIndex: 0,
      },
    },

    // ─── ERROR-SPOT (6) ──────────────────────────────────────────────────────

    {
      id: "ps-pp-err-1",
      topic: "past-simple-present-perfect",
      type: "error-spot",
      difficulty: "beginner",
      sentence: "I have went to Paris twice in my life.",
      grammarRule: "Present Perfect — have/has + past participle",
      explanation:
        "Present Perfect = have/has + past participle. 'Went' is Past Simple, not a past participle. The past participle of 'go' when talking about visiting a place is 'been'.",
      tip: "go → went (Past Simple) → been (Past Participle for 'have been to' = visited).",
      errorSpot: {
        errorWordIndex: 2,
        wrongWord: "went",
        correction: "been",
        reason: "After 'have', use the past participle. 'Went' is Past Simple — the correct form is 'been'.",
        correctionOptions: ["been", "went", "go", "gone"],
      },
    },

    {
      id: "ps-pp-err-2",
      topic: "past-simple-present-perfect",
      type: "error-spot",
      difficulty: "beginner",
      sentence: "I has been to Poland a few times.",
      grammarRule: "Present Perfect — subject-verb agreement (I + have)",
      explanation:
        "'I' takes 'have', not 'has'. 'Has' is used with he/she/it. This is a common agreement mistake with Present Perfect.",
      tip: "I/you/we/they + have. He/she/it + has. 'I has' is always wrong.",
      errorSpot: {
        errorWordIndex: 1,
        wrongWord: "has",
        correction: "have",
        reason: "'I' takes 'have', not 'has'. Has is only used with he/she/it.",
        correctionOptions: ["have", "has", "had", "am"],
      },
    },

    {
      id: "ps-pp-err-3",
      topic: "past-simple-present-perfect",
      type: "error-spot",
      difficulty: "beginner",
      sentence: "Did you ever been to New York?",
      grammarRule: "Present Perfect question — Have/Has + subject + past participle",
      explanation:
        "Questions with 'ever' about life experiences use Present Perfect: Have you ever been? We cannot use 'Did' with 'ever been' — 'Did' requires the base form ('go'), not the past participle ('been').",
      tip: "Ever in questions → Have you ever...? Never use Did + ever + past participle.",
      errorSpot: {
        errorWordIndex: 0,
        wrongWord: "Did",
        correction: "Have",
        reason: "Questions with 'ever' use Present Perfect: Have you ever...? Not Did you ever been.",
        correctionOptions: ["Have", "Did", "Do", "Had"],
      },
    },

    {
      id: "ps-pp-err-4",
      topic: "past-simple-present-perfect",
      type: "error-spot",
      difficulty: "intermediate",
      sentence: "He haven't worked here before.",
      grammarRule: "Present Perfect negative — subject-verb agreement (he + hasn't)",
      explanation:
        "'He' takes 'hasn't' (has + not), not 'haven't' (have + not). 'Haven't' is used with I/you/we/they.",
      tip: "He/she/it + hasn't. I/you/we/they + haven't. Match the auxiliary to the subject.",
      errorSpot: {
        errorWordIndex: 1,
        wrongWord: "haven't",
        correction: "hasn't",
        reason: "'He' takes 'hasn't', not 'haven't'. Haven't is for I/you/we/they.",
        correctionOptions: ["hasn't", "haven't", "didn't", "wasn't"],
      },
    },

    {
      id: "ps-pp-err-5",
      topic: "past-simple-present-perfect",
      type: "error-spot",
      difficulty: "intermediate",
      sentence: "She has took the exam three times this year.",
      grammarRule: "Present Perfect — have/has + past participle",
      explanation:
        "'Took' is Past Simple, not a past participle. The past participle of 'take' is 'taken'. Present Perfect always requires the past participle after have/has.",
      tip: "take → took (Past Simple) → taken (Past Participle). Always use the past participle after have/has.",
      errorSpot: {
        errorWordIndex: 2,
        wrongWord: "took",
        correction: "taken",
        reason: "After 'has', use the past participle. 'Took' is Past Simple — the correct form is 'taken'.",
        correctionOptions: ["taken", "took", "take", "taking"],
      },
    },

    {
      id: "ps-pp-err-6",
      topic: "past-simple-present-perfect",
      type: "error-spot",
      difficulty: "advanced",
      sentence: "I never saw that film before.",
      grammarRule: "Present Perfect with never — general experience",
      explanation:
        "'Never' with a life experience requires Present Perfect, not Past Simple. 'I've never seen that film' = at no point in my life have I seen it. Using Past Simple with 'never' is incorrect in standard English.",
      tip: "Never with life experiences → Present Perfect: I've never been, I've never tried, I've never seen.",
      errorSpot: {
        errorWordIndex: 2,
        wrongWord: "saw",
        correction: "have seen",
        reason: "'Never' with a life experience requires Present Perfect: 'I've never seen', not 'I never saw'.",
        correctionOptions: ["have seen", "saw", "seen", "had seen"],
      },
    },

    // ─── MULTIPLE-CHOICE (6) ─────────────────────────────────────────────────

    {
      id: "ps-pp-mc-1",
      topic: "past-simple-present-perfect",
      type: "multiple-choice",
      difficulty: "beginner",
      sentence: "I ___ to New York twice — it's an incredible city.",
      grammarRule: "Present Perfect — general experience",
      explanation:
        "No specific time is mentioned — just the number of times. This is a general life experience, so we use Present Perfect: 've been.",
      tip: "Experience with no time = Present Perfect. 'Twice', 'a few times', 'before' = PP signals.",
      multipleChoice: {
        question: "Which option correctly completes the sentence?",
        correctOption: "'ve been",
        options: ["'ve been", "went", "was", "had been"],
        optionExplanations: {
          "'ve been": "Correct! No specific time — general experience → Present Perfect.",
          went: "Wrong. 'Went' (Past Simple) needs a specific time: I went in 2020.",
          was: "Wrong. 'Was' is Past Simple of 'be' and doesn't work here.",
          "had been": "Wrong. Past Perfect is for an action before another past action.",
        },
      },
    },

    {
      id: "ps-pp-mc-2",
      topic: "past-simple-present-perfect",
      type: "multiple-choice",
      difficulty: "beginner",
      sentence: "I ___ a hamburger yesterday for the first time in months.",
      grammarRule: "Past Simple — specific time (yesterday)",
      explanation:
        "'Yesterday' is a specific finished time in the past. Whenever we use specific past time expressions, we must use Past Simple.",
      tip: "Yesterday, last week, in 2019, two years ago, this morning (if day is over) → Past Simple.",
      multipleChoice: {
        question: "Which option correctly completes the sentence?",
        correctOption: "ate",
        options: ["ate", "have eaten", "was eating", "had eaten"],
        optionExplanations: {
          ate: "Correct! 'Yesterday' is a specific past time → Past Simple.",
          "have eaten": "Wrong. Present Perfect cannot be used with a specific finished time like 'yesterday'.",
          "was eating": "Wrong. Past Continuous describes a background action, not a completed event.",
          "had eaten": "Wrong. Past Perfect is used before another past action, not with 'yesterday' alone.",
        },
      },
    },

    {
      id: "ps-pp-mc-3",
      topic: "past-simple-present-perfect",
      type: "multiple-choice",
      difficulty: "intermediate",
      sentence: "I can't find my keys anywhere — I think I ___ them at the café.",
      grammarRule: "Present Perfect — past action relevant to the present",
      explanation:
        "The past action (leaving the keys) has a current consequence (can't find them now). This present relevance is expressed with Present Perfect.",
      tip: "Can't do something NOW because of a past action → Present Perfect for the past action.",
      multipleChoice: {
        question: "Which option correctly completes the sentence?",
        correctOption: "'ve left",
        options: ["'ve left", "left", "was leaving", "had left"],
        optionExplanations: {
          "'ve left": "Correct! The past action is relevant now (I can't find them) → Present Perfect.",
          left: "Possible in informal speech, but Present Perfect is more precise for present relevance.",
          "was leaving": "Wrong. Past Continuous describes an ongoing background action, not a completed one.",
          "had left": "Wrong. Past Perfect is for an action before another past action — here the result is in the present.",
        },
      },
    },

    {
      id: "ps-pp-mc-4",
      topic: "past-simple-present-perfect",
      type: "multiple-choice",
      difficulty: "intermediate",
      sentence: "I ___ three cups of coffee this morning — I feel a bit jittery.",
      grammarRule: "Present Perfect — unfinished period (this morning)",
      explanation:
        "'This morning' refers to a period that is still going on (the morning hasn't ended). We use Present Perfect for unfinished time periods.",
      tip: "This morning (still morning), today, this week, this year = unfinished → Present Perfect.",
      multipleChoice: {
        question: "Which option correctly completes the sentence?",
        correctOption: "'ve had",
        options: ["'ve had", "had", "was having", "have been having"],
        optionExplanations: {
          "'ve had": "Correct! 'This morning' is an unfinished period → Present Perfect.",
          had: "Wrong in this context — 'had' (Past Simple) would suggest the morning is over.",
          "was having": "Wrong. Past Continuous describes an ongoing background action, not completed cups of coffee.",
          "have been having": "Wrong. Present Perfect Continuous can work here but 've had is more natural for counting.",
        },
      },
    },

    {
      id: "ps-pp-mc-5",
      topic: "past-simple-present-perfect",
      type: "multiple-choice",
      difficulty: "intermediate",
      sentence: "A: Have you tried sushi? B: Yes! I ___ it for the first time in Tokyo in 2022.",
      grammarRule: "Past Simple — adding specific detail after Present Perfect opener",
      explanation:
        "The conversation starts with Present Perfect ('Have you tried?'). Once we add a specific time ('in Tokyo in 2022'), we switch to Past Simple to tell the story.",
      tip: "PP asks about the experience. PS tells the specific story with details and time.",
      multipleChoice: {
        question: "Which option correctly completes B's reply?",
        correctOption: "tried",
        options: ["tried", "have tried", "was trying", "had tried"],
        optionExplanations: {
          tried: "Correct! Specific time 'in Tokyo in 2022' → Past Simple to tell the story.",
          "have tried": "Wrong. Once you add a specific time, switch to Past Simple.",
          "was trying": "Wrong. Past Continuous describes a background action, not a completed first experience.",
          "had tried": "Wrong. Past Perfect is for an action before another past action, not for this context.",
        },
      },
    },

    {
      id: "ps-pp-mc-6",
      topic: "past-simple-present-perfect",
      type: "multiple-choice",
      difficulty: "advanced",
      sentence: "I ___ that restaurant — you should definitely try it.",
      grammarRule: "Present Perfect — recommendation based on experience",
      explanation:
        "When making a recommendation based on a personal experience, Present Perfect is used because the focus is on the experience and its present relevance (you should try it), not on when it happened.",
      tip: "Recommendations from experience: 'I've been there', 'I've read it', 'I've tried it' → Present Perfect.",
      multipleChoice: {
        question: "Which option correctly completes the sentence?",
        correctOption: "'ve been to",
        options: ["'ve been to", "went to", "was at", "had visited"],
        optionExplanations: {
          "'ve been to": "Correct! Recommendation based on experience with present relevance → Present Perfect.",
          "went to": "Possible, but less natural — 'went to' feels like it needs a time ('last week').",
          "was at": "Wrong. 'Was at' is Past Simple and doesn't carry the recommendation/relevance meaning.",
          "had visited": "Wrong. Past Perfect implies a context of another past event, which doesn't fit here.",
        },
      },
    },

    // ─── WORD TRANSFORM (6) ────────────────────────────────────────────────

    {
      id: "ps-pp-reorder-1",
      topic: "past-simple-present-perfect",
      type: "word-transform",
      difficulty: "beginner",
      sentence: "I ___ that film last week. It was brilliant.",
      grammarRule: "Past Simple — specific finished time",
      explanation: "'Last week' is a specific finished time, so we use Past Simple. Past Simple of 'see' is 'saw'.",
      tip: "Last week/year, yesterday, in 2019 → Past Simple. See → saw (irregular).",
      wordTransform: {
        baseWord: "see",
        correctAnswer: "saw",
      },
    },

    {
      id: "ps-pp-reorder-2",
      topic: "past-simple-present-perfect",
      type: "word-transform",
      difficulty: "beginner",
      sentence: "Have you ever ___ to Japan?",
      grammarRule: "Present Perfect — life experience question",
      explanation: "'Have you ever been...?' asks about life experience. 'Been' is the past participle of 'be' used with Present Perfect.",
      tip: "Have you ever been to...? = asking about life experience. Be → been (past participle).",
      wordTransform: {
        baseWord: "be",
        correctAnswer: "been",
      },
    },

    {
      id: "ps-pp-reorder-3",
      topic: "past-simple-present-perfect",
      type: "word-transform",
      difficulty: "intermediate",
      sentence: "She ___ in Paris since 2018.",
      grammarRule: "Present Perfect — unfinished duration with 'since'",
      explanation: "'Since 2018' = from 2018 until now → Present Perfect. Third person singular: 'has lived'.",
      tip: "Since + year → Present Perfect: has lived, has worked, has known.",
      wordTransform: {
        baseWord: "live",
        correctAnswer: "has lived",
      },
    },

    {
      id: "ps-pp-reorder-4",
      topic: "past-simple-present-perfect",
      type: "word-transform",
      difficulty: "intermediate",
      sentence: "I have already ___ my homework.",
      grammarRule: "Present Perfect — 'already' signals completion",
      explanation: "'Already' with Present Perfect shows something is done. 'Finished' is the past participle of 'finish' (regular verb).",
      tip: "Already + Present Perfect: have already finished, has already arrived, have already eaten.",
      wordTransform: {
        baseWord: "finish",
        correctAnswer: "finished",
      },
    },

    {
      id: "ps-pp-reorder-5",
      topic: "past-simple-present-perfect",
      type: "word-transform",
      difficulty: "intermediate",
      sentence: "He ___ to London last summer.",
      grammarRule: "Past Simple — specific past time",
      explanation: "'Last summer' is a specific finished time → Past Simple. Past Simple of 'go' is 'went'.",
      tip: "Go → went (irregular). Last summer/year/week + Past Simple.",
      wordTransform: {
        baseWord: "go",
        correctAnswer: "went",
      },
    },

    {
      id: "ps-pp-reorder-6",
      topic: "past-simple-present-perfect",
      type: "word-transform",
      difficulty: "intermediate",
      sentence: "Have you ever ___ sushi?",
      grammarRule: "Present Perfect — life experience with 'ever'",
      explanation: "'Have you ever tried...?' asks about life experience. 'Tried' is the past participle of 'try' (regular: try → tried).",
      tip: "Have you ever + past participle? Try → tried (regular verb, y → ied).",
      wordTransform: {
        baseWord: "try",
        correctAnswer: "tried",
      },
    },

  ],
};
