import { Form, redirect, useActionData, useLoaderData, useOutletContext } from "react-router";
import { GardenForm } from "~/components/gardens/GardenForm";
import { deleteGarden, getGarden, getMe, listMembers, updateGarden } from "~/.server/api";
import { ApiClientError } from "~/lib/api-client";
import { requireToken } from "~/.server/session";
import type { Route } from "./+types/_app.gardens.$gardenSlug.edit";
import type { GardenOutletContext } from "./_app.gardens.$gardenSlug";

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
  const intent = form.get("intent");

  if (intent === "delete") {
    try {
      const [me, members] = await Promise.all([
        getMe(token),
        listMembers(token, params.gardenSlug),
      ]);
      const isOwner = members.some((m) => m.user_id === me.id && m.role === "owner");
      if (!isOwner) return { error: "Only garden owners can delete this garden." };
      await deleteGarden(token, params.gardenSlug);
      return redirect("/gardens");
    } catch (err) {
      if (err instanceof ApiClientError) return { error: err.message };
      return { error: "Failed to delete garden." };
    }
  }

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
  const { isOwner } = useOutletContext<GardenOutletContext>();
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
        {isOwner && (
          <div className="mt-8 border-t border-black/10 pt-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-text-faint">Danger Zone</p>
            <Form method="post">
              <input type="hidden" name="intent" value="delete" />
              <button
                type="submit"
                className="inline-flex items-center rounded-full border border-red-200/60 bg-surface px-3 py-1.5 text-xs font-medium text-orange transition hover:bg-orange-soft"
                onClick={(e) => {
                  if (!confirm(`Delete "${garden.name}"? This cannot be undone.`)) {
                    e.preventDefault();
                  }
                }}
              >
                Delete garden
              </button>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
}
