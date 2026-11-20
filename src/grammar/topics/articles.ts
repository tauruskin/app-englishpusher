/**
 * EnglishPusher Grammar Testing - Articles (a/an, the, no article)
 * B1 Level (Speak Out) - Lesson 4B
 *
 * 6 gap-fill, 6 error-spot, 7 multiple-choice, 6 word-transform = 25 questions
 * VERIFIED: All error-spot indexes checked against split(" ") positions.
 */

import type { GrammarQuestion, GrammarTopic } from "../types.ts";

export const articlesQuestions: GrammarQuestion[] = [

    // ===== GAP FILL QUESTIONS (6 questions) =====

    {
        id: "art-gap-1",
        topic: "articles",
        type: "gap-fill",
        difficulty: "beginner",
        sentence: "She showed us ___ amazing invention she'd built in her garage.",
        grammarRule: "A/An — First Mention (New Information)",
        explanation: "When something is mentioned for the first time, use a/an — the listener doesn't know which one yet. 'Amazing' starts with a vowel sound, so we use 'an'.",
        tip: "New information = a/an. Next word starts with a vowel sound = an, consonant sound = a.",
        gapFill: {
            gapIndex: 3,
            correctAnswer: "an",
            options: ["an", "a", "the", "–"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "art-gap-2",
        topic: "articles",
        type: "gap-fill",
        difficulty: "beginner",
        sentence: "My cousin is ___ nurse at the city hospital.",
        grammarRule: "A/An — Jobs and Professions",
        explanation: "We use a/an before a job or profession. 'Nurse' starts with a consonant sound, so we use 'a'.",
        tip: "Jobs always take a/an: a teacher, an engineer, a nurse.",
        gapFill: {
            gapIndex: 3,
            correctAnswer: "a",
            options: ["a", "an", "the", "–"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "art-gap-3",
        topic: "articles",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "I ordered a coffee and a sandwich, but ___ sandwich was cold when it arrived.",
        grammarRule: "The — Something Already Mentioned",
        explanation: "'Sandwich' was already mentioned, so both speaker and listener know exactly which one is meant — use 'the'.",
        tip: "Second mention of the same thing = the.",
        gapFill: {
            gapIndex: 8,
            correctAnswer: "the",
            options: ["the", "a", "an", "–"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "art-gap-4",
        topic: "articles",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "Out of all the runners in the race, she was ___ fastest by far.",
        grammarRule: "The — Superlatives",
        explanation: "Superlative adjectives (fastest, biggest, best) are always preceded by 'the' because they describe something unique in its group.",
        tip: "Superlative adjective → always 'the': the best, the tallest, the most expensive.",
        gapFill: {
            gapIndex: 10,
            correctAnswer: "the",
            options: ["the", "a", "an", "–"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "art-gap-5",
        topic: "articles",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "In general, ___ smartphones are far more powerful than computers were twenty years ago.",
        grammarRule: "No Article — General Statements (Plural Nouns)",
        explanation: "When we talk about things in general, not specific ones, we use no article at all with plural nouns: 'smartphones' here means smartphones in general.",
        tip: "Talking generally about a whole group = no article: Dogs are loyal. Computers are useful.",
        gapFill: {
            gapIndex: 2,
            correctAnswer: "–",
            options: ["–", "the", "a", "some"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "art-gap-6",
        topic: "articles",
        type: "gap-fill",
        difficulty: "advanced",
        sentence: "He's always been good at ___ basketball, even though he's quite short.",
        grammarRule: "No Article — Names of Sports",
        explanation: "Names of sports and games never take an article: we play basketball, football, chess — not 'the basketball'.",
        tip: "Sports and games = no article: play tennis, like football, enjoy chess.",
        gapFill: {
            gapIndex: 5,
            correctAnswer: "–",
            options: ["–", "the", "a", "an"],
            correctOptionIndex: 0,
        },
    },

    // ===== ERROR SPOT QUESTIONS (6 questions) =====
    // RULE: Every error is exactly ONE word. Replacing wrongWord with correction
    // must produce a 100% grammatically correct sentence with no leftover errors.

    // split(" ") → [0=I,1=need,2=to,3=buy,4=a,5=umbrella,6=before,7=it,8=starts,9=raining.]
    // words[4]="a" ✅  corrected: "I need to buy an umbrella before it starts raining." ✅
    {
        id: "art-error-1",
        topic: "articles",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "I need to buy a umbrella before it starts raining.",
        grammarRule: "A vs An — Vowel Sounds",
        explanation: "Use 'an' before a word that starts with a vowel sound. 'Umbrella' starts with a vowel sound, so it needs 'an', not 'a'.",
        errorSpot: {
            errorWordIndex: 4,
            wrongWord: "a",
            correction: "an",
            reason: "'Umbrella' starts with a vowel sound, so it needs 'an': 'I need to buy an umbrella.'",
            correctionOptions: ["an", "a", "the", "some"],
        },
    },

    // split(" ") → [0=I,1=bought,2=a,3=new,4=bike,5=last,6=month,7=but,8=a,9=bike,10=broke,11=down,12=yesterday.]
    // words[8]="a" ✅  corrected: "I bought a new bike last month but the bike broke down yesterday." ✅
    {
        id: "art-error-2",
        topic: "articles",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "I bought a new bike last month but a bike broke down yesterday.",
        grammarRule: "The — Something Already Mentioned",
        explanation: "'Bike' was already mentioned, so the speaker and listener both know which one is meant — use 'the', not 'a', for the second mention.",
        errorSpot: {
            errorWordIndex: 8,
            wrongWord: "a",
            correction: "the",
            reason: "The bike has already been mentioned, so we use 'the': 'but the bike broke down yesterday.'",
            correctionOptions: ["the", "a", "an", "this"],
        },
    },

    // split(" ") → [0=Everyone,1=agreed,2=that,3=she,4=was,5=a,6=best,7=candidate,8=for,9=the,10=job.]
    // words[5]="a" ✅  corrected: "Everyone agreed that she was the best candidate for the job." ✅
    {
        id: "art-error-3",
        topic: "articles",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "Everyone agreed that she was a best candidate for the job.",
        grammarRule: "The — Superlatives",
        explanation: "Superlatives like 'best' always take 'the', because they describe something unique in its group.",
        errorSpot: {
            errorWordIndex: 5,
            wrongWord: "a",
            correction: "the",
            reason: "'Best' is a superlative, so it always takes 'the': 'she was the best candidate.'",
            correctionOptions: ["the", "a", "some", "this"],
        },
    },

    // split(" ") → [0=They're,1=planning,2=a,3=trip,4=along,5=a,6=River,7=Nile,8=next,9=summer.]
    // words[5]="a" ✅  corrected: "They're planning a trip along the River Nile next summer." ✅
    {
        id: "art-error-4",
        topic: "articles",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "They're planning a trip along a River Nile next summer.",
        grammarRule: "The — Rivers, Oceans and Seas",
        explanation: "Rivers, oceans and seas always take 'the': the River Nile, the Pacific Ocean, the Atlantic.",
        errorSpot: {
            errorWordIndex: 5,
            wrongWord: "a",
            correction: "the",
            reason: "Rivers always take 'the': 'a trip along the River Nile.'",
            correctionOptions: ["the", "a", "an", "that"],
        },
    },

    // split(" ") → [0=Her,1=sister,2=just,3=qualified,4=as,5=the,6=dentist,7=after,8=years,9=of,10=study.]
    // words[5]="the" ✅  corrected: "Her sister just qualified as a dentist after years of study." ✅
    {
        id: "art-error-5",
        topic: "articles",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "Her sister just qualified as the dentist after years of study.",
        grammarRule: "A/An — Jobs and Professions",
        explanation: "Jobs take 'a/an', not 'the', unless we're already talking about one specific person's job that has been mentioned before.",
        errorSpot: {
            errorWordIndex: 5,
            wrongWord: "the",
            correction: "a",
            reason: "A job mentioned for the first time takes 'a/an': 'she qualified as a dentist.'",
            correctionOptions: ["a", "the", "an", "some"],
        },
    },

    // split(" ") → [0=She,1=is,2=a,3=only,4=person,5=in,6=the,7=office,8=who,9=can,10=speak,11=Japanese.]
    // words[2]="a" ✅  corrected: "She is the only person in the office who can speak Japanese." ✅
    {
        id: "art-error-6",
        topic: "articles",
        type: "error-spot",
        difficulty: "advanced",
        sentence: "She is a only person in the office who can speak Japanese.",
        grammarRule: "The — Defining Expressions (the only, the first)",
        explanation: "'Only' is a defining expression — like superlatives, it always takes 'the': the only, the first, the last.",
        errorSpot: {
            errorWordIndex: 2,
            wrongWord: "a",
            correction: "the",
            reason: "'Only' always takes 'the': 'She is the only person in the office who can speak Japanese.'",
            correctionOptions: ["the", "a", "an", "some"],
        },
    },

    // ===== MULTIPLE CHOICE QUESTIONS (7 questions) =====

    {
        id: "art-mc-1",
        topic: "articles",
        type: "multiple-choice",
        difficulty: "beginner",
        sentence: "Choose the sentence that uses the article correctly:",
        grammarRule: "The — Things There's Only One Of",
        explanation: "There's only one sun, so we always say 'the sun' — just like 'the sky', 'the internet' or 'the moon', things that are unique.",
        tip: "Only one in the whole world/situation = the: the sun, the sky, the internet.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "The sun was shining brightly all afternoon.",
            options: [
                "The sun was shining brightly all afternoon.",
                "A sun was shining brightly all afternoon.",
                "Sun was shining brightly all afternoon.",
                "An sun was shining brightly all afternoon.",
            ],
            optionExplanations: {
                "The sun was shining brightly all afternoon.": "Correct! There's only one sun, so it always takes 'the'.",
                "A sun was shining brightly all afternoon.": "Wrong. 'Sun' is unique — it can't be 'a sun', as if there were several.",
                "Sun was shining brightly all afternoon.": "Wrong. A unique thing like the sun can't appear with no article at all.",
                "An sun was shining brightly all afternoon.": "Wrong. 'Sun' starts with a consonant sound, and in any case unique things take 'the', not 'an'.",
            },
        },
    },

    {
        id: "art-mc-2",
        topic: "articles",
        type: "multiple-choice",
        difficulty: "beginner",
        sentence: "Choose the sentence with the correct article (or no article):",
        grammarRule: "No Article vs The — Country Names",
        explanation: "Most country names take no article (she lives in France), but names made of several words or plural forms need 'the': the United Kingdom, the United States, the Netherlands.",
        tip: "Most countries = no article. Names with 'Kingdom/States/Republic' or plural endings = the.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "She has lived in the United Kingdom for ten years.",
            options: [
                "She has lived in the United Kingdom for ten years.",
                "She has lived in United Kingdom for ten years.",
                "She has lived in a United Kingdom for ten years.",
                "She has lived in United the Kingdom for ten years.",
            ],
            optionExplanations: {
                "She has lived in the United Kingdom for ten years.": "Correct! Country names with extra words like 'Kingdom' take 'the'.",
                "She has lived in United Kingdom for ten years.": "Wrong. This multi-word country name needs 'the': 'the United Kingdom'.",
                "She has lived in a United Kingdom for ten years.": "Wrong. There's only one United Kingdom — it can't take 'a'.",
                "She has lived in United the Kingdom for ten years.": "Wrong. 'The' goes before the whole name: 'the United Kingdom'.",
            },
        },
    },

    {
        id: "art-mc-3",
        topic: "articles",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the sentence that uses the article correctly:",
        grammarRule: "The — Rivers, Oceans and Seas",
        explanation: "Oceans, seas and rivers always take 'the': the Atlantic Ocean, the Mediterranean Sea, the River Thames.",
        tip: "Seas, oceans, rivers = always the.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "Cargo ships cross the Atlantic Ocean every day.",
            options: [
                "Cargo ships cross the Atlantic Ocean every day.",
                "Cargo ships cross Atlantic Ocean every day.",
                "Cargo ships cross a Atlantic Ocean every day.",
                "Cargo ships cross an Atlantic Ocean every day.",
            ],
            optionExplanations: {
                "Cargo ships cross the Atlantic Ocean every day.": "Correct! Oceans always take 'the'.",
                "Cargo ships cross Atlantic Ocean every day.": "Wrong. Oceans can't appear with no article at all.",
                "Cargo ships cross a Atlantic Ocean every day.": "Wrong. There's only one Atlantic Ocean — it needs 'the', not 'a'.",
                "Cargo ships cross an Atlantic Ocean every day.": "Wrong. There's only one Atlantic Ocean — it needs 'the', not 'an'.",
            },
        },
    },

    {
        id: "art-mc-4",
        topic: "articles",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the sentence that uses the article correctly:",
        grammarRule: "The — Areas of a Country",
        explanation: "We use 'the' before an area or region of a country: the south of France, the north of England, the west coast of Italy.",
        tip: "A region/area within a place = the: the south of Spain, the north of the country.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "They own a small vineyard in the south of France.",
            options: [
                "They own a small vineyard in the south of France.",
                "They own a small vineyard in south of France.",
                "They own a small vineyard in a south of France.",
                "They own a small vineyard in south of a France.",
            ],
            optionExplanations: {
                "They own a small vineyard in the south of France.": "Correct! An area of a country takes 'the': 'the south of France'.",
                "They own a small vineyard in south of France.": "Wrong. 'South of France' needs 'the' before it.",
                "They own a small vineyard in a south of France.": "Wrong. Areas like this take 'the', not 'a'.",
                "They own a small vineyard in south of a France.": "Wrong. Country names like 'France' take no article at all.",
            },
        },
    },

    {
        id: "art-mc-5",
        topic: "articles",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the sentence that uses articles correctly:",
        grammarRule: "No Article — Prepositional Phrases",
        explanation: "Some fixed phrases with prepositions never take an article: for lunch, at work, on foot, at home, by car.",
        tip: "Fixed phrases like at work, for lunch, on foot never take an article.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "I usually have a sandwich for lunch and walk to work on foot.",
            options: [
                "I usually have a sandwich for lunch and walk to work on foot.",
                "I usually have a sandwich for the lunch and walk to the work on the foot.",
                "I usually have a sandwich for a lunch and walk to a work on a foot.",
                "I usually have a sandwich for the lunch and walk to work on a foot.",
            ],
            optionExplanations: {
                "I usually have a sandwich for lunch and walk to work on foot.": "Correct! 'For lunch', 'to work' and 'on foot' are fixed phrases with no article.",
                "I usually have a sandwich for the lunch and walk to the work on the foot.": "Wrong. None of these fixed phrases take 'the'.",
                "I usually have a sandwich for a lunch and walk to a work on a foot.": "Wrong. None of these fixed phrases take 'a'.",
                "I usually have a sandwich for the lunch and walk to work on a foot.": "Wrong. 'For lunch' and 'on foot' take no article at all.",
            },
        },
    },

    {
        id: "art-mc-6",
        topic: "articles",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the sentence someone would actually say out loud:",
        grammarRule: "The — Dates in Spoken English",
        explanation: "When we say dates aloud, we use 'the' before the ordinal number: the fifth of June, the first of May.",
        tip: "Spoken dates = the + ordinal number: the third of April.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "My birthday is on the fifth of June.",
            options: [
                "My birthday is on the fifth of June.",
                "My birthday is on fifth of June.",
                "My birthday is on a fifth of June.",
                "My birthday is on fifth of the June.",
            ],
            optionExplanations: {
                "My birthday is on the fifth of June.": "Correct! Spoken dates use 'the' before the ordinal number.",
                "My birthday is on fifth of June.": "Wrong. Missing 'the' before 'fifth'.",
                "My birthday is on a fifth of June.": "Wrong. There's only one fifth of June each year — it needs 'the', not 'a'.",
                "My birthday is on fifth of the June.": "Wrong. 'The' goes before the ordinal number ('the fifth'), not before the month name.",
            },
        },
    },

    {
        id: "art-mc-7",
        topic: "articles",
        type: "multiple-choice",
        difficulty: "advanced",
        sentence: "Choose the sentence that uses the article correctly:",
        grammarRule: "The — Defining Expressions (the only, the first)",
        explanation: "Defining expressions such as 'the first', 'the last' and 'the only' always take 'the', because they point to one specific, unique thing.",
        tip: "the first / the last / the only — always the, never a/an.",
        multipleChoice: {
            question: "Which sentence is correct?",
            correctOption: "She was the first woman to climb that mountain alone.",
            options: [
                "She was the first woman to climb that mountain alone.",
                "She was a first woman to climb that mountain alone.",
                "She was first woman to climb that mountain alone.",
                "She was an first woman to climb that mountain alone.",
            ],
            optionExplanations: {
                "She was the first woman to climb that mountain alone.": "Correct! 'The first' is a defining expression — it always takes 'the'.",
                "She was a first woman to climb that mountain alone.": "Wrong. 'First' in this sense always takes 'the', not 'a'.",
                "She was first woman to climb that mountain alone.": "Wrong. 'First' used this way can't appear with no article.",
                "She was an first woman to climb that mountain alone.": "Wrong. 'First' always takes 'the' here, not 'an'.",
            },
        },
    },

    // ===== WORD TRANSFORM QUESTIONS (6 questions) =====

    {
        id: "art-wt-1",
        topic: "articles",
        type: "word-transform",
        difficulty: "beginner",
        sentence: "There was ___ strange noise coming from the car engine, and nobody knew what it was.",
        grammarRule: "A/An — First Mention (New Information)",
        explanation: "This is the first time the noise is mentioned, and nobody knows what's causing it — use 'a', not 'the'.",
        tip: "New, unknown thing mentioned for the first time = a/an.",
        wordTransform: {
            baseWord: "a/the",
            correctAnswer: "a",
        },
    },

    {
        id: "art-wt-2",
        topic: "articles",
        type: "word-transform",
        difficulty: "beginner",
        sentence: "My brother-in-law works as ___ electrician for a company in town.",
        grammarRule: "A/An — Jobs and Professions",
        explanation: "'Electrician' starts with a vowel sound, so the job needs 'an', not 'a'.",
        tip: "Jobs always take a/an — choose by the sound of the next word.",
        wordTransform: {
            baseWord: "a/an",
            correctAnswer: "an",
        },
    },

    {
        id: "art-wt-3",
        topic: "articles",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "We finally found the café we'd read about, and ___ coffee there was fantastic.",
        grammarRule: "The — Something Already Mentioned",
        explanation: "The café (and its coffee) has already been mentioned, so we know exactly which one — use 'the'.",
        tip: "Already mentioned/known = the.",
        wordTransform: {
            baseWord: "the/a",
            correctAnswer: "the",
        },
    },

    {
        id: "art-wt-4",
        topic: "articles",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "Of all her paintings, this landscape is ___ most famous.",
        grammarRule: "The — Superlatives",
        explanation: "Superlatives (most famous, best, tallest) always take 'the'.",
        tip: "Superlative adjective → the.",
        wordTransform: {
            baseWord: "the/a",
            correctAnswer: "the",
        },
    },

    {
        id: "art-wt-5",
        topic: "articles",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "Their boat finally reached ___ Pacific Ocean after three weeks at sea.",
        grammarRule: "The — Rivers, Oceans and Seas",
        explanation: "Oceans, seas and rivers always take 'the': the Pacific Ocean, the Nile.",
        tip: "Seas/oceans/rivers = always the.",
        wordTransform: {
            baseWord: "the/a",
            correctAnswer: "the",
        },
    },

    {
        id: "art-wt-6",
        topic: "articles",
        type: "word-transform",
        difficulty: "advanced",
        sentence: "Out of the whole team, Maria was ___ only person who finished the marathon.",
        grammarRule: "The — Defining Expressions (the only, the first)",
        explanation: "Defining expressions like 'the only' and 'the first' always take 'the'.",
        tip: "the only / the first / the last = always the.",
        wordTransform: {
            baseWord: "the/a",
            correctAnswer: "the",
        },
    },
];

export const articlesTopic: GrammarTopic = {
    id: "articles",
    level: "B1",
    name: "Articles",
    description: "Learn when to use a/an, the, or no article at all — with famous 'firsts', jobs, geography and everyday general statements.",
    lesson: "Lesson 4B",
    icon: "🔤",
    cards: [
        {
            id: "art-card-1",
            rule: "a/an — introducing something new",
            example: "I just adopted ___ energetic puppy from the shelter.",
            answer: "an",
            explanation: "Use a/an the first time you mention something, before the listener knows which one. 'Energetic' starts with a vowel sound, so we use 'an'.",
            examples: ["She bought a new laptop yesterday.", "He works as an architect in Kyiv."],
            ua: "a/an — коли щось згадуємо вперше: an перед голосним звуком, a — перед приголосним.",
        },
        {
            id: "art-card-2",
            rule: "a/an — jobs and professions",
            example: "My father is ___ accountant for a big company.",
            answer: "an",
            explanation: "We always use a/an before a job title. 'Accountant' starts with a vowel sound, so it takes 'an'.",
            examples: ["She's a dentist.", "He wants to become an engineer."],
            ua: "Професії завжди з a/an: a teacher, an actor.",
        },
        {
            id: "art-card-3",
            rule: "the — already mentioned",
            example: "We watched a documentary last night, and ___ documentary was really moving.",
            answer: "the",
            explanation: "Once something has been mentioned, both speaker and listener know exactly which one is meant — so we switch to 'the'.",
            examples: ["I read a magazine on the train. The magazine was about space.", "There's a car outside. The car is blocking our drive."],
            ua: "the — коли вже знаємо, про що йдеться (згадувалося раніше).",
        },
        {
            id: "art-card-4",
            rule: "the — superlatives",
            example: "This is ___ biggest shopping centre in the country.",
            answer: "the",
            explanation: "Superlative adjectives (biggest, best, most expensive) describe something unique in its group, so they always take 'the'.",
            examples: ["He's the tallest player on the team.", "That was the worst film I've ever seen."],
            ua: "Найвищий ступінь порівняння завжди з the: the biggest, the best.",
        },
        {
            id: "art-card-5",
            rule: "the — seas, oceans and rivers",
            example: "Thousands of boats cross ___ English Channel every year.",
            answer: "the",
            explanation: "Seas, oceans and rivers always take 'the', even though most place names don't: the English Channel, the River Danube, the Pacific.",
            examples: ["They sailed across the Atlantic Ocean.", "The River Thames flows through London."],
            ua: "Моря, океани й річки завжди з the: the Pacific, the Danube.",
        },
        {
            id: "art-card-6",
            rule: "the vs no article — specific time vs general place",
            example: "We spent ___ whole afternoon walking around town without any plan.",
            answer: "the",
            explanation: "Use 'the' for one specific instance, like 'the whole afternoon' (that particular afternoon). But we say 'around town' with no article when we mean the general idea of being in town, not one specific place.",
            examples: ["I grew up in a small town.", "She walked around town all day without a map."],
            ua: "the whole afternoon — конкретний момент; around town (без артикля) — загальне поняття.",
        },
        {
            id: "art-card-7",
            rule: "the — defining expressions",
            example: "He was ___ last guest to leave the party.",
            answer: "the",
            explanation: "Defining expressions like 'the only', 'the first' and 'the last' always take 'the', because they point to one specific, unique thing.",
            examples: ["This is the only café open this late.", "Who was the first person to arrive?"],
            ua: "the only, the first, the last — завжди з the, бо вказують на щось унікальне.",
        },
        {
            id: "art-card-8",
            rule: "no article — sports, meals and transport",
            example: "After playing tennis for ___ hour, we went home for dinner.",
            answer: "an",
            explanation: "Sports (tennis, football), meals (breakfast, dinner) and forms of transport (by car, on foot) never take an article. The normal a/an rule still applies elsewhere in the sentence — 'hour' starts with a vowel sound, so it's 'an hour'.",
            examples: ["She plays volleyball every weekend.", "We usually travel by train."],
            ua: "Спорт, їжа (dinner) і транспорт (by car) — без артикля: play tennis, by car.",
        },
    ],
    rules: articlesQuestions,
};

export default articlesQuestions;
