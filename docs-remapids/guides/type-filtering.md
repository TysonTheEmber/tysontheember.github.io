---
sidebar_position: 2
---

# Type Filtering

The optional `types` array in each remap entry lets you control exactly which remap types a mapping applies to. This gives you fine-grained control over how IDs are redirected across different game systems.

## Remap Types

RemapIDs supports 7 remap types, split into two categories:

| Type | Category | Requires Restart | Description |
|------|----------|------------------|-------------|
| `block` | Registry | Yes | Block registry IDs |
| `item` | Registry | Yes | Item registry IDs |
| `fluid` | Registry | Yes | Fluid registry IDs |
| `entity_type` | Registry | Yes | Entity type registry IDs |
| `tag` | Reloadable | No | Tag definitions |
| `recipe` | Reloadable | No | Recipe IDs and ingredient/result references |
| `loot_table` | Reloadable | No | Loot table ID lookups and item references |

---

## Using Type Filters

### All types (default)

Omit the `types` field or pass an empty array to apply the remap to all 7 types:

```json
{
  "source": "oldmod:silver_ingot",
  "target": "newmod:silver_ingot"
}
```

### Specific types

List only the types you want:

```json
{
  "source": "oldmod:silver_ingot",
  "target": "newmod:silver_ingot",
  "types": ["item", "block"]
}
```

This remap only affects item and block registries — tags, recipes, and loot tables are left unchanged.

---

## Registry Types

**block**, **item**, **fluid**, **entity_type**

- Applied at registry freeze time, before the world loads
- Require a full game restart to take effect
- Targets are validated — if the target ID doesn't exist in the registry, the remap is skipped with a warning

Registry remaps work by injecting aliases into the game's internal registries, so any code that looks up the source ID will find the target instead.

---

## Reloadable Types

**tag**, **recipe**, **loot_table**

- Applied when datapacks load
- Can be refreshed with `/reload` — no restart required
- Targets are **not** validated at load time (since datapack content may not be available yet)

Reloadable remaps intercept datapack processing to rewrite IDs in tags, recipes, and loot tables on the fly.

---

## Common Patterns

| Use Case | Recommended Types |
|----------|-------------------|
| Replace a removed mod's items | `["item"]` |
| Redirect block registry entries | `["block"]` |
| Replace both items and blocks | `["item", "block"]` |
| Change recipe ingredients | `["recipe"]` |
| Consolidate tags from removed mods | `["tag"]` |
| Redirect loot table drops | `["loot_table"]` |
| Full mod replacement | Omit `types` (all) |
| Entity migration between mod versions | `["entity_type"]` |

:::tip
Start with specific types and broaden only if needed. Using `["item", "block"]` for a mod replacement covers most cases without affecting recipes or tags that may not need changes.
:::

---

## Next Steps

- [Tag Remapping](tag-remapping.md) — Redirect tag references with the `#` prefix
- [Wildcards](wildcards.md) — Pattern matching for bulk remaps
- [Configuration Reference](../configuration.md) — Full reference for the JSON config format
