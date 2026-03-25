# AI Development Instructions (Common Tools)

This guide defines the baseline prompt and working rules for AI coding assistants in this repository.

## Shared Project Context

Use these assumptions in every tool:

- Monorepo managed with `pnpm` + Turborepo.
- Primary shared UI/code lives in `packages/shared`.
- Apps: `apps/admin-app`, `apps/user-app`, `apps/landing-page`, `apps/help-center`.
- Prefer TypeScript-first changes and keep code style aligned with existing files.

## Codex

Use when you want autonomous file edits, command execution, and verification.

Recommended system/request block:

- Scope: exact feature/bug and files to touch.
- Constraints: no destructive git commands, preserve unrelated changes.
- Done criteria: code updated, lint/typecheck for touched packages, changelog note if needed.

Execution pattern:

1. Read related files first (`rg`, then open exact files).
2. Implement smallest coherent patch.
3. Run focused checks (`pnpm --filter <pkg> lint`, `pnpm --filter <pkg> typecheck`).
4. Summarize changed files + behavior.

## GitHub Copilot (Chat/Agent)

Use for in-editor pair programming and quick scaffolding.

Prompt template:

- "In this monorepo, update `<file>` to `<goal>`. Keep existing patterns. Return minimal diff-ready code."
- Include interface/type constraints from nearby files to avoid API drift.

Rules:

- Ask Copilot for targeted snippets, not full rewrites, unless refactor is explicit.
- Require it to keep exports and public props backward-compatible.

## Codeium / Windsurf-like agents

Use for fast multi-file suggestions.

Prompt template:

- "Apply feature `<name>` across shared table components under `packages/shared/src/ui/components/table` with backward compatibility."

Rules:

- Force explicit file list before edit.
- Ask for risk notes (type breaks, translation keys, API contract changes).

## Cursor / Antigravity-style autonomous editors

Use when doing larger coordinated updates.

Required guardrails:

- "Never edit lockfiles unless dependency changes are requested."
- "Do not modify unrelated files."
- "Run only targeted checks for touched packages."

## Tool Selection Quick Map

- Codex: cross-file implementation + validation.
- Copilot: local function/component generation.
- Codeium/Windsurf: quick iterative refactors.
- Cursor/Antigravity: larger orchestrated edits with checkpoints.

## Review Checklist (Any AI Tool)

Before accepting output:

1. Types compile for touched workspace.
2. i18n keys exist for new UI labels.
3. LocalStorage/API payload changes are backward-compatible.
4. No hidden destructive command usage.
5. User-visible behavior is documented in PR notes.
