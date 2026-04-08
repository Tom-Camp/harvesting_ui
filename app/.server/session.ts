import { createCookieSessionStorage, redirect } from "react-router";

type SessionData = {
  token: string;
  userId: string;
};

type SessionFlash = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlash>({
    cookie: {
      name: "__hf_session",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
      sameSite: "lax",
      secrets: [process.env.SESSION_SECRET!],
      secure: process.env.NODE_ENV === "production",
    },
  });

export { getSession, commitSession, destroySession };

export async function getToken(request: Request): Promise<string | null> {
  const session = await getSession(request.headers.get("Cookie"));
  return session.get("token") ?? null;
}

export async function requireToken(request: Request): Promise<string> {
  const token = await getToken(request);
  if (!token) {
    throw redirect("/auth/login");
  }
  return token;
}

export async function createUserSession(
  token: string,
  userId: string,
  redirectTo: string
): Promise<Response> {
  const session = await getSession();
  session.set("token", token);
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}

export async function destroyUserSession(request: Request): Promise<Response> {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/auth/login", {
    headers: { "Set-Cookie": await destroySession(session) },
  });
}
