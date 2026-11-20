/**
 * EnglishPusher Grammar Testing - Present Perfect + for, since and yet
 * B1 Level (Speak Out) - Lesson 6D
 *
 * 6 gap-fill, 6 error-spot, 7 multiple-choice, 6 word-transform = 25 questions
 * VERIFIED: All error-spot indexes checked against split(" ") positions.
 */

import type { GrammarQuestion, GrammarTopic } from "../types.ts";

export const presentPerfectForSinceYet: GrammarQuestion[] = [

    // ===== GAP FILL QUESTIONS (6 questions) =====

    {
        id: "ppfsy-gap-1",
        topic: "present-perfect-for-since-yet",
        type: "gap-fill",
        difficulty: "beginner",
        sentence: "I've lived in this town ___ I was born.",
        grammarRule: "Since + Clause — Point When Something Started",
        explanation: "'Since' introduces the specific point in the past when something started — here, the clause 'I was born'. Living here started then and is still true now.",
        tip: "since + a point in time or a clause (since 2016 / since I was born) — not a length of time.",
        gapFill: {
            gapIndex: 5,
            correctAnswer: "since",
            options: ["since", "for", "yet", "ago"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "ppfsy-gap-2",
        topic: "present-perfect-for-since-yet",
        type: "gap-fill",
        difficulty: "beginner",
        sentence: "We haven't seen each other ___ a few months.",
        grammarRule: "For + Duration — Length of Time",
        explanation: "'For' is used with a period of time — how long something has (or hasn't) continued. 'A few months' is a length of time, not a point.",
        tip: "for + a length of time (for two years / for a few months). since + a point in time.",
        gapFill: {
            gapIndex: 5,
            correctAnswer: "for",
            options: ["for", "since", "yet", "ago"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "ppfsy-gap-3",
        topic: "present-perfect-for-since-yet",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "Has the bus arrived ___?",
        grammarRule: "Yet in Questions — Up to Now",
        explanation: "'Yet' asks about 'any time up to now' in questions. It usually comes at the end of the question.",
        tip: "Yet in questions = has it happened by now? It goes at the end: Have you finished yet?",
        gapFill: {
            gapIndex: 4,
            correctAnswer: "yet",
            options: ["yet", "since", "for", "already"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "ppfsy-gap-4",
        topic: "present-perfect-for-since-yet",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "My parents have run their own shop ___ 2015.",
        grammarRule: "Since + Year — Point When Something Started",
        explanation: "'Since' is used with a specific year (or date) when a situation began and is still true now. '2015' is the starting point, not a duration.",
        tip: "since + a specific point (a year, a day, an event): since 2015, since Monday, since the meeting.",
        gapFill: {
            gapIndex: 7,
            correctAnswer: "since",
            options: ["since", "for", "yet", "ago"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "ppfsy-gap-5",
        topic: "present-perfect-for-since-yet",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "I haven't tried that new café ___.",
        grammarRule: "Yet in Negatives — Expected Soon",
        explanation: "'Yet' in a negative sentence shows that something hasn't happened up to now, but we expect it to happen soon.",
        tip: "haven't/hasn't + past participle + yet = it hasn't happened, but it probably will.",
        gapFill: {
            gapIndex: 6,
            correctAnswer: "yet",
            options: ["yet", "since", "for", "still"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "ppfsy-gap-6",
        topic: "present-perfect-for-since-yet",
        type: "gap-fill",
        difficulty: "advanced",
        sentence: "They've been waiting ___ three hours, and the delivery still hasn't arrived.",
        grammarRule: "For + Duration — Advanced Contrast with During",
        explanation: "'For' tells us the length of time ('three hours'). 'During' is used before a noun to say when something happens within a period, not how long — so it doesn't fit here.",
        tip: "for + a number of hours/days/years. During + a specific event or period (during the meeting), not a duration.",
        gapFill: {
            gapIndex: 3,
            correctAnswer: "for",
            options: ["for", "since", "yet", "during"],
            correctOptionIndex: 0,
        },
    },

    // ===== ERROR SPOT QUESTIONS (6 questions) =====
    // RULE: Every error is exactly ONE word. Replacing wrongWord with
    // correction must produce a 100% grammatically correct sentence with no leftover errors.

    // split(" ") → [0=I've, 1=worked, 2=here, 3=for, 4=2020.]
    // words[3]="for" ✅  corrected: "I've worked here since 2020." ✅
    {
        id: "ppfsy-error-1",
        topic: "present-perfect-for-since-yet",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "I've worked here for 2020.",
        grammarRule: "For vs Since — Duration vs Point",
        explanation: "'2020' is a specific point in time, not a length of time, so it needs 'since', not 'for'.",
        errorSpot: {
            errorWordIndex: 3,
            wrongWord: "for",
            correction: "since",
            reason: "'2020' is a point in time → use 'since': 'I've worked here since 2020.'",
            correctionOptions: ["since", "for", "yet", "ago"],
        },
    },

    // split(" ") → [0=She, 1=has, 2=lived, 3=in, 4=Spain, 5=since, 6=eight, 7=years.]
    // words[5]="since" ✅  corrected: "She has lived in Spain for eight years." ✅
    {
        id: "ppfsy-error-2",
        topic: "present-perfect-for-since-yet",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "She has lived in Spain since eight years.",
        grammarRule: "Since vs For — Point vs Duration",
        explanation: "'Eight years' is a length of time, not a starting point, so it needs 'for', not 'since'.",
        errorSpot: {
            errorWordIndex: 5,
            wrongWord: "since",
            correction: "for",
            reason: "'Eight years' is a duration → use 'for': 'She has lived in Spain for eight years.'",
            correctionOptions: ["for", "since", "yet", "ago"],
        },
    },

    // split(" ") → [0=She, 1=have, 2=lived, 3=in, 4=Tokyo, 5=since, 6=2018.]
    // words[1]="have" ✅  corrected: "She has lived in Tokyo since 2018." ✅
    {
        id: "ppfsy-error-3",
        topic: "present-perfect-for-since-yet",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "She have lived in Tokyo since 2018.",
        grammarRule: "Present Perfect + Since — Subject-Verb Agreement",
        explanation: "With 'she' (third person singular), the present perfect auxiliary is 'has', not 'have'.",
        errorSpot: {
            errorWordIndex: 1,
            wrongWord: "have",
            correction: "has",
            reason: "Third person singular needs 'has': 'She has lived in Tokyo since 2018.'",
            correctionOptions: ["has", "have", "is", "was"],
        },
    },

    // split(" ") → [0=I, 1=have, 2=yet, 3=eaten, 4=lunch.]
    // words[2]="yet" ✅  corrected: "I have already eaten lunch." ✅
    {
        id: "ppfsy-error-4",
        topic: "present-perfect-for-since-yet",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "I have yet eaten lunch.",
        grammarRule: "Already vs Yet — Affirmative Sentences",
        explanation: "'Already' is used in affirmative (positive) sentences to say something has happened. 'Yet' is used in negatives and questions, not in a positive statement like this.",
        errorSpot: {
            errorWordIndex: 2,
            wrongWord: "yet",
            correction: "already",
            reason: "This is an affirmative sentence → use 'already': 'I have already eaten lunch.'",
            correctionOptions: ["already", "yet", "still", "ever"],
        },
    },

    // split(" ") → [0=We, 1=haven't, 2=visited, 3=our, 4=grandparents, 5=for, 6=last, 7=month.]
    // words[5]="for" ✅  corrected: "We haven't visited our grandparents since last month." ✅
    {
        id: "ppfsy-error-5",
        topic: "present-perfect-for-since-yet",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "We haven't visited our grandparents for last month.",
        grammarRule: "Since + Specific Time — 'Last Month'",
        explanation: "'Last month' is a specific point when something last happened, so it needs 'since', not 'for'.",
        errorSpot: {
            errorWordIndex: 5,
            wrongWord: "for",
            correction: "since",
            reason: "'Last month' is a point in time → use 'since': 'We haven't visited our grandparents since last month.'",
            correctionOptions: ["since", "for", "yet", "ago"],
        },
    },

    // split(" ") → [0=They, 1=haven't, 2=finished, 3=the, 4=project, 5=already.]
    // words[5]="already." ✅ (punctuation stripped) corrected: "They haven't finished the project yet." ✅
    {
        id: "ppfsy-error-6",
        topic: "present-perfect-for-since-yet",
        type: "error-spot",
        difficulty: "advanced",
        sentence: "They haven't finished the project already.",
        grammarRule: "Yet vs Already — Negative Sentences",
        explanation: "'Yet' is used in negative sentences to say something hasn't happened up to now. 'Already' doesn't fit a negative sentence like this.",
        errorSpot: {
            errorWordIndex: 5,
            wrongWord: "already",
            correction: "yet",
            reason: "Negative sentences use 'yet', not 'already': 'They haven't finished the project yet.'",
            correctionOptions: ["yet", "already", "still", "ever"],
        },
    },

    // ===== MULTIPLE CHOICE QUESTIONS (7 questions) =====

    {
        id: "ppfsy-mc-1",
        topic: "present-perfect-for-since-yet",
        type: "multiple-choice",
        difficulty: "beginner",
        sentence: "Choose the sentence that correctly uses 'for':",
        grammarRule: "For + Duration — Choosing the Right Word",
        explanation: "'For' is used with a length of time (six years), not a point in time, and not with 'ago', which needs the past simple.",
        tip: "for + duration (for six years). since + point (since 2015). ago + past simple (six years ago).",
        multipleChoice: {
            question: "Which sentence correctly uses 'for'?",
            correctOption: "I've worked at this school for six years.",
            options: [
                "I've worked at this school for six years.",
                "I've worked at this school for 2015.",
                "I've worked at this school since six years.",
                "I've worked at this school ago six years.",
            ],
            optionExplanations: {
                "I've worked at this school for six years.": "Correct! 'Six years' is a duration, so 'for' is right.",
                "I've worked at this school for 2015.": "Wrong. '2015' is a point in time, so it needs 'since', not 'for'.",
                "I've worked at this school since six years.": "Wrong. 'Six years' is a duration, so it needs 'for', not 'since'.",
                "I've worked at this school ago six years.": "Wrong. 'Ago' is used with the past simple ('I started six years ago'), not with the present perfect.",
            },
        },
    },

    {
        id: "ppfsy-mc-2",
        topic: "present-perfect-for-since-yet",
        type: "multiple-choice",
        difficulty: "beginner",
        sentence: "Choose the sentence that correctly uses 'since':",
        grammarRule: "Since + Clause — Point When Something Started",
        explanation: "'Since' can introduce a clause ('he was ten') showing exactly when something started. 'Ten years' is a duration, so it needs 'for', not 'since'.",
        tip: "since + clause (since I was ten) or since + point (since 2015) — never since + a length of time.",
        multipleChoice: {
            question: "Which sentence correctly uses 'since'?",
            correctOption: "He's played the guitar since he was ten.",
            options: [
                "He's played the guitar since he was ten.",
                "He's played the guitar since ten years.",
                "He's played the guitar for he was ten.",
                "He's played the guitar yet he was ten.",
            ],
            optionExplanations: {
                "He's played the guitar since he was ten.": "Correct! The clause 'he was ten' shows exactly when he started.",
                "He's played the guitar since ten years.": "Wrong. 'Ten years' is a duration — it needs 'for', not 'since'.",
                "He's played the guitar for he was ten.": "Wrong. A clause showing when something started needs 'since', not 'for'.",
                "He's played the guitar yet he was ten.": "Wrong. 'Yet' doesn't introduce a clause about when something started.",
            },
        },
    },

    {
        id: "ppfsy-mc-3",
        topic: "present-perfect-for-since-yet",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the sentence that correctly uses 'yet':",
        grammarRule: "Yet in Questions — Up to Now",
        explanation: "'Yet' is used in questions and negative sentences to ask or say whether something has happened up to now.",
        tip: "yet → questions & negatives. already → affirmative sentences.",
        multipleChoice: {
            question: "Which sentence correctly uses 'yet'?",
            correctOption: "Have you called the bank yet?",
            options: [
                "Have you called the bank yet?",
                "I have called the bank yet.",
                "Have you called the bank since?",
                "I haven't called the bank already.",
            ],
            optionExplanations: {
                "Have you called the bank yet?": "Correct! 'Yet' fits perfectly in a question asking if something has happened up to now.",
                "I have called the bank yet.": "Wrong. 'Yet' isn't used in affirmative statements — use 'already': 'I have already called the bank.'",
                "Have you called the bank since?": "Wrong. 'Since' needs a point in time or a clause after it — it can't stand alone like this.",
                "I haven't called the bank already.": "Wrong. 'Already' doesn't fit negative sentences — use 'yet': 'I haven't called the bank yet.'",
            },
        },
    },

    {
        id: "ppfsy-mc-4",
        topic: "present-perfect-for-since-yet",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "My sister has lived in Berlin since 2020.",
        grammarRule: "Present Perfect + Since — Started in the Past, True Now",
        explanation: "Present perfect with 'since' shows an action or state that started at a point in the past and is still true now.",
        tip: "have/has + past participle + since + point = started then, still true now.",
        multipleChoice: {
            question: "What does this sentence tell us?",
            correctOption: "She moved to Berlin in 2020 and still lives there now.",
            options: [
                "She moved to Berlin in 2020 and still lives there now.",
                "She lived in Berlin in 2020 but doesn't anymore.",
                "She is going to move to Berlin in 2020.",
                "She lived in Berlin for exactly 2020 days.",
            ],
            optionExplanations: {
                "She moved to Berlin in 2020 and still lives there now.": "Correct! Present perfect + 'since' = started then, still true now.",
                "She lived in Berlin in 2020 but doesn't anymore.": "Wrong. That meaning needs the past simple, not the present perfect.",
                "She is going to move to Berlin in 2020.": "Wrong. '2020' here is a past starting point, not a future plan.",
                "She lived in Berlin for exactly 2020 days.": "Wrong. '2020' is a year after 'since', not a number of days.",
            },
        },
    },

    {
        id: "ppfsy-mc-5",
        topic: "present-perfect-for-since-yet",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Find the sentence with an error:",
        grammarRule: "Since Needs a Point in Time",
        explanation: "Unlike 'yet', 'since' cannot stand alone at the end of a sentence — it always needs a point in time or a clause after it.",
        tip: "since always needs a point after it (since Monday / since I was young). Yet can stand alone at the end.",
        multipleChoice: {
            question: "Which sentence has an error?",
            correctOption: "We haven't seen that film since.",
            options: [
                "We haven't seen that film since.",
                "We haven't seen that film yet.",
                "We saw that film a few weeks ago.",
                "Have you seen that film yet?",
            ],
            optionExplanations: {
                "We haven't seen that film since.": "WRONG! 'Since' needs a point in time or clause after it (since Monday, since we met). On its own at the end, it should be 'yet': 'We haven't seen that film yet.'",
                "We haven't seen that film yet.": "Correct. 'Yet' fits perfectly at the end of a negative sentence.",
                "We saw that film a few weeks ago.": "Correct. Past simple + 'ago' for a finished time in the past.",
                "Have you seen that film yet?": "Correct. 'Yet' fits perfectly at the end of a question.",
            },
        },
    },

    {
        id: "ppfsy-mc-6",
        topic: "present-perfect-for-since-yet",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the sentence with the correct position of 'yet':",
        grammarRule: "Position of Yet — End of the Sentence",
        explanation: "'Yet' usually comes at the end of the sentence or question, after the main verb and object.",
        tip: "Put yet at the very end: I haven't finished yet. Have you called yet?",
        multipleChoice: {
            question: "Which sentence places 'yet' correctly?",
            correctOption: "I haven't finished packing yet.",
            options: [
                "I haven't finished packing yet.",
                "I haven't finished yet packing.",
                "Yet I haven't finished packing.",
                "I haven't yet packing finished.",
            ],
            optionExplanations: {
                "I haven't finished packing yet.": "Correct! 'Yet' goes at the end, after the verb and object.",
                "I haven't finished yet packing.": "Wrong. 'Yet' shouldn't split the verb from its object like this.",
                "Yet I haven't finished packing.": "Wrong. 'Yet' doesn't start the sentence with this meaning.",
                "I haven't yet packing finished.": "Wrong. This breaks up the verb phrase and puts the words in the wrong order.",
            },
        },
    },

    {
        id: "ppfsy-mc-7",
        topic: "present-perfect-for-since-yet",
        type: "multiple-choice",
        difficulty: "advanced",
        sentence: "Choose the correct sentence:",
        grammarRule: "For + Duration — Advanced Review",
        explanation: "'Years' (an unspecified length of time) needs 'for'. 'Since' needs a point, 'yet' can't be used this way mid-sentence, and 'during' needs a specific event, not a duration.",
        tip: "for + a length of time, even vague ones like 'for years', 'for ages', 'for a while'.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "I haven't been to Italy for years, but I've always wanted to go.",
            options: [
                "I haven't been to Italy for years, but I've always wanted to go.",
                "I haven't been to Italy since years, but I've always wanted to go.",
                "I haven't been to Italy yet years, but I've always wanted to go.",
                "I haven't been to Italy during years, but I've always wanted to go.",
            ],
            optionExplanations: {
                "I haven't been to Italy for years, but I've always wanted to go.": "Correct! 'Years' is a duration, so it needs 'for'.",
                "I haven't been to Italy since years, but I've always wanted to go.": "Wrong. 'Since' needs a point in time, not a duration like 'years'.",
                "I haven't been to Italy yet years, but I've always wanted to go.": "Wrong. 'Yet' can't be followed directly by a length of time like this.",
                "I haven't been to Italy during years, but I've always wanted to go.": "Wrong. 'During' needs a specific event or period, not a duration like 'years'.",
            },
        },
    },

    // ===== WORD TRANSFORM QUESTIONS (6 questions) =====

    {
        id: "ppfsy-wt-1",
        topic: "present-perfect-for-since-yet",
        type: "word-transform",
        difficulty: "beginner",
        sentence: "She ___ in this house since she was born.",
        grammarRule: "Present Perfect + Since — Formation",
        explanation: "Since the clause 'she was born' shows when the state began, we need the present perfect: has/have + past participle.",
        tip: "has/have + past participle + since + point = state started then, still true now.",
        wordTransform: {
            baseWord: "live",
            correctAnswer: "has lived",
        },
    },

    {
        id: "ppfsy-wt-2",
        topic: "present-perfect-for-since-yet",
        type: "word-transform",
        difficulty: "beginner",
        sentence: "We ___ this car for almost nine years.",
        grammarRule: "Present Perfect + For — Formation",
        explanation: "'For almost nine years' tells us the duration, so we need the present perfect: have + past participle.",
        tip: "have/has + past participle + for + duration = still true now.",
        wordTransform: {
            baseWord: "own",
            correctAnswer: "have owned",
        },
    },

    {
        id: "ppfsy-wt-3",
        topic: "present-perfect-for-since-yet",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "I ___ my passport yet — I should look for it tonight.",
        grammarRule: "Present Perfect Negative + Yet",
        explanation: "'Yet' with a negative present perfect shows something hasn't happened up to now, but is expected soon.",
        tip: "haven't/hasn't + past participle + yet = hasn't happened, but probably will soon.",
        wordTransform: {
            baseWord: "find",
            correctAnswer: "haven't found",
        },
    },

    {
        id: "ppfsy-wt-4",
        topic: "present-perfect-for-since-yet",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "Have you ___ the dentist yet?",
        grammarRule: "Present Perfect Question + Yet",
        explanation: "After 'Have you', we just need the past participle. 'Yet' at the end asks if this has happened up to now.",
        tip: "Have/Has + subject + past participle ... + yet? = asking if something has happened by now.",
        wordTransform: {
            baseWord: "call",
            correctAnswer: "called",
        },
    },

    {
        id: "ppfsy-wt-5",
        topic: "present-perfect-for-since-yet",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "My brother ___ abroad since he finished university.",
        grammarRule: "Present Perfect + Since + Clause",
        explanation: "'Since he finished university' is a clause showing when the situation started. The main clause needs the present perfect: has + past participle.",
        tip: "since + clause (since he finished university) still needs the present perfect in the main clause.",
        wordTransform: {
            baseWord: "work",
            correctAnswer: "has worked",
        },
    },

    {
        id: "ppfsy-wt-6",
        topic: "present-perfect-for-since-yet",
        type: "word-transform",
        difficulty: "advanced",
        sentence: "They ___ a decision yet, so the meeting might run late.",
        grammarRule: "Present Perfect Negative + Yet — Advanced",
        explanation: "'Yet' with a negative present perfect shows the decision hasn't happened up to now, but it's still expected.",
        tip: "haven't/hasn't + past participle + yet, often followed by a consequence or reason.",
        wordTransform: {
            baseWord: "make",
            correctAnswer: "haven't made",
        },
    },
];

export const presentPerfectForSinceYetTopic: GrammarTopic = {
    id: "present-perfect-for-since-yet",
    level: "B1",
    name: "Present Perfect: For, Since and Yet",
    description: "Learn how to use for, since and yet with the present perfect — for a length of time, since a starting point, and yet for what hasn't happened (but should) up to now.",
    lesson: "Lesson 6D",
    icon: "⏳",
    cards: [
        {
            id: "ppfsy-card-1",
            rule: "for + duration",
            example: "We've lived in this flat ___ six years.",
            answer: "for",
            explanation: "For is used with a period of time — how long something has continued. We say for six years, for a long time, for a few weeks.",
            examples: ["She's worked at the hospital for three years.", "I haven't seen my cousins for a long time."],
            ua: "for + тривалість: «for six years» — «протягом шести років».",
        },
        {
            id: "ppfsy-card-2",
            rule: "since + point in time",
            example: "He's worked at this company ___ 2019.",
            answer: "since",
            explanation: "Since is used with a specific point when something started — a year, a day, or an event. We say since 2019, since Monday, since last summer.",
            examples: ["I've known about the new rules since Monday.", "They've lived in Kyiv since last summer."],
            ua: "since + конкретний момент: «since 2019» — «з 2019 року».",
        },
        {
            id: "ppfsy-card-3",
            rule: "since + clause",
            example: "I've wanted to visit Japan ___ I was a child.",
            answer: "since",
            explanation: "Since can also introduce a clause with its own subject and verb, showing when something started. The clause after since is usually in the past simple.",
            examples: ["We've been friends since we met at university.", "She's loved painting since she was at school."],
            ua: "since + речення (since I was a child) — «відтоді як...».",
        },
        {
            id: "ppfsy-card-4",
            rule: "yet in negative sentences",
            example: "I haven't paid the electricity bill ___.",
            answer: "yet",
            explanation: "Yet means 'at any time up to now'. In negative sentences it shows something hasn't happened, but we expect it to happen soon.",
            examples: ["She hasn't replied to my email yet.", "We haven't booked our flights yet."],
            ua: "yet у заперечних реченнях — «ще не»: «I haven't finished yet».",
        },
        {
            id: "ppfsy-card-5",
            rule: "yet in questions",
            example: "Has she replied to your message ___?",
            answer: "yet",
            explanation: "We use yet in questions to ask if something has happened 'at any time up to now'. Yet usually comes at the end of the question.",
            examples: ["Have you finished your homework yet?", "Has the bus arrived yet?"],
            ua: "yet у питаннях — наприкінці речення: «Have you finished yet?»",
        },
        {
            id: "ppfsy-card-6",
            rule: "already (affirmative) vs yet (negative/question)",
            example: "I've ___ (already / yet) eaten breakfast, thanks.",
            answer: "already",
            explanation: "Already is used in affirmative (positive) sentences to say something has happened, often sooner than expected. Yet is used in negatives and questions instead.",
            examples: ["He's already left for work.", "We've already seen that film."],
            ua: "already — у стверджувальних реченнях: «I've already eaten» («я вже поїв»).",
        },
    ],
    rules: presentPerfectForSinceYet,
};

export default presentPerfectForSinceYet;
