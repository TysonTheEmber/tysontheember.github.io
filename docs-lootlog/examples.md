---
sidebar_position: 6
---

# Examples

Real-world override examples for common use cases. Each example is a complete, copy-paste ready JSON file you can place in `config/lootlog/overrides/`.

## Highlight Rare Drops

Play a special sound and add a glow effect for epic-rarity items:

```json
{
  "overrides": [
    {
      "match": { "type": "rarity", "id": "epic" },
      "sound": { "soundId": "minecraft:entity.player.levelup", "volume": 0.4, "pitch": 1.2 },
      "visual": {
        "iconGlow": {
          "color": "AAFF55FF",
          "radius": 4,
          "shape": "circle",
          "pulse": { "speed": 1.5, "min": 0.6, "max": 1.0 }
        }
      },
      "display": { "durationMs": 8000 }
    }
  ]
}
```

---

## Custom Diamond Notification

Give diamonds a gilded banner, custom sound, and extended display:

```json
{
  "overrides": [
    {
      "match": { "type": "item", "id": "minecraft:diamond" },
      "sound": { "soundId": "minecraft:entity.player.levelup", "volume": 0.6, "pitch": 1.5 },
      "background": { "decoration": "gilded" },
      "text": { "prefix": "[Rare] " },
      "display": { "durationMs": 10000, "combineMode": "NEVER" }
    }
  ]
}
```

:::tip
Setting `combineMode` to `NEVER` ensures each diamond pickup gets its own entry instead of stacking with previous ones.
:::

---

## Quiet Common Items

Reduce noise by giving common blocks a short display time:

```json
{
  "overrides": [
    {
      "match": { "type": "item", "id": "minecraft:dirt" },
      "display": { "durationMs": 1000 }
    },
    {
      "match": { "type": "item", "id": "minecraft:cobblestone" },
      "display": { "durationMs": 1000 }
    },
    {
      "match": { "type": "item", "id": "minecraft:gravel" },
      "display": { "durationMs": 1000 }
    },
    {
      "match": { "type": "item", "id": "minecraft:netherrack" },
      "display": { "durationMs": 1000 }
    }
  ]
}
```

---

## Modpack Loot Tier System

Create a tiered notification system with escalating visual effects:

```json
{
  "overrides": [
    {
      "match": { "type": "rarity", "id": "common" },
      "display": { "durationMs": 2000 }
    },
    {
      "match": { "type": "rarity", "id": "uncommon" },
      "display": { "durationMs": 4000 },
      "text": { "color": "FFFF00" }
    },
    {
      "match": { "type": "rarity", "id": "rare" },
      "display": { "durationMs": 6000 },
      "text": { "color": "55FFFF" },
      "sound": { "soundId": "minecraft:entity.experience_orb.pickup", "volume": 0.3, "pitch": 1.4 },
      "visual": {
        "iconGlow": { "color": "AA55FFFF", "radius": 3, "shape": "circle" }
      }
    },
    {
      "match": { "type": "rarity", "id": "epic" },
      "display": { "durationMs": 10000 },
      "text": { "color": "FF55FF" },
      "sound": { "soundId": "minecraft:entity.player.levelup", "volume": 0.5, "pitch": 1.2 },
      "background": { "decoration": "gilded" },
      "visual": {
        "iconGlow": {
          "color": "AAFF55FF",
          "radius": 5,
          "shape": "diamond",
          "pulse": { "speed": 2.0, "min": 0.5, "max": 1.0 }
        }
      }
    }
  ]
}
```

---

## Regex Pattern Matching

Match all ores using a regex pattern and add a shimmer effect:

```json
{
  "overrides": [
    {
      "match": { "type": "regex", "id": ".*:.*_ore" },
      "display": { "durationMs": 6000 },
      "visual": {
        "iconGlow": { "color": "44FFFFFF", "radius": 2, "shape": "item" }
      },
      "behavior": { "priority": 2 }
    }
  ]
}
```

:::note
Regex patterns are matched against the full item registry ID (e.g., `minecraft:iron_ore`). The pattern must match the entire string — use `.*` for wildcards.
:::

---

## Tag-Based Overrides

Apply effects to all items sharing a tag:

