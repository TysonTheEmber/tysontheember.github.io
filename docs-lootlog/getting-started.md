---
sidebar_position: 2
---

# Getting Started

## Installation

1. Download Loot Log for your mod loader and Minecraft version
2. Place the `.jar` file in your `mods/` folder
3. Launch the game

On first launch, Loot Log generates default configuration and an example override file in the `lootlog` config directory.

:::tip
No other mods are required. YACL is optional but recommended — when installed, it provides a full in-game configuration GUI accessible from the mod list or pause menu.
:::

## Config Location

| Launcher | Typical Path |
|----------|-------------|
| CurseForge | `.minecraft/config/lootlog/` |
| Prism / MultiMC | `instances/<name>/.minecraft/config/lootlog/` |
| Server | Not applicable — Loot Log is client-side only |

### Default Files

After first launch, the following are generated:

| File / Directory | Purpose |
|-----------------|---------|
| `config/lootlog.toml` (Forge) or config JSON | Main configuration file with all settings |
| `config/lootlog/overrides/` | Directory for JSON override files |
| `config/lootlog/overrides/_example.json` | Example override file with documentation (skipped at load time) |

:::note
Files starting with `_` in the overrides directory are ignored during loading. The `_example.json` file is for reference only — rename it or create a new file to activate overrides.
:::

---

## Quick Start: Customize Your HUD

Here's how to change basic HUD settings in three steps:

### Step 1: Open the Config

If YACL is installed, open the config GUI from the mod list or pause menu. Otherwise, edit the config file directly.

### Step 2: Adjust Position and Style

Key settings to try first:

| Setting | Default | Description |
|---------|---------|-------------|
| `anchor` | `BOTTOM_RIGHT` | Screen corner: `TOP_LEFT`, `TOP_RIGHT`, `BOTTOM_LEFT`, `BOTTOM_RIGHT` |
| `xOffset` | `5` | Horizontal distance from screen edge (0-500) |
| `yOffset` | `5` | Vertical distance from screen edge (0-500) |
| `backgroundStyle` | `BANNER` | Background type: `NONE`, `SOLID`, `TOOLTIP`, `TEXTURE`, `BANNER`, `FLAT` |
| `displayDurationMs` | `5000` | How long each entry stays visible (500-30000 ms) |
| `scale` | `1.0` | HUD scaling factor (0.25-4.0) |

### Step 3: Save and Reload

If using the YACL GUI, changes apply immediately. If editing files, run `/lootlog reload` in-game or restart the client.

---

## Quick Start: Your First Override

Create a custom notification for diamonds with a special sound:

### Step 1: Create an Override File

Create a new file at `config/lootlog/overrides/diamonds.json`:

```json
{
  "overrides": [
    {
      "match": { "type": "item", "id": "minecraft:diamond" },
      "sound": { "soundId": "minecraft:entity.player.levelup", "volume": 0.6, "pitch": 1.5 },
      "display": { "durationMs": 8000 }
    }
  ]
}
```

This makes diamond pickups play a level-up sound and stay on screen for 8 seconds.

### Step 2: Reload

Run `/lootlog reload` in-game to load the new override file.

:::tip
For more override options — custom text, backgrounds, visual effects, and priority — see the [Overrides Guide](guides/overrides.md).
:::
