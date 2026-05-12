import { useState } from "react";
import {
  Form,
  isRouteErrorResponse,
  Link,
  useNavigation,
  useOutletContext,
  useRouteError,
  useSearchParams,
} from "react-router";
import {
  createHarvest,
  createNote,
  createPlant,
  deleteHarvest,
  deleteNote,
  deletePlant,
  getPlantCareInfo,
  updateHarvest,
  updateNote,
  updatePlant,
} from "~/.server/api";
import { ApiClientError } from "~/lib/api-client";
import { requireToken } from "~/.server/session";
import type { Route } from "./+types/_app.gardens.$gardenSlug._index";
import type { GardenOutletContext } from "./_app.gardens.$gardenSlug";
import type { Garden, Harvest, Note, NoteType, Plant, PlantType, UnitType } from "~/lib/types";
import { PlantModal } from "~/components/plants/PlantModal";
import type { PlantModalState } from "~/components/plants/PlantModal";
import { PlantSidebar } from "~/components/plants/PlantSidebar";
import { PlantStatusBadge } from "~/components/plants/PlantStatusBadge";
import { PlantKPICard } from "~/components/plants/PlantKPICard";
import { SeasonProgressCard } from "~/components/plants/SeasonProgressCard";
import { PlantNoteTimeline } from "~/components/plants/PlantNoteTimeline";
import { NoteModal } from "~/components/plants/NoteModal";
import type { NoteModalState } from "~/components/plants/NoteModal";
import { HarvestModal } from "~/components/plants/HarvestModal";
import type { HarvestModalState } from "~/components/plants/HarvestModal";
import { Calendar, ChartNoAxesCombined, Leaf, Sprout, TrendingUp, Wheat } from "lucide-react";
import { ProgressRing } from "~/components/ProgressRing";
import { HarvestTrend } from "~/components/HarvestTrend";

const now = Date.now();

const plantTypeColors: Record<PlantType, string> = {
  herb: "#3a7a45",
  vegetable: "#4a9e4a",
  fruit: "#e05d2b",
  flower: "#d83b8c",
  shrub: "#6c9e50",
  tree: "#2d6036",
  vine: "#c08a00",
};

function growthDuration(dateStr: string): { value: string | number; label: string } {
  const days = (now - new Date(dateStr).getTime()) / 86_400_000;
  if (days >= 365) {
    return { value: (days / 365).toFixed(1), label: "Years Growing" };
  }
  return { value: Math.round(days), label: "Days Growing" };
}

