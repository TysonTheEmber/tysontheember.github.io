---
sidebar_position: 3
title: TextSpan
description: The per-span text unit — styling, effects, inline items, entities, and serialization.
---

# TextSpan

`TextSpan` represents a single styled segment of text within a message. A message is composed of one or more spans, each with its own content, formatting, effects, and optional inline content.

**Package:** `net.tysontheember.emberstextapi.immersivemessages.api`

---

## Constructors

```java
new TextSpan(String content)      // Create a span with text content
new TextSpan(TextSpan other)      // Deep copy of another span
```

---

## Fluent API

TextSpan uses a builder pattern — most setters return `this` for chaining:

```java
TextSpan span = new TextSpan("Hello!")
    .color(0xFF0000)
    .bold(true)
    .italic(true);
```

---

## Text Styling

### Color

```java
span.color(TextColor color)      // Minecraft TextColor
span.color(0xFF0000)             // Packed RGB integer
span.color("FF0000")             // Hex string (# prefix optional)
span.color("#FF0000")            // Also valid
```

### Formatting Flags

```java
span.bold(true)
span.italic(true)
span.underline(true)
span.strikethrough(true)
span.obfuscated(true)
```

### Font

```java
span.font(ResourceLocation.parse("minecraft:font/unifont"))
```

---

## Visual Effects

### Adding an Effect by String

```java
span.effect("rainbow f=2.0 w=0.5")
span.effect("wave a=3.0")
span.effect("neon r=3 i=1.5")
```

The string format is `effectName key1=value1 key2=value2`.

### Adding a Pre-Built Effect

```java
Effect myEffect = EffectRegistry.parseTag("neon r=3 i=1.5");
span.addEffect(myEffect);
```

---

## Fade Effects (Per-Span)

Per-span fade timings, independent of the message-level fade:

```java
span.fadeIn(20)   // Fade in over 20 ticks
span.fadeOut(20)  // Fade out over 20 ticks
```

---

## Per-Span Background

```java
span.background(new ImmersiveColor(0x60000000))
span.backgroundGradient(
    new ImmersiveColor(0x60000040),
    new ImmersiveColor(0x60400000)
)
```

---

## Inline Item Rendering

Render a Minecraft item icon inline with the text:

```java
span.item("minecraft:diamond")
span.item("minecraft:diamond", 3)     // With stack count
span.itemOffset(2f, -1f)              // Pixel offset
```

| Method | Description |
|---|---|
| `item(String id)` | Item ID to render |
| `item(String id, int count)` | With stack size displayed |
| `itemOffset(float x, float y)` | Pixel offset for positioning |

---

## Inline Entity Rendering

Render a Minecraft entity model inline with the text:

```java
span.entity("minecraft:creeper")
span.entity("minecraft:villager", 0.6f)   // With scale
span.entityOffset(0f, -5f)
span.entityRotation(90f, 0f, 0f)           // Yaw, pitch, roll
span.entityLighting(15)                    // Light level 0-15
span.entitySpin(2.0f)                      // Degrees per tick continuous rotation
span.entityAnimation("walk")              // idle, walk, attack, hurt
```

| Method | Description |
|---|---|
| `entity(String id)` | Entity ID |
| `entity(String id, float scale)` | With size multiplier |
| `entityOffset(float x, float y)` | Pixel offset |
| `entityRotation(float yaw, float pitch, float roll)` | Initial rotation |
| `entityLighting(int level)` | Light level (0 = dark, 15 = full) |
| `entitySpin(float degreesPerTick)` | Continuous Y-axis rotation |
| `entityAnimation(String anim)` | Animation state |

---

## Global Message Attributes

A `TextSpan` can carry global message-level settings when used as the outermost (container) span in a markup structure. These override the `ImmersiveMessage`'s own settings.

```java
span.globalAnchor(TextAnchor.MIDDLE)
span.globalAlign(TextAlign.CENTER)
span.globalOffset(10f, -20f)
span.globalScale(1.5f)
span.globalShadow(true)
span.globalBackground(true)
span.globalBackgroundColor(new ImmersiveColor(0x60000000))
span.globalBackgroundGradient(
    new ImmersiveColor(0x60000040),
    new ImmersiveColor(0x60400000)
)
span.globalBorder(
    new ImmersiveColor(0x80FFFFFF),
    new ImmersiveColor(0x80000000)
)
span.globalFadeIn(20)
span.globalFadeOut(20)
span.globalTypewriter(0.5f, false)
```

These are set automatically when using `MarkupParser.parse()` with layout tags like `<anchor>`, `<scale>`, etc.

---

## Legacy Animation Properties

These map to the older v1 animation system. In v2, prefer the effect system:

```java
span.typewriter(float speed, boolean center)
span.shake(ShakeType type, float amplitude)
span.shake(ShakeType type, float amplitude, float speed)
span.shake(ShakeType type, float amplitude, float speed, float wavelength)
span.obfuscate(ObfuscateMode mode, float speed)
```

---

## Network Serialization

TextSpans serialize for network transmission automatically. Limits are enforced during serialization:

| Property | Max Value |
|---|---|
| Content length | 65,536 characters |
| Item/Entity ID length | 256 characters |
| Effect tag string length | 512 characters |
| Array sizes | 256 entries |

Values exceeding these are clamped. Oversized content is truncated.

---

## Getters

All properties have corresponding getters returning nullable types:

```java
span.getContent()       // String
span.getEffects()       // List<Effect>
span.getColor()         // TextColor (nullable)
span.getBold()          // Boolean (nullable if not set)
span.getItalic()        // Boolean (nullable if not set)
// etc.
```

A `null` return means the property was not explicitly set on this span.

---

## Practical Example

Building a multi-span message programmatically:

```java
TextSpan titleSpan = new TextSpan("Achievement Unlocked! ")
    .bold(true)
    .color("#FFD700")
    .effect("neon r=2 c=FFD700");

TextSpan descSpan = new TextSpan("You survived your first night.")
    .italic(true)
    .color("#AAAAAA");

ImmersiveMessage msg = new ImmersiveMessage(
    List.of(titleSpan, descSpan),
    160f
).anchor(TextAnchor.MIDDLE).fadeInTicks(20).fadeOutTicks(20);

EmbersTextAPI.sendMessage(player, msg);
```
