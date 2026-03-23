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

### Can I use it alongside other registry manipulation mods?

Generally yes. RemapIDs operates at the registry/mixin level and is compatible with most other mods. If you encounter conflicts, check the load order and consider using [Mixin Helper](/mixin-helper/intro) to manage mixin priorities.

---

## Getting Help

1. **Check the game log** — Search for `[RemapIDs]` to find warnings and info messages
2. **Validate your JSON** — Most issues are caused by syntax errors in config files
3. **Join the [Discord Server](https://discord.gg/GCN2Hv4Qzr)** — Get help from the community

---

## Next Steps

- [Getting Started](getting-started.md) — Installation and first remap setup
- [Configuration Reference](configuration.md) — Full reference for all config options
- [Examples](examples.md) — Real-world modpack scenarios
