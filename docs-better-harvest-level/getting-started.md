---
sidebar_position: 2
---

# Getting Started

## Installation

1. Download Better Harvest Level for your mod loader and Minecraft version
2. Place the `.jar` file in your `mods/` folder
3. Launch the game

On first launch, BHL automatically generates default config files in the `betterharvestlevel` config directory.

:::tip
No other mods are required. BHL has zero dependencies. Jade integration activates automatically if Jade is present.
:::

## Config Directory

All config files are located in the `betterharvestlevel` folder inside the game's config directory:

| Launcher | Typical Path |
|----------|-------------|
| CurseForge | `.minecraft/config/betterharvestlevel/` |
| Prism / MultiMC | `instances/<name>/.minecraft/config/betterharvestlevel/` |
| Server | `config/betterharvestlevel/` (relative to server root) |

### Default Files

After first launch, the following files are generated:

| File | Purpose |
|------|---------|
| `tiers.json` | Tier definitions (vanilla tiers are pre-configured) |
| `blocks.json` | Block mining level overrides |
| `tools.json` | Tool tier assignments |
| `equivalences.json` | Tier equivalence group definitions |

---

## Quick Start: Require Diamond for Obsidian

Here's how to set a block's required mining tier in three steps:

### Step 1: Open the Block Overrides File

Open `config/betterharvestlevel/blocks.json` in a text editor.

### Step 2: Add an Override

Add an entry to the `overrides` array:

```json
{
  "configVersion": 1,
  "overrides": [
    {
      "target": "minecraft:obsidian",
      "type": "block",
      "requiredTier": "diamond"
    }
  ]
}
```

This tells BHL that mining obsidian requires at least a diamond-tier tool.

### Step 3: Reload

Either restart the game or run `/bhl reload` in-game (requires permission level 2).

:::note
`/bhl reload` hot-reloads all config files without restarting. Changes to tier definitions on Forge/NeoForge may require a full restart due to tier sorting registry constraints.
:::

---

## Quick Start: Override an Entire Mod

You can set a blanket tier requirement for all blocks from a mod using the `mod` override type:

```json
{
  "configVersion": 1,
  "overrides": [
    {
      "target": "create",
      "type": "mod",
      "requiredTier": "iron"
    }
  ]
}
```

This requires at least an iron-tier tool to mine any block from the Create mod.

:::tip
For better organization, save mod-specific overrides in a separate file like `blocks_create.json`. BHL automatically loads all `blocks_*.json` files. See [Layered Configs](guides/layered-configs.md) for details.
:::
