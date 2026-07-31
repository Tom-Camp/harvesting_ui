import { HelpArticle } from "~/components/help/HelpArticle";

export function meta() {
  return [{ title: "Harvests — Help — harvesting.food" }];
}

export default function HelpHarvests() {
  return (
    <HelpArticle
      title="Harvests"
      intro="Harvests track how much you've picked from a plant over time, in whatever unit makes sense for it."
    >
      <h2>Logging a harvest</h2>
      <p>
        On a plant page, click <strong>+ Log harvest</strong>, enter an amount, and choose a
        unit — items, g, kg, oz, lbs, bunches, bags, or jars. You can log as many harvests as
        you like over a plant&apos;s lifetime.
      </p>

      <h2>Harvest trend</h2>
      <p>
        Once a plant has two or more harvests logged, a bar chart appears showing the amount
        harvested over time, so you can see how a plant&apos;s yield changes across the
        season.
      </p>

      <h2>Editing or removing a harvest</h2>
      <p>
        Open a logged harvest to correct its amount, or delete it if it was logged in error.
      </p>
    </HelpArticle>
  );
}
