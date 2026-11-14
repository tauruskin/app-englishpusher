import type { GrammarQuestion, GrammarTopic } from "../types.ts";

// Unit 7D — Go solo? (reflexive pronouns)
// 25 questions: 6 gap-fill, 6 error-spot, 7 multiple-choice, 6 word-transform

export const reflexivePronounsQuestions: GrammarQuestion[] = [
  // ===== GAP FILL (6) =====

  {
    id: "rp-gap-1",
    topic: "reflexive-pronouns",
    type: "gap-fill",
    difficulty: "beginner",
    sentence: "I hurt ___ while I was chopping vegetables for dinner.",
    // split: I(0) hurt(1) ___(2) while(3) I(4) was(5) chopping(6) vegetables(7) for(8) dinner.(9)
    grammarRule: "reflexive pronoun as the object of the verb",
    explanation:
      "The subject (I) and the object of the verb are the same person, so we use the reflexive pronoun 'myself'.",
    tip: "Subject and object are the same person → use a reflexive pronoun: myself, yourself, himself...",
    gapFill: {
      gapIndex: 2,
      correctAnswer: "myself",
      options: ["myself", "himself", "herself", "yourself"],
      correctOptionIndex: 0, // options[0] === "myself" ✓
    },
  },

  {
    id: "rp-gap-2",
    topic: "reflexive-pronouns",
    type: "gap-fill",
    difficulty: "beginner",
    sentence: "They introduced ___ to the new manager before the meeting started.",
    // split: They(0) introduced(1) ___(2) to(3) the(4) new(5) manager(6) before(7) the(8) meeting(9) started.(10)
    grammarRule: "reflexive pronoun for a plural subject",
    explanation:
      "The subject 'they' is plural, so the reflexive pronoun must also be plural: 'themselves'.",
    tip: "They/we introduce themselves/ourselves — plural subject, plural reflexive pronoun.",
    gapFill: {
      gapIndex: 2,
      correctAnswer: "themselves",
      options: ["themselves", "ourselves", "yourselves", "itself"],
      correctOptionIndex: 0, // options[0] === "themselves" ✓
    },
  },

  {
    id: "rp-gap-3",
    topic: "reflexive-pronouns",
    type: "gap-fill",
    difficulty: "intermediate",
    sentence: "She always prefers travelling by ___ rather than in a big group.",
    // split: She(0) always(1) prefers(2) travelling(3) by(4) ___(5) rather(6) than(7) in(8) a(9) big(10) group.(11)
    grammarRule: "by + reflexive pronoun = alone",
    explanation: "'By' + a reflexive pronoun means 'alone', with no one else's help or company.",
    tip: "By myself/herself/himself = alone, with no company.",
    gapFill: {
      gapIndex: 5,
      correctAnswer: "herself",
      options: ["herself", "himself", "itself", "themselves"],
      correctOptionIndex: 0, // options[0] === "herself" ✓
    },
  },

  {
    id: "rp-gap-4",
    topic: "reflexive-pronouns",
    type: "gap-fill",
    difficulty: "intermediate",
    sentence: "We treated ___ to a big breakfast after the long hike.",
    // split: We(0) treated(1) ___(2) to(3) a(4) big(5) breakfast(6) after(7) the(8) long(9) hike.(10)
    grammarRule: "reflexive pronoun for a plural subject",
    explanation: "The subject 'we' takes the plural reflexive pronoun 'ourselves'.",
    tip: "We → ourselves. Never 'we' + 'themselves' or 'yourselves'.",
    gapFill: {
      gapIndex: 2,
      correctAnswer: "ourselves",
      options: ["ourselves", "themselves", "yourselves", "myself"],
      correctOptionIndex: 0, // options[0] === "ourselves" ✓
    },
  },

  {
    id: "rp-gap-5",
    topic: "reflexive-pronouns",
    type: "gap-fill",
    difficulty: "intermediate",
    sentence: "Enjoy ___ at the party tonight, Tom!",
    // split: Enjoy(0) ___(1) at(2) the(3) party(4) tonight,(5) Tom!(6)
    grammarRule: "fixed expression: Enjoy yourself!",
    explanation:
      "'Enjoy yourself!' is a fixed expression said to one person to wish them a good time.",
    tip: "Enjoy yourself! (one person) / Enjoy yourselves! (more than one person).",
    gapFill: {
      gapIndex: 1,
      correctAnswer: "yourself",
      options: ["yourself", "yourselves", "himself", "herself"],
      correctOptionIndex: 0, // options[0] === "yourself" ✓
    },
  },

  {
    id: "rp-gap-6",
    topic: "reflexive-pronouns",
    type: "gap-fill",
    difficulty: "advanced",
    sentence: "Mark says he painted the entire fence ___ last summer, without hiring anyone.",
    // split: Mark(0) says(1) he(2) painted(3) the(4) entire(5) fence(6) ___(7) last(8) summer,(9) without(10) hiring(11) anyone.(12)
    grammarRule: "reflexive pronoun for emphasis",
    explanation:
      "The reflexive pronoun at the end of the sentence emphasises that 'he' did the job alone, without any help.",
    tip: "A reflexive pronoun at the end of a sentence emphasises 'alone, with no help'.",
    gapFill: {
      gapIndex: 7,
      correctAnswer: "himself",
      options: ["himself", "herself", "itself", "yourself"],
      correctOptionIndex: 0, // options[0] === "himself" ✓
    },
  },

  // ===== ERROR SPOT (6) =====

  {
    id: "rp-error-1",
    topic: "reflexive-pronouns",
    type: "error-spot",
    difficulty: "beginner",
    sentence: "The light just switched herself on when I opened the door.",
    // split(" ") → [0=The, 1=light, 2=just, 3=switched, 4=herself, 5=on, 6=when, 7=I, 8=opened, 9=the, 10=door.]
    // words[4]="herself" ✅  corrected: "The light just switched itself on when I opened the door." ✅
    grammarRule: "itself for things",
    explanation:
      "'The light' is a thing, not a person, so it has no grammatical gender. English always uses 'itself' for objects and animals.",
    tip: "Objects and animals never take 'himself' or 'herself' — always 'itself'.",
    errorSpot: {
      errorWordIndex: 4,
      wrongWord: "herself",
      correction: "itself",
      reason: "'The light' is a thing, so it takes 'itself', not 'herself'.",
      correctionOptions: ["itself", "herself", "himself", "themselves"], // "itself" at index 0
    },
  },

  {
    id: "rp-error-2",
    topic: "reflexive-pronouns",
    type: "error-spot",
    difficulty: "beginner",
    sentence: "The kids managed to tidy their room by theirself before the guests arrived.",
    // split(" ") → [0=The, 1=kids, 2=managed, 3=to, 4=tidy, 5=their, 6=room, 7=by, 8=theirself, 9=before, 10=the, 11=guests, 12=arrived.]
    // words[8]="theirself" ✅  corrected: "The kids managed to tidy their room by themselves before the guests arrived." ✅
    grammarRule: "themselves, not theirself",
    explanation: "'Theirself' doesn't exist in English. The plural reflexive pronoun for 'the kids' is 'themselves'.",
    tip: "There is no word 'theirself' — the correct plural form is 'themselves'.",
    errorSpot: {
      errorWordIndex: 8,
      wrongWord: "theirself",
      correction: "themselves",
      reason: "'Theirself' isn't a word — the plural reflexive pronoun is 'themselves'.",
      correctionOptions: ["themselves", "theirself", "theirselves", "itself"], // "themselves" at index 0
    },
  },

  {
    id: "rp-error-3",
    topic: "reflexive-pronouns",
    type: "error-spot",
    difficulty: "intermediate",
    sentence: "I can email yourself the report as soon as it's ready.",
    // split(" ") → [0=I, 1=can, 2=email, 3=yourself, 4=the, 5=report, 6=as, 7=soon, 8=as, 9=it's, 10=ready.]
    // words[3]="yourself" ✅  corrected: "I can email you the report as soon as it's ready." ✅
    grammarRule: "object pronoun when subject and object are different people",
    explanation:
      "The subject is 'I' and the object is the listener, a different person, so we need the object pronoun 'you', not the reflexive 'yourself'.",
    tip: "Reflexive pronouns are only for when the subject and object are the SAME person.",
    errorSpot: {
      errorWordIndex: 3,
      wrongWord: "yourself",
      correction: "you",
      reason: "The subject 'I' and the object are different people, so we need 'you', not 'yourself'.",
      correctionOptions: ["you", "yourself", "yours", "your"], // "you" at index 0
    },
  },

  {
    id: "rp-error-4",
    topic: "reflexive-pronouns",
    type: "error-spot",
    difficulty: "intermediate",
    sentence: "We're planning to drive to the coast yourselves this weekend.",
    // split(" ") → [0=We're, 1=planning, 2=to, 3=drive, 4=to, 5=the, 6=coast, 7=yourselves, 8=this, 9=weekend.]
    // words[7]="yourselves" ✅  corrected: "We're planning to drive to the coast ourselves this weekend." ✅
    grammarRule: "reflexive pronoun must match the subject",
    explanation: "The subject is 'we', so the reflexive pronoun must be 'ourselves', not 'yourselves'.",
    tip: "Match the reflexive pronoun to the subject: we → ourselves.",
    errorSpot: {
      errorWordIndex: 7,
      wrongWord: "yourselves",
      correction: "ourselves",
      reason: "The subject is 'we', so the reflexive pronoun must be 'ourselves'.",
      correctionOptions: ["ourselves", "yourselves", "themselves", "itself"], // "ourselves" at index 0
    },
  },

  {
    id: "rp-error-5",
    topic: "reflexive-pronouns",
    type: "error-spot",
    difficulty: "intermediate",
    sentence: "Jake was really proud that he'd fixed the old radio by itself without any help.",
    // split(" ") → [0=Jake, 1=was, 2=really, 3=proud, 4=that, 5=he'd, 6=fixed, 7=the, 8=old, 9=radio, 10=by, 11=itself, 12=without, 13=any, 14=help.]
    // words[11]="itself" ✅  corrected: "Jake was really proud that he'd fixed the old radio by himself without any help." ✅
    grammarRule: "himself for a male person",
    explanation: "'Jake' is a person, not a thing, so the reflexive pronoun must be 'himself', not 'itself'.",
    tip: "People always take himself/herself/myself/yourself — never 'itself'.",
    errorSpot: {
      errorWordIndex: 11,
      wrongWord: "itself",
      correction: "himself",
      reason: "'Jake' is a person, so the reflexive pronoun must be 'himself', not 'itself'.",
      correctionOptions: ["himself", "itself", "herself", "themselves"], // "himself" at index 0
    },
  },

  {
    id: "rp-error-6",
    topic: "reflexive-pronouns",
    type: "error-spot",
    difficulty: "advanced",
    sentence: "Maria painted the whole fence by yourself last weekend.",
    // split(" ") → [0=Maria, 1=painted, 2=the, 3=whole, 4=fence, 5=by, 6=yourself, 7=last, 8=weekend.]
    // words[6]="yourself" ✅  corrected: "Maria painted the whole fence by herself last weekend." ✅
    grammarRule: "reflexive pronoun must match the subject",
    explanation: "The subject is 'Maria', a female third person, so the reflexive pronoun must be 'herself'.",
    tip: "Check who the subject is before choosing the reflexive pronoun.",
    errorSpot: {
      errorWordIndex: 6,
      wrongWord: "yourself",
      correction: "herself",
      reason: "The subject is 'Maria', so the reflexive pronoun must be 'herself', not 'yourself'.",
      correctionOptions: ["herself", "yourself", "himself", "themselves"], // "herself" at index 0
    },
  },

  // ===== MULTIPLE CHOICE (7) =====

  {
    id: "rp-mc-1",
    topic: "reflexive-pronouns",
    type: "multiple-choice",
    difficulty: "beginner",
    sentence: "Which sentence means the person did the task completely alone?",
    grammarRule: "by + reflexive pronoun = alone",
    explanation: "'By' + a reflexive pronoun means 'alone', with no one else's help or company.",
    tip: "By + myself/herself/himself = alone.",
    multipleChoice: {
      question: "Which option is correct?",
      correctOption: "She painted the room by herself.",
      options: [
        "She painted the room by herself.",
        "She painted the room for herself.",
        "She painted the room to herself.",
        "She painted the room about herself.",
      ],
      optionExplanations: {
        "She painted the room by herself.": "Correct — 'by herself' means she did it alone, with no help.",
        "She painted the room for herself.": "Wrong — 'for herself' would mean she did it for her own benefit, not that she was alone.",
        "She painted the room to herself.": "Wrong — 'to herself' isn't used with this meaning.",
        "She painted the room about herself.": "Wrong — 'about herself' doesn't make sense here.",
      },
    },
  },

  {
    id: "rp-mc-2",
    topic: "reflexive-pronouns",
    type: "multiple-choice",
    difficulty: "beginner",
    sentence: "Which sentence correctly offers something for free to a guest?",
    grammarRule: "fixed expression: Help yourself!",
    explanation: "'Help yourself' is a fixed expression that means 'take some, it's free'.",
    tip: "Help yourself! = take some, it's free.",
    multipleChoice: {
      question: "Which option is correct?",
      correctOption: "Help yourself to some cookies.",
      options: [
        "Help yourself to some cookies.",
        "Help you to some cookies.",
        "Help themself to some cookies.",
        "Help selves to some cookies.",
      ],
      optionExplanations: {
        "Help yourself to some cookies.": "Correct — the fixed expression is 'Help yourself to...'.",
        "Help you to some cookies.": "Wrong — this needs the reflexive pronoun 'yourself', not the object pronoun 'you'.",
        "Help themself to some cookies.": "Wrong — 'themself' isn't standard English; also wrong here, since we're talking to one guest.",
        "Help selves to some cookies.": "Wrong — 'selves' alone isn't a word.",
      },
    },
  },

  {
    id: "rp-mc-3",
    topic: "reflexive-pronouns",
    type: "multiple-choice",
    difficulty: "intermediate",
    sentence: "Which sentence correctly describes a machine switching off on its own?",
    grammarRule: "itself for things",
    explanation: "Objects have no grammatical gender in English, so we always use 'itself'.",
    tip: "Objects and machines always take 'itself'.",
    multipleChoice: {
      question: "Which option is correct?",
      correctOption: "The oven turns itself off after an hour.",
      options: [
        "The oven turns itself off after an hour.",
        "The oven turns himself off after an hour.",
        "The oven turns herself off after an hour.",
        "The oven turns themselves off after an hour.",
      ],
      optionExplanations: {
        "The oven turns itself off after an hour.": "Correct — 'the oven' is a thing, so it takes 'itself'.",
        "The oven turns himself off after an hour.": "Wrong — 'the oven' has no gender, so 'himself' is wrong.",
        "The oven turns herself off after an hour.": "Wrong — 'the oven' has no gender, so 'herself' is wrong.",
        "The oven turns themselves off after an hour.": "Wrong — 'the oven' is singular, so the plural 'themselves' is wrong.",
      },
    },
  },

  {
    id: "rp-mc-4",
    topic: "reflexive-pronouns",
    type: "multiple-choice",
    difficulty: "intermediate",
    sentence: "Which sentence correctly describes a group of people who did something without help?",
    grammarRule: "reflexive pronoun for a plural subject",
    explanation: "The subject 'my grandparents' is plural and refers to other people, so the reflexive pronoun is 'themselves'.",
    tip: "A plural subject referring to other people takes 'themselves'.",
    multipleChoice: {
      question: "Which option is correct?",
      correctOption: "My grandparents built this house themselves in the 1960s.",
      options: [
        "My grandparents built this house themselves in the 1960s.",
        "My grandparents built this house themself in the 1960s.",
        "My grandparents built this house itself in the 1960s.",
        "My grandparents built this house herself in the 1960s.",
      ],
      optionExplanations: {
        "My grandparents built this house themselves in the 1960s.": "Correct — 'my grandparents' is plural, so we use 'themselves'.",
        "My grandparents built this house themself in the 1960s.": "Wrong — 'themself' isn't the correct plural form.",
        "My grandparents built this house itself in the 1960s.": "Wrong — 'my grandparents' are people, not a thing.",
        "My grandparents built this house herself in the 1960s.": "Wrong — 'herself' is singular, but 'my grandparents' is plural.",
      },
    },
  },

  {
    id: "rp-mc-5",
    topic: "reflexive-pronouns",
    type: "multiple-choice",
    difficulty: "intermediate",
    sentence: "Which sentence correctly emphasises that nobody helped her?",
    grammarRule: "reflexive pronoun for emphasis",
    explanation: "A reflexive pronoun at the end of a sentence emphasises that the subject did something alone.",
    tip: "A reflexive pronoun at the end of a sentence = emphasis on 'alone, no help'.",
    multipleChoice: {
      question: "Which option is correct?",
      correctOption: "She did it all herself.",
      options: ["She did it all herself.", "She did it all himself.", "She did it all hers.", "She did it all she."],
      optionExplanations: {
        "She did it all herself.": "Correct — the subject is 'she', so the reflexive pronoun is 'herself'.",
        "She did it all himself.": "Wrong — 'himself' doesn't match the female subject 'she'.",
        "She did it all hers.": "Wrong — 'hers' is a possessive pronoun, not a reflexive pronoun.",
        "She did it all she.": "Wrong — 'she' is a subject pronoun, not a reflexive pronoun.",
      },
    },
  },

  {
    id: "rp-mc-6",
    topic: "reflexive-pronouns",
    type: "multiple-choice",
    difficulty: "intermediate",
    sentence: "You want the person across the table to pass you the salt. Which sentence is correct?",
    grammarRule: "object pronoun when subject and object are different people",
    explanation: "The subject is 'you' (the listener) and the object is the speaker, a different person, so we need the object pronoun 'me', not a reflexive pronoun.",
    tip: "Different people as subject and object → use an object pronoun, not a reflexive one.",
    multipleChoice: {
      question: "Which option is correct?",
      correctOption: "Could you pass me the salt, please?",
      options: [
        "Could you pass me the salt, please?",
        "Could you pass myself the salt, please?",
        "Could you pass yourself the salt, please?",
        "Could you pass itself the salt, please?",
      ],
      optionExplanations: {
        "Could you pass me the salt, please?": "Correct — the speaker (a different person from 'you') needs the object pronoun 'me'.",
        "Could you pass myself the salt, please?": "Wrong — 'myself' doesn't match the subject 'you'.",
        "Could you pass yourself the salt, please?": "Wrong — this would mean the listener passes the salt to themselves, not to the speaker.",
        "Could you pass itself the salt, please?": "Wrong — 'itself' is for things, not people.",
      },
    },
  },

  {
    id: "rp-mc-7",
    topic: "reflexive-pronouns",
    type: "multiple-choice",
    difficulty: "advanced",
    sentence: "Tom and Ana are standing in front of a large mirror, both smiling at their own reflections. Which sentence describes the photo correctly?",
    grammarRule: "themselves vs each other (reflexive vs reciprocal)",
    explanation: "'Themselves' means each person is looking at their own reflection. 'Each other' would mean they are looking at one another instead — a different meaning.",
    tip: "Themselves = your own reflection/action. Each other = one person and another person.",
    multipleChoice: {
      question: "Which option is correct?",
      correctOption: "They are looking at themselves in the mirror.",
      options: [
        "They are looking at themselves in the mirror.",
        "They are looking at each other in the mirror.",
        "They are looking themselves in the mirror.",
        "They are looking at theirselves in the mirror.",
      ],
      optionExplanations: {
        "They are looking at themselves in the mirror.": "Correct — each person is looking at their own reflection.",
        "They are looking at each other in the mirror.": "Wrong meaning — this would mean Tom looks at Ana and Ana looks at Tom, not at their own reflections.",
        "They are looking themselves in the mirror.": "Wrong — the preposition 'at' is missing: 'looking at themselves'.",
        "They are looking at theirselves in the mirror.": "Wrong — 'theirselves' isn't a word; the correct form is 'themselves'.",
      },
    },
  },

  // ===== WORD TRANSFORM (6) =====

  {
    id: "rp-wt-1",
    topic: "reflexive-pronouns",
    type: "word-transform",
    difficulty: "beginner",
    sentence: "I cut ___ (I) while chopping vegetables for dinner.",
    grammarRule: "reflexive pronoun as the object of the verb",
    explanation: "The subject 'I' and the object of the verb are the same person, so we use the reflexive pronoun 'myself'.",
    tip: "I → myself.",
    wordTransform: {
      baseWord: "I",
      correctAnswer: "myself",
    },
  },

  {
    id: "rp-wt-2",
    topic: "reflexive-pronouns",
    type: "word-transform",
    difficulty: "beginner",
    sentence: "The twins dressed ___ (they) for the school play without any help.",
    grammarRule: "reflexive pronoun for a plural subject",
    explanation: "The subject 'the twins' (they) is plural, so the reflexive pronoun is 'themselves'.",
    tip: "They → themselves.",
    wordTransform: {
      baseWord: "they",
      correctAnswer: "themselves",
    },
  },

  {
    id: "rp-wt-3",
    topic: "reflexive-pronouns",
    type: "word-transform",
    difficulty: "intermediate",
    sentence: "This old printer still switches ___ (it) off if it overheats.",
    grammarRule: "itself for things",
    explanation: "'This old printer' is a thing, with no grammatical gender, so the reflexive pronoun is 'itself'.",
    tip: "It → itself (always, for things and animals).",
    wordTransform: {
      baseWord: "it",
      correctAnswer: "itself",
    },
  },

  {
    id: "rp-wt-4",
    topic: "reflexive-pronouns",
    type: "word-transform",
    difficulty: "intermediate",
    sentence: "Did you two manage to fix the shelf ___ (you), or did you call someone?",
    grammarRule: "yourselves for more than one listener",
    explanation: "'You two' refers to more than one listener, so the plural reflexive pronoun 'yourselves' is needed.",
    tip: "You (one person) → yourself. You (more than one person) → yourselves.",
    wordTransform: {
      baseWord: "you",
      correctAnswer: "yourselves",
    },
  },

  {
    id: "rp-wt-5",
    topic: "reflexive-pronouns",
    type: "word-transform",
    difficulty: "intermediate",
    sentence: "He's usually shy, but he's really enjoying ___ (he) at the party tonight.",
    grammarRule: "fixed expression: enjoy yourself/himself/herself",
    explanation: "The subject 'he' takes the reflexive pronoun 'himself' in the fixed expression 'enjoy himself'.",
    tip: "He → himself. Enjoy + reflexive pronoun = have a good time.",
    wordTransform: {
      baseWord: "he",
      correctAnswer: "himself",
    },
  },

  {
    id: "rp-wt-6",
    topic: "reflexive-pronouns",
    type: "word-transform",
    difficulty: "advanced",
    sentence: "Although no one was around, Sarah convinced ___ (she) to keep practising the piano.",
    grammarRule: "reflexive pronoun as the object of the verb",
    explanation: "'Sarah' (she) is both the subject and the object of 'convinced', so the reflexive pronoun 'herself' is needed.",
    tip: "She → herself, when the subject convinces/tells/reminds... themselves.",
    wordTransform: {
      baseWord: "she",
      correctAnswer: "herself",
    },
  },
];

