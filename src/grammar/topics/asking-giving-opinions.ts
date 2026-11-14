import type { GrammarQuestion, GrammarTopic } from "../types.ts";

// Unit 6C — How to ask for and give opinions and reasons (+ extreme adjectives)
// 27 questions: 6 gap-fill, 6 error-spot, 7 multiple-choice, 6 word-transform, 2 sentence-match

export const askingGivingOpinionsQuestions: GrammarQuestion[] = [
  // ===== GAP FILL (6) =====

  {
    id: "opin-gap-1",
    topic: "asking-giving-opinions",
    type: "gap-fill",
    difficulty: "beginner",
    sentence: "What do you think ___ the new restaurant downtown?",
    // split: What(0) do(1) you(2) think(3) ___(4) the(5) new(6) restaurant(7) downtown?(8)
    grammarRule: "Asking for an opinion: think of",
    explanation:
      "We ask for an opinion with 'What do/did you think of + noun'. After 'think' in this fixed phrase we use 'of', not 'about'.",
    tip: "'What do you think of...?' always takes 'of'.",
    gapFill: {
      gapIndex: 4,
      correctAnswer: "of",
      options: ["about", "of", "for", "on"],
      correctOptionIndex: 1, // options[1] === "of" ✓
    },
  },

  {
    id: "opin-gap-2",
    topic: "asking-giving-opinions",
    type: "gap-fill",
    difficulty: "beginner",
    sentence: "___ me, the film was far too long and quite boring.",
    // split: ___(0) me,(1) the(2) film(3) was(4) far(5) too(6) long(7) and(8) quite(9) boring.(10)
    grammarRule: "Giving an opinion: For me",
    explanation:
      "'For me, ...' is a fixed phrase meaning 'in my opinion'. It starts the sentence and is followed by a comma.",
    tip: "'For me, ...' = a personal opinion.",
    gapFill: {
      gapIndex: 0,
      correctAnswer: "For",
      options: ["To", "For", "By", "With"],
      correctOptionIndex: 1, // options[1] === "For" ✓
    },
  },

  {
    id: "opin-gap-3",
    topic: "asking-giving-opinions",
    type: "gap-fill",
    difficulty: "intermediate",
    sentence: "In my ___, graffiti is art, not vandalism.",
    // split: In(0) my(1) ___,(2) graffiti(3) is(4) art,(5) not(6) vandalism.(7)
    grammarRule: "Giving an opinion: In my view",
    explanation:
      "'In my view' is a fixed phrase meaning 'in my opinion'. We don't say 'in my thought' or 'in my idea'.",
    tip: "'In my view, ...' is a slightly more formal way to give an opinion.",
    gapFill: {
      gapIndex: 2,
      correctAnswer: "view",
      options: ["thought", "view", "mind", "idea"],
      correctOptionIndex: 1, // options[1] === "view" ✓
    },
  },

  {
    id: "opin-gap-4",
    topic: "asking-giving-opinions",
    type: "gap-fill",
    difficulty: "intermediate",
    sentence: "I ___ say that the sculpture looks amazing at night.",
    // split: I(0) ___(1) say(2) that(3) the(4) sculpture(5) looks(6) amazing(7) at(8) night.(9)
    grammarRule: "Giving an opinion: I would say",
    explanation:
      "'I would say' is a careful, polite way to give an opinion, especially about something people might disagree on.",
    tip: "'I would say (that)...' sounds more careful than a flat statement.",
    gapFill: {
      gapIndex: 1,
      correctAnswer: "would",
      options: ["should", "would", "will", "must"],
      correctOptionIndex: 1, // options[1] === "would" ✓
    },
  },

  {
    id: "opin-gap-5",
    topic: "asking-giving-opinions",
    type: "gap-fill",
    difficulty: "intermediate",
    sentence: '"The acting in that film was brilliant." "What makes you ___ that?"',
    // split: "The(0) acting(1) in(2) that(3) film(4) was(5) brilliant."(6) "What(7) makes(8) you(9) ___(10) that?"(11)
    grammarRule: "Asking for a reason: What makes you say that?",
    explanation:
      "'What makes you say that?' asks someone for the reason behind an opinion they just gave.",
    tip: "'What makes you say that?' = 'Why do you think that?'",
    gapFill: {
      gapIndex: 10,
      correctAnswer: "say",
      options: ["say", "tell", "speak", "talk"],
      correctOptionIndex: 0, // options[0] === "say" ✓
    },
  },

  {
    id: "opin-gap-6",
    topic: "asking-giving-opinions",
    type: "gap-fill",
    difficulty: "advanced",
    sentence: "I know you disagree with me, but I ___ we're all different.",
    // split: I(0) know(1) you(2) disagree(3) with(4) me,(5) but(6) I(7) ___(8) we're(9) all(10) different.(11)
    grammarRule: "Agreeing to disagree",
    explanation:
      "'I suppose we're all different' is a fixed phrase used to end a disagreement politely, accepting that people have different tastes.",
    tip: "'I suppose/guess we're all different' ends a disagreement politely.",
    gapFill: {
      gapIndex: 8,
      correctAnswer: "suppose",
      options: ["suppose", "except", "unless", "despite"],
      correctOptionIndex: 0, // options[0] === "suppose" ✓
    },
  },

  // ===== ERROR SPOT (6) =====

  {
    id: "opin-error-1",
    topic: "asking-giving-opinions",
    type: "error-spot",
    difficulty: "beginner",
    sentence: "What do you think about the new art gallery?",
    // split: What(0) do(1) you(2) think(3) about(4) the(5) new(6) art(7) gallery?(8)
    // words[4]="about" ✅  corrected: "What do you think of the new art gallery?" ✅
    grammarRule: "Asking for an opinion: think of",
    explanation:
      "'What do you think of...?' is the fixed way to ask for an opinion. We don't use 'about' after 'think' in this phrase.",
    tip: "Think of + noun (opinion), not 'think about' in this fixed phrase.",
    errorSpot: {
      errorWordIndex: 4,
      wrongWord: "about",
      correction: "of",
      reason:
        "'What do you think of...?' is the fixed way to ask for an opinion, not 'think about'.",
      correctionOptions: ["of", "for", "on", "at"], // "of" at index 0
    },
  },

  {
    id: "opin-error-2",
    topic: "asking-giving-opinions",
    type: "error-spot",
    difficulty: "beginner",
    sentence: "For I, the sculpture looks amazing in the evening light.",
    // split: For(0) I,(1) the(2) sculpture(3) looks(4) amazing(5) in(6) the(7) evening(8) light.(9)
    // words[1]="I," ✅  corrected: "For me, the sculpture looks amazing in the evening light." ✅
    grammarRule: "Giving an opinion: For me",
    explanation:
      "After 'for', we need the object pronoun 'me', not the subject pronoun 'I'. 'For me' is the fixed phrase for giving an opinion.",
    tip: "'For me, ...' — always the object pronoun 'me', never 'I'.",
    errorSpot: {
      errorWordIndex: 1,
      wrongWord: "I,",
      correction: "me,",
      reason:
        "'For me' is the fixed phrase. 'I' is a subject pronoun — it cannot follow 'for'.",
      correctionOptions: ["mine,", "me,", "my,", "myself,"], // "me," at index 1
    },
  },

  {
    id: "opin-error-3",
    topic: "asking-giving-opinions",
    type: "error-spot",
    difficulty: "intermediate",
    sentence: "Why does you think that?",
    // split: Why(0) does(1) you(2) think(3) that?(4)
    // words[1]="does" ✅  corrected: "Why do you think that?" ✅
    grammarRule: "Asking for a reason: Why do you think that?",
    explanation:
      "'You' takes 'do' in present simple questions, not 'does' — 'does' is only used with he/she/it.",
    tip: "'Why do you think that?' — 'do', not 'does', with 'you'.",
    errorSpot: {
      errorWordIndex: 1,
      wrongWord: "does",
      correction: "do",
      reason: "'You' takes the auxiliary 'do', not 'does', in present simple questions.",
      correctionOptions: ["does", "do", "is", "did"], // "do" at index 1
    },
  },

  {
    id: "opin-error-4",
    topic: "asking-giving-opinions",
    type: "error-spot",
    difficulty: "intermediate",
    sentence: "It's because the actors was brilliant.",
    // split: It's(0) because(1) the(2) actors(3) was(4) brilliant.(5)
    // words[4]="was" ✅  corrected: "It's because the actors were brilliant." ✅
    grammarRule: "Giving a reason: It's because",
    explanation:
      "'Actors' is plural, so the verb 'be' must agree: 'the actors were brilliant', not 'was'.",
    tip: "Plural subject + 'were', not 'was'.",
    errorSpot: {
      errorWordIndex: 4,
      wrongWord: "was",
      correction: "were",
      reason: "'Actors' is plural, so it needs 'were', not the singular 'was'.",
      correctionOptions: ["was", "were", "is", "are"], // "were" at index 1
    },
  },

  {
    id: "opin-error-5",
    topic: "asking-giving-opinions",
    type: "error-spot",
    difficulty: "intermediate",
    sentence: "The reason is because I don't like modern art.",
    // split: The(0) reason(1) is(2) because(3) I(4) don't(5) like(6) modern(7) art.(8)
    // words[3]="because" ✅  corrected: "The reason is that I don't like modern art." ✅
    grammarRule: "Giving a reason: The reason is",
    explanation:
      "'The reason is' should be followed by 'that + clause', not 'because'. 'Because' already means 'for the reason that', so 'reason is because' repeats the same idea.",
    tip: "'The reason is that...', never 'the reason is because...'.",
    errorSpot: {
      errorWordIndex: 3,
      wrongWord: "because",
      correction: "that",
      reason:
        "'The reason is' takes 'that + clause'. 'Because' repeats the meaning of 'reason' and is not used here.",
      correctionOptions: ["because", "that", "why", "if"], // "that" at index 1
    },
  },

  {
    id: "opin-error-6",
    topic: "asking-giving-opinions",
    type: "error-spot",
    difficulty: "advanced",
    sentence: "The exhibition was very fantastic, with huge sculptures everywhere.",
    // split: The(0) exhibition(1) was(2) very(3) fantastic,(4) with(5) huge(6) sculptures(7) everywhere.(8)
    // words[3]="very" ✅  corrected: "The exhibition was absolutely fantastic, with huge sculptures everywhere." ✅
    grammarRule: "very vs absolutely with extreme adjectives",
    explanation:
      "'Fantastic' is an extreme adjective, so we make it stronger with 'absolutely', not 'very'. 'Very' is only used with normal adjectives.",
    tip: "very + normal adjective; absolutely + extreme adjective.",
    errorSpot: {
      errorWordIndex: 3,
      wrongWord: "very",
      correction: "absolutely",
      reason: "Extreme adjectives like 'fantastic' are made stronger with 'absolutely', not 'very'.",
      correctionOptions: ["very", "absolutely", "really", "quite"], // "absolutely" at index 1
    },
  },

  // ===== MULTIPLE CHOICE (7) =====

  {
    id: "opin-mc-1",
    topic: "asking-giving-opinions",
    type: "multiple-choice",
    difficulty: "beginner",
    sentence: "You want to ask a friend what they think about a new café. Which question is correct?",
    grammarRule: "Asking for an opinion: think of",
    explanation:
      "The fixed phrase is 'What do/did you think of + noun?' — correct word order and the preposition 'of'.",
    tip: "'What do you think of...?' — don't drop 'do' or change the preposition.",
    multipleChoice: {
      question: "Which option is correct?",
      correctOption: "What do you think of the café?",
      options: [
        "What do you think about of the café?",
        "What do you think of the café?",
        "What you think of the café?",
        "What think you of the café?",
      ],
      optionExplanations: [
        "Wrong — uses both 'about' and 'of' together.",
        "Correct — 'What do you think of...?' is the fixed way to ask for an opinion.",
        "Wrong — missing the auxiliary 'do'.",
        "Wrong — the word order is incorrect.",
      ],
    },
  },

  {
    id: "opin-mc-2",
    topic: "asking-giving-opinions",
    type: "multiple-choice",
    difficulty: "beginner",
    sentence: "Choose the extreme adjective for 'good'.",
    grammarRule: "Extreme adjectives",
    explanation:
      "Extreme adjectives like 'fantastic', 'terrible' and 'huge' already mean 'very ...', so they replace normal adjectives for stronger opinions.",
    tip: "good → fantastic/outstanding (extreme pair).",
    multipleChoice: {
      question: "Which word is the extreme adjective for 'good'?",
      correctOption: "fantastic",
      options: ["nice", "fantastic", "bad", "boring"],
      optionExplanations: [
        "'Nice' is just a weaker normal adjective, not an extreme one.",
        "Correct — 'fantastic' is the extreme version of 'good'.",
        "'Bad' is the opposite meaning, not a stronger 'good'.",
        "'Boring' describes something uninteresting, not something very good.",
      ],
    },
  },

  {
    id: "opin-mc-3",
    topic: "asking-giving-opinions",
    type: "multiple-choice",
    difficulty: "intermediate",
    sentence: "Choose the extreme adjective for 'small'.",
    grammarRule: "Extreme adjectives",
    explanation: "'Tiny' is the extreme adjective for 'small' — it means 'extremely small'.",
    tip: "small → tiny (extreme pair).",
    multipleChoice: {
      question: "Which word is the extreme adjective for 'small'?",
      correctOption: "tiny",
      options: ["huge", "tiny", "big", "normal"],
      optionExplanations: [
        "'Huge' is the extreme adjective for 'big', the opposite meaning.",
        "Correct — 'tiny' is the extreme version of 'small'.",
        "'Big' is the opposite meaning, not an extreme version of 'small'.",
        "'Normal' is not related in meaning to 'small'.",
      ],
    },
  },

  {
    id: "opin-mc-4",
    topic: "asking-giving-opinions",
    type: "multiple-choice",
    difficulty: "intermediate",
    sentence: "Choose the extreme adjective for 'difficult'.",
    grammarRule: "Extreme adjectives",
    explanation: "'Impossible' is the extreme adjective for 'difficult' — too difficult to be done at all.",
    tip: "difficult → impossible (extreme pair).",
    multipleChoice: {
      question: "Which word is the extreme adjective for 'difficult'?",
      correctOption: "impossible",
      options: ["easy", "hard", "impossible", "simple"],
      optionExplanations: [
        "'Easy' is the opposite meaning of 'difficult'.",
        "'Hard' is just another normal adjective meaning 'difficult', not an extreme one.",
        "Correct — 'impossible' is the extreme version of 'difficult'.",
        "'Simple' is the opposite meaning of 'difficult'.",
      ],
    },
  },

  {
    id: "opin-mc-5",
    topic: "asking-giving-opinions",
    type: "multiple-choice",
    difficulty: "intermediate",
    sentence: "Choose the correct sentence.",
    grammarRule: "very vs absolutely with extreme adjectives",
    explanation:
      "Use 'very' with normal adjectives and 'absolutely' with extreme adjectives. 'Fantastic' is extreme, so it needs 'absolutely'.",
    tip: "very + normal adjective; absolutely + extreme adjective.",
    multipleChoice: {
      question: "Which option is correct?",
      correctOption: "The film was absolutely fantastic.",
      options: [
        "The film was very fantastic.",
        "The film was absolutely fantastic.",
        "The film was absolutely good.",
        "The film was very outstanding.",
      ],
      optionExplanations: [
        "Wrong — 'fantastic' is extreme, so it can't take 'very'.",
        "Correct — 'absolutely' intensifies the extreme adjective 'fantastic'.",
        "Wrong — 'good' is a normal adjective, so it can't take 'absolutely'.",
        "Wrong — 'outstanding' is extreme, so it can't take 'very'.",
      ],
    },
  },

  {
    id: "opin-mc-6",
    topic: "asking-giving-opinions",
    type: "multiple-choice",
    difficulty: "intermediate",
    sentence: "Someone asks you 'Why do you think that?' How can you reply, giving a reason?",
    grammarRule: "Giving a reason: It's because",
    explanation: "'It's because + reason' is the fixed way to explain why you hold an opinion.",
    tip: "'It's because...' and 'The reason is...' both give a reason.",
    multipleChoice: {
      question: "Which option is correct?",
      correctOption: "It's because the music was too loud.",
      options: [
        "It's because the music was too loud.",
        "I suppose we're all different.",
        "What makes you say that?",
        "How about you?",
      ],
      optionExplanations: [
        "Correct — 'It's because + reason' explains why.",
        "This is for agreeing to disagree, not giving a reason.",
        "This asks for a reason — it doesn't give one.",
        "This asks for someone else's opinion — it doesn't give a reason.",
      ],
    },
  },

  {
    id: "opin-mc-7",
    topic: "asking-giving-opinions",
    type: "multiple-choice",
    difficulty: "advanced",
    sentence:
      "Two friends have completely different opinions about a film. Which phrase politely ends the disagreement?",
    grammarRule: "Agreeing to disagree",
    explanation:
      "'I guess we all like different things' is a fixed phrase for accepting a disagreement about taste politely.",
    tip: "'I suppose we're all different' and 'I guess we all like different things' end a disagreement politely.",
    multipleChoice: {
      question: "Which option is correct?",
      correctOption: "I guess we all like different things.",
      options: [
        "It's because the acting was bad.",
        "What do you think of it?",
        "I guess we all like different things.",
        "The reason is the ending.",
      ],
      optionExplanations: [
        "This gives a reason — it doesn't end a disagreement.",
        "This asks for an opinion — it doesn't end a disagreement.",
        "Correct — a fixed phrase for politely agreeing to disagree.",
        "This gives a short reason — it doesn't end a disagreement.",
      ],
    },
  },

  // ===== WORD TRANSFORM (6) =====

  {
    id: "opin-wt-1",
    topic: "asking-giving-opinions",
    type: "word-transform",
    difficulty: "beginner",
    sentence: "What ___ you think of the concert last night?",
    grammarRule: "Asking for an opinion: do vs did",
    explanation:
      "Use 'did' to ask about something finished, like a concert that is over. Use 'do' for something ongoing or general.",
    tip: "'What did you think of...?' — for a finished event.",
    wordTransform: {
      baseWord: "do/did",
      correctAnswer: "did",
    },
  },

  {
    id: "opin-wt-2",
    topic: "asking-giving-opinions",
    type: "word-transform",
    difficulty: "beginner",
    sentence: "___ you say the ending was happy or sad?",
    grammarRule: "Asking for an opinion: Would you say...?",
    explanation: "'Would you say...?' is a polite way to ask someone to give a careful opinion.",
    tip: "'Would you say (that)...?' invites a thoughtful opinion.",
    wordTransform: {
      baseWord: "Would/Will",
      correctAnswer: "Would",
    },
  },

  {
    id: "opin-wt-3",
    topic: "asking-giving-opinions",
    type: "word-transform",
    difficulty: "intermediate",
    sentence: "These days, I ___ that modern art is more interesting than old paintings.",
    grammarRule: "Giving an opinion: I think",
    explanation:
      "Use the present simple 'I think' for an opinion you hold now or generally, not 'thought' (past).",
    tip: "'I think...' = a current opinion; 'I thought...' = a past one.",
    wordTransform: {
      baseWord: "think/thought",
      correctAnswer: "think",
    },
  },

  {
    id: "opin-wt-4",
    topic: "asking-giving-opinions",
    type: "word-transform",
    difficulty: "intermediate",
    sentence: "It's ___ the service was so slow that I didn't enjoy the meal.",
    grammarRule: "Giving a reason: It's because",
    explanation: "'It's because' introduces the reason for an opinion you just gave.",
    tip: "'It's because + reason' explains why.",
    wordTransform: {
      baseWord: "because/so",
      correctAnswer: "because",
    },
  },

  {
    id: "opin-wt-5",
    topic: "asking-giving-opinions",
    type: "word-transform",
    difficulty: "intermediate",
    sentence: "The ___ is that I prefer books with a happy ending.",
    grammarRule: "Giving a reason: The reason is",
    explanation:
      "'The reason is' is the fixed way to introduce an explanation; 'cause' isn't used this way in spoken opinions.",
    tip: "'The reason is (that) + explanation'.",
    wordTransform: {
      baseWord: "reason/cause",
      correctAnswer: "reason",
    },
  },

  {
    id: "opin-wt-6",
    topic: "asking-giving-opinions",
    type: "word-transform",
    difficulty: "advanced",
    sentence: "I guess we all like different ___.",
    grammarRule: "Agreeing to disagree",
    explanation:
      "'We all like different things' is the fixed phrase for ending a disagreement about taste politely. 'Things' is always plural here.",
    tip: "'I guess we all like different things' ends a disagreement politely.",
    wordTransform: {
      baseWord: "things/thing",
      correctAnswer: "things",
    },
  },

  // ===== SENTENCE MATCH (2) =====

  {
    id: "opin-match-1",
    topic: "asking-giving-opinions",
    type: "sentence-match",
    difficulty: "beginner",
    sentence: "Match each beginning to its correct ending.",
    grammarRule: "Asking for and giving opinions and reasons",
    explanation:
      "These are fixed phrases for discussing opinions. Each beginning has only one natural, correct ending.",
    tip: "Pay attention to the exact collocation each phrase needs (think OF, like different THINGS...).",
    sentenceMatch: {
      pairs: [
        { beginning: "What do you think", ending: "of the meal?" },
        { beginning: "The reason is", ending: "the traffic was terrible." },
        { beginning: "I guess we all like", ending: "different things." },
        { beginning: "What makes you", ending: "say that?" },
      ],
    },
  },

  {
    id: "opin-match-2",
    topic: "asking-giving-opinions",
    type: "sentence-match",
    difficulty: "beginner",
    sentence: "Match each beginning to its correct ending.",
    grammarRule: "Asking for and giving opinions and reasons",
    explanation:
      "These are fixed phrases for discussing opinions, plus the very/absolutely rule for normal and extreme adjectives.",
    tip: "'Absolutely' goes with extreme adjectives (huge); 'very' goes with normal adjectives (small).",
    sentenceMatch: {
      pairs: [
        { beginning: "How about", ending: "you?" },
        { beginning: "I guess it's good we're", ending: "not all the same." },
        { beginning: "It was absolutely", ending: "huge." },
        { beginning: "It was very", ending: "small." },
      ],
    },
  },
];

