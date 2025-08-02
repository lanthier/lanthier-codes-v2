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

## Build Process

The GitHub Actions workflow:
1. Checks out the code
2. Sets up Node.js and pnpm
3. Installs dependencies
4. Runs `pnpm generate` to build static files
5. Uploads the `.output/public` directory to GitHub Pages
