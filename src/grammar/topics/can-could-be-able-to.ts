/**
 * EnglishPusher Grammar Testing - Can, Could, Be Able To
 * B1 Level (Speak Out) - Lesson 8A
 *
 * 6 gap-fill, 6 error-spot, 7 multiple-choice, 6 word-transform = 25 questions
 * VERIFIED: All error-spot indexes checked against split(" ") positions.
 */

import type { GrammarQuestion, GrammarTopic } from "../types.ts";

export const canCouldBeAbleToQuestions: GrammarQuestion[] = [

    // ===== GAP FILL QUESTIONS (6 questions) =====

    {
        id: "cba-gap-1",
        topic: "can-could-be-able-to",
        type: "gap-fill",
        difficulty: "beginner",
        sentence: "My grandfather ___ fix almost anything when he was younger.",
        grammarRule: "'could' — Past General Ability",
        explanation: "'Could' describes a general ability someone had over a period of time in the past — not a single occasion.",
        tip: "could = general ability in the past. Look for time expressions like 'when he was younger'.",
        gapFill: {
            gapIndex: 2,
            correctAnswer: "could",
            options: ["could", "can", "couldn't", "is able to"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "cba-gap-2",
        topic: "can-could-be-able-to",
        type: "gap-fill",
        difficulty: "beginner",
        sentence: "These days, she ___ speak four languages.",
        grammarRule: "'can' — Present General Ability",
        explanation: "'Can' describes a general ability now. 'These days' signals the present, not the past.",
        tip: "can = ability now. could / was able to = ability in the past.",
        gapFill: {
            gapIndex: 3,
            correctAnswer: "can",
            options: ["can", "could", "couldn't", "was able to"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "cba-gap-3",
        topic: "can-could-be-able-to",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "After trying for an hour, we finally ___ open the heavy door.",
        grammarRule: "'was/were able to' — Specific Past Achievement (NOT could)",
        explanation: "For one specific success in the past — something that happened on one occasion — we must use 'was/were able to', not 'could'.",
        tip: "A single past success = was/were able to. 'Could' is wrong here.",
        gapFill: {
            gapIndex: 7,
            correctAnswer: "were able to",
            options: ["were able to", "could", "can", "are able to"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "cba-gap-4",
        topic: "can-could-be-able-to",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "I ___ remember his name, even though we'd met before.",
        grammarRule: "'couldn't' — Past Inability",
        explanation: "'Couldn't' is the past negative form. Since 'we'd met before' sets the time clearly in the past, the present form 'can't' would be wrong here.",
        tip: "couldn't = past inability — works for both a general inability and a single occasion.",
        gapFill: {
            gapIndex: 1,
            correctAnswer: "couldn't",
            options: ["couldn't", "can't", "mustn't", "shouldn't"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "cba-gap-5",
        topic: "can-could-be-able-to",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "We ___ offer you a discount today only.",
        grammarRule: "'be able to' — Present Ability at a Specific Time",
        explanation: "'Be able to' can describe an ability at one specific time in the present, just like 'can'. 'Today only' points to now, not the past.",
        tip: "are able to ≈ can, even for an offer available at one specific time.",
        gapFill: {
            gapIndex: 1,
            correctAnswer: "are able to",
            options: ["are able to", "were able to", "could", "can't"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "cba-gap-6",
        topic: "can-could-be-able-to",
        type: "gap-fill",
        difficulty: "advanced",
        sentence: "___ you swim when you were a child?",
        grammarRule: "'could' — Past Ability Question",
        explanation: "'Could' is the natural way to ask about a general ability someone had in the past.",
        tip: "Could you...? asks about a general past ability.",
        gapFill: {
            gapIndex: 0,
            correctAnswer: "Could",
            options: ["Could", "Were", "Can", "Did"],
            correctOptionIndex: 0,
        },
    },

    // ===== ERROR SPOT QUESTIONS (6 questions) =====
    // RULE: Every error is exactly ONE word. Replacing wrongWord with correction
    // must produce a 100% grammatically correct sentence with no leftover errors.

    // split(" ") → [0=She,1=can,2=plays,3=the,4=piano,5=beautifully.]
    // words[2]="plays" ✅  corrected: "She can play the piano beautifully." ✅
    {
        id: "cba-error-1",
        topic: "can-could-be-able-to",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "She can plays the piano beautifully.",
        grammarRule: "'can' + Bare Infinitive",
        explanation: "Modals like 'can' are always followed by the base form of the verb — never add -s, even for he/she/it.",
        errorSpot: {
            errorWordIndex: 2,
            wrongWord: "plays",
            correction: "play",
            reason: "After 'can', use the base form: 'can play', not 'can plays'.",
            correctionOptions: ["play", "plays", "playing", "to play"],
        },
    },

    // split(" ") → [0=He,1=is,2=able,3=to,4=playing,5=the,6=guitar,7=well.]
    // words[4]="playing" ✅  corrected: "He is able to play the guitar well." ✅
    {
        id: "cba-error-2",
        topic: "can-could-be-able-to",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "He is able to playing the guitar well.",
        grammarRule: "'be able to' + Bare Infinitive",
        explanation: "'Be able to' is always followed by the base form of the verb, not the -ing form.",
        errorSpot: {
            errorWordIndex: 4,
            wrongWord: "playing",
            correction: "play",
            reason: "After 'able to', use the base form: 'able to play', not 'able to playing'.",
            correctionOptions: ["play", "playing", "plays", "played"],
        },
    },

    // split(" ") → [0=They,1=was,2=able,3=to,4=finish,5=the,6=race,7=in,8=record,9=time.]
    // words[1]="was" ✅  corrected: "They were able to finish the race in record time." ✅
    {
        id: "cba-error-3",
        topic: "can-could-be-able-to",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "They was able to finish the race in record time.",
        grammarRule: "'be able to' — Subject-Verb Agreement",
        explanation: "'Be able to' changes form like an ordinary verb. With the plural subject 'they', it must be 'were', not 'was'.",
        errorSpot: {
            errorWordIndex: 1,
            wrongWord: "was",
            correction: "were",
            reason: "'They' needs the plural past form: 'They were able to...', not 'They was able to...'.",
            correctionOptions: ["were", "was", "are", "is"],
        },
    },

    // split(" ") → [0=When,1=I,2=was,3=young,,4=I,5=can't,6=ride,7=a,8=bicycle.]
    // words[5]="can't" ✅  corrected: "When I was young, I couldn't ride a bicycle." ✅
    {
        id: "cba-error-4",
        topic: "can-could-be-able-to",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "When I was young, I can't ride a bicycle.",
        grammarRule: "'couldn't' — Past Inability (not can't)",
        explanation: "'When I was young' sets the sentence in the past, so the past negative 'couldn't' is needed, not the present 'can't'.",
        errorSpot: {
            errorWordIndex: 5,
            wrongWord: "can't",
            correction: "couldn't",
            reason: "The sentence is about childhood, so use the past form: 'I couldn't ride', not 'I can't ride'.",
            correctionOptions: ["couldn't", "can't", "wasn't", "isn't"],
        },
    },

    // split(" ") → [0=Was,1=you,2=able,3=to,4=drive,5=before,6=you,7=moved,8=here?]
    // words[0]="Was" ✅  corrected: "Were you able to drive before you moved here?" ✅
    {
        id: "cba-error-5",
        topic: "can-could-be-able-to",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "Was you able to drive before you moved here?",
        grammarRule: "'be able to' — Question Form (Were you able to)",
        explanation: "With the subject 'you', the question form of 'be able to' needs 'were', not 'was'.",
        errorSpot: {
            errorWordIndex: 0,
            wrongWord: "Was",
            correction: "Were",
            reason: "'You' needs 'were': 'Were you able to...?', not 'Was you able to...?'.",
            correctionOptions: ["Were", "Was", "Are", "Did"],
        },
    },

    // split(" ") → [0=I,1=couldn't,2=speaking,3=any,4=English,5=when,6=I,7=arrived.]
    // words[2]="speaking" ✅  corrected: "I couldn't speak any English when I arrived." ✅
    {
        id: "cba-error-6",
        topic: "can-could-be-able-to",
        type: "error-spot",
        difficulty: "advanced",
        sentence: "I couldn't speaking any English when I arrived.",
        grammarRule: "'couldn't' + Bare Infinitive",
        explanation: "Modals like 'couldn't' are always followed by the base form of the verb, never the -ing form.",
        errorSpot: {
            errorWordIndex: 2,
            wrongWord: "speaking",
            correction: "speak",
            reason: "After 'couldn't', use the base form: 'couldn't speak', not 'couldn't speaking'.",
            correctionOptions: ["speak", "speaking", "spoke", "speaks"],
        },
    },

    // ===== MULTIPLE CHOICE QUESTIONS (7 questions) =====

    {
        id: "cba-mc-1",
        topic: "can-could-be-able-to",
        type: "multiple-choice",
        difficulty: "beginner",
        sentence: "Choose the sentence that correctly describes a general ability now.",
        grammarRule: "'can' + Bare Infinitive — Present Ability",
        explanation: "'Can' is followed directly by the base form of the verb — no 'to' and no extra -s.",
        tip: "can + base verb, no 'to': can play, can swim, can cook.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "She can play the violin beautifully.",
            options: [
                "She can play the violin beautifully.",
                "She can to play the violin beautifully.",
                "She cans play the violin beautifully.",
                "She is can play the violin beautifully.",
            ],
            optionExplanations: {
                "She can play the violin beautifully.": "Correct! 'Can' + base verb, with no 'to'.",
                "She can to play the violin beautifully.": "Wrong. Never add 'to' after 'can'.",
                "She cans play the violin beautifully.": "Wrong. 'Can' never takes -s, even for he/she/it.",
                "She is can play the violin beautifully.": "Wrong. 'Can' is a modal — it never follows 'is'.",
            },
        },
    },

    {
        id: "cba-mc-2",
        topic: "can-could-be-able-to",
        type: "multiple-choice",
        difficulty: "beginner",
        sentence: "Choose the sentence that correctly talks about a general ability in the past.",
        grammarRule: "'could' — Past General Ability",
        explanation: "'Could' describes a general ability someone had over a period of time in the past. 'When I was a teenager' signals the past.",
        tip: "could = general ability in the past — look for past time expressions.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "I could run very fast when I was a teenager.",
            options: [
                "I could run very fast when I was a teenager.",
                "I can run very fast when I was a teenager.",
                "I am able run very fast when I was a teenager.",
                "I could ran very fast when I was a teenager.",
            ],
            optionExplanations: {
                "I could run very fast when I was a teenager.": "Correct! 'Could' + base verb describes a general past ability.",
                "I can run very fast when I was a teenager.": "Wrong. 'Can' is present tense, but 'when I was a teenager' is the past.",
                "I am able run very fast when I was a teenager.": "Wrong. 'Be able to' needs 'to': 'am able to run', and it's the wrong tense here too.",
                "I could ran very fast when I was a teenager.": "Wrong. After 'could', use the base form 'run', not 'ran'.",
            },
        },
    },

    {
        id: "cba-mc-3",
        topic: "can-could-be-able-to",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the sentence with almost the same meaning as 'We can repair the roof this afternoon.'",
        grammarRule: "'can' = 'be able to' — Present Ability (Interchangeable)",
        explanation: "In the present, 'can' and 'be able to' can both describe a general ability or an ability at one specific time, so they are interchangeable here.",
        tip: "can ≈ be able to in the present, for general ability AND a specific time.",
        multipleChoice: {
            question: "Which sentence means the same thing?",
            correctOption: "We are able to repair the roof this afternoon.",
            options: [
                "We are able to repair the roof this afternoon.",
                "We were able to repair the roof this afternoon.",
                "We could repair the roof this afternoon.",
                "We weren't able to repair the roof this afternoon.",
            ],
            optionExplanations: {
                "We are able to repair the roof this afternoon.": "Correct! 'Are able to' means the same as 'can' in the present.",
                "We were able to repair the roof this afternoon.": "Wrong. This is past tense, but the original sentence is about this afternoon.",
                "We could repair the roof this afternoon.": "Wrong. 'Could' here suggests the past or a hypothetical, not the same meaning as 'can'.",
                "We weren't able to repair the roof this afternoon.": "Wrong. This is negative and past tense — the opposite meaning.",
            },
        },
    },

    {
        id: "cba-mc-4",
        topic: "can-could-be-able-to",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the sentence that correctly describes a single successful event in the past.",
        grammarRule: "'was/were able to' — Specific Past Achievement (NOT could)",
        explanation: "For one specific achievement in the past, English requires 'was/were able to'. 'Could' is only for a general ability over time, not a single occasion.",
        tip: "A single past success = was/were able to. 'Could' is wrong here, even though it's fine for general ability.",
        multipleChoice: {
            question: "Which sentence is grammatically correct?",
            correctOption: "After a difficult exam, she was able to pass with a high grade.",
            options: [
                "After a difficult exam, she was able to pass with a high grade.",
                "After a difficult exam, she could pass with a high grade.",
                "After a difficult exam, she can pass with a high grade.",
                "After a difficult exam, she is able to pass with a high grade.",
            ],
            optionExplanations: {
                "After a difficult exam, she was able to pass with a high grade.": "Correct! A single past success needs 'was able to', not 'could'.",
                "After a difficult exam, she could pass with a high grade.": "Wrong. 'Could' is not used for one specific past achievement.",
                "After a difficult exam, she can pass with a high grade.": "Wrong. 'Can' is present tense, but the exam already happened.",
                "After a difficult exam, she is able to pass with a high grade.": "Wrong. 'Is able to' is present tense, but the exam already happened.",
            },
        },
    },

    {
        id: "cba-mc-5",
        topic: "can-could-be-able-to",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the sentence that means the same as 'I wasn't able to sleep last night.'",
        grammarRule: "'couldn't' = 'wasn't able to' — Past Inability",
        explanation: "Unlike the affirmative, the negative forms 'couldn't' and 'wasn't/weren't able to' are always interchangeable, for both general and specific past inability.",
        tip: "Negative past ability: couldn't = wasn't/weren't able to — always interchangeable.",
        multipleChoice: {
            question: "Which sentence has the same meaning?",
            correctOption: "I couldn't sleep last night.",
            options: [
                "I couldn't sleep last night.",
                "I can't sleep last night.",
                "I don't sleep last night.",
                "I won't sleep last night.",
            ],
            optionExplanations: {
                "I couldn't sleep last night.": "Correct! 'Couldn't' = 'wasn't able to' for past inability.",
                "I can't sleep last night.": "Wrong. 'Can't' is present tense, but 'last night' is the past.",
                "I don't sleep last night.": "Wrong. 'Don't' is present habitual, not past inability.",
                "I won't sleep last night.": "Wrong. 'Won't' is future, which doesn't make sense with 'last night'.",
            },
        },
    },

    {
        id: "cba-mc-6",
        topic: "can-could-be-able-to",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the question that correctly asks about a past ability.",
        grammarRule: "'be able to' — Question Form (Were ... able to)",
        explanation: "In questions about past ability with 'be able to', 'be' moves before the subject: 'Were you able to...?'. No extra 'did' or 'can' is needed.",
        tip: "Were + subject + able to + base verb — don't add 'did' or 'can' as well.",
        multipleChoice: {
            question: "Which question is correct?",
            correctOption: "Were you able to find a parking space near the station?",
            options: [
                "Were you able to find a parking space near the station?",
                "Did you able to find a parking space near the station?",
                "Could you able to find a parking space near the station?",
                "Were you can find a parking space near the station?",
            ],
            optionExplanations: {
                "Were you able to find a parking space near the station?": "Correct! 'Were' moves before the subject to form the question.",
                "Did you able to find a parking space near the station?": "Wrong. 'Did' cannot combine with 'able to' this way.",
                "Could you able to find a parking space near the station?": "Wrong. You can't combine 'could' and 'able to' in the same phrase.",
                "Were you can find a parking space near the station?": "Wrong. You can't combine 'were' and 'can' in the same phrase.",
            },
        },
    },

    {
        id: "cba-mc-7",
        topic: "can-could-be-able-to",
        type: "multiple-choice",
        difficulty: "advanced",
        sentence: "Only one sentence is grammatically correct here. Which one?",
        grammarRule: "'was/were able to' — Specific Past Achievement (NOT could)",
        explanation: "The lift breaking down was a single, specific event, so the sentence must use 'were able to', not 'could'.",
        tip: "A dramatic one-time escape or success in the past always needs was/were able to.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "When the lift broke down, we were able to get out through a window.",
            options: [
                "When the lift broke down, we were able to get out through a window.",
                "When the lift broke down, we could get out through a window.",
                "When the lift broke down, we can get out through a window.",
                "When the lift broke down, we are able to get out through a window.",
            ],
            optionExplanations: {
                "When the lift broke down, we were able to get out through a window.": "Correct! A single specific event needs 'were able to', not 'could'.",
                "When the lift broke down, we could get out through a window.": "Wrong. 'Could' doesn't work for one specific achievement in the past.",
                "When the lift broke down, we can get out through a window.": "Wrong. 'Can' is present tense, but the whole sentence describes the past.",
                "When the lift broke down, we are able to get out through a window.": "Wrong. 'Are able to' is present tense, but the whole sentence describes the past.",
            },
        },
    },

    // ===== WORD TRANSFORM QUESTIONS (6 questions) =====

    {
        id: "cba-wt-1",
        topic: "can-could-be-able-to",
        type: "word-transform",
        difficulty: "beginner",
        sentence: "He ___ (be) able to speak Japanese fluently.",
        grammarRule: "'be able to' — Present Simple (is able to)",
        explanation: "'Be able to' means the same as 'can' for present ability. It conjugates like an ordinary verb — 'is' for he/she/it.",
        tip: "can = is/am/are able to (present ability, same meaning).",
        wordTransform: {
            baseWord: "be",
            correctAnswer: "is",
        },
    },

    {
        id: "cba-wt-2",
        topic: "can-could-be-able-to",
        type: "word-transform",
        difficulty: "beginner",
        sentence: "I ___ (be) able to type very fast.",
        grammarRule: "'be able to' — Present Simple (am able to)",
        explanation: "'Be able to' changes form for each subject, just like an ordinary verb — 'am' for I.",
        tip: "I can / I am able to — the same meaning, different grammar.",
        wordTransform: {
            baseWord: "be",
            correctAnswer: "am",
        },
    },

    {
        id: "cba-wt-3",
        topic: "can-could-be-able-to",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "They ___ (be) able to finish the marathon together.",
        grammarRule: "'be able to' — Past Simple, General Ability (were able to)",
        explanation: "'Was/were able to' describes a general ability in the past, just like 'could'.",
        tip: "could = was/were able to (general ability in the past).",
        wordTransform: {
            baseWord: "be",
            correctAnswer: "were",
        },
    },

    {
        id: "cba-wt-4",
        topic: "can-could-be-able-to",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "After a lot of effort, she finally ___ (be) able to open the stuck window.",
        grammarRule: "'was able to' — Specific Past Achievement",
        explanation: "For ONE specific success in the past, we must use 'was/were able to' — NOT 'could'.",
        tip: "'could' is WRONG for a single past achievement — use was/were able to instead.",
        wordTransform: {
            baseWord: "be",
            correctAnswer: "was",
        },
    },

    {
        id: "cba-wt-5",
        topic: "can-could-be-able-to",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "He ___ (be) able to attend the meeting because he's abroad this week.",
        grammarRule: "'be able to' — Negative Present (isn't able to)",
        explanation: "The negative of 'be able to' in the present changes like an ordinary verb: 'isn't able to' for he/she/it.",
        tip: "can't = isn't/aren't able to (present inability, same meaning).",
        wordTransform: {
            baseWord: "be",
            correctAnswer: "isn't",
            alternativeAnswers: ["is not"],
        },
    },

    {
        id: "cba-wt-6",
        topic: "can-could-be-able-to",
        type: "word-transform",
        difficulty: "advanced",
        sentence: "We ___ (be) able to contact her yesterday because her phone was off.",
        grammarRule: "'be able to' — Negative Past (weren't able to)",
        explanation: "The negative of 'be able to' in the past can describe even a single occasion — unlike the affirmative, there's no restriction on 'couldn't'/'weren't able to' here.",
        tip: "couldn't = wasn't/weren't able to — both work for a single past occasion too.",
        wordTransform: {
            baseWord: "be",
            correctAnswer: "weren't",
            alternativeAnswers: ["were not"],
        },
    },
];

export const canCouldBeAbleToTopic: GrammarTopic = {
    id: "can-could-be-able-to",
    level: "B1",
    name: "Can, Could, Be Able To",
    description: "Learn how to talk about ability in the present and past using can, could and be able to — including the key rule for describing one specific past achievement.",
    lesson: "Lesson 8A",
    icon: "💪",
    cards: [
        {
            id: "cba-card-1",
            rule: "can — present ability (general)",
            example: "My sister ___ speak Spanish really well.",
            answer: "can",
            explanation: "Can describes a general ability in the present. We use can + the base form of the verb, with no 'to'.",
            examples: ["He can cook amazing Italian food.", "We can start the meeting whenever you're ready."],
            ua: "can = «можу» (здатність зараз); після can дієслово без to.",
        },
        {
            id: "cba-card-2",
            rule: "can't — present inability",
            example: "He ___ swim, so he's having lessons this summer.",
            answer: "can't",
            explanation: "Can't is the negative of can. It shows someone is unable to do something now, or as a general ability.",
            examples: ["I can't drive — I never learned.", "She can't come to the party tonight."],
            ua: "can't = «не можу» (зараз, загалом).",
        },
        {
            id: "cba-card-3",
            rule: "could — past ability (general)",
            example: "When I was ten, I ___ climb trees really quickly.",
            answer: "could",
            explanation: "Could describes a general ability someone had in the past, over a period of time — not one single occasion.",
            examples: ["My grandmother could speak four languages.", "We could see the mountains from our old house."],
            ua: "could = «міг/могла» — загальна здатність у минулому, не одноразова подія.",
        },
        {
            id: "cba-card-4",
            rule: "couldn't — past inability",
            example: "I ___ understand the instructions, so I asked for help.",
            answer: "couldn't",
            explanation: "Couldn't is the negative of could. Unlike could, it can describe BOTH a general past inability AND a single occasion in the past.",
            examples: ["He couldn't swim when he was a child.", "We couldn't find the restaurant last night."],
            ua: "couldn't = «не міг» — і загалом, і в один конкретний момент.",
        },
        {
            id: "cba-card-5",
            rule: "be able to — present ability",
            example: "She ___ (be) able to fix almost any computer problem.",
            answer: "is",
            explanation: "Be able to means the same as can for present ability. It changes form like a normal verb: I am able to, she is able to, they are able to.",
            examples: ["We are able to help you with that today.", "I'm not able to come to the meeting this morning."],
            ua: "be able to ≈ can (зараз); змінюється як звичайне дієслово: is/am/are able to.",
        },
        {
            id: "cba-card-6",
            rule: "was/were able to — past ability (general)",
            example: "My parents ___ (be) able to speak three languages between them.",
            answer: "were",
            explanation: "Was/were able to means the same as could for a general ability in the past.",
            examples: ["He was able to read before he started school.", "They were able to ski really well as children."],
            ua: "was/were able to ≈ could (загальна здатність у минулому).",
        },
        {
            id: "cba-card-7",
            rule: "was/were able to — one specific past success (not could)",
            example: "The car broke down, but we ___ (be) able to fix it ourselves.",
            answer: "were",
            explanation: "For ONE specific achievement in the past — something that happened on one occasion — we must use was/were able to. We do NOT use could here.",
            examples: ["After a long search, she was able to find her lost ring.", "The team was able to win the final despite the rain."],
            ua: "для однієї конкретної перемоги в минулому — тільки was/were able to, НЕ could.",
        },
        {
            id: "cba-card-8",
            rule: "questions: Can / Could / Were ... able to",
            example: "___ you able to finish the report on time yesterday?",
            answer: "Were",
            explanation: "In questions, we ask Can...? for the present, Could...? for a general past ability, and Were you able to...? especially for one specific past occasion.",
            examples: ["Can you speak German?", "Could you swim when you were young?"],
            ua: "питання: Can...? (зараз), Could...? (загалом у минулому), Were able to...? (один випадок).",
        },
    ],
    rules: canCouldBeAbleToQuestions,
};

export default canCouldBeAbleToQuestions;
