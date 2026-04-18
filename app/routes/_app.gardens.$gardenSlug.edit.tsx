import { redirect, useActionData, useLoaderData } from "react-router";
import { GardenForm } from "~/components/gardens/GardenForm";
import { getGarden, updateGarden } from "~/.server/api";
import { ApiClientError } from "~/lib/api-client";
import { requireToken } from "~/.server/session";
import type { Route } from "./+types/_app.gardens.$gardenSlug.edit";

export function meta({ data }: Route.MetaArgs) {
  return [{ title: `Edit ${data?.garden.name ?? "Garden"} — harvesting.food` }];
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const token = await requireToken(request);
  const garden = await getGarden(token, params.gardenSlug);
  return { garden };
}

export async function action({ request, params }: Route.ActionArgs) {
  const token = await requireToken(request);
  const form = await request.formData();

  const name = String(form.get("name") ?? "") || undefined;
  const location = String(form.get("location") ?? "") || undefined;
  const notes = String(form.get("notes") ?? "") || undefined;

  try {
    const garden = await updateGarden(token, params.gardenSlug, {
      name,
      location,
      notes,
    });
    return redirect(`/gardens/${garden.slug}`);
  } catch (err) {
    if (err instanceof ApiClientError) {
      return { error: err.message };
    }
    return { error: "Something went wrong. Please try again." };
  }
}

export default function EditGarden() {
  const { garden } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Garden</h1>
      <GardenForm
        defaultValues={garden}
        error={actionData?.error}

        submitLabel="Save changes"
      />
    </div>
    </div>
  );
}
