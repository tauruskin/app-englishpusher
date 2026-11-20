/**
 * EnglishPusher Grammar Testing - used to
 * B1 Level (Speak Out) - Unit 6A, "The two Pablos"
 *
 * 6 gap-fill, 6 error-spot, 7 multiple-choice, 6 word-transform = 25 questions
 * VERIFIED: All error-spot indexes checked against split(" ") positions.
 */

import type { GrammarQuestion, GrammarTopic } from "../types.ts";

export const usedToQuestions: GrammarQuestion[] = [

    // ===== GAP FILL QUESTIONS (6 questions) =====

    {
        id: "ut-gap-1",
        topic: "used-to",
        type: "gap-fill",
        difficulty: "beginner",
        sentence: "As a child, I ___ collect toy cars.",
        grammarRule: "used to — Past Habit, Affirmative",
        explanation: "'Used to' + infinitive describes a past habit that is no longer true. The form is the same for every subject: I/you/he/she/we/they used to.",
        tip: "used to + base verb = a habit in the past that has stopped.",
        gapFill: {
            gapIndex: 4,
            correctAnswer: "used to",
            options: ["used to", "use to", "was used to", "using"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "ut-gap-2",
        topic: "used-to",
        type: "gap-fill",
        difficulty: "beginner",
        sentence: "She ___ live in a small village before she moved to the city.",
        grammarRule: "used to — Past State",
        explanation: "'Used to' also describes a past state (where someone lived, what they owned, how they felt) that is no longer the case.",
        tip: "used to can describe a past state too, not just a repeated action: used to live, used to have, used to be.",
        gapFill: {
            gapIndex: 1,
            correctAnswer: "used to",
            options: ["used to", "uses to", "use to", "was used"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "ut-gap-3",
        topic: "used-to",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "I ___ to like vegetables when I was young, but now I love them.",
        grammarRule: "used to — Negative Form",
        explanation: "The negative of 'used to' is 'didn't use to' — note there is no 'd' in 'use' once 'didn't' carries the past tense.",
        tip: "Negative: didn't use to (not didn't used to) — the 'd' moves to 'did'.",
        gapFill: {
            gapIndex: 1,
            correctAnswer: "didn't use",
            options: ["didn't use", "didn't used", "don't used", "not used"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "ut-gap-4",
        topic: "used-to",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "___ you use to play an instrument when you were at school?",
        grammarRule: "used to — Question Form",
        explanation: "Questions with 'used to' are formed with 'did' + subject + 'use to' + infinitive — again, no 'd' on 'use' after 'did'.",
        tip: "Question: Did you use to...? The 'd' belongs to 'did', never to 'use'.",
        gapFill: {
            gapIndex: 0,
            correctAnswer: "Did",
            options: ["Did", "Used", "Do", "Were"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "ut-gap-5",
        topic: "used-to",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "Last year, our class ___ to a museum for a school trip.",
        grammarRule: "used to vs Past Simple — One-off Events",
        explanation: "'Used to' is wrong for something that happened only once, a specific number of times, or for a specific length of time — the past simple is correct there instead.",
        tip: "A single event or a stated number of times/years → past simple, never used to.",
        gapFill: {
            gapIndex: 4,
            correctAnswer: "went",
            options: ["went", "used to go", "use to go", "was going"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "ut-gap-6",
        topic: "used-to",
        type: "gap-fill",
        difficulty: "advanced",
        sentence: "A: Do you still play tennis every day? B: No, I ___, but I don't anymore.",
        grammarRule: "used to — Short Answer (Verb Omitted)",
        explanation: "In spoken English, the verb after 'used to' is often left out, especially in short answers: 'I used to' on its own means 'I used to do that'.",
        tip: "Short answers can stop at 'used to' — the activity is understood from the question.",
        gapFill: {
            gapIndex: 11,
            correctAnswer: "used to",
            options: ["used to", "used", "use to", "did use to"],
            correctOptionIndex: 0,
        },
    },

    // ===== ERROR SPOT QUESTIONS (6 questions) =====
    // RULE: Every error is exactly ONE word. Replacing wrongWord with correction
    // must produce a 100% grammatically correct sentence with no leftover errors.

    // split(" ") → [0=He, 1=use, 2=to, 3=draw, 4=every, 5=day, 6=at, 7=school.]
    // words[1]="use" ✅  corrected: "He used to draw every day at school." ✅
    {
        id: "ut-error-1",
        topic: "used-to",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "He use to draw every day at school.",
        grammarRule: "used to — Spelling of the Affirmative",
        explanation: "The affirmative form is always 'used to', with a 'd' — 'use to' on its own is never correct in an affirmative sentence.",
        errorSpot: {
            errorWordIndex: 1,
            wrongWord: "use",
            correction: "used",
            reason: "Affirmative 'used to' always has the 'd': 'He used to draw every day at school.'",
            correctionOptions: ["used", "use", "uses", "using"],
        },
    },

    // split(" ") → [0=She, 1=didn't, 2=used, 3=to, 4=eat, 5=meat.]
    // words[2]="used" ✅  corrected: "She didn't use to eat meat." ✅
    {
        id: "ut-error-2",
        topic: "used-to",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "She didn't used to eat meat.",
        grammarRule: "used to — No 'd' After didn't",
        explanation: "Once 'didn't' carries the past tense, 'use' stays in its base form — 'didn't used to' is a common mistake.",
        errorSpot: {
            errorWordIndex: 2,
            wrongWord: "used",
            correction: "use",
            reason: "After 'didn't', drop the 'd': 'She didn't use to eat meat.'",
            correctionOptions: ["use", "used", "uses", "using"],
        },
    },

    // split(" ") → [0=Did, 1=you, 2=used, 3=to, 4=live, 5=in, 6=Paris?]
    // words[2]="used" ✅  corrected: "Did you use to live in Paris?" ✅
    {
        id: "ut-error-3",
        topic: "used-to",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "Did you used to live in Paris?",
        grammarRule: "used to — No 'd' After did",
        explanation: "The same rule applies to questions: once 'did' carries the past tense, 'use' loses its 'd'.",
        errorSpot: {
            errorWordIndex: 2,
            wrongWord: "used",
            correction: "use",
            reason: "After 'did', drop the 'd': 'Did you use to live in Paris?'",
            correctionOptions: ["use", "used", "uses", "using"],
        },
    },

    // split(" ") → [0=She, 1=used, 2=to, 3=goes, 4=to, 5=the, 6=gym, 7=every, 8=day.]
    // words[3]="goes" ✅  corrected: "She used to go to the gym every day." ✅
    {
        id: "ut-error-4",
        topic: "used-to",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "She used to goes to the gym every day.",
        grammarRule: "used to + Base Verb Form",
        explanation: "'Used to' is always followed by the base form of the verb — never a form with -s, -ing or the past tense.",
        errorSpot: {
            errorWordIndex: 3,
            wrongWord: "goes",
            correction: "go",
            reason: "After 'used to', use the base verb: 'She used to go to the gym every day.'",
            correctionOptions: ["go", "goes", "going", "went"],
        },
    },

    // split(" ") → [0=He, 1=used, 2=to, 3=playing, 4=football, 5=every, 6=weekend.]
    // words[3]="playing" ✅  corrected: "He used to play football every weekend." ✅
    {
        id: "ut-error-5",
        topic: "used-to",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "He used to playing football every weekend.",
        grammarRule: "used to + Base Verb Form — Not -ing",
        explanation: "'Used to' is never followed by an -ing form, even though it looks a little like a continuous structure — the base verb is required.",
        errorSpot: {
            errorWordIndex: 3,
            wrongWord: "playing",
            correction: "play",
            reason: "After 'used to', use the base verb, not -ing: 'He used to play football every weekend.'",
            correctionOptions: ["play", "playing", "plays", "played"],
        },
    },

    // split(" ") → [0=They, 1=used, 2=to, 3=lived, 4=in, 5=Berlin, 6=when, 7=they, 8=were, 9=young.]
    // words[3]="lived" ✅  corrected: "They used to live in Berlin when they were young." ✅
    {
        id: "ut-error-6",
        topic: "used-to",
        type: "error-spot",
        difficulty: "advanced",
        sentence: "They used to lived in Berlin when they were young.",
        grammarRule: "used to + Base Verb Form — Not Past Tense",
        explanation: "'Used to' already carries the past meaning, so the verb after it must stay in the base form — it is never also put into the past tense.",
        errorSpot: {
            errorWordIndex: 3,
            wrongWord: "lived",
            correction: "live",
            reason: "After 'used to', use the base verb, not the past tense: 'They used to live in Berlin when they were young.'",
            correctionOptions: ["live", "lived", "living", "lives"],
        },
    },

    // ===== MULTIPLE CHOICE QUESTIONS (7 questions) =====

    {
        id: "ut-mc-1",
        topic: "used-to",
        type: "multiple-choice",
        difficulty: "beginner",
        sentence: "Choose the correct sentence about a past habit that has stopped:",
        grammarRule: "used to — Basic Meaning",
        explanation: "'Used to' describes a habit or state in the past that is usually no longer true now.",
        tip: "used to + infinitive = true in the past, not true now.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "He used to play the guitar, but he gave it up years ago.",
            options: [
                "He used to play the guitar, but he gave it up years ago.",
                "He use to playing the guitar, but he gave it up years ago.",
                "He is used to play the guitar, but he gave it up years ago.",
                "He used to played the guitar, but he gave it up years ago.",
            ],
            optionExplanations: {
                "He used to play the guitar, but he gave it up years ago.": "Correct! 'used to' + base verb describes a past habit that has stopped.",
                "He use to playing the guitar, but he gave it up years ago.": "Wrong. Affirmative needs 'used', and 'to' is followed by the base verb, not '-ing'.",
                "He is used to play the guitar, but he gave it up years ago.": "Wrong. 'Is used to' (+ -ing) means 'is accustomed to', a different structure entirely.",
                "He used to played the guitar, but he gave it up years ago.": "Wrong. 'used to' is always followed by the base verb, not the past form 'played'.",
            },
        },
    },

    {
        id: "ut-mc-2",
        topic: "used-to",
        type: "multiple-choice",
        difficulty: "beginner",
        sentence: "Choose the sentence with the correct negative form:",
        grammarRule: "used to — Negative Form",
        explanation: "The negative of 'used to' is 'didn't use to' (no 'd' on 'use'). In spoken English, 'never used to' is also common.",
        tip: "didn't use to — remember the missing 'd'.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "I didn't use to enjoy reading, but now I read every night.",
            options: [
                "I didn't use to enjoy reading, but now I read every night.",
                "I didn't used to enjoy reading, but now I read every night.",
                "I don't used to enjoy reading, but now I read every night.",
                "I not used to enjoy reading, but now I read every night.",
            ],
            optionExplanations: {
                "I didn't use to enjoy reading, but now I read every night.": "Correct! After 'didn't', 'use' loses its 'd'.",
                "I didn't used to enjoy reading, but now I read every night.": "Wrong. 'didn't' already carries the past tense, so 'use' should not have a 'd'.",
                "I don't used to enjoy reading, but now I read every night.": "Wrong. 'used to' is only a past form — the auxiliary must be 'did', not 'do'.",
                "I not used to enjoy reading, but now I read every night.": "Wrong. The negative needs the auxiliary 'didn't', not just 'not'.",
            },
        },
    },

    {
        id: "ut-mc-3",
        topic: "used-to",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the sentence that correctly uses 'used to' for a past state:",
        grammarRule: "used to — Past State",
        explanation: "'Used to' can describe not just repeated actions but also a lasting state in the past — where someone lived, what they had, how they felt.",
        tip: "used to + be/have/live = a state that is no longer true.",
        multipleChoice: {
            question: "Which sentence describes a past state correctly?",
            correctOption: "She used to be very shy, but she's much more confident now.",
            options: [
                "She used to be very shy, but she's much more confident now.",
                "She used to being very shy, but she's much more confident now.",
                "She was used to shy, but she's much more confident now.",
                "She uses to be very shy, but she's much more confident now.",
            ],
            optionExplanations: {
                "She used to be very shy, but she's much more confident now.": "Correct! 'used to be' describes a state that was true in the past.",
                "She used to being very shy, but she's much more confident now.": "Wrong. 'used to' is followed by the base verb 'be', not '-ing'.",
                "She was used to shy, but she's much more confident now.": "Wrong. 'was used to' needs a noun or -ing form, and this isn't that structure at all.",
                "She uses to be very shy, but she's much more confident now.": "Wrong. 'used to' never changes form — there is no 'uses to'.",
            },
        },
    },

    {
        id: "ut-mc-4",
        topic: "used-to",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Find the sentence where 'used to' is used INCORRECTLY:",
        grammarRule: "used to vs Past Simple — One-off Events",
        explanation: "'Used to' cannot describe something that happened only once, a stated number of times, or for a stated length of time — the past simple is required there.",
        tip: "A single event, a number, or a length of time → never 'used to'.",
        multipleChoice: {
            question: "Which sentence has an error?",
            correctOption: "Last March I used to visit some friends in Mexico City.",
            options: [
                "Last March I used to visit some friends in Mexico City.",
                "Last March I visited some friends in Mexico City.",
                "I used to visit my grandparents every summer when I was a child.",
                "He used to spend hours drawing cartoon characters.",
            ],
            optionExplanations: {
                "Last March I used to visit some friends in Mexico City.": "WRONG! 'Last March' names one specific, dated event — the past simple is needed, not 'used to'.",
                "Last March I visited some friends in Mexico City.": "Correct. A single dated event uses the past simple.",
                "I used to visit my grandparents every summer when I was a child.": "Correct. 'Every summer' describes a repeated past habit — 'used to' is right here.",
                "He used to spend hours drawing cartoon characters.": "Correct. A repeated past habit, with no specific date — 'used to' is right here.",
            },
        },
    },

    {
        id: "ut-mc-5",
        topic: "used-to",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the best question to ask about someone's past hobbies:",
        grammarRule: "used to — Question Form",
        explanation: "Questions with 'used to' use 'did' + subject + 'use to' + infinitive.",
        tip: "Did + subject + use to + base verb — never 'Did ... used to'.",
        multipleChoice: {
            question: "Which question is grammatically correct?",
            correctOption: "Did you use to collect anything when you were a child?",
            options: [
                "Did you use to collect anything when you were a child?",
                "Did you used to collect anything when you were a child?",
                "Used you to collect anything when you were a child?",
                "Do you used to collect anything when you were a child?",
            ],
            optionExplanations: {
                "Did you use to collect anything when you were a child?": "Correct! 'Did' + subject + 'use to' (no 'd') + base verb.",
                "Did you used to collect anything when you were a child?": "Wrong. Once 'did' carries the past tense, 'use' must lose its 'd'.",
                "Used you to collect anything when you were a child?": "Wrong. Modern English always uses 'did ... use to', not 'used you to'.",
                "Do you used to collect anything when you were a child?": "Wrong. 'used to' only exists in the past — 'do' is the wrong auxiliary, and 'used' still needs to drop the 'd' anyway.",
            },
        },
    },

    {
        id: "ut-mc-6",
        topic: "used-to",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the sentence with the most natural short answer:",
        grammarRule: "used to — Short Answer",
        explanation: "In spoken English, the verb after 'used to' is often dropped in short answers because it's understood from the question.",
        tip: "A: Do you still skateboard? B: No, I used to. — the activity doesn't need repeating.",
        multipleChoice: {
            question: "A: Do you still play tennis? B: ...",
            correctOption: "No, I used to, but I don't anymore.",
            options: [
                "No, I used to, but I don't anymore.",
                "No, I used to play, but I don't anymore.",
                "No, I use to, but I don't anymore.",
                "No, I am used to, but I don't anymore.",
            ],
            optionExplanations: {
                "No, I used to, but I don't anymore.": "Correct! Dropping the verb after 'used to' in a short answer is natural and common.",
                "No, I used to play, but I don't anymore.": "Also grammatically fine, but less natural here than the short form with 'used to' alone — the activity is already clear from the question.",
                "No, I use to, but I don't anymore.": "Wrong. In an affirmative statement, 'used to' always keeps its 'd'.",
                "No, I am used to, but I don't anymore.": "Wrong. 'Am used to' needs a noun or -ing form and means 'accustomed to' — a different meaning entirely.",
            },
        },
    },

    {
        id: "ut-mc-7",
        topic: "used-to",
        type: "multiple-choice",
        difficulty: "advanced",
        sentence: "Choose the sentence that correctly uses the negative form 'never used to':",
        grammarRule: "used to — never used to (Spoken Alternative)",
        explanation: "In spoken English, 'never used to' is often preferred to 'didn't use to' — it keeps the 'd' on 'used' because 'never' doesn't act as an auxiliary.",
        tip: "never used to (with 'd') is a common spoken alternative to didn't use to (without 'd').",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "I never used to see my cousins, except in the summer holidays.",
            options: [
                "I never used to see my cousins, except in the summer holidays.",
                "I never use to see my cousins, except in the summer holidays.",
                "I didn't never used to see my cousins, except in the summer holidays.",
                "I never did use to see my cousins, except in the summer holidays.",
            ],
            optionExplanations: {
                "I never used to see my cousins, except in the summer holidays.": "Correct! With 'never' (not 'didn't'), 'used' keeps its 'd'.",
                "I never use to see my cousins, except in the summer holidays.": "Wrong. 'Never' is not an auxiliary like 'didn't' — 'used' should keep the 'd'.",
                "I didn't never used to see my cousins, except in the summer holidays.": "Wrong. This is a double negative — 'didn't' and 'never' cannot both be used together.",
                "I never did use to see my cousins, except in the summer holidays.": "Wrong. 'Never' replaces 'didn't' entirely — adding 'did' as well is unnecessary and unnatural.",
            },
        },
    },

    // ===== WORD TRANSFORM QUESTIONS (6 questions) =====

    {
        id: "ut-wt-1",
        topic: "used-to",
        type: "word-transform",
        difficulty: "beginner",
        sentence: "We ___ (live) close to the train station, but we moved away last year.",
        grammarRule: "used to — Affirmative with a State Verb",
        explanation: "'Used to' + base verb describes a past state. 'Live' here describes where someone lived in the past, no longer true now.",
        tip: "used to + base verb, always the same form for every subject.",
        wordTransform: {
            baseWord: "live",
            correctAnswer: "used to live",
        },
    },

    {
        id: "ut-wt-2",
        topic: "used-to",
        type: "word-transform",
        difficulty: "beginner",
        sentence: "Elena ___ (drink) a lot of coffee, but she doesn't anymore.",
        grammarRule: "used to — Affirmative with a Habit",
        explanation: "'Used to' describes a repeated past habit — drinking a lot of coffee regularly, which has now stopped.",
        tip: "used to + base verb works the same for he/she/it as for I/you/we/they.",
        wordTransform: {
            baseWord: "drink",
            correctAnswer: "used to drink",
        },
    },

    {
        id: "ut-wt-3",
        topic: "used-to",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "I ___ (like) my job, but I love it now.",
        grammarRule: "used to — Negative Form",
        explanation: "The negative of 'used to' is 'didn't use to' — no 'd' on 'use' once 'didn't' carries the past tense. The contrast with 'now' shows the feeling has changed.",
        tip: "Negative: didn't use to + base verb.",
        wordTransform: {
            baseWord: "like",
            correctAnswer: "didn't use to like",
        },
    },

    {
        id: "ut-wt-4",
        topic: "used-to",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "Did you ___ (have) art lessons when you were young?",
        grammarRule: "used to — Question Form",
        explanation: "Questions with 'used to' are built with 'did' + subject + 'use to' + base verb — note that 'use' has no 'd' once 'did' is already there.",
        tip: "Question: Did + subject + use to + base verb (no 'd' on 'use').",
        wordTransform: {
            baseWord: "have",
            correctAnswer: "use to have",
        },
    },

    {
        id: "ut-wt-5",
        topic: "used-to",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "My parents ___ (watch) a lot of television, but they don't now.",
        grammarRule: "used to — Affirmative with a Habit",
        explanation: "A repeated habit in the past that has stopped (watching a lot of television) is exactly what 'used to' describes.",
        tip: "used to + base verb for a habit that no longer continues.",
        wordTransform: {
            baseWord: "watch",
            correctAnswer: "used to watch",
        },
    },

    {
        id: "ut-wt-6",
        topic: "used-to",
        type: "word-transform",
        difficulty: "advanced",
        sentence: "It never ___ (be) so hot in the summers here, but things have changed.",
        grammarRule: "used to — never used to (Past State)",
        explanation: "'Never used to' (with the 'd' kept, since 'never' is not an auxiliary) describes a past state that was never true before, but things are different now.",
        tip: "never used to + base verb — 'used' keeps its 'd' after 'never'.",
        wordTransform: {
            baseWord: "be",
            correctAnswer: "used to be",
        },
    },
];

export const usedToTopic: GrammarTopic = {
    id: "used-to",
    level: "B1",
    name: "used to",
    description: "Learn how to talk about past habits and states that are no longer true with 'used to' — the affirmative, negative and question forms, and when the past simple is needed instead.",
    lesson: "Unit 6A",
    icon: "🕰️",
    cards: [
        {
            id: "ut-card-1",
            rule: "used to + base verb — past habit",
            example: "As a child, Marco ___ (collect) stamps every weekend.",
            answer: "used to collect",
            explanation: "'Used to' + the base form of the verb describes something that happened regularly in the past but doesn't happen now. The form never changes, whoever is doing it.",
            examples: ["We used to walk to school together every morning.", "My grandmother used to tell us stories before bed."],
            ua: "used to + дієслово — звичка в минулому, якої вже немає: used to collect («колись збирав»).",
        },
        {
            id: "ut-card-2",
            rule: "used to + base verb — past state",
            example: "Before she moved abroad, Anna ___ (live) in a tiny flat.",
            answer: "used to live",
            explanation: "'Used to' also describes a state that lasted for a time in the past — where someone lived, what they owned, how they felt — and is no longer true.",
            examples: ["He used to be very quiet at school.", "They used to have a dog, but it died two years ago."],
            ua: "used to описує і стан у минулому, не лише дію: used to live, used to be.",
        },
        {
            id: "ut-card-3",
            rule: "negative: didn't use to (no 'd')",
            example: "I ___ (not / enjoy) spicy food, but now it's my favourite.",
            answer: "didn't use to enjoy",
            explanation: "The negative is 'didn't use to' + base verb. Because 'didn't' already carries the past tense, 'use' drops its 'd'.",
            examples: ["She didn't use to go out much, but she's much more social now.", "We didn't use to travel abroad very often."],
            ua: "заперечення: didn't use to (без «d» на use!) — didn't used to є помилкою.",
        },
        {
            id: "ut-card-4",
            rule: "question: Did ... use to? (no 'd')",
            example: "Did you ___ (play) a musical instrument as a child?",
            answer: "use to play",
            explanation: "Questions are formed with 'did' + subject + 'use to' + base verb. Again, 'use' has no 'd' once 'did' is carrying the past tense.",
            examples: ["Did you use to live near the sea?", "Did they use to visit you every summer?"],
            ua: "питання: Did + підмет + use to (без «d»): Did you use to play...?",
        },
        {
            id: "ut-card-5",
            rule: "used to or past simple?",
            example: "She ___ (be) a photographer before she became a teacher.",
            answer: "used to be",
            explanation: "'Used to' and the past simple can both describe a repeated past habit or lasting state — both are correct and mean almost the same thing.",
            examples: ["I used to play tennis every weekend.", "I played tennis every weekend."],
            ua: "used to і Past Simple часто взаємозамінні для звички/стану в минулому: обидва варіанти правильні.",
        },
        {
            id: "ut-card-6",
            rule: "one-off events: past simple only",
            example: "Last summer, my family ___ (move) to a new city.",
            answer: "moved",
            explanation: "'Used to' cannot describe something that happened only once, a stated number of times, or for a stated length of time — only the past simple works for those.",
            examples: ["We went to Portugal twice last year.", "I studied French for two years at school."],
            ua: "used to не можна для разової події, точної кількості разів чи періоду — лише Past Simple: moved, went, studied.",
        },
        {
            id: "ut-card-7",
            rule: "never used to (spoken alternative)",
            example: "My brother ___ (not / like) classical music, but he does now.",
            answer: "never used to like",
            explanation: "In spoken English, 'never used to' is often preferred to 'didn't use to'. With 'never' instead of 'didn't', 'used' keeps its 'd'.",
            examples: ["I never used to eat breakfast, but I do every day now.", "She never used to drive, but she passed her test last year."],
            ua: "в розмовній мові часто never used to (з «d», бо never — не допоміжне дієслово) замість didn't use to.",
        },
        {
            id: "ut-card-8",
            rule: "short answers: verb often dropped",
            example: "A: Do you still skateboard? B: No, I ___, but I don't anymore.",
            answer: "used to",
            explanation: "In short answers, the verb after 'used to' is often left out completely, because it's already clear from the question.",
            examples: ["A: Do you still play the piano? B: I used to, but I stopped years ago.", "A: Did you use to collect anything? B: Yes, I used to."],
            ua: "у коротких відповідях дієслово після used to часто опускають: I used to (без повторення дії).",
        },
    ],
    rules: usedToQuestions,
};

export default usedToQuestions;
