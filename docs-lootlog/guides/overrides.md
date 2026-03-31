---
sidebar_position: 1
---

# Item Overrides

Overrides let you customize how specific items, tags, mods, or rarities appear in the pickup HUD. Each override is a JSON rule that can change an item's sound, text, background, visual effects, duration, and more.

---

## Override Files

- Stored in `config/lootlog/overrides/`
- Any `.json` file in this directory is loaded automatically
- Files starting with `_` are skipped (use for examples/notes)
- Reload with `/lootlog reload`

---

## Match Types

| Type | Format | Example | Description |
|------|--------|---------|-------------|
| `item` | Registry ID | `minecraft:diamond` | Matches a specific item |
| `tag` | Tag ID | `c:ores` | Matches all items with this tag |
| `mod` | Mod namespace | `create` | Matches all items from this mod |
| `rarity` | Rarity name (lowercase) | `epic` | Matches all items of this rarity |
| `regex` | Regex pattern | `minecraft:.*_ingot` | Full match against item registry ID |

---

## Priority System

When multiple overrides match the same item, they are merged in priority order (lowest to highest):

1. **mod** — Broadest scope, lowest priority
2. **rarity** — Matches by item rarity tier
3. **regex** — Pattern-based matching
4. **tag** — Tag-based matching
5. **item** — Exact item ID, highest priority

Higher-priority overrides win for any field they define. Fields left null inherit from the next lower-priority match or from global config.

:::note
Within the same match type, use the `behavior.priority` field to control ordering. Higher numbers take precedence.
:::

---

## Override Structure

Full JSON structure with all available fields:

```json
{
  "overrides": [
    {
      "match": {
        "type": "item",
        "id": "minecraft:diamond"
      },
      "sound": {
        "soundId": "minecraft:entity.player.levelup",
        "volume": 0.6,
        "pitch": 1.5
      },
      "background": {
        "style": "BANNER",
        "decoration": "gilded",
        "color": "AA000000",
        "texture": "lootlog:textures/gui/lootlog/custom_bg.png",
        "textureWidth": 256,
        "textureHeight": 12,
        "renderMode": "STRETCH",
        "sliceBorder": 4,
        "layers": [
          {
            "texture": "lootlog:textures/gui/lootlog/banner_body.png",
            "tint": "FFFFFFFF",
            "alpha": 1.0,
            "animSpeed": 4
          },
          {
            "texture": "lootlog:textures/gui/lootlog/banner_accent.png",
            "tint": "FFFFFFFF",
            "alpha": 1.0,
            "anchor": "ICON",
            "xOffset": 0,
            "yOffset": 0,
            "visible": true
          }
        ]
      },
      "text": {
        "markup": "<rainbow f=2.0>{name}</rainbow>",
        "color": "B9F2FF",
        "prefix": "[Rare] ",
        "suffix": " !",
        "fullName": "Shiny Diamond"
      },
      "display": {
        "durationMs": 8000,
        "scale": 1.2,
        "combineMode": "NEVER"
      },
      "visual": {
        "iconGlow": {
          "color": "AAFFFFFF",
          "radius": 4,
          "shape": "circle",
          "softness": 1.5,
          "pulse": {
            "speed": 2.0,
            "min": 0.5,
            "max": 1.0
          }
        },
        "iconShadow": {
          "color": "80000000",
          "offsetX": 1,
          "offsetY": 1,
          "radius": 1,
          "shape": "item",
          "softness": 1.5
        },
        "pickupPulse": {
          "enabled": true,
          "durationMs": 300,
          "iconScaleStrength": 0.1,
          "overallScaleStrength": 0.1
        }
      },
      "layout": {
        "iconEnabled": true,
        "nameEnabled": true,
        "pickupCountEnabled": true,
        "totalCountEnabled": true,
        "iconOffsetX": 0,
        "iconOffsetY": 0
      },
      "behavior": {
        "priority": 5,
        "forceShow": false
      }
    }
  ]
}
```

---

### match (required)

| Field | Type | Description |
|-------|------|-------------|
| `type` | String | Match type: `item`, `tag`, `mod`, `rarity`, or `regex` |
| `id` | String | The identifier to match against |

---

### sound

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `soundId` | String | Global setting | Minecraft sound resource location |
| `volume` | Float | Global setting | Volume (0–1) |
| `pitch` | Float | Global setting | Pitch (0.5–2) |

---

### text

| Field | Type | Description |
|-------|------|-------------|
| `markup` | String | Text with `{name}` placeholder for item name. Supports EmbersTextAPI tags |
| `color` | String | Hex color (RGB or ARGB) for item name text |
| `prefix` | String | Text prepended to the item name |
| `suffix` | String | Text appended to the item name |
| `fullName` | String | Complete replacement for the item name |

---

### display

| Field | Type | Description |
|-------|------|-------------|
| `durationMs` | Long | Override display duration in milliseconds |
| `scale` | Float | Override entry scale |
| `combineMode` | String | Override stacking: `ALWAYS`, `NEVER`, or `EXCLUDE_NAMED` |

---

### background

| Field | Type | Description |
|-------|------|-------------|
| `style` | String | Background style: `NONE`, `SOLID`, `TOOLTIP`, `TEXTURE`, `BANNER`, `FLAT` |
| `decoration` | String | Named decoration preset (e.g., `default_banner`, `gilded`, `ribbon`) |
| `color` | String | Background color (hex ARGB) for SOLID and FLAT styles |
| `texture` | String | Namespaced texture path (e.g., `lootlog:textures/gui/lootlog/popup_bg.png`) |
| `textureWidth` | Integer | Source PNG width in pixels |
| `textureHeight` | Integer | Source PNG height in pixels |
| `renderMode` | String | `STRETCH` (banner-style) or `NINE_SLICE` (scalable with preserved borders) |
| `sliceBorder` | Integer | Border size in pixels for 9-slice rendering |
| `layers` | Array | Multi-layer banner definition — see [Backgrounds Guide](./backgrounds.md) |
| `animation` | Object | Spritesheet animation for TEXTURE backgrounds |

**Decoration vs. layers:** Setting `decoration` applies a named preset that configures layers automatically. Setting `layers` directly gives you full control over each layer's texture, tint, opacity, animation, and positioning. If both are set, `layers` takes precedence.

**Animation sub-object** (for TEXTURE style):

| Field | Type | Description |
|-------|------|-------------|
| `animation.type` | String | Always `"spritesheet"` |
| `animation.frames` | Integer | Number of frames in the vertical spritesheet |
| `animation.frameTimeMs` | Integer | Milliseconds per frame |
| `animation.interpolate` | Boolean | `true` = cross-fade, `false` = hard cut |

For creating your own textures, see the [Custom Textures Guide](./custom-textures.md).

---

### visual

Contains `iconGlow`, `iconShadow`, and `pickupPulse` sub-objects. See [Icon Effects Guide](./icon-effects.md) for details.

---

### layout

| Field | Type | Description |
|-------|------|-------------|
| `iconEnabled` | Boolean | Show/hide the item icon |
| `nameEnabled` | Boolean | Show/hide the item name |
| `pickupCountEnabled` | Boolean | Show/hide the pickup count (+3) |
| `totalCountEnabled` | Boolean | Show/hide the inventory total (x64) |

---

### behavior

| Field | Type | Description |
|-------|------|-------------|
| `priority` | Integer | Priority within the same match type. Higher wins |
| `forceShow` | Boolean | If true, bypasses all blacklist/whitelist filtering |
