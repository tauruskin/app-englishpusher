import VocabularyPage from "../levels/VocabularyPage.tsx";
import { mountLevelPage } from "../levels/mount.tsx";
import { B1PLUS } from "../b1plus-flashcards/level.ts";

mountLevelPage(VocabularyPage, B1PLUS, { needsTopics: false });
