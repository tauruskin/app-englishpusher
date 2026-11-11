import { useEffect } from "react";
import confetti from "canvas-confetti";
import GameCharacter, { type CharacterPose } from "./GameCharacter.tsx";
import type { GrammarAnswerResult } from "../useGrammarGame.ts";
import type { GrammarQuestion } from "../types.ts";

interface EndScreenProps {
  score: number;
  total: number;
  results: GrammarAnswerResult[];
  onRestart: () => void;
  onPracticeWeak?: (questions: GrammarQuestion[]) => void;
}

const EndScreen = ({ score, total, results, onRestart, onPracticeWeak }: EndScreenProps) => {
  const pct = Math.round((score / total) * 100);
  const isPerfect = score === total;
  const isGreat = score >= Math.ceil(total * 0.7);

  const correctResults = results.filter(r => r.correct);
  const incorrectResults = results.filter(r => !r.correct);

  const emoji = isPerfect ? "🏆" : isGreat ? "🎉" : pct >= 50 ? "👍" : "💪";
  const message = isPerfect
    ? "PERFECT!"
    : isGreat
    ? "Excellent work!"
    : pct >= 50
    ? "Good effort!"
    : "Keep practicing! You've got this! 💪";

  useEffect(() => {
    if (isGreat) {
      const duration = isPerfect ? 3000 : 1500;
      const end = Date.now() + duration;
      const frame = () => {
        confetti({
          particleCount: isPerfect ? 8 : 4,
          angle: 60, spread: 55, origin: { x: 0, y: 0.6 },
          colors: ["#f59e0b", "#ef4444", "#10b981", "#3b82f6", "#8b5cf6"],
        });
        confetti({
          particleCount: isPerfect ? 8 : 4,
          angle: 120, spread: 55, origin: { x: 1, y: 0.6 },
          colors: ["#f59e0b", "#ef4444", "#10b981", "#3b82f6", "#8b5cf6"],
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
  }, [isGreat, isPerfect]);

  const hasWeakness = incorrectResults.length > 0;

  // Deduplicated incorrect questions (in case the same question was answered wrong multiple times)
  const weakQuestions = [...new Map(incorrectResults.map(r => [r.question.id, r.question])).values()];
  const characterPose: CharacterPose = isPerfect ? "celebrate" : hasWeakness ? "thinking" : "happy";

  return (
    <div className="flex items-start gap-8 justify-center">
      <div className="flex-shrink-0 space-y-3 text-center">
        <GameCharacter pose={characterPose} />
        {hasWeakness && (
          <p className="hidden md:block text-sm font-display font-semibold text-muted-foreground">
            Let's review these! 📚
          </p>
        )}
      </div>

      <div className="w-full max-w-lg space-y-6 animate-slide-up">
        <div className="text-center space-y-3">
          <div className={`text-6xl ${isPerfect ? "animate-bounce" : "animate-emoji-correct"}`}>{emoji}</div>
          <h2 className="font-display text-2xl font-bold text-foreground">{message}</h2>
          <div className="bg-card rounded-2xl p-6 border border-border shadow-md space-y-2">
            <div className="text-4xl font-display font-bold text-primary">{pct}%</div>
            <p className="text-muted-foreground text-sm">
              <span className="text-foreground font-semibold">{score}</span> out of{" "}
              <span className="text-foreground font-semibold">{total}</span> correct
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {incorrectResults.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                ❌ Questions to review
                <span className="text-xs font-normal text-muted-foreground">({incorrectResults.length})</span>
              </h3>
              <div className="bg-card border border-destructive/30 rounded-xl divide-y divide-border max-h-48 overflow-y-auto">
                {incorrectResults.map((r, i) => (
                  <div key={i} className="px-4 py-3 space-y-1">
                    <p className="text-sm font-medium text-foreground line-clamp-2">{r.question.sentence}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-display uppercase tracking-wider">{r.question.grammarRule}</span>
                      <span className="text-xs font-bold text-destructive">Wait: {r.correctAnswer}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {correctResults.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                ✅ Mastered
                <span className="text-xs font-normal text-muted-foreground">({correctResults.length})</span>
              </h3>
              <div className="bg-card border border-border rounded-xl divide-y divide-border max-h-48 overflow-y-auto">
                {correctResults.map((r, i) => (
                  <div key={i} className="px-4 py-3 flex items-center justify-between gap-4">
                    <p className="text-xs font-medium text-foreground truncate">{r.question.sentence.replace('___', r.correctAnswer)}</p>
                    <span className="text-[10px] text-success font-display font-bold uppercase whitespace-nowrap">{r.question.grammarRule}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={onRestart}
            className="flex-1 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-base hover:opacity-90 hover:scale-105 active:scale-95 transition-all"
          >
            Play Again 🔄
          </button>
          {hasWeakness && onPracticeWeak && (
            <button
              onClick={() => onPracticeWeak(weakQuestions)}
              className="flex-1 px-6 py-3 rounded-lg border-2 border-destructive/60 bg-destructive/10 text-destructive font-display font-semibold text-base hover:bg-destructive hover:text-white hover:scale-105 active:scale-95 transition-all"
            >
              Retry wrong ({weakQuestions.length}) 💪
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EndScreen;
