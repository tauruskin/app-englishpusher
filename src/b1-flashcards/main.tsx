import FlashcardsPage from "../levels/FlashcardsPage.tsx";
import { mountLevelPage } from "../levels/mount.tsx";
import { B1 } from "./level.ts";

mountLevelPage(FlashcardsPage, B1, { needsTopics: true });
