---
sidebar_position: 2
---

# Getting Started

This guide will help you get started with Embers Text API, a powerful Minecraft mod library for creating polished, animated text overlays.

## What is Embers Text API?

Embers Text API is a Minecraft mod that enables developers and server administrators to create stunning text overlays with animations, custom fonts, and flexible positioning—all without building a custom renderer. It's the successor to Immersive Messaging API and offers improved performance without heavy Fabric dependencies.

## Installation

### For Players

1. Download the latest version of Embers Text API from:
   - [Modrinth](https://modrinth.com/user/TysonTheEmber)
   - [CurseForge](https://www.curseforge.com/members/tysontheember/projects)
   - [GitHub Releases](https://github.com/TysonTheEmber/EmbersTextAPI)

2. Place the `.jar` file in your Minecraft `mods` folder

3. Restart Minecraft

### For Developers

Add Embers Text API as a dependency to your mod project:

#### Gradle (build.gradle)

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

Replace `FILE_ID` with the latest file ID from the [CurseForge page](https://www.curseforge.com/minecraft/mc-mods/embers-text-api). For example, `7104998` for a specific version.

:::note Version Information
**Current Version:** v1 (Public)
**In Development:** v2 (Beta)

v1 endpoints and features will continue to work but will be deprecated in favor of v2's improved system.
:::

## Quick Start

### Testing the Mod

Once installed, you can test Embers Text API using the built-in test command:

```
/emberstextapi test <id>
```

Replace `<id>` with a number from 1-9 to see different demo effects:

- **1-9**: Various built-in text effects and animations

### Your First Message

Send a basic message to a player:

```
/emberstextapi send @p 100 Hello, World!
```

This displays "Hello, World!" to the nearest player for 100 ticks (5 seconds).

### Adding Fade Effects

Add fade-in and fade-out effects:

```
/emberstextapi send @p 100 20 20 Welcome to the server!
```

- `100`: Duration in ticks
- `20`: Fade-in duration (1 second)
- `20`: Fade-out duration (1 second)

## Key Concepts

### Duration (Ticks)

All durations in Embers Text API are measured in **ticks**. Minecraft runs at 20 ticks per second:

- 20 ticks = 1 second
- 100 ticks = 5 seconds
- 200 ticks = 10 seconds

### Anchors

Anchors determine where your text appears on screen. The screen is divided into 9 positions:

```
TOP_LEFT        TOP_CENTER        TOP_RIGHT
CENTER_LEFT     CENTER_CENTER     CENTER_RIGHT
BOTTOM_LEFT     BOTTOM_CENTER     BOTTOM_RIGHT
```

### Text Alignment

Alignment controls how text is positioned relative to its anchor point:
- **LEFT**: Text extends to the right of the anchor
- **CENTER**: Text is centered on the anchor
- **RIGHT**: Text extends to the left of the anchor

## Next Steps

Now that you have Embers Text API installed and working, explore the following sections:

- [Commands](commands.md) - Learn all available commands
- [Styling & Effects](styling-effects.md) - Create beautiful text with colors, gradients, and animations
- [Developer API](developer-api.md) - Integrate Embers Text API into your mod
- [Examples](examples.md) - See practical examples and use cases

## Version Notes

### v1 (Current)

The current public version provides all core functionality including text styling, animations, and backgrounds. All v1 features are stable and production-ready.

### v2 (In Development)

v2 is currently in development and will introduce major architectural improvements:

**Span-Based Effects:**
- Apply effects to specific text segments instead of whole messages
- Use animations in quest text, item descriptions, chat, and tooltips
- Per-word or per-character styling
- Global styling system usable anywhere in Minecraft

**New Rendering Capabilities:**
- Item rendering inline with text
- Entity rendering in overlays
- Advanced texture rendering and animations
- Multiple simultaneous renders

**Inspired by:** [Snownee's Text Animator mod](https://www.curseforge.com/minecraft/mc-mods/text-animator)

**Deprecation Notice:** When v2 releases, v1 features will continue to work but will be marked as deprecated. The new span-based system represents a significant architectural improvement. See the [Version Migration Guide](version-migration.md) for details.
