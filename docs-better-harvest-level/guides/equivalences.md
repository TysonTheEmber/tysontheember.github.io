---
sidebar_position: 4
---

# Tier Equivalences

Tier equivalences let you group tiers together so that a tool belonging to one tier can mine blocks requiring any other tier in the same group — regardless of level.

---

## When to Use Equivalences

Equivalences solve a common modpack problem: two mods add tools at the same progression tier but with different tier names. Without equivalences, a bronze pickaxe can't mine blocks that require iron, even if they're meant to be the same progression step.

**Example scenario:**
- Create mod adds brass tools (custom "bronze" tier, level 2)
- Thermal adds invar tools (custom "invar" tier, level 2)
- You want both to work on iron-required blocks

---

## Defining an Equivalence Group

Add a group to `equivalences.json`:

```json
{
  "configVersion": 1,
  "groups": [
    {
      "name": "mid_tier_metals",
      "tiers": ["bronze", "invar", "iron"]
    }
  ]
}
```

Now any tool with tier `bronze`, `invar`, or `iron` can mine blocks that require any of those three tiers.

---

## How It Works

When BHL checks if a tool can mine a block:

1. **Level check** — Can the tool's tier level meet the block's required level? If yes, the tool can mine.
2. **Equivalence check** — If the level check fails, BHL checks whether the tool's tier and the block's required tier are in the same equivalence group. If yes, the tool can mine.

:::note
Equivalence groups bypass level comparison entirely. A level 0 tier grouped with a level 4 tier will be able to mine blocks requiring the level 4 tier. Use this intentionally.
:::

---

## Multiple Groups

You can define multiple equivalence groups. A tier can appear in more than one group:

```json
{
  "configVersion": 1,
  "groups": [
    {
      "name": "early_metals",
      "tiers": ["copper", "bronze"]
    },
    {
      "name": "mid_metals",
      "tiers": ["bronze", "iron", "invar"]
    }
  ]
}
```

In this example, bronze appears in both groups. A bronze tool can mine blocks requiring copper (via `early_metals`) and blocks requiring iron or invar (via `mid_metals`).

---

## Common Patterns

### Mod material unification

```json
{
  "name": "silver_equivalence",
  "tiers": ["silver_thermal", "silver_mekanism", "silver_immersive"]
}
```

### Progression alternatives

```json
{
  "name": "tier_2_alternatives",
  "tiers": ["iron", "bronze", "copper", "invar"]
}
```

### Same-mod tool variants

```json
{
  "name": "tinkers_iron",
  "tiers": ["tinkers_iron", "iron"]
}
```
