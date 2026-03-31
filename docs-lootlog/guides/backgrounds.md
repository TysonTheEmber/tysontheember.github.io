---
sidebar_position: 3
---

# Background Styles

Loot Log supports 6 background styles, each with different visual characteristics and configuration options.

---

## Style Overview

| Style | Description |
|-------|-------------|
| `NONE` | No background — text and icon render directly on the game HUD |
| `SOLID` | Flat colored rectangle behind each entry |
| `TOOLTIP` | Vanilla Minecraft tooltip style with dark background and purple border |
| `TEXTURE` | Custom texture rendered using 9-slice scaling for any entry width |
| `BANNER` | Multi-layer textured banner with body and accent layers — the default style |
| `FLAT` | Solid color extending from the screen edge, similar to banner layout |

---

## NONE

No background is rendered. Useful for minimal overlays or when using icon effects alone.

---

## SOLID

A simple colored rectangle behind each entry.

| Setting | Default | Description |
|---------|---------|-------------|
| `backgroundColor` | `0xAA000000` | ARGB color. Default is semi-transparent black |
| `backgroundHPadding` | `4` | Horizontal padding (0–20 px) |
| `backgroundVPadding` | `2` | Vertical padding (0–20 px) |

---

## TOOLTIP

Renders the vanilla Minecraft tooltip background — dark purple with a border gradient. No additional settings beyond padding.

---

## TEXTURE

Uses a custom texture with 9-slice rendering, allowing it to scale to any entry width without distorting the borders.

### How 9-Slice Works

The texture is divided into a 3x3 grid using the `sliceBorder` value. Corners render at their exact pixel size, edges stretch along one axis, and the center stretches in both directions. This means borders stay crisp at any popup width.

```
┌──────────┬────────────────┬──────────┐
│  Corner  │   Top Edge     │  Corner  │
│  (fixed) │  (stretched)   │  (fixed) │
├──────────┼────────────────┼──────────┤
│   Left   │    Center      │  Right   │
│  (stretched) (stretched)  │(stretched)│
├──────────┼────────────────┼──────────┤
│  Corner  │  Bottom Edge   │  Corner  │
│  (fixed) │  (stretched)   │  (fixed) │
└──────────┴────────────────┴──────────┘
```

### Settings

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `background.texture` | String | Built-in `popup_bg.png` | Namespaced texture path |
| `background.textureWidth` | Integer | 16 | Source PNG width in pixels |
| `background.textureHeight` | Integer | 16 | Source PNG height in pixels |
| `background.renderMode` | String | `NINE_SLICE` | `NINE_SLICE` for scalable rendering, `STRETCH` for simple stretch |
| `background.sliceBorder` | Integer | 4 | Border size in pixels for 9-slice regions |

### Animated Texture Backgrounds

Texture backgrounds can use spritesheet animation. Frames are stacked vertically in the PNG, and you specify timing in the `animation` block:

