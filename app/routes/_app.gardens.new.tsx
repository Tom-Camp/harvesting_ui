import { redirect, useActionData } from "react-router";
import { GardenForm } from "~/components/gardens/GardenForm";
import { createGarden } from "~/.server/api";
import { ApiClientError } from "~/lib/api-client";
import { requireToken } from "~/.server/session";
import type { Route } from "./+types/_app.gardens.new";

export function meta() {
  return [{ title: "New Garden — harvesting.food" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  await requireToken(request);
  return null;
}

export async function action({ request }: Route.ActionArgs) {
  const token = await requireToken(request);
  const form = await request.formData();

  const name = String(form.get("name") ?? "");
  const location = String(form.get("location") ?? "");
  const notes = String(form.get("notes") ?? "") || undefined;

  if (!name || !location) {
    return { error: "Name and location are required." };
  }

  try {
    const garden = await createGarden(token, { name, location, notes });
    return redirect(`/gardens/${garden.slug}`);
  } catch (err) {
    if (err instanceof ApiClientError) {
      return { error: err.message };
    }
    return { error: "Something went wrong. Please try again." };
  }
}

export default function NewGarden() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">New Garden</h1>
      <GardenForm
        error={actionData?.error}

        submitLabel="Create garden"
      />
    </div>
    </div>
  );
}
