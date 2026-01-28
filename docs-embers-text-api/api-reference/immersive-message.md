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

## Configuration Methods

All configuration methods modify the message in place and are intended to be called immediately after construction (builder pattern style, though they return `void`).

### Positioning

```java
void setAnchor(TextAnchor anchor)
```
Sets where on screen the message is anchored. Defaults to `TOP_CENTER`.

```java
void setAlign(TextAnchor align)
```
Sets text alignment within the message area.

```java
void setXOffset(float offset)
void setYOffset(float offset)
```
Pixel offsets from the anchor position. Positive X = rightward, positive Y = downward.

### Scaling

```java
void setTextScale(float scale)
```
Size multiplier for the entire message. Default is `1.0`.

### Background

```java
void setBackground(boolean enabled)
```
Enables or disables the background rectangle behind the text.

```java
void setBackgroundColor(ImmersiveColor color)
```
Sets the background color. The color includes an alpha channel for transparency.

### Fade Animations

```java
void fadeIn(int ticks)
```
Message alpha ramps from 0 to 1 over the specified number of ticks at the start.

```java
void fadeOut(int ticks)
```
Message alpha ramps from 1 to 0 over the specified number of ticks at the end (counting backward from `duration`).

### Typewriter Animation

```java
void typewriter(float speed)
```
Enables character-by-character reveal. `speed` is characters per tick.

### Obfuscation Animation

```java
void obfuscate(ObfuscateMode mode, float speed)
```
Enables progressive deobfuscation. Characters start as random glyphs and are revealed according to the specified mode and speed.

---

## State and Lifecycle

### Age Tracking

```java
float getAge()
```
Returns the current age of the message in ticks. Incremented each tick by the client.

### Expiry Check

```java
boolean isExpired()
```
Returns `true` when `age >= duration`. The message is automatically removed when this becomes true.

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
import net.tysontheember.emberstextapi.EmbersTextAPI;

EmbersTextAPI.sendMessage(serverPlayer, message);
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

ImmersiveMessage msg = new ImmersiveMessage(spans, 200f); // 10 seconds
msg.setAnchor(TextAnchor.CENTER_CENTER);
msg.setTextScale(1.3f);
msg.setBackground(true);
msg.setBackgroundColor(new ImmersiveColor(0x60000020));
msg.fadeIn(30);   // 1.5 second fade in
msg.fadeOut(30);  // 1.5 second fade out

// Send to player (must be on server side)
EmbersTextAPI.sendMessage(player, msg);
```
