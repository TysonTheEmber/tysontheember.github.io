---
sidebar_position: 5
---

# NBT Configuration Reference

Complete reference for all NBT tags available in the `/emberstextapi sendcustom` command.

## Overview

NBT (Named Binary Tag) configuration gives you complete control over message appearance and behavior. Use NBT tags with the `sendcustom` command:

```
/emberstextapi sendcustom <player> {nbt_tags_here} <duration> <text>
```

:::tip Data Types
Pay attention to data type suffixes:
- `f` = Float (e.g., `1.5f`)
- `b` = Boolean (e.g., `1b` for true, `0b` for false)
- No suffix = Integer (e.g., `100`)
- Strings use quotes (e.g., `"CENTER_CENTER"`)
:::

---

## Position & Layout

### anchor

Sets where the message appears on screen.

**Type:** String
**Default:** `"CENTER_CENTER"`

**Values:**
- `"TOP_LEFT"`, `"TOP_CENTER"`, `"TOP_RIGHT"`
- `"CENTER_LEFT"`, `"CENTER_CENTER"`, `"CENTER_RIGHT"`
- `"BOTTOM_LEFT"`, `"BOTTOM_CENTER"`, `"BOTTOM_RIGHT"`

**Example:**
```
{anchor:"TOP_CENTER"}
```

---

### align

Sets text alignment relative to anchor point.

**Type:** String
**Default:** `"CENTER"`

**Values:**
- `"LEFT"` - Text extends right from anchor
- `"CENTER"` - Text centers on anchor
- `"RIGHT"` - Text extends left from anchor

**Example:**
```
{anchor:"TOP_RIGHT",align:"RIGHT"}
```

---

### offsetX

Horizontal offset in pixels from anchor point.

**Type:** Integer
**Default:** `0`

- Positive = Move right
- Negative = Move left

**Example:**
```
{offsetX:50}
{offsetX:-30}
```

---

### offsetY

Vertical offset in pixels from anchor point.

**Type:** Integer
**Default:** `0`

- Positive = Move down
- Negative = Move up

**Example:**
```
{offsetY:20}
{offsetY:-50}
```

---

## Colors

### color

Sets solid text color.

**Type:** Integer (hex)
**Default:** `0xFFFFFF` (white)

**Example:**
```
{color:0xFF0000}    // Red
{color:0x00FF00}    // Green
{color:0xFFD700}    // Gold
```

:::note
Using `color` will override any `gradient` setting.
:::

---

### gradient

Creates color gradient across text. Accepts array of colors.

**Type:** Integer array
**Default:** None

**Example:**
```
{gradient:[0xFF0000,0x0000FF]}                    // Two colors
{gradient:[0xFF0000,0xFFFF00,0x00FF00]}          // Three colors
{gradient:[0xFF0000,0xFF7F00,0xFFFF00,0x00FF00,0x0000FF,0x8B00FF]}  // Rainbow
```

---

## Background

### bgColor

Background color (tooltip-style).

**Type:** Integer (hex)
**Default:** None (transparent)

**Example:**
```
{bgColor:0x000000}    // Black
{bgColor:0x1A1A1A}    // Dark gray
{bgColor:0x330000}    // Dark red
```

---

### bgGradient

Background border gradient (requires `bgColor`).

**Type:** Integer array
**Default:** None

**Example:**
```
{bgColor:0x000000,bgGradient:[0xFF0000,0x0000FF]}
```

---

### background

Texture resource location for textured background.

**Type:** String
**Default:** None

**Example:**
```
{background:"minecraft:textures/gui/demo_background.png"}
{background:"emberstextapi:textures/background/custom.png"}
```

---

### backgroundMode

How textured background renders.

**Type:** String
**Default:** `"STRETCH"`

**Values:**
- `"STRETCH"` - Stretches texture to fit
- `"CROP"` - Crops texture to fit
- `"TILE"` - Tiles/repeats texture

**Example:**
```
{background:"minecraft:textures/gui/demo_background.png",backgroundMode:"TILE"}
```

---

### backgroundWidth

Width of textured background in pixels.

