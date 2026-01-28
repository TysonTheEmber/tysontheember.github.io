---
sidebar_position: 3
title: Text Effects Reference
description: Every built-in effect, its parameters, and how to use it in markup.
---

# Text Effects Reference

This page documents every built-in text effect in Embers Text API v2. Each entry includes the markup tag name, all available parameters, default values, and usage examples.

> **How parameters work:** Parameters are written as `key=value` inside the tag. Numeric values are written as plain numbers. Boolean values are `true` or `false`. Colors are written as hex strings (e.g., `FF0000` for red). If you omit a parameter, the default value is used.

---

## Color Effects

### Rainbow

Cycles text through the full color spectrum over time. Each character is phase-offset from its neighbors, creating a smooth wave of color.

| Tag | Aliases |
|---|---|
| `<rainbow>` | `<rainb>` |

| Parameter | Type | Default | Description |
|---|---|---|---|
| `f` | number | `1.0` | Color cycling speed. Higher = faster cycling. |
| `w` | number | `1.0` | Phase offset between adjacent characters. Controls wave tightness. |

**Examples:**

```markup
<rainbow>Standard rainbow</rainbow>
<rainbow f=2.0>Fast-cycling rainbow</rainbow>
<rainbow f=1.0 w=0.5>Tight wave rainbow</rainbow>
```

---

### Gradient

Creates a smooth color transition across the text, from one color to another.

| Tag | Aliases |
|---|---|
| `<grad>` | `<gradient>` |

| Parameter | Type | Default | Description |
|---|---|---|---|
| `from` | hex color | `5BCEFA` (light blue) | Starting color of the gradient. |
| `to` | hex color | `F5A9B8` (pink) | Ending color of the gradient. |
| `hue` | boolean | `false` | Use HSV color space for smoother hue transitions (recommended for rainbow-like gradients). |
| `f` | number | `0.0` | Animation speed. Set to `0` for a static gradient. A value above `0` makes the gradient shift over time. |
| `sp` | number | `20.0` | Gradient span in characters — how many characters the gradient covers before repeating. |
| `uni` | boolean | `false` | Unidirectional mode. When `false` (default), the gradient goes color A → B → A (cyclic). When `true`, it goes A → B only. |

**Examples:**

```markup
<grad>Default blue-to-pink gradient</grad>
<grad from=FF0000 to=0000FF>Red to blue</grad>
<grad hue=true from=FF0000 to=00FF00>Smooth hue red-to-green</grad>
<grad f=1.0>Animated shifting gradient</grad>
<grad sp=10 uni=true>Short one-way gradient</grad>
```

---

### Pulse

Modulates text brightness in a rhythmic pulsing pattern.

| Tag | Aliases |
|---|---|
| `<pulse>` | — |

| Parameter | Type | Default | Description |
|---|---|---|---|
| `base` | number | `0.75` | Minimum brightness multiplier (0.0–1.0). Lower values create darker troughs. |
| `a` | number | `1.0` | Amplitude of the brightness variation. |
| `f` | number | `1.0` | Pulse speed. Higher = faster pulsing. |
| `w` | number | `0.0` | Phase offset between characters. Non-zero creates a wave-like pulse across text. |

**Examples:**

```markup
<pulse>Gently pulsing text</pulse>
<pulse base=0.5 a=1.5>Strong pulsing</pulse>
<pulse f=3.0>Rapid pulse</pulse>
<pulse w=0.3>Wave-style pulse</pulse>
```

---

### Fade

Oscillates text transparency between visible and semi-transparent.

| Tag | Aliases |
|---|---|
| `<fade>` | — |

> **Note:** The `<fade>` tag has two modes. When used with `a`, `f`, or `w` parameters, it acts as an oscillating transparency effect. When used with `in` and/or `out` parameters (without `a`/`f`/`w`), it sets global fade-in/fade-out tick counts for the message.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `a` | number | `0.3` | Minimum alpha (transparency floor). `0.0` = fully invisible at minimum, `1.0` = no fading. |
| `f` | number | `1.0` | Fade oscillation speed. |
| `w` | number | `0.0` | Phase offset between characters. |

