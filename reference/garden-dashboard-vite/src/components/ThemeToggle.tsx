import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle dark mode"
      className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-surface text-text-muted transition hover:bg-surface-offset hover:text-text-main dark:border-white/10"
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
