---
sidebar_position: 3
title: Creating Custom Presets
description: How to define and use custom effect presets via JSON.
---

# Creating Custom Presets

Presets are reusable bundles of effects and styles that can be used as markup tags. This guide walks through creating your own presets.

---

## Preset File Location

Preset JSON files are loaded from the resource path:

```
assets/emberstextapi/presets/
```

To add a custom preset:
- **In a mod:** Place the JSON file in `src/main/resources/assets/emberstextapi/presets/`
- **In a resource pack:** Place it in `assets/emberstextapi/presets/` within the pack's `assets` folder.

The file name (without `.json`) becomes the tag name.

---

## JSON Format

```json
{
  "format_version": 1,
  "effects": [
    {
      "type": "effectName",
      "params": {
        "paramKey": paramValue
      }
    }
  ],
  "styles": {
    "bold": true,
    "italic": false,
    "underline": false,
    "strikethrough": false,
    "obfuscated": false,
    "color": "HEXCOLOR",
    "font": "namespace:path"
  }
}
```

### Fields

| Field | Required | Description |
|---|---|---|
| `format_version` | Yes | Must be `1` (current version). |
| `effects` | Yes | Array of effect definitions. Can be empty `[]` for style-only presets. |
| `styles` | No | Style overrides applied to text using this preset. All fields are optional. |

### Effect Entry

| Field | Required | Description |
|---|---|---|
| `type` | Yes | The registered effect name (e.g., `"rainbow"`, `"wave"`, `"neon"`). |
| `params` | Yes | Object with key-value pairs for the effect's parameters. Can be empty `{}` for defaults. |

---

## Built-In Preset Examples

### epic.json

```json
{
  "format_version": 1,
  "effects": [
    { "type": "pulse", "params": { "f": 2.0 } },
    { "type": "wave", "params": { "a": 1.0, "f": 1.0 } }
  ],
  "styles": {
    "bold": true,
    "italic": true,
    "color": "AA00FF"
  }
}
```

This creates a pulsing, waving purple bold italic effect. Used as `<epic>text</epic>`.

### legendary.json

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

Fast rainbow with a neon glow, gold bold base style.

### spooky.json

```json
{
  "format_version": 1,
  "effects": [
    { "type": "shake", "params": { "a": 0.5, "f": 3.0 } },
    { "type": "fade", "params": { "a": 0.4, "f": 1.5 } }
  ],
  "styles": {
    "italic": true,
    "color": "2D1B4E"
  }
}
```

Gentle shake with fading transparency, dark purple italic.

---

## Creating Your Own Preset

### Example: "fire" Preset

A fire-themed preset with warm gradient and bounce:

**File:** `assets/emberstextapi/presets/fire.json`

```json
{
  "format_version": 1,
  "effects": [
    { "type": "grad", "params": { "from": "FF4400", "to": "FFAA00", "f": 1.5, "sp": 15 } },
    { "type": "bounce", "params": { "a": 0.5, "f": 2.0, "w": 0.3 } },
    { "type": "neon", "params": { "r": 2.0, "i": 1.0, "c": "FF3300", "p": 1.5 } }
  ],
  "styles": {
    "bold": true,
    "color": "FF6600"
  }
}
```

**Usage:**

```markup
<fire>FIRE SALE!</fire>
```

This applies:
1. An animated warm gradient (red-orange to gold).
2. A bouncing motion with cascading wave effect.
3. A pulsing red neon glow.
4. Bold orange base color.

### Example: "whisper" Preset (Style-Only)

A style-only preset with no effects:

**File:** `assets/emberstextapi/presets/whisper.json`

```json
{
  "format_version": 1,
  "effects": [],
  "styles": {
    "italic": true,
    "color": "8888AA"
  }
}
```

**Usage:**

```markup
<whisper>...did you hear that?</whisper>
```

---

## Combining Presets with Other Effects

Presets can be wrapped with additional effects in markup:

```markup
<wave a=2.0><fire>Extra wavy fire!</fire></wave>
```

The wave effect is applied on top of whatever the fire preset already does. Since the preset already includes a bounce (vertical motion), this adds a wave motion pattern on top.

---

## Tips

- Keep preset files small and focused. One preset per visual "theme" works best.
- Test presets with short text first — some effect combinations are expensive on long strings (especially neon).
- Use `format_version: 1` — this is the only supported version currently.
- Effect parameter values in JSON follow the same rules as markup attributes: numbers are numbers, strings are strings, booleans are booleans.
- The `styles` section is optional. Omit it entirely if your preset is effects-only.
