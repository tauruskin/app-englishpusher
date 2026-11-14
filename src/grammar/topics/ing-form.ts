/**
 * EnglishPusher Grammar Testing - -ing Form
 * B1 Level (Speak Out) - Lesson 8D
 *
 * 6 gap-fill, 6 error-spot, 7 multiple-choice, 6 word-transform = 25 questions
 * VERIFIED: All error-spot indexes checked against split(" ") positions.
 */

import type { GrammarQuestion, GrammarTopic } from "../types.ts";

export const ingFormQuestions: GrammarQuestion[] = [

    // ===== GAP FILL QUESTIONS (6 questions) =====

    {
        id: "ingf-gap-1",
        topic: "ing-form",
        type: "gap-fill",
        difficulty: "beginner",
        sentence: "I suggest ___ a few days before the exam to relax.",
        grammarRule: "suggest + -ing form",
        explanation: "'Suggest' is always followed by the -ing form, never by to + infinitive. We say suggest taking, not suggest to take.",
        tip: "suggest, recommend, keep, practise = always + -ing, never + to.",
        gapFill: {
            gapIndex: 2,
            correctAnswer: "taking",
            options: ["taking", "to take", "take", "took"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "ingf-gap-2",
        topic: "ing-form",
        type: "gap-fill",
        difficulty: "beginner",
        sentence: "Stop interrupting! You keep ___ the same thing.",
        grammarRule: "keep + -ing form (repeated action)",
        explanation: "'Keep' + -ing describes an action that happens again and again. 'Keep saying' means saying it repeatedly.",
        tip: "keep + -ing = do something again and again.",
        gapFill: {
            gapIndex: 4,
            correctAnswer: "saying",
            options: ["saying", "to say", "say", "said"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "ingf-gap-3",
        topic: "ing-form",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "The dentist recommends ___ your teeth twice a day.",
        grammarRule: "recommend + -ing form",
        explanation: "'Recommend' is followed by the -ing form, not to + infinitive. We say recommends brushing, not recommends to brush.",
        tip: "recommend + -ing — never recommend + to.",
        gapFill: {
            gapIndex: 3,
            correctAnswer: "brushing",
            options: ["brushing", "to brush", "brush", "brushed"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "ingf-gap-4",
        topic: "ing-form",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "I practise ___ English with my colleagues every lunchtime.",
        grammarRule: "practise + -ing form",
        explanation: "'Practise' is always followed by the -ing form. We say practise speaking, never practise to speak.",
        tip: "practise + -ing, like suggest and recommend.",
        gapFill: {
            gapIndex: 2,
            correctAnswer: "speaking",
            options: ["speaking", "to speak", "speak", "spoke"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "ingf-gap-5",
        topic: "ing-form",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "He can't stand ___ in long queues at the supermarket.",
        grammarRule: "can't stand + -ing form",
        explanation: "The expression 'can't stand' is followed by the -ing form. 'Can't stand waiting' means hating to wait.",
        tip: "can't stand, wouldn't mind, look forward to = expressions + -ing.",
        gapFill: {
            gapIndex: 3,
            correctAnswer: "waiting",
            options: ["waiting", "to wait", "wait", "waited"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "ingf-gap-6",
        topic: "ing-form",
        type: "gap-fill",
        difficulty: "advanced",
        sentence: "We look forward to ___ you again soon.",
        grammarRule: "look forward to + -ing form",
        explanation: "In 'look forward to', 'to' is a preposition, not part of an infinitive — so the next verb must be -ing: look forward to seeing.",
        tip: "look forward TO + -ing — 'to' here is a preposition, not an infinitive marker.",
        gapFill: {
            gapIndex: 4,
            correctAnswer: "seeing",
            options: ["seeing", "to see", "see", "saw"],
            correctOptionIndex: 0,
        },
    },

    // ===== ERROR SPOT QUESTIONS (6 questions) =====
    // RULE: Every error is exactly ONE word. Replacing wrongWord with correction
    // must produce a 100% grammatically correct sentence with no leftover errors.

    // split(" ") → [0=She, 1=suggested, 2=go, 3=to, 4=the, 5=new, 6=Italian, 7=restaurant.]
    // words[2]="go" ✅  corrected: "She suggested going to the new Italian restaurant." ✅
    {
        id: "ingf-error-1",
        topic: "ing-form",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "She suggested go to the new Italian restaurant.",
        grammarRule: "suggest + -ing form",
        explanation: "'Suggest' is always followed by the -ing form, never the base verb or to + infinitive.",
        errorSpot: {
            errorWordIndex: 2,
            wrongWord: "go",
            correction: "going",
            reason: "After 'suggest', use the -ing form: 'suggested going', not the base form 'go'.",
            correctionOptions: ["going", "go", "to go", "gone"],
        },
    },

    // split(" ") → [0=You, 1=keep, 2=make, 3=the, 4=same, 5=mistake, 6=in, 7=your, 8=essays.]
    // words[2]="make" ✅  corrected: "You keep making the same mistake in your essays." ✅
    {
        id: "ingf-error-2",
        topic: "ing-form",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "You keep make the same mistake in your essays.",
        grammarRule: "keep + -ing form",
        explanation: "'Keep' + -ing describes a repeated action. The base form 'make' cannot follow 'keep' directly.",
        errorSpot: {
            errorWordIndex: 2,
            wrongWord: "make",
            correction: "making",
            reason: "After 'keep', use the -ing form: 'keep making', not the base form 'make'.",
            correctionOptions: ["making", "make", "to make", "made"],
        },
    },

    // split(" ") → [0=Can, 1=you, 2=imagine, 3=live, 4=without, 5=a, 6=phone, 7=for, 8=a, 9=week?]
    // words[3]="live" ✅  corrected: "Can you imagine living without a phone for a week?" ✅
    {
        id: "ingf-error-3",
        topic: "ing-form",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "Can you imagine live without a phone for a week?",
        grammarRule: "imagine + -ing form",
        explanation: "'Imagine' is followed by the -ing form. We picture the action happening: imagine living, not imagine live.",
        errorSpot: {
            errorWordIndex: 3,
            wrongWord: "live",
            correction: "living",
            reason: "After 'imagine', use the -ing form: 'imagine living', not the base form 'live'.",
            correctionOptions: ["living", "live", "to live", "lived"],
        },
    },

    // split(" ") → [0=He, 1=practises, 2=play, 3=the, 4=piano, 5=every, 6=evening.]
    // words[2]="play" ✅  corrected: "He practises playing the piano every evening." ✅
    {
        id: "ingf-error-4",
        topic: "ing-form",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "He practises play the piano every evening.",
        grammarRule: "practise + -ing form",
        explanation: "'Practise' is always followed by the -ing form: practises playing, never practises play.",
        errorSpot: {
            errorWordIndex: 2,
            wrongWord: "play",
            correction: "playing",
            reason: "After 'practise', use the -ing form: 'practises playing', not the base form 'play'.",
            correctionOptions: ["playing", "play", "to play", "played"],
        },
    },

    // split(" ") → [0=The, 1=guide, 2=recommended, 3=visit, 4=the, 5=old, 6=town, 7=at, 8=sunset.]
    // words[3]="visit" ✅  corrected: "The guide recommended visiting the old town at sunset." ✅
    {
        id: "ingf-error-5",
        topic: "ing-form",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "The guide recommended visit the old town at sunset.",
        grammarRule: "recommend + -ing form",
        explanation: "'Recommend' is followed by the -ing form: recommended visiting, never recommended visit.",
        errorSpot: {
            errorWordIndex: 3,
            wrongWord: "visit",
            correction: "visiting",
            reason: "After 'recommend', use the -ing form: 'recommended visiting', not the base form 'visit'.",
            correctionOptions: ["visiting", "visit", "to visit", "visited"],
        },
    },

    // split(" ") → [0=I, 1=can't, 2=stand, 3=wait, 4=for, 5=buses, 6=in, 7=the, 8=rain.]
    // words[3]="wait" ✅  corrected: "I can't stand waiting for buses in the rain." ✅
    {
        id: "ingf-error-6",
        topic: "ing-form",
        type: "error-spot",
        difficulty: "advanced",
        sentence: "I can't stand wait for buses in the rain.",
        grammarRule: "can't stand + -ing form",
        explanation: "The expression 'can't stand' needs the -ing form: can't stand waiting, never can't stand wait.",
        errorSpot: {
            errorWordIndex: 3,
            wrongWord: "wait",
            correction: "waiting",
            reason: "After 'can't stand', use the -ing form: 'can't stand waiting', not the base form 'wait'.",
            correctionOptions: ["waiting", "wait", "to wait", "waited"],
        },
    },

    // ===== MULTIPLE CHOICE QUESTIONS (7 questions) =====

    {
        id: "ingf-mc-1",
        topic: "ing-form",
        type: "multiple-choice",
        difficulty: "beginner",
        sentence: "Look at the four sentences below and choose the grammatically correct one.",
        grammarRule: "hate + -ing form",
        explanation: "'Hate' can be followed by the -ing form (or to + infinitive, with little difference in meaning): hate being late = hate to be late.",
        tip: "like, hate, begin, continue — both -ing and to + infinitive work, with almost no change in meaning.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "I hate being late for meetings.",
            options: [
                "I hate being late for meetings.",
                "I hate lately for meetings.",
                "I hate late for meetings.",
                "I hate to being late for meetings.",
            ],
            optionExplanations: {
                "I hate being late for meetings.": "Correct! 'Hate' can be followed by the -ing form: hate being late.",
                "I hate lately for meetings.": "Wrong. 'Lately' is an adverb meaning 'recently' — it doesn't fit here at all.",
                "I hate late for meetings.": "Wrong. 'Late' alone is an adjective, not a verb form — we need 'being late'.",
                "I hate to being late for meetings.": "Wrong. Don't mix 'to' with the -ing form: say 'hate being late' OR 'hate to be late', never 'hate to being'.",
            },
        },
    },

    {
        id: "ingf-mc-2",
        topic: "ing-form",
        type: "multiple-choice",
        difficulty: "beginner",
        sentence: "Look at the four sentences below and choose the grammatically correct one.",
        grammarRule: "begin + -ing form",
        explanation: "'Begin' can be followed by the -ing form: began raining. Don't mix 'to' with -ing, and don't use the base form alone.",
        tip: "begin + -ing (or to + infinitive) — but never mix the two: began to raining is wrong.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "It began raining just as we left the house.",
            options: [
                "It began raining just as we left the house.",
                "It began rain just as we left the house.",
                "It began to raining just as we left the house.",
                "It begin raining just as we left the house.",
            ],
            optionExplanations: {
                "It began raining just as we left the house.": "Correct! 'Began' + -ing form: began raining.",
                "It began rain just as we left the house.": "Wrong. The base form 'rain' cannot follow 'began' directly — it needs 'raining' or 'to rain'.",
                "It began to raining just as we left the house.": "Wrong. Don't mix 'to' with the -ing form: it's either 'began raining' or 'began to rain', never 'began to raining'.",
                "It begin raining just as we left the house.": "Wrong. The past tense is 'began', not 'begin'.",
            },
        },
    },

    {
        id: "ingf-mc-3",
        topic: "ing-form",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Look at the four sentences below and choose the grammatically correct one.",
        grammarRule: "delay + -ing form",
        explanation: "'Delay' is followed by the -ing form: delayed announcing, never delayed to announce or delayed announce.",
        tip: "delay + -ing — never delay + to or the base form.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "They delayed announcing the winner until Friday.",
            options: [
                "They delayed announcing the winner until Friday.",
                "They delayed to announce the winner until Friday.",
                "They delayed announce the winner until Friday.",
                "They delayed announced the winner until Friday.",
            ],
            optionExplanations: {
                "They delayed announcing the winner until Friday.": "Correct! 'Delay' + -ing form: delayed announcing.",
                "They delayed to announce the winner until Friday.": "Wrong. 'Delay' is never followed by to + infinitive.",
                "They delayed announce the winner until Friday.": "Wrong. The base form 'announce' cannot follow 'delayed' directly.",
                "They delayed announced the winner until Friday.": "Wrong. The past form 'announced' cannot follow 'delayed' directly — it needs the -ing form.",
            },
        },
    },

    {
        id: "ingf-mc-4",
        topic: "ing-form",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Think about the difference between remembering a past event and remembering a future duty.",
        grammarRule: "remember + -ing form (a past memory)",
        explanation: "'Remember' + -ing form talks about a memory of a past action. 'Remember' + to + infinitive is a reminder about something you must not forget to do in the future.",
        tip: "remember doing = a memory of the past. remember to do = don't forget (future).",
        multipleChoice: {
            question: "Which sentence describes a MEMORY of something that already happened, not a future duty?",
            correctOption: "I remember meeting her at the conference last year.",
            options: [
                "I remember meeting her at the conference last year.",
                "I must remember to meet her at the conference next year.",
                "Remember to lock the door when you leave.",
                "Please remember to bring your passport tomorrow.",
            ],
            optionExplanations: {
                "I remember meeting her at the conference last year.": "Correct! 'Remember' + -ing = a memory of a past event: 'last year' confirms it already happened.",
                "I must remember to meet her at the conference next year.": "Wrong. 'Remember to meet' + 'next year' is a reminder about the future, not a memory.",
                "Remember to lock the door when you leave.": "Wrong. This is an instruction about the future — a reminder, not a memory.",
                "Please remember to bring your passport tomorrow.": "Wrong. 'Tomorrow' shows this is a future reminder, not a past memory.",
            },
        },
    },

    {
        id: "ingf-mc-5",
        topic: "ing-form",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Look at the four sentences below and choose the grammatically correct one.",
        grammarRule: "look forward to + -ing form",
        explanation: "'To' in 'look forward to' is a preposition, so it must be followed by the -ing form: looking forward to seeing, never to see.",
        tip: "look forward TO + -ing — 'to' is a preposition here, not an infinitive marker.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "I'm looking forward to seeing you this weekend.",
            options: [
                "I'm looking forward to seeing you this weekend.",
                "I'm looking forward to see you this weekend.",
                "I'm looking forward see you this weekend.",
                "I'm looking forward to seen you this weekend.",
            ],
            optionExplanations: {
                "I'm looking forward to seeing you this weekend.": "Correct! 'Look forward to' + -ing form: looking forward to seeing.",
                "I'm looking forward to see you this weekend.": "Wrong. 'To' here is a preposition, not an infinitive marker — it needs the -ing form, not 'see'.",
                "I'm looking forward see you this weekend.": "Wrong. The preposition 'to' is missing entirely.",
                "I'm looking forward to seen you this weekend.": "Wrong. 'Seen' is a past participle, not the -ing form.",
            },
        },
    },

    {
        id: "ingf-mc-6",
        topic: "ing-form",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Look at the four sentences below and choose the grammatically correct one.",
        grammarRule: "wouldn't mind + -ing form",
        explanation: "'Wouldn't mind' is followed by the -ing form: wouldn't mind trying, never wouldn't mind to try.",
        tip: "wouldn't mind + -ing — never wouldn't mind + to.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "I wouldn't mind trying that new restaurant.",
            options: [
                "I wouldn't mind trying that new restaurant.",
                "I wouldn't mind to try that new restaurant.",
                "I wouldn't mind try that new restaurant.",
                "I wouldn't mind tried that new restaurant.",
            ],
            optionExplanations: {
                "I wouldn't mind trying that new restaurant.": "Correct! 'Wouldn't mind' + -ing form: wouldn't mind trying.",
                "I wouldn't mind to try that new restaurant.": "Wrong. 'Wouldn't mind' is never followed by to + infinitive.",
                "I wouldn't mind try that new restaurant.": "Wrong. The base form 'try' cannot follow 'wouldn't mind' directly.",
                "I wouldn't mind tried that new restaurant.": "Wrong. The past form 'tried' cannot follow 'wouldn't mind' — it needs the -ing form.",
            },
        },
    },

    {
        id: "ingf-mc-7",
        topic: "ing-form",
        type: "multiple-choice",
        difficulty: "advanced",
        sentence: "Learners often make a mistake with 'suggest' by copying the pattern of verbs like 'tell' or 'want'.",
        grammarRule: "suggest + -ing form (no object + to infinitive)",
        explanation: "'Suggest' is followed directly by the -ing form: suggested studying. We cannot say suggest someone to do something, or suggest to do something.",
        tip: "Never say 'suggest someone to do' — say 'suggest doing' or 'suggest that someone do'.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "She suggested studying together before the exam.",
            options: [
                "She suggested studying together before the exam.",
                "She suggested me to study together before the exam.",
                "She suggested to study together before the exam.",
                "She suggested that studying together before the exam.",
            ],
            optionExplanations: {
                "She suggested studying together before the exam.": "Correct! 'Suggest' + -ing form, with no object in between: suggested studying.",
                "She suggested me to study together before the exam.": "Wrong. 'Suggest' cannot take an object + to + infinitive, unlike 'tell' or 'want'.",
                "She suggested to study together before the exam.": "Wrong. 'Suggest' is never followed by to + infinitive.",
                "She suggested that studying together before the exam.": "Wrong. 'That' needs a full clause with a subject and verb, such as 'that they study together'.",
            },
        },
    },

    // ===== WORD TRANSFORM QUESTIONS (6 questions) =====

    {
        id: "ingf-wt-1",
        topic: "ing-form",
        type: "word-transform",
        difficulty: "beginner",
        sentence: "My little brother likes ___ (build) towers out of blocks.",
        grammarRule: "like + -ing form",
        explanation: "'Like' can be followed by the -ing form: likes building. ('Likes to build' is also correct, with almost no difference in meaning.)",
        tip: "like, hate, begin + -ing or to infinitive — both are fine.",
        wordTransform: {
            baseWord: "build",
            correctAnswer: "building",
        },
    },

    {
        id: "ingf-wt-2",
        topic: "ing-form",
        type: "word-transform",
        difficulty: "beginner",
        sentence: "The baby began ___ (crawl) at eight months old.",
        grammarRule: "begin + -ing form",
        explanation: "'Began' can be followed by the -ing form: began crawling.",
        tip: "begin + -ing (or to + infinitive) — little change in meaning.",
        wordTransform: {
            baseWord: "crawl",
            correctAnswer: "crawling",
        },
    },

    {
        id: "ingf-wt-3",
        topic: "ing-form",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "The airline delayed ___ (announce) the departure gate.",
        grammarRule: "delay + -ing form",
        explanation: "'Delay' is followed by the -ing form: delayed announcing.",
        tip: "delay + -ing — never delay + to.",
        wordTransform: {
            baseWord: "announce",
            correctAnswer: "announcing",
        },
    },

    {
        id: "ingf-wt-4",
        topic: "ing-form",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "My dad hates ___ (queue) at the post office.",
        grammarRule: "hate + -ing form",
        explanation: "'Hate' can be followed by the -ing form: hates queuing. Both 'queuing' and 'queueing' are correct spellings.",
        tip: "hate + -ing (or to + infinitive) — little change in meaning.",
        wordTransform: {
            baseWord: "queue",
            correctAnswer: "queuing",
            alternativeAnswers: ["queueing"],
        },
    },

    {
        id: "ingf-wt-5",
        topic: "ing-form",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "I'll always remember ___ (watch) my first football match with my grandfather.",
        grammarRule: "remember + -ing form (a past memory)",
        explanation: "'Remember' + -ing form talks about a memory of something that already happened: remember watching.",
        tip: "remember doing = a memory of the past. remember to do = don't forget (future).",
        wordTransform: {
            baseWord: "watch",
            correctAnswer: "watching",
        },
    },

    {
        id: "ingf-wt-6",
        topic: "ing-form",
        type: "word-transform",
        difficulty: "advanced",
        sentence: "After the long hike, I wouldn't mind ___ (rest) for a while.",
        grammarRule: "wouldn't mind + -ing form",
        explanation: "'Wouldn't mind' is followed by the -ing form: wouldn't mind resting.",
        tip: "wouldn't mind + -ing — never wouldn't mind + to.",
        wordTransform: {
            baseWord: "rest",
            correctAnswer: "resting",
        },
    },
];

export const ingFormTopic: GrammarTopic = {
    id: "ing-form",
    level: "B1",
    name: "The -ing Form",
    description: "Practise using the -ing form after verbs like suggest, keep and imagine, and after expressions like look forward to and can't stand.",
    lesson: "Lesson 8D",
    icon: "➿",
    cards: [
        {
            id: "ingf-card-1",
            rule: "begin, delay + -ing",
            example: "After the interval, the orchestra began ___ (play) the second half of the concert.",
            answer: "playing",
            explanation: "Begin and delay can be followed by the -ing form (as well as to + infinitive, with little difference in meaning).",
            examples: ["The company delayed launching the new product until spring.", "He began exercising every morning after New Year."],
            ua: "begin, delay + -ing (або to): began playing ≈ began to play.",
        },
        {
            id: "ingf-card-2",
            rule: "hate, like + -ing (or to)",
            example: "My sister hates ___ (wait) in long queues at the airport.",
            answer: "waiting",
            explanation: "After hate and like, you can use the -ing form or to + infinitive with almost no change in meaning: hate waiting = hate to wait.",
            examples: ["I like reading on rainy afternoons.", "We hate arriving late to parties."],
            ua: "hate/like + -ing або to: майже без різниці у значенні.",
        },
        {
            id: "ingf-card-3",
            rule: "imagine + -ing",
            example: "I can't imagine ___ (live) in a country where I don't speak the language.",
            answer: "living",
            explanation: "Imagine is always followed by the -ing form — we picture the action happening.",
            examples: ["Can you imagine working from a beach every day?", "I imagine moving to a new city would be exciting."],
            ua: "imagine + -ing: «уявити, як...» → imagine living, не imagine to live.",
        },
        {
            id: "ingf-card-4",
            rule: "keep + -ing",
            example: "The printer keeps ___ (stop) in the middle of the page.",
            answer: "stopping",
            explanation: "Keep + -ing describes an action that happens again and again, often something annoying.",
            examples: ["My neighbour's dog keeps barking at night.", "Keep trying — you'll get it eventually!"],
            ua: "keep + -ing: дія, що повторюється: keeps stopping «постійно зупиняється».",
        },
        {
            id: "ingf-card-5",
            rule: "practise + -ing",
            example: "Every Saturday, she practises ___ (drive) in the empty car park.",
            answer: "driving",
            explanation: "Practise is always followed by the -ing form, not to + infinitive.",
            examples: ["He practises answering interview questions with his sister.", "We should practise speaking English more often."],
            ua: "practise + -ing (не to): practises driving, не practises to drive.",
        },
        {
            id: "ingf-card-6",
            rule: "recommend, suggest + -ing",
            example: "The waiter recommended ___ (try) the fish special.",
            answer: "trying",
            explanation: "Recommend and suggest are followed by the -ing form, never by to + infinitive.",
            examples: ["I suggest booking the tickets early.", "The doctor recommends drinking more water."],
            ua: "recommend, suggest + -ing: suggest booking, не suggest to book.",
        },
        {
            id: "ingf-card-7",
            rule: "remember + -ing (a past memory)",
            example: "I still remember ___ (ride) my bike for the first time.",
            answer: "riding",
            explanation: "Remember + -ing talks about a memory of something that already happened. Compare: remember to do = don't forget to do it in the future.",
            examples: ["Do you remember meeting at that wedding years ago?", "She remembers feeling nervous on her first day at work."],
            ua: "remember + -ing — спогад про минуле, на відміну від remember to do (не забути).",
        },
        {
            id: "ingf-card-8",
            rule: "can't stand, look forward to, wouldn't mind + -ing",
            example: "I wouldn't mind ___ (stay) a bit longer if that's okay.",
            answer: "staying",
            explanation: "Can't stand, look forward to and wouldn't mind are all followed by the -ing form.",
            examples: ["I can't stand waiting in traffic every morning.", "We're looking forward to visiting you next month."],
            ua: "can't stand, look forward to, wouldn't mind + -ing: look forward to seeing, не to see.",
        },
    ],
    rules: ingFormQuestions,
};

export default ingFormQuestions;
