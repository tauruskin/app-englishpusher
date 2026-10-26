import FlashcardsPage from "../levels/FlashcardsPage.tsx";
import { mountLevelPage } from "../levels/mount.tsx";
import { A2 } from "./level.ts";

mountLevelPage(FlashcardsPage, A2, { needsTopics: true });
