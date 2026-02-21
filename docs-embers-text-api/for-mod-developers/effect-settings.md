---
sidebar_position: 7
title: EffectSettings
description: The per-character mutable rendering state passed through the effect chain.
---

# EffectSettings

`EffectSettings` is the mutable state object that represents how a single character will be rendered. It is created fresh for each character and passed sequentially through every effect applied to that character's span.

**Package:** `net.tysontheember.emberstextapi.immersivemessages.effects`

---

## Position and Transform

| Field | Type | Default | Description |
|---|---|---|---|
| `x` | `float` | `0.0` | Horizontal pixel offset from the character's natural position |
| `y` | `float` | `0.0` | Vertical pixel offset |
| `rot` | `float` | `0.0` | Rotation angle in radians |
| `scale` | `float` | `1.0` | Scale multiplier |

Effects modify these to move, rotate, or resize individual characters.

---

## Color and Transparency

| Field | Type | Default | Description |
|---|---|---|---|
| `r` | `float` | `1.0` | Red channel (0.0–1.0) |
| `g` | `float` | `1.0` | Green channel (0.0–1.0) |
| `b` | `float` | `1.0` | Blue channel (0.0–1.0) |
| `a` | `float` | `1.0` | Alpha / opacity (0.0 = invisible, 1.0 = fully opaque) |

Color effects (rainbow, gradient) write `r`, `g`, `b`. Transparency effects (fade, typewriter) write `a`.

---

## Character Context (Read-Only)

These fields provide information about the character being rendered. Effects read these but should not modify them.

| Field | Type | Description |
|---|---|---|
| `index` | `int` | Character index within the current span (0-based) |
| `absoluteIndex` | `int` | Global character index across all spans in the message |
| `codepoint` | `int` | Unicode codepoint of the character |
| `isShadow` | `boolean` | `true` if this is the shadow rendering pass |
| `shadowOffset` | `float` | Distance between shadow and main text |

---

## Animation State

| Field | Type | Description |
|---|---|---|
| `typewriterTrack` | `TypewriterTrack` | Active typewriter animation state |
| `typewriterIndex` | `int` | Global position offset for typewriter ordering |
| `obfuscateKey` | `Object` | Cache key for obfuscation tracking |
| `obfuscateStableKey` | `Object` | Stable cache key (for tooltips that re-render) |
| `obfuscateTrack` | `ObfuscateTrack` | Active obfuscation animation state |
| `obfuscateSpanStart` | `int` | Span-local start index |
| `obfuscateSpanLength` | `int` | Span-local length |
| `useRandomGlyph` | `boolean` | If `true`, render a random glyph instead of the real character |

---

## Multi-Layer Support (Siblings)

Some effects (neon, glitch) render additional character layers — glow rings, displaced slices, chromatic fringes. They do this by adding "sibling" `EffectSettings` objects.

```java
/** Get or create the siblings list (lazy initialization). */
List<EffectSettings> getSiblings()

/** Add a sibling layer. */
void addSibling(EffectSettings sibling)

/** Check if any siblings were added (without creating the list). */
boolean hasSiblings()

/** Safe iteration — returns empty list if no siblings (does NOT create the list). */
List<EffectSettings> getSiblingsOrEmpty()
```

Each sibling is rendered as an additional glyph pass after the main character.

---

## Vertical Masking

| Field | Type | Default | Description |
|---|---|---|---|
| `maskTop` | `float` | `0.0` | Fraction of the character masked from the top (0.0 = nothing masked) |
| `maskBottom` | `float` | `0.0` | Fraction masked from the bottom |

Used by glitch effects to split characters into horizontal bands.

---

## Utility Methods

```java
/** Create a deep copy of this settings object. */
EffectSettings copy()

/** Reset position, color, and transform to defaults (preserves context fields). */
void reset()

/** Clamp all RGBA values to the 0.0–1.0 range. */
void clampColors()

/** Get the packed ARGB color as an integer. */
int getPackedColor()
```

---

## How Effects Use EffectSettings

A concrete example — the wave effect:

```java
public class WaveEffect extends BaseEffect {
    private final float amplitude;
    private final float frequency;

    public WaveEffect(Params params) {
        super(params);
        this.amplitude = params.getDouble("a").map(Number::floatValue).orElse(1.0f);
        this.frequency = params.getDouble("f").map(Number::floatValue).orElse(1.0f);
    }

    @Override
    public void apply(EffectSettings settings) {
        // Read: character index (for phase offset between characters)
        float phase = settings.index * 0.2f;

        // Read: current time
        float time = Util.getMillis() * 0.002f * frequency;

        // Write: vertical offset
        settings.y += Math.sin(time + phase) * amplitude;
    }
}
```

The effect reads `index` for phase offset and writes `y` for displacement. It leaves color, alpha, and rotation unchanged.

---

## Shadow Layer

Effects that should not modify the shadow pass check `isShadow`:

```java
@Override
public void apply(EffectSettings settings) {
    if (settings.isShadow) {
        return;  // Skip shadow — shadows keep their original color/position
    }
    // ... modify settings normally
}
```

Color effects (rainbow, gradient, color) all skip the shadow layer.

---

## Creating Sibling Layers

For effects that need to render additional copies of a character:

```java
@Override
public void apply(EffectSettings settings) {
    // Create a glow layer
    EffectSettings glow = settings.copy();
    glow.r = 1.0f;
    glow.g = 1.0f;
    glow.b = 1.0f;
    glow.a *= 0.3f;      // Semi-transparent
    glow.scale *= 1.2f;  // Slightly larger

    settings.addSibling(glow);

    // Main character renders with original settings (unchanged)
}
```

Siblings are rendered after the main character.
