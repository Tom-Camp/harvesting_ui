import { Link } from "react-router";
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
  gardenSlug: string;
  gardenName: string;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function PlantSidebar({
  plants,
  gardenSlug,
  gardenName,
  selectedId,
  onSelect,
}: PlantSidebarProps) {
  return (
    <aside className="hidden lg:sticky lg:top-16 lg:block lg:h-[calc(100vh-4rem)] lg:w-60 lg:shrink-0 lg:overflow-y-auto lg:border-r lg:border-black/10 lg:bg-surface lg:px-3 lg:py-4">
      <div className="px-2 pb-3 pt-1">
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-faint">
          {gardenName}
        </div>
        <div className="mt-0.5 text-xs text-text-muted">Plants</div>
      </div>

      {plants.length === 0 ? (
        <p className="px-3 py-2 text-sm text-text-faint">No plants yet.</p>
      ) : (
        plants.map((plant) => (
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
            <span className="truncate">
              {plant.species}
              {plant.variety && (
                <em className="ml-1 not-italic text-text-faint">
                  {plant.variety}
                </em>
              )}
            </span>
          </button>
        ))
      )}

      <div className="mt-4 border-t border-black/10 pt-3">
        <Link
          to={`/gardens/${gardenSlug}/plants/new`}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-text-muted transition hover:bg-surface-offset hover:text-text-main"
        >
          + Add plant
        </Link>
      </div>
    </aside>
  );
}
