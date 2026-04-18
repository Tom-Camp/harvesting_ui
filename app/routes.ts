import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  // Auth (no app shell)
  route("auth/login", "routes/auth.login.tsx"),
  route("auth/register", "routes/auth.register.tsx"),
  route("auth/logout", "routes/auth.logout.tsx"),
  route("auth/forgot-password", "routes/auth.forgot-password.tsx"),
  route("auth/reset-password", "routes/auth.reset-password.tsx"),

  // Authenticated routes
  layout("routes/_app.tsx", [
    route("admin/users", "routes/_app.admin.users.tsx"),
    route("invitations/:token", "routes/_app.invitations.$token.tsx"),
    ...prefix("gardens", [
      index("routes/_app.gardens.tsx"),
      route("new", "routes/_app.gardens.new.tsx"),
      route(":gardenSlug", "routes/_app.gardens.$gardenSlug.tsx", [
        index("routes/_app.gardens.$gardenSlug._index.tsx"),
        route("edit", "routes/_app.gardens.$gardenSlug.edit.tsx"),
        route("members", "routes/_app.gardens.$gardenSlug.members.tsx"),
        route(
          "plants/:plantId",
          "routes/_app.gardens.$gardenSlug.plants.$plantId.tsx"
        ),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
