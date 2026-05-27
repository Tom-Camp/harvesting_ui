import { submitFeedback } from "~/.server/api";
import { ApiClientError } from "~/lib/api-client";
import { requireToken } from "~/.server/session";
import type { FeedbackType } from "~/lib/types";
import type { Route } from "./+types/_app.feedback";

export async function action({ request }: Route.ActionArgs) {
  const token = await requireToken(request);
  const form = await request.formData();
  const type = String(form.get("type")) as FeedbackType;
  const title = String(form.get("title") ?? "").trim();
  const description = String(form.get("description") ?? "").trim();

  try {
    await submitFeedback(token, { type, title, description });
    return { success: true, error: null };
  } catch (err) {
    if (err instanceof ApiClientError) {
      return { success: false, error: err.message };
    }
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
