---
sidebar_position: 5
---

# Filtering

Loot Log provides blacklist and whitelist filtering to control which pickups appear in the HUD. Filters operate at both the item and mod level.

---

## How Filtering Works

Filters are evaluated in this order:

1. **Override forceShow** — If an item has a matching override with `"forceShow": true`, it bypasses all filters
2. **Whitelist check** — If a whitelist is non-empty, only matching items pass through
3. **Blacklist check** — Matching items are hidden

:::note
Whitelists and blacklists are independent. If both an item whitelist and item blacklist are set, the whitelist is checked first — only whitelisted items reach the blacklist check.
:::

---

## Item Blacklist

Hide specific items by their registry ID.

**Config key:** `itemBlacklist`

**Default:** Empty list

Example (in config):

```json
["minecraft:dirt", "minecraft:cobblestone", "minecraft:gravel"]
```

---

## Item Whitelist

When non-empty, only items in this list will appear. All other items are hidden.

**Config key:** `itemWhitelist`

**Default:** Empty list

:::warning
Setting a whitelist hides everything not on the list. Use this for focused displays — for example, showing only valuable drops in a boss fight.
:::

---

## Mod Blacklist

Hide all items from specific mods by namespace.

**Config key:** `modBlacklist`

**Default:** Empty list

Example:

```json
["minecraft", "supplementaries"]
```

---

## Mod Whitelist

When non-empty, only items from these mods will appear.

**Config key:** `modWhitelist`

**Default:** Empty list

---

## Force Show

Override-level `forceShow` bypasses all filtering. Set it in an override's `behavior` section:

```json
{
  "match": { "type": "item", "id": "minecraft:diamond" },
  "behavior": { "forceShow": true }
}
```

This ensures diamonds always appear in the HUD, even if `minecraft` is on the mod blacklist.

---

## Common Setups

### Hide Common Items

Blacklist noisy items that clutter the HUD:

```json
["minecraft:dirt", "minecraft:cobblestone", "minecraft:gravel", "minecraft:sand", "minecraft:netherrack"]
```

### Show Only Rare Drops

Use a whitelist to focus on valuable items:

```json
["minecraft:diamond", "minecraft:emerald", "minecraft:ancient_debris", "minecraft:nether_star"]
```

### Hide a Mod's Items but Keep Exceptions

Blacklist the mod, then force-show specific items via overrides:

Config: `modBlacklist: ["create"]`

Override file:

```json
{
  "overrides": [
    {
      "match": { "type": "item", "id": "create:brass_ingot" },
      "behavior": { "forceShow": true }
    }
  ]
}
```
