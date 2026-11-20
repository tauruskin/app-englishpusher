/**
 * EnglishPusher Grammar Testing - Comparatives and Superlatives
 * B1 Level (Speak Out) - Lesson 6B
 *
 * 6 gap-fill, 6 error-spot, 7 multiple-choice, 6 word-transform = 25 questions
 * VERIFIED: All error-spot indexes checked against split(" ") positions.
 */

import type { GrammarQuestion, GrammarTopic } from "../types.ts";

export const comparativesAndSuperlatives: GrammarQuestion[] = [

    // ===== GAP FILL QUESTIONS (6 questions) =====

    {
        id: "cs-gap-1",
        topic: "comparatives-and-superlatives",
        type: "gap-fill",
        difficulty: "beginner",
        sentence: "My brother is ___ than me.",
        grammarRule: "Comparative of Short Adjectives (+er)",
        explanation: "Tall is a one-syllable adjective, so we add -er to form the comparative: tall → taller.",
        tip: "One-syllable adjectives: add -er for the comparative, -est for the superlative.",
        gapFill: {
            gapIndex: 3,
            correctAnswer: "taller",
            options: ["taller", "more tall", "tallest", "more taller"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "cs-gap-2",
        topic: "comparatives-and-superlatives",
        type: "gap-fill",
        difficulty: "beginner",
        sentence: "This is ___ restaurant in the city.",
        grammarRule: "Superlative of Long Adjectives (the most)",
        explanation: "Expensive has three syllables, so its superlative uses 'the most', not '-est': the most expensive.",
        tip: "Long adjectives (2+ syllables, not ending in -y): the most/the least + adjective.",
        gapFill: {
            gapIndex: 2,
            correctAnswer: "the most expensive",
            options: ["the most expensive", "the expensivest", "more expensive", "most expensivest"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "cs-gap-3",
        topic: "comparatives-and-superlatives",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "The soup tastes ___ than yesterday.",
        grammarRule: "Irregular Comparative — good → better",
        explanation: "Good is irregular: good → better → the best. It never takes -er or more.",
        tip: "good→better→the best — memorise this one, it has no regular pattern.",
        gapFill: {
            gapIndex: 3,
            correctAnswer: "better",
            options: ["better", "gooder", "more good", "best"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "cs-gap-4",
        topic: "comparatives-and-superlatives",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "My new job isn't ___ my last one.",
        grammarRule: "Comparisons with (not) as...as",
        explanation: "(Not) as + adjective + as compares two things as equal, or not equal: isn't as stressful as = less stressful than.",
        tip: "as + adjective + as = equal. not as + adjective + as = less.",
        gapFill: {
            gapIndex: 4,
            correctAnswer: "as stressful as",
            options: ["as stressful as", "more stressful than", "stressfuler than", "the most stressful"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "cs-gap-5",
        topic: "comparatives-and-superlatives",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "She can run ___ than her brother.",
        grammarRule: "Comparative Adverbs — Regular (+er)",
        explanation: "Fast is a short adverb (the same form as the adjective), so we add -er: fast → faster.",
        tip: "Short adverbs (fast, hard, late, early) take -er/-est, just like short adjectives.",
        gapFill: {
            gapIndex: 3,
            correctAnswer: "faster",
            options: ["faster", "more fast", "fastest", "more faster"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "cs-gap-6",
        topic: "comparatives-and-superlatives",
        type: "gap-fill",
        difficulty: "advanced",
        sentence: "He did ___ in the test than he expected.",
        grammarRule: "Irregular Comparative Adverb — badly → worse",
        explanation: "Badly is irregular as an adverb too: badly → worse → the worst.",
        tip: "well→better, badly→worse — both adjectives and adverbs share these irregular forms.",
        gapFill: {
            gapIndex: 2,
            correctAnswer: "worse",
            options: ["worse", "more badly", "badder", "the worst"],
            correctOptionIndex: 0,
        },
    },

    // ===== ERROR SPOT QUESTIONS (6 questions) =====
    // RULE: Every error is exactly ONE word. Replacing wrongWord with correction
    // must produce a 100% grammatically correct sentence with no leftover errors.

    // split(" ") → [0=My,1=new,2=office,3=is,4=biger,5=than,6=my,7=old,8=one.]
    // words[4]="biger" ✅  corrected: "My new office is bigger than my old one." ✅
    {
        id: "cs-error-1",
        topic: "comparatives-and-superlatives",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "My new office is biger than my old one.",
        grammarRule: "Comparative of CVC Adjectives — Double Consonant",
        explanation: "Big ends in one vowel + one consonant, so we double the final letter before -er: big → bigger.",
        errorSpot: {
            errorWordIndex: 4,
            wrongWord: "biger",
            correction: "bigger",
            reason: "Big ends in a single vowel + consonant, so the final letter doubles before -er: bigger, not biger.",
            correctionOptions: ["bigger", "biger", "more big", "biggest"],
        },
    },

    // split(" ") → [0=This,1=app,2=is,3=importanter,4=than,5=the,6=last,7=version.]
    // words[3]="importanter" ✅  corrected: "This app is more important than the last version." ✅
    {
        id: "cs-error-2",
        topic: "comparatives-and-superlatives",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "This app is importanter than the last version.",
        grammarRule: "Comparative of Long Adjectives — 'More' + Adjective",
        explanation: "Important has three syllables, so it forms the comparative with 'more', not '-er': more important.",
        errorSpot: {
            errorWordIndex: 3,
            wrongWord: "importanter",
            correction: "more important",
            reason: "Long adjectives never take -er — use 'more important', never importanter.",
            correctionOptions: ["more important", "importanter", "importantest", "most important"],
        },
    },

    // split(" ") → [0=The,1=new,2=office,3=is,4=farer,5=from,6=the,7=station,8=than,9=the,10=old,11=one.]
    // words[4]="farer" ✅  corrected: "The new office is further from the station than the old one." ✅
    {
        id: "cs-error-3",
        topic: "comparatives-and-superlatives",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "The new office is farer from the station than the old one.",
        grammarRule: "Irregular Comparative — far → further/farther",
        explanation: "Far has an irregular comparative: further (or farther). It never takes -er.",
        errorSpot: {
            errorWordIndex: 4,
            wrongWord: "farer",
            correction: "further",
            reason: "Far is irregular: far → further/farther, never farer.",
            correctionOptions: ["further", "farer", "more far", "farthest"],
        },
    },

    // split(" ") → [0=This,1=laptop,2=isn't,3=as,4=fast,5=than,6=my,7=old,8=one.]
    // words[5]="than" ✅  corrected: "This laptop isn't as fast as my old one." ✅
    {
        id: "cs-error-4",
        topic: "comparatives-and-superlatives",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "This laptop isn't as fast than my old one.",
        grammarRule: "Comparisons with (not) as...as",
        explanation: "The structure is (not) as + adjective + as, not as + adjective + than. Use 'as' on both sides.",
        errorSpot: {
            errorWordIndex: 5,
            wrongWord: "than",
            correction: "as",
            reason: "'As...as' needs 'as' on both sides: isn't as fast as, not isn't as fast than.",
            correctionOptions: ["as", "than", "that", "so"],
        },
    },

    // split(" ") → [0=He,1=drives,2=more,3=carefuller,4=than,5=his,6=brother.]
    // words[3]="carefuller" ✅  corrected: "He drives more carefully than his brother." ✅
    {
        id: "cs-error-5",
        topic: "comparatives-and-superlatives",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "He drives more carefuller than his brother.",
        grammarRule: "Comparative Adverbs — 'More' + -ly Adverb",
        explanation: "Adverbs ending in -ly use 'more', not -er: more carefully, never carefuller.",
        errorSpot: {
            errorWordIndex: 3,
            wrongWord: "carefuller",
            correction: "carefully",
            reason: "-ly adverbs never take -er — 'more' already does that job: more carefully.",
            correctionOptions: ["carefully", "carefuller", "more careful", "careful"],
        },
    },

    // split(" ") → [0=She,1=can,2=speak,3=French,4=weller,5=than,6=I,7=can.]
    // words[4]="weller" ✅  corrected: "She can speak French better than I can." ✅
    {
        id: "cs-error-6",
        topic: "comparatives-and-superlatives",
        type: "error-spot",
        difficulty: "advanced",
        sentence: "She can speak French weller than I can.",
        grammarRule: "Irregular Comparative Adverb — well → better",
        explanation: "Well is irregular as an adverb too: well → better → best. It never takes -er.",
        errorSpot: {
            errorWordIndex: 4,
            wrongWord: "weller",
            correction: "better",
            reason: "Well is irregular: well → better, never weller.",
            correctionOptions: ["better", "weller", "more well", "gooder"],
        },
    },

    // ===== MULTIPLE CHOICE QUESTIONS (7 questions) =====

    {
        id: "cs-mc-1",
        topic: "comparatives-and-superlatives",
        type: "multiple-choice",
        difficulty: "beginner",
        sentence: "Choose the sentence with the correct comparative form:",
        grammarRule: "Comparative of Adjectives Ending in -y",
        explanation: "Heavy is a two-syllable adjective ending in -y, so y changes to i before adding -er: heavy → heavier.",
        tip: "happy→happier, easy→easier, heavy→heavier — y becomes i before -er/-est.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "This bag is heavier than that one.",
            options: [
                "This bag is heavier than that one.",
                "This bag is more heavy than that one.",
                "This bag is heavyer than that one.",
                "This bag is most heavy than that one.",
            ],
            optionExplanations: {
                "This bag is heavier than that one.": "Correct! Heavy ends in a consonant + y, so y changes to i before -er: heavy → heavier.",
                "This bag is more heavy than that one.": "Wrong. Heavy is a short, common adjective — it takes -er, not more.",
                "This bag is heavyer than that one.": "Wrong. The y must change to i before adding -er: heavier, not heavyer.",
                "This bag is most heavy than that one.": "Wrong. 'Most' is for superlatives, and it's never followed by 'than'.",
            },
        },
    },

    {
        id: "cs-mc-2",
        topic: "comparatives-and-superlatives",
        type: "multiple-choice",
        difficulty: "beginner",
        sentence: "Choose the sentence with the correct superlative form:",
        grammarRule: "Superlative of Long Adjectives (the most)",
        explanation: "Comfortable has more than two syllables, so its superlative uses 'the most', not '-est'.",
        tip: "Long adjectives (2+ syllables, not ending in -y): the most/the least + adjective.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "It's the most comfortable sofa in the shop.",
            options: [
                "It's the most comfortable sofa in the shop.",
                "It's the comfortablest sofa in the shop.",
                "It's the more comfortable sofa in the shop.",
                "It's the most comfortablest sofa in the shop.",
            ],
            optionExplanations: {
                "It's the most comfortable sofa in the shop.": "Correct! Comfortable has more than two syllables, so the superlative uses 'the most'.",
                "It's the comfortablest sofa in the shop.": "Wrong. Long adjectives never take -est — use 'the most' instead.",
                "It's the more comfortable sofa in the shop.": "Wrong. 'More' is for comparatives, comparing two things. This compares one sofa to all the others — use the superlative 'the most'.",
                "It's the most comfortablest sofa in the shop.": "Wrong. You can't combine 'most' and '-est' — 'the most comfortable' is correct on its own.",
            },
        },
    },

    {
        id: "cs-mc-3",
        topic: "comparatives-and-superlatives",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the sentence with the correct superlative form:",
        grammarRule: "Irregular Superlative — bad → worst",
        explanation: "Bad is irregular: bad → worse → the worst. It never takes -est or most.",
        tip: "good→best, bad→worst, far→furthest — learn these three irregular superlatives together.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "That was the worst meal I've ever had.",
            options: [
                "That was the worst meal I've ever had.",
                "That was the baddest meal I've ever had.",
                "That was the most bad meal I've ever had.",
                "That was the more bad meal I've ever had.",
            ],
            optionExplanations: {
                "That was the worst meal I've ever had.": "Correct! Bad is irregular: bad → worse → the worst.",
                "That was the baddest meal I've ever had.": "Wrong. Bad never takes -est — its superlative is irregular: the worst.",
                "That was the most bad meal I've ever had.": "Wrong. Bad doesn't use 'most' either — it's irregular: the worst.",
                "That was the more bad meal I've ever had.": "Wrong. This mixes the comparative 'more' with a superlative meaning — and 'bad' is irregular anyway: the worst.",
            },
        },
    },

    {
        id: "cs-mc-4",
        topic: "comparatives-and-superlatives",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "This coat isn't as expensive as the other one.",
        grammarRule: "Meaning of 'not as...as'",
        explanation: "'Not as + adjective + as' means the first thing has less of that quality than the second.",
        tip: "not as expensive as = cheaper. not as good as = worse. as...as (no 'not') = equal.",
        multipleChoice: {
            question: "What does this sentence mean?",
            correctOption: "The coat costs less than the other one.",
            options: [
                "The coat costs less than the other one.",
                "The coat costs more than the other one.",
                "The two coats cost exactly the same.",
                "We don't know the price of either coat.",
            ],
            optionExplanations: {
                "The coat costs less than the other one.": "Correct! 'Not as + adjective + as' shows the first thing has less of that quality — here, it's cheaper.",
                "The coat costs more than the other one.": "Wrong. 'Not as expensive as' means less expensive, not more.",
                "The two coats cost exactly the same.": "Wrong. 'As...as' without 'not' would mean equal — 'not as...as' means unequal.",
                "We don't know the price of either coat.": "Wrong. The sentence does compare the prices — it tells us this coat is cheaper.",
            },
        },
    },

    {
        id: "cs-mc-5",
        topic: "comparatives-and-superlatives",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the sentence with the correct comparative adverb:",
        grammarRule: "Comparative Adverbs — 'More' + -ly Adverb",
        explanation: "Adverbs ending in -ly form the comparative with 'more', not -er: fluently → more fluently.",
        tip: "Most -ly adverbs use more/most. Only a few short adverbs (fast, hard) add -er/-est.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "He speaks more fluently than his sister.",
            options: [
                "He speaks more fluently than his sister.",
                "He speaks fluentlier than his sister.",
                "He speaks more fluent than his sister.",
                "He speaks fluently more than his sister.",
            ],
            optionExplanations: {
                "He speaks more fluently than his sister.": "Correct! Fluently ends in -ly, so the comparative uses 'more': more fluently.",
                "He speaks fluentlier than his sister.": "Wrong. -ly adverbs never take -er — use 'more' instead.",
                "He speaks more fluent than his sister.": "Wrong. 'Fluent' is the adjective; to compare how he speaks (an action), you need the adverb 'fluently'.",
                "He speaks fluently more than his sister.": "Wrong. 'More' must come directly before the adverb: more fluently, not fluently more.",
            },
        },
    },

    {
        id: "cs-mc-6",
        topic: "comparatives-and-superlatives",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the sentence where the superlative is used correctly:",
        grammarRule: "Superlatives with Possessive Adjectives",
        explanation: "We usually use 'the' before a superlative, but a possessive adjective (my, her, his, their) can take its place.",
        tip: "the best friend OR her best friend — never 'the her best friend'.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "That's her best painting.",
            options: [
                "That's her best painting.",
                "That's the her best painting.",
                "That's she best painting.",
                "That's her the best painting.",
            ],
            optionExplanations: {
                "That's her best painting.": "Correct! A possessive adjective (her) can replace 'the' before a superlative.",
                "That's the her best painting.": "Wrong. You can't use 'the' and a possessive adjective together — choose one: her best painting.",
                "That's she best painting.": "Wrong. 'She' is a subject pronoun; you need the possessive adjective 'her' before the noun phrase.",
                "That's her the best painting.": "Wrong. The possessive adjective replaces 'the' — it doesn't come after it.",
            },
        },
    },

    {
        id: "cs-mc-7",
        topic: "comparatives-and-superlatives",
        type: "multiple-choice",
        difficulty: "advanced",
        sentence: "Choose the sentence with the correct comparative form:",
        grammarRule: "Irregular Comparative Adverb — far → further/farther",
        explanation: "Far has an irregular comparative and superlative: far → further/farther → the furthest/farthest.",
        tip: "Further and farther are both correct — British English often prefers 'further'.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "She ran further than anyone else in the race.",
            options: [
                "She ran further than anyone else in the race.",
                "She ran farer than anyone else in the race.",
                "She ran more far than anyone else in the race.",
                "She ran the farer of anyone else in the race.",
            ],
            optionExplanations: {
                "She ran further than anyone else in the race.": "Correct! Far is irregular: far → further/farther → the furthest/farthest.",
                "She ran farer than anyone else in the race.": "Wrong. Far never takes -er — its comparative is irregular: further or farther.",
                "She ran more far than anyone else in the race.": "Wrong. Far doesn't use 'more' either — it's irregular: further/farther.",
                "She ran the farer of anyone else in the race.": "Wrong. This isn't a real word, and the comparative (not superlative) is needed here: further than anyone else.",
            },
        },
    },

    // ===== WORD TRANSFORM QUESTIONS (6 questions) =====

    {
        id: "cs-wt-1",
        topic: "comparatives-and-superlatives",
        type: "word-transform",
        difficulty: "beginner",
        sentence: "This laptop is ___ (light) than my old one.",
        grammarRule: "Comparative of Short Adjectives (+er)",
        explanation: "Light is a one-syllable adjective, so we add -er to form the comparative: light → lighter.",
        tip: "One-syllable adjectives: add -er. light→lighter, fast→faster, small→smaller.",
        wordTransform: {
            baseWord: "light",
            correctAnswer: "lighter",
        },
    },

    {
        id: "cs-wt-2",
        topic: "comparatives-and-superlatives",
        type: "word-transform",
        difficulty: "beginner",
        sentence: "She is the ___ (talented) person I've ever met.",
        grammarRule: "Superlative of Long Adjectives (the most)",
        explanation: "Talented has three syllables, so its superlative uses 'most', not '-est': the most talented.",
        tip: "Three-syllable (or longer) adjectives always use most/the most, never -est.",
        wordTransform: {
            baseWord: "talented",
            correctAnswer: "most talented",
        },
    },

    {
        id: "cs-wt-3",
        topic: "comparatives-and-superlatives",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "The traffic today is ___ (bad) than yesterday.",
        grammarRule: "Irregular Comparative — bad → worse",
        explanation: "Bad is irregular: bad → worse → the worst. It never takes -er or more.",
        tip: "bad→worse→the worst — just like good→better→the best.",
        wordTransform: {
            baseWord: "bad",
            correctAnswer: "worse",
        },
    },

    {
        id: "cs-wt-4",
        topic: "comparatives-and-superlatives",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "My brother isn't as ___ (confident) as me.",
        grammarRule: "Comparisons with (not) as...as — Base Form",
        explanation: "In the structure (not) as + adjective + as, the adjective keeps its base form — it is never comparative.",
        tip: "as...as and not as...as always use the plain adjective: as tall as, not as taller as.",
        wordTransform: {
            baseWord: "confident",
            correctAnswer: "confident",
        },
    },

    {
        id: "cs-wt-5",
        topic: "comparatives-and-superlatives",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "He checked the contract ___ (careful) than before.",
        grammarRule: "Comparative Adverbs — 'More' + -ly Adverb",
        explanation: "To compare actions, we use the adverb carefully, and since it ends in -ly, the comparative is formed with more: more carefully.",
        tip: "Turn the adjective into the -ly adverb first, then add more: careful → carefully → more carefully.",
        wordTransform: {
            baseWord: "careful",
            correctAnswer: "more carefully",
        },
    },

    {
        id: "cs-wt-6",
        topic: "comparatives-and-superlatives",
        type: "word-transform",
        difficulty: "advanced",
        sentence: "Of all my colleagues, she works ___ (hard).",
        grammarRule: "Superlative Adverbs — Short Adverbs (+ the -est)",
        explanation: "Hard is a short adverb (the same form as the adjective), so its superlative adds -est: the hardest.",
        tip: "Short adverbs like hard, fast and late form the superlative the same way as short adjectives: + the -est.",
        wordTransform: {
            baseWord: "hard",
            correctAnswer: "the hardest",
        },
    },
];

export const comparativesAndSuperlativesTopic: GrammarTopic = {
    id: "comparatives-and-superlatives",
    level: "B1",
    name: "Comparatives and Superlatives",
    description: "Compare people, places, things and actions using comparative and superlative adjectives and adverbs — regular endings, irregular forms like good/bad/far, and (not) as...as.",
    lesson: "Lesson 6B",
    icon: "⚖️",
    cards: [
        {
            id: "cs-card-1",
            rule: "short adjectives: -er / -est",
            example: "My new phone is ___ (fast) than my old one.",
            answer: "faster",
            explanation: "For one-syllable adjectives, add -er for the comparative and -est for the superlative: fast → faster → the fastest.",
            examples: ["This is the fastest way to get to the airport.", "Her car is cheaper than mine, but mine is more reliable."],
            ua: "короткі прикметники: +er / the ...est: fast → faster → the fastest.",
        },
        {
            id: "cs-card-2",
            rule: "-y adjectives: y → i + -er/-est",
            example: "The exam was ___ (easy) than I expected.",
            answer: "easier",
            explanation: "Two-syllable adjectives ending in -y change y to i before adding -er or -est: easy → easier → the easiest.",
            examples: ["She's the happiest person I know.", "This recipe is easier than the one we tried last week."],
            ua: "прикметники на -y: y→i: easy → easier → the easiest.",
        },
        {
            id: "cs-card-3",
            rule: "CVC adjectives: double the final consonant",
            example: "This flat is ___ (big) than our last one.",
            answer: "bigger",
            explanation: "Short adjectives ending in one vowel + one consonant double the final consonant before -er/-est: big → bigger → the biggest.",
            examples: ["Today is hotter than yesterday.", "That's the biggest mistake I've ever made at work."],
            ua: "один голосний + один приголосний: подвоюємо приголосну: big → bigger → the biggest.",
        },
        {
            id: "cs-card-4",
            rule: "longer adjectives: more / most + adjective",
            example: "I think working from home is ___ (convenient) than commuting every day.",
            answer: "more convenient",
            explanation: "Adjectives with two or more syllables (except those ending in -y) use more/the most instead of -er/-est: convenient → more convenient → the most convenient.",
            examples: ["This is the most expensive restaurant in town.", "Her new job is more stressful than her last one."],
            ua: "довгі прикметники: more / the most + adjective: expensive → more expensive.",
        },
        {
            id: "cs-card-5",
            rule: "irregular adjectives: good, bad, far",
            example: "The weather today is much ___ (bad) than it was yesterday.",
            answer: "worse",
            explanation: "Good, bad and far have irregular comparative and superlative forms: good → better → the best; bad → worse → the worst; far → further/farther → the furthest/farthest.",
            examples: ["This is the best coffee I've ever had.", "We had to walk further than we planned."],
            ua: "неправильні форми: good→better→best, bad→worse→worst, far→further→furthest.",
        },
        {
            id: "cs-card-6",
            rule: "(not) as + adjective + as",
            example: "This hotel isn't as ___ (expensive) as the one we stayed in last year.",
            answer: "expensive",
            explanation: "We use (not) as + adjective + as to say two things are equal, or not equal, in some quality. 'Not as...as' usually means less: not as expensive as = cheaper than.",
            examples: ["He isn't as tall as his brother.", "This test was just as difficult as the last one."],
            ua: "(not) as + прикметник + as — порівняння: not as expensive as = дешевше.",
        },
        {
            id: "cs-card-7",
            rule: "comparative and superlative adverbs",
            example: "She speaks English ___ (fluent) than she did a year ago.",
            answer: "more fluently",
            explanation: "Adverbs form comparatives and superlatives the same way as adjectives: short adverbs add -er/-est (fast→faster), most adverbs (especially -ly ones) use more/most (fluently→more fluently). Well and badly are irregular: well→better, badly→worse.",
            examples: ["He explained it more clearly than before.", "Of all the students, she works the hardest."],
            ua: "прислівники: fast→faster; fluently→more fluently; well→better, badly→worse (виняток).",
        },
        {
            id: "cs-card-8",
            rule: "superlatives: the + -est/most, often with present perfect + ever",
            example: "This is the ___ (interesting) book I've ever read.",
            answer: "most interesting",
            explanation: "We normally use 'the' before a superlative, though a possessive adjective is also possible ('her best friend'). Superlatives are often followed by the present perfect + ever to talk about someone's whole experience so far.",
            examples: ["That's the funniest film I've ever seen.", "He's the most talented musician in the band."],
            ua: "найвищий ступінь часто з Present Perfect + ever: the most interesting book I've ever read.",
        },
    ],
    rules: comparativesAndSuperlatives,
};

export default comparativesAndSuperlatives;
