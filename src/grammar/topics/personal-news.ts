import type { GrammarTopic } from "../types.ts";

// Unit 5C — How to... give and respond to personal news
// 27 questions: 6 gap-fill, 6 error-spot, 7 multiple-choice, 6 word-transform, 2 sentence-match

export const personalNewsTopic: GrammarTopic = {
  id: "personal-news",
  level: "B1",
  name: "Giving & Responding to News",
  description:
    "Practise the phrases for giving good and bad personal news, and responding to other people's news in English.",
  lesson: "Unit 5C",
  icon: "📢",
  cards: [
    {
      id: "news-card-1",
      rule: "Guess what! (giving good news)",
      example: "___ what! I've just been offered a new job!",
      answer: "Guess",
      explanation: "Guess what! is a fixed phrase used to get someone's attention before sharing exciting news. It always introduces good news, never bad.",
      examples: ["Guess what! My sister just had a baby boy.", "Guess what! We won the quiz last night."],
      ua: "«Вгадай що!» — фраза, щоб почати гарну новину: Guess what!",
    },
    {
      id: "news-card-2",
      rule: "Bad news, I'm afraid (giving bad news)",
      example: "Bad news, I'm ___ — the match was cancelled.",
      answer: "afraid",
      explanation: "We use I'm afraid to softly introduce our own bad news. I'm sorry is for responding to someone else's bad news, not for announcing your own.",
      examples: ["Bad news, I'm afraid - the shop is closed today.", "I'm afraid the meeting has been moved."],
      ua: "Повідомляємо погану новину — I'm afraid, не I'm sorry (те для відповіді).",
    },
    {
      id: "news-card-3",
      rule: "You won't believe this, but... (good or bad news)",
      example: "You won't believe ___, but Tom's getting married!",
      answer: "this",
      explanation: "This fixed phrase can introduce either good or bad news. It builds a little suspense before the main point.",
      examples: ["You won't believe this, but I lost my phone again.", "You won't believe this, but we won the lottery!"],
      ua: "«Ти не повіриш, але...» підходить і для гарних, і для поганих новин.",
    },
    {
      id: "news-card-4",
      rule: "pleased to tell you (giving good news formally)",
      example: "We're really ___ (please) to tell you that you got the scholarship.",
      answer: "pleased",
      explanation: "Pleased to tell you... introduces good news warmly or formally. Pleased is an adjective here, describing how the speaker feels.",
      examples: ["I'm pleased to tell you the results were excellent.", "We're pleased to tell you your order has arrived."],
      ua: "«Радий повідомити» — I'm pleased to tell you... (pleased — прикметник).",
    },
    {
      id: "news-card-5",
      rule: "Congratulations! (celebrating good news)",
      example: "She just got engaged - ___!",
      answer: "Congratulations",
      explanation: "Congratulations celebrates any happy event, such as an engagement, a baby or a birthday. Well done! is specifically for something a person worked hard to achieve, like passing a test.",
      examples: ["Congratulations on your new house!", "Well done on finishing the marathon!"],
      ua: "Congratulations — для будь-якої приємної події; Well done — за досягнення.",
    },
    {
      id: "news-card-6",
      rule: "pleased for you (preposition for)",
      example: "I just heard your good news. I'm so pleased ___ you.",
      answer: "for",
      explanation: "Pleased for someone means happy because of their good fortune. The preposition is always for, never with or about.",
      examples: ["I'm so pleased for you - you deserve it!", "We're really pleased for Anna and her new job."],
      ua: "«Я радий за тебе» — pleased for you (завжди for).",
    },
    {
      id: "news-card-7",
      rule: "What a shame (responding to bad news)",
      example: "What a ___! I'm sorry you didn't get the part in the play.",
      answer: "shame",
      explanation: "What a shame and I'm sorry to hear that both respond sympathetically to bad news. Shame here means disappointment, not embarrassment.",
      examples: ["What a shame you missed the party!", "I'm sorry to hear that your flight was cancelled."],
      ua: "«Як шкода» — What a shame (shame тут = прикрість, не сором).",
    },
    {
      id: "news-card-8",
      rule: "get married (adjective, not the noun marriage)",
      example: "My uncle is getting ___ (marry) in the autumn.",
      answer: "married",
      explanation: "Married is the adjective used after get and be. Marriage is a noun and cannot follow getting directly.",
      examples: ["My cousin got engaged last weekend.", "They got married in a small church."],
      ua: "Після get — married (прикметник), не marriage (іменник).",
    },
    {
      id: "news-card-9",
      rule: "pass an exam/test (not win)",
      example: "It took him three tries, but he finally ___ (pass) his theory exam.",
      answer: "passed",
      explanation: "We pass or fail exams and tests. Win is only used for competitions, matches or prizes - never for exams.",
      examples: ["She passed all her university exams.", "He failed the test twice before passing."],
      ua: "Іспити/тести — pass або fail, а не win (win лише для змагань).",
    },
    {
      id: "news-card-10",
      rule: "have a baby (fixed collocation)",
      example: "My best friend ___ (have) twins in March, and I can't wait to meet them!",
      answer: "had",
      explanation: "Have a baby is the fixed phrase for giving birth. We don't say make or get a baby.",
      examples: ["They had a baby girl in the spring.", "My neighbours just had twins!"],
      ua: "«Народити дитину» — have a baby (не make чи get).",
    },
  ],
  rules: [
    // ─── GAP-FILL (6) ────────────────────────────────────────────────────────

    {
      id: "news-gap-1",
      topic: "personal-news",
      type: "gap-fill",
      difficulty: "beginner",
      sentence: "___ what! I passed my driving test first time!",
      // split: ___(0) what!(1) I(2) passed(3) my(4) driving(5) test(6) first(7) time!(8)
      grammarRule: "Giving good news — Guess what!",
      explanation:
        "'Guess what!' is a fixed phrase used to grab someone's attention before sharing exciting news.",
      tip: "Guess what! always comes before good news, never bad news.",
      gapFill: {
        gapIndex: 0,
        correctAnswer: "Guess",
        options: ["Guess", "Know", "See", "Hear"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "news-gap-2",
      topic: "personal-news",
      type: "gap-fill",
      difficulty: "beginner",
      sentence: "Bad news, I'm ___. The flight's been delayed.",
      // split: Bad(0) news,(1) I'm(2) ___.(3) The(4) flight's(5) been(6) delayed.(7)
      grammarRule: "Giving bad news — I'm afraid",
      explanation:
        "'I'm afraid' softens bad news you are telling someone. 'I'm sorry' is used to respond to someone else's bad news, not to introduce your own.",
      tip: "Giving bad news: I'm afraid. Responding to bad news: I'm sorry.",
      gapFill: {
        gapIndex: 3,
        correctAnswer: "afraid",
        options: ["afraid", "sorry", "shame", "worried"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "news-gap-3",
      topic: "personal-news",
      type: "gap-fill",
      difficulty: "intermediate",
      sentence: "You won't believe ___, but Maria got engaged yesterday!",
      // split: You(0) won't(1) believe(2) ___,(3) but(4) Maria(5) got(6) engaged(7) yesterday!(8)
      grammarRule: "Giving good or bad news — You won't believe this",
      explanation:
        "'You won't believe this, but...' can introduce either good or bad news. It builds suspense before the main point.",
      tip: "This phrase works for both good and bad news — the 'but' leads into either.",
      gapFill: {
        gapIndex: 3,
        correctAnswer: "this",
        options: ["this", "that", "it", "so"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "news-gap-4",
      topic: "personal-news",
      type: "gap-fill",
      difficulty: "intermediate",
      sentence: "My brother ___ a new job, so he's moving to London next month.",
      // split: My(0) brother(1) ___(2) a(3) new(4) job,(5) so(6) he's(7) moving(8) to(9) London(10) next(11) month.(12)
      grammarRule: "Events and occasions — get a new job",
      explanation:
        "'Get a new job' is the fixed collocation for starting work somewhere new. 'Got' is the past simple of 'get'.",
      tip: "Get a new job, get promoted, get engaged — all use 'get', not 'make' or 'do'.",
      gapFill: {
        gapIndex: 2,
        correctAnswer: "got",
        options: ["got", "made", "did", "had"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "news-gap-5",
      topic: "personal-news",
      type: "gap-fill",
      difficulty: "intermediate",
      sentence: "Wow, congratulations! I'm so pleased ___ you.",
      // split: Wow,(0) congratulations!(1) I'm(2) so(3) pleased(4) ___(5) you.(6)
      grammarRule: "Responding to good news — pleased for you",
      explanation:
        "'Pleased for you' always uses the preposition 'for', showing you are happy because of someone else's good fortune.",
      tip: "I'm pleased/happy for you — always 'for', never 'with' or 'about'.",
      gapFill: {
        gapIndex: 5,
        correctAnswer: "for",
        options: ["for", "with", "to", "about"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "news-gap-6",
      topic: "personal-news",
      type: "gap-fill",
      difficulty: "intermediate",
      sentence: "What a ___! I'm really sorry you lost the match.",
      // split: What(0) a(1) ___!(2) I'm(3) really(4) sorry(5) you(6) lost(7) the(8) match.(9)
      grammarRule: "Responding to bad news — What a shame",
      explanation:
        "'What a shame' is a fixed sympathetic response to disappointing news. 'Shame' here means a pity, not embarrassment.",
      tip: "What a shame! = That's a pity! Use it to show sympathy.",
      gapFill: {
        gapIndex: 2,
        correctAnswer: "shame",
        options: ["shame", "pity", "sad", "sorry"],
        correctOptionIndex: 0,
      },
    },

    // ─── ERROR-SPOT (6) ──────────────────────────────────────────────────────

    {
      id: "news-error-1",
      topic: "personal-news",
      type: "error-spot",
      difficulty: "beginner",
      sentence: "Guess that! I finally passed my driving test.",
      // split: Guess(0) that!(1) I(2) finally(3) passed(4) my(5) driving(6) test.(7)
      // words[1]="that!" → stripped "that" ✅  corrected: "Guess what! I finally passed my driving test." ✅
      grammarRule: "Giving good news — Guess what!",
      explanation:
        "'Guess what!' is the fixed phrase used to introduce exciting news. 'Guess that' is not a real expression.",
      tip: "Always 'Guess what!', never 'Guess that' or 'Guess this'.",
      errorSpot: {
        errorWordIndex: 1,
        wrongWord: "that",
        correction: "what",
        reason: "'Guess what!' is the fixed phrase. 'Guess that' is not a real expression.",
        correctionOptions: ["this", "what", "so", "it"],
      },
    },

    {
      id: "news-error-2",
      topic: "personal-news",
      type: "error-spot",
      difficulty: "beginner",
      sentence: "I've got some good news for tell you: I'm moving to Spain.",
      // split: I've(0) got(1) some(2) good(3) news(4) for(5) tell(6) you:(7) I'm(8) moving(9) to(10) Spain.(11)
      // words[5]="for" ✅  corrected: "I've got some good news to tell you: I'm moving to Spain." ✅
      grammarRule: "Giving good news — news to tell you",
      explanation:
        "'Good news to tell you' needs the infinitive 'to', not 'for'. The fixed phrase is 'I've got some news to tell you'.",
      tip: "News to tell you — infinitive 'to', not 'for'.",
      errorSpot: {
        errorWordIndex: 5,
        wrongWord: "for",
        correction: "to",
        reason: "The fixed phrase uses the infinitive 'to tell you', not 'for tell you'.",
        correctionOptions: ["for", "to", "at", "with"],
      },
    },

    {
      id: "news-error-3",
      topic: "personal-news",
      type: "error-spot",
      difficulty: "intermediate",
      sentence: "Bad news, I'm sorry. I lost my phone again.",
      // split: Bad(0) news,(1) I'm(2) sorry.(3) I(4) lost(5) my(6) phone(7) again.(8)
      // words[3]="sorry." → stripped "sorry" ✅  corrected: "Bad news, I'm afraid. I lost my phone again." ✅
      grammarRule: "Giving bad news — I'm afraid",
      explanation:
        "When you are the one giving bad news, say 'I'm afraid'. 'I'm sorry' is for responding to someone else's bad news.",
      tip: "Giving your own bad news: I'm afraid. Not I'm sorry.",
      errorSpot: {
        errorWordIndex: 3,
        wrongWord: "sorry",
        correction: "afraid",
        reason: "To introduce your own bad news, use 'I'm afraid', not 'I'm sorry'.",
        correctionOptions: ["sorry", "afraid", "sad", "worried"],
      },
    },

    {
      id: "news-error-4",
      topic: "personal-news",
      type: "error-spot",
      difficulty: "intermediate",
      sentence: "I'm so relieved - I finally won my driving test this time!",
      // split: I'm(0) so(1) relieved(2) -(3) I(4) finally(5) won(6) my(7) driving(8) test(9) this(10) time!(11)
      // words[6]="won" ✅  corrected: "I'm so relieved - I finally passed my driving test this time!" ✅
      grammarRule: "Events and occasions — pass a test (not win)",
      explanation:
        "We pass or fail exams and tests. 'Win' is only used for competitions, matches or prizes.",
      tip: "Pass/fail a test; win a competition or match — don't mix them up.",
      errorSpot: {
        errorWordIndex: 6,
        wrongWord: "won",
        correction: "passed",
        reason: "We pass or fail tests and exams. 'Win' is only for competitions and matches.",
        correctionOptions: ["won", "passed", "beat", "took"],
      },
    },

    {
      id: "news-error-5",
      topic: "personal-news",
      type: "error-spot",
      difficulty: "intermediate",
      sentence: "My sister made a baby last month, so now I'm an uncle.",
      // split: My(0) sister(1) made(2) a(3) baby(4) last(5) month,(6) so(7) now(8) I'm(9) an(10) uncle.(11)
      // words[2]="made" ✅  corrected: "My sister had a baby last month, so now I'm an uncle." ✅
      grammarRule: "Events and occasions — have a baby",
      explanation:
        "'Have a baby' is the fixed phrase for giving birth. We don't say 'make a baby' in this context.",
      tip: "Have a baby, not make a baby.",
      errorSpot: {
        errorWordIndex: 2,
        wrongWord: "made",
        correction: "had",
        reason: "The fixed phrase for giving birth is 'have a baby', not 'make a baby'.",
        correctionOptions: ["made", "had", "did", "got"],
      },
    },

    {
      id: "news-error-6",
      topic: "personal-news",
      type: "error-spot",
      difficulty: "advanced",
      sentence: "My cousin's getting marriage next summer - she's so excited!",
      // split: My(0) cousin's(1) getting(2) marriage(3) next(4) summer(5) -(6) she's(7) so(8) excited!(9)
      // words[3]="marriage" ✅  corrected: "My cousin's getting married next summer - she's so excited!" ✅
      grammarRule: "Events and occasions — get married",
      explanation:
        "'Married' is the adjective used after 'get' and 'be'. 'Marriage' is a noun and cannot follow 'getting' directly.",
      tip: "Get married (adjective), not get marriage (noun).",
      errorSpot: {
        errorWordIndex: 3,
        wrongWord: "marriage",
        correction: "married",
        reason: "'Married' is the adjective needed after 'getting'. 'Marriage' is a noun.",
        correctionOptions: ["marriage", "married", "marry", "marrying"],
      },
    },

    // ─── MULTIPLE-CHOICE (7) ─────────────────────────────────────────────────

    {
      id: "news-mc-1",
      topic: "personal-news",
      type: "multiple-choice",
      difficulty: "beginner",
      sentence: "A friend just told you: 'I passed my driving test!' Which is the best response?",
      grammarRule: "Responding to good news",
      explanation:
        "'Congratulations! Well done!' celebrates good news and the effort behind it — the natural response to someone's achievement.",
      tip: "Congratulations! / Well done! — the classic pair of responses to good news.",
      multipleChoice: {
        question: "Which response is best?",
        correctOption: "Congratulations! Well done!",
        options: [
          "Congratulations! Well done!",
          "What a shame, I'm sorry.",
          "Never mind, it's fine.",
          "I'm really sorry to hear that.",
        ],
        optionExplanations: {
          "Congratulations! Well done!": "Correct — this celebrates good news and the effort behind it.",
          "What a shame, I'm sorry.": "Wrong — this responds to bad news, not good news.",
          "Never mind, it's fine.": "Wrong — this accepts an apology, it doesn't celebrate news.",
          "I'm really sorry to hear that.": "Wrong — this is a sympathetic response to bad news.",
        },
      },
    },

    {
      id: "news-mc-2",
      topic: "personal-news",
      type: "multiple-choice",
      difficulty: "beginner",
      sentence: "You want to introduce some exciting news to a friend. Which phrase fits best?",
      grammarRule: "Giving good news — Guess what!",
      explanation:
        "'Guess what!' followed by 'I've got some amazing news' is the natural way to introduce exciting news to a friend.",
      tip: "Guess what! + news statement = classic opener for good news.",
      multipleChoice: {
        question: "Which phrase is correct?",
        correctOption: "Guess what! I've got some amazing news.",
        options: [
          "Guess what! I've got some amazing news.",
          "That's terrible news.",
          "I'm so sorry to hear that.",
          "Never mind, it's fine.",
        ],
        optionExplanations: {
          "Guess what! I've got some amazing news.": "Correct — this is a natural opener for exciting news.",
          "That's terrible news.": "Wrong — this responds to bad news, it doesn't introduce news.",
          "I'm so sorry to hear that.": "Wrong — this is a sympathetic response, not an opener.",
          "Never mind, it's fine.": "Wrong — this accepts an apology, not an opener for news.",
        },
      },
    },

    {
      id: "news-mc-3",
      topic: "personal-news",
      type: "multiple-choice",
      difficulty: "intermediate",
      sentence: "You need to tell a colleague something disappointing. Which phrase introduces it best?",
      grammarRule: "Giving bad news — I'm afraid",
      explanation:
        "'Bad news, I'm afraid' warns the listener that disappointing news is coming, in a gentle way.",
      tip: "Bad news, I'm afraid — a soft way to introduce bad news.",
      multipleChoice: {
        question: "Which phrase is correct?",
        correctOption: "Bad news, I'm afraid.",
        options: [
          "Bad news, I'm afraid.",
          "Guess what!",
          "I'm so pleased for you.",
          "Well done!",
        ],
        optionExplanations: {
          "Bad news, I'm afraid.": "Correct — this gently introduces disappointing news.",
          "Guess what!": "Wrong — this introduces good news, not bad news.",
          "I'm so pleased for you.": "Wrong — this responds to someone else's good news.",
          "Well done!": "Wrong — this celebrates an achievement, not bad news.",
        },
      },
    },

    {
      id: "news-mc-4",
      topic: "personal-news",
      type: "multiple-choice",
      difficulty: "intermediate",
      sentence: "A colleague says: 'I'm so sorry, I failed my exam again.' Which response fits best?",
      grammarRule: "Responding to bad news",
      explanation:
        "'What a shame. I'm really sorry to hear that' shows sympathy for someone else's disappointing news.",
      tip: "What a shame / I'm sorry to hear that — sympathetic responses to bad news.",
      multipleChoice: {
        question: "Which response is best?",
        correctOption: "What a shame. I'm really sorry to hear that.",
        options: [
          "What a shame. I'm really sorry to hear that.",
          "That's amazing! Congratulations!",
          "I'm so pleased for you.",
          "Well done!",
        ],
        optionExplanations: {
          "What a shame. I'm really sorry to hear that.": "Correct — this shows sympathy for disappointing news.",
          "That's amazing! Congratulations!": "Wrong — this celebrates good news, not bad news.",
          "I'm so pleased for you.": "Wrong — this responds to good news, not failure.",
          "Well done!": "Wrong — this celebrates an achievement, not a failure.",
        },
      },
    },

    {
      id: "news-mc-5",
      topic: "personal-news",
      type: "multiple-choice",
      difficulty: "intermediate",
      sentence:
        "Tom asked for more responsibility, and his boss gave him a higher position at the same company. Which sentence describes this correctly?",
      grammarRule: "Events and occasions — get promoted vs get a new job",
      explanation:
        "'Get promoted' means moving to a higher position at the same company. 'Get a new job' usually means starting work somewhere different.",
      tip: "Promoted = higher role, same company. New job = different job.",
      multipleChoice: {
        question: "Which option is correct?",
        correctOption: "He got promoted.",
        options: [
          "He got promoted.",
          "He got a new job.",
          "He won a competition.",
          "He graduated.",
        ],
        optionExplanations: {
          "He got promoted.": "Correct — a higher position at the same company is a promotion.",
          "He got a new job.": "Wrong — he stayed at the same company, so it isn't a new job.",
          "He won a competition.": "Wrong — nothing here is a competition.",
          "He graduated.": "Wrong — graduation is for finishing a course of study.",
        },
      },
    },

    {
      id: "news-mc-6",
      topic: "personal-news",
      type: "multiple-choice",
      difficulty: "intermediate",
      sentence: "You're not sure if your friend will think your news is good or bad. Which opener fits best?",
      grammarRule: "Giving good or bad news — You won't believe this",
      explanation:
        "'You won't believe this, but...' works for news that could be surprising in either direction, good or bad.",
      tip: "Use this opener when you're not sure how the news will be received.",
      multipleChoice: {
        question: "Which phrase is correct?",
        correctOption: "You won't believe this, but...",
        options: [
          "You won't believe this, but...",
          "I'm really pleased to tell you...",
          "Well done!",
          "What a shame.",
        ],
        optionExplanations: {
          "You won't believe this, but...": "Correct — this opener suits news that could go either way.",
          "I'm really pleased to tell you...": "Wrong — this only introduces good news.",
          "Well done!": "Wrong — this is a response to good news, not an opener.",
          "What a shame.": "Wrong — this is a response to bad news, not an opener.",
        },
      },
    },

    {
      id: "news-mc-7",
      topic: "personal-news",
      type: "multiple-choice",
      difficulty: "advanced",
      sentence: "A friend tells you their grandmother is in hospital. Which is the correct sympathetic response?",
      grammarRule: "Responding to bad news vs apologising",
      explanation:
        "'I'm sorry to hear that' shows sympathy for someone else's bad news. 'I'm sorry I'm late' and 'I apologise for...' are apologies for your own mistakes, not sympathy for someone else's news.",
      tip: "Sympathy for their news: I'm sorry to hear that. Apology for your own fault: I'm sorry I...",
      multipleChoice: {
        question: "Which option is correct?",
        correctOption: "I'm so sorry to hear that.",
        options: [
          "I'm so sorry to hear that.",
          "I'm sorry I'm late.",
          "Sorry to bother you.",
          "I apologise for the mistake.",
        ],
        optionExplanations: {
          "I'm so sorry to hear that.": "Correct — this shows sympathy for someone else's bad news.",
          "I'm sorry I'm late.": "Wrong — this apologises for your own lateness, not sympathy for their news.",
          "Sorry to bother you.": "Wrong — this apologises for interrupting someone, not sympathy.",
          "I apologise for the mistake.": "Wrong — this apologises for your own error, not sympathy for their news.",
        },
      },
    },

    // ─── WORD-TRANSFORM (6) ──────────────────────────────────────────────────

    {
      id: "news-wt-1",
      topic: "personal-news",
      type: "word-transform",
      difficulty: "beginner",
      sentence: "He felt so proud when he finally ___ (pass) his driving test last week.",
      grammarRule: "Past Simple — pass a test",
      explanation: "'Passed' is the regular past simple form of 'pass'. We pass or fail exams and tests.",
      tip: "Pass → passed (regular -ed past simple).",
      wordTransform: {
        baseWord: "pass",
        correctAnswer: "passed",
      },
    },

    {
      id: "news-wt-2",
      topic: "personal-news",
      type: "word-transform",
      difficulty: "beginner",
      sentence: "I'm so excited - I've just ___ (win) two tickets to the festival!",
      grammarRule: "Present Perfect — win (irregular past participle)",
      explanation: "'Won' is the irregular past participle of 'win', used after 'have/has' in the present perfect.",
      tip: "Win → won (irregular past participle), not 'winned'.",
      wordTransform: {
        baseWord: "win",
        correctAnswer: "won",
      },
    },

    {
      id: "news-wt-3",
      topic: "personal-news",
      type: "word-transform",
      difficulty: "intermediate",
      sentence: "My sister ___ (have) a baby next spring - she's due in April.",
      grammarRule: "Present Continuous for future arrangements — have a baby",
      explanation:
        "To talk about a planned future event like an expected birth, use the present continuous: is/are + having.",
      tip: "Present continuous for fixed future plans: She is having a baby in April.",
      wordTransform: {
        baseWord: "have",
        correctAnswer: "is having",
      },
    },

    {
      id: "news-wt-4",
      topic: "personal-news",
      type: "word-transform",
      difficulty: "intermediate",
      sentence: "My neighbours got ___ (engage) last weekend after years together.",
      grammarRule: "Past participle as adjective — get engaged",
      explanation:
        "'Engaged' is the past participle used as an adjective after 'get'. It describes the state of having agreed to marry.",
      tip: "Get engaged, get married — 'get' + past participle adjective.",
      wordTransform: {
        baseWord: "engage",
        correctAnswer: "engaged",
      },
    },

    {
      id: "news-wt-5",
      topic: "personal-news",
      type: "word-transform",
      difficulty: "intermediate",
      sentence: "I've just ___ (lose) my job, so I'm updating my CV tonight.",
      grammarRule: "Present Perfect — lose (irregular past participle)",
      explanation:
        "'Lost' is the irregular past participle of 'lose', used after 'have/has' for a recent event with present relevance.",
      tip: "Lose → lost (irregular). I've lost my job.",
      wordTransform: {
        baseWord: "lose",
        correctAnswer: "lost",
      },
    },

    {
      id: "news-wt-6",
      topic: "personal-news",
      type: "word-transform",
      difficulty: "advanced",
      sentence: "We're all really ___ (excite) about Maria's new baby.",
      grammarRule: "Adjective -ed form — excited",
      explanation:
        "'Excited' is the -ed adjective describing how people feel. Use it after 'be/feel', not the -ing form, which describes the thing causing the feeling.",
      tip: "Excited (how you feel) vs exciting (what causes the feeling).",
      wordTransform: {
        baseWord: "excite",
        correctAnswer: "excited",
      },
    },

    // ─── SENTENCE-MATCH (2) ──────────────────────────────────────────────────

    {
      id: "news-match-1",
      topic: "personal-news",
      type: "sentence-match",
      difficulty: "beginner",
      sentence: "Match each way of giving news to its correct ending.",
      grammarRule: "Giving good and bad news — fixed phrases",
      explanation:
        "These are fixed phrases used to introduce good or bad news. Each beginning has only one natural, correct ending.",
      tip: "Learn these openers as whole chunks, not word by word.",
      sentenceMatch: {
        pairs: [
          { beginning: "Guess", ending: "what!" },
          { beginning: "I've got some good news", ending: "to tell you." },
          { beginning: "Bad news,", ending: "I'm afraid." },
          { beginning: "You won't believe", ending: "this, but..." },
        ],
      },
    },

    {
      id: "news-match-2",
      topic: "personal-news",
      type: "sentence-match",
      difficulty: "beginner",
      sentence: "Match each response to news to its correct ending.",
      grammarRule: "Responding to good and bad news — fixed phrases",
      explanation:
        "These are fixed phrases used to respond to someone else's news. Each beginning has only one standard, correct ending.",
      tip: "'I'm so pleased for you', 'That's wonderful news!', 'What a shame' and 'I'm really sorry to hear that' are all fixed phrases.",
      sentenceMatch: {
        pairs: [
          { beginning: "I'm so pleased", ending: "for you." },
          { beginning: "That's wonderful", ending: "news!" },
          { beginning: "What a", ending: "shame." },
          { beginning: "I'm really sorry", ending: "to hear that." },
        ],
      },
    },
  ],
};
