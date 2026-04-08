import { Form, Link, NavLink, Outlet } from "react-router";
import type { User } from "~/lib/types";

interface AppShellProps {
  user: User;
}

export function AppShell({ user }: AppShellProps) {
  const displayName = user.first_name
    ? `${user.first_name}${user.last_name ? ` ${user.last_name}` : ""}`
    : user.email;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-6">
            <Link to="/gardens" className="text-lg font-bold text-green-700">
              harvesting.food
            </Link>
            <nav className="flex items-center gap-4">
              <NavLink
                to="/gardens"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? "text-green-700" : "text-gray-600 hover:text-gray-900"
                  }`
                }
              >
                My Gardens
              </NavLink>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{displayName}</span>
            <Form method="post" action="/auth/logout">
              <button
                type="submit"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Sign out
              </button>
            </Form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
