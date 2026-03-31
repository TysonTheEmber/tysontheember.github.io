---
sidebar_position: 4
---

# Icon Effects

Loot Log provides several visual effects for item icons, including glow, shadow, and pickup pulse animations. All effects can be configured globally or per-item via overrides.

---

## Icon Glow

Renders a colored glow behind the item icon with configurable shape, size, and optional pulsing.

| Setting | Default | Range | Description |
|---------|---------|-------|-------------|
| `iconGlowEnabled` | `false` | — | Enable the glow effect |
| `iconGlowColor` | `0xAAFFFFFF` | — | Glow color (ARGB hex) |
| `iconGlowRadius` | `3` | 0–8 | Glow radius in pixels |
| `iconGlowShape` | `CIRCLE` | — | Shape: `CIRCLE`, `SQUARE`, `DIAMOND`, `ITEM` |
| `iconGlowSoftness` | `1.5` | 0.5–5.0 | Falloff gradient — higher values fade more gradually |
| `iconGlowPulseSpeed` | `0.0` | 0–10 | Oscillations per second. 0 = no pulse |
| `iconGlowPulseMin` | `0.5` | 0–1 | Minimum brightness during pulse |
| `iconGlowPulseMax` | `1.0` | 0–1 | Maximum brightness during pulse |

### Glow Shapes

| Shape | Description |
|-------|-------------|
| `CIRCLE` | Smooth circular gradient — clean, neutral look |
| `SQUARE` | Square gradient — sharp, boxy feel |
| `DIAMOND` | Diamond/rotated square gradient |
| `ITEM` | Glow follows the item's silhouette — the most organic-looking option |

:::tip
Use `ITEM` shape with a low radius (2–3) and matching rarity color for a subtle, integrated glow that highlights rare items without being distracting.
:::

---

## Icon Shadow

Renders a drop shadow beneath the item icon for a sense of depth.

| Setting | Default | Range | Description |
|---------|---------|-------|-------------|
| `iconShadowEnabled` | `false` | — | Enable the shadow |
| `iconShadowColor` | `0x80000000` | — | Shadow color (ARGB hex) |
| `iconShadowOffsetX` | `1` | 0–4 | Horizontal offset in pixels |
| `iconShadowOffsetY` | `1` | 0–4 | Vertical offset in pixels |
| `iconShadowRadius` | `1` | 0–4 | Blur radius in pixels |
| `iconShadowShape` | `ITEM` | — | Shape: `CIRCLE`, `SQUARE`, `DIAMOND`, `ITEM` |
| `iconShadowSoftness` | `1.5` | 0.5–5.0 | Gradient falloff |

---

## Pickup Pulse

When an existing entry's count updates (stacking another pickup), a pulse animation plays across the entry. Each visual element can have independent scale and alpha pulse strengths.

| Setting | Default | Range | Description |
|---------|---------|-------|-------------|
| `pickupPulseEnabled` | `true` | — | Enable the pulse effect |
| `pickupPulseDurationMs` | `200` | 50–1000 | Pulse duration in milliseconds |

### Per-Element Strengths

| Element | Scale Default | Scale Range | Alpha Default | Alpha Range |
|---------|--------------|-------------|---------------|-------------|
| Icon | `0.05` | 0–0.5 | `0.05` | 0–1 |
| Name | `0.05` | 0–0.5 | `0.0` | 0–1 |
| Total Count | `0.05` | 0–0.5 | `0.0` | 0–1 |
| Body | `0.0` | 0–0.5 | `0.0` | 0–1 |
| Accent | `0.0` | 0–0.5 | `0.0` | 0–1 |
| Overall | `0.05` | 0–0.5 | `0.0` | 0–1 |

### Effect Targeting

Control which pickup types receive visual effects:

| Value | Description |
|-------|-------------|
| `ALL` | Effects apply to both items and XP |
| `ITEMS_ONLY` | Effects only apply to item pickups |
| `XP_ONLY` | Effects only apply to XP pickups |

---

## Per-Item Override

All icon effects can be overridden per-item using the `visual` section in override JSON:

```json
{
  "match": { "type": "item", "id": "minecraft:nether_star" },
  "visual": {
    "iconGlow": {
      "color": "FFFFFF00",
      "radius": 5,
      "shape": "diamond",
      "pulse": { "speed": 3.0, "min": 0.6, "max": 1.0 }
    },
    "iconShadow": {
      "color": "80FFD700",
      "offsetX": 2,
      "offsetY": 2,
      "radius": 2,
      "shape": "item"
    }
  }
}
```
