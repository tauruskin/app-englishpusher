/**
 * EnglishPusher Grammar Testing - Modals for Rules and Advice
 * B1 Level (Speak Out) - Lesson 4A
 *
 * 6 gap-fill, 6 error-spot, 7 multiple-choice, 6 word-transform = 25 questions
 * VERIFIED: All error-spot indexes checked against split(" ") positions.
 */

import type { GrammarQuestion, GrammarTopic } from "../types.ts";

export const modalsRulesAdviceQuestions: GrammarQuestion[] = [

    // ===== GAP FILL QUESTIONS (6 questions) =====

    {
        id: "mra-gap-1",
        topic: "modals-rules-advice",
        type: "gap-fill",
        difficulty: "beginner",
        sentence: "You ___ drink and drive. It's extremely dangerous and against the law.",
        grammarRule: "'mustn't' — Prohibition (Forbidden)",
        explanation: "'Mustn't' means something is forbidden — there is no choice at all. 'Don't have to' or 'needn't' would mean the opposite: it isn't necessary, but you still could.",
        tip: "mustn't = forbidden, no choice. don't have to / needn't = not necessary, but still allowed.",
        gapFill: {
            gapIndex: 1,
            correctAnswer: "mustn't",
            options: ["mustn't", "don't have to", "needn't", "shouldn't"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "mra-gap-2",
        topic: "modals-rules-advice",
        type: "gap-fill",
        difficulty: "beginner",
        sentence: "You ___ pay to enter the museum on Sundays - it's free for everyone.",
        grammarRule: "'don't have to' — No Obligation (Optional)",
        explanation: "'Don't have to' means something isn't necessary — you have a choice. 'Mustn't' would mean entering is forbidden, which changes the meaning completely.",
        tip: "don't have to = optional, your choice. mustn't = forbidden, no choice.",
        gapFill: {
            gapIndex: 1,
            correctAnswer: "don't have to",
            options: ["don't have to", "mustn't", "shouldn't", "can't"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "mra-gap-3",
        topic: "modals-rules-advice",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "I ___ wear a uniform at work. It's the company's rule, not my choice.",
        grammarRule: "'have to' — External Obligation (Someone Else's Rule)",
        explanation: "'Have to' expresses an obligation that comes from outside — a rule made by someone else, like an employer or the law.",
        tip: "have to = someone else's rule. must = my own decision or feeling.",
        gapFill: {
            gapIndex: 1,
            correctAnswer: "have to",
            options: ["have to", "don't have to", "shouldn't", "needn't"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "mra-gap-4",
        topic: "modals-rules-advice",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "I ___ call my mum tonight - I promised her I would.",
        grammarRule: "'must' — Personal Obligation (Speaker's Own Feeling)",
        explanation: "'Must' expresses something the speaker feels is important or necessary themselves — a personal obligation, not an outside rule.",
        tip: "must = I think it's necessary. have to = a rule says it's necessary.",
        gapFill: {
            gapIndex: 1,
            correctAnswer: "must",
            options: ["must", "mustn't", "needn't", "shouldn't"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "mra-gap-5",
        topic: "modals-rules-advice",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "You ___ try the new Italian restaurant on Main Street - the food is amazing.",
        grammarRule: "'should' — Giving Advice",
        explanation: "'Should' gives friendly advice or a recommendation — it's a good idea, but it isn't an obligation.",
        tip: "should = good idea (advice). must / have to = necessary (obligation).",
        gapFill: {
            gapIndex: 1,
            correctAnswer: "should",
            options: ["should", "shouldn't", "must", "mustn't"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "mra-gap-6",
        topic: "modals-rules-advice",
        type: "gap-fill",
        difficulty: "advanced",
        sentence: "You ___ bring any food to the picnic - we've already bought enough for everyone.",
        grammarRule: "'needn't' — Not Necessary",
        explanation: "'Needn't' means it isn't necessary — the same meaning as 'don't have to', though a little more formal.",
        tip: "needn't = don't have to (not necessary). Both are the opposite of must / have to.",
        gapFill: {
            gapIndex: 1,
            correctAnswer: "needn't",
            options: ["needn't", "mustn't", "shouldn't", "can't"],
            correctOptionIndex: 0,
        },
    },

    // ===== ERROR SPOT QUESTIONS (6 questions) =====
    // RULE: Every error is exactly ONE word. Replacing wrongWord with correction
    // must produce a 100% grammatically correct sentence with no leftover errors.

    // split(" ") → [0=She,1=must,2=leaves,3=now,4=because,5=the,6=meeting,7=starts,8=in,9=five,10=minutes.]
    // words[2]="leaves" ✅  corrected: "She must leave now because the meeting starts in five minutes." ✅
    {
        id: "mra-error-1",
        topic: "modals-rules-advice",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "She must leaves now because the meeting starts in five minutes.",
        grammarRule: "Modal 'must' + Bare Infinitive",
        explanation: "Modals like 'must' are always followed by the base form of the verb — never add -s, even for he/she/it.",
        errorSpot: {
            errorWordIndex: 2,
            wrongWord: "leaves",
            correction: "leave",
            reason: "After 'must', use the base form: 'must leave', not 'must leaves'.",
            correctionOptions: ["leave", "leaves", "leaving", "to leave"],
        },
    },

    // split(" ") → [0=He,1=doesn't,2=has,3=to,4=work,5=on,6=Saturdays,7=this,8=month.]
    // words[2]="has" ✅  corrected: "He doesn't have to work on Saturdays this month." ✅
    {
        id: "mra-error-2",
        topic: "modals-rules-advice",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "He doesn't has to work on Saturdays this month.",
        grammarRule: "'have to' — Negative Form (doesn't have to)",
        explanation: "In negative sentences with 'have to', the auxiliary 'doesn't' already carries the -s, so the main verb returns to its base form.",
        errorSpot: {
            errorWordIndex: 2,
            wrongWord: "has",
            correction: "have",
            reason: "'Doesn't' already has the -s, so use the base form: 'doesn't have to', not 'doesn't has to'.",
            correctionOptions: ["have", "has", "having", "had"],
        },
    },

    // split(" ") → [0=You,1=mustn't,2=worrying,3=about,4=the,5=exam.,6=You,7=have,8=prepared,9=really,10=well.]
    // words[2]="worrying" ✅  corrected: "You mustn't worry about the exam. You have prepared really well." ✅
    {
        id: "mra-error-3",
        topic: "modals-rules-advice",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "You mustn't worrying about the exam. You have prepared really well.",
        grammarRule: "Modal 'mustn't' + Bare Infinitive",
        explanation: "Modals are always followed by the base form of the verb, never the -ing form.",
        errorSpot: {
            errorWordIndex: 2,
            wrongWord: "worrying",
            correction: "worry",
            reason: "After 'mustn't', use the base form: 'mustn't worry', not 'mustn't worrying'.",
            correctionOptions: ["worry", "worrying", "worries", "to worry"],
        },
    },

    // split(" ") → [0=We,1=needn't,2=buying,3=tickets,4=in,5=advance,6=-,7=we,8=can,9=pay,10=at,11=the,12=door.]
    // words[2]="buying" ✅  corrected: "We needn't buy tickets in advance - we can pay at the door." ✅
    {
        id: "mra-error-4",
        topic: "modals-rules-advice",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "We needn't buying tickets in advance - we can pay at the door.",
        grammarRule: "Modal 'needn't' + Bare Infinitive",
        explanation: "'Needn't' is a modal verb, so it's followed by the base form of the verb.",
        errorSpot: {
            errorWordIndex: 2,
            wrongWord: "buying",
            correction: "buy",
            reason: "After 'needn't', use the base form: 'needn't buy', not 'needn't buying'.",
            correctionOptions: ["buy", "buying", "bought", "to buy"],
        },
    },

    // split(" ") → [0=She,1=should,2=calls,3=her,4=landlord,5=about,6=the,7=broken,8=heater.]
    // words[2]="calls" ✅  corrected: "She should call her landlord about the broken heater." ✅
    {
        id: "mra-error-5",
        topic: "modals-rules-advice",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "She should calls her landlord about the broken heater.",
        grammarRule: "Modal 'should' + Bare Infinitive",
        explanation: "After 'should', use the base form of the verb, not the third person -s form.",
        errorSpot: {
            errorWordIndex: 2,
            wrongWord: "calls",
            correction: "call",
            reason: "After 'should', use the base form: 'should call', not 'should calls'.",
            correctionOptions: ["call", "calls", "calling", "to call"],
        },
    },

    // split(" ") → [0=Does,1=she,2=has,3=to,4=finish,5=the,6=project,7=by,8=Monday?]
    // words[2]="has" ✅  corrected: "Does she have to finish the project by Monday?" ✅
    {
        id: "mra-error-6",
        topic: "modals-rules-advice",
        type: "error-spot",
        difficulty: "advanced",
        sentence: "Does she has to finish the project by Monday?",
        grammarRule: "'have to' — Question Form (Does ... have to)",
        explanation: "In questions with 'have to', the auxiliary 'does' already carries the -s, so 'have' stays in its base form.",
        errorSpot: {
            errorWordIndex: 2,
            wrongWord: "has",
            correction: "have",
            reason: "'Does' already has the -s, so use the base form: 'Does she have to...?', not 'Does she has to...?'",
            correctionOptions: ["have", "has", "having", "had"],
        },
    },

    // ===== MULTIPLE CHOICE QUESTIONS (7 questions) =====

    {
        id: "mra-mc-1",
        topic: "modals-rules-advice",
        type: "multiple-choice",
        difficulty: "beginner",
        sentence: "Choose the sentence that means something is forbidden:",
        grammarRule: "'mustn't' — Prohibition",
        explanation: "'Mustn't' means something is not allowed at all — there is no choice.",
        tip: "mustn't = forbidden. don't have to / needn't = not necessary, but still allowed.",
        multipleChoice: {
            question: "Which sentence means it is not allowed?",
            correctOption: "You mustn't park here - it's a fire exit.",
            options: [
                "You mustn't park here - it's a fire exit.",
                "You don't have to park here - there's space elsewhere.",
                "You needn't park here.",
                "You shouldn't park here, but you can if you want.",
            ],
            optionExplanations: {
                "You mustn't park here - it's a fire exit.": "Correct! 'Mustn't' means it's forbidden - there is no choice.",
                "You don't have to park here - there's space elsewhere.": "Wrong. This means parking here isn't necessary, not that it's forbidden.",
                "You needn't park here.": "Wrong. This means parking here isn't necessary, not that it's forbidden.",
                "You shouldn't park here, but you can if you want.": "Wrong. This is just advice against it, not a strict prohibition.",
            },
        },
    },

    {
        id: "mra-mc-2",
        topic: "modals-rules-advice",
        type: "multiple-choice",
        difficulty: "beginner",
        sentence: "Choose the sentence where the obligation comes from an outside rule, not the speaker's own feeling:",
        grammarRule: "'have to' vs 'must' — External vs Personal Obligation",
        explanation: "'Have to' describes rules made by someone else, like a law or an employer. 'Must' usually describes something the speaker personally feels is necessary.",
        tip: "have to = someone else's rule. must = my own decision or feeling.",
        multipleChoice: {
            question: "Which sentence describes an obligation set by someone else?",
            correctOption: "Employees have to wear safety helmets on the building site.",
            options: [
                "Employees have to wear safety helmets on the building site.",
                "I must remember to water my plants - I always forget.",
                "You should drink more water every day.",
                "We needn't finish the whole project today.",
            ],
            optionExplanations: {
                "Employees have to wear safety helmets on the building site.": "Correct! This is a workplace safety rule, not the speaker's own feeling - 'have to' fits.",
                "I must remember to water my plants - I always forget.": "Wrong. This is the speaker's own personal reminder, which fits 'must', not an outside rule.",
                "You should drink more water every day.": "Wrong. This is advice, not an obligation at all.",
                "We needn't finish the whole project today.": "Wrong. This expresses a lack of necessity, not an obligation.",
            },
        },
    },

    {
        id: "mra-mc-3",
        topic: "modals-rules-advice",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the sentence that means 'it isn't necessary, but you can if you want':",
        grammarRule: "'don't have to' — Lack of Obligation (not mustn't)",
        explanation: "'Don't have to' means something is not necessary, but it's still allowed — the choice is yours. It is NOT the same as 'mustn't', which means forbidden.",
        tip: "don't have to = optional. mustn't = forbidden. Never confuse them!",
        multipleChoice: {
            question: "Which sentence expresses a lack of obligation, not a prohibition?",
            correctOption: "You don't have to answer every question - just do your best.",
            options: [
                "You don't have to answer every question - just do your best.",
                "You mustn't answer every question.",
                "You shouldn't answer every question.",
                "You can't answer every question.",
            ],
            optionExplanations: {
                "You don't have to answer every question - just do your best.": "Correct! This means answering every question isn't necessary, but it's still allowed.",
                "You mustn't answer every question.": "Wrong. This means answering every question is forbidden, which is a much stronger, different meaning.",
                "You shouldn't answer every question.": "Wrong. This is advice against doing it, not a statement about necessity.",
                "You can't answer every question.": "Wrong. This means it isn't possible, not that it's unnecessary.",
            },
        },
    },

    {
        id: "mra-mc-4",
        topic: "modals-rules-advice",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Which sentence has almost the same meaning as 'You don't have to pay now'?",
        grammarRule: "'needn't' = 'don't have to'",
        explanation: "'Needn't' and 'don't have to' both mean something is not necessary. 'Needn't' sounds a little more formal.",
        tip: "needn't ≈ don't have to (not necessary). Different from mustn't (forbidden).",
        multipleChoice: {
            question: "Choose the sentence with the same meaning.",
            correctOption: "You needn't pay now.",
            options: [
                "You needn't pay now.",
                "You mustn't pay now.",
                "You shouldn't pay now.",
                "You can't pay now.",
            ],
            optionExplanations: {
                "You needn't pay now.": "Correct! 'Needn't' means it's not necessary, just like 'don't have to'.",
                "You mustn't pay now.": "Wrong. This means paying now is forbidden - the opposite kind of meaning.",
                "You shouldn't pay now.": "Wrong. This is advice against paying now, not a statement about necessity.",
                "You can't pay now.": "Wrong. This means it isn't possible to pay now.",
            },
        },
    },

    {
        id: "mra-mc-5",
        topic: "modals-rules-advice",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "A friend asks what to do about a headache. Choose the sentence that gives ADVICE, not an obligation:",
        grammarRule: "'should' — Advice, Not Obligation",
        explanation: "'Should' gives a recommendation or opinion — it's a good idea, but the person is still free to ignore it. 'Must'/'have to'/'need to' suggest something much stronger or compulsory.",
        tip: "should = friendly advice. must / have to = obligation, no choice.",
        multipleChoice: {
            question: "Which sentence is advice, not a strict rule?",
            correctOption: "You should take a painkiller and rest for a while.",
            options: [
                "You should take a painkiller and rest for a while.",
                "You must take a painkiller right now.",
                "You have to see a doctor immediately.",
                "You need to call an ambulance.",
            ],
            optionExplanations: {
                "You should take a painkiller and rest for a while.": "Correct! 'Should' gives a gentle recommendation, not a strict rule.",
                "You must take a painkiller right now.": "Wrong. 'Must' sounds like a strong personal obligation, far stronger than friendly advice.",
                "You have to see a doctor immediately.": "Wrong. 'Have to' sounds like an obligation, not a suggestion.",
                "You need to call an ambulance.": "Wrong. 'Need to' expresses necessity, which is much stronger than advice.",
            },
        },
    },

    {
        id: "mra-mc-6",
        topic: "modals-rules-advice",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Choose the sentence that gives advice against doing something, rather than a strict prohibition:",
        grammarRule: "'shouldn't' vs 'mustn't' — Advice Against vs Forbidden",
        explanation: "'Shouldn't' means it's not a good idea — advice, not a rule. 'Mustn't' means it's forbidden; there is no choice.",
        tip: "shouldn't = bad idea (advice). mustn't = forbidden (no choice).",
        multipleChoice: {
            question: "Which sentence is advice against something, rather than a prohibition?",
            correctOption: "You shouldn't eat so much junk food - it's not good for you.",
            options: [
                "You shouldn't eat so much junk food - it's not good for you.",
                "You mustn't eat in the exam room.",
                "You can't eat in the library.",
                "You don't have to eat if you're not hungry.",
            ],
            optionExplanations: {
                "You shouldn't eat so much junk food - it's not good for you.": "Correct! 'Shouldn't' is advice against something - it's a bad idea, but still your choice.",
                "You mustn't eat in the exam room.": "Wrong. 'Mustn't' means eating is forbidden there - a strict rule, not advice.",
                "You can't eat in the library.": "Wrong. 'Can't' here means it's not permitted/possible, like a rule.",
                "You don't have to eat if you're not hungry.": "Wrong. This expresses a lack of necessity, not advice against something.",
            },
        },
    },

    {
        id: "mra-mc-7",
        topic: "modals-rules-advice",
        type: "multiple-choice",
        difficulty: "advanced",
        sentence: "Choose the sentence that correctly says that something IS necessary:",
        grammarRule: "'need to' vs 'needn't' — Necessity vs No Necessity",
        explanation: "'Need to' expresses necessity, similar to 'have to'. 'Needn't' (with an added -n't) means the opposite — not necessary — so the two are easy to confuse.",
        tip: "need to = necessary. needn't = NOT necessary. One suffix apart, opposite meanings!",
        multipleChoice: {
            question: "Which sentence correctly says that something is necessary?",
            correctOption: "You need to renew your passport before it expires.",
            options: [
                "You need to renew your passport before it expires.",
                "You needn't renew your passport before it expires.",
                "You mustn't renew your passport before it expires.",
                "You shouldn't renew your passport before it expires.",
            ],
            optionExplanations: {
                "You need to renew your passport before it expires.": "Correct! 'Need to' expresses necessity - you must do this.",
                "You needn't renew your passport before it expires.": "Wrong. 'Needn't' means the opposite - it's not necessary.",
                "You mustn't renew your passport before it expires.": "Wrong. This would mean renewing it is forbidden, which makes no sense here.",
                "You shouldn't renew your passport before it expires.": "Wrong. This would mean renewing it is a bad idea, which also makes no sense here.",
            },
        },
    },

    // ===== WORD TRANSFORM QUESTIONS (6 questions) =====

    {
        id: "mra-wt-1",
        topic: "modals-rules-advice",
        type: "word-transform",
        difficulty: "beginner",
        sentence: "She ___ to finish her homework before dinner every day.",
        grammarRule: "'have to' — Third Person Present",
        explanation: "'Have to' behaves like an ordinary verb grammatically — add -s for he/she/it in the present simple: 'has to'.",
        tip: "have to → has to for he/she/it. Real modals (must, should) never add -s.",
        wordTransform: {
            baseWord: "have",
            correctAnswer: "has",
        },
    },

    {
        id: "mra-wt-2",
        topic: "modals-rules-advice",
        type: "word-transform",
        difficulty: "beginner",
        sentence: "He ___ to see a doctor about his back.",
        grammarRule: "'need to' — Third Person Present",
        explanation: "'Need to' also behaves like an ordinary verb — add -s for he/she/it: 'needs to'.",
        tip: "need to → needs to for he/she/it, just like have to → has to.",
        wordTransform: {
            baseWord: "need",
            correctAnswer: "needs",
        },
    },

    {
        id: "mra-wt-3",
        topic: "modals-rules-advice",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "We ___ to wait two hours at the airport yesterday because of a delay.",
        grammarRule: "'have to' — Past Simple (had to)",
        explanation: "'Must' has no past form, so 'had to' is used to express obligation in the past.",
        tip: "must → had to in the past. There is no 'musted'!",
        wordTransform: {
            baseWord: "have",
            correctAnswer: "had",
        },
    },

    {
        id: "mra-wt-4",
        topic: "modals-rules-advice",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "You ___ to show your passport at the border tomorrow.",
        grammarRule: "'have to' — Future (will have to)",
        explanation: "For future obligation, use 'will have to'. You cannot combine 'will' with 'must' in this way.",
        tip: "Future obligation → will have to, never 'will must'.",
        wordTransform: {
            baseWord: "have",
            correctAnswer: "will have",
        },
    },

    {
        id: "mra-wt-5",
        topic: "modals-rules-advice",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "I ___ to work this weekend. My boss said I can take the days off.",
        grammarRule: "'have to' — Negative (No Obligation)",
        explanation: "'Don't have to' means something isn't necessary — you have a choice. It is not the same as 'mustn't', which means forbidden.",
        tip: "don't have to = optional, your choice. mustn't = forbidden, no choice.",
        wordTransform: {
            baseWord: "have",
            correctAnswer: "don't have",
        },
    },

    {
        id: "mra-wt-6",
        topic: "modals-rules-advice",
        type: "word-transform",
        difficulty: "advanced",
        sentence: "You ___ worry about the interview. You're well prepared.",
        grammarRule: "'need to' — Negative (No Necessity)",
        explanation: "'Don't need to' and 'needn't' both mean something isn't necessary. Both forms are correct, though 'needn't' is a little more formal.",
        tip: "don't need to = needn't = not necessary. Never confuse with mustn't (forbidden).",
        wordTransform: {
            baseWord: "need",
            correctAnswer: "don't need to",
            alternativeAnswers: ["needn't"],
        },
    },
];

export const modalsRulesAdviceTopic: GrammarTopic = {
    id: "modals-rules-advice",
    level: "B1",
    name: "Modals for Rules and Advice",
    description: "Learn how to use must, mustn't, have to, don't have to, need to, needn't, should and shouldn't to talk about obligation, prohibition, necessity and advice.",
    lesson: "Lesson 4A",
    icon: "🚦",
    cards: [
        {
            id: "mra-card-1",
            rule: "must — strong obligation (what I think is necessary)",
            example: "I ___ finish this project tonight - I promised my boss.",
            answer: "must",
            explanation: "Must expresses something the speaker feels is necessary or important themselves, not a rule made by someone else. It often sounds more personal and urgent than have to.",
            examples: ["I must remember to call the dentist today.", "You must try this cake - it's amazing!"],
            ua: "must — особисте відчуття обов'язку: «я мушу», не зовнішнє правило.",
        },
        {
            id: "mra-card-2",
            rule: "mustn't — prohibition (not allowed)",
            example: "You ___ touch that wire - it's extremely dangerous.",
            answer: "mustn't",
            explanation: "Mustn't means something is forbidden or not allowed at all - there is no choice. It is very different from don't have to, which means something is simply not necessary.",
            examples: ["Passengers mustn't open the doors while the train is moving.", "You mustn't tell anyone my secret."],
            ua: "mustn't — заборонено: «не можна», а не просто «не обов'язково».",
        },
        {
            id: "mra-card-3",
            rule: "have to — obligation from outside (a rule, not your choice)",
            example: "In this office, staff ___ clock in before nine.",
            answer: "have to",
            explanation: "Have to describes an obligation that comes from somewhere else - a law, a workplace, a school. It feels less personal than must, which usually expresses the speaker's own opinion.",
            examples: ["In Japan, you have to take your shoes off before entering a house.", "Drivers have to stop at a red light."],
            ua: "have to — обов'язок ззовні (закон, правило), не особиста думка.",
        },
        {
            id: "mra-card-4",
            rule: "don't have to — no obligation (it's your choice)",
            example: "You ___ wear a suit to the interview - smart casual is fine.",
            answer: "don't have to",
            explanation: "Don't have to means something isn't necessary, but you're still allowed to do it if you want. This is completely different from mustn't, which means it isn't allowed at all.",
            examples: ["You don't have to come to the party if you're tired.", "She doesn't have to work on Fridays this semester."],
            ua: "don't have to — не обов'язково (можна, якщо хочеш), на відміну від mustn't.",
        },
        {
            id: "mra-card-5",
            rule: "need to — necessity (similar to have to)",
            example: "We ___ leave soon if we want to catch the train.",
            answer: "need to",
            explanation: "Need to expresses necessity, very similarly to have to. It can describe obligations from outside or things the speaker feels are important.",
            examples: ["I need to buy some milk on the way home.", "Does she need to sign the form today?"],
            ua: "need to ≈ have to — потрібно, необхідно.",
        },
        {
            id: "mra-card-6",
            rule: "needn't / don't need to — not necessary",
            example: "You ___ bring an umbrella - the forecast says it won't rain.",
            answer: "needn't",
            explanation: "Needn't and don't need to both mean something isn't necessary. They have almost the same meaning as don't have to.",
            examples: ["You needn't apologise - it wasn't your fault.", "We don't need to hurry; we have plenty of time."],
            ua: "needn't ≈ don't need to ≈ don't have to — не обов'язково.",
        },
        {
            id: "mra-card-7",
            rule: "should — giving advice (a good idea)",
            example: "You ___ drink more water in this hot weather.",
            answer: "should",
            explanation: "Should gives advice or a recommendation. It suggests something is a good idea, but the person is free to decide for themselves.",
            examples: ["You should see a dentist about that tooth.", "We should leave earlier next time to avoid the traffic."],
            ua: "should — порада, гарна ідея, але не обов'язок.",
        },
        {
            id: "mra-card-8",
            rule: "shouldn't — advice against (not a good idea)",
            example: "You ___ stay up so late before an exam.",
            answer: "shouldn't",
            explanation: "Shouldn't means something is not a good idea - it's advice against doing it. It's much weaker than mustn't, which means something is forbidden.",
            examples: ["You shouldn't believe everything you read online.", "He shouldn't drive if he's that tired."],
            ua: "shouldn't — погана ідея (порада), а не заборона, як mustn't.",
        },
    ],
    rules: modalsRulesAdviceQuestions,
};

export default modalsRulesAdviceQuestions;
