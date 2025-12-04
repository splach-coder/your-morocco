#!/bin/bash

# Automated Sanity Migration Script
# Run this to import all your data automatically

echo "🚀 Your Morocco - Sanity Data Migration"
echo "========================================"
echo ""

# Check if token is set
if [ -z "$SANITY_WRITE_TOKEN" ]; then
    echo "⚠️  SANITY_WRITE_TOKEN is not set!"
    echo ""
    echo "📝 Steps to get your token:"
    echo "1. Go to: https://www.sanity.io/manage/personal/tokens"
    echo "2. Create a new token with 'Editor' permissions"
    echo "3. Copy the token"
    echo "4. Run: export SANITY_WRITE_TOKEN=\"your-token-here\""
    echo "5. Then run this script again"
    echo ""
    exit 1
fi

echo "✅ SANITY_WRITE_TOKEN is set"
echo ""

# Install dependencies if needed
if ! command -v npx &> /dev/null; then
    echo "❌ npx not found. Please install Node.js first."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install -D tsx @sanity/client

echo ""
echo "🔄 Starting migration..."
echo ""

# Run the migration
npx tsx scripts/migrate-to-sanity.ts

echo ""
echo "✅ Done! Check your Sanity Studio at http://localhost:3333"
