import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, BookOpen, Clock, Layers, Zap, Instagram, Sprout, Leaf, Rocket, Mountain, type LucideIcon } from "lucide-react";
import teacherCelebrate from "./assets/teacher-celebrate.png";
import { AccountLink } from "./shared/AppShell.tsx";
import TrialLessonForm from "./shared/TrialLessonForm.tsx";
import { Seasonal, SeasonalGreeting } from "./shared/Seasonal.tsx";
import { A2 } from "./a2-flashcards/level.ts";
import { A2PLUS } from "./a2plus-flashcards/level.ts";
import { B1PLUS } from "./b1plus-flashcards/level.ts";
import { B2PLUS } from "./b2plus-flashcards/level.ts";
import { isComingSoon } from "./levels/level.ts";
import { hubLevelOrder, type HubLevel } from "./hub/order.ts";
import { grammarCard, cardsForLevel, levelSummaries, levelIsLive, type HubCard, type HubIcon } from "./hub/cards.ts";

// ---------------------------------------------------------------------------
// ElegantShape — floating pill decoration for the background
// Uses only opacity / y / rotate: all standard CSS, works in motion/react.
// ---------------------------------------------------------------------------

function ElegantShape({
  className = "",
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-orange-400/[0.18]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96] as [number, number, number, number],
        opacity: { duration: 1.2 },
      }}
      className={`absolute ${className}`}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={[
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "border border-black/[0.06]",
            "shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]",
          ].join(" ")}
        />
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

type Level = HubLevel;

const A2_SOON = isComingSoon(A2);
const A2PLUS_SOON = isComingSoon(A2PLUS);
const B1PLUS_SOON = isComingSoon(B1PLUS);
const B2PLUS_SOON = isComingSoon(B2PLUS);

const ICONS: Record<HubIcon, LucideIcon> = {
  book: BookOpen, layers: Layers, zap: Zap, sprout: Sprout, leaf: Leaf, rocket: Rocket, mountain: Mountain,
};

// Levels with grammar topics, computed at build time from src/grammar/topics/index.ts (vite.config.ts).
const GRAMMAR_LIVE = new Set<string>(typeof __GRAMMAR_LIVE_LEVELS__ === "undefined" ? [] : __GRAMMAR_LIVE_LEVELS__);
const ALL_HUB_LEVELS: Level[] = ["A2", "A2+", "B1", "B1+", "B2+", "C1"];

const VOCAB_CARDS: HubCard[] = [
  { key: "vocab-a2", level: "A2", kind: "vocabulary", label: "A2 Vocabulary",
    description: "Everyday vocabulary — flashcards and trivia", href: "/a2-vocabulary/",
    bgFrom: "#0f766e", bgTo: "#134e4a", borderColor: "#14b8a6", icon: "sprout",
    disabled: A2_SOON, badge: A2_SOON ? "Coming soon" : undefined },
  { key: "vocab-a2plus", level: "A2+", kind: "vocabulary", label: "A2+ Vocabulary",
    description: "Next-step vocabulary — flashcards and trivia", href: "/a2plus-vocabulary/",
    bgFrom: "#1d4ed8", bgTo: "#172554", borderColor: "#3b82f6", icon: "leaf",
    disabled: A2PLUS_SOON, badge: A2PLUS_SOON ? "Coming soon" : undefined },
  { key: "vocab-b1", level: "B1", kind: "vocabulary", label: "B1 Vocabulary",
    // Word Connections also lives inside this page (currently hidden by
    // teacher request — see src/levels/VocabularyPage.tsx to re-enable)
    description: "Vocabulary practice — interactive flashcards and trivia", href: "/b1-vocabulary/",
    bgFrom: "#9f1239", bgTo: "#4c0519", borderColor: "#e11d48", icon: "layers", disabled: false },
  { key: "vocab-b1plus", level: "B1+", kind: "vocabulary", label: "B1+ Vocabulary",
    description: "Stronger intermediate vocabulary — flashcards and trivia", href: "/b1plus-vocabulary/",
    bgFrom: "#a21caf", bgTo: "#4a044e", borderColor: "#d946ef", icon: "rocket",
    disabled: B1PLUS_SOON, badge: B1PLUS_SOON ? "Coming soon" : undefined },
  { key: "vocab-b2plus", level: "B2+", kind: "vocabulary", label: "B2+ Vocabulary",
    description: "Upper-intermediate vocabulary — flashcards and trivia", href: "/b2plus-vocabulary/",
    bgFrom: "#15803d", bgTo: "#052e16", borderColor: "#22c55e", icon: "mountain",
    disabled: B2PLUS_SOON, badge: B2PLUS_SOON ? "Coming soon" : undefined },
  { key: "vocab-c1", level: "C1", kind: "vocabulary", label: "C1 Vocabulary",
    description: "Advanced vocabulary activities — trivia, flashcards and more", href: "/c1-business/",
    bgFrom: "#4c1d95", bgTo: "#1e1b4b", borderColor: "#8b5cf6", icon: "zap", disabled: false },
];

