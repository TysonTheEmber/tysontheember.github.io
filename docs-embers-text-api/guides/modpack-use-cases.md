---
sidebar_position: 7.5
title: Modpack Use Cases
description: Practical ways to use ETA in modpacks — quests, item tooltips, lang file markup, KubeJS scripting, HUDs, and more.
---

# Modpack Use Cases

This guide covers practical, real-world ways to integrate Embers Text API into your modpack beyond basic commands. These techniques use resource packs, datapacks, command blocks, and [KubeJS](https://kubejs.com/) scripting.

---

## KubeJS Integration

[KubeJS](https://kubejs.com/) is a powerful scripting framework for modpack developers. Since ETA processes markup in any text component, KubeJS can leverage ETA in two main ways:

1. **Running `/eta` commands** via `server.runCommandSilent()` for on-screen overlays
2. **Using markup in item/block modifications** where ETA automatically processes the tags

### Running ETA Commands from KubeJS

Any `/eta` command can be executed from a KubeJS server script:

```js title="kubejs/server_scripts/eta_helpers.js"
// Helper function to send an ETA message
function etaSend(player, duration, markup) {
  player.server.runCommandSilent(
    `eta send ${player.username} ${duration} ${markup}`
  )
}

// Helper function to send an ETA queue
function etaQueue(player, channel, definition) {
  player.server.runCommandSilent(
    `eta queue ${player.username} ${channel} ${definition}`
  )
}

// Helper to stop a queue channel
function etaStop(player, channel) {
  player.server.runCommandSilent(
    `eta stopqueue ${player.username} ${channel}`
  )
}

// Helper to close all messages
function etaCloseAll(player) {
  player.server.runCommandSilent(
    `eta closeall ${player.username}`
  )
}
```

### Player Join Welcome

```js title="kubejs/server_scripts/welcome.js"
PlayerEvents.loggedIn(event => {
  let player = event.player

  event.server.scheduleInTicks(40, () => {
    player.server.runCommandSilent(
      `eta queue ${player.username} welcome `
      + `"<dur:140><anchor value=MIDDLE><scale value=1.3><fade in=25 out=20>`
      + `<bg color=#70000000><neon r=2><rainbow><b>Welcome to CraftRealm!</b></rainbow></neon>`
      + `</bg></fade></scale></anchor>" | `
      + `"<dur:120><anchor value=MIDDLE><offset y=30><fade in=15 out=15>`
      + `<bg color=#50000000><color value=DDDDDD>Season 4 - The Nether Update</color>`
      + `</bg></fade></offset></anchor>"`
    )
  })
})
```

The `scheduleInTicks(40, ...)` delays the message by 2 seconds so it appears after the player has loaded in.

### Event-Driven Messages

KubeJS events are the ideal way to trigger ETA messages at the right moment:

```js title="kubejs/server_scripts/eta_events.js"
// Diamond ore mined - celebration
PlayerEvents.blockBreak(event => {
  if (event.block.id === 'minecraft:diamond_ore'
      || event.block.id === 'minecraft:deepslate_diamond_ore') {
    let p = event.player
    p.server.runCommandSilent(
      `eta send ${p.username} 80 `
      + `<anchor value=MIDDLE><offset y=40><fade in=5 out=15>`
      + `<neon c=44FFFF r=2><bounce a=1.0 w=0.3>`
      + `<color value=44FFFF><b>Diamond Found!</b></color>`
      + `</bounce></neon></fade></offset></anchor>`
    )
  }
})

// Player enters the Nether
PlayerEvents.changeDimension(event => {
  if (event.toLevel === 'minecraft:the_nether') {
    let p = event.player
    p.server.runCommandSilent(
      `eta queue ${p.username} dimension `
      + `"<dur:80><anchor value=MIDDLE><scale value=1.4><fade in=25 out=15>`
      + `<bg color=#C0000000><neon c=FF4400 r=4 p=2.0><shake a=0.3>`
      + `<color value=FF6644><b>THE NETHER</b></color>`
      + `</shake></neon></bg></fade></scale></anchor>" | `
      + `"<dur:100><anchor value=MIDDLE><offset y=35><fade in=20 out=20>`
      + `<color value=FF8844><i>Watch your step.</i></color>`
      + `</fade></offset></anchor>"`
    )
  }
})

// Player respawn - death recap
PlayerEvents.respawned(event => {
  let p = event.player
  p.server.runCommandSilent(
    `eta send ${p.username} 100 `
    + `<anchor value=MIDDLE><fade in=30 out=20><bg color=#80000000>`
    + `<color value=FF4444><b>You Died</b></color><br/>`
    + `<color value=AAAAAA>Your items await at your death point.</color>`
    + `</bg></fade></anchor>`
  )
})

