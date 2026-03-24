---
sidebar_position: 5
---

# Jade Integration

BHL integrates with [Jade](https://modrinth.com/mod/jade) to display mining tier information in block tooltips. When Jade is installed, BHL automatically replaces Jade's built-in harvest tool display with enhanced tier information.

---

## What It Shows

When you look at a block with Jade's overlay, BHL displays:

- **Tier icon** — The item icon configured for the tier (e.g., a diamond pickaxe for diamond tier)
- **Tier name** — The display name in the tier's configured color
- **Harvestability indicator** — A checkmark or X showing whether your current tool can harvest the block

---

## Setup

No configuration is required. BHL detects Jade automatically and registers itself as a Jade plugin. The integration activates if:

1. Jade is installed alongside BHL
2. The block you're looking at has a BHL tier override

:::tip
If a block has no BHL override, Jade falls back to its default harvest tool display using vanilla tier detection.
:::

---

## Custom Tier Icons in Jade

The tier icon shown in Jade comes from the `iconItem` field in `tiers.json`:

```json
{
  "name": "bronze",
  "iconItem": "create:brass_ingot"
}
```

If `iconItem` is not set, BHL uses a default icon based on the tier name (typically the matching vanilla pickaxe for built-in tiers).

---

## How It Works

BHL intercepts Jade's tooltip collection event and replaces the built-in harvest tool component with a custom one. The replacement component:

1. Looks up the block's required tier from BHL's override cache
2. Resolves the tier's icon item from the registry
3. Compares the player's held tool tier against the block's required tier
4. Renders the tier icon, colored display name, and harvestability checkmark/X

This operates at the tooltip level — BHL does not modify Jade's internal logic or data collection.