export const askingGivingOpinionsTopic: GrammarTopic = {
  id: "asking-giving-opinions",
  level: "B1",
  name: "Asking & Giving Opinions",
  description:
    "Practise asking for and giving opinions and reasons, and agreeing to disagree, in English.",
  lesson: "Unit 6C",
  icon: "💭",
  cards: [
    {
      id: "opin-card-1",
      rule: "What do you think of...?",
      example: "What do you think ___ the new art gallery?",
      answer: "of",
      explanation:
        "Use 'What do/did you think of + noun' to ask for someone's opinion. Use 'did' for something in the past.",
      examples: [
        "What do you think of this restaurant?",
        "What did you think of the concert last night?",
      ],
      ua: "«Що ти думаєш про...?» — think of, не think about.",
    },
    {
      id: "opin-card-2",
      rule: "For me, ... (giving an opinion)",
      example: "___ me, the sculpture looks fantastic in the evening light.",
      answer: "For",
      explanation:
        "'For me' introduces a personal opinion, similar to 'in my opinion'. It emphasises that this is your own view.",
      examples: [
        "For me, this is the best album of the year.",
        "For me, graffiti is art, not vandalism.",
      ],
      ua: "«Для мене» (особиста думка): For me, ... = «на мою думку».",
    },
    {
      id: "opin-card-3",
      rule: "In my view, ... (giving an opinion)",
      example: "___ my view, the film was far too long.",
      answer: "In",
      explanation:
        "'In my view' is a fixed phrase for giving an opinion, similar to 'I think'. It usually starts the sentence and is followed by a comma.",
      examples: [
        "In my view, public art should be free for everyone.",
        "In my view, the new app is much easier to use.",
      ],
      ua: "«На мою думку» — In my view, (фіксована фраза, кома після).",
    },
    {
      id: "opin-card-4",
      rule: "I would say (that)...",
      example: "I ___ say that modern art is more interesting than old paintings.",
      answer: "would",
      explanation:
        "'I would say' is a slightly careful, polite way to give an opinion, especially when the topic is debatable.",
      examples: [
        "I would say the film was OK, but not great.",
        "I would say she's one of the best photographers today.",
      ],
      ua: "I would say — обережний спосіб висловити думку: «я б сказав, що...».",
    },
    {
      id: "opin-card-5",
      rule: "Why do you think that? (asking for a reason)",
      example: "\"I loved the performance.\" \"___ do you think that?\"",
      answer: "Why",
      explanation: "Use 'Why do you think that?' to ask someone for the reason behind their opinion.",
      examples: [
        "\"This design is amazing.\" \"Why do you think that?\"",
        "\"I didn't enjoy the book.\" \"Why do you think that?\"",
      ],
      ua: "«Чому ти так думаєш?» — Why do you think that?",
    },
    {
      id: "opin-card-6",
      rule: "It's because... (giving a reason)",
      example: "I loved the show. It's ___ the actors were brilliant.",
      answer: "because",
      explanation: "Use 'it's because' to give the reason for your opinion. 'Because' introduces the cause.",
      examples: [
        "I didn't like the ending. It's because it was too sad.",
        "She enjoys the gym. It's because it helps her relax.",
      ],
      ua: "«Це тому що» — It's because + причина твоєї думки.",
    },
    {
      id: "opin-card-7",
      rule: "I suppose we're all different (agreeing to disagree)",
      example: "You hated the film, but I loved it. I ___ we're all different.",
      answer: "suppose",
      explanation:
        "Use 'I suppose we're all different' or 'I guess we all like different things' to politely end a disagreement about opinions.",
      examples: [
        "I guess we all like different things.",
        "I suppose we're all different — my sister hates spicy food too.",
      ],
      ua: "«Мабуть, ми всі різні» — ввічливо завершити суперечку про смаки.",
    },
    {
      id: "opin-card-8",
      rule: "very + normal adjective, absolutely + extreme adjective",
      example: "The film wasn't just good, it was ___ (very / absolutely) fantastic!",
      answer: "absolutely",
      explanation:
        "Extreme adjectives like fantastic, terrible and huge already have a very strong meaning, so we use 'absolutely', not 'very', to make them stronger.",
      examples: [
        "The meal was absolutely delicious.",
        "It was a very good film, but not absolutely amazing.",
      ],
      ua: "extreme прикметники (fantastic, terrible) підсилюємо absolutely, а не very.",
    },
    {
      id: "opin-card-9",
      rule: "extreme adjectives (bad → terrible, good → fantastic)",
      example: "The food wasn't just bad, it was absolutely ___ (terrible / awful).",
      answer: "terrible",
      explanation:
        "Extreme adjectives like terrible, fantastic, huge and tiny have a stronger meaning than normal adjectives like bad, good, big and small.",
      examples: [
        "The new phone is tiny — it fits in any pocket.",
        "The sculpture is huge; you can see it from the other side of the park.",
      ],
      ua: "extreme прикметники (terrible, fantastic, huge, tiny) сильніші за звичайні (bad, good, big, small).",
    },
  ],
  rules: askingGivingOpinionsQuestions,
};
