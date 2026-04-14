import { useEffect, useRef } from "react";
import { useFetcher } from "react-router";
import type { Plant, PlantType } from "~/lib/types";

export type PlantModalState =
  | { mode: "create" }
  | { mode: "edit"; plant: Plant };

interface PlantModalProps {
  state: PlantModalState | null;
  onClose: () => void;
  onCreated?: (plantId: string) => void;
}

const PLANT_TYPES: { value: PlantType; label: string }[] = [
  { value: "herb", label: "Herb" },
  { value: "vegetable", label: "Vegetable" },
  { value: "fruit", label: "Fruit" },
  { value: "flower", label: "Flower" },
  { value: "shrub", label: "Shrub" },
  { value: "tree", label: "Tree" },
  { value: "vine", label: "Vine" },
];

export function PlantModal({ state, onClose, onCreated }: PlantModalProps) {
  const fetcher = useFetcher();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const didSubmitRef = useRef(false);

  useEffect(() => {
    if (state) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [state]);

  useEffect(() => {
    if (fetcher.state === "submitting") {
      didSubmitRef.current = true;
    }
  }, [fetcher.state]);

  useEffect(() => {
    if (
      didSubmitRef.current &&
      fetcher.state === "idle" &&
      fetcher.data != null &&
      !("error" in fetcher.data)
    ) {
      didSubmitRef.current = false;
      if (state?.mode === "create" && fetcher.data && "plantId" in (fetcher.data as object)) {
        onCreated?.((fetcher.data as { plantId: string }).plantId);
      }
      onClose();
    }
  }, [fetcher.state, fetcher.data, onClose, onCreated, state?.mode]);

  const plant = state?.mode === "edit" ? state.plant : null;

  return (
    <dialog
      ref={dialogRef}
      className="m-auto w-full max-w-md rounded-3xl border border-black/10 bg-surface p-6 shadow-lg backdrop:bg-black/40 open:flex open:flex-col"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      {state && (
        <>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-text-main">
              {state.mode === "create" ? "Add Plant" : "Edit Plant"}
            </h2>
            <button
              onClick={onClose}
              className="text-xl leading-none text-text-faint transition hover:text-text-main"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <fetcher.Form method="post" className="flex flex-col gap-4">
            <input
              type="hidden"
              name="intent"
              value={state.mode === "create" ? "create_plant" : "update_plant"}
            />
            {state.mode === "edit" && (
              <input type="hidden" name="plant_id" value={plant!.id} />
            )}

            <div>
              <label className="mb-1.5 block text-xs font-medium text-text-muted">
                Type{state.mode === "create" && <span className="ml-0.5 text-orange">*</span>}
              </label>
              {state.mode === "create" ? (
                <select
                  name="plant_type"
                  defaultValue="vegetable"
                  required
                  className="w-full rounded-xl border border-black/10 bg-surface px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  {PLANT_TYPES.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="flex items-center rounded-xl border border-black/10 bg-black/[0.03] px-3 py-2 text-sm capitalize text-text-muted">
                  {plant!.plant_type}
                  <span className="ml-auto text-[11px] text-text-faint">locked</span>
                </div>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-text-muted">
                Species{state.mode === "create" && <span className="ml-0.5 text-orange">*</span>}
              </label>
              {state.mode === "create" ? (
                <input
                  type="text"
                  name="species"
                  required
                  placeholder="e.g. Basil, Tomato, Lavender"
                  className="w-full rounded-xl border border-black/10 bg-surface px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              ) : (
                <div className="flex items-center rounded-xl border border-black/10 bg-black/[0.03] px-3 py-2 text-sm text-text-muted">
                  {plant!.species}
                  <span className="ml-auto text-[11px] text-text-faint">locked</span>
                </div>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-text-muted">
                Variety
              </label>
              <input
                type="text"
                name="variety"
                defaultValue={plant?.variety ?? ""}
                placeholder="e.g. Sweet Genovese, Cherry, English"
                className="w-full rounded-xl border border-black/10 bg-surface px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-text-muted">
                Planted date
              </label>
              <input
                type="date"
                name="planted_date"
                defaultValue={plant?.planted_date ? plant.planted_date.slice(0, 10) : ""}
                className="w-full rounded-xl border border-black/10 bg-surface px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            {fetcher.data && "error" in fetcher.data && (
              <p className="text-xs text-orange">{String(fetcher.data.error)}</p>
            )}

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center rounded-full border border-black/10 bg-surface px-4 py-2 text-xs font-medium text-text-muted transition hover:bg-surface-offset"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={fetcher.state !== "idle"}
                className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-xs font-medium text-white transition hover:bg-primary-strong disabled:opacity-60"
              >
                {fetcher.state !== "idle"
                  ? "Saving…"
                  : state.mode === "create"
                    ? "Add Plant"
                    : "Save Changes"}
              </button>
            </div>
          </fetcher.Form>

          {state.mode === "edit" && (
            <div className="mt-4 border-t border-black/10 pt-4">
              <fetcher.Form method="post">
                <input type="hidden" name="intent" value="delete_plant" />
                <input type="hidden" name="plant_id" value={plant!.id} />
                <button
                  type="submit"
                  className="inline-flex items-center rounded-full border border-red-200/60 bg-surface px-3 py-1.5 text-xs font-medium text-orange transition hover:bg-orange-soft"
                  onClick={(e) => {
                    if (!confirm(`Delete ${plant!.species}? This cannot be undone.`)) {
                      e.preventDefault();
                    }
                  }}
                >
                  Delete plant
                </button>
              </fetcher.Form>
            </div>
          )}
        </>
      )}
    </dialog>
  );
}
