import { motion } from "motion/react";
import teacherThinking from "../assets/teacher-thinking.png";

// The topic list used by every level page: vocabulary flash cards, vocabulary trivia and the
// grammar equivalents. Two looks that match the original vocabulary screens exactly:
//   "flashcards" = orange, max-w-3xl, no teacher, no stagger
//   "quiz"       = blue, max-w-4xl, teacher in the hero, staggered tiles

export interface TopicTile {
  id: string;
  icon: string;
  title: string;
  description: string;
  // null = nothing to study yet: greyed, disabled, reads "Coming soon"
  count: string | null;
}

export interface TopicTileGridProps {
  variant: "flashcards" | "quiz";
  badge: string;
  heading: string;
  subtitle: string;
  tiles: TopicTile[];
  onSelect: (id: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const itemVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 30 } },
};

function FlashcardsGrid({ badge, heading, subtitle, tiles, onSelect }: TopicTileGridProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full max-w-3xl flex flex-col gap-6"
    >
      <div className="flex flex-col gap-1">
        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-brand uppercase tracking-wide w-fit">
          {badge}
        </span>
        <h2 className="font-display text-3xl font-bold text-neutral-900 mt-2">
          {heading}
        </h2>
        <p className="text-neutral-500 text-sm mt-1">
          {subtitle}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {tiles.map((tile) => (
          <button
            key={tile.id}
            onClick={() => onSelect(tile.id)}
            disabled={tile.count === null}
            className="rounded-2xl bg-white border-2 border-neutral-200 px-6 py-5 text-left hover:border-orange-300 hover:shadow-md transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="text-3xl mb-3">{tile.icon}</div>
            <h3 className="font-display font-bold text-lg text-neutral-900 group-hover:text-brand transition-colors">
              {tile.title}
            </h3>
            <p className="text-sm text-neutral-500 mt-1 leading-snug">
              {tile.description}
            </p>
            <p className="text-xs text-neutral-400 mt-3 font-medium">
              {tile.count ?? "Coming soon"}
            </p>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function QuizGrid({ badge, heading, subtitle, tiles, onSelect }: TopicTileGridProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full max-w-4xl flex flex-col gap-8"
    >
      {/* Hero row */}
      <div className="flex items-end gap-6">
        <div className="flex-1">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700 uppercase tracking-wide">
            {badge}
          </span>
          <h2 className="font-display text-3xl font-bold text-neutral-900 mt-3 mb-1">{heading}</h2>
          <p className="text-neutral-500 text-base">{subtitle}</p>
        </div>
        <div className="hidden md:block shrink-0 select-none pointer-events-none">
          <img src={teacherThinking} alt="" className="h-36 w-auto animate-character-idle" draggable={false} />
        </div>
      </div>

      {/* Topic cards */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid gap-4 sm:grid-cols-2">
        {tiles.map(tile => (
          <motion.button
            key={tile.id} variants={itemVariants} whileHover={{ scale: 1.02 }}
            onClick={() => onSelect(tile.id)}
            disabled={tile.count === null}
            className="rounded-2xl bg-white border-2 border-neutral-200 px-6 py-5 text-left hover:border-blue-300 hover:shadow-md transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="text-3xl mb-3">{tile.icon}</div>
            <h3 className="font-display font-bold text-lg text-neutral-900 group-hover:text-blue-700 transition-colors">{tile.title}</h3>
            <p className="text-sm text-neutral-500 mt-1 leading-snug">{tile.description}</p>
            <p className="text-xs text-neutral-400 mt-3 font-medium">
              {tile.count ?? "Coming soon"}
            </p>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function TopicTileGrid(props: TopicTileGridProps) {
  return props.variant === "quiz" ? <QuizGrid {...props} /> : <FlashcardsGrid {...props} />;
}
