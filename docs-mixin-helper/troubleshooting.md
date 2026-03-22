---
sidebar_position: 6
---

# Troubleshooting & FAQ

## Common Issues

### Config Not Loading

**Symptoms:** Changes to `mixinhelper.json` have no effect.

1. **Check JSON syntax** — A missing comma, bracket, or quote causes the entire file to fail silently. Use a JSON validator.
2. **Restart the game** — Config changes require a full restart. Mixins load before the main menu.
3. **Check the file location** — The file must be at `config/mixinhelper.json` relative to your game directory.
4. **Check `enabled`** — Make sure the top-level `"enabled": true` is set.

---

### Mixin Still Applying After Blacklisting

**Symptoms:** You've added a mixin to the blacklist but it still takes effect.

1. **Verify the class name** — The name must be fully qualified (e.g., `com.example.mod.mixin.MixinLevel`, not just `MixinLevel`). Check the audit report for the exact name.
2. **Check for typos** — Class names are case-sensitive.
3. **Restart the game** — Mixin blacklisting only takes effect at startup.
4. **Check the log** — With `debug.logBlacklistActions` enabled, the log should confirm the blacklist action. If you don't see it, the class name doesn't match.

---

### Game Crash After Method Removal

**Symptoms:** Crash with `NoSuchMethodError` or `AbstractMethodError` after adding a method removal rule.

1. **Switch from `remove` to `nop`** — The `nop` action preserves the method signature, preventing `NoSuchMethodError`.
2. **Check the method name and descriptor** — An incorrect descriptor could match the wrong method.
3. **Check the target class** — Make sure you're targeting the right class.

---

### Audit Report Not Generated

**Symptoms:** `config/mixinhelper-report.json` doesn't appear.

1. **Check `audit.enabled`** — Must be `true`.
2. **Check `audit.outputFile`** — Verify the path is writable.
3. **Check the game log** — Look for `[MixinHelper]` errors related to audit writing.
4. **Check if the game launched fully** — The report is written during mod initialization. If the game crashes before that point, no report is generated.

---

### JSON Syntax Errors

Common JSON mistakes:

**Trailing comma:**
```json
// Wrong
"mixins": [
  "com.example.MixinOne",
  "com.example.MixinTwo",  // trailing comma
]

// Correct
"mixins": [
  "com.example.MixinOne",
  "com.example.MixinTwo"
]
```

**Unquoted keys:**
```json
// Wrong
{mixins: ["com.example.MixinOne"]}

// Correct
{"mixins": ["com.example.MixinOne"]}
```

**Single quotes:**
```json
// Wrong
{'mixins': ['com.example.MixinOne']}

// Correct
{"mixins": ["com.example.MixinOne"]}
```

:::tip
Paste your config into a JSON validator if changes aren't taking effect.
:::

---

## FAQ

### Does Mixin Helper work on servers?

Yes. Mixin Helper operates at the mixin framework level, which runs identically on client and server. Install it on both sides for full functionality. The config file is read from the server's `config/` directory.

### Does it affect performance?

Negligibly. Mixin Helper does its work during game startup (mixin loading phase) and has zero runtime overhead during gameplay. The audit report adds a small amount of startup time for annotation scanning, which can be disabled with `includeAnnotations: false`.

### Can I use it alongside other mixin management mods?

Mixin Helper is designed to be compatible with other mods that use the `IMixinConfigPlugin` interface. It wraps existing plugins rather than replacing them, so other mods' plugins continue to function normally.

### Does blacklisting a mixin config remove the mod?

No. Blacklisting a mixin config only prevents that mod's mixins from loading. The mod's items, blocks, entities, commands, and other non-mixin features will still work. However, some mods rely heavily on mixins for core functionality, so disabling all mixins may break certain features.

### How do I find which mod a mixin belongs to?

The audit report groups mixins by their config file. The config filename usually contains the mod ID (e.g., `create.mixins.json` belongs to Create). You can also check the `packageName` field — it typically includes the mod's namespace.

### Can I blacklist Mixin Helper's own mixins?

Mixin Helper doesn't have any mixins of its own. It uses the `IMixinConfigPlugin` interface to intercept other mods' mixins, so there's nothing to blacklist.

### What happens if I blacklist a mixin that doesn't exist?

Nothing. Mixin Helper silently ignores blacklist entries that don't match any loaded mixin. No errors or warnings are generated.

### Does the config support comments?

No. Standard JSON does not support comments. If you need to annotate your config, keep notes in a separate file.

---

## Getting Help

If you encounter an issue not covered here:

1. Enable `debug.verbose` and check the full game log for `[MixinHelper]` messages
2. Generate an audit report and review it for unexpected mixin behavior
3. Join the [Discord Server](https://discord.gg/GCN2Hv4Qzr) for community support

---

## Next Steps

- [Getting Started](getting-started.md) — Installation and first-time setup
- [Configuration Reference](configuration.md) — Full config documentation
- [Examples](examples.md) — Real-world modpack scenarios
