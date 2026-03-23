---
sidebar_position: 5
---

# Examples

Real-world modpack scenarios showing how to use RemapIDs to solve common problems.

## 1. Replace a Removed Mod's Items

**Scenario:** You removed Ice and Fire from your modpack, but players have silver ingots in their inventories and chests.

**Solution:** Remap the specific items to their replacements:

```json
{
  "remaps": [
    {
      "source": "iceandfire:silver_ingot",
      "target": "thermal:silver_ingot",
      "types": ["item"]
    },
    {
      "source": "iceandfire:silver_nugget",
      "target": "thermal:silver_nugget",
      "types": ["item"]
    }
  ]
}
```

:::tip
For registry remaps like items, the target mod must be loaded. Make sure the replacement mod is installed.
:::

---

## 2. Wildcard Migration Between Mods

**Scenario:** You're replacing an entire mod and both mods use the same naming convention for their items.

**Solution:** Use wildcards to remap all matching IDs at once:

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

This automatically expands to cover `silver_ingot`, `silver_nugget`, `silver_block`, `silver_ore`, and any other `silver_*` IDs from Ice and Fire.

:::warning
Wildcards only match IDs that exist in the current game registries. If the source mod has already been removed, use explicit source/target pairs instead.
:::

---

## 3. Redirect Recipe Ingredients

**Scenario:** A removed mod added a custom tag that other mods' recipes reference. Those recipes now break because the tag is empty.

**Solution:** Use a tag-to-item remap to substitute a specific item:

```json
{
  "remaps": [
    {
      "source": "#removedmod:special_gems",
      "target": "minecraft:emerald",
      "types": ["recipe"]
    }
  ]
}
```

Every recipe that used `{"tag": "removedmod:special_gems"}` as an ingredient will now use `{"item": "minecraft:emerald"}`.

---

## 4. Consolidate Tags After Mod Removal

**Scenario:** A removed mod registered items under its own tag namespace. Other mods check these tags and find them empty.

**Solution:** Merge the old tags into standard tags:

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
    }
  ]
}
```

Items that were tagged under the removed mod's namespace are now included in the standard Forge tags.

---

## 5. Remap Entity Types for World Migration

**Scenario:** A mod updated and changed its entity type IDs between versions. Existing worlds have entities saved under the old IDs.

**Solution:** Remap the old entity type IDs to the new ones:

```json
{
  "remaps": [
    {
      "source": "examplemod:old_goblin",
      "target": "examplemod:goblin",
      "types": ["entity_type"]
    },
    {
      "source": "examplemod:old_dragon",
      "target": "examplemod:fire_dragon",
      "types": ["entity_type"]
    }
  ]
}
```

---

## 6. Multi-File Organization

**Scenario:** Your modpack has several mod replacements and you want to keep remaps organized.

**Solution:** Split remaps across multiple files. RemapIDs processes them alphabetically and chain flattening works across files.

**File: `01-removed-mods.json`**
```json
{
  "remaps": [
    {
      "source": "oldcoppermod:copper_ingot",
      "target": "minecraft:copper_ingot",
      "types": ["item", "block"]
    },
    {
      "source": "oldsilvermod:silver_ingot",
      "target": "thermal:silver_ingot",
      "types": ["item"]
    }
  ]
}
```

**File: `02-tag-consolidation.json`**
```json
{
  "remaps": [
    {
      "source": "#oldcoppermod:ingots/copper",
      "target": "#forge:ingots/copper",
      "types": ["tag"]
    }
  ]
}
```

**File: `03-recipe-fixes.json`**
```json
{
  "remaps": [
    {
      "source": "#oldsilvermod:dusts/silver",
      "target": "thermal:silver_dust",
      "types": ["recipe"]
    }
  ]
}
```

:::tip
Prefix filenames with numbers (e.g., `01-`, `02-`) to control processing order explicitly, since files are loaded alphabetically.
:::

---

## 7. Full Modpack Migration Config

A comprehensive config for a modpack that removed two mods and replaced them with alternatives:

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
      "types": ["item", "block"]
    },
    {
      "source": "iceandfire:silver_ore",
      "target": "thermal:silver_ore",
      "types": ["item", "block"]
    },
    {
      "source": "iceandfire:silver_nugget",
      "target": "thermal:silver_nugget",
      "types": ["item"]
    },
    {
      "source": "#iceandfire:ingots/silver",
      "target": "#forge:ingots/silver",
      "types": ["tag"]
    },
    {
      "source": "#iceandfire:ores/silver",
      "target": "#forge:ores/silver",
      "types": ["tag"]
    },
    {
      "source": "oldtech:copper_wire",
      "target": "immersiveengineering:wire_copper",
      "types": ["item"]
    },
    {
      "source": "#oldtech:wires",
      "target": "immersiveengineering:wire_copper",
      "types": ["recipe"]
    }
  ]
}
```

---

## Migration Workflow

When migrating your modpack, follow this workflow:

1. **Identify** which mods are being removed or replaced
2. **List the IDs** that need remapping (items, blocks, entities, tags)
3. **Create a remap file** in `config/remapids/remaps/`
4. **Add registry remaps** (item, block) for items players may have in inventories or placed in the world
5. **Add tag remaps** if other mods reference the removed mod's tags
6. **Add recipe remaps** if recipe ingredients need redirecting
7. **Restart the game** to apply registry remaps
8. **Check logs** for `[RemapIDs]` messages — warnings indicate missing targets or invalid entries
9. **Test reloadable types** with `/reload` to iterate quickly on tag, recipe, and loot table remaps

