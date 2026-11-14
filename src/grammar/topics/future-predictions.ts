import type { GrammarQuestion, GrammarTopic } from "../types.ts";

// Unit 5D — will, might and be going to for predictions
// 25 questions: 6 gap-fill, 6 error-spot, 7 multiple-choice, 6 word-transform
// VERIFIED: all error-spot indexes checked against split(" ") positions.

export const futurePredictionsQuestions: GrammarQuestion[] = [
  // ===== GAP FILL (6) =====

  {
    id: "pred-gap-1",
    topic: "future-predictions",
    type: "gap-fill",
    difficulty: "beginner",
    sentence: "I'm sure we ___ enjoy the concert tonight.",
    // split: I'm(0) sure(1) we(2) ___(3) enjoy(4) the(5) concert(6) tonight.(7)
    grammarRule: "will — confident prediction",
    explanation: "'I'm sure' shows the speaker feels certain about the future, so we use 'will'.",
    tip: "I'm sure + will = a confident prediction.",
    gapFill: {
      gapIndex: 3,
      correctAnswer: "will",
      options: ["will", "might", "won't", "are going to"],
      correctOptionIndex: 0,
    },
  },
  {
    id: "pred-gap-2",
    topic: "future-predictions",
    type: "gap-fill",
    difficulty: "beginner",
    sentence: "He's very reliable, so I'm sure he ___ let us down.",
    // split: He's(0) very(1) reliable,(2) so(3) I'm(4) sure(5) he(6) ___(7) let(8) us(9) down.(10)
    grammarRule: "won't — confident negative prediction",
    explanation: "'Won't' (will not) makes a confident negative prediction — we are sure something will not happen.",
    tip: "Reliable + sure = won't let you down.",
    gapFill: {
      gapIndex: 7,
      correctAnswer: "won't",
      options: ["won't", "might not", "doesn't", "isn't"],
      correctOptionIndex: 0,
    },
  },
  {
    id: "pred-gap-3",
    topic: "future-predictions",
    type: "gap-fill",
    difficulty: "intermediate",
    sentence: "I haven't checked the schedule, so we ___ be free on Friday.",
    // split: I(0) haven't(1) checked(2) the(3) schedule,(4) so(5) we(6) ___(7) be(8) free(9) on(10) Friday.(11)
    grammarRule: "might — uncertain prediction",
    explanation: "'Might' shows we are not sure about the future — it's a possibility, not a certainty.",
    tip: "Haven't decided/checked yet = might, not will.",
    gapFill: {
      gapIndex: 7,
      correctAnswer: "might",
      options: ["might", "will", "won't", "are"],
      correctOptionIndex: 0,
    },
  },
  {
    id: "pred-gap-4",
    topic: "future-predictions",
    type: "gap-fill",
    difficulty: "intermediate",
    sentence: "I'm not sure about my plans, so I ___ come to the party.",
    // split: I'm(0) not(1) sure(2) about(3) my(4) plans,(5) so(6) I(7) ___(8) come(9) to(10) the(11) party.(12)
    grammarRule: "might not — uncertain negative prediction",
    explanation: "'Might not' shows it's possible something won't happen, but we can't be certain either way.",
    tip: "Not sure = might not, a softer, less certain negative than won't.",
    gapFill: {
      gapIndex: 8,
      correctAnswer: "might not",
      options: ["might not", "won't", "don't", "am not"],
      correctOptionIndex: 0,
    },
  },
  {
    id: "pred-gap-5",
    topic: "future-predictions",
    type: "gap-fill",
    difficulty: "intermediate",
    sentence: "Look at those grey clouds — it ___ rain any minute.",
    // split: Look(0) at(1) those(2) grey(3) clouds(4) —(5) it(6) ___(7) rain(8) any(9) minute.(10)
    grammarRule: "be going to — evidence-based prediction",
    explanation: "We use 'be going to' when we can see evidence right now that something will happen — here, the grey clouds.",
    tip: "Evidence you can see now (clouds, a queue, a mess) = going to, not will.",
    gapFill: {
      gapIndex: 7,
      correctAnswer: "is going to",
      options: ["is going to", "will", "might", "was going to"],
      correctOptionIndex: 0,
    },
  },
  {
    id: "pred-gap-6",
    topic: "future-predictions",
    type: "gap-fill",
    difficulty: "advanced",
    sentence: "Experts say screens ___ become much thinner in the next few years.",
    // split: Experts(0) say(1) screens(2) ___(3) become(4) much(5) thinner(6) in(7) the(8) next(9) few(10) years.(11)
    grammarRule: "will — general prediction based on opinion",
    explanation: "A general prediction about the distant future, based on someone's opinion or expertise rather than visible evidence, uses 'will'.",
    tip: "Experts say/believe/think + will — an opinion-based prediction, not something you can see happening now.",
    gapFill: {
      gapIndex: 3,
      correctAnswer: "will",
      options: ["will", "is going to", "might", "was"],
      correctOptionIndex: 0,
    },
  },

  // ===== ERROR SPOT (6) =====
  // RULE: every error is exactly ONE word. Replacing wrongWord with
  // correction must produce a 100% grammatically correct sentence.

  // split(" ") → [0=She, 1=will, 2=probably, 3=passes, 4=the, 5=exam, 6=next, 7=week.]
  // words[3]="passes" ✅  corrected: "She will probably pass the exam next week." ✅
  {
    id: "pred-error-1",
    topic: "future-predictions",
    type: "error-spot",
    difficulty: "beginner",
    sentence: "She will probably passes the exam next week.",
    grammarRule: "will + base verb",
    explanation: "After 'will', the verb always stays in its base form — never add -s, even for 'she/he/it'.",
    errorSpot: {
      errorWordIndex: 3,
      wrongWord: "passes",
      correction: "pass",
      reason: "After 'will', use the base verb with no -s: 'She will probably pass the exam.'",
      correctionOptions: ["pass", "passes", "passed", "passing"],
    },
  },

  // split(" ") → [0=It's, 1=going, 2=to, 3=raining, 4=later.]
  // words[3]="raining" ✅  corrected: "It's going to rain later." ✅
  {
    id: "pred-error-2",
    topic: "future-predictions",
    type: "error-spot",
    difficulty: "beginner",
    sentence: "It's going to raining later.",
    grammarRule: "be going to + base verb",
    explanation: "After 'going to', the verb always stays in its base form, never -ing: 'It's going to rain.'",
    errorSpot: {
      errorWordIndex: 3,
      wrongWord: "raining",
      correction: "rain",
      reason: "'Going to' is followed by the base verb, not the -ing form: 'It's going to rain later.'",
      correctionOptions: ["rain", "raining", "rains", "rained"],
    },
  },

  // split(" ") → [0=She, 1=never, 2=forgets, 3=anything,, 4=so, 5=I'm, 6=sure, 7=she, 8=will, 9=forget, 10=your, 11=birthday.]
  // words[8]="will" ✅  corrected: "...so I'm sure she won't forget your birthday." ✅
  {
    id: "pred-error-3",
    topic: "future-predictions",
    type: "error-spot",
    difficulty: "intermediate",
    sentence: "She never forgets anything, so I'm sure she will forget your birthday.",
    grammarRule: "won't — confident negative prediction",
    explanation: "Since she never forgets anything, the confident prediction should be negative: 'won't', not 'will'.",
    errorSpot: {
      errorWordIndex: 8,
      wrongWord: "will",
      correction: "won't",
      reason: "The context (she never forgets) needs a confident NEGATIVE prediction: 'I'm sure she won't forget.'",
      correctionOptions: ["won't", "can't", "doesn't", "isn't"],
    },
  },

  // split(" ") → [0=I, 1=haven't, 2=decided, 3=about, 4=the, 5=trip,, 6=so, 7=I, 8=will, 9=go, 10=next, 11=week.]
  // words[8]="will" ✅  corrected: "...so I might go next week." ✅
  {
    id: "pred-error-4",
    topic: "future-predictions",
    type: "error-spot",
    difficulty: "intermediate",
    sentence: "I haven't decided about the trip, so I will go next week.",
    grammarRule: "might — uncertain prediction",
    explanation: "'Haven't decided' shows uncertainty, so the prediction should use 'might', not the confident 'will'.",
    errorSpot: {
      errorWordIndex: 8,
      wrongWord: "will",
      correction: "might",
      reason: "Uncertainty ('haven't decided') needs 'might': 'so I might go next week.'",
      correctionOptions: ["might", "will", "can", "must"],
    },
  },

  // split(" ") → [0=They, 1=is, 2=going, 3=to, 4=visit, 5=us, 6=next, 7=weekend.]
  // words[1]="is" ✅  corrected: "They are going to visit us next weekend." ✅
  {
    id: "pred-error-5",
    topic: "future-predictions",
    type: "error-spot",
    difficulty: "intermediate",
    sentence: "They is going to visit us next weekend.",
    grammarRule: "be going to — subject-verb agreement",
    explanation: "'Be' must agree with the subject: 'they' takes 'are', not 'is'.",
    errorSpot: {
      errorWordIndex: 1,
      wrongWord: "is",
      correction: "are",
      reason: "The plural subject 'they' needs 'are going to', not 'is going to'.",
      correctionOptions: ["are", "is", "be", "were"],
    },
  },

  // split(" ") → [0=I, 1=don't, 2=think, 3=it, 4=might, 5=rain, 6=later.]
  // words[4]="might" ✅  corrected: "I don't think it will rain later." ✅
  {
    id: "pred-error-6",
    topic: "future-predictions",
    type: "error-spot",
    difficulty: "advanced",
    sentence: "I don't think it might rain later.",
    grammarRule: "don't think + will — negative belief",
    explanation: "To say you don't believe something will happen, use 'don't think ... will', not 'might' — 'might' is already uncertain, so combining it with 'don't think' doesn't work naturally.",
    errorSpot: {
      errorWordIndex: 4,
      wrongWord: "might",
      correction: "will",
      reason: "'I don't think it will rain' is the natural way to express a negative prediction — not 'I don't think it might rain'.",
      correctionOptions: ["will", "might", "would", "could"],
    },
  },

  // ===== MULTIPLE CHOICE (7) =====

  {
    id: "pred-mc-1",
    topic: "future-predictions",
    type: "multiple-choice",
    difficulty: "beginner",
    sentence: "Choose the sentence that shows the speaker feels certain about the future:",
    grammarRule: "will — confident prediction",
    explanation: "'Will' is used when the speaker feels certain about a prediction, often signalled by 'I'm sure'.",
    tip: "I'm sure + will = certainty.",
    multipleChoice: {
      question: "Which sentence is correct?",
      correctOption: "I'm sure the train will arrive on time.",
      options: [
        "I'm sure the train will arrive on time.",
        "The train might arrive on time.",
        "The train could arrive on time.",
        "Perhaps the train will arrive on time.",
      ],
      optionExplanations: {
        "I'm sure the train will arrive on time.": "Correct! 'I'm sure' + 'will' expresses a confident prediction.",
        "The train might arrive on time.": "Wrong. 'Might' expresses uncertainty, not confidence.",
        "The train could arrive on time.": "Wrong. 'Could' here suggests possibility, not certainty.",
        "Perhaps the train will arrive on time.": "Wrong. 'Perhaps' signals doubt, which contradicts feeling certain.",
      },
    },
  },
  {
    id: "pred-mc-2",
    topic: "future-predictions",
    type: "multiple-choice",
    difficulty: "beginner",
    sentence: "Choose the sentence that correctly uses 'be going to' for a prediction based on evidence you can see right now:",
    grammarRule: "be going to — evidence-based prediction",
    explanation: "'Be going to' is used when there is visible evidence right now that something will happen.",
    tip: "Look at the sky — it's going to snow! Evidence you can see now = going to.",
    multipleChoice: {
      question: "Which sentence is correct?",
      correctOption: "Look at the sky – it's going to snow!",
      options: [
        "Look at the sky – it's going to snow!",
        "Look at the sky – it will snow probably!",
        "Look at the sky – it might going to snow!",
        "Look at the sky – it's will snow!",
      ],
      optionExplanations: {
        "Look at the sky – it's going to snow!": "Correct! Visible evidence (the sky) + 'be going to' is the natural combination.",
        "Look at the sky – it will snow probably!": "Wrong. 'Probably' must come before 'will', not after: 'it will probably snow'.",
        "Look at the sky – it might going to snow!": "Wrong. 'Might' and 'going to' cannot be combined like this.",
        "Look at the sky – it's will snow!": "Wrong. 'Is' and 'will' cannot be used together.",
      },
    },
  },
  {
    id: "pred-mc-3",
    topic: "future-predictions",
    type: "multiple-choice",
    difficulty: "intermediate",
    sentence: "A: 'Why do you have your umbrella?' You can see dark clouds outside. Choose the best reply:",
    grammarRule: "be going to vs will — evidence vs opinion",
    explanation: "Since the dark clouds are visible evidence right now, 'be going to' is the natural choice for this prediction.",
    tip: "Visible evidence right now (dark clouds) = going to, not will.",
    multipleChoice: {
      question: "Which reply fits best, given she can see dark clouds right now?",
      correctOption: "Because I think it's going to rain.",
      options: [
        "Because I think it's going to rain.",
        "Because it might have rained.",
        "Because it has rained.",
        "Because it was going to rain.",
      ],
      optionExplanations: {
        "Because I think it's going to rain.": "Correct! Evidence visible now (dark clouds) + 'be going to' makes a natural prediction.",
        "Because it might have rained.": "Wrong. This is about the past, not a prediction about the future.",
        "Because it has rained.": "Wrong. Present perfect describes something that already happened.",
        "Because it was going to rain.": "Wrong. Past tense doesn't fit a prediction made right now.",
      },
    },
  },
  {
    id: "pred-mc-4",
    topic: "future-predictions",
    type: "multiple-choice",
    difficulty: "intermediate",
    sentence: "Your friend asks if you're coming to the party, but you haven't decided yet. Choose the best reply:",
    grammarRule: "might — uncertain prediction",
    explanation: "'Might' is the correct choice when you genuinely haven't decided — it expresses a real possibility, not a certainty.",
    tip: "Haven't decided yet = might, never will or won't.",
    multipleChoice: {
      question: "Which reply fits best?",
      correctOption: "I might come – I haven't decided yet.",
      options: [
        "I might come – I haven't decided yet.",
        "I will come – I haven't decided yet.",
        "I won't come – I haven't decided yet.",
        "I'm going to come – I haven't decided yet.",
      ],
      optionExplanations: {
        "I might come – I haven't decided yet.": "Correct! 'Might' matches the genuine uncertainty of not having decided.",
        "I will come – I haven't decided yet.": "Wrong. 'Will' expresses certainty, which contradicts 'haven't decided'.",
        "I won't come – I haven't decided yet.": "Wrong. 'Won't' is also a confident prediction, which contradicts the uncertainty.",
        "I'm going to come – I haven't decided yet.": "Wrong. 'Going to' suggests a firm plan, which contradicts not having decided.",
      },
    },
  },
  {
    id: "pred-mc-5",
    topic: "future-predictions",
    type: "multiple-choice",
    difficulty: "intermediate",
    sentence: "Choose the grammatically correct sentence:",
    grammarRule: "definitely/probably + won't — word order before won't",
    explanation: "'Definitely' and 'probably' come immediately before 'won't', never after it.",
    tip: "Probably/definitely + won't — the adverb always comes right before 'won't'.",
    multipleChoice: {
      question: "Which sentence is correct?",
      correctOption: "She definitely won't be late – she's never late.",
      options: [
        "She definitely won't be late – she's never late.",
        "She won't definitely be late – she's never late.",
        "She don't definitely won't be late.",
        "She definitely not will be late.",
      ],
      optionExplanations: {
        "She definitely won't be late – she's never late.": "Correct! 'Definitely' comes right before 'won't'.",
        "She won't definitely be late – she's never late.": "Wrong. The adverb must come before 'won't', not after it.",
        "She don't definitely won't be late.": "Wrong. This has a double negative and incorrect auxiliary 'don't'.",
        "She definitely not will be late.": "Wrong. 'Not' must attach to 'will' as 'won't', not stand alone before it.",
      },
    },
  },
  {
    id: "pred-mc-6",
    topic: "future-predictions",
    type: "multiple-choice",
    difficulty: "intermediate",
    sentence: "Choose the sentence that makes a general prediction based on opinion, not something you can see happening right now:",
    grammarRule: "will vs be going to — opinion vs visible evidence",
    explanation: "'Will' is used for general predictions based on opinion or belief about the future, without visible evidence right now.",
    tip: "An opinion about the distant future = will. Visible evidence right now = going to.",
    multipleChoice: {
      question: "Which sentence is correct?",
      correctOption: "I think robots will do more jobs in the future.",
      options: [
        "I think robots will do more jobs in the future.",
        "Look, the robot is going to fall over!",
        "The machine is going to break any second.",
        "Watch out, it's going to explode!",
      ],
      optionExplanations: {
        "I think robots will do more jobs in the future.": "Correct! A general opinion about the future, with no visible evidence right now, uses 'will'.",
        "Look, the robot is going to fall over!": "Wrong. 'Look' signals visible evidence right now, which needs 'going to'.",
        "The machine is going to break any second.": "Wrong. This describes something you can see happening right now.",
        "Watch out, it's going to explode!": "Wrong. 'Watch out' signals immediate visible danger, which needs 'going to'.",
      },
    },
  },
  {
    id: "pred-mc-7",
    topic: "future-predictions",
    type: "multiple-choice",
    difficulty: "advanced",
    sentence: "Choose the grammatically correct sentence:",
    grammarRule: "probably/definitely + be going to — word order",
    explanation: "With 'be going to', 'probably' and 'definitely' go between 'be' and 'going to', not inside or after the phrase.",
    tip: "He's probably going to be late — the adverb sits between 'be' and 'going to'.",
    multipleChoice: {
      question: "Which sentence is correct?",
      correctOption: "He's probably going to be late again.",
      options: [
        "He's probably going to be late again.",
        "He's going probably to be late again.",
        "He's going to probably be late again.",
        "He probably's going to be late again.",
      ],
      optionExplanations: {
        "He's probably going to be late again.": "Correct! 'Probably' sits between 'be' and 'going to'.",
        "He's going probably to be late again.": "Wrong. This breaks up 'going to' in the wrong place.",
        "He's going to probably be late again.": "Wrong. 'Probably' belongs before 'going to', not after it.",
        "He probably's going to be late again.": "Wrong. 'Probably's' is not a valid contraction.",
      },
    },
  },

  // ===== WORD TRANSFORM (6) =====

  {
    id: "pred-wt-1",
    topic: "future-predictions",
    type: "word-transform",
    difficulty: "beginner",
    sentence: "I ___ (call) you as soon as I arrive.",
    grammarRule: "will — promise / confident prediction",
    explanation: "A confident promise about the future uses 'will' + base verb.",
    tip: "Promises and confident predictions: will + base verb.",
    wordTransform: {
      baseWord: "call",
      correctAnswer: "will call",
    },
  },
  {
    id: "pred-wt-2",
    topic: "future-predictions",
    type: "word-transform",
    difficulty: "beginner",
    sentence: "They've lost their three best players, so they ___ (win) the match tonight.",
    grammarRule: "won't — confident negative prediction",
    explanation: "Strong evidence of a bad outcome leads to a confident negative prediction with 'won't'.",
    tip: "Confident 'no' about the future: won't + base verb.",
    wordTransform: {
      baseWord: "win",
      correctAnswer: "won't win",
    },
  },
  {
    id: "pred-wt-3",
    topic: "future-predictions",
    type: "word-transform",
    difficulty: "intermediate",
    sentence: "I haven't decided yet, but I ___ (go) to the gym later.",
    grammarRule: "might — uncertain prediction",
    explanation: "'Might' + base verb expresses a real possibility when the speaker hasn't decided yet.",
    tip: "Haven't decided = might + base verb.",
    wordTransform: {
      baseWord: "go",
      correctAnswer: "might go",
    },
  },
  {
    id: "pred-wt-4",
    topic: "future-predictions",
    type: "word-transform",
    difficulty: "intermediate",
    sentence: "Look at those clouds – it ___ (rain) soon.",
    grammarRule: "be going to — evidence-based prediction",
    explanation: "Visible evidence (the clouds) right now calls for 'be going to' + base verb.",
    tip: "Evidence you can see now: is/are going to + base verb.",
    wordTransform: {
      baseWord: "rain",
      correctAnswer: "is going to rain",
    },
  },
  {
    id: "pred-wt-5",
    topic: "future-predictions",
    type: "word-transform",
    difficulty: "intermediate",
    sentence: "I'm not sure about dinner yet – I ___ (cook) tonight.",
    grammarRule: "might not — uncertain negative prediction",
    explanation: "'Might not' + base verb expresses genuine uncertainty about a negative outcome.",
    tip: "Not sure + negative idea = might not + base verb.",
    wordTransform: {
      baseWord: "cook",
      correctAnswer: "might not cook",
    },
  },
  {
    id: "pred-wt-6",
    topic: "future-predictions",
    type: "word-transform",
    difficulty: "advanced",
    sentence: "She's worked so hard all year, so she ___ (pass) her final exams.",
    grammarRule: "definitely + going to / will — strong confident prediction",
    explanation: "'Definitely' with 'be going to' or 'will' expresses the strongest level of confidence in a prediction.",
    tip: "Strongest confidence: definitely + going to, or definitely + will.",
    wordTransform: {
      baseWord: "pass",
      correctAnswer: "is definitely going to pass",
      alternativeAnswers: ["will definitely pass"],
    },
  },
];

