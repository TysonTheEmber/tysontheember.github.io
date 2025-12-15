---
sidebar_position: 4
---

# Styling & Effects

Learn how to create visually stunning text overlays with colors, gradients, animations, and backgrounds.

## Color Options

### Solid Colors

Apply a single color to your entire text:

**Command:**
```mcfunction
/emberstextapi sendcustom @p {color:0xFF0000} 100 "Red text"
```

**API:**
```java
ImmersiveMessage.builder(100, "Red text")
    .color(0xFF0000)
    .build();
```

#### Color Format

Colors use hexadecimal RGB format: `0xRRGGBB`

| Color | Hex Code | Example |
|-------|----------|---------|
| Red | `0xFF0000` | <span style={{color: '#FF0000'}}>■</span> |
| Green | `0x00FF00` | <span style={{color: '#00FF00'}}>■</span> |
| Blue | `0x0000FF` | <span style={{color: '#0000FF'}}>■</span> |
| Yellow | `0xFFFF00` | <span style={{color: '#FFFF00'}}>■</span> |
| Cyan | `0x00FFFF` | <span style={{color: '#00FFFF'}}>■</span> |
| Magenta | `0xFF00FF` | <span style={{color: '#FF00FF'}}>■</span> |
| White | `0xFFFFFF` | <span style={{color: '#FFFFFF'}}>■</span> |
| Black | `0x000000` | <span style={{color: '#000000'}}>■</span> |

:::tip Color Picker
Use an online hex color picker to find the perfect color code for your text!
:::

### Gradients

Create smooth color transitions across your text:

**Two-Color Gradient:**
```mcfunction
/emberstextapi sendcustom @p {gradient:[0xFF0000,0x0000FF]} 100 "Red to Blue"
```

**Multi-Color Gradient:**
```mcfunction
/emberstextapi sendcustom @p {gradient:[0xFF0000,0xFFFF00,0x00FF00]} 100 "Rainbow!"
```

**API:**
```java
// Two colors
ImmersiveMessage.builder(100, "Gradient")
    .gradient(0xFF0000, 0x0000FF)
    .build();

// Multiple colors
ImmersiveMessage.builder(100, "Rainbow")
    .gradient(0xFF0000, 0xFF7F00, 0xFFFF00, 0x00FF00, 0x0000FF, 0x8B00FF)
    .build();
```

#### Popular Gradient Combinations

**Sunset:**
```java
.gradient(0xFF6B6B, 0xFF8E53, 0xFFB347, 0xFFD700)
```

**Ocean:**
```java
.gradient(0x1E3A8A, 0x3B82F6, 0x06B6D4, 0x14B8A6)
```

**Fire:**
```java
.gradient(0xFF0000, 0xFF4500, 0xFFA500, 0xFFFF00)
```

**Night Sky:**
```java
.gradient(0x000033, 0x000066, 0x6600CC, 0xCC00FF)
```

**Gold:**
```java
.gradient(0xFFD700, 0xFFA500, 0xFF8C00)
```

---

## Text Animations

### Typewriter Effect

Make text appear character by character:

**Command:**
```
/emberstextapi sendcustom @p {typewriter:2.0f} 150 "Typing effect..."
```

**With Centering:**
```
/emberstextapi sendcustom @p {typewriter:2.0f,typewriterCenter:1b} 150 "Centered typing"
```

**API:**
```java
ImmersiveMessage.builder(150, "Typing effect...")
    .typewriter(2.0f, false)
    .build();

// With centering
ImmersiveMessage.builder(150, "Centered typing")
    .typewriter(2.0f, true)
    .build();
```

#### Speed Guidelines

| Speed | Characters/Tick | Effect |
|-------|----------------|--------|
| `0.5f` | 0.5 | Very slow, dramatic |
| `1.0f` | 1 | Natural reading pace |
| `2.0f` | 2 | Quick, snappy |
| `3.0f` | 3 | Fast |
| `5.0f+` | 5+ | Very fast |

:::tip Centering
Set `typewriterCenter` to `true` to re-center text as it types out. Perfect for center-anchored messages!
:::

### Shake Effects

Add motion to your text:

#### Whole-Text Shake

The entire text moves as one unit:

**Wave Shake:**
```
/emberstextapi sendcustom @p {shakeWave:1.5f} 100 "Smooth wave motion"
```

