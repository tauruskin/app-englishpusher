// Vocabulary levels that share the level pages in src/levels/: A2, A2+ and B1.
// C1 keeps its own pages because its words use definitions, not translations.

export interface Word {
  word: string;
  translation: string;
  example: string; // use ___ as placeholder for the word
  transcription?: string; // IPA phonetic transcription (single words / short phrases only)
  similar?: string[]; // near-synonyms in the same topic — trivia never offers them as wrong options for this word
}

export interface Topic {
  id: string;
  title: string;
  icon: string;
  description: string;
  words: Word[];
  triviaUrl?: string; // link to corresponding trivia topic
}

export type LevelId = "A2" | "A2+" | "B1";
export type LevelSlug = "a2" | "a2plus" | "b1";

export interface LevelConfig {
  id: LevelId; // shown to students ("A2 Vocabulary") and stored in saved_words.level
  slug: LevelSlug; // URL prefix: /<slug>-vocabulary/, /<slug>-flashcards/, /<slug>-trivia/
  title: string; // vocabulary page heading and hub tab: "A2", "A2+", "B1 General"
  topics: Topic[];
}
