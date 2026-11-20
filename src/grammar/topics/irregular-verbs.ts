import type { GrammarTopic } from "../types.ts";

/**
 * Irregular Verbs — Past Simple & Past Participle
 * Covers verbs from both groups:
 *   - Group A: Past Simple = Past Participle (cut/cut/cut, buy/bought/bought, etc.)
 *   - Group B: Past Simple ≠ Past Participle (break/broke/broken, see/saw/seen, etc.)
 */
export const irregularVerbsTopic: GrammarTopic = {
  id: "irregular-verbs",
  level: "B1",
  name: "Irregular Verbs",
  description:
    "Practice the Past Simple and Past Participle forms of the most common irregular English verbs.",
  icon: "📚",
  cards: [
    {
      id: "irr-v-card-1",
      rule: "cut – cut – cut (same in all forms)",
      example: "My parents never let me go to concerts. Last year they finally ___ me go to one.",
      answer: "let",
      explanation: "Some irregular verbs never change: cut, put, hit, let, hurt, shut. The present, the past simple and the past participle look the same. Never add -ed.",
      examples: ["She has cut her hair short for the summer.", "I put the documents in a blue folder yesterday."],
      ua: "Ці дієслова не змінюються: cut — cut — cut. Не «cutted», не «putted».",
    },
    {
      id: "irr-v-card-2",
      rule: "buy – bought – bought (-ought / -aught)",
      example: "She teaches English at a school now. Before that, she ___ French to children in Lviv.",
      answer: "taught",
      explanation: "Many verbs end in -ought or -aught in the past: buy – bought, bring – brought, think – thought, catch – caught, teach – taught. The past simple and the past participle are the same.",
      examples: ["He has bought a small flat near the river.", "We caught the early train to Odesa on Saturday."],
      ua: "Закінчення -ought / -aught: teach — taught, buy — bought. Дві форми однакові.",
    },
    {
      id: "irr-v-card-3",
      rule: "spend – spent – spent (-nd → -nt)",
      example: "I like to spend a little money on books. Last month I ___ two thousand hryvnias on them.",
      answer: "spent",
      explanation: "Some verbs change -nd to -nt: spend – spent, send – sent, lend – lent. Build – built is similar. The past simple and the past participle are the same.",
      examples: ["She has sent her CV to five companies.", "They built a small cottage by the lake in 2015."],
      ua: "-nd змінюється на -nt: send — sent, spend — spent; ще build — built.",
    },
    {
      id: "irr-v-card-4",
      rule: "keep – kept, feel – felt, leave – left",
      example: "I try to keep my promises, just like my grandfather did. He ___ every promise he ever made.",
      answer: "kept",
      explanation: "Some verbs get a short vowel and end in -t: sleep – slept, keep – kept, feel – felt, leave – left. The past simple and the past participle are the same.",
      examples: ["He felt much better after a good night's sleep.", "We met at university and have been friends ever since."],
      ua: "Дві форми однакові: keep — kept, feel — felt, leave — left.",
    },
    {
      id: "irr-v-card-5",
      rule: "swim – swam – swum (i – a – u)",
      example: "I swim every morning. Yesterday I swam in the lake, and today I have already ___ in the sea.",
      answer: "swum",
      explanation: "Some verbs follow the pattern i – a – u: swim – swam – swum, begin – began – begun, drink – drank – drunk. Use the second form for the past simple and the third form after have.",
      examples: ["The film has already begun, so please be quiet.", "We drank hot chocolate after the long walk."],
      ua: "Схема i — a — u: swim — swam — swum, begin — began — begun.",
    },
    {
      id: "irr-v-card-6",
      rule: "know – knew – known (-ew / -own)",
      example: "I have ___ my best friend for twenty years — we met at school.",
      answer: "known",
      explanation: "Some verbs follow the pattern -ew / -own: know – knew – known, grow – grew – grown, fly – flew – flown. After have, use the form with -own.",
      examples: ["The plane flew over the mountains in the dark.", "Her children have grown so much since last summer."],
      ua: "Схема -ew / -own: know — knew — known, grow — grew — grown.",
    },
    {
      id: "irr-v-card-7",
      rule: "drive – drove – driven (-en participle)",
      example: "I drove my father's car last week, but I have never ___ a lorry.",
      answer: "driven",
      explanation: "Many past participles end in -en: write – written, drive – driven, ride – ridden, take – taken, give – given, break – broken, forget – forgotten. The past simple is different.",
      examples: ["My brother has written a book about cycling in Ukraine.", "She has given me her new phone number."],
      ua: "Третя форма на -en: drive — driven, write — written, take — taken.",
    },
    {
      id: "irr-v-card-8",
      rule: "have / has + past participle",
      example: "My sister is not at home — she has ___ to the gym.",
      answer: "gone",
      explanation: "After have, has and had, use the past participle, not the past simple: have eaten, has seen, has gone. Use the past simple for a finished time: I saw it yesterday.",
      examples: ["I have never seen snow in October before.", "He has already eaten, so he doesn't want a snack."],
      ua: "Після have / has — третя форма: I have seen, а не I have saw.",
    },
    {
      id: "irr-v-card-9",
      rule: "was / were + past participle (passive)",
      example: "Someone kicked a ball into our garden, and the kitchen window was ___ (break).",
      answer: "broken",
      explanation: "In the passive, use was or were + past participle: was built, were stolen, was broken. For irregular verbs, learn the third form.",
      examples: ["The old church was built in 1880.", "My bag was stolen on the metro last week."],
      ua: "Пасив: was / were + третя форма. «Міст збудували» — The bridge was built.",
    },
  ],
  rules: [

    // ─── GAP-FILL (7) ───────────────────────────────────────────────────────

    {
      id: "irr-v-gap-1",
      topic: "irregular-verbs",
      type: "gap-fill",
      difficulty: "beginner",
      sentence: "I ___ my finger while cutting vegetables.",
      grammarRule: "Irregular Verbs — Past Simple (same all forms)",
      explanation:
        "'Cut' is irregular: cut / cut / cut. All three forms are identical. We never say 'cutted'.",
      tip: "Same-form verbs: cut, put, hit, hurt, let, shut — no change in any tense.",
      gapFill: {
        gapIndex: 1,
        correctAnswer: "cut",
        options: ["cut", "cutted", "cuts", "have cut"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "irr-v-gap-2",
      topic: "irregular-verbs",
      type: "gap-fill",
      difficulty: "beginner",
      sentence: "She ___ a beautiful song at the concert last night.",
      grammarRule: "Irregular Verbs — Past Simple (sing/sang/sung)",
      explanation:
        "'Sing' is irregular: sing → sang (Past Simple) → sung (Past Participle). Never use 'singed'.",
      tip: "Group pattern a→i→u: ring/rang/rung, sing/sang/sung, drink/drank/drunk, begin/began/begun.",
      gapFill: {
        gapIndex: 1,
        correctAnswer: "sang",
        options: ["sang", "singed", "sung", "sing"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "irr-v-gap-3",
      topic: "irregular-verbs",
      type: "gap-fill",
      difficulty: "beginner",
      sentence: "He ___ all his money on a new gaming PC.",
      grammarRule: "Irregular Verbs — Past Simple (spend/spent)",
      explanation:
        "'Spend' is irregular: spend → spent (Past Simple and Past Participle). We never say 'spended'.",
      tip: "Pattern -nd/-nt: spend/spent, send/sent, lend/lent, build/built.",
      gapFill: {
        gapIndex: 1,
        correctAnswer: "spent",
        options: ["spent", "spended", "spends", "spend"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "irr-v-gap-4",
      topic: "irregular-verbs",
      type: "gap-fill",
      difficulty: "intermediate",
      sentence: "Have you ever ___ sushi before?",
      grammarRule: "Irregular Verbs — Past Participle (Present Perfect)",
      explanation:
        "After 'have/has' always use the Past Participle. 'Eat' → Past Participle: 'eaten'. 'Ate' is only Past Simple.",
      tip: "Present Perfect = have/has + Past Participle. Don't confuse 'ate' (Past Simple) with 'eaten' (Past Participle).",
      gapFill: {
        gapIndex: 3,
        correctAnswer: "eaten",
        options: ["eaten", "ate", "eated", "eating"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "irr-v-gap-5",
      topic: "irregular-verbs",
      type: "gap-fill",
      difficulty: "intermediate",
      sentence: "The geese ___ south at the beginning of October.",
      grammarRule: "Irregular Verbs — Past Simple (fly/flew/flown)",
      explanation:
        "'Fly' is irregular: fly → flew (Past Simple) → flown (Past Participle). Never say 'flied' when meaning travel through the air.",
      tip: "Group pattern -ew/-own: blow/blew/blown, grow/grew/grown, know/knew/known, fly/flew/flown.",
      gapFill: {
        gapIndex: 2,
        correctAnswer: "flew",
        options: ["flew", "flied", "flown", "fly"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "irr-v-gap-6",
      topic: "irregular-verbs",
      type: "gap-fill",
      difficulty: "intermediate",
      sentence: "She has ___ three best-selling novels in her career.",
      grammarRule: "Irregular Verbs — Past Participle (write/wrote/written)",
      explanation:
        "'Write' → Past Simple: 'wrote'. Past Participle: 'written'. With 'has', use 'written', not 'wrote'.",
      tip: "Pattern -ote/-itten: write/wrote/written, drive/drove/driven, ride/rode/ridden.",
      gapFill: {
        gapIndex: 2,
        correctAnswer: "written",
        options: ["written", "wrote", "writed", "writes"],
        correctOptionIndex: 0,
      },
    },

    {
      id: "irr-v-gap-7",
      topic: "irregular-verbs",
      type: "gap-fill",
      difficulty: "advanced",
      sentence: "By the time I arrived, he had already ___ home.",
      grammarRule: "Irregular Verbs — Past Participle (Past Perfect)",
      explanation:
        "Past Perfect = had + Past Participle. 'Leave' → Past Participle: 'left'. Never say 'leaved'.",
      tip: "Feel/felt, leave/left, meet/met — same form for Past Simple and Past Participle. Use 'had left' for Past Perfect.",
      gapFill: {
        gapIndex: 8,
        correctAnswer: "left",
        options: ["left", "leaved", "leave", "leaving"],
        correctOptionIndex: 0,
      },
    },

    // ─── ERROR-SPOT (6) ─────────────────────────────────────────────────────

    {
      id: "irr-v-err-1",
      topic: "irregular-verbs",
      type: "error-spot",
      difficulty: "beginner",
      sentence: "Yesterday I buyed a new phone at the shop.",
      grammarRule: "Irregular Verbs — Past Simple (buy/bought)",
      explanation:
        "'Buy' is irregular: buy → bought. It never follows the regular -ed pattern. Say 'I bought', not 'I buyed'.",
      tip: "Buy/bought/bought — same group as bring/brought, catch/caught, think/thought.",
      errorSpot: {
        errorWordIndex: 2,
        wrongWord: "buyed",
        correction: "bought",
        reason: "'Buy' is irregular. The Past Simple is 'bought', not 'buyed'.",
        correctionOptions: ["bought", "buys", "buy", "buying"],
      },
    },

    {
      id: "irr-v-err-2",
      topic: "irregular-verbs",
      type: "error-spot",
      difficulty: "beginner",
      sentence: "She feeled very nervous before her presentation.",
      grammarRule: "Irregular Verbs — Past Simple (feel/felt)",
      explanation:
        "'Feel' is irregular: feel → felt. It does not take the regular -ed ending. Say 'she felt', not 'she feeled'.",
      tip: "Feel/felt/felt — also: keep/kept, sleep/slept, dream/dreamt, mean/meant.",
      errorSpot: {
        errorWordIndex: 1,
        wrongWord: "feeled",
        correction: "felt",
        reason: "'Feel' is irregular. The Past Simple is 'felt', not 'feeled'.",
        correctionOptions: ["felt", "feels", "feel", "feeling"],
      },
    },

    {
      id: "irr-v-err-3",
      topic: "irregular-verbs",
      type: "error-spot",
      difficulty: "beginner",
      sentence: "We catched the last bus home last night.",
      grammarRule: "Irregular Verbs — Past Simple (catch/caught)",
      explanation:
        "'Catch' is irregular: catch → caught. Never say 'catched'. The vowel completely changes.",
      tip: "Catch/caught/caught — same pattern as teach/taught/taught.",
      errorSpot: {
        errorWordIndex: 1,
        wrongWord: "catched",
        correction: "caught",
        reason: "'Catch' is irregular. The Past Simple is 'caught', not 'catched'.",
        correctionOptions: ["caught", "catches", "catch", "catching"],
      },
    },

    {
      id: "irr-v-err-4",
      topic: "irregular-verbs",
      type: "error-spot",
      difficulty: "intermediate",
      sentence: "She has already taked the entrance exam twice.",
      grammarRule: "Irregular Verbs — Past Participle (take/took/taken)",
      explanation:
        "'Take' is irregular: take → took (Past Simple) → taken (Past Participle). After 'has', use 'taken', not 'took' or 'taked'.",
      tip: "Take/took/taken — Past Participle ends in -en. Same: give/gave/given, eat/ate/eaten, see/saw/seen.",
      errorSpot: {
        errorWordIndex: 3,
        wrongWord: "taked",
        correction: "taken",
        reason: "'Take' is irregular. The Past Participle is 'taken', not 'taked'.",
        correctionOptions: ["taken", "took", "takes", "taking"],
      },
    },

    {
      id: "irr-v-err-5",
      topic: "irregular-verbs",
      type: "error-spot",
      difficulty: "intermediate",
      sentence: "He sended me a long message this morning.",
      grammarRule: "Irregular Verbs — Past Simple (send/sent)",
      explanation:
        "'Send' is irregular: send → sent. Never say 'sended'. The -nd changes to -t.",
      tip: "Send/sent/sent — same pattern: spend/spent, lend/lent, build/built.",
      errorSpot: {
        errorWordIndex: 1,
        wrongWord: "sended",
        correction: "sent",
        reason: "'Send' is irregular. The Past Simple is 'sent', not 'sended'.",
        correctionOptions: ["sent", "sends", "send", "sending"],
      },
    },

    {
      id: "irr-v-err-6",
      topic: "irregular-verbs",
      type: "error-spot",
      difficulty: "advanced",
      sentence: "The bridge was builded in just six months.",
      grammarRule: "Irregular Verbs — Past Participle in Passive Voice",
      explanation:
        "'Build' is irregular: build → built. In passive voice use 'was built', not 'was builded'. Both Past Simple and Past Participle are 'built'.",
      tip: "Build/built/built — passive voice: 'was/were built'. Never use 'builded'.",
      errorSpot: {
        errorWordIndex: 3,
        wrongWord: "builded",
        correction: "built",
        reason: "'Build' is irregular. The Past Participle is 'built', not 'builded'.",
        correctionOptions: ["built", "builds", "build", "building"],
      },
    },

    // ─── MULTIPLE-CHOICE (6) ────────────────────────────────────────────────

    {
      id: "irr-v-mc-1",
      topic: "irregular-verbs",
      type: "multiple-choice",
      difficulty: "beginner",
      sentence: "She brought flowers to the dinner party.",
      grammarRule: "Irregular Verbs — Past Simple (bring/brought)",
      explanation:
        "'Bring' is irregular: bring → brought (Past Simple and Past Participle). It follows the same -ought pattern as buy/bought and think/thought.",
      tip: "Bring/brought/brought — a very high-frequency irregular. Never say 'bringed'.",
      multipleChoice: {
        question: "She ___ flowers to the dinner party last Saturday. Choose the correct Past Simple of 'bring':",
        correctOption: "brought",
        options: ["brought", "bringed", "brung", "bring"],
      },
    },

    {
      id: "irr-v-mc-2",
      topic: "irregular-verbs",
      type: "multiple-choice",
      difficulty: "beginner",
      sentence: "I thought about the problem all night.",
      grammarRule: "Irregular Verbs — Past Simple (think/thought)",
      explanation:
        "'Think' is irregular: think → thought. It belongs to the -ought group along with bring/brought, buy/bought, catch/caught.",
      tip: "Think/thought/thought — the whole vowel cluster changes. 'Thinked' and 'thunk' are not standard English.",
      multipleChoice: {
        question: "I ___ about the problem all night but couldn't find a solution. Choose the correct Past Simple of 'think':",
        correctOption: "thought",
        options: ["thought", "thinked", "think", "thunk"],
      },
    },

    {
      id: "irr-v-mc-3",
      topic: "irregular-verbs",
      type: "multiple-choice",
      difficulty: "intermediate",
      sentence: "Have you ever ridden a horse?",
      grammarRule: "Irregular Verbs — Past Participle (ride/rode/ridden)",
      explanation:
        "'Ride' is irregular: ride → rode (Past Simple) → ridden (Past Participle). With 'have/has/had', always use 'ridden'.",
      tip: "Ride/rode/ridden — Past Participle ends in -en. Same group: drive/drove/driven, write/wrote/written.",
      multipleChoice: {
        question: "Have you ever ___ a horse? Choose the correct Past Participle of 'ride':",
        correctOption: "ridden",
        options: ["ridden", "rode", "rided", "ridded"],
      },
    },

    {
      id: "irr-v-mc-4",
      topic: "irregular-verbs",
      type: "multiple-choice",
      difficulty: "intermediate",
      sentence: "I have seen this film three times.",
      grammarRule: "Irregular Verbs — Past Simple vs Past Participle (see/saw/seen)",
      explanation:
        "'See' is irregular: saw = Past Simple, seen = Past Participle. With 'have/has', always use 'seen'. Never say 'I have saw'.",
      tip: "Past Simple: 'I saw it yesterday.' Present Perfect: 'I have seen it before.' The key is whether 'have/has' is present.",
      multipleChoice: {
        question: "Which sentence is grammatically correct?",
        correctOption: "I have seen this film three times.",
        options: [
          "I have seen this film three times.",
          "I have saw this film three times.",
          "I seen this film three times.",
          "I have see this film three times.",
        ],
      },
    },

    {
      id: "irr-v-mc-5",
      topic: "irregular-verbs",
      type: "multiple-choice",
      difficulty: "intermediate",
      sentence: "He accidentally broke the window during the game.",
      grammarRule: "Irregular Verbs — Past Simple (break/broke/broken)",
      explanation:
        "'Break' → Past Simple: 'broke'. Past Participle: 'broken'. Don't confuse them — 'broke' for past actions, 'broken' with have/has/was.",
      tip: "Break/broke/broken — Past Simple: 'He broke it.' Past Participle: 'It was broken.' / 'He has broken it.'",
      multipleChoice: {
        question: "He accidentally ___ the window during the game. Choose the correct Past Simple of 'break':",
        correctOption: "broke",
        options: ["broke", "broken", "breaked", "brokes"],
      },
    },

    {
      id: "irr-v-mc-6",
      topic: "irregular-verbs",
      type: "multiple-choice",
      difficulty: "advanced",
      sentence: "By the time I called, she had already forgotten about our meeting.",
      grammarRule: "Irregular Verbs — Past Participle in Past Perfect (forget/forgot/forgotten)",
      explanation:
        "Past Perfect = had + Past Participle. 'Forget' → Past Participle: 'forgotten'. 'Forgot' is only Past Simple.",
      tip: "Forget/forgot/forgotten — Past Perfect: 'had forgotten'. Don't use 'had forgot' — that's a common mistake.",
      multipleChoice: {
        question: "By the time I called, she had already ___ about our meeting. Choose the correct Past Participle of 'forget':",
        correctOption: "forgotten",
        options: ["forgotten", "forgot", "forgeted", "forgetted"],
      },
    },

    // ─── WORD TRANSFORM (6) ───────────────────────────────────────────────────

    {
      id: "irr-v-reorder-1",
      topic: "irregular-verbs",
      type: "word-transform",
      difficulty: "beginner",
      sentence: "She ___ a new computer last week.",
      grammarRule: "Irregular Verbs — Past Simple (buy/bought)",
      explanation: "Past Simple of 'buy' is 'bought'. Irregular verb — does not follow the regular -ed pattern.",
      tip: "Buy → bought. Past Simple: I bought, she bought, they bought.",
      wordTransform: {
        baseWord: "buy",
        correctAnswer: "bought",
      },
    },

    {
      id: "irr-v-reorder-2",
      topic: "irregular-verbs",
      type: "word-transform",
      difficulty: "beginner",
      sentence: "They ___ all evening at the cinema.",
      grammarRule: "Irregular Verbs — Past Simple (spend/spent)",
      explanation: "Past Simple of 'spend' is 'spent'. Both Past Simple and Past Participle are 'spent'.",
      tip: "Spend → spent. Past Simple: we spent, he spent, they spent.",
      wordTransform: {
        baseWord: "spend",
        correctAnswer: "spent",
      },
    },

    {
      id: "irr-v-reorder-3",
      topic: "irregular-verbs",
      type: "word-transform",
      difficulty: "intermediate",
      sentence: "Have you ever ___ this film before?",
      grammarRule: "Irregular Verbs — Past Participle (see/saw/seen)",
      explanation: "Past Participle of 'see' is 'seen'. Use it with Present Perfect: Have you ever seen...?",
      tip: "See → saw (Past Simple) → seen (Past Participle). 'Have you ever seen…' needs the participle.",
      wordTransform: {
        baseWord: "see",
        correctAnswer: "seen",
      },
    },

    {
      id: "irr-v-reorder-4",
      topic: "irregular-verbs",
      type: "word-transform",
      difficulty: "intermediate",
      sentence: "He ___ his leg during the football match.",
      grammarRule: "Irregular Verbs — Past Simple (break/broke/broken)",
      explanation: "Past Simple of 'break' is 'broke'. Irregular verb — does not follow the -ed pattern.",
      tip: "Break → broke (Past Simple) → broken (Past Participle). He broke it yesterday.",
      wordTransform: {
        baseWord: "break",
        correctAnswer: "broke",
      },
    },

    {
      id: "irr-v-reorder-5",
      topic: "irregular-verbs",
      type: "word-transform",
      difficulty: "intermediate",
      sentence: "She has ___ many letters to her friends.",
      grammarRule: "Irregular Verbs — Past Participle (write/wrote/written)",
      explanation: "Past Participle of 'write' is 'written'. Use it with Present Perfect: has written.",
      tip: "Write → wrote (Past Simple) → written (Past Participle). 'Has written' = Present Perfect.",
      wordTransform: {
        baseWord: "write",
        correctAnswer: "written",
      },
    },

    {
      id: "irr-v-reorder-6",
      topic: "irregular-verbs",
      type: "word-transform",
      difficulty: "advanced",
      sentence: "By the time we arrived, they had already ___.",
      grammarRule: "Irregular Verbs — Past Participle in Past Perfect (leave/left)",
      explanation: "Past Perfect uses 'had' + Past Participle. Past Participle of 'leave' is 'left'. 'Had left' shows an action before another past event.",
      tip: "Leave → left (both Past Simple and Past Participle). 'Had left' = Past Perfect.",
      wordTransform: {
        baseWord: "leave",
        correctAnswer: "left",
      },
    },

  ],
};
