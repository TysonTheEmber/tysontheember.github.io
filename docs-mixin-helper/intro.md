---
sidebar_position: 1
---

# Mixin Helper

Mixin Helper is a utility mod for modpack developers that provides complete control over mixin behavior from any loaded mod. Blacklist conflicting mixins, override priorities, surgically remove injected methods, and generate detailed audit reports — all from a single JSON config file.

## Key Features

| Feature | Description |
|---------|-------------|
| **Mixin Blacklisting** | Disable individual mixins, entire mixin configs, or block mixins from targeting specific classes |
| **Priority Control** | Override mixin execution order to resolve load-order conflicts |
| **Method Removal** | Surgically remove or neutralize methods injected by other mods |
| **Audit Logging** | Generate a comprehensive JSON report of all loaded mixins and their annotations |

## Supported Platforms

| Loader | Minecraft Version | Status |
|--------|-------------------|--------|
| Forge | 1.20.1 | Supported |
| Fabric | 1.20.1 | Supported |
| Fabric | 1.21.1 | Supported |
| NeoForge | 1.21.1 | Supported |

## How It Works

Mixin Helper hooks into the Mixin framework's plugin system at load time — before other mods' mixins are applied. It reads your configuration from `config/mixinhelper.json` and intercepts the mixin pipeline to:

1. **Remove blacklisted mixins** from the framework's internal registries
2. **Override priorities** on mixin configs and individual mixins
3. **Wrap other mods' plugins** to intercept method application and strip methods post-apply
4. **Record audit data** about every loaded mixin config for your report

Because it operates at the mixin framework level, it works identically across all supported mod loaders.

---

## Next Steps

- [Getting Started](getting-started.md) — Install the mod and make your first config change
- [Configuration Reference](configuration.md) — Full reference for every config option
- [Examples](examples.md) — Real-world modpack conflict resolution scenarios
