@echo off
echo Deploying AnkiMate to GitHub Pages...

echo Adding all files to git...
git add .

echo Committing changes...
set /p commit_message=Enter commit message: 
git commit -m "%commit_message%"

echo Pushing to main branch...
git push origin main

echo Deploying to GitHub Pages...
npm run deploy

echo Deployment completed!
pause
