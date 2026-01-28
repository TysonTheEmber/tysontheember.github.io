---
sidebar_position: 3
title: Effect System Design
description: How the effect registry, Effect interface, BaseEffect, and EffectSettings work.
---

# Effect System Design

This page is a deep dive into how the effect system is architected, how effects are registered, created, and applied.

---

## The Effect Interface

Every visual effect implements the `Effect` interface:

```java
public interface Effect {
    /** Apply this effect to a single character's rendering state. */
    void apply(EffectSettings settings);

    /** Return the canonical name of this effect (used for serialization). */
    String getName();

    /** Serialize this effect to a string representation for networking. */
    String serialize();
}
```

The `apply` method is called once per character per frame. It receives the current rendering state and modifies it in place.

---

## BaseEffect

Most effects extend `BaseEffect`, which provides:

- Constructor that accepts a `Params` object.
- Static helper methods for parsing colors from parameters.
- Access to the original parameters via `getParams()`.

```java
public abstract class BaseEffect implements Effect {
    private final Params params;

    public BaseEffect(Params params) {
        this.params = params;
    }

    /** Parse a hex color string to an RGB float array. */
    protected static Optional<float[]> parseColor(String hex) { ... }

    /** Parse a color from a named parameter, with a default. */
    protected static float[] parseColor(Params params, String key, float[] defaultColor) { ... }
}
```

---

## EffectSettings — The Per-Character State

`EffectSettings` is a mutable object that represents everything about how a single character will be rendered. It is created fresh for each character and passed through the effect chain.

### Position and Rotation

| Field | Type | Default | Meaning |
|---|---|---|---|
| `x` | float | 0.0 | Horizontal pixel offset from the character's natural position |
| `y` | float | 0.0 | Vertical pixel offset |
| `rot` | float | 0.0 | Rotation in radians |
| `scale` | float | 1.0 | Scale multiplier |

### Color and Transparency

| Field | Type | Default | Meaning |
|---|---|---|---|
| `r` | float | (from TextColor) | Red channel (0.0–1.0) |
| `g` | float | (from TextColor) | Green channel (0.0–1.0) |
| `b` | float | (from TextColor) | Blue channel (0.0–1.0) |
| `a` | float | 1.0 | Alpha / transparency (0.0 = invisible, 1.0 = opaque) |

### Character Context

| Field | Type | Meaning |
|---|---|---|
| `index` | int | Character index within the current span (0-based) |
| `absoluteIndex` | int | Global character index across all spans in the message |
| `codepoint` | int | Unicode codepoint of the character |
| `isShadow` | boolean | Whether this is the shadow rendering pass |
| `shadowOffset` | float | Distance of the shadow from the main text |

### Animation State

| Field | Type | Meaning |
|---|---|---|
| `typewriterTrack` | TypewriterTrack | Active typewriter animation state |
| `obfuscateTrack` | ObfuscateTrack | Active obfuscation animation state |
| `useRandomGlyph` | boolean | If true, render a random glyph instead of the real character |

### Multi-Layer Support

| Field | Type | Meaning |
|---|---|---|
| `siblings` | List\<EffectSettings\> | Additional character layers (for neon glow rings, glitch slices) |
| `maskTop` | float | Vertical mask from the top (0.0 = no mask, 1.0 = fully masked) |
| `maskBottom` | float | Vertical mask from the bottom |

---

## The EffectRegistry

The `EffectRegistry` is a thread-safe, static registry that maps effect names to factory functions.

### Registration

```java
// Register a custom effect (in your mod's client setup)
EffectRegistry.register("myeffect", params -> new MyCustomEffect(params));
```

Effect names are case-insensitive (normalized to lowercase).

### Built-In Protection

After `initializeDefaultEffects()` runs, built-in effect names are locked. Attempting to overwrite them throws an `IllegalStateException`. You can still register effects with new names.

### Creation

Effects are created in two ways:

**By name and params:**
```java
Effect effect = EffectRegistry.create("rainbow", params);
```

**By parsing a tag string:**
```java
Effect effect = EffectRegistry.parseTag("rainbow f=2.0 w=0.5");
```

The tag format is: `effectName key1=value1 key2=value2 ...`

Parameter types are auto-detected:
- `true` / `false` → Boolean
- Numbers → Double
- Everything else → String
- A key with no `=value` → Boolean `true`

---

## Effect Lifecycle

1. **Registration** — Effect factory registered in `EffectRegistry` during mod initialization.
2. **Parsing** — When markup is parsed, the tag name is looked up in the registry and a new effect instance is created with the parsed parameters.
3. **Storage** — The effect instance is stored in a `TextSpan`'s effect list.
4. **Application** — Each frame, for each character in the span, `effect.apply(settings)` is called.
5. **Serialization** — When the span is sent over the network, each effect is serialized via `effect.serialize()` and deserialized on the other end via `EffectRegistry.parseTag()`.

---

## Shadow Layer Handling

Many effects explicitly check `settings.isShadow` and skip their logic when rendering the shadow layer. This is important because:

- Color effects (rainbow, gradient, pulse) should not color the shadow — the shadow should remain dark.
- The shadow is rendered as a separate pass with `isShadow = true`.

Effects that intentionally modify shadows (like `ShadowEffect`) check for `isShadow = true` and only apply their logic in that case.

---

## Sibling Layers

Effects like `NeonEffect` and `GlitchEffect` create additional rendering layers by adding entries to `settings.siblings`. Each sibling is a copy of the character's `EffectSettings` with modified position, color, or alpha.

After all effects have been applied, the renderer draws the main character and then draws each sibling as an additional pass. This is how multi-ring glows and horizontal slice displacement are achieved without modifying the core rendering engine.

Siblings are lazily initialized — the list is only created when an effect actually calls `settings.addSibling()`.
