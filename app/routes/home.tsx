import { redirect } from "react-router";
import { getToken } from "~/.server/session";
import type { Route } from "./+types/home";

export async function loader({ request }: Route.LoaderArgs) {
  const token = await getToken(request);
  return redirect(token ? "/gardens" : "/auth/login");
}

export default function Home() {
  return null;
}
