import type { PlantType } from "~/lib/types";

const typeConfig: Record<PlantType, { label: string; className: string }> = {
  herb: { label: "Herb", className: "bg-primary-soft text-primary" },
  vegetable: { label: "Vegetable", className: "bg-success-soft text-success" },
  fruit: { label: "Fruit", className: "bg-orange-soft text-orange" },
  flower: { label: "Flower", className: "bg-gold-soft text-gold" },
  shrub: { label: "Shrub", className: "bg-primary-soft text-primary-strong" },
  tree: { label: "Tree", className: "bg-success-soft text-success" },
  vine: { label: "Vine", className: "bg-gold-soft text-gold" },
};

export function PlantStatusBadge({ type }: { type: PlantType }) {
  const config = typeConfig[type];
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-[0.04em] ${config.className}`}
    >
      {config.label}
    </span>
  );
}
