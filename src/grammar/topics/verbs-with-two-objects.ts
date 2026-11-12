/**
 * EnglishPusher Grammar Testing - Verbs with Two Objects
 * A2+ Level (Speakout) - Lesson 5D
 *
 * 6 gap-fill, 6 error-spot, 7 multiple-choice, 6 word-transform = 25 questions
 * VERIFIED: All error-spot indexes checked against split(" ") positions.
 */

import type { GrammarQuestion, GrammarTopic } from "../types.ts";

const TO_TIP =
  "give, lend, offer, pass, send, show, teach, write → use 'to' in pattern 2: verb + direct object + to + indirect object.";
const FOR_TIP =
  "buy, get, leave, make → use 'for' in pattern 2: verb + direct object + for + indirect object.";

export const verbsWithTwoObjectsQuestions: GrammarQuestion[] = [

  // ===== GAP FILL (6) =====

  {
    id: "vto-gap-1",
    topic: "verbs-with-two-objects",
    type: "gap-fill",
    difficulty: "beginner",
    sentence: "Can you pass the salt ___ me, please?",
    grammarRule: "Verbs with Two Objects — 'Pass' + to",
    explanation:
      "'Pass' takes pattern 2 with 'to': verb + direct object + to + indirect object — 'pass the salt to me'.",
    tip: TO_TIP,
    gapFill: {
      gapIndex: 5,
      correctAnswer: "to",
      options: ["to", "for", "at", "with"],
      correctOptionIndex: 0,
    },
  },

  {
    id: "vto-gap-2",
    topic: "verbs-with-two-objects",
    type: "gap-fill",
    difficulty: "beginner",
    sentence: "I'll send an email ___ everyone in the team.",
    grammarRule: "Verbs with Two Objects — 'Send' + to",
    explanation:
      "'Send' takes pattern 2 with 'to': 'send an email to everyone'. We often choose pattern 2 when the indirect object is long.",
    tip: TO_TIP,
    gapFill: {
      gapIndex: 4,
      correctAnswer: "to",
      options: ["to", "for", "from", "at"],
      correctOptionIndex: 0,
    },
  },

  {
    id: "vto-gap-3",
    topic: "verbs-with-two-objects",
    type: "gap-fill",
    difficulty: "intermediate",
    sentence: "He bought a nice scarf ___ his wife.",
    grammarRule: "Verbs with Two Objects — 'Buy' + for",
    explanation:
      "'Buy' takes pattern 2 with 'for': verb + direct object + for + indirect object — 'buy a scarf for his wife'.",
    tip: FOR_TIP,
    gapFill: {
      gapIndex: 5,
      correctAnswer: "for",
      options: ["for", "to", "with", "at"],
      correctOptionIndex: 0,
    },
  },

  {
    id: "vto-gap-4",
    topic: "verbs-with-two-objects",
    type: "gap-fill",
    difficulty: "intermediate",
    sentence: "Could you get some stamps ___ me at the post office?",
    grammarRule: "Verbs with Two Objects — 'Get' + for",
    explanation:
      "'Get' takes pattern 2 with 'for': 'get some stamps for me'. Never 'to' with 'get'.",
    tip: FOR_TIP,
    gapFill: {
      gapIndex: 5,
      correctAnswer: "for",
      options: ["for", "to", "from", "with"],
      correctOptionIndex: 0,
    },
  },

  {
    id: "vto-gap-5",
    topic: "verbs-with-two-objects",
    type: "gap-fill",
    difficulty: "intermediate",
    sentence: "She showed her new flat ___ all her friends.",
    grammarRule: "Verbs with Two Objects — 'Show' + to",
    explanation:
      "'Show' takes pattern 2 with 'to': 'show her new flat to all her friends'.",
    tip: TO_TIP,
    gapFill: {
      gapIndex: 5,
      correctAnswer: "to",
      options: ["to", "for", "with", "at"],
      correctOptionIndex: 0,
    },
  },

  {
    id: "vto-gap-6",
    topic: "verbs-with-two-objects",
    type: "gap-fill",
    difficulty: "advanced",
    sentence: "He made a birthday cake ___ his daughter.",
    grammarRule: "Verbs with Two Objects — 'Make' + for",
    explanation:
      "'Make' takes pattern 2 with 'for': 'make a cake for his daughter'. Never 'to' with 'make'.",
    tip: FOR_TIP,
    gapFill: {
      gapIndex: 5,
      correctAnswer: "for",
      options: ["for", "to", "with", "by"],
      correctOptionIndex: 0,
    },
  },

  // ===== ERROR SPOT (6) =====
  // RULE: Every error is exactly ONE word. Replacing wrongWord with correction
  // must produce a 100% grammatically correct sentence with no leftover errors.

  // split(" ") → [0=Could,1=you,2=give,3=this,4=letter,5=for,6=Mr,7=Johnson?]
  // words[5]="for" ✅  corrected: "Could you give this letter to Mr Johnson?" ✅
  {
    id: "vto-error-1",
    topic: "verbs-with-two-objects",
    type: "error-spot",
    difficulty: "beginner",
    sentence: "Could you give this letter for Mr Johnson?",
    grammarRule: "Verbs with Two Objects — 'Give' + to",
    explanation:
      "'Give' takes pattern 2 with 'to', not 'for': 'give this letter to Mr Johnson'.",
    tip: TO_TIP,
    errorSpot: {
      errorWordIndex: 5,
      wrongWord: "for",
      correction: "to",
      reason: "'Give' takes 'to' in pattern 2: 'Could you give this letter to Mr Johnson?'",
      correctionOptions: ["to", "for", "at", "with"],
    },
  },

  // split(" ") → [0=We,1=lent,2=our,3=tent,4=for,5=our,6=neighbours,7=last,8=summer.]
  // words[4]="for" ✅  corrected: "We lent our tent to our neighbours last summer." ✅
  {
    id: "vto-error-2",
    topic: "verbs-with-two-objects",
    type: "error-spot",
    difficulty: "beginner",
    sentence: "We lent our tent for our neighbours last summer.",
    grammarRule: "Verbs with Two Objects — 'Lend' + to",
    explanation:
      "'Lend' takes pattern 2 with 'to', not 'for': 'lent our tent to our neighbours'.",
    tip: TO_TIP,
    errorSpot: {
      errorWordIndex: 4,
      wrongWord: "for",
      correction: "to",
      reason: "'Lend' takes 'to' in pattern 2: 'We lent our tent to our neighbours last summer.'",
      correctionOptions: ["to", "for", "with", "at"],
    },
  },

  // split(" ") → [0=Can,1=you,2=show,3=your,4=ticket,5=for,6=the,7=inspector?]
  // words[5]="for" ✅  corrected: "Can you show your ticket to the inspector?" ✅
  {
    id: "vto-error-3",
    topic: "verbs-with-two-objects",
    type: "error-spot",
    difficulty: "intermediate",
    sentence: "Can you show your ticket for the inspector?",
    grammarRule: "Verbs with Two Objects — 'Show' + to",
    explanation:
      "'Show' takes pattern 2 with 'to', not 'for': 'show your ticket to the inspector'.",
    tip: TO_TIP,
    errorSpot: {
      errorWordIndex: 5,
      wrongWord: "for",
      correction: "to",
      reason: "'Show' takes 'to' in pattern 2: 'Can you show your ticket to the inspector?'",
      correctionOptions: ["to", "for", "at", "with"],
    },
  },

  // split(" ") → [0=Please,1=send,2=this,3=file,4=for,5=Mark,6=before,7=lunch.]
  // words[4]="for" ✅  corrected: "Please send this file to Mark before lunch." ✅
  {
    id: "vto-error-4",
    topic: "verbs-with-two-objects",
    type: "error-spot",
    difficulty: "intermediate",
    sentence: "Please send this file for Mark before lunch.",
    grammarRule: "Verbs with Two Objects — 'Send' + to",
    explanation:
      "'Send' takes pattern 2 with 'to', not 'for': 'send this file to Mark'.",
    tip: TO_TIP,
    errorSpot: {
      errorWordIndex: 4,
      wrongWord: "for",
      correction: "to",
      reason: "'Send' takes 'to' in pattern 2: 'Please send this file to Mark before lunch.'",
      correctionOptions: ["to", "for", "from", "at"],
    },
  },

  // split(" ") → [0=He,1=got,2=a,3=sandwich,4=to,5=his,6=colleague,7=from,8=the,9=café.]
  // words[4]="to" ✅  corrected: "He got a sandwich for his colleague from the café." ✅
  {
    id: "vto-error-5",
    topic: "verbs-with-two-objects",
    type: "error-spot",
    difficulty: "intermediate",
    sentence: "He got a sandwich to his colleague from the café.",
    grammarRule: "Verbs with Two Objects — 'Get' + for",
    explanation:
      "'Get' takes pattern 2 with 'for', not 'to': 'got a sandwich for his colleague'.",
    tip: FOR_TIP,
    errorSpot: {
      errorWordIndex: 4,
      wrongWord: "to",
      correction: "for",
      reason: "'Get' takes 'for' in pattern 2: 'He got a sandwich for his colleague from the café.'",
      correctionOptions: ["for", "to", "with", "from"],
    },
  },

  // split(" ") → [0=I'll,1=leave,2=a,3=message,4=to,5=the,6=receptionist,7=before,8=I,9=go.]
  // words[4]="to" ✅  corrected: "I'll leave a message for the receptionist before I go." ✅
  {
    id: "vto-error-6",
    topic: "verbs-with-two-objects",
    type: "error-spot",
    difficulty: "advanced",
    sentence: "I'll leave a message to the receptionist before I go.",
    grammarRule: "Verbs with Two Objects — 'Leave' + for",
    explanation:
      "'Leave' takes pattern 2 with 'for', not 'to': 'leave a message for the receptionist'.",
    tip: FOR_TIP,
    errorSpot: {
      errorWordIndex: 4,
      wrongWord: "to",
      correction: "for",
      reason: "'Leave' takes 'for' in pattern 2: 'I'll leave a message for the receptionist before I go.'",
      correctionOptions: ["for", "to", "with", "from"],
    },
  },

  // ===== MULTIPLE CHOICE (7) =====

  {
    id: "vto-mc-1",
    topic: "verbs-with-two-objects",
    type: "multiple-choice",
    difficulty: "beginner",
    sentence: "Choose the correct sentence:",
    grammarRule: "Verbs with Two Objects — Pattern 1",
    explanation:
      "Pattern 1 is verb + indirect object + direct object, with no preposition: 'gave me a book'.",
    tip: "Pattern 1: verb + indirect object + direct object (no preposition). Pattern 2: verb + direct object + to/for + indirect object.",
    multipleChoice: {
      question: "Which sentence is correct?",
      correctOption: "She gave me a book.",
      options: [
        "She gave me a book.",
        "She gave a book me.",
        "She gave to me a book.",
        "She gave book me a.",
      ],
      optionExplanations: {
        "She gave me a book.": "Correct! Pattern 1: verb + indirect object (me) + direct object (a book).",
        "She gave a book me.": "Wrong. Without 'to', the direct object must come before the indirect object: 'gave me a book' or 'gave a book to me'.",
        "She gave to me a book.": "Wrong. In pattern 2, 'to + indirect object' comes AFTER the direct object: 'gave a book to me'.",
        "She gave book me a.": "Wrong. This word order doesn't follow either pattern and isn't a sentence.",
      },
    },
  },

  {
    id: "vto-mc-2",
    topic: "verbs-with-two-objects",
    type: "multiple-choice",
    difficulty: "beginner",
    sentence: "Choose the correct sentence:",
    grammarRule: "Verbs with Two Objects — Pattern 2 with 'to'",
    explanation:
      "Pattern 2 is verb + direct object + to + indirect object: 'sent the photos to his friend'.",
    tip: TO_TIP,
    multipleChoice: {
      question: "Which sentence is correct?",
      correctOption: "He sent the photos to his friend.",
      options: [
        "He sent the photos to his friend.",
        "He sent to his friend the photos.",
        "He sent the photos for his friend.",
        "He sent his friend to the photos.",
      ],
      optionExplanations: {
        "He sent the photos to his friend.": "Correct! Pattern 2: direct object (the photos) + to + indirect object (his friend).",
        "He sent to his friend the photos.": "Wrong. In pattern 2, 'to + indirect object' must come AFTER the direct object, not before it.",
        "He sent the photos for his friend.": "Wrong. 'Send' uses 'to', not 'for'.",
        "He sent his friend to the photos.": "Wrong. This reverses the objects and changes the meaning completely.",
      },
    },
  },

  {
    id: "vto-mc-3",
    topic: "verbs-with-two-objects",
    type: "multiple-choice",
    difficulty: "intermediate",
    sentence: "Choose the correct sentence:",
    grammarRule: "Verbs with Two Objects — Pattern 2 with 'for'",
    explanation:
      "Pattern 2 is verb + direct object + for + indirect object: 'bought a present for her mum'.",
    tip: FOR_TIP,
    multipleChoice: {
      question: "Which sentence is correct?",
      correctOption: "She bought a present for her mum.",
      options: [
        "She bought a present for her mum.",
        "She bought a present to her mum.",
        "She bought for her mum a present.",
        "She bought her mum for a present.",
      ],
      optionExplanations: {
        "She bought a present for her mum.": "Correct! Pattern 2: direct object (a present) + for + indirect object (her mum).",
        "She bought a present to her mum.": "Wrong. 'Buy' uses 'for', not 'to'.",
        "She bought for her mum a present.": "Wrong. In pattern 2, 'for + indirect object' must come AFTER the direct object.",
        "She bought her mum for a present.": "Wrong. This isn't either pattern and changes the meaning.",
      },
    },
  },

  {
    id: "vto-mc-4",
    topic: "verbs-with-two-objects",
    type: "multiple-choice",
    difficulty: "intermediate",
    sentence: "Choose the correct sentence:",
    grammarRule: "Verbs with Two Objects — 'Ask' Always Pattern 1",
    explanation:
      "We almost always use pattern 1 with 'ask': verb + indirect object + direct object, never 'to'.",
    tip: "ask and tell almost always use pattern 1 only: 'asked her a question', NOT 'asked a question to her'.",
    multipleChoice: {
      question: "Which sentence is correct?",
      correctOption: "I asked her a question.",
      options: [
        "I asked her a question.",
        "I asked a question to her.",
        "I asked to her a question.",
        "I asked a question for her.",
      ],
      optionExplanations: {
        "I asked her a question.": "Correct! 'Ask' almost always uses pattern 1: verb + indirect object + direct object.",
        "I asked a question to her.": "Wrong. 'Ask' doesn't take 'to' — NOT 'I asked a question to her.'",
        "I asked to her a question.": "Wrong. 'Ask' doesn't take 'to' at all.",
        "I asked a question for her.": "Wrong. 'Ask' doesn't take 'for' either — it only uses pattern 1.",
      },
    },
  },

  {
    id: "vto-mc-5",
    topic: "verbs-with-two-objects",
    type: "multiple-choice",
    difficulty: "intermediate",
    sentence: "Choose the correct sentence:",
    grammarRule: "Verbs with Two Objects — 'Tell' Always Pattern 1",
    explanation:
      "We almost always use pattern 1 with 'tell': verb + indirect object + direct object, never 'to'.",
    tip: "ask and tell almost always use pattern 1 only: 'told him my name', NOT 'told my name to him'.",
    multipleChoice: {
      question: "Which sentence is correct?",
      correctOption: "I told him my name.",
      options: [
        "I told him my name.",
        "I told my name to him.",
        "I told to him my name.",
        "I told my name for him.",
      ],
      optionExplanations: {
        "I told him my name.": "Correct! 'Tell' almost always uses pattern 1: verb + indirect object + direct object.",
        "I told my name to him.": "Wrong. 'Tell' doesn't take 'to' — NOT 'I told my name to him.'",
        "I told to him my name.": "Wrong. 'Tell' doesn't take 'to' at all.",
        "I told my name for him.": "Wrong. 'Tell' doesn't take 'for' either — it only uses pattern 1.",
      },
    },
  },

  {
    id: "vto-mc-6",
    topic: "verbs-with-two-objects",
    type: "multiple-choice",
    difficulty: "intermediate",
    sentence: "Choose the correct sentence:",
    grammarRule: "Verbs with Two Objects — 'Make' + for",
    explanation:
      "'Make' takes pattern 2 with 'for', and the direct object always comes before 'for + indirect object'.",
    tip: FOR_TIP,
    multipleChoice: {
      question: "Which sentence is correct?",
      correctOption: "He made a dress for me.",
      options: [
        "He made a dress for me.",
        "He made a dress to me.",
        "He made for me a dress.",
        "He made me for a dress.",
      ],
      optionExplanations: {
        "He made a dress for me.": "Correct! Pattern 2: direct object (a dress) + for + indirect object (me).",
        "He made a dress to me.": "Wrong. 'Make' uses 'for', not 'to'.",
        "He made for me a dress.": "Wrong. 'For + indirect object' must come AFTER the direct object, not before it.",
        "He made me for a dress.": "Wrong. This isn't either pattern and doesn't make sense.",
      },
    },
  },

  {
    id: "vto-mc-7",
    topic: "verbs-with-two-objects",
    type: "multiple-choice",
    difficulty: "advanced",
    sentence: "Choose the correct sentence:",
    grammarRule: "Verbs with Two Objects — Long Indirect Object",
    explanation:
      "With a long indirect object, pattern 2 (direct object + to + indirect object) is clearer than trying to squeeze the long phrase in front of the direct object.",
    tip: "A long indirect object usually sits more naturally after 'to'/'for': 'give this file to the person sitting next to you.'",
    multipleChoice: {
      question: "Which sentence is correct?",
      correctOption: "Could you give this file to the person sitting next to you?",
      options: [
        "Could you give this file to the person sitting next to you?",
        "Could you give to the person sitting next to you this file?",
        "Could you give this file the person sitting next to you?",
        "Could you give the person sitting next to you to this file?",
      ],
      optionExplanations: {
        "Could you give this file to the person sitting next to you?": "Correct! Pattern 2: direct object (this file) + to + the long indirect object.",
        "Could you give to the person sitting next to you this file?": "Wrong. 'To + indirect object' must come AFTER the direct object, not before it.",
        "Could you give this file the person sitting next to you?": "Wrong. 'To' is missing before the indirect object.",
        "Could you give the person sitting next to you to this file?": "Wrong. This reverses the objects and the sentence no longer makes sense.",
      },
    },
  },

  // ===== WORD TRANSFORM (6) =====

  {
    id: "vto-wt-1",
    topic: "verbs-with-two-objects",
    type: "word-transform",
    difficulty: "beginner",
    sentence: "She ___ (send) me a postcard from Spain last month.",
    grammarRule: "Verbs with Two Objects — Past Simple 'Send'",
    explanation:
      "'Send' is irregular in the past: send → sent. The sentence still follows pattern 1: verb + indirect object (me) + direct object (a postcard).",
    tip: "send → sent (irregular past). Pattern 1: verb + indirect object + direct object, no preposition needed.",
    wordTransform: {
      baseWord: "send",
      correctAnswer: "sent",
    },
  },

  {
    id: "vto-wt-2",
    topic: "verbs-with-two-objects",
    type: "word-transform",
    difficulty: "beginner",
    sentence: "He ___ (lend) his brother some money yesterday.",
    grammarRule: "Verbs with Two Objects — Past Simple 'Lend'",
    explanation:
      "'Lend' is irregular in the past: lend → lent. Pattern 1: verb + indirect object (his brother) + direct object (some money).",
    tip: "lend → lent (irregular past). Don't confuse 'lend' (give temporarily) with 'borrow' (receive temporarily).",
    wordTransform: {
      baseWord: "lend",
      correctAnswer: "lent",
    },
  },

  {
    id: "vto-wt-3",
    topic: "verbs-with-two-objects",
    type: "word-transform",
    difficulty: "intermediate",
    sentence: "They ___ (give) their neighbours a copy of the key last week.",
    grammarRule: "Verbs with Two Objects — Past Simple 'Give'",
    explanation:
      "'Give' is irregular in the past: give → gave. Pattern 1: verb + indirect object (their neighbours) + direct object (a copy of the key).",
    tip: "give → gave (irregular past). Pattern 1 works well when the direct object is short.",
    wordTransform: {
      baseWord: "give",
      correctAnswer: "gave",
    },
  },

  {
    id: "vto-wt-4",
    topic: "verbs-with-two-objects",
    type: "word-transform",
    difficulty: "intermediate",
    sentence: "I ___ (buy) my sister a scarf for her birthday.",
    grammarRule: "Verbs with Two Objects — Past Simple 'Buy'",
    explanation:
      "'Buy' is irregular in the past: buy → bought. Pattern 1 works here too: verb + indirect object (my sister) + direct object (a scarf).",
    tip: "buy → bought (irregular past). Remember: 'buy' takes 'for' in pattern 2, never 'to'.",
    wordTransform: {
      baseWord: "buy",
      correctAnswer: "bought",
    },
  },

  {
    id: "vto-wt-5",
    topic: "verbs-with-two-objects",
    type: "word-transform",
    difficulty: "intermediate",
    sentence: "We ___ (show) the tourists the way to the station this morning.",
    grammarRule: "Verbs with Two Objects — Past Simple 'Show'",
    explanation:
      "'Show' is regular in the past: show → showed. Pattern 1: verb + indirect object (the tourists) + direct object (the way to the station).",
    tip: "show → showed (regular past). 'Show' takes 'to' in pattern 2: 'showed the way to the tourists'.",
    wordTransform: {
      baseWord: "show",
      correctAnswer: "showed",
    },
  },

  {
    id: "vto-wt-6",
    topic: "verbs-with-two-objects",
    type: "word-transform",
    difficulty: "advanced",
    sentence: "She ___ (teach) her daughter to ride a bike last summer.",
    grammarRule: "Verbs with Two Objects — Past Simple 'Teach'",
    explanation:
      "'Teach' is irregular in the past: teach → taught. Pattern 1: verb + indirect object (her daughter) + direct object (to ride a bike).",
    tip: "teach → taught (irregular past). 'Teach' takes 'to' in pattern 2: 'taught Spanish to them'.",
    wordTransform: {
      baseWord: "teach",
      correctAnswer: "taught",
    },
  },
];

export const verbsWithTwoObjectsTopic: GrammarTopic = {
  id: "verbs-with-two-objects",
  level: "A2+",
  name: "Verbs with Two Objects",
  description:
    "Learn how verbs like give, lend, send and buy work with two objects — an indirect object (who) and a direct object (what) — and when to use 'to', 'for', or no preposition at all.",
  lesson: "Lesson 5D",
  rules: verbsWithTwoObjectsQuestions,
};

export default verbsWithTwoObjectsQuestions;
