import { redirect } from "react-router";
import type { Route } from "./+types/register-redirect";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  const destination = token
    ? `/auth/register?token=${encodeURIComponent(token)}`
    : "/auth/register";
  throw redirect(destination, 301);
}
