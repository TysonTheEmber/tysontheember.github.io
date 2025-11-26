---
sidebar_position: 1
---

# Embers Text API

**Embers Text API** is a powerful Minecraft mod library that enables developers and server administrators to create polished, animated text overlays without building a custom renderer.

## Overview

Embers Text API replaces the legacy Immersive Messaging API and provides a modern, performant solution for displaying cinematic text, quest objectives, boss health bars, dialogue systems, and more—all with zero Fabric overhead dependencies.

Create stunning visual text effects in your Minecraft world with:
- **Dynamic animations** - Typewriter effects, shake animations, and obfuscation with reveal modes
- **Beautiful styling** - Multi-stop gradients, custom fonts, and drop shadows
- **Flexible positioning** - 9 anchor points with pixel-perfect offset control
- **Rich backgrounds** - Tooltip-style backgrounds or custom textured backgrounds
- **Easy integration** - Fluent builder API and comprehensive NBT command support

## Key Features

### Text Styling & Effects
- **Colors & Gradients** - Solid colors or multi-stop gradients across your text
- **Animations** - Typewriter, wave shake, circular shake, random shake (whole-text or per-character)
- **Obfuscation** - Scrambled text with directional reveal modes (left-to-right, center-out, random)
- **Formatting** - Custom fonts, text wrapping, drop shadows, and standard Minecraft formatting

### Backgrounds
- **Tooltip-Style** - Solid backgrounds with optional gradient borders
- **Textured** - Custom texture backgrounds with stretch, crop, or tile modes
- **Configurable** - Adjustable sizing, padding, and positioning

### Display Control
- **9 Screen Anchors** - Position text at corners, edges, or center of screen
- **Alignment** - Independent text alignment (left, center, right)
- **Offsets** - Pixel-perfect positioning with X/Y offsets
- **Fade Effects** - Smooth fade-in and fade-out transitions

### Developer-Friendly
- **Fluent Builder Pattern** - Intuitive API for programmatic message creation
- **Message Management** - Track, update, and close persistent messages
- **Network Integration** - Built-in client-server synchronization
- **NBT Commands** - Full control via commands for testing and scripting

## Use Cases

- **Quest Systems** - Display objectives, updates, and completion messages
- **Boss Fights** - Show boss health bars and dramatic phase transitions
- **Dialogue** - NPC conversations with typewriter effects
- **Achievements** - Minecraft-style achievement notifications
- **Warnings** - Alert players to dangers or important events
- **Cinematics** - Create movie-like text sequences for storytelling
- **HUD Elements** - Persistent status displays and counters
- **Events** - Server announcements and event notifications

## Installation

### For Players

1. Download the latest version from:
   - [Modrinth](https://modrinth.com/mod/embers-text-api)
   - [CurseForge](https://www.curseforge.com/minecraft/mc-mods/embers-text-api)
   - [GitHub](https://github.com/TysonTheEmber/EmbersTextAPI)

2. Place the `.jar` file in your Minecraft `mods` folder

3. Launch Minecraft with Forge 1.20.1

### For Developers

Add Embers Text API to your `build.gradle`:

```gradle
repositories {
    maven {
        url = "https://www.cursemaven.com"
        content {
            includeGroup "curse.maven"
        }
    }
}

dependencies {
    implementation fg.deobf("curse.maven:embers-text-api-1345948:FILE_ID")
}
```

Replace `FILE_ID` with the latest file ID from [CurseForge](https://www.curseforge.com/minecraft/mc-mods/embers-text-api).

## Quick Start

### Test the Mod

Try the built-in demo effects:

```mcfunction
/emberstextapi test 1
```

Run test IDs 1-9 to see different features in action.

### Send Your First Message

```mcfunction
/emberstextapi send @p 100 "Hello, World!"
```

### Create a Styled Message

```mcfunction
/emberstextapi sendcustom @p {
  anchor:"CENTER_CENTER",
  gradient:[0xFF0000,0x0000FF],
  typewriter:2.0f,
  shadow:1b
} 150 "Welcome to the Adventure!"
```

## Documentation

Explore the complete documentation:

- **[Getting Started](getting-started.md)** - Installation and basic concepts
- **[Commands](commands.md)** - Complete command reference with examples
- **[Styling & Effects](styling-effects.md)** - Create beautiful text with colors, gradients, and animations
- **[NBT Configuration](nbt-configuration.md)** - Full NBT tag reference for advanced customization
- **[Developer API](developer-api.md)** - Integrate Embers Text API into your mod
- **[Examples](examples.md)** - Practical examples and use cases
- **[Version Migration](version-migration.md)** - Understanding v1 vs v2 and preparing for updates

## Version Information

**Current Version:** v1 (Stable, Production Ready)

**In Development:** v2 (Beta)

v1 is the current public version and provides all core functionality for overlay-based text rendering. v2 is in development and will introduce a major architectural shift to **span-based effects**, enabling animations and styling to be used anywhere in Minecraft (quest text, item descriptions, chat, tooltips) rather than just overlays. v2 will also add item/entity/texture rendering capabilities and support for multiple simultaneous renders.

When v2 releases, v1 features will continue to work through a compatibility layer but will be marked as deprecated. See the [Version Migration Guide](version-migration.md) for details.

**v2 Inspiration:** [Snownee's Text Animator mod](https://www.curseforge.com/minecraft/mc-mods/text-animator)

## Support & Community

- **Bug Reports:** [GitHub Issues](https://github.com/TysonTheEmber/EmbersTextAPI/issues)
- **Feature Requests:** [GitHub Issues](https://github.com/TysonTheEmber/EmbersTextAPI/issues)
- **Source Code:** [GitHub Repository](https://github.com/TysonTheEmber/EmbersTextAPI)

## License & Credits

Embers Text API is developed by [TysonTheEmber](https://github.com/TysonTheEmber).

---

Ready to create stunning text overlays? Start with the [Getting Started Guide](getting-started.md)!
