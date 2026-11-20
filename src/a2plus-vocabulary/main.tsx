import VocabularyPage from "../levels/VocabularyPage.tsx";
import { mountLevelPage } from "../levels/mount.tsx";
import { A2PLUS } from "../a2plus-flashcards/level.ts";

mountLevelPage(VocabularyPage, A2PLUS, { needsTopics: false });
