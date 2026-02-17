---
sidebar_position: 6
title: Commands Reference
description: In-game commands for testing and sending immersive messages.
---

# Commands Reference

Embers Text API provides several in-game commands for testing effects and sending messages. All commands are available under both `/emberstextapi` (full name) and `/eta` (short alias).

---

## `/eta help`

Displays basic information about the mod and provides links to documentation.

**Permissions:** Available to all players

---

## `/eta test <id>`

Runs a predefined test case to demonstrate various effects and features. Test IDs range from 1 to 33.

**Syntax:**
```
/eta test <id>
```

**Parameters:**
- `id` (integer, 1-33): The test case number to run

**Examples:**
```
/eta test 1    # Basic message
/eta test 10   # Bold and italic markup
/eta test 16   # Item rendering test
/eta test 26   # Rainbow effect test
```

**Common Test Cases:**
| ID | Description |
|---|---|
| 1 | Basic message |
| 2 | Typewriter demo |
| 3 | Obfuscation effect |
| 4 | Message with background |
| 10-15 | Markup and font tests |
| 16-20 | Inline item rendering |
| 21-25 | Inline entity rendering |
| 26-33 | Visual effects (rainbow, glitch, bounce, pulse, swing, turbulence, wave) |

---

## `/eta send <player> <duration> <text>`

Sends a basic immersive message to a player. Supports markup syntax in the text.

**Syntax:**
```
/eta send <player> <duration> <text>
```

**Parameters:**
- `player`: Target player (selector or name)
- `duration`: Duration in ticks (20 ticks = 1 second)
- `text`: Message text (supports markup if it contains `<` and `>`)

**Examples:**

Basic message:
```
/eta send @p 100 Hello, World!
```

With markup:
```
/eta send @a 200 <rainbow>Server restart in 5 minutes!</rainbow>
```

Multiple effects:
```
/eta send PlayerName 150 <neon r=2><bold><gradient from=#FF0000 to=#0000FF>Epic Announcement!</gradient></bold></neon>
```

---

## `/eta sendcustom <player> <data> <duration> <text>`

Sends an advanced message with full control over positioning, background, effects, and styling via NBT data. This command supports three text formats:

1. **Markup syntax** (if text contains `<` and `>`)
2. **JSON text components** (if text starts with `{` or `[`)
3. **Translatable components** (if text starts with `tr:`)
4. **Plain text** (fallback)

**Syntax:**
```
/eta sendcustom <player> <data> <duration> <text>
```

**Parameters:**
- `player`: Target player (selector or name)
- `data`: NBT compound tag with message properties
- `duration`: Duration in ticks (20 ticks = 1 second)
- `text`: Message text (markup, JSON, translatable, or plain)

### NBT Data Properties

#### Positioning & Layout
| Property | Type | Description |
|---|---|---|
| `anchor` | String | Screen anchor: `TOP_CENTER`, `MIDDLE`, `BOTTOM_LEFT`, etc. |
| `align` | String | Horizontal text alignment: `LEFT` (default), `CENTER`, `RIGHT` |
| `offsetX` | Float | Horizontal offset in pixels |
| `offsetY` | Float | Vertical offset in pixels |
| `size` | Float | Text scale multiplier (1.0 = normal) |
| `wrap` | Int | Maximum width in pixels before wrapping |
| `shadow` | Boolean | Enable/disable text shadow |

#### Background & Border
| Property | Type | Description |
|---|---|---|
| `background` | Boolean | Enable semi-transparent background |
| `bgColor` | String | Background color (hex or color name, supports alpha) |
| `bgAlpha` | Float | Background transparency (0.0 = invisible, 1.0 = opaque) |
| `borderColor` | String | Border color (hex or color name, supports alpha) |
| `bgGradient` | Compound/List | Vertical gradient: `{start:"#FF0000", end:"#0000FF"}` or list of colors |
| `borderGradient` | Compound/List | Border gradient (same format as bgGradient) |

#### Texture Background
| Property | Type | Description |
|---|---|---|
| `textureBackground` | String/Compound | Resource location or detailed texture config |

For detailed texture config:
```
{
  location: "modid:path/to/texture",
  u: 0,                    # UV coordinates
  v: 0,
  width: 256,              # Region dimensions
  height: 256,
  atlasWidth: 256,         # Full texture size
  atlasHeight: 256,
  padding: 4.0,            # Padding around text
  scale: 1.0,              # Texture scale
  mode: "stretch"          # "stretch", "crop", or "tile"
}
```

#### Text Styling (Legacy Mode Only)
These properties only apply when **not** using markup syntax:

| Property | Type | Description |
|---|---|---|
| `font` | String | Font resource location (e.g., `"minecraft:alt"`, `"emberstextapi:norse"`) |
| `bold` | Boolean | Bold text |
| `italic` | Boolean | Italic text |
| `underlined` | Boolean | Underlined text |
| `strikethrough` | Boolean | Strikethrough text |
| `obfuscated` | Boolean | Vanilla obfuscation |
| `color` | String | Text color (hex or color name) |

