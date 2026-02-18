---
sidebar_position: 6
title: Commands Reference
description: In-game commands for testing and sending immersive messages.
---

# Commands Reference

Embers Text API provides several in-game commands for testing effects and sending messages. All commands are available under both `/emberstextapi` (full name) and `/eta` (short alias).

---

## `/eta help`

Displays basic information about the mod and provides links to documentation.

**Permissions:** Available to all players

---

## `/eta test <id>`

Runs a predefined test case to demonstrate various effects and features. Test IDs range from 1 to 33.

**Syntax:**
```
/eta test <id>
```

**Parameters:**
- `id` (integer, 1-33): The test case number to run

**Examples:**
```
/eta test 1    # Basic message
/eta test 10   # Bold and italic markup
/eta test 16   # Item rendering test
/eta test 26   # Rainbow effect test
```

**Common Test Cases:**
| ID | Description |
|---|---|
| 1 | Basic message |
| 2 | Typewriter demo |
| 3 | Obfuscation effect |
| 4 | Message with background |
| 10-15 | Markup and font tests |
| 16-20 | Inline item rendering |
| 21-25 | Inline entity rendering |
| 26-33 | Visual effects (rainbow, glitch, bounce, pulse, swing, turbulence, wave) |

---

## `/eta send <player> <duration> <text>`

Sends a basic immersive message to a player. Supports markup syntax in the text.

**Syntax:**
```
/eta send <player> <duration> <text>
```

**Parameters:**
- `player`: Target player (selector or name)
- `duration`: Duration in ticks (20 ticks = 1 second)
- `text`: Message text (supports markup if it contains `<` and `>`)

**Examples:**

Basic message:
```
/eta send @p 100 Hello, World!
```

With markup:
```
/eta send @a 200 <rainbow>Server restart in 5 minutes!</rainbow>
```

Multiple effects:
```
/eta send PlayerName 150 <neon r=2><bold><gradient from=#FF0000 to=#0000FF>Epic Announcement!</gradient></bold></neon>
```

---

## `/eta queue <player> <channel> <queue_definition>`

Sends an ordered sequence of immersive messages to a player on a named channel. Messages are grouped into **steps** — each step's messages display simultaneously, and the next step begins only after every message in the current step has expired.

**Syntax:**
```
/eta queue <player> <channel> <queue_definition>
```

**Parameters:**
- `player`: Target player (selector or name)
- `channel`: A string identifier for this queue (e.g., `cutscene`, `boss`, `tutorial`). Multiple channels run independently.
- `queue_definition`: The full sequence definition using step and message separators (see below)

### Queue Definition Syntax

| Separator | Meaning |
|---|---|
| ` \| ` (space-pipe-space) | Separates sequential steps |
| ` & ` (space-ampersand-space) | Separates simultaneous messages within a step |

Each message must contain a `<dur:N>` tag to specify its duration in ticks. If omitted, it defaults to 60 ticks (3 seconds) with a warning.

**Format:**
```
"<dur:N>message1" | "<dur:N>message2" | "<dur:N>message3"
```

### Examples

#### Sequential story beats:
```
/eta queue @p cutscene "<dur:120><rainbow>You have entered the dungeon!</rainbow>" | "<dur:100><shake>Beware what lies ahead...</shake>" | "<dur:80><bold>Turn back now.</bold>"
```
Each line appears only after the previous one expires.

#### Simultaneous messages in a step (both show at once):
```
/eta queue @p hud "<dur:80>Top line" & "<dur:80>Bottom line"
```
Both messages display together. The step ends when both expire.

#### Mixed — simultaneous + sequential:
```
/eta queue @p scene "<dur:100>Header" & "<dur:60>Subtext" | "<dur:80><italic>Next beat...</italic>"
```
The first step shows Header and Subtext at the same time. After both expire, the next step plays.

#### Appending to an active channel:
If `/eta queue` is sent to a channel that already has messages running, the new steps are **appended** to the end of the queue — the current display is not interrupted.

```
/eta queue @p story "<dur:120>Chapter 1"
/eta queue @p story "<dur:120>Chapter 2"
/eta queue @p story "<dur:120>Chapter 3"
```

#### With markup effects:
```
/eta queue @p boss "<dur:200><neon c=FF0000><shake>BOSS BATTLE BEGINS!</shake></neon>" | "<dur:150><grad from=FF0000 to=440000>Defeat the Lich King to claim victory.</grad>" | "<dur:100><typewriter>Survive. Fight. Win.</typewriter>"
```

---

## `/eta clearqueue <player> [channel]`

Clears pending (not-yet-started) steps from a queue channel, or clears all active messages immediately.

**Syntax:**
```
/eta clearqueue <player>               # Clear all channels immediately
/eta clearqueue <player> <channel>     # Clear pending steps for one channel
```

**Parameters:**
- `player`: Target player (selector or name)
- `channel` (optional): The channel name to clear. If omitted, all channels are cleared immediately including any currently displaying messages.

### Behavior

**With channel name:**
Removes all *pending* steps from the named channel. The step currently being displayed plays to completion. Once it expires, no further steps follow.

```
# Start a long queue
/eta queue @p cutscene "<dur:200>Long Intro" | "<dur:100>Part 2" | "<dur:100>Part 3"

# Immediately skip to just the long intro (cancel Part 2 and Part 3)
/eta clearqueue @p cutscene
```

**Without channel name:**
Removes all active messages across all channels immediately. Useful for aborting a cutscene entirely.

```
/eta clearqueue @p
```

---

## Permissions

All commands require operator permission level 2 by default (same as most gameplay commands). This can be configured via Forge's permission system or permission management mods.
