import FlashcardsPage from "../levels/FlashcardsPage.tsx";
import { mountLevelPage } from "../levels/mount.tsx";
import { B1PLUS } from "./level.ts";

mountLevelPage(FlashcardsPage, B1PLUS, { needsTopics: true });
