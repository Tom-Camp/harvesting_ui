import { useMemo, useState } from "react";
import {
  Form,
  isRouteErrorResponse,
  Link,
  redirect,
  useOutletContext,
  useRouteError,
} from "react-router";
import { createNote, deleteGarden, deleteNote, updateNote } from "~/.server/api";
import { ApiClientError } from "~/lib/api-client";
import { requireToken } from "~/.server/session";
import type { Route } from "./+types/_app.gardens.$gardenSlug._index";
import type { GardenOutletContext } from "./_app.gardens.$gardenSlug";
import type { Note, NoteType, Plant, PlantType } from "~/lib/types";
import { PlantSidebar } from "~/components/plants/PlantSidebar";
import { PlantStatusBadge } from "~/components/plants/PlantStatusBadge";
import { PlantKPICard } from "~/components/plants/PlantKPICard";
import { PlantNoteTimeline } from "~/components/plants/PlantNoteTimeline";
import { NoteModal } from "~/components/plants/NoteModal";
import type { NoteModalState } from "~/components/plants/NoteModal";
import { Calendar, NotebookPen, Sprout } from "lucide-react";

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
  const days = (Date.now() - new Date(dateStr).getTime()) / 86_400_000;
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

  if (intent === "delete") {
    try {
      await deleteGarden(token, params.gardenSlug);
      return redirect("/gardens");
    } catch (err) {
      if (err instanceof ApiClientError) return { error: err.message };
      return { error: "Failed to delete garden." };
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

  return null;
}

function PlantDetail({ plant, gardenSlug }: { plant: Plant; gardenSlug: string }) {
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
            {plant.planted_date
              ? <>Planted {plantedFormatted(plant.planted_date)}</>
              : "No planting date"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <PlantStatusBadge type={plant.plant_type} />
          <Link
            to={`/gardens/${gardenSlug}/plants/${plant.id}/edit`}
            className="inline-flex items-center rounded-full border border-black/10 bg-surface px-3 py-1 text-xs font-medium text-text-muted transition hover:bg-surface-offset hover:text-text-main"
          >
            Edit
          </Link>
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
          label="Notes"
          value={notes.length}
          meta={notes.length === 1 ? "note" : "total notes"}
          Icon={NotebookPen}
        />
        <PlantKPICard
          label="Care Info"
          value={careInfo ? "Yes" : "—"}
          meta={careInfo ? "available" : "not generated"}
          Icon={Sprout}
        />
      </section>

      <section className="mt-6 gap-6">
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

      <NoteModal
        state={noteModal}
        onClose={() => setNoteModal(null)}
        onEdit={(note: Note, plantId: string) =>
          setNoteModal({ mode: "edit", note, plantId })
        }
      />

      <section className="mt-6 gap-6">
        {careInfo && careTabs.length > 0 ? (
          <article className="rounded-3xl border border-black/10 bg-surface p-5 shadow-soft sm:p-6">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
              Care Information
              {careInfo.latin_name && (
                <em className="ml-2 not-italic italic text-text-faint">
                  {careInfo.latin_name}
                </em>
              )}
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
              <Link
                to={`/gardens/${gardenSlug}/plants/${plant.id}`}
                className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-strong"
              >
                Generate care info →
              </Link>
            </div>
          </article>
        )}
      </section>
    </>
  );
}

function EmptyPlantState({ gardenSlug }: { gardenSlug: string }) {
  return (
    <div className="flex flex-col items-center gap-4 py-24 text-center">
      <p className="text-text-faint">No plants in this garden yet.</p>
      <Link
        to={`/gardens/${gardenSlug}/plants/new`}
        className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-strong"
      >
        Add your first plant →
      </Link>
    </div>
  );
}

export default function GardenDashboard() {
  const { garden, plants } = useOutletContext<GardenOutletContext>();

  const [selectedId, setSelectedId] = useState<string | null>(
    () => plants[0]?.id ?? null
  );

  const selectedPlant = useMemo(
    () => plants.find((p) => p.id === selectedId) ?? null,
    [plants, selectedId]
  );

  return (
    <div className="flex">
      <PlantSidebar
        plants={plants}
        gardenSlug={garden.slug}
        gardenName={garden.name}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />

      <div className="min-w-0 flex-1">
        {/* Mobile: horizontal tab bar */}
        {plants.length > 0 && (
          <div className="border-b border-black/10 px-4 py-3 lg:hidden">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {plants.map((plant) => (
                <button
                  key={plant.id}
                  onClick={() => setSelectedId(plant.id)}
                  className={[
                    "whitespace-nowrap rounded-full border px-3 py-1.5 text-sm transition",
                    selectedId === plant.id
                      ? "border-transparent bg-primary-soft text-primary"
                      : "border-black/10 bg-surface text-text-muted",
                  ].join(" ")}
                >
                  {plant.species}
                </button>
              ))}
            </div>
          </div>
        )}

        <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
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
                to={`/gardens/${garden.slug}/edit`}
                className="inline-flex items-center rounded-full border border-black/10 bg-surface px-3 py-1.5 text-xs font-medium text-text-muted transition hover:bg-surface-offset hover:text-text-main"
              >
                Edit garden
              </Link>
              <Form method="post">
                <input type="hidden" name="intent" value="delete" />
                <button
                  type="submit"
                  className="inline-flex items-center rounded-full border border-red-200/60 bg-surface px-3 py-1.5 text-xs font-medium text-orange transition hover:bg-orange-soft"
                  onClick={(e) => {
                    if (!confirm(`Delete "${garden.name}"? This cannot be undone.`)) {
                      e.preventDefault();
                    }
                  }}
                >
                  Delete
                </button>
              </Form>
            </div>
          </div>

          {selectedPlant ? (
            <PlantDetail plant={selectedPlant} gardenSlug={garden.slug} />
          ) : (
            <EmptyPlantState gardenSlug={garden.slug} />
          )}
        </main>
      </div>
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
