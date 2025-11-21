# EmbeForge Website

Official website for EmbeForge - Minecraft mods and creative projects by TysonTheEmber.

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Features

- 📚 Separate wikis for each EmbeForge project
- 🎨 Custom branding and theming
- 🔍 Built-in search functionality
- 🌓 Dark/light mode support
- 📦 Version management for documentation

## Local Development

### Prerequisites

- Node.js 20.0 or higher
- npm (comes with Node.js)

### Installation

```bash
npm install
```

### Start Development Server

```bash
npm start
```

This command starts a local development server and opens up a browser window at `http://localhost:3000/website/`. Most changes are reflected live without having to restart the server.

### Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Test Build Locally

```bash
npm run serve
```

This command serves the built website locally for testing.

## Deployment

This site is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Automatic Deployment (Recommended)

1. Push your changes to the `main` branch
2. GitHub Actions will automatically build and deploy your site
3. Your site will be available at `https://tysontheember.github.io/website/`

### GitHub Pages Setup

To enable GitHub Pages deployment:

1. Go to your repository settings
2. Navigate to "Pages" section
3. Under "Build and deployment":
   - Source: **GitHub Actions**
4. Push to main branch to trigger deployment

### Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
GIT_USER=TysonTheEmber npm run deploy
```

This builds the website and pushes to the `gh-pages` branch.

## Project Structure

```
├── docs/                      # Main documentation (overview)
├── docs-embers-text-api/      # Embers Text API wiki
├── docs-aperture-api/         # Aperture API wiki
├── docs-spelunkery-plus/      # Spelunkery+ wiki
├── src/
│   ├── components/            # React components
│   ├── css/                   # Custom CSS
│   └── pages/                 # Custom pages (homepage, etc.)
├── static/                    # Static assets (images, etc.)
├── docusaurus.config.ts       # Site configuration
├── sidebars.ts                # Main sidebar configuration
├── sidebars-embers.ts         # Embers Text API sidebar
├── sidebars-aperture.ts       # Aperture API sidebar
└── sidebars-spelunkery.ts     # Spelunkery+ sidebar
```

## Adding Content

### Add Documentation to a Mod Wiki

Add markdown files to the appropriate wiki directory:
- `docs-embers-text-api/` for Embers Text API
- `docs-aperture-api/` for Aperture API
- `docs-spelunkery-plus/` for Spelunkery+

The sidebar will automatically update based on the file structure.

### Add a New Project Wiki

1. Create a new `docs-project-name/` directory
2. Add an `intro.md` file
3. Create a `sidebars-project.ts` file
4. Add a plugin configuration in `docusaurus.config.ts`
5. Update the navbar to include a link to the new wiki

## Configuration

- Site metadata: [docusaurus.config.ts](docusaurus.config.ts)
- Sidebar structure: [sidebars.ts](sidebars.ts)
- Homepage: [src/pages/index.tsx](src/pages/index.tsx)

## Links

- **Live Site**: https://tysontheember.github.io/website/
- **Documentation**: https://docusaurus.io/
- **GitHub**: https://github.com/TysonTheEmber

## License

Copyright © 2025 TysonTheEmber. All rights reserved.
