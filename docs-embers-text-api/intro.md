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

### 📦 Modpack Creators

Use commands and markup syntax to send animated messages in your modpack — no Java required.

→ **[Get Started](./for-modpack-creators/getting-started.md)**

</div>
<div style={{flex: '1', minWidth: '260px', padding: '1.5rem', border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: '8px'}}>

### 🔧 Mod Developers

Add ETA as a Gradle dependency and use the Java API to send messages, build custom effects, and integrate with your mod.

→ **[Get Started](./for-mod-developers/getting-started.md)**

</div>
</div>

---

## What Can It Do?

- **19 built-in visual effects** — rainbow, gradient, wave, shake, bounce, glitch, neon glow, typewriter, and more
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

## Quick Preview

The fastest way to see ETA in action — run this command in-game (requires operator level 2):

```
/eta test 26
```

This shows a rainbow effect demo. Try IDs 1–33 for a tour of all capabilities.
