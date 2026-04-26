import { redirect, useActionData, useLoaderData } from "react-router";
import { approveUsers, listAdminUsers, setUserRole, suspendUsers } from "~/.server/api";
import { requireToken } from "~/.server/session";
import { ApiClientError } from "~/lib/api-client";
import { getMe } from "~/.server/api";
import { Button } from "~/components/ui/Button";
import type { UserRole, UserStatus } from "~/lib/types";
import type { Route } from "./+types/_app.admin.users";

export function meta() {
  return [{ title: "User Administration — harvesting.food" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const token = await requireToken(request);
  const currentUser = await getMe(token);
  if (currentUser.role !== "admin") {
    throw redirect("/gardens");
  }
  const users = await listAdminUsers(token);
  return { users, currentUserId: currentUser.id };
}

export async function action({ request }: Route.ActionArgs) {
  const token = await requireToken(request);
  const form = await request.formData();
  const intent = String(form.get("intent") ?? "");
  const userId = String(form.get("userId") ?? "");

  try {
    if (intent === "approve") {
      await approveUsers(token, userId);
    } else if (intent === "suspend") {
      const currentUser = await getMe(token);
      if (userId === String(currentUser.id)) {
        return { error: "You cannot suspend your own account." };
      }
      await suspendUsers(token, userId);
    } else if (intent === "set-role") {
      const role = String(form.get("role") ?? "") as UserRole;
      await setUserRole(token, userId, role);
    } else {
      return { error: "Unknown action." };
    }
    return { error: null };
  } catch (err) {
    if (err instanceof ApiClientError) {
      return { error: err.message };
    }
    return { error: "Something went wrong. Please try again." };
  }
}

const STATUS_LABELS: Record<UserStatus, string> = {
  pending: "Pending",
  active: "Active",
  suspended: "Suspended",
};

const STATUS_CLASSES: Record<UserStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  active: "bg-green-100 text-green-800",
  suspended: "bg-red-100 text-red-800",
};

const ROLE_CLASSES: Record<UserRole, string> = {
  user: "bg-gray-100 text-gray-700",
  admin: "bg-blue-100 text-blue-800",
};

export default function AdminUsers() {
  const { users, currentUserId } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">User Administration</h1>
          <span className="text-sm text-gray-500">{users.length} user{users.length !== 1 ? "s" : ""}</span>
        </div>

        {actionData?.error && (
          <div className="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {actionData.error}
          </div>
        )}

        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                  Joined
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => {
                const displayName =
                  user.first_name
                    ? `${user.first_name}${user.last_name ? ` ${user.last_name}` : ""}`
                    : null;

                return (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        {displayName && (
                          <span className="text-sm font-medium text-gray-900">
                            {displayName}
                          </span>
                        )}
                        <span className={`text-sm ${displayName ? "text-gray-500" : "font-medium text-gray-900"}`}>
                          {user.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_CLASSES[user.status]}`}
                      >
                        {STATUS_LABELS[user.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${ROLE_CLASSES[user.role]}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {user.status === "pending" && (
                          <form method="post">
                            <input type="hidden" name="intent" value="approve" />
                            <input type="hidden" name="userId" value={user.id} />
                            <Button type="submit" variant="primary" className="py-1 px-3 text-xs">
                              Approve
                            </Button>
                          </form>
                        )}
                        {user.status === "active" && user.id !== currentUserId && (
                          <form method="post">
                            <input type="hidden" name="intent" value="suspend" />
                            <input type="hidden" name="userId" value={user.id} />
                            <Button type="submit" variant="danger" className="py-1 px-3 text-xs">
                              Suspend
                            </Button>
                          </form>
                        )}
                        {user.status === "suspended" && (
                          <form method="post">
                            <input type="hidden" name="intent" value="approve" />
                            <input type="hidden" name="userId" value={user.id} />
                            <Button type="submit" variant="secondary" className="py-1 px-3 text-xs">
                              Reinstate
                            </Button>
                          </form>
                        )}
                        <form method="post" className="flex items-center gap-1">
                          <input type="hidden" name="intent" value="set-role" />
                          <input type="hidden" name="userId" value={user.id} />
                          <select
                            name="role"
                            defaultValue={user.role}
                            className="rounded border border-gray-300 py-1 pl-2 pr-6 text-xs text-gray-700 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
                          >
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                          </select>
                          <Button type="submit" variant="secondary" className="py-1 px-2 text-xs">
                            Set
                          </Button>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
