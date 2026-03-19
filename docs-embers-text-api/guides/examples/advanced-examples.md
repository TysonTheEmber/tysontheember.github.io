---
sidebar_position: 2
title: Advanced Examples
description: Complex command patterns for cutscenes, quest flows, boss sequences, and multi-position HUD combos.
---

# Advanced Examples

More sophisticated patterns using multiple channels, complex queues, and combined effects.

---

## Full Dungeon Intro Cutscene

A complete dungeon entrance sequence: dramatic title → lore → warning → GO!

```
/eta queue @p dungeon "<dur:140><anchor value=MIDDLE><scale value=1.5><fade in=20 out=20><bg color=#80000000><neon r=4 i=1.5><grad from=880000 to=FF2222><bold>THE FORGOTTEN CRYPT</bold></grad></neon></bg></fade></scale></anchor>" | "<dur:120><anchor value=MIDDLE><offset y=30><italic><color value=AAAAAA>Few have entered. None have returned.</color></italic></offset></anchor>" | "<dur:80><anchor value=MIDDLE><offset y=50><shake a=0.5><color value=FFAA44>Prepare yourself.</color></shake></offset></anchor>" | "<dur:80><anchor value=BOTTOM_CENTER><offset y=-20><typewriter speed=30><color value=888888>Survival requires skill and wit...</color></typewriter></offset></anchor>"
```

Four sequential steps:
1. Dramatic dungeon title (7 seconds) with red gradient + neon
2. Lore line (6 seconds), italic gray, slightly lower
3. Warning line (4 seconds), orange with subtle shake
4. Tips typewriter at the bottom (4 seconds)

---

## Quest Tracker Overlay (Persistent HUD)

A quest tracker in the top-right corner that persists while the player is in the quest area.

Send this when the player enters the quest zone:
```
/eta queue @p questtracker "<dur:6000><anchor value=TOP_RIGHT><align value=RIGHT><offset x=-10 y=10><bg color=#50000000><color value=FFDD44><b>Active Quest</b></color><br/><color value=DDDDDD>Kill 10 Skeletons (0/10)</color></bg></offset></align></anchor>"
```

Update progress (resend with new count):
```
/eta queue @p questtracker "<dur:6000><anchor value=TOP_RIGHT><align value=RIGHT><offset x=-10 y=10><bg color=#50000000><color value=FFDD44><b>Active Quest</b></color><br/><color value=DDDDDD>Kill 10 Skeletons (5/10)</color></bg></offset></align></anchor>"
```

Clear when quest completes:
```
/eta clearqueue @p questtracker
```

The 6000-tick (5-minute) duration keeps it on screen while in the zone. Resending to the same channel appends — but since the previous message is still running, manage with clearqueue before resending if needed.

---

## Boss Battle Sequence (Parallel Channels)

A boss fight with a main channel for story beats and a side channel for a persistent boss health indicator.

**Fire both at once from a command block:**

Channel 1 — Story beats:
```
/eta queue @p bossstory "<dur:160><anchor value=MIDDLE><scale value=1.6><bg color=#80000000><neon c=FF0000 r=5 p=3.0><shake a=0.8><color value=FF2222><b>LICH KING</b></color></shake></neon></bg></scale></anchor>" | "<dur:120><anchor value=MIDDLE><offset y=30><grad from=FF0000 to=440000>Defeat him to claim the throne.</grad></offset></anchor>" | "<dur:100><typewriter speed=40>Survive. Fight. Win.</typewriter>"
```

Channel 2 — Boss health HUD (persistent):
```
/eta queue @p bosshud "<dur:380><anchor value=TOP_CENTER><offset y=8><bg color=#60000000><color value=FF4444>❤ </color><color value=DDDDDD>Lich King</color></bg></offset></anchor>"
```

Both channels play simultaneously. The story beats play out over ~6 seconds, while the boss health display stays on screen for the full fight.

---

## Multi-NPC Conversation Sequence

A full conversation between two NPCs (or NPC + player), each with distinct colors.

```
/eta queue @p dialogue "<dur:140><anchor value=BOTTOM_CENTER><offset y=-20><bg color=#80000000><typewriter speed=45><color value=44BBFF>Guard: Halt! State your business.</color></typewriter></bg></offset></anchor>" | "<dur:120><anchor value=BOTTOM_CENTER><offset y=-20><bg color=#80000000><typewriter speed=40><color value=FFDD88>You: I seek the ancient tome.</color></typewriter></bg></offset></anchor>" | "<dur:140><anchor value=BOTTOM_CENTER><offset y=-20><bg color=#80000000><typewriter speed=50><color value=44BBFF>Guard: ...Follow me. And don't touch anything.</color></typewriter></bg></offset></anchor>" | "<dur:80><anchor value=BOTTOM_CENTER><offset y=-20><bg color=#80000000><italic><color value=888888>(You follow the guard into the keep.)</color></italic></bg></offset></anchor>"
```

