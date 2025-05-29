# AnkiMate Deployment Guide

This guide explains how to deploy AnkiMate to Vercel and other platforms.

## 🚀 Vercel Deployment (Recommended)

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Fork or Clone** this repository to your GitHub account
2. **Visit** [vercel.com](https://vercel.com) and sign in with GitHub
3. **Click** "New Project" and import your AnkiMate repository
4. **Configure** the project:
   - Framework Preset: `Other`
   - Root Directory: `./` (default)
   - Build Command: Leave empty (static site)
   - Output Directory: Leave empty (static site)
5. **Click** "Deploy" and wait for deployment to complete
6. **Visit** your live site at the provided URL

### Option 2: Deploy via Vercel CLI

1. **Install** Vercel CLI globally:
   \`\`\`bash
   npm install -g vercel
   \`\`\`

2. **Login** to Vercel:
   \`\`\`bash
   vercel login
   \`\`\`

3. **Deploy** from your project directory:
   \`\`\`bash
   vercel
   \`\`\`

4. **Follow** the prompts:
   - Link to existing project? `N`
   - Project name: `ankimate` (or your preferred name)
   - Directory: `./` (default)
   - Auto-deploy? `Y`

5. **Production deployment**:
   \`\`\`bash
   vercel --prod
   \`\`\`

### Option 3: GitHub Integration (Automatic Deployments)

1. **Connect** your GitHub repository to Vercel
2. **Enable** automatic deployments for:
   - Production: `main` branch
   - Preview: Pull requests and other branches
3. **Push** changes to trigger automatic deployments

## 🌐 Alternative Deployment Options

### Netlify

1. **Drag and drop** your project folder to [netlify.com/drop](https://netlify.com/drop)
2. **Or connect** your GitHub repository via Netlify dashboard
3. **Build settings**:
   - Build command: Leave empty
   - Publish directory: `./`

### GitHub Pages

1. **Enable** GitHub Pages in repository settings
2. **Select** source: Deploy from a branch
3. **Choose** branch: `main` and folder: `/ (root)`
4. **Access** your site at: `https://yourusername.github.io/AnkiMate`

### Firebase Hosting

1. **Install** Firebase CLI:
   \`\`\`bash
   npm install -g firebase-tools
   \`\`\`

2. **Initialize** Firebase:
   \`\`\`bash
   firebase init hosting
   \`\`\`

3. **Configure** `firebase.json`:
   \`\`\`json
   {
     "hosting": {
       "public": ".",
       "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   \`\`\`

4. **Deploy**:
   \`\`\`bash
   firebase deploy
   \`\`\`

## 🔧 Configuration Details

### Vercel Configuration

The `vercel.json` file includes:

- **Static file serving** for the single-page application
- **Security headers** for enhanced protection
- **Caching strategies** for optimal performance
- **Route handling** to serve `index.html` for all routes

### Performance Optimizations

- **CDN delivery** via Vercel's global network
- **Automatic compression** (gzip/brotli)
- **Edge caching** for static assets
- **HTTP/2 support** for faster loading

### Security Features

- **Content Security Policy** headers
- **XSS protection** enabled
- **Frame options** to prevent clickjacking
- **HTTPS enforcement** by default

## 📊 Monitoring and Analytics

### Vercel Analytics (Optional)

Add Vercel Analytics to track usage:

1. **Enable** in Vercel dashboard
2. **Add** analytics script to `index.html`:
   \`\`\`html
   <script>
     window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
   </script>
   <script defer src="/_vercel/insights/script.js"></script>
   \`\`\`

### Custom Domain (Optional)

1. **Add** custom domain in Vercel dashboard
2. **Configure** DNS records as instructed
3. **SSL certificate** is automatically provisioned

## 🚨 Troubleshooting

### Common Issues

1. **404 errors**: Ensure `vercel.json` routes are configured correctly
2. **CDN caching**: Use Vercel dashboard to purge cache if needed
3. **Build failures**: Check that all files are properly committed to Git

### Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **GitHub Issues**: Report deployment issues in the repository
- **Community**: Join discussions in GitHub Discussions

## 🎯 Production Checklist

Before deploying to production:

- [ ] Test all features locally
- [ ] Verify responsive design on mobile devices
- [ ] Check browser compatibility
- [ ] Test import/export functionality
- [ ] Verify local storage persistence
- [ ] Review security headers
- [ ] Test performance with large datasets
- [ ] Validate accessibility features

## 📈 Post-Deployment

After successful deployment:

1. **Test** all functionality on the live site
2. **Share** the URL with users
3. **Monitor** performance and usage
4. **Collect** feedback for improvements
5. **Plan** future updates and features

---

**Happy Deploying!** 🚀

Your AnkiMate application will be live and accessible to users worldwide!
