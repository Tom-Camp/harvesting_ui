import { Form, Link, redirect, useActionData } from "react-router";
import { acceptInvitation } from "~/.server/api";
import { ApiClientError } from "~/lib/api-client";
import { requireToken } from "~/.server/session";
import type { Route } from "./+types/_app.invitations.$token";

export function meta() {
  return [{ title: "Accept Invitation — harvesting.food" }];
}

export async function action({ request, params }: Route.ActionArgs) {
  const token = await requireToken(request);
  try {
    await acceptInvitation(token, params.token);
    return redirect("/gardens");
  } catch (err) {
    if (err instanceof ApiClientError) return { error: err.message };
    return { error: "Failed to accept invitation. The link may have expired." };
  }
}

export default function AcceptInvitation() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="mx-auto max-w-md px-4 py-24 sm:px-6">
      <div className="rounded-3xl border border-black/10 bg-surface p-8 shadow-soft text-center">
        <h1 className="font-display text-3xl leading-none mb-3">
          Garden invitation
        </h1>
        <p className="text-sm text-text-muted mb-8">
          You&apos;ve been invited to join a garden. Accept below to get access.
        </p>

        {actionData?.error && (
          <div className="mb-6 rounded-2xl border border-red-200/60 bg-red-50 px-4 py-3 text-sm text-orange">
            {actionData.error}
          </div>
        )}

        <Form method="post">
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition hover:bg-primary-strong"
          >
            Accept invitation
          </button>
        </Form>

        <Link
          to="/gardens"
          className="mt-4 inline-block text-sm text-text-faint transition hover:text-text-muted"
        >
          Go to my gardens
        </Link>
      </div>
    </div>
  );
}