**Circular Shake:**
```
/emberstextapi sendcustom @p {shakeCircle:1.5f} 100 "Circular movement"
```

**Random Shake:**
```
/emberstextapi sendcustom @p {shakeRandom:2.0f} 100 "Random jitter"
```

**API:**
```java
.shake(ShakeType.WAVE, 1.5f)
.shake(ShakeType.CIRCULAR, 1.5f)
.shake(ShakeType.RANDOM, 2.0f)
```

#### Character-Level Shake

Each character moves independently:

**Wave (Per Character):**
```
/emberstextapi sendcustom @p {charShakeWave:1.5f} 100 "Wavy letters"
```

**Circular (Per Character):**
```
/emberstextapi sendcustom @p {charShakeCircle:1.5f} 100 "Circular letters"
```

**Random (Per Character):**
```
/emberstextapi sendcustom @p {charShakeRandom:2.0f} 100 "Chaotic letters!"
```

**API:**
```java
.charShake(ShakeType.WAVE, 1.5f)
.charShake(ShakeType.CIRCULAR, 1.5f)
.charShake(ShakeType.RANDOM, 2.0f)
```

#### Intensity Recommendations

| Intensity | Effect | Best Use |
|-----------|--------|----------|
| `0.5f` | Subtle | Ambient effects |
| `1.0f` | Noticeable | Standard emphasis |
| `1.5f` | Moderate | Attention-grabbing |
| `2.0f` | Strong | Dramatic moments |
| `3.0f+` | Extreme | Chaos, damage, alerts |

### Obfuscation

Create scrambled text with optional reveal animations:

**Always Obfuscated:**
```
/emberstextapi sendcustom @p {obfuscate:1b} 100 "Scrambled!"
```

**With Reveal Animations:**

**Left to Right:**
```
/emberstextapi sendcustom @p {obfuscate:1b,obfuscateReveal:"LEFT_TO_RIGHT"} 120 "Revealing..."
```

**Right to Left:**
```
/emberstextapi sendcustom @p {obfuscate:1b,obfuscateReveal:"RIGHT_TO_LEFT"} 120 "Revealing..."
```

**Center Outward:**
```
/emberstextapi sendcustom @p {obfuscate:1b,obfuscateReveal:"CENTER_OUT"} 120 "Revealing..."
```

**Random:**
```
/emberstextapi sendcustom @p {obfuscate:1b,obfuscateReveal:"RANDOM"} 120 "Revealing..."
```

**API:**
```java
.obfuscate("LEFT_TO_RIGHT")
.obfuscate("RIGHT_TO_LEFT")
.obfuscate("CENTER_OUT")
.obfuscate("RANDOM")
```

---

## Backgrounds

### Tooltip-Style Background

Simple solid color background with optional gradient border:

**Solid Background:**
```
/emberstextapi sendcustom @p {bgColor:0x000000} 100 "Black background"
```

**With Gradient Border:**
```
/emberstextapi sendcustom @p {bgColor:0x000000,bgGradient:[0xFF0000,0x0000FF]} 100 "Fancy border"
```

**API:**
```java
ImmersiveMessage.builder(100, "With background")
    .backgroundColor(0x000000)
    .backgroundGradient(0xFF0000, 0x0000FF)
    .build();
```

#### Background Color Suggestions

**Dark Backgrounds:**
- Pure Black: `0x000000`
- Dark Gray: `0x1A1A1A`
- Dark Blue: `0x000033`
- Dark Red: `0x330000`

**Semi-Transparent Feel:**
- Use darker colors (0x000000 - 0x333333)
- Pair with lighter text for contrast

### Textured Background

Use custom textures for backgrounds:

```
/emberstextapi sendcustom @p {
  background:"minecraft:textures/gui/demo_background.png",
  backgroundMode:"STRETCH",
  backgroundWidth:256,
  backgroundHeight:64,
  backgroundPaddingX:10,
  backgroundPaddingY:5
} 100 "Textured!"
```

**API:**
```java
ImmersiveMessage.builder(100, "Textured!")
    .background(
        "minecraft:textures/gui/demo_background.png",
        "STRETCH",
        256, 64,  // width, height
        10, 5     // paddingX, paddingY
    )
    .build();
```

#### Background Modes

| Mode | Behavior |
|------|----------|
| `STRETCH` | Stretches texture to fit dimensions |
| `CROP` | Crops texture to fit dimensions |
| `TILE` | Repeats texture to fill space |