**Examples:**

```markup
<fade>Gently fading text</fade>
<fade a=0.0>Full fade to invisible</fade>
<fade f=2.0>Fast fade oscillation</fade>
<fade w=0.2>Wave-style fading</fade>
```

**Global fade-in/fade-out (message-level):**

```markup
<fade in=30 out=30>Message fades in over 30 ticks, fades out over 30 ticks</fade>
```

---

## Motion Effects

### Wave

Characters move up and down in a smooth sinusoidal wave pattern.

| Tag | Aliases |
|---|---|
| `<wave>` | — |

| Parameter | Type | Default | Description |
|---|---|---|---|
| `a` | number | `1.0` | Wave height in pixels. |
| `f` | number | `1.0` | Wave speed. |
| `w` | number | `1.0` | Wavelength — distance between wave peaks relative to character spacing. |

**Examples:**

```markup
<wave>Flowing wave text</wave>
<wave a=3.0>Tall waves</wave>
<wave f=2.0>Fast waves</wave>
<wave w=0.5>Tight, rapid waves</wave>
```

---

### Shake

Random jittery displacement applied to each character.

| Tag | Aliases |
|---|---|
| `<shake>` | — |

| Parameter | Type | Default | Description |
|---|---|---|---|
| `a` | number | `1.0` | Shake intensity (displacement distance in pixels). |
| `f` | number | `1.0` | Shake speed (how frequently the direction changes). |

**Examples:**

```markup
<shake>Vibrating text</shake>
<shake a=3.0>Intense shake</shake>
<shake a=0.5 f=5.0>Subtle, rapid vibration</shake>
```

---

### Bounce

Characters hop up and down with realistic bounce physics (multiple diminishing bounces).

| Tag | Aliases |
|---|---|
| `<bounce>` | — |

| Parameter | Type | Default | Description |
|---|---|---|---|
| `a` | number | `1.0` | Bounce height (multiplied internally by 4 for visibility). |
| `f` | number | `1.0` | Bounce speed. |
| `w` | number | `1.0` | Phase offset between characters — creates a cascading bounce wave. |

**Animation Phases:**
1. **Rise (0–20% of cycle):** Smooth sine ease-in to peak height.
2. **Bounce (20–80%):** Multiple diminishing bounces using Robert Penner's bounce-out easing.
3. **Rest (80–100%):** Character stays at baseline.

**Examples:**

```markup
<bounce>BOING!</bounce>
<bounce a=2.0>High bounce</bounce>
<bounce w=0.3>Cascading bounce wave</bounce>
```

---

### Circle

Characters orbit in a circular path around their original position.

| Tag | Aliases |
|---|---|
| `<circle>` | — |

| Parameter | Type | Default | Description |
|---|---|---|---|
| `a` | number | `1.0` | Circle radius in pixels. |
| `f` | number | `1.0` | Rotation speed. |
| `w` | number | `0.0` | Phase offset between characters. |

**Examples:**

```markup
<circle>Orbiting text</circle>
<circle a=3.0>Large orbits</circle>
<circle f=2.0 w=0.2>Fast orbiting wave</circle>
```

---

### Wiggle

Each character wiggles back and forth in a direction determined by the character's identity (its Unicode codepoint). This creates organic, varied motion.

| Tag | Aliases |
|---|---|
| `<wiggle>` | — |

| Parameter | Type | Default | Description |
|---|---|---|---|
| `a` | number | `1.0` | Wiggle distance. |
| `f` | number | `1.0` | Wiggle speed. |
| `w` | number | `1.0` | Phase offset between characters. |

**Examples:**

```markup
<wiggle>Organic wiggly text</wiggle>
<wiggle a=2.0 f=1.5>Stronger, faster wiggle</wiggle>
```

---

### Pendulum

Characters swing back and forth like a pendulum, with optional arc movement.

| Tag | Aliases |
|---|---|
| `<pend>` | `<pendulum>` |

| Parameter | Type | Default | Description |
|---|---|---|---|
| `a` | number | `30.0` | Maximum swing angle in **degrees** (0–90). |
| `f` | number | `1.0` | Swing speed. |
| `r` | number | `0.0` | Arc radius. When greater than 0, characters also move along a circular arc (like a real pendulum). |

