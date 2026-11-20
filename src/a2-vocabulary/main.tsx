import VocabularyPage from "../levels/VocabularyPage.tsx";
import { mountLevelPage } from "../levels/mount.tsx";
import { A2 } from "../a2-flashcards/level.ts";

mountLevelPage(VocabularyPage, A2, { needsTopics: false });
