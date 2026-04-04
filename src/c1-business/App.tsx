import { motion } from "motion/react";
import { Trophy, CreditCard, ArrowRight, type LucideIcon } from "lucide-react";
import teacherCelebrate from "../c1-trivia/teacher-celebrate.png";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface ActivityItem {
  id: number;
  label: string;
  description: string;
  cta: string;
  href: string;
  Icon: LucideIcon;
  bgFrom: string;
  bgTo: string;
  accentColor: string;
  disabled: boolean;
  badge?: string;
}

const ITEMS: ActivityItem[] = [
  {
    id: 1,
    label: "Vocabulary Trivia",
    description:
      "10 questions · 4 types ordered easy to hard · track your weak words and practise again",
    cta: "Start quiz",
    href: "/c1-trivia/",
    Icon: Trophy,
    bgFrom: "#4c1d95",
    bgTo: "#2e1065",
    accentColor: "#a78bfa",
    disabled: false,
  },
  {
    id: 2,
    label: "Flash Cards",
    description:
      "Study and memorise C1 Business vocabulary with interactive flashcards",
    cta: "Study now",
    href: "/c1-flashcards/",
    Icon: CreditCard,
    bgFrom: "#374151",
    bgTo: "#111827",
    accentColor: "#9ca3af",
    disabled: true,
    badge: "Coming Soon",
  },
];

// ---------------------------------------------------------------------------
// Activity card
// ---------------------------------------------------------------------------

function ActivityCard({ item }: { item: ActivityItem }) {
  const { Icon } = item;

  const inner = (
    <motion.div
      whileHover={item.disabled ? {} : { y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative overflow-hidden rounded-2xl h-64 flex flex-col justify-between p-7 cursor-pointer"
      style={{
        background: `linear-gradient(145deg, ${item.bgFrom}, ${item.bgTo})`,
        opacity: item.disabled ? 0.7 : 1,
      }}
    >
      {/* Background icon */}
      <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
        <Icon size={140} className="text-white" />
      </div>

      {/* Top: icon + badge */}
      <div className="flex items-start justify-between">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl"
          style={{ backgroundColor: item.accentColor + "30" }}
        >
          <Icon size={24} style={{ color: item.accentColor }} />
        </div>
        {item.badge && (
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white/80 uppercase tracking-wide">
            {item.badge}
          </span>
        )}
      </div>

      {/* Bottom: title + description + cta */}
      <div>
        <h3 className="font-display font-bold text-white text-xl mb-1.5 leading-snug">
          {item.label}
        </h3>
        <p className="text-white/70 text-sm leading-relaxed mb-4">
          {item.description}
        </p>
        {!item.disabled && (
          <span className="inline-flex items-center gap-2 text-white font-semibold text-sm">
            {item.cta}
            <ArrowRight size={15} />
          </span>
        )}
      </div>
    </motion.div>
  );

  if (item.disabled) return inner;

  return (
    <a
      href={item.href}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded-2xl"
      aria-label={item.label}
    >
      {inner}
    </a>
  );
}

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------

export default function App() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-neutral-900 border-b border-neutral-700/50 px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Englishpusher logo" className="h-8 w-auto" />
            <div>
              <h1 className="font-display text-base font-bold leading-tight text-white">
                C1 Business
              </h1>
              <p className="text-xs text-neutral-400">Englishpusher Learning Apps</p>
            </div>
          </div>
          <a
            href="https://app.englishpusher.in.ua"
            className="text-xs text-neutral-400 hover:text-[#f07c1a] transition-colors"
          >
            ← All apps
          </a>
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-1 items-start justify-center px-6 py-14">
        <div className="w-full max-w-4xl flex flex-col gap-8">

          {/* Hero row */}
          <div className="flex items-end gap-6">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700 uppercase tracking-wide">
                  C1 Business
                </span>
                <h2 className="font-display text-3xl font-bold text-neutral-900 mt-3 mb-1">
                  Choose your activity
                </h2>
                <p className="text-neutral-500 text-base">
                  Select how you'd like to practise today
                </p>
              </motion.div>
            </div>

            {/* Teacher */}
            <div className="hidden md:block shrink-0 select-none pointer-events-none">
              <img
                src={teacherCelebrate}
                alt="Teacher"
                className="h-36 w-auto"
                draggable={false}
              />
            </div>
          </div>

          {/* Activity cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {ITEMS.map((item) => (
              <ActivityCard key={item.id} item={item} />
            ))}
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-900 border-t border-neutral-700/50 px-6 py-4">
        <div className="mx-auto max-w-4xl text-center text-sm text-neutral-400">
          Copyright &copy; 2026 &mdash;{" "}
          <a
            href="https://englishpusher.in.ua"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#f07c1a] hover:text-[#f07c1a]/80 transition-colors"
          >
            Englishpusher
          </a>
        </div>
      </footer>
    </div>
  );
}
