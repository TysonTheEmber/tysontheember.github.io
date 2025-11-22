import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'EmberForge',
  tagline: 'Minecraft Mods & Creative Projects by TysonTheEmber',
  favicon: 'img/emberforge-icon.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://tysontheember.dev',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  trailingSlash: true,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'TysonTheEmber', // Usually your GitHub org/user name.
  projectName: 'tysontheember.github.io', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Edit URL removed - users should contribute via GitHub issues/PRs
        },
        blog: false, // Disable blog
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'embers-text-api',
        path: 'docs-embers-text-api',
        routeBasePath: 'embers-text-api',
        sidebarPath: './sidebars-embers.ts',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'aperture-api',
        path: 'docs-aperture-api',
        routeBasePath: 'aperture-api',
        sidebarPath: './sidebars-aperture.ts',
      },
    ],
  ],

  themeConfig: {
    // Algolia search
    algolia: {
      appId: 'S2FTCYM93P',
      apiKey: '75cbcad6c9fc55b748cf24ba5a75fa32',
      indexName: 'dev_Docs',
      contextualSearch: true,
      searchPagePath: 'search',
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'EmberForge',
      logo: {
        alt: 'EmberForge Logo',
        src: 'img/emberforge-icon.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs Home',
        },
        {
          to: '/embers-text-api/intro',
          label: 'Embers Text API',
          position: 'left',
        },
        {
          to: '/aperture-api/intro',
          label: 'Aperture API',
          position: 'left',
        },
        {
          type: 'search',
          position: 'right',
        },
        {
          href: 'https://discord.gg/GCN2Hv4Qzr',
          position: 'right',
          className: 'header-discord-link',
          'aria-label': 'Discord server',
        },
        {
          href: 'https://www.youtube.com/@tysontheember',
          position: 'right',
          className: 'header-youtube-link',
          'aria-label': 'YouTube channel',
        },
        {
          href: 'https://github.com/TysonTheEmber',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Links',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/GCN2Hv4Qzr',
            },
            {
              label: 'YouTube',
              href: 'https://www.youtube.com/@tysontheember',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/TysonTheEmber',
            },
          ],
        },
        {
          title: 'Wikis',
          items: [
            {
              label: 'Embers Text API',
              to: '/embers-text-api/intro',
            },
            {
              label: 'Aperture API',
              to: '/aperture-api/intro',
            },
          ],
        },
        {
          title: 'Mod Platforms',
          items: [
            {
              label: 'Modrinth',
              href: 'https://modrinth.com/user/TysonTheEmber',
            },
            {
              label: 'CurseForge',
              href: 'https://www.curseforge.com/members/tysontheember/projects',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} TysonTheEmber. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.vsDark,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
