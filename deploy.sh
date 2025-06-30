#!/bin/bash

echo "🔁 Starting deployment tasks..."

cd /var/www/sawaed || exit 1

echo "🧹 Removing old build..."
rm -rf build  # or dist

echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

echo "⚙️ Rebuilding the app..."
npm run build

echo "✅ Deployment complete."
