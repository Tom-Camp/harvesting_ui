interface ProgressRingProps {
  percent: number;
  days: number;
  maturity?: number;
  color: string;
}

export function ProgressRing({ percent, days, maturity, color }: ProgressRingProps) {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  const remaining = maturity != null ? maturity - days : null;

  return (
    <div className="flex items-center gap-5">
      <svg className="h-28 w-28 -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="currentColor" strokeWidth="10" className="text-black/8 dark:text-white/8" />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div>
        <div className="font-display text-4xl leading-none">
          {days}
          <span className="ml-1 text-sm font-medium text-text-muted">days</span>
        </div>
        <div className="mt-1 text-xs uppercase tracking-[0.16em] text-text-muted">since planted</div>
        {remaining != null && (
          <div className="mt-3 text-sm text-text-muted">
            {remaining > 0 ? `~${remaining} days to maturity` : "Past maturity date"}
          </div>
        )}
      </div>
    </div>
  );
}
