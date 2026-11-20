import FlashcardsPage from "../levels/FlashcardsPage.tsx";
import { mountLevelPage } from "../levels/mount.tsx";
import { A2PLUS } from "./level.ts";

mountLevelPage(FlashcardsPage, A2PLUS, { needsTopics: true });
