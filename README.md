# harvesting.food

A garden management web app for tracking your gardens, plants, care information, and notes.

## Features

- User registration and authentication (Bearer token, httpOnly cookie session)
- Garden CRUD — create, view, edit, and delete gardens
- Plant management — add plants with species, variety, type, and planted date
- Plant detail view — care information (AI-generated) and notes per plant
- Responsive UI built with Tailwind CSS v4

## Tech stack

- [React Router v7](https://reactrouter.com) (framework mode) — routing, loaders, actions, SSR
- [TypeScript](https://www.typescriptlang.org) with strict mode
- [Tailwind CSS v4](https://tailwindcss.com)
- [Vite 8](https://vite.dev)

## Getting started

### Prerequisites

- Node.js 20+
- A running instance of the harvesting.food API (see API docs at `/docs`)

### Setup

```bash
cp .env.example .env
# Edit .env and set API_BASE_URL
npm install
npm run dev
```

### Environment variables

| Variable        | Description                        |
| --------------- | ---------------------------------- |
| `API_BASE_URL`  | Base URL for the backend API       |
| `SESSION_SECRET`| Secret key for cookie session      |

## Scripts

| Command         | Description                                      |
| --------------- | ------------------------------------------------ |
| `npm run dev`   | Start development server                         |
| `npm run build` | Production build                                 |
| `npm run start` | Serve production build                           |
| `npm run lint`  | Run ESLint across `app/`                         |
| `npm run commit`| Interactive conventional commit (via Commitizen) |
| `npm run typecheck` | Generate route types and run `tsc`           |

## Developer tooling

- **ESLint** — TypeScript + React rules, enforced on pre-commit via Husky + lint-staged
- **Commitizen** — interactive prompt for [Conventional Commits](https://www.conventionalcommits.org) (`npm run commit`)
- **commitlint** — validates commit messages on the `commit-msg` hook

## Project structure

```
app/
  .server/        # Server-only modules (API facade, session)
  components/     # Shared UI components
    gardens/
    plants/
    layout/
    ui/
  lib/            # Types and API client
  routes/         # React Router route modules
```
