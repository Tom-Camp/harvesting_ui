import { Link } from "react-router";
import type { Garden } from "~/lib/types";

interface GardenCardProps {
  garden: Garden;
}

export function GardenCard({ garden }: GardenCardProps) {
  return (
    <div className="relative rounded-lg border border-gray-200 bg-white p-5 shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start justify-between gap-2">
        <div>
          <Link
            to={`/gardens/${garden.slug}`}
            className="text-lg font-semibold text-gray-900 hover:text-green-700 transition-colors after:absolute after:inset-0"
          >
            {garden.name}
          </Link>
          <p className="text-sm text-gray-500 mt-0.5">{garden.location}</p>
        </div>
        <Link
          to={`/gardens/${garden.slug}/edit`}
          className="relative z-10 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors shrink-0"
        >
          Edit
        </Link>
      </div>
      {garden.notes && (
        <p className="text-sm text-gray-600 line-clamp-2">{garden.notes}</p>
      )}
    </div>
  );
}
