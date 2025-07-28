# Deployment Guide - GitHub Pages

This site is configured to deploy automatically to GitHub Pages using GitHub Actions.

## How it works

1. **GitHub Actions Workflow**: `.github/workflows/deploy.yml`
   - Triggers on push to `main` branch
   - Builds the static site using `pnpm generate`
   - Deploys to GitHub Pages

2. **Static Site Generation**: 
   - Uses Nuxt's static generation (`pnpm generate`)
   - Generates HTML files for all pages
   - Optimized for GitHub Pages hosting

## Setup Instructions

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. The workflow will automatically deploy when you push to `main`

### 2. Repository Settings

Make sure your repository has these settings:
- **Public repository** (required for free GitHub Pages)
- **GitHub Actions enabled** (should be enabled by default)

### 3. Custom Domain (Optional)

If you want to use a custom domain:
1. Add your domain to **Settings** → **Pages** → **Custom domain**
2. Update your DNS settings to point to GitHub Pages
3. The site will be available at `https://yourdomain.com`

## Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm generate

# Preview the built site
pnpm preview
```

## Build Process

The GitHub Actions workflow:
1. Checks out the code
2. Sets up Node.js and pnpm
3. Installs dependencies
4. Runs `pnpm generate` to build static files
5. Uploads the `.output/public` directory to GitHub Pages

## Troubleshooting

- **Build fails**: Check the Actions tab in your repository for error details
- **Site not updating**: GitHub Pages can take a few minutes to update after deployment
- **404 errors**: Make sure all internal links are correct (we fixed one broken link already)

## Cost

✅ **Completely Free!**
- GitHub Pages: Free for public repositories
- GitHub Actions: 2,000 minutes/month free
- Custom domains: Free
- SSL certificates: Free and automatic 