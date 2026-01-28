---
sidebar_position: 1
title: Simple Usage Examples
description: Basic examples covering common use cases.
---

# Simple Usage Examples

These examples cover the most common scenarios. Each one is self-contained and annotated.

---

## 1. Basic Immersive Message (Server → Client)

Send a plain text message that appears at the top of the screen for 5 seconds:

```java
import net.minecraft.network.chat.Component;
import net.tysontheember.emberstextapi.EmbersTextAPI;
import net.tysontheember.emberstextapi.immersivemessages.api.ImmersiveMessage;

ImmersiveMessage msg = new ImmersiveMessage(
    Component.literal("Hello, Player!"),
    100f  // 100 ticks = 5 seconds
);

// Send to a specific player (must be called on the server)
EmbersTextAPI.sendMessage(serverPlayer, msg);
```

---

## 2. Message with Fade In/Out

A message that smoothly fades in and out instead of appearing/disappearing abruptly:

```java
ImmersiveMessage msg = new ImmersiveMessage(
    Component.literal("Welcome back!"),
    150f  // 7.5 seconds total
);
msg.fadeIn(30);   // Fade in over 1.5 seconds
msg.fadeOut(30);  // Fade out over 1.5 seconds

EmbersTextAPI.sendMessage(player, msg);
```

---

## 3. Centered Message with Background

A centered on-screen message with a dark semi-transparent background:

```java
import net.tysontheember.emberstextapi.immersivemessages.api.TextAnchor;
import net.tysontheember.emberstextapi.immersivemessages.util.ImmersiveColor;

ImmersiveMessage msg = new ImmersiveMessage(
    Component.literal("Important Notice"),
    200f
);
msg.setAnchor(TextAnchor.CENTER_CENTER);
msg.setBackground(true);
msg.setBackgroundColor(new ImmersiveColor(0x80000000)); // 50% black

EmbersTextAPI.sendMessage(player, msg);
```

---

## 4. Markup-Based Rainbow Message

Using the markup parser for a simple rainbow effect:

```java
import net.tysontheember.emberstextapi.immersivemessages.api.*;
import java.util.List;

List<TextSpan> spans = MarkupParser.parse(
    "<rainbow>This text cycles through colors!</rainbow>"
);

ImmersiveMessage msg = new ImmersiveMessage(spans, 120f);
EmbersTextAPI.sendMessage(player, msg);
```

---

## 5. Mixed Styled and Plain Text

Combining effects with plain text in a single message:

```java
List<TextSpan> spans = MarkupParser.parse(
    "<rainbow><bold>ALERT:</bold></rainbow> " +
    "<color value=#FFAAAA>Something happened in the world.</color>"
);

ImmersiveMessage msg = new ImmersiveMessage(spans, 150f);
msg.setAnchor(TextAnchor.TOP_CENTER);
msg.fadeIn(20);
msg.fadeOut(20);

EmbersTextAPI.sendMessage(player, msg);
```

---

## 6. TextSpan Builder (No Markup)

Building spans programmatically without using markup strings:

```java
import net.tysontheember.emberstextapi.immersivemessages.api.TextSpan;
import net.tysontheember.emberstextapi.immersivemessages.effects.EffectRegistry;

TextSpan header = new TextSpan("QUEST COMPLETE")
    .bold(true)
    .color(0xFFD700)  // Gold
    .addEffect(EffectRegistry.parseTag("pulse f=1.5"));

TextSpan body = new TextSpan(" — Well done!")
    .color(0xCCCCCC);  // Light gray

List<TextSpan> spans = List.of(header, body);
ImmersiveMessage msg = new ImmersiveMessage(spans, 180f);

EmbersTextAPI.sendMessage(player, msg);
```

---

## 7. Inline Item in Tooltip Text

Using the item tag to show an item icon inline:

```java
// This would typically be used in a tooltip or chat component
List<TextSpan> spans = MarkupParser.parse(
    "You need <item id=minecraft:diamond count=3/> x3 Diamonds to proceed."
);

// For an ImmersiveMessage:
ImmersiveMessage msg = new ImmersiveMessage(spans, 100f);
EmbersTextAPI.sendMessage(player, msg);
```

---

## 8. Typewriter Reveal

Text that reveals character by character:

```java
List<TextSpan> spans = MarkupParser.parse(
    "<typewriter speed=40>The ancient scroll reads...</typewriter>"
);

ImmersiveMessage msg = new ImmersiveMessage(spans, 300f); // Long duration for full reveal
msg.setAnchor(TextAnchor.CENTER_CENTER);

EmbersTextAPI.sendMessage(player, msg);
```

---

## 9. Simple Preset Usage

Using a built-in preset:

```java
List<TextSpan> spans = MarkupParser.parse(
    "<legendary>LEGENDARY ITEM FOUND</legendary>"
);

ImmersiveMessage msg = new ImmersiveMessage(spans, 200f);
msg.setAnchor(TextAnchor.CENTER_CENTER);
msg.setTextScale(1.5f);
msg.fadeIn(30);
msg.fadeOut(30);

EmbersTextAPI.sendMessage(player, msg);
```

---

## 10. Obfuscate Reveal

Text that starts scrambled and progressively reveals:

```java
List<TextSpan> spans = MarkupParser.parse(
    "<obfuscate mode=reveal speed=30 direction=center>SECRET MESSAGE</obfuscate>"
);

ImmersiveMessage msg = new ImmersiveMessage(spans, 200f);
msg.setAnchor(TextAnchor.CENTER_CENTER);

EmbersTextAPI.sendMessage(player, msg);
```