const CARDS: HubCard[] = [...VOCAB_CARDS, ...ALL_HUB_LEVELS.map((l) => grammarCard(l, GRAMMAR_LIVE.has(l)))];

// A small pill under a level title (desktop: translucent white; phone: tinted with the level colour).
interface Chip { label: string; Icon: LucideIcon; bg?: string; fg?: string }

// What a panel/card shows. Level summaries open their tab; cards navigate.
interface Tile {
  key: string; label: string; description: string; cta: string;
  bgFrom: string; bgTo: string; borderColor: string; Icon: LucideIcon;
  disabled: boolean; badge?: string;
  eyebrow?: string;       // small caps line above the title (desktop open panel)
  chips?: Chip[];         // replaces the description line when present
  href?: string;          // cards: navigate here
  onOpen?: () => void;    // level summaries: switch tab
}

function cardTile(c: HubCard): Tile {
  return { key: c.key, label: c.label, description: c.description, cta: "Start practicing",
    bgFrom: c.bgFrom, bgTo: c.bgTo, borderColor: c.borderColor, Icon: ICONS[c.icon],
    disabled: c.disabled, badge: c.badge, href: c.href };
}

const PART_ICON = { Vocabulary: Layers, Grammar: BookOpen } as const;
// Phone chip colours: Vocabulary = the level's colour, Grammar = the grammar orange.
function partChip(part: "Vocabulary" | "Grammar", accent: string, deep: string): Chip {
  return part === "Grammar"
    ? { label: part, Icon: PART_ICON[part], bg: "#f07c1a1f", fg: "#b45309" }
    : { label: part, Icon: PART_ICON[part], bg: accent + "1f", fg: deep };
}

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 280, damping: 24 },
  },
};

// ---------------------------------------------------------------------------
// Mobile card
// ---------------------------------------------------------------------------

