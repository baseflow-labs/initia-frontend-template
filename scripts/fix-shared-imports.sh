#!/bin/bash

echo "🔄 Fixing import paths in packages/shared/src..."

# Fix all @/ imports in shared package to use relative paths
find packages/shared/src/ui -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' \
  -e 's|from "@/store/|from "../../../store/|g' \
  -e 's|from "@/api/files"|from "../../../api/files"|g' \
  -e 's|from "@/api"|from "../../../api"|g' \
  -e 's|from "@/utils/consts"|from "../../../utils/consts"|g' \
  -e 's|from "@/utils/function"|from "../../../utils/function"|g' \
  -e 's|from "@/i18next"|from "../../../i18n"|g' \
  -e 's|from "@/layouts/auth/globalModal"|from "../../layouts/auth/globalModal"|g' \
  -e 's|from "@/components/button/actionButtons"|from "../../components/button/actionButtons"|g' \
  {} \;

echo "✅ Import paths in shared/ui fixed!"
