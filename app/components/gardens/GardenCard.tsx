import { Link, useFetcher } from "react-router";
import type { Garden } from "~/lib/types";
import { Button } from "~/components/ui/Button";

interface GardenCardProps {
  garden: Garden;
}

export function GardenCard({ garden }: GardenCardProps) {
  const fetcher = useFetcher();
  const isDeleting = fetcher.state !== "idle";

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm flex flex-col gap-3 opacity-100 transition-opacity" style={{ opacity: isDeleting ? 0.5 : 1 }}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <Link
            to={`/gardens/${garden.slug}`}
            className="text-lg font-semibold text-gray-900 hover:text-green-700 transition-colors"
          >
            {garden.name}
          </Link>
          <p className="text-sm text-gray-500 mt-0.5">{garden.location}</p>
        </div>
        <Link
          to={`/gardens/${garden.slug}/edit`}
          className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors shrink-0"
        >
          Edit
        </Link>
      </div>
      {garden.notes && (
        <p className="text-sm text-gray-600 line-clamp-2">{garden.notes}</p>
      )}
      <div className="flex items-center justify-between pt-1">
        <Link
          to={`/gardens/${garden.slug}`}
          className="text-sm font-medium text-green-700 hover:underline"
        >
          View plants →
        </Link>
        <fetcher.Form method="post" action={`/gardens/${garden.slug}`}>
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
