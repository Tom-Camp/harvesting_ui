import { HelpArticle } from "~/components/help/HelpArticle";

export function meta() {
  return [{ title: "Account & Settings — Help — harvesting.food" }];
}

export default function HelpAccount() {
  return (
    <HelpArticle title="Account & Settings">
      <h2>Profile</h2>
      <p>
        Open <strong>Settings</strong> from the account menu to update your username, first
        name, or last name.
      </p>

      <h2>Invitations</h2>
      <p>
        Registration is invite-only. If someone invites you to a garden, you&apos;ll receive
        a link — sign in (or create an account) and click <strong>Accept</strong> to get
        access to that garden.
      </p>

      <h2>Feedback</h2>
      <p>
        Use the <strong>Feedback</strong> link in the navigation bar to report a bug or
        suggest an enhancement at any time.
      </p>

      <h2>Signing out</h2>
      <p>
        Click <strong>Sign out</strong> in the navigation bar to end your session.
      </p>
    </HelpArticle>
  );
}
