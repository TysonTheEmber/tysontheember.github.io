---
sidebar_position: 3
---

# Custom Tiers

BHL allows you to define custom tiers beyond the six vanilla tiers. This is useful for modpacks that introduce intermediate progression steps like bronze, copper, or steel.

---

## Defining a Custom Tier

Add a new entry to the `tiers` array in `tiers.json`:

```json
{
  "name": "bronze",
  "level": 2,
  "displayName": "Bronze",
  "color": "#CD7F32",
  "builtIn": false,
  "iconItem": "create:brass_ingot",
  "after": "stone",
  "before": "iron"
}
```

### Required Fields

| Field | Description |
|-------|-------------|
| `name` | Internal identifier — used in override configs |
| `level` | Numeric level — determines mining capability |
| `displayName` | Shown in Jade tooltips and `/bhl` commands |
| `color` | Hex color code for display |
| `builtIn` | Must be `false` for custom tiers |

### Optional Fields

| Field | Description |
|-------|-------------|
| `iconItem` | Item registry ID shown as the tier icon in Jade |
| `after` | Place after this tier in Forge/NeoForge sorting |
| `before` | Place before this tier in Forge/NeoForge sorting |

---

## Tier Levels

The `level` field determines the numeric mining capability. A tool can mine a block when the tool's tier level is greater than or equal to the block's required tier level.

You can insert custom tiers at any level:

| Tier | Level | Notes |
|------|-------|-------|
| wood | 0 | |
| gold | 0 | Same level as wood |
| stone | 1 | |
| **copper** | **1** | **Custom — same level as stone** |
| **bronze** | **2** | **Custom — same level as iron** |
| iron | 2 | |
| diamond | 3 | |
| **steel** | **3** | **Custom — same level as diamond** |
| netherite | 4 | |

:::note
Two tiers with the same level can mine the same blocks. If you want a custom tier to be strictly between two vanilla tiers, use an intermediate level value.
:::

---

## Tier Sorting (Forge / NeoForge)

On Forge and NeoForge, tiers are registered with the tier sorting system. The `after` and `before` fields control where your custom tier sits in the sorting order:

```json
{
  "name": "bronze",
  "level": 2,
  "displayName": "Bronze",
  "color": "#CD7F32",
  "builtIn": false,
  "after": "stone",
  "before": "iron"
}
```

This places bronze **after stone** and **before iron** in the tier sorting registry.

:::warning
On Forge and NeoForge, adding or removing custom tiers may require a full game restart because tier definitions are registered at startup. On Fabric, `/bhl reload` handles this.
:::

---

## Icon Items

The `iconItem` field sets the item displayed as a tier icon in Jade tooltips:

```json
{
  "name": "bronze",
  "iconItem": "create:brass_ingot"
}
```

If `iconItem` is omitted, BHL uses a default icon based on the tier name — typically the corresponding vanilla pickaxe for built-in tiers.

---

## Color Codes

The `color` field accepts standard hex color codes. These are used in:

- Jade tooltip tier names
- `/bhl check` and `/bhl info` command output

Common color suggestions:

| Material | Hex Code |
|----------|----------|
| Copper | `#B87333` |
| Bronze | `#CD7F32` |
| Steel | `#71797E` |
| Obsidian | `#3B2754` |
| Emerald | `#50C878` |