// Entity kill tracking
EntityEvents.death(event => {
  let source = event.source
  if (!source || !source.player) return
  let p = source.player

  if (event.entity.type === 'minecraft:wither') {
    p.server.runCommandSilent(
      `eta queue ${p.username} bossdeath `
      + `"<dur:60><anchor value=MIDDLE><scale value=1.5><fade in=5 out=5>`
      + `<shake a=2.0 f=3.0><glitch s=0.3>`
      + `<color value=444444><b>DEFEATED</b></color>`
      + `</glitch></shake></fade></scale></anchor>" | `
      + `"<dur:160><anchor value=MIDDLE><scale value=1.4><fade in=25 out=25>`
      + `<bg color=#60000000><neon c=FFD700 r=4><bounce a=1.0 w=0.3>`
      + `<grad from=FFD700 to=FFAA00><b>VICTORY!</b></grad>`
      + `</bounce></neon></bg></fade></scale></anchor>"`
    )
  }
})
```

### Cleanup on Disconnect

```js title="kubejs/server_scripts/eta_cleanup.js"
PlayerEvents.loggedOut(event => {
  // Clean up any persistent HUD elements
  event.server.runCommandSilent(
    `eta closeall ${event.player.username}`
  )
})
```

---

## KubeJS Item Modification

KubeJS can set item names and lore that contain ETA markup. Since ETA processes markup in all text components, these effects render automatically in tooltips, inventories, and chat.

### Custom Item Names

```js title="kubejs/startup_scripts/custom_items.js"
StartupEvents.registry('item', event => {
  event.create('mypack:flame_blade')
    .displayName(Component.of('<grad from=FF8800 to=FF2200><b>Flame Blade</b></grad>'))
    .maxDamage(1500)
})
```

### Modifying Existing Item Names

```js title="kubejs/client_scripts/item_names.js"
ItemEvents.tooltip(event => {
  // Add styled lore lines to specific items
  event.add('minecraft:nether_star', [
    Component.of('<color value=AAAAAA>A fragment of the Wither\'s power.</color>'),
    Component.of('<shake a=0.2><color value=AA00FF>Radiates dark energy.</color></shake>')
  ])

  event.add('minecraft:totem_of_undying', [
    Component.of('<pulse f=1.0><color value=FFD700>Cheats death once.</color></pulse>')
  ])
})
```

### Tiered Rarity System with KubeJS

Create a modpack-wide rarity system by modifying item tooltips:

```js title="kubejs/client_scripts/rarity_tooltips.js"
// Define rarity markup patterns
const RARITY = {
  common:    (name) => `<color value=AAAAAA>${name}</color>`,
  uncommon:  (name) => `<color value=44FF44>${name}</color>`,
  rare:      (name) => `<color value=4488FF>${name}</color>`,
  epic:      (name) => `<pulse f=1.5><color value=AA00FF>${name}</color></pulse>`,
  legendary: (name) => `<neon c=FFD700 r=2><grad from=FFD700 to=FFAA00><b>${name}</b></grad></neon>`,
  mythic:    (name) => `<rainbow f=0.8><neon r=3><b>${name}</b></neon></rainbow>`
}

ItemEvents.tooltip(event => {
  // Tag items with rarity lore lines
  event.add('minecraft:netherite_sword', [
    Component.of(RARITY.legendary('Legendary'))
  ])

  event.add('minecraft:elytra', [
    Component.of(RARITY.epic('Epic'))
  ])
})
```

### Giving Items with Markup via KubeJS

```js title="kubejs/server_scripts/custom_rewards.js"
// Give a player a custom-named item with ETA markup
function giveStyledItem(player, itemId, count, name, lore) {
  let item = Item.of(itemId, count)
  if (name) {
    item = item.withName(Component.of(name))
  }
  if (lore && lore.length > 0) {
    lore.forEach(line => {
      item = item.withLore(Component.of(line))
    })
  }
  player.give(item)
}

// Example usage in an event
PlayerEvents.advancement(event => {
  if (event.advancementId === 'minecraft:end/kill_dragon') {
    giveStyledItem(
      event.player,
      'minecraft:diamond_sword',
      1,
      '<neon c=AA00FF r=3><grad from=AA00FF to=FF00FF><b>Dragonslayer</b></grad></neon>',
      [
        '<color value=CCAAFF>Forged from the dragon\'s demise.</color>',
        '',
        '<shake a=0.2><color value=FF44FF>Pulses with draconic energy.</color></shake>'
      ]
    )
  }
})
```

---

## Lang File Markup

ETA automatically processes markup tags inside translatable text components. This means you can add effects directly to language files in a resource pack, and they'll render wherever that translation key is displayed.

### How It Works

Create or override a lang file in your resource pack at:
```
assets/<namespace>/lang/en_us.json
```

Any translation value that contains ETA markup tags will have those effects applied when rendered.

### Item Names and Tooltips

Override vanilla or modded item names to make them stand out:

```json title="assets/minecraft/lang/en_us.json"
{
  "item.minecraft.netherite_sword": "<grad from=FF6600 to=FF0044><b>Netherite Sword</b></grad>",
  "item.minecraft.nether_star": "<neon c=FFDD00 r=2><b>Nether Star</b></neon>",
  "item.minecraft.totem_of_undying": "<rainbow f=0.5>Totem of Undying</rainbow>",
  "item.minecraft.enchanted_golden_apple": "<neon c=FFD700 r=3><grad from=FFD700 to=FFAA00>Enchanted Golden Apple</grad></neon>"
}
```

This makes Netherite Swords display with a fiery gradient, Nether Stars glow gold, and Totems shimmer with rainbow text — everywhere the name appears (inventory, tooltips, chat, etc.).

### Modded Item Names

The same works for any mod's items. Find the translation key in the mod's lang file and override it:

```json title="assets/apotheosis/lang/en_us.json"
{
  "item.apotheosis.boss_summoner": "<shake a=0.3><color value=AA00FF>Boss Summoner</color></shake>",
  "item.apotheosis.gem": "<pulse f=1.5><color value=00FFAA>Apotheotic Gem</color></pulse>"
}
```

### UI Text and Menu Labels

Translate UI strings to add flair to menus, button labels, and screen titles:

```json title="assets/minecraft/lang/en_us.json"
{
  "menu.singleplayer": "<grad from=44BBFF to=4488FF>Singleplayer</grad>",
  "menu.multiplayer": "<grad from=44FF88 to=22AA44>Multiplayer</grad>",
  "gui.advancements": "<neon r=1.5><color value=FFD700>Advancements</color></neon>"
}
```

### Advancement Titles and Descriptions

Make advancements feel more rewarding:

```json title="assets/minecraft/lang/en_us.json"
{
  "advancements.story.root.title": "<rainbow>Minecraft</rainbow>",
  "advancements.end.kill_dragon.title": "<neon c=AA00FF r=3><b>Free the End</b></neon>",
  "advancements.end.kill_dragon.description": "<color value=CCAAFF>The dragon has been defeated.</color>"
}
```

### Enchantment Names

Give enchantments more visual identity:

```json title="assets/minecraft/lang/en_us.json"
{
  "enchantment.minecraft.sharpness": "<color value=FF4444>Sharpness</color>",
  "enchantment.minecraft.fire_aspect": "<grad from=FF8800 to=FF2200>Fire Aspect</grad>",
  "enchantment.minecraft.mending": "<color value=44FF44>Mending</color>",
  "enchantment.minecraft.silk_touch": "<color value=88DDFF>Silk Touch</color>"
}
```

### Death Messages

Make death messages more dramatic:

```json title="assets/minecraft/lang/en_us.json"
{
  "death.attack.lava": "<shake a=0.3><grad from=FF8800 to=FF0000>%1$s tried to swim in lava</grad></shake>",
  "death.attack.fall": "<color value=AAAAAA>%1$s hit the ground too hard</color>",
  "death.attack.dragonBreath": "<neon c=AA00FF r=2>%1$s was roasted by dragon breath</neon>"
}
```

:::warning
Keep `%1$s`, `%2$s`, etc. placeholders intact — Minecraft uses them to insert player names and other values.
:::

:::tip
Lang file changes are loaded from resource packs. To distribute with your modpack, include them in a resource pack that's enabled by default.
:::

---

## Quest Systems

ETA pairs well with quest mods and command-based quest systems. KubeJS makes quest integration especially powerful by reacting to game events in real time.

### Quest Acceptance

When a player accepts a quest (via FTB Quests command reward, KubeJS event, or command block):

```
/eta queue @p queststart "<dur:120><anchor value=MIDDLE><scale value=1.3><fade in=20 out=20><bg color=#80000000><neon c=FFD700 r=3><b>New Quest</b></neon></bg></fade></scale></anchor>" | "<dur:140><anchor value=MIDDLE><offset y=30><fade in=15 out=15><bg color=#60000000><color value=FFDD88>Slay the Wither</color><br/><color value=AAAAAA>Defeat the Wither in the Nether Wastes.</color></bg></fade></offset></anchor>"
```

#### KubeJS Quest Tracker

A full quest system with KubeJS — tracking objectives and updating the HUD dynamically:

```js title="kubejs/server_scripts/quest_tracker.js"
// Quest definitions
const QUESTS = {
  wither_hunt: {
    title: 'Slay the Wither',
    objectives: [
      { id: 'gather_skulls', label: 'Gather Wither Skulls', target: 3 },
      { id: 'build_altar', label: 'Build the Altar', target: 1 },
      { id: 'slay_wither', label: 'Defeat the Wither', target: 1 }
    ]
  }
}