```json
{
  "overrides": [
    {
      "match": { "type": "tag", "id": "c:gems" },
      "background": { "decoration": "gilded" },
      "sound": { "soundId": "minecraft:block.amethyst_block.chime", "volume": 0.4, "pitch": 1.0 },
      "behavior": { "priority": 3 }
    },
    {
      "match": { "type": "tag", "id": "c:ores" },
      "display": { "durationMs": 5000 },
      "text": { "suffix": " [Ore]" },
      "behavior": { "priority": 2 }
    }
  ]
}
```

---

## Prefix All Ingots

Use regex to add a prefix to all vanilla ingots:

```json
{
  "overrides": [
    {
      "match": { "type": "regex", "id": "minecraft:.*_ingot" },
      "text": { "prefix": "[Ingot] " },
      "behavior": { "priority": 2 }
    }
  ]
}
```

---

## Tinted Banner Body

Recolor the default banner using the body layer's `tint` field — no custom textures needed:

```json
{
  "overrides": [
    {
      "match": { "type": "rarity", "id": "rare" },
      "background": {
        "style": "BANNER",
        "layers": [
          {
            "texture": "lootlog:textures/gui/lootlog/banner_body.png",
            "sourceHeight": 12,
            "tint": "FF55FFFF",
            "alpha": 0.85
          },
          {
            "texture": "lootlog:textures/gui/lootlog/banner_accent.png",
            "sourceHeight": 10,
            "tint": "FF55FFFF",
            "anchor": "ICON"
          }
        ]
      }
    }
  ]
}
```

:::tip
Tinting recolors the entire texture — white (`FFFFFFFF`) means no change. Use this to create color-coded banners per rarity without making separate texture files.
:::

---

## Animated Banner Accent

Use the built-in animated accent texture for a shimmering overlay:

```json
{
  "overrides": [
    {
      "match": { "type": "item", "id": "minecraft:nether_star" },
      "background": {
        "style": "BANNER",
        "layers": [
          {
            "texture": "lootlog:textures/gui/lootlog/banner_body.png",
            "sourceHeight": 12,
            "tint": "FF1A0033"
          },
          {
            "texture": "lootlog:textures/gui/lootlog/banner_accent_animated.png",
            "sourceHeight": 10,
            "frames": 4,
            "animSpeed": 3,
            "anchor": "ICON",
            "tint": "CCFFD700",
            "alpha": 0.7
          }
        ]
      },
      "display": { "durationMs": 12000, "combineMode": "NEVER" },
      "sound": { "soundId": "minecraft:ui.toast.challenge_complete", "volume": 0.5, "pitch": 1.0 }
    }
  ]
}
```

---

## 9-Slice Custom Background

Use a custom 9-slice texture for a scalable background with preserved borders:

```json
{
  "overrides": [
    {
      "match": { "type": "mod", "id": "create" },
      "background": {
        "style": "TEXTURE",
        "texture": "mypack:textures/gui/create_bg.png",
        "textureWidth": 32,
        "textureHeight": 32,
        "renderMode": "NINE_SLICE",
        "sliceBorder": 6
      }
    }
  ]
}
```

:::note
The texture file must be in a resource pack. Place it at `assets/mypack/textures/gui/create_bg.png` in your resource pack directory. See the [Custom Textures Guide](guides/custom-textures.md) for resource pack setup.
:::

---

## Combined Override: Full Custom Notification

A complete override combining custom background, text, sound, visual effects, and layout:

```json
{
  "overrides": [
    {
      "match": { "type": "item", "id": "minecraft:elytra" },
      "background": {
        "decoration": "gilded"
      },
      "text": {
        "prefix": "[Legendary] ",
        "color": "FFD700"
      },
      "sound": {
        "soundId": "minecraft:ui.toast.challenge_complete",
        "volume": 0.7,
        "pitch": 1.0
      },
      "display": {
        "durationMs": 15000,
        "combineMode": "NEVER"
      },
      "visual": {
        "iconGlow": {
          "color": "AAFFD700",
          "radius": 6,
          "shape": "diamond",
          "softness": 2.0,
          "pulse": { "speed": 1.5, "min": 0.5, "max": 1.0 }
        },
        "iconShadow": {
          "color": "80FFD700",
          "offsetX": 2,
          "offsetY": 2,
          "radius": 2,
          "shape": "item"
        },
        "pickupPulse": {
          "enabled": true,
          "durationMs": 400,
          "iconScaleStrength": 0.15,
          "overallScaleStrength": 0.1
        }
      },
      "layout": {
        "totalCountEnabled": false
      },
      "behavior": {
        "priority": 10,
        "forceShow": true
      }
    }
  ]
}
```
