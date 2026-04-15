import { isRouteErrorResponse, Link, Outlet, redirect, useLoaderData, useRouteError } from "react-router";
import { deleteGarden, getGarden, getMe, getPlant, listMembers, listPlants } from "~/.server/api";
import { requireToken } from "~/.server/session";
import type { Route } from "./+types/_app.gardens.$gardenSlug";
import type { Garden, Plant } from "~/lib/types";

export type GardenOutletContext = { garden: Garden; plants: Plant[]; isOwner: boolean };

export function meta({ data }: Route.MetaArgs) {
  return [{ title: `${data?.garden.name ?? "Garden"} — harvesting.food` }];
}

export async function action({ request, params }: Route.ActionArgs) {
  const token = await requireToken(request);
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "delete") {
    await deleteGarden(token, params.gardenSlug);
    return redirect("/gardens");
  }

  return null;
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const token = await requireToken(request);
  const [garden, plants, members, me] = await Promise.all([
    getGarden(token, params.gardenSlug),
    listPlants(token, params.gardenSlug),
    listMembers(token, params.gardenSlug),
    getMe(token),
  ]);
  const fullPlants = await Promise.all(
    plants.map((p) => getPlant(token, params.gardenSlug, p.id))
  );
  const isOwner = members.some((m) => m.user_id === me.id && m.role === "owner");
  return { garden, plants: fullPlants, isOwner };
}

export default function GardenLayout() {
  const { garden, plants, isOwner } = useLoaderData<typeof loader>();
  const ctx: GardenOutletContext = { garden, plants, isOwner };
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
