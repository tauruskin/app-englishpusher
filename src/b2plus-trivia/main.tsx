import TriviaPage from "../levels/TriviaPage.tsx";
import { mountLevelPage } from "../levels/mount.tsx";
import { B2PLUS } from "../b2plus-flashcards/level.ts";

mountLevelPage(TriviaPage, B2PLUS, { needsTopics: true });