#### Custom Textures

Place custom textures in:
```
assets/emberstextapi/textures/background/your_texture.png
```

Reference as:
```
"emberstextapi:textures/background/your_texture.png"
```

---

## Positioning

### Anchors

Choose where your message appears on screen:

```
TOP_LEFT        TOP_CENTER        TOP_RIGHT

CENTER_LEFT     CENTER_CENTER     CENTER_RIGHT

BOTTOM_LEFT     BOTTOM_CENTER     BOTTOM_RIGHT
```

**Command:**
```
/emberstextapi sendcustom @p {anchor:"CENTER_CENTER"} 100 "Screen center"
```

**API:**
```java
.anchor(TextAnchor.CENTER_CENTER)
.anchor(TextAnchor.TOP_LEFT)
.anchor(TextAnchor.BOTTOM_RIGHT)
```

### Alignment

Control how text aligns relative to its anchor:

**Left-Aligned:**
```java
.anchor(TextAnchor.CENTER_LEFT)
.align(TextAlignment.LEFT)
```
Text extends right from anchor point.

**Center-Aligned:**
```java
.anchor(TextAnchor.CENTER_CENTER)
.align(TextAlignment.CENTER)
```
Text centers on anchor point.

**Right-Aligned:**
```java
.anchor(TextAnchor.CENTER_RIGHT)
.align(TextAlignment.RIGHT)
```
Text extends left from anchor point.

### Offsets

Fine-tune position with pixel offsets:

**Command:**
```
/emberstextapi sendcustom @p {offsetX:50,offsetY:-30} 100 "Offset text"
```

**API:**
```java
.anchor(TextAnchor.CENTER_CENTER)
.offsetX(50)   // Move 50 pixels right
.offsetY(-30)  // Move 30 pixels up
```

:::tip Offset Direction
- Positive X = Right
- Negative X = Left
- Positive Y = Down
- Negative Y = Up
:::

---

## Text Formatting

### Custom Fonts

Use built-in or custom fonts:

**Command:**
```
/emberstextapi sendcustom @p {font:"minecraft:uniform"} 100 "Uniform font"
```

**API:**
```java
.font("minecraft:uniform")
.font("minecraft:alt")
```

#### Available Fonts

- `minecraft:default` - Standard Minecraft font
- `minecraft:uniform` - Uniform spacing
- `minecraft:alt` - Alternative font

#### Custom Fonts

Place font JSON in:
```
assets/emberstextapi/font/your_font.json
```

Reference as:
```java
.font("emberstextapi:your_font")
```

### Text Wrapping

Wrap long text to multiple lines:

**Command:**
```
/emberstextapi sendcustom @p {wrap:200} 150 "This is a very long message that will automatically wrap to multiple lines when it exceeds 200 pixels in width"
```

**API:**
```java
ImmersiveMessage.builder(150, "Long message...")
    .wrap(200)  // Wrap at 200 pixels
    .build();
```

:::tip Wrapping Guidelines
- Screen width is typically ~320 pixels (GUI scale 1)
- For centered text, use ~200-250 pixels
- For side-anchored text, use ~150-200 pixels
:::

### Drop Shadow

Add shadow for better readability:

**Command:**
```
/emberstextapi sendcustom @p {shadow:1b} 100 "Text with shadow"
```

**API:**
```java
.shadow(true)
```

:::tip Readability
Always use drop shadow when displaying text over complex backgrounds or with light colors!
:::

---

## Fade Effects

Control how messages appear and disappear:

**Command:**
```
/emberstextapi sendcustom @p {fadeIn:40,fadeOut:40} 200 "Smooth transitions"
```

**API:**
```java
.fadeIn(40)   // 2 seconds
.fadeOut(40)  // 2 seconds
```

### Fade Timing Recommendations

| Duration | Ticks | Best For |
|----------|-------|----------|
| Instant | 0 | Urgent alerts |
| Quick | 10 | Fast notifications |
| Standard | 20 | Normal messages |
| Smooth | 40 | Cinematic effects |
| Slow | 60+ | Dramatic scenes |

---

## Combining Effects

Create stunning visuals by combining multiple effects:

### Example 1: Dramatic Announcement

```
/emberstextapi sendcustom @p {
  anchor:"CENTER_CENTER",
  gradient:[0xFFD700,0xFFA500],
  typewriter:2.0f,
  typewriterCenter:1b,
  fadeIn:30,
  fadeOut:30,
  shadow:1b,
  bgColor:0x000000
} 200 "BOSS BATTLE"
```

