---
sidebar_position: 2
---

# Getting Started

## Installation

1. Download RemapIDs for your mod loader and Minecraft version
2. Place the `.jar` file in your `mods/` folder
3. Launch the game
4. Create your first remap config file (see below)

:::tip
No other mods are required. RemapIDs has zero dependencies beyond standard mod loader libraries.
:::

## Config Directory

All remap configuration files go in the `config/remapids/remaps/` directory. Every `.json` file in this directory is automatically loaded and processed in alphabetical order.

| Launcher | Typical Path |
|----------|-------------|
| CurseForge | `.minecraft/config/remapids/remaps/` |
| Prism / MultiMC | `instances/<name>/.minecraft/config/remapids/remaps/` |
| Server | `config/remapids/remaps/` (relative to server root) |

---

## Quick Start: Your First Remap

### Step 1: Create the Config Directory

Create the folder `config/remapids/remaps/` inside your game directory if it doesn't already exist.

### Step 2: Create a Remap File

Create a new file called `my-remaps.json` inside the remaps directory:

```json
{
  "remaps": [
    {
      "source": "oldmod:copper_ingot",
      "target": "minecraft:copper_ingot",
      "types": ["item", "block"]
    }
  ]
}
```

This tells RemapIDs to redirect any reference to `oldmod:copper_ingot` to `minecraft:copper_ingot` for both item and block lookups.

### Step 3: Restart or Reload

- For **registry remaps** (block, item, fluid, entity_type): restart the game
- For **reloadable remaps** (tag, recipe, loot_table): run `/reload`

:::note
Registry remaps (block, item, fluid, entity_type) require a full game restart. Reloadable remaps (tag, recipe, loot_table) can be applied with `/reload`.
:::

---

## Config File Format

Each JSON file contains a top-level object with a `remaps` array. Each entry defines a single remap:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `source` | String | Yes | The original namespaced ID to redirect (e.g., `"oldmod:silver_ingot"`) |
| `target` | String | Yes | The destination namespaced ID (e.g., `"minecraft:iron_ingot"`) |
| `types` | String array | No | Which remap types to apply. Empty or omitted = all types |

Valid type values: `block`, `item`, `fluid`, `entity_type`, `tag`, `recipe`, `loot_table`

---

## Next Steps

- [Configuration Reference](configuration.md) — Detailed documentation for every config option
- [Wildcards Guide](guides/wildcards.md) — Remap entire families of IDs with patterns
- [Examples](examples.md) — Real-world modpack migration scenarios