#### Gradient Effects (Legacy Mode)
| Property | Type | Description |
|---|---|---|
| `gradient` | Compound/List | Text gradient: `{start:"#FF0000", end:"#00FF00"}` or list of colors |

#### Animation Effects (Legacy Mode)
| Property | Type | Description |
|---|---|---|
| `typewriter` | Float | Typewriter speed (characters per second) |
| `center` | Boolean | Center text during typewriter effect |
| `obfuscate` | String | Obfuscate mode: `RANDOM`, `LEFT`, `RIGHT`, `CENTER` |
| `obfuscateSpeed` | Float | Obfuscation reveal speed |
| `shakeWave` | Float | Wave shake intensity |
| `shakeCircle` | Float | Circular shake intensity |
| `shakeRandom` | Float | Random shake intensity |
| `charShakeWave` | Float | Per-character wave shake |
| `charShakeCircle` | Float | Per-character circular shake |
| `charShakeRandom` | Float | Per-character random shake |

#### Font Assignment (Markup Mode)
When using markup syntax, you can assign fonts to specific spans:

| Property | Type | Description |
|---|---|---|
| `font` | String | Apply this font to ALL spans globally |
| `font0`, `font1`, etc. | String | Apply font to specific span by index |

**Example:**
```
{font0:"emberstextapi:norse", font1:"minecraft:alt"}
```
This applies the Norse font to the first span and the alt font to the second span.

### Examples

#### Basic Custom Message with Background
```
/eta sendcustom @p {background:true, bgColor:"#80000000", anchor:"MIDDLE"} 150 <rainbow>Important Announcement!</rainbow>
```

#### Message with Position and Scale
```
/eta sendcustom @p {anchor:"TOP_CENTER", offsetY:50, size:1.5, shadow:false} 200 <bold>Quest Complete!</bold>
```

#### Background Gradient
```
/eta sendcustom @p {background:true, bgGradient:{start:"#AA004400", end:"#AA440000"}, borderColor:"gold"} 180 <color value="white">Warning Message</color>
```

#### JSON Text Component Support (NEW in v2.0.0)
You can now use JSON text components directly:
```
/eta sendcustom @p {background:true, anchor:"MIDDLE"} 100 {"text":"Hello","color":"gold","bold":true}
```

Array format:
```
/eta sendcustom @p {size:1.2} 100 [{"text":"Warning: ","color":"red"},{"text":"Low health!","color":"yellow"}]
```

#### Translatable Text Support (NEW in v2.0.0)
Use the `tr:` prefix for translatable components:
```
/eta sendcustom @p {background:true} 100 tr:container.inventory Extra text here
```

This will translate `container.inventory` and append " Extra text here".

#### Legacy Mode with Typewriter
When NOT using markup (no `<` or `>`), you can use legacy NBT properties:
```
/eta sendcustom @p {background:true, bgColor:"#60000000", typewriter:2.0, bold:true, color:"#FFD700", size:1.3} 250 The ancient scroll reveals its secrets...
```

#### Markup Mode with Per-Span Fonts
```
/eta sendcustom @p {font0:"emberstextapi:norse", font1:"minecraft:alt", background:true} 150 <bold>Norse</bold> <italic>Alt Font</italic>
```

This applies the Norse font to the first span ("Norse") and the alt font to the second span ("Alt Font").

#### Texture Background
```
/eta sendcustom @p {textureBackground:{location:"minecraft:textures/block/oak_planks.png", mode:"tile", padding:8}, anchor:"MIDDLE"} 200 <color value="white"><bold>Wooden Sign</bold></color>
```

---

## Command Behavior Notes

### Markup vs. Legacy Mode
The `/eta sendcustom` command automatically detects the text format:

- **Markup mode** (text contains `<` and `>`): Uses the markup parser to create TextSpan objects. NBT styling properties like `bold`, `color`, `italic` are **ignored** (use markup tags instead). Background, positioning, and font assignment still work.

- **JSON mode** (text starts with `{` or `[`): Parses as JSON text component

- **Translatable mode** (text starts with `tr:`): Creates translatable component

- **Legacy mode** (plain text): Creates a literal component and applies NBT styling properties like `bold`, `color`, `gradient`, `typewriter`, etc.

### Markup + NBT Combination
You can combine markup syntax with NBT properties for advanced control:

```
/eta sendcustom @p {
  background:true,
  bgColor:"#AA000000",
  borderGradient:{start:"gold", end:"orange"},
  anchor:"MIDDLE",
  size:1.5,
  font0:"emberstextapi:norse"
} 200 <gradient from="#FFD700" to="#FFA500"><bold>LEGENDARY</bold></gradient>
```

This uses:
- Markup for text effects (`<gradient>`, `<bold>`)
- NBT for background, positioning, scale, and font assignment

---

## Permissions

All commands require operator permission level 2 by default (same as most gameplay commands). This can be configured via Forge's permission system or permission management mods.
