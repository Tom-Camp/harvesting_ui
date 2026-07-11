import { HelpArticle } from "~/components/help/HelpArticle";

export function meta() {
  return [{ title: "AI Care Tips — Help — harvesting.food" }];
}

export default function HelpAiTips() {
  return (
    <HelpArticle
      title="AI Care Tips"
      intro="Generate planting, care, and harvesting guidance for a plant, personalised to your garden's location."
    >
      <h2>Generating tips</h2>
      <p>
        On a plant page, click <strong>Generate care info</strong>. This sends the plant&apos;s
        species and your garden&apos;s location to produce guidance tailored to your climate.
      </p>

      <h2>What you get</h2>
      <ul>
        <li><strong>Summary</strong> — a quick overview of the plant.</li>
        <li><strong>Planting</strong> — how and when to plant it.</li>
        <li><strong>Care</strong> — watering, sunlight, and general upkeep.</li>
        <li><strong>Harvesting</strong> — when and how to harvest.</li>
      </ul>
      <p>Each section appears as its own tab once generated.</p>

      <h2>Regenerating</h2>
      <p>
        You can generate care info again at any time — for example after updating a plant&apos;s
        details — and it will replace the previous guidance.
      </p>
    </HelpArticle>
  );
}
