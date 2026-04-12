import { useEffect, useMemo, useState } from 'react';
import { Activity, BarChart2, Calendar, ChartNoAxesCombined, NotebookPen, Settings, Sprout, TrendingUp } from 'lucide-react';
import { plants, plantOrder } from './data/plants';
import { GardenLogo } from './components/GardenLogo';
import { HarvestRows } from './components/HarvestRows';
import { HarvestTrend } from './components/HarvestTrend';
import { KPICard } from './components/KPICard';
import { ProgressRing } from './components/ProgressRing';
import { Sidebar } from './components/Sidebar';
import { StatusBadge } from './components/StatusBadge';
import { ThemeToggle } from './components/ThemeToggle';
import { Timeline } from './components/Timeline';
import { avgPerSession, daysSince, growthPercent, plantedFormatted } from './lib/utils';

export default function App() {
  const [selected, setSelected] = useState(plantOrder[0]);
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  );

  const plant = useMemo(() => plants[selected], [selected]);
  const days = daysSince(plant.plantedDate);
  const percent = growthPercent(plant);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-bg text-text-main">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-surface/90 backdrop-blur dark:border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <GardenLogo />
            <div>
              <div className="font-display text-2xl leading-none">GardenLog</div>
              <div className="mt-1 text-xs uppercase tracking-[0.16em] text-text-faint">Plant dashboard</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} onToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
            <button className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-surface text-text-muted transition hover:bg-surface-offset hover:text-text-main dark:border-white/10" aria-label="Settings">
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl gap-0">
        <Sidebar selected={selected} onSelect={setSelected} plantKeys={plantOrder} />

        <div className="min-w-0 flex-1">
          <div className="border-b border-black/10 px-4 py-3 lg:hidden dark:border-white/10">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {plantOrder.map((key) => (
                <button
                  key={key}
                  onClick={() => setSelected(key)}
                  className={[
                    'whitespace-nowrap rounded-full border px-3 py-2 text-sm transition',
                    selected === key
                      ? 'border-transparent bg-primary-soft text-primary'
                      : 'border-black/10 bg-surface text-text-muted dark:border-white/10',
                  ].join(' ')}
                >
                  {plants[key].name}
                </button>
              ))}
            </div>
          </div>

          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="font-display text-[clamp(1.8rem,2vw+1rem,2.9rem)] leading-none">{plant.name}</h1>
                <p className="mt-2 text-sm text-text-muted sm:text-base">
                  <em>{plant.variety}</em> · {plant.bed} · Planted {plantedFormatted(plant.plantedDate)}
                </p>
              </div>
              <StatusBadge status={plant.status} />
            </header>

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <KPICard label="Total Harvest" value={plant.totalHarvest} meta={`${plant.harvests.length} harvest sessions`} Icon={TrendingUp} />
              <KPICard label="Days Growing" value={days} meta={`${plant.daysToMaturity}d to maturity`} Icon={Calendar} />
              <KPICard label="Avg / Session" value={avgPerSession(plant)} meta={plant.harvestUnit} Icon={Activity} />
              <KPICard label="Growth Progress" value={`${percent}%`} meta="based on maturity window" Icon={Sprout} />
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-2">
              <article className="rounded-3xl border border-black/10 bg-surface p-5 shadow-soft dark:border-white/10 sm:p-6">
                <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
                  <BarChart2 className="h-4 w-4 text-primary" />
                  <span>Harvest History</span>
                </div>
                <HarvestRows harvests={plant.harvests} />
              </article>

              <article className="rounded-3xl border border-black/10 bg-surface p-5 shadow-soft dark:border-white/10 sm:p-6">
                <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span>Season Progress</span>
                </div>
                <ProgressRing percent={percent} days={days} maturity={plant.daysToMaturity} color={plant.color} />
                <div className="mt-6 border-t border-black/10 pt-5 dark:border-white/10">
                  <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
                    <ChartNoAxesCombined className="h-4 w-4 text-primary" />
                    <span>Harvest Trend</span>
                  </div>
                  <HarvestTrend plant={plant} />
                </div>
              </article>
            </section>

            <section className="mt-6">
              <article className="rounded-3xl border border-black/10 bg-surface p-5 shadow-soft dark:border-white/10 sm:p-6">
                <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
                  <NotebookPen className="h-4 w-4 text-primary" />
                  <span>Garden Log</span>
                </div>
                <Timeline notes={plant.notes} color={plant.color} />
              </article>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
