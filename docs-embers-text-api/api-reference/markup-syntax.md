---
sidebar_position: 3
title: Markup Syntax Reference
description: Complete reference for the XML-style markup language used to style text.
---

# Markup Syntax Reference

The Markup Parser converts XML-style tag strings into `TextSpan` lists. This is the primary way to apply effects and styling declaratively — in config files, commands, or any string context.

**Class:** `net.tysontheember.emberstextapi.immersivemessages.api.MarkupParser`

---

## Basic Syntax

### Opening and Closing Tags

```markup
<tagname>Content here</tagname>
```

### Self-Closing Tags

Used for tags that don't wrap content (items, entities):

```markup
<item id=minecraft:diamond count=3/>
```

### Tags with Attributes

```markup
<tagname key1=value1 key2="value with spaces"/>
<tagname key1=value1 key2=value2>Content</tagname>
```

Attribute values with spaces must be quoted. Values without spaces can be unquoted.

### Nesting

Tags can be nested. Styles and effects are inherited by inner content:

```markup
<bold><color value=#FF0000>Bold red text</color></bold>
```

The text "Bold red text" inherits both bold and red color from the outer tags.

---

## Style Tags

| Tag | Aliases | Effect |
|---|---|---|
| `<bold>` | `<b>` | Bold text |
| `<italic>` | `<i>` | Italic text |
| `<underline>` | `<u>` | Underlined text |
| `<strikethrough>` | `<s>` | Strikethrough text |
| `<obfuscated>` | `<obf>` | Obfuscated text (§k style) |

**Example:**

```markup
<b><i>Bold and italic</i></b>
<u>Underlined</u>
<s>Struck through</s>
```

---

## Color Tag

```markup
<color value=HEXCOLOR>Colored text</color>
```

| Attribute | Description |
|---|---|
| `value` | Hex color string. Can include `#` prefix or not. (e.g., `FF0000` or `#FF0000`) |

Alias: `<c value=...>`

**Example:**

```markup
<color value=#00FF00>Green text</color>
<c value=FF8800>Orange text</c>
```

---

## Font Tag

```markup
<font id=RESOURCE_LOCATION>Custom font text</font>
```

| Attribute | Description |
|---|---|
| `id` | ResourceLocation of the font (also accepts `value`, `font`, or `name` as attribute names) |

**Example:**

```markup
<font id=minecraft:font/unifont>Unifont text</font>
```

---

## Effect Tags

All built-in effects are available as tags. See the [Effects Reference](../general/effects-reference.md) for full parameter documentation.

### Quick Reference

| Tag | Aliases | Category |
|---|---|---|
| `<rainbow>` | `<rainb>` | Color |
| `<grad>` | `<gradient>` | Color |
| `<pulse>` | — | Color |
| `<fade>` | — | Color / Global |
| `<wave>` | — | Motion |
| `<shake>` | — | Motion |
| `<bounce>` | — | Motion |
| `<circle>` | — | Motion |
| `<wiggle>` | — | Motion |
| `<pend>` | `<pendulum>` | Motion |
| `<swing>` | — | Motion |
| `<scroll>` | — | Motion |
| `<turb>` | `<turbulence>` | Motion |
| `<glitch>` | — | Special |
| `<neon>` | `<glow>` | Special |
| `<shadow>` | — | Special / Global |
| `<typewriter>` | `<type>` | Animation |
| `<obfuscate>` | — | Animation |

---

## Global Message Tags

These tags set properties on the entire message, not just the enclosed text.

### Background

```markup
<background color=#60000000>Text with dark background</background>
<bg color=#60000000 bordercolor=#80FFFFFF>With white border</bg>
<backgroundgradient from=60000040 to=60400000>Gradient background</backgroundgradient>
<bggradient from=60000040 to=60400000>Same, short alias</bggradient>
```

| Attribute | Description |
|---|---|
| `color` | Background fill color (hex with alpha) |
| `bordercolor` | Single color for all borders |
| `borderstart` | Gradient border start color |
| `borderend` | Gradient border end color |

### Scale

```markup
<scale value=1.5>150% size text</scale>
```

### Offset

```markup
<offset x=10 y=-5>Shifted text</offset>
```

### Anchor

```markup
<anchor value=MIDDLE>Centered on screen</anchor>
```

Valid values: `TOP_LEFT`, `TOP_CENTER`, `TOP_RIGHT`, `MIDDLE_LEFT`, `MIDDLE`, `MIDDLE_RIGHT`, `BOTTOM_LEFT`, `BOTTOM_CENTER`, `BOTTOM_RIGHT`

### Align

```markup
<align value=LEFT>Left-aligned text</align>
<align value=CENTER>Center-aligned text</align>
<align value=RIGHT>Right-aligned text</align>
```

Valid values: `LEFT` (default), `CENTER`, `RIGHT`

### Shadow (Global Toggle)

```markup
<shadow value=true>Text with shadow enabled</shadow>
<shadow value=false>Text with shadow disabled</shadow>
```

When used with effect parameters (`x`, `y`, `c`, `r`, `g`, `b`), it acts as a shadow effect instead.

### Fade (Global In/Out)

```markup
<fade in=30 out=30>Fades in over 30 ticks, out over 30 ticks</fade>
```

When used with effect parameters (`a`, `f`, `w`), it acts as a fade oscillation effect instead.

---

## Content Tags

### Item

```markup
<item id=minecraft:diamond/>
<item id=minecraft:diamond count=64/>
<item value=minecraft:oak_planks size=4 x=2 y=-1/>
```

| Attribute | Aliases | Description |
|---|---|---|
| `id` | `value` | Minecraft item ID |
| `count` | `size` | Stack size displayed |
| `x` | `offsetx` | Horizontal pixel offset |
| `y` | `offsety` | Vertical pixel offset |

### Entity

```markup
<entity id=minecraft:creeper scale=0.5/>
<entity id=minecraft:villager scale=0.6 yaw=90 spin=2.0 anim=walk/>
```

| Attribute | Aliases | Default | Description |
|---|---|---|---|
| `id` | `value` | (required) | Minecraft entity ID |
| `scale` | — | `1.0` | Size multiplier |
| `x` | `offsetx` | `0` | Horizontal pixel offset |
| `y` | `offsety` | `0` | Vertical pixel offset |
| `yaw` | — | `45` | Y-axis rotation (degrees) |
| `pitch` | — | `0` | X-axis rotation (degrees) |
| `roll` | — | `0` | Z-axis rotation (degrees) |
| `lighting` | `light` | `15` | Light level (0–15) |
| `spin` | `rotate` | (none) | Continuous rotation speed |
| `animation` | `anim` | `idle` | Animation state |

---

## Preset Tags

Custom presets loaded from JSON files are available as tags using their preset name:

```markup
<epic>Epic styled text</epic>
<legendary>Legendary text</legendary>
<spooky>Spooky text</spooky>
```

See the [Preset System](effect-registry.md#presets) for details on creating custom presets.

---

## Parser Utility Methods

```java
// Parse markup string into TextSpan list
List<TextSpan> spans = MarkupParser.parse("<rainbow>Hello!</rainbow>");

// Extract plain text (removes all markup)
String plain = MarkupParser.toPlainText(spans);  // "Hello!"

// Wrap plain text in a single span (no markup)
List<TextSpan> simple = MarkupParser.fromPlainText("Plain text");
```
