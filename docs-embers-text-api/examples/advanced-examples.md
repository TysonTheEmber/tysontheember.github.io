---
sidebar_position: 2
title: Advanced Multi-Effect Examples
description: Complex examples combining multiple effects, presets, and layout controls.
---

# Advanced Multi-Effect Examples

These examples demonstrate more complex usage patterns that combine multiple effects, layout controls, and content types.

---

## 1. Boss Defeat Announcement

A dramatic center-screen announcement with layered effects:

```java
List<TextSpan> spans = MarkupParser.parse(
    // Layout and background
    "<anchor value=MIDDLE>" +
    "<bg color=#70000020>" +
    "<fade in=40 out=40>" +

    // Title with rainbow neon glow
    "<neon r=3 i=1.5 c=FF4400>" +
        "<rainbow f=2.0><bold>BOSS DEFEATED!</bold></rainbow>" +
    "</neon>" +

    // Subtitle with gradient
    "<color value=#AAAAAA> — " +
        "<grad from=FFAA00 to=FF6600 f=0.5>Victory is yours.</grad>" +
    "</color>" +

    "</fade></bg></anchor>"
);

ImmersiveMessage msg = new ImmersiveMessage(spans, 300f); // 15 seconds
msg.scale(1.4f);
EmbersTextAPI.sendMessage(player, msg);
```

**What this does:**
- Centers the message on screen with a dark semi-transparent background.
- Title has a fast rainbow color cycle wrapped in an orange neon glow.
- Subtitle uses an animated gold-to-orange gradient.
- The entire message fades in over 2 seconds and fades out over 2 seconds.

---

## 2. Quest Progress Tracker with Items

A tooltip-style message showing quest progress with inline item icons:

```java
List<TextSpan> spans = MarkupParser.parse(
    "<bold><color value=#FFD700>Quest: Ancient Ruins</color></bold>\n" +

    // Completed objective
    "<color value=#00FF00>✓</color> Gather " +
        "<item id=minecraft:oak_log count=64/> x64 Oak Logs\n" +

    // In-progress objective
    "<color value=#FFAA00>◐</color> Craft " +
        "<item id=minecraft:furnace count=1/> x1 Furnace\n" +

    // Locked objective (with obfuscation)
    "<color value=#888888>✗ </color>" +
        "<obfuscate mode=constant>Defeat the Dragon</obfuscate>"
);

ImmersiveMessage msg = new ImmersiveMessage(spans, 250f);
msg.anchor(TextAnchor.TOP_LEFT);
msg.background(true);
msg.backgroundColors(
    new ImmersiveColor(0x80101010),
    new ImmersiveColor(0xAAFFFFFF),
    new ImmersiveColor(0xAA000000)
);
msg.offset(10f, 10f);

EmbersTextAPI.sendMessage(player, msg);
```

**What this does:**
- Shows a quest title in gold bold.
- Each objective has a status icon (green check, orange half-circle, gray X).
- Completed and in-progress objectives show item icons inline.
- The locked objective's text is permanently scrambled with obfuscation.
- Positioned in the top-left with a dark background.

---

## 3. Glitch Hacker Terminal

A cyber-aesthetic message with glitch and typewriter effects:

```java
List<TextSpan> spans = MarkupParser.parse(
    "<anchor value=MIDDLE>" +
    "<bg color=#90001A00 bordercolor=#40AAFFAA>" +
    "<scale value=1.2>" +

    // Header with glitch
    "<glitch s=0.12 c=0.8 slices=3>" +
        "<color value=#00FF88><bold>// SYSTEM BREACH //</bold></color>" +
    "</glitch>\n\n" +

    // Body with typewriter reveal
    "<typewriter speed=25 sound=\"minecraft:block.note_block.hat\">" +
        "<color value=#00CCAA>" +
            "Access granted. Welcome, operator.\n" +
            "All systems nominal.\n" +
            "Proceed with caution." +
        "</color>" +
    "</typewriter>" +

    "</scale></bg></anchor>"
);

ImmersiveMessage msg = new ImmersiveMessage(spans, 400f); // 20 seconds
msg.fadeInTicks(10);

EmbersTextAPI.sendMessage(player, msg);
```

**What this does:**
- Green-on-dark-green aesthetic with a border.
- The header text glitches with 3 slices and chromatic aberration.
- The body text reveals character by character with a note block click sound.
- Everything is scaled up 20% for readability.

---

## 4. Animated Welcome Banner

A multi-line welcome message with different effects per line:

