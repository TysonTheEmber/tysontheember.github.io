---
sidebar_position: 3
---

# Configuration Reference

Complete reference for Better Harvest Level configuration. All configuration is done through JSON files in `config/betterharvestlevel/`.

:::tip JSON Validation
If your overrides aren't taking effect, check for JSON syntax errors. A misplaced comma or missing bracket will cause the file to fail silently. Use a JSON validator to verify your files.
:::

---

## File Structure

- **Directory:** `config/betterharvestlevel/`
- Core files: `tiers.json`, `blocks.json`, `tools.json`, `equivalences.json`
- Layered files: `blocks_<name>.json`, `tools_<name>.json` are loaded automatically
- Layered files are processed in **alphabetical order** after the base file

---

## tiers.json

Defines all available mining tiers. Vanilla tiers are pre-configured as built-in.

```json
{
  "configVersion": 1,
  "tiers": [
    {
      "name": "wood",
      "level": 0,
      "displayName": "Wood",
      "color": "#8B6914",
      "builtIn": true,
      "iconItem": "minecraft:wooden_pickaxe"
    }
  ]
}
```

### tiers[].name

Internal identifier for the tier. Used in block and tool override configs.

**Type:** String

- Must be unique across all tier definitions
- Used as the key when referencing this tier in `requiredTier` or `tier` fields

---

### tiers[].level

Numeric mining level. Higher levels can mine blocks requiring lower levels.

**Type:** Integer

- Two tiers can share the same level (e.g., wood and gold are both level 0)
- Tool tier level must be ≥ block required tier level to harvest

---

### tiers[].displayName

Human-readable name shown in tooltips and commands.

**Type:** String

---

### tiers[].color

Hex color code for display in Jade tooltips and `/bhl` command output.

**Type:** String (hex format, e.g., `"#55FFFF"`)

---

### tiers[].builtIn

Whether this is a vanilla tier managed by BHL internally.

**Type:** Boolean

- Set to `true` for vanilla tiers (wood, gold, stone, iron, diamond, netherite)
- Set to `false` for custom tiers you define

:::warning
Do not set `builtIn: true` on custom tiers. This flag is reserved for vanilla tier definitions.
:::

---

### tiers[].iconItem

Registry ID of the item used as a tier icon in Jade tooltips.

**Type:** String (optional, nullable)

- Example: `"minecraft:diamond_pickaxe"`
- If omitted, BHL uses a default icon based on the tier name

---

### tiers[].after

Place this tier after the specified tier in the tier sorting order.

**Type:** String (optional, nullable)

- Only relevant on Forge and NeoForge, which use a tier sorting registry
- Example: `"iron"` places this tier after iron in the sorting order

---

### tiers[].before

Place this tier before the specified tier in the tier sorting order.

**Type:** String (optional, nullable)

- Only relevant on Forge and NeoForge
- Example: `"diamond"` places this tier before diamond

---

### Default Built-In Tiers

| Name | Level | Display Name | Color |
|------|-------|-------------|-------|
| wood | 0 | Wood | `#8B6914` |
| gold | 0 | Gold | `#FFAA00` |
| stone | 1 | Stone | `#AAAAAA` |
| iron | 2 | Iron | `#FFFFFF` |
| diamond | 3 | Diamond | `#55FFFF` |
| netherite | 4 | Netherite | `#6E4A6E` |

---

## blocks.json / blocks_*.json

Defines which mining tier is required to harvest specific blocks.

```json
{
  "configVersion": 1,
  "overrides": [
    {
      "target": "minecraft:obsidian",
      "type": "block",
      "requiredTier": "diamond"
    }
  ]
}
```

### overrides[].target

The block(s) to apply this override to. Format depends on `type`.

**Type:** String

| When type is | Target format | Example |
|-------------|---------------|---------|
| `block` | Registry ID | `"minecraft:obsidian"` |
| `tag` | Tag with `#` prefix | `"#minecraft:needs_iron_tool"` |
| `mod` | Mod namespace | `"create"` |
| `regex` | Regex pattern | `"create:.*_ore"` |

---

### overrides[].type

How the `target` field should be interpreted.

**Type:** String — one of `"block"`, `"tag"`, `"mod"`, `"regex"`

See [Override Types Guide](guides/override-types.md) for detailed examples of each type.

---

### overrides[].requiredTier

