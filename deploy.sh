#!/bin/bash

# Simple deploy script for GitHub Pages
echo "🚀 Deploying to GitHub Pages..."

# Ensure we're on the main branch
git checkout main

# Create or switch to gh-pages branch
if git show-ref --verify --quiet refs/heads/gh-pages; then
    echo "✅ Branch gh-pages exists, switching to it..."
    git checkout gh-pages
else
    echo "🔄 Creating gh-pages branch..."
    git checkout -b gh-pages
fi

# Ensure we have the latest code
echo "⬇️ Pulling latest changes..."
git pull origin main

# Add all files
echo "📦 Adding files to git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Deploy to GitHub Pages"

# Push to GitHub
echo "☁️ Pushing to GitHub..."
git push -u origin gh-pages

# Switch back to main branch
echo "🔙 Switching back to main branch..."
git checkout main

echo "✨ Deployment complete! Your site should be available at https://parthivkoli.github.io/AnkiMate/"
