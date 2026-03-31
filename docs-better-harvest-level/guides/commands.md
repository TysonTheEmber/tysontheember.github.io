---
sidebar_position: 6
---

# Commands

BHL provides the `/bhl` command for checking tier information and managing config in-game.

---

## /bhl check

Check the tier of a block, tool, or registry ID.

### Check held item

```
/bhl check
```

Reports the tier assigned to the item you're currently holding.

### Check looked-at block

```
/bhl check
```

When not holding an item (or when looking at a block), reports the required tier for the block you're looking at.

### Check specific ID

```
/bhl check <registry_id>
```

Reports the tier information for a specific block or item by registry ID.

**Example:**

```
/bhl check minecraft:obsidian
```

Output shows the block's required tier, level, display name, and color.

---

## /bhl info

```
/bhl info
```

Displays a summary of all registered tiers and override counts:

- All tier definitions (name, level, display name, color)
- Number of resolved block overrides
- Number of resolved tool overrides

This is useful for verifying your config loaded correctly.

---

## /bhl reload

```
/bhl reload
```

Hot-reloads all BHL config files without restarting the game. Requires **permission level 2** (operator).

After reloading:
- All config files are re-read from disk
- Override targets are re-resolved against current registries
- Changes take effect immediately for mining checks

:::warning
On Forge and NeoForge, changes to tier definitions (adding/removing custom tiers) may require a full game restart because tiers are registered with the tier sorting system at startup. Block and tool overrides reload without issues.
:::

---

## Permissions

| Command | Permission Level |
|---------|-----------------|
| `/bhl check` | 0 (any player) |
| `/bhl info` | 0 (any player) |
| `/bhl reload` | 2 (operator) |
