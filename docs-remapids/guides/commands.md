---
sidebar_position: 6
---

# Commands

RemapIDs provides the `/remapids id` command to help you look up registry IDs for blocks and items in-game. This is useful when building remap configs, since you need to know the exact namespaced IDs.

## /remapids id block

Displays the registry ID of the block you are looking at.

**Usage:** Point your crosshair at a block and run `/remapids id block`

**Output:**
- `Block: minecraft:stone` — the full registry ID of the targeted block
- `Block: minecraft:stone (Remapped from: oldmod:stone)` — if an active remap targets this block
- `Block: oldmod:stone (Remaps to: minecraft:stone)` — if this block is the source of an active remap
- `No block in range` — if no block is within reach (5 blocks)

**Permission:** Any player can use this command (no operator level required).

---

## /remapids id hand

Displays the registry ID of the item in your main hand.

**Usage:** Hold an item and run `/remapids id hand`

**Output:**
- `Item: minecraft:diamond_sword` — the full registry ID of the held item
- `Item: minecraft:diamond_sword (Remapped from: oldmod:diamond_sword)` — if an active remap targets this item
- `No item in hand` — if your main hand is empty

**Permission:** Any player can use this command (no operator level required).

---

## Remap Information

Both commands show active remap information when relevant:

- **Remapped from** — This ID is the target of a remap. Something else redirects to it.
- **Remaps to** — This ID is the source of a remap. It redirects to something else.

This helps you verify that your remap configs are working as expected and quickly identify which IDs are involved in remaps.

---

## Use Cases

### Building remap configs

When you need to find the exact registry ID of a block or item:

1. Look at the block or hold the item
2. Run `/remapids id block` or `/remapids id hand`
3. Copy the registry ID into your remap config

### Verifying remaps are active

After creating a remap config and restarting (or running `/reload` for reloadable types):

1. Find a block or item that should be remapped
2. Run the identify command
3. Check that the output shows the expected remap information
