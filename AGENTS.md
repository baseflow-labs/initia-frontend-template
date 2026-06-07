# AGENTS.md

Codex guide for frontend app work.

## Stack And Tooling

- Monorepo: pnpm workspaces with apps/_ and packages/_.
- Runtime: React 19, TypeScript, Vite.
- Shared state and services: @initia/state, @initia/user-services, @initia/shared.
- Styling: Bootstrap + SCSS (plus app-local styles).

## Source Layout

- apps/admin-app: admin experience.
- apps/user-app: main end-user dashboard.
- apps/landing-page, apps/help-center, apps/documentation, apps/user-mobile-app: product surfaces and docs.
- packages/shared: reusable UI, config, i18n, utilities, API helpers.
- packages/core: app composition entry points.
- packages/state: Redux reducers/actions/types.
- packages/user-services: typed service layer.

## Frontend Architecture Rules

- Place domain logic in packages when reused by multiple apps.
- Keep app-level code in apps/\*/src focused on composition and page behavior.
- Keep .tsx files view-first: move non-UI logic into framework-agnostic .ts modules (hooks, mappers, services, utils).
- Do not duplicate API calling logic across apps; extend packages/user-services or app-level api directories instead.
- Keep API setup centralized in api directories; do not inline HTTP calls inside view components or ad-hoc logic files.
- Reuse shared UI/types from packages/shared before creating new local variants.
- Keep i18n keys centralized and avoid hard-coded UI strings.
- Add all user-facing text as localization keys and include values in locale JSON files.
- Prioritize existing examples (TablePage, ApiDataTable, dynamic form patterns) before building new primitives.

## Commands

Run from frontend directory.

- Install: corepack pnpm install
- Run all major apps: corepack pnpm dev
- Run one app:
  - user: corepack pnpm dev:user
  - admin: corepack pnpm dev:admin
  - landing: corepack pnpm dev:landing
  - help-center: corepack pnpm dev:help
  - docs: corepack pnpm dev:documentation
  - mobile: corepack pnpm dev:user-mobile
- Build all: corepack pnpm build
- Validate full frontend: corepack pnpm validate
- Targeted checks:
  - lint: corepack pnpm lint
  - format check: corepack pnpm format:check
  - typecheck: corepack pnpm typecheck

## Coding Standards

- TypeScript strict mode is enabled; do not use any.
- Prefer typed props, service responses, request bodies, and selector outputs via centralized shared types.
- Keep components small and composable; move non-UI logic to hooks/util modules.
- Preserve import order and existing naming conventions.
- Avoid introducing global state for page-local concerns.

## Execution Guardrails

- After every task execution, run lint and typecheck for affected frontend scope before handoff.
- If localization keys were added or changed, update the matching locale JSON files in the touched app/shared layers.
- Prefer extending existing table/form/page examples before creating new component systems.

## Test And QA Guidance

- For service/state changes: add or update tests close to affected package/app.
- For UI flows: include manual test notes for routes impacted.
- For regression-prone bugs: add a focused test or reproducible harness.

## Frontend Skill Recipes

- New Screen:
  1. Create route/page in app.
  2. Pull shared blocks from packages/shared.
  3. Add service calls via packages/user-services.
  4. Wire state via packages/state only if truly cross-page.
- Shared Component:
  1. Implement in packages/shared.
  2. Export from packages/shared/src/index.ts.
  3. Replace duplicated app-local implementations.
- API Contract Update:
  1. Update service typing and adapters in packages/user-services.
  2. Update consumers in affected apps.
  3. Verify both admin and user-app if shared endpoint changed.

## Definition Of Done

- Relevant app builds and targeted checks pass.
- New logic follows package boundaries above.
- No duplicated services/types introduced across apps.

## Local Docs

- Architecture details: ./ARCHITECTURE.md
- Engineering decisions: ./DECISIONS.md
- Execution skills: ./SKILLS.md
