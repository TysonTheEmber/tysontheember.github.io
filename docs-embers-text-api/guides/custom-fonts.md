---
sidebar_position: 4
title: Custom Fonts
description: How to use TrueType and OpenType fonts with SDF rendering for crisp, resolution-independent text.
---

# Custom Fonts

Embers Text API includes an **MSDF (Multi-Channel Signed Distance Field) font provider** that renders TrueType (.ttf) and OpenType (.otf) fonts with crisp anti-aliasing at any scale. Unlike Minecraft's built-in bitmap fonts, MSDF fonts stay sharp when scaled up or viewed at high GUI scales — with perfect corner reproduction on letters like A, M, W, and N.

All ETA effects (rainbow, wave, shake, glitch, neon, etc.) work with SDF fonts — no extra configuration needed.

:::tip
If you experience GPU compatibility issues with SDF fonts, you can disable SDF rendering entirely with the `sdfEnabled` client config option. See [Configuration](./configuration.md#performance) for details.
:::

## Platform Availability

| Platform | Vector (SDF) | Bitmap (Vanilla) |
|---|---|---|
| NeoForge 1.21.1 | Supported | Supported |
| Fabric 1.21.1 | Supported | Supported |
| Fabric 1.20.1 | Supported | Supported |
| Forge 1.20.1 | Supported | Supported |

**Vector (SDF)** renders TrueType/OpenType fonts using signed distance field textures — crisp at any scale. MC 1.21.1 ships with LWJGL FreeType natively. For MC 1.20.1, ETA includes a built-in FreeType compatibility layer that works with LWJGL 3.3.1's bundled natives.

**Raster (Bitmap)** is Minecraft's default font rendering — pixel-art style glyphs from PNG sprite sheets. Always available on all platforms.

## Setting Up an SDF Font

### 1. Place the font file

Put your `.ttf` or `.otf` file in a resource pack at:

```
assets/<namespace>/font/<filename>
```

For example: `assets/mypack/font/norse.otf`

### 2. Create the font JSON

Create a font definition JSON at `assets/<namespace>/font/<fontname>.json`:

```json
{
  "providers": [
    {
      "type": "emberstextapi:sdf",
      "file": "mypack:norse.otf",
      "size": 16.0,
      "sdf_resolution": 48,
      "padding": 4,
      "px_range": 8.0,
      "angle_threshold": 3.0,
      "oversample": 1.0,
      "shift": [0.0, 0.0],
      "skip": ""
    }
  ]
}
```

### 3. Use the font in markup

Reference it with the `<font>` tag:

```markup
<font id=mypack:norse>This text uses the Norse font</font>
```

The `id` is `<namespace>:<fontname>` — matching the JSON file path without the `.json` extension.

## Configuration Options

| Parameter | Type | Default | Description |
|---|---|---|---|
| `type` | string | — | Must be `"emberstextapi:sdf"` |
| `file` | string | — | Resource location of the font file (e.g., `"mypack:norse.otf"`) |
| `size` | float | `16.0` | Font size in Minecraft units |
| `sdf_resolution` | int | `48` | Resolution of the MSDF texture per glyph (higher = more detail, more memory) |
| `padding` | int | `4` | Padding around each glyph in the MSDF texture |
| `px_range` | float | `8.0` | Pixel range — how many pixels the distance field spans on each side of edges. Higher = smoother anti-aliasing, lower = sharper. Range: 2–32. |
| `angle_threshold` | float | `3.0` | Corner detection threshold in radians. Lower values detect more corners for sharper reproduction. Range: 0–π. Default 3.0 ≈ 171.9°. |
| `spread` | float | `4.0` | **Deprecated** — use `px_range` instead. If present without `px_range`, converted as `px_range = spread × 2`. |
| `oversample` | float | `1.0` | Display scale divisor — glyphs render at `size / oversample` MC units. Higher values = smaller display. |
| `shift` | float[2] | `[0, 0]` | Horizontal and vertical offset in MC units |
| `skip` | string | `""` | Characters to skip (won't be provided by this font) |

### Tuning Tips

- **`sdf_resolution`**: 48 works well for most fonts. Increase to 64 or 96 for fonts with very fine details. Higher values use more texture memory.
- **`px_range`**: Controls the anti-aliasing width. Values of 4.0–8.0 work well. Lower values give sharper edges; higher values give smoother transitions at distance.
- **`angle_threshold`**: Controls corner sharpness. The default (3.0 radians ≈ 171.9°) detects only very sharp corners. Lower values (e.g., 2.0) detect more corners, giving sharper letter shapes at the cost of slightly more complex distance fields.
- **`shift`**: Use this to fine-tune vertical or horizontal alignment. For example, `[0.0, 1.0]` shifts the text down by 1 MC unit.
- **`size`**: This controls the scale of the rendered glyphs. Adjust to match the visual size you want relative to Minecraft's default font.

## Combining with Bitmap Fallback

You can include both SDF and bitmap providers in the same font JSON. Minecraft tries providers in order and uses the first one that supports a given character:

```json
{
  "providers": [
    {
      "type": "emberstextapi:sdf",
      "file": "mypack:norse.otf",
      "size": 16.0
    },
    {
      "type": "bitmap",
      "file": "minecraft:font/ascii.png",
      "ascent": 7,
      "chars": ["..."]
    }
  ]
}
```

This is also how unsupported platforms handle SDF fonts — the SDF provider is skipped, and Minecraft falls through to the bitmap provider.

## Bold Font Variants

Custom fonts can have a **bold variant** that is automatically selected when the `<bold>` tag is used. Instead of Minecraft's default algorithmic bold (which draws the same glyph twice with a 1px offset), you can provide an actual bold typeface for sharper, properly weighted bold text.

### Convention

Bold variants follow a simple naming convention: append `_bold` to the font name.

| Regular font | Bold variant |
|---|---|
| `mypack:norse` | `mypack:norse_bold` |
| `mypack:custom` | `mypack:custom_bold` |

### Setup

1. Place the bold font file alongside the regular one:

```
assets/mypack/font/norse.otf
assets/mypack/font/norse_bold.otf
```

2. Create a matching font JSON — same parameters, different file:

```json title="assets/mypack/font/norse_bold.json"
{
  "providers": [
    {
      "type": "emberstextapi:sdf",
      "file": "mypack:norse_bold.otf",
      "size": 16.0,
      "sdf_resolution": 48,
      "padding": 4,
      "px_range": 8.0,
      "shift": [0.0, 0.0],
      "skip": ""
    }
  ]
}
```

### Usage

When `<bold>` wraps text that uses a custom font, ETA automatically looks for the `_bold` variant:

```markup
<bold><font id=mypack:norse>This uses norse_bold automatically</font></bold>
<font id=mypack:norse><b>This also works — tag order doesn't matter</b></font>
```

If no `_bold` variant exists for a **bundled** ETA font, ETA skips the bold auto-switch and keeps the regular face — you won't lose the custom font. For third-party fonts that lack a `_bold` asset, Minecraft will silently fall back to its default font.

:::tip
You can still reference the bold font directly if needed:

```markup
<font id=mypack:norse_bold>Explicit bold font</font>
```
:::

### Bundled Fonts

ETA ships with the following fonts ready to use — no resource pack or setup required:

| Font | Designer | License | Regular ID | Bold ID | Short Names |
|---|---|---|---|---|---|
| Norse | Joel Carrouche | Free with attribution | `emberstextapi:norse` | `emberstextapi:norse_bold` | `norse`, `norse_bold` |
| Metamorphous | Sorkin Type Co | OFL 1.1 | `emberstextapi:metamorphous` | *(none — stays regular)* | `metamorphous`, `meta` |
| Cinzel | Natanael Gama | OFL 1.1 | `emberstextapi:cinzel` | `emberstextapi:cinzel_bold` | `cinzel`, `cinzel_bold` |
| Almendra | Ana Megías | OFL 1.1 | `emberstextapi:almendra` | `emberstextapi:almendra_bold` | `almendra`, `almendra_bold` |
| Cardo | David J. Perry | OFL 1.1 | `emberstextapi:cardo` | `emberstextapi:cardo_bold` | `cardo`, `cardo_bold` |

All bundled fonts use ETA's SDF renderer for crisp scaling at any GUI scale.

:::note
Metamorphous changed from Minecraft's vanilla TTF renderer to the SDF renderer starting in ETA 2.9.0
(affects Forge/Fabric 1.20.1 only — 1.21.1 was already using SDF).
:::

## Font Short Names

Instead of typing a full `namespace:path` ResourceLocation, you can use a short name alias with any of the four supported attribute names (`id`, `value`, `font`, `name`):

```markup
<!-- Short name — same result as the full ID below -->
<font name=cinzel>Text in Cinzel</font>

<!-- Full ResourceLocation — still works, no change -->
<font id=emberstextapi:cinzel>Text in Cinzel</font>
```

Short names are **case-insensitive** — `<font name=NORSE>` and `<font name=norse>` resolve to the same font.

### Registering Custom Aliases (Java API)

Third-party mods can register their own aliases via `FontAliasRegistry.registerCustom()`:

```java
// Call from your mod's client initializer
FontAliasRegistry.registerCustom("myfont", ResourceLocation.parse("mymod:myfont"));
```

After registering, markup authors in your modpack can use `<font name=myfont>` in commands.

:::warning
Built-in ETA font aliases (`norse`, `cinzel`, etc.) cannot be overwritten. Choose a unique alias name that includes your mod ID prefix to avoid collisions, for example `"mymod_myfont"`.
:::

## How It Works

The MSDF provider uses FreeType to extract vector outlines from the font file, then generates a **multi-channel signed distance field** texture for each glyph. Unlike traditional single-channel SDF, MSDF encodes distance information in three color channels (RGB), where each channel tracks the distance to a differently-colored subset of the glyph's edges.

A custom fragment shader takes the **median** of the three channels to reconstruct the correct distance at any point — including at sharp corners where traditional SDF would produce rounded artifacts.

This approach is based on Viktor Chlumsky's MSDF algorithm, an evolution of Valve's SDF text rendering. The key advantages:
- **Sharp corners** — Letters like A, M, W, N maintain crisp corners even at high zoom
- **No bitmap intermediary** — Distance is computed analytically from Bézier curves, not approximated from a rasterized bitmap
- **Artifact-free** — Cross-product sign determination eliminates winding number errors that caused stray pixels in the old approach

### Rendering Quality

The MSDF generator uses several techniques to ensure clean rendering:

- **Analytical Bézier distance** — Closest point on quadratic/cubic Bézier curves is found via Newton-Raphson refinement, not subdivision approximation. This provides sub-pixel accuracy.
- **Edge coloring** — At corners, adjacent edges are assigned different color channels (e.g., Cyan/Magenta/Yellow). The median operation in the shader then produces a sharp transition instead of the rounding that monochrome SDF inherently causes.
- **Pseudo-distance** — The perpendicular (orthogonal) distance to the tangent line at the closest point is used instead of true Euclidean distance. This prevents "bleeding" around segment endpoints.
- **Error correction** — After MSDF generation, a post-processing pass detects and corrects texels where the median disagrees with neighboring texels, fixing any remaining false-color artifacts.
- **Degenerate segment filtering** — Tiny segments that bold fonts produce at stroke junctions are filtered out during outline extraction.

All of this happens during one-time texture generation — MSDF textures are cached per glyph, so there is no per-frame cost.

## Troubleshooting

### Rendering Artifacts

If you see visual artifacts with custom fonts, launch Minecraft with the JVM argument:

```
-Deta.sdf.debug=true
```

This dumps each glyph's raw MSDF texture as an RGB PNG to `<game_dir>/debug-sdf/`. Each color channel shows the distance to edges of that color. The median of the three channels determines inside/outside.

**Workarounds for persistent issues:**
- Try increasing `sdf_resolution` (e.g., 64 or 96) — higher resolution provides more detail
- Try adjusting `px_range` — a smaller value (e.g., 4.0) gives sharper edges, a larger value (e.g., 12.0) gives smoother transitions
- Try lowering `angle_threshold` (e.g., 2.5) — this detects more corners for sharper reproduction
- Report the issue with the font name and affected characters

### Halo / Fringe Around Text (MC 1.20.1)

If you see a faint halo or fringe around SDF text edges on MC 1.20.1, make sure you are running ETA 2.9.0 or later. Earlier versions had a rendering issue where MC 1.20.1's blit-to-screen read semi-transparent alpha values from SDF anti-aliasing, creating a visible fringe. This was fixed in 2.9.0 with an alpha-preserving blend function in the SDF shader.

If you are developing a custom SDF shader for MC 1.20.1, define the blend state in the **shader JSON** (not in a `TransparencyStateShard`):

```json
"blend": {
    "func": "add",
    "srcrgb": "srcalpha",
    "dstrgb": "1-srcalpha",
    "srcalpha": "0",
    "dstalpha": "1"
}
```

See [Compatibility — Alpha-Preserving Blend](../java-api/advanced/compatibility.md#font-renderers) for the full technical explanation.

### Blurry Text at Small Sizes

If SDF text looks blurry at normal GUI scale, try increasing `oversample`:

```json
"oversample": 2.0
```

This makes the glyph render smaller but with more texture detail per displayed pixel.

### Font Not Appearing

- Verify the `file` path matches the actual font file location: `assets/<namespace>/font/<filename>`
- Check logs for `EmbersTextAPI/SDFGlyphProvider` messages — initialization errors are logged there
- Ensure the JSON `type` is exactly `"emberstextapi:sdf"`
- On older Minecraft versions, check that ETA is loaded (the SDF provider type won't exist without it)

---

## Font Credits & Licenses

ETA bundles the following fonts. The SIL Open Font License (OFL 1.1) permits redistribution alongside software, including open-source Minecraft mods.

| Font | Designer | License | Source |
|---|---|---|---|
| Norse | Joel Carrouche | Free with attribution | https://www.dafont.com/norse.font |
| Metamorphous | Sorkin Type Co | [OFL 1.1](https://scripts.sil.org/OFL) | https://fonts.google.com/specimen/Metamorphous |
| Cinzel | Natanael Gama / The Cinzel Project Authors | [OFL 1.1](https://scripts.sil.org/OFL) | https://github.com/NDISCOVER/Cinzel |
| Almendra | Ana Megías | [OFL 1.1](https://scripts.sil.org/OFL) | https://fonts.google.com/specimen/Almendra |
| Cardo | David J. Perry | [OFL 1.1](https://scripts.sil.org/OFL) | https://fonts.google.com/specimen/Cardo |

Full license texts and per-font copyright notices are documented in [`FONT_LICENSES.md`](https://github.com/TysonTheEmber/EmbersTextAPI/blob/main/FONT_LICENSES.md) in the project repository.
