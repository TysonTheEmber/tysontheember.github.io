import React from 'react';
import type {ReactNode} from 'react';

export type Project = {
  id: string;
  title: string;
  image: string;
  description: ReactNode;
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
    tags: ['Minecraft', 'API', 'Cinematic', 'UI'],
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
    tags: ['Minecraft', 'API', 'Cinematic'],
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
    tags: ['Minecraft', 'Mod', 'Combat', 'Technology'],
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
    tags: ['Minecraft', 'Mod', 'Exploration', 'Content'],
    curseforgeSlug: 'spelunkery-plus',
  },
  {
    id: 'particle-interactions-reforged',
    title: 'Particle Interactions Reforged',
    image: require('@site/static/img/particle-interactions-reforged-icon.png').default,
    description: (
      <>
        Enhance your world with interactive particle effects that respond to
        player actions and environmental changes.
      </>
    ),
    tags: ['Minecraft', 'Mod', 'QOL', 'Visual'],
    curseforgeSlug: 'particle-interactions-reforged',
  },
  {
    id: 'resistance-formulation',
    title: 'Resistance Formulation',
    image: require('@site/static/img/resistance-formulation-icon.png').default,
    description: (
      <>
        Advanced potion and brewing mechanics allowing for custom resistance
        effects and alchemical combinations.
      </>
    ),
    tags: ['Minecraft', 'Mod', 'QOL', 'Magic'],
    curseforgeSlug: 'resistance-formulation',
  },
];

// Extract unique tags for filtering
export const allTags = Array.from(
  new Set(projects.flatMap(p => p.tags))
).sort();
