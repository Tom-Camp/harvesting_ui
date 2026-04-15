import { useState } from "react";
import { Form, Link, useActionData, useLoaderData } from "react-router";
import { getGarden, getMe, inviteMember, listMembers, removeMember } from "~/.server/api";
import { ApiClientError } from "~/lib/api-client";
import { requireToken } from "~/.server/session";
import type { Route } from "./+types/_app.gardens.$gardenSlug.members";
import type { GardenMemberRole } from "~/lib/types";

export function meta({ data }: Route.MetaArgs) {
  return [{ title: `Members — ${data?.garden.name ?? "Garden"} — harvesting.food` }];
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const token = await requireToken(request);
  const [garden, members, currentUser] = await Promise.all([
    getGarden(token, params.gardenSlug),
    listMembers(token, params.gardenSlug),
    getMe(token),
  ]);
  return { garden, members, currentUserId: currentUser.id };
}

export async function action({ request, params }: Route.ActionArgs) {
  const token = await requireToken(request);
  const form = await request.formData();
  const intent = String(form.get("intent") ?? "");

  if (intent === "invite") {
    const email = String(form.get("email") ?? "").trim();
    if (!email) return { error: "Email is required.", inviteUrl: null };
    try {
      const [me, members] = await Promise.all([
        getMe(token),
        listMembers(token, params.gardenSlug),
      ]);
      const isOwner = members.some((m) => m.user_id === me.id && m.role === "owner");
      if (!isOwner) return { error: "Only garden owners can invite members.", inviteUrl: null };
      const invitation = await inviteMember(token, params.gardenSlug, email);
      const origin = new URL(request.url).origin;
      const inviteUrl = `${origin}/invitations/${invitation.token}`;
      return { error: null, inviteUrl };
    } catch (err) {
      if (err instanceof ApiClientError) return { error: err.message, inviteUrl: null };
      return { error: "Failed to send invitation.", inviteUrl: null };
    }
  }

  if (intent === "remove") {
    const userId = String(form.get("user_id") ?? "");
    try {
      await removeMember(token, params.gardenSlug, userId);
      return { error: null, inviteUrl: null };
    } catch (err) {
      if (err instanceof ApiClientError) return { error: err.message, inviteUrl: null };
      return { error: "Failed to remove member.", inviteUrl: null };
    }
  }

  return { error: "Unknown action.", inviteUrl: null };
}

const ROLE_LABELS: Record<GardenMemberRole, string> = {
  owner: "Owner",
  member: "Member",
};

const ROLE_CLASSES: Record<GardenMemberRole, string> = {
  owner: "bg-primary-soft text-primary",
  member: "bg-surface-offset text-text-muted",
};

export default function GardenMembers() {
  const { garden, members, currentUserId } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const [copied, setCopied] = useState(false);

  const currentMember = members.find((m) => m.user_id === currentUserId);
  const isOwner = currentMember?.role === "owner";

  async function copyInviteUrl() {
    if (!actionData?.inviteUrl) return;
    await navigator.clipboard.writeText(actionData.inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-xs text-text-faint">
        <Link to="/gardens" className="hover:text-text-muted transition-colors">
          My Gardens
        </Link>
        <span>/</span>
        <Link
          to={`/gardens/${garden.slug}`}
          className="hover:text-text-muted transition-colors"
        >
          {garden.name}
        </Link>
        <span>/</span>
        <span>Members</span>
      </div>

      <h1 className="font-display text-[clamp(1.6rem,2vw+1rem,2.4rem)] leading-none mb-8">
        Garden Members
      </h1>

      {/* Error banner */}
      {actionData?.error && (
        <div className="mb-6 rounded-2xl border border-red-200/60 bg-red-50 px-4 py-3 text-sm text-orange">
          {actionData.error}
        </div>
      )}

      {/* Invite link result */}
      {actionData?.inviteUrl && (
        <div className="mb-6 rounded-3xl border border-black/10 bg-surface p-5 shadow-soft sm:p-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
            Invitation link
          </p>
          <p className="mb-3 text-sm text-text-faint">
            Share this link with the person you invited. It expires after 7 days.
          </p>
          <div className="flex items-center gap-2">
            <input
              readOnly
              value={actionData.inviteUrl}
              className="min-w-0 flex-1 rounded-xl border border-black/10 bg-bg px-3 py-2 text-sm text-text-main"
            />
            <button
              onClick={copyInviteUrl}
              className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-xs font-medium text-white transition hover:bg-primary-strong"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}

      {/* Members list */}
      <article className="rounded-3xl border border-black/10 bg-surface p-5 shadow-soft sm:p-6 mb-6">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
          {members.length} {members.length === 1 ? "Member" : "Members"}
        </p>
        <div className="space-y-3">
          {members.map((member) => {
            const name =
              member.user.first_name
                ? `${member.user.first_name}${member.user.last_name ? ` ${member.user.last_name}` : ""}`
                : null;
            const isCurrentUser = member.user_id === currentUserId;
            const canRemove = isOwner && member.role !== "owner" && !isCurrentUser;

            return (
              <div
                key={member.id}
                className="flex items-center justify-between gap-4 rounded-2xl border border-black/[0.06] bg-bg px-4 py-3"
              >
                <div className="min-w-0 flex-1">
                  {name && (
                    <p className="truncate text-sm font-medium text-text-main">
                      {name}
                      {isCurrentUser && (
                        <span className="ml-1.5 text-xs text-text-faint">(you)</span>
                      )}
                    </p>
                  )}
                  <p
                    className={`truncate text-sm ${name ? "text-text-faint" : "font-medium text-text-main"}`}
                  >
                    {member.user.email}
                    {!name && isCurrentUser && (
                      <span className="ml-1.5 text-xs text-text-faint">(you)</span>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${ROLE_CLASSES[member.role]}`}
                  >
                    {ROLE_LABELS[member.role]}
                  </span>
                  {canRemove && (
                    <Form method="post">
                      <input type="hidden" name="intent" value="remove" />
                      <input type="hidden" name="user_id" value={member.user_id} />
                      <button
                        type="submit"
                        onClick={(e) => {
                          if (
                            !confirm(
                              `Remove ${name ?? member.user.email} from this garden?`
                            )
                          ) {
                            e.preventDefault();
                          }
                        }}
                        className="inline-flex items-center rounded-full border border-red-200/60 px-2.5 py-0.5 text-xs font-medium text-orange transition hover:bg-orange-soft"
                      >
                        Remove
                      </button>
                    </Form>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </article>

      {/* Invite form — owners only */}
      {isOwner && (
        <article className="rounded-3xl border border-black/10 bg-surface p-5 shadow-soft sm:p-6">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
            Invite someone
          </p>
          <Form method="post" className="flex items-end gap-3">
            <input type="hidden" name="intent" value="invite" />
            <div className="min-w-0 flex-1 flex flex-col gap-1">
              <label htmlFor="email" className="text-sm font-medium text-text-muted">
                Email address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                placeholder="friend@example.com"
                className="rounded-xl border border-black/10 bg-bg px-3 py-2 text-sm text-text-main placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-strong"
            >
              Send invite
            </button>
          </Form>
        </article>
      )}
    </div>
  );
}