function MobileCard({ item }: { item: Tile }) {
  const { Icon } = item;
  const soon = item.disabled;

  const inner = (
    <motion.div
      variants={cardVariants}
      className={[
        "group flex items-center justify-between gap-4 rounded-xl px-5 py-4",
        "border border-l-4",
        soon ? "cursor-default" : "bg-white shadow-sm border-neutral-100 cursor-pointer",
      ].join(" ")}
      style={soon
        ? { backgroundColor: "#fafaf9", borderColor: "#f0eeec", borderLeftColor: "#a8a29e" }
        : { borderLeftColor: item.borderColor }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
          style={soon
            ? { backgroundColor: "#a8a29e25", color: "#78716c" }
            : { backgroundColor: item.borderColor + "25", color: item.borderColor }}
        >
          <Icon size={18} />
        </div>
        <div className="flex min-w-0 flex-col gap-0.5">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="font-display font-semibold text-[15px] leading-snug"
              style={{ color: soon ? "#78716c" : "#262626" }}
            >
              {item.label}
            </span>
            {item.badge && (
              <span
                className="rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide"
                style={{ backgroundColor: "#e7e5e4", color: "#78716c" }}
              >
                {item.badge}
              </span>
            )}
          </div>
          {item.chips ? (
            <div className="mt-0.5 flex flex-wrap gap-1.5">
              {item.chips.map((chip) => (
                <span
                  key={chip.label}
                  className="rounded-full px-2 py-px text-xs font-semibold"
                  style={{ backgroundColor: chip.bg, color: chip.fg }}
                >
                  {chip.label}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-sm" style={{ color: soon ? "#a8a29e" : "#737373" }}>{item.description}</span>
          )}
        </div>
      </div>

      {!soon && (
        <ArrowRight
          size={18}
          className="shrink-0 text-neutral-400 transition-transform duration-200 group-hover:translate-x-1"
        />
      )}
    </motion.div>
  );

  if (soon) return inner;

  if (item.onOpen) {
    return (
      <button
        type="button"
        onClick={item.onOpen}
        className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-xl"
        aria-label={`Open ${item.label}`}
      >
        {inner}
      </button>
    );
  }

  return (
    <a
      href={item.href}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-xl"
      aria-label={`Open ${item.label}`}
    >
      {inner}
    </a>
  );
}

// ---------------------------------------------------------------------------
// Desktop accordion panel
// ---------------------------------------------------------------------------

function AccordionPanel({
  item,
  isActive,
  onHover,
}: {
  item: Tile;
  isActive: boolean;
  onHover: () => void;
}) {
  const { Icon } = item;
  const soon = item.disabled;

  return (
    <div
      className="relative overflow-hidden rounded-2xl h-full"
      style={{
        flex: isActive ? "4 0 0" : "0 0 60px",
        transition: "flex 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        background: `linear-gradient(150deg, ${item.bgFrom}, ${item.bgTo})`,
        cursor: soon ? "default" : "pointer",
      }}
      onMouseEnter={onHover}
      onClick={() => {
        if (soon) return;
        if (item.onOpen) item.onOpen();
        else if (item.href) window.location.href = item.href;
      }}
    >
      {/* Coming soon: fine diagonal hatching, so the grey reads as "not yet" */}
      {soon && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "repeating-linear-gradient(135deg, rgba(255,255,255,.055) 0 2px, transparent 2px 12px)" }}
        />
      )}

      {/* Decorative background icon */}
      <div className="absolute -right-4 -top-4 opacity-10 pointer-events-none">
        <Icon size={120} className="text-white" />
      </div>

      {/* Inactive: vertical title */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 pointer-events-none"
        style={{ opacity: isActive ? 0 : 1, transition: "opacity 0.25s ease" }}
      >
        {soon && <Clock size={15} className="text-white/85" />}
        <span
          className="text-white/90 font-display font-semibold text-sm whitespace-nowrap select-none"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          {item.label}
        </span>
      </div>

      {/* Active: full content */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-6 pointer-events-none"
        style={{ opacity: isActive ? 1 : 0, transition: "opacity 0.3s ease 0.15s" }}
      >
        <div className="mb-4">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm mb-4">
            <Icon size={22} className="text-white" />
          </div>
          {item.eyebrow && (
            <div
              className="mb-0.5 text-[11px] font-bold uppercase"
              style={{ color: "rgba(255,255,255,.6)", letterSpacing: ".1em" }}
            >
              {item.eyebrow}
            </div>
          )}
          <h3 className="font-display font-bold text-white text-xl mb-1 leading-snug">
            {item.label}
          </h3>
          {item.chips ? (
            <div className="mb-4 mt-0.5 flex flex-wrap gap-1.5">
              {item.chips.map((chip) => (
                <span
                  key={chip.label}
                  className="inline-flex items-center gap-[5px] rounded-full py-[3px] pl-2 pr-2.5 text-xs font-semibold text-white"
                  style={{ backgroundColor: "rgba(255,255,255,.18)", border: "1px solid rgba(255,255,255,.22)" }}
                >
                  <chip.Icon size={13} />
                  {chip.label}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-white/75 text-sm mb-4 leading-relaxed">
              {item.description}
            </p>
          )}
          {item.badge && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold text-white/90 uppercase tracking-wide">
              {soon && <Clock size={12} />}
              {item.badge}
            </span>
          )}
          {!soon && (
            <span className="inline-flex items-center gap-2 text-white font-semibold text-sm">
              {item.cta}
              <ArrowRight size={15} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

type Tab = "all" | Level;
const NEW_LEVELS = ["A2", "A2+", "B1+", "B2+"] as const;
const LEVEL_ORDER = hubLevelOrder(
  Object.fromEntries(NEW_LEVELS.map((l) => [l, levelIsLive(CARDS, l)])) as Record<(typeof NEW_LEVELS)[number], boolean>,
);
const TAB_LABEL: Record<Level, string> = { A2: "A2", "A2+": "A2+", B1: "B1 General", "B1+": "B1+", "B2+": "B2+", C1: "C1 Business" };
const TABS: { id: Tab; label: string }[] = [
  { id: "all", label: "All levels" },
  ...LEVEL_ORDER.map((level) => ({ id: level, label: TAB_LABEL[level] })),
];

export default function Index() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>("all");

  const tiles: Tile[] = activeTab === "all"
    ? levelSummaries(CARDS, LEVEL_ORDER).map((s) => ({
        key: `level-${s.level}`, label: TAB_LABEL[s.level], description: s.parts.join(" · "),
        cta: "Open level", eyebrow: "Level",
        bgFrom: s.bgFrom, bgTo: s.bgTo, borderColor: s.borderColor,
        Icon: ICONS[s.icon], disabled: false,
        chips: s.parts.map((part) => partChip(part, s.borderColor, s.bgFrom)),
        onOpen: () => { setActiveTab(s.level); setActiveIndex(0); },
      }))
    : cardsForLevel(CARDS, activeTab).map(cardTile);

  return (
    <motion.div
      className="relative min-h-screen flex flex-col"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="bg-neutral-900 border-b border-neutral-700/50 px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center gap-3">
          <img src="/logo.png" alt="Englishpusher logo" className="h-9 w-auto" />
          <h1 className="font-display text-xl font-bold leading-tight text-white">
            Englishpusher <span className="text-brand">App</span>
          </h1>
          <AccountLink className="ml-auto" />
        </div>
      </header>

      {/* ── Main ───────────────────────────────────────────────────────── */}
      <main className="relative flex flex-1 items-center justify-center px-6 py-12 overflow-hidden">

        {/* Floating shape decorations */}
        <ElegantShape delay={0.3} width={580} height={140} rotate={12}
          gradient="from-orange-400/[0.32]"
          className="left-[-6%] top-[15%]" />
        <ElegantShape delay={0.5} width={480} height={115} rotate={-15}
          gradient="from-blue-400/[0.26]"
          className="right-[-4%] bottom-[15%]" />
        <ElegantShape delay={0.4} width={280} height={70} rotate={-8}
          gradient="from-amber-400/[0.28]"
          className="left-[8%] bottom-[8%]" />
        <ElegantShape delay={0.6} width={200} height={54} rotate={22}
          gradient="from-orange-300/[0.26]"
          className="right-[20%] top-[6%]" />
        <ElegantShape delay={0.7} width={140} height={36} rotate={-28}
          gradient="from-blue-300/[0.22]"
          className="left-[24%] top-[4%]" />

        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-10 md:flex-row md:items-center md:gap-14">

          {/* ── Left: hero text ─────────────────────────────────────────── */}
          <div className="flex flex-col gap-5 md:w-[380px] md:shrink-0">
            <div className="flex flex-wrap items-center gap-2">
              <a
                href="https://englishpusher.in.ua"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand hover:bg-brand/20 transition-colors"
              >
                englishpusher.in.ua ↗
              </a>
              <SeasonalGreeting />
            </div>

            <h2 className="font-display text-3xl font-bold leading-tight text-neutral-900 md:text-[2.6rem] md:leading-[1.15]">
              Learn English<br />
              <span className="text-brand">with tutor Tetiana</span>
            </h2>

            <p className="text-neutral-600 leading-relaxed text-[15px]">
              Improve your English through engaging quizzes, exercises and interactive
              activities on EnglishPusher. Practice at your own pace with expert
              guidance — and gain the fluency and confidence you've always wanted.
            </p>

            {/* Trial lesson button → custom trial form in a modal */}
            <TrialLessonForm />

            {/* Teacher character — desktop only */}
            <div className="hidden md:block mt-1">
              <img
                src={teacherCelebrate}
                alt="Tutor Tetiana"
                className="animate-character-idle h-40 w-auto select-none"
                draggable={false}
              />
            </div>
          </div>

          {/* ── Right: accordion (desktop) / cards (mobile) ─────────────── */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">

            {/* Tabs */}
            <div className="flex flex-wrap gap-2">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setActiveIndex(0); }}
                  className={[
                    "rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200 focus:outline-none",
                    activeTab === tab.id
                      ? "bg-brand text-white shadow-sm"
                      : "bg-white text-neutral-500 border border-neutral-200 hover:border-brand/40 hover:text-brand",
                  ].join(" ")}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Desktop accordion */}
            <div className="hidden md:flex flex-row gap-3 h-[420px]">
              {tiles.map((item, index) => (
                <AccordionPanel
                  key={item.key}
                  item={item}
                  isActive={index === activeIndex}
                  onHover={() => setActiveIndex(index)}
                />
              ))}
            </div>

            {/* Mobile staggered cards */}
            <motion.div
              className="flex md:hidden flex-col gap-3"
              variants={listVariants}
              initial="hidden"
              animate="visible"
            >
              {tiles.map((item) => (
                <MobileCard key={item.key} item={item} />
              ))}
            </motion.div>
          </div>
        </div>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="bg-neutral-900 border-t border-neutral-700/50 px-6 py-4">
        <Seasonal />
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <span className="text-sm text-neutral-400">
            Copyright &copy; 2026 &mdash; Developed by{" "}
            <a
              href="https://englishpusher.in.ua"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand hover:text-brand/80 transition-colors"
            >
              Tetiana Pushkar
            </a>
          </span>

          <a
            href="https://www.instagram.com/teti_push_english?igsh=MWMxbGxodnJrOHI2"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow on Instagram"
            className="flex items-center gap-1.5 text-sm text-neutral-400 hover:text-[#e1306c] transition-colors"
          >
            <Instagram size={16} />
            <span>@teti_push_english</span>
          </a>
        </div>
      </footer>
    </motion.div>
  );
}