**Type:** Integer
**Default:** Calculated from text

**Example:**
```
{backgroundWidth:256}
```

---

### backgroundHeight

Height of textured background in pixels.

**Type:** Integer
**Default:** Calculated from text

**Example:**
```
{backgroundHeight:64}
```

---

### backgroundPaddingX

Horizontal padding for textured background.

**Type:** Integer
**Default:** `0`

**Example:**
```
{backgroundPaddingX:10}
```

---

### backgroundPaddingY

Vertical padding for textured background.

**Type:** Integer
**Default:** `0`

**Example:**
```
{backgroundPaddingY:5}
```

---

## Animations

### typewriter

Speed of typewriter animation in characters per tick.

**Type:** Float
**Default:** None (disabled)

**Example:**
```
{typewriter:1.0f}    // 1 character per tick
{typewriter:2.5f}    // 2.5 characters per tick
{typewriter:0.5f}    // 0.5 characters per tick (slow)
```

---

### typewriterCenter

Whether to re-center text during typewriter animation.

**Type:** Boolean
**Default:** `0b` (false)

**Example:**
```
{typewriter:2.0f,typewriterCenter:1b}
```

:::tip
Use `typewriterCenter:1b` with center-anchored messages for smooth centered typing.
:::

---

### shakeWave

Whole-text wave shake intensity.

**Type:** Float
**Default:** None (disabled)

**Example:**
```
{shakeWave:1.5f}
```

---

### shakeCircle

Whole-text circular shake intensity.

**Type:** Float
**Default:** None (disabled)

**Example:**
```
{shakeCircle:1.5f}
```

---

### shakeRandom

Whole-text random shake intensity.

**Type:** Float
**Default:** None (disabled)

**Example:**
```
{shakeRandom:2.0f}
```

---

### charShakeWave

Per-character wave shake intensity.

**Type:** Float
**Default:** None (disabled)

**Example:**
```
{charShakeWave:1.5f}
```

---

### charShakeCircle

Per-character circular shake intensity.

**Type:** Float
**Default:** None (disabled)

**Example:**
```
{charShakeCircle:1.5f}
```

---

### charShakeRandom

Per-character random shake intensity.

**Type:** Float
**Default:** None (disabled)

**Example:**
```
{charShakeRandom:2.0f}
```

:::warning Multiple Shake Effects
Applying multiple shake effects simultaneously may cause visual conflicts. Use one shake type at a time for best results.
:::

---

### obfuscate

Enable text obfuscation (scrambling).

**Type:** Boolean
**Default:** `0b` (false)

**Example:**
```
{obfuscate:1b}
```

---

### obfuscateReveal

Obfuscation reveal animation direction.

**Type:** String
**Default:** `"NONE"`

**Values:**
- `"NONE"` - Always obfuscated
- `"LEFT_TO_RIGHT"` - Reveals from left
- `"RIGHT_TO_LEFT"` - Reveals from right
- `"CENTER_OUT"` - Reveals from center
- `"RANDOM"` - Random character reveal

**Example:**
```
{obfuscate:1b,obfuscateReveal:"LEFT_TO_RIGHT"}
{obfuscate:1b,obfuscateReveal:"CENTER_OUT"}
```

---

## Timing

### fadeIn

Fade-in duration in ticks.

**Type:** Integer
**Default:** `0` (instant)

**Example:**
```
{fadeIn:20}     // 1 second
{fadeIn:40}     // 2 seconds
{fadeIn:60}     // 3 seconds
```

---

### fadeOut

Fade-out duration in ticks.

**Type:** Integer
**Default:** `0` (instant)

**Example:**
```
{fadeOut:20}    // 1 second
{fadeOut:40}    // 2 seconds
```

---

## Text Formatting

### font

Font resource location.

**Type:** String
**Default:** `"minecraft:default"`

**Built-in Fonts:**
- `"minecraft:default"` - Standard Minecraft font
- `"minecraft:uniform"` - Uniform spacing
- `"minecraft:alt"` - Alternative font

**Example:**
```
{font:"minecraft:uniform"}
{font:"emberstextapi:custom_font"}
```

