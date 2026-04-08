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

  // Authenticated routes
  layout("routes/_app.tsx", [
    ...prefix("gardens", [
      index("routes/_app.gardens.tsx"),
      route("new", "routes/_app.gardens.new.tsx"),
      route(":gardenSlug", "routes/_app.gardens.$gardenSlug.tsx", [
        route("edit", "routes/_app.gardens.$gardenSlug.edit.tsx"),
        route("plants/new", "routes/_app.gardens.$gardenSlug.plants.new.tsx"),
        route(
          "plants/:plantId",
          "routes/_app.gardens.$gardenSlug.plants.$plantId.tsx"
        ),
        route(
          "plants/:plantId/edit",
          "routes/_app.gardens.$gardenSlug.plants.$plantId.edit.tsx"
        ),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
