# User Service Generator

This generator scaffolds a user service in three places from one JSON spec:

1. `packages/user-services` source files
2. `packages/user-services` i18n locales (`en` and `ar`)
3. Service view files in both `apps/user-app` and `apps/admin-app`

## Command

```bash
pnpm generate:user-service --spec scripts/specs/user-service.example.json
```

Dry run:

```bash
pnpm generate:user-service --spec scripts/specs/user-service.example.json --dry-run
```

## Spec shape

Required top-level fields:

- `serviceCode`: camelCase package folder and export path
- `serviceKey`: i18n key segment under `UserServices` (e.g. `TABLE_PLURAL_UPPER_NAME`)
- `appFolderName`: folder name under `views/auth/services`
- `apiEndpoint`: value passed to `TablePage.dataApiEndpoint`
- `title`: `{ en, ar }`
- `singleItem`: `{ en, ar }`
- `fields`: array of field definitions

Optional top-level fields:

- `options`: object of reusable option groups for rendered labels

Field shape:

- `name`: row field key (e.g. `role`)
- `type`: input column type (e.g. `custom`, `email`, `phoneNumber`)
- `label`: `{ en, ar }`
- `key` (optional): key name under `Fields`; defaults to PascalCase(`name`)
- `optionsKey` (optional): links field to `options.<optionsKey>` and enables render mapping

Option shape:

- `value`: raw stored value
- `label`: `{ en, ar }`
- `key` (optional): i18n key under option group; defaults to `value`

## Generated output

- `packages/user-services/src/services/<serviceCode>/inputs.ts`
- `packages/user-services/src/services/<serviceCode>/index.ts`
- `packages/user-services/src/services/index.ts` (auto export line)
- `packages/user-services/src/index.ts` (canonical exports)
- `packages/user-services/src/i18n/locales/en.json`
- `packages/user-services/src/i18n/locales/ar.json`
- `apps/user-app/src/views/auth/services/<appFolderName>/inputs.ts`
- `apps/user-app/src/views/auth/services/<appFolderName>/index.tsx`
- `apps/admin-app/src/views/auth/services/<appFolderName>/inputs.ts`
- `apps/admin-app/src/views/auth/services/<appFolderName>/index.tsx`

## Notes

- The script creates view files but does **not** add route entries in app auth layout files.
- i18n keys are generated as static string literals to remain parser-friendly.
