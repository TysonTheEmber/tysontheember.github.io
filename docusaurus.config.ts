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
  url: 'https://tysontheember.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/website/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'TysonTheEmber', // Usually your GitHub org/user name.
  projectName: 'website', // Usually your repo name.

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
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'spelunkery-plus',
        path: 'docs-spelunkery-plus',
        routeBasePath: 'spelunkery-plus',
        sidebarPath: './sidebars-spelunkery.ts',
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
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
          label: 'Home',
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
          to: '/spelunkery-plus/intro',
          label: 'Spelunkery+',
          position: 'left',
        },
        {
          href: 'https://github.com/TysonTheEmber',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Projects',
          items: [
            {
              label: 'Documentation',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Links',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/TysonTheEmber',
            },
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
            {
              label: 'Spelunkery+',
              to: '/spelunkery-plus/intro',
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
