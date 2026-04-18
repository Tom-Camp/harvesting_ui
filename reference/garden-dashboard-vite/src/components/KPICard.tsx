import type { LucideIcon } from 'lucide-react';

interface KPICardProps {
  label: string;
  value: string | number;
  meta: string;
  Icon: LucideIcon;
}

export function KPICard({ label, value, meta, Icon }: KPICardProps) {
  return (
    <article className="rounded-3xl border border-black/10 bg-surface p-4 shadow-soft dark:border-white/10 sm:p-5">
      <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">{label}</div>
      <div className="font-display text-3xl leading-none sm:text-4xl">{value}</div>
      <div className="mt-2 flex items-center gap-2 text-xs text-text-muted">
        <Icon className="h-3.5 w-3.5" />
        <span>{meta}</span>
      </div>
    </article>
  );
}
