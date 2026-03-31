---
sidebar_position: 0
title: Introduction
description: Embers Text API — rich, animated on-screen text messages for Minecraft. Choose your path.
---

# Embers Text API

**Embers Text API** lets you display animated, styled text overlays anywhere on a player's screen — effects like rainbow color cycles, glowing neon halos, typewriter reveals, screen-shake text, and more. Messages can be positioned anywhere on screen, faded in and out, queued in sequences, and triggered from commands or Java code.

---

## Choose Your Path

<div className="row" style={{marginTop: '1.5rem', gap: '1rem', display: 'flex', flexWrap: 'wrap'}}>
<div style={{flex: '1', minWidth: '260px', padding: '1.5rem', border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: '8px'}}>

### 📦 Getting Started

Use commands and markup syntax to send animated messages — no Java required.

→ **[Get Started](./getting-started.md)**

</div>
<div style={{flex: '1', minWidth: '260px', padding: '1.5rem', border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: '8px'}}>

### 🔧 Java API

Add ETA as a Gradle dependency and use the Java API to send messages, build custom effects, and integrate with your mod.

→ **[Get Started](./java-api/getting-started.md)**

</div>
<div style={{flex: '1', minWidth: '260px', padding: '1.5rem', border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: '8px'}}>

### 📖 Guides

Markup syntax, effects reference, layout, custom fonts, queues, presets, and configuration.

→ **[Browse Guides](./guides/markup-guide.md)**

</div>
</div>

---

## What Can It Do?

- **19 built-in visual effects** — rainbow, gradient, wave, shake, bounce, glitch, neon glow, typewriter, and more
- **5 bundled SDF fonts** — Norse, Metamorphous, Cinzel, Almendra, Cardo — usable by short name in markup
- **Markup language** — XML-style tags for declarative styling in commands and config
- **Screen positioning** — 9 anchor positions, pixel offsets, scale control, backgrounds
- **Message queues** — ordered sequences that play step-by-step on named channels
- **Inline items and entities** — Minecraft item icons and entity models inside text
- **Works everywhere** — Forge, NeoForge, and Fabric on MC 1.20.1 and 1.21.1

---

## Version Compatibility

| Minecraft | Loader | Java | Status |
|---|---|---|---|
| 1.20.1 | Forge 47.4.0 | 17+ | Fully supported |
| 1.20.1 | Fabric | 17+ | Fully supported |
| 1.21.1 | NeoForge | 21+ | Fully supported |
| 1.21.1 | Fabric | 21+ | Fully supported |

---

## Licence

Embers Text API is distributed under **[Ember's Modding Licence (EML) v1.2](/modding-licence)**.

If you are building modpacks, distributing bundles, creating forks, or planning commercial use, read the licence terms before distribution.

---

## Quick Preview

The fastest way to see ETA in action — run this command in-game (requires operator level 2):

```
/eta test 26
```

This shows a rainbow effect demo. Try IDs 1–33 for a tour of all capabilities.
