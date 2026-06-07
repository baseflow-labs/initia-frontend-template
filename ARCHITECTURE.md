# ARCHITECTURE.md

Frontend architecture map for the Initia frontend monorepo.

## System Shape

- This repository is a pnpm workspace monorepo.
- Delivery surfaces live under apps/\*.
- Reusable building blocks live under packages/\*.

## App Layer

- apps/user-app: end-user dashboard surface.
- apps/admin-app: admin surface.
- apps/landing-page: marketing/landing surface.
- apps/help-center: support content surface.
- apps/documentation: product docs surface.
- apps/user-mobile-app: mobile-focused frontend surface.

## Package Layer

- packages/shared: shared UI components, assets, i18n, config, utility helpers, common types.
- packages/user-services: API service clients and domain service wrappers.
- packages/state: Redux actions/reducers/types.
- packages/core: app composition and core cross-app glue.
- packages/analysis: analysis-specific reusable logic.

## Dependency Direction

- Allowed: apps/_ -> packages/_.
- Avoid: packages/_ -> apps/_.
- Prefer shared package extraction when code appears in multiple apps.

## State And Data Flow

- Prefer colocated local state for screen-local behavior.
- Promote state to packages/state only for shared, cross-feature needs.
- API calls should be centralized in packages/user-services, not duplicated in app components.

## i18n And UI Consistency

- Reuse keys and translation patterns from shared i18n setup.
- Prefer components/utilities from packages/shared before creating app-local duplicates.

## Quality Gates

- Validate with existing scripts:
  - corepack pnpm lint
  - corepack pnpm format:check
  - corepack pnpm typecheck
  - corepack pnpm validate

## Architectural Constraints

- Keep app code focused on routing, composition, and feature assembly.
- Keep domain/API abstractions in packages.
- Preserve strict typing at package boundaries.