// Show quest accepted message
function showQuestAccepted(player, quest) {
  player.server.runCommandSilent(
    `eta queue ${player.username} queststart `
    + `"<dur:120><anchor value=MIDDLE><scale value=1.3><fade in=20 out=20>`
    + `<bg color=#80000000><neon c=FFD700 r=3><b>New Quest</b></neon>`
    + `</bg></fade></scale></anchor>" | `
    + `"<dur:140><anchor value=MIDDLE><offset y=30><fade in=15 out=15>`
    + `<bg color=#60000000><color value=FFDD88>${quest.title}</color>`
    + `</bg></fade></offset></anchor>"`
  )
}

// Update quest HUD — builds the objective list dynamically
function updateQuestHUD(player, quest, progress) {
  player.server.runCommandSilent(
    `eta stopqueue ${player.username} questhud`
  )

  let lines = `<color value=FFDD44><b>${quest.title}</b></color>`
  quest.objectives.forEach(obj => {
    let current = progress[obj.id] || 0
    let done = current >= obj.target
    let color = done ? '44FF44' : 'DDDDDD'
    let check = done ? ' [DONE]' : ` (${current}/${obj.target})`
    lines += `<br/><color value=${color}>${obj.label}${check}</color>`
  })

  player.server.runCommandSilent(
    `eta queue ${player.username} questhud `
    + `"<dur:6000><anchor value=TOP_RIGHT><align value=RIGHT><offset x=-10 y=10>`
    + `<bg color=#50000000>${lines}</bg></offset></align></anchor>"`
  )
}