export const futurePredictionsTopic: GrammarTopic = {
  id: "future-predictions",
  level: "B1",
  name: "Predictions: will, might & be going to",
  description:
    "Practise making predictions about the future with will, might and be going to, and learn where probably and definitely go in the sentence.",
  lesson: "Unit 5D",
  icon: "🔮",
  cards: [
    {
      id: "pred-card-1",
      rule: "will — confident prediction",
      example: "I'm sure the team ___ (win) tonight.",
      answer: "will win",
      explanation: "We use will when we feel certain about a prediction, often after phrases like I'm sure or I think.",
      examples: ["I'm sure she will get the job.", "I think ticket prices will go up next year."],
      ua: "will — впевнений прогноз: I'm sure she will win («я впевнений, що...»).",
    },
    {
      id: "pred-card-2",
      rule: "won't — confident negative prediction",
      example: "He's very organised, so he ___ (forget) the meeting.",
      answer: "won't forget",
      explanation: "Won't (will not) makes a confident negative prediction — we are sure something will not happen.",
      examples: ["Don't worry, we won't be late.", "I'm sure she won't mind waiting a few minutes."],
      ua: "won't — впевнений прогноз «не»: I'm sure he won't be late.",
    },
    {
      id: "pred-card-3",
      rule: "might — uncertain prediction",
      example: "We haven't decided yet, so we ___ (go) camping this summer.",
      answer: "might go",
      explanation: "Might shows we are not sure about a prediction — it's a possibility, not a certainty.",
      examples: ["They might win the game, but they might not.", "I might take the early train tomorrow."],
      ua: "might — можливість, коли не впевнені: We might go («можливо, підемо»).",
    },
    {
      id: "pred-card-4",
      rule: "might not — uncertain negative prediction",
      example: "I'm feeling ill, so I ___ (come) to work tomorrow.",
      answer: "might not come",
      explanation: "Might not shows it's possible something won't happen, but we can't be certain either way.",
      examples: ["She might not finish the report today.", "We might not have time to visit everyone."],
      ua: "might not — можливо, що ні: I might not come («можливо, я не прийду»).",
    },
    {
      id: "pred-card-5",
      rule: "be going to — evidence-based prediction",
      example: "Look at those dark clouds — it ___ (will / going to) rain soon.",
      answer: "is going to",
      explanation: "We use be going to when we can see evidence right now that something will happen.",
      examples: ["Look out, that glass is going to fall off the table!", "She's exhausted — she's going to sleep all weekend."],
      ua: "be going to — прогноз на основі доказів зараз: it's going to rain!",
    },
    {
      id: "pred-card-6",
      rule: "will + probably/definitely — adverb after will",
      example: "She's a great student, so she ___ (pass) all her exams.",
      answer: "will probably pass",
      explanation: "Probably and definitely usually come straight after will, not before it: she'll probably pass, not she probably will pass.",
      examples: ["He'll definitely be late — he always is.", "They'll probably arrive before lunch."],
      ua: "probably/definitely стоять одразу після will: she'll probably pass.",
    },
    {
      id: "pred-card-7",
      rule: "definitely/probably + won't — before won't",
      example: "He's missed the bus three times this week, so he ___ (be) on time today.",
      answer: "definitely won't be",
      explanation: "With won't, probably and definitely come before it, not after: she probably won't call, not she won't probably call.",
      examples: ["I definitely won't be able to make the meeting.", "She probably won't call again tonight."],
      ua: "З won't ці слова йдуть ПЕРЕД ним: she probably won't call.",
    },
    {
      id: "pred-card-8",
      rule: "probably/definitely with be going to",
      example: "She's running really late, so she ___ (miss) the bus.",
      answer: "is probably going to miss",
      explanation: "We can also use probably and definitely with be going to, placed between be and going to.",
      examples: ["He's definitely not going to meet us there.", "We're probably going to be late for the film."],
      ua: "З be going to ці слова стоять між be і going to: she's probably going to miss it.",
    },
  ],
  rules: futurePredictionsQuestions,
};

export default futurePredictionsQuestions;