**Examples:**

```markup
<pend>Swinging text</pend>
<pend a=60>Wide swing</pend>
<pend a=30 r=5>Pendulum with arc movement</pend>
```

---

### Swing

Characters rotate back and forth around their center point.

| Tag | Aliases |
|---|---|
| `<swing>` | — |

| Parameter | Type | Default | Description |
|---|---|---|---|
| `a` | number | `1.0` | Rotation amplitude (in radians, internally multiplied by 0.5). `1.0` ≈ ±28.6 degrees. |
| `f` | number | `1.0` | Swing speed. |
| `w` | number | `0.0` | Phase offset between characters. |

**Examples:**

```markup
<swing>Rocking text</swing>
<swing a=2.0 f=1.5>Strong, fast rocking</swing>
```

---

### Scroll

Text scrolls continuously from right to left, looping after a fixed period.

| Tag | Aliases |
|---|---|
| `<scroll>` | — |

| Parameter | Type | Default | Description |
|---|---|---|---|
| `f` | number | `1.0` | Scrolling speed. |

**Examples:**

```markup
<scroll>Marquee text</scroll>
<scroll f=2.0>Fast scrolling</scroll>
```

---

### Turbulence

Characters drift in organic, wind-like motion using dual-frequency noise.

| Tag | Aliases |
|---|---|
| `<turb>` | `<turbulence>` |

| Parameter | Type | Default | Description |
|---|---|---|---|
| `a` | number | `1.0` | Displacement strength. |
| `f` | number | `1.0` | Turbulence speed. |

**Examples:**

```markup
<turb>Wind-blown text</turb>
<turb a=2.0>Strong turbulence</turb>
<turb a=3.0 f=0.5>Slow, drifting motion</turb>
```

---

## Special Effects

### Glitch

Digital distortion with multiple visual sub-effects: horizontal slice displacement, position jitter, alpha blinks, shadow color shifting, and optional chromatic aberration.

| Tag | Aliases |
|---|---|
| `<glitch>` | — |

| Parameter | Type | Default | Description |
|---|---|---|---|
| `f` | number | `1.0` | Animation speed multiplier. |
| `s` | number | `0.08` | Probability of slice displacement per frame (0.0–1.0). Higher = more frequent slicing. |
| `j` | number | `0.015` | Probability of position jitter per frame. |
| `b` | number | `0.003` | Probability of alpha blink per frame. |
| `o` | number | `1.0` | Slice offset multiplier — controls how far displaced slices move. |
| `c` | number | `0.0` | Chromatic aberration intensity. When above `0`, displaced slices get RGB color fringing. |
| `slices` | integer | `2` | Number of horizontal slices (2–5). More slices = more chaotic appearance. |

**Examples:**

```markup
<glitch>ERROR — basic glitch</glitch>
<glitch s=0.2>Frequent glitches</glitch>
<glitch c=1.0>With chromatic aberration</glitch>
<glitch slices=4 s=0.3 o=2.0>Multi-slice chaos</glitch>
```

---

### Neon

A multi-ring glow effect that surrounds text with a soft luminous halo.

| Tag | Aliases |
|---|---|
| `<neon>` | `<glow>` |

| Parameter | Type | Default | Description |
|---|---|---|---|
| `r` | number | `2.0` | Glow radius in pixels (0.5–8.0). |
| `i` | number | `1.0` | Glow brightness/intensity (0.1–3.0). |
| `q` | integer | `2` | Quality preset: `1` = fast (6 samples), `2` = balanced (12 samples), `3` = high quality (20 samples). |
| `c` | hex color | (none) | Glow color override. If omitted, the glow matches the text color. |
| `p` | number | `0` | Pulse animation speed. `0` = no pulsing. |
| `f` | number | `2.0` | Alpha falloff curve power. `1.0` = linear, `2.0` = quadratic (default, softer edges). |

**Examples:**

```markup
<neon>Default glow</neon>
<neon r=4 i=2.0>Strong wide glow</neon>
<neon c=00FFFF>Cyan glow</neon>
<neon q=3 r=3>High-quality glow</neon>
<neon p=2.0>Pulsing glow</neon>
```

