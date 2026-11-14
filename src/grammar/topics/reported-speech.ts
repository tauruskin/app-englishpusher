/**
 * EnglishPusher Grammar Testing - Reported Speech
 * B1 Level (Speakout) - Unit 5, Lesson B
 *
 * 6 gap-fill, 6 error-spot, 7 multiple-choice, 6 word-transform = 25 questions
 * VERIFIED: All error-spot indexes checked against split(" ") positions.
 */

import type { GrammarQuestion, GrammarTopic } from "../types.ts";

export const reportedSpeechQuestions: GrammarQuestion[] = [

    // ===== GAP FILL (6) =====

    {
        id: "rs-gap-1",
        topic: "reported-speech",
        type: "gap-fill",
        difficulty: "beginner",
        sentence: "He said that he ___ in Madrid.",
        grammarRule: "Present Simple → Past Simple in Reported Speech",
        explanation: "'Live' is present simple in direct speech ('I live in Madrid'). After a past reporting verb, it moves one tense back to past simple: lived.",
        tip: "Reporting verb in the past (said/told) → shift the original verb one tense back.",
        gapFill: {
            gapIndex: 4,
            correctAnswer: "lived",
            options: ["lived", "lives", "live", "living"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "rs-gap-2",
        topic: "reported-speech",
        type: "gap-fill",
        difficulty: "beginner",
        sentence: "They said that they ___ a documentary.",
        grammarRule: "Present Continuous → Past Continuous in Reported Speech",
        explanation: "'Are watching' is present continuous in direct speech ('We are watching a documentary'). In reported speech it backshifts to past continuous: were watching.",
        tip: "Present continuous (is/am/are + -ing) → past continuous (was/were + -ing) in reported speech.",
        gapFill: {
            gapIndex: 4,
            correctAnswer: "were watching",
            options: ["were watching", "are watching", "watched", "watching"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "rs-gap-3",
        topic: "reported-speech",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "She told me that she ___ the report.",
        grammarRule: "Present Perfect → Past Perfect in Reported Speech",
        explanation: "'I've finished the report' uses present perfect. In reported speech, present perfect backshifts to past perfect: had finished.",
        tip: "Present perfect (have/has + past participle) → past perfect (had + past participle) in reported speech.",
        gapFill: {
            gapIndex: 5,
            correctAnswer: "had finished",
            options: ["had finished", "has finished", "finished", "was finishing"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "rs-gap-4",
        topic: "reported-speech",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "They said that they ___ that film the week before.",
        grammarRule: "Past Simple → Past Perfect in Reported Speech",
        explanation: "'We saw that film last week' uses past simple. In reported speech, past simple often moves one step further back to past perfect: had seen.",
        tip: "Past simple can backshift to past perfect in reported speech, especially when it happened before something else.",
        gapFill: {
            gapIndex: 4,
            correctAnswer: "had seen",
            options: ["had seen", "saw", "have seen", "see"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "rs-gap-5",
        topic: "reported-speech",
        type: "gap-fill",
        difficulty: "intermediate",
        sentence: "He told us that he ___ three languages.",
        grammarRule: "Can → Could in Reported Speech",
        explanation: "'I can speak three languages' uses 'can'. In reported speech, 'can' always backshifts to 'could'.",
        tip: "can → could in reported speech, just like will → would.",
        gapFill: {
            gapIndex: 5,
            correctAnswer: "could speak",
            options: ["could speak", "can speak", "speaks", "spoke"],
            correctOptionIndex: 0,
        },
    },

    {
        id: "rs-gap-6",
        topic: "reported-speech",
        type: "gap-fill",
        difficulty: "advanced",
        sentence: "She said that she ___ me back later.",
        grammarRule: "Will → Would in Reported Speech",
        explanation: "'I'll call you back later' uses 'will'. In reported speech, 'will' always backshifts to 'would'.",
        tip: "will → would in reported speech. The pronoun also changes: 'you' (the listener) becomes 'me'.",
        gapFill: {
            gapIndex: 4,
            correctAnswer: "would call",
            options: ["would call", "will call", "called", "calls"],
            correctOptionIndex: 0,
        },
    },

    // ===== ERROR SPOT (6) =====
    // RULE: Every error is exactly ONE word. Replacing wrongWord with
    // correction must produce a 100% grammatically correct sentence.

    // split(" ") → [0=She,1=told,2=to,3=me,4=that,5=she,6=needed,7=help.]
    // words[1]="told" ✅  corrected: "She said to me that she needed help." ✅
    {
        id: "rs-error-1",
        topic: "reported-speech",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "She told to me that she needed help.",
        grammarRule: "Say vs Tell in Reported Speech",
        explanation: "'Tell' already includes the person and is never followed by 'to': tell someone. 'Said to' does take 'to' + person.",
        errorSpot: {
            errorWordIndex: 1,
            wrongWord: "told",
            correction: "said",
            reason: "'Told' is never followed by 'to'. Either say 'told me' or 'said to me' — changing 'told' to 'said' fixes the sentence.",
            correctionOptions: ["said", "told", "say", "tell"],
        },
    },

    // split(" ") → [0=He,1=said,2=me,3=that,4=he,5=would,6=be,7=late.]
    // words[1]="said" ✅  corrected: "He told me that he would be late." ✅
    {
        id: "rs-error-2",
        topic: "reported-speech",
        type: "error-spot",
        difficulty: "beginner",
        sentence: "He said me that he would be late.",
        grammarRule: "Say vs Tell in Reported Speech",
        explanation: "'Say' is never followed directly by a person: 'said me' is wrong. Use 'told' + person, or 'said to' + person.",
        errorSpot: {
            errorWordIndex: 1,
            wrongWord: "said",
            correction: "told",
            reason: "'Say' cannot take a person directly after it — change 'said' to 'told': 'He told me...'.",
            correctionOptions: ["told", "said", "tells", "says"],
        },
    },

    // split(" ") → [0=She,1=said,2=that,3=she,4=lives,5=in,6=Berlin.]
    // words[4]="lives" ✅  corrected: "She said that she lived in Berlin." ✅
    {
        id: "rs-error-3",
        topic: "reported-speech",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "She said that she lives in Berlin.",
        grammarRule: "Present Simple → Past Simple in Reported Speech",
        explanation: "After a past reporting verb, present simple backshifts to past simple: lives → lived.",
        errorSpot: {
            errorWordIndex: 4,
            wrongWord: "lives",
            correction: "lived",
            reason: "The original statement ('I live in Berlin') is present simple, so it must backshift to past simple: lived.",
            correctionOptions: ["lived", "lives", "living", "live"],
        },
    },

    // split(" ") → [0=He,1=told,2=us,3=that,4=he,5=will,6=help,7=us.]
    // words[5]="will" ✅  corrected: "He told us that he would help us." ✅
    {
        id: "rs-error-4",
        topic: "reported-speech",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "He told us that he will help us.",
        grammarRule: "Will → Would in Reported Speech",
        explanation: "'Will' in direct speech always becomes 'would' in reported speech.",
        errorSpot: {
            errorWordIndex: 5,
            wrongWord: "will",
            correction: "would",
            reason: "'Will' backshifts to 'would' in reported speech: 'He told us that he would help us.'",
            correctionOptions: ["would", "will", "can", "could"],
        },
    },

    // split(" ") → [0=She,1=said,2=that,3=she,4=can,5=drive,6=a,7=truck.]
    // words[4]="can" ✅  corrected: "She said that she could drive a truck." ✅
    {
        id: "rs-error-5",
        topic: "reported-speech",
        type: "error-spot",
        difficulty: "intermediate",
        sentence: "She said that she can drive a truck.",
        grammarRule: "Can → Could in Reported Speech",
        explanation: "'Can' in direct speech always becomes 'could' in reported speech.",
        errorSpot: {
            errorWordIndex: 4,
            wrongWord: "can",
            correction: "could",
            reason: "'Can' backshifts to 'could' in reported speech: 'She said that she could drive a truck.'",
            correctionOptions: ["could", "can", "will", "would"],
        },
    },

    // split(" ") → [0=He,1=said,2=that,3=my,4=flight,5=was,6=delayed.]
    // words[3]="my" ✅  corrected: "He said that his flight was delayed." ✅
    {
        id: "rs-error-6",
        topic: "reported-speech",
        type: "error-spot",
        difficulty: "advanced",
        sentence: "He said that my flight was delayed.",
        grammarRule: "Pronouns in Reported Speech",
        explanation: "Pronouns and possessives change to match the reported speaker, not the person repeating the words. A colleague talking about his own flight needs 'his', not 'my'.",
        errorSpot: {
            errorWordIndex: 3,
            wrongWord: "my",
            correction: "his",
            reason: "He was talking about his own flight, so the possessive must match him: 'his flight', not 'my flight'.",
            correctionOptions: ["his", "my", "her", "their"],
        },
    },

    // ===== MULTIPLE CHOICE (7) =====

    {
        id: "rs-mc-1",
        topic: "reported-speech",
        type: "multiple-choice",
        difficulty: "beginner",
        sentence: "Anna said, 'I'm tired.'",
        grammarRule: "Present Simple → Past Simple in Reported Speech",
        explanation: "'Am' is present simple (the verb 'be'). In reported speech it backshifts to 'was', and the reporting verb 'said' doesn't need 'to' here.",
        tip: "be (am/is/are) → was/were in reported speech, just like any other present simple verb.",
        multipleChoice: {
            question: "Which sentence correctly reports what Anna said?",
            correctOption: "Anna said that she was tired.",
            options: [
                "Anna said that she was tired.",
                "Anna said that she is tired.",
                "Anna told that she was tired.",
                "Anna said she tired.",
            ],
            optionExplanations: {
                "Anna said that she was tired.": "Correct! 'Am' backshifts to 'was', and 'said that' needs no object.",
                "Anna said that she is tired.": "Wrong. 'Is' must backshift to 'was' after the past reporting verb 'said'.",
                "Anna told that she was tired.": "Wrong. 'Tell' always needs a person: 'told me', not 'told that'.",
                "Anna said she tired.": "Wrong. The verb 'be' is missing — it needs 'was': 'she was tired'.",
            },
        },
    },

    {
        id: "rs-mc-2",
        topic: "reported-speech",
        type: "multiple-choice",
        difficulty: "beginner",
        sentence: "Tom said, 'I have to leave early.'",
        grammarRule: "Have To / Has To → Had To in Reported Speech",
        explanation: "'Have to' in direct speech backshifts to 'had to' in reported speech, following the same pattern as other present forms.",
        tip: "have to / has to → had to in reported speech, no matter who is speaking.",
        multipleChoice: {
            question: "Which sentence correctly reports what Tom said?",
            correctOption: "Tom said that he had to leave early.",
            options: [
                "Tom said that he had to leave early.",
                "Tom said that he has to leave early.",
                "Tom told that he had to leave early.",
                "Tom said that he have to leave early.",
            ],
            optionExplanations: {
                "Tom said that he had to leave early.": "Correct! 'Have to' backshifts to 'had to'.",
                "Tom said that he has to leave early.": "Wrong. 'Has to' must backshift to 'had to' in reported speech.",
                "Tom told that he had to leave early.": "Wrong. 'Tell' needs a person: 'told me', not 'told that'.",
                "Tom said that he have to leave early.": "Wrong. This is neither the original form ('have to') nor the correct backshifted form ('had to').",
            },
        },
    },

    {
        id: "rs-mc-3",
        topic: "reported-speech",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Our neighbours said, 'We're going to paint the fence this weekend.'",
        grammarRule: "Am/Is/Are Going To → Was/Were Going To in Reported Speech",
        explanation: "'Are going to' in direct speech backshifts to 'were going to' in reported speech — only the 'be' part changes.",
        tip: "am/is/are going to → was/were going to. The rest of the phrase ('going to paint') stays the same.",
        multipleChoice: {
            question: "Which sentence correctly reports what the neighbours said?",
            correctOption: "Our neighbours said that they were going to paint the fence this weekend.",
            options: [
                "Our neighbours said that they were going to paint the fence this weekend.",
                "Our neighbours said that they are going to paint the fence this weekend.",
                "Our neighbours said that they would paint the fence this weekend.",
                "Our neighbours said that they going to paint the fence this weekend.",
            ],
            optionExplanations: {
                "Our neighbours said that they were going to paint the fence this weekend.": "Correct! 'Are going to' backshifts to 'were going to'.",
                "Our neighbours said that they are going to paint the fence this weekend.": "Wrong. 'Are' must backshift to 'were' after the past reporting verb.",
                "Our neighbours said that they would paint the fence this weekend.": "Wrong. 'Going to' backshifts to 'was/were going to', not 'would'.",
                "Our neighbours said that they going to paint the fence this weekend.": "Wrong. The auxiliary 'were' is missing — it can't be dropped.",
            },
        },
    },

    {
        id: "rs-mc-4",
        topic: "reported-speech",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "David said, 'I'm busy.'",
        grammarRule: "Say vs Tell in Reported Speech",
        explanation: "'Tell' always needs a person straight after it (told me) and never takes 'to'. 'Say' doesn't take a person directly — it needs 'to' first (said to me) or no person at all.",
        tip: "tell + person (told me) vs say (to) + person (said to me) — never 'told to' or 'said me'.",
        multipleChoice: {
            question: "Which sentence uses the reporting verb correctly?",
            correctOption: "David told me that he was busy.",
            options: [
                "David told me that he was busy.",
                "David told that he was busy.",
                "David told to me that he was busy.",
                "David said me that he was busy.",
            ],
            optionExplanations: {
                "David told me that he was busy.": "Correct! 'Tell' takes a person directly: told me.",
                "David told that he was busy.": "Wrong. 'Tell' needs a person: 'told me', not just 'told that'.",
                "David told to me that he was busy.": "Wrong. 'Tell' never takes 'to': it's 'told me', not 'told to me'.",
                "David said me that he was busy.": "Wrong. 'Say' never takes a person directly: it needs 'said to me' or just 'said'.",
            },
        },
    },

    {
        id: "rs-mc-5",
        topic: "reported-speech",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "Laura said, 'I've lost my keys.'",
        grammarRule: "Present Perfect → Past Perfect in Reported Speech",
        explanation: "'I've lost' is present perfect. In reported speech it backshifts to past perfect: had lost. The possessive 'my' also changes to match Laura: 'her keys'.",
        tip: "present perfect → past perfect, and don't forget the possessive change: my → her.",
        multipleChoice: {
            question: "Which sentence correctly reports what Laura said?",
            correctOption: "Laura said that she had lost her keys.",
            options: [
                "Laura said that she had lost her keys.",
                "Laura said that she has lost her keys.",
                "Laura said that she lost her keys.",
                "Laura said that she was losing her keys.",
            ],
            optionExplanations: {
                "Laura said that she had lost her keys.": "Correct! Present perfect 'has lost' backshifts to past perfect 'had lost'.",
                "Laura said that she has lost her keys.": "Wrong. 'Has lost' must backshift to 'had lost' in reported speech.",
                "Laura said that she lost her keys.": "Wrong. This drops the perfect aspect entirely — it should be 'had lost', not just 'lost'.",
                "Laura said that she was losing her keys.": "Wrong. This changes the meaning to an ongoing action, not a completed one.",
            },
        },
    },

    {
        id: "rs-mc-6",
        topic: "reported-speech",
        type: "multiple-choice",
        difficulty: "intermediate",
        sentence: "They told us, 'We missed the bus.'",
        grammarRule: "Past Simple → Past Perfect in Reported Speech",
        explanation: "'We missed the bus' is past simple. In reported speech, a past simple action that happened before the reporting often backshifts further to past perfect.",
        tip: "past simple → past perfect in reported speech, especially for something that happened earlier.",
        multipleChoice: {
            question: "Which sentence correctly reports what they told you?",
            correctOption: "They told us that they had missed the bus.",
            options: [
                "They told us that they had missed the bus.",
                "They told us that they missed the bus.",
                "They told us that they have missed the bus.",
                "They told us that they were missing the bus.",
            ],
            optionExplanations: {
                "They told us that they had missed the bus.": "Correct! Past simple 'missed' backshifts to past perfect 'had missed'.",
                "They told us that they missed the bus.": "Wrong. The verb should backshift further to past perfect: 'had missed'.",
                "They told us that they have missed the bus.": "Wrong. Present perfect 'have missed' is not the correct backshift here.",
                "They told us that they were missing the bus.": "Wrong. This changes the meaning to an action in progress, not a completed one.",
            },
        },
    },

    {
        id: "rs-mc-7",
        topic: "reported-speech",
        type: "multiple-choice",
        difficulty: "advanced",
        sentence: "Tom said to you, 'I can't finish my project without your help.'",
        grammarRule: "Reported Speech — Combining Tense, Modal and Pronoun Changes",
        explanation: "Reporting this sentence needs three changes together: 'can't' → 'couldn't', 'my' → 'his' (it's Tom's project), and 'your' → 'my' (you are the one he asked for help).",
        tip: "Check every word that depends on who is speaking: the modal verb AND every pronoun and possessive.",
        multipleChoice: {
            question: "Which sentence correctly reports what Tom said to you?",
            correctOption: "Tom said that he couldn't finish his project without my help.",
            options: [
                "Tom said that he couldn't finish his project without my help.",
                "Tom said that he couldn't finish his project without your help.",
                "Tom said that he can't finish his project without my help.",
                "Tom told that he couldn't finish his project without my help.",
            ],
            optionExplanations: {
                "Tom said that he couldn't finish his project without my help.": "Correct! 'Can't' → 'couldn't', 'my' → 'his' (Tom's project), 'your' → 'my' (you were the one asked for help).",
                "Tom said that he couldn't finish his project without your help.": "Wrong. 'Your' should change to 'my', because you are the person reporting this, and it was your help he needed.",
                "Tom said that he can't finish his project without my help.": "Wrong. 'Can't' must backshift to 'couldn't' after the past reporting verb.",
                "Tom told that he couldn't finish his project without my help.": "Wrong. 'Tell' needs a person: 'told me', not 'told that'.",
            },
        },
    },

    // ===== WORD TRANSFORM (6) =====

    {
        id: "rs-wt-1",
        topic: "reported-speech",
        type: "word-transform",
        difficulty: "beginner",
        sentence: "She said that she ___ (feel) great.",
        grammarRule: "Present Simple → Past Simple in Reported Speech",
        explanation: "'I feel great' is present simple. In reported speech it backshifts to past simple: felt.",
        tip: "Present simple always backshifts to past simple after said/told.",
        wordTransform: {
            baseWord: "feel",
            correctAnswer: "felt",
        },
    },

    {
        id: "rs-wt-2",
        topic: "reported-speech",
        type: "word-transform",
        difficulty: "beginner",
        sentence: "They told us that they ___ (enjoy) the trip.",
        grammarRule: "Present Continuous → Past Continuous in Reported Speech",
        explanation: "'We are enjoying the trip' is present continuous. In reported speech it backshifts to past continuous: were enjoying.",
        tip: "Present continuous (is/am/are + -ing) → past continuous (was/were + -ing).",
        wordTransform: {
            baseWord: "enjoy",
            correctAnswer: "were enjoying",
        },
    },

    {
        id: "rs-wt-3",
        topic: "reported-speech",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "He said that he ___ (finish) his homework.",
        grammarRule: "Present Perfect → Past Perfect in Reported Speech",
        explanation: "'I've finished my homework' is present perfect. In reported speech it backshifts to past perfect: had finished.",
        tip: "Present perfect → past perfect in reported speech.",
        wordTransform: {
            baseWord: "finish",
            correctAnswer: "had finished",
        },
    },

    {
        id: "rs-wt-4",
        topic: "reported-speech",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "She told me that she ___ (see) Anna at the station.",
        grammarRule: "Past Simple → Past Perfect in Reported Speech",
        explanation: "'I saw Anna at the station' is past simple. In reported speech it often backshifts further to past perfect: had seen.",
        tip: "Past simple can backshift to past perfect in reported speech.",
        wordTransform: {
            baseWord: "see",
            correctAnswer: "had seen",
        },
    },

    {
        id: "rs-wt-5",
        topic: "reported-speech",
        type: "word-transform",
        difficulty: "intermediate",
        sentence: "He said that he ___ (have to) work this weekend.",
        grammarRule: "Have To / Has To → Had To in Reported Speech",
        explanation: "'I have to work this weekend' uses 'have to'. In reported speech it always backshifts to 'had to'.",
        tip: "have to / has to → had to, whoever is speaking.",
        wordTransform: {
            baseWord: "have to",
            correctAnswer: "had to",
        },
    },

    {
        id: "rs-wt-6",
        topic: "reported-speech",
        type: "word-transform",
        difficulty: "advanced",
        sentence: "He told his manager that he ___ (be) going to resign.",
        grammarRule: "Am/Is/Are Going To → Was/Were Going To in Reported Speech",
        explanation: "'I'm going to resign' uses 'am going to'. In reported speech, only the 'be' part changes: was going to.",
        tip: "am/is/are going to → was/were going to — 'going to' itself never changes.",
        wordTransform: {
            baseWord: "be",
            correctAnswer: "was",
        },
    },
];

export const reportedSpeechTopic: GrammarTopic = {
    id: "reported-speech",
    level: "B1",
    name: "Reported Speech",
    description: "Learn how to report what someone said: shifting tenses one step into the past, changing pronouns and possessives, and choosing between say and tell.",
    lesson: "Lesson 5B",
    icon: "🗣️",
    cards: [
        {
            id: "rs-card-1",
            rule: "say vs tell",
            example: "Mark ___ (tell) his boss that he was running late.",
            answer: "told",
            explanation: "'Tell' always needs a person straight after it: tell someone. 'Say' doesn't take a person directly — it uses 'say to someone', or no person at all.",
            examples: ["She told her teacher that she had finished the test.", "She said to her teacher that she had finished the test."],
            ua: "tell + особа (told him); say (to) + особа (said to him) — не «told to».",
        },
        {
            id: "rs-card-2",
            rule: "present simple → past simple",
            example: "Maria said that she ___ (enjoy) long walks in the park.",
            answer: "enjoyed",
            explanation: "After a past reporting verb like said or told, a present simple verb in direct speech moves back one tense to past simple.",
            examples: ["He said that he worked in a bank.", "They said that they lived near the station."],
            ua: "Present Simple → Past Simple: enjoys → enjoyed.",
        },
        {
            id: "rs-card-3",
            rule: "present continuous → past continuous",
            example: "He told us that he ___ (wait) for the bus.",
            answer: "was waiting",
            explanation: "Present continuous (is/am/are + -ing) in direct speech backshifts to past continuous (was/were + -ing) in reported speech.",
            examples: ["She said that she was cooking dinner.", "They told me that they were planning a trip."],
            ua: "Present Continuous → Past Continuous: is waiting → was waiting.",
        },
        {
            id: "rs-card-4",
            rule: "present perfect → past perfect",
            example: "She said that she ___ (visit) Paris twice.",
            answer: "had visited",
            explanation: "Present perfect (have/has + past participle) in direct speech backshifts to past perfect (had + past participle) in reported speech.",
            examples: ["He told me that he had paid the bill.", "They said that they had already left."],
            ua: "Present Perfect → Past Perfect: has visited → had visited.",
        },
        {
            id: "rs-card-5",
            rule: "past simple → past perfect",
            example: "He said that he ___ (meet) her the day before.",
            answer: "had met",
            explanation: "A past simple verb in direct speech often backshifts one step further to past perfect, to show it happened before the reporting.",
            examples: ["She said that she had called earlier.", "They told us that they had arrived before the storm."],
            ua: "Past Simple → Past Perfect: met → had met.",
        },
        {
            id: "rs-card-6",
            rule: "will → would",
            example: "She said that she ___ (help) us later.",
            answer: "would help",
            explanation: "'Will' in direct speech becomes 'would' in reported speech — the same backshift pattern as other modal verbs.",
            examples: ["He said that he would call back.", "They told us that they would arrive soon."],
            ua: "will → would: 'I will help' → he said he would help.",
        },
        {
            id: "rs-card-7",
            rule: "can → could",
            example: "He told me that he ___ (swim) very well.",
            answer: "could swim",
            explanation: "'Can' in direct speech becomes 'could' in reported speech.",
            examples: ["She said that she could cook well.", "They told us that they could finish on time."],
            ua: "can → could: 'I can swim' → he said he could swim.",
        },
        {
            id: "rs-card-8",
            rule: "have to / has to → had to",
            example: "She said that she ___ (have to) work late.",
            answer: "had to",
            explanation: "'Have to' or 'has to' in direct speech becomes 'had to' in reported speech, just like other present forms moving into the past.",
            examples: ["He told us that he had to leave early.", "They said that they had to change their plans."],
            ua: "have to / has to → had to: завжди одна форма в минулому.",
        },
        {
            id: "rs-card-9",
            rule: "am/is/are going to → was/were going to",
            example: "She told me that she ___ (be) going to start a new job.",
            answer: "was",
            explanation: "'Am/is/are going to' in direct speech becomes 'was/were going to' in reported speech — only the 'be' part changes.",
            examples: ["He said that he was going to call back.", "They told us that they were going to move house."],
            ua: "am/is/are going to → was/were going to: змінюється лише be.",
        },
        {
            id: "rs-card-10",
            rule: "pronouns and possessives change too",
            example: "Maria said that ___ (my/her) phone was out of battery.",
            answer: "her",
            explanation: "Pronouns and possessives change to match who is speaking now, not who originally spoke. Maria said 'my phone' — but when we report her words, it becomes 'her phone'.",
            examples: ["Tom said that his brother had called him.", "They said that their flight had been delayed."],
            ua: "Займенники теж змінюються: «my phone» (Марія) → her phone, коли переказуємо.",
        },
    ],
    rules: reportedSpeechQuestions,
};

export default reportedSpeechQuestions;
