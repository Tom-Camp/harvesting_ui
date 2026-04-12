import { useMemo } from "react";
import { Leaf } from "lucide-react";

interface SeasonProgressCardProps {
  plantedDate: string;
}

const now = Date.now();

export function SeasonProgressCard({ plantedDate }: SeasonProgressCardProps) {
  const days = useMemo(
    () =>
      Math.floor(
        (now - new Date(plantedDate).getTime()) / 86_400_000
      ),
    [plantedDate]
  );
  const cycle = days % 365;
  const pct = Math.round((cycle / 365) * 100);
  const yearNum = Math.floor(days / 365) + 1;

  return (
    <article className="rounded-3xl border border-black/10 bg-surface p-4 shadow-soft sm:p-5">
      <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
        Season
      </div>
      <div className="font-display text-3xl leading-none sm:text-4xl">{pct}%</div>
      <div className="mt-3">
        <div className="h-1.5 overflow-hidden rounded-full bg-black/10">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2 text-xs text-text-muted">
        <Leaf className="h-3.5 w-3.5" />
        <span>year {yearNum} of growing</span>
      </div>
    </article>
  );
}
