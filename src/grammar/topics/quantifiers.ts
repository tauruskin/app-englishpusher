/**
 * EnglishPusher Grammar Testing - Quantifiers
 * A2+ Level (Speakout) - Lesson 5B
 *
 * 6 gap-fill, 6 error-spot, 7 multiple-choice, 6 word-transform = 25 questions
 * VERIFIED: All error-spot indexes checked against split(" ") positions.
 */

import type { GrammarQuestion, GrammarTopic } from "../types.ts";

export const quantifiersQuestions: GrammarQuestion[] = [

    // ===== GAP FILL QUESTIONS (6 questions) =====

    {
        id: "qty-gap-1",
        topic: "quantifiers",
        type: "gap-fill",
        difficulty: "beginner",
        sentence: "Would you like ___ tea?",
        grammarRule: "Some in Offers and Requests",
        explanation: "We often use 'some' instead of 'any' in questions that are offers or polite requests: 'Would you like some tea?'",
        tip: "Offers and requests use 'some': Would you like some water? Could I have some help?",
        gapFill: {
            gapIndex: 3,
            correctAnswer: "some",
            options: ["some", "any", "no", "many"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "qty-gap-2",
        topic: "quantifiers",
        type: "gap-fill",
        difficulty: "beginner",
        sentence: "Do you have ___ brothers or sisters?",
        grammarRule: "Any in Ordinary Questions",
        explanation: "In most ordinary questions we use 'any', not 'some', to ask whether something exists.",
        tip: "Ordinary questions use 'any': Do you have any pets? Is there any milk?",
        gapFill: {
            gapIndex: 3,
            correctAnswer: "any",
            options: ["any", "some", "no", "much"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "qty-gap-3",
        topic: "quantifiers",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "There's ___ milk left in the fridge — we need to buy more.",
        grammarRule: "No = Not Any (Positive Verb)",
        explanation: "'No' + noun means 'not any'. It goes with a positive verb, not a negative one: 'There's no milk', NOT 'There isn't no milk'.",
        tip: "no + positive verb = not any: There's no milk = There isn't any milk.",
        gapFill: {
            gapIndex: 1,
            correctAnswer: "no",
            options: ["no", "not", "any", "some"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "qty-gap-4",
        topic: "quantifiers",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "How ___ time do we have before the train leaves?",
        grammarRule: "Much With Uncountable Nouns",
        explanation: "'Time' is uncountable, so we ask about it with 'much': 'How much time...?'",
        tip: "How much + uncountable: how much time, how much money, how much water.",
        gapFill: {
            gapIndex: 1,
            correctAnswer: "much",
            options: ["much", "many", "a lot", "no"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "qty-gap-5",
        topic: "quantifiers",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "There aren't ___ seats left — only five or six.",
        grammarRule: "Many With Countable Nouns",
        explanation: "'Seats' is countable, so we use 'many' to talk about the amount: 'There aren't many seats left.'",
        tip: "many + countable plural: many seats, many people, many days.",
        gapFill: {
            gapIndex: 2,
            correctAnswer: "many",
            options: ["many", "much", "no", "any"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "qty-gap-6",
        topic: "quantifiers",
        type: "gap-fill",
        difficulty: "advanced",
        sentence: "I can't concentrate — there are ___ distractions in this office.",
        grammarRule: "Too Many With Countable Nouns",
        explanation: "'Distractions' is countable, and there's a problem (can't concentrate), so we use 'too many': 'too many distractions'.",
        tip: "too many + countable (problem): too many distractions, too many emails, too many mistakes.",
        gapFill: {
            gapIndex: 6,
            correctAnswer: "too many",
            options: ["too many", "too much", "a lot", "enough"],
            correctOptionIndex: 0,
        },
    },

    // ===== ERROR SPOT QUESTIONS (6 questions) =====
    // RULE: Every error is exactly ONE word. Replacing wrongWord with correction
    // must produce a 100% grammatically correct sentence with no leftover errors.

    // split(" ") → [0=I, 1=don't, 2=have, 3=no, 4=time, 5=to, 6=explain, 7=this, 8=now.]
    // words[3]="no" ✅  corrected: "I don't have any time to explain this now." ✅
    {
        id: "qty-error-1",
        topic: "quantifiers",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "I don't have no time to explain this now.",
        grammarRule: "No Double Negatives — Any After a Negative Verb",
        explanation: "English doesn't use double negatives. After a negative verb ('don't have'), use 'any', not 'no'.",
        errorSpot: {
            errorWordIndex: 3,
            wrongWord: "no",
            correction: "any",
            reason: "After a negative verb, use 'any': 'I don't have any time to explain this now.'",
            correctionOptions: ["any", "no", "some", "much"],
        },
    },

    // split(" ") → [0=There, 1=are, 2=no, 3=information, 4=about, 5=the, 6=flight.]
    // words[1]="are" ✅  corrected: "There is no information about the flight." ✅
    {
        id: "qty-error-2",
        topic: "quantifiers",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "There are no information about the flight.",
        grammarRule: "Singular Verb With Uncountable Nouns",
        explanation: "'Information' is uncountable, so it always takes a singular verb, even with 'no': 'There is no information.'",
        errorSpot: {
            errorWordIndex: 1,
            wrongWord: "are",
            correction: "is",
            reason: "Uncountable nouns take a singular verb: 'There is no information about the flight.'",
            correctionOptions: ["is", "are", "was", "have"],
        },
    },

    // split(" ") → [0=I, 1=don't, 2=have, 3=much, 4=friends, 5=in, 6=this, 7=city.]
    // words[3]="much" ✅  corrected: "I don't have many friends in this city." ✅
    {
        id: "qty-error-3",
        topic: "quantifiers",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "I don't have much friends in this city.",
        grammarRule: "Many With Countable Nouns",
        explanation: "'Friends' is countable, so use 'many', not 'much'. 'Much' is only for uncountable nouns.",
        errorSpot: {
            errorWordIndex: 3,
            wrongWord: "much",
            correction: "many",
            reason: "'Friends' is countable, so the correct quantifier is 'many': 'I don't have many friends in this city.'",
            correctionOptions: ["many", "much", "a lot", "no"],
        },
    },

    // split(" ") → [0=I, 1=don't, 2=have, 3=lot, 4=of, 5=money, 6=saved, 7=for, 8=the, 9=trip.]
    // words[3]="lot" ✅  corrected: "I don't have a lot of money saved for the trip." ✅
    {
        id: "qty-error-4",
        topic: "quantifiers",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "I don't have lot of money saved for the trip.",
        grammarRule: "A Lot Of — Needs 'A' Before 'Lot'",
        explanation: "'Lot of' isn't a phrase on its own. It must be 'a lot of' (with 'a') or 'lots of' (without 'a').",
        errorSpot: {
            errorWordIndex: 3,
            wrongWord: "lot",
            correction: "a lot",
            reason: "Add 'a' before 'lot': 'I don't have a lot of money saved for the trip.'",
            correctionOptions: ["a lot", "lot", "many", "much"],
        },
    },

    // split(" ") → [0=There, 1=are, 2=too, 3=much, 4=people, 5=at, 6=this, 7=party.]
    // words[3]="much" ✅  corrected: "There are too many people at this party." ✅
    {
        id: "qty-error-5",
        topic: "quantifiers",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "There are too much people at this party.",
        grammarRule: "Too Many With Countable Nouns",
        explanation: "'People' is countable, so we use 'too many', not 'too much', to describe a problem amount.",
        errorSpot: {
            errorWordIndex: 3,
            wrongWord: "much",
            correction: "many",
            reason: "'People' is countable, so use 'too many': 'There are too many people at this party.'",
            correctionOptions: ["many", "much", "a lot", "no"],
        },
    },

    // split(" ") → [0=I, 1=need, 2=a, 3=little, 4=advices, 5=before, 6=the, 7=interview.]
    // words[4]="advices" ✅  corrected: "I need a little advice before the interview." ✅
    {
        id: "qty-error-6",
        topic: "quantifiers",
        type: "error-spot",
        difficulty: "advanced",
        sentence: "I need a little advices before the interview.",
        grammarRule: "Advice Is Uncountable — No Plural Form",
        explanation: "'Advice' is an uncountable noun — it has no plural form. Use 'some advice' or 'a little advice', never 'advices'.",
        errorSpot: {
            errorWordIndex: 4,
            wrongWord: "advices",
            correction: "advice",
            reason: "'Advice' has no plural form: 'I need a little advice before the interview.'",
            correctionOptions: ["advice", "advices", "advice's", "a advice"],
        },
    },

    // ===== MULTIPLE CHOICE QUESTIONS (7 questions) =====

    {
        id: "qty-mc-1",
        topic: "quantifiers",
        type: "multiple-choice",
        difficulty: "beginner",
        sentence: "Choose the sentence that makes a polite offer using 'some'.",
        grammarRule: "Some in Offers and Requests",
        explanation: "We can use 'some' in questions that are offers, even though 'any' is usual in most other questions.",
        tip: "Offers use 'some': Would you like some coffee?",
        multipleChoice: {
            question: "Which sentence is a polite offer?",
            correctOption: "Would you like some coffee?",
            options: [
                "Would you like some coffee?",
                "Would you like any coffee?",
                "Have you got no coffee?",
                "Do you have many coffee?",
            ],
            optionExplanations: {
                "Would you like some coffee?": "Correct! 'Some' is natural in offers, even though it's a question.",
                "Would you like any coffee?": "Wrong. 'Any' sounds unnatural in a friendly offer — use 'some' instead.",
                "Have you got no coffee?": "Wrong. This asks if coffee is missing, not an offer.",
                "Do you have many coffee?": "Wrong. 'Coffee' is uncountable here, and 'many' needs a countable noun — plus this isn't an offer.",
            },
        },
    },

    {
        id: "qty-mc-2",
        topic: "quantifiers",
        type: "multiple-choice",
        difficulty: "beginner",
        sentence: "Choose the sentence that correctly uses a quantifier with an uncountable noun.",
        grammarRule: "Much With Uncountable Nouns",
        explanation: "'Time' is uncountable, so we use 'much', not 'many', especially in negatives and questions.",
        tip: "much + uncountable: much time, much money, much water.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "I don't have much time today.",
            options: [
                "I don't have much time today.",
                "I don't have many time today.",
                "I don't have a lot time today.",
                "I don't have few time today.",
            ],
            optionExplanations: {
                "I don't have much time today.": "Correct! 'Time' is uncountable, so 'much' is right.",
                "I don't have many time today.": "Wrong. 'Many' is only for countable nouns — 'time' is uncountable.",
                "I don't have a lot time today.": "Wrong. It must be 'a lot OF time', with 'of'.",
                "I don't have few time today.": "Wrong. 'Few' is used with countable nouns, not uncountable ones like 'time'.",
            },
        },
    },

    {
        id: "qty-mc-3",
        topic: "quantifiers",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the sentence that correctly uses a quantifier with a countable noun.",
        grammarRule: "Many With Countable Nouns",
        explanation: "'Apples' is countable and plural, so we ask 'how many', not 'how much'.",
        tip: "How many + countable plural: how many apples, how many people.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "How many apples do we need?",
            options: [
                "How many apples do we need?",
                "How much apples do we need?",
                "How many apple do we need?",
                "How much of apples do we need?",
            ],
            optionExplanations: {
                "How many apples do we need?": "Correct! 'Apples' is countable and plural, so 'many' is right.",
                "How much apples do we need?": "Wrong. 'Much' is for uncountable nouns — 'apples' is countable.",
                "How many apple do we need?": "Wrong. After 'many', a countable noun must be plural: 'apples', not 'apple'.",
                "How much of apples do we need?": "Wrong. 'Much of' isn't used like this before a plural countable noun.",
            },
        },
    },

    {
        id: "qty-mc-4",
        topic: "quantifiers",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the sentence that correctly describes a problem amount.",
        grammarRule: "Too Much With Uncountable Nouns",
        explanation: "'Traffic' is uncountable, so a problem amount of it is 'too much traffic'.",
        tip: "too much + uncountable (problem): too much traffic, too much noise, too much work.",
        multipleChoice: {
            question: "Which sentence describes a problem correctly?",
            correctOption: "There's too much traffic this morning.",
            options: [
                "There's too much traffic this morning.",
                "There's too many traffic this morning.",
                "There are too much traffic this morning.",
                "There's too much traffics this morning.",
            ],
            optionExplanations: {
                "There's too much traffic this morning.": "Correct! 'Traffic' is uncountable, so 'too much' and the singular verb 'There's' are both right.",
                "There's too many traffic this morning.": "Wrong. 'Traffic' is uncountable, so it needs 'too much', not 'too many'.",
                "There are too much traffic this morning.": "Wrong. 'Traffic' is uncountable and singular, so it needs 'There's', not 'There are'.",
                "There's too much traffics this morning.": "Wrong. 'Traffic' is uncountable — it has no plural form 'traffics'.",
            },
        },
    },

    {
        id: "qty-mc-5",
        topic: "quantifiers",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the sentence that correctly uses 'enough'.",
        grammarRule: "Enough Before a Noun",
        explanation: "'Enough' meaning 'the right amount' goes directly before the noun it describes: 'enough chairs'.",
        tip: "enough + noun = the right amount: enough chairs, enough time, enough money.",
        multipleChoice: {
            question: "Which sentence uses 'enough' correctly?",
            correctOption: "We don't have enough chairs for everyone.",
            options: [
                "We don't have enough chairs for everyone.",
                "We don't have chairs enough for everyone.",
                "We don't have much enough chairs for everyone.",
                "We don't have a enough chairs for everyone.",
            ],
            optionExplanations: {
                "We don't have enough chairs for everyone.": "Correct! 'Enough' goes directly before the noun 'chairs'.",
                "We don't have chairs enough for everyone.": "Wrong. Before a noun, 'enough' must come before it, not after: 'enough chairs'.",
                "We don't have much enough chairs for everyone.": "Wrong. We don't combine 'much' and 'enough' together like this.",
                "We don't have a enough chairs for everyone.": "Wrong. 'Enough' never takes 'a' in front of it.",
            },
        },
    },

    {
        id: "qty-mc-6",
        topic: "quantifiers",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the sentence that correctly uses 'a little'.",
        grammarRule: "A Little With Uncountable Nouns",
        explanation: "'A little' (a small amount) is used with uncountable nouns like 'help'. For plural countable nouns, we use 'a few' instead.",
        tip: "a little + uncountable: a little help, a little time. a few + countable plural: a few people.",
        multipleChoice: {
            question: "Which sentence uses 'a little' correctly?",
            correctOption: "I need a little help with this form.",
            options: [
                "I need a little help with this form.",
                "I need a little helps with this form.",
                "I need a little people to help me.",
                "I need a little forms filled in.",
            ],
            optionExplanations: {
                "I need a little help with this form.": "Correct! 'Help' is uncountable, so 'a little' is right.",
                "I need a little helps with this form.": "Wrong. 'Help' is uncountable and has no plural form 'helps'.",
                "I need a little people to help me.": "Wrong. 'People' is countable and plural — use 'a few people', not 'a little people'.",
                "I need a little forms filled in.": "Wrong. 'Forms' is countable and plural — 'a little' doesn't combine with plural countable nouns.",
            },
        },
    },

    {
        id: "qty-mc-7",
        topic: "quantifiers",
        type: "multiple-choice",
        difficulty: "advanced",
        sentence: "Choose the sentence that correctly talks about something in general.",
        grammarRule: "No Quantifier for General Statements",
        explanation: "When we speak about something in general, we use no article and no quantifier before the uncountable or plural noun.",
        tip: "General statements: no article, no quantifier — Fashion isn't important to me. People are interesting.",
        multipleChoice: {
            question: "Which sentence correctly talks about something in general?",
            correctOption: "Fashion isn't very important to me.",
            options: [
                "Fashion isn't very important to me.",
                "The fashion isn't very important to me.",
                "Some fashion isn't very important to me.",
                "A fashion isn't very important to me.",
            ],
            optionExplanations: {
                "Fashion isn't very important to me.": "Correct! Speaking about fashion in general needs no article and no quantifier.",
                "The fashion isn't very important to me.": "Wrong. 'The' makes it sound like one specific, already-mentioned fashion, not fashion in general.",
                "Some fashion isn't very important to me.": "Wrong. 'Some' suggests a specific, unspecified amount of fashion, not the general idea.",
                "A fashion isn't very important to me.": "Wrong. 'Fashion' is uncountable here, so it can't take 'a'.",
            },
        },
    },

    // ===== WORD TRANSFORM QUESTIONS (6 questions) =====

    {
        id: "qty-wt-1",
        topic: "quantifiers",
        type: "word-transform",
        difficulty: "beginner",
        sentence: "Could you give me ___ advice about buying a car?",
        grammarRule: "Some in Polite Requests",
        explanation: "Even in a question, 'some' is used here because it's a polite request, not an ordinary question.",
        tip: "Requests use 'some': Could I have some water? Could you give me some advice?",
        wordTransform: {
            baseWord: "some/any",
            correctAnswer: "some",
        },
    },

    {
        id: "qty-wt-2",
        topic: "quantifiers",
        type: "word-transform",
        difficulty: "beginner",
        sentence: "There's ___ parking near the office, so we should take the bus.",
        grammarRule: "No = Not Any (Positive Verb)",
        explanation: "'No' goes with a positive verb and means the same as 'not any'. We don't combine 'no' with a negative verb.",
        tip: "no + positive verb = not any: There's no parking = There isn't any parking.",
        wordTransform: {
            baseWord: "no/not",
            correctAnswer: "no",
        },
    },

    {
        id: "qty-wt-3",
        topic: "quantifiers",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "We didn't make ___ mistakes in the test.",
        grammarRule: "Many With Countable Nouns",
        explanation: "'Mistakes' is countable (plural), so we use 'many', not 'much'.",
        tip: "many + countable plural: many mistakes, many friends, many days.",
        wordTransform: {
            baseWord: "much/many",
            correctAnswer: "many",
        },
    },

    {
        id: "qty-wt-4",
        topic: "quantifiers",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "She's stressed because she has ___ work this month.",
        grammarRule: "Too Much With Uncountable Nouns",
        explanation: "'Work' is uncountable, so we use 'too much' to mean more than is comfortable or necessary.",
        tip: "too much + uncountable: too much work, too much stress, too much noise.",
        wordTransform: {
            baseWord: "too much/too many",
            correctAnswer: "too much",
        },
    },

    {
        id: "qty-wt-5",
        topic: "quantifiers",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "Can I have ___ sugar in my coffee, please?",
        grammarRule: "A Little With Uncountable Nouns",
        explanation: "'A little' (or 'a bit of') shows a small amount of an uncountable noun like 'sugar'.",
        tip: "a little / a bit of + uncountable: a little sugar, a bit of time.",
        wordTransform: {
            baseWord: "a bit of/a little",
            correctAnswer: "a little",
        },
    },

    {
        id: "qty-wt-6",
        topic: "quantifiers",
        type: "word-transform",
        difficulty: "advanced",
        sentence: "I only had $20, so I didn't have ___ money to buy the tickets.",
        grammarRule: "Enough — The Right Amount Needed",
        explanation: "'Enough' means the amount needed for a particular purpose — here, buying the tickets.",
        tip: "enough + noun = the right amount for a purpose: enough money, enough time, enough space.",
        wordTransform: {
            baseWord: "enough/much",
            correctAnswer: "enough",
        },
    },
];

export const quantifiersTopic: GrammarTopic = {
    id: "quantifiers",
    level: "A2+",
    name: "Quantifiers",
    description: "Practise some, any, no, much, many, a lot of, too much/too many, enough and a little — the words we use to talk about amounts of countable and uncountable nouns.",
    lesson: "Lesson 5B",
    icon: "🧮",
    cards: [
        {
            id: "qty-card-1",
            rule: "some in positive sentences, offers and requests",
            example: "There's ___ cake left in the kitchen — help yourself!",
            answer: "some",
            explanation: "We use 'some' in positive sentences when we don't say the exact amount. It also sounds natural in offers and requests, even though they're questions.",
            examples: ["I bought some bread and some cheese at the shop.", "Could I have some water, please?"],
            ua: "some = «трохи, якась кількість» (не точна): There's some cake — «Є трохи торта». Також у пропозиціях: Would you like some tea? — «Хочеш чаю?»",
        },
        {
            id: "qty-card-2",
            rule: "any in questions and negatives",
            example: "I don't have ___ cash on me right now.",
            answer: "any",
            explanation: "We use 'any' in negative sentences to say something doesn't exist, and in most questions to ask if it exists.",
            examples: ["Is there any sugar in the cupboard?", "We didn't see any dolphins on the boat trip."],
            ua: "any вживаємо в питаннях і заперечних реченнях: Do you have any cash? — «У тебе є готівка?» I don't have any cash — «У мене немає готівки».",
        },
        {
            id: "qty-card-3",
            rule: "no = not any (with a positive verb)",
            example: "There's ___ sugar in the jar — it's completely empty.",
            answer: "no",
            explanation: "'No' + noun means the same as 'not any', but it goes with a positive verb, not a negative one.",
            examples: ["There's no bread left — we ate it all.", "He has no free time this week."],
            ua: "no = «ніякий, зовсім немає», але дієслово ставимо у стверджувальній формі: There's no sugar = There isn't any sugar.",
        },
        {
            id: "qty-card-4",
            rule: "a lot of / lots of — a large amount",
            example: "She's got ___ (a lot of / lots of) experience in this job.",
            answer: "a lot of",
            explanation: "'A lot of' and 'lots of' both mean a large amount. They work with countable and uncountable nouns, in positive, negative and question sentences.",
            examples: ["We spent a lot of money on the trip.", "There are lots of good restaurants in this area."],
            ua: "a lot of / lots of = «багато» (велика кількість), підходять і до злічуваних, і до незлічуваних іменників: a lot of money, a lot of people.",
        },
        {
            id: "qty-card-5",
            rule: "much with uncountable nouns, many with countable nouns",
            example: "How ___ (much / many) luggage have you got?",
            answer: "much",
            explanation: "'Much' goes with uncountable nouns (like 'luggage'), and 'many' goes with countable plural nouns (like 'bags'). Both are common in questions and negatives.",
            examples: ["I haven't got much money left.", "There aren't many buses after 10 p.m."],
            ua: "much — з незлічуваними (much luggage), many — зі злічуваними у множині (many bags). Частіше в питаннях і запереченнях.",
        },
        {
            id: "qty-card-6",
            rule: "too much / too many — more than necessary (a problem)",
            example: "There was ___ (too much / too many) noise at the concert — I couldn't hear anything.",
            answer: "too much",
            explanation: "'Too much' (uncountable) and 'too many' (countable) show that an amount is a problem — more than is good or necessary.",
            examples: ["I ate too much cake and now I feel sick.", "There were too many people in the small room."],
            ua: "too much (незлічувані) / too many (злічувані) = «забагато», коли кількість — проблема: too much noise, too many people.",
        },
        {
            id: "qty-card-7",
            rule: "enough — the right amount, before the noun",
            example: "We haven't got ___ chairs for all the guests.",
            answer: "enough",
            explanation: "'Enough' means the right or necessary amount. Before a noun, it goes directly in front of it: 'enough chairs'.",
            examples: ["Have we got enough food for the party?", "There isn't enough time to finish today."],
            ua: "enough = «достатньо», ставимо прямо перед іменником: enough chairs — «достатньо стільців».",
        },
        {
            id: "qty-card-8",
            rule: "a bit of / a little — a small amount",
            example: "I only need ___ (a bit of / a little) help with my homework.",
            answer: "a little",
            explanation: "'A bit of' and 'a little' both mean a small amount. They are used with uncountable nouns, like 'help', 'time' or 'money'.",
            examples: ["Could you give me a little more time?", "There's a bit of milk left in the bottle."],
            ua: "a bit of / a little = «трохи» (невелика кількість), тільки з незлічуваними іменниками: a little time, a bit of milk.",
        },
    ],
    rules: quantifiersQuestions,
};

export default quantifiersQuestions;
