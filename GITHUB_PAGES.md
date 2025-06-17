# GitHub Pages Deployment Instructions

To deploy this application to GitHub Pages, follow these steps:

1. Fork or clone this repository to your GitHub account
2. Install the development dependencies:
   ```bash
   npm install
   ```
3. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```
4. Go to your repository settings on GitHub:
   - Navigate to Settings > Pages
   - Ensure the source is set to "Deploy from a branch"
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
