---
sidebar_position: 5
title: Layout and Positioning
description: How to position messages anywhere on screen, control text alignment, add backgrounds, and combine layout controls.
---

# Layout and Positioning

By default, messages appear at the top center of the screen. This page explains how to move them anywhere, resize them, add backgrounds, and combine these controls.

---

## Screen Anchors

The `<anchor>` tag places a message at one of 9 fixed screen positions:

```
┌──────────┬──────────┬──────────┐
│ TOP_LEFT │TOP_CENTER│ TOP_RIGHT│
├──────────┼──────────┼──────────┤
│MIDDLE_   │  MIDDLE  │MIDDLE_   │
│LEFT      │          │RIGHT     │
├──────────┼──────────┼──────────┤
│BOTTOM_   │BOTTOM_   │BOTTOM_   │
│LEFT      │CENTER    │RIGHT     │
└──────────┴──────────┴──────────┘
```

| Anchor Value | Position |
|---|---|
| `TOP_LEFT` | Top-left corner |
| `TOP_CENTER` | Top center *(default)* |
| `TOP_RIGHT` | Top-right corner |
| `MIDDLE_LEFT` | Middle-left edge |
| `MIDDLE` | Exact center of screen |
| `MIDDLE_RIGHT` | Middle-right edge |
| `BOTTOM_LEFT` | Bottom-left corner |
| `BOTTOM_CENTER` | Bottom center |
| `BOTTOM_RIGHT` | Bottom-right corner |

```markup title="Markup usage"
<anchor value=MIDDLE>Centered message</anchor>
<anchor value=BOTTOM_CENTER>Bottom of screen</anchor>
<anchor value=TOP_RIGHT>Top-right corner</anchor>
```

Messages are clamped to stay on screen — edge-anchored messages won't render off the edge.

---

## Text Alignment

The `<align>` tag controls how text is aligned horizontally within its anchor position:

```markup
<align value=LEFT>Left-aligned</align>
<align value=CENTER>Center-aligned</align>
<align value=RIGHT>Right-aligned</align>
```

| Value | Description |
|---|---|
| `LEFT` | Left-aligned *(default)* |
| `CENTER` | Center-aligned |
| `RIGHT` | Right-aligned |

---

## Pixel Offsets

The `<offset>` tag nudges the message by an exact number of pixels from its anchor:

```markup
<offset x=10 y=-5>10px right, 5px up from anchor</offset>
<offset x=0 y=20>20px below anchor</offset>
```

| Parameter | Effect |
|---|---|
| `x` | Positive = rightward, negative = leftward |
| `y` | Positive = downward, negative = upward |

**Use case:** Position two messages at the same anchor with different offsets to stack them vertically.

---

## Scale

The `<scale>` tag multiplies the entire message size:

```markup
<scale value=1.5>150% normal size</scale>
<scale value=0.75>75% normal size (smaller)</scale>
<scale value=2.0>Double size</scale>
```

Default scale is `1.0`. The message stays anchored at its position — scaling grows from the anchor point.

---

## Backgrounds

Add a colored rectangle behind message text.

### Solid Background

```markup
<bg color=#60000000>Dark semi-transparent background</bg>
```

The color is 8-digit hex — first two digits are alpha (`00` = fully transparent, `FF` = fully opaque):

| Alpha | Hex | Visual |
|---|---|---|
| 25% opaque | `40` | Very subtle |
| 50% opaque | `80` | Standard dark panel |
| 75% opaque | `C0` | Strong background |
| Fully opaque | `FF` | Solid box |

### Gradient Background

```markup
<bggradient from=40000040 to=40400000>Blue-to-red background gradient</bggradient>
```

The gradient blends left-to-right across the message width.

### Background with Border

```markup
<bg color=#40000000 bordercolor=#80FFFFFF>Dark background, white border</bg>
<bg color=#40000000 borderstart=#80FF0000 borderend=#800000FF>Red-to-blue gradient border</bg>
```

| Parameter | Description |
|---|---|
| `color` | Fill color (ARGB hex) |
| `bordercolor` | Single border color |
| `borderstart` | Gradient border start color |
| `borderend` | Gradient border end color |

---

## Message Shadow

Toggle the drop shadow behind all text:

```markup
<shadow value=true>With shadow (default behavior)</shadow>
<shadow value=false>No shadow</shadow>
```

For a custom-colored shadow with a specific offset, use the [Shadow effect](./effects-reference.md#shadow) instead.

---

## Combining Layout Controls

All layout tags can be combined in the same message. Nest them or place them as siblings:

```markup title="Centered, elevated, scaled, with background"
<anchor value=MIDDLE>
  <offset y=-30>
    <scale value=1.2>
      <bg color=#60000000>
        <fade in=20 out=20>
          <rainbow><bold>Welcome, Player!</bold></rainbow>
        </fade>
      </bg>
    </scale>
  </offset>
</anchor>
```

This creates: a centered message, shifted 30px above center, at 120% size, with a dark background, fading in and out, with rainbow bold text.

### HUD Overlay Pattern

For a persistent HUD-style element in the top-right corner:

```markup title="Top-right status display"
<anchor value=TOP_RIGHT><offset x=-10 y=10><align value=RIGHT>Status: Active</align></offset></anchor>
```

### Boss-Fight Warning Pattern

Large centered warning with emphasis:

```markup title="Boss encounter message"
<anchor value=MIDDLE><offset y=40><scale value=1.4><bg color=#80000000><neon c=FF0000 r=3><shake a=0.5><color value=FF2222><bold>BOSS INCOMING!</bold></color></shake></neon></bg></scale></offset></anchor>
```
