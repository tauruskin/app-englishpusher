import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, BookOpen, Trophy, Layers, Grid2x2, Zap, Instagram, type LucideIcon } from "lucide-react";
import teacherCelebrate from "./assets/teacher-celebrate.png";

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

type Level = "B1" | "C1";

interface AppItem {
  id: number;
  label: string;
  description: string;
  cta: string;
  href: string;
  bgFrom: string;
  bgTo: string;
  borderColor: string;
  Icon: LucideIcon;
  disabled: boolean;
  badge?: string;
  level: Level;
}

const ITEMS: AppItem[] = [
  {
    id: 1,
    label: "Grammar Testing",
    description: "Gap-fill, error-spot, reordering and more",
    cta: "Start practicing",
    href: "https://grammar.englishpusher.in.ua",
    bgFrom: "#b45309",
    bgTo: "#78350f",
    borderColor: "#f07c1a",
    Icon: BookOpen,
    disabled: false,
    level: "B1",
  },
  {
    id: 2,
    label: "Vocabulary Trivia",
    description: "Test your vocabulary with fun trivia questions",
    cta: "Start practicing",
    href: "https://trivia.englishpusher.in.ua/",
    bgFrom: "#1d4ed8",
    bgTo: "#1e3a8a",
    borderColor: "#3b82f6",
    Icon: Trophy,
    disabled: false,
    level: "B1",
  },
  {
    id: 3,
    label: "Word Connections",
    description: "Group 16 words into 4 categories — can you find them all?",
    cta: "Start playing",
    href: "/word-connections/",
    bgFrom: "#065f46",
    bgTo: "#022c22",
    borderColor: "#10b981",
    Icon: Grid2x2,
    disabled: false,
    level: "B1",
  },
  {
    id: 4,
    label: "Vocabulary Cards",
    description: "Practise English words in an interactive way",
    cta: "",
    href: "#",
    bgFrom: "#404040",
    bgTo: "#1a1a1a",
    borderColor: "#a3a3a3",
    Icon: Layers,
    disabled: true,
    badge: "Coming Soon",
    level: "B1",
  },
  {
    id: 5,
    label: "C1 Vocabulary Trivia",
    description: "Advanced vocabulary quiz — definitions, fill-in-blank, true or false",
    cta: "Start quiz",
    href: "/c1-trivia/",
    bgFrom: "#4c1d95",
    bgTo: "#1e1b4b",
    borderColor: "#8b5cf6",
    Icon: Zap,
    disabled: false,
    level: "C1",
  },
];

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

function MobileCard({ item }: { item: AppItem }) {
  const { Icon } = item;

  const inner = (
    <motion.div
      variants={cardVariants}
      className={[
        "group flex items-center justify-between gap-4 rounded-xl bg-white px-5 py-4 shadow-sm",
        "border border-neutral-100 border-l-4",
        item.disabled ? "opacity-60 cursor-default" : "cursor-pointer",
      ].join(" ")}
      style={{ borderLeftColor: item.borderColor }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: item.borderColor + "25", color: item.borderColor }}
        >
          <Icon size={18} />
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="font-display font-semibold text-neutral-800 text-[15px] leading-snug">
              {item.label}
            </span>
            {item.badge && (
              <span className="rounded-full bg-neutral-200 px-2 py-0.5 text-[11px] font-semibold text-neutral-500 uppercase tracking-wide">
                {item.badge}
              </span>
            )}
          </div>
          <span className="text-sm text-neutral-500">{item.description}</span>
        </div>
      </div>

      {!item.disabled && (
        <ArrowRight
          size={18}
          className="shrink-0 text-neutral-400 transition-transform duration-200 group-hover:translate-x-1"
        />
      )}
    </motion.div>
  );

  if (item.disabled) return inner;

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
  item: AppItem;
  isActive: boolean;
  onHover: () => void;
}) {
  const { Icon } = item;

  return (
    <div
      className="relative overflow-hidden rounded-2xl h-full"
      style={{
        flex: isActive ? "4 0 0" : "0 0 60px",
        transition: "flex 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        background: `linear-gradient(150deg, ${item.bgFrom}, ${item.bgTo})`,
        cursor: item.disabled ? "default" : "pointer",
      }}
      onMouseEnter={onHover}
      onClick={() => {
        if (!item.disabled && item.href !== "#") {
          window.location.href = item.href;
        }
      }}
    >
      {/* Decorative background icon */}
      <div className="absolute -right-4 -top-4 opacity-10 pointer-events-none">
        <Icon size={120} className="text-white" />
      </div>

      {/* Inactive: vertical title */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: isActive ? 0 : 1, transition: "opacity 0.25s ease" }}
      >
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
          <h3 className="font-display font-bold text-white text-xl mb-1 leading-snug">
            {item.label}
          </h3>
          <p className="text-white/75 text-sm mb-4 leading-relaxed">
            {item.description}
          </p>
          {item.badge && (
            <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold text-white/90 uppercase tracking-wide">
              {item.badge}
            </span>
          )}
          {!item.disabled && (
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
const TABS: { id: Tab; label: string }[] = [
  { id: "all", label: "All levels" },
  { id: "B1",  label: "B1 General" },
  { id: "C1",  label: "C1 Business" },
];

export default function Index() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>("all");

  const filteredItems = activeTab === "all"
    ? ITEMS
    : ITEMS.filter((item) => item.level === activeTab);

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
            Englishpusher <span className="text-brand">Learning Apps</span>
          </h1>
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
            <a
              href="https://englishpusher.in.ua"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand hover:bg-brand/20 transition-colors"
            >
              englishpusher.in.ua ↗
            </a>

            <h2 className="font-display text-3xl font-bold leading-tight text-neutral-900 md:text-[2.6rem] md:leading-[1.15]">
              Learn English<br />
              <span className="text-brand">with tutor Tetiana</span>
            </h2>

            <p className="text-neutral-600 leading-relaxed text-[15px]">
              Improve your English through engaging quizzes, exercises and interactive
              activities on EnglishPusher. Practice at your own pace with expert
              guidance — and gain the fluency and confidence you've always wanted.
            </p>

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
            <div className="flex gap-2">
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
              {filteredItems.map((item, index) => (
                <AccordionPanel
                  key={item.id}
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
              {filteredItems.map((item) => (
                <MobileCard key={item.id} item={item} />
              ))}
            </motion.div>
          </div>
        </div>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="bg-neutral-900 border-t border-neutral-700/50 px-6 py-4">
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
