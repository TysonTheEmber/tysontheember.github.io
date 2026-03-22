---
sidebar_position: 3
---

# Configuration Reference

Complete reference for all options in `config/mixinhelper.json`.

## Overview

All configuration is done through a single JSON file at `config/mixinhelper.json`. The file is auto-generated with defaults on first launch. Changes require a full game restart.

:::tip JSON Validation
If the game ignores your config changes, check for JSON syntax errors. A misplaced comma or missing bracket will cause the file to fail silently, falling back to defaults.
:::

---

## enabled

Master toggle for the entire mod.

**Type:** Boolean
**Default:** `true`

```json
"enabled": true
```

Set to `false` to disable all Mixin Helper functionality without removing the mod.

---

## blacklist

Controls which mixins are prevented from loading. Three independent blacklist mechanisms are available.

### blacklist.mixins

Blacklist individual mixin classes by their fully qualified class name.

**Type:** String array
**Default:** `[]`

```json
"blacklist": {
  "mixins": [
    "com.example.mod.mixin.MixinLevelRenderer",
    "com.example.mod.mixin.MixinPlayerEntity"
  ]
}
```

:::tip Finding Mixin Class Names
Use the [audit log](guides/audit-log.md) to discover the fully qualified class names of all loaded mixins.
:::

---

### blacklist.mixinConfigs

Blacklist entire mixin configuration files. This disables all mixins registered by that config.

**Type:** String array
**Default:** `[]`

```json
"blacklist": {
  "mixinConfigs": [
    "examplemod.mixins.json",
    "anothermod.mixins.json"
  ]
}
```

The config name is the filename of the mixin JSON config (e.g., `modid.mixins.json`). Check the audit report for exact names.

---

### blacklist.targetClasses

Prevent any mixin from applying to specific target classes. This blocks all mixins that target the listed classes, regardless of which mod they come from.

**Type:** String array
**Default:** `[]`

```json
"blacklist": {
  "targetClasses": [
    "net.minecraft.world.level.Level",
    "net.minecraft.server.MinecraftServer"
  ]
}
```

:::warning
Target class blacklisting affects all mods. If two mods mixin into the same class and you blacklist that target, both mods' mixins to that class will be blocked.
:::

---

## priorities

Override the execution order of mixins.

### priorities.mixinConfigPriorities

Set the priority of entire mixin config files. Higher values mean earlier execution.

**Type:** Object (string key to integer value)
**Default:** `{}`

```json
"priorities": {
  "mixinConfigPriorities": {
    "importantmod.mixins.json": 2000,
    "lessimportantmod.mixins.json": 500
  }
}
```

The default mixin priority is `1000`. Values above `1000` execute earlier; values below execute later.

---

### priorities.mixinPriorities

Set the priority of individual mixin classes.

**Type:** Object (string key to integer value)
**Default:** `{}`

```json
"priorities": {
  "mixinPriorities": {
    "com.example.mod.mixin.MixinCriticalFix": 2000,
    "com.other.mod.mixin.MixinConflicting": 500
  }
}
```

---

## methodRemovals

Surgically remove or neutralize methods from target classes after mixins have been applied.

### methodRemovals.rules

An array of rules, each defining a method to remove or disable.

**Type:** Array of rule objects
**Default:** `[]`

Each rule has the following fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `targetClass` | String | Yes | Fully qualified name of the class containing the method |
| `method` | String | No* | Exact method name to match |
| `methodPattern` | String | No* | Regex pattern to match method names |
| `descriptor` | String | No | Method descriptor for exact matching (e.g., `()V`) |
| `action` | String | Yes | `"nop"` or `"remove"` |

*One of `method` or `methodPattern` is required.

#### Actions

- **`nop`** — Replaces the method body with a default return value. The method still exists but does nothing. This is the safer option.
- **`remove`** — Deletes the method entirely from the class. Use with caution.

:::warning
The `remove` action can cause `NoSuchMethodError` if other code calls the removed method. Prefer `nop` unless you are certain the method is not called.
:::

#### Example: Exact Method Match

```json
"methodRemovals": {
  "rules": [
    {
      "targetClass": "net.minecraft.world.level.Level",
      "method": "tickPlayers",
      "action": "nop"
    }
  ]
}
```

#### Example: Method with Descriptor

```json
"methodRemovals": {
  "rules": [
    {
      "targetClass": "net.minecraft.world.level.Level",
      "method": "tickPlayers",
      "descriptor": "()V",
      "action": "nop"
    }
  ]
}
```

#### Example: Regex Pattern

```json
"methodRemovals": {
  "rules": [
    {
      "targetClass": "net.minecraft.client.gui.screens.Screen",
      "methodPattern": "render.*",
      "action": "remove"
    }
  ]
}
```

---

## audit

Controls the mixin audit report that catalogs all loaded mixin configs and their contents.

### audit.enabled

Toggle audit report generation.

**Type:** Boolean
**Default:** `true`

```json
"audit": {
  "enabled": true
}
```

---

### audit.outputFile

Path for the audit report file, relative to the game directory.

**Type:** String
**Default:** `"config/mixinhelper-report.json"`

```json
"audit": {
  "outputFile": "config/mixinhelper-report.json"
}
```

---

### audit.includeAnnotations

Whether to scan mixin classes for their annotations (e.g., `@Inject`, `@Redirect`, `@Overwrite`).

**Type:** Boolean
**Default:** `true`

```json
"audit": {
  "includeAnnotations": true
}
```

When enabled, the report includes which Mixin annotations each mixin class uses. Detected annotations include:

- `@Inject`, `@Redirect`, `@Overwrite`
- `@ModifyArg`, `@ModifyArgs`, `@ModifyVariable`, `@ModifyConstant`
- `@Accessor`, `@Invoker`
- `@ModifyExpressionValue`, `@ModifyReturnValue`, `@ModifyReceiver`
- `@WrapOperation`, `@WrapWithCondition`

:::tip
Annotation scanning helps identify what a mixin does before you decide whether to blacklist it.
:::

---

## debug

Controls debug logging output.

### debug.verbose

Enable verbose logging for all Mixin Helper operations.

**Type:** Boolean
**Default:** `false`

```json
"debug": {
  "verbose": false
}
```

---

### debug.logBlacklistActions

Log each mixin that gets blacklisted.

**Type:** Boolean
**Default:** `true`

```json
"debug": {
  "logBlacklistActions": true
}
```

---

### debug.logMethodRemovals

Log each method removal or nop action.

**Type:** Boolean
**Default:** `true`

```json
"debug": {
  "logMethodRemovals": true
}
```

---

## Complete Default Config

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

- [Blacklisting Guide](guides/blacklisting.md) — Detailed guide for each blacklist level
- [Priority Control Guide](guides/priorities.md) — Resolve mixin ordering conflicts
- [Method Removal Guide](guides/method-removal.md) — Safely neutralize injected methods
- [Examples](examples.md) — Real-world modpack scenarios
