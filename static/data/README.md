# Download Counts Data

This directory contains automatically updated download statistics.

## downloads.json

This file is automatically updated every 6 hours by the GitHub Actions workflow (`.github/workflows/update-downloads.yml`).

It contains:
- `modrinth`: Total downloads from all Modrinth projects
- `curseforge`: Total downloads from all CurseForge projects
- `total`: Combined total downloads
- `lastUpdated`: ISO 8601 timestamp of last update
- `projects`: Per-project breakdown keyed by slug (used on the homepage cards)

## Setup

To enable automatic updates, add your CurseForge API key as a GitHub secret:

1. Go to your repository Settings → Secrets and variables → Actions
2. Add a new secret named `CURSEFORGE_API_KEY`
3. Paste your CurseForge API key as the value

The workflow will run automatically every 6 hours, or you can trigger it manually from the Actions tab.
