import { HelpArticle } from "~/components/help/HelpArticle";

export function meta() {
  return [{ title: "Notes — Help — harvesting.food" }];
}

export default function HelpNotes() {
  return (
    <HelpArticle
      title="Notes"
      intro="Notes are journal entries with a type, an optional message, and a date. They show up as a timeline, newest first."
    >
      <h2>Garden notes vs. plant notes</h2>
      <p>
        <strong>Garden notes</strong> live on the garden dashboard and are for observations
        about the garden as a whole. <strong>Plant notes</strong> live on an individual
        plant&apos;s page and are for anything specific to that plant. Both work the same
        way — pick whichever fits what you&apos;re logging.
      </p>

      <h2>Note types</h2>
      <ul>
        <li><strong>Note</strong> — a general observation.</li>
        <li><strong>Action</strong> — something you did, like watering or pruning.</li>
        <li><strong>Pest</strong> — pest or disease sightings and treatment.</li>
        <li><strong>Harvest</strong> — a harvest-related callout (separate from logging an actual harvest amount).</li>
        <li><strong>Milestone</strong> — a notable stage, like first bloom or transplanting.</li>
      </ul>

      <h2>Adding, editing, and deleting</h2>
      <p>
        Click <strong>+ Add a note</strong>, choose a type, and write your message. Click any
        existing note in the timeline to view it, then use <strong>Edit</strong> to change its
        type, message, or date, or <strong>Delete</strong> to remove it permanently.
      </p>
      <p>
        For garden notes, you can also edit the <strong>date</strong>, which changes where
        the note sits in the timeline — useful if you&apos;re logging something after the
        fact and want it to appear on the day it actually happened.
      </p>
    </HelpArticle>
  );
}
