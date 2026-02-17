---
sidebar_position: 7
title: Enums and Utility Classes
description: TextAnchor, TextAlign, ObfuscateMode, ShakeType, ImmersiveColor, ColorParser.
---

# Enums and Utility Classes

---

## TextAnchor

Defines 9-position screen anchor positions for message placement. Values use clean normalized coordinates (0, 0.5, 1).

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

    public final float xFactor;  // Normalized X position (0.0 = left, 1.0 = right)
    public final float yFactor;  // Normalized Y position (0.0 = top, 1.0 = bottom)
}
```

Text is automatically clamped to stay on screen with a small margin, so edge anchors like `TOP_LEFT` won't render text off-screen.

Used in:
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

Used in:
- `ImmersiveMessage.align(TextAlign)`
- `<align value=...>` markup tag

---

## ObfuscateMode

Defines the direction in which characters are revealed or hidden during obfuscation animations.

**Package:** `net.tysontheember.emberstextapi.immersivemessages.api`

```java
public enum ObfuscateMode {
    NONE,       // No directional animation
    LEFT,       // Reveal/hide from left to right
    RIGHT,      // Reveal/hide from right to left
    CENTER,     // Reveal/hide from center outward
    EDGES,      // Reveal/hide from both edges inward
    RANDOM      // Random reveal order
}
```

Used in the `<obfuscate direction=...>` markup tag and `ImmersiveMessage.obfuscate(ObfuscateMode, float)`.

---

## ShakeType (Legacy)

Legacy enum for shake animation types. In v2, the effect system handles these via separate effect classes (`ShakeEffect`, `WaveEffect`, `CircleEffect`).

**Package:** `net.tysontheember.emberstextapi.immersivemessages.api`

```java
public enum ShakeType {
    WAVE,      // Sinusoidal vertical wave → maps to WaveEffect
    CIRCLE,    // Circular orbital motion → maps to CircleEffect
    RANDOM     // Random jitter → maps to ShakeEffect
}
```

---

## ImmersiveColor

A color class that supports an alpha channel, unlike Minecraft's `TextColor` which is RGB-only.

**Package:** `net.tysontheember.emberstextapi.immersivemessages.util`

```java
public class ImmersiveColor {
    /** Create from a packed ARGB integer. */
    public ImmersiveColor(int argb)

    /** Get the packed RGB value (no alpha). */
    public int getRGB()

    /** Get the packed ARGB value. */
    public int getARGB()

    /** Get the alpha channel as a float (0.0–1.0). */
    public float getAlpha()
}
```

**Example:**

```java
// 50% opaque black background
ImmersiveColor bg = new ImmersiveColor(0x80000000);

// Fully opaque red
ImmersiveColor red = new ImmersiveColor(0xFFFF0000);

// 30% opaque white border
ImmersiveColor border = new ImmersiveColor(0x4DFFFFFF);
```

**Color format:** `0xAARRGGBB`
- `AA` = Alpha (00 = transparent, FF = opaque)
- `RR` = Red
- `GG` = Green
- `BB` = Blue

---

## ColorParser

Utility class for parsing color strings into various formats.

**Package:** `net.tysontheember.emberstextapi.immersivemessages.util`

```java
public class ColorParser {

    /**
     * Parse a hex color string to RGB float array [r, g, b].
     * Accepts: "FF0000", "#FF0000", "RRGGBB"
     */
    public static Optional<float[]> parseToRgbFloats(String hex)

    /** Convert a packed RGB integer to float array [r, g, b]. */
    public static float[] intToRgbFloats(int packed)

    /** Convert RGB float values to a packed integer. */
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

Prevents typewriter and obfuscation animations from resetting when text is re-rendered (e.g., tooltip hover refresh).

**Package:** `net.tysontheember.emberstextapi.util`

Each message or text context gets a unique context ID. The tracker remembers whether an animation has started for that context, so re-rendering doesn't restart it.

This is used internally by the rendering system. Mod developers generally don't need to interact with it directly unless implementing custom animation-based effects that need to survive re-renders.

---

## TextLayoutCache

Caches computed text layout calculations to avoid redundant work each frame.

**Package:** `net.tysontheember.emberstextapi.client`

- Automatically cleared when the GUI scale changes.
- Transparent to mod developers — it operates internally during rendering.
- Improves performance for messages that don't change content between frames.
