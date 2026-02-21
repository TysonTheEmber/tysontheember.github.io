---
sidebar_position: 8
title: Enums and Utilities
description: TextAnchor, TextAlign, ObfuscateMode, ShakeType, ImmersiveColor, ColorParser, and other utility classes.
---

# Enums and Utilities

---

## TextAnchor

Defines 9 screen anchor positions for message placement.

**Package:** `net.tysontheember.emberstextapi.immersivemessages.api`

```java
public enum TextAnchor {
    TOP_LEFT(0f, 0f),
    TOP_CENTER(0.5f, 0f),
    TOP_RIGHT(1f, 0f),

    MIDDLE_LEFT(0f, 0.5f),
    MIDDLE(0.5f, 0.5f),
    MIDDLE_RIGHT(1f, 0.5f),

    BOTTOM_LEFT(0f, 1f),
    BOTTOM_CENTER(0.5f, 1f),
    BOTTOM_RIGHT(1f, 1f);

    public final float xFactor;  // 0.0 = left edge, 1.0 = right edge
    public final float yFactor;  // 0.0 = top edge, 1.0 = bottom edge
}
```

Messages are automatically clamped to stay on screen, so edge anchors won't render text off-screen.

**Used in:**
- `ImmersiveMessage.anchor(TextAnchor)`
- `<anchor value=...>` markup tag

---

## TextAlign

Defines horizontal text alignment within an anchored position.

**Package:** `net.tysontheember.emberstextapi.immersivemessages.api`

```java
public enum TextAlign {
    LEFT(0f),
    CENTER(0.5f),
    RIGHT(1f);

    public final float xFactor;
}
```

**Used in:**
- `ImmersiveMessage.align(TextAlign)`
- `<align value=...>` markup tag

---

## ObfuscateMode

Defines the direction in which characters are revealed or hidden during obfuscation animations.

**Package:** `net.tysontheember.emberstextapi.immersivemessages.api`

```java
public enum ObfuscateMode {
    NONE,       // No directional animation
    LEFT,       // Reveal/hide left to right
    RIGHT,      // Reveal/hide right to left
    CENTER,     // Reveal/hide from center outward
    EDGES,      // Reveal/hide from both edges inward
    RANDOM      // Random reveal order
}
```

**Used in:**
- `<obfuscate direction=...>` markup tag
- `ImmersiveMessage.obfuscate(ObfuscateMode, float)`
- `TextSpan.obfuscate(ObfuscateMode, float)`

---

## ShakeType (Legacy)

Legacy enum for shake animation types. In v2, the effect system handles these via separate effect classes (`ShakeEffect`, `WaveEffect`, `CircleEffect`).

**Package:** `net.tysontheember.emberstextapi.immersivemessages.api`

```java
public enum ShakeType {
    WAVE,      // Sinusoidal vertical wave → WaveEffect
    CIRCLE,    // Circular orbital motion → CircleEffect
    RANDOM     // Random jitter → ShakeEffect
}
```

**Used in:**
- `ImmersiveMessage.shake(ShakeType, float)` (legacy)
- `TextSpan.shake(ShakeType, float)` (legacy)

For new code, prefer the effect system: `span.effect("wave a=2.0")` etc.

---

## ImmersiveColor

A color class that supports an alpha channel, unlike Minecraft's `TextColor` (which is RGB-only).

**Package:** `net.tysontheember.emberstextapi.immersivemessages.util`

```java
public class ImmersiveColor {
    /** Create from a packed ARGB integer (0xAARRGGBB). */
    public ImmersiveColor(int argb)

    public int getRGB()          // Packed RGB (no alpha)
    public int getARGB()         // Packed ARGB
    public float getAlpha()      // Alpha as float (0.0–1.0)
}
```

**Color format:** `0xAARRGGBB`
- `AA` = Alpha (`00` = transparent, `FF` = opaque)
- `RR` = Red, `GG` = Green, `BB` = Blue

**Examples:**

```java
new ImmersiveColor(0x80000000)   // 50% opaque black
new ImmersiveColor(0xFFFF0000)   // Fully opaque red
new ImmersiveColor(0x4DFFFFFF)   // 30% opaque white
```

**Used in:**
- `ImmersiveMessage.backgroundColors(ImmersiveColor, ImmersiveColor, ImmersiveColor)`
- `ImmersiveMessage.backgroundGradient(ImmersiveColor...)`
- `TextSpan.background(ImmersiveColor)`
- `TextSpan.globalBackgroundColor(ImmersiveColor)`

---

## ColorParser

Utility class for parsing color strings into various formats.

**Package:** `net.tysontheember.emberstextapi.immersivemessages.util`

```java
public class ColorParser {

    /** Parse hex string to RGB float array [r, g, b]. Accepts "FF0000" or "#FF0000". */
    public static Optional<float[]> parseToRgbFloats(String hex)

    /** Packed RGB integer to float array [r, g, b]. */
    public static float[] intToRgbFloats(int packed)

    /** RGB float values to packed integer. */
    public static int rgbFloatsToInt(float r, float g, float b)

    /**
     * Parse a color string to ImmersiveColor.
     * Accepts hex strings with or without alpha channel.
     */
    public static ImmersiveColor parseImmersiveColor(String hex)
}
```

---

## ViewStateTracker

Prevents typewriter and obfuscation animations from resetting when text is re-rendered (e.g., when a tooltip re-renders on hover).

**Package:** `net.tysontheember.emberstextapi.util`

Each message or text context gets a unique context ID. The tracker remembers whether an animation has started for that context, so re-rendering doesn't restart it.

Used internally by the rendering system. You generally don't need to interact with it directly unless implementing custom animation-based effects that need to survive re-renders.

---

## TextLayoutCache

Caches computed text layout calculations to avoid redundant work each frame.

**Package:** `net.tysontheember.emberstextapi.client`

- Automatically cleared when the GUI scale changes.
- Transparent to mod developers — it operates entirely internally during rendering.
- Significantly improves performance for messages that don't change content between frames.

You don't need to interact with this class directly.
