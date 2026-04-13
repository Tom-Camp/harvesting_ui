import { useState } from "react";
import { Link, useFetcher } from "react-router";
import type { Garden } from "~/lib/types";
import { Button } from "~/components/ui/Button";

interface GardenCardProps {
  garden: Garden;
}

export function GardenCard({ garden }: GardenCardProps) {
  const fetcher = useFetcher();
  const isDeleting = fetcher.state !== "idle";
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm flex flex-col gap-3 transition-opacity" style={{ opacity: isDeleting ? 0.5 : 1 }}>
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
        {confirming ? (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">Are you sure?</span>
            <fetcher.Form method="post" action={`/gardens/${garden.slug}`}>
              <input type="hidden" name="intent" value="delete" />
              <Button
                type="submit"
                variant="danger"
                isLoading={isDeleting}
                className="text-xs px-2 py-1"
              >
                Confirm
              </Button>
            </fetcher.Form>
            <Button
              type="button"
              variant="secondary"
              className="text-xs px-2 py-1"
              onClick={() => setConfirming(false)}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            variant="danger"
            className="text-xs px-2 py-1"
            onClick={() => setConfirming(true)}
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
}
