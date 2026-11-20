/**
 * EnglishPusher Grammar Testing - Present Perfect + Superlative
 * B1 Level (Speak Out) - Lesson 4D
 *
 * 6 gap-fill, 6 error-spot, 7 multiple-choice, 6 word-transform = 25 questions
 * VERIFIED: All error-spot indexes checked against split(" ") positions.
 */

import type { GrammarQuestion, GrammarTopic } from "../types.ts";

export const presentPerfectSuperlative: GrammarQuestion[] = [

    // ===== GAP FILL QUESTIONS (6 questions) =====

    {
        id: "pps-gap-1",
        topic: "present-perfect-superlative",
        type: "gap-fill",
        difficulty: "beginner",
        sentence: "It's the ___ film I've ever seen.",
        grammarRule: "Irregular Superlative 'Good' → 'Best'",
        explanation: "'Good' has an irregular superlative form: best. We never say 'goodest' or 'most good'.",
        tip: "good→best, bad→worst, far→furthest — irregular, just like go→went.",
        gapFill: {
            gapIndex: 2,
            correctAnswer: "best",
            options: ["best", "goodest", "more good", "most good"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "pps-gap-2",
        topic: "present-perfect-superlative",
        type: "gap-fill",
        difficulty: "beginner",
        sentence: "This is the ___ hotel I've ever stayed in.",
        grammarRule: "Superlative of Long Adjectives — 'Most' + Adjective",
        explanation: "Adjectives with two or more syllables form the superlative with 'most', not '-est'.",
        tip: "expensive, beautiful, comfortable → most + adjective, never adjective+est.",
        gapFill: {
            gapIndex: 3,
            correctAnswer: "most expensive",
            options: ["most expensive", "expensivest", "more expensive", "much expensive"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "pps-gap-3",
        topic: "present-perfect-superlative",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "That's the ___ mistake you've ever made.",
        grammarRule: "Irregular Superlative 'Bad' → 'Worst'",
        explanation: "'Bad' has an irregular superlative form: worst. It never takes '-est' or 'most'.",
        tip: "bad→worse→worst — the whole comparison chain is irregular.",
        gapFill: {
            gapIndex: 2,
            correctAnswer: "worst",
            options: ["worst", "baddest", "more bad", "most bad"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "pps-gap-4",
        topic: "present-perfect-superlative",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "She's the kindest person I ___ met.",
        grammarRule: "Present Perfect + Ever — Word Order",
        explanation: "To add 'ever' to this structure, use have/has + ever + past participle: 'I have ever met', not 'did ever meet'.",
        tip: "have/has always comes before 'ever', and 'ever' always comes before the past participle.",
        gapFill: {
            gapIndex: 5,
            correctAnswer: "have ever",
            options: ["have ever", "has ever", "did ever", "ever have"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "pps-gap-5",
        topic: "present-perfect-superlative",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "This is the funniest joke I've ___ heard.",
        grammarRule: "'Ever' — At Any Time in Your Life",
        explanation: "'Ever' means 'at any time in your life until now'. It fits naturally between 've and the past participle in this structure.",
        tip: "ever = in your whole life so far — never, already and yet don't fit this meaning here.",
        gapFill: {
            gapIndex: 6,
            correctAnswer: "ever",
            options: ["ever", "never", "already", "yet"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "pps-gap-6",
        topic: "present-perfect-superlative",
        type: "gap-fill",
        difficulty: "advanced",
        sentence: "This is the biggest company she ___ worked for.",
        grammarRule: "Subject-Verb Agreement — Has Ever + Past Participle",
        explanation: "With a third person singular subject (he/she/it), use 'has', not 'have': 'she has ever worked for'.",
        tip: "I/we/you/they → have ever. He/she/it → has ever.",
        gapFill: {
            gapIndex: 6,
            correctAnswer: "has ever",
            options: ["has ever", "have ever", "is ever", "did ever"],
            correctOptionIndex: 0,
        },
    },

    // ===== ERROR SPOT QUESTIONS (6 questions) =====
    // RULE: Every error is exactly ONE word. Replacing wrongWord with correction
    // must produce a 100% grammatically correct sentence with no leftover errors.

    // split(" ") → [0=This,1=is,2=the,3=goodest,4=film,5=I've,6=ever,7=seen.]
    // words[3]="goodest" ✅  corrected: "This is the best film I've ever seen." ✅
    {
        id: "pps-error-1",
        topic: "present-perfect-superlative",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "This is the goodest film I've ever seen.",
        grammarRule: "Irregular Superlative 'Good' → 'Best'",
        explanation: "'Good' doesn't follow the regular -est pattern. Its superlative is irregular: best.",
        errorSpot: {
            errorWordIndex: 3,
            wrongWord: "goodest",
            correction: "best",
            reason: "'Good' is irregular: good→better→best. Never 'goodest'.",
            correctionOptions: ["best", "goodest", "more good", "most good"],
        },
    },

    // split(" ") → [0=It's,1=the,2=baddest,3=storm,4=I've,5=ever,6=seen.]
    // words[2]="baddest" ✅  corrected: "It's the worst storm I've ever seen." ✅
    {
        id: "pps-error-2",
        topic: "present-perfect-superlative",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "It's the baddest storm I've ever seen.",
        grammarRule: "Irregular Superlative 'Bad' → 'Worst'",
        explanation: "'Bad' is irregular: bad→worse→worst. It never takes '-est'.",
        errorSpot: {
            errorWordIndex: 2,
            wrongWord: "baddest",
            correction: "worst",
            reason: "'Bad' is irregular: the superlative is 'worst', not 'baddest'.",
            correctionOptions: ["worst", "baddest", "more bad", "most bad"],
        },
    },

    // split(" ") → [0=This,1=is,2=the,3=biggest,4=car,5=I've,6=ever,7=drove.]
    // words[7]="drove." ✅ (punctuation stripped) corrected: "This is the biggest car I've ever driven." ✅
    {
        id: "pps-error-3",
        topic: "present-perfect-superlative",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "This is the biggest car I've ever drove.",
        grammarRule: "Past Participle after Present Perfect",
        explanation: "After 've (have) in the present perfect, use the past participle 'driven', not the past simple 'drove'.",
        errorSpot: {
            errorWordIndex: 7,
            wrongWord: "drove",
            correction: "driven",
            reason: "Present perfect needs the past participle: drive→drove→driven. Use 'driven' after 've.",
            correctionOptions: ["driven", "drove", "drives", "driving"],
        },
    },

    // split(" ") → [0=He's,1=the,2=more,3=intelligent,4=person,5=I've,6=ever,7=met.]
    // words[2]="more" ✅  corrected: "He's the most intelligent person I've ever met." ✅
    {
        id: "pps-error-4",
        topic: "present-perfect-superlative",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "He's the more intelligent person I've ever met.",
        grammarRule: "Superlative, Not Comparative",
        explanation: "Comparing one person to everyone else you've ever met needs the superlative ('most intelligent'), not the comparative ('more intelligent').",
        errorSpot: {
            errorWordIndex: 2,
            wrongWord: "more",
            correction: "most",
            reason: "This compares against everyone, so it needs the superlative 'most intelligent', not the comparative 'more intelligent'.",
            correctionOptions: ["most", "more", "much", "many"],
        },
    },

    // split(" ") → [0=That's,1=the,2=worst,3=mistake,4=you've,5=ever,6=make.]
    // words[6]="make." ✅ (punctuation stripped) corrected: "That's the worst mistake you've ever made." ✅
    {
        id: "pps-error-5",
        topic: "present-perfect-superlative",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "That's the worst mistake you've ever make.",
        grammarRule: "Past Participle after Present Perfect",
        explanation: "After 've (have) in the present perfect, use the past participle 'made', not the base form 'make'.",
        errorSpot: {
            errorWordIndex: 6,
            wrongWord: "make",
            correction: "made",
            reason: "Present perfect needs the past participle: make→made. Use 'made' after 've.",
            correctionOptions: ["made", "make", "making", "makes"],
        },
    },

    // split(" ") → [0=It's,1=a,2=most,3=boring,4=film,5=I've,6=ever,7=seen.]
    // words[1]="a" ✅  corrected: "It's the most boring film I've ever seen." ✅
    {
        id: "pps-error-6",
        topic: "present-perfect-superlative",
        type: "error-spot",
        difficulty: "advanced",
        sentence: "It's a most boring film I've ever seen.",
        grammarRule: "'The' before the Superlative Adjective",
        explanation: "Superlative adjectives always need 'the' in front of them, not 'a' or 'an' — even though 'a' is normal with other adjectives.",
        errorSpot: {
            errorWordIndex: 1,
            wrongWord: "a",
            correction: "the",
            reason: "Superlatives always take 'the': 'the most boring', never 'a most boring'.",
            correctionOptions: ["the", "a", "an", "one"],
        },
    },

    // ===== MULTIPLE CHOICE QUESTIONS (7 questions) =====

    {
        id: "pps-mc-1",
        topic: "present-perfect-superlative",
        type: "multiple-choice",
        difficulty: "beginner",
        sentence: "Choose the sentence that correctly uses present perfect + superlative:",
        grammarRule: "Present Perfect + Superlative — Basic Structure",
        explanation: "We use the present perfect (have/has + past participle) with a superlative adjective to talk about the best or worst experience of our life so far.",
        tip: "the + superlative + noun + subject + have/has + past participle — no past simple needed.",
        multipleChoice: {
            question: "Which sentence is grammatically correct?",
            correctOption: "It's the best holiday I've ever had.",
            options: [
                "It's the best holiday I've ever had.",
                "It's the best holiday I ever had.",
                "It's the best holiday I have had ever.",
                "It's the best holiday I did ever have.",
            ],
            optionExplanations: {
                "It's the best holiday I've ever had.": "Correct! Present perfect ('ve had) + superlative ('best') + 'ever' in the right position.",
                "It's the best holiday I ever had.": "Wrong. 'Ever' in this structure needs the present perfect auxiliary 'have', not the past simple 'had' on its own.",
                "It's the best holiday I have had ever.": "Wrong. 'Ever' goes between 'have' and the past participle, not at the end of the sentence.",
                "It's the best holiday I did ever have.": "Wrong. This structure needs present perfect (have + past participle), not 'did'.",
            },
        },
    },

    {
        id: "pps-mc-2",
        topic: "present-perfect-superlative",
        type: "multiple-choice",
        difficulty: "beginner",
        sentence: "Choose the correct superlative form of 'far':",
        grammarRule: "Irregular Superlative 'Far' → 'Furthest'",
        explanation: "'Far' has an irregular superlative form: furthest (or farthest) — never 'farest' or 'most far'.",
        tip: "good→best, bad→worst, far→furthest/farthest — learn these by heart; they don't follow the normal rules.",
        multipleChoice: {
            question: "Which is the correct superlative of 'far'?",
            correctOption: "furthest",
            options: ["furthest", "farest", "most far", "farrest"],
            optionExplanations: {
                furthest: "Correct! 'Far' is irregular: far → furthest (or farthest).",
                farest: "Wrong. 'Far' doesn't take the regular -est ending.",
                "most far": "Wrong. 'Far' is irregular — it doesn't use 'most + adjective' either.",
                farrest: "Wrong. This isn't a real word — the irregular form is 'furthest' or 'farthest'.",
            },
        },
    },

    {
        id: "pps-mc-3",
        topic: "present-perfect-superlative",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the sentence with 'ever' in the correct position:",
        grammarRule: "Position of 'Ever' — Between Have and Past Participle",
        explanation: "'Ever' goes between 'have/has' and the past participle: I've ever worked, she's ever met.",
        tip: "have + ever + past participle — never split 've' and 'ever', and never put 'ever' at the end.",
        multipleChoice: {
            question: "Which sentence places 'ever' correctly?",
            correctOption: "She's the kindest manager I've ever worked for.",
            options: [
                "She's the kindest manager I've ever worked for.",
                "She's the kindest manager I ever've worked for.",
                "She's the kindest manager I've worked ever for.",
                "She's the kindest manager ever I've worked for.",
            ],
            optionExplanations: {
                "She's the kindest manager I've ever worked for.": "Correct! 'Ever' sits right after 've (have) and before the past participle 'worked'.",
                "She's the kindest manager I ever've worked for.": "Wrong. 'Ever' can't come before the contracted 've — it must follow have/has.",
                "She's the kindest manager I've worked ever for.": "Wrong. 'Ever' must come before the past participle 'worked', not after it.",
                "She's the kindest manager ever I've worked for.": "Wrong. 'Ever' belongs inside the present perfect verb phrase, not at the start of the clause.",
            },
        },
    },

    {
        id: "pps-mc-4",
        topic: "present-perfect-superlative",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the correct sentence:",
        grammarRule: "Present Perfect (not Past Simple) for Life Experience",
        explanation: "To talk about an experience up to now (your whole life so far), use the present perfect — not the past simple, present continuous or future.",
        tip: "'Ever' + a superlative always needs the present perfect: have/has + past participle.",
        multipleChoice: {
            question: "Which sentence correctly talks about a whole-life experience?",
            correctOption: "It's the most beautiful city I've ever visited.",
            options: [
                "It's the most beautiful city I've ever visited.",
                "It's the most beautiful city I ever visited.",
                "It's the most beautiful city I'm ever visiting.",
                "It's the most beautiful city I will ever visit.",
            ],
            optionExplanations: {
                "It's the most beautiful city I've ever visited.": "Correct! Present perfect + 'ever' + past participle talks about your whole life up to now.",
                "It's the most beautiful city I ever visited.": "Wrong. Missing 'have' — 'ever' with a superlative needs the present perfect auxiliary.",
                "It's the most beautiful city I'm ever visiting.": "Wrong. Present continuous describes something happening now or arranged for later, not a life experience.",
                "It's the most beautiful city I will ever visit.": "Wrong. The future tense talks about what hasn't happened yet, not a past experience.",
            },
        },
    },

    {
        id: "pps-mc-5",
        topic: "present-perfect-superlative",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the correctly formed superlative:",
        grammarRule: "Superlative of Long Adjectives — 'Most' + Adjective",
        explanation: "Adjectives with two or more syllables (not ending in -y) form the superlative with 'most', not with '-est'.",
        tip: "exhausted, expensive, beautiful, interesting → most + adjective, never adjective+est.",
        multipleChoice: {
            question: "Which sentence uses the correct superlative form?",
            correctOption: "This is the most exhausted I've ever been.",
            options: [
                "This is the most exhausted I've ever been.",
                "This is the exhaustedest I've ever been.",
                "This is the more exhausted I've ever been.",
                "This is the much exhausted I've ever been.",
            ],
            optionExplanations: {
                "This is the most exhausted I've ever been.": "Correct! 'Exhausted' is a long adjective — use 'most' to form the superlative.",
                "This is the exhaustedest I've ever been.": "Wrong. Long adjectives don't take '-est'.",
                "This is the more exhausted I've ever been.": "Wrong. 'More' is comparative, not superlative — this needs 'most'.",
                "This is the much exhausted I've ever been.": "Wrong. 'Much' isn't used to form superlatives — the correct word is 'most'.",
            },
        },
    },

    {
        id: "pps-mc-6",
        topic: "present-perfect-superlative",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the sentence with the correct past participle:",
        grammarRule: "Past Participle after Present Perfect",
        explanation: "After have/has in the present perfect, irregular verbs use their past participle form, not the past simple or the base form.",
        tip: "hear→heard, see→seen, eat→eaten — always the past participle after have/has.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "This is the silliest thing I've ever heard you say.",
            options: [
                "This is the silliest thing I've ever heard you say.",
                "This is the silliest thing I've ever hear you say.",
                "This is the silliest thing I've ever heared you say.",
                "This is the silliest thing I've ever hearing you say.",
            ],
            optionExplanations: {
                "This is the silliest thing I've ever heard you say.": "Correct! 'Hear' is irregular: hear→heard. 'Heard' is the past participle needed after 've.",
                "This is the silliest thing I've ever hear you say.": "Wrong. The base form 'hear' can't follow 've — it needs the past participle 'heard'.",
                "This is the silliest thing I've ever heared you say.": "Wrong. 'Hear' is irregular — there's no regular '-ed' form 'heared'.",
                "This is the silliest thing I've ever hearing you say.": "Wrong. The -ing form never follows 've in the present perfect.",
            },
        },
    },

    {
        id: "pps-mc-7",
        topic: "present-perfect-superlative",
        type: "multiple-choice",
        difficulty: "advanced",
        sentence: "Choose the sentence with the correct word order:",
        grammarRule: "Word Order — The + Superlative + Noun + Subject + Have + Ever + Past Participle",
        explanation: "The full structure is: the + superlative adjective (+ noun) + subject + have/has + (ever) + past participle. Nothing comes between the superlative and its noun.",
        tip: "Build it in order: the → superlative → noun → subject → have/has → ever → past participle.",
        multipleChoice: {
            question: "Which sentence has the correct word order?",
            correctOption: "This is the biggest company I've ever worked for.",
            options: [
                "This is the biggest company I've ever worked for.",
                "This is the company biggest I've ever worked for.",
                "This is the biggest I've ever worked for company.",
                "This ever is the biggest company I've worked for.",
            ],
            optionExplanations: {
                "This is the biggest company I've ever worked for.": "Correct! the + superlative + noun + subject + have + ever + past participle, in the right order.",
                "This is the company biggest I've ever worked for.": "Wrong. The superlative adjective must come before its noun: 'the biggest company', not 'the company biggest'.",
                "This is the biggest I've ever worked for company.": "Wrong. The noun 'company' has been moved to the end — it must stay right after the superlative.",
                "This ever is the biggest company I've worked for.": "Wrong. 'Ever' belongs inside the verb phrase (I've ever worked), not at the start of the sentence.",
            },
        },
    },

    // ===== WORD TRANSFORM QUESTIONS (6 questions) =====

    {
        id: "pps-wt-1",
        topic: "present-perfect-superlative",
        type: "word-transform",
        difficulty: "beginner",
        sentence: "That's the ___ (funny) joke I've ever heard.",
        grammarRule: "Adjectives Ending in -y — '-y' → '-iest'",
        explanation: "Adjectives ending in a consonant + y change y to i and add -est: funny→funniest.",
        tip: "funny→funniest, easy→easiest, happy→happiest — change y to i before adding -est.",
        wordTransform: {
            baseWord: "funny",
            correctAnswer: "funniest",
        },
    },

    {
        id: "pps-wt-2",
        topic: "present-perfect-superlative",
        type: "word-transform",
        difficulty: "beginner",
        sentence: "This is the ___ (bad) storm I've ever seen.",
        grammarRule: "Irregular Superlative 'Bad' → 'Worst'",
        explanation: "'Bad' is irregular: bad→worse→worst. It never takes '-est'.",
        tip: "bad→worst — the same irregular pattern as good→best and far→furthest.",
        wordTransform: {
            baseWord: "bad",
            correctAnswer: "worst",
        },
    },

    {
        id: "pps-wt-3",
        topic: "present-perfect-superlative",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "Jake is the ___ (patient) manager I've ever had.",
        grammarRule: "Superlative of Long Adjectives — 'Most' + Adjective",
        explanation: "'Patient' has two syllables and doesn't end in -y, so its superlative uses 'most', not '-est'.",
        tip: "Two or more syllables, no -y ending → most + adjective.",
        wordTransform: {
            baseWord: "patient",
            correctAnswer: "most patient",
        },
    },

    {
        id: "pps-wt-4",
        topic: "present-perfect-superlative",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "I think this is the ___ (exhausted) I've ever been.",
        grammarRule: "Superlative of Long Adjectives — 'Most' + Adjective",
        explanation: "'Exhausted' is a long adjective (a past participle used as an adjective), so its superlative uses 'most'.",
        tip: "Past-participle adjectives (exhausted, bored, surprised) always use 'most', never '-est'.",
        wordTransform: {
            baseWord: "exhausted",
            correctAnswer: "most exhausted",
        },
    },

    {
        id: "pps-wt-5",
        topic: "present-perfect-superlative",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "It's probably the ___ (brilliant) film we've ever seen.",
        grammarRule: "Superlative of Long Adjectives — 'Most' + Adjective",
        explanation: "'Brilliant' has three syllables, so its superlative is formed with 'most', not '-est'.",
        tip: "The longer the adjective, the more likely it needs 'most' instead of '-est'.",
        wordTransform: {
            baseWord: "brilliant",
            correctAnswer: "most brilliant",
        },
    },

    {
        id: "pps-wt-6",
        topic: "present-perfect-superlative",
        type: "word-transform",
        difficulty: "advanced",
        sentence: "This is the ___ (far) I've ever travelled alone.",
        grammarRule: "Irregular Superlative 'Far' → 'Furthest'",
        explanation: "'Far' is irregular: far→further/farther→furthest/farthest. Both 'furthest' and 'farthest' are correct.",
        tip: "far→furthest (distance, figurative) or farthest (physical distance) — both are accepted.",
        wordTransform: {
            baseWord: "far",
            correctAnswer: "furthest",
            alternativeAnswers: ["farthest"],
        },
    },
];

export const presentPerfectSuperlativeTopic: GrammarTopic = {
    id: "present-perfect-superlative",
    level: "B1",
    name: "Present Perfect + Superlative",
    description: "Use the present perfect with a superlative adjective to talk about the best, worst or most amazing experience of your whole life — and learn exactly where 'ever' goes.",
    lesson: "Lesson 4D",
    icon: "🏆",
    cards: [
        {
            id: "pps-card-1",
            rule: "the + superlative + present perfect",
            example: "This is the ___ (good) coffee I've had this week.",
            answer: "best",
            explanation: "We use the present perfect with a superlative adjective to talk about the best, worst or most amazing experience of our life so far.",
            examples: ["It's the biggest house I've seen.", "That's the worst film I've watched."],
            ua: "«the + найвищий ступінь + Present Perfect» — найкращий/найгірший досвід «дотепер».",
        },
        {
            id: "pps-card-2",
            rule: "ever between have and the past participle",
            example: "It's the nicest café I've ___ (be) to.",
            answer: "ever been",
            explanation: "'Ever' means 'at any time in your life'. It always goes between have/has and the past participle, never at the end of the sentence.",
            examples: ["That's the funniest joke I've ever heard.", "She's the kindest teacher I've ever had."],
            ua: "ever стоїть між have і дієприкметником: I've ever been, не I ever've been.",
        },
        {
            id: "pps-card-3",
            rule: "irregular superlatives: good→best, bad→worst, far→furthest",
            example: "This is the ___ (bad) storm I've seen this year.",
            answer: "worst",
            explanation: "Good, bad and far have irregular superlative forms: best, worst, furthest/farthest — never goodest or baddest.",
            examples: ["This is the best meal I've ever eaten.", "It's the furthest I've ever been from home."],
            ua: "good→best, bad→worst, far→furthest/farthest — не додавай -est.",
        },
        {
            id: "pps-card-4",
            rule: "short adjectives: add -est",
            example: "This is the ___ (long) book I've ever read.",
            answer: "longest",
            explanation: "Short, one-syllable adjectives take -est in the superlative: long→longest, old→oldest, fast→fastest.",
            examples: ["It's the slowest car I've ever driven.", "That's the coldest winter I've ever had."],
            ua: "короткі прикметники (1 склад): +est → longest, oldest, fastest.",
        },
        {
            id: "pps-card-5",
            rule: "adjectives ending in -y: -y → -iest",
            example: "She's the ___ (happy) person I've ever met.",
            answer: "happiest",
            explanation: "Adjectives ending in a consonant + y change y to i and add -est: happy→happiest, easy→easiest, funny→funniest.",
            examples: ["This is the easiest exam I've ever taken.", "That's the funniest show I've ever watched."],
            ua: "прикметники на -y: y→i +est → happiest, easiest, funniest.",
        },
        {
            id: "pps-card-6",
            rule: "long adjectives: most + adjective",
            example: "This is the ___ (beautiful) place I've ever visited.",
            answer: "most beautiful",
            explanation: "Adjectives with two or more syllables (and not ending in -y) use 'most' + adjective: most expensive, most interesting, most beautiful.",
            examples: ["This is the most comfortable sofa I've ever sat on.", "It's the most interesting question you've asked me."],
            ua: "довгі прикметники: most + прикметник → most beautiful, most expensive.",
        },
        {
            id: "pps-card-7",
            rule: "past participle after have/has — not past simple",
            example: "That's the most expensive bike I've ever ___ (buy).",
            answer: "bought",
            explanation: "After have/has in the present perfect, use the past participle, not the past simple or base form: buy→bought, not buyed or buy.",
            examples: ["It's the best meal I've ever eaten.", "This is the biggest mistake I've ever made at work."],
            ua: "після have/has — дієприкметник (bought), не Past Simple чи базова форма.",
        },
        {
            id: "pps-card-8",
            rule: "'the' before the superlative adjective",
            example: "That's ___ nicest present I've ever received.",
            answer: "the",
            explanation: "Superlative adjectives always need 'the' in front of them — never 'a' or no article at all.",
            examples: ["She's the funniest comedian I've ever seen live.", "It's the tallest building I've ever been inside."],
            ua: "перед найвищим ступенем завжди 'the': the best, не a best.",
        },
    ],
    rules: presentPerfectSuperlative,
};

export default presentPerfectSuperlative;
