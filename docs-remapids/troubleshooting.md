---
sidebar_position: 6
---

# Troubleshooting & FAQ

## Common Issues

### Remaps Not Taking Effect

If your remaps don't seem to be working:

1. **Check JSON syntax** — Use a JSON validator. A misplaced comma or missing bracket causes the file to fail silently
2. **Verify file location** — Files must be in `config/remapids/remaps/` and end with `.json`
3. **Check the remap type** — Registry remaps (block, item, fluid, entity_type) require a full game restart. Reloadable remaps (tag, recipe, loot_table) can be applied with `/reload`
4. **Check the game log** — Search for `[RemapIDs]` messages. The mod logs how many remaps were loaded and any warnings
5. **Check the source namespace** — If remapping IDs from a removed mod (e.g., `create:brass_block`), use explicit entries rather than wildcards. Wildcards only expand against IDs currently in the registry

---

### Remap Target Not Found Warning

```
[RemapIDs] Skipping remap: target 'oldmod:silver_ingot' not found in registry
```

This means the target ID doesn't exist in the game's registries. Common causes:

- The target mod isn't installed
- Typo in the target namespace or path
- The target ID was renamed in a mod update

:::note
This validation only applies to registry types (block, item, fluid, entity_type). Reloadable types (tag, recipe, loot_table) skip target validation since datapack content may load later.
:::

---

### Wildcard Matched No IDs

If a wildcard pattern produces no matches:

- Verify the namespace is spelled correctly
- Ensure the source mod is still loaded (wildcards expand against current registry IDs)
- Check that the path pattern is correct — `*` matches one or more characters
- If the source mod was removed, use explicit source/target pairs instead of wildcards

:::caution
Wildcards **cannot** be used for removed-mod migration. When a mod is removed, its IDs are no longer in the registry, so wildcard patterns have nothing to expand against. Always use explicit `source`/`target` pairs when remapping IDs from mods that will be uninstalled.
:::

---

### Circular Remap Detected

```
[RemapIDs] Circular remap detected, rejecting: modA:item <-> modB:item
```

This occurs when two remaps form a loop (A→B and B→A). RemapIDs rejects both mappings. To fix:

- Remove one direction of the remap
- Ensure your intent is a one-way redirect, not a swap

Self-remaps (A→A) are silently dropped.

---

### Chain Depth Exceeded

```
[RemapIDs] Chain depth exceeded for: modA:item
```

Remap chains are limited to 10 levels. This usually indicates an accidental cycle that wasn't caught by simple circular detection. To fix:

- Review your remap files for chains that loop back
- Collapse intermediate steps into direct mappings

---

### Unknown Numerical ID

```
[RemapIDs] Unknown numerical ID: '999' (not found in flattening table — may be a modded ID)
```

The numerical ID you used as a source isn't in the flattening table. This typically means:

- The ID belongs to a modded block/item from 1.12.2, not a vanilla one
- The ID or metadata value is incorrect

For modded numerical IDs, create a `config/remapids/numerical_ids.json` file with your custom mappings. See the [Numerical IDs Guide](guides/numerical-ids.md#custom-numerical-ids-modded-content) for details.

---

### JSON Syntax Errors

Common JSON mistakes:

- **Trailing comma** — `"types": ["item",]` (remove the final comma)
- **Single quotes** — `'item'` (use double quotes: `"item"`)
- **Unquoted keys** — `source: "value"` (must be `"source": "value"`)
- **Missing comma** between entries in the `remaps` array

:::tip
Use a JSON validator or your editor's built-in JSON checking to catch these before launching.
:::

---

## FAQ

### Does RemapIDs work on servers?

Yes. Install it on the server. Registry remaps affect the server-side registries, and tag/recipe/loot remaps are applied during server-side datapack loading.

---

### Does it affect performance?

Negligible. Registry remaps are applied once at startup. Reloadable remaps are applied during datapack loading. There is no per-tick overhead.

---

### Does it work with existing worlds?

Yes — that is its primary purpose. RemapIDs redirects saved IDs to new ones when the world loads, allowing players to keep their inventories and builds intact after mod changes.

---

### Can I remap modded items to vanilla items?

Yes. Just use the full namespaced ID for both source and target:

```json
{
  "source": "coppermod:copper_ingot",
  "target": "minecraft:copper_ingot"
}
```

---

### What happens if the target doesn't exist?

For **registry types** (block, item, fluid, entity_type), the remap is skipped with a warning in the log. For **reloadable types** (tag, recipe, loot_table), no validation is performed since targets may be created by datapacks that load later.

---

### Are remaps persisted in the world?

No. Remaps are applied at runtime. The world's saved data retains the original (source) IDs. If you remove RemapIDs, the original IDs will be used again — which may cause missing item/block issues if the original mod is also gone.

---

### What's the difference between registry and reloadable types?

**Registry types** (block, item, fluid, entity_type) are applied when the game's registries freeze during startup. They require a full game restart and targets must exist in the registry.

**Reloadable types** (tag, recipe, loot_table) are applied when datapacks load. They support `/reload` for quick iteration and don't validate targets at load time.

---

### Can I use numerical IDs from old Minecraft versions?

Yes. You can use pre-1.13 numerical block/item IDs as source values in your remap configs (e.g., `"source": "35:14"` for red wool). RemapIDs includes a built-in flattening table that automatically resolves these to modern string IDs. See the [Numerical IDs Guide](guides/numerical-ids.md).

Note that this only covers vanilla Minecraft IDs. Modded blocks from 1.12.2 should use their namespaced string IDs.

---

### How do I find a block or item's registry ID?

Use the in-game commands:

- `/remapids id block` — shows the ID of the block you're looking at
- `/remapids id hand` — shows the ID of the item in your main hand

See the [Commands Guide](guides/commands.md) for details.

---

### Can I use it alongside other registry manipulation mods?

Generally yes. RemapIDs operates at the registry/mixin level and is compatible with most other mods. If you encounter conflicts, check the load order and consider using [Mixin Helper](/mixin-helper/intro) to manage mixin priorities.

---

### Blocks Disappear After Removing a Mod

If placed blocks vanish when you remove a mod:

1. **Add explicit remap entries** before removing the mod — list every block ID you placed with its replacement
2. **Don't use wildcards** for this — they won't expand after the mod is removed
3. **Include both `block` and `item` types** so both placed blocks and inventory items are covered
4. **Restart the game** — registry remaps require a full restart, `/reload` is not enough

Example for migrating Create brass blocks:
```json
{
  "remaps": [
    { "source": "create:brass_block", "target": "minecraft:copper_block", "types": ["block", "item"] },
    { "source": "create:brass_casing", "target": "minecraft:copper_block", "types": ["block", "item"] }
  ]
}
```

On Forge, `MissingMappingsEvent` handles the world migration. On Fabric, the NBT migration mixins rewrite block/item IDs during chunk and inventory deserialization.

---

## Getting Help

1. **Check the game log** — Search for `[RemapIDs]` to find warnings and info messages
2. **Validate your JSON** — Most issues are caused by syntax errors in config files
3. **Join the [Discord Server](https://discord.gg/GCN2Hv4Qzr)** — Get help from the community

