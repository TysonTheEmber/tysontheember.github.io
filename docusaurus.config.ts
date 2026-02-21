import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const curseForgeApiKey = process.env.CURSEFORGE_API_KEY ?? process.env.CF_API_KEY ?? '';
// Public author id can be baked in; env overrides if provided
const curseForgeAuthorId =
  process.env.CURSEFORGE_AUTHOR_ID ??
  process.env.CF_AUTHOR_ID ??
  process.env.CURSEFORGE_MEMBER_ID ??
  process.env.CF_MEMBER_ID ??
  '103107110';

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

  customFields: {
    curseForgeApiKey,
    curseForgeAuthorId: Number(curseForgeAuthorId),
  },

  presets: [
    [
      'classic',
      {
        docs: false, // Disable main docs
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
        id: 'embers-text-api-legacy',
        path: 'docs-embers-text-api-legacy',
        routeBasePath: 'embers-text-api-legacy',
        sidebarPath: './sidebars-embers-legacy.ts',
      },
    ],
  ],

  themeConfig: {
    // Algolia search
    algolia: {
      appId: 'S2FTCYM93P',
      apiKey: '93791c27131499c512943e864ef6cf39',
      indexName: 'dev_Docs',
      contextualSearch: false,
      searchPagePath: 'search',
      translations: {
        button: {
          buttonText: 'Search the docs',
          buttonAriaLabel: 'Search the docs',
        },
      },
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'EmberForge',
      logo: {
        alt: 'EmberForge Logo',
        src: 'img/emberforge-icon.svg',
      },
      items: [
        {
          to: '/projects',
          label: 'Projects',
          position: 'left',
        },
        {
          type: 'dropdown',
          label: 'Documentation',
          position: 'left',
          items: [
            {
              type: 'docSidebar',
              sidebarId: 'embersSidebar',
              docsPluginId: 'embers-text-api',
              label: 'Embers Text API v2',
            },
            {
              type: 'docSidebar',
              sidebarId: 'embersSidebarLegacy',
              docsPluginId: 'embers-text-api-legacy',
              label: 'Embers Text API (Legacy)',
            },
            {
              to: '/orbital-railgun/config',
              label: 'Orbital Railgun Config',
            },
          ],
        },
        {
          type: 'search',
          position: 'right',
        },
      ],
    },
    footer: {
      links: [
        {
          title: 'Navigation',
          items: [
            {
              label: 'Home',
              to: '/',
            },
            {
              label: 'Projects',
              to: '/projects',
            },
            {
              label: 'Search Documentation',
              to: '/search',
            },
          ],
        },
        {
          title: 'Documentation',
          items: [
            {
              label: 'Embers Text API v2',
              to: '/embers-text-api/intro',
            },
            {
              label: 'Embers Text API (Legacy)',
              to: '/embers-text-api-legacy/intro',
            },
            {
              label: 'Orbital Railgun Config',
              to: '/orbital-railgun/config',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord Server',
              href: 'https://discord.gg/GCN2Hv4Qzr',
            },
            {
              label: 'YouTube Channel',
              href: 'https://www.youtube.com/@tysontheember',
            },
            {
              label: 'GitHub Profile',
              href: 'https://github.com/TysonTheEmber',
            },
          ],
        },
        {
          title: 'Download Mods',
          items: [
            {
              label: 'Modrinth Profile',
              href: 'https://modrinth.com/user/TysonTheEmber',
            },
            {
              label: 'CurseForge Profile',
              href: 'https://www.curseforge.com/members/tysontheember/projects',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} TysonTheEmber`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.vsDark,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
