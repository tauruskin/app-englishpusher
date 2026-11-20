/**
 * EnglishPusher Grammar Testing - Verbs with Two Objects
 * A2+ Level (Speakout) - Lesson 5D
 *
 * 6 gap-fill, 6 error-spot, 7 multiple-choice, 6 word-transform = 25 questions
 * VERIFIED: All error-spot indexes checked against split(" ") positions.
 */

import type { GrammarQuestion, GrammarTopic } from "../types.ts";

export const verbsWithTwoObjectsQuestions: GrammarQuestion[] = [

    // ===== GAP FILL QUESTIONS (6 questions) =====

    {
        id: "v2o-gap-1",
        topic: "verbs-with-two-objects",
        type: "gap-fill",
        difficulty: "beginner",
        sentence: "Could you lend ___ some money until Friday?",
        grammarRule: "Pattern 1 — Verb + Person + Thing (No Preposition)",
        explanation: "With lend, give and similar verbs, we can put the person straight after the verb, followed by the thing — with no preposition at all.",
        tip: "verb + person + thing, no preposition: lend me money, give me a book.",
        gapFill: {
            gapIndex: 3,
            correctAnswer: "me",
            options: ["me", "to me", "for me", "I"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "v2o-gap-2",
        topic: "verbs-with-two-objects",
        type: "gap-fill",
        difficulty: "beginner",
        sentence: "She sent the photos ___ her best friend yesterday.",
        grammarRule: "Pattern 2 — Thing + to + Person (Give-type Verbs)",
        explanation: "Send, like give, lend, show, pass, teach, write and offer, uses 'to' before the person when the thing comes first in the sentence.",
        tip: "send/give/show/pass/teach/write/offer + thing + to + person.",
        gapFill: {
            gapIndex: 4,
            correctAnswer: "to",
            options: ["to", "for", "at", "with"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "v2o-gap-3",
        topic: "verbs-with-two-objects",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "Could you get a chair ___ grandma? She needs somewhere to sit.",
        grammarRule: "Pattern 2 — Thing + for + Person (Buy-type Verbs)",
        explanation: "Get, like buy, leave and make, uses 'for' (not 'to') before the person when the thing comes first — because you are doing something to help or benefit them.",
        tip: "buy/get/leave/make + thing + for + person.",
        gapFill: {
            gapIndex: 5,
            correctAnswer: "for",
            options: ["for", "to", "at", "of"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "v2o-gap-4",
        topic: "verbs-with-two-objects",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "He asked ___ a difficult question in the interview.",
        grammarRule: "Ask and Tell — Always Pattern 1 (No Preposition)",
        explanation: "Ask and tell almost always use pattern 1 — verb + person + thing — with no preposition. We never say 'asked a question to me'.",
        tip: "ask/tell + person + thing — never add to or for.",
        gapFill: {
            gapIndex: 2,
            correctAnswer: "me",
            options: ["me", "to me", "for me", "at me"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "v2o-gap-5",
        topic: "verbs-with-two-objects",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "I'll leave the tickets ___ you at the reception desk.",
        grammarRule: "Pattern 2 — Thing + for + Person (Buy-type Verbs)",
        explanation: "Leave, like buy, get and make, uses 'for' before the person when the thing comes first in the sentence.",
        tip: "buy/get/leave/make + thing + for + person.",
        gapFill: {
            gapIndex: 4,
            correctAnswer: "for",
            options: ["for", "to", "with", "by"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "v2o-gap-6",
        topic: "verbs-with-two-objects",
        type: "gap-fill",
        difficulty: "advanced",
        sentence: "I told ___ the truth, even though it was difficult.",
        grammarRule: "Ask and Tell — Always Pattern 1 (No Preposition)",
        explanation: "Tell, like ask, never takes a preposition before the person — the person always comes straight after the verb.",
        tip: "tell + person + thing — not 'tell the truth to someone' in this pattern.",
        gapFill: {
            gapIndex: 2,
            correctAnswer: "her",
            options: ["her", "to her", "for her", "at her"],
            correctOptionIndex: 0,
        },
    },

    // ===== ERROR SPOT QUESTIONS (6 questions) =====
    // RULE: Every error is exactly ONE word. Replacing wrongWord with correction
    // must produce a 100% grammatically correct sentence with no leftover errors.

    // split(" ") → [0=He, 1=sent, 2=the, 3=invitation, 4=for, 5=his, 6=new, 7=neighbours.]
    // words[4]="for" ✅  corrected: "He sent the invitation to his new neighbours." ✅
    {
        id: "v2o-error-1",
        topic: "verbs-with-two-objects",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "He sent the invitation for his new neighbours.",
        grammarRule: "Pattern 2 — Thing + to + Person (Give-type Verbs)",
        explanation: "'Send' takes 'to' before the person, not 'for'. Compare: send the invitation to his neighbours.",
        errorSpot: {
            errorWordIndex: 4,
            wrongWord: "for",
            correction: "to",
            reason: "'Send' uses 'to' before the person: 'He sent the invitation to his new neighbours.'",
            correctionOptions: ["to", "for", "at", "with"],
        },
    },

    // split(" ") → [0=He, 1=bought, 2=a, 3=present, 4=to, 5=his, 6=wife.]
    // words[4]="to" ✅  corrected: "He bought a present for his wife." ✅
    {
        id: "v2o-error-2",
        topic: "verbs-with-two-objects",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "He bought a present to his wife.",
        grammarRule: "Pattern 2 — Thing + for + Person (Buy-type Verbs)",
        explanation: "'Buy' takes 'for' before the person, not 'to'. Compare: bought a present for his wife.",
        errorSpot: {
            errorWordIndex: 4,
            wrongWord: "to",
            correction: "for",
            reason: "'Buy' uses 'for' before the person: 'He bought a present for his wife.'",
            correctionOptions: ["for", "to", "at", "with"],
        },
    },

    // split(" ") → [0=Our, 1=teacher, 2=taught, 3=grammar, 4=for, 5=us, 6=every, 7=Friday.]
    // words[4]="for" ✅  corrected: "Our teacher taught grammar to us every Friday." ✅
    {
        id: "v2o-error-3",
        topic: "verbs-with-two-objects",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "Our teacher taught grammar for us every Friday.",
        grammarRule: "Pattern 2 — Thing + to + Person (Give-type Verbs)",
        explanation: "'Teach' takes 'to' before the person, not 'for'. Compare: taught grammar to us.",
        errorSpot: {
            errorWordIndex: 4,
            wrongWord: "for",
            correction: "to",
            reason: "'Teach' uses 'to' before the person: 'Our teacher taught grammar to us every Friday.'",
            correctionOptions: ["to", "for", "at", "with"],
        },
    },

    // split(" ") → [0=She, 1=asked, 2=I, 3=many, 4=questions, 5=about, 6=the, 7=trip.]
    // words[2]="I" ✅  corrected: "She asked me many questions about the trip." ✅
    {
        id: "v2o-error-4",
        topic: "verbs-with-two-objects",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "She asked I many questions about the trip.",
        grammarRule: "Object Pronoun After the Verb",
        explanation: "The person right after the verb must be an object pronoun — 'me', not the subject pronoun 'I'.",
        errorSpot: {
            errorWordIndex: 2,
            wrongWord: "I",
            correction: "me",
            reason: "Use the object pronoun: 'She asked me many questions about the trip.'",
            correctionOptions: ["me", "I", "my", "mine"],
        },
    },

    // split(" ") → [0=I, 1=left, 2=a, 3=message, 4=to, 5=my, 6=sister, 7=this, 8=morning.]
    // words[4]="to" ✅  corrected: "I left a message for my sister this morning." ✅
    {
        id: "v2o-error-5",
        topic: "verbs-with-two-objects",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "I left a message to my sister this morning.",
        grammarRule: "Pattern 2 — Thing + for + Person (Buy-type Verbs)",
        explanation: "'Leave' takes 'for' before the person, not 'to'. Compare: left a message for my sister.",
        errorSpot: {
            errorWordIndex: 4,
            wrongWord: "to",
            correction: "for",
            reason: "'Leave' uses 'for' before the person: 'I left a message for my sister this morning.'",
            correctionOptions: ["for", "to", "at", "with"],
        },
    },

    // split(" ") → [0=He, 1=made, 2=a, 3=cake, 4=to, 5=his, 6=mother, 7=last, 8=weekend.]
    // words[4]="to" ✅  corrected: "He made a cake for his mother last weekend." ✅
    {
        id: "v2o-error-6",
        topic: "verbs-with-two-objects",
        type: "error-spot",
        difficulty: "advanced",
        sentence: "He made a cake to his mother last weekend.",
        grammarRule: "Pattern 2 — Thing + for + Person (Buy-type Verbs)",
        explanation: "'Make' takes 'for' before the person, not 'to'. Compare: made a cake for his mother.",
        errorSpot: {
            errorWordIndex: 4,
            wrongWord: "to",
            correction: "for",
            reason: "'Make' uses 'for' before the person: 'He made a cake for his mother last weekend.'",
            correctionOptions: ["for", "to", "at", "with"],
        },
    },

    // ===== MULTIPLE CHOICE QUESTIONS (7 questions) =====

    {
        id: "v2o-mc-1",
        topic: "verbs-with-two-objects",
        type: "multiple-choice",
        difficulty: "beginner",
        sentence: "Choose the sentence that correctly uses pattern 1 (verb + person + thing).",
        grammarRule: "Pattern 1 — Verb + Person + Thing (No Preposition)",
        explanation: "Pattern 1 (verb + person + thing) never takes a preposition — the person goes straight after the verb.",
        tip: "verb + person + thing: no 'to', no 'for'.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "She gave me a book.",
            options: [
                "She gave me a book.",
                "She gave to me a book.",
                "She gave a book to I.",
                "She gave a book I.",
            ],
            optionExplanations: {
                "She gave me a book.": "Correct! Pattern 1 — verb + person + thing — never takes a preposition.",
                "She gave to me a book.": "Wrong. Pattern 1 never takes 'to' — say 'gave me a book' or 'gave a book to me'.",
                "She gave a book to I.": "Wrong. After 'to' we need the object pronoun 'me', not the subject pronoun 'I'.",
                "She gave a book I.": "Wrong. Pattern 2 needs 'to' before the person: 'gave a book to me'.",
            },
        },
    },

    {
        id: "v2o-mc-2",
        topic: "verbs-with-two-objects",
        type: "multiple-choice",
        difficulty: "beginner",
        sentence: "Choose the sentence with the correct preposition for 'buy'.",
        grammarRule: "Pattern 2 — Thing + for + Person (Buy-type Verbs)",
        explanation: "'Buy' takes 'for' before the person when the thing comes first — you are buying it to benefit them.",
        tip: "buy/get/leave/make + thing + for + person.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "Can you buy a sandwich for me?",
            options: [
                "Can you buy a sandwich for me?",
                "Can you buy a sandwich to me?",
                "Can you buy to me a sandwich?",
                "Can you buy me to a sandwich?",
            ],
            optionExplanations: {
                "Can you buy a sandwich for me?": "Correct! 'Buy' uses 'for' before the person in pattern 2.",
                "Can you buy a sandwich to me?": "Wrong preposition. 'Buy' never uses 'to' — use 'for'.",
                "Can you buy to me a sandwich?": "Wrong. The preposition phrase must come after the thing: 'a sandwich for me'.",
                "Can you buy me to a sandwich?": "Wrong. This mixes the two patterns — either 'buy me a sandwich' or 'buy a sandwich for me'.",
            },
        },
    },

    {
        id: "v2o-mc-3",
        topic: "verbs-with-two-objects",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the sentence that correctly uses 'ask'.",
        grammarRule: "Ask and Tell — Always Pattern 1 (No Preposition)",
        explanation: "'Ask' almost always uses pattern 1 — verb + person + thing — with no preposition before the person.",
        tip: "ask/tell + person + thing — never 'ask a question to someone'.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "I asked her a question.",
            options: [
                "I asked her a question.",
                "I asked a question to her.",
                "I asked a question for her.",
                "I asked to her a question.",
            ],
            optionExplanations: {
                "I asked her a question.": "Correct! 'Ask' uses pattern 1 — no preposition before the person.",
                "I asked a question to her.": "Wrong. 'Ask' doesn't take 'to' — say 'asked her a question' instead.",
                "I asked a question for her.": "Wrong. 'Ask' doesn't take 'for' here either — use pattern 1.",
                "I asked to her a question.": "Wrong. There is no preposition with 'ask' in this pattern at all.",
            },
        },
    },

    {
        id: "v2o-mc-4",
        topic: "verbs-with-two-objects",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the most natural sentence.",
        grammarRule: "Choosing Pattern 2 With a Long Indirect Object",
        explanation: "We usually choose pattern 2 (thing + to/for + person) when the person is described with several words, because it sounds more natural than putting a long phrase straight after the verb.",
        tip: "A long person phrase → prefer thing + to/for + person.",
        multipleChoice: {
            question: "Which sentence sounds most natural?",
            correctOption: "I sent an email to everyone in the company.",
            options: [
                "I sent an email to everyone in the company.",
                "I sent everyone in the company an email.",
                "I sent to everyone in the company an email.",
                "I sent an email for everyone in the company.",
            ],
            optionExplanations: {
                "I sent an email to everyone in the company.": "Correct! With a long indirect object like 'everyone in the company', pattern 2 sounds much more natural.",
                "I sent everyone in the company an email.": "Less natural. Pattern 1 works better with a short person phrase — a long phrase here is awkward straight after the verb.",
                "I sent to everyone in the company an email.": "Wrong. 'To' can't go directly after the verb here — it must follow the thing: 'an email to everyone'.",
                "I sent an email for everyone in the company.": "Wrong preposition. 'Send' uses 'to', not 'for'.",
            },
        },
    },

    {
        id: "v2o-mc-5",
        topic: "verbs-with-two-objects",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the sentence that correctly uses 'pass'.",
        grammarRule: "Pattern 2 — Thing + to + Person (Give-type Verbs)",
        explanation: "'Pass' takes 'to' before the person in pattern 2, and the person after the verb must be an object pronoun.",
        tip: "pass + person + thing, or pass + thing + to + person.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "Could you pass me the salt?",
            options: [
                "Could you pass me the salt?",
                "Could you pass for me the salt?",
                "Could you pass the salt me?",
                "Could you pass to I the salt?",
            ],
            optionExplanations: {
                "Could you pass me the salt?": "Correct! Pattern 1 — verb + person + thing — with no preposition.",
                "Could you pass for me the salt?": "Wrong preposition and wrong position. 'Pass' never takes 'for'.",
                "Could you pass the salt me?": "Wrong. Pattern 2 needs 'to' before the person: 'pass the salt to me'.",
                "Could you pass to I the salt?": "Wrong. After 'to' we need the object pronoun 'me', not 'I'.",
            },
        },
    },

    {
        id: "v2o-mc-6",
        topic: "verbs-with-two-objects",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Find the sentence with a mistake.",
        grammarRule: "Pattern 2 — Thing + to + Person (Give-type Verbs)",
        explanation: "'Give' takes 'to' before the person in pattern 2, never 'for'.",
        tip: "give + thing + to + person — never 'for'.",
        multipleChoice: {
            question: "Which sentence is incorrect?",
            correctOption: "She gave the ticket for her brother.",
            options: [
                "She gave the ticket for her brother.",
                "She gave the ticket to her brother.",
                "She gave her brother the ticket.",
                "She gave him the ticket.",
            ],
            optionExplanations: {
                "She gave the ticket for her brother.": "This is the mistake! 'Give' uses 'to', not 'for': 'gave the ticket to her brother'.",
                "She gave the ticket to her brother.": "Correct. Pattern 2 with 'to' before the person.",
                "She gave her brother the ticket.": "Correct. Pattern 1 — verb + person + thing, no preposition.",
                "She gave him the ticket.": "Correct. Pattern 1 with the object pronoun 'him'.",
            },
        },
    },

    {
        id: "v2o-mc-7",
        topic: "verbs-with-two-objects",
        type: "multiple-choice",
        difficulty: "advanced",
        sentence: "Choose the sentence that correctly uses 'write'.",
        grammarRule: "Pattern 2 — Thing + to + Person (Give-type Verbs)",
        explanation: "'Write' takes 'to' before the person when the thing comes first, like give, lend, show, send, pass, teach and offer.",
        tip: "write + thing + to + person — not 'for'.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "Shall I write a letter to him?",
            options: [
                "Shall I write a letter to him?",
                "Shall I write a letter for him?",
                "Shall I write him to a letter?",
                "Shall I write to him a letter?",
            ],
            optionExplanations: {
                "Shall I write a letter to him?": "Correct! 'Write' uses 'to' before the person in pattern 2.",
                "Shall I write a letter for him?": "Wrong preposition. 'Write' belongs to the to-group, not the for-group.",
                "Shall I write him to a letter?": "Wrong. This mixes pattern 1 and pattern 2 — pick one: 'write him a letter' or 'write a letter to him'.",
                "Shall I write to him a letter?": "Wrong word order. The preposition phrase must come after the thing: 'a letter to him'.",
            },
        },
    },

    // ===== WORD TRANSFORM QUESTIONS (6 questions) =====

    {
        id: "v2o-wt-1",
        topic: "verbs-with-two-objects",
        type: "word-transform",
        difficulty: "beginner",
        sentence: "Could you pass ___ the menu, please?",
        grammarRule: "Object Pronoun After the Verb",
        explanation: "The person right after the verb must be an object pronoun — me, him, her, us, them — never a subject pronoun like I.",
        tip: "verb + person: use object pronouns (me, him, us), never subject pronouns (I, he, we).",
        wordTransform: {
            baseWord: "I/me",
            correctAnswer: "me",
        },
    },

    {
        id: "v2o-wt-2",
        topic: "verbs-with-two-objects",
        type: "word-transform",
        difficulty: "beginner",
        sentence: "She showed ___ her new flat on Saturday.",
        grammarRule: "Object Pronoun After the Verb",
        explanation: "After 'show' in pattern 1, the person is an object pronoun — 'us', not the subject pronoun 'we'.",
        tip: "verb + person: object pronoun, not subject pronoun.",
        wordTransform: {
            baseWord: "we/us",
            correctAnswer: "us",
        },
    },

    {
        id: "v2o-wt-3",
        topic: "verbs-with-two-objects",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "I sent the file ___ my manager this morning.",
        grammarRule: "Pattern 2 — Thing + to + Person (Give-type Verbs)",
        explanation: "'Send', like give, lend, show, pass, teach, write and offer, takes 'to' before the person when the thing comes first.",
        tip: "send/give/show/pass/teach/write/offer + thing + to + person.",
        wordTransform: {
            baseWord: "to/for",
            correctAnswer: "to",
        },
    },

    {
        id: "v2o-wt-4",
        topic: "verbs-with-two-objects",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "Could you buy some bread ___ me on your way home?",
        grammarRule: "Pattern 2 — Thing + for + Person (Buy-type Verbs)",
        explanation: "'Buy', like get, leave and make, takes 'for' (not 'to') before the person when the thing comes first.",
        tip: "buy/get/leave/make + thing + for + person.",
        wordTransform: {
            baseWord: "to/for",
            correctAnswer: "for",
        },
    },

    {
        id: "v2o-wt-5",
        topic: "verbs-with-two-objects",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "He wrote a long letter ___ his grandmother.",
        grammarRule: "Pattern 2 — Thing + to + Person (Give-type Verbs)",
        explanation: "'Write', like give, lend, show, pass, teach, send and offer, takes 'to' before the person when the thing comes first.",
        tip: "send/give/show/pass/teach/write/offer + thing + to + person.",
        wordTransform: {
            baseWord: "to/for",
            correctAnswer: "to",
        },
    },

    {
        id: "v2o-wt-6",
        topic: "verbs-with-two-objects",
        type: "word-transform",
        difficulty: "advanced",
        sentence: "I asked ___ a difficult question in the interview, but he didn't answer.",
        grammarRule: "Ask and Tell — Always Pattern 1 (No Preposition)",
        explanation: "'Ask', like tell, almost always uses pattern 1 — verb + person + thing — with no preposition before the person at all.",
        tip: "ask/tell + person + thing — never add 'to' before the person.",
        wordTransform: {
            baseWord: "him/to him",
            correctAnswer: "him",
        },
    },
];

export const verbsWithTwoObjectsTopic: GrammarTopic = {
    id: "verbs-with-two-objects",
    level: "A2+",
    name: "Verbs with Two Objects",
    description: "Learn how verbs like give, lend, buy and ask can take two objects — a person and a thing — and when to use to, for, or no preposition at all.",
    lesson: "Lesson 5D",
    icon: "🎁",
    cards: [
        {
            id: "v2o-card-1",
            rule: "verb + person + thing (no preposition)",
            example: "My brother lent ___ (I) his car for the weekend.",
            answer: "me",
            explanation: "Some verbs, like lend and give, can take two objects: the person (indirect object) and the thing (direct object). We put the person straight after the verb, with no preposition.",
            examples: ["She gave her sister a necklace for her birthday.", "Can you lend me twenty dollars until Friday?"],
            ua: "Деякі дієслова (lend, give) мають два додатки: особу і річ. Особу ставимо одразу після дієслова, без прийменника: lent me his car — «позичив мені машину».",
        },
        {
            id: "v2o-card-2",
            rule: "give/lend/show/send/pass/teach/write/offer + thing + to + person",
            example: "She gave the keys ___ (to/for) her brother before she left.",
            answer: "to",
            explanation: "When the thing comes first, these verbs use 'to' before the person: gave the keys to her brother.",
            examples: ["He sent a text message to his colleague.", "Could you pass the salt to me, please?"],
            ua: "«to» вживаємо з give, lend, show, send, pass, teach, write, offer, коли річ стоїть першою: gave the keys to him («дав ключі йому»).",
        },
        {
            id: "v2o-card-3",
            rule: "buy/get/leave/make + thing + for + person",
            example: "He bought a coffee ___ (to/for) his colleague this morning.",
            answer: "for",
            explanation: "Buy, get, leave and make use 'for' (not 'to') before the person when the thing comes first — you are doing something to benefit them.",
            examples: ["She got a snack for her daughter.", "I'll leave a note for you on the desk."],
            ua: "«for» вживаємо з buy, get, leave, make — дію робимо «для» когось: bought a coffee for him («купив каву для нього»).",
        },
        {
            id: "v2o-card-4",
            rule: "ask & tell: never use a preposition",
            example: "He asked ___ (I) a difficult question before the meeting.",
            answer: "me",
            explanation: "Ask and tell almost always use pattern 1 — verb + person + thing — with no preposition before the person at all.",
            examples: ["I told him my name straight away.", "Can I ask you a favour?"],
            ua: "ask і tell майже завжди без прийменника: asked me a question («запитав мене»), не to me.",
        },
        {
            id: "v2o-card-5",
            rule: "the person after the verb is an object pronoun",
            example: "Could you show ___ (we) your holiday photos?",
            answer: "us",
            explanation: "The person right after the verb must be an object pronoun — me, him, her, us, them — never a subject pronoun like we or I.",
            examples: ["She showed him the photos.", "Can you give her this letter?"],
            ua: "Особа одразу після дієслова — це об'єктний займенник (me, him, us), а не підметовий (I, we, she).",
        },
        {
            id: "v2o-card-6",
            rule: "a long person phrase → use pattern 2",
            example: "We gave a small gift ___ (to) all of the new employees.",
            answer: "to",
            explanation: "When the person is described with several words, pattern 2 (thing + to/for + person) sounds more natural than putting the long phrase straight after the verb.",
            examples: ["He wrote a message to all the new students.", "I sent an invitation to everyone on the team."],
            ua: "Коли особу описано кількома словами, краще pattern 2 (річ + to/for + особа): sent an email to everyone in the office.",
        },
    ],
    rules: verbsWithTwoObjectsQuestions,
};

export default verbsWithTwoObjectsQuestions;
