# GitHub Pages Deployment Instructions

To deploy this application to GitHub Pages, follow these steps:

## Method 1: Automatic Deployment via GitHub Actions

1. Fork or clone this repository to your GitHub account
2. Go to your repository settings on GitHub:
   - Navigate to Settings > Pages
   - Under "Build and deployment", select "GitHub Actions"
3. The workflow will automatically deploy your site whenever you push to the main branch

## Method 2: Using Deployment Scripts

We've included convenient deployment scripts that you can run locally:

### For Windows:
```
deploy.bat
```

### For Linux/Mac:
```bash
chmod +x deploy.sh
./deploy.sh
```

These scripts will create a gh-pages branch and push your code to GitHub Pages.

## Method 3: Manual Deployment

If the other methods don't work, you can follow these manual steps:

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/AnkiMate.git
   cd AnkiMate
   ```

2. Create and switch to a gh-pages branch:
   ```bash
   git checkout -b gh-pages
   ```

3. Push this branch to GitHub:
   ```bash
   git push -u origin gh-pages
   ```

4. Go to your repository settings on GitHub:
   - Navigate to Settings > Pages
   - Under "Build and deployment", select "Source" as "Deploy from a branch"
   - Select the "gh-pages" branch and the "/ (root)" folder
   - Click "Save"

5. Your site will be published to `https://yourusername.github.io/AnkiMate/`

## Local Development

To run this application locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/AnkiMate.git
   cd AnkiMate
   ```
2. Open the index.html file in a browser:
   - Double-click the file
   - Or use a local server: `npx serve .`
