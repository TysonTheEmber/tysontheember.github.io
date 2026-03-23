---
sidebar_position: 1
---

# Wildcard Expansion

Wildcard patterns let you remap entire families of IDs with a single entry. Instead of writing one remap per item, use `*` to match multiple IDs at once.

## How It Works

The `*` character matches one or more characters in the path portion of a namespaced ID. When RemapIDs encounters a wildcard pattern, it expands it against all known registry IDs at load time.

- Both `source` and `target` must contain `*`, or neither
- The text captured by `*` in the source is substituted into the `*` position in the target
- Expansion occurs against IDs that exist in the current game registries

| Source Pattern | Target Pattern | Matches |
|----------------|----------------|---------|
| `iceandfire:silver_*` | `thermal:silver_*` | `silver_ingot`, `silver_nugget`, `silver_block`, etc. |
| `oldmod:*` | `newmod:*` | All IDs in the `oldmod` namespace |

---

## Configuration

```json
{
  "remaps": [
    {
      "source": "iceandfire:silver_*",
      "target": "thermal:silver_*",
      "types": ["item", "block"]
    }
  ]
}
```

This expands to individual remaps for every matching ID:
- `iceandfire:silver_ingot` → `thermal:silver_ingot`
- `iceandfire:silver_nugget` → `thermal:silver_nugget`
- `iceandfire:silver_block` → `thermal:silver_block`
- ...and so on for every `iceandfire:silver_*` ID in the registry

---

## Example: Remap All Items from a Removed Mod

You removed `coppermod` and want all its items to redirect to vanilla copper equivalents that share the same names:

```json
{
  "remaps": [
    {
      "source": "coppermod:copper_*",
      "target": "minecraft:copper_*",
      "types": ["item"]
    }
  ]
}
```

---

## Example: Remap a Family of Related Items

Migrating silver items from Ice and Fire to Thermal:

```json
{
  "remaps": [
    {
      "source": "iceandfire:silver_*",
      "target": "thermal:silver_*",
      "types": ["item", "block"]
    }
  ]
}
```

:::warning
Wildcard expansion is performed against IDs that exist in the current game registries. If a source ID only exists in saved world data (because the original mod was removed), it won't be matched by wildcards. Use explicit source/target pairs for removed mod migration.
:::

:::note
If a wildcard pattern matches no known IDs, RemapIDs logs a warning. Double-check your namespace spelling and ensure the source mod is loaded.
:::