// Show quest complete celebration
function showQuestComplete(player, quest) {
  player.server.runCommandSilent(
    `eta stopqueue ${player.username} questhud`
  )
  player.server.runCommandSilent(
    `eta queue ${player.username} questdone `
    + `"<dur:100><anchor value=MIDDLE><scale value=1.4><fade in=15 out=15>`
    + `<bg color=#80000000><bounce a=1.5 w=0.3><neon c=44FF44 r=3>`
    + `<b>QUEST COMPLETE!</b></neon></bounce></bg></fade></scale></anchor>" | `
    + `"<dur:120><anchor value=MIDDLE><offset y=35><fade in=10 out=15>`
    + `<bg color=#60000000><color value=DDDDDD>Reward: </color>`
    + `<item id=minecraft:nether_star count=1/>`
    + `<color value=DDDDDD> Nether Star</color></bg></fade></offset></anchor>"`
  )
}
```

### Quest Progress via Commands

For simpler setups without KubeJS, use a persistent HUD channel that you clear and resend as progress changes:

```
/eta stopqueue @p questhud
/eta queue @p questhud "<dur:6000><anchor value=TOP_RIGHT><align value=RIGHT><offset x=-10 y=10><bg color=#50000000><color value=FFDD44><b>Slay the Wither</b></color><br/><color value=DDDDDD>Progress: 0/1</color></bg></offset></align></anchor>"
```

When the player makes progress, stop the old HUD and send the updated one:

```
/eta stopqueue @p questhud
/eta queue @p questhud "<dur:6000><anchor value=TOP_RIGHT><align value=RIGHT><offset x=-10 y=10><bg color=#50000000><color value=FFDD44><b>Slay the Wither</b></color><br/><color value=44FF44>Progress: 1/1 - Complete!</color></bg></offset></align></anchor>"
```

### Multi-Objective Quest Tracker

For quests with several objectives, use line breaks:

```
/eta stopqueue @p questhud
/eta queue @p questhud "<dur:6000><anchor value=TOP_RIGHT><align value=RIGHT><offset x=-10 y=10><bg color=#50000000><color value=FFDD44><b>The Lost Artifacts</b></color><br/><color value=44FF44>Find the Ancient Sword (1/1)</color><br/><color value=DDDDDD>Find the Crystal Shard (0/3)</color><br/><color value=DDDDDD>Speak to the Elder (0/1)</color></bg></offset></align></anchor>"
```

Completed objectives show in green, incomplete in gray.

---

## Custom Item Lore with NBT

When giving items via commands, you can include ETA markup in the item's display name and lore using NBT. The markup renders wherever the item name or lore is displayed.

### Named Items with Effects

```
/give @p minecraft:diamond_sword{display:{Name:'{"text":"<neon c=00FFFF r=2><b>Frostbrand</b></neon>"}'}} 1
```

### Lore Lines

```
/give @p minecraft:diamond_sword{display:{Name:'{"text":"<grad from=FF8800 to=FF2200><b>Inferno Blade</b></grad>"}',Lore:['{"text":"<color value=FF8844>Forged in the heart of a volcano.</color>"}','{"text":"<color value=AAAAAA>Deals fire damage on hit.</color>"}','{"text":""}','{"text":"<shake a=0.2><color value=FF4444>Burns with eternal flame.</color></shake>"}']}} 1
```

### Tiered Rarity System

Create a visual rarity system for custom items across your modpack:

| Rarity | Markup Pattern |
|---|---|
| Common | `<color value=AAAAAA>Item Name</color>` |
| Uncommon | `<color value=44FF44>Item Name</color>` |
| Rare | `<color value=4488FF>Item Name</color>` |
| Epic | `<pulse f=1.5><color value=AA00FF>Item Name</color></pulse>` |
| Legendary | `<neon c=FFD700 r=2><grad from=FFD700 to=FFAA00><b>Item Name</b></grad></neon>` |
| Mythic | `<rainbow f=0.8><neon r=3><b>Item Name</b></neon></rainbow>` |

See [KubeJS Item Modification](#kubejs-item-modification) above for applying these programmatically.

---

## Area Entry Notifications

Trigger these from command blocks at region boundaries, or use KubeJS for dimension-change detection.

### Biome / Region Welcome

```
/eta send @p 120 <anchor value=MIDDLE><offset y=-40><scale value=1.2><fade in=20 out=20><bg color=#50000000><grad from=44AA44 to=88FF44><b>Enchanted Forest</b></grad></bg></fade></scale></offset></anchor>
```

### Dangerous Area Warning

```
/eta queue @p areawarn "<dur:80><anchor value=MIDDLE><scale value=1.3><fade in=10 out=10><bg color=#80200000><shake a=0.5><neon c=FF0000 r=3><color value=FF2222><b>CORRUPTED WASTELAND</b></color></neon></shake></bg></fade></scale></anchor>" | "<dur:100><anchor value=MIDDLE><offset y=30><fade in=15 out=15><color value=FFAA44><i>Hostile mobs are empowered here. Proceed with caution.</i></color></fade></offset></anchor>"
```

### Town / Safe Zone Entry

```
/eta send @p 100 <anchor value=TOP_CENTER><offset y=20><fade in=15 out=15><bg color=#40002244><color value=88CCFF><b>Willowvale</b></color><br/><color value=AAAAAA>Safe Zone - PvP Disabled</color></bg></offset></anchor>
```

### KubeJS Dimension Change Notifications

```js title="kubejs/server_scripts/dimension_entries.js"
const DIMENSION_INTROS = {
  'minecraft:the_nether': {
    title: '<neon c=FF4400 r=4 p=2.0><shake a=0.3><color value=FF6644><b>THE NETHER</b></color></shake></neon>',
    subtitle: '<color value=FF8844><i>Watch your step.</i></color>'
  },
  'minecraft:the_end': {
    title: '<neon c=AA00FF r=5><color value=CC88FF><b>THE END</b></color></neon>',
    subtitle: '<turb a=0.8><color value=8866CC><i>The void stretches infinitely...</i></color></turb>'
  }
}

PlayerEvents.changeDimension(event => {
  let dim = DIMENSION_INTROS[event.toLevel]
  if (!dim) return

  let p = event.player
  p.server.runCommandSilent(
    `eta queue ${p.username} dimension `
    + `"<dur:80><anchor value=MIDDLE><scale value=1.4><fade in=25 out=15>`
    + `<bg color=#C0000000>${dim.title}</bg></fade></scale></anchor>" | `
    + `"<dur:100><anchor value=MIDDLE><offset y=35><fade in=20 out=20>`
    + `${dim.subtitle}</fade></offset></anchor>"`
  )
})
```

---

## Server Announcements

### Scheduled Restart Warning

With commands (via a scheduled task or repeating command block chain):

**10 minutes out:**
```
/eta send @a 200 <anchor value=TOP_CENTER><offset y=15><bg color=#60000000><fade in=15 out=15><color value=FFAA44><b>Server restart in 10 minutes.</b></color></fade></bg></offset></anchor>
```

**1 minute out (more urgent):**
```
/eta send @a 200 <anchor value=TOP_CENTER><offset y=15><bg color=#60220000><fade in=10 out=10><shake a=0.3><color value=FF4444><b>Server restart in 1 minute!</b></color></shake></fade></bg></offset></anchor>
```

#### KubeJS Timed Announcements

```js title="kubejs/server_scripts/announcements.js"
// Broadcast to all online players
function etaBroadcast(server, duration, markup) {
  server.players.forEach(p => {
    server.runCommandSilent(
      `eta send ${p.username} ${duration} ${markup}`
    )
  })
}