---

### wrap

Maximum width in pixels before text wraps to new line.

**Type:** Integer
**Default:** None (no wrapping)

**Example:**
```
{wrap:200}    // Wrap at 200 pixels
{wrap:300}    // Wrap at 300 pixels
```

:::tip Wrap Guidelines
- Full screen width: ~320 pixels (GUI scale 1)
- Centered messages: 200-250 pixels
- Side-anchored: 150-200 pixels
:::

---

### shadow

Enable drop shadow.

**Type:** Boolean
**Default:** `0b` (false)

**Example:**
```
{shadow:1b}
```

:::tip Readability
Drop shadow significantly improves readability over complex backgrounds!
:::

---

### size

Text size multiplier (if supported by implementation).

**Type:** Float
**Default:** `1.0f`

**Example:**
```
{size:1.5f}    // 150% size
{size:2.0f}    // 200% size
{size:0.5f}    // 50% size
```

:::note
Size scaling may not be available in all versions. Check your implementation.
:::

---

## Complete Examples

### Example 1: Centered Announcement

```
/emberstextapi sendcustom @p {
  anchor:"CENTER_CENTER",
  align:"CENTER",
  gradient:[0xFFD700,0xFFA500],
  typewriter:2.0f,
  typewriterCenter:1b,
  fadeIn:30,
  fadeOut:30,
  shadow:1b,
  bgColor:0x000000
} 200 "QUEST COMPLETED"
```

**Features:**
- Screen center positioning
- Gold gradient
- Typewriter animation with centering
- Fade effects
- Drop shadow
- Black background

---

### Example 2: Warning Message

```
/emberstextapi sendcustom @p {
  anchor:"TOP_CENTER",
  color:0xFF0000,
  shakeRandom:2.0f,
  shadow:1b,
  bgColor:0x330000,
  bgGradient:[0xFF0000,0x660000],
  fadeIn:5,
  fadeOut:20
} 80 "⚠ DANGER AHEAD ⚠"
```

**Features:**
- Top center warning
- Red color
- Strong random shake
- Dark red background with gradient border
- Quick fade-in, slower fade-out

---

### Example 3: Dialogue Box

```
/emberstextapi sendcustom @p {
  anchor:"BOTTOM_CENTER",
  align:"CENTER",
  gradient:[0xAAAAAA,0xFFFFFF],
  typewriter:1.5f,
  offsetY:-50,
  wrap:250,
  shadow:1b,
  bgColor:0x000000,
  bgGradient:[0x4A4A4A,0x2A2A2A],
  fadeIn:10,
  fadeOut:20
} 150 "The ancient guardian speaks: You must prove your worth before proceeding further into these sacred halls."
```

**Features:**
- Bottom dialogue position
- Gradient text
- Typewriter with text wrapping
- Shadow for readability
- Styled background

---

### Example 4: Achievement Notification

```
/emberstextapi sendcustom @p {
  anchor:"TOP_RIGHT",
  align:"RIGHT",
  gradient:[0xFFD700,0xFFFF00],
  typewriter:3.0f,
  offsetX:-10,
  offsetY:10,
  fadeIn:20,
  fadeOut:60,
  shadow:1b,
  background:"minecraft:textures/gui/achievement/achievement_background.png",
  backgroundMode:"STRETCH",
  backgroundWidth:200,
  backgroundHeight:50,
  backgroundPaddingX:8,
  backgroundPaddingY:8
} 100 "Achievement Unlocked!"
```

**Features:**
- Top-right achievement style
- Gold gradient
- Fast typewriter
- Textured background
- Smooth fade transitions

---

### Example 5: Boss Introduction

```
/emberstextapi sendcustom @p {
  anchor:"CENTER_CENTER",
  obfuscate:1b,
  obfuscateReveal:"CENTER_OUT",
  gradient:[0x8B00FF,0xFF0000,0x8B00FF],
  charShakeWave:0.5f,
  fadeIn:40,
  fadeOut:40,
  shadow:1b,
  bgColor:0x000000
} 200 "THE SHADOW LORD AWAKENS"
```

