---
sidebar_position: 5
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
| `r` | `float` | (from TextColor) | Red channel (0.0–1.0) |
| `g` | `float` | (from TextColor) | Green channel (0.0–1.0) |
| `b` | `float` | (from TextColor) | Blue channel (0.0–1.0) |
| `a` | `float` | `1.0` | Alpha / opacity (0.0 = invisible, 1.0 = fully opaque) |

Color effects (rainbow, gradient) set `r`, `g`, `b`. Transparency effects (fade, typewriter) set `a`.

---

## Character Context (Read-Only)

These fields provide information about the character being processed. Effects read these to determine behavior but should not modify them.

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
| `typewriterTrack` | `TypewriterTrack` | Active typewriter animation state for this context |
| `obfuscateKey` | `Object` | Cache key for obfuscation tracking |
| `obfuscateStableKey` | `Object` | Stable cache key (for tooltips that re-render) |
| `obfuscateTrack` | `ObfuscateTrack` | Active obfuscation animation state |
| `useRandomGlyph` | `boolean` | If `true`, render a random glyph instead of the real character |

---

## Multi-Layer Support

### Siblings

Some effects (neon, glitch) need to render additional character layers — glow rings, displaced slices, chromatic fringes. They do this by adding "sibling" `EffectSettings` objects.

```java
/** Get or create the siblings list (lazy initialization). */
List<EffectSettings> getSiblings()

/** Add a sibling layer. */
void addSibling(EffectSettings sibling)

/** Check if any siblings have been added. */
boolean hasSiblings()
```

Each sibling is rendered as an additional glyph pass after the main character.

### Vertical Masking

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

Here is a concrete example showing how a simple effect interacts with EffectSettings:

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
        // Read: character index (for phase offset)
        float phase = settings.index * 0.2f;

        // Read: current time
        float time = Util.getMillis() * 0.002f * frequency;

        // Write: vertical offset
        settings.y += Math.sin(time + phase) * amplitude;
    }
}
```

The effect:
1. **Reads** `settings.index` to calculate a per-character phase offset.
2. **Writes** `settings.y` to add vertical displacement.
3. Does not touch color, alpha, or rotation — those remain as set by previous effects or defaults.
