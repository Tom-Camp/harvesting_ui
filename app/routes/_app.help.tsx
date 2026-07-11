import { NavLink, Outlet } from "react-router";
import {
  BookOpen,
  Leaf,
  NotebookText,
  Sparkles,
  Sprout,
  UserCog,
  Wheat,
} from "lucide-react";

const helpNavItems = [
  { to: "/help", label: "Getting Started", Icon: BookOpen, end: true },
  { to: "/help/gardens", label: "Gardens & Members", Icon: Sprout },
  { to: "/help/plants", label: "Plants", Icon: Leaf },
  { to: "/help/notes", label: "Notes", Icon: NotebookText },
  { to: "/help/harvests", label: "Harvests", Icon: Wheat },
  { to: "/help/ai-tips", label: "AI Care Tips", Icon: Sparkles },
  { to: "/help/account", label: "Account & Settings", Icon: UserCog },
];

export function meta() {
  return [{ title: "Help — harvesting.food" }];
}

export default function HelpLayout() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-display text-[clamp(1.6rem,2vw+1rem,2.4rem)] leading-none mb-8">
        Help Center
      </h1>
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        <nav className="flex shrink-0 gap-1 overflow-x-auto lg:w-56 lg:flex-col lg:overflow-visible">
          {helpNavItems.map(({ to, label, Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-primary-soft text-primary"
                    : "text-text-muted hover:bg-black/[0.03] hover:text-text-main"
                }`
              }
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>
        <article className="min-w-0 flex-1 rounded-3xl border border-black/10 bg-surface p-5 shadow-soft sm:p-6">
          <Outlet />
        </article>
      </div>
    </div>
  );
}
