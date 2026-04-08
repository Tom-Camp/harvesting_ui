import { isRouteErrorResponse, Link, useLoaderData, useRouteError } from "react-router";
import { AppShell } from "~/components/layout/AppShell";
import { getMe } from "~/.server/api";
import { requireToken } from "~/.server/session";
import type { Route } from "./+types/_app";

export async function loader({ request }: Route.LoaderArgs) {
  const token = await requireToken(request);
  const user = await getMe(token);
  return { user, token };
}

export default function AppLayout() {
  const { user } = useLoaderData<typeof loader>();
  return <AppShell user={user} />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  const is404 = isRouteErrorResponse(error) && error.status === 404;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-5xl font-bold text-green-700">{is404 ? "404" : "Error"}</p>
        <p className="mt-3 text-gray-600">
          {is404 ? "Page not found." : "Something went wrong."}
        </p>
        <Link
          to="/gardens"
          className="mt-6 inline-block text-sm font-medium text-green-700 hover:underline"
        >
          ← Back to My Gardens
        </Link>
      </div>
    </div>
  );
}
