#!/bin/bash

# Monorepo Import Path Updater
# This script updates all import paths in user-app to use @initia/shared

echo "🔄 Updating import paths in packages/user-app/src..."

# Update all TypeScript/TSX files
find packages/user-app/src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' \
  -e 's|from "@/types/|from "@initia/shared/types/|g' \
  -e 's|from "@/utils/|from "@initia/shared/utils/|g' \
  -e 's|from "@/api/|from "@initia/shared/api/|g' \
  -e 's|from "@/components/|from "@initia/shared/ui/components/|g' \
  -e 's|from "@/layouts/|from "@initia/shared/ui/layouts/|g' \
  -e 's|from "@/store/actions/|from "@/store/actions/|g' \
  -e 's|from "@/store/reducers/|from "@/store/reducers/|g' \
  -e 's|import configs from "@/configs"|import configs from "@initia/shared/config/configs"|g' \
  -e 's|from "./i18next"|from "./i18n"|g' \
  -e 's|import "./i18next"|import "./i18n"|g' \
  {} \;

echo "✅ Import paths updated!"
echo ""
echo "Next steps:"
echo "1. Run: pnpm install"
echo "2. Run: pnpm dev:user"
echo "3. Fix any remaining import errors"
echo "4. Delete old directories: api/, types/, utils/, components/, layouts/, styles/"
