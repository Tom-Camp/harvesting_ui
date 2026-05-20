import { useActionData, useLoaderData, useNavigation } from "react-router";
import { listAdminInvitations, sendAdminInvitation } from "~/.server/api";
import { requireToken } from "~/.server/session";
import { ApiClientError } from "~/lib/api-client";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { FormError } from "~/components/ui/FormError";
import type { AdminInvitation } from "~/lib/types";
import type { Route } from "./+types/_app.admin.invitations";

export function meta() {
  return [{ title: "Invitations — harvesting.food Admin" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const token = await requireToken(request);
  const invitations = await listAdminInvitations(token);
  return { invitations };
}

export async function action({ request }: Route.ActionArgs) {
  const token = await requireToken(request);
  const form = await request.formData();
  const email = String(form.get("email") ?? "").trim();

  if (!email) {
    return { error: "Email address is required.", success: null };
  }

  try {
    await sendAdminInvitation(token, { email });
    return { error: null, success: `Invitation sent to ${email}.` };
  } catch (err) {
    if (err instanceof ApiClientError) {
      return { error: err.message, success: null };
    }
    return { error: "Something went wrong. Please try again.", success: null };
  }
}

function invitationStatus(inv: AdminInvitation) {
  if (inv.accepted_at) return "accepted";
  if (new Date(inv.expires_at) < new Date()) return "expired";
  return "pending";
}

const STATUS_LABEL: Record<string, string> = {
  accepted: "Accepted",
  expired: "Expired",
  pending: "Pending",
};

const STATUS_CLASSES: Record<string, string> = {
  accepted: "bg-green-100 text-green-800",
  expired: "bg-gray-100 text-gray-600",
  pending: "bg-yellow-100 text-yellow-800",
};

export default function AdminInvitations() {
  const { invitations } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invitations</h1>
          <p className="mt-1 text-sm text-gray-500">
            Send an invitation email to allow a new user to register. Tokens expire after 7 days and are single-use.
          </p>
        </div>

        <div className="rounded-lg border border-orange/20 bg-orange-soft/40 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-orange">
            Send Invitation
          </h2>
          <form method="post" className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <Input
                label="Email address"
                name="email"
                type="email"
                autoComplete="off"
                required
                placeholder="newuser@example.com"
              />
            </div>
            <Button type="submit" isLoading={isSubmitting} className="shrink-0">
              Send invitation
            </Button>
          </form>
          {actionData?.error && (
            <div className="mt-3">
              <FormError message={actionData.error} />
            </div>
          )}
          {actionData?.success && (
            <p className="mt-3 text-sm text-green-700">{actionData.success}</p>
          )}
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Sent Invitations
            </h2>
            <span className="text-sm text-gray-500">
              {invitations.length} invitation{invitations.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                    Expires
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {invitations.map((inv) => {
                  const status = invitationStatus(inv);
                  return (
                    <tr key={inv.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{inv.invited_email}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(inv.expires_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_CLASSES[status]}`}
                        >
                          {STATUS_LABEL[status]}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {invitations.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-sm text-gray-500">
                      No invitations sent yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
