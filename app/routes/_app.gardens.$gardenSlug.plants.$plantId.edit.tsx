import { redirect, useActionData, useLoaderData } from "react-router";
import { PlantForm } from "~/components/plants/PlantForm";
import { deletePlant, getPlant, updatePlant } from "~/.server/api";
import { ApiClientError } from "~/lib/api-client";
import { requireToken } from "~/.server/session";
import type { Route } from "./+types/_app.gardens.$gardenSlug.plants.$plantId.edit";

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: `Edit ${data?.plant.species ?? "Plant"} — harvesting.food` },
  ];
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const token = await requireToken(request);
  const plant = await getPlant(token, params.gardenSlug, params.plantId);
  return { plant };
}

export async function action({ request, params }: Route.ActionArgs) {
  const token = await requireToken(request);
  const form = await request.formData();
  const intent = form.get("intent");
  const { gardenSlug, plantId } = params;

  if (intent === "delete") {
    try {
      await deletePlant(token, gardenSlug, plantId);
      return redirect(`/gardens/${gardenSlug}`);
    } catch (err) {
      if (err instanceof ApiClientError) {
        return { error: err.message };
      }
      return { error: "Failed to delete plant." };
    }
  }

  // Update
  const variety = String(form.get("variety") ?? "") || undefined;
  const notes = String(form.get("notes") ?? "") || undefined;
  const planted_date = String(form.get("planted_date") ?? "") || undefined;

  try {
    await updatePlant(token, gardenSlug, plantId, { variety, notes, planted_date });
    return redirect(`/gardens/${gardenSlug}`);
  } catch (err) {
    if (err instanceof ApiClientError) {
      return { error: err.message };
    }
    return { error: "Something went wrong. Please try again." };
  }
}

export default function EditPlant() {
  const { plant } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Plant</h1>
      <PlantForm
        defaultValues={plant}
        error={actionData?.error}
        submitLabel="Save changes"
      />
    </div>
  );
}
