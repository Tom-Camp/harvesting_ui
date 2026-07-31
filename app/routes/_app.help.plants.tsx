import { HelpArticle } from "~/components/help/HelpArticle";

export function meta() {
  return [{ title: "Plants — Help — harvesting.food" }];
}

export default function HelpPlants() {
  return (
    <HelpArticle
      title="Plants"
      intro="Plants are what you're actually growing inside a garden — each one gets its own page for notes, harvests, and AI care tips."
    >
      <h2>Adding a plant</h2>
      <p>
        From a garden page, click <strong>+ Add plant</strong> and choose a plant type
        (herb, vegetable, fruit, flower, shrub, tree, or vine), then enter the species. You
        can optionally add a variety, a plot or bed location, and the date it was planted.
      </p>

      <h2>The plant page</h2>
      <p>
        Each plant has its own page showing a status badge, a season progress ring based on
        how long it&apos;s been in the ground, and a growth duration summary. If a planted
        date is set, a season progress card tracks how far along the plant is relative to a
        typical year.
      </p>
      <p>
        From the plant page you can also log <strong>notes</strong> and{" "}
        <strong>harvests</strong>, and generate <strong>AI care tips</strong>.
      </p>

      <h2>Editing or removing a plant</h2>
      <p>
        Use the <strong>Edit</strong> action on a plant to update its variety, plot, planted
        date, or harvest unit. Deleting a plant also removes its notes, harvests, and care
        tips, so it&apos;s worth double-checking before you confirm.
      </p>
    </HelpArticle>
  );
}