```json
{
  "background": {
    "style": "TEXTURE",
    "texture": "mypack:textures/gui/animated_bg.png",
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
| `animation.frames` | Integer | Number of frames in the vertical spritesheet |
| `animation.frameTimeMs` | Integer | Milliseconds per frame |
| `animation.interpolate` | Boolean | `true` = cross-fade between frames, `false` = hard cut |

:::tip
For creating your own textures from scratch, see the [Custom Textures Guide](./custom-textures.md) for format requirements, resource pack setup, and complete examples.
:::

---

## BANNER

The default and most visually rich background style. Banners support two independent texture layers — a body and an accent — each with their own tint, opacity, animation, and positioning.

### Layer Structure

| Layer | Purpose | Default Texture |
|-------|---------|----------------|
| Body | Main background stretching the full width | `banner_body.png` |
| Accent | Overlay/decoration layer with independent positioning | `banner_accent.png` |

### Body Settings

| Setting | Default | Range | Description |
|---------|---------|-------|-------------|
| `bodyAlpha` | `1.0` | 0–1 | Body layer opacity |
| `bodyTint` | `0xFFFFFFFF` | — | Tint color applied to body texture |
| `bodyAnimSpeed` | `4` | 0–100 | Spritesheet animation speed (ticks per frame) |

### Accent Settings

| Setting | Default | Range | Description |
|---------|---------|-------|-------------|
| `showAccent` | `true` | — | Show/hide the accent layer |
| `accentAlpha` | `1.0` | 0–1 | Accent layer opacity |
| `accentTint` | `0xFFFFFFFF` | — | Tint color applied to accent texture |
| `accentAnimSpeed` | `4` | 0–100 | Spritesheet animation speed |
| `accentXOffset` | `0` | -50–50 | Horizontal offset |
| `accentYOffset` | `0` | -50–50 | Vertical offset |
| `accentAnchor` | `ICON` | — | Anchor point: `ICON`, `CENTER`, or `EDGE` |

### Built-In Decorations

| Name | Description |
|------|-------------|
| `default_banner` | Standard banner with body and accent layers |
| `gilded` | Gold-accented decoration with gilded overlay |
| `ribbon` | Ribbon-style body with ribbon accent |

:::tip
Set a decoration with the `decoration` config key or per-item via `background.decoration` in override JSON. Decorations are presets that configure both layers automatically.
:::

### Custom Layers via Overrides

You can define entirely custom banner layers in override JSON instead of using a decoration preset. Each layer has independent texture, positioning, tint, animation, and opacity:

```json
{
  "background": {
    "style": "BANNER",
    "layers": [
      {
        "texture": "lootlog:textures/gui/lootlog/banner_body.png",
        "sourceHeight": 12,
        "tint": "FFB9F2FF",
        "alpha": 0.9
      },
      {
        "texture": "lootlog:textures/gui/lootlog/banner_accent_animated.png",
        "sourceHeight": 10,
        "frames": 4,
        "animSpeed": 4,
        "anchor": "ICON"
      }
    ]
  }
}
```

### Layer Fields

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `texture` | String | Yes | — | Namespaced path to the texture PNG |
| `sourceHeight` | Integer | Yes | — | Height of one animation frame in pixels |
| `frames` | Integer | No | 1 | Number of animation frames (vertically stacked in PNG) |
| `tint` | String | No | `FFFFFFFF` | Hex color tint applied to the texture (RGB or ARGB) |
| `alpha` | Float | No | 1.0 | Layer opacity (0.0–1.0) |
| `animSpeed` | Integer | No | 0 | Animation speed factor — 0 = static, higher = slower |
| `xOffset` | Integer | No | 0 | Horizontal pixel offset from anchor |
| `yOffset` | Integer | No | 0 | Vertical pixel offset from anchor |
| `visible` | Boolean | No | true | Show or hide this layer |
| `anchor` | String | No | `EDGE` | Positioning anchor: `EDGE`, `ICON`, `NAME`, or `COUNT` |

### Anchor Points

| Anchor | Description |
|--------|-------------|
| `EDGE` | Aligned to the banner's decorative edge — best for full-width body layers |
| `ICON` | Aligned to the item icon position — best for highlight accents |
| `NAME` | Aligned to the item name text |
| `COUNT` | Aligned to the count text |

### Layer Animation

Animated layers use vertical spritesheets. Frames cross-fade automatically based on `animSpeed`:

| animSpeed | Time per frame | Use case |
|-----------|---------------|----------|
| 0 | Static (no animation) | Standard textures |
| 1 | 50ms | Very fast shimmer |
| 4 | 200ms (default) | Smooth animation |
| 8 | 400ms | Slow pulse |
| 20 | 1000ms | Very slow cycle |

For a complete guide on creating your own textures and spritesheets, see the [Custom Textures Guide](./custom-textures.md).

### Element Order

In banner and flat modes, you can reorder the HUD elements:

| Setting | Default |
|---------|---------|
| `bannerElementOrder` | `PICKUP_COUNT,NAME,ICON,TOTAL_COUNT` |

Valid elements: `PICKUP_COUNT`, `NAME`, `ICON`, `TOTAL_COUNT`

---

## FLAT

Similar layout to banner mode but with a solid color background that extends from the screen edge. Uses the same element ordering and layout settings as banner mode.

| Setting | Default | Description |
|---------|---------|-------------|
| `backgroundColor` | `0xAA000000` | ARGB color for the flat background |