```java
List<TextSpan> spans = MarkupParser.parse(
    "<anchor value=TOP_CENTER><offset y=20>" +

    // Line 1: Wave + rainbow
    "<wave a=2.0 f=1.5>" +
        "<rainbow f=1.0 w=0.8>Welcome to the Server!</rainbow>" +
    "</wave>\n" +

    // Line 2: Pulse gradient
    "<pulse f=1.0 base=0.7>" +
        "<grad from=5BCEFA to=F5A9B8 f=0.3>A friendly community awaits you.</grad>" +
    "</pulse>\n\n" +

    // Line 3: Subtle shake
    "<shake a=0.5 f=2.0>" +
        "<color value=#AAAAAA>Press /help to get started.</color>" +
    "</shake>" +

    "</offset></anchor>"
);

ImmersiveMessage msg = new ImmersiveMessage(spans, 250f);
msg.fadeInTicks(40);
msg.fadeOutTicks(40);

EmbersTextAPI.sendMessage(player, msg);
```

**What this does:**
- Line 1 waves up and down with a rainbow color effect.
- Line 2 pulses in brightness with an animated trans-pride gradient.
- Line 3 gently shakes with muted gray color.
- The whole banner fades in and out smoothly.

**Note:** As of v2.0.0, welcome messages are no longer automatically sent to players on first join. The mod only displays a basic chat message. This example shows how you would create a custom welcome message in your own mod if desired.

---

## 5. Item Trading Display

Shows a trade offer with item icons on both sides:

```java
List<TextSpan> spans = MarkupParser.parse(
    "<bg color=#60101010>" +
    "<bold><color value=#FFD700>Trade Offer</color></bold>\n\n" +

    // Offering
    "<color value=#AAAAAA>You give: </color>" +
        "<item id=minecraft:emerald count=16/> x16 Emeralds\n\n" +

    // Arrow separator with animation
    "<wave a=1.0 f=2.0><color value=#FF6600>▼</color></wave>\n\n" +

    // Receiving
    "<color value=#AAAAAA>You receive: </color>" +
        "<item id=minecraft:diamond_sword count=1/> Diamond Sword" +

    "</bg>"
);

ImmersiveMessage msg = new ImmersiveMessage(spans, 200f);
msg.anchor(TextAnchor.MIDDLE);

EmbersTextAPI.sendMessage(player, msg);
```

---

## 6. Custom Effect Registration + Usage

A complete example showing how to register and use a custom effect:

```java
// === In your mod's client setup event ===

import net.tysontheember.emberstextapi.immersivemessages.effects.*;
import net.tysontheember.emberstextapi.immersivemessages.effects.params.Params;

EffectRegistry.register("sparkle", params -> new Effect() {
    private final float speed = params.getDouble("f")
        .map(Number::floatValue).orElse(1.0f);
    private final float density = params.getDouble("d")
        .map(Number::floatValue).orElse(0.3f);

    @Override
    public void apply(EffectSettings settings) {
        // Random sparkle: occasionally make character invisible
        float time = net.minecraft.Util.getMillis() * 0.01f * speed;
        float hash = Math.sin(time + settings.index * 7.3f) * 0.5f + 0.5f;
        if (hash < density) {
            settings.a = 0.0f; // Hide this character this frame
        }
    }

    @Override
    public String getName() { return "sparkle"; }

    @Override
    public String serialize() {
        return "sparkle f=" + speed + " d=" + density;
    }
});

// === In your message creation code ===

List<TextSpan> spans = MarkupParser.parse(
    "<sparkle f=2.0 d=0.4><rainbow>Sparkling Rainbow!</rainbow></sparkle>"
);

ImmersiveMessage msg = new ImmersiveMessage(spans, 200f);
msg.anchor(TextAnchor.MIDDLE);
EmbersTextAPI.sendMessage(player, msg);
```

---

## 7. Entity Display with Rotation

Showing an entity model with animation and continuous rotation:

```java
List<TextSpan> spans = MarkupParser.parse(
    "<bold>Enemies nearby:</bold>\n\n" +
    "<entity id=minecraft:creeper scale=0.8 spin=3.0 anim=idle/> Creeper\n" +
    "<entity id=minecraft:skeleton scale=0.7 yaw=0 spin=-2.0 anim=idle/> Skeleton\n" +
    "<entity id=minecraft:zombie scale=0.75 spin=2.5 anim=walk/> Zombie"
);

ImmersiveMessage msg = new ImmersiveMessage(spans, 150f);
msg.anchor(TextAnchor.MIDDLE_RIGHT);
msg.offset(-20f, 0f);

EmbersTextAPI.sendMessage(player, msg);
```

**What this does:**
- Displays three enemy entity models alongside their names.
- Each entity spins at a different speed and direction.
- The zombie plays a walk animation.
- The panel is positioned on the right side of the screen.
