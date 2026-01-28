---
sidebar_position: 2
title: Feature Overview
description: A summary of every major feature in Embers Text API v2.
---

# Feature Overview

This page gives a high-level tour of every major capability in Embers Text API. Each feature is described in plain terms, with links to deeper documentation where relevant.

---

## Immersive Messages

Immersive Messages are on-screen text displays that float in the player's viewport. They are not part of chat, the HUD, or any specific GUI — they render directly over the game world.

**What you can do with them:**

- Position them anywhere on screen (top, center, bottom, left, right, or any combination).
- Add a semi-transparent colored background behind the text.
- Apply fade-in and fade-out animations.
- Use typewriter reveal animations.
- Set a duration (in game ticks) so the message disappears automatically.
- Send them from the server to any specific player.

---

## Text Effects

Text effects are visual transformations applied to characters as they are rendered. They are the core of what makes Embers Text API visually distinct.

Effects are divided into three categories:

### Color Effects
These change how text is colored over time or across characters.

| Effect | What It Does |
|---|---|
| **Rainbow** | Cycles through the full color spectrum. Each character is offset in phase, creating a smooth rainbow wave. |
| **Gradient** | Smoothly transitions between two colors across the length of the text. Supports animated (shifting) gradients and both RGB and HSV color spaces. |
| **Pulse** | Makes text brightness pulse up and down rhythmically, like a heartbeat. |
| **Fade** | Oscillates text transparency between visible and semi-transparent. |

### Motion Effects
These move characters around their original positions.

| Effect | What It Does |
|---|---|
| **Wave** | Characters bob up and down in a sinusoidal wave pattern. |
| **Shake** | Random jittery displacement — text vibrates in place. |
| **Bounce** | Characters hop up with realistic bounce-out physics (multiple diminishing bounces). |
| **Circle** | Characters orbit in a circular path around their original position. |
| **Wiggle** | Each character wiggles in a direction determined by the character itself, creating organic motion. |
| **Pendulum** | Characters swing back and forth like a pendulum, with optional arc movement. |
| **Swing** | Characters rotate back and forth around their center. |
| **Scroll** | Text scrolls continuously from right to left (marquee style). |
| **Turbulence** | Characters drift organically using dual-frequency noise, like wind blowing through text. |

### Special Effects
These combine multiple visual layers for complex visuals.

| Effect | What It Does |
|---|---|
| **Glitch** | Digital distortion with horizontal slice displacement, position jitter, alpha blinks, and optional chromatic aberration (RGB color fringing). |
| **Neon** | Multi-ring glow effect with configurable radius, intensity, quality, and optional pulse animation. |
| **Shadow** | Custom drop shadow with configurable color, offset, and transparency. |

### Animation Effects
These control how text is revealed or hidden over time.

| Effect | What It Does |
|---|---|
| **Typewriter** | Reveals characters one at a time, left to right. Supports custom speed, sounds, looping, and reset delays. |
| **Obfuscate** | Shows text as random glyphs, then progressively reveals the real characters. Supports multiple reveal directions (left, right, center, edges, random) and multiple modes (reveal, hide, constant, random flicker). |

---

## Markup Parser

The Markup Parser lets you style text using XML-like tags directly in strings. This is the primary way non-developers interact with the effect system.

**Example:**

```
<rainbow>This text cycles through colors!</rainbow>
<bold><color value=#FF0000>Bold red text</color></bold>
<wave a=2.0>These characters wave up and down</wave>
```

Tags can be nested, combined, and given parameters. See the [Markup Syntax Reference](../api-reference/markup-syntax.md) for the full list.

---

## Inline Items and Entities

Text spans can contain rendered Minecraft item icons or entity models inline with the text.

```
You found <item id=minecraft:diamond count=3/> x3 Diamonds!
Look at this <entity id=minecraft:creeper scale=0.5/>
```

Items render at the size of a text line. Entity models render at a configurable scale with rotation, lighting, and animation controls.

---

## Effect Presets

Presets are reusable bundles of effects and styles defined in JSON files. Once a preset is registered, it becomes available as a markup tag.

**Built-in presets:**

| Preset Tag | Effects | Style |
|---|---|---|
| `<epic>` | Pulse (fast) + Wave | Bold, italic, purple |
| `<legendary>` | Rainbow (fast) + Neon glow | Bold, gold |
| `<spooky>` | Shake (gentle) + Fade | Italic, dark purple |

---

## Effect Composition

Multiple effects can be applied to the same text simultaneously. They are processed in order, and each effect modifies the rendering state left by the previous one.

**Example — Rainbow wave with a glow:**

```
<neon r=2><rainbow>Glowing Rainbow!</rainbow></neon>
```

This applies the rainbow color first, then the neon glow wraps around it. The result is a rainbow-colored neon glow.

---

## Positioning and Layout

Messages can be anchored to any of 9 screen positions:

| Anchor | Screen Location |
|---|---|
| `TOP_LEFT` | Upper-left corner |
| `TOP_CENTER` | Top center (default) |
| `TOP_RIGHT` | Upper-right corner |
| `CENTER_LEFT` | Middle left |
| `CENTER_CENTER` | Dead center |
| `CENTER_RIGHT` | Middle right |
| `BOTTOM_LEFT` | Lower-left corner |
| `BOTTOM_CENTER` | Bottom center |
| `BOTTOM_RIGHT` | Lower-right corner |

You can also apply pixel offsets (`x`, `y`) to fine-tune placement, and scale the entire message up or down.
