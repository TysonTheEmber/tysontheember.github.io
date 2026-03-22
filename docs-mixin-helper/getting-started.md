---
sidebar_position: 2
---

# Getting Started

## Installation

1. Download Mixin Helper for your mod loader and Minecraft version
2. Place the `.jar` file in your `mods/` folder
3. Launch the game

On first launch, Mixin Helper automatically generates a default config file at:

```
config/mixinhelper.json
```

:::tip
No other mods are required. Mixin Helper has zero dependencies beyond the Mixin framework that ships with every mod loader.
:::

## Config File Location

The config file is always located in the game's `config/` directory, regardless of mod loader:

| Launcher | Typical Path |
|----------|-------------|
| CurseForge | `.minecraft/config/mixinhelper.json` |
| Prism / MultiMC | `instances/<name>/.minecraft/config/mixinhelper.json` |
| Server | `config/mixinhelper.json` (relative to server root) |

---

## Quick Start: Blacklist a Mixin

Here's how to disable a problematic mixin in three steps:

### Step 1: Enable the Audit Log

Edit `config/mixinhelper.json` and make sure the audit section is enabled:

```json
"audit": {
  "enabled": true,
  "outputFile": "config/mixinhelper-report.json",
  "includeAnnotations": true
}
```

### Step 2: Find the Mixin Class Name

Launch the game, then open `config/mixinhelper-report.json`. Search for the mod or class you're investigating. The report lists every loaded mixin config with its mixins:

```json
{
  "name": "examplemod.mixins.json",
  "packageName": "com.example.examplemod.mixin",
  "mixins": [
    {
      "className": "com.example.examplemod.mixin.MixinLevelRenderer",
      "side": "common"
    },
    {
      "className": "com.example.examplemod.mixin.MixinPlayerEntity",
      "side": "common"
    }
  ]
}
```

### Step 3: Add It to the Blacklist

Copy the fully qualified mixin class name into the blacklist:

```json
"blacklist": {
  "mixins": [
    "com.example.examplemod.mixin.MixinLevelRenderer"
  ],
  "mixinConfigs": [],
  "targetClasses": []
}
```

Relaunch the game. The mixin will no longer be applied.

:::note
Changes to `mixinhelper.json` require a full game restart to take effect. Mixins are loaded very early in the startup process.
:::

---

## Default Configuration

Here is the complete default config generated on first launch:

```json
{
  "enabled": true,
  "blacklist": {
    "mixins": [],
    "mixinConfigs": [],
    "targetClasses": []
  },
  "priorities": {
    "mixinConfigPriorities": {},
    "mixinPriorities": {}
  },
  "methodRemovals": {
    "rules": []
  },
  "audit": {
    "enabled": true,
    "outputFile": "config/mixinhelper-report.json",
    "includeAnnotations": true
  },
  "debug": {
    "verbose": false,
    "logBlacklistActions": true,
    "logMethodRemovals": true
  }
}
```

---

## Next Steps

- [Configuration Reference](configuration.md) — Detailed documentation for every config option
- [Blacklisting Guide](guides/blacklisting.md) — Learn all three levels of mixin blacklisting
- [Audit Log Guide](guides/audit-log.md) — Get the most out of the audit report
