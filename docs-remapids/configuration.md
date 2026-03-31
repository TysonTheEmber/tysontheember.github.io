---
sidebar_position: 3
---

# Configuration Reference

Complete reference for RemapIDs configuration. All configuration is done through JSON files placed in `config/remapids/remaps/`.

:::tip JSON Validation
If your remaps aren't taking effect, check for JSON syntax errors. A misplaced comma or missing bracket will cause the file to fail silently. Use a JSON validator to verify your files.
:::

---

## File Structure

- **Remap configs:** `config/remapids/remaps/*.json` — all `.json` files are loaded automatically in alphabetical order
- **Custom numerical IDs:** `config/remapids/numerical_ids.json` — optional file for modded pre-1.13 numerical ID mappings (see [Numerical IDs Guide](guides/numerical-ids.md))
- Each remap file is independent — organize however you like (e.g., one file per removed mod, one file per remap type)

---

## remaps

The top-level `remaps` array contains all remap entries for the file.

**Type:** Array of remap objects

```json
{
  "remaps": [
    {
      "source": "oldmod:copper_ingot",
      "target": "minecraft:copper_ingot",
      "types": ["item", "block"]
    },
    {
      "source": "oldmod:copper_ore",
      "target": "minecraft:copper_ore"
    }
  ]
}
```

---

## remaps[].source

The original ID to redirect.

**Type:** String (namespaced ID or numerical ID)

- **Namespaced ID:** `namespace:path` format (e.g., `"oldmod:silver_ingot"`)
- **Numerical ID:** Pre-1.13 numerical block/item ID, optionally with metadata (e.g., `"1"`, `"35:14"`) — see [Numerical IDs Guide](guides/numerical-ids.md)
- Supports `*` wildcard for pattern matching (see [Wildcards Guide](guides/wildcards.md))
- Prefix with `#` for tag remaps (e.g., `"#forge:ingots/gold"`) — see [Tag Remapping Guide](guides/tag-remapping.md)

```json
{
  "source": "oldmod:silver_ingot",
  "target": "newmod:silver_ingot"
}
```

### Numerical ID example

```json
{
  "source": "35:14",
  "target": "somemod:red_block",
  "types": ["block"]
}
```

The numerical ID `35:14` (red wool in pre-1.13) is automatically resolved to `minecraft:red_wool` before processing. See the [Numerical IDs Guide](guides/numerical-ids.md) for details.

---

## remaps[].target

The destination namespaced ID that the source will be redirected to.

**Type:** String (namespaced ID)

- Same format requirements as `source`
- If `source` uses `*`, `target` must also use `*` (and vice versa)
- For registry types, the target must exist in the game's registries — otherwise the remap is skipped with a warning

```json
{
  "source": "oldmod:*",
  "target": "newmod:*"
}
```

---

## remaps[].types

Optionally filter which remap types this entry applies to.

**Type:** String array (optional)
**Default:** `[]` (empty = applies to all 7 types)

| Value | Category | Requires Restart | Description |
|-------|----------|------------------|-------------|
| `block` | Registry | Yes | Block registry IDs |
| `item` | Registry | Yes | Item registry IDs |
| `fluid` | Registry | Yes | Fluid registry IDs |
| `entity_type` | Registry | Yes | Entity type registry IDs |
| `tag` | Reloadable | No | Tag definitions |
| `recipe` | Reloadable | No | Recipe IDs and ingredient/result references |
| `loot_table` | Reloadable | No | Loot table ID lookups and item references |

### Filtered example

Only remap items and blocks — leave tags, recipes, and loot tables unchanged:

```json
{
  "source": "oldmod:silver_ingot",
  "target": "newmod:silver_ingot",
  "types": ["item", "block"]
}
```

### Unfiltered example

Apply to all remap types (block, item, fluid, entity_type, tag, recipe, loot_table):

```json
{
  "source": "oldmod:silver_ingot",
  "target": "newmod:silver_ingot"
}
```

---

## Processing Pipeline

When the game loads, RemapIDs processes config files in this order:

1. **Parse** — All `.json` files in the remaps directory are loaded alphabetically
2. **Resolve numerical IDs** — Pre-1.13 numerical sources (e.g., `"35:14"`) are converted to post-flattening string IDs (e.g., `"minecraft:red_wool"`)
3. **Expand wildcards** — `*` patterns are matched against known registry IDs
4. **Group by type** — Entries are organized by their applicable remap types
5. **Flatten chains** — Transitive mappings are resolved (A→B + B→C = A→C, max depth 10)
6. **Validate** — Registry type targets are checked against known IDs (reloadable types skip this)
7. **Apply** — The final remap configuration is activated

---

## Example Config Files

### Mod migration

```json
{
  "remaps": [
    {
      "source": "iceandfire:silver_ingot",
      "target": "thermal:silver_ingot",
      "types": ["item"]
    },
    {
      "source": "iceandfire:silver_block",
      "target": "thermal:silver_block",
      "types": ["block", "item"]
    },
    {
      "source": "iceandfire:silver_ore",
      "target": "thermal:silver_ore",
      "types": ["block", "item"]
    }
  ]
}
```

### Tag consolidation

```json
{
  "remaps": [
    {
      "source": "#iceandfire:ingots/silver",
      "target": "#forge:ingots/silver",
      "types": ["tag"]
    },
    {
      "source": "#iceandfire:ores/silver",
      "target": "#forge:ores/silver",
      "types": ["tag"]
    }
  ]
}
```

