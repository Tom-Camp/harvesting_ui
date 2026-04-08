import { destroyUserSession } from "~/.server/session";
import type { Route } from "./+types/auth.logout";

export async function loader({ request }: Route.LoaderArgs) {
  return destroyUserSession(request);
}

export async function action({ request }: Route.ActionArgs) {
  return destroyUserSession(request);
}
