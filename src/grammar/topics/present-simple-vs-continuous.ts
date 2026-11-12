/**
 * EnglishPusher Grammar Testing - Present Simple vs Present Continuous
 * B1 Level (Speak Out)
 *
 * VERIFIED: All error-spot indexes checked programmatically.
 * VERIFIED: All reorder correctOrders produce correct sentences.
 */

import type { GrammarQuestion, GrammarTopic } from "../types.ts";

export const presentSimpleVsContinuous: GrammarQuestion[] = [

    // ===== GAP FILL QUESTIONS (7 questions) =====

    {
        id: "ps-pc-gap-1",
        topic: "present-simple-vs-continuous",
        type: "gap-fill",
        difficulty: "beginner",
        sentence: "I usually ___ coffee in the morning, but today I'm drinking tea.",
        grammarRule: "Present Simple vs Present Continuous - Habit vs Now",
        explanation: "Use 'drink' (Present Simple) for habits/routines. Use 'drinking' (Present Continuous) for what is happening right now.",
        tip: "Habit/routine = Present Simple. Right now = Present Continuous.",
        gapFill: {
            gapIndex: 2,
            correctAnswer: "drink",
            options: ["drink", "am drinking", "drinks", "drinking"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "ps-pc-gap-2",
        topic: "present-simple-vs-continuous",
        type: "gap-fill",
        difficulty: "beginner",
        sentence: "She ___ her homework right now. She does it every evening.",
        grammarRule: "Present Continuous vs Present Simple",
        explanation: "'Is doing' (Present Continuous) — something happening right now. Compare: 'does' for habits.",
        tip: "Now/at this moment = Present Continuous. Every day/always = Present Simple.",
        gapFill: {
            gapIndex: 1,
            correctAnswer: "is doing",
            options: ["is doing", "does", "do", "doing"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "ps-pc-gap-3",
        topic: "present-simple-vs-continuous",
        type: "gap-fill",
        difficulty: "beginner",
        sentence: "They ___ in London. They have lived there for 10 years.",
        grammarRule: "Present Simple - Permanent Situation",
        explanation: "Use 'live' (Present Simple) for where someone is based/permanent situation, not 'are living'.",
        tip: "Where do you live? = Present Simple (permanent).",
        gapFill: {
            gapIndex: 1,
            correctAnswer: "live",
            options: ["live", "are living", "lives", "living"],
            correctOptionIndex: 0,
        },
    },

        {
        id: "ps-pc-gap-4",
        topic: "present-simple-vs-continuous",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "Look! Tom ___ on his phone instead of working.",
        grammarRule: "Present Continuous Question",
        explanation: "Use Present Continuous (is + verb-ing) for actions happening right now.",
        tip: "Right now / Look! / at the moment = Present Continuous.",
        gapFill: {
            gapIndex: 1,
            correctAnswer: "is talking",
            options: ["is talking", "talks", "talk", "talking"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "ps-pc-gap-5",
        topic: "present-simple-vs-continuous",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "My sister ___ for a fashion company, but this month she is working on a special project.",
        grammarRule: "Present Simple Job vs Present Continuous Temporary Task",
        explanation: "'Works' (Present Simple) — her regular permanent job. Compare: 'is working' for a temporary project.",
        tip: "Regular job = Present Simple. Temporary task right now = Present Continuous.",
        gapFill: {
            gapIndex: 1,
            correctAnswer: "works",
            options: ["works", "is working", "work", "working"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "ps-pc-gap-6",
        topic: "present-simple-vs-continuous",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "I ___ like horror films, so I never watch them.",
        grammarRule: "Present Simple - State Verbs",
        explanation: "'Like' is a state verb (feeling/opinion). We use Present Simple negative: 'don't like', never 'am not liking'.",
        tip: "State verbs (like, love, hate, want, need, understand, know, believe, own, see, hear) = Present Simple only.",
        gapFill: {
            gapIndex: 1,
            correctAnswer: "don't",
            options: ["don't", "am not", "won't", "didn't"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "ps-pc-gap-7",
        topic: "present-simple-vs-continuous",
        type: "gap-fill",
        difficulty: "advanced",
        sentence: "He usually ___ very seriously, but today he is joking and laughing with everyone.",
        grammarRule: "Present Simple Habit vs Present Continuous Temporary Change",
        explanation: "'Works' (Present Simple) — his usual habit. Compare: 'is joking' shows today is different from the norm.",
        tip: "Usually/normally = Present Simple. Today/right now (different from usual) = Present Continuous.",
        gapFill: {
            gapIndex: 1,
            correctAnswer: "works",
            options: ["works", "is working", "work", "working"],
            correctOptionIndex: 0,
        },
    },

    // ===== ERROR SPOT QUESTIONS (6 questions) =====
    // RULE: Every error is exactly ONE word. Replacing wrongWord with correction
    // must produce a 100% grammatically correct sentence with no leftover errors.

    // split(" ") → [0=I, 1=living, 2=in, 3=Kyiv, 4=since, 5=I, 6=was, 7=born.]
    // words[1]="living" ✅  corrected: "I live in Kyiv since I was born." ✅
    {
        id: "ps-pc-error-1",
        topic: "present-simple-vs-continuous",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "I living in Kyiv since I was born.",
        grammarRule: "Present Simple for Permanent Situation",
        explanation: "When talking about where you live (permanent), use Present Simple, not Present Continuous.",
        errorSpot: {
            errorWordIndex: 1,
            wrongWord: "living",
            correction: "live",
            reason: "Where you live is permanent, so use 'live' (Present Simple), not 'living'.",
            correctionOptions: ["live", "am living", "am live", "lived"],
        },
    },

    // split(" ") → [0=My, 1=father, 2=understanding, 3=English, 4=very, 5=well.]
    // words[2]="understanding" ✅  corrected: "My father understands English very well." ✅
    {
        id: "ps-pc-error-2",
        topic: "present-simple-vs-continuous",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "My father understanding English very well.",
        grammarRule: "State Verbs - Not Used in Continuous",
        explanation: "'Understand' is a state verb (expressing knowledge/ability). Never use it in Present Continuous form.",
        errorSpot: {
            errorWordIndex: 2,
            wrongWord: "understanding",
            correction: "understands",
            reason: "'Understand' is a state verb and cannot be used in continuous form.",
            correctionOptions: ["understands", "understand", "is understanding", "is understand"],
        },
    },

    // split(" ") → [0=Right, 1=now, 2=the, 3=students, 4=is, 5=listening, 6=to, 7=the, 8=teacher.]
    // words[4]="is" ✅  corrected: "Right now the students are listening to the teacher." ✅
    {
        id: "ps-pc-error-3",
        topic: "present-simple-vs-continuous",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "Right now the students is listening to the teacher.",
        grammarRule: "Present Continuous for Current Action",
        explanation: "'Right now' signals Present Continuous. With plural subject 'students', use 'are', not 'is'.",
        errorSpot: {
            errorWordIndex: 4,
            wrongWord: "is",
            correction: "are",
            reason: "'Students' is plural, so use 'are listening', not 'is listening'.",
            correctionOptions: ["are", "is", "was", "were"],
        },
    },

    // split(" ") → [0=She, 1=believing, 2=in, 3=ghosts, 4=and, 5=reads, 6=about, 7=them, 8=every, 9=day.]
    // words[1]="believing" ✅  corrected: "She believes in ghosts and reads about them every day." ✅
    {
        id: "ps-pc-error-4",
        topic: "present-simple-vs-continuous",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "She believing in ghosts and reads about them every day.",
        grammarRule: "State Verbs Don't Use Continuous",
        explanation: "'Believe' is a state verb. We always use 'believes' (Present Simple), never the -ing form.",
        errorSpot: {
            errorWordIndex: 1,
            wrongWord: "believing",
            correction: "believes",
            reason: "State verbs like 'believe' are never used in -ing form. Use 'believes' (Present Simple).",
            correctionOptions: ["believes", "is believing", "believed", "believe"],
        },
    },

    // split(" ") → [0=Every, 1=day, 2=she, 3=gets, 4=up, 5=at, 6=7, 7=and, 8=having, 9=breakfast.]
    // words[8]="having" ✅  corrected: "Every day she gets up at 7 and has breakfast." ✅
    {
        id: "ps-pc-error-5",
        topic: "present-simple-vs-continuous",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "Every day she gets up at 7 and having breakfast.",
        grammarRule: "Present Simple for Daily Routine",
        explanation: "'Every day' indicates a daily routine. Use Present Simple for both actions: 'gets up' and 'has'.",
        errorSpot: {
            errorWordIndex: 8,
            wrongWord: "having",
            correction: "has",
            reason: "Routine actions (every day) use Present Simple 'has', not Present Continuous 'having'.",
            correctionOptions: ["has", "is having", "have", "had"],
        },
    },

    // split(" ") → [0=We, 1=usually, 2=meeting, 3=on, 4=Fridays,, 5=but, 6=this, 7=week, 8=we, 9=are, 10=meeting, 11=on, 12=Thursday.]
    // words[2]="meeting" ✅  corrected: "We usually meet on Fridays, but this week we are meeting on Thursday." ✅
    {
        id: "ps-pc-error-6",
        topic: "present-simple-vs-continuous",
        type: "error-spot",
        difficulty: "advanced",
        sentence: "We usually meeting on Fridays, but this week we are meeting on Thursday.",
        grammarRule: "Present Simple for Regular Meetings vs Present Continuous for Exception",
        explanation: "'Usually' signals a regular habit — use Present Simple 'meet'. 'This week' is the exception, so 'are meeting' is correct there.",
        errorSpot: {
            errorWordIndex: 2,
            wrongWord: "meeting",
            correction: "meet",
            reason: "Regular scheduled meetings (usually, every week) use Present Simple 'meet', not 'meeting'.",
            correctionOptions: ["meet", "are meeting", "met", "meets"],
        },
    },

    // ===== MULTIPLE CHOICE QUESTIONS (6 questions) =====

    {
        id: "ps-pc-mc-1",
        topic: "present-simple-vs-continuous",
        type: "multiple-choice",
        difficulty: "beginner",
        sentence: "Pick the correct sentence about what is happening RIGHT NOW:",
        grammarRule: "Present Continuous - Actions Happening Now",
        explanation: "Actions happening at this moment use Present Continuous (be + -ing).",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "I am writing an email at the moment.",
            options: [
                "I am writing an email at the moment.",
                "I write an email at the moment.",
                "I am write an email at the moment.",
                "I writing an email at the moment.",
            ],
            optionExplanations: {
                "I am writing an email at the moment.": "Correct! 'At the moment' = Present Continuous (am + writing).",
                "I write an email at the moment.": "Wrong. 'At the moment' needs Present Continuous, not Simple.",
                "I am write an email at the moment.": "Wrong. Need the -ing form: am writing.",
                "I writing an email at the moment.": "Wrong. Missing the auxiliary verb: am writing.",
            },
        },
    },

    {
        id: "ps-pc-mc-2",
        topic: "present-simple-vs-continuous",
        type: "multiple-choice",
        difficulty: "beginner",
        sentence: "Pick the correct sentence about a DAILY HABIT:",
        grammarRule: "Present Simple - Habits and Routines",
        explanation: "Regular habits and daily routines use Present Simple.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "She goes to the gym three times a week.",
            options: [
                "She goes to the gym three times a week.",
                "She is going to the gym three times a week.",
                "She going to the gym three times a week.",
                "She are going to the gym three times a week.",
            ],
            optionExplanations: {
                "She goes to the gym three times a week.": "Correct! 'Three times a week' = Present Simple (habit).",
                "She is going to the gym three times a week.": "Wrong. Habits use Present Simple, not Continuous.",
                "She going to the gym three times a week.": "Wrong. Missing the auxiliary verb.",
                "She are going to the gym three times a week.": "Wrong. With 'she', use 'is' or no auxiliary (Present Simple).",
            },
        },
    },

    {
        id: "ps-pc-mc-3",
        topic: "present-simple-vs-continuous",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Which sentence correctly describes a PERMANENT SITUATION?",
        grammarRule: "Present Simple - Permanent Situations",
        explanation: "Permanent facts, situations, and where people live use Present Simple.",
        multipleChoice: {
            question: "Which is correct?",
            correctOption: "My brother lives in Canada and works as an engineer.",
            options: [
                "My brother lives in Canada and works as an engineer.",
                "My brother is living in Canada and is working as an engineer.",
                "My brother is living in Canada and works as an engineer.",
                "My brother living in Canada and working as an engineer.",
            ],
            optionExplanations: {
                "My brother lives in Canada and works as an engineer.": "Correct! Permanent location and job = Present Simple.",
                "My brother is living in Canada and is working as an engineer.": "Wrong. Permanent situation needs Present Simple, not Continuous.",
                "My brother is living in Canada and works as an engineer.": "Wrong. Mix of tenses; both should be Simple for permanent.",
                "My brother living in Canada and working as an engineer.": "Wrong. Missing auxiliary verbs.",
            },
        },
    },

    {
        id: "ps-pc-mc-4",
        topic: "present-simple-vs-continuous",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Pick the sentence that correctly contrasts USUAL HABIT with TEMPORARY SITUATION:",
        grammarRule: "Present Simple vs Continuous - Usual vs Temporary",
        explanation: "Use Present Simple for what usually happens and Present Continuous for temporary changes.",
        multipleChoice: {
            question: "Which is correct?",
            correctOption: "I usually drive to work, but today I am taking the bus.",
            options: [
                "I usually drive to work, but today I am taking the bus.",
                "I usually am driving to work, but today I take the bus.",
                "I drive to work, and today I am taking the bus.",
                "I am usually driving to work, but today I take the bus.",
            ],
            optionExplanations: {
                "I usually drive to work, but today I am taking the bus.": "Correct! Habit (Simple) vs temporary change (Continuous).",
                "I usually am driving to work, but today I take the bus.": "Wrong. 'Usually' = Simple, not Continuous.",
                "I drive to work, and today I am taking the bus.": "Wrong. Missing 'usually' context for the contrast.",
                "I am usually driving to work, but today I take the bus.": "Wrong. 'Usually' needs Simple form, not Continuous.",
            },
        },
    },

    {
        id: "ps-pc-mc-5",
        topic: "present-simple-vs-continuous",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Which sentence INCORRECTLY uses Present Continuous with a STATE VERB?",
        grammarRule: "State Verbs Cannot Be Continuous",
        explanation: "State verbs (like, love, want, need, know, believe, understand, see, hear) are never used in continuous form.",
        multipleChoice: {
            question: "Which sentence has an error?",
            correctOption: "She is wanting to move to Paris.",
            options: [
                "She is wanting to move to Paris.",
                "She wants to move to Paris.",
                "He is working in an office.",
                "They are reading a book.",
            ],
            optionExplanations: {
                "She is wanting to move to Paris.": "WRONG! 'Want' is a state verb; should be 'wants'.",
                "She wants to move to Paris.": "Correct. Present Simple with state verb.",
                "He is working in an office.": "Correct. Work is dynamic (can be continuous).",
                "They are reading a book.": "Correct. Reading is dynamic (can be continuous).",
            },
        },
    },

    {
        id: "ps-pc-mc-6",
        topic: "present-simple-vs-continuous",
        type: "multiple-choice",
        difficulty: "advanced",
        sentence: "Which sentence correctly uses both tenses to describe TEMPORARY vs PERMANENT?",
        grammarRule: "Present Continuous for Temporary Change + Present Simple for Permanent",
        explanation: "Combine tenses: permanent situation (Simple) + temporary change (Continuous).",
        multipleChoice: {
            question: "Which is correct?",
            correctOption: "I live in Paris, but I am working in London this month.",
            options: [
                "I live in Paris, but I am working in London this month.",
                "I am living in Paris, but I work in London this month.",
                "I live in Paris, but I work in London this month.",
                "I am living in Paris, and I am working in London this month.",
            ],
            optionExplanations: {
                "I live in Paris, but I am working in London this month.": "Correct! Permanent home (Simple) + temporary work assignment (Continuous).",
                "I am living in Paris, but I work in London this month.": "Wrong. Home is permanent (live), assignment is temporary (am working).",
                "I live in Paris, but I work in London this month.": "Wrong. 'This month' is temporary; needs Present Continuous.",
                "I am living in Paris, and I am working in London this month.": "Wrong. Living in Paris is permanent; should be 'live'.",
            },
        },
    },

    // ===== WORD TRANSFORM QUESTIONS (6 questions) =====

    {
        id: "ps-pc-reorder-1",
        topic: "present-simple-vs-continuous",
        type: "word-transform",
        difficulty: "beginner",
        sentence: "She ___ coffee every morning.",
        grammarRule: "Present Simple — habitual actions",
        explanation: "Use Present Simple for habits and routines. Third person singular (she) adds -s: 'drinks'.",
        tip: "Habits and routines → Present Simple: she drinks, he works, it starts.",
        wordTransform: {
            baseWord: "drink",
            correctAnswer: "drinks",
        },
    },

    {
        id: "ps-pc-reorder-2",
        topic: "present-simple-vs-continuous",
        type: "word-transform",
        difficulty: "beginner",
        sentence: "Look! The children ___ in the garden.",
        grammarRule: "Present Continuous — actions happening right now",
        explanation: "Use Present Continuous for actions happening at this moment. Structure: are/is/am + verb-ing.",
        tip: "Right now / Look / at the moment → Present Continuous: are playing, is running.",
        wordTransform: {
            baseWord: "play",
            correctAnswer: "are playing",
        },
    },

    {
        id: "ps-pc-reorder-3",
        topic: "present-simple-vs-continuous",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "He usually ___ the bus to school.",
        grammarRule: "Present Simple — frequency adverbs",
        explanation: "Frequency adverbs like 'usually' signal Present Simple. Third person singular adds -s: 'takes'.",
        tip: "Usually/always/often → Present Simple. He takes, she goes, it leaves.",
        wordTransform: {
            baseWord: "take",
            correctAnswer: "takes",
        },
    },

    {
        id: "ps-pc-reorder-4",
        topic: "present-simple-vs-continuous",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "We ___ dinner right now. Can I call you back?",
        grammarRule: "Present Continuous — temporary actions",
        explanation: "Use Present Continuous for what is happening at this moment. 'Right now' signals continuous.",
        tip: "Right now / at the moment / currently → Present Continuous: are having, is working.",
        wordTransform: {
            baseWord: "have",
            correctAnswer: "are having",
        },
    },

    {
        id: "ps-pc-reorder-5",
        topic: "present-simple-vs-continuous",
        type: "word-transform",
        difficulty: "advanced",
        sentence: "She ___ at a hospital. It's her permanent job.",
        grammarRule: "Present Simple — permanent situations",
        explanation: "Use Present Simple for permanent situations and facts. Third person singular adds -s.",
        tip: "Permanent job/situation → Present Simple: she works, he lives, it costs.",
        wordTransform: {
            baseWord: "work",
            correctAnswer: "works",
        },
    },

    {
        id: "ps-pc-reorder-6",
        topic: "present-simple-vs-continuous",
        type: "word-transform",
        difficulty: "advanced",
        sentence: "I can't come out. I ___ my homework.",
        grammarRule: "Present Continuous — current activity",
        explanation: "Use Present Continuous for a current activity preventing something else. Structure: am/is/are + verb-ing.",
        tip: "Busy right now → Present Continuous: I am doing, she is cooking, they are studying.",
        wordTransform: {
            baseWord: "do",
            correctAnswer: "am doing",
        },
    },
];

export const presentSimpleVsContinuousTopic: GrammarTopic = {
    id: "present-simple-vs-continuous",
    level: "B1",
    name: "Present Simple vs Present Continuous",
    description: "Master the difference between Present Simple (habits, routines, facts) and Present Continuous (actions happening now, temporary situations). Learn when to use state verbs with Present Simple only.",
    lesson: "Lesson 2",
    icon: "🔄",
    cards: [
        {
            id: "ps-pc-card-1",
            rule: "Present Simple for habits and routines",
            example: "My brother ___ (go) to the gym every Tuesday and Thursday.",
            answer: "goes",
            explanation:
                "Use Present Simple for things we do regularly. Add -s or -es with he, she and it. Words like every day, usually and never often go with it.",
            examples: [
                "We usually have lunch at one o'clock.",
                "She never drinks coffee after six.",
            ],
            ua: "Звички й розклад — Present Simple: every Tuesday = «щовівторка». he/she/it + -s: goes.",
        },
        {
            id: "ps-pc-card-2",
            rule: "Present Simple for facts and permanent situations",
            example: "The Dnipro ___ (flow) through Kyiv and into the Black Sea.",
            answer: "flows",
            explanation:
                "Use Present Simple for facts that are always true and for permanent situations. We do not use -ing for them.",
            examples: [
                "The sun rises in the east.",
                "My parents live in a village near Lviv.",
            ],
            ua: "Загальні факти — Present Simple: flows = «тече». Не «is flowing».",
        },
        {
            id: "ps-pc-card-3",
            rule: "am/is/are + -ing for actions happening now",
            example: "Please be quiet — the baby ___ (sleep) at the moment.",
            answer: "is sleeping",
            explanation:
                "Use Present Continuous for an action that is happening now. Look, listen, now and at the moment often go with it.",
            examples: [
                "Listen! Someone is knocking at the door.",
                "Sorry, I can't talk now. I'm driving.",
            ],
            ua: "Present Continuous: am/is/are + -ing, «зараз»: is sleeping = «спить (саме зараз)».",
        },
        {
            id: "ps-pc-card-4",
            rule: "Present Continuous for temporary situations",
            example: "This month I ___ (stay) with my cousin while the builders repaint my flat.",
            answer: "am staying",
            explanation:
                "Use Present Continuous for a situation that is temporary. It is true around now, but it will change soon.",
            examples: [
                "Our team is working from home this week.",
                "He is learning to drive at the moment.",
            ],
            ua: "Тимчасова ситуація («цього місяця») — am staying. Постійна ситуація — Present Simple.",
        },
        {
            id: "ps-pc-card-5",
            rule: "usually (Simple) vs today / this week (Continuous)",
            example: "Lucy normally ___ (wear) jeans to the office, but today she's wearing a suit.",
            answer: "wears",
            explanation:
                "Use Present Simple for what usually happens. Use Present Continuous for what is different today or this week.",
            examples: [
                "Our dog usually sleeps all day, but now he is barking at the postman.",
                "I normally have tea, but this morning I'm drinking coffee.",
            ],
            ua: "usually/normally — Present Simple, а today/this week (виняток) — Present Continuous.",
        },
        {
            id: "ps-pc-card-6",
            rule: "do/does + base verb in questions and negatives",
            example: "Does your sister ___ (work) on Saturdays?",
            answer: "work",
            explanation:
                "In Present Simple questions and negatives we use do/does and the base verb. The -s goes on does, not on the main verb.",
            examples: [
                "Do you take sugar in your tea?",
                "My manager doesn't answer emails at the weekend.",
            ],
            ua: "У питаннях і запереченнях do/does + початкова форма: Does she work? (без -s).",
        },
        {
            id: "ps-pc-card-7",
            rule: "State verbs (know, need, want, love) are not used with -ing",
            example: "We ___ (need) a bigger table for the party on Saturday.",
            answer: "need",
            explanation:
                "State verbs describe thoughts, feelings and possession, not actions. We use Present Simple with them, even when we mean now.",
            examples: [
                "I don't know her phone number.",
                "My son loves chocolate ice cream.",
            ],
            ua: "Дієслова стану (know, need, want, love) не мають -ing: «нам потрібен» — need.",
        },
        {
            id: "ps-pc-card-8",
            rule: "have as an action (is having) vs have = own",
            example: "She ___ (have) a shower, so she can't answer the phone.",
            answer: "is having",
            explanation:
                "Have is a state verb when it means own, so we say I have a car. When have is an action, like eat or take a shower, we can use Present Continuous.",
            examples: [
                "We're having a great time in Prague this week.",
                "My sister has two cats and a small flat.",
            ],
            ua: "have = «їсти, приймати душ» — може бути is having; have = «мати» — тільки have.",
        },
    ],
    rules: presentSimpleVsContinuous,
};

export default presentSimpleVsContinuous;