**API:**
```java
ImmersiveMessage.builder(200, "BOSS BATTLE")
    .anchor(TextAnchor.CENTER_CENTER)
    .gradient(0xFFD700, 0xFFA500)
    .typewriter(2.0f, true)
    .fadeIn(30)
    .fadeOut(30)
    .shadow(true)
    .backgroundColor(0x000000)
    .build();
```

### Example 2: Quest Objective

```
/emberstextapi sendcustom @p {
  anchor:"TOP_CENTER",
  align:"CENTER",
  color:0xFFFFFF,
  offsetY:20,
  shadow:1b,
  bgColor:0x1A1A1A,
  bgGradient:[0x4A4A4A,0x2A2A2A]
} 1000 "Collect 10 Ancient Crystals"
```

### Example 3: Warning Message

```
/emberstextapi sendcustom @p {
  anchor:"CENTER_CENTER",
  color:0xFF0000,
  shakeRandom:2.0f,
  shadow:1b,
  bgColor:0x330000,
  bgGradient:[0xFF0000,0x660000]
} 80 "⚠ DANGER ⚠"
```

### Example 4: Secret Reveal

```
/emberstextapi sendcustom @p {
  anchor:"BOTTOM_CENTER",
  obfuscate:1b,
  obfuscateReveal:"CENTER_OUT",
  gradient:[0x8B00FF,0xFFFFFF],
  fadeIn:20,
  offsetY:-50,
  shadow:1b
} 150 "The truth is revealed..."
```

### Example 5: Achievement Style

```
/emberstextapi sendcustom @p {
  anchor:"TOP_RIGHT",
  align:"RIGHT",
  gradient:[0xFFD700,0xFFFF00],
  typewriter:3.0f,
  fadeIn:20,
  fadeOut:60,
  offsetX:-10,
  offsetY:10,
  shadow:1b,
  background:"minecraft:textures/gui/achievement/achievement_background.png",
  backgroundMode:"STRETCH",
  backgroundWidth:200,
  backgroundHeight:50,
  backgroundPaddingX:8,
  backgroundPaddingY:8
} 100 "Achievement Unlocked!"
```

---

## Design Best Practices

### Readability

1. **Use drop shadow** for text over backgrounds
2. **High contrast** between text and background colors
3. **Appropriate font size** (use wrapping for long text)
4. **Limit shake intensity** for important messages (keep ≤1.5f)

### Performance

1. **Avoid too many simultaneous effects**
   - Limit to 2-3 active animations per message
   - Character shake + gradient is more intensive than solid color

2. **Use appropriate durations**
   - Don't set infinite duration unless necessary
   - Clean up tracked messages when done

### User Experience

1. **Don't block critical UI elements**
   - Avoid CENTER_CENTER for long-duration messages
   - Keep hotbar area clear (avoid BOTTOM_CENTER)

2. **Match effects to content**
   - Subtle effects for ambient messages
   - Dramatic effects for important events
   - Shake for damage/alerts, typewriter for dialogue

3. **Consistent styling**
   - Use similar colors/effects for related messages
   - Create a visual language for your mod/server

---

## Color Palettes

### Fantasy Theme

```java
// Royal
.gradient(0x4B0082, 0x9370DB, 0xDDA0DD)

// Mystic
.gradient(0x00CED1, 0x48D1CC, 0xAFEEEE)

// Arcane
.gradient(0x8B00FF, 0x9932CC, 0xBA55D3)
```

### Modern Theme

```java
// Neon
.gradient(0xFF1493, 0x00FFFF, 0x7FFF00)

// Corporate
.gradient(0x1E3A8A, 0x3B82F6, 0x60A5FA)

// Sunset
.gradient(0xFF6B6B, 0xFF8E53, 0xFFB347)
```

### Game Theme

```java
// Health
.gradient(0xFF0000, 0xFF6B6B)

// Experience
.gradient(0x00FF00, 0x7FFF00)

// Mana
.gradient(0x0000FF, 0x4169E1)
```

---

## Next Steps

- Review [NBT Configuration](nbt-configuration.md) for complete parameter reference
- Check [Examples](examples.md) for practical use cases
- Explore [Developer API](developer-api.md) for programmatic styling
- Experiment with the test command: `/emberstextapi test 1-9`
