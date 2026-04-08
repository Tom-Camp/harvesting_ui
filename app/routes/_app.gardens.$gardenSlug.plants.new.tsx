import { redirect, useActionData, useLoaderData } from "react-router";
import { PlantForm } from "~/components/plants/PlantForm";
import { createPlant, getGarden } from "~/.server/api";
import { ApiClientError } from "~/lib/api-client";
import type { PlantType } from "~/lib/types";
import { requireToken } from "~/.server/session";
import type { Route } from "./+types/_app.gardens.$gardenSlug.plants.new";

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: `Add Plant — ${data?.gardenName ?? "Garden"} — harvesting.food` },
  ];
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const token = await requireToken(request);
  const garden = await getGarden(token, params.gardenSlug);
  return { gardenName: garden.name };
}

export async function action({ request, params }: Route.ActionArgs) {
  const token = await requireToken(request);
  const form = await request.formData();

  const plant_type = String(form.get("plant_type") ?? "") as PlantType;
  const species = String(form.get("species") ?? "");
  const variety = String(form.get("variety") ?? "") || undefined;
  const planted_date = String(form.get("planted_date") ?? "") || undefined;

  if (!species || !plant_type) {
    return { error: "Plant type and species are required." };
  }

  try {
    await createPlant(token, params.gardenSlug, { plant_type, species, variety, planted_date });
    return redirect(`/gardens/${params.gardenSlug}`);
  } catch (err) {
    if (err instanceof ApiClientError) {
      return { error: err.message };
    }
    return { error: "Something went wrong. Please try again." };
  }
}

export default function NewPlant() {
  const { gardenName } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  return (
    <div className="max-w-lg">
      <p className="text-sm text-gray-500 mb-1">{gardenName}</p>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add Plant</h1>
      <PlantForm error={actionData?.error} submitLabel="Add plant" />
    </div>
  );
}
