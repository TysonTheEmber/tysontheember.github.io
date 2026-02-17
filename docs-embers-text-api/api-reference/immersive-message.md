---
sidebar_position: 1
title: ImmersiveMessage
description: The main message class — constructors, configuration, and lifecycle.
---

# ImmersiveMessage

`ImmersiveMessage` is the central class for creating on-screen text displays. It wraps one or more `TextSpan` objects and provides configuration for positioning, background, animations, and duration.

**Package:** `net.tysontheember.emberstextapi.immersivemessages.api`

---

## Constructors

### From a Component

```java
public ImmersiveMessage(Component text, float duration)
```

Creates a message from a standard Minecraft `Component`. The component is rendered as a single span with no effects.

| Parameter | Type | Description |
|---|---|---|
| `text` | `Component` | The text content to display. |
| `duration` | `float` | How long to display the message, in game ticks (20 ticks = 1 second). |

**Example:**

```java
ImmersiveMessage msg = new ImmersiveMessage(
    Component.literal("Hello, World!"),
    100f  // 5 seconds
);
```

### From TextSpans

```java
public ImmersiveMessage(List<TextSpan> spans, float duration)
```

Creates a message from a pre-built list of `TextSpan` objects. This is how markup-parsed messages are constructed.

**Example:**

```java
List<TextSpan> spans = MarkupParser.parse("<rainbow>Colorful!</rainbow> Normal text");
ImmersiveMessage msg = new ImmersiveMessage(spans, 150f);
```

---

## Factory Methods

```java
static ImmersiveMessage builder(float duration, String text)
```
Creates a message from a plain text string with fluent builder syntax.

```java
static ImmersiveMessage fromMarkup(float duration, String markup)
```
Creates a message by parsing markup text. Stores the original markup source for later reference.

```java
static ImmersiveMessage fromSpans(float duration, List<TextSpan> spans)
```
Creates a message from a pre-built list of `TextSpan` objects.

---

## Configuration Methods

All configuration methods return `this` for fluent chaining (builder pattern).

### Positioning

```java
ImmersiveMessage anchor(TextAnchor anchor)
```
Sets where on screen the message is anchored. Defaults to `TOP_CENTER`.

```java
ImmersiveMessage align(TextAlign align)
```
Sets horizontal text alignment within the message area. Values: `LEFT` (default), `CENTER`, `RIGHT`.

```java
ImmersiveMessage offset(float x, float y)
```
Pixel offsets from the anchor position. Positive X = rightward, positive Y = downward.

### Scaling

```java
ImmersiveMessage scale(float size)
```
Size multiplier for the entire message. Default is `1.0`.

### Shadow

```java
ImmersiveMessage shadow(boolean shadow)
```
Enables or disables text shadow rendering. Default is `true`.

### Background

```java
ImmersiveMessage background(boolean enabled)
```
Enables or disables the background rectangle behind the text.

```java
ImmersiveMessage backgroundColors(ImmersiveColor bg, ImmersiveColor borderStart, ImmersiveColor borderEnd)
```
Sets the background color and border colors. The colors include an alpha channel for transparency.

### Texture Backgrounds

```java
ImmersiveMessage textureBackground(ResourceLocation texture)
ImmersiveMessage textureBackground(ResourceLocation texture, int width, int height)
ImmersiveMessage textureBackground(ResourceLocation texture, int u, int v, int regionWidth, int regionHeight, int atlasWidth, int atlasHeight)
```
Sets a texture-based background instead of a solid color. Supports texture atlases with UV coordinates.

```java
ImmersiveMessage textureBackgroundScale(float scale)
ImmersiveMessage textureBackgroundScale(float scaleX, float scaleY)
ImmersiveMessage textureBackgroundPadding(float padding)
ImmersiveMessage textureBackgroundPadding(float paddingX, float paddingY)
ImmersiveMessage textureBackgroundSize(float width, float height)
ImmersiveMessage textureBackgroundMode(TextureSizingMode mode)
```
Additional texture configuration for scaling, padding, sizing, and sizing mode.

### Fade Animations