// Schedule restart warnings (call this from your restart logic)
function scheduleRestartWarnings(server, minutesUntilRestart) {
  let warnings = [
    { at: 10, msg: 'Server restart in 10 minutes.', color: 'FFAA44', shake: false },
    { at: 5,  msg: 'Server restart in 5 minutes.',  color: 'FFAA44', shake: false },
    { at: 1,  msg: 'Server restart in 1 minute!',   color: 'FF4444', shake: true }
  ]

  warnings.forEach(w => {
    if (minutesUntilRestart > w.at) {
      let delay = (minutesUntilRestart - w.at) * 60 * 20 // ticks
      server.scheduleInTicks(delay, () => {
        let shakeTag = w.shake ? '<shake a=0.3>' : ''
        let shakeEnd = w.shake ? '</shake>' : ''
        etaBroadcast(server, 200,
          `<anchor value=TOP_CENTER><offset y=15><bg color=#60000000><fade in=10 out=10>`
          + `${shakeTag}<color value=${w.color}><b>${w.msg}</b></color>${shakeEnd}`
          + `</fade></bg></offset></anchor>`
        )
      })
    }
  })
}
```

### Event Announcements

```
/eta send @a 300 <anchor value=TOP_CENTER><offset y=20><scale value=1.1><bg color=#60000000><fade in=20 out=30><neon c=FFD700 r=2><b>BOSS EVENT</b></neon> <color value=DDDDDD>starts in 5 minutes at spawn!</color></fade></bg></scale></offset></anchor>
```

### MOTD / Welcome Sequence

Via command (trigger on player join with an advancement reward):

```
/eta queue @p welcome "<dur:140><anchor value=MIDDLE><scale value=1.3><fade in=25 out=20><bg color=#70000000><neon r=2><rainbow><b>Welcome to CraftRealm!</b></rainbow></neon></bg></fade></scale></anchor>" | "<dur:120><anchor value=MIDDLE><offset y=30><fade in=15 out=15><bg color=#50000000><color value=DDDDDD>Season 4 - The Nether Update</color></bg></fade></offset></anchor>" | "<dur:100><anchor value=MIDDLE><offset y=30><fade in=15 out=15><bg color=#50000000><color value=88CCFF>Type /spawn to get started!</color></bg></fade></offset></anchor>"
```

See [Player Join Welcome](#player-join-welcome) above for the KubeJS version with proper join timing.

---

## NPC Dialogue and Storytelling

### Shopkeeper Interaction

Trigger when a player right-clicks a villager or custom NPC:

```
/eta queue @p shop "<dur:120><anchor value=BOTTOM_CENTER><offset y=-20><bg color=#80000000><typewriter speed=40><color value=88DDFF>Blacksmith:</color> <color value=DDDDDD>Need a blade sharpened?</color></typewriter></bg></offset></anchor>" | "<dur:140><anchor value=BOTTOM_CENTER><offset y=-20><bg color=#80000000><typewriter speed=40><color value=88DDFF>Blacksmith:</color> <color value=DDDDDD>I've got the finest steel in town.</color></typewriter></bg></offset></anchor>" | "<dur:100><anchor value=BOTTOM_CENTER><offset y=-20><bg color=#80000000><fade in=10 out=10><i><color value=888888>Sneak to browse wares.</color></i></fade></bg></offset></anchor>"
```

#### KubeJS NPC Dialogue System

A reusable dialogue system where you define conversations as data:

```js title="kubejs/server_scripts/dialogue.js"
const DIALOGUES = {
  blacksmith: {
    color: '88DDFF',
    name: 'Blacksmith',
    lines: [
      'Need a blade sharpened?',
      'I\'ve got the finest steel in town.',
      'Come back when you\'ve got coin.'
    ]
  },
  elder: {
    color: 'DDBB88',
    name: 'Elder Maren',
    lines: [
      'Ah, a traveler. It has been long since one came this way.',
      'The old road is sealed. You\'ll need the three keys.',
      'Seek them in the ruins to the north, east, and deep below.'
    ]
  }
}

