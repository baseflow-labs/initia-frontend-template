# Monorepo Migration Guide

## [x] Completed Steps

### 1. Monorepo Structure Created

- [x] Created `packages/user-app`, `packages/admin-app`, `packages/shared`
- [x] Added `pnpm-workspace.yaml` for workspace management
- [x] Added `turbo.json` for build optimization
- [x] Created `tsconfig.base.json` for shared TypeScript config

### 2. User App Migrated

- [x] Moved `src/` → `packages/user-app/src/`
- [x] Created `packages/user-app/package.json`
- [x] Updated `packages/user-app/vite.config.ts` with alias to `@initia/shared`
- [x] Created `packages/user-app/tsconfig.json`

### 3. Admin App Skeleton Created

- [x] Created basic `packages/admin-app` structure
- [x] Created `packages/admin-app/package.json` (runs on port 5174)
- [x] Created `packages/admin-app/vite.config.ts`
- [x] Created basic `App.tsx` and `main.tsx`

### 4. Shared Package Created

- [x] Created `packages/shared/package.json`
- [x] Moved `types`, `utils`, `api` from user-app to shared
- [x] Moved `components`, `layouts`, `styles` to `packages/shared/src/ui`
- [x] Moved `configs.ts` to `packages/shared/src/config`

### 5. i18n Layering Setup

- [x] Created `packages/shared/src/i18n` with shared locales
- [x] Created `mergeResources()` helper for combining translations
- [x] Created `packages/user-app/src/i18n` with user-specific locales
- [x] Created `packages/admin-app/src/i18n` with admin-specific locales

### 6. Root package.json Updated

- [x] Updated scripts to work with monorepo
- [x] Added workspace configuration
- [x] Added dev/build scripts for both apps

## 🚧 Next Steps (Manual)

### Step 1: Update Import Paths in User App

All files in `packages/user-app/src/` need their imports updated:

**Find and Replace:**

```typescript
// OLD imports
import ... from "@/types/..."
import ... from "@/utils/..."
import ... from "@/api/..."
import ... from "@/components/..."
import ... from "@/layouts/..."
import ... from "@/configs"

// NEW imports
import ... from "@initia/shared/types/..."
import ... from "@initia/shared/utils/..."
import ... from "@initia/shared/api/..."
import ... from "@initia/shared/ui/components/..."
import ... from "@initia/shared/ui/layouts/..."
import configs from "@initia/shared/config/configs"
```

**Also update:**

```typescript
// Change i18next import
import "./i18next" → import "./i18n"
```

### Step 2: Delete Old Directories from User App

After verifying imports work, delete these from `packages/user-app/src/`:

```bash
cd packages/user-app/src
rm -rf api/ types/ utils/ components/ layouts/ styles/ configs.ts i18next.ts
rm -rf assets/locales/  # Moved to shared
```

### Step 3: Install Dependencies

```bash
# Install pnpm if not already installed
npm install -g pnpm

# Install all dependencies
pnpm install
```

### Step 4: Build Admin App Properly

Create proper admin app structure by copying relevant views from user-app:

```bash
# Copy system admin views
cp -r packages/user-app/src/views/auth/core/systemSettings packages/admin-app/src/views/
```

Then create admin-specific router, store, and components.

### Step 5: Create Admin App Router

Create `packages/admin-app/src/app/router.tsx`:

```typescript
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SystemSettingsView from "../views/systemSettings";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<div>Admin Dashboard</div>} />
        <Route path="/system-settings/*" element={<SystemSettingsView />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### Step 6: Update Admin App.tsx

```typescript
import { Provider } from "react-redux";
import { AppRouter } from "./app/router";
import store from "./store/store";
import "./i18n";
import "@initia/shared/styles/index.scss";
import "./styles/index.scss";

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
```

### Step 7: Testing

```bash
# Test user app
pnpm dev:user

# Test admin app (in another terminal)
pnpm dev:admin

# Test build
pnpm build
```

## 📋 Import Replacement Script

You can use this script to automatically update imports:

```bash
# From project root
find packages/user-app/src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' \
  -e 's|from "@/types/|from "@initia/shared/types/|g' \
  -e 's|from "@/utils/|from "@initia/shared/utils/|g' \
  -e 's|from "@/api/|from "@initia/shared/api/|g' \
  -e 's|from "@/components/|from "@initia/shared/ui/components/|g' \
  -e 's|from "@/layouts/|from "@initia/shared/ui/layouts/|g' \
  -e 's|from "@/configs"|from "@initia/shared/config/configs"|g' \
  -e 's|import "./i18next"|import "./i18n"|g'
```

## 🏗️ Final Structure

```
initia-fe/
├── packages/
│   ├── user-app/          # User-facing app (port 5173)
│   │   ├── src/
│   │   │   ├── app/       # App bootstrap
│   │   │   ├── store/     # User app state
│   │   │   ├── views/     # User-only views
│   │   │   ├── i18n/      # User translations
│   │   │   └── styles/    # User-specific styles
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   └── package.json
│   │
│   ├── admin-app/         # Admin app (port 5174)
│   │   ├── src/
│   │   │   ├── app/
│   │   │   ├── store/
│   │   │   ├── views/
│   │   │   ├── i18n/
│   │   │   └── styles/
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   └── package.json
│   │
│   └── shared/            # Shared code
│       ├── src/
│       │   ├── api/       # HTTP client, endpoints
│       │   ├── types/     # TypeScript types
│       │   ├── utils/     # Utilities
│       │   ├── config/    # Configs
│       │   ├── i18n/      # Shared translations
│       │   ├── ui/
│       │   │   ├── components/
│       │   │   └── layouts/
│       │   ├── styles/
│       │   └── index.ts
│       └── package.json
│
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.base.json
└── package.json
```

## 🎯 Benefits Achieved

1. **Code Sharing**: Components, layouts, types, utils shared between apps
2. **Independent Deployment**: Each app can be deployed separately
3. **Better Organization**: Clear separation of user vs admin features
4. **Scalability**: Easy to add more apps (mobile, public site, etc.)
5. **Type Safety**: Shared types ensure consistency
6. **i18n Layering**: Shared translations with app-specific overrides
7. **Optimized Builds**: Turbo.build caches and parallelizes

## 📝 Notes

- User app runs on port `5173`
- Admin app runs on port `5174`
- Both apps import from `@initia/shared`
- Shared package is not built separately (imported directly)
- i18n merges shared translations with app-specific ones
