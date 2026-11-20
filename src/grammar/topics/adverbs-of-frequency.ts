/**
 * EnglishPusher Grammar Testing - Adverbs of Frequency
 * B1 Level (Speak Out) - Lesson 3
 *
 * 6 gap-fill, 6 error-spot, 7 multiple-choice, 6 word-transform = 25 questions
 * VERIFIED: All error-spot indexes checked against split(" ") positions.
 */

import type { GrammarQuestion, GrammarTopic } from "../types.ts";

export const adverbsOfFrequency: GrammarQuestion[] = [

    // ===== GAP FILL QUESTIONS (6 questions) =====

    {
        id: "aof-gap-1",
        topic: "adverbs-of-frequency",
        type: "gap-fill",
        difficulty: "beginner",
        sentence: "She ___ arrives at the office before 9 a.m.",
        grammarRule: "Adverb of Frequency — Before the Main Verb",
        explanation: "Adverbs of frequency go BEFORE the main verb (except 'to be'). 'Always' sits between the subject 'She' and the verb 'arrives'.",
        tip: "Subject + adverb + main verb: She always arrives, He never eats, They usually walk.",
        gapFill: {
            gapIndex: 1,
            correctAnswer: "always",
            options: ["always", "is always", "always is", "be always"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "aof-gap-2",
        topic: "adverbs-of-frequency",
        type: "gap-fill",
        difficulty: "beginner",
        sentence: "Our classroom is ___ very noisy before lessons start.",
        grammarRule: "Adverb of Frequency — After 'To Be'",
        explanation: "When the main verb is 'to be', the adverb comes AFTER it. Structure: Subject + be + adverb.",
        tip: "After 'to be': She is always ready, He is never late, They are usually tired.",
        gapFill: {
            gapIndex: 3,
            correctAnswer: "usually",
            options: ["usually", "usually is", "is usually", "usually be"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "aof-gap-3",
        topic: "adverbs-of-frequency",
        type: "gap-fill",
        difficulty: "beginner",
        sentence: "I go swimming ___ a week to stay fit.",
        grammarRule: "Definite Frequency — Twice",
        explanation: "For 'two times', always use 'twice'. 'Two times a week' is non-standard in everyday English.",
        tip: "One time = once. Two times = twice. Three or more = three times, four times, etc.",
        gapFill: {
            gapIndex: 3,
            correctAnswer: "twice",
            options: ["twice", "two times", "two", "second"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "aof-gap-4",
        topic: "adverbs-of-frequency",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "You should ___ read the instructions before using the machine.",
        grammarRule: "Adverb of Frequency — With Auxiliary Verbs",
        explanation: "With modal auxiliaries (should, must, can, will, etc.), the adverb goes BETWEEN the auxiliary and the main verb.",
        tip: "Subject + auxiliary + adverb + main verb: You should always check, She can sometimes help.",
        gapFill: {
            gapIndex: 2,
            correctAnswer: "always",
            options: ["always", "is always", "always is", "be always"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "aof-gap-5",
        topic: "adverbs-of-frequency",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "The team meets ___ a month to review progress.",
        grammarRule: "Definite Frequency — Once",
        explanation: "For 'one time', use 'once'. Say 'once a month', not 'one time a month'.",
        tip: "One time = once. Use 'once a week/month/year' for regular activities.",
        gapFill: {
            gapIndex: 3,
            correctAnswer: "once",
            options: ["once", "one time", "one", "first"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "aof-gap-6",
        topic: "adverbs-of-frequency",
        type: "gap-fill",
        difficulty: "advanced",
        sentence: "He ___ complains about anything, even when things go wrong.",
        grammarRule: "Hardly Ever — Used with Positive Verbs",
        explanation: "'Hardly ever' is already negative in meaning, so it must be used with a POSITIVE verb form. Never add 'don't/doesn't'.",
        tip: "Negative adverbs (never, hardly ever, seldom) + positive verb: He never complains, She hardly ever misses.",
        gapFill: {
            gapIndex: 1,
            correctAnswer: "hardly ever",
            options: ["hardly ever", "doesn't hardly ever", "hardly ever doesn't", "hardly"],
            correctOptionIndex: 0,
        },
    },

    // ===== ERROR SPOT QUESTIONS (6 questions) =====
    // RULE: Every error is exactly ONE word. Replacing wrongWord with correction
    // must produce a 100% grammatically correct sentence with no leftover errors.

    // split(" ") → [0=Is, 1=she, 2=usually, 3=cook, 4=dinner, 5=for, 6=the, 7=family?]
    // words[0]="Is" ✅  corrected: "Does she usually cook dinner for the family?" ✅
    {
        id: "aof-error-1",
        topic: "adverbs-of-frequency",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "Is she usually cook dinner for the family?",
        grammarRule: "Frequency Adverbs in Yes/No Questions — Do/Does",
        explanation: "For action verbs with he/she/it, use 'Does' in questions, not 'Is'. 'Is' is only used with the verb 'to be'.",
        errorSpot: {
            errorWordIndex: 0,
            wrongWord: "Is",
            correction: "Does",
            reason: "'Cook' is an action verb, so use 'Does' for he/she/it questions: 'Does she usually cook?' not 'Is she usually cook?'",
            correctionOptions: ["Does", "Is", "Are", "Do"],
        },
    },

    // split(" ") → [0=He, 1=always, 2=arrive, 3=early, 4=to, 5=the, 6=morning, 7=meeting.]
    // words[2]="arrive" ✅  corrected: "He always arrives early to the morning meeting." ✅
    {
        id: "aof-error-2",
        topic: "adverbs-of-frequency",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "He always arrive early to the morning meeting.",
        grammarRule: "Subject-Verb Agreement with Frequency Adverbs",
        explanation: "Frequency adverbs don't change the verb agreement rule. Third-person singular (he/she/it) still needs -s on the verb.",
        errorSpot: {
            errorWordIndex: 2,
            wrongWord: "arrive",
            correction: "arrives",
            reason: "'He' = third person singular → needs 'arrives'. Frequency adverbs don't affect subject-verb agreement.",
            correctionOptions: ["arrives", "arrive", "is arriving", "arrived"],
        },
    },

    // split(" ") → [0=She, 1=calls, 2=her, 3=mother, 4=twice, 5=the, 6=week.]
    // words[5]="the" ✅  corrected: "She calls her mother twice a week." ✅
    {
        id: "aof-error-3",
        topic: "adverbs-of-frequency",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "She calls her mother twice the week.",
        grammarRule: "Definite Frequency — Indefinite Article 'A'",
        explanation: "Frequency expressions use the indefinite article 'a', not 'the'. Say 'twice a week', 'once a month', 'three times a year'.",
        errorSpot: {
            errorWordIndex: 5,
            wrongWord: "the",
            correction: "a",
            reason: "Use 'a' (not 'the') in frequency expressions: twice a week, once a month, three times a year.",
            correctionOptions: ["a", "the", "per", "in"],
        },
    },

    // split(" ") → [0=He, 1=is, 2=seldomly, 3=on, 4=time, 5=for, 6=appointments.]
    // words[2]="seldomly" ✅  corrected: "He is seldom on time for appointments." ✅
    {
        id: "aof-error-4",
        topic: "adverbs-of-frequency",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "He is seldomly on time for appointments.",
        grammarRule: "Adverb Form — Seldom",
        explanation: "'Seldom' is already an adverb. Adding '-ly' creates a non-existent word. Use 'seldom', not 'seldomly'.",
        errorSpot: {
            errorWordIndex: 2,
            wrongWord: "seldomly",
            correction: "seldom",
            reason: "'Seldom' is an adverb on its own — no '-ly' needed. It also goes AFTER 'is' (to be).",
            correctionOptions: ["seldom", "seldomly", "often", "usually"],
        },
    },

    // split(" ") → [0=My, 1=brother, 2=rarely, 3=watch, 4=TV, 5=in, 6=the, 7=evenings.]
    // words[3]="watch" ✅  corrected: "My brother rarely watches TV in the evenings." ✅
    {
        id: "aof-error-5",
        topic: "adverbs-of-frequency",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "My brother rarely watch TV in the evenings.",
        grammarRule: "Subject-Verb Agreement — Rarely",
        explanation: "The adverb 'rarely' doesn't change the agreement rule. 'My brother' = he → third person singular → needs 'watches'.",
        errorSpot: {
            errorWordIndex: 3,
            wrongWord: "watch",
            correction: "watches",
            reason: "'My brother' = he → third person singular → 'watches'. The adverb 'rarely' doesn't affect this.",
            correctionOptions: ["watches", "watch", "is watching", "watched"],
        },
    },

    // split(" ") → [0=The, 1=doctor, 2=told, 3=me, 4=to, 5=take, 6=this, 7=pill, 8=three, 9=times, 10=of, 11=day.]
    // words[10]="of" ✅  corrected: "The doctor told me to take this pill three times a day." ✅
    {
        id: "aof-error-6",
        topic: "adverbs-of-frequency",
        type: "error-spot",
        difficulty: "advanced",
        sentence: "The doctor told me to take this pill three times of day.",
        grammarRule: "Definite Frequency — 'Times A Day'",
        explanation: "The structure is 'number + times + a + time period'. Use 'a day', not 'of day'.",
        errorSpot: {
            errorWordIndex: 10,
            wrongWord: "of",
            correction: "a",
            reason: "Use 'a' before the time period: three times a day, four times a week, twice a year.",
            correctionOptions: ["a", "of", "in", "per"],
        },
    },

    // ===== MULTIPLE CHOICE QUESTIONS (7 questions) =====

    {
        id: "aof-mc-1",
        topic: "adverbs-of-frequency",
        type: "multiple-choice",
        difficulty: "beginner",
        sentence: "Choose the sentence with the correct adverb position:",
        grammarRule: "Adverb of Frequency — Before the Main Verb",
        explanation: "Adverbs of frequency go BEFORE the main verb. 'Usually' must come between the subject 'She' and the verb 'works'.",
        tip: "Subject + adverb + main verb: She usually works, He often travels, They always eat.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "She usually works from home on Fridays.",
            options: [
                "She usually works from home on Fridays.",
                "She works usually from home on Fridays.",
                "She works from home usually on Fridays.",
                "She works from home on usually Fridays.",
            ],
            optionExplanations: {
                "She usually works from home on Fridays.": "Correct! Adverb 'usually' goes before the main verb 'works'.",
                "She works usually from home on Fridays.": "Wrong. 'Usually' must come BEFORE the main verb, not after it.",
                "She works from home usually on Fridays.": "Wrong. Adverbs of frequency don't go between the place and time expressions.",
                "She works from home on usually Fridays.": "Wrong. The adverb goes before the main verb, not before the time expression.",
            },
        },
    },

    {
        id: "aof-mc-2",
        topic: "adverbs-of-frequency",
        type: "multiple-choice",
        difficulty: "beginner",
        sentence: "Choose the sentence with the correct position of 'always':",
        grammarRule: "Adverb of Frequency — After 'To Be'",
        explanation: "When the verb is 'to be' (am/is/are), the adverb comes AFTER it. Structure: Subject + be + adverb + rest.",
        tip: "After 'to be': My boss is always organised, She is never late, We are usually tired.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "My boss is always very organised.",
            options: [
                "My boss is always very organised.",
                "My boss always is very organised.",
                "Always my boss is very organised.",
                "My boss very organised is always.",
            ],
            optionExplanations: {
                "My boss is always very organised.": "Correct! 'Always' comes AFTER the verb 'is'.",
                "My boss always is very organised.": "Wrong. With 'to be', the adverb must come AFTER 'is', not before it.",
                "Always my boss is very organised.": "Wrong. 'Always' cannot go at the beginning of a sentence.",
                "My boss very organised is always.": "Wrong. The word order is completely incorrect.",
            },
        },
    },

    {
        id: "aof-mc-3",
        topic: "adverbs-of-frequency",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Which adverb CAN be placed at the beginning of a sentence for emphasis?",
        grammarRule: "Adverb Position — Beginning of Sentence",
        explanation: "Some adverbs can go at the start for emphasis: usually, normally, often, frequently, sometimes, occasionally. Others CANNOT start a sentence: always, seldom, rarely, hardly ever, never.",
        tip: "Can start a sentence: sometimes, usually, often, occasionally. Cannot: always, never, seldom, rarely.",
        multipleChoice: {
            question: "Which word can correctly start a sentence?",
            correctOption: "Sometimes",
            options: ["Sometimes", "Never", "Always", "Seldom"],
            optionExplanations: {
                "Sometimes": "Correct! 'Sometimes' can go at the beginning: 'Sometimes I skip lunch.'",
                "Never": "Wrong. 'Never' cannot go at the start of a statement.",
                "Always": "Wrong. 'Always' cannot go at the start of a statement.",
                "Seldom": "Wrong. 'Seldom' cannot go at the start of a statement.",
            },
        },
    },

    {
        id: "aof-mc-4",
        topic: "adverbs-of-frequency",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the sentence that correctly uses 'hardly ever':",
        grammarRule: "Hardly Ever — With Positive Verbs",
        explanation: "'Hardly ever' is already negative in meaning, so it must be used with a POSITIVE verb. Never combine it with 'don't/doesn't'.",
        tip: "Hardly ever + positive verb: She hardly ever misses class. Never: She hardly ever doesn't miss class.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "She hardly ever misses a lesson.",
            options: [
                "She hardly ever misses a lesson.",
                "She hardly ever doesn't miss a lesson.",
                "She doesn't hardly ever miss a lesson.",
                "She is hardly ever miss a lesson.",
            ],
            optionExplanations: {
                "She hardly ever misses a lesson.": "Correct! 'Hardly ever' + positive verb 'misses'.",
                "She hardly ever doesn't miss a lesson.": "Wrong. 'Hardly ever' + negative verb = double negative.",
                "She doesn't hardly ever miss a lesson.": "Wrong. Double negative — 'hardly ever' already carries a negative meaning.",
                "She is hardly ever miss a lesson.": "Wrong. After 'is' you need an adjective, not a base verb.",
            },
        },
    },

    {
        id: "aof-mc-5",
        topic: "adverbs-of-frequency",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the correct 'How often' question:",
        grammarRule: "How Often — Question Form",
        explanation: "'How often' is used to ask about frequency. Structure: How often + do/does + subject + base verb?",
        tip: "How often do you...? How often does she...? How often are you...? (with 'to be')",
        multipleChoice: {
            question: "Which question is correctly formed?",
            correctOption: "How often do you exercise?",
            options: [
                "How often do you exercise?",
                "How often you do exercise?",
                "How often are you exercise?",
                "How often does you exercise?",
            ],
            optionExplanations: {
                "How often do you exercise?": "Correct! Structure: How often + do + you + base verb.",
                "How often you do exercise?": "Wrong. The auxiliary 'do' must come before the subject: 'do you'.",
                "How often are you exercise?": "Wrong. Use 'do' (not 'are') with action verbs like 'exercise'.",
                "How often does you exercise?": "Wrong. 'Does' is for he/she/it. With 'you', use 'do'.",
            },
        },
    },

    {
        id: "aof-mc-6",
        topic: "adverbs-of-frequency",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the sentence with the correct adverb position with a modal verb:",
        grammarRule: "Adverb of Frequency — With Auxiliary Verbs",
        explanation: "With modal auxiliaries (should, can, must, will, etc.), the adverb goes BETWEEN the modal and the main verb.",
        tip: "Modal + adverb + main verb: You should always check. She can sometimes help. They must never lie.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "You should always check your work before submitting.",
            options: [
                "You should always check your work before submitting.",
                "You always should check your work before submitting.",
                "You should check always your work before submitting.",
                "Always you should check your work before submitting.",
            ],
            optionExplanations: {
                "You should always check your work before submitting.": "Correct! Adverb between modal 'should' and main verb 'check'.",
                "You always should check your work before submitting.": "Wrong. The adverb goes AFTER the modal, not before it.",
                "You should check always your work before submitting.": "Wrong. The adverb goes BEFORE the main verb, not after it.",
                "Always you should check your work before submitting.": "Wrong. 'Always' cannot go at the start of a sentence.",
            },
        },
    },

    {
        id: "aof-mc-7",
        topic: "adverbs-of-frequency",
        type: "multiple-choice",
        difficulty: "advanced",
        sentence: "Choose the correct Yes/No question with a frequency adverb:",
        grammarRule: "Frequency Adverbs in Yes/No Questions",
        explanation: "In Yes/No questions, the adverb goes after the subject: Does/Do + subject + adverb + main verb?",
        tip: "Questions: Does she usually cook? Do you often travel? Are you always late? (with 'to be')",
        multipleChoice: {
            question: "Which question is correct?",
            correctOption: "Does she usually cook dinner?",
            options: [
                "Does she usually cook dinner?",
                "Does usually she cook dinner?",
                "Does she cook usually dinner?",
                "Usually does she cook dinner?",
            ],
            optionExplanations: {
                "Does she usually cook dinner?": "Correct! Structure: Does + she (subject) + usually (adverb) + cook (verb).",
                "Does usually she cook dinner?": "Wrong. 'Usually' must come after the subject 'she', not before it.",
                "Does she cook usually dinner?": "Wrong. 'Usually' must come before the main verb 'cook', not after it.",
                "Usually does she cook dinner?": "Wrong. 'Usually' can start a statement, but not a question beginning with 'Does'.",
            },
        },
    },

    // ===== WORD TRANSFORM QUESTIONS (6 questions) =====

    {
        id: "aof-reorder-1",
        topic: "adverbs-of-frequency",
        type: "word-transform",
        difficulty: "beginner",
        sentence: "She ___ has a salad for lunch.",
        grammarRule: "Adverb Form — Usual → Usually",
        explanation: "Add '-ly' to 'usual' to form the adverb 'usually' (90%). Adverbs of frequency go before the main verb.",
        tip: "Adjective → adverb: usual → usually, normal → normally, general → generally.",
        wordTransform: {
            baseWord: "usual",
            correctAnswer: "usually",
        },
    },

    {
        id: "aof-reorder-2",
        topic: "adverbs-of-frequency",
        type: "word-transform",
        difficulty: "beginner",
        sentence: "He ___ travels abroad for work.",
        grammarRule: "Adverb Form — Frequent → Frequently",
        explanation: "Add '-ly' to 'frequent' to form 'frequently' (70%). It means the same as 'often'.",
        tip: "Frequent → frequently. About 70% of the time — several times a week.",
        wordTransform: {
            baseWord: "frequent",
            correctAnswer: "frequently",
        },
    },

    {
        id: "aof-reorder-3",
        topic: "adverbs-of-frequency",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "She ___ loses her temper, even under pressure.",
        grammarRule: "Adverb Form — Rare → Rarely",
        explanation: "Add '-ly' to 'rare' to form 'rarely' (5%). It means the same as 'hardly ever'.",
        tip: "Rare → rarely. About 5% of the time — almost never. Use with a positive verb.",
        wordTransform: {
            baseWord: "rare",
            correctAnswer: "rarely",
        },
    },

    {
        id: "aof-reorder-4",
        topic: "adverbs-of-frequency",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "We ___ eat out at a restaurant on weekends.",
        grammarRule: "Adverb Form — Occasional → Occasionally",
        explanation: "Add '-ly' to 'occasional' to form 'occasionally' (30%). It means 'sometimes, but not often'.",
        tip: "Occasional → occasionally. About 30% of the time — now and then.",
        wordTransform: {
            baseWord: "occasional",
            correctAnswer: "occasionally",
        },
    },

    {
        id: "aof-reorder-5",
        topic: "adverbs-of-frequency",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "He ___ wakes up before 7 a.m.",
        grammarRule: "Adverb Form — General → Generally",
        explanation: "Add '-ly' to 'general' to form 'generally' (80%). It means 'in most cases' — similar to 'normally'.",
        tip: "General → generally. About 80% of the time — as a rule, in most situations.",
        wordTransform: {
            baseWord: "general",
            correctAnswer: "generally",
        },
    },

    {
        id: "aof-reorder-6",
        topic: "adverbs-of-frequency",
        type: "word-transform",
        difficulty: "advanced",
        sentence: "She ___ finishes work at 6 p.m., but today she stayed until 8.",
        grammarRule: "Adverb Form — Normal → Normally",
        explanation: "Add '-ly' to 'normal' to form 'normally' (80%). It signals the usual routine, often used to contrast with an exception.",
        tip: "Normal → normally. Great for contrasts: 'She normally does X, but today...'",
        wordTransform: {
            baseWord: "normal",
            correctAnswer: "normally",
        },
    },
];

export const adverbsOfFrequencyTopic: GrammarTopic = {
    id: "adverbs-of-frequency",
    level: "B1",
    name: "Adverbs of Frequency",
    description: "Master adverbs of frequency (always, usually, often, sometimes, never) and their position in sentences. Learn once/twice, definite frequency phrases like 'three times a week', and how to avoid double negatives.",
    lesson: "Lesson 3",
    icon: "🔁",
    cards: [
      {
        id: "aof-card-1",
        rule: "adverb + main verb",
        example: "Tom has a coffee after lunch every day, without exception. He ___ has a coffee after lunch.",
        answer: "always",
        explanation: "Adverbs of frequency usually go before the main verb. Put them between the subject and the verb: I never smoke, she often travels.",
        examples: ["We sometimes eat at the market on Saturdays.", "My manager rarely replies to emails after six."],
        ua: "Прислівник частоти — перед дієсловом: «Я завжди п'ю чай» — I always drink tea.",
      },
      {
        id: "aof-card-2",
        rule: "he / she / it + adverb + verb-s",
        example: "I always walk to work, and my brother always ___ to work too.",
        answer: "walks",
        explanation: "Frequency adverbs do not change the verb. With he, she and it the main verb still takes -s: she usually leaves, he never calls.",
        examples: ["Our teacher usually comes five minutes early.", "The shop rarely closes before eight o'clock."],
        ua: "Прислівник не змінює правила: he / she / it + дієслово з -s. «Вона завжди сміється» — She always laughs.",
      },
      {
        id: "aof-card-3",
        rule: "be + adverb of frequency",
        example: "The train is on time every single day of the year. It is ___ late.",
        answer: "never",
        explanation: "With the verb be (am, is, are, was, were), the adverb comes after it: we are usually busy, they are never late.",
        examples: ["My neighbours are usually very quiet at night.", "I am often tired after a long shift."],
        ua: "З be прислівник стоїть після нього: «Вона завжди вдома» — She is always at home.",
      },
      {
        id: "aof-card-4",
        rule: "modal / auxiliary + adverb + main verb",
        example: "On this building site you must ___ wear a helmet, without exception.",
        answer: "always",
        explanation: "With can, must, should, will or have, the adverb goes after the auxiliary and before the main verb: you can sometimes park here, I have never been to Rome.",
        examples: ["She can sometimes work from home on Fridays.", "I have never tried Japanese food."],
        ua: "Після can, must, have — перед смисловим дієсловом: I have never tried — «я ніколи не пробував».",
      },
      {
        id: "aof-card-5",
        rule: "hardly ever / rarely / seldom + positive verb",
        example: "We see my uncle about once every five years. We hardly ___ see him.",
        answer: "ever",
        explanation: "Hardly ever, rarely and seldom already mean almost never. Use them with a positive verb. Never add don't or doesn't.",
        examples: ["Our manager rarely works at weekends.", "I hardly ever eat dessert in the evening."],
        ua: "Українською: «майже ніколи не їм». Англійською без don't: I hardly ever eat.",
      },
      {
        id: "aof-card-6",
        rule: "once / twice / three times a week",
        example: "I water the plants on Monday, Wednesday and Friday, so I water them ___ a week.",
        answer: "three times",
        explanation: "Say once for one and twice for two. After that, use number + times: three times, four times. Use a (not the) before the period: once a week, twice a year.",
        examples: ["She goes to her Spanish class once a week.", "My brother visits our parents twice a year."],
        ua: "Раз — once, два — twice, далі three times. «Двічі на тиждень» — twice a week.",
      },
      {
        id: "aof-card-7",
        rule: "How often + do / does + subject + verb?",
        example: "A: ___ do you go to the dentist? B: Every six months.",
        answer: "How often",
        explanation: "Use How often to ask about frequency. After it, use the normal question form: how often + do/does + subject + verb. With be: how often are you...?",
        examples: ["How often does your train run in the evening?", "How often are you late for work?"],
        ua: "How often...? — «Як часто...?» Відповідь: every day, twice a week, never.",
      },
      {
        id: "aof-card-8",
        rule: "Do / Does + subject + adverb + verb",
        example: "___ your sister often visit you at weekends?",
        answer: "Does",
        explanation: "In questions the adverb goes after the subject and before the main verb. Use Do or Does with action verbs. With be, the adverb also comes after the subject: Are you always this busy?",
        examples: ["Do you often work late on Fridays?", "Are your neighbours always this noisy?"],
        ua: "У питанні прислівник — після підмета: Do you often travel? — «Ти часто подорожуєш?»",
      },
      {
        id: "aof-card-9",
        rule: "never + positive verb (no don't)",
        example: "I'm allergic to nuts, so I ___ (never / don't never) eat them.",
        answer: "never",
        explanation: "Never already makes the sentence negative, so the verb stays positive: I never eat, not I don't never eat.",
        examples: ["My father never drinks coffee after six.", "We never watch TV during dinner."],
        ua: "Українською «я ніколи не їм», англійською одне заперечення: I never eat, а не «I don't never eat».",
      },
    ],
    rules: adverbsOfFrequency,
};

export default adverbsOfFrequency;
