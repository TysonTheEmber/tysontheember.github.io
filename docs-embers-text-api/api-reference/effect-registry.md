---
sidebar_position: 4
title: EffectRegistry and Effect Interface
description: The central effect registry, Effect interface, BaseEffect, and preset system.
---

# EffectRegistry and Effect Interface

---

## Effect Interface

Every visual effect implements this interface:

**Package:** `net.tysontheember.emberstextapi.immersivemessages.effects`

```java
public interface Effect {
    /**
     * Apply this effect to a character's rendering state.
     * Called once per character per frame.
     *
     * @param settings The mutable rendering state for this character.
     *                 Modify this object to change how the character is drawn.
     */
    void apply(EffectSettings settings);

    /**
     * Return the canonical name of this effect.
     * Used for serialization and registry lookup.
     */
    String getName();

    /**
     * Serialize this effect to a string for network transmission.
     * The string format is: "effectName key1=value1 key2=value2"
     */
    String serialize();
}
```

---

## BaseEffect

Abstract base class that most effects extend. Provides parameter handling and color parsing utilities.

```java
public abstract class BaseEffect implements Effect {

    /**
     * @param params Parsed parameters from markup or programmatic creation.
     */
    public BaseEffect(Params params) { ... }

    /** Get the raw parameters passed to this effect. */
    public Params getParams() { ... }

    /**
     * Parse a hex color string to an RGB float array [r, g, b].
     * Accepts formats: "FF0000", "#FF0000"
     */
    protected static Optional<float[]> parseColor(String hex) { ... }

    /**
     * Parse a color from a named parameter with a default fallback.
     */
    protected static float[] parseColor(Params params, String key, float[] defaultColor) { ... }

    /**
     * Convert a packed RGB integer to a float array [r, g, b].
     */
    protected static float[] intToRGB(int packed) { ... }

    /**
     * Convert RGB float values to a packed integer.
     */
    protected static int rgbToInt(float r, float g, float b) { ... }
}
```

---

## EffectRegistry

The central, thread-safe registry for all effects.

**Package:** `net.tysontheember.emberstextapi.immersivemessages.effects`

### Registration

```java
/**
 * Register an effect factory.
 * Names are case-insensitive (normalized to lowercase).
 * After the registry is locked, built-in names cannot be overwritten.
 *
 * @param name    Effect name (e.g., "myeffect")
 * @param factory Factory function: Params -> Effect
 * @throws IllegalStateException if overwriting a locked built-in
 */
public static synchronized void register(String name, Function<Params, Effect> factory)
```

### Creation

```java
/**
 * Create an effect by name with the given parameters.
 *
 * @param name   Effect name
 * @param params Parameters
 * @return New effect instance
 * @throws IllegalArgumentException if effect name is unknown
 */
public static Effect create(String name, Params params)

/**
 * Parse and create an effect from a tag content string.
 * Format: "effectName key1=value1 key2=value2"
 *
 * @param tagContent Tag string
 * @return New effect instance
 */
public static Effect parseTag(String tagContent)
```

### Query

```java
/** Check if an effect name is registered. */
public static boolean isRegistered(String name)

/** Get all registered effect names. */
public static Set<String> getRegisteredEffects()

/** Check if an effect is a built-in (protected) effect. */
public static boolean isBuiltIn(String name)

/** Check if the registry is locked. */
public static boolean isLocked()
```

### Initialization

```java
/**
 * Initialize all built-in effects and lock the registry.
 * Called automatically during mod client setup.
 * Safe to call multiple times (subsequent calls are no-ops).
 */
public static synchronized void initializeDefaultEffects()
```

---

## Params Interface

The `Params` interface provides typed access to effect parameters:

```java
public interface Params {
    OptionalDouble getDouble(String key);
    OptionalBoolean getBoolean(String key);
    Optional<String> getString(String key);
}
```

Implementations:
- `EmptyParams` — no parameters (singleton)
- `TypedParams` — wraps an immutable map of parsed key-value pairs

---

## ValidationHelper

Utility for clamping parameter values to safe ranges:

```java
/**
 * Clamp a float value, logging a warning if it was out of range.
 *
 * @param effectName Name of the effect (for logging)
 * @param paramName  Name of the parameter (for logging)
 * @param value      The value to clamp
 * @param min        Minimum allowed value
 * @param max        Maximum allowed value
 * @return Clamped value
 */
public static float clamp(String effectName, String paramName, float value, float min, float max)
```

---

## Presets

### PresetDefinition

A preset is a reusable bundle of effects and style overrides, defined in JSON:

```java
public record PresetDefinition(
    String name,
    int formatVersion,
    List<EffectEntry> effects,
    StyleOverrides styles
)
```

**EffectEntry:**
```java
public record EffectEntry(
    String type,                    // Effect name
    Map<String, Object> params      // Effect parameters
)
```

**StyleOverrides:**
```java
public record StyleOverrides(
    Boolean bold,
    Boolean italic,
    Boolean underline,
    Boolean strikethrough,
    Boolean obfuscated,
    String color,                   // Hex color string
    String font                     // ResourceLocation string
)
```

### JSON Format

Presets are stored as JSON files in: `assets/emberstextapi/presets/`

```json
{
  "format_version": 1,
  "effects": [
    { "type": "rainbow", "params": { "f": 1.5, "w": 0.8 } },
    { "type": "neon", "params": {} }
  ],
  "styles": {
    "bold": true,
    "color": "FFD700"
  }
}
```

### Built-In Presets

| File | Tag | Effects | Style |
|---|---|---|---|
| `epic.json` | `<epic>` | Pulse (f=2.0) + Wave (a=1.0, f=1.0) | Bold, italic, purple (#AA00FF) |
| `legendary.json` | `<legendary>` | Rainbow (f=1.5, w=0.8) + Neon | Bold, gold (#FFD700) |
| `spooky.json` | `<spooky>` | Shake (a=0.5, f=3.0) + Fade (a=0.4, f=1.5) | Italic, dark purple (#2D1B4E) |

### PresetRegistry

```java
/** Get a preset by name. Returns null if not found. */
public static PresetDefinition get(String name)

/** Check if a preset is registered. */
public static boolean has(String name)

/** Register a custom preset. */
public static void register(PresetDefinition preset)
```

### PresetLoader

Automatically loads all JSON files from the `assets/emberstextapi/presets/` resource path at mod initialization. Third-party mods can add their own preset files to this path via resource packs or mod resources.