function plantedFormatted(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export async function action({ request, params }: Route.ActionArgs) {
  const token = await requireToken(request);
  const form = await request.formData();
  const intent = form.get("intent");

  if (intent === "create_plant") {
    const plant_type = String(form.get("plant_type") ?? "") as PlantType;
    const species = String(form.get("species") ?? "");
    const variety = String(form.get("variety") ?? "") || undefined;
    const plot = String(form.get("plot") ?? "") || undefined;
    const planted_date = String(form.get("planted_date") ?? "") || undefined;
    if (!species || !plant_type) return { error: "Plant type and species are required." };
    try {
      const plant = await createPlant(token, params.gardenSlug, { plant_type, species, variety, plot, planted_date });
      return { ok: true, plantId: plant.id };
    } catch (err) {
      if (err instanceof ApiClientError) return { error: err.message };
      return { error: "Something went wrong. Please try again." };
    }
  }

  if (intent === "update_plant") {
    const plantId = String(form.get("plant_id") ?? "");
    const variety = String(form.get("variety") ?? "") || undefined;
    const plot = String(form.get("plot") ?? "") || undefined;
    const planted_date = String(form.get("planted_date") ?? "") || undefined;
    try {
      await updatePlant(token, params.gardenSlug, plantId, { variety, plot, planted_date });
      return { ok: true };
    } catch (err) {
      if (err instanceof ApiClientError) return { error: err.message };
      return { error: "Something went wrong. Please try again." };
    }
  }

  if (intent === "delete_plant") {
    const plantId = String(form.get("plant_id") ?? "");
    try {
      await deletePlant(token, params.gardenSlug, plantId);
      return { ok: true };
    } catch (err) {
      if (err instanceof ApiClientError) return { error: err.message };
      return { error: "Failed to delete plant." };
    }
  }

  if (intent === "create_note") {
    const plantId = String(form.get("plant_id") ?? "");
    const label = String(form.get("label") ?? "note") as NoteType;
    const note = String(form.get("note") ?? "") || undefined;
    try {
      await createNote(token, params.gardenSlug, plantId, { label, note });
      return { ok: true };
    } catch (err) {
      if (err instanceof ApiClientError) return { error: err.message };
      return { error: "Failed to create note." };
    }
  }

  if (intent === "update_note") {
    const plantId = String(form.get("plant_id") ?? "");
    const noteId = String(form.get("note_id") ?? "");
    const label = (String(form.get("label") ?? "") || undefined) as NoteType | undefined;
    const note = String(form.get("note") ?? "") || undefined;
    try {
      await updateNote(token, params.gardenSlug, plantId, noteId, { label, note });
      return { ok: true };
    } catch (err) {
      if (err instanceof ApiClientError) return { error: err.message };
      return { error: "Failed to update note." };
    }
  }

  if (intent === "delete_note") {
    const plantId = String(form.get("plant_id") ?? "");
    const noteId = String(form.get("note_id") ?? "");
    try {
      await deleteNote(token, params.gardenSlug, plantId, noteId);
      return { ok: true };
    } catch (err) {
      if (err instanceof ApiClientError) return { error: err.message };
      return { error: "Failed to delete note." };
    }
  }

  if (intent === "create_harvest") {
    const plantId = String(form.get("plant_id") ?? "");
    const amount = Number(form.get("amount"));
    const unit = String(form.get("unit") ?? "") as UnitType;
    if (!amount || !unit) return { error: "Amount and unit are required." };
    try {
      await createHarvest(token, params.gardenSlug, plantId, { amount, unit });
      return { ok: true };
    } catch (err) {
      if (err instanceof ApiClientError) return { error: err.message };
      return { error: "Failed to record harvest." };
    }
  }

  if (intent === "update_harvest") {
    const plantId = String(form.get("plant_id") ?? "");
    const harvestId = String(form.get("harvest_id") ?? "");
    const amountRaw = form.get("amount");
    const amount = amountRaw ? Number(amountRaw) : undefined;
    try {
      await updateHarvest(token, params.gardenSlug, plantId, harvestId, { amount });
      return { ok: true };
    } catch (err) {
      if (err instanceof ApiClientError) return { error: err.message };
      return { error: "Failed to update harvest." };
    }
  }

  if (intent === "delete_harvest") {
    const plantId = String(form.get("plant_id") ?? "");
    const harvestId = String(form.get("harvest_id") ?? "");
    try {
      await deleteHarvest(token, params.gardenSlug, plantId, harvestId);
      return { ok: true };
    } catch (err) {
      if (err instanceof ApiClientError) return { error: err.message };
      return { error: "Failed to delete harvest." };
    }
  }

  if (intent === "generate_care_info") {
    const plantId = String(form.get("plant_id") ?? "");
    try {
      await getPlantCareInfo(token, params.gardenSlug, plantId);
      return { ok: true };
    } catch (err) {
      if (err instanceof ApiClientError) return { error: err.message };
      return { error: "Failed to generate care information." };
    }
  }

  return null;
}

function PlantDetail({
  plant,
  onEditPlant,
}: {
  plant: Plant;
  onEditPlant: () => void;
}) {
  const navigation = useNavigation();
  const isGeneratingCare = navigation.state === "submitting";

  const notes = plant.notes ?? [];
  const careInfo = plant.care_info;
  const color = plantTypeColors[plant.plant_type];

  const careTabs = careInfo
    ? [
        { key: "summary", label: "Summary", content: careInfo.summary },
        { key: "planting", label: "Planting", content: careInfo.planting },
        { key: "care", label: "Care", content: careInfo.care },
        { key: "harvesting", label: "Harvesting", content: careInfo.harvesting },
      ].filter((t) => t.content)
    : [];

  const [activeTab, setActiveTab] = useState(() => careTabs[0]?.key ?? "summary");
  const [noteModal, setNoteModal] = useState<NoteModalState | null>(null);
  const [harvestModal, setHarvestModal] = useState<HarvestModalState | null>(null);

  const harvests = plant.harvests ?? [];
  const sortedHarvests = [...harvests].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const totalHarvested = harvests.reduce((sum, h) => sum + h.amount, 0);
  const harvestTotal = totalHarvested % 1 === 0 ? totalHarvested : parseFloat(totalHarvested.toFixed(2));

  const daysSincePlanted = plant.planted_date
    ? Math.floor((now - new Date(plant.planted_date).getTime()) / 86_400_000)
    : 0;
  const ringPercent = Math.min(100, Math.round((daysSincePlanted / 365) * 100));

  return (
    <>
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-display text-[clamp(1.8rem,2vw+1rem,2.9rem)] leading-none capitalize">
            {plant.variety} {plant.species}
          </h1>
          <p className="mt-2 text-sm text-text-muted sm:text-base">
            {plant.latin_name && (
              <><em>{plant.latin_name}</em>{" · "}</>
            )}
            {plant.plot && (
              <>Bed {plant.plot}{" · "}</>
            )}
            {plant.planted_date
              ? <>Planted {plantedFormatted(plant.planted_date)}</>
              : "No planting date"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <PlantStatusBadge type={plant.plant_type} />
          <button
            onClick={onEditPlant}
            className="inline-flex items-center rounded-full border border-black/10 bg-surface px-3 py-1 text-xs font-medium text-text-muted transition hover:bg-surface-offset hover:text-text-main"
          >
            Edit
          </button>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {plant.planted_date && (() => {
          const { value, label } = growthDuration(plant.planted_date);
          return (
            <PlantKPICard
              label={label}
              value={value}
              meta="since planting"
              Icon={Calendar}
            />
          );
        })()}
        <PlantKPICard
          label="Total Harvested"
          value={harvests.length > 0 ? harvestTotal : "—"}
          meta={
            harvests.length === 0
              ? "no harvests yet"
              : `${plant.harvest_unit} · ${harvests.length} ${harvests.length === 1 ? "harvest" : "harvests"}`
          }
          Icon={Wheat}
        />
        {plant.planted_date && (
          <SeasonProgressCard plantedDate={plant.planted_date} />
        )}
      </section>

      {/*  Harvest History and Season Progress + Harvest Trend */}
      {plant.planted_date && (
        <section className="mt-6 grid gap-6 xl:grid-cols-2">
          <article className="rounded-3xl border border-black/10 bg-surface p-5 shadow-soft sm:p-6">
            <div className="mb-5 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
              Harvest History
            </span>
              <button
                  onClick={() => setHarvestModal({ mode: "create", plantId: plant.id, harvestUnit: plant.harvest_unit ?? undefined })}
                  className="inline-flex items-center rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-white transition hover:bg-primary-strong"
              >
                + Add Harvest
              </button>
            </div>
            {sortedHarvests.length === 0 ? (
                <div className="py-10 text-center text-sm text-text-faint">
                  No harvests recorded yet
                </div>
            ) : (
                <div className="space-y-3">
                  {sortedHarvests.map((h) => (
                      <button
                          key={h.id}
                          onClick={() =>
                              setHarvestModal({ mode: "view", harvest: h, plantId: plant.id })
                          }
                          className="w-full rounded-2xl border border-black/[0.06] bg-bg px-4 py-3 text-left transition hover:bg-black/[0.03]"
                      >
                        <div className="flex items-baseline justify-between gap-2">
                    <span className="font-display text-2xl leading-none text-text-main">
                      {h.amount != null ? h.amount : "—"}
                      {h.unit && (
                          <span className="ml-1 text-base text-text-muted">{h.unit}</span>
                      )}
                    </span>
                          <span className="text-xs text-text-faint">
                      {new Date(h.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                        </div>
                      </button>
                  ))}
                </div>
            )}
          </article>

          <article className="rounded-3xl border border-black/10 bg-surface p-5 shadow-soft sm:p-6">
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span>Season Progress</span>
            </div>
            <ProgressRing percent={ringPercent} days={daysSincePlanted} color={color} />
            <div className="mt-6 border-t border-black/10 pt-5">
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
                <ChartNoAxesCombined className="h-4 w-4 text-primary" />
                <span>Harvest Trend</span>
              </div>
              <HarvestTrend plant={plant} />
            </div>
          </article>
        </section>
      )}

      {/* Garden Log */}
      <section className="mt-6">
        <article className="rounded-3xl border border-black/10 bg-surface p-5 shadow-soft sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
              Garden Log
            </span>
            <button
              onClick={() => setNoteModal({ mode: "create", plantId: plant.id })}
              className="inline-flex items-center rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-white transition hover:bg-primary-strong"
            >
              + Add a Note
            </button>
          </div>
          <PlantNoteTimeline
            notes={notes}
            color={color}
            onNoteClick={(note: Note) =>
              setNoteModal({ mode: "view", note, plantId: plant.id })
            }
          />
        </article>
      </section>

      {/* Care Info */}
      <section className="mt-6">
        {careInfo && careTabs.length > 0 ? (
          <article className="rounded-3xl border border-black/10 bg-surface p-5 shadow-soft sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
                Care Information
                {careInfo.latin_name && (
                  <em className="ml-2 not-italic italic text-text-faint">
                    {careInfo.latin_name}
                  </em>
                )}
              </div>
              <Form method="post">
                <input type="hidden" name="intent" value="generate_care_info" />
                <input type="hidden" name="plant_id" value={plant.id} />
                <span className="group relative">
                  <button
                    type="submit"
                    disabled={isGeneratingCare}
                    className="inline-flex items-center rounded-full border border-black/10 bg-surface px-3 py-1 text-xs font-medium text-text-muted transition hover:bg-surface-offset hover:text-text-main disabled:pointer-events-none disabled:opacity-50"
                  >
                    {isGeneratingCare ? "Regenerating…" : "Regenerate"}
                  </button>
                  <span className="pointer-events-none absolute bottom-full right-0 mb-1.5 w-max max-w-[180px] rounded-lg bg-gray-900 px-2.5 py-1.5 text-center text-[11px] leading-snug text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                    {isGeneratingCare
                      ? "Regenerating care info…"
                      : "Regenerate AI-powered care info"}
                  </span>
                </span>
              </Form>
            </div>
            <div className="flex gap-1 border-b border-black/10 pb-0">
              {careTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={[
                    "px-3 py-2 text-xs font-semibold transition",
                    activeTab === tab.key
                      ? "border-b-2 border-primary text-primary"
                      : "text-text-muted hover:text-text-main",
                  ].join(" ")}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm leading-7 text-text-main whitespace-pre-line">
              {careTabs.find((t) => t.key === activeTab)?.content}
            </p>
          </article>
        ) : (
          <article className="rounded-3xl border border-black/10 bg-surface p-5 shadow-soft sm:p-6">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
              Care Information
            </div>
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <p className="text-sm text-text-faint">No care information generated yet.</p>
              <Form method="post">
                <input type="hidden" name="intent" value="generate_care_info" />
                <input type="hidden" name="plant_id" value={plant.id} />
                <span className="group relative">
                  <button
                    type="submit"
                    disabled={isGeneratingCare}
                    className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-strong disabled:pointer-events-none disabled:opacity-50"
                  >
                    {isGeneratingCare ? "Generating…" : "Generate care info"}
                  </button>
                  <span className="pointer-events-none absolute bottom-full left-1/2 mb-3 w-max max-w-[300px] -translate-x-1/2 rounded-lg border-green-200 bg-green-50 px-2.5 py-1.5 text-center text-[14px] leading-snug text-green-700 opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                    {isGeneratingCare
                      ? "Generating care info…"
                      : "Generate AI-powered care information based on your plant species and variety, and your garden's location."}
                  </span>
                </span>
              </Form>
            </div>
          </article>
        )}
        <div className="rounded-md border border-divider bg-primary-soft mt-5 px-4 py-3">
          <p className="text-xs font-semibold text-text-main">AI-Generated Content Disclaimer</p>
          <p className="mt-1 text-xs">
            This content was generated with the assistance of artificial intelligence. While AI
            tools can be helpful, they may produce inaccurate, incomplete, or outdated
            information. Please review and verify any important details before relying on this
            content.
          </p>
        </div>
      </section>

      <NoteModal
        state={noteModal}
        onClose={() => setNoteModal(null)}
        onEdit={(note: Note, plantId: string) =>
          setNoteModal({ mode: "edit", note, plantId })
        }
      />
      <HarvestModal
        state={harvestModal}
        onClose={() => setHarvestModal(null)}
        onEdit={(harvest: Harvest, plantId: string) =>
          setHarvestModal({ mode: "edit", harvest, plantId })
        }
      />
    </>
  );
}

function GardenDashboardView({
  garden,
  plants,
  onAddPlant,
}: {
  garden: Garden;
  plants: Plant[];
  onAddPlant: () => void;
}) {
  const ageMs = now - new Date(garden.created_at).getTime();
  const ageYears = ageMs / (365.25 * 86_400_000);
  const ageDisplay =
    ageYears >= 1
      ? `${Math.floor(ageYears)} yr${Math.floor(ageYears) !== 1 ? "s" : ""}`
      : `${Math.max(1, Math.round(ageYears * 12))} mo`;

  const byType = plants.reduce<Partial<Record<PlantType, number>>>((acc, p) => {
    acc[p.plant_type] = (acc[p.plant_type] ?? 0) + 1;
    return acc;
  }, {});
  const typeEntries = (Object.entries(byType) as [PlantType, number][]).sort(
    (a, b) => b[1] - a[1]
  );

  const lastAdded = plants.reduce<Plant | null>(
    (latest, p) =>
      !latest || new Date(p.created_at) > new Date(latest.created_at) ? p : latest,
    null
  );

  return (
    <>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <PlantKPICard
          label="Garden Age"
          value={ageDisplay}
          meta="since the garden was created"
          Icon={Calendar}
        />
        <PlantKPICard
          label="Total Plants"
          value={plants.length}
          meta={
            typeEntries.length === 0
              ? "no plants yet"
              : `across ${typeEntries.length} type${typeEntries.length !== 1 ? "s" : ""}`
          }
          Icon={Sprout}
        />
        {lastAdded && (
          <PlantKPICard
            label="Last Plant Added"
            value={lastAdded.species}
            meta={new Date(lastAdded.created_at).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
            Icon={Leaf}
          />
        )}
      </section>

      {typeEntries.length > 0 && (
        <section className="mt-6">
          <article className="rounded-3xl border border-black/10 bg-surface p-5 shadow-soft sm:p-6">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
              Plants by Type
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
              {typeEntries.map(([type, count]) => (
                <div
                  key={type}
                  className="flex items-center gap-2.5 rounded-2xl border border-black/[0.06] bg-bg px-4 py-3"
                >
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: plantTypeColors[type] }}
                  />
                  <div>
                    <p className="text-sm font-medium capitalize text-text-main">{type}</p>
                    <p className="text-xs text-text-faint">
                      {count} plant{count !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>
      )}

      <div className="mt-8">
        <button
          onClick={onAddPlant}
          className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary-strong"
        >
          + Add a plant
        </button>
      </div>
    </>
  );
}

export default function GardenDashboard() {
  const { garden, plants } = useOutletContext<GardenOutletContext>();
  const [searchParams] = useSearchParams();

  const [selectedId, setSelectedId] = useState<string | null>(() => {
    const paramId = searchParams.get("plant");
    if (paramId && plants.some((p) => p.id === paramId)) return paramId;
    return null;
  });

  const [plantModal, setPlantModal] = useState<PlantModalState | null>(null);

  // If the selected plant was deleted fall back to the dashboard (null).
  const effectiveSelectedId =
    selectedId !== null && plants.some((p) => p.id === selectedId) ? selectedId : null;
  const selectedPlant = plants.find((p) => p.id === effectiveSelectedId) ?? null;

  return (
    <div className="flex">
      <PlantSidebar
        plants={plants}
        gardenName={garden.name}
        selectedId={effectiveSelectedId}
        showDashboard={effectiveSelectedId === null}
        onSelect={setSelectedId}
        onAddPlant={() => setPlantModal({ mode: "create" })}
        onShowDashboard={() => setSelectedId(null)}
      />

      <div className="min-w-0 flex-1">
        {/* Mobile: horizontal tab bar */}
        <div className="border-b border-black/10 px-4 py-3 lg:hidden">
          <div className="flex gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedId(null)}
              className={[
                "whitespace-nowrap rounded-full border px-3 py-1.5 text-sm transition",
                effectiveSelectedId === null
                  ? "border-transparent bg-primary-soft text-primary"
                  : "border-black/10 bg-surface text-text-muted",
              ].join(" ")}
            >
              Dashboard
            </button>
            {plants.map((plant) => (
              <button
                key={plant.id}
                onClick={() => setSelectedId(plant.id)}
                className={[
                  "whitespace-nowrap rounded-full border px-3 py-1.5 text-sm transition",
                  effectiveSelectedId === plant.id
                    ? "border-transparent bg-primary-soft text-primary"
                    : "border-black/10 bg-surface text-text-muted",
                ].join(" ")}
              >
                {plant.species}
              </button>
            ))}
          </div>
        </div>

        <main className="w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Garden header with actions */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-text-faint">
                <Link to="/gardens" className="hover:text-text-muted transition-colors">
                  My Gardens
                </Link>
                <span>/</span>
                <span>{garden.name}</span>
              </div>
              {garden.location && (
                <p className="mt-0.5 text-sm text-text-muted">{garden.location}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Link
                to={`/gardens/${garden.slug}/members`}
                className="inline-flex items-center rounded-full border border-black/10 bg-surface px-3 py-1.5 text-xs font-medium text-text-muted transition hover:bg-surface-offset hover:text-text-main"
              >
                Members
              </Link>
              <Link
                to={`/gardens/${garden.slug}/edit`}
                className="inline-flex items-center rounded-full border border-black/10 bg-surface px-3 py-1.5 text-xs font-medium text-text-muted transition hover:bg-surface-offset hover:text-text-main"
              >
                Edit garden
              </Link>
            </div>
          </div>

          {selectedPlant ? (
            <PlantDetail
              plant={selectedPlant}
              onEditPlant={() => setPlantModal({ mode: "edit", plant: selectedPlant })}
            />
          ) : (
            <GardenDashboardView
              garden={garden}
              plants={plants}
              onAddPlant={() => setPlantModal({ mode: "create" })}
            />
          )}
        </main>
      </div>

      <PlantModal
        state={plantModal}
        onClose={() => setPlantModal(null)}
        onCreated={(plantId) => setSelectedId(plantId)}
      />
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const is404 = isRouteErrorResponse(error) && error.status === 404;

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8">
      <p className="text-4xl font-bold text-primary">{is404 ? "404" : "Error"}</p>
      <p className="mt-3 text-text-muted">
        {is404 ? "Garden not found." : "Failed to load garden."}
      </p>
    </div>
  );
}
