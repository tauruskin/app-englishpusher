/**
 * EnglishPusher Grammar Testing - Possessive Pronouns
 * A2+ Level (Speakout) - Lesson 5A
 *
 * 6 gap-fill, 6 error-spot, 7 multiple-choice, 6 word-transform = 25 questions
 * VERIFIED: All error-spot indexes checked against split(" ") positions.
 */

import type { GrammarQuestion, GrammarTopic } from "../types.ts";

export const possessivePronounsQuestions: GrammarQuestion[] = [

    // ===== GAP FILL QUESTIONS (6 questions) =====

    {
        id: "pp-gap-1",
        topic: "possessive-pronouns",
        type: "gap-fill",
        difficulty: "beginner",
        sentence: "This isn't your umbrella. I think it's ___.",
        grammarRule: "Possessive Pronoun 'Mine'",
        explanation: "'Mine' replaces 'my' + noun ('my umbrella'). A possessive pronoun stands alone — no noun follows it.",
        tip: "mine = my + noun. Never put a noun straight after mine.",
        gapFill: {
            gapIndex: 7,
            correctAnswer: "mine",
            options: ["mine", "my", "me", "I"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "pp-gap-2",
        topic: "possessive-pronouns",
        type: "gap-fill",
        difficulty: "beginner",
        sentence: "We left our bags in the car, but Tom and Ana left ___ at the hotel.",
        grammarRule: "Possessive Pronoun 'Theirs'",
        explanation: "'Theirs' replaces 'their' + noun ('their bags'). It refers to something belonging to two or more other people.",
        tip: "theirs = their + noun, used alone to avoid repeating the noun.",
        gapFill: {
            gapIndex: 12,
            correctAnswer: "theirs",
            options: ["theirs", "their", "them", "they"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "pp-gap-3",
        topic: "possessive-pronouns",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "I can't find my charger. Can I borrow ___?",
        grammarRule: "Possessive Pronoun 'Hers'",
        explanation: "'Hers' replaces 'her' + noun ('her charger'). There is no apostrophe — 'her's' doesn't exist.",
        tip: "hers = her + noun. Compare: her charger → hers.",
        gapFill: {
            gapIndex: 8,
            correctAnswer: "hers",
            options: ["hers", "her", "she", "herself"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "pp-gap-4",
        topic: "possessive-pronouns",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "My sister and I share a flat. ___ is on the third floor.",
        grammarRule: "Possessive Pronoun 'Ours'",
        explanation: "'Ours' replaces 'our' + noun ('our flat'). It shows something belongs to the speaker and at least one other person.",
        tip: "ours = our + noun, used without repeating the noun.",
        gapFill: {
            gapIndex: 7,
            correctAnswer: "ours",
            options: ["ours", "our", "us", "we"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "pp-gap-5",
        topic: "possessive-pronouns",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "I found two umbrellas at the office. Is one of them ___?",
        grammarRule: "Possessive Pronoun 'Yours'",
        explanation: "'Yours' replaces 'your' + noun ('your umbrella'). It works for one person or several people.",
        tip: "yours = your + noun. Never say 'yours umbrella'.",
        gapFill: {
            gapIndex: 11,
            correctAnswer: "yours",
            options: ["yours", "your", "you", "you're"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "pp-gap-6",
        topic: "possessive-pronouns",
        type: "gap-fill",
        difficulty: "advanced",
        sentence: "He says this isn't his jacket, but I'm sure it's ___.",
        grammarRule: "Possessive Pronoun 'His'",
        explanation: "'His' is unusual: the same word is both the possessive adjective ('his jacket') and the possessive pronoun ('it's his'). The spelling never changes.",
        tip: "his never changes form — his jacket (adjective) and it's his (pronoun) look identical.",
        gapFill: {
            gapIndex: 10,
            correctAnswer: "his",
            options: ["his", "him", "he's", "he"],
            correctOptionIndex: 0,
        },
    },

    // ===== ERROR SPOT QUESTIONS (6 questions) =====
    // RULE: Every error is exactly ONE word. Replacing wrongWord with correction
    // must produce a 100% grammatically correct sentence with no leftover errors.

    // split(" ") → [0=This, 1=bag, 2=isn't, 3=yours,, 4=it's, 5=my.]
    // words[5]="my." ✅ (strip punct "my")  corrected: "This bag isn't yours, it's mine." ✅
    {
        id: "pp-error-1",
        topic: "possessive-pronouns",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "This bag isn't yours, it's my.",
        grammarRule: "My vs Mine — No Noun After a Pronoun",
        explanation: "With no noun after it, we need the possessive pronoun 'mine', not the possessive adjective 'my'. 'My' always needs a noun straight after it.",
        errorSpot: {
            errorWordIndex: 5,
            wrongWord: "my",
            correction: "mine",
            reason: "No noun follows, so use the possessive pronoun: 'This bag isn't yours, it's mine.'",
            correctionOptions: ["mine", "my", "your", "hers"],
        },
    },

    // split(" ") → [0=Can, 1=I, 2=borrow, 3=your, 4=pen?, 5=I, 6=can't, 7=find, 8=mine, 9=pen.]
    // words[8]="mine" ✅  corrected: "...I can't find my pen." ✅
    {
        id: "pp-error-2",
        topic: "possessive-pronouns",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "Can I borrow your pen? I can't find mine pen.",
        grammarRule: "My vs Mine — Adjective Needs a Noun",
        explanation: "A noun ('pen') follows, so we need the possessive adjective 'my', not the possessive pronoun 'mine'. A possessive pronoun is never followed by a noun.",
        errorSpot: {
            errorWordIndex: 8,
            wrongWord: "mine",
            correction: "my",
            reason: "'Pen' follows, so use the adjective: 'I can't find my pen.'",
            correctionOptions: ["my", "mine", "your", "her"],
        },
    },

    // split(" ") → [0=Whose, 1=jacket, 2=is, 3=this?, 4=I, 5=think, 6=it's, 7=her.]
    // words[7]="her." ✅ (strip punct "her")  corrected: "...I think it's hers." ✅
    {
        id: "pp-error-3",
        topic: "possessive-pronouns",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "Whose jacket is this? I think it's her.",
        grammarRule: "Her vs Hers — No Noun After a Pronoun",
        explanation: "With no noun after it, we need the possessive pronoun 'hers', not the object pronoun 'her'. 'Hers' never changes and never takes an apostrophe.",
        errorSpot: {
            errorWordIndex: 7,
            wrongWord: "her",
            correction: "hers",
            reason: "No noun follows, so use the possessive pronoun: 'I think it's hers.'",
            correctionOptions: ["hers", "her", "his", "theirs"],
        },
    },

    // split(" ") → [0=That, 1=car, 2=outside, 3=is, 4=ours, 5=car.]
    // words[4]="ours" ✅  corrected: "That car outside is our car." ✅
    {
        id: "pp-error-4",
        topic: "possessive-pronouns",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "That car outside is ours car.",
        grammarRule: "Our vs Ours — Adjective Needs a Noun",
        explanation: "A noun ('car') follows, so we need the possessive adjective 'our', not the possessive pronoun 'ours'. A possessive pronoun is never followed by a noun.",
        errorSpot: {
            errorWordIndex: 4,
            wrongWord: "ours",
            correction: "our",
            reason: "'Car' follows, so use the adjective: 'That car outside is our car.'",
            correctionOptions: ["our", "ours", "their", "my"],
        },
    },

    // split(" ") → [0=We, 1=didn't, 2=bring, 3=our, 4=umbrellas,, 5=so, 6=we, 7=used, 8=theirs, 9=umbrellas.]
    // words[8]="theirs" ✅  corrected: "...so we used their umbrellas." ✅
    {
        id: "pp-error-5",
        topic: "possessive-pronouns",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "We didn't bring our umbrellas, so we used theirs umbrellas.",
        grammarRule: "Their vs Theirs — Adjective Needs a Noun",
        explanation: "A noun ('umbrellas') follows, so we need the possessive adjective 'their', not the possessive pronoun 'theirs'. A possessive pronoun is never followed by a noun.",
        errorSpot: {
            errorWordIndex: 8,
            wrongWord: "theirs",
            correction: "their",
            reason: "'Umbrellas' follows, so use the adjective: 'We used their umbrellas.'",
            correctionOptions: ["their", "theirs", "our", "his"],
        },
    },

    // split(" ") → [0=This, 1=isn't, 2=your, 3=seat,, 4=it's, 5=him.]
    // words[5]="him." ✅ (strip punct "him")  corrected: "This isn't your seat, it's his." ✅
    {
        id: "pp-error-6",
        topic: "possessive-pronouns",
        type: "error-spot",
        difficulty: "advanced",
        sentence: "This isn't your seat, it's him.",
        grammarRule: "His vs Him — Possession, Not Object",
        explanation: "To show possession with no noun after it, we need the possessive pronoun 'his', not the object pronoun 'him'. 'Him' never shows ownership.",
        errorSpot: {
            errorWordIndex: 5,
            wrongWord: "him",
            correction: "his",
            reason: "This shows possession, so use the possessive pronoun: 'This isn't your seat, it's his.'",
            correctionOptions: ["his", "him", "he's", "its"],
        },
    },

    // ===== MULTIPLE CHOICE QUESTIONS (7 questions) =====

    {
        id: "pp-mc-1",
        topic: "possessive-pronouns",
        type: "multiple-choice",
        difficulty: "beginner",
        sentence: "Choose the sentence that correctly replaces 'my book' with a possessive pronoun.",
        grammarRule: "Possessive Pronoun 'Mine'",
        explanation: "'Mine' replaces 'my' + noun and stands completely alone.",
        tip: "mine on its own, never 'mine' + noun.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "This is mine.",
            options: ["This is mine.", "This is mine book.", "This is my's.", "This is me."],
            optionExplanations: {
                "This is mine.": "Correct! 'Mine' replaces 'my book' and stands alone, with no noun after it.",
                "This is mine book.": "Wrong. A possessive pronoun is never followed by a noun — just say 'This is mine.'",
                "This is my's.": "Wrong. 'My's' doesn't exist — the possessive pronoun form of 'my' is 'mine'.",
                "This is me.": "Wrong. 'Me' is an object pronoun — it doesn't show ownership.",
            },
        },
    },

    {
        id: "pp-mc-2",
        topic: "possessive-pronouns",
        type: "multiple-choice",
        difficulty: "beginner",
        sentence: "Choose the sentence that uses a possessive pronoun correctly.",
        grammarRule: "Possessive Pronoun 'Hers'",
        explanation: "'Hers' replaces 'her' + noun and stands completely alone, with no apostrophe.",
        tip: "hers has no apostrophe and no noun after it.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "That jacket is hers.",
            options: ["That jacket is hers.", "That jacket is her.", "That jacket is hers jacket.", "That jacket is she."],
            optionExplanations: {
                "That jacket is hers.": "Correct! 'Hers' replaces 'her jacket' and stands alone.",
                "That jacket is her.": "Wrong. 'Her' is an object pronoun here — the possessive pronoun is 'hers'.",
                "That jacket is hers jacket.": "Wrong. A possessive pronoun is never followed by a noun.",
                "That jacket is she.": "Wrong. 'She' is a subject pronoun — it cannot show possession.",
            },
        },
    },

    {
        id: "pp-mc-3",
        topic: "possessive-pronouns",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the best way to complete this short dialogue.",
        grammarRule: "Whose + Possessive Pronoun",
        explanation: "We answer a 'Whose...?' question with a possessive pronoun on its own — here, 'mine'.",
        tip: "Whose is this? → It's mine / yours / his / hers / ours / theirs.",
        multipleChoice: {
            question: "A: Whose umbrella is this? B: ___",
            correctOption: "It's mine.",
            options: ["It's mine.", "It's my.", "It's me.", "It's I."],
            optionExplanations: {
                "It's mine.": "Correct! 'Mine' answers a 'whose' question and needs no noun after it.",
                "It's my.": "Wrong. 'My' is a possessive adjective — it always needs a noun after it.",
                "It's me.": "Wrong. 'Me' is an object pronoun — it doesn't show ownership.",
                "It's I.": "Wrong. 'I' is a subject pronoun — it doesn't show ownership.",
            },
        },
    },

    {
        id: "pp-mc-4",
        topic: "possessive-pronouns",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the grammatically correct sentence.",
        grammarRule: "Our vs Ours",
        explanation: "'Our' is a possessive adjective and always needs a noun after it, like 'flat'. 'Ours' is a possessive pronoun and never takes a noun or an apostrophe.",
        tip: "our + noun (our flat). ours alone, no noun, no apostrophe.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "Our flat is lovely.",
            options: ["Our flat is lovely.", "Ours flat is lovely.", "Our's flat is lovely.", "Our flat is ours lovely."],
            optionExplanations: {
                "Our flat is lovely.": "Correct! 'Our' (possessive adjective) + noun 'flat'.",
                "Ours flat is lovely.": "Wrong. 'Ours' is a possessive pronoun — it can never be followed by a noun like 'flat'.",
                "Our's flat is lovely.": "Wrong. 'Our's' doesn't exist — there is no apostrophe form of 'our'.",
                "Our flat is ours lovely.": "Wrong. 'Ours' cannot sit in front of another word like 'lovely' — remove it.",
            },
        },
    },

    {
        id: "pp-mc-5",
        topic: "possessive-pronouns",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the sentence with the correct possessive form.",
        grammarRule: "Possessive 'Its' vs Contraction 'It's'",
        explanation: "'Its' (no apostrophe) shows possession. 'It's' (with an apostrophe) is short for 'it is' or 'it has' — a different word entirely.",
        tip: "its = possession, no apostrophe. it's = it is / it has, with an apostrophe.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "The company increased its profits.",
            options: [
                "The company increased its profits.",
                "The company increased it's profits.",
                "The company increased its' profits.",
                "The company increased theirs profits.",
            ],
            optionExplanations: {
                "The company increased its profits.": "Correct! 'Its' (no apostrophe) shows the company's own profits.",
                "The company increased it's profits.": "Wrong. 'It's' means 'it is' — that makes no sense here. Use 'its' with no apostrophe.",
                "The company increased its' profits.": "Wrong. There is no form 'its'' with an apostrophe after the s.",
                "The company increased theirs profits.": "Wrong. 'Theirs' is a possessive pronoun — it can never be followed by a noun like 'profits'.",
            },
        },
    },

    {
        id: "pp-mc-6",
        topic: "possessive-pronouns",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the correct reply to this question.",
        grammarRule: "Possessive Pronoun 'Mine'",
        explanation: "'Mine' stands alone after 'not' with no noun and no extra pronoun.",
        tip: "it's not mine — short, no noun, no extra word after mine.",
        multipleChoice: {
            question: "A: Is this bag yours? B: ___",
            correctOption: "No, it's not mine.",
            options: ["No, it's not mine.", "No, it's not my.", "No, it isn't my bag mine.", "No, it's not me."],
            optionExplanations: {
                "No, it's not mine.": "Correct! 'Mine' replaces 'my bag' and needs nothing after it.",
                "No, it's not my.": "Wrong. 'My' is a possessive adjective — it always needs a noun after it.",
                "No, it isn't my bag mine.": "Wrong. Using both 'my bag' and 'mine' together is incorrect — pick one.",
                "No, it's not me.": "Wrong. 'Me' is an object pronoun — it doesn't show ownership.",
            },
        },
    },

    {
        id: "pp-mc-7",
        topic: "possessive-pronouns",
        type: "multiple-choice",
        difficulty: "advanced",
        sentence: "Choose the grammatically correct sentence.",
        grammarRule: "Possessive Pronoun 'Theirs'",
        explanation: "'Theirs' is the possessive pronoun form of 'their'. It never takes an apostrophe and is never followed by a noun.",
        tip: "theirs — no apostrophe, no noun after it.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "This isn't our car — it's theirs.",
            options: [
                "This isn't our car — it's theirs.",
                "This isn't our car — it's their's.",
                "This isn't our car — it's their.",
                "This isn't our car — it's theirs car.",
            ],
            optionExplanations: {
                "This isn't our car — it's theirs.": "Correct! 'Theirs' replaces 'their car' and stands alone.",
                "This isn't our car — it's their's.": "Wrong. 'Their's' doesn't exist — the possessive pronoun is simply 'theirs'.",
                "This isn't our car — it's their.": "Wrong. 'Their' is a possessive adjective — it always needs a noun after it.",
                "This isn't our car — it's theirs car.": "Wrong. A possessive pronoun is never followed by a noun.",
            },
        },
    },

    // ===== WORD TRANSFORM QUESTIONS (6 questions) =====

    {
        id: "pp-wt-1",
        topic: "possessive-pronouns",
        type: "word-transform",
        difficulty: "beginner",
        sentence: "This umbrella isn't yours, it's ___.",
        grammarRule: "Possessive Pronoun 'Mine'",
        explanation: "'Mine' is the possessive pronoun that matches 'I' — it replaces 'my' + noun.",
        tip: "I → my (adjective) → mine (pronoun, no noun after it).",
        wordTransform: {
            baseWord: "I",
            correctAnswer: "mine",
        },
    },

    {
        id: "pp-wt-2",
        topic: "possessive-pronouns",
        type: "word-transform",
        difficulty: "beginner",
        sentence: "That dog isn't our dog. It's ___.",
        grammarRule: "Possessive Pronoun 'Theirs'",
        explanation: "'Theirs' is the possessive pronoun that matches 'they' — it replaces 'their' + noun.",
        tip: "they → their (adjective) → theirs (pronoun, no noun after it).",
        wordTransform: {
            baseWord: "they",
            correctAnswer: "theirs",
        },
    },

    {
        id: "pp-wt-3",
        topic: "possessive-pronouns",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "I like your idea, but I prefer ___.",
        grammarRule: "Possessive Pronoun 'Ours'",
        explanation: "'Ours' is the possessive pronoun that matches 'we' — it replaces 'our' + noun.",
        tip: "we → our (adjective) → ours (pronoun, no noun after it).",
        wordTransform: {
            baseWord: "we",
            correctAnswer: "ours",
        },
    },

    {
        id: "pp-wt-4",
        topic: "possessive-pronouns",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "He found a wallet. He thinks it's ___.",
        grammarRule: "Possessive Pronoun 'Hers'",
        explanation: "'Hers' is the possessive pronoun that matches 'she' — it replaces 'her' + noun, with no apostrophe.",
        tip: "she → her (adjective) → hers (pronoun, no apostrophe).",
        wordTransform: {
            baseWord: "she",
            correctAnswer: "hers",
        },
    },

    {
        id: "pp-wt-5",
        topic: "possessive-pronouns",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "This seat is taken. I think it's ___.",
        grammarRule: "Possessive Pronoun 'His'",
        explanation: "'His' is the possessive pronoun that matches 'he' — unlike other pronouns, it has the same form as the possessive adjective.",
        tip: "he → his (adjective) → his (pronoun — same spelling).",
        wordTransform: {
            baseWord: "he",
            correctAnswer: "his",
        },
    },

    {
        id: "pp-wt-6",
        topic: "possessive-pronouns",
        type: "word-transform",
        difficulty: "advanced",
        sentence: "We don't have keys like that. Those must be ___.",
        grammarRule: "Possessive Pronoun 'Yours'",
        explanation: "'Yours' is the possessive pronoun that matches 'you' — it replaces 'your' + noun, for one person or several.",
        tip: "you → your (adjective) → yours (pronoun, singular or plural 'you').",
        wordTransform: {
            baseWord: "you",
            correctAnswer: "yours",
        },
    },
];

export const possessivePronounsTopic: GrammarTopic = {
    id: "possessive-pronouns",
    level: "A2+",
    name: "Possessive Pronouns",
    description: "Practise possessive pronouns — mine, yours, his, hers, ours and theirs — and the rule that they stand alone, never followed by a noun, unlike my, your, his, her, our and their.",
    lesson: "Lesson 5A",
    icon: "👜",
    cards: [
        {
            id: "pp-card-1",
            rule: "mine = my + noun (no noun after the pronoun)",
            example: "This isn't your coat — it's ___ (I).",
            answer: "mine",
            explanation: "'Mine' replaces 'my' + noun. A possessive pronoun stands alone — we never put a noun straight after it.",
            examples: ["I can't find my keys. Have you seen mine?", "The red bike is mine, not my brother's."],
            ua: "mine = «мій/моя/моє», але без іменника після: my coat → mine. Не можна сказати «mine coat» — іменник після займенника не ставимо.",
        },
        {
            id: "pp-card-2",
            rule: "yours = your + noun",
            example: "I left my umbrella at home. Can I borrow ___ (you)?",
            answer: "yours",
            explanation: "'Yours' replaces 'your' + noun ('your umbrella'). It works the same way for one person or several people.",
            examples: ["Is this pen yours?", "Our garden is small, but yours is huge!"],
            ua: "yours = «твій/твоя/твоє» або «ваш/ваша/ваше», без іменника: your umbrella → yours.",
        },
        {
            id: "pp-card-3",
            rule: "his — same word for adjective and pronoun",
            example: "That's not my phone — I think it's ___ (he).",
            answer: "his",
            explanation: "'His' is unusual: it is both the possessive adjective ('his phone') and the possessive pronoun ('it's his'). The spelling never changes.",
            examples: ["His car is the blue one.", "This jacket isn't mine — it's his."],
            ua: "his — єдина форма і для прикметника (his phone — «його телефон»), і для займенника (it's his — «це його»). Форма не змінюється.",
        },
        {
            id: "pp-card-4",
            rule: "hers = her + noun",
            example: "This scarf isn't mine. I think it's ___ (she).",
            answer: "hers",
            explanation: "'Hers' replaces 'her' + noun ('her scarf'). There is never an apostrophe — 'her's' doesn't exist.",
            examples: ["That umbrella is hers, not mine.", "I like your bag more than hers."],
            ua: "hers = «її», без іменника: her scarf → hers. Апострофа немає: не «her's», а hers.",
        },
        {
            id: "pp-card-5",
            rule: "ours = our + noun",
            example: "Your flat is on the second floor. ___ (we) is on the fifth.",
            answer: "ours",
            explanation: "'Ours' replaces 'our' + noun ('our flat'). It refers to something belonging to the speaker and at least one other person.",
            examples: ["This table is ours, not theirs.", "Their garden is bigger than ours."],
            ua: "ours = «наш/наша/наше», без іменника: our flat → ours.",
        },
        {
            id: "pp-card-6",
            rule: "theirs = their + noun",
            example: "We brought our own chairs. They brought ___ (they) too.",
            answer: "theirs",
            explanation: "'Theirs' replaces 'their' + noun ('their chairs'). It refers to something belonging to two or more other people.",
            examples: ["Our team lost, but theirs won.", "Is that suitcase theirs?"],
            ua: "theirs = «їхній/їхня/їхнє», без іменника: their chairs → theirs.",
        },
        {
            id: "pp-card-7",
            rule: "its vs it's — no apostrophe in the possessive",
            example: "The company increased ___ (it) profits this year.",
            answer: "its",
            explanation: "'Its' (no apostrophe) shows possession — the profits belonging to the company. 'It's' (with an apostrophe) is short for 'it is' or 'it has' — a completely different word.",
            examples: ["The dog wagged its tail.", "It's going to rain later."],
            ua: "its (без апострофа) — присвійна форма «його/її» про предмет: its tail. it's (з апострофом) = it is / it has — зовсім інше слово.",
        },
    ],
    rules: possessivePronounsQuestions,
};

export default possessivePronounsQuestions;
