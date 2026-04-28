import { useState } from "react";
import { LayoutDashboard, Search, X } from "lucide-react";
import type { Plant, PlantType } from "~/lib/types";

const plantTypeColors: Record<PlantType, string> = {
  herb: "#3a7a45",
  vegetable: "#4a9e4a",
  fruit: "#e05d2b",
  flower: "#d83b8c",
  shrub: "#6c9e50",
  tree: "#2d6036",
  vine: "#c08a00",
};

interface PlantSidebarProps {
  plants: Plant[];
  gardenName: string;
  selectedId: string | null;
  showDashboard: boolean;
  onSelect: (id: string) => void;
  onAddPlant: () => void;
  onShowDashboard: () => void;
}

function PlantButton({
  plant,
  selectedId,
  onSelect,
}: {
  plant: Plant;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      key={plant.id}
      onClick={() => onSelect(plant.id)}
      className={[
        "relative mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition",
        selectedId === plant.id
          ? "bg-primary-soft font-semibold text-primary"
          : "text-text-muted hover:bg-surface-offset hover:text-text-main",
      ].join(" ")}
    >
      <span
        className="h-2.5 w-2.5 shrink-0 rounded-full"
        style={{ backgroundColor: plantTypeColors[plant.plant_type] }}
      />
      <span className="truncate capitalize">
        {plant.species}
        {plant.variety && (
          <em className="ml-1 not-italic text-text-faint capitalize">{plant.variety}</em>
        )}
      </span>
    </button>
  );
}

export function PlantSidebar({
  plants,
  gardenName,
  selectedId,
  showDashboard,
  onSelect,
  onAddPlant,
  onShowDashboard,
}: PlantSidebarProps) {
  const [query, setQuery] = useState("");

  const sortPlants = (list: Plant[]) =>
    [...list].sort((a, b) => {
      const s = a.species.localeCompare(b.species);
      if (s !== 0) return s;
      return (a.variety ?? "").localeCompare(b.variety ?? "");
    });

  const hasPlots = plants.some((p) => p.plot);
  const needle = query.trim().toLowerCase();

  const filteredPlants = needle
    ? sortPlants(
        plants.filter(
          (p) =>
            p.species.toLowerCase().includes(needle) ||
            (p.variety ?? "").toLowerCase().includes(needle)
        )
      )
    : null;

  // Build ordered groups: named plots (sorted), then unplotted plants
  const grouped: { label: string | null; plants: Plant[] }[] = [];
  if (!filteredPlants && hasPlots) {
    const byPlot = new Map<string, Plant[]>();
    const unplotted: Plant[] = [];
    for (const plant of plants) {
      if (plant.plot) {
        const group = byPlot.get(plant.plot) ?? [];
        group.push(plant);
        byPlot.set(plant.plot, group);
      } else {
        unplotted.push(plant);
      }
    }
    const sortedPlots = [...byPlot.keys()].sort((a, b) => a.localeCompare(b));
    for (const plot of sortedPlots) {
      grouped.push({ label: plot, plants: sortPlants(byPlot.get(plot)!) });
    }
    if (unplotted.length > 0) {
      grouped.push({ label: null, plants: sortPlants(unplotted) });
    }
  }

  return (
    <aside className="hidden lg:sticky lg:top-16 lg:block lg:h-[calc(100vh-4rem)] lg:w-60 lg:shrink-0 lg:overflow-y-auto lg:border-r lg:border-black/10 lg:bg-surface lg:px-3 lg:py-4">
      <button
        onClick={onShowDashboard}
        className={[
          "flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition",
          showDashboard
            ? "bg-primary-soft font-semibold text-primary"
            : "text-text-muted hover:bg-surface-offset hover:text-text-main",
        ].join(" ")}
      >
        <LayoutDashboard className="h-3.5 w-3.5 shrink-0" />
        Dashboard
      </button>

      <div className="my-2 border-t border-black/10" />

      <div className="px-2 pb-2 pt-1">
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-faint">
          {gardenName}
        </div>
        <div className="mt-0.5 text-xs text-text-muted">Plants</div>
      </div>

      {plants.length > 0 && (
        <div className="relative px-1 pb-2">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-faint" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search plants…"
            className="w-full rounded-lg border border-black/10 bg-bg py-1.5 pl-8 pr-7 text-xs text-text-main placeholder:text-text-faint focus:outline-none focus:ring-1 focus:ring-primary/40"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-faint hover:text-text-muted"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      )}

      {plants.length === 0 ? (
        <p className="px-3 py-2 text-sm text-text-faint">No plants yet.</p>
      ) : filteredPlants ? (
        filteredPlants.length === 0 ? (
          <p className="px-3 py-2 text-sm text-text-faint">No plants match.</p>
        ) : (
          filteredPlants.map((plant) => (
            <PlantButton
              key={plant.id}
              plant={plant}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))
        )
      ) : hasPlots ? (
        grouped.map(({ label, plants: group }, i) => (
          <div key={label ?? "__unplotted"} className={i > 0 ? "mt-3" : undefined}>
            <div className="px-3 pb-0.5 pt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-text-faint">
              {label ?? "Other"}
            </div>
            {group.map((plant) => (
              <PlantButton
                key={plant.id}
                plant={plant}
                selectedId={selectedId}
                onSelect={onSelect}
              />
            ))}
          </div>
        ))
      ) : (
        sortPlants(plants).map((plant) => (
          <PlantButton
            key={plant.id}
            plant={plant}
            selectedId={selectedId}
            onSelect={onSelect}
          />
        ))
      )}

      <div className="mt-4 border-t border-black/10 pt-3">
        <button
          onClick={onAddPlant}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-text-muted transition hover:bg-surface-offset hover:text-text-main"
        >
          + Add plant
        </button>
      </div>
    </aside>
  );
}
