---
sidebar_position: 1
---

# RemapIDs

RemapIDs is a data-driven registry remap and alias system for modpack developers. Define JSON mappings that redirect item, block, entity, fluid, tag, recipe, and loot table IDs to alternative IDs at runtime — enabling seamless world migration when mods are removed, replaced, or reorganized.

## Key Features

| Feature | Description |
|---------|-------------|
| **Wildcard Expansion** | Use `*` patterns to remap entire families of IDs in a single entry |
| **Type Filtering** | Optionally limit which remap types (block, item, recipe, etc.) a mapping applies to |
| **Chain Flattening** | Automatically resolves multi-step chains (A→B, B→C becomes A→C) |
| **Circular Detection** | Rejects circular mappings with clear error logging |
| **Tag Remapping** | Redirect tag references with the `#` prefix, including tag-to-item conversion |
| **Numerical ID Support** | Use pre-1.13 numerical block/item IDs as sources for legacy world migration |
| **Identify Command** | Look up registry IDs of blocks and items in-game with `/remapids id` |
| **Multi-File Configs** | Organize remaps across multiple JSON files, processed alphabetically |

## Supported Platforms

| Loader | Minecraft Version | Status |
|--------|-------------------|--------|
| Forge | 1.20.1 | Supported |
| Fabric | 1.20.1 | Supported |
| Fabric | 1.21.1 | Supported |
| NeoForge | 1.21.1 | Supported |

## How It Works

RemapIDs operates through two categories of remaps:

1. **Registry remaps** (block, item, fluid, entity_type) are injected at registry freeze time, before the world loads. These require a full game restart to apply.
2. **Reloadable remaps** (tag, recipe, loot_table) are applied when datapacks load and can be refreshed with `/reload`.

RemapIDs is configured through JSON files placed in `config/remapids/remaps/`. The `/remapids id` command is available in-game to help identify block and item registry IDs — see the [Commands Guide](guides/commands.md).

