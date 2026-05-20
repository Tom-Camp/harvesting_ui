import { useState } from "react";
import { Form, Link, NavLink, Outlet } from "react-router";
import type { User } from "~/lib/types";
import logo from "~/assets/logo.svg";

interface AppShellProps {
  user: User;
}

export function AppShell({ user }: AppShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const displayName = user.first_name
    ? `${user.first_name}${user.last_name ? ` ${user.last_name}` : ""}`
    : (user.username ?? user.email);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-screen bg-bg">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-surface/90 backdrop-blur">
        <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Link to="/gardens" className="flex items-center gap-2 font-display text-2xl leading-none text-primary">
              <img src={logo} alt="" className="h-8 w-auto" aria-hidden="true" />
              harvesting.food
            </Link>
            <nav className="hidden sm:flex items-center gap-4">
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
                  to="/admin"
                  end={false}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${
                      isActive ? "text-orange" : "text-text-muted hover:text-text-main"
                    }`
                  }
                >
                  Admin
                </NavLink>
              )}
            </nav>
          </div>

          <div className="hidden sm:flex items-center gap-4">
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `text-sm transition-colors ${
                  isActive ? "text-primary font-medium" : "text-text-muted hover:text-text-main"
                }`
              }
            >
              {displayName}
            </NavLink>
            <Form method="post" action="/auth/logout">
              <button
                type="submit"
                className="text-sm font-medium text-text-muted hover:text-text-main transition-colors"
              >
                Sign out
              </button>
            </Form>
          </div>

          <button
            type="button"
            className="sm:hidden p-2 -mr-2 text-text-muted hover:text-text-main transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {menuOpen && (
          <nav className="sm:hidden border-t border-black/10 px-4 py-4 flex flex-col gap-4">
            <NavLink
              to="/gardens"
              onClick={closeMenu}
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
                to="/admin"
                end={false}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? "text-orange" : "text-text-muted hover:text-text-main"
                  }`
                }
              >
                Admin
              </NavLink>
            )}
            <NavLink
              to="/settings"
              onClick={closeMenu}
              className={({ isActive }) =>
                `text-sm transition-colors ${
                  isActive ? "text-primary font-medium" : "text-text-muted hover:text-text-main"
                }`
              }
            >
              {displayName}
            </NavLink>
            <Form method="post" action="/auth/logout">
              <button
                type="submit"
                className="text-sm font-medium text-text-muted hover:text-text-main transition-colors"
              >
                Sign out
              </button>
            </Form>
          </nav>
        )}
      </header>
      <Outlet />
    </div>
  );
}
