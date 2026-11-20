/**
 * EnglishPusher Grammar Testing - Relative Clauses
 * B1 Level (Speakout) - Lesson 5A
 *
 * 6 gap-fill, 6 error-spot, 7 multiple-choice, 6 word-transform = 25 questions
 * VERIFIED: All error-spot indexes checked against split(" ") positions.
 */

import type { GrammarQuestion, GrammarTopic } from "../types.ts";

export const relativeClausesQuestions: GrammarQuestion[] = [

    // ===== GAP FILL QUESTIONS (6 questions) =====

    {
        id: "rc-gap-1",
        topic: "relative-clauses",
        type: "gap-fill",
        difficulty: "beginner",
        sentence: "Christopher Blair is the writer ___ invents fake news stories online.",
        grammarRule: "Relative Pronoun 'Who' — People",
        explanation: "'Who' introduces a relative clause that gives essential information about a person — here, the writer.",
        tip: "who = people. He's the man who took my bag.",
        gapFill: {
            gapIndex: 5,
            correctAnswer: "who",
            options: ["who", "which", "where", "whose"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "rc-gap-2",
        topic: "relative-clauses",
        type: "gap-fill",
        difficulty: "beginner",
        sentence: "This is the website ___ I read the news every morning.",
        grammarRule: "Relative Pronoun 'Where' — Places",
        explanation: "'Where' introduces a relative clause that gives essential information about a place — here, the website.",
        tip: "where = places. This is the building where we got married.",
        gapFill: {
            gapIndex: 4,
            correctAnswer: "where",
            options: ["where", "which", "who", "when"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "rc-gap-3",
        topic: "relative-clauses",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "He writes news stories ___ are completely invented.",
        grammarRule: "Relative Pronoun 'Which' — Things",
        explanation: "'Which' introduces a relative clause that gives essential information about a thing — here, the news stories.",
        tip: "which = things. This is the bank card which she was looking for.",
        gapFill: {
            gapIndex: 4,
            correctAnswer: "which",
            options: ["which", "who", "when", "whose"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "rc-gap-4",
        topic: "relative-clauses",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "She remembers the exact moment ___ she realised the story was fake.",
        grammarRule: "Relative Pronoun 'When' — Times",
        explanation: "'When' introduces a relative clause that gives essential information about a time — here, the exact moment.",
        tip: "when = times. That was the day when I graduated.",
        gapFill: {
            gapIndex: 5,
            correctAnswer: "when",
            options: ["when", "where", "which", "who"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "rc-gap-5",
        topic: "relative-clauses",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "That's the journalist ___ article got millions of views overnight.",
        grammarRule: "Relative Pronoun 'Whose' — Possession",
        explanation: "'Whose' introduces a relative clause that shows possession — here, the journalist's article.",
        tip: "whose = possession. Is that the man whose phone you picked up?",
        gapFill: {
            gapIndex: 3,
            correctAnswer: "whose",
            options: ["whose", "who", "which", "where"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "rc-gap-6",
        topic: "relative-clauses",
        type: "gap-fill",
        difficulty: "advanced",
        sentence: "This is the headline ___ convinced thousands of people to share a fake story.",
        grammarRule: "Relative Pronoun 'Which' — Things as the Subject",
        explanation: "'Which' can be the subject of its own clause — here, the headline is what convinced people to share.",
        tip: "which can be the subject of the relative clause too: the thing which did something.",
        gapFill: {
            gapIndex: 4,
            correctAnswer: "which",
            options: ["which", "who", "whose", "where"],
            correctOptionIndex: 0,
        },
    },

    // ===== ERROR SPOT QUESTIONS (6 questions) =====
    // RULE: Every error is exactly ONE word. Replacing wrongWord with correction
    // must produce a 100% grammatically correct sentence with no leftover errors.

    // split(" ") → [0=She's, 1=the, 2=woman, 3=which, 4=lives, 5=in, 6=the, 7=flat, 8=upstairs.]
    // words[3]="which" ✅  corrected: "She's the woman who lives in the flat upstairs." ✅
    {
        id: "rc-error-1",
        topic: "relative-clauses",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "She's the woman which lives in the flat upstairs.",
        grammarRule: "Who vs Which — People, Not Things",
        explanation: "'Which' is used for things, not people. For a person, use 'who'.",
        errorSpot: {
            errorWordIndex: 3,
            wrongWord: "which",
            correction: "who",
            reason: "'Woman' is a person, so use 'who', not 'which': 'She's the woman who lives in the flat upstairs.'",
            correctionOptions: ["who", "which", "where", "whose"],
        },
    },

    // split(" ") → [0=This, 1=is, 2=the, 3=book, 4=who, 5=I, 6=borrowed, 7=from, 8=the, 9=library.]
    // words[4]="who" ✅  corrected: "This is the book which I borrowed from the library." ✅
    {
        id: "rc-error-2",
        topic: "relative-clauses",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "This is the book who I borrowed from the library.",
        grammarRule: "Which vs Who — Things, Not People",
        explanation: "'Who' is used for people, not things. For a thing like a book, use 'which' (or 'that').",
        errorSpot: {
            errorWordIndex: 4,
            wrongWord: "who",
            correction: "which",
            reason: "'Book' is a thing, so use 'which', not 'who': 'This is the book which I borrowed from the library.'",
            correctionOptions: ["which", "who", "where", "when"],
        },
    },

    // split(" ") → [0=That's, 1=the, 2=café, 3=who, 4=serves, 5=the, 6=best, 7=coffee, 8=in, 9=town.]
    // words[3]="who" ✅  corrected: "That's the café which serves the best coffee in town." ✅
    {
        id: "rc-error-3",
        topic: "relative-clauses",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "That's the café who serves the best coffee in town.",
        grammarRule: "Which vs Who — Places Used as the Subject",
        explanation: "A café is a place, but here it's the subject of the clause (the café serves coffee), so we treat it like a thing and use 'which', not 'who'.",
        errorSpot: {
            errorWordIndex: 3,
            wrongWord: "who",
            correction: "which",
            reason: "The café is the subject doing the action, so use 'which': 'That's the café which serves the best coffee in town.'",
            correctionOptions: ["which", "who", "where", "when"],
        },
    },

    // split(" ") → [0=He's, 1=the, 2=man, 3=whose, 4=took, 5=my, 6=wallet, 7=yesterday.]
    // words[3]="whose" ✅  corrected: "He's the man who took my wallet yesterday." ✅
    {
        id: "rc-error-4",
        topic: "relative-clauses",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "He's the man whose took my wallet yesterday.",
        grammarRule: "Who vs Whose — Subject, Not Possession",
        explanation: "'Whose' shows possession and must be followed by a noun. Here the man himself took the wallet, so we need the subject pronoun 'who'.",
        errorSpot: {
            errorWordIndex: 3,
            wrongWord: "whose",
            correction: "who",
            reason: "No possession is shown here — the man is the subject who took the wallet: 'He's the man who took my wallet yesterday.'",
            correctionOptions: ["who", "whose", "which", "where"],
        },
    },

    // split(" ") → [0=Is, 1=that, 2=the, 3=student, 4=who's, 5=phone, 6=keeps, 7=ringing, 8=in, 9=class?]
    // words[4]="who's" ✅  corrected: "Is that the student whose phone keeps ringing in class?" ✅
    {
        id: "rc-error-5",
        topic: "relative-clauses",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "Is that the student who's phone keeps ringing in class?",
        grammarRule: "Whose vs Who's — Possession, Not a Contraction",
        explanation: "'Who's' is short for 'who is' or 'who has' — it never shows possession. For possession, use 'whose'.",
        errorSpot: {
            errorWordIndex: 4,
            wrongWord: "who's",
            correction: "whose",
            reason: "This shows possession (the student's phone), so use 'whose': 'Is that the student whose phone keeps ringing in class?'",
            correctionOptions: ["whose", "who's", "who", "which"],
        },
    },

    // split(" ") → [0=That, 1=was, 2=the, 3=year, 4=which, 5=I, 6=graduated, 7=from, 8=university.]
    // words[4]="which" ✅  corrected: "That was the year when I graduated from university." ✅
    {
        id: "rc-error-6",
        topic: "relative-clauses",
        type: "error-spot",
        difficulty: "advanced",
        sentence: "That was the year which I graduated from university.",
        grammarRule: "When vs Which — Times, Not Things",
        explanation: "'Which' is used for things, not times. For a time expression like 'year', use 'when'.",
        errorSpot: {
            errorWordIndex: 4,
            wrongWord: "which",
            correction: "when",
            reason: "'Year' is a time, so use 'when', not 'which': 'That was the year when I graduated from university.'",
            correctionOptions: ["when", "which", "where", "who"],
        },
    },

    // ===== MULTIPLE CHOICE QUESTIONS (7 questions) =====

    {
        id: "rc-mc-1",
        topic: "relative-clauses",
        type: "multiple-choice",
        difficulty: "beginner",
        sentence: "Choose the sentence that correctly uses a relative pronoun for a person:",
        grammarRule: "Relative Pronoun 'Who' — People",
        explanation: "'Who' is the relative pronoun used for people.",
        tip: "who = people, always.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "He's the journalist who writes for the newspaper.",
            options: [
                "He's the journalist who writes for the newspaper.",
                "He's the journalist which writes for the newspaper.",
                "He's the journalist where writes for the newspaper.",
                "He's the journalist whose writes for the newspaper.",
            ],
            optionExplanations: {
                "He's the journalist who writes for the newspaper.": "Correct! 'Who' introduces a relative clause about a person.",
                "He's the journalist which writes for the newspaper.": "Wrong. 'Which' is for things, not people.",
                "He's the journalist where writes for the newspaper.": "Wrong. 'Where' is for places, not people.",
                "He's the journalist whose writes for the newspaper.": "Wrong. 'Whose' needs a noun right after it to show possession — there's no noun here.",
            },
        },
    },

    {
        id: "rc-mc-2",
        topic: "relative-clauses",
        type: "multiple-choice",
        difficulty: "beginner",
        sentence: "Choose the sentence that correctly uses a relative pronoun for a thing:",
        grammarRule: "Relative Pronoun 'Which' — Things",
        explanation: "'Which' is the relative pronoun used for things.",
        tip: "which = things, always.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "This is the bank card which she was looking for.",
            options: [
                "This is the bank card which she was looking for.",
                "This is the bank card who she was looking for.",
                "This is the bank card where she was looking for.",
                "This is the bank card whose she was looking for.",
            ],
            optionExplanations: {
                "This is the bank card which she was looking for.": "Correct! 'Which' introduces a relative clause about a thing.",
                "This is the bank card who she was looking for.": "Wrong. 'Who' is for people, not things.",
                "This is the bank card where she was looking for.": "Wrong. 'Where' is for places, not things.",
                "This is the bank card whose she was looking for.": "Wrong. 'Whose' needs a noun right after it to show possession — there's no noun here.",
            },
        },
    },

    {
        id: "rc-mc-3",
        topic: "relative-clauses",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the sentence that correctly uses a relative pronoun for a place:",
        grammarRule: "Relative Pronoun 'Where' — Places",
        explanation: "'Where' is the relative pronoun used for places.",
        tip: "where = places. Think: 'in that place'.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "This is the building where we got married.",
            options: [
                "This is the building where we got married.",
                "This is the building which we got married.",
                "This is the building who we got married.",
                "This is the building when we got married.",
            ],
            optionExplanations: {
                "This is the building where we got married.": "Correct! 'Where' introduces a relative clause about a place.",
                "This is the building which we got married.": "Wrong. 'Which' doesn't work with a place used this way — 'where' is needed.",
                "This is the building who we got married.": "Wrong. 'Who' is for people, not places.",
                "This is the building when we got married.": "Wrong. 'When' is for times, not places.",
            },
        },
    },

    {
        id: "rc-mc-4",
        topic: "relative-clauses",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the sentence that correctly uses a relative pronoun for a time:",
        grammarRule: "Relative Pronoun 'When' — Times",
        explanation: "'When' is the relative pronoun used for times.",
        tip: "when = times. Think: 'at that time'.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "That was the day when I graduated from university.",
            options: [
                "That was the day when I graduated from university.",
                "That was the day where I graduated from university.",
                "That was the day which I graduated from university.",
                "That was the day whose I graduated from university.",
            ],
            optionExplanations: {
                "That was the day when I graduated from university.": "Correct! 'When' introduces a relative clause about a time.",
                "That was the day where I graduated from university.": "Wrong. 'Where' is for places, not times.",
                "That was the day which I graduated from university.": "Wrong. 'Which' is for things, not times.",
                "That was the day whose I graduated from university.": "Wrong. 'Whose' needs a noun right after it to show possession — there's no noun here.",
            },
        },
    },

    {
        id: "rc-mc-5",
        topic: "relative-clauses",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the sentence that correctly shows possession with a relative pronoun:",
        grammarRule: "Relative Pronoun 'Whose' — Possession",
        explanation: "'Whose' shows possession and is always followed directly by a noun.",
        tip: "whose + noun = possession. who's = who is / who has.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "Is that the man whose phone you picked up?",
            options: [
                "Is that the man whose phone you picked up?",
                "Is that the man who's phone you picked up?",
                "Is that the man which phone you picked up?",
                "Is that the man who phone you picked up?",
            ],
            optionExplanations: {
                "Is that the man whose phone you picked up?": "Correct! 'Whose' shows that the phone belongs to the man.",
                "Is that the man who's phone you picked up?": "Wrong. 'Who's' is short for 'who is' or 'who has' — it never shows possession.",
                "Is that the man which phone you picked up?": "Wrong. 'Which' is for things, not people, and doesn't show possession here.",
                "Is that the man who phone you picked up?": "Wrong. 'Who' needs no noun after it — possession needs 'whose'.",
            },
        },
    },

    {
        id: "rc-mc-6",
        topic: "relative-clauses",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Look at these four sentences about relative clauses.",
        grammarRule: "That — Replaces Who/Which, Never Whose",
        explanation: "'That' can replace 'who' or 'which' in defining relative clauses, but it can never replace 'whose'.",
        tip: "that = who/which substitute. that ≠ whose, ever.",
        multipleChoice: {
            question: "In which sentence can the relative pronoun NOT be replaced by 'that'?",
            correctOption: "Is that the man whose phone you picked up?",
            options: [
                "Is that the man whose phone you picked up?",
                "He's the man who took my bag.",
                "This is the bank card which she was looking for.",
                "He writes news stories which are completely fake.",
            ],
            optionExplanations: {
                "Is that the man whose phone you picked up?": "Correct! 'Whose' shows possession and can never be replaced by 'that'.",
                "He's the man who took my bag.": "Wrong. 'Who' (for a person) can be replaced by 'that': 'He's the man that took my bag.'",
                "This is the bank card which she was looking for.": "Wrong. 'Which' (for a thing) can be replaced by 'that': 'This is the bank card that she was looking for.'",
                "He writes news stories which are completely fake.": "Wrong. 'Which' (for a thing) can be replaced by 'that': 'He writes news stories that are completely fake.'",
            },
        },
    },

    {
        id: "rc-mc-7",
        topic: "relative-clauses",
        type: "multiple-choice",
        difficulty: "advanced",
        sentence: "Look at these four sentences about relative clauses.",
        grammarRule: "Leaving Out the Relative Pronoun — Object Clauses Only",
        explanation: "We can leave out who, which or that when it is the OBJECT of the relative clause — but never when it is the subject, and never with 'whose'.",
        tip: "Object of the clause → pronoun optional. Subject of the clause → pronoun required.",
        multipleChoice: {
            question: "In which sentence can the relative pronoun safely be left out?",
            correctOption: "She's the woman I was telling you about.",
            options: [
                "She's the woman I was telling you about.",
                "She's the woman lives next door.",
                "This is the man phone you picked up.",
                "That's the café serves the best coffee in town.",
            ],
            optionExplanations: {
                "She's the woman I was telling you about.": "Correct! The woman is the OBJECT of the relative clause ('I was telling you about her'), so 'who'/'that' can be left out.",
                "She's the woman lives next door.": "Wrong. The woman is the SUBJECT of the relative clause (she lives next door) — 'who' cannot be left out here.",
                "This is the man phone you picked up.": "Wrong. 'Whose' shows possession and can never be left out.",
                "That's the café serves the best coffee in town.": "Wrong. The café is the SUBJECT of the relative clause (it serves coffee) — 'which' cannot be left out here.",
            },
        },
    },

    // ===== WORD TRANSFORM QUESTIONS (6 questions) =====

    {
        id: "rc-wt-1",
        topic: "relative-clauses",
        type: "word-transform",
        difficulty: "beginner",
        sentence: "She's the reporter ___ exposed the scandal.",
        grammarRule: "Relative Pronoun 'Who' — People",
        explanation: "'Who' (or 'that') introduces a relative clause about a person — here, the subject who exposed the scandal.",
        tip: "person → who (or that).",
        wordTransform: {
            baseWord: "person",
            correctAnswer: "who",
            alternativeAnswers: ["that"],
        },
    },

    {
        id: "rc-wt-2",
        topic: "relative-clauses",
        type: "word-transform",
        difficulty: "beginner",
        sentence: "This is the newspaper ___ published the story first.",
        grammarRule: "Relative Pronoun 'Which' — Things",
        explanation: "'Which' (or 'that') introduces a relative clause about a thing — here, the subject that published the story.",
        tip: "thing → which (or that).",
        wordTransform: {
            baseWord: "thing",
            correctAnswer: "which",
            alternativeAnswers: ["that"],
        },
    },

    {
        id: "rc-wt-3",
        topic: "relative-clauses",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "That's the café ___ we always meet for coffee.",
        grammarRule: "Relative Pronoun 'Where' — Places",
        explanation: "'Where' introduces a relative clause about a place.",
        tip: "place → where.",
        wordTransform: {
            baseWord: "place",
            correctAnswer: "where",
        },
    },

    {
        id: "rc-wt-4",
        topic: "relative-clauses",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "I'll never forget the moment ___ I saw my name in print.",
        grammarRule: "Relative Pronoun 'When' — Times",
        explanation: "'When' (or sometimes 'that') introduces a relative clause about a time.",
        tip: "time → when (or sometimes that).",
        wordTransform: {
            baseWord: "time",
            correctAnswer: "when",
            alternativeAnswers: ["that"],
        },
    },

    {
        id: "rc-wt-5",
        topic: "relative-clauses",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "He's the author ___ new book became a bestseller.",
        grammarRule: "Relative Pronoun 'Whose' — Possession",
        explanation: "'Whose' introduces a relative clause showing possession — here, the author's book.",
        tip: "possession → whose, always followed by a noun.",
        wordTransform: {
            baseWord: "possession",
            correctAnswer: "whose",
        },
    },

    {
        id: "rc-wt-6",
        topic: "relative-clauses",
        type: "word-transform",
        difficulty: "advanced",
        sentence: "She's the journalist ___ everyone in the newsroom respects.",
        grammarRule: "Who/That as the Object of the Clause",
        explanation: "'Who' or 'that' can introduce a relative clause even when the person is the OBJECT, not the subject, of that clause ('everyone respects her'). Native speakers often drop it altogether, but you must fill the gap here.",
        tip: "Object relative clause: who/that fills the gap, or it can be dropped entirely in natural speech.",
        wordTransform: {
            baseWord: "person — object of the clause",
            correctAnswer: "who",
            alternativeAnswers: ["that"],
        },
    },
];

export const relativeClausesTopic: GrammarTopic = {
    id: "relative-clauses",
    level: "B1",
    name: "Relative Clauses",
    description: "Practise who, which, where, when and whose for giving essential information about people, places, things, times and possessions — plus when you can use that instead, or leave the pronoun out altogether.",
    lesson: "Lesson 5A",
    icon: "🔗",
    cards: [
        {
            id: "rc-card-1",
            rule: "who — for people",
            example: "She's the woman ___ called the ambulance.",
            answer: "who",
            explanation: "We use 'who' for people in a relative clause. It can be the subject, like here (she called the ambulance).",
            examples: ["He's the man who works at the bakery on the corner.", "They're the tourists who got lost downtown yesterday."],
            ua: "who = «який/яка» про людей: she's the woman who called — вона подзвонила.",
        },
        {
            id: "rc-card-2",
            rule: "which — for things",
            example: "That's the article ___ caused so much debate online.",
            answer: "which",
            explanation: "We use 'which' for things and animals in a relative clause, never for people.",
            examples: ["This is the laptop which stopped working last week.", "He deleted the post which upset so many readers."],
            ua: "which = «який/яка/яке» про речі, не про людей: the article which caused debate.",
        },
        {
            id: "rc-card-3",
            rule: "where — for places",
            example: "This is the café ___ we always meet after work.",
            answer: "where",
            explanation: "We use 'where' for places in a relative clause — it means 'in that place'.",
            examples: ["That's the park where we had our picnic.", "This is the office where I had my first job interview."],
            ua: "where = «де»: café where we meet — кафе, де ми зустрічаємось.",
        },
        {
            id: "rc-card-4",
            rule: "when — for times",
            example: "I'll never forget the day ___ I got my first job.",
            answer: "when",
            explanation: "We use 'when' for times in a relative clause — it means 'at that time'.",
            examples: ["That was the summer when we travelled around Europe.", "Do you remember the moment when the power went out?"],
            ua: "when = «коли»: the day when I got the job — день, коли я отримав роботу.",
        },
        {
            id: "rc-card-5",
            rule: "whose — for possession",
            example: "He's the man ___ car was stolen last night.",
            answer: "whose",
            explanation: "We use 'whose' to show that something belongs to the person or thing just mentioned. It is always followed by a noun.",
            examples: ["She's the woman whose dog barks every morning.", "That's the company whose app crashed yesterday."],
            ua: "whose = «чий/чия/чиє»: the man whose car — чоловік, чия машина.",
        },
        {
            id: "rc-card-6",
            rule: "that instead of who or which",
            example: "He's the man ___ (who/that) stole my bike.",
            answer: "who",
            explanation: "In defining relative clauses, 'that' can replace 'who' or 'which' with no change in meaning. Both forms are correct.",
            examples: ["This is the bank card that she'd been looking for all day.", "She's the journalist that wrote the article."],
            ua: "that часто замінює who/which у визначальних реченнях: who/that — без різниці.",
        },
        {
            id: "rc-card-7",
            rule: "leaving out the pronoun (object clauses)",
            example: "He's the man ___ (who/that) I told you about.",
            answer: "who",
            explanation: "When the person or thing is the OBJECT of the relative clause (not the subject), we can leave out who, which or that completely: 'He's the man I told you about.'",
            examples: ["She's the woman I was telling you about.", "This is the book I borrowed from the library."],
            ua: "Коли іменник — об'єкт речення, who/which/that можна взагалі пропустити.",
        },
    ],
    rules: relativeClausesQuestions,
};

export default relativeClausesQuestions;
