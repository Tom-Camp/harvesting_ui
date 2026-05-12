import { Form, useActionData, useLoaderData } from "react-router";
import { getMe, updateMe } from "~/.server/api";
import { ApiClientError } from "~/lib/api-client";
import { requireToken } from "~/.server/session";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { FormError } from "~/components/ui/FormError";
import type { Route } from "./+types/_app.settings";

export function meta() {
  return [{ title: "Settings — harvesting.food" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const token = await requireToken(request);
  const user = await getMe(token);
  return { user };
}

export async function action({ request }: Route.ActionArgs) {
  const token = await requireToken(request);
  const form = await request.formData();
  const username = String(form.get("username") ?? "").trim() || undefined;
  const first_name = String(form.get("first_name") ?? "").trim() || undefined;
  const last_name = String(form.get("last_name") ?? "").trim() || undefined;

  try {
    await updateMe(token, { username, first_name, last_name });
    return { success: true, error: null };
  } catch (err) {
    if (err instanceof ApiClientError) {
      return { success: false, error: err.message };
    }
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

export default function Settings() {
  const { user } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-display text-[clamp(1.6rem,2vw+1rem,2.4rem)] leading-none mb-8">
        Settings
      </h1>

      <article className="rounded-3xl border border-black/10 bg-surface p-5 shadow-soft sm:p-6">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
          Profile
        </p>

        {actionData?.success && (
          <div className="mb-5 rounded-2xl border border-green-200/60 bg-green-50 px-4 py-3 text-sm text-green-800">
            Profile updated.
          </div>
        )}

        <Form method="post" className="flex flex-col gap-4">
          <FormError message={actionData?.error ?? undefined} />
          <Input
            label="Username"
            name="username"
            type="text"
            autoComplete="username"
            defaultValue={user.username ?? ""}
            required
          />
          <Input
            label="First name"
            name="first_name"
            type="text"
            autoComplete="given-name"
            defaultValue={user.first_name ?? ""}
          />
          <Input
            label="Last name"
            name="last_name"
            type="text"
            autoComplete="family-name"
            defaultValue={user.last_name ?? ""}
          />
          <div className="pt-2">
            <Button type="submit">Save changes</Button>
          </div>
        </Form>
      </article>
    </div>
  );
}
