---
sidebar_position: 5
---

# Numerical IDs (Legacy Worlds)

RemapIDs supports pre-1.13 numerical block and item IDs as source values. This makes it easier to define remaps when migrating old worlds from Minecraft 1.12.2 or earlier to modern versions.

## Background

Before the 1.13 "Flattening" update, Minecraft used numerical IDs for blocks and items. Stone was `1`, wool was `35`, and different wool colors were distinguished by metadata values (e.g., `35:14` for red wool). After the Flattening, all blocks and items use namespaced string IDs like `minecraft:red_wool`.

RemapIDs includes a built-in flattening table that maps these old numerical IDs to their modern equivalents, so you don't have to look them up manually.

## Syntax

Use a plain number or `number:metadata` as the `source` value:

| Format | Example | Resolves To |
|--------|---------|-------------|
| `"id"` | `"1"` | `minecraft:stone` |
| `"id:metadata"` | `"1:3"` | `minecraft:diorite` |
| `"id"` | `"35"` | `minecraft:white_wool` |
| `"id:metadata"` | `"35:14"` | `minecraft:red_wool` |

:::note
Numerical IDs are only supported as **source** values. The target must always be a full namespaced ID (e.g., `"minecraft:stone"`).
:::

## Examples

### Remap a single block by numerical ID

```json
{
  "remaps": [
    {
      "source": "1:3",
      "target": "somemod:special_stone",
      "types": ["block"]
    }
  ]
}
```

This resolves `1:3` (diorite) to `minecraft:diorite`, then remaps `minecraft:diorite` to `somemod:special_stone`.

### Migrate old wool colors

```json
{
  "remaps": [
    {
      "source": "35:14",
      "target": "decormod:red_fabric",
      "types": ["block", "item"]
    },
    {
      "source": "35:11",
      "target": "decormod:blue_fabric",
      "types": ["block", "item"]
    }
  ]
}
```

### Item-only numerical IDs

Some numerical IDs are item-specific. Use the `types` filter to target the correct registry:

```json
{
  "remaps": [
    {
      "source": "263:1",
      "target": "somemod:refined_coal",
      "types": ["item"]
    }
  ]
}
```

This resolves `263:1` (charcoal) and remaps it.

## How It Works

1. When RemapIDs parses your config, it detects sources that are pure numbers (`35`) or number:metadata pairs (`35:14`)
2. It looks up the numerical ID in the built-in flattening table to find the modern string ID
3. The resolved string ID replaces the numerical source, and processing continues normally
4. If the numerical ID isn't in the table (e.g., a modded block's old numerical ID), a warning is logged and the entry is skipped

## Type Resolution

When looking up a numerical ID, RemapIDs uses the `types` field to decide which table to check:

- If `types` includes `block` — checks the blocks table
- If `types` includes `item` — checks the items table
- If `types` is empty or includes both — checks blocks first, then items

:::tip
For best results, specify `types` when using numerical IDs. This avoids ambiguity when a numerical ID exists in both the blocks and items tables.
:::

## Base IDs vs Metadata Variants

A numerical ID without metadata (e.g., `"35"`) resolves to the base variant (metadata 0). For wool, `"35"` resolves to `minecraft:white_wool`.

To target a specific variant, include the metadata: `"35:14"` resolves to `minecraft:red_wool`.

## Coverage

The built-in flattening table covers all vanilla Minecraft blocks (IDs 0-255) and items (IDs 256+), including all metadata variants for blocks like stone types, wood types, wool/terracotta/glass/concrete colors, flowers, slabs, and more.

:::warning
The flattening table only covers **vanilla** Minecraft IDs. Modded blocks and items from 1.12.2 had their own numerical IDs assigned by Forge, which are not included. For modded content, use the standard namespaced ID format instead.
:::
