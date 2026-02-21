---
sidebar_position: 1
title: Basic Examples
description: 10+ complete command-only examples for common use cases — welcome messages, warnings, countdowns, and more.
---

# Basic Examples

All examples below are complete `/eta` commands — no Java required. Copy, paste, and adapt them.

---

## Welcome Message

A centered welcome overlay that greets a player when they join.

```
/eta send @s 200 <anchor value=MIDDLE><scale value=1.3><fade in=20 out=30><bg color=#60000000><neon r=2><rainbow><bold>Welcome!</bold></rainbow></neon></bg></fade></scale></anchor>
```

What it does:
- Centered on screen at 130% scale
- Dark background with neon-glowing rainbow bold text
- Fades in over 1 second, fades out over 1.5 seconds
- Lasts 10 seconds total (200 ticks)

---

## Quest Complete Announcement

A dramatic "Quest Complete" message shown at the center of the screen.

```
/eta send @p 180 <anchor value=MIDDLE><offset y=-20><scale value=1.4><bg color=#80000000><fade in=15 out=20><grad from=FFD700 to=FF8800><bold>QUEST COMPLETE!</bold></grad></fade></bg></scale></offset></anchor>
```

What it does:
- Centered, shifted 20px above center, at 140% scale
- Gold-to-orange gradient bold text
- Dark background

---

## Danger Warning with Shake

A warning that vibrates urgently in the top center.

```
/eta send @p 120 <shake a=1.5 f=2.0><color value=FF2222><bold>⚠ DANGER AHEAD ⚠</bold></color></shake>
```

What it does:
- Rapid intense shake in the default top-center position
- Bold red text

For a more prominent warning at the center of the screen:

```
/eta send @p 120 <anchor value=MIDDLE><scale value=1.2><shake a=1.0><neon c=FF0000 r=3><color value=FF2222><bold>⚠ DANGER AHEAD ⚠</bold></color></neon></shake></scale></anchor>
```

---

## Ambient Lore Message with Typewriter

A slow typewriter reveal of ancient lore at the bottom of the screen.

```
/eta send @p 300 <anchor value=BOTTOM_CENTER><offset y=-15><bg color=#50000000><typewriter speed=60><italic><color value=AAAAAA>In ages past, this place knew peace...</color></italic></typewriter></bg></offset></anchor>
```

What it does:
- Typed out slowly (60ms per character) at the bottom of the screen
- Italic gray text with a dark background
- 15 seconds total to read at leisure

---

## Scoreboard-Style HUD Message

A persistent display in the top-right corner showing a status or score.

```
/eta send @p 400 <anchor value=TOP_RIGHT><offset x=-10 y=10><align value=RIGHT><bg color=#40000000><color value=FFDD44><bold>Score: 150</bold></color></bg></align></offset></anchor>
```

What it does:
- Top-right corner, 10px inset from both edges
- Right-aligned text
- Semi-transparent dark background
- Gold bold text

---

## NPC Greeting

Friendly NPC dialogue at the bottom of the screen with a typewriter effect.

```
/eta send @p 200 <anchor value=BOTTOM_CENTER><offset y=-20><bg color=#80000000><typewriter speed=45><color value=AAEEFF>Merchant: Welcome! Looking to trade?</color></typewriter></bg></offset></anchor>
```

What it does:
- Bottom center, shifted 20px from the edge
- Typed out at medium speed
- Light blue text (NPC color), dark background

---

## Boss Phase Announcement

A large, urgent message announcing a boss's new phase.

```
/eta send @p 140 <anchor value=MIDDLE><offset y=40><scale value=1.3><bg color=#80000000><shake a=0.5><neon c=FF0000 r=4 p=2.0><color value=FF4444><bold>PHASE 2 — ENRAGED!</bold></color></neon></shake></bg></scale></offset></anchor>
```

What it does:
- Center-screen, slightly below center
- Pulsing red neon glow with a subtle shake
- Bold red text, dark background

---

## Item Reward Showcase

Show a player they received an item with an inline icon.

```
/eta send @p 160 <anchor value=MIDDLE><scale value=1.2><bg color=#60000000><fade in=15 out=15><b>You received </b><item id=minecraft:diamond count=3/><b> 3 Diamonds!</b></fade></bg></scale></anchor>
```

What it does:
- Centered message with a diamond item icon inline
- Bold text around the item
- Fades in and out

Replace `minecraft:diamond` and the count with any item from your modpack.

---

## Faction Greeting

Show a different message depending on which command block fires (chain the appropriate one based on your scoreboard/tag conditions).

**For players with the "alliance" tag:**
```
/eta send @p[tag=alliance] 160 <anchor value=BOTTOM_CENTER><bg color=#40001440><grad from=44AA44 to=88FF88><bold>The Alliance welcomes you, champion.</bold></grad></bg></anchor>
```

**For players with the "horde" tag:**
```
/eta send @p[tag=horde] 160 <anchor value=BOTTOM_CENTER><bg color=#44140000><grad from=AA4444 to=FF8888><bold>The Horde greets their warrior.</bold></grad></bg></anchor>
```

Different background tints and gradient colors for each faction.

---

## Countdown Timer

A 3-2-1-GO sequence using queues.

```
/eta queue @p countdown "<dur:20><anchor value=MIDDLE><scale value=2.5><pulse f=4.0><color value=FF4444><bold>3</bold></color></pulse></scale></anchor>" | "<dur:20><anchor value=MIDDLE><scale value=2.5><pulse f=4.0><color value=FFAA44><bold>2</bold></color></pulse></scale></anchor>" | "<dur:20><anchor value=MIDDLE><scale value=2.5><pulse f=4.0><color value=44FF44><bold>1</bold></color></pulse></scale></anchor>" | "<dur:60><anchor value=MIDDLE><scale value=1.8><neon r=3><rainbow><bold>GO!</bold></rainbow></neon></scale></anchor>"
```

Four steps: 3 (1 second, red) → 2 (1 second, orange) → 1 (1 second, green) → GO! (3 seconds, rainbow glow).

---

## Obfuscate Reveal (Secret Message)

Text starts scrambled then slowly reveals itself — great for mysterious lore or secret codes.

```
/eta send @p 300 <anchor value=MIDDLE><scale value=1.2><obfuscate mode=reveal direction=center speed=60>The password is: EMBER</obfuscate></anchor>
```

What it does:
- Starts as scrambled glyphs, reveals from the center outward
- 60ms per character reveal speed
- Centered at 120% scale

---

## Server Announcement with Typewriter

A styled server-wide announcement with a slow typewriter reveal.

```
/eta send @a 400 <anchor value=TOP_CENTER><offset y=20><bg color=#60000000><fade in=20 out=40><typewriter speed=35><rainbow><bold>New Season!</bold></rainbow> <color value=DDDDDD>A new world awaits...</color></typewriter></fade></bg></offset></anchor>
```

What it does:
- Sent to all players (`@a`)
- Top center, shifted down 20px
- Rainbow bold title followed by gray description text
- Typewriter reveal, smooth fade out
