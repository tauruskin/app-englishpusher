import VocabularyPage from "../levels/VocabularyPage.tsx";
import { mountLevelPage } from "../levels/mount.tsx";
import { B2PLUS } from "../b2plus-flashcards/level.ts";

mountLevelPage(VocabularyPage, B2PLUS, { needsTopics: false });
