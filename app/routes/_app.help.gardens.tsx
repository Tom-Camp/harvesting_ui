import { HelpArticle } from "~/components/help/HelpArticle";

export function meta() {
  return [{ title: "Gardens & Members — Help — harvesting.food" }];
}

export default function HelpGardens() {
  return (
    <HelpArticle
      title="Gardens & Members"
      intro="A garden is the top-level space for a growing area — a backyard plot, a raised bed, an allotment. Everything else (plants, notes, harvests) lives inside a garden."
    >
      <h2>Creating a garden</h2>
      <p>
        From <strong>My Gardens</strong>, click <strong>+ New garden</strong> and fill in a
        name, location, and an optional description. The location is used to personalise{" "}
        AI care tips for the plants you add later.
      </p>

      <h2>The garden dashboard</h2>
      <p>
        Opening a garden shows a dashboard with two summary cards — <strong>Garden Age</strong>{" "}
        (time since the garden was created) and <strong>Total Plants</strong> — followed by a{" "}
        <strong>Plants by Type</strong> breakdown. Click a type to filter the plant list down
        to just that type; click it again to clear the filter.
      </p>
      <p>
        The dashboard also includes a <strong>Garden Notes</strong> timeline for
        whole-garden journal entries that aren&apos;t tied to a single plant — see{" "}
        <strong>Notes</strong> for details.
      </p>

      <h2>Editing a garden</h2>
      <p>
        Use the <strong>Edit</strong> action on the garden page to update its name, location,
        or description at any time.
      </p>

      <h2>Members & invitations</h2>
      <p>
        Open a garden&apos;s <strong>Members</strong> page to see everyone with access and
        their role. Enter an email address and send an invite to give someone else access to
        the garden. Invited members receive a link that lets them accept once they&apos;re
        signed in. You can remove a member from the same page at any time.
      </p>
    </HelpArticle>
  );
}
