---
sidebar_position: 6
title: Preset System
description: Reusable effect bundles — JSON format, built-in presets, creating custom presets via resource packs.
---

# Preset System

Presets are reusable bundles of effects and style overrides that can be used as markup tags. Instead of writing complex combinations of effects every time, define a preset once and use it by name.

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
| `effects[].type` | Yes | Effect name (e.g., `"rainbow"`, `"wave"`, `"neon"`) |
| `effects[].params` | Yes | Effect parameters as key-value pairs |
| `styles` | No | Style overrides. All fields are optional. |
| `styles.bold` | No | Boolean |
| `styles.italic` | No | Boolean |
| `styles.underline` | No | Boolean |
| `styles.strikethrough` | No | Boolean |
| `styles.obfuscated` | No | Boolean |
| `styles.color` | No | Hex color string (e.g., `"FFD700"`) |
| `styles.font` | No | Font ID or short alias (e.g., `"emberstextapi:norse"` or `"norse"`, `"cinzel"`) |

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

### arcane.json

```json
{
  "format_version": 1,
  "effects": [
    { "type": "neon", "params": { "c": "9944FF" } },
    { "type": "turbulence", "params": { "a": 0.6, "f": 0.8 } }
  ],
  "styles": { "color": "BB88FF", "font": "emberstextapi:cinzel" }
}
```

Neon glow with turbulence, purple Cinzel font. Tag: `<arcane>`

### chaotic.json

```json
{
  "format_version": 1,
  "effects": [
    { "type": "rainbow", "params": { "f": 3.0, "w": 0.4 } },
    { "type": "glitch", "params": { "f": 2.0 } },
    { "type": "bounce", "params": { "a": 1.5, "f": 2.0 } }
  ],
  "styles": { "bold": true }
}
```

Fast rainbow with glitch and bounce, bold. Tag: `<chaotic>`

### divine.json

```json
{
  "format_version": 1,
  "effects": [
    { "type": "neon", "params": { "c": "FFFFAA" } },
    { "type": "wave", "params": { "a": 0.5, "f": 0.6 } },
    { "type": "pulse", "params": { "f": 0.8, "a": 0.3 } }
  ],
  "styles": { "bold": true, "color": "FFD700", "font": "emberstextapi:almendra" }
}
```

Warm neon glow with gentle wave and pulse, bold gold Almendra font. Tag: `<divine>`

### frozen.json

```json
{
  "format_version": 1,
  "effects": [
    { "type": "gradient", "params": { "from": "88CCFF", "to": "FFFFFF" } },
    { "type": "pendulum", "params": { "a": 0.4, "f": 0.5 } },
    { "type": "neon", "params": { "c": "44AAFF" } }
  ],
  "styles": { "italic": true, "font": "emberstextapi:cardo" }
}
```

Ice-blue gradient with pendulum sway and neon, italic Cardo font. Tag: `<frozen>`

### infernal.json

```json
{
  "format_version": 1,
  "effects": [
    { "type": "gradient", "params": { "from": "FF4400", "to": "FFD700" } },
    { "type": "shake", "params": { "a": 0.8, "f": 4.0 } },
    { "type": "neon", "params": { "c": "FF2200" } }
  ],
  "styles": { "bold": true, "font": "emberstextapi:norse" }
}
```

Fire gradient with intense shake and red neon, bold Norse font. Tag: `<infernal>`

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

---

:::tip Java API
For programmatic preset registration and the `PresetRegistry` API, see [Effect Registry - Preset System](../java-api/effect-registry.md#preset-system).
:::
