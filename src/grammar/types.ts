/**
 * EnglishPusher Grammar Testing - Type Definitions
 * UPDATED: sentenceReorder now uses correctOrders (array of arrays)
 */

/**
 * Question types available in the grammar testing app
 */
export type GrammarQuestionType =
  | 'gap-fill'
  | 'error-spot'
  | 'multiple-choice'
  | 'word-transform'
  | 'sentence-match'
  | 'sentence-reorder';

/**
 * Difficulty levels
 */
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

/**
 * Base grammar question interface
 */
export interface GrammarQuestion {
  id: string;
  topic: string;
  type: GrammarQuestionType;
  difficulty: DifficultyLevel;
  sentence: string;
  grammarRule: string;
  explanation: string;
  tip?: string;

  gapFill?: GapFillData;
  errorSpot?: ErrorSpotData;
  multipleChoice?: MultipleChoiceData;
  wordTransform?: WordTransformData;
  sentenceMatch?: SentenceMatchData;
  sentenceReorder?: SentenceReorderData;
}

/**
 * Data structure for gap-fill questions
 */
export interface GapFillData {
  gapIndex: number;
  correctAnswer: string;
  alternatives?: string[];
  options: string[];
  correctOptionIndex?: number;
}

/**
 * Data structure for error-spot questions
 */
export interface ErrorSpotData {
  errorWordIndex: number;
  wrongWord: string;
  correction: string;
  reason: string;
  correctionOptions?: string[];
}

/**
 * Data structure for multiple-choice questions
 */
export interface MultipleChoiceData {
  question: string;
  correctOption: string;
  options: string[];
  /** Per-option notes kept with the data: by option text, or in the order of `options`. Not shown by the game. */
  optionExplanations?: string[] | { [key: string]: string };
}

/**
 * Data structure for word-transform questions (classic EFL "put in brackets")
 */
export interface WordTransformData {
  baseWord: string;
  correctAnswer: string;
  alternativeAnswers?: string[];
}

/**
 * A single pair for sentence-match questions
 */
export interface MatchPair {
  beginning: string;
  ending: string;
}

/**
 * Data structure for sentence-match questions.
 * Each beginning uniquely matches exactly one ending.
 * The correct answer is encoded as endings joined by "||" in beginning order.
 */
export interface SentenceMatchData {
  pairs: MatchPair[];
}

/**
 * Data structure for sentence-reorder questions.
 * `correctOrders` lists every acceptable ordering of `words` by index,
 * since some sentences have more than one valid word order.
 */
export interface SentenceReorderData {
  words: string[];
  correctOrders: number[][];
}

/** Course level of a grammar topic. The same ids the App shows for vocabulary. */
export type GrammarLevelId = "A2" | "A2+" | "B1" | "B1+" | "B2+" | "C1";

/**
 * A complete grammar topic with multiple questions
 */
export interface GrammarTopic {
  id: string;
  level: GrammarLevelId;
  name: string;
  description: string;
  lesson?: string;
  rules: GrammarQuestion[];
}

/**
 * Game state for tracking user progress
 */
export interface GameState {
  currentQuestionIndex: number;
  score: number;
  streak: number;
  maxStreak: number;
  isActive: boolean;
  isComplete: boolean;
  startTime: number;
  incorrectQuestionIds: string[];
}

/**
 * Result of a single question submission
 */
export interface QuestionResult {
  questionId: string;
  question: GrammarQuestion;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  timeTaken?: number;
}

/**
 * Game results summary
 */
export interface GameResults {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  maxStreak: number;
  totalTime: number;
  questionResults: QuestionResult[];
  weakAreas: GrammarQuestion[];
  ruleBreakdown: {
    [rule: string]: {
      correct: number;
      total: number;
      percentage: number;
    };
  };
}

/**
 * Topic selector option
 */
export interface TopicOption {
  id: string;
  name: string;
  description: string;
  ruleCount: number;
}
