/**
 * EnglishPusher Grammar Testing - Expressing Amounts (Quantifiers)
 * B1 Level (Speakout 3rd ed.) - Unit 7B
 *
 * 6 gap-fill, 6 error-spot, 7 multiple-choice, 6 word-transform = 25 questions
 * VERIFIED: All error-spot indexes checked against split(" ") positions.
 */

import type { GrammarQuestion, GrammarTopic } from "../types.ts";

export const expressingAmountsQuestions: GrammarQuestion[] = [

    // ===== GAP FILL QUESTIONS (6 questions) =====

    {
        id: "amt-gap-1",
        topic: "expressing-amounts",
        type: "gap-fill",
        difficulty: "beginner",
        sentence: "I don't need much — just give me ___ information about the hotel before I book it.",
        grammarRule: "A Bit Of / A Little With Uncountable Nouns",
        explanation: "'A bit of' (like 'a little') means a small amount. It's used with uncountable nouns, such as 'information'.",
        tip: "a bit of / a little + uncountable: a bit of information, a little time, a little money.",
        gapFill: {
            gapIndex: 8,
            correctAnswer: "a bit of",
            options: ["a bit of", "a few", "many", "plenty of"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "amt-gap-2",
        topic: "expressing-amounts",
        type: "gap-fill",
        difficulty: "beginner",
        sentence: "We checked the fridge, but there was ___ food left — just one egg.",
        grammarRule: "Hardly Any — a Very Small Amount",
        explanation: "'Hardly any' means almost none — a very small amount. It can be used with both countable and uncountable nouns.",
        tip: "hardly any = almost none: hardly any food, hardly any people.",
        gapFill: {
            gapIndex: 7,
            correctAnswer: "hardly any",
            options: ["hardly any", "plenty of", "too much", "many"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "amt-gap-3",
        topic: "expressing-amounts",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "Do you spend ___ time travelling for work?",
        grammarRule: "A Lot Of — Used in Positive, Negative and Question Forms",
        explanation: "'A lot of' can be used in positive, negative and question sentences. 'Plenty of' is mostly used in positive statements only.",
        tip: "a lot of works everywhere: positive, negative, questions. plenty of is mostly for positive statements.",
        gapFill: {
            gapIndex: 3,
            correctAnswer: "a lot of",
            options: ["a lot of", "many", "plenty of", "too many"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "amt-gap-4",
        topic: "expressing-amounts",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "This box isn't light ___ to carry up the stairs on my own.",
        grammarRule: "Enough After an Adjective",
        explanation: "'Enough' meaning 'the right amount' goes directly after an adjective: 'light enough', 'big enough'.",
        tip: "adjective + enough: light enough, old enough, warm enough.",
        gapFill: {
            gapIndex: 4,
            correctAnswer: "enough",
            options: ["enough", "too", "plenty of", "much"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "amt-gap-5",
        topic: "expressing-amounts",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "There's ___ traffic on the motorway this morning, so we'll probably be late.",
        grammarRule: "Too Much With Uncountable Nouns (a Problem)",
        explanation: "'Traffic' is uncountable, so an excessive amount of it is 'too much traffic', not 'too many traffic'.",
        tip: "too much + uncountable (problem): too much traffic, too much noise.",
        gapFill: {
            gapIndex: 1,
            correctAnswer: "too much",
            options: ["too much", "too many", "much", "many"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "amt-gap-6",
        topic: "expressing-amounts",
        type: "gap-fill",
        difficulty: "advanced",
        sentence: "Don't worry about snacks for the trip — we've already got ___ biscuits and fruit for everyone.",
        grammarRule: "Plenty Of — a Large Amount, No Problem",
        explanation: "'Plenty of' means a large amount — more than enough, with no problem. It's mainly used in positive statements.",
        tip: "plenty of = more than enough, no problem: plenty of biscuits, plenty of time.",
        gapFill: {
            gapIndex: 11,
            correctAnswer: "plenty of",
            options: ["plenty of", "too many", "hardly any", "a few"],
            correctOptionIndex: 0,
        },
    },

    // ===== ERROR SPOT QUESTIONS (6 questions) =====
    // RULE: Every error is exactly ONE word. Replacing wrongWord with correction
    // must produce a 100% grammatically correct sentence with no leftover errors.

    // split(" ") → [0=There's,1=a,2=few,3=milk,4=left,5=in,6=the,7=fridge,,8=so,9=we,10=need,11=to,12=buy,13=more.]
    // words[2]="few" ✅  corrected: "There's a little milk left in the fridge, so we need to buy more." ✅
    {
        id: "amt-error-1",
        topic: "expressing-amounts",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "There's a few milk left in the fridge, so we need to buy more.",
        grammarRule: "A Little With Uncountable Nouns (Not A Few)",
        explanation: "'Milk' is uncountable, so the correct quantifier is 'a little', not 'a few'. 'A few' only goes with countable nouns.",
        errorSpot: {
            errorWordIndex: 2,
            wrongWord: "few",
            correction: "little",
            reason: "'Milk' is uncountable, so use 'a little': 'There's a little milk left in the fridge.'",
            correctionOptions: ["little", "few", "many", "much"],
        },
    },

    // split(" ") → [0=I'd,1=like,2=a,3=little,4=biscuits,5=with,6=my,7=tea,,8=please.]
    // words[3]="little" ✅  corrected: "I'd like a few biscuits with my tea, please." ✅
    {
        id: "amt-error-2",
        topic: "expressing-amounts",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "I'd like a little biscuits with my tea, please.",
        grammarRule: "A Few With Countable Nouns (Not A Little)",
        explanation: "'Biscuits' is a countable plural noun, so the correct quantifier is 'a few', not 'a little'.",
        errorSpot: {
            errorWordIndex: 3,
            wrongWord: "little",
            correction: "few",
            reason: "'Biscuits' is countable, so use 'a few': 'I'd like a few biscuits with my tea.'",
            correctionOptions: ["few", "little", "much", "any"],
        },
    },

    // split(" ") → [0=There,1=are,2=hardly,3=some,4=people,5=in,6=the,7=waiting,8=room,9=today.]
    // words[3]="some" ✅  corrected: "There are hardly any people in the waiting room today." ✅
    {
        id: "amt-error-3",
        topic: "expressing-amounts",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "There are hardly some people in the waiting room today.",
        grammarRule: "Hardly Any — Fixed Phrase, Not Hardly Some",
        explanation: "'Hardly' combines with 'any', not 'some'. The fixed phrase is 'hardly any': 'There are hardly any people...'",
        errorSpot: {
            errorWordIndex: 3,
            wrongWord: "some",
            correction: "any",
            reason: "'Hardly' always pairs with 'any': 'There are hardly any people in the waiting room today.'",
            correctionOptions: ["any", "some", "many", "much"],
        },
    },

    // split(" ") → [0=There,1=are,2=too,3=much,4=tourists,5=in,6=this,7=city,8=every,9=summer.]
    // words[3]="much" ✅  corrected: "There are too many tourists in this city every summer." ✅
    {
        id: "amt-error-4",
        topic: "expressing-amounts",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "There are too much tourists in this city every summer.",
        grammarRule: "Too Many With Countable Nouns (Not Too Much)",
        explanation: "'Tourists' is countable, so the correct phrase is 'too many tourists', not 'too much tourists'.",
        errorSpot: {
            errorWordIndex: 3,
            wrongWord: "much",
            correction: "many",
            reason: "'Tourists' is countable, so use 'too many': 'There are too many tourists in this city every summer.'",
            correctionOptions: ["many", "much", "a lot", "plenty"],
        },
    },

    // split(" ") → [0=She,1=has,2=much,3=confidence,4=in,5=her,6=new,7=job.]
    // words[2]="much" ✅  corrected: "She has a lot of confidence in her new job." ✅
    {
        id: "amt-error-5",
        topic: "expressing-amounts",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "She has much confidence in her new job.",
        grammarRule: "Much Is Not Used in Positive Statements",
        explanation: "'Much' isn't usually used in positive statements. Use 'a lot of' or 'lots of' instead: 'She has a lot of confidence...'",
        errorSpot: {
            errorWordIndex: 2,
            wrongWord: "much",
            correction: "a lot of",
            reason: "Positive statements use 'a lot of', not 'much': 'She has a lot of confidence in her new job.'",
            correctionOptions: ["a lot of", "much", "many", "a few"],
        },
    },

    // split(" ") → [0=I,1=haven't,2=got,3=hardly,4=any,5=money,6=this,7=month.]
    // words[1]="haven't" ✅  corrected: "I have got hardly any money this month." ✅
    {
        id: "amt-error-6",
        topic: "expressing-amounts",
        type: "error-spot",
        difficulty: "advanced",
        sentence: "I haven't got hardly any money this month.",
        grammarRule: "Hardly Any Is Already Negative — No Double Negative",
        explanation: "'Hardly any' already has a negative meaning, so it goes with a positive verb: 'I have got hardly any money...', not 'haven't got'.",
        errorSpot: {
            errorWordIndex: 1,
            wrongWord: "haven't",
            correction: "have",
            reason: "Don't combine 'hardly any' with a negative verb: 'I have got hardly any money this month.'",
            correctionOptions: ["have", "haven't", "don't have", "hasn't"],
        },
    },

    // ===== MULTIPLE CHOICE QUESTIONS (7 questions) =====

    {
        id: "amt-mc-1",
        topic: "expressing-amounts",
        type: "multiple-choice",
        difficulty: "beginner",
        sentence: "Choose the sentence that correctly uses 'plenty of'.",
        grammarRule: "Plenty Of — Large Amount, Needs 'Of'",
        explanation: "'Plenty of' + uncountable noun means more than enough. It always needs 'of' before the noun, and never takes 'a' in front of it.",
        tip: "plenty of + noun: plenty of time, plenty of money — never 'a plenty of' or 'plenty' alone before a noun.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "We have plenty of time before the film starts.",
            options: [
                "We have plenty of time before the film starts.",
                "We have plenty time before the film starts.",
                "We have a plenty of time before the film starts.",
                "We have plenty of times before the film starts.",
            ],
            optionExplanations: {
                "We have plenty of time before the film starts.": "Correct! 'Plenty of' + uncountable noun 'time' means more than enough.",
                "We have plenty time before the film starts.": "Wrong. 'Plenty' needs 'of' before the noun: 'plenty of time'.",
                "We have a plenty of time before the film starts.": "Wrong. 'Plenty of' never takes 'a' in front of it.",
                "We have plenty of times before the film starts.": "Wrong. 'Time' (meaning duration) is uncountable here — it has no plural 'times' in this sense.",
            },
        },
    },

    {
        id: "amt-mc-2",
        topic: "expressing-amounts",
        type: "multiple-choice",
        difficulty: "beginner",
        sentence: "Choose the sentence that correctly uses 'a few' with a countable noun.",
        grammarRule: "A Few With Countable Plural Nouns",
        explanation: "'A few' means a small number. It only goes with plural countable nouns, like 'shirts'.",
        tip: "a few + countable plural: a few shirts, a few days, a few people.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "I packed a few shirts for the trip.",
            options: [
                "I packed a few shirts for the trip.",
                "I packed a few luggage for the trip.",
                "I packed a little shirts for the trip.",
                "I packed a few shirt for the trip.",
            ],
            optionExplanations: {
                "I packed a few shirts for the trip.": "Correct! 'Shirts' is countable and plural, so 'a few' is right.",
                "I packed a few luggage for the trip.": "Wrong. 'Luggage' is uncountable — it can't take 'a few'.",
                "I packed a little shirts for the trip.": "Wrong. 'A little' is for uncountable nouns, not plural countable nouns like 'shirts'.",
                "I packed a few shirt for the trip.": "Wrong. After 'a few', a countable noun must be plural: 'shirts', not 'shirt'.",
            },
        },
    },

    {
        id: "amt-mc-3",
        topic: "expressing-amounts",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the sentence that describes a very small amount, almost none.",
        grammarRule: "Hardly Any — Very Small Amount, Almost None",
        explanation: "'Hardly any' means almost none — a very small amount, close to zero.",
        tip: "hardly any = almost none: hardly any coffee, hardly any time.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "There's hardly any coffee left in the pot.",
            options: [
                "There's hardly any coffee left in the pot.",
                "There's plenty of coffee left in the pot.",
                "There's too much coffee left in the pot.",
                "There's a lot of coffee left in the pot.",
            ],
            optionExplanations: {
                "There's hardly any coffee left in the pot.": "Correct! 'Hardly any' means almost none — a very small amount.",
                "There's plenty of coffee left in the pot.": "Wrong. 'Plenty of' means a large amount — the opposite of what we want to say.",
                "There's too much coffee left in the pot.": "Wrong. 'Too much' means an excessive amount — also the opposite meaning.",
                "There's a lot of coffee left in the pot.": "Wrong. 'A lot of' means a large amount — not a very small one.",
            },
        },
    },

    {
        id: "amt-mc-4",
        topic: "expressing-amounts",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the sentence where 'too' shows there's a problem, not just a high degree.",
        grammarRule: "Too + Adjective — More Than Wanted (a Problem)",
        explanation: "'Too' + adjective means more than we want or need — there's a problem. 'Very' just shows a high degree, with no problem.",
        tip: "too + adjective = a problem. very + adjective = just a high degree, no problem.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "This soup is too spicy for me to eat.",
            options: [
                "This soup is too spicy for me to eat.",
                "This soup is very spicy, and I love it.",
                "This soup tastes quite spicy today.",
                "This soup is extremely spicy and delicious.",
            ],
            optionExplanations: {
                "This soup is too spicy for me to eat.": "Correct! 'Too spicy... to eat' shows a problem — the spiciness stops the person from eating it.",
                "This soup is very spicy, and I love it.": "Wrong. 'Very spicy' is just a high degree — there's no problem, since the person loves it.",
                "This soup tastes quite spicy today.": "Wrong. 'Quite' shows a moderate degree — no problem is mentioned.",
                "This soup is extremely spicy and delicious.": "Wrong. 'Extremely' shows a high degree, but 'delicious' tells us it's not a problem.",
            },
        },
    },

    {
        id: "amt-mc-5",
        topic: "expressing-amounts",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the sentence that puts 'enough' in the correct position with an adjective.",
        grammarRule: "Enough After an Adjective",
        explanation: "'Enough' meaning 'the right amount' goes directly after an adjective: 'warm enough', not before it.",
        tip: "adjective + enough: warm enough, old enough, fast enough.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "Is the water warm enough for a swim?",
            options: [
                "Is the water warm enough for a swim?",
                "Is the water enough warm for a swim?",
                "Is the water warm for enough a swim?",
                "Is the enough water warm for a swim?",
            ],
            optionExplanations: {
                "Is the water warm enough for a swim?": "Correct! 'Enough' comes straight after the adjective 'warm'.",
                "Is the water enough warm for a swim?": "Wrong. 'Enough' must come after the adjective, not before it.",
                "Is the water warm for enough a swim?": "Wrong. This word order doesn't follow any correct pattern with 'enough'.",
                "Is the enough water warm for a swim?": "Wrong. 'Enough' before a noun goes directly in front of it, but not combined with an adjective like this.",
            },
        },
    },

    {
        id: "amt-mc-6",
        topic: "expressing-amounts",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the sentence that correctly expresses a large amount in a positive statement.",
        grammarRule: "Much Is Not Used in Positive Statements — Use A Lot Of / Lots Of",
        explanation: "'Much' isn't normally used in positive statements. In positive sentences, use 'a lot of' or 'lots of' instead.",
        tip: "Positive statements: a lot of / lots of money. Negatives and questions: much money.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "We spent a lot of money on the holiday.",
            options: [
                "We spent a lot of money on the holiday.",
                "We spent much money on the holiday.",
                "We spent too much money on the holiday.",
                "We spent very much money on the holiday.",
            ],
            optionExplanations: {
                "We spent a lot of money on the holiday.": "Correct! 'A lot of' is the natural way to show a large amount in a positive statement.",
                "We spent much money on the holiday.": "Wrong. 'Much' isn't normally used in positive statements — use 'a lot of' instead.",
                "We spent too much money on the holiday.": "Wrong. 'Too much' means more than we wanted — it describes a problem, not simply a large amount.",
                "We spent very much money on the holiday.": "Wrong. We don't combine 'very' with 'much' like this before a noun.",
            },
        },
    },

    {
        id: "amt-mc-7",
        topic: "expressing-amounts",
        type: "multiple-choice",
        difficulty: "advanced",
        sentence: "Choose the question that correctly asks about a large, unspecified quantity.",
        grammarRule: "A Lot Of — Works in Positive, Negative and Question Forms",
        explanation: "'A lot of' works naturally in positive, negative and question sentences. 'Plenty of' is mostly used in positive statements only.",
        tip: "a lot of = works in every sentence type. plenty of = mainly positive statements.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "Do you spend a lot of time online?",
            options: [
                "Do you spend a lot of time online?",
                "Do you spend plenty of time online?",
                "Do you spend many time online?",
                "Do you spend too time online?",
            ],
            optionExplanations: {
                "Do you spend a lot of time online?": "Correct! 'A lot of' works naturally in questions, unlike 'plenty of', which is mainly used in positive statements.",
                "Do you spend plenty of time online?": "Wrong. 'Plenty of' is mostly used in positive statements, not usually in questions.",
                "Do you spend many time online?": "Wrong. 'Time' is uncountable, so 'many' is the wrong quantifier.",
                "Do you spend too time online?": "Wrong. 'Too' cannot go directly before a noun like this — it needs 'much' or 'many': 'too much time'.",
            },
        },
    },

    // ===== WORD TRANSFORM QUESTIONS (6 questions) =====

    {
        id: "amt-wt-1",
        topic: "expressing-amounts",
        type: "word-transform",
        difficulty: "beginner",
        sentence: "There isn't ___ sugar left for the cake — we need to buy more.",
        grammarRule: "Much With Uncountable Nouns in Negatives",
        explanation: "'Sugar' is uncountable, and this is a negative sentence, so 'much' is correct: 'There isn't much sugar left.'",
        tip: "much + uncountable, mainly in negatives and questions: isn't much sugar, how much sugar?",
        wordTransform: {
            baseWord: "much/many",
            correctAnswer: "much",
        },
    },

    {
        id: "amt-wt-2",
        topic: "expressing-amounts",
        type: "word-transform",
        difficulty: "beginner",
        sentence: "I've only got ___ dollars, so I can't buy a new phone.",
        grammarRule: "A Few With Countable Nouns",
        explanation: "'Dollars' is countable and plural, so 'a few' is correct, not 'a little'.",
        tip: "a few + countable plural: a few dollars, a few days, a few friends.",
        wordTransform: {
            baseWord: "a few/a little",
            correctAnswer: "a few",
        },
    },

    {
        id: "amt-wt-3",
        topic: "expressing-amounts",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "We're really lucky — we've got ___ fresh fruit from the garden this year.",
        grammarRule: "Plenty Of — Large Amount, No Problem",
        explanation: "'Plenty of' shows a large amount with no problem — here, lots of fresh fruit, which is good luck, not an issue.",
        tip: "plenty of = a large amount, no problem. too much = a large amount, a problem.",
        wordTransform: {
            baseWord: "plenty of/too much",
            correctAnswer: "plenty of",
        },
    },

    {
        id: "amt-wt-4",
        topic: "expressing-amounts",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "There's ___ milk in the fridge — just a drop, really.",
        grammarRule: "Hardly Any — Very Small Amount",
        explanation: "'Just a drop' tells us the amount is almost nothing, so 'hardly any' is correct.",
        tip: "hardly any = almost none: hardly any milk, hardly any time.",
        wordTransform: {
            baseWord: "hardly any/plenty of",
            correctAnswer: "hardly any",
        },
    },

    {
        id: "amt-wt-5",
        topic: "expressing-amounts",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "This jacket isn't warm ___ for the winter here.",
        grammarRule: "Enough After an Adjective",
        explanation: "'Enough' meaning 'the right amount' goes directly after the adjective 'warm': 'warm enough'.",
        tip: "adjective + enough: warm enough, big enough, fast enough.",
        wordTransform: {
            baseWord: "enough/too",
            correctAnswer: "enough",
        },
    },

    {
        id: "amt-wt-6",
        topic: "expressing-amounts",
        type: "word-transform",
        difficulty: "advanced",
        sentence: "The train was ___ crowded for me to find a seat.",
        grammarRule: "Too + Adjective — a Problem",
        explanation: "Because there was a result (couldn't find a seat), 'too' is correct — it shows a problem, unlike 'very', which doesn't.",
        tip: "too + adjective + a result clause = a problem: too crowded to find a seat.",
        wordTransform: {
            baseWord: "too/very",
            correctAnswer: "too",
        },
    },
];

export const expressingAmountsTopic: GrammarTopic = {
    id: "expressing-amounts",
    level: "B1",
    name: "Quantifiers: Large and Small Amounts",
    description: "Practise plenty of, a few, a bit of, hardly any, too much/too many and enough — and learn why 'too' means there's a problem, not just 'very'.",
    lesson: "Unit 7B",
    icon: "🧳",
    cards: [
        {
            id: "amt-card-1",
            rule: "plenty of — a large amount (not a problem)",
            example: "We've got ___ (plenty of / a lot of) time before the flight, so let's relax.",
            answer: "plenty of",
            explanation: "'Plenty of' means a large amount — enough and more. It's mostly used in positive statements, with countable or uncountable nouns.",
            examples: ["There's plenty of parking outside the cinema.", "She has plenty of friends in this city."],
            ua: "plenty of ≈ «достатньо й навіть більше» (переважно у стверджувальних реченнях).",
        },
        {
            id: "amt-card-2",
            rule: "a few — small number (countable nouns only)",
            example: "I've invited ___ neighbours round for coffee tomorrow.",
            answer: "a few",
            explanation: "'A few' means a small number. It only goes with countable nouns, like 'neighbours' or 'days'.",
            examples: ["We stayed in Rome for a few days.", "I only need a few more minutes to finish this."],
            ua: "a few = «кілька» — тільки зі злічуваними іменниками: a few days «кілька днів».",
        },
        {
            id: "amt-card-3",
            rule: "a bit of / a little — small amount (uncountable nouns only)",
            example: "Could I have ___ (a bit of / a little) more time to think about it?",
            answer: "a little",
            explanation: "'A bit of' and 'a little' both mean a small amount. They go with uncountable nouns, like 'time' or 'milk', never with plural countable nouns.",
            examples: ["There's a bit of cheese left in the fridge.", "I need a little help moving this sofa."],
            ua: "a bit of / a little = «трохи» — тільки з незлічуваними: a little time «трохи часу».",
        },
        {
            id: "amt-card-4",
            rule: "hardly any — a very small amount, almost none",
            example: "I looked in my wallet, but there was ___ cash inside — just one coin.",
            answer: "hardly any",
            explanation: "'Hardly any' means a very small amount — almost none. It works with both countable and uncountable nouns.",
            examples: ["There were hardly any seats left on the bus.", "We've got hardly any sugar, so the tea will be weak."],
            ua: "hardly any = «майже нічого, дуже мало»: hardly any money «майже немає грошей».",
        },
        {
            id: "amt-card-5",
            rule: "too much / too many — more than is wanted or needed",
            example: "He put ___ salt in the soup, so now it tastes awful.",
            answer: "too much",
            explanation: "'Too much' (uncountable) and 'too many' (countable) show that an amount is a problem — more than we want or need.",
            examples: ["There were too many people at the meeting to fit in the room.", "I ate too much cake and now I feel sick."],
            ua: "too much (незлічувані) / too many (злічувані) = «забагато» — коли кількість стає проблемою.",
        },
        {
            id: "amt-card-6",
            rule: "enough — the right amount (before a noun or after an adjective)",
            example: "This shirt isn't big ___ for my brother — he needs a bigger size.",
            answer: "enough",
            explanation: "'Enough' means the right amount. Before a noun it goes in front: 'enough time'. After an adjective, it goes straight after: 'big enough'.",
            examples: ["Is there enough milk for breakfast?", "She's not old enough to drive yet."],
            ua: "enough після прикметника: big enough «достатньо великий»; перед іменником: enough time «достатньо часу».",
        },
        {
            id: "amt-card-7",
            rule: "too + adjective — a problem, not the same as 'very'",
            example: "The hotel room was ___ small for all four of us to sleep in.",
            answer: "too",
            explanation: "'Too' + adjective means more than we want or need — there's a problem. It's different from 'very', which just shows a high degree with no problem.",
            examples: ["This coffee is too hot to drink right now.", "The music was too loud, so we couldn't talk."],
            ua: "too + прикметник = «занадто», є проблема. Не плутати з very («дуже», без проблеми).",
        },
        {
            id: "amt-card-8",
            rule: "much — not used in positive statements",
            example: "How ___ rain did you get last winter?",
            answer: "much",
            explanation: "'Much' goes with uncountable nouns in questions and negative sentences: 'How much rain...?', 'I don't have much time.' In positive statements, use 'a lot of' or 'lots of' instead.",
            examples: ["I don't have much energy today.", "We don't usually get much snow here."],
            ua: "much — тільки в питаннях/запереченнях; у стверджувальних реченнях кажемо a lot of.",
        },
    ],
    rules: expressingAmountsQuestions,
};

export default expressingAmountsQuestions;
