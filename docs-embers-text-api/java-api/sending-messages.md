---
sidebar_position: 2
title: Sending Messages
description: Create ImmersiveMessage objects and send them to players using the Java API.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Sending Messages

`ImmersiveMessage` is the main class for creating on-screen text displays. This page covers creating messages, configuring them, and sending them to players.

**Package:** `net.tysontheember.emberstextapi.immersivemessages.api`

:::tip
For a list of all available effects and their parameters, see the [Effects Reference](../guides/effects-reference.md).
:::

---

## The Simplest Message

```java
import net.tysontheember.emberstextapi.EmbersTextAPI;
import net.tysontheember.emberstextapi.immersivemessages.api.ImmersiveMessage;
import net.minecraft.network.chat.Component;

ImmersiveMessage msg = new ImmersiveMessage(Component.literal("Hello, World!"), 100f);
EmbersTextAPI.sendMessage(serverPlayer, msg);
```

The duration is in **ticks** (20 ticks = 1 second). `100f` = 5 seconds.

On Fabric, use `EmbersTextAPIFabric.sendMessage()` instead.

---

## Creating Messages

### From a Component

```java
ImmersiveMessage msg = new ImmersiveMessage(Component.literal("Hello!"), 100f);
```

### From Markup

```java
ImmersiveMessage msg = ImmersiveMessage.fromMarkup(150f,
    "<neon r=2><rainbow><bold>Welcome!</bold></rainbow></neon>"
);
```

### From a Plain String

```java
ImmersiveMessage msg = ImmersiveMessage.builder(100f, "Simple message");
```

### From Pre-Built TextSpans

```java
List<TextSpan> spans = MarkupParser.parse("<rainbow>Hello!</rainbow> normal text");
ImmersiveMessage msg = ImmersiveMessage.fromSpans(200f, spans);
```

---

## Configuration Methods

All configuration methods return `this` for fluent chaining.

### Positioning

```java
msg.anchor(TextAnchor.MIDDLE)           // Default: TOP_CENTER
msg.align(TextAlign.CENTER)             // Default: LEFT
msg.offset(0f, -30f)                   // Pixel offset from anchor (x, y)
msg.scale(1.5f)                         // Default: 1.0
```

### Fade Animations

```java
msg.fadeInTicks(20)     // Fade in over 1 second
msg.fadeOutTicks(30)    // Fade out over 1.5 seconds
```

:::note
Fade ticks are included in the total duration. For a 5-second message with 1-second fades: `duration=100`, `fadeInTicks(20)`, `fadeOutTicks(20)`.
:::

### Shadow

```java
msg.shadow(true)    // Default: true
msg.shadow(false)   // Disable shadow
```

### Background

```java
// Simple on/off
msg.background(true)

// With colors (ImmersiveColor uses 0xAARRGGBB format)
msg.backgroundColors(
    new ImmersiveColor(0x60000000),    // bg: 37% opaque black
    new ImmersiveColor(0x80FFFFFF),    // border start: 50% opaque white
    new ImmersiveColor(0x80FFFFFF)     // border end
)

// Background gradient
msg.backgroundGradient("60000040", "60400000")  // Hex strings
```

### Text Color Gradient

Use the `<grad>` markup tag on your spans instead:

```java
List<TextSpan> spans = MarkupParser.parse("<grad from=FF0000 to=0000FF>Hello!</grad>");
// Multi-stop:
List<TextSpan> spans = MarkupParser.parse("<grad from=FF0000 via=FFFF00 to=00FF00>Hello!</grad>");
```

### Typewriter

```java
msg.typewriter(0.5f)           // 0.5 characters per tick
msg.typewriter(0.5f, true)     // With center-aligned reveal
```

### Wrapping

```java
msg.wrap(200)   // Max 200 pixels wide before wrapping
```

### Texture Backgrounds

Use a custom texture as the message background instead of a solid color. Texture backgrounds are **Java API-only** — there is no markup tag equivalent.

```java
import net.minecraft.resources.ResourceLocation;

// Simple — uses a 256x256 texture at full size
msg.textureBackground(ResourceLocation.parse("mymod:textures/gui/panel.png"));

// Specify texture dimensions
msg.textureBackground(ResourceLocation.parse("mymod:textures/gui/panel.png"), 128, 64);

// Full atlas control — UV offset, region size, atlas size
msg.textureBackground(
    ResourceLocation.parse("mymod:textures/gui/atlas.png"),
    0, 0,       // u, v offset
    64, 32,     // region width, height
    256, 256    // atlas width, height
);
```

**Configuration methods** (all return `this` for chaining):

```java
// Scale the texture (uniform or per-axis)
msg.textureBackgroundScale(2.0f);
msg.textureBackgroundScale(1.5f, 2.0f);  // scaleX, scaleY

// Add padding around the text area
msg.textureBackgroundPadding(8.0f);
msg.textureBackgroundPadding(10.0f, 5.0f);  // paddingX, paddingY

// Override the rendered size (ignores scale)
msg.textureBackgroundSize(200f, 100f);
msg.textureBackgroundWidth(200f);
msg.textureBackgroundHeight(100f);

// Sizing mode: how the texture fills the background area
msg.textureBackgroundMode(ImmersiveMessage.TextureSizingMode.STRETCH);  // Default
msg.textureBackgroundMode(ImmersiveMessage.TextureSizingMode.CROP);
```

