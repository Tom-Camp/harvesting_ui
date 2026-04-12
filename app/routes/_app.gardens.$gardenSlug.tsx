import { isRouteErrorResponse, Link, Outlet, useLoaderData, useRouteError } from "react-router";
import { getGarden, listPlants } from "~/.server/api";
import { requireToken } from "~/.server/session";
import type { Route } from "./+types/_app.gardens.$gardenSlug";
import type { Garden, Plant } from "~/lib/types";

export type GardenOutletContext = { garden: Garden; plants: Plant[] };

export function meta({ data }: Route.MetaArgs) {
  return [{ title: `${data?.garden.name ?? "Garden"} — harvesting.food` }];
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const token = await requireToken(request);
  const [garden, plants] = await Promise.all([
    getGarden(token, params.gardenSlug),
    listPlants(token, params.gardenSlug),
  ]);
  return { garden, plants };
}

export default function GardenLayout() {
  const { garden, plants } = useLoaderData<typeof loader>();
  const ctx: GardenOutletContext = { garden, plants };
  return <Outlet context={ctx} />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  const is404 = isRouteErrorResponse(error) && error.status === 404;

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8">
      <p className="text-4xl font-bold text-primary">
        {is404 ? "404" : "Error"}
      </p>
      <p className="mt-3 text-text-muted">
        {is404 ? "Garden not found." : "Failed to load garden."}
      </p>
      <Link
        to="/gardens"
        className="mt-6 inline-block text-sm font-medium text-primary hover:underline"
      >
        ← Back to My Gardens
      </Link>
    </div>
  );
}