---

### Shadow

Customizes the text shadow with specific color, offset, and transparency.

| Tag | Aliases |
|---|---|
| `<shadow>` | — |

> **Note:** `<shadow>` has two modes. With `x`, `y`, `c`, `r`, `g`, or `b` parameters, it acts as a custom shadow effect. With only a `value=true/false` parameter, it toggles the global message shadow on or off.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `x` | number | `0.0` | Horizontal shadow offset in pixels. |
| `y` | number | `0.0` | Vertical shadow offset in pixels. |
| `c` | hex color | (none) | Shadow color as a hex string. Takes priority over `r`/`g`/`b`. |
| `r` | number | `0.0` | Red channel (0.0–1.0). Used if `c` is not specified. |
| `g` | number | `0.0` | Green channel (0.0–1.0). Used if `c` is not specified. |
| `b` | number | `0.0` | Blue channel (0.0–1.0). Used if `c` is not specified. |
| `a` | number | `1.0` | Shadow transparency multiplier (0.0–1.0). |

**Examples:**

```markup
<shadow x=2 y=2>Text with offset shadow</shadow>
<shadow c=FF0000 a=0.7>Semi-transparent red shadow</shadow>
<shadow x=3 y=3 c=FFFF00>Yellow offset shadow</shadow>
```

---

## Animation Effects

### Typewriter

Reveals text character by character, left to right.

| Tag | Aliases |
|---|---|
| `<typewriter>` | `<type>` |

| Parameter | Type | Default | Description |
|---|---|---|---|
| `speed` | number | `20` | Milliseconds per character reveal. Lower = faster. |
| `s` | number | — | Characters per second (legacy alternative to `speed`). Converted to ms internally. |
| `sound` | string | (none) | Sound resource ID to play on each character reveal (e.g., `minecraft:block.note_block.hat`). Set to `off` to explicitly silence. |
| `resetDelay` | number | `1.0` | Seconds of inactivity before the animation resets (e.g., when a tooltip closes and reopens). |
| `loop` | boolean | — | `true` = loop infinitely. `false` = play once and stay revealed. |
| `repeat` | string/number | — | Legacy looping control. `yes` or `true` = infinite. `no` or `false` = once. A number = play N times. |

**Examples:**

```markup
<typewriter>Default-speed reveal</typewriter>
<typewriter speed=50>Slower reveal</typewriter>
<typewriter speed=30 sound="minecraft:block.note_block.hat">Reveal with click sounds</typewriter>
<typewriter loop=true>Loops forever</typewriter>
<typewriter loop=false>Plays once, stays visible</typewriter>
<typewriter resetDelay=2.0>Resets after 2 seconds of inactivity</typewriter>
```

---

### Obfuscate

Displays text as random glyphs, then progressively reveals (or hides) the real characters.

| Tag | Aliases |
|---|---|
| `<obfuscate>` | — |

| Parameter | Type | Default | Description |
|---|---|---|---|
| `mode` | string | `constant` | `reveal` — starts scrambled, progressively shows real text. `hide` — starts readable, progressively scrambles. `constant` — always scrambled. `random` — random characters flicker between scrambled and readable. |
| `speed` | number | `20` | Milliseconds per character for reveal/hide animations. |
| `direction` | string | `left` | Reveal/hide direction: `left`, `right`, `center`, `edges`, `random`. |
| `alphabet` | string | `minecraft` | `minecraft` = uses Minecraft's random glyph set. `readable` = uses random alphanumeric characters (A-Z, a-z, 0-9). |

**Examples:**

```markup
<obfuscate>Permanently scrambled</obfuscate>
<obfuscate mode=reveal>Gradually reveals from left</obfuscate>
<obfuscate mode=reveal direction=center speed=40>Reveals from center outward</obfuscate>
<obfuscate mode=hide direction=right>Hides from right to left</obfuscate>
<obfuscate mode=random>Characters randomly flicker</obfuscate>
<obfuscate mode=reveal alphabet=readable>Reveals using readable random characters</obfuscate>
```
