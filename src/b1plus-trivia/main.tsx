import TriviaPage from "../levels/TriviaPage.tsx";
import { mountLevelPage } from "../levels/mount.tsx";
import { B1PLUS } from "../b1plus-flashcards/level.ts";

mountLevelPage(TriviaPage, B1PLUS, { needsTopics: true });
