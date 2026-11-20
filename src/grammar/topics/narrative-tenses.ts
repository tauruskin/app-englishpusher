import type { GrammarTopic } from "../types.ts";

/**
 * Narrative Tenses — Past Simple, Past Continuous, Past Perfect
 * Covers:
 *   - Past Simple: completed actions/states in the past
 *   - Past Continuous: background actions, interrupted actions (when/while/as)
 *   - Past Perfect: earlier past action (had + past participle)
 *   - Contrast and combination of all three in storytelling
 */
export const narrativeTensesTopic: GrammarTopic = {
  id: "narrative-tenses",
  level: "B1",
  name: "Narrative Tenses",
  description:
    "Practise Past Simple, Past Continuous, and Past Perfect — the three tenses used to tell stories in English.",
  icon: "📖",
  cards: [
    {
      id: "nt-card-1",
      rule: "Past Simple for finished events in order",
      example: "Last Friday we ___ (arrive) at the hotel at nine and went straight to bed.",
      answer: "arrived",
      explanation:
        "Use Past Simple for finished actions in the past. When we tell events one after another, each verb is Past Simple.",
      examples: [
        "She opened the window, took a deep breath and started to work.",
        "Our flight landed at noon, and we took a taxi to the city centre.",
      ],
      ua: "Завершені дії в минулому, одна за одною: приїхали, пішли спати. Правильні дієслова мають -ed.",
    },
    {
      id: "nt-card-2",
      rule: "did / didn't + base verb",
      example: "We didn't ___ (go) out last night because it was raining.",
      answer: "go",
      explanation:
        "After did or didn't, the main verb goes back to the base form. The past is already shown by did.",
      examples: [
        "I didn't sleep well last night because of the noise.",
        "Did you enjoy the concert on Saturday?",
      ],
      ua: "Після did/didn't дієслово в початковій формі: didn't go, а не «didn't went».",
    },
    {
      id: "nt-card-3",
      rule: "was/were + -ing for what was in progress",
      example: "At nine o'clock last night, my parents ___ (watch) the news on TV.",
      answer: "were watching",
      explanation:
        "Use Past Continuous to say what was happening at a certain moment in the past. The action was not finished at that moment.",
      examples: [
        "At eight o'clock this morning, I was waiting for the bus in the rain.",
        "At midnight, the neighbours were still talking on the balcony.",
      ],
      ua: "Past Continuous — «що відбувалося в той момент»: о дев'ятій вони дивилися — were watching.",
    },
    {
      id: "nt-card-4",
      rule: "was + -ing, when + Past Simple (interrupted action)",
      example: "We ___ (drive) to the airport when the car broke down.",
      answer: "were driving",
      explanation:
        "A long action in progress uses Past Continuous. A short event that interrupted it uses Past Simple, often after when.",
      examples: [
        "I was crossing the street when I saw an old friend.",
        "She was paying at the till when her card stopped working.",
      ],
      ua: "Довга дія — were driving, коротка подія, що її перервала, — Past Simple: «їхали, коли зламалася».",
    },
    {
      id: "nt-card-5",
      rule: "while + Past Continuous (two actions at the same time)",
      example: "While the mechanic ___ (check) the engine, I was reading in the waiting room.",
      answer: "was checking",
      explanation:
        "Use while with Past Continuous for actions that went on at the same time. Both actions were in progress together.",
      examples: [
        "While we were having lunch, the children were playing in the garden.",
        "My colleague was typing a report while I was answering emails.",
      ],
      ua: "while + Past Continuous: дві дії тривали одночасно — «поки механік перевіряв, я читала».",
    },
    {
      id: "nt-card-6",
      rule: "had + past participle for the earlier past action",
      example: "When I opened the fridge, someone ___ (already/eat) all the cheese.",
      answer: "had already eaten",
      explanation:
        "Past Perfect shows that one past action happened before another past action. The earlier action is had + past participle.",
      examples: [
        "By the time we found the café, it had already closed.",
        "When she called him, he had already left the office.",
      ],
      ua: "Past Perfect (had + V3) — дія, що сталася раніше за іншу минулу: «відкрив, а сир уже з'їли».",
    },
    {
      id: "nt-card-7",
      rule: "found out / discovered + Past Perfect",
      example: "I called the hotel and found out that they ___ (lose) my booking the day before.",
      answer: "had lost",
      explanation:
        "After verbs like find out, discover and realise, use Past Perfect for the thing that happened earlier. First it happened, later you learned about it.",
      examples: [
        "We found out that our neighbours had moved to Poland the year before.",
        "He discovered that someone had borrowed his car without asking.",
      ],
      ua: "found out / discovered + had + V3: дізналися пізніше, а подія сталася раніше (the day before).",
    },
    {
      id: "nt-card-8",
      rule: "had never + past participle (before that moment)",
      example: "We were surprised, because we ___ (never/see) snow before that day.",
      answer: "had never seen",
      explanation:
        "Use had never + past participle for an experience you did not have before a certain moment in the past. It is the past version of have never.",
      examples: [
        "I had never flown before that trip, so I was very nervous.",
        "She had never met his parents until that weekend.",
      ],
      ua: "had never + V3: «ніколи раніше не бачили» — досвід до певного моменту в минулому.",
    },
  ],
  rules: [

    // ─── GAP-FILL (7) ────────────────────────────────────────────────────────

    {
      id: "nt-gap-1",
      topic: "narrative-tenses",
      type: "gap-fill",
      difficulty: "beginner",
      sentence: "I ___ university in 2015 and started my first job.",
      grammarRule: "Past Simple — completed action in the past",
      explanation:
        "We use Past Simple for completed actions in the past, especially with a specific time (in 2015). 'Left' is the Past Simple form of 'leave'.",
      tip: "Past Simple answers the question: What happened? When did it happen?",
      gapFill: {
        gapIndex: 1,
        correctAnswer: "left",
        options: ["left", "leave", "was leaving", "had left"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "nt-gap-2",
      topic: "narrative-tenses",
      type: "gap-fill",
      difficulty: "beginner",
      sentence: "She ___ a book when the phone rang.",
      grammarRule: "Past Continuous — action interrupted by Past Simple",
      explanation:
        "The longer background action (reading) uses Past Continuous. The short interrupting action (rang) uses Past Simple. Structure: was/were + -ing.",
      tip: "When = interruption. The action in 'when' clause uses Past Simple; the longer action uses Past Continuous.",
      gapFill: {
        gapIndex: 1,
        correctAnswer: "was reading",
        options: ["was reading", "read", "reads", "had read"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "nt-gap-3",
      topic: "narrative-tenses",
      type: "gap-fill",
      difficulty: "beginner",
      sentence: "They ___ dinner when we arrived at the restaurant.",
      grammarRule: "Past Continuous — background action in progress",
      explanation:
        "Past Continuous describes what was already happening (eating dinner) when another event occurred (we arrived). Structure: were + -ing.",
      tip: "Past Continuous = the scene that was already set when the story moment happened.",
      gapFill: {
        gapIndex: 1,
        correctAnswer: "were having",
        options: ["were having", "had", "have had", "had had"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "nt-gap-4",
      topic: "narrative-tenses",
      type: "gap-fill",
      difficulty: "intermediate",
      sentence: "By the time we arrived, the film ___ already started.",
      grammarRule: "Past Perfect — action completed before another past action",
      explanation:
        "'Had' + past participle (had started) = Past Perfect. The film starting happened BEFORE we arrived. We use Past Perfect to make the order clear.",
      tip: "'By the time' is a classic signal for Past Perfect — the earlier action is always Past Perfect.",
      gapFill: {
        gapIndex: 7,
        correctAnswer: "had",
        options: ["had", "was", "have", "did"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "nt-gap-5",
      topic: "narrative-tenses",
      type: "gap-fill",
      difficulty: "intermediate",
      sentence: "I realised I ___ my keys at home when I reached the door.",
      grammarRule: "Past Perfect — earlier past action with thinking verbs",
      explanation:
        "After thinking verbs (realise, discover, find out, remember), we often use Past Perfect to show that the earlier action happened before the moment of realisation. 'Had left' = left before the moment I realised.",
      tip: "Realise, discover, find out, remember + Past Perfect = a common narrative pattern.",
      gapFill: {
        gapIndex: 3,
        correctAnswer: "had left",
        options: ["had left", "left", "was leaving", "have left"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "nt-gap-6",
      topic: "narrative-tenses",
      type: "gap-fill",
      difficulty: "intermediate",
      sentence: "While she ___ in the garden, it started to rain.",
      grammarRule: "Past Continuous — simultaneous background action (while)",
      explanation:
        "'While' introduces a background action in progress (was working). The main event that interrupted it (it started to rain) uses Past Simple.",
      tip: "While + Past Continuous sets the scene. The interrupting event uses Past Simple.",
      gapFill: {
        gapIndex: 2,
        correctAnswer: "was working",
        options: ["was working", "worked", "had worked", "works"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "nt-gap-7",
      topic: "narrative-tenses",
      type: "gap-fill",
      difficulty: "advanced",
      sentence: "He ___ in Dublin for five years before he moved to Cork.",
      grammarRule: "Past Perfect — duration before a past event",
      explanation:
        "Past Perfect is used here to show that living in Dublin came BEFORE moving to Cork. 'Had lived' makes the sequence of events clear.",
      tip: "Before/after + two past actions = use Past Perfect for the earlier one to make the order clear.",
      gapFill: {
        gapIndex: 1,
        correctAnswer: "had lived",
        options: ["had lived", "lived", "was living", "has lived"],
        correctOptionIndex: 0,
      },
    },

    // ─── ERROR-SPOT (6) ──────────────────────────────────────────────────────

    {
      id: "nt-err-1",
      topic: "narrative-tenses",
      type: "error-spot",
      difficulty: "beginner",
      sentence: "The phone ringed while I was reading a book.",
      grammarRule: "Past Simple — irregular verb (ring/rang)",
      explanation:
        "'Ring' is an irregular verb. The Past Simple form is 'rang', not 'ringed'. 'Ringed' does not exist in standard English.",
      tip: "Irregular verbs: ring → rang → rung. Never add -ed to irregular verbs.",
      errorSpot: {
        errorWordIndex: 2,
        wrongWord: "ringed",
        correction: "rang",
        reason: "'Ring' is irregular — Past Simple is 'rang', not 'ringed'.",
        correctionOptions: ["rang", "rung", "ringed", "ringing"],
      },
    },

    {
      id: "nt-err-2",
      topic: "narrative-tenses",
      type: "error-spot",
      difficulty: "beginner",
      sentence: "They was playing football when it started to rain.",
      grammarRule: "Past Continuous — subject-verb agreement (they/were)",
      explanation:
        "Past Continuous with 'they' must use 'were', not 'was'. 'Was' is only used with I/he/she/it.",
      tip: "Past Continuous: I/he/she/it + was; you/we/they + were.",
      errorSpot: {
        errorWordIndex: 1,
        wrongWord: "was",
        correction: "were",
        reason: "'They' requires 'were', not 'was', in Past Continuous.",
        correctionOptions: ["were", "was", "are", "had been"],
      },
    },

    {
      id: "nt-err-3",
      topic: "narrative-tenses",
      type: "error-spot",
      difficulty: "beginner",
      sentence: "He didn't knew the way to Sam's house.",
      grammarRule: "Past Simple negative — did + base form",
      explanation:
        "After 'didn't', always use the base form of the verb. 'Knew' is past tense, but after 'did/didn't' we go back to the base form: 'didn't know'.",
      tip: "Did/didn't + BASE form — never use past tense after did/didn't.",
      errorSpot: {
        errorWordIndex: 2,
        wrongWord: "knew",
        correction: "know",
        reason: "After 'didn't', use the base form — not the past tense form.",
        correctionOptions: ["know", "knew", "known", "knowing"],
      },
    },

    {
      id: "nt-err-4",
      topic: "narrative-tenses",
      type: "error-spot",
      difficulty: "intermediate",
      sentence: "She had went to Paris before she visited London.",
      grammarRule: "Past Perfect — had + past participle",
      explanation:
        "Past Perfect is formed with 'had' + past participle. The past participle of 'go' is 'gone', not 'went'. 'Went' is only Past Simple.",
      tip: "go → went (Past Simple) → gone (Past Participle). Past Perfect: had gone.",
      errorSpot: {
        errorWordIndex: 2,
        wrongWord: "went",
        correction: "gone",
        reason: "Past Perfect = had + past participle. 'Gone' is the past participle of 'go', not 'went'.",
        correctionOptions: ["gone", "went", "go", "going"],
      },
    },

    {
      id: "nt-err-5",
      topic: "narrative-tenses",
      type: "error-spot",
      difficulty: "intermediate",
      sentence: "When I got to work, I realised I forgot my laptop at home.",
      grammarRule: "Past Perfect after thinking verbs (realise)",
      explanation:
        "After 'realised', we need Past Perfect ('had forgotten') to show that forgetting the laptop happened BEFORE the moment of realising. Using Past Simple ('forgot') makes the sequence unclear.",
      tip: "Realise/discover/find out + Past Perfect = the earlier action was already done when you noticed.",
      errorSpot: {
        errorWordIndex: 8,
        wrongWord: "forgot",
        correction: "had forgotten",
        reason: "The forgetting happened before the realising — use Past Perfect: 'had forgotten'.",
        correctionOptions: ["had forgotten", "forgot", "have forgotten", "was forgetting"],
      },
    },

    {
      id: "nt-err-6",
      topic: "narrative-tenses",
      type: "error-spot",
      difficulty: "advanced",
      sentence: "They have visited Paris the year before they moved to London.",
      grammarRule: "Past Perfect vs Present Perfect",
      explanation:
        "When both events are in the past, use Past Perfect ('had visited'), not Present Perfect ('have visited'). Present Perfect connects the past to now — it cannot be used with a specific past time reference like 'the year before they moved'.",
      tip: "If both events are finished and in the past, use Past Perfect — never Present Perfect.",
      errorSpot: {
        errorWordIndex: 1,
        wrongWord: "have",
        correction: "had",
        reason: "Both events are in the past — use Past Perfect (had visited), not Present Perfect (have visited).",
        correctionOptions: ["had", "have", "has", "were"],
      },
    },

    // ─── MULTIPLE-CHOICE (6) ─────────────────────────────────────────────────

    {
      id: "nt-mc-1",
      topic: "narrative-tenses",
      type: "multiple-choice",
      difficulty: "beginner",
      sentence: "I ___ to music when the internet crashed.",
      grammarRule: "Past Continuous — interrupted background action",
      explanation:
        "The background action in progress (listening to music) uses Past Continuous. The sudden interrupting event (crashed) uses Past Simple.",
      tip: "Crash, ring, knock, arrive — these sudden events interrupt a Past Continuous action.",
      multipleChoice: {
        question: "Which option correctly completes the sentence?",
        correctOption: "was listening",
        options: ["was listening", "listened", "had listened", "listen"],
        optionExplanations: {
          "was listening": "Correct! Past Continuous shows the background action that was interrupted.",
          listened: "Wrong. 'Listened' (Past Simple) would mean both actions are equal main events.",
          "had listened": "Wrong. Past Perfect is for an earlier action, not a simultaneous background one.",
          listen: "Wrong. 'Listen' is present tense — we need a past form here.",
        },
      },
    },

    {
      id: "nt-mc-2",
      topic: "narrative-tenses",
      type: "multiple-choice",
      difficulty: "beginner",
      sentence: "He ___ the restaurant at 7pm and ordered a steak.",
      grammarRule: "Past Simple — sequence of completed actions",
      explanation:
        "We use Past Simple for a sequence of completed past actions. Both actions (arrived, ordered) happened one after the other and are finished.",
      tip: "A sequence of story events: he arrived → he ordered → he ate. Each uses Past Simple.",
      multipleChoice: {
        question: "Which option correctly completes the sentence?",
        correctOption: "arrived at",
        options: ["arrived at", "was arriving at", "had arrived at", "arrives at"],
        optionExplanations: {
          "arrived at": "Correct! Past Simple for a completed action in a sequence.",
          "was arriving at": "Wrong. Past Continuous describes a background action, not a sequence of events.",
          "had arrived at": "Wrong. Past Perfect is for an action completed before another past action.",
          "arrives at": "Wrong. 'Arrives' is present tense — we need the past here.",
        },
      },
    },

    {
      id: "nt-mc-3",
      topic: "narrative-tenses",
      type: "multiple-choice",
      difficulty: "intermediate",
      sentence: "By the time she got to the station, the train ___.",
      grammarRule: "Past Perfect — action completed before another past action",
      explanation:
        "'By the time' shows that the train leaving happened BEFORE she got to the station. The earlier action uses Past Perfect.",
      tip: "'By the time' + Past Simple → Past Perfect in the other clause.",
      multipleChoice: {
        question: "Which option correctly completes the sentence?",
        correctOption: "had already left",
        options: ["had already left", "already left", "was already leaving", "has already left"],
        optionExplanations: {
          "had already left": "Correct! Past Perfect shows the train left before she arrived.",
          "already left": "Wrong. Past Simple doesn't make the sequence clear enough here.",
          "was already leaving": "Wrong. Past Continuous suggests it was in progress, not already gone.",
          "has already left": "Wrong. Present Perfect cannot be used for a finished past situation.",
        },
      },
    },

    {
      id: "nt-mc-4",
      topic: "narrative-tenses",
      type: "multiple-choice",
      difficulty: "intermediate",
      sentence: "They ___ their coffee as the waiter closed the café.",
      grammarRule: "Past Continuous — two simultaneous actions (as/while)",
      explanation:
        "'As' and 'while' are used to describe two actions happening at the same time. Both actions use Past Continuous to show they were in progress together.",
      tip: "As/while + two actions happening together = Past Continuous + Past Continuous.",
      multipleChoice: {
        question: "Which option correctly completes the sentence?",
        correctOption: "were finishing",
        options: ["were finishing", "finished", "had finished", "finish"],
        optionExplanations: {
          "were finishing": "Correct! Past Continuous for an action in progress at the same time as another.",
          finished: "Wrong. 'Finished' (Past Simple) suggests a sequence, not simultaneous actions.",
          "had finished": "Wrong. Past Perfect means the action was already over — but here it was still happening.",
          finish: "Wrong. 'Finish' is present tense — we need a past form here.",
        },
      },
    },

    {
      id: "nt-mc-5",
      topic: "narrative-tenses",
      type: "multiple-choice",
      difficulty: "intermediate",
      sentence: "I didn't have any money because I ___ my wallet.",
      grammarRule: "Past Perfect — cause happened before the effect",
      explanation:
        "The cause (losing the wallet) happened BEFORE the effect (not having money). We use Past Perfect for the earlier action: 'had lost'.",
      tip: "When one past event caused another — the cause uses Past Perfect.",
      multipleChoice: {
        question: "Which option correctly completes the sentence?",
        correctOption: "had lost",
        options: ["had lost", "lost", "was losing", "have lost"],
        optionExplanations: {
          "had lost": "Correct! The wallet was lost BEFORE the moment of not having money.",
          lost: "This is possible when the sequence is already clear, but Past Perfect is more precise here.",
          "was losing": "Wrong. Past Continuous suggests the losing was in progress, not completed.",
          "have lost": "Wrong. Present Perfect cannot be used in a fully past narrative.",
        },
      },
    },

    {
      id: "nt-mc-6",
      topic: "narrative-tenses",
      type: "multiple-choice",
      difficulty: "advanced",
      sentence: "How ___ Harry at university?",
      grammarRule: "Past Simple — question form (did + base form)",
      explanation:
        "Past Simple questions use 'did' + subject + base form. We say 'How did you meet Harry?' — never 'How did you met Harry?'.",
      tip: "Past Simple question: Did + subject + BASE FORM. The main verb stays in base form.",
      multipleChoice: {
        question: "Which option correctly completes the question?",
        correctOption: "did you meet",
        options: ["did you meet", "did you met", "were you meeting", "had you met"],
        optionExplanations: {
          "did you meet": "Correct! Past Simple question: did + subject + base form.",
          "did you met": "Wrong. After 'did', always use the base form — never the past tense form.",
          "were you meeting": "Wrong. Past Continuous question form, but doesn't fit this context.",
          "had you met": "Wrong. Past Perfect question would need a specific earlier past context.",
        },
      },
    },

    // ─── WORD TRANSFORM (6) ────────────────────────────────────────────────

    {
      id: "nt-reorder-1",
      topic: "narrative-tenses",
      type: "word-transform",
      difficulty: "beginner",
      sentence: "She ___ a book when the phone rang.",
      grammarRule: "Past Continuous — interrupted background action",
      explanation: "Past Continuous describes what was in progress when the interruption happened. Structure: was/were + verb-ing.",
      tip: "Background action in progress + 'when' + interruption: was reading when the phone rang.",
      wordTransform: {
        baseWord: "read",
        correctAnswer: "was reading",
      },
    },

    {
      id: "nt-reorder-2",
      topic: "narrative-tenses",
      type: "word-transform",
      difficulty: "beginner",
      sentence: "While I ___ home, I met an old friend.",
      grammarRule: "Past Continuous — background action with 'while'",
      explanation: "'While' introduces the longer background action in Past Continuous. The meeting (Past Simple) happened during the walk.",
      tip: "While + Past Continuous (ongoing action) + Past Simple (event that happened during it).",
      wordTransform: {
        baseWord: "walk",
        correctAnswer: "was walking",
      },
    },

    {
      id: "nt-reorder-3",
      topic: "narrative-tenses",
      type: "word-transform",
      difficulty: "intermediate",
      sentence: "When I arrived, the film had already ___.",
      grammarRule: "Past Perfect — completed before another past event",
      explanation: "Past Perfect shows the film started before I arrived. Past Participle of 'start' is 'started' (regular verb).",
      tip: "The earlier action → Past Perfect: had already started, had already left, had already finished.",
      wordTransform: {
        baseWord: "start",
        correctAnswer: "started",
      },
    },

    {
      id: "nt-reorder-4",
      topic: "narrative-tenses",
      type: "word-transform",
      difficulty: "intermediate",
      sentence: "She had already ___ before he arrived.",
      grammarRule: "Past Perfect — completed before another past event",
      explanation: "Past Perfect: had + past participle. 'Eaten' is the past participle of 'eat'. It shows the meal was finished before his arrival.",
      tip: "Eat → ate (Past Simple) → eaten (Past Participle). 'Had eaten' = Past Perfect.",
      wordTransform: {
        baseWord: "eat",
        correctAnswer: "eaten",
      },
    },

    {
      id: "nt-reorder-5",
      topic: "narrative-tenses",
      type: "word-transform",
      difficulty: "intermediate",
      sentence: "I ___ TV when the lights went out.",
      grammarRule: "Past Continuous — activity in progress when interrupted",
      explanation: "Past Continuous shows what was happening when the interruption occurred. 'Was watching' = in progress.",
      tip: "Was/were + verb-ing = action in progress. 'When' introduces the interrupting event.",
      wordTransform: {
        baseWord: "watch",
        correctAnswer: "was watching",
      },
    },

    {
      id: "nt-reorder-6",
      topic: "narrative-tenses",
      type: "word-transform",
      difficulty: "advanced",
      sentence: "By the time we arrived, they had already ___.",
      grammarRule: "Past Perfect — earlier completed action",
      explanation: "'By the time we arrived' means before our arrival. Past Perfect (had left) shows the earlier completed action.",
      tip: "By the time... + Past Perfect: had already left, had already eaten, had already gone.",
      wordTransform: {
        baseWord: "leave",
        correctAnswer: "left",
      },
    },

  ],
};
