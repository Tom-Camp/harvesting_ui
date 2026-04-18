import { useEffect, useRef, useState } from "react";
import { useFetcher } from "react-router";
import type { Harvest, UnitType } from "~/lib/types";

export type HarvestModalState =
  | { mode: "create"; plantId: string; harvestUnit?: UnitType }
  | { mode: "view"; harvest: Harvest; plantId: string }
  | { mode: "edit"; harvest: Harvest; plantId: string };

interface HarvestModalProps {
  state: HarvestModalState | null;
  onClose: () => void;
  onEdit: (harvest: Harvest, plantId: string) => void;
}

const UNITS: UnitType[] = ["items", "g", "kg", "oz", "lbs", "bunches", "bags", "jars"];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function HarvestModal({ state, onClose, onEdit }: HarvestModalProps) {
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
      onClose();
    }
  }, [fetcher.state, fetcher.data, onClose]);

  const harvest = state && state.mode !== "create" ? state.harvest : null;
  const plantId = state?.plantId ?? "";
  const isForm = state?.mode === "create" || state?.mode === "edit";
  const harvestUnit = state?.mode === "create" ? state.harvestUnit : undefined;
  // Unit is locked when the plant already has a harvest_unit (create) or when editing (unit lives on plant)
  const lockedUnit: UnitType | undefined = harvestUnit ?? (state?.mode === "edit" ? harvest?.unit : undefined);
  const defaultUnit = lockedUnit ?? "items";
  const [selectedUnit, setSelectedUnit] = useState(defaultUnit);

  useEffect(() => {
    setSelectedUnit(lockedUnit ?? "items");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.mode, harvest?.id]);

  return (
    <dialog
      ref={dialogRef}
      className="m-auto w-full max-w-md rounded-3xl border border-black/10 bg-surface p-6 shadow-lg backdrop:bg-black/40 open:flex open:flex-col"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      {state?.mode === "view" && harvest && (
        <>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-text-main">Harvest</h2>
            <button
              onClick={onClose}
              className="text-xl leading-none text-text-faint transition hover:text-text-main"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <div className="mb-4">
            <div className="font-display text-4xl leading-none text-text-main">
              {harvest.amount}
              <span className="ml-1.5 text-xl text-text-muted">{harvest.unit}</span>
            </div>
            <div className="mt-1 text-xs text-text-faint">
              {formatDate(harvest.created_at)}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => onEdit(harvest, plantId)}
              className="inline-flex items-center rounded-full border border-black/10 bg-surface px-3 py-1.5 text-xs font-medium text-text-muted transition hover:bg-surface-offset hover:text-text-main"
            >
              Edit
            </button>
            <fetcher.Form method="post">
              <input type="hidden" name="intent" value="delete_harvest" />
              <input type="hidden" name="plant_id" value={plantId} />
              <input type="hidden" name="harvest_id" value={harvest.id} />
              <button
                type="submit"
                className="inline-flex items-center rounded-full border border-red-200/60 bg-surface px-3 py-1.5 text-xs font-medium text-orange transition hover:bg-orange-soft"
                onClick={(e) => {
                  if (!confirm("Delete this harvest record? This cannot be undone.")) {
                    e.preventDefault();
                  }
                }}
              >
                Delete
              </button>
            </fetcher.Form>
          </div>
        </>
      )}

      {isForm && (
        <>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-text-main">
              {state?.mode === "create" ? "Record a Harvest" : "Edit Harvest"}
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
              value={state?.mode === "create" ? "create_harvest" : "update_harvest"}
            />
            <input type="hidden" name="plant_id" value={plantId} />
            {state?.mode === "edit" && harvest && (
              <input type="hidden" name="harvest_id" value={harvest.id} />
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-text-muted">
                  Amount <span className="text-orange">*</span>
                </label>
                <input
                  type="number"
                  name="amount"
                  min="0"
                  step="any"
                  required
                  defaultValue={harvest?.amount ?? ""}
                  placeholder="0"
                  className="w-full rounded-xl border border-black/10 bg-surface px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-text-muted">
                  Unit
                </label>
                {lockedUnit ? (
                  <>
                    <input type="hidden" name="unit" value={lockedUnit} />
                    <div className="flex items-center rounded-xl border border-black/10 bg-black/[0.03] px-3 py-2 text-sm text-text-muted">
                      {lockedUnit}
                      <span className="ml-auto text-[11px] text-text-faint">locked</span>
                    </div>
                    <p className="mt-1.5 text-xs text-text-faint">
                      Unit is fixed for this plant.
                    </p>
                  </>
                ) : (
                  <select
                    name="unit"
                    value={selectedUnit}
                    onChange={(e) => setSelectedUnit(e.target.value as UnitType)}
                    className="w-full rounded-xl border border-black/10 bg-surface px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    {UNITS.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                )}
              </div>
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
                  : state?.mode === "create"
                    ? "Record Harvest"
                    : "Save Changes"}
              </button>
            </div>
          </fetcher.Form>
        </>
      )}
    </dialog>
  );
}
