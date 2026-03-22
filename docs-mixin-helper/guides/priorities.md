---
sidebar_position: 2
---

# Priority Control

Mixin priorities control the order in which mixins are applied to their target classes. Mixin Helper lets you override these priorities without modifying the original mods.

## How Priorities Work

The Mixin framework applies mixins in priority order — **higher priority numbers execute first**. The default priority for all mixin configs is `1000`.

When two mods modify the same method in the same class, the one with higher priority is applied first. This can determine which mod's behavior "wins" or whether the two changes are compatible.

---

## Mixin Config Priorities

Override the priority of an entire mixin config file. This affects all mixins registered by that config.

### Configuration

```json
"priorities": {
  "mixinConfigPriorities": {
    "importantmod.mixins.json": 2000,
    "lessimportantmod.mixins.json": 500
  }
}
```

### Example: Resolving a Conflict

Two mods both `@Redirect` the same method in `LevelRenderer`. Because `@Redirect` can only be applied once, only the first one wins.

**Problem:** Mod A should win, but Mod B happens to load first.

**Solution:** Raise Mod A's priority above Mod B's:

```json
"priorities": {
  "mixinConfigPriorities": {
    "moda.mixins.json": 1500
  }
}
```

Since Mod B uses the default priority of `1000`, Mod A's priority of `1500` ensures it applies first.

---

## Individual Mixin Priorities

Override the priority of a specific mixin class for more granular control.

### Configuration

```json
"priorities": {
  "mixinPriorities": {
    "com.moda.mixin.MixinLevelRenderer": 2000,
    "com.modb.mixin.MixinLevelRenderer": 500
  }
}
```

### When to Use

- Two specific mixins conflict, but you don't want to change the priority of their entire configs
- One mod has multiple mixin configs and only one mixin needs reordering
- You need precise control over which mixin applies first to a specific class

---

## Combining Config and Mixin Priorities

Individual mixin priorities take precedence over config-level priorities. You can use both:

```json
"priorities": {
  "mixinConfigPriorities": {
    "moda.mixins.json": 1500
  },
  "mixinPriorities": {
    "com.moda.mixin.MixinException": 500
  }
}
```

In this example, all of Mod A's mixins run at priority `1500`, except `MixinException` which runs at `500`.

---

## Priority Reference

| Priority | Meaning |
|----------|---------|
| `2000+` | Very high — applies before most other mixins |
| `1500` | High — above default |
| `1000` | Default — standard mixin priority |
| `500` | Low — applies after most other mixins |
| `0` | Very low — applies last |

:::tip
You don't need to set priorities for every mod. Only adjust priorities for mods that are actively conflicting.
:::

---

## Diagnosing Priority Issues

Symptoms that suggest a priority conflict:

- **Crash on startup** mentioning `@Redirect` or `@Overwrite` conflicts
- **Feature not working** from one mod when another mod is installed
- **Inconsistent behavior** depending on mod load order

To diagnose:

1. Check the crash log for mixin-related errors
2. Enable the [audit log](audit-log.md) to see which mixins target the same class
3. Look for `@Redirect` or `@Overwrite` annotations — these are most likely to conflict
4. Adjust priorities so the desired mod's mixin applies first

---

## Next Steps

- [Blacklisting Guide](blacklisting.md) — Disable mixins entirely instead of reordering
- [Method Removal Guide](method-removal.md) — Remove specific injected methods
- [Configuration Reference](../configuration.md) — Full config documentation
