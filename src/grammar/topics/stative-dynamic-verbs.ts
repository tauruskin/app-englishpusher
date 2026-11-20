/**
 * EnglishPusher Grammar Testing - Stative vs Dynamic Verbs
 * B1 Level (Speak Out) - Lesson 4
 *
 * 6 gap-fill, 6 error-spot, 7 multiple-choice, 6 word-transform = 25 questions
 * VERIFIED: All error-spot indexes checked against split(" ") positions.
 */

import type { GrammarQuestion, GrammarTopic } from "../types.ts";

export const stativeDynamicVerbs: GrammarQuestion[] = [

    // ===== GAP FILL QUESTIONS (6 questions) =====

    {
        id: "sdv-gap-1",
        topic: "stative-dynamic-verbs",
        type: "gap-fill",
        difficulty: "beginner",
        sentence: "She ___ a beautiful voice.",
        grammarRule: "Stative Verb 'Have' — Possession / Characteristic",
        explanation: "'Have' used to express possession or a characteristic is stative — use Present Simple, never Present Continuous.",
        tip: "Have (own/possess) = stative → has/have. Have (experience) = dynamic → is having/are having.",
        gapFill: {
            gapIndex: 1,
            correctAnswer: "has",
            options: ["has", "is having", "having", "have"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "sdv-gap-2",
        topic: "stative-dynamic-verbs",
        type: "gap-fill",
        difficulty: "beginner",
        sentence: "He ___ the project will be successful.",
        grammarRule: "Stative Verb 'Think' — Belief / Opinion",
        explanation: "'Think' used to express a belief or opinion is stative — use Present Simple. 'I think' = I believe.",
        tip: "Think (believe) = stative → thinks/think. Think (consider/process) = dynamic → is thinking.",
        gapFill: {
            gapIndex: 1,
            correctAnswer: "thinks",
            options: ["thinks", "is thinking", "thinking", "think"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "sdv-gap-3",
        topic: "stative-dynamic-verbs",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "We ___ a great time at the party right now!",
        grammarRule: "Dynamic Verb 'Have' — Experiencing",
        explanation: "'Have' used to mean 'experience' or 'enjoy' is dynamic — use Present Continuous. 'Having a great time' = experiencing/enjoying.",
        tip: "Have a good time / have a meeting / have lunch → dynamic → use is/am/are having.",
        gapFill: {
            gapIndex: 1,
            correctAnswer: "are having",
            options: ["are having", "have", "has", "having"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "sdv-gap-4",
        topic: "stative-dynamic-verbs",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "I ___ my dentist tomorrow afternoon.",
        grammarRule: "Dynamic Verb 'See' — Meeting / Visiting",
        explanation: "'See' used to mean 'meet' or 'visit' is dynamic — use Present Continuous. 'I'm seeing' = I have an appointment.",
        tip: "See (understand) = stative → I see. See (visit/meet) = dynamic → I'm seeing.",
        gapFill: {
            gapIndex: 1,
            correctAnswer: "am seeing",
            options: ["am seeing", "see", "sees", "seeing"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "sdv-gap-5",
        topic: "stative-dynamic-verbs",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "She ___ very rude to everyone lately.",
        grammarRule: "Dynamic Verb 'Be' — Temporary Behaviour",
        explanation: "'Be' used to describe temporary behaviour uses Present Continuous: 'is being'. It means she is acting rudely now — it may not last.",
        tip: "Be (permanent quality) = stative → She is kind. Be (temporary behaviour) = dynamic → She is being rude.",
        gapFill: {
            gapIndex: 1,
            correctAnswer: "is being",
            options: ["is being", "is", "being", "be"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "sdv-gap-6",
        topic: "stative-dynamic-verbs",
        type: "gap-fill",
        difficulty: "advanced",
        sentence: "I ___ about changing my job at the moment.",
        grammarRule: "Dynamic Verb 'Think' — Considering / Processing",
        explanation: "'Think' used to mean 'consider' or 'reflect on' is dynamic — use Present Continuous.",
        tip: "Think (believe) = I think it's true. Think (consider) = I'm thinking about it.",
        gapFill: {
            gapIndex: 1,
            correctAnswer: "am thinking",
            options: ["am thinking", "think", "thinks", "thinking"],
            correctOptionIndex: 0,
        },
    },

    // ===== ERROR SPOT QUESTIONS (6 questions) =====
    // RULE: Every error is exactly ONE word. Replacing wrongWord with correction
    // must produce a 100% grammatically correct sentence with no leftover errors.

    // split(" ") → [0=She, 1=knowing, 2=French, 3=and, 4=Italian.]
    // words[1]="knowing" ✅  corrected: "She knows French and Italian." ✅
    {
        id: "sdv-error-1",
        topic: "stative-dynamic-verbs",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "She knowing French and Italian.",
        grammarRule: "Stative Verb 'Know' — Never in Continuous",
        explanation: "'Know' is a stative verb — it describes a state of mind (having knowledge). Stative verbs cannot be used in the -ing form.",
        errorSpot: {
            errorWordIndex: 1,
            wrongWord: "knowing",
            correction: "knows",
            reason: "'Know' is stative and cannot use the -ing form. Use Present Simple: 'She knows French and Italian.'",
            correctionOptions: ["knows", "knowing", "is knowing", "known"],
        },
    },

    // split(" ") → [0=The, 1=coffee, 2=tasting, 3=bitter, 4=this, 5=morning.]
    // words[2]="tasting" ✅  corrected: "The coffee tastes bitter this morning." ✅
    {
        id: "sdv-error-2",
        topic: "stative-dynamic-verbs",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "The coffee tasting bitter this morning.",
        grammarRule: "Stative Verb 'Taste' — Sensory Property",
        explanation: "'Taste' used to describe a flavour (sensory property) is stative. Use Present Simple: 'tastes'.",
        errorSpot: {
            errorWordIndex: 2,
            wrongWord: "tasting",
            correction: "tastes",
            reason: "'Taste' (= has a flavour) is stative — no -ing form. Use 'tastes': 'The coffee tastes bitter.'",
            correctionOptions: ["tastes", "tasting", "is tasting", "tasted"],
        },
    },

    // split(" ") → [0=I, 1=believing, 2=this, 3=is, 4=a, 5=good, 6=idea.]
    // words[1]="believing" ✅  corrected: "I believe this is a good idea." ✅
    {
        id: "sdv-error-3",
        topic: "stative-dynamic-verbs",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "I believing this is a good idea.",
        grammarRule: "Stative Verb 'Believe' — Opinion",
        explanation: "'Believe' is a stative verb expressing an opinion or judgement. It cannot be used in the -ing form.",
        errorSpot: {
            errorWordIndex: 1,
            wrongWord: "believing",
            correction: "believe",
            reason: "'Believe' is stative — always use Present Simple: 'I believe', never 'I am believing'.",
            correctionOptions: ["believe", "believing", "am believing", "believed"],
        },
    },

    // split(" ") → [0=He, 1=resembling, 2=his, 3=father, 4=very, 5=much.]
    // words[1]="resembling" ✅  corrected: "He resembles his father very much." ✅
    {
        id: "sdv-error-4",
        topic: "stative-dynamic-verbs",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "He resembling his father very much.",
        grammarRule: "Stative Verb 'Resemble' — Appearance",
        explanation: "'Resemble' describes how someone looks compared to another person — it is always stative. Use Present Simple.",
        errorSpot: {
            errorWordIndex: 1,
            wrongWord: "resembling",
            correction: "resembles",
            reason: "'Resemble' is always stative — no continuous form exists. Use 'resembles': 'He resembles his father very much.'",
            correctionOptions: ["resembles", "resembling", "is resembling", "resembled"],
        },
    },

    // split(" ") → [0=This, 1=bag, 2=belonging, 3=to, 4=Maria.]
    // words[2]="belonging" ✅  corrected: "This bag belongs to Maria." ✅
    {
        id: "sdv-error-5",
        topic: "stative-dynamic-verbs",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "This bag belonging to Maria.",
        grammarRule: "Stative Verb 'Belong' — Ownership",
        explanation: "'Belong' describes ownership and is always stative. It cannot be used in the -ing form.",
        errorSpot: {
            errorWordIndex: 2,
            wrongWord: "belonging",
            correction: "belongs",
            reason: "'Belong' is stative — always Present Simple: 'This bag belongs to Maria.'",
            correctionOptions: ["belongs", "belonging", "is belonging", "belonged"],
        },
    },

    // split(" ") → [0=He, 1=being, 2=30, 3=years, 4=old.]
    // words[1]="being" ✅  corrected: "He is 30 years old." ✅
    {
        id: "sdv-error-6",
        topic: "stative-dynamic-verbs",
        type: "error-spot",
        difficulty: "advanced",
        sentence: "He being 30 years old.",
        grammarRule: "Stative Verb 'Be' — Permanent Characteristic",
        explanation: "'Be' describes a permanent characteristic (age, origin, appearance) — use Present Simple 'is/am/are', not 'being'.",
        errorSpot: {
            errorWordIndex: 1,
            wrongWord: "being",
            correction: "is",
            reason: "Permanent qualities use 'is': 'He is 30 years old.' Use 'is being' ONLY for temporary behaviour: 'He is being rude.'",
            correctionOptions: ["is", "being", "has", "was"],
        },
    },

    // ===== MULTIPLE CHOICE QUESTIONS (7 questions) =====

    {
        id: "sdv-mc-1",
        topic: "stative-dynamic-verbs",
        type: "multiple-choice",
        difficulty: "beginner",
        sentence: "Choose the sentence that uses 'know' correctly:",
        grammarRule: "Stative Verb 'Know' — Always Simple",
        explanation: "'Know' is always stative — it cannot be used in continuous form in any context.",
        tip: "Know, believe, understand, remember — always stative, always Present Simple.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "She knows three languages.",
            options: [
                "She knows three languages.",
                "She is knowing three languages.",
                "She knowing three languages.",
                "She is know three languages.",
            ],
            optionExplanations: {
                "She knows three languages.": "Correct! 'Know' is stative — always use Present Simple.",
                "She is knowing three languages.": "Wrong. 'Know' is stative and can never be used in continuous form.",
                "She knowing three languages.": "Wrong. Missing auxiliary verb AND wrong form — 'know' cannot be -ing.",
                "She is know three languages.": "Wrong. 'Know' must be in the simple form, not with 'is': 'She knows'.",
            },
        },
    },

    {
        id: "sdv-mc-2",
        topic: "stative-dynamic-verbs",
        type: "multiple-choice",
        difficulty: "beginner",
        sentence: "Choose the sentence where 'have' is used as a STATIVE verb:",
        grammarRule: "Stative Verb 'Have' — Possession",
        explanation: "'Have' is stative when it means 'possess' or 'own'. It's dynamic (continuous) when it means 'experience': having a bath, having fun.",
        tip: "Have (own) = stative → has/have. Have (experience/enjoy) = dynamic → is having.",
        multipleChoice: {
            question: "Which sentence uses 'have' with a stative (possession) meaning?",
            correctOption: "She has a house in the countryside.",
            options: [
                "She has a house in the countryside.",
                "She is having lunch with a client.",
                "They are having a great time.",
                "He is having a shower.",
            ],
            optionExplanations: {
                "She has a house in the countryside.": "Correct! 'Has a house' = possesses/owns → stative → Present Simple.",
                "She is having lunch with a client.": "Wrong. 'Having lunch' is dynamic (an activity/experience) → Present Continuous is correct here.",
                "They are having a great time.": "Wrong. 'Having a great time' = experiencing → dynamic → Continuous is correct here.",
                "He is having a shower.": "Wrong. 'Having a shower' is an activity → dynamic → Continuous is correct here.",
            },
        },
    },

    {
        id: "sdv-mc-3",
        topic: "stative-dynamic-verbs",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the sentence where 'see' is used as a DYNAMIC verb:",
        grammarRule: "Stative vs Dynamic — 'See'",
        explanation: "When 'see' means 'meet' or 'visit', it is dynamic — use Present Continuous. When it means 'perceive' or 'understand', it is stative — use Present Simple.",
        tip: "See (understand/perceive) = stative: 'I see.' See (visit/meet by arrangement) = dynamic: 'I'm seeing my lawyer tonight.'",
        multipleChoice: {
            question: "In which sentence does 'see' describe an action or arrangement?",
            correctOption: "I'm seeing the doctor at 10 a.m. tomorrow.",
            options: [
                "I'm seeing the doctor at 10 a.m. tomorrow.",
                "I see what you mean now.",
                "I can see the mountains from here.",
                "Do you see anyone you recognise?",
            ],
            optionExplanations: {
                "I'm seeing the doctor at 10 a.m. tomorrow.": "Correct! 'I'm seeing' = I have an appointment — the dynamic use of 'see'.",
                "I see what you mean now.": "Wrong. 'I see' here = I understand — this is the stative use.",
                "I can see the mountains from here.": "Wrong. 'Can see' = visual perception — this is the stative use.",
                "Do you see anyone you recognise?": "Wrong. 'See' here = visual perception — this is the stative use.",
            },
        },
    },

    {
        id: "sdv-mc-4",
        topic: "stative-dynamic-verbs",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "She is being very generous today.",
        grammarRule: "Dynamic Verb 'Be' — Temporary Behaviour",
        explanation: "'Is being' + adjective describes temporary behaviour — how someone is acting right now. It suggests this is unusual or different from normal.",
        tip: "She is kind = permanent quality. She is being kind = temporary behaviour (unusual or noteworthy).",
        multipleChoice: {
            question: "What does this tell us about her generosity?",
            correctOption: "She is acting generously now — it might not be her usual behaviour.",
            options: [
                "She is acting generously now — it might not be her usual behaviour.",
                "She is always a very generous person.",
                "She is gradually becoming more generous.",
                "She was generous in the past but is not now.",
            ],
            optionExplanations: {
                "She is acting generously now — it might not be her usual behaviour.": "Correct! 'Is being' = temporary behaviour — it suggests this is noteworthy or unusual.",
                "She is always a very generous person.": "Wrong. A permanent quality uses 'is': 'She is generous.'",
                "She is gradually becoming more generous.": "Wrong. 'Becoming' would be needed for this meaning.",
                "She was generous in the past but is not now.": "Wrong. 'Is being' is present tense — it refers to current behaviour.",
            },
        },
    },

    {
        id: "sdv-mc-5",
        topic: "stative-dynamic-verbs",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Find the sentence that uses 'taste' INCORRECTLY:",
        grammarRule: "Stative vs Dynamic 'Taste'",
        explanation: "'Taste' = has a flavour → stative → Present Simple ('tastes'). 'Taste' = try/sample → dynamic → Present Continuous ('is tasting').",
        tip: "The soup tastes good (= has flavour). He is tasting the soup (= trying it actively).",
        multipleChoice: {
            question: "Which sentence has an error?",
            correctOption: "This pizza is tasting amazing.",
            options: [
                "This pizza is tasting amazing.",
                "This pizza tastes amazing.",
                "He is tasting the soup to check the salt.",
                "Can you taste the garlic in this dish?",
            ],
            optionExplanations: {
                "This pizza is tasting amazing.": "WRONG! 'Amazing' describes the pizza's flavour — that's stative. Use 'tastes': 'This pizza tastes amazing.'",
                "This pizza tastes amazing.": "Correct. 'Tastes' (= has a flavour) is stative → Present Simple.",
                "He is tasting the soup to check the salt.": "Correct. 'Is tasting' (= trying/sampling) is dynamic → Present Continuous.",
                "Can you taste the garlic in this dish?": "Correct. Asking about sensory perception — stative meaning is fine in question form.",
            },
        },
    },

    {
        id: "sdv-mc-6",
        topic: "stative-dynamic-verbs",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the sentence where 'think' expresses an ACTIVE thought process:",
        grammarRule: "Stative vs Dynamic 'Think'",
        explanation: "'Think' = believe/have an opinion → stative → Simple. 'Think' = actively consider → dynamic → Continuous.",
        tip: "I think it's wrong (= I believe). I'm thinking about it (= I'm considering/processing).",
        multipleChoice: {
            question: "Which sentence uses 'think' as an active process (not just an opinion)?",
            correctOption: "I'm thinking about your proposal right now.",
            options: [
                "I'm thinking about your proposal right now.",
                "I think she's telling the truth.",
                "He thinks the meeting was a waste of time.",
                "Do you think it will snow tomorrow?",
            ],
            optionExplanations: {
                "I'm thinking about your proposal right now.": "Correct! 'Am thinking' = actively considering/processing → dynamic use of 'think'.",
                "I think she's telling the truth.": "Wrong. 'I think' = I believe/have an opinion → stative use.",
                "He thinks the meeting was a waste of time.": "Wrong. 'Thinks' = he has an opinion → stative use.",
                "Do you think it will snow tomorrow?": "Wrong. 'Do you think' = do you believe → stative use.",
            },
        },
    },

    {
        id: "sdv-mc-7",
        topic: "stative-dynamic-verbs",
        type: "multiple-choice",
        difficulty: "advanced",
        sentence: "Choose the sentence where 'look' is used as a STATIVE verb (= appears):",
        grammarRule: "Stative vs Dynamic 'Look'",
        explanation: "'Look' = appear/seem → stative → Simple. 'Look' = direct one's eyes at → dynamic → Continuous.",
        tip: "You look great (= you appear). She is looking at the photo (= she is examining it).",
        multipleChoice: {
            question: "In which sentence does 'look' mean 'appear' (stative)?",
            correctOption: "You look tired. Are you okay?",
            options: [
                "You look tired. Are you okay?",
                "She is looking at some old photographs.",
                "Why are you looking at me like that?",
                "He is looking for his glasses.",
            ],
            optionExplanations: {
                "You look tired. Are you okay?": "Correct! 'Look' = appear/seem → stative → Present Simple 'look'.",
                "She is looking at some old photographs.": "Wrong. 'Looking at' = examining/directing eyes → dynamic → Present Continuous is correct.",
                "Why are you looking at me like that?": "Wrong. 'Looking at me' = directing eyes at someone → dynamic → Continuous is correct.",
                "He is looking for his glasses.": "Wrong. 'Looking for' = searching → dynamic → Continuous is correct.",
            },
        },
    },

    // ===== WORD TRANSFORM QUESTIONS (6 questions) =====

    {
        id: "sdv-reorder-1",
        topic: "stative-dynamic-verbs",
        type: "word-transform",
        difficulty: "beginner",
        sentence: "She ___ the answer to every question.",
        grammarRule: "Stative Verb 'Know' — Present Simple",
        explanation: "'Know' is stative — it expresses a state of mind (having knowledge). Use Present Simple with -s for third person singular.",
        tip: "Know is always stative: she knows, he knows, I know — never 'is knowing'.",
        wordTransform: {
            baseWord: "know",
            correctAnswer: "knows",
        },
    },

    {
        id: "sdv-reorder-2",
        topic: "stative-dynamic-verbs",
        type: "word-transform",
        difficulty: "beginner",
        sentence: "This coat ___ to my sister.",
        grammarRule: "Stative Verb 'Belong' — Ownership",
        explanation: "'Belong' is always stative (ownership). Use Present Simple — add -s for third person singular.",
        tip: "Belong, own, possess — always stative: the house belongs to them, it owns nothing.",
        wordTransform: {
            baseWord: "belong",
            correctAnswer: "belongs",
        },
    },

    {
        id: "sdv-reorder-3",
        topic: "stative-dynamic-verbs",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "He ___ three cars and a motorbike.",
        grammarRule: "Stative Verb 'Have' — Possession",
        explanation: "'Have' = possess/own is stative. Use Present Simple 'has' for third person singular — never 'is having'.",
        tip: "He has a car (= he owns it) → stative. Compare: He is having lunch (= experiencing an activity) → dynamic.",
        wordTransform: {
            baseWord: "have",
            correctAnswer: "has",
        },
    },

    {
        id: "sdv-reorder-4",
        topic: "stative-dynamic-verbs",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "They ___ a very important meeting right now.",
        grammarRule: "Dynamic Verb 'Have' — Activity / Experience",
        explanation: "'Have' = participate in an activity or experience is dynamic. Use Present Continuous 'are having'.",
        tip: "They are having a meeting / a great time / lunch → dynamic 'have' → always use Present Continuous.",
        wordTransform: {
            baseWord: "have",
            correctAnswer: "are having",
        },
    },

    {
        id: "sdv-reorder-5",
        topic: "stative-dynamic-verbs",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "She ___ about moving to a new city.",
        grammarRule: "Dynamic Verb 'Think' — Considering",
        explanation: "'Think' = actively consider or reflect is dynamic. Use Present Continuous 'is thinking'.",
        tip: "She is thinking about it (= considering). She thinks it's true (= believes). The context tells you which!",
        wordTransform: {
            baseWord: "think",
            correctAnswer: "is thinking",
        },
    },

    {
        id: "sdv-reorder-6",
        topic: "stative-dynamic-verbs",
        type: "word-transform",
        difficulty: "advanced",
        sentence: "Stop it! You ___ very selfish right now.",
        grammarRule: "Dynamic Verb 'Be' — Temporary Behaviour",
        explanation: "'Be' + adjective in continuous form describes temporary behaviour — how someone is acting right now. It's different from their usual character.",
        tip: "You are selfish (permanent quality). You are being selfish (= acting selfishly right now — temporary).",
        wordTransform: {
            baseWord: "be",
            correctAnswer: "are being",
        },
    },
];

export const stativeDynamicVerbsTopic: GrammarTopic = {
    id: "stative-dynamic-verbs",
    level: "B1",
    name: "Stative vs Dynamic Verbs",
    description: "Learn the difference between stative verbs (think, know, have, see, taste, smell, belong) and their dynamic forms. Understand how the same verb can have different meanings — and different grammar — depending on context.",
    lesson: "Lesson 4",
    icon: "🧠",
    cards: [
        {
            id: "sdv-card-1",
            rule: "know, believe, understand: no continuous",
            example: "My brother ___ (understand) Italian, but he can't speak it.",
            answer: "understands",
            explanation: "Stative verbs describe states, not actions: know, believe, understand, remember, want, love. We use them in the present simple, not the continuous. We say I know, never I am knowing.",
            examples: ["I don't remember his name, but I recognise his face.", "These shoes cost a lot, but I really love them."],
            ua: "Це стани, а не дії: «я знаю» — I know. Форми I am knowing не існує.",
        },
        {
            id: "sdv-card-2",
            rule: "belong, own, resemble: no continuous",
            example: "My aunt ___ (own) a small bakery in Lviv.",
            answer: "owns",
            explanation: "Belong, own and resemble describe ownership and appearance. They are stative, so we use the present simple. We say it belongs to me, not it is belonging to me.",
            examples: ["That red car belongs to our neighbours.", "My sister resembles our mother, especially her smile."],
            ua: "own, belong, resemble — стани: Present Simple. «Ця сумка належить Марії» — belongs, не is belonging.",
        },
        {
            id: "sdv-card-3",
            rule: "have = own (stative)",
            example: "Do your grandparents ___ (have) a house by the sea?",
            answer: "have",
            explanation: "When have means own or possess, it is stative. We use the present simple: I have, she has. We do not say I am having a house.",
            examples: ["Our office has three meeting rooms.", "Do you have a car?"],
            ua: "have у значенні «мати, володіти» — стан: She has a car. Не is having a car.",
        },
        {
            id: "sdv-card-4",
            rule: "have = experience (is having)",
            example: "Can I call you back later? I ___ (have) a shower.",
            answer: "am having",
            explanation: "When have means do or experience something, such as a meal, a shower or a party, it is a dynamic verb. We can use the continuous form: I'm having, she is having.",
            examples: ["She is having a coffee break at the moment.", "They are having a party on Saturday night."],
            ua: "have + дія (обід, душ, вечірка) — це дія, тому is having: I'm having lunch.",
        },
        {
            id: "sdv-card-5",
            rule: "think = opinion (simple)",
            example: "Most of my friends ___ (think) this restaurant is too expensive.",
            answer: "think",
            explanation: "When think means believe or have an opinion, it is stative. We use the present simple: I think, she thinks. We do not say I am thinking it is expensive.",
            examples: ["Do you think it will rain tomorrow?", "My boss thinks we need a new system."],
            ua: "think = «вважати, гадати» — стан: I think it's good. Не I'm thinking it's good.",
        },
        {
            id: "sdv-card-6",
            rule: "think = consider (is thinking)",
            example: "Don't disturb Tom. He ___ (think) hard about a difficult problem.",
            answer: "is thinking",
            explanation: "When think means consider or use your mind for a while, it is an action. We can use the continuous: I'm thinking about it. Usually it is followed by about or of.",
            examples: ["I'm thinking of taking a short break from work.", "What are you thinking about at the moment?"],
            ua: "think = «обмірковувати» — дія: I'm thinking about it («я це обмірковую»).",
        },
        {
            id: "sdv-card-7",
            rule: "see: understand (simple) vs meet (continuous)",
            example: "Oh, I ___ (see) what you mean. Thanks for explaining!",
            answer: "see",
            explanation: "See means understand or notice with your eyes, and then it is stative: I see, can you see? When see means meet by arrangement, it is an action: I'm seeing my accountant on Thursday.",
            examples: ["Can you see the mountains from your window?", "I'm seeing my accountant on Thursday morning."],
            ua: "see = «розуміти, бачити» — стан: I see. see = «зустрічатися» — дія: I'm seeing a friend.",
        },
        {
            id: "sdv-card-8",
            rule: "be vs being",
            example: "Mark is usually very calm, but today he ___ (be) really impatient with us.",
            answer: "is being",
            explanation: "Be + adjective describes a permanent quality: she is kind. Being + adjective describes behaviour at one moment, often unusual: she is being kind today.",
            examples: ["Our teacher is very generous.", "Why are you being so quiet today? Is something wrong?"],
            ua: "is being + прикметник — поведінка саме зараз: He is being rude («він поводиться грубо»).",
        },
        {
            id: "sdv-card-9",
            rule: "look, taste, smell, sound: simple",
            example: "This soup ___ (smell) delicious. What did you put in it?",
            answer: "smells",
            explanation: "Look, taste, smell and sound describe an impression, so they are stative: it smells good. When we do the action on purpose, they are dynamic: the chef is tasting the sauce.",
            examples: ["That dress looks beautiful on you.", "The chef is tasting the sauce before serving it."],
            ua: "taste/smell/look/sound описують враження: «Суп смачно пахне» — smells, не is smelling.",
        },
    ],
    rules: stativeDynamicVerbs,
};

export default stativeDynamicVerbs;
