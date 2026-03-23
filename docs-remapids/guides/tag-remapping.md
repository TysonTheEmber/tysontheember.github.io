---
sidebar_position: 3
---

# Tag Remapping

RemapIDs can redirect tag references by prefixing the source or target with `#`. This is useful for consolidating tags when mods are removed or when recipe ingredients need to change.

## Tag-to-Tag Remapping

Merge all entries from one tag into another. Use the `tag` type to control this:

```json
{
  "remaps": [
    {
      "source": "#iceandfire:ingots/silver",
      "target": "#forge:ingots/silver",
      "types": ["tag"]
    }
  ]
}
```

When this remap is active, all items that were in the `iceandfire:ingots/silver` tag are merged into the `forge:ingots/silver` tag. Any game system that checks the target tag will see the combined entries.

---

## Tag-to-Item Remapping

Replace tag references in recipes and loot tables with a specific item. Use the `recipe` or `loot_table` type:

```json
{
  "remaps": [
    {
      "source": "#forge:ingots/gold",
      "target": "minecraft:diamond",
      "types": ["recipe"]
    }
  ]
}
```

This replaces any recipe ingredient that references the `forge:ingots/gold` tag with a direct reference to `minecraft:diamond`. In the recipe JSON, `{"tag": "forge:ingots/gold"}` becomes `{"item": "minecraft:diamond"}`.

---

## How It Works

- **TagLoaderMixin** intercepts tag loading and merges source tag entries into the target tag
- **JsonRemapper** handles tag-to-item conversion by rewriting `tag` fields to `item` fields in recipe and loot table JSON
- The `#` prefix is what distinguishes a tag reference from a regular item/block ID

---

## Example: Consolidate Tags After Mod Removal

A removed mod registered items under its own tag namespace. Redirect those tags to standard Forge/common tags:

```json
{
  "remaps": [
    {
      "source": "#removedmod:ingots/silver",
      "target": "#forge:ingots/silver",
      "types": ["tag"]
    },
    {
      "source": "#removedmod:ores/silver",
      "target": "#forge:ores/silver",
      "types": ["tag"]
    },
    {
      "source": "#removedmod:storage_blocks/silver",
      "target": "#forge:storage_blocks/silver",
      "types": ["tag"]
    }
  ]
}
```

:::tip
Tag remaps are reloadable — you can test changes with `/reload` instead of restarting the game.
:::

---

## Example: Replace Tag Ingredients in Recipes

A removed mod's tag is referenced in recipes from other mods. Instead of editing every recipe, redirect the tag to a replacement item:

```json
{
  "remaps": [
    {
      "source": "#removedmod:special_dust",
      "target": "minecraft:glowstone_dust",
      "types": ["recipe"]
    }
  ]
}
```

Every recipe that used `{"tag": "removedmod:special_dust"}` as an ingredient will now use `{"item": "minecraft:glowstone_dust"}` instead.

