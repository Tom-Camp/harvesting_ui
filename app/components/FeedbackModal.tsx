import { useEffect, useRef } from "react";
import { useFetcher } from "react-router";

interface FeedbackModalProps {
  open: boolean;
  onClose: () => void;
}

type FetcherData = { success: boolean; error: string | null } | undefined;

export function FeedbackModal({ open, onClose }: FeedbackModalProps) {
  const fetcher = useFetcher();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  const data = fetcher.data as FetcherData;
  const succeeded = fetcher.state === "idle" && data?.success === true;
  const error = fetcher.state === "idle" && !data?.success ? (data?.error ?? null) : null;

  return (
    <dialog
      ref={dialogRef}
      className="m-auto w-full max-w-md rounded-3xl border border-black/10 bg-surface p-6 shadow-lg backdrop:bg-black/40 open:flex open:flex-col"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      {succeeded ? (
        <>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-text-main">Send Feedback</h2>
            <button
              type="button"
              onClick={onClose}
              className="text-xl leading-none text-text-faint transition hover:text-text-main"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <div className="flex flex-col items-center gap-4 py-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-text-main">Thanks for the feedback!</p>
              <p className="mt-1 text-xs text-text-muted">We&apos;ll take a look and get back to you if needed.</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 inline-flex items-center rounded-full bg-primary px-5 py-2 text-xs font-medium text-white transition hover:bg-primary-strong"
            >
              Done
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-text-main">Send Feedback</h2>
            <button
              type="button"
              onClick={onClose}
              className="text-xl leading-none text-text-faint transition hover:text-text-main"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <fetcher.Form method="post" action="/feedback" className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-text-muted">
                Type <span className="text-orange">*</span>
              </label>
              <select
                name="type"
                required
                defaultValue="bug"
                className="w-full rounded-xl border border-black/10 bg-surface px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="bug">Bug report</option>
                <option value="enhancement">Feature idea</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-text-muted">
                Title <span className="text-orange">*</span>
              </label>
              <input
                name="title"
                type="text"
                required
                placeholder="Brief summary"
                className="w-full rounded-xl border border-black/10 bg-surface px-3 py-2 text-sm text-text-main placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-text-muted">
                Description
              </label>
              <textarea
                name="description"
                rows={4}
                placeholder="What happened? What did you expect?"
                className="w-full resize-none rounded-xl border border-black/10 bg-surface px-3 py-2 text-sm text-text-main placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            {error && <p className="text-xs text-orange">{error}</p>}

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
                {fetcher.state !== "idle" ? "Sending…" : "Send feedback"}
              </button>
            </div>
          </fetcher.Form>
        </>
      )}
    </dialog>
  );
}