function playDialogue(player, dialogueId) {
  let d = DIALOGUES[dialogueId]
  if (!d) return

  let steps = d.lines.map(line => {
    let dur = Math.max(80, line.length * 3 + 60)
    return `"<dur:${dur}><anchor value=BOTTOM_CENTER><offset y=-20>`
      + `<bg color=#80000000><typewriter speed=40>`
      + `<color value=${d.color}>${d.name}:</color> `
      + `<color value=DDDDDD>${line}</color>`
      + `</typewriter></bg></offset></anchor>"`
  }).join(' | ')

  player.server.runCommandSilent(
    `eta queue ${player.username} dialogue ${steps}`
  )
}
```

### Lore Tablets / Signs

When a player activates a lore trigger (pressure plate, interaction, etc.):

```
/eta queue @p lore "<dur:200><anchor value=MIDDLE><scale value=1.1><bg color=#70100500><fade in=25 out=20><typewriter speed=55><color value=DDBB88><i>Here fell the last of the Old Kings,</i></color></typewriter></fade></bg></scale></anchor>" | "<dur:180><anchor value=MIDDLE><scale value=1.1><bg color=#70100500><fade in=20 out=20><typewriter speed=55><color value=DDBB88><i>their crowns shattered upon stone.</i></color></typewriter></fade></bg></scale></anchor>" | "<dur:160><anchor value=MIDDLE><scale value=1.1><bg color=#70100500><fade in=20 out=20><typewriter speed=55><color value=DDBB88><i>May their memory endure.</i></color></typewriter></fade></bg></scale></anchor>"
```

### Mysterious Voice / Narrator

A disembodied voice that feels eerie and atmospheric:

```
/eta queue @p voice "<dur:160><anchor value=MIDDLE><fade in=30 out=20><turb a=0.8><fade a=0.4 f=0.3><color value=8866AA><i>You shouldn't be here...</i></color></fade></turb></fade></anchor>" | "<dur:140><anchor value=MIDDLE><fade in=30 out=20><turb a=1.0><fade a=0.3 f=0.4><color value=6644AA><i>Turn back. While you still can.</i></color></fade></turb></fade></anchor>"
```

---

## Boss Encounters

### Boss Introduction

Two-channel approach — name plate and subtitle play simultaneously:

**Channel 1 — Boss name:**
```
/eta queue @p bossname "<dur:160><anchor value=MIDDLE><scale value=1.6><bg color=#80000000><fade in=20 out=20><neon c=FF0000 r=5 p=3.0><shake a=0.5><color value=FF2222><b>DREAD WYRM VALTHOR</b></color></shake></neon></bg></fade></scale></anchor>"
```

**Channel 2 — Subtitle:**
```
/eta queue @p bosssub "<dur:120><anchor value=MIDDLE><offset y=45><fade in=30 out=15><i><color value=CC8888>Terror of the Deep Caverns</color></i></fade></offset></anchor>"
```

### KubeJS Boss Encounter System

Manage the full boss lifecycle — intro, phase transitions, and defeat — from KubeJS:

```js title="kubejs/server_scripts/boss_encounters.js"
function bossIntro(player, bossName, subtitle, glowColor) {
  player.server.runCommandSilent(
    `eta queue ${player.username} bossname `
    + `"<dur:160><anchor value=MIDDLE><scale value=1.6><bg color=#80000000>`
    + `<fade in=20 out=20><neon c=${glowColor} r=5 p=3.0><shake a=0.5>`
    + `<color value=FF2222><b>${bossName}</b></color>`
    + `</shake></neon></fade></bg></scale></anchor>"`
  )
  player.server.runCommandSilent(
    `eta queue ${player.username} bosssub `
    + `"<dur:120><anchor value=MIDDLE><offset y=45><fade in=30 out=15>`
    + `<i><color value=CC8888>${subtitle}</color></i></fade></offset></anchor>"`
  )
}

function bossPhaseChange(player, phaseText, flavorText) {
  player.server.runCommandSilent(
    `eta queue ${player.username} bossphase `
    + `"<dur:140><anchor value=MIDDLE><scale value=1.4>`
    + `<bg color=#C0000000><fade in=20 out=15><shake a=0.8>`
    + `<neon c=880000 r=5><color value=FF0000><b>${phaseText}</b></color></neon>`
    + `</shake></fade></bg></scale></anchor>" | `
    + `"<dur:100><anchor value=MIDDLE><offset y=40><fade in=20 out=15>`
    + `<color value=FF8844><i>${flavorText}</i></color>`
    + `</fade></offset></anchor>"`
  )
}

function bossDefeat(player, bossName) {
  player.server.runCommandSilent(
    `eta queue ${player.username} bossdeath `
    + `"<dur:60><anchor value=MIDDLE><scale value=1.5><fade in=5 out=5>`
    + `<shake a=2.0 f=3.0><glitch s=0.3>`
    + `<color value=FF4444><b>DEFEATED</b></color>`
    + `</glitch></shake></fade></scale></anchor>" | `
    + `"<dur:180><anchor value=MIDDLE><scale value=1.4><fade in=30 out=30>`
    + `<bg color=#60000000><neon c=FFD700 r=4><bounce a=1.0 w=0.3>`
    + `<grad from=FFD700 to=FFAA00><b>VICTORY!</b></grad>`
    + `</bounce></neon></bg></fade></scale></anchor>" | `
    + `"<dur:140><anchor value=MIDDLE><offset y=40><fade in=20 out=20>`
    + `<color value=DDDDDD>You have slain </color>`
    + `<color value=FF4444><b>${bossName}</b></color>`
    + `</fade></offset></anchor>"`
  )
}

