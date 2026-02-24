---
sidebar_position: 4
title: Effects Reference
description: All 19 built-in effects — parameters, examples, and use cases.
---

# Effects Reference

Every built-in effect in Embers Text API, with parameters, markup examples, and suggestions for when to use each one.

**How parameters work:** Write them inside the tag as `key=value`. Numbers are plain numbers, booleans are `true` or `false`, colors are hex strings (e.g., `FF0000`). Omit a parameter to use its default.

---

## Color Effects

### Rainbow

Cycles text through the full color spectrum. Each character is at a different phase, creating a wave of color across the text.

| Tag | Aliases |
|---|---|
| `<rainbow>` | `<rainb>` |

| Parameter | Default | Description |
|---|---|---|
| `f` | `1.0` | Cycling speed. Higher = faster. |
| `w` | `1.0` | Phase offset between adjacent characters. Lower = tighter wave. |

```markup title="Examples"
<rainbow>Standard rainbow</rainbow>
<rainbow f=2.0>Fast-cycling rainbow</rainbow>
<rainbow f=0.5 w=2.0>Slow, spread-out rainbow</rainbow>
```

**When to use:** Celebrations, titles, welcome messages, anything that should feel exciting and colorful.

---

### Gradient

Smooth color transition from one color to another across the text.

| Tag | Aliases |
|---|---|
| `<grad>` | `<gradient>` |

| Parameter | Default | Description |
|---|---|---|
| `from` | `5BCEFA` (light blue) | Starting color |
| `to` | `F5A9B8` (pink) | Ending color |
| `hue` | `false` | Use HSV color space for smoother hue transitions |
| `f` | `0.0` | Animation speed. `0` = static gradient. |
| `sp` | `20.0` | Span in characters — how wide the gradient stretches |
| `uni` | `false` | Unidirectional (A→B only) vs. cyclic (A→B→A) |

```markup title="Examples"
<grad>Default blue-to-pink gradient</grad>
<grad from=FF0000 to=0000FF>Red to blue</grad>
<grad hue=true from=FF0000 to=00FF00>Smooth hue shift red-to-green</grad>
<grad f=1.0>Animated shifting gradient</grad>
<grad sp=8 uni=true>Short one-way gradient</grad>
```

**When to use:** Health bars, lore text with a visual theme, boss names with dramatic color shifts.

---

### Color

Applies a single solid color to text via the effect system. Unlike the `<color>` style tag, this works within the effect stack and can be combined with other color effects.

| Tag | Aliases |
|---|---|
| `<color col=HEX>` | `<color value=HEX>` |

| Parameter | Default | Description |
|---|---|---|
| `col` | `FFFFFF` | The color to apply (hex string) |
| `value` | `FFFFFF` | Alternative to `col` |

```markup title="Examples"
<color col=FF0000>Red text</color>
<color value=#00FF00>Green text</color>
<color col=5BCEFA>Sky blue text</color>
```

**When to use:** When you need a color that can be stacked with effects like `<neon>` or `<pulse>` in the effect chain.

---

### Pulse

Rhythmic brightness pulsing — text brightens and dims repeatedly.

| Tag | Aliases |
|---|---|
| `<pulse>` | — |

| Parameter | Default | Description |
|---|---|---|
| `base` | `0.75` | Minimum brightness (0.0–1.0). Lower = darker troughs. |
| `a` | `1.0` | Pulse amplitude. |
| `f` | `1.0` | Pulse speed. |
| `w` | `0.0` | Phase offset between characters. Non-zero = wave-style pulse. |

```markup title="Examples"
<pulse>Gently pulsing text</pulse>
<pulse base=0.3 a=1.5>Strong pulsing</pulse>
<pulse f=3.0>Rapid pulse</pulse>
<pulse w=0.3>Wave-style pulse across characters</pulse>
```

**When to use:** Alerts, attention-grabbing HUD elements, countdown timers, energy indicators.

---

### Fade

Oscillates text transparency between visible and semi-transparent.

| Tag | Aliases |
|---|---|
| `<fade>` | — |

