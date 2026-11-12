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
        sentence: "I bought this umbrella myself, so it's ___.",
        grammarRule: "Possessive Pronoun — Mine",
        explanation: "'Mine' is the possessive pronoun for 'I' — it replaces 'my umbrella' and stands alone, with no noun after it.",
        tip: "I → my (+ noun) → mine (no noun). Say 'this is mine', never 'this is mine umbrella'.",
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
        sentence: "A: Is this your phone? B: Yes, it's ___.",
        grammarRule: "Possessive Pronoun — Yours",
        explanation: "'Yours' is the possessive pronoun for 'you' — it replaces 'your phone' so we don't repeat the noun.",
        tip: "You → your (+ noun) → yours (no noun, no apostrophe!).",
        gapFill: {
            gapIndex: 8,
            correctAnswer: "yours",
            options: ["yours", "your", "you", "yourself"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "pp-gap-3",
        topic: "possessive-pronouns",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "Daniel left his jacket at my house, so I gave it back — it was ___.",
        grammarRule: "Possessive Pronoun — His",
        explanation: "'His' is both the possessive adjective and the possessive pronoun for 'he' — the same word works alone or before a noun.",
        tip: "His jacket = adjective (+ noun). It was his = pronoun (no noun). 'His' never changes form.",
        gapFill: {
            gapIndex: 15,
            correctAnswer: "his",
            options: ["his", "him", "he", "he's"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "pp-gap-4",
        topic: "possessive-pronouns",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "Maria left her umbrella on the table, so the red umbrella there is ___.",
        grammarRule: "Possessive Pronoun — Hers",
        explanation: "'Hers' is the possessive pronoun for 'she' — it replaces 'her umbrella' and stands alone.",
        tip: "She → her (+ noun) → hers (no noun). Never write 'her's'.",
        gapFill: {
            gapIndex: 13,
            correctAnswer: "hers",
            options: ["hers", "her", "she", "she's"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "pp-gap-5",
        topic: "possessive-pronouns",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "We reserved table 12, so the reservation for table 12 is ___.",
        grammarRule: "Possessive Pronoun — Ours",
        explanation: "'Ours' is the possessive pronoun for 'we' — use it once the noun (the reservation) has already been mentioned.",
        tip: "We → our (+ noun) → ours (no noun). Never write 'our's'.",
        gapFill: {
            gapIndex: 11,
            correctAnswer: "ours",
            options: ["ours", "our", "us", "we"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "pp-gap-6",
        topic: "possessive-pronouns",
        type: "gap-fill",
        difficulty: "advanced",
        sentence: "The Smiths own the house on the corner, so the house on the corner is ___.",
        grammarRule: "Possessive Pronoun — Theirs",
        explanation: "'Theirs' is the possessive pronoun for 'they' — it replaces 'their house' without repeating the noun.",
        tip: "They → their (+ noun) → theirs (no noun). Never write 'their's'.",
        gapFill: {
            gapIndex: 15,
            correctAnswer: "theirs",
            options: ["theirs", "their", "them", "they"],
            correctOptionIndex: 0,
        },
    },

    // ===== ERROR SPOT QUESTIONS (6 questions) =====
    // RULE: Every error is exactly ONE word. Replacing wrongWord with correction
    // must produce a 100% grammatically correct sentence with no leftover errors.

    // split(" ") → [0=That, 1=jacket, 2=is, 3=her.]
    // words[3]="her." ✅ (strips to "her")  corrected: "That jacket is hers." ✅
    {
        id: "pp-error-1",
        topic: "possessive-pronouns",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "That jacket is her.",
        grammarRule: "Possessive Pronoun vs Object Pronoun",
        explanation: "After 'be', possession needs the possessive pronoun 'hers' — 'her' is the object pronoun and can't stand here alone.",
        errorSpot: {
            errorWordIndex: 3,
            wrongWord: "her",
            correction: "hers",
            reason: "'Her' is an object pronoun (I saw her). To show possession alone, use 'hers': 'That jacket is hers.'",
            correctionOptions: ["hers", "her", "she's", "she"],
        },
    },

    // split(" ") → [0=This, 1=bag, 2=isn't, 3=my, 4=—, 5=it's, 6=yours.]
    // words[3]="my" ✅  corrected: "This bag isn't mine — it's yours." ✅
    {
        id: "pp-error-2",
        topic: "possessive-pronouns",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "This bag isn't my — it's yours.",
        grammarRule: "Possessive Pronoun Stands Alone",
        explanation: "'My' is a possessive adjective and always needs a noun after it. With no noun, use the possessive pronoun 'mine'.",
        errorSpot: {
            errorWordIndex: 3,
            wrongWord: "my",
            correction: "mine",
            reason: "Possessive pronouns stand alone with no noun — use 'mine', not 'my': 'This bag isn't mine.'",
            correctionOptions: ["mine", "my", "me", "I"],
        },
    },

    // split(" ") → [0=This, 1=is, 2=mine, 3=book,, 4=not, 5=yours.]
    // words[2]="mine" ✅  corrected: "This is my book, not yours." ✅
    {
        id: "pp-error-3",
        topic: "possessive-pronouns",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "This is mine book, not yours.",
        grammarRule: "Possessive Pronoun Never Followed by a Noun",
        explanation: "We never follow a possessive pronoun with a noun. Before a noun like 'book', use the possessive adjective 'my'.",
        errorSpot: {
            errorWordIndex: 2,
            wrongWord: "mine",
            correction: "my",
            reason: "A possessive pronoun can't be followed by a noun — use 'my' + 'book': 'This is my book.'",
            correctionOptions: ["my", "mine", "mines", "our"],
        },
    },

    // split(" ") → [0=The, 1=blue, 2=car, 3=is, 4=theirs, 5=car,, 6=not, 7=ours.]
    // words[4]="theirs" ✅  corrected: "The blue car is their car, not ours." ✅
    {
        id: "pp-error-4",
        topic: "possessive-pronouns",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "The blue car is theirs car, not ours.",
        grammarRule: "Possessive Pronoun Never Followed by a Noun",
        explanation: "'Theirs' is a possessive pronoun and can't be followed by a noun. Before 'car', use the possessive adjective 'their'.",
        errorSpot: {
            errorWordIndex: 4,
            wrongWord: "theirs",
            correction: "their",
            reason: "A possessive pronoun can't be followed by a noun — use 'their' + 'car': 'The blue car is their car.'",
            correctionOptions: ["their", "theirs", "there", "them"],
        },
    },

    // split(" ") → [0=Is, 1=this, 2=umbrella, 3=your's?]
    // words[3]="your's?" ✅ (strips to "your's")  corrected: "Is this umbrella yours?" ✅
    {
        id: "pp-error-5",
        topic: "possessive-pronouns",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "Is this umbrella your's?",
        grammarRule: "Possessive Pronouns Never Take an Apostrophe",
        explanation: "Possessive pronouns never take an apostrophe, unlike a noun's possessive form (Maria's). 'Yours' is already complete.",
        errorSpot: {
            errorWordIndex: 3,
            wrongWord: "your's",
            correction: "yours",
            reason: "'Yours' never takes an apostrophe: 'Is this umbrella yours?'",
            correctionOptions: ["yours", "your's", "your", "yous"],
        },
    },

    // split(" ") → [0=We, 1=found, 2=our, 3=keys,, 4=but, 5=they, 6=couldn't, 7=find, 8=theirs's.]
    // words[8]="theirs's." ✅ (strips to "theirs's")  corrected: "...find theirs." ✅
    {
        id: "pp-error-6",
        topic: "possessive-pronouns",
        type: "error-spot",
        difficulty: "advanced",
        sentence: "We found our keys, but they couldn't find theirs's.",
        grammarRule: "Possessive Pronouns Never Take an Apostrophe",
        explanation: "'Theirs' is already a complete possessive pronoun. Adding an extra apostrophe + s is a common but incorrect double mistake.",
        errorSpot: {
            errorWordIndex: 8,
            wrongWord: "theirs's",
            correction: "theirs",
            reason: "'Theirs' is complete on its own — never add an apostrophe + s: '...but they couldn't find theirs.'",
            correctionOptions: ["theirs", "theirs's", "their's", "there's"],
        },
    },

    // ===== MULTIPLE CHOICE QUESTIONS (7 questions) =====

    {
        id: "pp-mc-1",
        topic: "possessive-pronouns",
        type: "multiple-choice",
        difficulty: "beginner",
        sentence: "Choose the sentence that correctly uses a possessive pronoun.",
        grammarRule: "Possessive Pronoun vs Possessive Adjective",
        explanation: "Possessive pronouns (mine, yours, his, hers, ours, theirs) replace 'possessive adjective + noun' and stand alone.",
        tip: "After 'is/are' with no noun following, use the possessive pronoun, not the adjective.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "This phone is mine.",
            options: [
                "This phone is mine.",
                "This phone is my.",
                "This phone is me.",
                "This phone is I.",
            ],
            optionExplanations: {
                "This phone is mine.": "Correct! 'Mine' is the possessive pronoun for 'I' and stands alone after 'is'.",
                "This phone is my.": "Wrong. 'My' is a possessive adjective — it always needs a noun after it (my phone).",
                "This phone is me.": "Wrong. 'Me' is an object pronoun, not a possessive form.",
                "This phone is I.": "Wrong. 'I' is a subject pronoun — it can't follow 'is' here.",
            },
        },
    },

    {
        id: "pp-mc-2",
        topic: "possessive-pronouns",
        type: "multiple-choice",
        difficulty: "beginner",
        sentence: "Choose the correct possessive pronoun for something belonging to 'we'.",
        grammarRule: "Possessive Pronoun — Ours",
        explanation: "'Ours' replaces 'our + noun' and is used alone.",
        tip: "We → our (+ noun) → ours (no noun).",
        multipleChoice: {
            question: "Which word means 'belonging to us'?",
            correctOption: "ours",
            options: ["ours", "our", "us", "we's"],
            optionExplanations: {
                "ours": "Correct! 'Ours' is the possessive pronoun for 'we'.",
                "our": "Wrong. 'Our' is the possessive adjective — it needs a noun (our team).",
                "us": "Wrong. 'Us' is the object pronoun.",
                "we's": "Wrong. 'We's' isn't a real word.",
            },
        },
    },

    {
        id: "pp-mc-3",
        topic: "possessive-pronouns",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Original sentence: 'That is her bag.' Choose the version that replaces 'her bag' with a possessive pronoun.",
        grammarRule: "Possessive Pronoun Replaces Adjective + Noun",
        explanation: "Possessive pronouns replace the whole phrase 'possessive adjective + noun' in one word.",
        tip: "Her bag → hers. Never 'hers bag'.",
        multipleChoice: {
            question: "Which sentence correctly uses a possessive pronoun?",
            correctOption: "That is hers.",
            options: [
                "That is hers.",
                "That is her.",
                "That is hers bag.",
                "That is she's.",
            ],
            optionExplanations: {
                "That is hers.": "Correct! 'Hers' replaces 'her bag' — no noun needed.",
                "That is her.": "Wrong. 'Her' is the object pronoun, not the possessive pronoun.",
                "That is hers bag.": "Wrong. A possessive pronoun is never followed by a noun.",
                "That is she's.": "Wrong. 'She's' means 'she is' — it isn't a possessive form.",
            },
        },
    },

    {
        id: "pp-mc-4",
        topic: "possessive-pronouns",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the grammatically correct sentence.",
        grammarRule: "Possessive Pronoun Stands Alone",
        explanation: "A possessive pronoun like 'ours' is never followed by a noun and never takes an apostrophe.",
        tip: "If a noun follows, use the adjective (our car); if not, use the pronoun (ours).",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "Ours is the red car.",
            options: [
                "Ours is the red car.",
                "Ours car is red.",
                "Our is the red car.",
                "Ours' car is red.",
            ],
            optionExplanations: {
                "Ours is the red car.": "Correct! 'Ours' stands alone with no noun after it.",
                "Ours car is red.": "Wrong. A possessive pronoun can never be followed by a noun — 'our car' needs the adjective 'our'.",
                "Our is the red car.": "Wrong. 'Our' is a possessive adjective — it always needs a noun.",
                "Ours' car is red.": "Wrong. Possessive pronouns never take an apostrophe, and never come before a noun.",
            },
        },
    },

    {
        id: "pp-mc-5",
        topic: "possessive-pronouns",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the sentence that correctly uses the possessive pronoun, not the contraction.",
        grammarRule: "Theirs vs There's — Sound-Alike Confusion",
        explanation: "'Theirs' (possession) and 'there's' (= there is) sound alike but mean completely different things.",
        tip: "Theirs = belongs to them. There's = there is. Never write 'their's'.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "Theirs is the house on the corner.",
            options: [
                "Theirs is the house on the corner.",
                "There's is the house on the corner.",
                "Their's is the house on the corner.",
                "Theres is the house on the corner.",
            ],
            optionExplanations: {
                "Theirs is the house on the corner.": "Correct! 'Theirs' (possessive pronoun, no apostrophe) means 'their house'.",
                "There's is the house on the corner.": "Wrong. 'There's' means 'there is' — it can't be followed by another verb 'is'.",
                "Their's is the house on the corner.": "Wrong. Possessive pronouns never take an apostrophe.",
                "Theres is the house on the corner.": "Wrong. 'Theres' isn't a word at all.",
            },
        },
    },

    {
        id: "pp-mc-6",
        topic: "possessive-pronouns",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the sentence that uses 'yours' correctly.",
        grammarRule: "Possessive Pronoun — Yours (No Apostrophe)",
        explanation: "'Yours' is a complete word on its own — it never takes an apostrophe, unlike a noun's possessive (Maria's).",
        tip: "Yours, his, hers, ours, theirs — none of them ever take an apostrophe.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "Is this bag yours?",
            options: [
                "Is this bag yours?",
                "Is this bag your's?",
                "Is this bag your?",
                "Is this bag yous?",
            ],
            optionExplanations: {
                "Is this bag yours?": "Correct! 'Yours' never takes an apostrophe.",
                "Is this bag your's?": "Wrong. Possessive pronouns never take an apostrophe.",
                "Is this bag your?": "Wrong. 'Your' is the possessive adjective — it needs a noun (your bag).",
                "Is this bag yous?": "Wrong. 'Yous' isn't a standard English word.",
            },
        },
    },

    {
        id: "pp-mc-7",
        topic: "possessive-pronouns",
        type: "multiple-choice",
        difficulty: "advanced",
        sentence: "Context: My sister has a red car. I have a blue car. Choose the sentence that correctly combines these with possessive pronouns.",
        grammarRule: "Possessive Pronouns Avoid Repeating Nouns",
        explanation: "Possessive pronouns let you avoid repeating a noun that's already clear from context.",
        tip: "Once the noun (car) is established, switch to the possessive pronoun: hers, mine.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "Hers is red; mine is blue.",
            options: [
                "Hers is red; mine is blue.",
                "Her is red; mine is blue.",
                "Hers is red; my is blue.",
                "Hers' is red; mine is blue.",
            ],
            optionExplanations: {
                "Hers is red; mine is blue.": "Correct! Both possessive pronouns stand alone, replacing 'her car' and 'my car'.",
                "Her is red; mine is blue.": "Wrong. 'Her' is the object pronoun — the possessive pronoun is 'hers'.",
                "Hers is red; my is blue.": "Wrong. 'My' is a possessive adjective and needs a noun — use 'mine' here.",
                "Hers' is red; mine is blue.": "Wrong. Possessive pronouns never take an apostrophe.",
            },
        },
    },

    // ===== WORD TRANSFORM QUESTIONS (6 questions) =====

    {
        id: "pp-wt-1",
        topic: "possessive-pronouns",
        type: "word-transform",
        difficulty: "beginner",
        sentence: "This seat is taken, but the one next to it is ___.",
        grammarRule: "Possessive Pronoun Formation — I → Mine",
        explanation: "'I' becomes the possessive pronoun 'mine' — used alone, with no noun after it, to mean 'my seat'.",
        tip: "I → mine. Never 'my' alone without a noun.",
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
        sentence: "Is this umbrella ___?",
        grammarRule: "Possessive Pronoun Formation — You → Yours",
        explanation: "'You' becomes 'yours' when asking about possession without repeating the noun 'umbrella'.",
        tip: "You → yours. No apostrophe — 'your's' is always wrong.",
        wordTransform: {
            baseWord: "you",
            correctAnswer: "yours",
        },
    },

    {
        id: "pp-wt-3",
        topic: "possessive-pronouns",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "My keys are on the table. Where are ___?",
        grammarRule: "Possessive Pronoun Formation — He → His",
        explanation: "'He' becomes 'his' — the same form works as a possessive adjective (his keys) or alone as a possessive pronoun.",
        tip: "He → his, whether or not a noun follows.",
        wordTransform: {
            baseWord: "he",
            correctAnswer: "his",
        },
    },

    {
        id: "pp-wt-4",
        topic: "possessive-pronouns",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "Our team won, but ___ lost.",
        grammarRule: "Possessive Pronoun Formation — They → Theirs",
        explanation: "'They' becomes 'theirs' — it replaces 'their team' so the noun isn't repeated.",
        tip: "They → theirs. Never add an apostrophe: not 'their's'.",
        wordTransform: {
            baseWord: "they",
            correctAnswer: "theirs",
        },
    },

    {
        id: "pp-wt-5",
        topic: "possessive-pronouns",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "She has her own car; this blue one is ___.",
        grammarRule: "Possessive Pronoun Formation — She → Hers",
        explanation: "'She' becomes 'hers' — it stands for 'her car' without repeating the noun.",
        tip: "She → hers. Never 'her's' — that form doesn't exist.",
        wordTransform: {
            baseWord: "she",
            correctAnswer: "hers",
        },
    },

    {
        id: "pp-wt-6",
        topic: "possessive-pronouns",
        type: "word-transform",
        difficulty: "advanced",
        sentence: "We all brought packed lunches, but ___ was the biggest.",
        grammarRule: "Possessive Pronoun Formation — We → Ours",
        explanation: "'We' becomes 'ours' — it replaces 'our lunch' so the noun isn't repeated.",
        tip: "We → ours. Never 'our's'.",
        wordTransform: {
            baseWord: "we",
            correctAnswer: "ours",
        },
    },
];

export const possessivePronounsTopic: GrammarTopic = {
    id: "possessive-pronouns",
    level: "A2+",
    name: "Possessive Pronouns",
    description: "Learn mine, yours, his, hers, ours and theirs — how they replace a possessive adjective + noun, why they stand alone with no noun after them, and why they never take an apostrophe.",
    lesson: "Lesson 5A",
    rules: possessivePronounsQuestions,
};

export default possessivePronounsQuestions;