export const reflexivePronounsTopic: GrammarTopic = {
  id: "reflexive-pronouns",
  level: "B1",
  name: "Reflexive Pronouns",
  description:
    "Practise reflexive pronouns (myself, yourself, himself...) for actions you do to yourself, for 'alone' with by, for fixed expressions, and for emphasis.",
  lesson: "Unit 7D",
  icon: "🪞",
  cards: [
    {
      id: "rp-card-1",
      rule: "reflexive pronoun as the object of the verb",
      example: "I cut ___ while I was shaving this morning.",
      answer: "myself",
      explanation:
        "We use a reflexive pronoun when the subject and the object of the verb are the same person. The pronoun comes right after the verb (or a preposition).",
      examples: ["I burned myself on the hot pan.", "They hurt themselves playing football."],
      ua: "myself/himself... — коли підмет і додаток — та сама особа.",
    },
    {
      id: "rp-card-2",
      rule: "by + reflexive pronoun = alone",
      example: "He decided to go travelling across Asia by ___ for six months.",
      answer: "himself",
      explanation: "'By' + a reflexive pronoun means 'alone', with no one else's help or company.",
      examples: ["She lives by herself in a small flat.", "They prefer working by themselves without interruptions."],
      ua: "by + myself/himself... = «сам, без інших» (один).",
    },
    {
      id: "rp-card-3",
      rule: "fixed expressions: Enjoy/Help/Behave yourself!",
      example: "Help ___ to some more cake — there's plenty left!",
      answer: "yourself",
      explanation:
        "Enjoy yourself!, Help yourself! and Behave yourself! are fixed expressions. 'Help yourself' means take some, it's free.",
      examples: ["Enjoy yourself at the party tonight!", "Behave yourself — we're in a restaurant!"],
      ua: "Help yourself! = «пригощайся!» (візьми безкоштовно).",
    },
    {
      id: "rp-card-4",
      rule: "reflexive pronoun for emphasis",
      example: "Nobody helped me — I fixed the leaking tap ___.",
      answer: "myself",
      explanation:
        "We can add a reflexive pronoun at the end of a sentence to emphasise that the subject did something alone, without help.",
      examples: ["I made this cake myself.", "Did you write the whole report yourself?"],
      ua: "У кінці речення myself/himself... підкреслює: «сам, без сторонньої допомоги».",
    },
    {
      id: "rp-card-5",
      rule: "itself for things and animals",
      example: "This old printer still switches ___ off if it overheats.",
      answer: "itself",
      explanation:
        "Use 'itself' for things and animals — English nouns don't have grammatical gender, so we never use 'himself' or 'herself' for an object.",
      examples: ["The dog taught itself a new trick.", "The security light turns itself on at night."],
      ua: "itself — для речей і тварин: без роду, ніколи himself/herself.",
    },
    {
      id: "rp-card-6",
      rule: "plural subjects: ourselves, yourselves, themselves",
      example: "My parents built this garden shed ___ last summer.",
      answer: "themselves",
      explanation: "Plural subjects (we, you [plural], they) take the plural reflexive pronouns ourselves, yourselves and themselves.",
      examples: ["We organised the whole trip ourselves.", "Did you two paint the fence yourselves?"],
      ua: "Множина: we→ourselves, you(мн.)→yourselves, they→themselves.",
    },
    {
      id: "rp-card-7",
      rule: "don't use a reflexive pronoun for a different person",
      example: "Could you call ___ (I) later today?",
      answer: "me",
      explanation:
        "If the object of the verb is a different person from the subject, use an object pronoun (me, you, him...), not a reflexive pronoun.",
      examples: ["She told him to wait outside.", "Can you pass me the salt, please?"],
      ua: "Якщо об'єкт — інша особа, а не підмет, вживай me/him/her, а не -self.",
    },
    {
      id: "rp-card-8",
      rule: "themselves ≠ each other (reflexive vs reciprocal)",
      example: "The twins admired ___ in the mirror before leaving the house.",
      answer: "themselves",
      explanation:
        "'Themselves' means each person looked at their own reflection. 'Each other' would mean they looked at one another instead — a different meaning.",
      examples: ["She looked at herself in the shop window.", "The two friends hugged each other at the airport."],
      ua: "themselves = кожен на себе; each other = одне на одного (інше значення).",
    },
  ],
  rules: reflexivePronounsQuestions,
};
