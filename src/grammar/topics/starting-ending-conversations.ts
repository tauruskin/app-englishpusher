import type { GrammarTopic } from "../types.ts";

// Lesson 9 — How to start and end a conversation; keep a conversation going
// 27 questions: 7 gap-fill, 6 error-spot, 6 multiple-choice, 6 word-transform, 2 sentence-match

export const startingEndingConversationsTopic: GrammarTopic = {
  id: "starting-ending-conversations",
  level: "B1",
  name: "Starting & Ending Conversations",
  lesson: "Lesson 9",
  description:
    "Practice phrases for starting, maintaining, and ending conversations in English",
  rules: [
    // ─── GAP-FILL (7) ───────────────────────────────────────────────────────

    {
      id: "conv-gap-1",
      topic: "starting-ending-conversations",
      type: "gap-fill",
      difficulty: "beginner",
      sentence: "Excuse me, is there ___ wifi near here?",
      // split: Excuse(0) me,(1) is(2) there(3) ___(4) wifi(5) near(6) here?(7)
      grammarRule: "Quantifiers in questions",
      explanation:
        "'Any' is used in questions and negative sentences when asking about availability. 'Some' is for positive statements.",
      tip: "Use 'any' in questions: 'Is there any...?'",
      gapFill: {
        gapIndex: 4,
        correctAnswer: "any",
        options: ["a", "any", "some", "free"],
        correctOptionIndex: 1, // options[1] === "any" ✓
      },
    },

    {
      id: "conv-gap-2",
      topic: "starting-ending-conversations",
      type: "gap-fill",
      difficulty: "beginner",
      sentence: "Is this your ___ time at this event?",
      // split: Is(0) this(1) your(2) ___(3) time(4) at(5) this(6) event?(7)
      grammarRule: "Fixed conversation phrases",
      explanation:
        "'First time' is a fixed phrase used to ask if someone has never been to a place or event before.",
      tip: "The full phrase is 'Is this your first time here/at...?'",
      gapFill: {
        gapIndex: 3,
        correctAnswer: "first",
        options: ["last", "only", "first", "next"],
        correctOptionIndex: 2, // options[2] === "first" ✓
      },
    },

    {
      id: "conv-gap-3",
      topic: "starting-ending-conversations",
      type: "gap-fill",
      difficulty: "intermediate",
      sentence: "How long have you ___ this job?",
      // split: How(0) long(1) have(2) you(3) ___(4) this(5) job?(6)
      grammarRule: "Present perfect with 'how long'",
      explanation:
        "Use 'have + past participle' with 'How long' to ask about duration. 'Had' is the past participle of 'have'.",
      tip: "'How long have you had...?' — asking about something you still have.",
      gapFill: {
        gapIndex: 4,
        correctAnswer: "had",
        options: ["done", "had", "made", "worked"],
        correctOptionIndex: 1, // options[1] === "had" ✓
      },
    },

    {
      id: "conv-gap-4",
      topic: "starting-ending-conversations",
      type: "gap-fill",
      difficulty: "beginner",
      sentence: "I'm Sarah, ___ the way.",
      // split: I'm(0) Sarah,(1) ___(2) the(3) way.(4)
      grammarRule: "Fixed conversation phrases",
      explanation:
        "'By the way' is a fixed phrase used to introduce yourself or add extra information casually in conversation.",
      tip: "'By the way' signals a casual, informal addition to a conversation.",
      gapFill: {
        gapIndex: 2,
        correctAnswer: "by",
        options: ["on", "in", "by", "for"],
        correctOptionIndex: 2, // options[2] === "by" ✓
      },
    },

    {
      id: "conv-gap-5",
      topic: "starting-ending-conversations",
      type: "gap-fill",
      difficulty: "intermediate",
      sentence: "It's a lovely evening, ___ it?",
      // split: It's(0) a(1) lovely(2) evening,(3) ___(4) it?(5)
      grammarRule: "Tag questions",
      explanation:
        "Tag questions after positive statements use a negative tag. 'It's lovely' → 'isn't it?'",
      tip: "Positive statement + negative tag: 'It's nice, isn't it?'",
      gapFill: {
        gapIndex: 4,
        correctAnswer: "isn't",
        options: ["is", "doesn't", "isn't", "wasn't"],
        correctOptionIndex: 2, // options[2] === "isn't" ✓
      },
    },

    {
      id: "conv-gap-6",
      topic: "starting-ending-conversations",
      type: "gap-fill",
      difficulty: "beginner",
      sentence: "I've ___ to go, I'm afraid.",
      // split: I've(0) ___(1) to(2) go,(3) I'm(4) afraid.(5)
      grammarRule: "Fixed farewell phrases",
      explanation:
        "'I've got to go' is a common informal phrase meaning 'I must leave now'. 'I'm afraid' softens the statement.",
      tip: "'Have got to' = 'have to' in informal British English.",
      gapFill: {
        gapIndex: 1,
        correctAnswer: "got",
        options: ["get", "getting", "got", "gone"],
        correctOptionIndex: 2, // options[2] === "got" ✓
      },
    },

    {
      id: "conv-gap-7",
      topic: "starting-ending-conversations",
      type: "gap-fill",
      difficulty: "beginner",
      sentence: "Have ___ at the festival!",
      // split: Have(0) ___(1) at(2) the(3) festival!(4)
      grammarRule: "Fixed farewell phrases",
      explanation:
        "'Have fun' is a fixed farewell phrase. You cannot say 'Have well' or 'Have nice' without an article.",
      tip: "'Have fun!' and 'Have a good time!' are both correct farewells.",
      gapFill: {
        gapIndex: 1,
        correctAnswer: "fun",
        options: ["well", "fun", "nice", "good"],
        correctOptionIndex: 1, // options[1] === "fun" ✓
      },
    },

    // ─── ERROR-SPOT (6) ──────────────────────────────────────────────────────

    {
      id: "conv-err-1",
      topic: "starting-ending-conversations",
      type: "error-spot",
      difficulty: "intermediate",
      sentence: "Is this your first time on this event?",
      // split: Is(0) this(1) your(2) first(3) time(4) on(5) this(6) event?(7)
      // error: "on"(5) → "at"
      grammarRule: "Prepositions with events",
      explanation:
        "We use 'at' with events and places: 'at this event', 'at a party', 'at a festival'. 'On' is used for surfaces and days.",
      tip: "Use 'at' for events: 'at a concert', 'at a meeting', 'at this event'.",
      errorSpot: {
        errorWordIndex: 5,
        wrongWord: "on",
        correction: "at",
        reason:
          "We use 'at' with events and places: 'at this event', 'at a party', 'at a festival'.",
        correctionOptions: ["in", "at", "for", "of"], // "at" at index 1
      },
    },

    {
      id: "conv-err-2",
      topic: "starting-ending-conversations",
      type: "error-spot",
      difficulty: "intermediate",
      sentence: "It's a lovely day, is it?",
      // split: It's(0) a(1) lovely(2) day,(3) is(4) it?(5)
      // error: "is"(4) → "isn't"
      grammarRule: "Tag questions",
      explanation:
        "After a positive statement, the tag question must be negative: 'It's lovely, isn't it?'",
      tip: "Positive statement → negative tag. 'It is...' → '...isn't it?'",
      errorSpot: {
        errorWordIndex: 4,
        wrongWord: "is",
        correction: "isn't",
        reason:
          "After a positive statement, the tag question must be negative: 'It's lovely, isn't it?'",
        correctionOptions: ["was", "isn't", "doesn't", "hasn't"], // "isn't" at index 1
      },
    },

    {
      id: "conv-err-3",
      topic: "starting-ending-conversations",
      type: "error-spot",
      difficulty: "intermediate",
      sentence: "Are you do anything nice at the weekend?",
      // split: Are(0) you(1) do(2) anything(3) nice(4) at(5) the(6) weekend?(7)
      // error: "do"(2) → "doing"
      grammarRule: "Present continuous",
      explanation:
        "After 'Are you', we need the -ing form (present continuous): 'Are you doing anything nice?'",
      tip: "'Are you + -ing': 'Are you doing, going, working...'",
      errorSpot: {
        errorWordIndex: 2,
        wrongWord: "do",
        correction: "doing",
        reason:
          "After 'Are you', we need the -ing continuous form: 'Are you doing anything nice?'",
        correctionOptions: ["done", "doing", "did", "does"], // "doing" at index 1
      },
    },

    {
      id: "conv-err-4",
      topic: "starting-ending-conversations",
      type: "error-spot",
      difficulty: "beginner",
      sentence: "See you lately",
      // split: See(0) you(1) lately(2)
      // error: "lately"(2) → "later"
      grammarRule: "Fixed farewell phrases",
      explanation:
        "'See you later' is a fixed farewell expression. 'Lately' means 'recently' — the opposite of what is needed here.",
      tip: "Fixed farewell: 'See you later.' Never 'See you lately.'",
      errorSpot: {
        errorWordIndex: 2,
        wrongWord: "lately",
        correction: "later",
        reason:
          "'See you later' is a fixed phrase. 'Lately' means 'recently', which is the opposite meaning.",
        correctionOptions: ["soon", "later", "again", "next"], // "later" at index 1
      },
    },

    {
      id: "conv-err-5",
      topic: "starting-ending-conversations",
      type: "error-spot",
      difficulty: "beginner",
      sentence: "That's me bus, I've got to go",
      // split: That's(0) me(1) bus,(2) I've(3) got(4) to(5) go(6)
      // error: "me"(1) → "my"
      grammarRule: "Possessive adjectives",
      explanation:
        "'My' is a possessive adjective (my bus, my bag). 'Me' is an object pronoun and cannot modify a noun.",
      tip: "Possessive adjectives: my, your, his, her, its, our, their.",
      errorSpot: {
        errorWordIndex: 1,
        wrongWord: "me",
        correction: "my",
        reason:
          "'My' is the possessive form. 'Me' is an object pronoun — it cannot describe ownership.",
        correctionOptions: ["the", "my", "this", "a"], // "my" at index 1
      },
    },

    {
      id: "conv-err-6",
      topic: "starting-ending-conversations",
      type: "error-spot",
      difficulty: "intermediate",
      sentence: "Did you listen about the earthquake?",
      // split: Did(0) you(1) listen(2) about(3) the(4) earthquake?(5)
      // error: "listen"(2) → "hear"
      grammarRule: "Verb + preposition collocations",
      explanation:
        "'Hear about' means to receive information about something. 'Listen to' means to pay careful attention to a sound.",
      tip: "'Did you hear about...?' is the natural phrase for sharing news.",
      errorSpot: {
        errorWordIndex: 2,
        wrongWord: "listen",
        correction: "hear",
        reason:
          "'Hear about' = to receive news of something. 'Listen' requires 'to': 'listen to music'.",
        correctionOptions: ["know", "hear", "learn", "talk"], // "hear" at index 1
      },
    },

    // ─── MULTIPLE-CHOICE (6) ─────────────────────────────────────────────────

    {
      id: "conv-mc-1",
      topic: "starting-ending-conversations",
      type: "multiple-choice",
      difficulty: "beginner",
      sentence: "Which response shows you are happy for someone to proceed with something?",
      grammarRule: "Responses giving permission",
      explanation:
        "'Go ahead' means 'yes, you may proceed'. It is used to give someone permission to do something.",
      tip: "'Go ahead', 'Be my guest', and 'Not at all' all give permission, but in slightly different contexts.",
      multipleChoice: {
        question: "Which option is correct?",
        correctOption: "Go ahead.",
        options: ["I've got to go.", "Go ahead.", "By the way.", "How long have you?"],
        optionExplanations: [
          "This means you are leaving, not giving permission.",
          "Correct — 'Go ahead' means 'yes, you may do it'.",
          "This is used to add information to a conversation, not to give permission.",
          "This is an incomplete question, not a response.",
        ],
      },
    },

    {
      id: "conv-mc-2",
      topic: "starting-ending-conversations",
      type: "multiple-choice",
      difficulty: "beginner",
      sentence: "Someone has answered your question. You want to ask the same question back. Which phrase do you use?",
      grammarRule: "Keeping a conversation going",
      explanation:
        "'And you?' is used to return a question to the other person after they have answered yours.",
      tip: "'And you?', 'What about you?', and 'How about you?' all work the same way.",
      multipleChoice: {
        question: "Which phrase is correct?",
        correctOption: "And you?",
        options: ["Be my guest.", "Not at all.", "See you later.", "And you?"],
        optionExplanations: [
          "This gives someone permission to do something.",
          "This means 'I do not mind at all' — a permission phrase.",
          "This is a farewell phrase used when leaving.",
          "Correct — 'And you?' returns the same question back to the other person.",
        ],
      },
    },

    {
      id: "conv-mc-3",
      topic: "starting-ending-conversations",
      type: "multiple-choice",
      difficulty: "beginner",
      sentence: "Which phrase is used to politely give someone permission to do something?",
      grammarRule: "Giving permission politely",
      explanation:
        "'Be my guest' is a polite, slightly formal way to say 'please go ahead — you are welcome to do it'.",
      tip: "'Be my guest' sounds more generous and formal than just 'go ahead'.",
      multipleChoice: {
        question: "Which option is correct?",
        correctOption: "Be my guest.",
        options: ["How was your weekend?", "Be my guest.", "I've got to go.", "Did you hear about it?"],
        optionExplanations: [
          "This is a conversation starter about someone's recent activities.",
          "Correct — 'Be my guest' means 'please, go ahead — you are welcome to'.",
          "This is a farewell phrase used when you need to leave.",
          "This is a conversation starter used to bring up news.",
        ],
      },
    },

    {
      id: "conv-mc-4",
      topic: "starting-ending-conversations",
      type: "multiple-choice",
      difficulty: "intermediate",
      sentence: "Which is the correct tag to complete: 'It's a lovely morning, ___'?",
      grammarRule: "Tag questions",
      explanation:
        "After a positive statement using 'is', the negative tag is 'isn't it?'. The tag uses the same auxiliary verb in negative form.",
      tip: "Positive statement → negative tag. 'It is...' → 'isn't it?'",
      multipleChoice: {
        question: "Which option is correct?",
        correctOption: "isn't it?",
        options: ["is it?", "isn't it?", "doesn't it?", "wasn't it?"],
        optionExplanations: [
          "Wrong — after a positive statement we need a negative tag.",
          "Correct — positive statement + negative tag: 'It's lovely, isn't it?'",
          "Wrong — 'doesn't' is used with present simple verbs (e.g. 'She works here, doesn't she?'), not 'to be'.",
          "Wrong — 'wasn't' is past tense, but 'It's' is present.",
        ],
      },
    },

    {
      id: "conv-mc-5",
      topic: "starting-ending-conversations",
      type: "multiple-choice",
      difficulty: "beginner",
      sentence: "You have just met someone at an event and want to introduce yourself informally. Which phrase fits?",
      grammarRule: "Informal introductions",
      explanation:
        "'I'm [name], by the way' is a natural, casual way to introduce yourself during a conversation.",
      tip: "'By the way' is used to add something casually — including your own name.",
      multipleChoice: {
        question: "Which phrase is correct?",
        correctOption: "I'm Emma, by the way.",
        options: [
          "That's my bus, by the way.",
          "Have fun, by the way.",
          "Go ahead, by the way.",
          "I'm Emma, by the way.",
        ],
        optionExplanations: [
          "This is a farewell used when you need to leave — not an introduction.",
          "This is a farewell phrase — not an introduction.",
          "This gives permission — not an introduction.",
          "Correct — 'I'm [name], by the way' is a natural informal self-introduction.",
        ],
      },
    },

    {
      id: "conv-mc-6",
      topic: "starting-ending-conversations",
      type: "multiple-choice",
      difficulty: "beginner",
      sentence: "Which phrase is used to start a conversation by bringing up recent news or events?",
      grammarRule: "Conversation starters with news",
      explanation:
        "'Did you hear about...?' is used to bring up something newsworthy that you both might know about.",
      tip: "Use 'Did you hear about...?' or 'Did you watch...?' to start a conversation about shared topics.",
      multipleChoice: {
        question: "Which option is correct?",
        correctOption: "Did you hear about the match?",
        options: [
          "See you later.",
          "Did you hear about the match?",
          "Not at all.",
          "Have fun.",
        ],
        optionExplanations: [
          "This is a farewell phrase.",
          "Correct — 'Did you hear about...?' is a classic opener to share or discuss news.",
          "This means 'I do not mind' — a permission response, not a conversation starter.",
          "This is a farewell phrase.",
        ],
      },
    },

    // ─── SENTENCE-REORDER (6) ────────────────────────────────────────────────

    {
      id: "conv-reorder-1",
      topic: "starting-ending-conversations",
      type: "word-transform",
      difficulty: "beginner",
      sentence: "How long ___ you been working here?",
      grammarRule: "Present Perfect question — duration",
      explanation: "'How long have you been...?' asks how much time has passed. Use 'have' with 'you'.",
      tip: "How long + have/has + subject + been + verb-ing? How long have you been working?",
      wordTransform: {
        baseWord: "have/has",
        correctAnswer: "have",
      },
    },

    {
      id: "conv-reorder-2",
      topic: "starting-ending-conversations",
      type: "word-transform",
      difficulty: "beginner",
      sentence: "___ you hear about the new coffee shop?",
      grammarRule: "Past Simple question — asking about news",
      explanation: "'Did you hear about...?' asks if someone received information in the past. Use 'Did' for past simple questions.",
      tip: "Did you hear about...? = past simple question. Use 'did' for all subjects.",
      wordTransform: {
        baseWord: "Did/Have",
        correctAnswer: "Did",
      },
    },

    {
      id: "conv-reorder-3",
      topic: "starting-ending-conversations",
      type: "word-transform",
      difficulty: "beginner",
      sentence: "How ___ your weekend?",
      grammarRule: "Past Simple with 'be': How was/were...?",
      explanation: "'How was your weekend?' uses the past simple of 'be'. 'Weekend' is singular → 'was'.",
      tip: "How was your + singular noun? How were your + plural noun?",
      wordTransform: {
        baseWord: "was/were",
        correctAnswer: "was",
      },
    },

    {
      id: "conv-reorder-4",
      topic: "starting-ending-conversations",
      type: "word-transform",
      difficulty: "intermediate",
      sentence: "___ you doing anything special tonight?",
      grammarRule: "Present Continuous question — asking about plans",
      explanation: "'Are you doing...?' is a Present Continuous question used to ask about plans. Use 'Are' with 'you'.",
      tip: "Are you + -ing? Are you doing/going/coming? Use Present Continuous for future plans.",
      wordTransform: {
        baseWord: "Are/Were",
        correctAnswer: "Are",
      },
    },

    {
      id: "conv-reorder-5",
      topic: "starting-ending-conversations",
      type: "word-transform",
      difficulty: "intermediate",
      sentence: "I'm afraid I ___ to go now.",
      grammarRule: "'have to' for obligation — leaving a conversation",
      explanation: "'I have to go' expresses obligation or necessity. 'I'm afraid I have to go' is a polite farewell.",
      tip: "Have to = must/need to. I have to go, I have to leave, I have to run.",
      wordTransform: {
        baseWord: "have/had",
        correctAnswer: "have",
      },
    },

    {
      id: "conv-reorder-6",
      topic: "starting-ending-conversations",
      type: "word-transform",
      difficulty: "intermediate",
      sentence: "It was lovely ___ you.",
      grammarRule: "Adjective + -ing form as object",
      explanation: "'Lovely meeting you' = the act of meeting was lovely. After 'lovely/nice/great', use the -ing form.",
      tip: "It was lovely/nice/great + meeting/seeing/talking to + object.",
      wordTransform: {
        baseWord: "meet",
        correctAnswer: "meeting",
      },
    },

    // ─── SENTENCE-MATCH (2 demo) ─────────────────────────────────────────────

    {
      id: "conv-match-1",
      topic: "starting-ending-conversations",
      type: "sentence-match",
      difficulty: "beginner",
      sentence: "Match each conversation opener to its correct ending.",
      grammarRule: "Conversation openers",
      explanation:
        "These are fixed phrases used to start a conversation. Each beginning has only one natural, correct ending.",
      tip: "Pay attention to grammar and the type of question each beginning sets up.",
      sentenceMatch: {
        pairs: [
          { beginning: "It's a lovely day,",           ending: "isn't it?" },
          { beginning: "Did you hear about",            ending: "the accident?" },
          { beginning: "Are you doing anything nice",   ending: "at the weekend?" },
          { beginning: "How long have you",             ending: "worked here?" },
        ],
      },
    },

    {
      id: "conv-match-2",
      topic: "starting-ending-conversations",
      type: "sentence-match",
      difficulty: "beginner",
      sentence: "Match each farewell phrase to its correct ending.",
      grammarRule: "Farewell and closing phrases",
      explanation:
        "These are fixed farewell expressions used to end a conversation. Each phrase has one standard, correct completion.",
      tip: "'See you later', 'Have a good time', 'Great talking to you' and 'I'm [name], by the way' are all fixed phrases.",
      sentenceMatch: {
        pairs: [
          { beginning: "See you",        ending: "later." },
          { beginning: "Have a good",    ending: "time!" },
          { beginning: "Great talking",  ending: "to you." },
          { beginning: "I'm David,",     ending: "by the way." },
        ],
      },
    },
  ],
};
