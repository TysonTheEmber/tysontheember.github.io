---
sidebar_position: 3
---

# Commands Reference

Embers Text API provides three main commands for creating and managing text overlays. This page covers all available commands with detailed examples.

## Command Overview

| Command | Purpose | Permission Level |
|---------|---------|------------------|
| `/emberstextapi test` | Demo built-in effects | Operator (Level 2) |
| `/emberstextapi send` | Send basic messages | Operator (Level 2) |
| `/emberstextapi sendcustom` | Send messages with full NBT control | Operator (Level 2) |

---

## `/emberstextapi test`

Test the mod's functionality by displaying one of nine built-in demo effects.

### Syntax

```mcfunction
/emberstextapi test <id>
```

### Parameters

- `<id>` - Integer from 1 to 9, each showcasing different features

### Examples

```mcfunction
/emberstextapi test 1
/emberstextapi test 5
/emberstextapi test 9
```

### Demo Effects

Each test ID demonstrates different capabilities:

1. **Test 1** - Basic centered text
2. **Test 2** - Gradient effects
3. **Test 3** - Typewriter animation
4. **Test 4** - Shake effects
5. **Test 5** - Background styling
6. **Test 6** - Custom positioning
7. **Test 7** - Obfuscation effects
8. **Test 8** - Combined animations
9. **Test 9** - Advanced styling

:::tip
Run all test IDs (1-9) to see the full range of what Embers Text API can do!
:::

---

## `/emberstextapi send`

Send a basic text message to one or more players with optional fade effects.

### Syntax

```mcfunction
/emberstextapi send <player> <duration> [fadeIn] [fadeOut] <text>
```

### Parameters

- `<player>` - Target selector or player name
  - Examples: `@p`, `@a`, `@r`, `PlayerName`
- `<duration>` - How long the message displays (in ticks)
  - 20 ticks = 1 second
- `[fadeIn]` - Optional fade-in duration (in ticks)
- `[fadeOut]` - Optional fade-out duration (in ticks)
- `<text>` - The message to display
  - Supports formatting codes (`§`, `&`)
  - Use quotes for multi-word messages

### Examples

#### Basic Message

```mcfunction
/emberstextapi send @p 100 "Hello, World!"
```

Displays "Hello, World!" to the nearest player for 5 seconds.

#### With Fade Effects

```mcfunction
/emberstextapi send @a 200 20 20 "Welcome to the server!"
```

- Shows message to all players
- Displays for 10 seconds
- Fades in over 1 second
- Fades out over 1 second

#### Targeting Specific Players

```mcfunction
/emberstextapi send Steve 60 "Quest completed!"
```

Shows message to player "Steve" for 3 seconds.

#### Longer Duration

```mcfunction
/emberstextapi send @p 600 40 40 "This is an important announcement"
```

- 30-second display duration
- 2-second fade-in
- 2-second fade-out

#### Using Formatting Codes

```mcfunction
/emberstextapi send @p 100 "§6Gold Text §r§bBlue Text"
```

Displays text with Minecraft color codes.

:::note Formatting Codes
The `send` command supports standard Minecraft formatting:
- `§0-9, a-f` - Colors
- `§l` - Bold
- `§o` - Italic
- `§n` - Underline
- `§m` - Strikethrough
- `§r` - Reset
:::

---

## `/emberstextapi sendcustom`

Send a message with full control using NBT data. This is the most powerful command, allowing you to configure every aspect of the text display.

### Syntax

```mcfunction
/emberstextapi sendcustom <player> <nbt> <duration> <text>
```

### Parameters

- `<player>` - Target selector or player name
- `<nbt>` - NBT compound containing configuration
- `<duration>` - Display duration in ticks
- `<text>` - The message to display

### NBT Configuration Options

All available NBT tags are documented in the [NBT Configuration](nbt-configuration.md) page. Common options include:

- `fadeIn` / `fadeOut` - Fade durations
- `color` / `gradient` - Text colors
- `anchor` - Screen position
- `align` - Text alignment
- `typewriter` - Typewriter animation speed
- `shake*` - Shake effects
- `background` - Background settings
- `font` - Custom font

### Examples

#### Gradient Text

```mcfunction
/emberstextapi sendcustom @p {gradient:[0xFF0000,0x0000FF]} 100 "Rainbow Text"
```

Creates text with a red-to-blue gradient.

#### Centered with Typewriter Effect

