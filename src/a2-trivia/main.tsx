import TriviaPage from "../levels/TriviaPage.tsx";
import { mountLevelPage } from "../levels/mount.tsx";
import { A2 } from "../a2-flashcards/level.ts";

mountLevelPage(TriviaPage, A2, { needsTopics: true });
