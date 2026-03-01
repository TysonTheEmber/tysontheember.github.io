import React from 'react';
import type {ReactNode} from 'react';

export type Project = {
  id: string;
  title: string;
  image: string;
  description: ReactNode;
  type: ProjectType;
  tags: string[];
  link?: string;
  buttonLabel?: string;
  curseforgeSlug?: string;
  modrinthSlug?: string;
};

export type ProjectType = 'mod' | 'modpack' | 'other';

export const allProjectTypes: ProjectType[] = ['mod', 'modpack', 'other'];

export const projects: Project[] = [
  {
    id: 'embers-text-api',
    title: 'Embers Text API',
    image: require('@site/static/img/embers-text-api-icon.png').default,
    description: (
      <>
        Send cinematic animated text overlays to players with 19+ effects — typewriter,
        rainbow, neon glow, shake, wave, fade, and more. Fully controllable via commands
        or a clean Java API. No Java required for modpack creators.
      </>
    ),
    type: 'other',
    tags: ['API', 'Visual', 'Utility'],
    link: '/embers-text-api/intro',
    curseforgeSlug: 'embers-text-api',
    modrinthSlug: 'embers-text-api',
  },
  {
    id: 'orbital-railgun-reforged',
    title: 'Orbital Railgun Reforged',
    image: require('@site/static/img/orbital-railgun-icon.png').default,
    description: (
      <>
        Call down a beam from the heavens and obliterate your foes.
        A weapon mod that brings orbital railgun firepower to Minecraft: aim, charge,
        and watch it burn from above. Highly configurable with a in depth config.
      </>
    ),
    type: 'mod',
    tags: ['Combat', 'Visual', 'Items'],
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
    type: 'mod',
    tags: ['Exploration', 'Items'],
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
    type: 'mod',
    tags: ['Visual'],
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
    type: 'mod',
    tags: ['Utility', 'Items'],
    curseforgeSlug: 'resistance-formulation',
  },
];

// Extract unique tags for filtering
export const allTags = Array.from(
  new Set(projects.flatMap(p => p.tags))
).sort();
