import { motion } from "motion/react";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { AppHeader, AppFooter } from "./AppShell.tsx";
import teacherCelebrate from "../assets/teacher-celebrate.png";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

export interface ActivityItem {
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
  hidden?: boolean; // set true to hide without deleting
}

export interface ActivityChoicePageProps {
  headerTitle: string; // AppHeader title
  badge: string; // orange pill above the heading
  items: ActivityItem[];
  comingSoon: boolean;
  comingSoonText: string;
}

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
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-2xl"
      aria-label={item.label}
    >
      {inner}
    </a>
  );
}

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------

export default function ActivityChoicePage({
  headerTitle,
  badge,
  items,
  comingSoon,
  comingSoonText,
}: ActivityChoicePageProps) {
  const visibleItems = items.filter((item) => !item.hidden);

  return (
    <div className="relative min-h-screen flex flex-col">
      <AppHeader title={headerTitle} subtitle="Englishpusher App" />

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
                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700 uppercase tracking-wide">
                  {badge}
                </span>
                <h2 className="font-display text-3xl font-bold text-neutral-900 mt-3 mb-1">
                  {comingSoon ? "Coming soon" : "Choose your activity"}
                </h2>
                <p className="text-neutral-500 text-base">
                  {comingSoon
                    ? comingSoonText
                    : "Select how you'd like to practise today"}
                </p>
                {comingSoon && (
                  <a
                    href="/"
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand/90 transition-colors"
                  >
                    Back to the App <ArrowRight size={15} />
                  </a>
                )}
              </motion.div>
            </div>

            {/* Teacher */}
            <div className="hidden md:block shrink-0 select-none pointer-events-none">
              <img
                src={teacherCelebrate}
                alt="Teacher"
                className="h-36 w-auto -scale-x-100"
                draggable={false}
              />
            </div>
          </div>

          {/* Activity cards */}
          {!comingSoon && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {visibleItems.map((item) => (
                <ActivityCard key={item.id} item={item} />
              ))}
            </motion.div>
          )}
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
