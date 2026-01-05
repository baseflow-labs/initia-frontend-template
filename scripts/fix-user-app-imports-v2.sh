#!/bin/bash

# Fix @/ imports in user-app with correct paths

cd /Users/admin/Projects/others/initia-fe/packages/user-app/src

# Fix imports in each directory level
# Level 1: src/*.tsx files
find . -maxdepth 1 -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' 's|from "@/|from "./|g' {} \;

# Level 2: src/dir/*.tsx files  
find . -maxdepth 2 -mindepth 2 -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' 's|from "@/|from "../|g' {} \;

# Level 3: src/dir/subdir/*.tsx files
find . -maxdepth 3 -mindepth 3 -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' 's|from "@/|from "../../|g' {} \;

# Level 4: src/dir/subdir/subdir/*.tsx files
find . -maxdepth 4 -mindepth 4 -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' 's|from "@/|from "../../../|g' {} \;

# Level 5: src/dir/subdir/subdir/subdir/*.tsx files
find . -maxdepth 5 -mindepth 5 -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' 's|from "@/|from "../../../../|g' {} \;

echo "✅ Fixed @/ imports in user-app"
