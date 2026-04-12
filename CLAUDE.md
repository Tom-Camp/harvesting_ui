# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Serve production build
npm run lint         # ESLint across app/
npm run typecheck    # Generate route types + tsc
npm run commit       # Interactive conventional commit (Commitizen)
```

There are no automated tests in this project.

## Environment setup

Copy `.env.example` to `.env` and set:
- `API_BASE_URL` — base URL for the backend REST API
- `SESSION_SECRET` — secret key for cookie session signing

## Architecture

This is a **React Router v7 framework-mode** app (SSR). All routing is defined in `app/routes.ts` using the declarative config API.

### Request flow

1. Route loaders call `requireToken(request)` from `app/.server/session.ts` to get the session Bearer token (or redirect to login).
2. Loaders call server-only API functions from `app/.server/api.ts`, which call the external REST backend.
3. Components render using `useLoaderData`. Form submissions go through route actions in the same pattern.

### Server boundary

- `app/.server/` — server-only modules. `api.ts` is the facade over all backend endpoints; `session.ts` manages the httpOnly cookie session (`__hf_session`).
- `app/lib/api-client.ts` — thin fetch wrapper (`createApiClient`) used only by `api.ts`. Throws `ApiClientError` on non-2xx; `api.ts` wraps every call in a `guard()` that redirects to `/auth/logout` on 401.
- `app/lib/types.ts` — all shared TypeScript types (domain models and request payloads). Import from here, don't redefine locally.

### Route layout

Authenticated routes use `routes/_app.tsx` as a layout, which calls `requireToken` and fetches the current user. All child routes under `gardens/` inherit this layout and can rely on the user/token being present.

Auth routes (`auth/login`, `auth/register`, `auth/logout`) are outside the layout and use `AuthShell`.

### Components

- `app/components/layout/` — `AppShell` (authenticated) and `AuthShell` (unauthenticated)
- `app/components/ui/` — primitive UI components (`Button`, `Input`, `Card`, `FormError`)
- `app/components/gardens/` and `app/components/plants/` — domain-specific form and card components

Use the `~` alias for imports (maps to `app/`).

## Commit conventions

Commits are enforced via commitlint + Commitizen. Use `npm run commit` for the interactive prompt, or write commits manually following [Conventional Commits](https://www.conventionalcommits.org). Pre-commit runs ESLint with `--max-warnings=0`.


## Last session

claude --resume f81fb00d-8db2-45ac-9aa9-784072d16afb
