---
sidebar_position: 1
title: Getting Started
description: What Embers Text API is, how to install it, and your first commands.
---

# Getting Started (Modpack Creators)

Embers Text API lets you display animated, styled text overlays anywhere on a player's screen — no Java coding required. Everything is controlled through in-game commands and a simple markup language.

---

## What Does It Look Like?

When you send a message with ETA, players see on-screen text that can:

- **Cycle through rainbow colors** — each character a different hue, animating over time
- **Glow with a neon halo** — soft luminous rings around letters
- **Shake or vibrate** — great for danger warnings or boss encounters
- **Reveal character by character** — typewriter-style animation with optional sound effects
- **Wave up and down** — smooth flowing motion
- **Fade in and out** — smooth alpha transitions at message start and end
- **Appear anywhere on screen** — center, top, bottom, corners, custom pixel offsets
- **Show item icons or entity models** inline with the text

Messages can play one after another (queues), or multiple messages can appear simultaneously at different screen positions.

---

## Installation

Install ETA like any other mod — drop the JAR for your loader and Minecraft version into your `mods/` folder.

| Minecraft | Loader | Where to Download |
|---|---|---|
| 1.20.1 | Forge | [Modrinth](https://modrinth.com/mod/embers-text-api/versions?g=1.20.1&l=forge) · [CurseForge](https://www.curseforge.com/minecraft/mc-mods/embers-text-api/files/all?page=1&pageSize=20&version=1.20.1&gameVersionTypeId=4&showAlphaFiles=show) |
| 1.20.1 | Fabric | [Modrinth](https://modrinth.com/mod/embers-text-api/versions?g=1.20.1&l=fabric) · [CurseForge](https://www.curseforge.com/minecraft/mc-mods/embers-text-api/files/all?page=1&pageSize=20&version=1.20.1&gameVersionTypeId=4&showAlphaFiles=show) |
| 1.21.1 | NeoForge | [Modrinth](https://modrinth.com/mod/embers-text-api/versions?g=1.21.1&l=neoforge) · [CurseForge](https://www.curseforge.com/minecraft/mc-mods/embers-text-api/files/all?page=1&pageSize=20&version=1.21.1&gameVersionTypeId=4&showAlphaFiles=show) |
| 1.21.1 | Fabric | [Modrinth](https://modrinth.com/mod/embers-text-api/versions?g=1.21.1&l=fabric) · [CurseForge](https://www.curseforge.com/minecraft/mc-mods/embers-text-api/files/all?page=1&pageSize=20&version=1.21.1&gameVersionTypeId=4&showAlphaFiles=show) |

No config file is required. ETA works out of the box.

---

## Your First Commands

All commands use the `/eta` alias (or the full `/emberstextapi`). You need **operator level 2** to use them.

### See what ETA can do

```
/eta test 26
```

This runs test #26 — a rainbow effect demo. Try other numbers (1–33) to see different effects. Test IDs 26–33 are the visual effects showcase.

### Send your first message

```
/eta send @p 100 Hello, world!
```

This sends "Hello, world!" to the nearest player for 100 ticks (5 seconds). It appears at the top-center of the screen.

### Send a styled message

```
/eta send @p 200 <rainbow>Welcome to the server!</rainbow>
```

Same command, but wrapped in `<rainbow>` markup — the text now cycles through colors.

### Send to everyone

```
/eta send @a 160 <neon><bold>Server restart in 2 minutes!</bold></neon>
```

`@a` targets all players. The text gets bold + neon glow.

---

## What's Next?

| I want to... | Go to... |
|---|---|
| Learn all the commands | [Commands](./commands.md) |
| Style text with effects and colors | [Markup Guide](./markup-guide.md) |
| See all 19 effects | [Effects Reference](./effects-reference.md) |
| Position messages on screen | [Layout and Positioning](./layout-and-positioning.md) |
| Create cutscenes and quest sequences | [Message Queues](./message-queues.md) |
| See complete examples | [Basic Examples](./examples/basic-examples.md) |
