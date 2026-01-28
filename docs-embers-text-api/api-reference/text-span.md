---
sidebar_position: 2
title: TextSpan
description: The per-span text unit — styling, effects, items, entities, and serialization.
---

# TextSpan

`TextSpan` represents a single styled segment of text within a message. A message is composed of one or more spans, each with its own content, formatting, effects, and optional inline content (items, entities).

**Package:** `net.tysontheember.emberstextapi.immersivemessages.api`

---

## Constructors

```java
public TextSpan(String content)
```
Creates a new span with the given text content.

```java
public TextSpan(TextSpan other)
```
Copy constructor — creates a deep copy of another span.

---

## Builder-Style API

TextSpan uses a fluent/builder pattern. Most setter methods return the span itself for chaining:

```java
TextSpan span = new TextSpan("Hello!")
    .color(0xFF0000)       // Red text
    .bold(true)            // Bold
    .italic(true);         // Italic
```

---

## Text Styling

### Color

```java
TextSpan color(TextColor color)
TextSpan color(int rgb)           // Packed RGB integer (e.g., 0xFF0000)
TextSpan color(String hex)        // Hex string (e.g., "FF0000" or "#FF0000")
```

Sets the text color for this span.

### Formatting Flags

```java
TextSpan bold(boolean value)
TextSpan italic(boolean value)
TextSpan underline(boolean value)
TextSpan strikethrough(boolean value)
TextSpan obfuscated(boolean value)
```

Each flag can be set to `true` or `false`. When set to `null` (via getter), the flag is unset and inherits from the parent context.

### Font

```java
TextSpan font(ResourceLocation fontId)
```

Overrides the font used for this span. Uses a Minecraft ResourceLocation (e.g., `ResourceLocation.parse("minecraft:font/unifont")`).

---

## Visual Effects

### Adding Effects

```java
TextSpan addEffect(Effect effect)
```
Adds a pre-constructed Effect instance to this span.

```java
TextSpan effect(String tagContent)
```
Parses an effect from a tag string and adds it. The string format is: `effectName key1=value1 key2=value2`.

**Example:**

```java
span.effect("rainbow f=2.0 w=0.5");
span.effect("wave a=3.0");
span.addEffect(EffectRegistry.parseTag("neon r=3 i=1.5"));
```

### Legacy Animation Properties

These are legacy properties that map to the older animation system. In v2, prefer using the effect system instead.

```java
TextSpan typewriter(float speed, boolean center)
TextSpan shake(ShakeType type, float amplitude)
TextSpan shake(ShakeType type, float amplitude, float speed)
TextSpan shake(ShakeType type, float amplitude, float speed, float wavelength)
TextSpan obfuscate(ObfuscateMode mode, float speed)
```

---

## Fade Effects (Per-Span)

```java
TextSpan fadeIn(int ticks)
TextSpan fadeOut(int ticks)
```

Per-span fade timings. These are independent of the message-level fade.

---

## Background (Per-Span)

```java
TextSpan background(ImmersiveColor color)
TextSpan backgroundGradient(ImmersiveColor... colors)
```

Adds a background specifically behind this span's text.

---

## Inline Item Rendering

```java
TextSpan item(String itemId)
TextSpan item(String itemId, int count)
TextSpan itemOffset(float x, float y)
```

Renders a Minecraft item icon inline with the text.

| Parameter | Description |
|---|---|
| `itemId` | Minecraft item ID (e.g., `"minecraft:diamond"`) |
| `count` | Stack size displayed on the item icon |
| `x`, `y` | Pixel offsets for positioning the item |

---

## Inline Entity Rendering

```java
TextSpan entity(String entityId)
TextSpan entity(String entityId, float scale)
TextSpan entityOffset(float x, float y)
TextSpan entityRotation(float yaw, float pitch, float roll)
TextSpan entityLighting(int lightLevel)
TextSpan entitySpin(float degreesPerTick)
TextSpan entityAnimation(String animation)
```

Renders a Minecraft entity model inline with the text.

| Parameter | Description |
|---|---|
| `entityId` | Minecraft entity ID (e.g., `"minecraft:creeper"`) |
| `scale` | Size multiplier (default: 1.0) |
| `yaw` | Y-axis rotation in degrees (default: 45) |
| `pitch` | X-axis rotation in degrees (default: 0) |
| `roll` | Z-axis rotation in degrees (default: 0) |
| `lightLevel` | Light level 0–15 (default: 15 = full brightness) |
| `degreesPerTick` | Continuous rotation speed |
| `animation` | Animation state: `"idle"`, `"walk"`, `"attack"`, `"hurt"` |

---

## Global Message Attributes

TextSpan can carry global message-level attributes when used as a "container" span (typically the outermost span in a markup structure). These override the message's own settings.

```java
TextSpan globalBackground(boolean enabled)
TextSpan globalBackgroundColor(ImmersiveColor color)
TextSpan globalBackgroundGradient(ImmersiveColor from, ImmersiveColor to)
TextSpan globalBorder(ImmersiveColor start, ImmersiveColor end)
TextSpan globalOffset(float x, float y)
TextSpan globalAnchor(TextAnchor anchor)
TextSpan globalAlign(TextAnchor align)
TextSpan globalScale(float scale)
TextSpan globalShadow(boolean enabled)
TextSpan globalFadeIn(int ticks)
TextSpan globalFadeOut(int ticks)
TextSpan globalTypewriter(float speed, boolean center)
```

---

## Network Serialization

TextSpan supports full serialization for network transmission:

```java
void encode(FriendlyByteBuf buffer)
static TextSpan decode(FriendlyByteBuf buffer)
```

Serialization includes validation:
- Content length capped at 65,536 characters
- Item/entity IDs capped at 256 characters
- Effect tag strings capped at 512 characters
- Array sizes capped at 256 entries
- Numeric values clamped to safe ranges

---

## Getters

All properties have corresponding getters that return nullable types (or boxed types for primitives):

```java
String getContent()
List<Effect> getEffects()
TextColor getColor()
Boolean getBold()
Boolean getItalic()
// ... etc.
```

A `null` return means the property was not set on this span.