// Wire it up to entity death
EntityEvents.death(event => {
  let source = event.source
  if (!source || !source.player) return
  let p = source.player

  if (event.entity.type === 'minecraft:wither') {
    bossDefeat(p, 'The Wither')
  }
  if (event.entity.type === 'minecraft:ender_dragon') {
    bossDefeat(p, 'The Ender Dragon')
  }
})
```

### Boss Phase Transitions (Command Version)

```
/eta queue @p bossphase "<dur:140><anchor value=MIDDLE><scale value=1.4><bg color=#C0000000><fade in=20 out=15><shake a=0.8><neon c=880000 r=5><color value=FF0000><b>PHASE II - ENRAGED</b></color></neon></shake></bg></fade></scale></anchor>" | "<dur:100><anchor value=MIDDLE><offset y=40><fade in=20 out=15><color value=FF8844><i>The beast's fury knows no bounds.</i></color></fade></offset></anchor>"
```

---

## Gameplay Systems

### Death Screen / Respawn Message

Via command (trigger with an advancement):

```
/eta send @p 100 <anchor value=MIDDLE><fade in=30 out=20><bg color=#80000000><color value=FF4444><b>You Died</b></color><br/><color value=AAAAAA>Lost 3 levels and 12 items.</color></bg></fade></anchor>
```

See [Event-Driven Messages](#event-driven-messages) for the KubeJS `PlayerEvents.respawned` version.

### Level Up Notification

```
/eta send @p 120 <anchor value=MIDDLE><scale value=1.3><fade in=15 out=15><bg color=#60000000><neon c=44FF44 r=2><bounce a=1.0 w=0.3><b>LEVEL UP!</b></bounce></neon><br/><color value=DDDDDD>You are now level 15.</color></bg></fade></scale></anchor>
```

### Achievement / Milestone Pop-Up

```
/eta send @p 140 <anchor value=TOP_CENTER><offset y=30><bg color=#60000000><fade in=15 out=20><neon c=FFD700 r=1.5><color value=FFD700><b>Achievement Unlocked</b></color></neon><br/><color value=DDDDDD>First Dragon Kill</color></fade></bg></offset></anchor>
```

#### KubeJS Advancement Listener

```js title="kubejs/server_scripts/achievements.js"
PlayerEvents.advancement(event => {
  let p = event.player
  let title = event.advancementId.replace(/.*\//, '').replace(/_/g, ' ')

  // Capitalize words
  title = title.replace(/\b\w/g, c => c.toUpperCase())

  p.server.runCommandSilent(
    `eta send ${p.username} 140 `
    + `<anchor value=TOP_CENTER><offset y=30><bg color=#60000000><fade in=15 out=20>`
    + `<neon c=FFD700 r=1.5><color value=FFD700><b>Achievement Unlocked</b></color></neon>`
    + `<br/><color value=DDDDDD>${title}</color></fade></bg></offset></anchor>`
  )
})
```

### Status Effect Warnings

When a player enters an area with negative effects:

```
/eta send @p 80 <anchor value=MIDDLE><offset y=50><fade in=10 out=10><shake a=0.3><color value=44AA44><b>Poisoned!</b></color></shake></fade></offset></anchor>
```

```
/eta send @p 80 <anchor value=MIDDLE><offset y=50><fade in=10 out=10><glitch s=0.1><color value=8844AA><b>Withering...</b></color></glitch></fade></offset></anchor>
```

### Cooldown / Ability Ready

When an ability comes off cooldown:

```
/eta send @p 60 <anchor value=MIDDLE><offset y=40><scale value=1.1><fade in=5 out=15><neon c=00FFFF r=2><color value=00FFFF><b>Dash Ready!</b></color></neon></fade></scale></offset></anchor>
```

---

## Minigames and Events

### Round Start Announcement

```
/eta queue @a round "<dur:40><anchor value=MIDDLE><scale value=2.0><fade in=5 out=5><bg color=#80000000><color value=FFDD44><b>Round 3</b></color></bg></fade></scale></anchor>" | "<dur:60><anchor value=MIDDLE><scale value=1.2><fade in=10 out=10><typewriter speed=30><color value=DDDDDD>Capture the flag in the Nether Arena!</color></typewriter></fade></scale></anchor>"
```

### Team Assignment

```
/eta send @p[tag=red_team] 100 <anchor value=MIDDLE><fade in=15 out=15><bg color=#60440000><color value=FF4444><b>You are on RED TEAM</b></color></bg></fade></anchor>
```

```
/eta send @p[tag=blue_team] 100 <anchor value=MIDDLE><fade in=15 out=15><bg color=#60000044><color value=4488FF><b>You are on BLUE TEAM</b></color></bg></fade></anchor>
```

### KubeJS Minigame Controller

```js title="kubejs/server_scripts/minigame.js"
function startRound(server, roundNumber, description) {
  // Countdown
  server.runCommandSilent(
    `eta queue @a countdown `
    + `"<dur:20><anchor value=MIDDLE><scale value=2.5><pulse f=4.0>`
    + `<color value=FF4444><b>3</b></color></pulse></scale></anchor>" | `
    + `"<dur:20><anchor value=MIDDLE><scale value=2.5><pulse f=4.0>`
    + `<color value=FFAA44><b>2</b></color></pulse></scale></anchor>" | `
    + `"<dur:20><anchor value=MIDDLE><scale value=2.5><pulse f=4.0>`
    + `<color value=44FF44><b>1</b></color></pulse></scale></anchor>" | `
    + `"<dur:40><anchor value=MIDDLE><scale value=2.0><fade in=5 out=5>`
    + `<bg color=#80000000><color value=FFDD44><b>Round ${roundNumber}</b></color>`
    + `</bg></fade></scale></anchor>" | `
    + `"<dur:60><anchor value=MIDDLE><scale value=1.2><fade in=10 out=10>`
    + `<typewriter speed=30><color value=DDDDDD>${description}</color></typewriter>`
    + `</fade></scale></anchor>"`
  )
}

function announceKill(server, killerName, killerColor, victimName, victimColor) {
  server.runCommandSilent(
    `eta send @a 80 `
    + `<anchor value=TOP_CENTER><offset y=40><bg color=#50000000>`
    + `<color value=${killerColor}>${killerName}</color> `
    + `<color value=AAAAAA>eliminated</color> `
    + `<color value=${victimColor}>${victimName}</color></bg></offset></anchor>`
  )
}

function gameOver(server, winnerName) {
  server.runCommandSilent(
    `eta queue @a gameover `
    + `"<dur:100><anchor value=MIDDLE><scale value=1.5><fade in=20 out=20>`
    + `<bg color=#80000000><neon c=FFD700 r=4><rainbow><b>GAME OVER!</b></rainbow></neon>`
    + `</bg></fade></scale></anchor>" | `
    + `"<dur:160><anchor value=MIDDLE><offset y=40><fade in=15 out=15>`
    + `<bg color=#60000000><color value=FFD700><b>Winner: </b></color>`
    + `<color value=44FF44>${winnerName}</color></bg></fade></offset></anchor>"`
  )
}
```

### Score / Kill Feed (Command Version)

```
/eta send @a 80 <anchor value=TOP_CENTER><offset y=40><bg color=#50000000><color value=FF4444>Steve</color> <color value=AAAAAA>eliminated</color> <color value=4488FF>Alex</color></bg></offset></anchor>
```

---

## Persistent HUD Elements

### Mana / Energy Bar (Text-Based)

Use a long-duration queue on a dedicated channel, cleared and resent when the value changes:

```
/eta stopqueue @p mana
/eta queue @p mana "<dur:6000><anchor value=BOTTOM_LEFT><offset x=10 y=-30><bg color=#40000044><color value=4488FF><b>Mana:</b> |||||||||| 100%</color></bg></offset></anchor>"
```

When mana decreases:
```
/eta stopqueue @p mana
/eta queue @p mana "<dur:6000><anchor value=BOTTOM_LEFT><offset x=10 y=-30><bg color=#40000044><color value=4488FF><b>Mana:</b> ||||||</color><color value=333344>|||| 60%</color></bg></offset></anchor>"
```

#### KubeJS Dynamic HUD

```js title="kubejs/server_scripts/hud.js"
// Generic HUD update function
function updateHUD(player, channel, anchor, markup) {
  player.server.runCommandSilent(
    `eta stopqueue ${player.username} ${channel}`
  )
  player.server.runCommandSilent(
    `eta queue ${player.username} ${channel} `
    + `"<dur:6000><anchor value=${anchor}>${markup}</anchor>"`
  )
}

// Mana bar using filled/empty blocks
function updateManaBar(player, current, max) {
  let pct = Math.floor((current / max) * 10)
  let filled = '|'.repeat(pct)
  let empty = '|'.repeat(10 - pct)
  let percent = Math.floor((current / max) * 100)

  updateHUD(player, 'mana', 'BOTTOM_LEFT',
    `<offset x=10 y=-30><bg color=#40000044>`
    + `<color value=4488FF><b>Mana:</b> ${filled}</color>`
    + `<color value=333344>${empty} ${percent}%</color></bg></offset>`
  )
}

// Zone display
function updateZoneDisplay(player, zoneName, dangerLevel, dangerColor) {
  updateHUD(player, 'zone', 'TOP_LEFT',
    `<offset x=10 y=10><bg color=#40000000>`
    + `<color value=888888>${zoneName}</color><br/>`
    + `<color value=666666>Danger: </color>`
    + `<color value=${dangerColor}>${dangerLevel}</color></bg></offset>`
  )
}
```

### Compass / Direction Indicator

```
/eta stopqueue @p compass
/eta queue @p compass "<dur:6000><anchor value=TOP_CENTER><offset y=5><bg color=#40000000><color value=AAAAAA>W --- </color><color value=FF4444><b>N</b></color><color value=AAAAAA> --- E</color></bg></offset></anchor>"
```

### Zone / Location Display

```
/eta stopqueue @p zone
/eta queue @p zone "<dur:6000><anchor value=TOP_LEFT><offset x=10 y=10><bg color=#40000000><color value=888888>Darkwood Forest</color><br/><color value=666666>Danger Level: <color value=FFAA44>Medium</color></color></bg></offset></anchor>"
```

---

## Tips for Modpack Integration

### Triggering Commands

ETA commands can be triggered from many sources:

| Trigger | How |
|---|---|
| **Command blocks** | Place and power with redstone — great for area triggers |
| **Datapacks (functions)** | Put commands in `.mcfunction` files for reusable sequences |
| **Advancements** | Use advancement rewards to trigger on specific player actions |
| **FTB Quests** | Use command rewards in quest completions |
| **KubeJS** | React to any game event with full scripting logic — the most flexible option |
| **Scheduled tasks** | Use server mods, KubeJS `scheduleInTicks`, or plugins to run commands on timers |
| **Player join** | Use KubeJS `PlayerEvents.loggedIn`, advancements, or a join detection system |

### Datapack Functions

Organize complex sequences into datapack functions for reusability:

```mcfunction title="data/mypack/functions/boss/valthor_intro.mcfunction"
eta queue @s bossname "<dur:160><anchor value=MIDDLE><scale value=1.6><bg color=#80000000><fade in=20 out=20><neon c=FF0000 r=5 p=3.0><shake a=0.5><color value=FF2222><b>DREAD WYRM VALTHOR</b></color></shake></neon></bg></fade></scale></anchor>"
eta queue @s bosssub "<dur:120><anchor value=MIDDLE><offset y=45><fade in=30 out=15><i><color value=CC8888>Terror of the Deep Caverns</color></i></fade></offset></anchor>"
```

Then call it with:
```
/function mypack:boss/valthor_intro
```

### When to Use KubeJS vs. Commands

| Use Case | Best Approach |
|---|---|
| Static area triggers | Command blocks or datapacks |
| Player-specific events (join, death, advancement) | KubeJS |
| Dynamic content (scores, progress, names) | KubeJS |
| Multi-step sequences with fixed content | Datapacks (`.mcfunction`) |
| Conditional logic (if player has item, tag, etc.) | KubeJS or command selectors |
| Timed/scheduled messages | KubeJS `scheduleInTicks` |
| Item name/lore modifications | KubeJS or lang files |
| Reacting to mod-specific events | KubeJS |

### Cleanup on Death / Disconnect

Always clean up persistent HUD elements when a player dies or leaves an area.

**Datapack version:**
```mcfunction title="data/mypack/functions/cleanup/clear_all_hud.mcfunction"
eta closeall @s
```

**KubeJS version:**
```js title="kubejs/server_scripts/cleanup.js"
PlayerEvents.loggedOut(event => {
  event.server.runCommandSilent(
    `eta closeall ${event.player.username}`
  )
})

PlayerEvents.respawned(event => {
  // Clear HUD elements that don't make sense after death
  let p = event.player
  p.server.runCommandSilent(`eta stopqueue ${p.username} questhud`)
  p.server.runCommandSilent(`eta stopqueue ${p.username} mana`)
  p.server.runCommandSilent(`eta stopqueue ${p.username} zone`)
})
```

### Performance Considerations

- **Neon glow** is the most expensive effect. Use `q=1` for long-duration HUD elements, or avoid neon on persistent displays entirely.
- **Persistent HUDs** (long `<dur:N>`) are fine, but don't stack too many channels simultaneously.
- Keep queue steps reasonable — the default `maxQueueSize` is 50 steps per channel.
- Players can cap neon quality with `maxNeonQuality` in their client config if they have performance concerns.
- When updating HUDs frequently from KubeJS, avoid updating more than once per second — the visual difference is negligible and it reduces network traffic.
