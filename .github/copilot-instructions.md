# Frontend Copilot Instructions

## Project Context

pnpm monorepo with React 19 + TypeScript + Vite.

- `apps/*` — delivery surfaces (user-app, admin-app, landing-page, help-center, documentation, user-mobile-app)
- `packages/shared` — reusable UI, components, i18n, utilities, common types
- `packages/user-services` — typed API service layer
- `packages/state` — Redux actions/reducers/types
- `packages/core` — app composition entry points

## Canonical Rules

Coding rules live in `.github/instructions/` and are auto-loaded by Copilot for matching file types:

| Instruction file                          | Covers                                    | Applies to                    |
| ----------------------------------------- | ----------------------------------------- | ----------------------------- |
| `react-view-architecture.instructions.md` | TSX=view, TS=logic, API dirs, reuse-first | `**/*.tsx`                    |
| `typescript-standards.instructions.md`    | No `any`, centralized types               | `**/*.ts`, `**/*.tsx`         |
| `api-layer.instructions.md`               | Centralized HTTP, no inline calls         | `**/api/**`, `**/services/**` |
| `i18n.instructions.md`                    | Localization keys + locale JSON           | `**/*.tsx`, `**/*.ts`         |

## Always-On Guardrails

- After every task, run `corepack pnpm typecheck` and `corepack pnpm lint` for touched scope.
- Validate command for full check: `corepack pnpm validate`.
- Prefer `packages/shared` and `packages/user-services` before creating app-local duplicates.
- Full workflow skills: see `SKILLS.md`. Agent workflow guide: see `AGENTS.md`.
