---
sidebar_position: 6
title: Effect Registry
description: EffectRegistry API, registration, Effect interface, BaseEffect, and the preset system.
---

# Effect Registry

`EffectRegistry` is the central factory for all effects. Built-in effects are registered and locked during client setup. Third-party mods can register custom effects with unique names.

**Package:** `net.tysontheember.emberstextapi.immersivemessages.effects`

---

## Effect Interface

Every effect implements this interface:

```java
public interface Effect {

    /** Apply this effect to a character's rendering state. Called once per character per frame. */
    void apply(@NotNull EffectSettings settings);

    /** The canonical name of this effect. Used for serialization and registry lookup. */
    @NotNull String getName();

    /** Serialize to string: "effectName key1=value1 key2=value2". Default returns just the name. */
    @NotNull default String serialize() { return getName(); }
}
```

---

## BaseEffect

Abstract base class that most effects extend. Provides parameter handling and color parsing utilities.

```java
public abstract class BaseEffect implements Effect {

    public BaseEffect(Params params) { ... }

    /** Get the raw parameters passed to this effect. */
    public Params getParams() { ... }

    /** Parse a hex color string to RGB float array [r, g, b]. Accepts "FF0000" or "#FF0000". */
    protected static Optional<float[]> parseColor(String hex) { ... }

    /** Parse a color from a named parameter with a default fallback. */
    protected static float[] parseColor(Params params, String key, float[] defaultColor) { ... }

    /** Convert packed RGB integer to float array [r, g, b]. */
    protected static float[] intToRGB(int packed) { ... }

    /** Convert RGB float values to packed integer. */
    protected static int rgbToInt(float r, float g, float b) { ... }
}
```

---

## EffectRegistry API

### Registering an Effect

```java
/**
 * Register an effect factory.
 * Names are case-insensitive (normalized to lowercase).
 * After the registry is locked, built-in names cannot be overwritten.
 */
public static synchronized void register(String name, Function<Params, Effect> factory)
```

**Example:**

```java
EffectRegistry.register("fan", FanEffect::new);
```

### Creating an Effect

```java
/** Create an effect by name with the given parameters. */
public static Effect create(String name, Params params)

/** Parse and create an effect from a tag content string: "effectName key1=value1" */
public static Effect parseTag(String tagContent)
```

**Example:**

```java
Effect wave = EffectRegistry.create("wave", TypedParams.of("a", 2.0, "f", 1.5));
Effect neon = EffectRegistry.parseTag("neon r=3 i=2.0");
```

### Query Methods

```java
public static boolean isRegistered(String name)      // Check if registered
public static Set<String> getRegisteredEffects()     // All registered names
public static boolean isBuiltIn(String name)         // Is it a locked built-in?
public static boolean isLocked()                     // Is registry locked?
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

This is called by ETA during its client setup. You don't need to call it yourself.

---

## Built-In Effect Names

These names are locked after initialization and cannot be overwritten:

| Name | Aliases | Category |
|---|---|---|
| `rainbow`, `rainb` | — | Color |
| `grad`, `gradient` | — | Color |
| `color` | — | Color |
| `pulse` | — | Color |
| `fade` | — | Color / Global |
| `wave` | — | Motion |
| `shake` | — | Motion |
| `bounce` | — | Motion |
| `circle` | — | Motion |
| `wiggle` | — | Motion |
| `pend`, `pendulum` | — | Motion |
| `swing` | — | Motion |
| `scroll` | — | Motion |
| `turb`, `turbulence` | — | Motion |
| `glitch` | — | Special |
| `neon`, `glow` | — | Special |
| `shadow` | — | Special |
| `typewriter`, `type` | — | Animation |
| `obfuscate` | — | Animation |

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

**Implementations:**
- `EmptyParams` — no parameters (singleton, use `Params.EMPTY`)
- `TypedParams` — wraps an immutable map of parsed key-value pairs

**Creating TypedParams programmatically:**

```java
Params params = TypedParams.of("a", 2.0, "f", 1.5);
```

---

## ValidationHelper

Utility for clamping parameter values to safe ranges:

```java
/**
 * Clamp a float value, logging a warning if it was out of range.
 *
 * @param effectName Name of the effect (for log messages)
 * @param paramName  Name of the parameter (for log messages)
 * @param value      The value to clamp
 * @param min        Minimum allowed value
 * @param max        Maximum allowed value
 * @return Clamped value
 */
public static float clamp(String effectName, String paramName, float value, float min, float max)
```

---

## Preset System

### What Is a Preset?

A preset is a reusable bundle of effects and style overrides defined in a JSON file. Presets are used as markup tags (e.g., `<epic>`, `<legendary>`).

### PresetDefinition

```java
public record PresetDefinition(
    String name,
    int formatVersion,
    List<EffectEntry> effects,
    StyleOverrides styles
)

public record EffectEntry(
    String type,                    // Effect name
    Map<String, Object> params      // Effect parameters
)

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

Presets live in `assets/emberstextapi/presets/` — the filename (without `.json`) is the tag name.

```json title="assets/emberstextapi/presets/fire.json"
{
  "format_version": 1,
  "effects": [
    { "type": "grad", "params": { "from": "FF4400", "to": "FFAA00", "f": 1.5 } },
    { "type": "neon", "params": { "r": 2.0, "c": "FF3300", "p": 1.5 } }
  ],
  "styles": {
    "bold": true,
    "color": "FF6600"
  }
}
```

Used as: `<fire>FIRE SALE!</fire>`

### Built-In Presets

| File | Tag | Effects | Style |
|---|---|---|---|
| `epic.json` | `<epic>` | Pulse (f=2.0) + Wave | Bold italic purple (#AA00FF) |
| `legendary.json` | `<legendary>` | Rainbow (f=1.5, w=0.8) + Neon | Bold gold (#FFD700) |
| `spooky.json` | `<spooky>` | Shake (a=0.5, f=3.0) + Fade (a=0.4, f=1.5) | Italic dark purple (#2D1B4E) |

### PresetRegistry

```java
public static PresetDefinition get(String name)     // Get by name; null if not found
public static boolean has(String name)              // Check existence
public static void register(PresetDefinition preset) // Register programmatically
```

### Adding Custom Presets

**In a mod:** Place JSON files at `src/main/resources/assets/emberstextapi/presets/`

**In a resource pack:** Place at `assets/emberstextapi/presets/` within the pack.

`PresetLoader` automatically loads all JSON files from this path at mod initialization. Third-party presets load alongside built-in ones.
