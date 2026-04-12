import type { HarvestEntry } from '../lib/types';

export function HarvestRows({ harvests }: { harvests: HarvestEntry[] }) {
  if (!harvests.length) {
    return <div className="py-10 text-center text-sm text-text-faint">No harvest data yet</div>;
  }

  const max = Math.max(...harvests.map((h) => h.value));

  return (
    <div className="space-y-2">
      {harvests.map((harvest) => (
        <div key={`${harvest.date}-${harvest.value}`} className="flex items-center gap-3 rounded-2xl bg-surface-offset px-3 py-2.5">
          <span className="min-w-16 text-xs text-text-muted">{harvest.date}</span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/8 dark:bg-white/8">
            <div className="h-full rounded-full bg-primary transition-all duration-700 ease-out" style={{ width: `${Math.round((harvest.value / max) * 100)}%` }} />
          </div>
          <span className="min-w-16 text-right text-sm font-semibold tabular-nums">{harvest.value} {harvest.unit}</span>
        </div>
      ))}
    </div>
  );
}
