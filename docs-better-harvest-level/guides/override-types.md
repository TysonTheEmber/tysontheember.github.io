---
sidebar_position: 1
---

# Override Types

BHL supports four override target types for both block and tool overrides. Each type determines how the `target` field is matched against the game's registries.

---

## block / item — Direct ID

Matches a single block or item by its full registry ID.

**Block override example:**

```json
{
  "target": "minecraft:obsidian",
  "type": "block",
  "requiredTier": "diamond"
}
```

**Tool override example:**

```json
{
  "target": "minecraft:iron_pickaxe",
  "type": "item",
  "tier": "iron"
}
```

Use `block` in `blocks.json` files and `item` in `tools.json` files. The target must be a valid namespaced ID (`namespace:path`).

---

## tag — Block/Item Tags

Matches all blocks or items in a given tag. Prefix the tag name with `#`.

**Block override example:**

```json
{
  "target": "#minecraft:needs_iron_tool",
  "type": "tag",
  "requiredTier": "iron"
}
```

**Tool override example:**

```json
{
  "target": "#forge:tools/pickaxes",
  "type": "tag",
  "tier": "iron"
}
```

:::tip
Tag overrides are resolved after datapacks load, so they pick up tags added by other mods and datapacks. This is the most compatible way to target groups of blocks or tools.
:::

---

## mod — Mod Namespace

Matches all blocks or items registered under a mod's namespace.

**Block override example:**

```json
{
  "target": "create",
  "type": "mod",
  "requiredTier": "iron"
}
```

This applies to every block registered by the Create mod (`create:*`).

**Tool override example:**

```json
{
  "target": "tinkersconstruct",
  "type": "mod",
  "tier": "iron"
}
```

:::note
The `target` is just the namespace — do not include the colon or path. For example, use `"create"`, not `"create:"` or `"create:*"`.
:::

---

## regex — Pattern Matching

Matches blocks or items whose registry ID matches a Java regex pattern.

**Block override example:**

```json
{
  "target": "create:.*_ore",
  "type": "regex",
  "requiredTier": "iron"
}
```

This matches any Create block whose path ends with `_ore` (e.g., `create:zinc_ore`, `create:deepslate_zinc_ore`).

**Tool override example:**

```json
{
  "target": ".*:.*_sword",
  "type": "regex",
  "tier": "iron"
}
```

This matches any sword item from any mod.

:::warning
Regex patterns are matched against the full registry ID (`namespace:path`). Be careful with broad patterns — test with `/bhl check` to verify matches.
:::

---

## Priority Order

When multiple overrides match the same block or item, the most specific match wins:

1. **block/item** (direct ID) — highest priority
2. **tag**
3. **regex**
4. **mod** (namespace) — lowest priority

Within the same type, overrides from layered files (`blocks_*.json`) are processed alphabetically after the base `blocks.json`.
