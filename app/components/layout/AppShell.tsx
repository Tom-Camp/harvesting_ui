import { Form, Link, NavLink, Outlet } from "react-router";
import type { User } from "~/lib/types";
import logo from "~/assets/logo.svg";

interface AppShellProps {
  user: User;
}

export function AppShell({ user }: AppShellProps) {
  const displayName = user.first_name
    ? `${user.first_name}${user.last_name ? ` ${user.last_name}` : ""}`
    : user.email;

  return (
    <div className="min-h-screen bg-bg">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-surface/90 backdrop-blur">
        <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Link to="/gardens" className="flex items-center gap-2 font-display text-2xl leading-none text-primary">
              <img src={logo} alt="" className="h-8 w-auto" aria-hidden="true" />
              harvesting.food
            </Link>
            <nav className="flex items-center gap-4">
              <NavLink
                to="/gardens"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? "text-primary" : "text-text-muted hover:text-text-main"
                  }`
                }
              >
                My Gardens
              </NavLink>
              {user.role === "admin" && (
                <NavLink
                  to="/admin/users"
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${
                      isActive ? "text-primary" : "text-text-muted hover:text-text-main"
                    }`
                  }
                >
                  Users
                </NavLink>
              )}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-text-muted">{displayName}</span>
            <Form method="post" action="/auth/logout">
              <button
                type="submit"
                className="text-sm font-medium text-text-muted hover:text-text-main transition-colors"
              >
                Sign out
              </button>
            </Form>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
