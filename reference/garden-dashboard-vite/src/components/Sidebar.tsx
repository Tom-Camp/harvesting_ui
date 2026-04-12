import { plants } from '../data/plants';

interface SidebarProps {
  selected: string;
  onSelect: (key: string) => void;
  plantKeys: string[];
}

export function Sidebar({ selected, onSelect, plantKeys }: SidebarProps) {
  return (
    <aside className="hidden lg:sticky lg:top-[73px] lg:block lg:h-[calc(100vh-73px)] lg:w-64 lg:shrink-0 lg:overflow-y-auto lg:border-r lg:border-black/10 lg:bg-surface lg:px-3 lg:py-4 dark:lg:border-white/10">
      <div className="px-2 pb-1 pt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-faint">Plants</div>
      {plantKeys.map((key) => {
        const plant = plants[key];
        return (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={[
              'relative mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition',
              selected === key ? 'bg-primary-soft font-semibold text-primary' : 'text-text-muted hover:bg-surface-offset hover:text-text-main',
            ].join(' ')}
          >
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: plant.color }} />
            <span className="truncate">{plant.name}</span>
          </button>
        );
      })}
    </aside>
  );
}
