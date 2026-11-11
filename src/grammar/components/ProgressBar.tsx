interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const pct = ((current) / total) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center font-display text-sm">
        <span className="text-muted-foreground">
          Question <span className="text-foreground font-semibold">{current + 1}</span> of {total}
        </span>
        <span className="text-primary font-semibold">{Math.round(pct)}%</span>
      </div>
      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
