@echo off
REM Simple deploy script for GitHub Pages

echo 🚀 Deploying to GitHub Pages...

REM Ensure we're on the main branch
git checkout main

REM Create or switch to gh-pages branch
git show-ref --verify --quiet refs/heads/gh-pages
if %errorlevel% == 0 (
    echo ✅ Branch gh-pages exists, switching to it...
    git checkout gh-pages
) else (
    echo 🔄 Creating gh-pages branch...
    git checkout -b gh-pages
)

REM Ensure we have the latest code
echo ⬇️ Pulling latest changes...
git pull origin main

REM Add all files
echo 📦 Adding files to git...
git add .

REM Commit changes
echo 💾 Committing changes...
git commit -m "Deploy to GitHub Pages"

REM Push to GitHub
echo ☁️ Pushing to GitHub...
git push -u origin gh-pages

REM Switch back to main branch
echo 🔙 Switching back to main branch...
git checkout main

echo ✨ Deployment complete! Your site should be available at https://parthivkoli.github.io/AnkiMate/
