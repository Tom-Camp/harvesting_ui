import { useState } from "react";
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

  const careTabs = careInfo
    ? [
        { key: "summary", label: "Summary", content: careInfo.summary },
        { key: "planting", label: "Planting", content: careInfo.planting },
        { key: "care", label: "Care", content: careInfo.care },
        { key: "harvesting", label: "Harvesting", content: careInfo.harvesting },
      ].filter((tab) => tab.content)
    : [];

  const [activeTab, setActiveTab] = useState(() => careTabs[0]?.key ?? "summary");
  const activeContent = careTabs.find((t) => t.key === activeTab)?.content;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
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
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Care Information</h2>
              {careInfo.latin_name && (
                <p className="text-sm text-gray-400 italic">{careInfo.latin_name}</p>
              )}
            </div>
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
          {careTabs.length > 0 ? (
            <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
              <div className="flex border-b border-gray-200">
                {careTabs.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-4 py-2.5 text-sm font-medium transition-colors ${
                      activeTab === tab.key
                        ? "text-green-700 border-b-2 border-green-700 -mb-px bg-white"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="px-4 py-4">
                <p className="text-sm text-gray-700 whitespace-pre-line">{activeContent}</p>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-gray-200 bg-white px-4 py-6 text-center text-sm text-gray-400">
              No care information available yet.
            </div>
          )}
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
        {is404 ? "Plant not found." : "Failed to load plant."}
      </p>
    </div>
  );
}
