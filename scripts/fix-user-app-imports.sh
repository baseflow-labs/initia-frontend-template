#!/bin/bash

# Fix @/store imports in user-app with correct relative paths based on file depth

cd /Users/admin/Projects/others/initia-fe

# Find all TypeScript files and fix imports
find packages/user-app/src -type f \( -name "*.ts" -o -name "*.tsx" \) | while read file; do
  # Count directory depth from packages/user-app/src
  depth=$(echo "$file" | sed 's|packages/user-app/src/||' | tr -cd '/' | wc -c | tr -d ' ')
  
  # Build relative path (each level needs ../)
  rel_path=""
  for ((i=0; i<=depth; i++)); do
    rel_path="../${rel_path}"
  done
  
  # Replace @/store with correct relative path
  sed -i '' "s|from \"@/store/|from \"${rel_path}store/|g" "$file"
  
  # Replace @/ with relative path for other imports
  sed -i '' "s|from \"@/|from \"${rel_path}|g" "$file"
done

echo "✅ Fixed all @/ imports in user-app"
