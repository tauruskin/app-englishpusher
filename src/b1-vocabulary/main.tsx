import VocabularyPage from "../levels/VocabularyPage.tsx";
import { mountLevelPage } from "../levels/mount.tsx";
import { B1 } from "../b1-flashcards/level.ts";

mountLevelPage(VocabularyPage, B1, { needsTopics: false });
