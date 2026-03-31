---
sidebar_position: 6
---

# EmbersTextAPI Integration

When EmbersTextAPI is installed alongside Loot Log, you can use rich text markup in override text fields to apply animated effects like rainbow colors, glowing text, and more.

---

## Setup

1. Install [EmbersTextAPI](https://modrinth.com/mod/embers-text-api) (v2.9.1+) alongside Loot Log
2. Loot Log detects EmbersTextAPI automatically at runtime — no additional configuration needed

:::note
EmbersTextAPI is entirely optional. Without it, markup tags in override text fields are rendered as plain text.
:::

---

## Using Markup in Overrides

Use the `text.markup` field in override JSON. The `{name}` placeholder is replaced with the item's display name.

### Rainbow Item Name

```json
{
  "match": { "type": "item", "id": "minecraft:diamond" },
  "text": { "markup": "<rainbow f=2.0>{name}</rainbow>" }
}
```

### Combined Effects

```json
{
  "match": { "type": "rarity", "id": "epic" },
  "text": { "markup": "<gradient from=FF55FF to=AA00FF>{name}</gradient>" }
}
```

---

## Available Effects

EmbersTextAPI provides a wide range of text effects. Some commonly used with Loot Log:

| Tag | Description |
|-----|-------------|
| `<rainbow>` | Cycles through rainbow colors |
| `<gradient from=X to=Y>` | Smooth color gradient |
| `<wave>` | Wavy vertical text animation |
| `<shake>` | Shaking/vibrating text |
| `<bounce>` | Bouncing text animation |
| `<color hex=X>` | Static custom color |

For the full list of effects and attributes, see the [EmbersTextAPI Documentation](/embers-text-api/intro).