Four steps with alternating speaker colors (blue for Guard, gold for Player), each typed out at medium speed.

---

## Lore Book Page Reveal

A "lore book" that reveals pages one by one using typewriter + queue, with each page fading in.

```
/eta queue @p lorebook "<dur:220><anchor value=MIDDLE><offset y=-20><scale value=1.1><bg color=#70100500><fade in=20 out=15><typewriter speed=50><color value=DDBB88>Page 1: In the beginning, the world was forged from chaos...</color></typewriter></fade></bg></offset></scale></anchor>" | "<dur:200><anchor value=MIDDLE><offset y=-20><scale value=1.1><bg color=#70100500><fade in=20 out=15><typewriter speed=50><color value=DDBB88>Page 2: The Ancients built seven towers at the world's edge...</color></typewriter></fade></bg></offset></scale></anchor>" | "<dur:180><anchor value=MIDDLE><offset y=-20><scale value=1.1><bg color=#70100500><fade in=20 out=15><typewriter speed=50><color value=DDBB88>Page 3: Only one tower remains. Its name is forbidden.</color></typewriter></fade></bg></offset></scale></anchor>"
```

Three pages, each fading in, revealing text character by character, then fading out before the next page appears.

---

## Treasure Discovery

An exciting item discovery moment — item inline, glow effect, cinematic feel.

```
/eta queue @p treasure "<dur:180><anchor value=MIDDLE><scale value=1.3><bg color=#80000000><fade in=20 out=20><neon r=3 c=FFD700 p=2.0><b>A treasure discovered!</b></neon></fade></bg></scale></anchor>" & "<dur:180><anchor value=MIDDLE><offset y=30><scale value=1.1><fade in=20 out=20><color value=DDDDDD>You found <item id=minecraft:diamond_sword count=1/> <b>Sword of the Fallen King</b></color></fade></scale></offset></anchor>"
```

Two simultaneous messages: dramatic title with pulsing gold glow above, item reveal below.

---

## Danger Zone Entry (Ambient + Warning)

When a player enters a dangerous area — ambient atmospheric text + a warning — using two channels:

**Atmospheric ambient (subtle, persistent):**
```
/eta queue @p ambient "<dur:400><anchor value=BOTTOM_LEFT><offset x=10 y=-10><fade a=0.3 f=0.5><italic><color value=555555>The air grows heavy...</color></italic></fade></offset></anchor>"
```

**Warning flash (center, urgent):**
```
/eta queue @p warning "<dur:80><anchor value=MIDDLE><scale value=1.2><shake a=1.5 f=3.0><neon c=FF0000 r=3><color value=FF2222><b>DANGER ZONE</b></color></neon></shake></scale></anchor>"
```

The `ambient` channel shows a ghost-like whisper in the corner. The `warning` channel shows a dramatic flash simultaneously.

---

## Tutorial Progression System

A step-by-step tutorial where each hint plays after the player completes an action (trigger each `/eta queue` command from a separate command block).

**Hint 1 (trigger from starting command block):**
```
/eta queue @p tutorial "<dur:140><anchor value=BOTTOM_CENTER><offset y=-15><bg color=#60000000><typewriter speed=40><color value=AAEEFF><b>Tip:</b> Open your inventory with E.</color></typewriter></bg></offset></anchor>"
```

**Hint 2 (trigger when player opens inventory for first time):**
```
/eta queue @p tutorial "<dur:140><anchor value=BOTTOM_CENTER><offset y=-15><bg color=#60000000><typewriter speed=40><color value=AAEEFF><b>Tip:</b> Craft a Crafting Table from 4 wood planks.</color></typewriter></bg></offset></anchor>"
```

**Hint 3 (trigger when player crafts first item):**
```
/eta queue @p tutorial "<dur:140><anchor value=BOTTOM_CENTER><offset y=-15><bg color=#60000000><typewriter speed=40><color value=AAEEFF><b>Well done!</b> You crafted your first item.</color></typewriter></bg></offset></anchor>"
```

Each hint appends to the `tutorial` channel. If a previous hint is still running when the next triggers, they queue up automatically.

---

## Phase Transition with Blackout Feel

A dramatic boss phase change — split across two channels for a layered cinematic effect.

**Announcement:**
```
/eta queue @p phase "<dur:200><anchor value=MIDDLE><scale value=1.5><bg color=#C0000000><fade in=25 out=25><shake a=0.5><neon c=880000 r=6><color value=FF0000><b>— PHASE II —</b></color></neon></shake></fade></bg></scale></anchor>"
```

**Subtitle:**
```
/eta queue @p phasesub "<dur:160><anchor value=MIDDLE><offset y=50><fade in=40 out=20><italic><color value=AA4444>The Lich King grows desperate.</color></italic></fade></offset></anchor>"
```

Both play simultaneously. The main announcement has a near-opaque dark background (blackout feel), while the subtitle below fades in slower.
