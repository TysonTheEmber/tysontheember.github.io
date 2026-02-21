---
sidebar_position: 3
title: Preset System
description: PresetRegistry, PresetDefinition, JSON format, and creating custom presets.
---

# Preset System

Presets are reusable bundles of effects and style overrides that can be used as markup tags. This page covers the preset system's internals and how to create and register custom presets.

---

## What Is a Preset?

A preset bundles:
- A list of effects (with parameters)
- Optional style overrides (bold, italic, color, font)

Once loaded, the preset is available as a markup tag using its name:

```markup
<epic>Epic styled text</epic>
<legendary>Legendary text</legendary>
<mypreset>Custom preset</mypreset>
```

---

## PresetDefinition

```java
public record PresetDefinition(
    String name,
    int formatVersion,
    List<EffectEntry> effects,
    StyleOverrides styles
)

public record EffectEntry(
    String type,                    // Effect name (e.g., "rainbow", "wave")
    Map<String, Object> params      // Effect parameters as key-value pairs
)

public record StyleOverrides(
    Boolean bold,
    Boolean italic,
    Boolean underline,
    Boolean strikethrough,
    Boolean obfuscated,
    String color,                   // Hex color string (e.g., "FFD700")
    String font                     // ResourceLocation string
)
```

---

## JSON Format

Preset JSON files live in: `assets/emberstextapi/presets/`

The filename (without `.json`) is the tag name.

```json title="assets/emberstextapi/presets/fire.json"
{
  "format_version": 1,
  "effects": [
    {
      "type": "grad",
      "params": { "from": "FF4400", "to": "FFAA00", "f": 1.5, "sp": 15 }
    },
    {
      "type": "bounce",
      "params": { "a": 0.5, "f": 2.0, "w": 0.3 }
    },
    {
      "type": "neon",
      "params": { "r": 2.0, "i": 1.0, "c": "FF3300", "p": 1.5 }
    }
  ],
  "styles": {
    "bold": true,
    "color": "FF6600"
  }
}
```

**Field reference:**

| Field | Required | Description |
|---|---|---|
| `format_version` | Yes | Must be `1` |
| `effects` | Yes | Array of effect entries. Can be empty `[]` for style-only presets. |
| `styles` | No | Style overrides. All fields are optional. |

---

## Built-In Presets

### epic.json

```json
{
  "format_version": 1,
  "effects": [
    { "type": "pulse", "params": { "f": 2.0 } },
    { "type": "wave", "params": { "a": 1.0, "f": 1.0 } }
  ],
  "styles": { "bold": true, "italic": true, "color": "AA00FF" }
}
```

Pulsing, waving purple bold italic. Tag: `<epic>`

### legendary.json

```json
{
  "format_version": 1,
  "effects": [
    { "type": "rainbow", "params": { "f": 1.5, "w": 0.8 } },
    { "type": "neon", "params": {} }
  ],
  "styles": { "bold": true, "color": "FFD700" }
}
```

Fast rainbow with neon glow, bold gold. Tag: `<legendary>`

### spooky.json

```json
{
  "format_version": 1,
  "effects": [
    { "type": "shake", "params": { "a": 0.5, "f": 3.0 } },
    { "type": "fade", "params": { "a": 0.4, "f": 1.5 } }
  ],
  "styles": { "italic": true, "color": "2D1B4E" }
}
```

Gentle shake with fading, dark purple italic. Tag: `<spooky>`

---

## Adding Custom Presets

### In a Mod

Place JSON files at:
```
src/main/resources/assets/emberstextapi/presets/yourpreset.json
```

### In a Resource Pack

Place JSON files at:
```
assets/emberstextapi/presets/yourpreset.json
```

`PresetLoader` automatically discovers all JSON files at this path at mod initialization. Third-party presets load alongside built-in ones without any extra registration.

---

## PresetRegistry API

```java
/** Get a preset by name. Returns null if not found. */
public static PresetDefinition get(String name)

/** Check if a preset is registered. */
public static boolean has(String name)

/** Register a preset programmatically. */
public static void register(PresetDefinition preset)
```

### Registering Programmatically

```java
import net.tysontheember.emberstextapi.immersivemessages.effects.preset.PresetDefinition;
import net.tysontheember.emberstextapi.immersivemessages.effects.preset.PresetRegistry;

PresetDefinition myPreset = new PresetDefinition(
    "mypreset",
    1,
    List.of(
        new EffectEntry("rainbow", Map.of("f", 1.5)),
        new EffectEntry("wave", Map.of("a", 2.0, "f", 1.0))
    ),
    new StyleOverrides(true, false, false, false, false, "FFD700", null)
);

PresetRegistry.register(myPreset);
```

Programmatic registration can happen during mod initialization, before or after the default presets are loaded.

---

## Combining Presets with Effects

Presets can be wrapped with additional effects in markup:

```markup
<wave a=2.0><fire>Extra wavy fire!</fire></wave>
```

The wave effect applies on top of the fire preset's existing bounce and gradient.

---

## Tips

- Keep presets small and focused — one visual "theme" per preset.
- Test with short text first. Neon combined with other expensive effects on long strings can be slow.
- `format_version: 1` is the only supported version.
- Omit the `styles` object entirely for effects-only presets.
- Effect parameter values in JSON follow the same types as markup: numbers are numbers, strings are strings, booleans are booleans.
