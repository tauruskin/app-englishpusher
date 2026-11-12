export function isGrammarFlashcardsApp(app: string): boolean {
  return app.endsWith("-grammar-flashcards");
}

/** Title of a Recent activity row; null hides the row (unknown topic, or grammar names still loading). */
export function studyTitle(
  app: string,
  topicId: string,
  grammarNames: Map<string, string> | null,
  vocabTitle: (app: string, topicId: string) => string | null,
): string | null {
  if (isGrammarFlashcardsApp(app)) return grammarNames?.get(topicId) ?? null;
  if (topicId === "my-words") return "My Words";
  return vocabTitle(app, topicId);
}
