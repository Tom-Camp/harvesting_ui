import { NavLink, Outlet, redirect } from "react-router";
import { getMe } from "~/.server/api";
import { requireToken } from "~/.server/session";
import type { Route } from "./+types/_app.admin";

export async function loader({ request }: Route.LoaderArgs) {
  const token = await requireToken(request);
  const user = await getMe(token);
  if (user.role !== "admin") throw redirect("/gardens");
  return null;
}

const adminNavItems = [
  { to: "/admin/users", label: "Users" },
  { to: "/admin/gardens", label: "Gardens" },
  { to: "/admin/invitations", label: "Invitations" },
];

export default function AdminLayout() {
  return (
    <div>
      <div className="border-b border-orange/20 bg-orange-soft">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 py-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-orange">
              Admin
            </span>
            <nav className="flex items-center gap-1">
              {adminNavItems.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-orange/15 text-orange"
                        : "text-text-muted hover:text-orange"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
