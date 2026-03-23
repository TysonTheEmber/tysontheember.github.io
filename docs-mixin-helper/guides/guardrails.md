---
sidebar_position: 4
---

# Guardrails

Mixin Helper includes a guardrails system that prevents accidental modifications to classes critical to game stability. Modifying mixin loading order or disabling mixins on these classes — even briefly — can corrupt world data, crash the JVM, or cause deadlocks.

## Why Guardrails Exist

Certain Minecraft classes are inherently dangerous to interfere with via mixin manipulation:

- **Chunk generation classes** — Changing mixin loading order or blocking mixins targeting these classes can corrupt world generation, producing broken chunks or unrecoverable world states.
- **Palette container classes** — These handle compressed block state storage. Any interference can cause `MissingPaletteEntryException` errors, chunk data corruption, or JVM crashes.
- **Threading classes** — Modifications to event loops and tick tasks can cause deadlocks that freeze the game.
- **World persistence classes** — Interfering with NBT serialization or level storage can permanently corrupt save files.
- **Mixin system internals** — Modifying the mixin framework itself causes cascade failures.
- **JVM internals** — Touching class loaders or `sun.misc.Unsafe` can crash the JVM without meaningful error output.

## How It Works

When guardrails are enabled (the default), Mixin Helper checks every operation against a list of protected class patterns before executing it. Protected operations include:

- **Target-class blacklisting** — Attempting to block all mixins targeting a protected class via `blacklist.targetClasses`
- **Method removal/nop** — Attempting to strip or nop methods on a protected class via `methodRemovals.rules`

If a protected class is detected, the operation is **blocked** and an error is logged explaining why:

```
[MixinHelper] GUARDRAIL BLOCKED: Blocking all mixins targeting class via blacklist.targetClasses
[MixinHelper]   Class: net.minecraft.world.level.chunk.PalettedContainer
[MixinHelper]   Category: PALETTE
[MixinHelper]   Reason: Modifying palette classes can corrupt chunk data and crash the JVM
```

The config is also validated at startup, so you'll see warnings immediately if your config references protected classes.

## Protected Classes

| Category | Protected Prefixes | Risk |
|----------|-------------------|------|
| **Chunk Generation** | `ChunkGenerator`, `NoiseBasedChunkGenerator`, `WorldGenRegion`, `LevelChunk`, `ChunkStatus` | World corruption |
| **Palette Containers** | `PalettedContainer`, `LinearPalette`, `HashMapPalette`, `Palette` | Chunk corruption, JVM crash |
| **Mixin System** | `org.spongepowered.asm.*` | Cascade failures |
| **JVM Internals** | `java.lang.ClassLoader`, `sun.misc.Unsafe`, `jdk.internal.*` | JVM crash |
| **Threading** | `BlockableEventLoop`, `TickTask` | Deadlocks |
| **World Persistence** | `LevelStorageSource`, `net.minecraft.nbt.*`, `LevelData` | Save corruption |

All matching uses prefix comparison, so inner classes and subclasses are also protected (e.g., `PalettedContainer$1`).

## Configuration

```json
"guardrails": {
  "enabled": true,
  "bypassProtectedClasses": false,
  "additionalProtectedPatterns": [],
  "excludeFromProtection": []
}
```

### Disabling Guardrails

Set `enabled` to `false` to turn off all guardrail checks. This removes all protection.

```json
"guardrails": {
  "enabled": false
}
```

:::danger
Disabling guardrails removes all safety checks. You accept full responsibility for any world corruption or crashes that result.
:::

### Bypassing Protection

If you understand the risks and need to operate on a protected class, enable `bypassProtectedClasses`:

```json
"guardrails": {
  "bypassProtectedClasses": true
}
```

Operations will proceed with loud warnings in the log instead of being blocked.

### Adding Custom Protected Classes

Add your own class prefixes to protect:

```json
"guardrails": {
  "additionalProtectedPatterns": [
    "com.example.criticalmod.core.",
    "net.minecraft.world.level.biome.Biome"
  ]
}
```

### Selectively Unprotecting a Class

If you need to operate on one specific protected class but want to keep all other protections, use `excludeFromProtection` together with `bypassProtectedClasses`:

```json
"guardrails": {
  "bypassProtectedClasses": true,
  "excludeFromProtection": [
    "net.minecraft.world.level.chunk.LevelChunk"
  ]
}
```

This allows operations on `LevelChunk` specifically while still protecting all other classes. Note that `bypassProtectedClasses` must be `true` for exclusions to take effect.

---

## Troubleshooting

### "GUARDRAIL BLOCKED" in the log

Your config targets a protected class. Options:

1. **Remove the entry** from your config (recommended)
2. **Set `bypassProtectedClasses` to `true`** if you understand the risks
3. **Set `guardrails.enabled` to `false`** to disable all checks (not recommended)

### Config validation warnings at startup

These are non-blocking warnings telling you that your config references protected classes. The actual operations will be blocked at runtime unless bypass is enabled.

