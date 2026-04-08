import { isRouteErrorResponse, Link, Outlet, redirect, useLoaderData, useRouteError } from "react-router";
import { deleteGarden, getGarden, listPlants } from "~/.server/api";
import { ApiClientError } from "~/lib/api-client";
import { requireToken } from "~/.server/session";
import type { Route } from "./+types/_app.gardens.$gardenSlug";

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

export async function action({ request, params }: Route.ActionArgs) {
  const token = await requireToken(request);
  const form = await request.formData();
  const intent = form.get("intent");

  if (intent === "delete") {
    try {
      await deleteGarden(token, params.gardenSlug);
      return redirect("/gardens");
    } catch (err) {
      if (err instanceof ApiClientError) {
        return { error: err.message };
      }
      return { error: "Failed to delete garden." };
    }
  }

  return null;
}

export default function GardenDetail() {
  const { garden, plants } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-8">
      <Outlet />

      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <Link to="/gardens" className="hover:text-gray-900 transition-colors">
              My Gardens
            </Link>
            <span>/</span>
            <span>{garden.name}</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{garden.name}</h1>
          <p className="text-gray-500 mt-1">{garden.location}</p>
          {garden.notes && (
            <p className="text-sm text-gray-600 mt-2">{garden.notes}</p>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            to={`/gardens/${garden.slug}/edit`}
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Edit garden
          </Link>
          <form method="post">
            <input type="hidden" name="intent" value="delete" />
            <button
              type="submit"
              className="rounded-md border border-red-200 bg-white px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              onClick={(e) => {
                if (!confirm(`Delete "${garden.name}"? This cannot be undone.`)) {
                  e.preventDefault();
                }
              }}
            >
              Delete garden
            </button>
          </form>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Plants{" "}
            <span className="text-sm font-normal text-gray-500">
              ({plants.length})
            </span>
          </h2>
          <Link
            to={`/gardens/${garden.slug}/plants/new`}
            className="inline-flex items-center gap-1 rounded-md bg-green-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-800 transition-colors"
          >
            + Add plant
          </Link>
        </div>

        {plants.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
            <p className="text-gray-500 text-sm">No plants yet.</p>
            <Link
              to={`/gardens/${garden.slug}/plants/new`}
              className="mt-3 inline-block text-sm font-medium text-green-700 hover:underline"
            >
              Add your first plant →
            </Link>
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                  <th className="px-4 py-3">Plant</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Planted</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {plants.map((plant) => (
                  <tr key={plant.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <Link
                        to={`/gardens/${garden.slug}/plants/${plant.id}/edit`}
                        className="font-medium text-gray-900 hover:text-green-700 transition-colors"
                      >
                        {plant.species}
                        {plant.variety && (
                          <span className="ml-1.5 text-gray-400">{plant.variety}</span>
                        )}
                      </Link>
                    </td>
                    <td className="px-4 py-3 capitalize text-gray-600">
                      {plant.plant_type}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {plant.planted_date
                        ? new Date(plant.planted_date).toLocaleDateString()
                        : <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        to={`/gardens/${garden.slug}/plants/${plant.id}/edit`}
                        className="font-medium text-green-700 hover:underline"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const is404 = isRouteErrorResponse(error) && error.status === 404;

  return (
    <div className="text-center py-16">
      <p className="text-4xl font-bold text-green-700">{is404 ? "404" : "Error"}</p>
      <p className="mt-3 text-gray-600">
        {is404 ? "Garden not found." : "Failed to load garden."}
      </p>
      <Link
        to="/gardens"
        className="mt-6 inline-block text-sm font-medium text-green-700 hover:underline"
      >
        ← Back to My Gardens
      </Link>
    </div>
  );
}
