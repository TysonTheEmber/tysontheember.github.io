import React from 'react';
import type {ReactNode} from 'react';

export type Project = {
  id: string;
  title: string;
  image: string;
  description: ReactNode;
  game: 'minecraft' | 'other';
  tags: string[];
  link?: string;
  buttonLabel?: string;
  curseforgeSlug?: string;
  modrinthSlug?: string;
};

export const projects: Project[] = [
  {
    id: 'embers-text-api',
    title: 'Embers Text API',
    image: require('@site/static/img/embers-text-api-icon.png').default,
    description: (
      <>
        Create stunning animated in-game overlays, banners, and cinematic text messaging
        with full control over styling, positioning, and animations. With more to come!
      </>
    ),
    game: 'minecraft',
    tags: ['API', 'Library', 'Cinematic', 'UI'],
    link: '/embers-text-api/intro',
    curseforgeSlug: 'embers-text-api',
    modrinthSlug: 'embers-text-api',
  },
  {
    id: 'aperture-api',
    title: 'Aperture API',
    image: require('@site/static/img/aperture-api-icon.png').default,
    description: (
      <>
        Professional cinematic camera tooling for Minecraft Forge with in-game editing,
        smooth camera paths, and export capabilities for use in your videos.
      </>
    ),
    game: 'minecraft',
    tags: ['API', 'Cinematic', 'Camera'],
    link: '/aperture-api/intro',
    curseforgeSlug: 'aperture-api',
    modrinthSlug: 'aperture-api',
  },
  {
    id: 'orbital-railgun-reforged',
    title: 'Orbital Railgun Reforged',
    image: require('@site/static/img/orbital-railgun-icon.png').default,
    description: (
      <>
        A powerful weapon mod bringing devastating orbital strikes to Minecraft.
        Unleash precision firepower from the skies with advanced targeting systems.
      </>
    ),
    game: 'minecraft',
    tags: ['Weapons', 'Technology', 'Combat'],
    link: '/orbital-railgun/config',
    buttonLabel: 'Config Guide',
    curseforgeSlug: 'orbital-railgun-reforged',
  },
  {
    id: 'spelunkery-plus',
    title: 'Spelunkery Plus',
    image: require('@site/static/img/spelunkery-plus-icon.png').default,
    description: (
      <>
        Enhance your caving experience with new blocks, items, and mechanics designed
        to make underground exploration more rewarding and exciting.
      </>
    ),
    game: 'minecraft',
    tags: ['Exploration', 'Caves', 'Content'],
    curseforgeSlug: 'spelunkery-plus',
  },
  {
    id: 'embercraft-rekindled',
    title: 'EmberCraft Rekindled',
    image: require('@site/static/img/emberforge-icon.svg').default,
    description: (
      <>
        A magical mod focused on ember-based mechanics and fire-themed content.
        Harness the power of embers to craft powerful tools and items.
      </>
    ),
    game: 'minecraft',
    tags: ['Magic', 'Technology', 'Content'],
    curseforgeSlug: 'embercraft-rekindled',
  },
  {
    id: 'project-ember-embercraft',
    title: 'Project Ember: EmberCraft',
    image: require('@site/static/img/emberforge-icon.svg').default,
    description: (
      <>
        The original ember-based technology mod bringing automation and unique
        mechanics to your Minecraft world.
      </>
    ),
    game: 'minecraft',
    tags: ['Magic', 'Technology', 'Automation'],
    curseforgeSlug: 'project-ember-embercraft',
  },
  {
    id: 'explodee',
    title: 'Explodee',
    image: require('@site/static/img/emberforge-icon.svg').default,
    description: (
      <>
        Explosive enhancements for Minecraft! Add variety and control to your
        explosive adventures with new explosion types and mechanics.
      </>
    ),
    game: 'minecraft',
    tags: ['Explosives', 'Combat', 'Utility'],
    curseforgeSlug: 'explodee',
    modrinthSlug: 'explodee',
  },
  {
    id: 'echoes-of-battle',
    title: 'Echoes of Battle',
    image: require('@site/static/img/emberforge-icon.svg').default,
    description: (
      <>
        Epic combat enhancements bringing new weapons, armor, and battle mechanics
        to transform your Minecraft combat experience.
      </>
    ),
    game: 'minecraft',
    tags: ['Combat', 'Weapons', 'Content'],
    curseforgeSlug: 'echoes-of-battle',
  },
  {
    id: 'infernumrpg',
    title: 'InfernumRPG',
    image: require('@site/static/img/emberforge-icon.svg').default,
    description: (
      <>
        A comprehensive RPG mod adding character progression, skills, and
        role-playing elements to Minecraft.
      </>
    ),
    game: 'minecraft',
    tags: ['RPG', 'Progression', 'Skills'],
    curseforgeSlug: 'infernumrpg',
  },
  {
    id: 'particle-interactions-reforged',
    title: 'Particle Interactions Reforged',
    image: require('@site/static/img/emberforge-icon.svg').default,
    description: (
      <>
        Enhance your world with interactive particle effects that respond to
        player actions and environmental changes.
      </>
    ),
    game: 'minecraft',
    tags: ['Visual', 'Effects', 'Utility'],
    curseforgeSlug: 'particle-interactions-reforged',
  },
  {
    id: 'resistance-formulation',
    title: 'Resistance Formulation',
    image: require('@site/static/img/emberforge-icon.svg').default,
    description: (
      <>
        Advanced potion and brewing mechanics allowing for custom resistance
        effects and alchemical combinations.
      </>
    ),
    game: 'minecraft',
    tags: ['Alchemy', 'Potions', 'Utility'],
    curseforgeSlug: 'resistance-formulation',
  },
];

// Extract unique games and tags for filtering
export const games = Array.from(new Set(projects.map(p => p.game))).sort();

export const allTags = Array.from(
  new Set(projects.flatMap(p => p.tags))
).sort();
