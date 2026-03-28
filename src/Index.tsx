import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import teacherCelebrate from "./assets/teacher-celebrate.png";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface AppCard {
  label: string;
  description: string;
  href: string;
  borderColor: string;
  disabled?: boolean;
}

const APP_CARDS: AppCard[] = [
  {
    label: "Grammar Testing",
    description: "Gap-fill, error-spot, reordering and more",
    href: "https://grammar.englishpusher.in.ua",
    borderColor: "#f07c1a",
  },
  {
    label: "Vocabulary Trivia",
    description: "Test your vocabulary with fun trivia questions",
    href: "#",
    borderColor: "#3b82f6",
  },
  {
    label: "Vocabulary Builder",
    description: "Coming soon",
    href: "#",
    borderColor: "#a3a3a3",
    disabled: true,
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
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
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

const bubbleVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 20, delay: 0.3 },
  },
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function AppCardItem({ card }: { card: AppCard }) {
  const inner = (
    <motion.div
      variants={cardVariants}
      whileHover={card.disabled ? {} : { scale: 1.02 }}
      className={[
        "group flex items-center justify-between gap-4 rounded-xl bg-white px-5 py-4 shadow-sm border border-neutral-100",
        "border-l-4",
        card.disabled ? "opacity-60 cursor-default" : "cursor-pointer",
      ].join(" ")}
      style={{ borderLeftColor: card.borderColor }}
    >
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span className="font-display font-semibold text-neutral-800 text-[15px] leading-snug">
            {card.label}
          </span>
          {card.disabled && (
            <span className="rounded-full bg-neutral-200 px-2 py-0.5 text-[11px] font-semibold text-neutral-500 uppercase tracking-wide">
              Coming Soon
            </span>
          )}
        </div>
        <span className="text-sm text-neutral-500">{card.description}</span>
      </div>

      {!card.disabled && (
        <ArrowRight
          size={18}
          className="shrink-0 text-neutral-400 transition-transform duration-200 group-hover:translate-x-1"
        />
      )}
    </motion.div>
  );

  if (card.disabled) return inner;

  return (
    <a
      href={card.href}
      target="_blank"
      rel="noopener noreferrer"
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-xl"
      aria-label={`Open ${card.label}`}
    >
      {inner}
    </a>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Index() {
  return (
    <motion.div
      className="min-h-screen flex flex-col bg-neutral-50"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="bg-neutral-900 px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center gap-3">
          <img
            src="/logo.png"
            alt="Englishpusher logo"
            className="h-9 w-auto"
          />
          <h1 className="font-display text-xl font-bold leading-tight text-white">
            Englishpusher{" "}
            <span className="text-brand">Learning Apps</span>
          </h1>
        </div>
      </header>

      {/* ── Main ───────────────────────────────────────────────────────── */}
      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-10 md:flex-row md:items-start md:gap-12">

          {/* Teacher + speech bubble — hidden on mobile */}
          <div className="relative hidden md:flex md:w-56 md:shrink-0 md:flex-col md:items-center">
            <motion.div
              className="absolute -top-3 left-full ml-3 w-52 z-10"
              variants={bubbleVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="relative rounded-2xl bg-white px-4 py-3 shadow-md border border-neutral-100">
                <p className="font-body text-sm text-neutral-700 leading-snug">
                  Choose your practice and let's get&nbsp;started!&nbsp;😊
                </p>
                {/* tail pointing left */}
                <span
                  className="absolute left-0 top-4 -translate-x-2"
                  style={{
                    width: 0,
                    height: 0,
                    borderTop: "7px solid transparent",
                    borderBottom: "7px solid transparent",
                    borderRight: "10px solid white",
                  }}
                />
              </div>
            </motion.div>

            <img
              src={teacherCelebrate}
              alt="Teacher celebrating"
              className="animate-character-idle w-full max-w-[200px] select-none"
              draggable={false}
            />
          </div>

          {/* Cards -------------------------------------------------------- */}
          <div className="flex w-full flex-col gap-3 md:flex-1">
            <h2 className="font-display text-2xl font-bold text-neutral-800 md:text-3xl">
              Pick an app to practice
            </h2>
            <p className="mb-2 text-sm text-neutral-500">
              All activities are free and run directly in your browser.
            </p>

            <motion.div
              className="flex flex-col gap-3"
              variants={listVariants}
              initial="hidden"
              animate="visible"
            >
              {APP_CARDS.map((card) => (
                <AppCardItem key={card.label} card={card} />
              ))}
            </motion.div>
          </div>
        </div>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="border-t border-neutral-200 bg-white px-6 py-4 text-center text-sm text-neutral-500">
        Copyright &copy; 2026 &mdash; Developed by{" "}
        <a
          href="https://englishpusher.in.ua"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-brand hover:underline"
        >
          Tetiana Pushkar
        </a>
      </footer>
    </motion.div>
  );
}
