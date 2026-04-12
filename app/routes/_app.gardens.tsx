import { Link, useLoaderData } from "react-router";
import { GardenCard } from "~/components/gardens/GardenCard";
import { listGardens } from "~/.server/api";
import { requireToken } from "~/.server/session";
import type { Route } from "./+types/_app.gardens";

export function meta() {
  return [{ title: "My Gardens — harvesting.food" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const token = await requireToken(request);
  const gardens = await listGardens(token);
  return { gardens };
}

export default function Gardens() {
  const { gardens } = useLoaderData<typeof loader>();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Gardens</h1>
        <Link
          to="/gardens/new"
          className="inline-flex items-center gap-1 rounded-md bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800 transition-colors"
        >
          + New garden
        </Link>
      </div>

      {gardens.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
          <p className="text-gray-500 text-sm">You don&apos;t have any gardens yet.</p>
          <Link
            to="/gardens/new"
            className="mt-3 inline-block text-sm font-medium text-green-700 hover:underline"
          >
            Create your first garden →
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gardens.map((garden) => (
            <GardenCard key={garden.id} garden={garden} />
          ))}
        </div>
      )}
    </div>
    </div>
  );
}
