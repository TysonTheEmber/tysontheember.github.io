---
sidebar_position: 7
---

# Custom Textures

Loot Log's `BANNER` and `TEXTURE` background styles support custom textures loaded from resource packs. You can create your own banner backgrounds, animated spritesheets, and 9-slice scalable textures to fully customize the pickup HUD.

---

## Resource Pack Setup

Custom textures are loaded through Minecraft's resource pack system. Create a resource pack with the following structure:

```
my_lootlog_textures/
├── pack.mcmeta
└── assets/
    └── lootlog/
        └── textures/
            └── gui/
                └── lootlog/
                    ├── my_banner_body.png
                    ├── my_banner_accent.png
                    └── my_9slice_bg.png
```

The `pack.mcmeta` file:

```json
{
  "pack": {
    "pack_format": 15,
    "description": "Custom Loot Log textures"
  }
}
```

:::note
Use `pack_format` 15 for Minecraft 1.20.1 or 34 for 1.21.1. Check the [Minecraft Wiki](https://minecraft.wiki/w/Pack_format) for the correct value for your version.
:::

Textures are referenced by their namespaced path. A file at `assets/lootlog/textures/gui/lootlog/my_banner_body.png` is referenced as:

```
lootlog:textures/gui/lootlog/my_banner_body.png
```

You can also use your own namespace. A file at `assets/mypack/textures/banner.png` is referenced as:

```
mypack:textures/banner.png
```

---

## Texture Format

All textures must be:

- **PNG format** with RGBA color (8-bit per channel)
- **Full alpha channel** — transparency is fully supported
- **Lowercase filenames** with no spaces (Minecraft convention)

---

## Banner Textures

Banner textures are rendered at their native pixel dimensions using `STRETCH` mode — they stretch horizontally to fill the entry width but maintain their pixel height.

### Body Texture

The body is the main background layer (layer 0). It determines the popup's rendered height.

**Default dimensions:** 256 x 12 pixels

| Property | Guideline |
|----------|-----------|
| Width | 256px recommended — stretched to entry width at render time |
| Height | 10–16px typical — this is the visible popup height |
| Transparency | Use alpha for fading edges, rounded corners, or decorative shapes |

### Accent Texture

The accent is an overlay layer (layer 1) rendered on top of the body. It is independently positioned using anchor points and offsets.

**Default dimensions:** 256 x 10 pixels

| Property | Guideline |
|----------|-----------|
| Width | Same as body (256px) for full-width accents |
| Height | Equal to or smaller than body height |
| Transparency | Typically uses transparency to reveal the body layer beneath |

:::tip
Design the accent as a decorative overlay — border highlights, shimmer strips, or ornamental frames. The accent's anchor point controls where it positions itself relative to the entry.
:::

### Referencing Banner Textures

Use a resource pack for your PNG files, then reference them in an override:

```json
{
  "match": { "type": "rarity", "id": "epic" },
  "background": {
    "style": "BANNER",
    "layers": [
      {
        "texture": "lootlog:textures/gui/lootlog/my_banner_body.png",
        "sourceHeight": 12
      },
      {
        "texture": "lootlog:textures/gui/lootlog/my_accent.png",
        "sourceHeight": 10,
        "anchor": "ICON",
        "visible": true
      }
    ]
  }
}
```

---

## 9-Slice Textures

The `TEXTURE` background style uses 9-slice rendering, which divides a texture into 9 regions so it can scale to any size without distorting the borders.

### How 9-Slice Works

The texture is split into a 3x3 grid based on the `sliceBorder` value:

```
┌──────────┬────────────────┬──────────┐
│  Corner  │   Top Edge     │  Corner  │
│  (fixed) │  (stretched)   │  (fixed) │
├──────────┼────────────────┼──────────┤
│   Left   │                │  Right   │
│   Edge   │    Center      │  Edge    │
│(stretched)│  (stretched)  │(stretched)│
├──────────┼────────────────┼──────────┤
│  Corner  │  Bottom Edge   │  Corner  │
│  (fixed) │  (stretched)   │  (fixed) │
└──────────┴────────────────┴──────────┘
```

- **Corners** render at their exact pixel size — never stretched
- **Edges** stretch along one axis to fill the gap
- **Center** stretches in both directions

### Creating a 9-Slice Texture

**Default dimensions:** 16 x 16 pixels with a 4px border

1. Start with a small PNG (16x16 or 32x32 is typical)
2. Design your corners, edges, and center so they tile cleanly when stretched
3. Keep the border region visually distinct (rounded corners, beveled edges, etc.)
4. The center region should be a solid or seamlessly repeatable pattern

### Using 9-Slice in Overrides

```json
{
  "match": { "type": "rarity", "id": "rare" },
  "background": {
    "style": "TEXTURE",
    "texture": "lootlog:textures/gui/lootlog/my_9slice_bg.png",
    "textureWidth": 16,
    "textureHeight": 16,
    "renderMode": "NINE_SLICE",
    "sliceBorder": 4
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `texture` | String | Namespaced texture path |
| `textureWidth` | Integer | PNG width in pixels |
| `textureHeight` | Integer | PNG height in pixels |
| `renderMode` | String | `NINE_SLICE` for scalable rendering, `STRETCH` for simple stretch |
| `sliceBorder` | Integer | Border size in pixels for 9-slice regions |

:::warning
If the popup is smaller than twice the border size, 9-slice falls back to a solid rectangle. Keep `sliceBorder` small relative to your texture dimensions.
:::

---

## Animated Spritesheets

Both banner layers and texture backgrounds support animation through vertical spritesheets — multiple frames stacked on top of each other in a single PNG.

### Spritesheet Format

Frames are stacked **vertically** in the PNG:

```
┌─────────────────┐ ← Frame 0 (y=0)
│  Frame 0        │    height = sourceHeight
├─────────────────┤ ← Frame 1 (y=sourceHeight)
│  Frame 1        │
├─────────────────┤ ← Frame 2 (y=sourceHeight×2)
│  Frame 2        │
├─────────────────┤ ← Frame 3 (y=sourceHeight×3)
│  Frame 3        │
└─────────────────┘
```

**Requirements:**
- All frames must be the same width
- Total PNG height = `sourceHeight` x number of frames
- Frames are evenly spaced with no gaps

**Example:** A 4-frame banner accent animation at 10px per frame:
- PNG dimensions: 256 x 40 (256 wide, 4 frames x 10px each)
- `sourceHeight`: 10
- `frames`: 4

### Banner Layer Animation

For banner layers, animation is controlled by `animSpeed`:

```json
{
  "texture": "lootlog:textures/gui/lootlog/my_animated_accent.png",
  "sourceHeight": 10,
  "frames": 4,
  "animSpeed": 4
}
```

| Field | Description |
|-------|-------------|
| `animSpeed` | Speed factor — lower = faster. 0 = static (no animation) |

**Timing formula:** Each frame displays for `animSpeed x 50` milliseconds. At `animSpeed` 4, each frame lasts 200ms. Frames interpolate (cross-fade) automatically.

| animSpeed | Time per frame |
|-----------|---------------|
| 1 | 50ms |
| 2 | 100ms |
| 4 | 200ms (default) |
| 8 | 400ms |
| 20 | 1000ms (1 second) |

### Texture Background Animation

For `TEXTURE` style backgrounds, animation uses a different format:

```json
{
  "background": {
    "style": "TEXTURE",
    "texture": "mypack:textures/animated_bg.png",
    "textureWidth": 32,
    "textureHeight": 128,
    "renderMode": "NINE_SLICE",
    "sliceBorder": 4,
    "animation": {
      "type": "spritesheet",
      "frames": 4,
      "frameTimeMs": 150,
      "interpolate": true
    }
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `animation.type` | String | Always `"spritesheet"` |
| `animation.frames` | Integer | Number of frames in the spritesheet |
| `animation.frameTimeMs` | Integer | Milliseconds per frame |
| `animation.interpolate` | Boolean | `true` = cross-fade between frames, `false` = hard cut |

---

## Multi-Layer Banners

Banner mode supports multiple layers rendered in order (layer 0 on bottom, subsequent layers on top). Each layer has independent texture, positioning, tinting, opacity, and animation.

### Layer Definition

```json
{
  "background": {
    "layers": [
      {
        "texture": "lootlog:textures/gui/lootlog/banner_body.png",
        "sourceHeight": 12,
        "tint": "FFB9F2FF",
        "alpha": 0.9,
        "animSpeed": 0
      },
      {
        "texture": "lootlog:textures/gui/lootlog/banner_accent_animated.png",
        "sourceHeight": 10,
        "frames": 4,
        "animSpeed": 4,
        "anchor": "ICON",
        "xOffset": 0,
        "yOffset": 0,
        "visible": true
      }
    ]
  }
}
```

### Layer Fields

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `texture` | String | Yes | — | Namespaced texture path |
| `sourceHeight` | Integer | Yes | — | Height of one frame in pixels |
| `frames` | Integer | No | 1 | Number of animation frames |
| `tint` | String | No | `FFFFFFFF` | Hex color tint (RGB or ARGB) |
| `alpha` | Float | No | 1.0 | Layer opacity (0.0–1.0) |
| `animSpeed` | Integer | No | 0 | Animation speed (0 = static) |
| `xOffset` | Integer | No | 0 | Horizontal offset from anchor |
| `yOffset` | Integer | No | 0 | Vertical offset from anchor |
| `visible` | Boolean | No | true | Show or hide this layer |
| `anchor` | String | No | `EDGE` | Positioning anchor point |

### Anchor Points

The `anchor` field controls where a layer positions itself relative to the entry:

| Anchor | Description |
|--------|-------------|
| `EDGE` | Aligned to the banner's decorative edge (default for body layers) |
| `ICON` | Aligned to the item icon position |
| `NAME` | Aligned to the item name text position |
| `COUNT` | Aligned to the count text position |

:::tip
Use `ICON` anchor for accents that should highlight the item icon area. Use `EDGE` for full-width decorative borders.
:::

### Tinting

The `tint` field multiplies the texture's color channels. Use it to recolor a single texture for different purposes:

| Tint | Effect |
|------|--------|
| `FFFFFFFF` | No change (white = original colors) |
| `FFB9F2FF` | Light blue tint |
| `AAFF0000` | Semi-transparent red |
| `FF000000` | Black (silhouette) |

---

## Color Format

Colors throughout overrides use hex format:

| Format | Example | Description |
|--------|---------|-------------|
| 6-character | `B9F2FF` | RGB — alpha defaults to `FF` (fully opaque) |
| 8-character | `AAB9F2FF` | ARGB — first two characters are alpha |

The `#` prefix is optional — both `#B9F2FF` and `B9F2FF` are valid.

---

## Built-In Textures

These textures ship with Loot Log and can be referenced directly without a resource pack:

| Texture Path | Dimensions | Purpose |
|-------------|-----------|---------|
| `lootlog:textures/gui/lootlog/banner_body.png` | 256 x 12 | Default banner body |
| `lootlog:textures/gui/lootlog/banner_body_ribbon.png` | 256 x 12 | Ribbon-style body |
| `lootlog:textures/gui/lootlog/banner_accent.png` | 256 x 10 | Default banner accent |
| `lootlog:textures/gui/lootlog/banner_accent_animated.png` | 256 x 40 | Animated accent (4 frames) |
| `lootlog:textures/gui/lootlog/banner_accent_gilded.png` | 256 x 10 | Gilded accent overlay |
| `lootlog:textures/gui/lootlog/banner_accent_ribbon.png` | 256 x 10 | Ribbon-style accent |
| `lootlog:textures/gui/lootlog/popup_bg.png` | 16 x 16 | 9-slice background (4px border) |
| `lootlog:textures/gui/lootlog/glow_circle.png` | 32 x 32 | Icon glow gradient |

:::tip
You can override built-in textures by placing a replacement PNG at the same path in a resource pack. This lets you restyle the default banner without writing any override JSON.
:::

---

## Complete Example: Custom Animated Banner

A full override using a custom two-layer animated banner for nether stars:

```json
{
  "overrides": [
    {
      "match": { "type": "item", "id": "minecraft:nether_star" },
      "background": {
        "style": "BANNER",
        "layers": [
          {
            "texture": "mypack:textures/gui/star_body.png",
            "sourceHeight": 14,
            "tint": "FF1A0033",
            "alpha": 0.95
          },
          {
            "texture": "mypack:textures/gui/star_shimmer.png",
            "sourceHeight": 14,
            "frames": 8,
            "animSpeed": 3,
            "anchor": "ICON",
            "tint": "CCFFD700",
            "alpha": 0.7
          }
        ]
      },
      "sound": { "soundId": "minecraft:ui.toast.challenge_complete", "volume": 0.5, "pitch": 1.0 },
      "display": { "durationMs": 12000, "combineMode": "NEVER" },
      "visual": {
        "iconGlow": {
          "color": "AAFFD700",
          "radius": 5,
          "shape": "diamond",
          "pulse": { "speed": 2.0, "min": 0.5, "max": 1.0 }
        }
      }
    }
  ]
}
```

This creates a dark purple banner body with an animated gold shimmer overlay, a challenge-complete sound, a pulsing diamond glow around the icon, and a 12-second display time.
