/**
 * EnglishPusher Grammar Testing - First and Second Conditionals
 * B1 Level (Speakout) - Unit 7, Lesson A: "Good tourists"
 *
 * 6 gap-fill, 6 error-spot, 7 multiple-choice, 6 word-transform = 25 questions
 * VERIFIED: All error-spot indexes checked against split(" ") positions.
 */

import type { GrammarQuestion, GrammarTopic } from "../types.ts";

export const firstAndSecondConditionals: GrammarQuestion[] = [

    // ===== GAP FILL QUESTIONS (6 questions) =====

    {
        id: "cond-gap-1",
        topic: "first-and-second-conditionals",
        type: "gap-fill",
        difficulty: "beginner",
        sentence: "If it rains tomorrow, we ___ the match.",
        grammarRule: "First Conditional — Main Clause (will + Base Verb)",
        explanation: "The main clause of a first conditional uses will + base verb for a real, possible future result.",
        tip: "If + present simple, ... will + base verb — the classic first conditional pattern.",
        gapFill: {
            gapIndex: 5,
            correctAnswer: "will cancel",
            options: ["will cancel", "would cancel", "cancel", "canceled"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "cond-gap-2",
        topic: "first-and-second-conditionals",
        type: "gap-fill",
        difficulty: "beginner",
        sentence: "You'll feel more relaxed if you ___ your bags the night before.",
        grammarRule: "First Conditional — If-clause (Present Simple)",
        explanation: "The if-clause of a first conditional uses the present simple, even though it refers to the future.",
        tip: "If + present simple (not will) describes the real condition; will only goes in the main clause.",
        gapFill: {
            gapIndex: 6,
            correctAnswer: "pack",
            options: ["pack", "packed", "will pack", "would pack"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "cond-gap-3",
        topic: "first-and-second-conditionals",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "If I ___ a map, I wouldn't get lost in the old town.",
        grammarRule: "Second Conditional — If-clause (Past Simple)",
        explanation: "The if-clause of a second conditional uses the past simple to describe a hypothetical present or future situation.",
        tip: "If + past simple (not would) sets up the imaginary condition; would only goes in the main clause.",
        gapFill: {
            gapIndex: 2,
            correctAnswer: "had",
            options: ["had", "have", "will have", "would have"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "cond-gap-4",
        topic: "first-and-second-conditionals",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "If the museum were free, more local people ___ it.",
        grammarRule: "Second Conditional — Main Clause (would + Base Verb)",
        explanation: "The main clause of a second conditional uses would + base verb for an imaginary or unlikely result.",
        tip: "Would + base verb = the imagined result of a hypothetical if-clause.",
        gapFill: {
            gapIndex: 8,
            correctAnswer: "would visit",
            options: ["would visit", "will visit", "visit", "visited"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "cond-gap-5",
        topic: "first-and-second-conditionals",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "If you don't reserve a table, the restaurant ___ full by the time you arrive.",
        grammarRule: "First Conditional — will be (Prediction)",
        explanation: "A real, likely future result still takes will + base verb in the main clause, even with a negative if-clause.",
        tip: "Negative if-clause, positive main clause: If you don't ..., ... will still happen.",
        gapFill: {
            gapIndex: 8,
            correctAnswer: "will be",
            options: ["will be", "would be", "is", "was"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "cond-gap-6",
        topic: "first-and-second-conditionals",
        type: "gap-fill",
        difficulty: "advanced",
        sentence: "If the flight ___ cheaper, more people would book it.",
        grammarRule: "Second Conditional — 'were' for Hypothetical 'be'",
        explanation: "In a second conditional, 'were' is the more correct form of 'be' after if, even for singular subjects like 'the flight' or 'I'.",
        tip: "Formal second conditional: If + subject + were ..., not 'was' — common with I/he/she/it too.",
        gapFill: {
            gapIndex: 3,
            correctAnswer: "were",
            options: ["were", "was", "is", "will be"],
            correctOptionIndex: 0,
        },
    },

    // ===== ERROR SPOT QUESTIONS (6 questions) =====
    // RULE: Every error is exactly ONE word. Replacing wrongWord with
    // correction must produce a 100% grammatically correct sentence.

    // split(" ") → [0=If,1=you,2=travel,3=in,4=summer,,5=the,6=city,7=will,8=being,9=very,10=crowded.]
    // words[8]="being" ✅  corrected: "If you travel in summer, the city will be very crowded." ✅
    {
        id: "cond-error-1",
        topic: "first-and-second-conditionals",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "If you travel in summer, the city will being very crowded.",
        grammarRule: "First Conditional — will + Base Verb",
        explanation: "After 'will', always use the base verb. 'Being' is a present participle and cannot follow 'will' directly like this.",
        errorSpot: {
            errorWordIndex: 8,
            wrongWord: "being",
            correction: "be",
            reason: "First conditional main clause needs will + base verb: 'will be', not 'will being'.",
            correctionOptions: ["be", "being", "is", "been"],
        },
    },

    // split(" ") → [0=If,1=I,2=have,3=more,4=free,5=time,,6=I,7=would,8=travel,9=to,10=Asia.]
    // words[2]="have" ✅  corrected: "If I had more free time, I would travel to Asia." ✅
    {
        id: "cond-error-2",
        topic: "first-and-second-conditionals",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "If I have more free time, I would travel to Asia.",
        grammarRule: "Second Conditional — If-clause (Past Simple)",
        explanation: "Because the main clause uses 'would', the if-clause must match it with the past simple, even though the meaning is present or future.",
        errorSpot: {
            errorWordIndex: 2,
            wrongWord: "have",
            correction: "had",
            reason: "A second conditional if-clause needs the past simple: 'If I had...', not the present simple 'have'.",
            correctionOptions: ["had", "have", "will have", "having"],
        },
    },

    // split(" ") → [0=If,1=you,2=don't,3=booking,4=soon,,5=the,6=flights,7=will,8=be,9=more,10=expensive.]
    // words[3]="booking" ✅  corrected: "If you don't book soon, the flights will be more expensive." ✅
    {
        id: "cond-error-3",
        topic: "first-and-second-conditionals",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "If you don't booking soon, the flights will be more expensive.",
        grammarRule: "First Conditional — Negative If-clause",
        explanation: "The present simple negative is formed with don't/doesn't + base verb, even inside an if-clause.",
        errorSpot: {
            errorWordIndex: 3,
            wrongWord: "booking",
            correction: "book",
            reason: "After 'don't', use the base verb: 'don't book', not 'don't booking'.",
            correctionOptions: ["book", "booking", "books", "booked"],
        },
    },

    // split(" ") → [0=If,1=we,2=stayed,3=in,4=a,5=small,6=hotel,,7=we,8=will,9=help,10=the,11=local,12=economy.]
    // words[8]="will" ✅  corrected: "If we stayed in a small hotel, we would help the local economy." ✅
    {
        id: "cond-error-4",
        topic: "first-and-second-conditionals",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "If we stayed in a small hotel, we will help the local economy.",
        grammarRule: "Second Conditional — Matching would with Past Simple",
        explanation: "Mixing 'if + past simple' with 'will' breaks the second conditional pattern — the result clause must use 'would'.",
        errorSpot: {
            errorWordIndex: 8,
            wrongWord: "will",
            correction: "would",
            reason: "A second conditional main clause needs 'would', not 'will', to match the past simple if-clause 'stayed'.",
            correctionOptions: ["would", "will", "will have", "would have"],
        },
    },

    // split(" ") → [0=If,1=the,2=city,3=charge,4=a,5=tourist,6=tax,,7=it,8=will,9=reduce,10=the,11=crowds.]
    // words[3]="charge" ✅  corrected: "If the city charges a tourist tax, it will reduce the crowds." ✅
    {
        id: "cond-error-5",
        topic: "first-and-second-conditionals",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "If the city charge a tourist tax, it will reduce the crowds.",
        grammarRule: "First Conditional — Subject-Verb Agreement",
        explanation: "Even inside an if-clause, the present simple follows normal subject-verb agreement rules.",
        errorSpot: {
            errorWordIndex: 3,
            wrongWord: "charge",
            correction: "charges",
            reason: "The present simple needs -s with a singular subject: 'the city charges', not 'the city charge'.",
            correctionOptions: ["charges", "charge", "charging", "charged"],
        },
    },

    // split(" ") → [0=If,1=local,2=shops,3=sold,4=fewer,5=plastic,6=bags,,7=the,8=beaches,9=would,10=being,11=cleaner.]
    // words[10]="being" ✅  corrected: "If local shops sold fewer plastic bags, the beaches would be cleaner." ✅
    {
        id: "cond-error-6",
        topic: "first-and-second-conditionals",
        type: "error-spot",
        difficulty: "advanced",
        sentence: "If local shops sold fewer plastic bags, the beaches would being cleaner.",
        grammarRule: "Second Conditional — would + Base Verb",
        explanation: "Just like 'will', 'would' is always followed by the base form of the verb, never the -ing form.",
        errorSpot: {
            errorWordIndex: 10,
            wrongWord: "being",
            correction: "be",
            reason: "The second conditional main clause needs would + base verb: 'would be', not 'would being'.",
            correctionOptions: ["be", "being", "is", "was"],
        },
    },

    // ===== MULTIPLE CHOICE QUESTIONS (7 questions) =====

    {
        id: "cond-mc-1",
        topic: "first-and-second-conditionals",
        type: "multiple-choice",
        difficulty: "beginner",
        sentence: "Choose the correct first conditional sentence.",
        grammarRule: "First Conditional — Form",
        explanation: "The first conditional is if + present simple, + will + base verb, used for real, possible future situations.",
        tip: "If + present simple, + will + base verb. Never 'will' in the if-clause.",
        multipleChoice: {
            question: "Which sentence correctly forms the first conditional?",
            correctOption: "If you visit Kyoto, you will see beautiful temples.",
            options: [
                "If you visit Kyoto, you will see beautiful temples.",
                "If you visit Kyoto, you would see beautiful temples.",
                "If you visited Kyoto, you will see beautiful temples.",
                "If you will visit Kyoto, you see beautiful temples.",
            ],
            optionExplanations: {
                "If you visit Kyoto, you will see beautiful temples.": "Correct! If + present simple, will + base verb — the standard first conditional.",
                "If you visit Kyoto, you would see beautiful temples.": "Wrong. 'Would' belongs to the second conditional, not a real future possibility.",
                "If you visited Kyoto, you will see beautiful temples.": "Wrong. The if-clause uses the past simple, which doesn't match the first conditional pattern.",
                "If you will visit Kyoto, you see beautiful temples.": "Wrong. 'Will' never goes in the if-clause, and the main clause is missing it.",
            },
        },
    },

    {
        id: "cond-mc-2",
        topic: "first-and-second-conditionals",
        type: "multiple-choice",
        difficulty: "beginner",
        sentence: "Choose the correct second conditional sentence.",
        grammarRule: "Second Conditional — Form",
        explanation: "The second conditional is if + past simple, + would + base verb, used for hypothetical or unlikely situations.",
        tip: "If + past simple, + would + base verb. Never 'would' in the if-clause.",
        multipleChoice: {
            question: "Which sentence correctly forms the second conditional?",
            correctOption: "If I had more money, I would travel first class.",
            options: [
                "If I had more money, I would travel first class.",
                "If I have more money, I would travel first class.",
                "If I had more money, I will travel first class.",
                "If I would have more money, I'd travel first class.",
            ],
            optionExplanations: {
                "If I had more money, I would travel first class.": "Correct! If + past simple, would + base verb — the standard second conditional.",
                "If I have more money, I would travel first class.": "Wrong. The if-clause needs the past simple 'had', not the present simple 'have'.",
                "If I had more money, I will travel first class.": "Wrong. 'Will' doesn't match a past simple if-clause — use 'would'.",
                "If I would have more money, I'd travel first class.": "Wrong. 'Would' never goes in the if-clause — use 'had'.",
            },
        },
    },

    {
        id: "cond-mc-3",
        topic: "first-and-second-conditionals",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "If you book a guided tour, you'll learn more about the history.",
        grammarRule: "First Conditional — Meaning",
        explanation: "First conditionals describe things that could really happen if a condition is met — not imaginary situations.",
        tip: "First conditional = a real, possible plan — not just an imaginary idea.",
        multipleChoice: {
            question: "What does this sentence tell us about the plan?",
            correctOption: "Booking a tour is a real, realistic possibility — this is a first conditional.",
            options: [
                "Booking a tour is a real, realistic possibility — this is a first conditional.",
                "Booking a tour is just an imaginary idea that probably won't happen.",
                "The speaker already booked the tour in the past.",
                "The sentence gives an instruction, not a conditional.",
            ],
            optionExplanations: {
                "Booking a tour is a real, realistic possibility — this is a first conditional.": "Correct! Present simple + will describes a real, possible future action.",
                "Booking a tour is just an imaginary idea that probably won't happen.": "Wrong. That describes a second conditional, which would use 'booked' and 'would'.",
                "The speaker already booked the tour in the past.": "Wrong. The present simple 'book' and 'you'll learn' both point to the future, not the past.",
                "The sentence gives an instruction, not a conditional.": "Wrong. It has a clear if-clause and a will-clause, so it is a conditional sentence.",
            },
        },
    },

    {
        id: "cond-mc-4",
        topic: "first-and-second-conditionals",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "If I spoke Japanese, I could get a job as a tour guide here.",
        grammarRule: "Second Conditional — Meaning",
        explanation: "Second conditionals describe imaginary or unlikely situations; the past simple 'spoke' tells us the speaker doesn't actually speak Japanese now.",
        tip: "Second conditional = an imaginary situation that isn't true right now.",
        multipleChoice: {
            question: "What kind of situation does this describe?",
            correctOption: "A hypothetical situation — in reality, the speaker doesn't speak Japanese.",
            options: [
                "A hypothetical situation — in reality, the speaker doesn't speak Japanese.",
                "A real plan the speaker is making for next month.",
                "Something that happened to the speaker in the past.",
                "An instruction the speaker is giving to someone else.",
            ],
            optionExplanations: {
                "A hypothetical situation — in reality, the speaker doesn't speak Japanese.": "Correct! The past simple 'spoke' with 'could' signals an imaginary, unreal present situation.",
                "A real plan the speaker is making for next month.": "Wrong. A real future plan would use the first conditional: 'If I speak Japanese, I can get a job.'",
                "Something that happened to the speaker in the past.": "Wrong. 'Spoke' here is not a real past event — it's the second conditional form of 'speak'.",
                "An instruction the speaker is giving to someone else.": "Wrong. The sentence is about the speaker's own imaginary situation, not an instruction.",
            },
        },
    },

    {
        id: "cond-mc-5",
        topic: "first-and-second-conditionals",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Look at these four sentences about advertising tourist spots.",
        grammarRule: "First Conditional — Common Mistakes",
        explanation: "A consistent first conditional needs the present simple in the if-clause and will + base verb in the main clause.",
        tip: "Don't mix tenses: present simple if-clause + will-clause, all the way through.",
        multipleChoice: {
            question: "Which sentence is grammatically correct?",
            correctOption: "If we advertise other places, more tourists will visit them.",
            options: [
                "If we advertise other places, more tourists will visit them.",
                "If we advertising other places, more tourists will visit them.",
                "If we advertise other places, more tourists would visit them.",
                "If we advertised other places, more tourists visit them.",
            ],
            optionExplanations: {
                "If we advertise other places, more tourists will visit them.": "Correct! First conditional: if + present simple, + will + base verb.",
                "If we advertising other places, more tourists will visit them.": "Wrong. The if-clause needs the present simple 'advertise', not the -ing form.",
                "If we advertise other places, more tourists would visit them.": "Wrong. Mixing present simple 'advertise' with 'would' breaks the pattern — use 'will' to match.",
                "If we advertised other places, more tourists visit them.": "Wrong. The main clause needs 'will visit', not the bare present simple 'visit'.",
            },
        },
    },

    {
        id: "cond-mc-6",
        topic: "first-and-second-conditionals",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Compare how a comma is used with if-clauses.",
        grammarRule: "Conditionals — Comma Rule",
        explanation: "Use a comma when the if-clause comes first. When the if-clause comes second, there is no comma.",
        tip: "If-clause first → comma. If-clause second → no comma.",
        multipleChoice: {
            question: "Which sentence uses the comma correctly?",
            correctOption: "If you travel by train, you'll avoid traffic jams.",
            options: [
                "If you travel by train, you'll avoid traffic jams.",
                "You'll avoid traffic jams, if you travel by train.",
                "If you travel by train you'll avoid traffic jams.",
                "If, you travel by train, you'll avoid traffic jams.",
            ],
            optionExplanations: {
                "If you travel by train, you'll avoid traffic jams.": "Correct! A comma is needed because the if-clause comes first.",
                "You'll avoid traffic jams, if you travel by train.": "Wrong. No comma is needed when the if-clause comes second.",
                "If you travel by train you'll avoid traffic jams.": "Wrong. A comma is missing — the if-clause comes first here.",
                "If, you travel by train, you'll avoid traffic jams.": "Wrong. The comma is in the wrong place, right after 'If'.",
            },
        },
    },

    {
        id: "cond-mc-7",
        topic: "first-and-second-conditionals",
        type: "multiple-choice",
        difficulty: "advanced",
        sentence: "Choose the sentence that correctly uses 'If I were you' for advice.",
        grammarRule: "Second Conditional — 'If I were you'",
        explanation: "'If I were you, I'd...' is a fixed way to give advice. 'Were' (not 'was') is the standard form, and 'would'/'d goes in the main clause.",
        tip: "If I were you, I'd... — a fixed phrase for advice. Always 'were'.",
        multipleChoice: {
            question: "Which sentence gives advice correctly?",
            correctOption: "If I were you, I'd avoid travelling in peak season.",
            options: [
                "If I were you, I'd avoid travelling in peak season.",
                "If I am you, I'd avoid travelling in peak season.",
                "If I was you, I will avoid travelling in peak season.",
                "If I will be you, I'd avoid travelling in peak season.",
            ],
            optionExplanations: {
                "If I were you, I'd avoid travelling in peak season.": "Correct! 'If I were you' is the standard second conditional advice phrase.",
                "If I am you, I'd avoid travelling in peak season.": "Wrong. The present simple 'am' cannot replace the past simple 'were' here.",
                "If I was you, I will avoid travelling in peak season.": "Wrong. 'Were' is the standard form, and 'will' doesn't match a second conditional if-clause.",
                "If I will be you, I'd avoid travelling in peak season.": "Wrong. 'Will' never goes in the if-clause of a conditional.",
            },
        },
    },

    // ===== WORD TRANSFORM QUESTIONS (6 questions) =====

    {
        id: "cond-wt-1",
        topic: "first-and-second-conditionals",
        type: "word-transform",
        difficulty: "beginner",
        sentence: "If the weather ___ (improve) this weekend, we'll visit the old town.",
        grammarRule: "First Conditional — If-clause (3rd Person -s)",
        explanation: "The if-clause of a first conditional uses the present simple; with a singular subject like 'the weather', add -s.",
        tip: "Present simple + -s for he/she/it, even inside an if-clause.",
        wordTransform: {
            baseWord: "improve",
            correctAnswer: "improves",
        },
    },

    {
        id: "cond-wt-2",
        topic: "first-and-second-conditionals",
        type: "word-transform",
        difficulty: "beginner",
        sentence: "If we leave now, we ___ (catch) the early train.",
        grammarRule: "First Conditional — Main Clause (will + Base Verb)",
        explanation: "The main clause of a first conditional needs will + the base form of the verb.",
        tip: "Will + base verb, never will + -s or will + -ing.",
        wordTransform: {
            baseWord: "catch",
            correctAnswer: "will catch",
        },
    },

    {
        id: "cond-wt-3",
        topic: "first-and-second-conditionals",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "If I ___ (speak) the language, I would feel more confident travelling alone.",
        grammarRule: "Second Conditional — If-clause (Past Simple)",
        explanation: "The if-clause of a second conditional uses the past simple form of the verb, here the irregular past of 'speak'.",
        tip: "Second conditional if-clause = past simple, even for irregular verbs: speak → spoke.",
        wordTransform: {
            baseWord: "speak",
            correctAnswer: "spoke",
        },
    },

    {
        id: "cond-wt-4",
        topic: "first-and-second-conditionals",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "If the museum offered online booking, fewer tourists ___ (wait) in long queues.",
        grammarRule: "Second Conditional — Main Clause (would + Base Verb)",
        explanation: "The main clause of a second conditional needs would + the base form of the verb.",
        tip: "Would + base verb for the imagined result of a hypothetical if-clause.",
        wordTransform: {
            baseWord: "wait",
            correctAnswer: "would wait",
        },
    },

    {
        id: "cond-wt-5",
        topic: "first-and-second-conditionals",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "If the airline cancels the flight, passengers ___ (receive) a refund.",
        grammarRule: "First Conditional — Main Clause (will + Base Verb)",
        explanation: "Even with a plural subject like 'passengers', the main clause still uses will + base verb — will never changes form.",
        tip: "Will is the same for every subject: I/you/he/we/they will + base verb.",
        wordTransform: {
            baseWord: "receive",
            correctAnswer: "will receive",
        },
    },

    {
        id: "cond-wt-6",
        topic: "first-and-second-conditionals",
        type: "word-transform",
        difficulty: "advanced",
        sentence: "If I ___ (be) you, I'd book the hotel in advance.",
        grammarRule: "Second Conditional — 'If I were you'",
        explanation: "'If I were you' is the standard second conditional form for giving advice — 'were' is used instead of 'was', even with 'I'.",
        tip: "If I were you, ... — a fixed phrase for advice; always 'were', never 'was'.",
        wordTransform: {
            baseWord: "be",
            correctAnswer: "were",
        },
    },
];

export const firstAndSecondConditionalsTopic: GrammarTopic = {
    id: "first-and-second-conditionals",
    level: "B1",
    name: "First and Second Conditionals",
    description: "Practise real future possibilities with the first conditional and hypothetical ideas with the second conditional, using 'Good tourists' travel situations.",
    lesson: "Lesson 7A",
    icon: "🧳",
    cards: [
        {
            id: "cond-card-1",
            rule: "First conditional: if + present simple, + will",
            example: "If you ___ (book) early, you'll get a cheaper flight.",
            answer: "book",
            explanation: "The first conditional describes a real, possible situation in the future: if + present simple, will + base verb.",
            examples: ["If it rains, we'll stay at the hotel.", "If you arrive late, you'll miss the tour."],
            ua: "First conditional = реальна майбутня умова: if + Present Simple, will.",
        },
        {
            id: "cond-card-2",
            rule: "The if-clause can come first or second",
            example: "You'll save money if you ___ (travel) out of season.",
            answer: "travel",
            explanation: "The if-clause can come first (If you travel out of season, you'll save money) or second (You'll save money if you travel out of season). Use a comma only when if comes first.",
            examples: ["If we leave now, we'll avoid the traffic.", "We'll avoid the traffic if we leave now."],
            ua: "If-речення може стояти першим (з комою) або другим (без коми).",
        },
        {
            id: "cond-card-3",
            rule: "Second conditional: if + past simple, + would",
            example: "If I ___ (have) more holiday, I'd travel more.",
            answer: "had",
            explanation: "The second conditional describes a hypothetical or unlikely situation: if + past simple, would + base verb.",
            examples: ["If she spoke French, she'd apply for the Paris job.", "If we stayed longer, we'd see more of the city."],
            ua: "Second conditional = уявна умова: if + Past Simple, would.",
        },
        {
            id: "cond-card-4",
            rule: "If I were you (not was)",
            example: "If I ___ (be) you, I'd pack a lighter suitcase.",
            answer: "were",
            explanation: "In the second conditional, 'were' is the standard form of 'be' for every subject, including I/he/she — 'was' is only informal.",
            examples: ["If he were older, he'd travel alone.", "If it were cheaper, I'd visit twice a year."],
            ua: "У другому conditional частіше кажуть were, навіть для I/he/she, не was.",
        },
        {
            id: "cond-card-5",
            rule: "will only in the main clause",
            example: "If the flight ___ (be) delayed, we'll miss the connection.",
            answer: "is",
            explanation: "In a first conditional, the if-clause never has 'will' — it uses the present simple. 'Will' only appears in the main clause.",
            examples: ["If you don't hurry, you'll miss the bus.", "If the shop is closed, we'll come back tomorrow."],
            ua: "В if-частині ніколи немає will — тільки Present Simple.",
        },
        {
            id: "cond-card-6",
            rule: "would only in the main clause",
            example: "If I ___ (know) the language, I'd feel more confident.",
            answer: "knew",
            explanation: "In a second conditional, the if-clause never has 'would' — it uses the past simple. 'Would' only appears in the main clause.",
            examples: ["If they offered a discount, we'd stay longer.", "If the museum were open, we'd visit today."],
            ua: "В if-частині ніколи немає would — тільки Past Simple.",
        },
        {
            id: "cond-card-7",
            rule: "First = real plan, second = imaginary idea",
            example: "If I ___ (go) to Peru next year, I'll see Machu Picchu.",
            answer: "go",
            explanation: "Use the first conditional for a real plan you might actually do. Use the second conditional for an imaginary idea: If I went to Peru, I'd see Machu Picchu.",
            examples: ["If we visit Japan, we'll try sushi in Tokyo.", "If we visited Japan, we'd try sushi in Tokyo."],
            ua: "First = реальний план; second = уявна чи малоймовірна ідея.",
        },
        {
            id: "cond-card-8",
            rule: "Contractions: 'll and 'd in speech",
            example: "If you ask politely, people ___ (will) usually help you.",
            answer: "will",
            explanation: "In speech, will often contracts to 'll (you'll, it'll) and would to 'd (I'd, we'd). Both full and contracted forms are correct in writing.",
            examples: ["I'll call you when the train arrives.", "We'd love to visit again next year."],
            ua: "У розмові will → 'll, would → 'd: you'll, we'd.",
        },
    ],
    rules: firstAndSecondConditionals,
};

export default firstAndSecondConditionals;
