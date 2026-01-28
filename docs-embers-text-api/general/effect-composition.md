---
sidebar_position: 5
title: How Effects Stack and Interact
description: How multiple effects compose, their ordering, and practical combinations.
---

# How Effects Stack and Interact

One of the most powerful aspects of Embers Text API is that **multiple effects can be applied to the same text simultaneously**. Understanding how they compose is key to creating the visual results you want.

---

## The Composition Model

Effects are processed **in order**, one after the other. Each effect receives the rendering state left by the previous effect and modifies it further. Think of it as a pipeline:

```
Original character state
    → Effect 1 modifies it
        → Effect 2 modifies the result
            → Effect 3 modifies the result
                → Final rendering state is drawn
```

The "rendering state" includes:
- **Position** (x, y offset in pixels)
- **Color** (red, green, blue channels)
- **Alpha** (transparency)
- **Rotation** (in radians)
- **Scale**

---

## Ordering Matters

The order in which effects are listed determines the final result. Consider these two arrangements:

**Rainbow first, then Pulse:**
```markup
<pulse><rainbow>Text</rainbow></pulse>
```
The rainbow sets the color. Then pulse modulates the brightness of that rainbow color.

**Pulse first, then Rainbow:**
```markup
<rainbow><pulse>Text</pulse></rainbow>
```
Pulse modulates the default text color first. Then rainbow overrides the color entirely, ignoring what pulse did to brightness.

In most cases, **color effects should come first** (innermost tags), and **brightness/transparency modifiers should come after** (outer tags).

---

## Common Combinations

### Animated Gradient with Wave Motion

```markup
<wave a=2.0><grad f=1.0 from=FF0000 to=0000FF>Flowing gradient</grad></wave>
```

The gradient colors the text. The wave moves each character up and down. Both effects operate on independent axes (color vs. position), so they combine cleanly.

### Neon Glow Around Rainbow Text

```markup
<neon r=3 i=1.5><rainbow>Glowing Rainbow!</rainbow></neon>
```

Rainbow sets per-character colors. Neon creates glow layers around each character using whatever color rainbow assigned.

### Typewriter with Shake

```markup
<shake a=1.5><typewriter speed=40>Shaky reveal...</typewriter></shake>
```

Characters are revealed one by one by the typewriter. Once revealed, they also shake.

### Glitch with Custom Shadow

```markup
<shadow x=2 y=2 c=0000FF a=0.5><glitch s=0.1>Glitchy with blue shadow</glitch></shadow>
```

The shadow effect only affects the shadow rendering layer. The glitch affects the main text layer. They operate on separate layers and combine without conflict.

### Fade with Pulse (Layered Transparency)

```markup
<pulse base=0.6><fade a=0.2 f=0.5>Doubly modulated text</fade></pulse>
```

Fade modulates alpha (transparency). Pulse modulates brightness. The result is text that both dims and fades at different rates.

---

## Effects That Don't Conflict

Some effect pairs naturally work together because they modify different properties:

| Combination | Why It Works |
|---|---|
| Color effect + Motion effect | Color changes don't affect position; position changes don't affect color. |
| Typewriter + any visual effect | Typewriter controls visibility (alpha = 0 for unrevealed chars). Visual effects apply to revealed characters. |
| Shadow effect + any other effect | Shadow only modifies the shadow rendering layer. Other effects modify the main text layer. |
| Neon + color effect | Neon creates glow layers based on the current color state. Color effects set that color. |

## Effects That Can Conflict

| Combination | What Happens |
|---|---|
| Two color effects | The second one overwrites the first. Rainbow after Gradient means Gradient's colors are lost. |
| Two transparency effects | Both multiply alpha. A fade at 0.5 combined with another fade at 0.5 results in 0.25 alpha. This may or may not be intentional. |
| Two position effects | Both offsets add together. Wave + Shake = wave motion plus random jitter on top. This is usually desirable. |

---

## Using Presets as a Starting Point

The built-in presets (`<epic>`, `<legendary>`, `<spooky>`) are pre-composed effect bundles. You can wrap them with additional effects:

```markup
<wave a=1.5><epic>Epic with extra wave!</epic></wave>
```

This adds a wave motion on top of the epic preset's pulse and wave effects, resulting in a more pronounced wave.
