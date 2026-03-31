---
sidebar_position: 1
---

# Better Harvest Level

Better Harvest Level (BHL) is a config-driven tool progression mod for modpack developers. Define custom mining tiers, override block harvest requirements, assign tool tiers, and create equivalence groups — all through JSON config files with zero code.

## Key Features

| Feature | Description |
|---------|-------------|
| **Custom Tiers** | Define unlimited tiers beyond vanilla with configurable names, colors, icons, and levels |
| **Block Overrides** | Set mining level requirements for any block by ID, tag, mod namespace, or regex pattern |
| **Tool Overrides** | Assign tool tiers by item ID, tag, mod namespace, or regex pattern |
| **Tier Equivalences** | Group tiers together so tools from one tier can mine blocks requiring another |
| **Layered Config Files** | Organize overrides per-mod with `blocks_<modname>.json` and `tools_<modname>.json` files |
| **Jade Integration** | Automatically displays tier info in Jade tooltips when Jade is installed |
| **In-Game Commands** | Check tiers, view info, and hot-reload config with `/bhl` commands |

## Supported Platforms

| Loader | Minecraft Version | Status |
|--------|-------------------|--------|
| Forge | 1.20.1 | Supported |
| Fabric | 1.20.1 | Supported |
| Fabric | 1.21.1 | Supported |
| NeoForge | 1.21.1 | Supported |

## How It Works

BHL operates through three stages:

1. **Config loading** — On server start, BHL reads JSON config files from `config/betterharvestlevel/` and registers all tier definitions, block overrides, tool overrides, and equivalence groups
2. **Override resolution** — Override targets (tags, mod namespaces, regex patterns) are expanded against the game's registries to resolve specific block and item IDs
3. **Runtime enforcement** — Mixins intercept `ItemStack.getDestroySpeed()`, `ItemStack.isCorrectToolForDrops()`, and `Player.hasCorrectToolForDrops()` to enforce tier requirements at mining time

When a tool's tier level is lower than a block's required tier, mining speed is reduced by 10x and the block will not drop items — matching vanilla harvest level behavior.
