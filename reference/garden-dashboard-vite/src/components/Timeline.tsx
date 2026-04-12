import type { PlantNote } from '../lib/types';

interface TimelineProps {
  notes: PlantNote[];
  color: string;
}

export function Timeline({ notes, color }: TimelineProps) {
  const tagClasses = {
    note: 'bg-blue-soft text-blue',
    action: 'bg-primary-soft text-primary',
    pest: 'bg-orange-soft text-orange',
    harvest: 'bg-gold-soft text-gold',
    milestone: 'bg-success-soft text-success',
  } as const;

  return (
    <div className="space-y-0">
      {[...notes].reverse().map((note, idx) => (
        <div key={`${note.date}-${idx}`} className="grid grid-cols-[18px_74px_1fr] gap-3 pb-4 last:pb-0">
          <div className="flex flex-col items-center">
            <span className="z-10 mt-1 h-2.5 w-2.5 rounded-full border-2 border-surface" style={{ backgroundColor: color }} />
            {idx !== notes.length - 1 && <span className="mt-1 block w-px flex-1 bg-divider" />}
          </div>
          <div className="pt-0.5 text-xs text-text-faint">
            {new Date(note.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
          <div>
            <span className={`mb-1 inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.04em] ${tagClasses[note.label]}`}>
              {note.label}
            </span>
            <p className="text-sm leading-6 text-text-main">{note.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