**Features:**
- Dramatic center reveal
- Obfuscation with center-out reveal
- Purple-red gradient
- Subtle character wave
- Long fade times for drama
- Black background

---

### Example 6: Subtitle Style

```
/emberstextapi sendcustom @p {
  anchor:"BOTTOM_CENTER",
  align:"CENTER",
  color:0xFFFFFF,
  offsetY:-80,
  wrap:300,
  shadow:1b,
  fadeIn:5,
  fadeOut:5
} 60 "[Mysterious Voice] Can you hear me?"
```

**Features:**
- Subtitle positioning
- White text with shadow
- Quick fades
- Text wrapping for long sentences

---

### Example 7: Damage Indicator

```
/emberstextapi sendcustom @p {
  anchor:"CENTER_CENTER",
  color:0xFF0000,
  charShakeRandom:3.0f,
  shadow:1b,
  offsetY:-30,
  fadeOut:20
} 40 "-500 HP"
```

**Features:**
- Centered damage number
- Red color
- Strong character shake
- Quick display with fade out

---

### Example 8: Tutorial Hint

```
/emberstextapi sendcustom @p {
  anchor:"CENTER_LEFT",
  align:"LEFT",
  gradient:[0x4ECDC4,0x45B7D1],
  offsetX:20,
  wrap:200,
  shadow:1b,
  bgColor:0x1A1A1A,
  fadeIn:20,
  fadeOut:20
} 150 "Tip: Press E to open your inventory"
```

**Features:**
- Left-side hint
- Cyan gradient
- Text wrapping
- Subtle background
- Smooth transitions

---

## Common Combinations

### Cinematic Text
```
{anchor:"CENTER_CENTER",typewriter:1.5f,typewriterCenter:1b,gradient:[...],fadeIn:30,fadeOut:30,shadow:1b}
```

### Quest Objective
```
{anchor:"TOP_CENTER",align:"CENTER",color:0xFFFFFF,offsetY:20,shadow:1b,bgColor:0x1A1A1A}
```

### Warning/Alert
```
{anchor:"CENTER_CENTER",color:0xFF0000,shakeRandom:2.0f,shadow:1b,bgColor:0x330000}
```

### Dialogue
```
{anchor:"BOTTOM_CENTER",typewriter:1.5f,wrap:250,shadow:1b,bgColor:0x000000,offsetY:-50}
```

### Achievement
```
{anchor:"TOP_RIGHT",align:"RIGHT",gradient:[0xFFD700,0xFFFF00],fadeIn:20,fadeOut:60,shadow:1b}
```

---

## Data Type Quick Reference

| Type | Suffix | Example | Notes |
|------|--------|---------|-------|
| Integer | None | `100` | Whole numbers |
| Float | `f` | `1.5f` | Decimal numbers |
| Boolean | `b` | `1b`, `0b` | True/false values |
| String | Quotes | `"value"` | Text values |
| Int Array | `[...]` | `[1,2,3]` | List of integers |

---

## Troubleshooting

### NBT Syntax Errors

**Common Mistakes:**

1. **Missing data type suffix:**
   ```
   ❌ {typewriter:2.0}
   ✅ {typewriter:2.0f}
   ```

2. **Incorrect boolean syntax:**
   ```
   ❌ {shadow:true}
   ✅ {shadow:1b}
   ```

3. **Missing quotes on strings:**
   ```
   ❌ {anchor:CENTER_CENTER}
   ✅ {anchor:"CENTER_CENTER"}
   ```

4. **Wrong array brackets:**
   ```
   ❌ {gradient:(0xFF0000,0x0000FF)}
   ✅ {gradient:[0xFF0000,0x0000FF]}
   ```

### Effect Not Working

1. Check data type is correct
2. Verify tag name spelling
3. Ensure duration is long enough to see effect
4. Check for conflicting tags (e.g., `color` vs `gradient`)

---

## Next Steps

- See these tags in action: [Examples](examples.md)
- Learn about visual design: [Styling & Effects](styling-effects.md)
- Use in code: [Developer API](developer-api.md)
- Try the test command: `/emberstextapi test 1-9`