```mcfunction
/emberstextapi sendcustom @p {anchor:"CENTER_CENTER",typewriter:2.0f,typewriterCenter:1b} 150 "Dramatic entrance..."
```

- Centers text on screen
- Types out at 2 characters per tick
- Re-centers as it types

#### With Background

```mcfunction
/emberstextapi sendcustom @p {bgColor:0x000000,bgGradient:[0x330000,0x003300]} 100 "Styled Message"
```

Adds a black background with red-to-green gradient border.

#### Shake Animation

```mcfunction
/emberstextapi sendcustom @p {shakeWave:1.5f} 80 "Wobbly Text!"
```

Applies a wave shake effect with 1.5 intensity.

#### Complex Configuration

```mcfunction
/emberstextapi sendcustom @p {
  anchor:"TOP_CENTER",
  align:"CENTER",
  gradient:[0xFF6B6B,0x4ECDC4,0x45B7D1],
  typewriter:1.5f,
  fadeIn:30,
  fadeOut:30,
  shadow:1b,
  bgColor:0x000000
} 200 "Welcome to the Adventure!"
```

This creates:
- Top-center positioned text
- Three-color gradient
- Typewriter animation
- Fade effects
- Drop shadow
- Black background

#### Character-Level Shake

```mcfunction
/emberstextapi sendcustom @p {charShakeRandom:2.0f} 100 "Chaotic Energy!"
```

Each character shakes independently with random movement.

#### Obfuscation with Reveal

```mcfunction
/emberstextapi sendcustom @p {obfuscate:1b,obfuscateReveal:"LEFT_TO_RIGHT"} 120 "Secret Message"
```

Text starts obfuscated and reveals from left to right.

#### Custom Font and Wrapping

```mcfunction
/emberstextapi sendcustom @p {
  font:"minecraft:uniform",
  wrap:200,
  anchor:"CENTER_LEFT"
} 150 "This is a longer message that will wrap to multiple lines"
```

Uses uniform font, wraps at 200 pixels width.

---

## Target Selectors

All commands support Minecraft's target selector system:

| Selector | Targets |
|----------|---------|
| `@p` | Nearest player |
| `@a` | All players |
| `@r` | Random player |
| `@s` | Command executor |
| `PlayerName` | Specific player by name |

### Selector Arguments

You can also use selector arguments:

```mcfunction
/emberstextapi send @a[team=red] 100 "Red team message!"
```

```mcfunction
/emberstextapi send @p[distance=..10] 60 "You're close!"
```

---

## Duration Guidelines

Here are recommended durations for different message types:

| Message Type | Suggested Duration | Notes |
|--------------|-------------------|-------|
| Quick notification | 40-60 ticks (2-3s) | Brief alerts |
| Standard message | 100-120 ticks (5-6s) | Normal reading speed |
| Important announcement | 200-300 ticks (10-15s) | Ensure players see it |
| Cinematic text | 400+ ticks (20s+) | Story sequences |
| With typewriter | +duration for animation | Add time for typing effect |

:::tip Timing Calculations
**Formula:** `duration_ticks = seconds × 20`

For typewriter effects, add extra time:
- Count characters in your message
- Divide by typewriter speed (chars/tick)
- Add result to base duration
:::

---

## Command Permissions

By default, all Embers Text API commands require operator level 2. Configure permissions using your server's permission management system:

### Permission Nodes

```yaml
emberstextapi.command.test
emberstextapi.command.send
emberstextapi.command.sendcustom
```

:::warning
The `sendcustom` command provides extensive control. Consider limiting access to trusted administrators to prevent abuse.
:::

---

## Common Issues

### Message Not Appearing

1. Check that the player is online
2. Verify duration is sufficient (minimum 20 ticks recommended)
3. Ensure no typos in target selector
4. Check if another message is currently displaying

### Formatting Not Working

1. Use proper formatting code syntax (`§` or `&`)
2. For complex formatting, use `sendcustom` with NBT
3. Reset formatting with `§r` when needed

### NBT Errors

1. Validate NBT syntax (proper brackets and quotes)
2. Check data types (e.g., `1.5f` for floats, `1b` for booleans)
3. Reference the [NBT Configuration](nbt-configuration.md) page for correct tag names

---

## Next Steps

- Learn about [Styling & Effects](styling-effects.md) to create beautiful messages
- Explore [NBT Configuration](nbt-configuration.md) for complete customization options
- Check out [Examples](examples.md) for practical use cases
- Read the [Developer API](developer-api.md) to integrate into your mod
