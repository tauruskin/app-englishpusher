// src/data/topics/index.ts
import type { GrammarTopic } from "../types.ts";
import { presentSimpleVsContinuousTopic } from "./present-simple-vs-continuous.ts";
import { irregularVerbsTopic } from "./irregular-verbs.ts";
import { verbPatternsTopic } from "./verb-patterns.ts";
import { narrativeTensesTopic } from "./narrative-tenses.ts";
import { modifiersTopic } from "./modifiers.ts";
import { pastSimplePresentPerfectTopic } from "./past-simple-present-perfect.ts";
import { apologiseAndGiveReasonsTopic } from "./apologise-and-give-reasons.ts";
import { prepositionsOfTimeTopic } from "./prepositions-of-time.ts";
import { questionFormsTopic } from "./question-forms.ts";
import { startingEndingConversationsTopic } from "./starting-ending-conversations.ts";
import { adverbsOfFrequencyTopic } from "./adverbs-of-frequency.ts";
import { stativeDynamicVerbsTopic } from "./stative-dynamic-verbs.ts";
import { possessivePronounsTopic } from "./possessive-pronouns.ts";
import { quantifiersTopic } from "./quantifiers.ts";
import { modalsRulesAdviceTopic } from "./modals-rules-advice.ts";

const topics: GrammarTopic[] = [
  presentSimpleVsContinuousTopic,
  irregularVerbsTopic,
  verbPatternsTopic,
  narrativeTensesTopic,
  modifiersTopic,
  pastSimplePresentPerfectTopic,
  apologiseAndGiveReasonsTopic,
  prepositionsOfTimeTopic,
  questionFormsTopic,
  startingEndingConversationsTopic,
  adverbsOfFrequencyTopic,
  stativeDynamicVerbsTopic,
  possessivePronounsTopic,
  quantifiersTopic,
  modalsRulesAdviceTopic,
];

export default topics;
