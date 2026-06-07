# DECISIONS.md

Engineering decisions for the frontend monorepo.

## Decision Log

### F-001: Workspace-First Frontend Organization

- Status: accepted
- Context: multiple frontend apps share behavior and infrastructure.
- Decision: keep a pnpm workspace with apps/_ for surfaces and packages/_ for reuse.
- Consequence: clearer ownership and reduced duplication.

### F-002: Service Layer Centralization

- Status: accepted
- Context: API logic can drift when implemented directly in app pages.
- Decision: centralize API integration in packages/user-services.
- Consequence: contract updates happen in one place with fewer regressions.

### F-003: Shared UI And Utility Reuse

- Status: accepted
- Context: repeated component copies increase maintenance cost.
- Decision: prefer packages/shared for reusable UI, types, i18n, and utilities.
- Consequence: stronger design and behavior consistency across apps.

### F-004: State Scope Discipline

- Status: accepted
- Context: overusing global state makes features harder to reason about.
- Decision: keep local state local; use packages/state only for cross-feature or cross-route state.
- Consequence: simpler features and fewer global-state side effects.

### F-005: Script-Driven Validation

- Status: accepted
- Context: quality checks should match project scripts and CI intent.
- Decision: use existing lint/format/typecheck/validate scripts as standard quality gates.
- Consequence: predictable quality baseline and less custom tooling drift.

## Update Rule

Append new decisions; avoid rewriting historical entries unless correcting factual errors.
