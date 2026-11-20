import TriviaPage from "../levels/TriviaPage.tsx";
import { mountLevelPage } from "../levels/mount.tsx";
import { B1 } from "../b1-flashcards/level.ts";

mountLevelPage(TriviaPage, B1, { needsTopics: true });
