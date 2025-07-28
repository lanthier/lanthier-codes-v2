---
navigation:
  title: Home
---

# Contributing to Alex Lanthier's Portfolio

Thank you for your interest in contributing to my portfolio website!

## About This Site

This is my personal portfolio website built with:
- [Nuxt 3](https://nuxt.com) - Vue.js framework
- [Nuxt Content](https://content.nuxt.com) - Content management
- [TailwindCSS](https://tailwindcss.com) - Styling
- [Iconify](https://iconify.design) - Icons

## Development

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd lanthier-codes-v2

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Project Structure

- `content/` - Markdown blog posts and pages
- `app/components/` - Vue components
- `app/layouts/` - Page layouts
- `public/` - Static assets

### Adding Content

1. Create new Markdown files in `content/` for blog posts
2. Use front-matter for metadata (title, description, etc.)
3. Support for Vue components in Markdown
4. Automatic navigation generation

### Styling

- Uses TailwindCSS for styling
- Dark/light mode support
- Responsive design
- Custom components in `app/components/`

## Deployment

The site is configured for static deployment and can be deployed to:
- Vercel
- Netlify  
- GitHub Pages
- Any static hosting service

## License

This project is licensed under the MIT License.