| Method | Description |
|---|---|
| `textureBackground(ResourceLocation)` | Set texture (assumes 256x256 atlas) |
| `textureBackground(ResourceLocation, width, height)` | Set texture with dimensions |
| `textureBackground(ResourceLocation, u, v, regionW, regionH, atlasW, atlasH)` | Full atlas UV control |
| `textureBackgroundScale(float)` | Uniform scale multiplier |
| `textureBackgroundScale(float, float)` | Per-axis scale (X, Y) |
| `textureBackgroundPadding(float)` | Uniform padding around text |
| `textureBackgroundPadding(float, float)` | Per-axis padding (X, Y) |
| `textureBackgroundSize(float, float)` | Override rendered width and height |
| `textureBackgroundWidth(float)` | Override rendered width only |
| `textureBackgroundHeight(float)` | Override rendered height only |
| `textureBackgroundMode(TextureSizingMode)` | STRETCH (default) or CROP |

See [`TextureSizingMode`](./enums-and-utilities.md#texturesizingmode) for sizing mode details.

---

## Full Example

```java
import net.tysontheember.emberstextapi.EmbersTextAPI;
import net.tysontheember.emberstextapi.immersivemessages.api.*;
import net.tysontheember.emberstextapi.immersivemessages.util.ImmersiveColor;

// Build spans from markup
List<TextSpan> spans = MarkupParser.parse(
    "<neon r=2><rainbow><bold>Welcome!</bold></rainbow></neon> " +
    "<color value=#AAAAAA>Enjoy your stay.</color>"
);

// Create and configure the message
ImmersiveMessage msg = new ImmersiveMessage(spans, 200f)
    .anchor(TextAnchor.MIDDLE)
    .scale(1.3f)
    .background(true)
    .backgroundColors(
        new ImmersiveColor(0x60000020),
        new ImmersiveColor(0xAAFFFFFF),
        new ImmersiveColor(0xAA000000)
    )
    .fadeInTicks(30)
    .fadeOutTicks(30);

// Send (must be called on server thread)
EmbersTextAPI.sendMessage(player, msg);
```

---

## Sending Methods

<Tabs groupId="loader">
<TabItem value="forge-neo" label="Forge / NeoForge">

```java
import net.tysontheember.emberstextapi.EmbersTextAPI;

// Simple send (generates UUID automatically)
EmbersTextAPI.sendMessage(serverPlayer, message);
```

</TabItem>
<TabItem value="fabric" label="Fabric">

```java
import net.tysontheember.emberstextapi.fabric.EmbersTextAPIFabric;

// Simple send
EmbersTextAPIFabric.sendMessage(serverPlayer, message);
```

</TabItem>
</Tabs>

For advanced control (update or close messages by ID), see [Networking](./networking.md).

---

## Open / Update / Close Pattern

For messages that persist and need to be updated or closed programmatically (e.g., a progress bar, a running timer), use the explicit Open/Update/Close API via `NetworkHelper`.

```java
import net.tysontheember.emberstextapi.platform.NetworkHelper;

NetworkHelper net = NetworkHelper.getInstance();
String messageId = "my-progress-bar";

// Open a message with an explicit ID
net.sendOpenMessage(player, message);  // generates UUID internally

// Later: update it before it expires
net.sendUpdateMessage(player, messageId, updatedMessage);

// Later: close it explicitly
net.sendCloseMessage(player, messageId);

// Emergency: close everything
net.sendCloseAllMessages(player);
```

See the full [Networking](./networking.md) page for all available methods.

---

## Sending Message Queues from Java

```java
import net.tysontheember.emberstextapi.platform.NetworkHelper;
import java.util.List;

NetworkHelper net = NetworkHelper.getInstance();

// Build steps: each step is a list of simultaneous messages
ImmersiveMessage step1a = ImmersiveMessage.fromMarkup(100f, "<rainbow>Step 1 message A</rainbow>");
ImmersiveMessage step1b = ImmersiveMessage.fromMarkup(100f, "<wave>Step 1 message B</wave>");
ImmersiveMessage step2  = ImmersiveMessage.fromMarkup(80f, "Step 2");

List<List<ImmersiveMessage>> steps = List.of(
    List.of(step1a, step1b),  // Step 1: both show simultaneously
    List.of(step2)            // Step 2: plays after step 1 finishes
);

net.sendQueue(player, "my-channel", steps);
```

---

## Important Notes

- Always send messages from the **server thread**. Never construct or send messages from the client side.
- Duration is in ticks: `20f` = 1 second, `200f` = 10 seconds.
- Messages are automatically removed when their duration expires. To remove early, use `sendCloseMessage()`.
- Do not send a new message every tick for updates — use `sendUpdateMessage()` instead.