```java
ImmersiveMessage fadeInTicks(int ticks)
```
Message alpha ramps from 0 to 1 over the specified number of ticks at the start.

```java
ImmersiveMessage fadeOutTicks(int ticks)
```
Message alpha ramps from 1 to 0 over the specified number of ticks at the end (counting backward from `duration`).

### Text Gradients

```java
ImmersiveMessage gradient(TextColor start, TextColor end)
ImmersiveMessage gradient(TextColor... colors)
ImmersiveMessage gradient(int... rgbs)
ImmersiveMessage gradient(String start, String end)
```
Sets a color gradient across the text. Supports multi-stop gradients.

### Background Gradients

```java
ImmersiveMessage backgroundGradient(ImmersiveColor... colors)
ImmersiveMessage backgroundGradient(int... argbs)
ImmersiveMessage backgroundGradient(String start, String end)
```
Sets a gradient on the background. Uses ARGB colors for transparency support.

### Typewriter Animation

```java
ImmersiveMessage typewriter(float speed)
ImmersiveMessage typewriter(float speed, boolean center)
```
Enables character-by-character reveal. `speed` is characters per tick. `center` controls whether revealed text is centered.

### Text Wrapping

```java
ImmersiveMessage wrap(int maxWidth)
```
Sets the maximum pixel width before text wraps to the next line.

### Obfuscation Animation

```java
ImmersiveMessage obfuscate(ObfuscateMode mode, float speed)
```
Enables progressive deobfuscation. Characters start as random glyphs and are revealed according to the specified mode and speed.

### Shake

```java
ImmersiveMessage shake(ShakeType type, float strength)
```
Applies a whole-message shake animation.

### Color

```java
ImmersiveMessage color(ChatFormatting vanilla)
ImmersiveMessage color(String value)
ImmersiveMessage color(int rgb)
```
Sets the text color using vanilla formatting, a color string, or a packed RGB integer.

---

## State and Lifecycle

### Age Tracking

```java
float getAge()
```
Returns the current age of the message in ticks. Incremented each tick by the client.

### Expiry Check

```java
boolean isFinished()
```
Returns `true` when the message has exceeded its duration. The message is automatically removed when this becomes true.

### Tick Update

```java
void tick()
```
Called each game tick. Increments the age counter.

---

## Serialization

Messages are serialized to NBT for network transmission:

```java
CompoundTag toNbt()
static ImmersiveMessage fromNbt(CompoundTag nbt)
```

These handle all message properties including spans, effects, positioning, and animation settings.

---

## Sending a Message

Use the static helper on the main mod class:

```java
// Forge / NeoForge
import net.tysontheember.emberstextapi.EmbersTextAPI;
EmbersTextAPI.sendMessage(serverPlayer, message);

// Fabric
import net.tysontheember.emberstextapi.fabric.EmbersTextAPIFabric;
EmbersTextAPIFabric.sendMessage(serverPlayer, message);
```

This serializes the message, assigns it a UUID, and sends it to the player via the network channel.

---

## Full Example

```java
import net.tysontheember.emberstextapi.EmbersTextAPI;
import net.tysontheember.emberstextapi.immersivemessages.api.*;
import net.tysontheember.emberstextapi.immersivemessages.util.ImmersiveColor;

// Create a message with markup
List<TextSpan> spans = MarkupParser.parse(
    "<neon r=2><rainbow><bold>Welcome!</bold></rainbow></neon> " +
    "<color value=#AAAAAA>Enjoy your stay.</color>"
);

ImmersiveMessage msg = new ImmersiveMessage(spans, 200f) // 10 seconds
    .anchor(TextAnchor.MIDDLE)
    .scale(1.3f)
    .background(true)
    .backgroundColors(
        new ImmersiveColor(0x60000020),
        new ImmersiveColor(0xAAFFFFFF),
        new ImmersiveColor(0xAA000000)
    )
    .fadeInTicks(30)   // 1.5 second fade in
    .fadeOutTicks(30); // 1.5 second fade out

// Send to player (must be on server side)
EmbersTextAPI.sendMessage(player, msg);
```
