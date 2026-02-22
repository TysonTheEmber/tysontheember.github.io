---
sidebar_position: 6
title: Message Queues
description: Send ordered sequences of messages — steps, channels, simultaneous displays, and real-world examples.
---

# Message Queues

Message queues let you send an ordered sequence of messages that play one after another. This is the foundation of cutscenes, NPC conversations, quest intros, and multi-step announcements.

---

## How Queues Work

A queue is sent with `/eta queue` and has three components:

1. **Player** — who receives the messages
2. **Channel** — a named queue that runs independently
3. **Definition** — the sequence of steps

```
/eta queue <player> <channel> <definition>
```

### Steps and Simultaneous Messages

The definition has two separators:

| Separator | Meaning |
|---|---|
| ` \| ` (space-pipe-space) | New sequential step — the next step waits for the previous to finish |
| ` & ` (space-ampersand-space) | Simultaneous message within a step — both display at the same time |

A **step** finishes when **all messages in that step** have expired. Only then does the next step begin.

---

## The `<dur:N>` Tag

Every message in a queue needs a `<dur:N>` tag to specify how long it displays (in ticks):

```markup
<dur:120>This message lasts 6 seconds (120 ticks)</dur:120>
```

- 20 ticks = 1 second
- `<dur:60>` = 3 seconds
- `<dur:200>` = 10 seconds

:::warning
Always include `<dur:N>` in queue messages. Without it, the message defaults to 60 ticks (3 seconds) and a warning is logged.
:::

---

## Channels

A **channel** is a named queue that runs independently. Multiple channels play simultaneously.

```
/eta queue @p combat "<dur:100>Boss battle begins!"
/eta queue @p music "<dur:200>♪ Epic music starts... ♪"
```

Both the `combat` and `music` channels play at the same time, but each manages its own sequential steps independently.

### Appending to a Running Channel

If you send a queue to a channel that already has messages, the new steps are **appended** — the current step is not interrupted:

```
/eta queue @p story "<dur:120>Chapter 1"
/eta queue @p story "<dur:120>Chapter 2"
/eta queue @p story "<dur:120>Chapter 3"
```

All three chapters play in sequence on the `story` channel. You can use this pattern in command blocks to build a story step by step.

---

## Sequential Steps

Steps play one after another, with each waiting for the previous to expire:

```
/eta queue @p intro "<dur:100><rainbow>You have entered the dungeon!</rainbow>" | "<dur:80><shake>Beware what lies ahead...</shake>" | "<dur:60><bold>Turn back now.</bold>"
```

Three steps:
1. Rainbow text for 5 seconds
2. Shake text for 4 seconds (starts after step 1 ends)
3. Bold text for 3 seconds (starts after step 2 ends)

---

## Simultaneous Messages in a Step

Use `&` to show multiple messages at the same time within a single step:

```
/eta queue @p hud "<dur:100><anchor value=TOP_CENTER>Title text</anchor>" & "<dur:100><anchor value=BOTTOM_CENTER>Subtitle text</anchor>"
```

Both messages appear simultaneously — one at the top, one at the bottom. The step ends when **both** have expired.

---

## Mixed: Simultaneous + Sequential

Combine both separators for complex sequences:

```
/eta queue @p scene "<dur:120>Header" & "<dur:60>Subtext" | "<dur:80><italic>Next beat...</italic>"
```

