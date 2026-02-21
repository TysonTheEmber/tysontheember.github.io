---
sidebar_position: 2
title: Commands Reference
description: All /eta commands — full syntax, parameters, and examples.
---

# Commands Reference

All Embers Text API commands use `/eta` (short alias) or `/emberstextapi` (full name). Commands require **operator level 2** by default.

---

## `/eta help`

Displays basic information about the mod and links to documentation.

```
/eta help
```

Requires **operator level 2**.

---

## `/eta test <id>`

Runs a built-in demo to showcase effects and features. No configuration needed — great for testing what ETA can do.

```
/eta test <id>
```

**Parameters:**
- `id` — Integer from 1 to 33

**Common test IDs:**

| ID | What it shows |
|---|---|
| 1 | Basic message |
| 2 | Typewriter animation |
| 3 | Obfuscation effect |
| 4 | Message with background |
| 10–15 | Markup and font demos |
| 16–20 | Inline item rendering |
| 21–25 | Inline entity rendering |
| 26–33 | Visual effects (rainbow, glitch, bounce, pulse, swing, turbulence, wave, neon) |

```
/eta test 1    # Basic message
/eta test 26   # Rainbow
/eta test 27   # Glitch
/eta test 29   # Bounce
```

---

## `/eta send <player> <duration> <text>`

Sends an immersive message to a player. Supports markup syntax for effects and styling.

```
/eta send <player> <duration> <text>
```

**Parameters:**
- `player` — Player name or selector (`@p`, `@a`, `@s`, `PlayerName`)
- `duration` — How long to display the message, in **ticks** (20 ticks = 1 second)
- `text` — The message text. Supports [markup](./markup-guide.md) if it contains `<` and `>`

**Examples:**

```
/eta send @p 100 Hello, world!
```

```
/eta send @a 200 <rainbow>Server restart in 5 minutes!</rainbow>
```

```
/eta send PlayerName 150 <shake><bold>DANGER!</bold></shake>
```

```
/eta send @p 300 <anchor value=MIDDLE><scale value=1.5><neon r=3><rainbow>LEVEL UP!</rainbow></neon></scale></anchor>
```

:::tip
Use `<anchor>`, `<offset>`, and `<scale>` tags in your text to control where and how big the message appears. See [Layout and Positioning](./layout-and-positioning.md).
:::

---

## `/eta queue <player> <channel> <definition>`

Sends an ordered sequence of messages. Messages in a queue play one **step** at a time — the next step begins only after every message in the current step has expired.

```
/eta queue <player> <channel> <definition>
```

**Parameters:**
- `player` — Player name or selector
- `channel` — A string name for this queue (e.g., `cutscene`, `boss`, `tutorial`). Multiple channels run independently and simultaneously.
- `definition` — The full queue definition (see syntax below)

### Queue Definition Syntax

| Separator | Meaning |
|---|---|
| ` \| ` (space-pipe-space) | Separates sequential steps |
| ` & ` (space-ampersand-space) | Separates simultaneous messages within a step |

Each message in a queue **must** include a `<dur:N>` tag to set its duration in ticks. Without it, the message defaults to 60 ticks with a warning.

**Sequential steps:**
```
/eta queue @p cutscene "<dur:120>Step one" | "<dur:100>Step two" | "<dur:80>Step three"
```

**Simultaneous messages in a step:**
```
/eta queue @p hud "<dur:100>Top message" & "<dur:100>Bottom message"
```

**Mixed:**
```
/eta queue @p scene "<dur:100>Header" & "<dur:60>Subtext" | "<dur:80>Next beat"
```

### Appending to a Running Queue

If you send a queue to a channel that already has messages running, the new steps are **appended** to the end of the existing queue — the current display is not interrupted.

```
/eta queue @p story "<dur:120>Chapter 1"
/eta queue @p story "<dur:120>Chapter 2"
/eta queue @p story "<dur:120>Chapter 3"
```

Each command adds its steps to the `story` channel queue.

:::tip
See the [Message Queues](./message-queues.md) guide for a full deep-dive with real-world examples.
:::

---

## `/eta clearqueue <player> [channel]`

Cancels pending queue steps for a channel, or closes all active messages immediately.

**With a channel name** — removes pending steps; the current step finishes naturally:
```
/eta clearqueue @p cutscene
```

**Without a channel name** — immediately removes all active messages across all channels:
```
/eta clearqueue @p
```

**Parameters:**
- `player` — Player name or selector
- `channel` (optional) — Which channel to clear. Omit to clear everything.

---

## Permissions

All commands require **operator level 2** by default. This is the same level required for most gameplay commands like `/give` and `/effect`.

You can adjust permission levels using Forge's permission system or a permission management mod.
