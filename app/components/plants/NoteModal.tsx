import { useEffect, useRef } from "react";
import { useFetcher } from "react-router";
import type { Note, NoteType } from "~/lib/types";

export type NoteModalState =
  | { mode: "create"; plantId: string }
  | { mode: "view"; note: Note; plantId: string }
  | { mode: "edit"; note: Note; plantId: string };

interface NoteModalProps {
  state: NoteModalState | null;
  onClose: () => void;
  onEdit: (note: Note, plantId: string) => void;
}

const NOTE_TYPES: NoteType[] = ["note", "action", "pest", "harvest", "milestone"];

const NOTE_TYPE_LABELS: Record<NoteType, string> = {
  note: "Note",
  action: "Action",
  pest: "Pest",
  harvest: "Harvest",
  milestone: "Milestone",
};

const tagClasses: Record<NoteType, string> = {
  note: "bg-blue-soft text-blue",
  action: "bg-primary-soft text-primary",
  pest: "bg-orange-soft text-orange",
  harvest: "bg-gold-soft text-gold",
  milestone: "bg-success-soft text-success",
};

export function NoteModal({ state, onClose, onEdit }: NoteModalProps) {
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

  // Track when a submission starts
  useEffect(() => {
    if (fetcher.state === "submitting") {
      didSubmitRef.current = true;
    }
  }, [fetcher.state]);

  // Close only after an actual submission completes successfully
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

  const note = state && state.mode !== "create" ? state.note : null;
  const plantId = state?.plantId ?? "";
  const isForm = state?.mode === "create" || state?.mode === "edit";

  return (
    <dialog
      ref={dialogRef}
      className="m-auto w-full max-w-md rounded-3xl border border-black/10 bg-surface p-6 shadow-lg backdrop:bg-black/40 open:flex open:flex-col"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      {state?.mode === "view" && note && (
        <>
          <div className="mb-4 flex items-center justify-between">
            <span
              className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.04em] ${tagClasses[note.label]}`}
            >
              {NOTE_TYPE_LABELS[note.label]}
            </span>
            <button
              onClick={onClose}
              className="text-xl leading-none text-text-faint transition hover:text-text-main"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <p className="mb-6 min-h-[3rem] text-sm leading-6 text-text-main whitespace-pre-wrap">
            {note.note ?? (
              <span className="italic text-text-faint">Empty note</span>
            )}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-faint">
              {new Date(note.created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(note, plantId)}
                className="inline-flex items-center rounded-full border border-black/10 bg-surface px-3 py-1.5 text-xs font-medium text-text-muted transition hover:bg-surface-offset hover:text-text-main"
              >
                Edit
              </button>
              <fetcher.Form method="post">
                <input type="hidden" name="intent" value="delete_note" />
                <input type="hidden" name="plant_id" value={plantId} />
                <input type="hidden" name="note_id" value={note.id} />
                <button
                  type="submit"
                  className="inline-flex items-center rounded-full border border-red-200/60 bg-surface px-3 py-1.5 text-xs font-medium text-orange transition hover:bg-orange-soft"
                  onClick={(e) => {
                    if (!confirm("Delete this note? This cannot be undone.")) {
                      e.preventDefault();
                    }
                  }}
                >
                  Delete
                </button>
              </fetcher.Form>
            </div>
          </div>
        </>
      )}

      {isForm && (
        <>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-text-main">
              {state?.mode === "create" ? "Add a Note" : "Edit Note"}
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
              value={state?.mode === "create" ? "create_note" : "update_note"}
            />
            <input type="hidden" name="plant_id" value={plantId} />
            {state?.mode === "edit" && note && (
              <input type="hidden" name="note_id" value={note.id} />
            )}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-text-muted">
                Type
              </label>
              <select
                name="label"
                defaultValue={note?.label ?? "note"}
                className="w-full rounded-xl border border-black/10 bg-surface px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                {NOTE_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {NOTE_TYPE_LABELS[t]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-text-muted">
                Note
              </label>
              <textarea
                name="note"
                defaultValue={note?.note ?? ""}
                rows={4}
                className="w-full resize-none rounded-xl border border-black/10 bg-surface px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Write your note…"
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
                  : state?.mode === "create"
                    ? "Add Note"
                    : "Save Changes"}
              </button>
            </div>
          </fetcher.Form>
        </>
      )}
    </dialog>
  );
}
