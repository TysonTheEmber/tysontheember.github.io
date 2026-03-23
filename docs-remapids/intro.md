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

There are no in-game commands or UI — RemapIDs is configured entirely through JSON files placed in `config/remapids/remaps/`.

---

## Next Steps

- [Getting Started](getting-started.md) — Install the mod and create your first remap
- [Configuration Reference](configuration.md) — Full reference for the JSON config format
- [Examples](examples.md) — Real-world modpack migration scenarios
