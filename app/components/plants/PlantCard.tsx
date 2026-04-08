import { Link, useFetcher } from "react-router";
import type { Plant } from "~/lib/types";
import { Button } from "~/components/ui/Button";

interface PlantCardProps {
  plant: Plant;
  gardenSlug: string;
}

const plantTypeLabels: Record<Plant["plant_type"], string> = {
  herb: "Herb",
  vegetable: "Vegetable",
  fruit: "Fruit",
  flower: "Flower",
  shrub: "Shrub",
  tree: "Tree",
  vine: "Vine",
};

export function PlantCard({ plant, gardenSlug }: PlantCardProps) {
  const fetcher = useFetcher();
  const isDeleting = fetcher.state !== "idle";

  return (
    <div
      className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm flex flex-col gap-3 transition-opacity"
      style={{ opacity: isDeleting ? 0.5 : 1 }}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold text-gray-900">{plant.species}</p>
          {plant.variety && (
            <p className="text-sm text-gray-500">{plant.variety}</p>
          )}
        </div>
        <span className="shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
          {plantTypeLabels[plant.plant_type]}
        </span>
      </div>

      {plant.notes && plant.notes.length > 0 && (
        <p className="text-sm text-gray-600 line-clamp-2">
          {plant.notes[plant.notes.length - 1].note}
        </p>
      )}

      {plant.care_info?.summary && (
        <p className="text-xs text-gray-500 italic line-clamp-2">
          {plant.care_info.summary}
        </p>
      )}

      <div className="flex items-center justify-between pt-1">
        <Link
          to={`/gardens/${gardenSlug}/plants/${plant.id}/edit`}
          className="text-sm font-medium text-green-700 hover:underline"
        >
          Edit
        </Link>
        <fetcher.Form
          method="post"
          action={`/gardens/${gardenSlug}/plants/${plant.id}/edit`}
        >
          <input type="hidden" name="intent" value="delete" />
          <Button
            type="submit"
            variant="danger"
            isLoading={isDeleting}
            className="text-xs px-2 py-1"
          >
            Delete
          </Button>
        </fetcher.Form>
      </div>
    </div>
  );
}