:::note
`<fade>` has two modes. With `a`, `f`, or `w` parameters: oscillating transparency effect. With `in` and/or `out` parameters (no `a`/`f`/`w`): sets global message fade-in/out timing. See [Markup Guide → Global Tags](./markup-guide.md#global-message-tags).
:::

| Parameter | Default | Description |
|---|---|---|
| `a` | `0.3` | Minimum alpha (0.0 = fully invisible at minimum) |
| `f` | `1.0` | Oscillation speed |
| `w` | `0.0` | Phase offset between characters |

```markup title="Examples"
<fade>Gently fading text</fade>
<fade a=0.0 f=2.0>Full fade-to-invisible, fast</fade>
<fade w=0.2>Wave-style fading across characters</fade>
```

**When to use:** Ghost text, ambient lore, ethereal or mysterious messages.

---

## Motion Effects

### Wave

Characters move up and down in a smooth sinusoidal wave.

| Tag | Aliases |
|---|---|
| `<wave>` | — |

| Parameter | Default | Description |
|---|---|---|
| `a` | `1.0` | Wave height in pixels |
| `f` | `1.0` | Wave speed |
| `w` | `1.0` | Wavelength (distance between peaks) |

```markup title="Examples"
<wave>Flowing wave text</wave>
<wave a=3.0>Tall waves</wave>
<wave f=2.0 w=0.5>Fast, tight waves</wave>
```

**When to use:** Fluid or water themes, lively NPC dialogue, scrolling announcements.

---

### Shake

Random jitter — each character displaces randomly every frame.

| Tag | Aliases |
|---|---|
| `<shake>` | — |

| Parameter | Default | Description |
|---|---|---|
| `a` | `1.0` | Shake intensity (pixel displacement) |
| `f` | `1.0` | Shake speed (how often direction changes) |

```markup title="Examples"
<shake>Vibrating text</shake>
<shake a=3.0>Intense shake</shake>
<shake a=0.5 f=5.0>Subtle rapid vibration</shake>
```

**When to use:** Danger warnings, explosions, earthquake events, angry NPC dialogue.

---

### Bounce

Characters hop up and down with realistic multi-bounce physics (rises, then diminishing bounces).

| Tag | Aliases |
|---|---|
| `<bounce>` | — |

| Parameter | Default | Description |
|---|---|---|
| `a` | `1.0` | Bounce height |
| `f` | `1.0` | Bounce speed |
| `w` | `1.0` | Phase offset between characters (creates a cascading wave) |

```markup title="Examples"
<bounce>BOING!</bounce>
<bounce a=2.0 w=0.3>High cascading bounce</bounce>
<bounce f=2.0>Fast bounce</bounce>
```

**When to use:** Celebratory messages, item collection, score events, jovial NPC text.

---

### Circle

Characters orbit in a circular path around their original position.

| Tag | Aliases |
|---|---|
| `<circle>` | — |

| Parameter | Default | Description |
|---|---|---|
| `a` | `1.0` | Circle radius in pixels |
| `f` | `1.0` | Rotation speed |
| `w` | `0.0` | Phase offset between characters |

```markup title="Examples"
<circle>Orbiting text</circle>
<circle a=3.0>Large orbits</circle>
<circle f=2.0 w=0.2>Fast orbiting wave</circle>
```

**When to use:** Magical effects, spinning/swirling themes, enchantment or portal messages.

---

### Wiggle

Each character wiggles in a unique direction determined by its character code. Creates organic, varied motion across the text.

| Tag | Aliases |
|---|---|
| `<wiggle>` | — |

| Parameter | Default | Description |
|---|---|---|
| `a` | `1.0` | Wiggle distance |
| `f` | `1.0` | Wiggle speed |
| `w` | `1.0` | Phase offset between characters |

```markup title="Examples"
<wiggle>Organic wiggly text</wiggle>
<wiggle a=2.0 f=1.5>Stronger, faster wiggle</wiggle>
```

**When to use:** Chaos effects, jelly-like text, playful NPC dialogue.

---

### Pendulum

Characters swing back and forth like a pendulum.

| Tag | Aliases |
|---|---|
| `<pend>` | `<pendulum>` |

| Parameter | Default | Description |
|---|---|---|
| `a` | `30.0` | Maximum swing angle in degrees (0–90) |
| `f` | `1.0` | Swing speed |
| `r` | `0.0` | Arc radius. When > 0, characters also move along a circular arc |

```markup title="Examples"
<pend>Swinging text</pend>
<pend a=60>Wide swing</pend>
<pend a=30 r=5>Pendulum with arc movement</pend>
```

**When to use:** Clock or time themes, hypnotic effects, NPCs gesturing.

---

### Swing

Characters rotate back and forth around their center point.

| Tag | Aliases |
|---|---|
| `<swing>` | — |

| Parameter | Default | Description |
|---|---|---|
| `a` | `1.0` | Rotation amplitude in radians × 0.5 (≈ ±28° at default) |
| `f` | `1.0` | Swing speed |
| `w` | `0.0` | Phase offset between characters |

```markup title="Examples"
<swing>Rocking text</swing>
<swing a=2.0 f=1.5>Strong, fast rocking</swing>
```

**When to use:** Boat/sea themes, rocking motion, agitated dialogue.

---

### Scroll

Text scrolls continuously from right to left, looping after a fixed period.

| Tag | Aliases |
|---|---|
| `<scroll>` | — |

| Parameter | Default | Description |
|---|---|---|
| `f` | `1.0` | Scrolling speed |

```markup title="Examples"
<scroll>Marquee-style scrolling text</scroll>
<scroll f=2.0>Fast scrolling</scroll>
```

**When to use:** Ticker-tape announcements, news feeds, long messages that need to loop.

---

### Turbulence

Characters drift in organic, wind-like motion using dual-frequency noise.

| Tag | Aliases |
|---|---|
| `<turb>` | `<turbulence>` |

| Parameter | Default | Description |
|---|---|---|
| `a` | `1.0` | Displacement strength |
| `f` | `1.0` | Turbulence speed |

```markup title="Examples"
<turb>Wind-blown text</turb>
<turb a=2.0>Strong turbulence</turb>
<turb a=3.0 f=0.5>Slow, drifting motion</turb>
```

**When to use:** Wind, storms, gas/vapor effects, unstable or glitchy environments.

---

## Special Effects

### Glitch

Digital distortion — horizontal slice displacement, position jitter, alpha blinks, and optional chromatic aberration.

| Tag | Aliases |
|---|---|
| `<glitch>` | — |

| Parameter | Default | Description |
|---|---|---|
| `f` | `1.0` | Animation speed multiplier |
| `s` | `0.08` | Slice displacement frequency (0.0–1.0) |
| `j` | `0.015` | Position jitter frequency |
| `b` | `0.003` | Alpha blink frequency |
| `o` | `1.0` | Slice offset distance multiplier |
| `c` | `0.0` | Chromatic aberration intensity |
| `slices` | `2` | Number of horizontal slices (2–5) |

```markup title="Examples"
<glitch>Basic glitch</glitch>
<glitch s=0.2>Frequent glitches</glitch>
<glitch c=1.0>With chromatic aberration</glitch>
<glitch slices=4 s=0.3 o=2.0>Multi-slice chaos</glitch>
```

**When to use:** Corruption events, tech-themed alerts, hacking sequences, computer terminals, error messages.

---

### Neon

Multi-ring glow effect surrounding text with a soft luminous halo.

| Tag | Aliases |
|---|---|
| `<neon>` | `<glow>` |

| Parameter | Default | Description |
|---|---|---|
| `r` | `2.0` | Glow radius in pixels (0.5–8.0) |
| `i` | `1.0` | Glow brightness/intensity (0.1–3.0) |
| `q` | `2` | Quality: `1` = fast (6 samples), `2` = balanced (12), `3` = high (20) |
| `c` | *(text color)* | Glow color override (hex) |
| `p` | `0` | Pulse animation speed |
| `f` | `2.0` | Alpha falloff curve power |

```markup title="Examples"
<neon>Default glow</neon>
<neon r=4 i=2.0>Strong wide glow</neon>
<neon c=00FFFF>Cyan glow</neon>
<neon q=3 r=3>High-quality glow</neon>
<neon p=2.0>Pulsing glow</neon>
```

:::tip
Use `q=1` for neon on long messages. Each neon layer renders 6–20 extra passes per character — it gets expensive fast.
:::

**When to use:** Title screens, legendary item reveals, sci-fi UI elements, boss names.

---

### Shadow

Customizes the text shadow with a specific color, offset, and transparency.

| Tag | Aliases |
|---|---|
| `<shadow>` | — |

:::note
`<shadow>` has two modes. With `x`, `y`, `c`, `r`, `g`, or `b` parameters: custom shadow effect. With only `value=true/false`: toggles the global shadow. See [Markup Guide → Global Tags](./markup-guide.md#global-message-tags).
:::

| Parameter | Default | Description |
|---|---|---|
| `x` | `0.0` | Horizontal shadow offset in pixels |
| `y` | `0.0` | Vertical shadow offset |
| `c` | *(none)* | Shadow color (hex). Takes priority over `r`/`g`/`b`. |
| `r` | `0.0` | Red channel (0.0–1.0) |
| `g` | `0.0` | Green channel |
| `b` | `0.0` | Blue channel |
| `a` | `1.0` | Shadow transparency multiplier |

```markup title="Examples"
<shadow x=2 y=2>Offset shadow</shadow>
<shadow c=FF0000 a=0.7>Semi-transparent red shadow</shadow>
<shadow x=3 y=3 c=FFFF00>Yellow offset shadow</shadow>
```

**When to use:** Making text pop off dark or busy backgrounds, stylized title text.

---

## Animation Effects

### Typewriter

Reveals text character by character from left to right.

| Tag | Aliases |
|---|---|
| `<typewriter>` | `<type>` |

| Parameter | Default | Description |
|---|---|---|
| `speed` | `20` | Milliseconds per character. Lower = faster. |
| `sound` | *(none)* | Sound ID played on each character reveal. Set to `off` to silence. |
| `loop` | *(none)* | `true` = loop forever. `false` = reveal once, stay visible. |
| `resetDelay` | `1.0` | Seconds before animation resets after the text disappears and reappears |

```markup title="Examples"
<typewriter>Default-speed reveal</typewriter>
<typewriter speed=50>Slower reveal</typewriter>
<typewriter speed=30 sound="minecraft:block.note_block.hat">With click sounds</typewriter>
<typewriter loop=true>Loops forever</typewriter>
<typewriter loop=false>Plays once</typewriter>
```

**When to use:** NPC dialogue, quest text reveals, lore messages, tutorial instructions. Pairs well with message queues for multi-line conversations.

---

### Obfuscate

Shows text as random glyphs, then progressively reveals (or hides) the real characters.

| Tag | Aliases |
|---|---|
| `<obfuscate>` | — |

| Parameter | Default | Description |
|---|---|---|
| `mode` | `constant` | `constant` = always scrambled. `reveal` = starts scrambled, reveals real text. `hide` = starts readable, progressively scrambles. `random` = randomly flickers between scrambled and real. |
| `speed` | `20` | Milliseconds per character for reveal/hide animations |
| `direction` | `left` | Direction: `left`, `right`, `center`, `edges`, `random` |
| `alphabet` | `minecraft` | `minecraft` = Minecraft glyph set. `readable` = random A-Z, a-z, 0-9. |

```markup title="Examples"
<obfuscate>Permanently scrambled</obfuscate>
<obfuscate mode=reveal>Gradually reveals from left</obfuscate>
<obfuscate mode=reveal direction=center speed=40>Reveals from center outward</obfuscate>
<obfuscate mode=hide direction=right>Hides from right to left</obfuscate>
<obfuscate mode=random>Characters randomly flicker</obfuscate>
<obfuscate mode=reveal alphabet=readable>Reveals using readable chars</obfuscate>
```

**When to use:** Cryptic messages, secret reveals, "decoding" sequences, hidden lore, mysterious NPCs.

---

## Built-In Presets

Presets bundle multiple effects and styles into one tag:

| Tag | Effects | Style |
|---|---|---|
| `<epic>` | Pulse (f=2.0) + Wave | Bold italic purple (#AA00FF) |
| `<legendary>` | Rainbow (f=1.5) + Neon | Bold gold (#FFD700) |
| `<spooky>` | Shake (a=0.5) + Fade (a=0.4) | Italic dark purple (#2D1B4E) |

```markup title="Preset examples"
<epic>You have slain the Dragon!</epic>
<legendary>Legendary Sword of Doom obtained!</legendary>
<spooky>Something lurks in the darkness...</spooky>
```
