---
sidebar_position: 4
title: Positioning, Layout, and Backgrounds
description: How to position messages on screen, control layout, and add backgrounds.
---

# Positioning, Layout, and Backgrounds

This page explains how to control where a message appears on screen, how text is aligned within that space, and how to style the background behind it.

---

## Screen Anchors

The `<anchor>` tag determines where on the screen a message is placed. The value maps to a 3×3 grid of screen positions:

| Anchor Value | Horizontal | Vertical |
|---|---|---|
| `TOP_LEFT` | Left edge (10% from left) | Top edge |
| `TOP_CENTER` | Center | Top edge |
| `TOP_RIGHT` | Right edge (90% from left) | Top edge |
| `CENTER_LEFT` | Left edge | Middle (50% from top) |
| `CENTER_CENTER` | Center | Middle |
| `CENTER_RIGHT` | Right edge | Middle |
| `BOTTOM_LEFT` | Left edge | 80% from top |
| `BOTTOM_CENTER` | Center | 80% from top |
| `BOTTOM_RIGHT` | Right edge | 80% from top |

**Markup usage:**

```markup
<anchor value=CENTER_CENTER>This message appears at the center of the screen</anchor>
<anchor value=BOTTOM_CENTER>This message appears at the bottom</anchor>
```

The default anchor is `TOP_CENTER`.

---

## Text Alignment

The `<align>` tag controls how the text itself is aligned within its rendered area. It uses the same anchor values as positioning, but applies to text justification.

```markup
<align value=CENTER_LEFT>Left-aligned text</align>
```

---

## Position Offsets

The `<offset>` tag lets you nudge a message by a specific number of pixels from its anchor position.

| Parameter | Type | Description |
|---|---|---|
| `x` | number | Horizontal offset in pixels. Positive = rightward. |
| `y` | number | Vertical offset in pixels. Positive = downward. |

```markup
<offset x=10 y=-5>Shifted 10px right, 5px up</offset>
```

---

## Scaling

The `<scale>` tag multiplies the size of the entire message.

```markup
<scale value=1.5>Text at 150% normal size</scale>
<scale value=0.75>Text at 75% normal size</scale>
```

The default scale is `1.0`.

---

## Backgrounds

You can add a semi-transparent background behind message text using the `<background>` or `<bg>` tag.

### Solid Background

```markup
<bg color=#40000000>Dark semi-transparent background</bg>
```

The color value includes an alpha channel (the first two hex digits represent transparency: `40` = about 25% opaque, `FF` = fully opaque).

### Gradient Background

Use `<backgroundgradient>` or `<bggradient>` for a background that transitions between two colors.

```markup
<bggradient from=40000040 to=40400000>Blue-to-red gradient background</bggradient>
```

### Background Borders

The `<background>` tag also supports border colors:

| Parameter | Description |
|---|---|
| `bordercolor` | A single color applied to all borders. |
| `borderstart` | Starting color for a gradient border. |
| `borderend` | Ending color for a gradient border. |

```markup
<bg color=#40000000 bordercolor=#80FFFFFF>Background with white border</bg>
<bg color=#40000000 borderstart=#80FF0000 borderend=#800000FF>Gradient border</bg>
```

---

## Message Shadow

Toggle a drop shadow behind the entire message:

```markup
<shadow value=true>Text with a default shadow</shadow>
<shadow value=false>Text without shadow</shadow>
```

For custom shadow styling (color, offset, transparency), use the shadow effect parameters instead — see the [Shadow Effect](effects-reference.md#shadow) documentation.

---

## Combining Layout Controls

All layout controls can be combined in a single message using nested or sibling tags:

```markup
<anchor value=CENTER_CENTER>
  <offset y=-20>
    <scale value=1.2>
      <bg color=#60000000>
        <rainbow><bold>Welcome, Player!</bold></rainbow>
      </bg>
    </scale>
  </offset>
</anchor>
```

This creates a centered, slightly elevated, 120%-sized message with a dark background and rainbow bold text.
