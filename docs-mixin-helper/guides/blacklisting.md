---
sidebar_position: 1
---

# Mixin Blacklisting

Mixin Helper provides three levels of blacklisting, each suited for different situations. All blacklisting is configured in the `blacklist` section of `config/mixinhelper.json`.

## Overview

| Level | What It Blocks | When to Use |
|-------|---------------|-------------|
| **Individual Mixins** | A single mixin class | You know exactly which mixin causes the problem |
| **Mixin Configs** | All mixins from a config file | You want to disable an entire mod's mixins |
| **Target Classes** | All mixins targeting a class | You want to protect a specific Minecraft class |

---

## Individual Mixin Blacklisting

Block a specific mixin class by its fully qualified name.

### Configuration

```json
"blacklist": {
  "mixins": [
    "com.example.mod.mixin.MixinLevelRenderer"
  ]
}
```

### How to Find the Mixin Class Name

1. Enable the [audit log](audit-log.md)
2. Launch the game
3. Open `config/mixinhelper-report.json`
4. Search for the mod name or the target class you're investigating
5. Copy the fully qualified class name from the report

### When to Use

- A specific mixin from one mod conflicts with another mod
- You want to disable a single feature without removing the entire mod
- You've identified the exact mixin causing a crash or bug

---

## Mixin Config Blacklisting

Block all mixins registered by an entire mixin config file. Most mods have one or two config files (e.g., `modid.mixins.json`, `modid.client.mixins.json`).

### Configuration

```json
"blacklist": {
  "mixinConfigs": [
    "examplemod.mixins.json"
  ]
}
```

### How to Find Config Names

The audit report lists every loaded mixin config by name:

```json
{
  "name": "examplemod.mixins.json",
  "packageName": "com.example.examplemod.mixin",
  "priority": 1000,
  "mixins": [
    {"className": "com.example.examplemod.mixin.MixinOne", "side": "common"},
    {"className": "com.example.examplemod.mixin.MixinTwo", "side": "common"},
    {"className": "com.example.examplemod.mixin.MixinThree", "side": "client"}
  ]
}
```

The `name` field is what you add to the blacklist.

### When to Use

- A mod's mixins are broadly incompatible with your modpack
- You want to disable all of a mod's behavior modifications at once
- The mod has many mixins and blacklisting them individually would be tedious

:::note
Blacklisting a mixin config does not uninstall the mod. The mod's other features (items, blocks, etc.) will still load — only its mixin-based behavior modifications are disabled.
:::

---

## Target Class Blacklisting

Prevent any mixin — from any mod — from applying to specific Minecraft classes.

### Configuration

```json
"blacklist": {
  "targetClasses": [
    "net.minecraft.world.level.Level",
    "net.minecraft.client.renderer.LevelRenderer"
  ]
}
```

### When to Use

- Multiple mods conflict when they all mixin into the same class
- You want to protect a vanilla class from all modifications
- You're debugging which class is causing instability

:::warning Broad Impact
Target class blacklisting affects **all** mods. If Mod A and Mod B both mixin into `Level`, blacklisting `Level` blocks both. For finer control, use individual mixin blacklisting instead.
:::

---

## Combining Blacklists

All three blacklist levels work together. You can use them in any combination:

```json
"blacklist": {
  "mixins": [
    "com.moda.mixin.MixinSpecificProblem"
  ],
  "mixinConfigs": [
    "problematicmod.mixins.json"
  ],
  "targetClasses": [
    "net.minecraft.world.level.Level"
  ]
}
```

A mixin is blocked if it matches **any** of the three blacklists.

---

## Verifying Blacklists

To confirm your blacklist is working:

1. Set `debug.logBlacklistActions` to `true` (it's on by default)
2. Launch the game
3. Check the game log for `[MixinHelper]` messages confirming each blacklisted mixin

```
[MixinHelper] Blacklisted mixin: com.moda.mixin.MixinSpecificProblem
[MixinHelper] Blacklisted mixin config: problematicmod.mixins.json
```

---

## Next Steps

- [Priority Control](priorities.md) — Override mixin execution order instead of blacklisting
- [Audit Log](audit-log.md) — Learn how to read the audit report to find mixin names
- [Configuration Reference](../configuration.md) — Full config documentation