- **Step 1:** "Header" and "Subtext" show simultaneously. Step ends when both expire (120 ticks, since that's the longer one).
- **Step 2:** "Next beat..." shows for 80 ticks.

---

## Clearing and Stopping Queues

Three commands give you different levels of control:

| Command | Effect |
|---|---|
| `/eta clearqueue @p cutscene` | Remove pending steps from `cutscene`; current message plays out |
| `/eta clearqueue @p` | Remove pending steps from **all** channels; current messages play out |
| `/eta stopqueue @p cutscene` | Force-stop `cutscene` — closes current message + clears pending steps |
| `/eta stopqueue @p` | Force-stop **all** channels immediately |
| `/eta closeall @p` | Close every message on screen and clear all queues |

**Drain pending steps gracefully** (current step finishes):
```
/eta clearqueue @p cutscene
```

**Cut off a specific channel mid-step:**
```
/eta stopqueue @p cutscene
```

**Emergency clear — wipe everything off screen:**
```
/eta closeall @p
```

---

## Real-World Examples

### Dungeon Entry Cutscene

```
/eta queue @p enter "<dur:100><anchor value=MIDDLE><scale value=1.3><fade in=20 out=20><rainbow>THE FORGOTTEN CRYPT</rainbow></fade></scale></anchor>" | "<dur:80><anchor value=MIDDLE><offset y=20><italic>Few have entered. None have returned.</italic></offset></anchor>" | "<dur:80><anchor value=BOTTOM_CENTER><shake a=0.5>Prepare yourself.</shake></anchor>"
```

Three sequential steps: dramatic title → lore line → warning.

---

### Boss Battle Sequence

```
/eta queue @p boss "<dur:200><anchor value=MIDDLE><scale value=1.5><neon c=FF0000 r=4><shake a=1.0>LICH KING</shake></neon></scale></anchor>" | "<dur:120><anchor value=MIDDLE><grad from=FF0000 to=440000>Defeat him to claim the throne.</grad></anchor>" | "<dur:100><typewriter>Survive. Fight. Win.</typewriter>"
```

Three steps: boss name reveal → flavor text → typewriter call to action.

---

### Tutorial Flow

```
/eta queue @p tutorial "<dur:120><anchor value=BOTTOM_CENTER><bg color=#60000000><b>Tip:</b> Use the crafting table to craft tools.</bg></anchor>" | "<dur:100><anchor value=BOTTOM_CENTER><bg color=#60000000><b>Tip:</b> Mine logs to get wood.</bg></anchor>" | "<dur:100><anchor value=BOTTOM_CENTER><bg color=#60000000><b>Tip:</b> Stone tools last longer than wood.</bg></anchor>"
```

Three tips play in sequence, each at the bottom center with a dark background.

---

### NPC Dialogue (Multi-Line Conversation)

```
/eta queue @p npc "<dur:120><anchor value=BOTTOM_CENTER><bg color=#80000000><typewriter speed=40>Innkeeper: Traveler! You look weary.</typewriter></bg></anchor>" | "<dur:100><anchor value=BOTTOM_CENTER><bg color=#80000000><typewriter speed=40>Innkeeper: A room for the night?</typewriter></bg></anchor>" | "<dur:80><anchor value=BOTTOM_CENTER><bg color=#80000000><italic>Press Sneak to decline.</italic></bg></anchor>"
```

Each line of dialogue types out sequentially, like a conversation.

---

### Countdown Timer

```
/eta queue @p countdown "<dur:20><anchor value=MIDDLE><scale value=2.0><pulse f=3.0><color value=FF4444>3</color></pulse></scale></anchor>" | "<dur:20><anchor value=MIDDLE><scale value=2.0><pulse f=3.0><color value=FFAA44>2</color></pulse></scale></anchor>" | "<dur:20><anchor value=MIDDLE><scale value=2.0><pulse f=3.0><color value=44FF44>1</color></pulse></scale></anchor>" | "<dur:60><anchor value=MIDDLE><scale value=1.5><neon><rainbow>GO!</rainbow></neon></scale></anchor>"
```

3-2-1-GO! Each number appears for 1 second (20 ticks), then "GO!" for 3 seconds.

---

### Parallel HUD + Story

Running two channels simultaneously — one for the story, one for a persistent HUD element:

```
/eta queue @p story "<dur:120>Chapter 1: The Journey Begins" | "<dur:100>The path winds through dark forest..."
/eta queue @p hud "<dur:220><anchor value=TOP_RIGHT><align value=RIGHT><offset x=-10 y=10>Day 1</align></offset></anchor>"
```

The `story` channel plays sequential beats. The `hud` channel shows the current day in the corner for the combined duration.

---

## Tips and Best Practices

:::tip
Set `<dur:N>` slightly longer than you want the message to be visible, then use `<fade out=20>` to add a smooth exit. The fade ticks are included in the total duration.
:::

:::tip
For NPC dialogue, typewriter + queue is a powerful combination. Set `speed` so the typewriter finishes before the `<dur:N>` expires, giving a moment for the player to read.
:::

:::tip
Use unique channel names for each concurrent use case. If you reuse a channel name while a queue is still running, new steps are appended rather than replacing the current display.
:::
