---
sidebar_position: 5
---

# Examples

Real-world modpack scenarios showing how to use Mixin Helper to resolve common problems.

## 1. Fix a Mod Conflict by Blacklisting a Mixin

**Scenario:** Mod A and Mod B both modify `LevelRenderer` and crash on startup with a `MixinApplyError`.

**Diagnosis:** The crash log mentions `com.modb.mixin.MixinLevelRenderer` conflicting with Mod A's changes.

**Solution:** Blacklist Mod B's specific mixin:

```json
{
  "enabled": true,
  "blacklist": {
    "mixins": [
      "com.modb.mixin.MixinLevelRenderer"
    ],
    "mixinConfigs": [],
    "targetClasses": []
  }
}
```

:::tip
This preserves all of Mod B's other features — only the conflicting mixin is disabled.
:::

---

## 2. Disable All of a Mod's Mixins

**Scenario:** A mod adds behavior changes you don't want in your modpack, but you still want its items and blocks.

**Solution:** Blacklist the entire mixin config:

```json
{
  "blacklist": {
    "mixins": [],
    "mixinConfigs": [
      "unwantedmod.mixins.json",
      "unwantedmod.client.mixins.json"
    ],
    "targetClasses": []
  }
}
```

:::note
Some mods split their mixins into multiple config files (e.g., `modid.mixins.json` and `modid.client.mixins.json`). Check the audit report to find all configs for a given mod.
:::

---

## 3. Protect a Class from All Mixin Modifications

**Scenario:** `MinecraftServer` is being modified by several mods and your server is unstable. You want to isolate the problem.

**Solution:** Blacklist the target class:

```json
{
  "blacklist": {
    "mixins": [],
    "mixinConfigs": [],
    "targetClasses": [
      "net.minecraft.server.MinecraftServer"
    ]
  }
}
```

If the server stabilizes, you know one of the mixins targeting `MinecraftServer` is the problem. You can then use the audit report to identify which one and switch to individual mixin blacklisting.

---

## 4. Resolve a Mixin Load-Order Conflict

**Scenario:** Two mods both `@Inject` into the same method. Mod A's injection needs to run before Mod B's, but Mod B happens to load first.

**Solution:** Raise Mod A's priority:

```json
{
  "priorities": {
    "mixinConfigPriorities": {
      "moda.mixins.json": 1500
    }
  }
}
```

Mod B keeps its default priority of `1000`, so Mod A now executes first.

---

## 5. Silence a Broken Injected Method

**Scenario:** A mod injects a method that throws `NullPointerException` under certain conditions. You don't want to remove the entire mixin because it does other useful things.

**Solution:** Use `nop` to neutralize just that method:

```json
{
  "methodRemovals": {
    "rules": [
      {
        "targetClass": "net.minecraft.world.entity.player.Player",
        "method": "brokenInjectedMethod",
        "action": "nop"
      }
    ]
  }
}
```

The method still exists (so nothing crashes trying to call it), but its body is replaced with a no-op.

---

## 6. Strip Multiple Related Methods with Regex

**Scenario:** A mod injects several rendering methods into `Screen` that cause visual glitches. The methods are all named `customOverlay`, `customOverlayBackground`, `customOverlayBorder`, etc.

**Solution:** Use a regex pattern to match all of them:

```json
{
  "methodRemovals": {
    "rules": [
      {
        "targetClass": "net.minecraft.client.gui.screens.Screen",
        "methodPattern": "customOverlay.*",
        "action": "nop"
      }
    ]
  }
}
```

---

## 7. Guardrails: Protecting Critical Classes

**Scenario:** You accidentally added `net.minecraft.world.level.chunk.PalettedContainer` to `blacklist.targetClasses` and it would have corrupted your world.

**What happens:** Mixin Helper's guardrails detect the protected class and block the operation:

```
[MixinHelper] GUARDRAIL BLOCKED: Blocking all mixins targeting class via blacklist.targetClasses
[MixinHelper]   Class: net.minecraft.world.level.chunk.PalettedContainer
[MixinHelper]   Category: PALETTE
[MixinHelper]   Reason: Modifying palette classes can corrupt chunk data and crash the JVM
```

**If you genuinely need to bypass it** (e.g., you know what you're doing and have backups):

```json
{
  "guardrails": {
    "bypassProtectedClasses": true
  }
}
```

Or to exclude just one specific class while keeping other protections:

```json
{
  "guardrails": {
    "bypassProtectedClasses": true,
    "excludeFromProtection": [
      "net.minecraft.world.level.chunk.PalettedContainer"
    ]
  }
}
```

---

## 8. Full Modpack Config Example

A comprehensive config for a modpack with several known conflicts:

```json
{
  "enabled": true,
  "blacklist": {
    "mixins": [
      "com.moda.mixin.MixinLevelRenderer",
      "com.modb.mixin.MixinServerLevel"
    ],
    "mixinConfigs": [
      "brokenmod.mixins.json"
    ],
    "targetClasses": []
  },
  "priorities": {
    "mixinConfigPriorities": {
      "importantmod.mixins.json": 1500,
      "performancemod.mixins.json": 1800
    },
    "mixinPriorities": {}
  },
  "methodRemovals": {
    "rules": [
      {
        "targetClass": "net.minecraft.world.entity.player.Player",
        "method": "overrideMovement",
        "action": "nop"
      }
    ]
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
  },
  "guardrails": {
    "enabled": true,
    "bypassProtectedClasses": false,
    "additionalProtectedPatterns": [],
    "excludeFromProtection": []
  }
}
```

---

## Debugging Workflow

When you encounter a mixin-related issue, follow this workflow:

1. **Enable the audit log** and set `debug.verbose` to `true`
2. **Launch the game** and reproduce the issue (or check the crash log)
3. **Read the audit report** to identify which mixins target the problematic class
4. **Check annotations** — `@Redirect` and `@Overwrite` are the most likely conflict sources
5. **Try the least invasive fix first:**
   - Adjust priorities → if it's a load-order issue
   - `nop` a method → if one specific injection is the problem
   - Blacklist a mixin → if the entire mixin is problematic
   - Blacklist a config → if the mod's mixins are broadly incompatible
6. **Restart and test** — repeat until stable

