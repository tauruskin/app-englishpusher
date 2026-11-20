import FlashcardsPage from "../levels/FlashcardsPage.tsx";
import { mountLevelPage } from "../levels/mount.tsx";
import { B2PLUS } from "./level.ts";

mountLevelPage(FlashcardsPage, B2PLUS, { needsTopics: true });
