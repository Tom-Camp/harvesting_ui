import { Link, useLoaderData } from "react-router";
import { listAdminGardens } from "~/.server/api";
import { requireToken } from "~/.server/session";
import type { Route } from "./+types/_app.admin.gardens";

export function meta() {
  return [{ title: "Gardens — harvesting.food Admin" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const token = await requireToken(request);
  const gardens = await listAdminGardens(token);
  return { gardens };
}

export default function AdminGardens() {
  const { gardens } = useLoaderData<typeof loader>();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Garden Administration</h1>
          <span className="text-sm text-gray-500">
            {gardens.length} garden{gardens.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                  Owner ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                  Created
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {gardens.map((garden) => (
                <tr key={garden.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <Link
                      to={`/gardens/${garden.slug}`}
                      className="text-sm font-medium text-green-700 hover:underline"
                    >
                      {garden.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {garden.location}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-mono">
                    {garden.user_id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(garden.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {gardens.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-sm text-gray-500">
                    No gardens found.
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
