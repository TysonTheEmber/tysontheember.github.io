---
sidebar_position: 4
title: Custom Fonts
description: How to use TrueType and OpenType fonts with SDF rendering for crisp, resolution-independent text.
---

# Custom Fonts

Embers Text API includes an **SDF (Signed Distance Field) font provider** that renders TrueType (.ttf) and OpenType (.otf) fonts with crisp anti-aliasing at any scale. Unlike Minecraft's built-in bitmap fonts, SDF fonts stay sharp when scaled up or viewed at high GUI scales.

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
      "spread": 4.0,
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
| `sdf_resolution` | int | `48` | Resolution of the SDF texture per glyph (higher = more detail, more memory) |
| `padding` | int | `4` | Padding around each glyph in the SDF texture |
| `spread` | float | `4.0` | Distance field spread — controls how far the anti-aliasing extends |
| `oversample` | float | `1.0` | Display scale divisor — glyphs render at `size / oversample` MC units. Higher values = smaller display. |
| `shift` | float[2] | `[0, 0]` | Horizontal and vertical offset in MC units |
| `skip` | string | `""` | Characters to skip (won't be provided by this font) |

### Tuning Tips

- **`sdf_resolution`**: 48 works well for most fonts. Increase to 64 or 96 for fonts with very fine details. Higher values use more texture memory.
- **`spread`**: Controls the anti-aliasing falloff. Values of 3.0–6.0 work well. Lower values give sharper edges; higher values give smoother transitions.
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
      "spread": 4.0,
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
Metamorphous changed from Minecraft's vanilla TTF renderer to the SDF renderer starting in ETA 2.x
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

The SDF provider uses FreeType to extract vector outlines from the font file, then generates a signed distance field texture for each glyph. The SDF texture encodes the distance from each pixel to the nearest glyph edge. A custom fragment shader then uses this distance information to render crisp edges at any resolution via `smoothstep` anti-aliasing.

This is the same technique used by modern text renderers like Valve's SDF text and Google's font rendering. The key advantage over bitmap fonts is that a single texture works at all zoom levels — no mipmapping artifacts, no blurriness when scaled up.

### Rendering Quality

The SDF generator uses several techniques to ensure clean edges, especially with bold fonts at large scales:

- **High-resolution Bezier subdivision** — Curves are approximated with 32 line segments for accurate distance and winding number calculations.
- **Degenerate segment filtering** — Tiny segments (including Bezier curves where all control points cluster together) are removed before processing. Bold fonts often produce these at stroke junctions, and they can cause stray bright pixels.
- **Isolated pixel correction** — After SDF generation, a post-processing pass detects pixels whose inside/outside classification disagrees with all four cardinal neighbors and corrects them. This eliminates any remaining edge artifacts without affecting real glyph edges.

All of this happens during one-time texture generation — SDF textures are cached per glyph, so there is no per-frame cost.

## Troubleshooting

### White Dots / Artifacts Above Characters

Some fonts (especially serif fonts like Cinzel with complex outline intersections) may show small white specks above certain characters. This is caused by edge cases in the SDF generator's winding number computation — isolated pixels are incorrectly classified as "inside" the glyph.

**To diagnose**, launch Minecraft with the JVM argument:

```
-Deta.sdf.debug=true
```

This dumps each glyph's raw SDF texture as a PNG to `<game_dir>/debug-sdf/`. Open the PNG files for affected characters and look for bright pixels (value > 128) in areas that should be dark (outside the glyph shape). If you see them, the issue is in SDF generation; if the textures look clean, the issue is in atlas packing or shader rendering.

**Workarounds:**
- Try increasing `sdf_resolution` (e.g., 64 or 96) — higher resolution can reduce winding errors at the cost of more texture memory
- Try adjusting `spread` — a smaller value (e.g., 2.0) shrinks the distance field falloff, which can make stray pixels less visible
- Report the issue with the font name and affected characters so the SDF generator can be improved

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
