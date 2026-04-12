import type { PlantStatus } from '../lib/types';

export function StatusBadge({ status }: { status: PlantStatus }) {
  const styles: Record<PlantStatus, string> = {
    growing: 'bg-primary-soft text-primary',
    harvesting: 'bg-gold-soft text-gold',
    done: 'bg-success-soft text-success',
    seedling: 'bg-blue-soft text-blue',
  };

  const labels: Record<PlantStatus, string> = {
    growing: 'Growing',
    harvesting: 'Harvesting',
    done: 'Season Complete',
    seedling: 'Seedling',
  };

  return <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-[0.04em] ${styles[status]}`}>{labels[status]}</span>;
}
