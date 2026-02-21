---
sidebar_position: 3
title: Markup Guide
description: Complete guide to the markup syntax used in /eta commands — tags, parameters, effects, and nesting.
---

# Markup Guide

Markup is an XML-style tag language that lets you style and animate text in `/eta send` and `/eta queue` commands. You don't need to know any programming — just wrap your text in tags.

---

## How Tags Work

### Basic Syntax

```markup
<tagname>Your text here</tagname>
```

The tag wraps around the text it affects. Tags have an opening part `<tagname>` and a closing part `</tagname>`.

### Tags with Parameters

```markup
<tagname param=value>Text</tagname>
```

Parameters customize how the tag behaves. Multiple parameters are separated by spaces:

```markup
<wave a=2.0 f=1.5>Wavy text</wave>
```

### Quoting Values with Spaces

Values that contain spaces must be quoted:

```markup
<typewriter sound="minecraft:block.note_block.hat">Text</typewriter>
```

### Self-Closing Tags

Some tags don't wrap text — they insert content inline:

```markup
<item id=minecraft:diamond/>
<entity id=minecraft:creeper scale=0.5/>
```

The `/` before `>` marks the tag as self-closing.

---

## Nesting Tags

Tags can be nested inside each other. Inner tags inherit the outer tag's effects:

```markup
<rainbow><bold>Bold rainbow text</bold></rainbow>
```

Both `rainbow` and `bold` apply to "Bold rainbow text."

Complex nesting:

```markup
<anchor value=MIDDLE><scale value=1.3><neon><rainbow>Fancy centered text</rainbow></neon></scale></anchor>
```

---

## Style Tags

Basic text formatting:

| Tag | Shorthand | Effect |
|---|---|---|
| `<bold>` | `<b>` | **Bold** text |
| `<italic>` | `<i>` | *Italic* text |
| `<underline>` | `<u>` | Underlined text |
| `<strikethrough>` | `<s>` | ~~Strikethrough~~ text |
| `<obfuscated>` | `<obf>` | Obfuscated text (vanilla §k style) |

```markup
<b>Bold</b> and <i>italic</i> and <b><i>both</i></b>
```

---

## Color Tag

Set a specific text color using a hex code:

```markup
<color value=FF0000>Red text</color>
<c value=#00FF00>Green text (shorthand)</c>
```

| Parameter | Description |
|---|---|
| `value` | 6-digit hex color. The `#` prefix is optional. |

**Common colors:**

| Color | Hex |
|---|---|
| Red | `FF0000` |
| Green | `00FF00` |
| Blue | `0000FF` |
| Gold | `FFD700` |
| White | `FFFFFF` |
| Gray | `888888` |
| Dark purple | `AA00FF` |

---

## Effect Tags (Quick Reference)

All 19 built-in effects are available as tags. See [Effects Reference](./effects-reference.md) for full parameter details.

| Tag | Aliases | What it does |
|---|---|---|
| `<rainbow>` | `<rainb>` | Cycling color spectrum |
| `<grad>` | `<gradient>` | Color gradient from A to B |
| `<color col=HEX>` | — | Apply a solid color via effect system |
| `<pulse>` | — | Rhythmic brightness pulsing |
| `<fade>` | — | Transparency oscillation |
| `<wave>` | — | Sinusoidal up-down motion |
| `<shake>` | — | Random jitter displacement |
| `<bounce>` | — | Bouncy hop animation |
| `<circle>` | — | Characters orbit in circles |
| `<wiggle>` | — | Organic per-character wiggle |
| `<pend>` | `<pendulum>` | Pendulum swing |
| `<swing>` | — | Rotation back and forth |
| `<scroll>` | — | Continuous rightward-to-left scroll |
| `<turb>` | `<turbulence>` | Wind-like organic drift |
| `<glitch>` | — | Digital distortion |
| `<neon>` | `<glow>` | Soft glow halo |
| `<shadow>` | — | Custom shadow color/offset |
| `<typewriter>` | `<type>` | Character-by-character reveal |
| `<obfuscate>` | — | Scramble / reveal animation |

**Example — stacking effects:**

```markup
<neon><wave a=2.0><rainbow>Glowing wavy rainbow text</rainbow></wave></neon>
```

---

## Layout Tags

Control where the message appears on screen and how it looks.

### `<anchor>` — Screen Position

Places the message at one of 9 screen positions:

```markup
<anchor value=MIDDLE>Centered on screen</anchor>
<anchor value=BOTTOM_CENTER>Bottom of screen</anchor>
<anchor value=TOP_LEFT>Top-left corner</anchor>
```

Valid values: `TOP_LEFT`, `TOP_CENTER` *(default)*, `TOP_RIGHT`, `MIDDLE_LEFT`, `MIDDLE`, `MIDDLE_RIGHT`, `BOTTOM_LEFT`, `BOTTOM_CENTER`, `BOTTOM_RIGHT`

### `<offset>` — Pixel Adjustment

Nudges the message from its anchor position:

```markup
<offset x=10 y=-20>Shifted right 10px, up 20px</offset>
```

Positive `x` = rightward. Positive `y` = downward.

### `<scale>` — Message Size

