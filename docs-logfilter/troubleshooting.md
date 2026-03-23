---
sidebar_position: 5
---

# Troubleshooting & FAQ

## Common Issues

### Config Not Loading

**Symptoms:** Changes to `logfilter.json` have no effect.

1. **Check JSON syntax** — A missing comma, bracket, or quote causes the entire file to fail silently. Use a JSON validator. Check the game log for `[LogFilter] Failed to load config` errors.
2. **Check the file location** — The file must be at `config/logfilter.json` relative to your game directory.
3. **Check `enabled`** — Make sure the top-level `"enabled": true` is set.
4. **Check individual rules** — Each rule has its own `enabled` field that must be `true`.

---

### Rules Not Matching

**Symptoms:** A rule is enabled but log messages are still appearing.

1. **Check the `type` field** — Make sure you're using the right match type:
   - `MESSAGE_REGEX` matches the message text
   - `LOGGER_NAME` matches the logger's name (not the message)
   - `LOGGER_REGEX` matches the logger's name with regex
   - `LEVEL` matches the log level
2. **Check the `pattern`** — For `LOGGER_NAME`, the pattern must match the logger's fully qualified name (e.g., `net.minecraft.server.level`, not just `server.level`).
3. **Check the `level` restriction** — If your rule has a `level` field, it only matches messages at that specific level.
4. **Check rule order** — An earlier `ALLOW` rule may be permitting the message before your `DENY` rule is reached.
5. **Check regex escaping** — In JSON, backslashes must be doubled. The regex `\d+` is written as `\\d+`.

---

### Regex Pattern Errors

**Symptoms:** A rule with `MESSAGE_REGEX` or `LOGGER_REGEX` type isn't working, and you see a warning in the log.

1. **Check the game log** for `[LogFilter] Skipping rule '...': invalid regex pattern` — this indicates a syntax error in your regex.
2. **Double-check JSON escaping** — Every `\` in a regex must be written as `\\` in JSON:
   - `\d` → `\\d`
   - `\s` → `\\s`
   - `\.` → `\\.`
   - `\\` (literal backslash) → `\\\\`
3. **Test your regex** — Use an online Java regex tester to verify your pattern works before putting it in the config.

---

### Hot-Reload Not Working

**Symptoms:** Saving the config file doesn't trigger a reload.

1. **Check the log** — You should see `[LogFilter] LogFilter config reloaded` after saving. If you don't see this message, the file watcher may not be running.
2. **Check file location** — The watcher monitors the `config/` directory. If you're editing a copy elsewhere, changes won't be detected.
3. **Some editors use atomic saves** — Editors that write to a temporary file and rename may trigger the watcher normally. If your editor doesn't, try saving twice or using a different editor.
4. **Restart as fallback** — If hot-reload isn't working, restarting the game will always load the latest config.

---

### JSON Syntax Errors

Common JSON mistakes:

**Trailing comma:**
```json
// Wrong
"rules": [
  {"name": "Rule 1", "enabled": true, "type": "LEVEL", "pattern": "DEBUG", "action": "DENY"},
  {"name": "Rule 2", "enabled": true, "type": "LEVEL", "pattern": "TRACE", "action": "DENY"},
]

// Correct
"rules": [
  {"name": "Rule 1", "enabled": true, "type": "LEVEL", "pattern": "DEBUG", "action": "DENY"},
  {"name": "Rule 2", "enabled": true, "type": "LEVEL", "pattern": "TRACE", "action": "DENY"}
]
```

**Unquoted keys:**
```json
// Wrong
{enabled: true, rules: []}

// Correct
{"enabled": true, "rules": []}
```

**Single quotes:**
```json
// Wrong
{'enabled': true, 'rules': []}

// Correct
{"enabled": true, "rules": []}
```

:::tip
Paste your config into a JSON validator if changes aren't taking effect.
:::

---

## FAQ

### Does LogFilter work on servers?

Yes. LogFilter operates at the Log4j2 level, which runs identically on client and server. Install it on the server and place the config at `config/logfilter.json` relative to the server root.

### Does it affect performance?

Negligibly. The filter evaluates rules against each log message, but this is an extremely lightweight operation — regex matching and string comparison on log text. The overhead is insignificant compared to the I/O cost of writing log messages to disk.

### Do I need to restart the game after changing the config?

No. LogFilter watches the config file and automatically reloads it when changes are detected. You should see a reload confirmation in the log within about half a second of saving.

### Can I use LogFilter alongside other logging mods?

Yes. LogFilter attaches as a standard Log4j2 filter to the root logger. It is compatible with other mods that modify logging behavior.

### What happens if my regex is invalid?

The rule is skipped with a warning in the log: `Skipping rule '...': invalid regex pattern '...'`. All other rules continue to function normally.

### Can I filter LogFilter's own messages?

No. LogFilter explicitly exempts its own messages from filtering. This ensures you always see initialization and reload confirmations.

### Does the config support comments?

No. Standard JSON does not support comments. If you need to annotate your config, use the `name` field on each rule for descriptions, or keep notes in a separate file.

### What does `NEUTRAL` action do?

`NEUTRAL` means "no decision." The rule matches but doesn't filter or explicitly allow the message — evaluation continues to the next rule. This is useful for testing whether a pattern matches without actually filtering anything.

### What's the difference between `LOGGER_NAME` and `LOGGER_REGEX`?

`LOGGER_NAME` does exact string matching with hierarchy support (e.g., `net.minecraft.server.level` also matches `net.minecraft.server.level.ServerLevel`). `LOGGER_REGEX` uses a Java regex pattern for more flexible matching but doesn't have built-in hierarchy support.

---

## Getting Help

If you encounter an issue not covered here:

1. Check the game log for `[LogFilter]` messages — they often explain what went wrong
2. Verify your JSON syntax with a validator
3. Join the [Discord Server](https://discord.gg/GCN2Hv4Qzr) for community support

---

## Next Steps

- [Getting Started](getting-started.md) — Installation and first-time setup
- [Configuration Reference](configuration.md) — Full config documentation
- [Examples](examples.md) — Real-world filtering scenarios