The tier name a tool must meet or exceed to harvest this block.

**Type:** String

- Must match a tier `name` from `tiers.json`
- Example: `"iron"` requires at least an iron-tier tool (level 2)

---

## tools.json / tools_*.json

Assigns tiers to tools, overriding their vanilla or modded tier assignments.

```json
{
  "configVersion": 1,
  "overrides": [
    {
      "target": "minecraft:iron_pickaxe",
      "type": "item",
      "tier": "iron"
    }
  ]
}
```

### overrides[].target

The tool(s) to apply this override to. Format depends on `type`.

**Type:** String

| When type is | Target format | Example |
|-------------|---------------|---------|
| `item` | Registry ID | `"minecraft:iron_pickaxe"` |
| `tag` | Tag with `#` prefix | `"#forge:tools/pickaxes"` |
| `mod` | Mod namespace | `"tinkersconstruct"` |
| `regex` | Regex pattern | `"create:.*_pickaxe"` |

---

### overrides[].type

How the `target` field should be interpreted.

**Type:** String — one of `"item"`, `"tag"`, `"mod"`, `"regex"`

---

### overrides[].tier

The tier name to assign to this tool.

**Type:** String

- Must match a tier `name` from `tiers.json`

---

## equivalences.json

Defines groups of tiers that should be treated as equivalent for mining checks.

```json
{
  "configVersion": 1,
  "groups": [
    {
      "name": "copper_iron",
      "tiers": ["copper", "iron"]
    }
  ]
}
```

### groups[].name

A descriptive name for the equivalence group. Used for logging.

**Type:** String

---

### groups[].tiers

List of tier names in this group. Any tool with a tier in this group can mine blocks requiring any other tier in the same group, regardless of level.

**Type:** String array

- All tier names must exist in `tiers.json`
- Example: `["copper", "iron"]` means copper tools can mine iron-required blocks and vice versa

:::note
Equivalence groups bypass level comparison entirely. A level 1 tier in an equivalence group with a level 3 tier will be able to mine blocks requiring the level 3 tier.
:::

---

## Ignored Mods

BHL can be configured to skip processing for specific mods entirely. This is configured within the `BHLConfig` and prevents BHL from applying any overrides to blocks or tools from the specified mod namespaces.

---

## Example: Complete Modpack Setup

### tiers.json — Add a custom "bronze" tier

```json
{
  "configVersion": 1,
  "tiers": [
    { "name": "wood", "level": 0, "displayName": "Wood", "color": "#8B6914", "builtIn": true, "iconItem": "minecraft:wooden_pickaxe" },
    { "name": "gold", "level": 0, "displayName": "Gold", "color": "#FFAA00", "builtIn": true, "iconItem": "minecraft:golden_pickaxe" },
    { "name": "stone", "level": 1, "displayName": "Stone", "color": "#AAAAAA", "builtIn": true, "iconItem": "minecraft:stone_pickaxe" },
    { "name": "bronze", "level": 2, "displayName": "Bronze", "color": "#CD7F32", "builtIn": false, "iconItem": "create:brass_ingot", "after": "stone", "before": "iron" },
    { "name": "iron", "level": 2, "displayName": "Iron", "color": "#FFFFFF", "builtIn": true, "iconItem": "minecraft:iron_pickaxe" },
    { "name": "diamond", "level": 3, "displayName": "Diamond", "color": "#55FFFF", "builtIn": true, "iconItem": "minecraft:diamond_pickaxe" },
    { "name": "netherite", "level": 4, "displayName": "Netherite", "color": "#6E4A6E", "builtIn": true, "iconItem": "minecraft:netherite_pickaxe" }
  ]
}
```

### blocks_create.json — Create mod blocks require iron

```json
{
  "configVersion": 1,
  "overrides": [
    {
      "target": "create",
      "type": "mod",
      "requiredTier": "iron"
    }
  ]
}
```

### tools_create.json — Create tools are bronze tier

```json
{
  "configVersion": 1,
  "overrides": [
    {
      "target": "create",
      "type": "mod",
      "tier": "bronze"
    }
  ]
}
```

### equivalences.json — Bronze and iron are equivalent

```json
{
  "configVersion": 1,
  "groups": [
    {
      "name": "bronze_iron",
      "tiers": ["bronze", "iron"]
    }
  ]
}
```