Multiplies the size of the entire message:

```markup
<scale value=1.5>150% size</scale>
<scale value=0.75>75% size</scale>
```

Default is `1.0`.

### `<align>` — Text Alignment

Controls horizontal text alignment:

```markup
<align value=LEFT>Left-aligned</align>
<align value=CENTER>Center-aligned</align>
<align value=RIGHT>Right-aligned</align>
```

---

## Background Tags

Add a semi-transparent background behind message text.

### Solid Background

```markup
<bg color=#60000000>Dark semi-transparent background</bg>
```

The color is 8-digit hex: first two digits are alpha (`00` = transparent, `FF` = opaque), followed by RGB.

### Gradient Background

```markup
<bggradient from=60000040 to=60400000>Blue-to-red gradient background</bggradient>
```

Aliases: `<backgroundgradient>`, `<bggradient>`

### Background with Border

```markup
<bg color=#40000000 bordercolor=#80FFFFFF>Dark background, white border</bg>
<bg color=#40000000 borderstart=#80FF0000 borderend=#800000FF>Gradient border</bg>
```

| Parameter | Description |
|---|---|
| `color` | Background fill color (ARGB hex) |
| `bordercolor` | Single color for all four borders |
| `borderstart` | Gradient border start color |
| `borderend` | Gradient border end color |

---

## Global Message Tags

These tags affect the entire message, not just the text they wrap.

### `<shadow value=true/false>` — Toggle Shadow

Enables or disables the drop shadow behind all text:

```markup
<shadow value=true>Text with shadow</shadow>
<shadow value=false>Text without shadow</shadow>
```

:::note
When `<shadow>` includes effect parameters (`x`, `y`, `c`, `r`, `g`, `b`), it acts as a custom shadow styling effect instead. See [Effects Reference → Shadow](./effects-reference.md#shadow).
:::

### `<fade in=N out=N>` — Global Fade

Sets how many ticks the message takes to fade in and out:

```markup
<fade in=30 out=30>Fades over 30 ticks (1.5 seconds) each</fade>
```

:::note
When `<fade>` includes effect parameters (`a`, `f`, `w`), it acts as an oscillating transparency effect instead. See [Effects Reference → Fade](./effects-reference.md#fade).
:::

### `<font>` — Custom Font

Changes the font for the wrapped text:

```markup
<font id=minecraft:font/unifont>Text in unifont</font>
```

---

## Duration Tag (Queue Only)

The `<dur:N>` tag sets the display duration for a message **inside `/eta queue`** definitions:

```markup
<dur:120>This message lasts 120 ticks (6 seconds)</dur:120>
```

This tag is stripped before rendering — players never see it. It has no effect inside `/eta send`.

:::warning
Always include `<dur:N>` in queue messages. Without it, the message defaults to 60 ticks and a warning is logged.
:::

---

## Inline Items and Entities

Render Minecraft items or entity models inside text.

### Inline Item

```markup
You earned <item id=minecraft:diamond count=3/>!
Picked up <item id=minecraft:oak_planks size=64/>.
```

| Parameter | Alias | Description |
|---|---|---|
| `id` | `value` | Minecraft item ID |
| `count` | `size` | Stack size displayed |
| `x` | `offsetx` | Horizontal pixel offset |
| `y` | `offsety` | Vertical pixel offset |

### Inline Entity

```markup
Beware the <entity id=minecraft:creeper scale=0.5/>!
<entity id=minecraft:villager scale=0.6 spin=2.0 anim=walk/>
```

| Parameter | Alias | Default | Description |
|---|---|---|---|
| `id` | `value` | *(required)* | Minecraft entity ID |
| `scale` | — | `1.0` | Size multiplier |
| `x` | `offsetx` | `0` | Horizontal offset |
| `y` | `offsety` | `0` | Vertical offset |
| `yaw` | — | `45` | Y-axis rotation (degrees) |
| `pitch` | — | `0` | X-axis rotation |
| `spin` | `rotate` | *(none)* | Continuous rotation speed |
| `anim` | `animation` | `idle` | Animation state (`idle`, `walk`, `attack`, `hurt`) |
| `lighting` | `light` | `15` | Light level (0–15) |

---

## Preset Tags

Built-in presets bundle multiple effects and styles into a single tag:

```markup
<epic>Epic styled text</epic>
<legendary>Legendary text</legendary>
<spooky>Spooky text</spooky>
```

| Preset | Effects | Style |
|---|---|---|
| `<epic>` | Pulse + Wave | Bold italic purple |
| `<legendary>` | Rainbow + Neon | Bold gold |
| `<spooky>` | Shake + Fade | Italic dark purple |

---

## Putting It All Together

A complete `/eta send` command with layout, effects, background, and fade:

```
/eta send @p 200 <anchor value=MIDDLE><offset y=-30><scale value=1.2><bg color=#60000000><fade in=20 out=20><neon r=2><rainbow><bold>QUEST COMPLETE!</bold></rainbow></neon></fade></bg></scale></offset></anchor>
```

This creates: a centered, slightly elevated, 120%-sized, dark-background message with neon-glowing rainbow bold text that fades in and out.
