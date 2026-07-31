import { Link } from "react-router";
import {
  Leaf,
  NotebookText,
  Sparkles,
  Sprout,
  UserCog,
  Wheat,
  type LucideIcon,
} from "lucide-react";

export function meta() {
  return [{ title: "Help — harvesting.food" }];
}

const topics: { to: string; label: string; description: string; Icon: LucideIcon }[] = [
  {
    to: "/help/gardens",
    label: "Gardens & Members",
    description: "Create a garden, invite members, and read the garden dashboard.",
    Icon: Sprout,
  },
  {
    to: "/help/plants",
    label: "Plants",
    description: "Add plants to a garden and track their status over time.",
    Icon: Leaf,
  },
  {
    to: "/help/notes",
    label: "Notes",
    description: "Log observations, actions, pests, harvests, and milestones.",
    Icon: NotebookText,
  },
  {
    to: "/help/harvests",
    label: "Harvests",
    description: "Record what you've picked and watch your harvest trend.",
    Icon: Wheat,
  },
  {
    to: "/help/ai-tips",
    label: "AI Care Tips",
    description: "Generate planting, care, and harvesting guidance for a plant.",
    Icon: Sparkles,
  },
  {
    to: "/help/account",
    label: "Account & Settings",
    description: "Manage your profile, send feedback, and sign out.",
    Icon: UserCog,
  },
];

export default function HelpIndex() {
  return (
    <div>
      <h1 className="font-display text-2xl leading-none mb-3">Getting Started</h1>
      <p className="mb-6 text-sm leading-7 text-text-muted">
        harvesting.food helps you journal your gardens and plants, and get AI-generated
        tips personalised to your location. Here&apos;s a quick tour of what you can do.
      </p>

      <ol className="mb-8 list-decimal space-y-2 pl-5 text-sm leading-7 text-text-muted">
        <li>
          <Link to="/gardens/new" className="font-medium text-primary hover:underline">
            Create a garden
          </Link>{" "}
          with a name, location, and optional description.
        </li>
        <li>
          Add the plants you&apos;re growing, then log{" "}
          <Link to="/help/notes" className="font-medium text-primary hover:underline">
            notes
          </Link>{" "}
          and{" "}
          <Link to="/help/harvests" className="font-medium text-primary hover:underline">
            harvests
          </Link>{" "}
          as your garden progresses.
        </li>
        <li>
          Open a plant and generate{" "}
          <Link to="/help/ai-tips" className="font-medium text-primary hover:underline">
            AI care tips
          </Link>{" "}
          for planting, care, and harvesting guidance based on your garden&apos;s location.
        </li>
        <li>
          Invite others to a garden from its{" "}
          <Link to="/help/gardens" className="font-medium text-primary hover:underline">
            Members
          </Link>{" "}
          page so you can journal together.
        </li>
      </ol>

      <div className="grid gap-3 sm:grid-cols-2">
        {topics.map(({ to, label, description, Icon }) => (
          <Link
            key={to}
            to={to}
            className="flex items-start gap-3 rounded-2xl border border-black/[0.06] bg-bg px-4 py-3.5 transition hover:bg-black/[0.03]"
          >
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
              <Icon className="h-4 w-4" />
            </span>
            <span>
              <span className="block text-sm font-medium text-text-main">{label}</span>
              <span className="block text-xs leading-5 text-text-faint">{description}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
