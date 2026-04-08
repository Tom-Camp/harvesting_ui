import { Form, isRouteErrorResponse, Link, redirect, useLoaderData, useNavigation, useRouteError } from "react-router";
import { getPlant, getPlantCareInfo } from "~/.server/api";
import { ApiClientError } from "~/lib/api-client";
import { requireToken } from "~/.server/session";
import type { Route } from "./+types/_app.gardens.$gardenSlug.plants.$plantId";

export function meta({ data }: Route.MetaArgs) {
  return [{ title: `${data?.plant.species ?? "Plant"} — harvesting.food` }];
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const token = await requireToken(request);
  const plant = await getPlant(token, params.gardenSlug, params.plantId);
  return { plant, gardenSlug: params.gardenSlug };
}

export async function action({ request, params }: Route.ActionArgs) {
  const token = await requireToken(request);
  const { gardenSlug, plantId } = params;

  try {
    await getPlantCareInfo(token, gardenSlug, plantId);
    return redirect(`/gardens/${gardenSlug}/plants/${plantId}`);
  } catch (err) {
    if (err instanceof ApiClientError) {
      return { error: err.message };
    }
    return { error: "Failed to generate care information." };
  }
}

export default function PlantView() {
  const { plant, gardenSlug } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isGenerating = navigation.state === "submitting";

  const careInfo = plant.care_info;
  const notes = plant.notes ?? [];

  return (
    <div className="max-w-2xl flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <Link to="/gardens" className="hover:text-gray-900 transition-colors">
              My Gardens
            </Link>
            <span>/</span>
            <Link
              to={`/gardens/${gardenSlug}`}
              className="hover:text-gray-900 transition-colors"
            >
              Garden
            </Link>
            <span>/</span>
            <span>{plant.species}</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {plant.species}
            {plant.variety && (
              <span className="ml-2 text-gray-400 font-normal">{plant.variety}</span>
            )}
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 capitalize border border-green-200">
              {plant.plant_type}
            </span>
            {plant.planted_date && (
              <span className="text-sm text-gray-500">
                Planted {new Date(plant.planted_date).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
        <Link
          to={`/gardens/${gardenSlug}/plants/${plant.id}/edit`}
          className="shrink-0 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Edit plant
        </Link>
      </div>

      {/* Care Info */}
      {careInfo ? (
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-900">Care Information</h2>
            <Form method="post">
              <button
                type="submit"
                disabled={isGenerating}
                className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {isGenerating ? "Regenerating…" : "Regenerate"}
              </button>
            </Form>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white divide-y divide-gray-100">
            {careInfo.latin_name && (
              <div className="px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400 mb-0.5">
                  Latin name
                </p>
                <p className="text-sm text-gray-700 italic">{careInfo.latin_name}</p>
              </div>
            )}
            {careInfo.summary && (
              <div className="px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400 mb-0.5">
                  Summary
                </p>
                <p className="text-sm text-gray-700">{careInfo.summary}</p>
              </div>
            )}
            {careInfo.planting && (
              <div className="px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400 mb-0.5">
                  Planting
                </p>
                <p className="text-sm text-gray-700 whitespace-pre-line">{careInfo.planting}</p>
              </div>
            )}
            {careInfo.care && (
              <div className="px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400 mb-0.5">
                  Care
                </p>
                <p className="text-sm text-gray-700 whitespace-pre-line">{careInfo.care}</p>
              </div>
            )}
            {careInfo.harvesting && (
              <div className="px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400 mb-0.5">
                  Harvesting
                </p>
                <p className="text-sm text-gray-700 whitespace-pre-line">{careInfo.harvesting}</p>
              </div>
            )}
            {!careInfo.latin_name && !careInfo.summary && !careInfo.planting && !careInfo.care && !careInfo.harvesting && (
              <div className="px-4 py-6 text-center text-sm text-gray-400">
                No care information available yet.
              </div>
            )}
          </div>
        </section>
      ) : (
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-gray-900">Care Information</h2>
          <div className="rounded-lg border border-dashed border-gray-300 bg-white px-6 py-10 text-center">
            <p className="text-sm text-gray-400 mb-4">No care information available yet.</p>
            <Form method="post">
              <button
                type="submit"
                disabled={isGenerating}
                className="inline-flex items-center rounded-md bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800 transition-colors disabled:opacity-50"
              >
                {isGenerating ? "Generating…" : "Generate care information"}
              </button>
            </Form>
          </div>
        </section>
      )}

      {/* Notes */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Notes{" "}
            <span className="text-sm font-normal text-gray-500">({notes.length})</span>
          </h2>
        </div>

        {notes.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 bg-white px-6 py-8 text-center">
            <p className="text-sm text-gray-400">No notes yet.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {notes.map((note) => (
              <div key={note.id} className="rounded-lg border border-gray-200 bg-white px-4 py-3">
                <p className="text-sm text-gray-700 whitespace-pre-line">
                  {note.note ?? <span className="text-gray-400 italic">Empty note</span>}
                </p>
                <p className="mt-2 text-xs text-gray-400">
                  {new Date(note.created_at).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
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
        {is404 ? "Plant not found." : "Failed to load plant."}
      </p>
    </div>
  );
}
