---
sidebar_position: 4
---

# Examples

Real-world scenarios showing how to use LogFilter to clean up your log output.

## 1. Suppress a Noisy Mod

**Scenario:** A mod floods the console with debug information every tick, making it hard to spot important messages.

**Solution:** Filter by logger name to suppress all output from that mod:

```json
{
  "name": "Suppress noisy mod",
  "enabled": true,
  "type": "LOGGER_NAME",
  "pattern": "com.example.noisymod",
  "action": "DENY"
}
```

:::tip
`LOGGER_NAME` uses hierarchy matching. Filtering `com.example.noisymod` also suppresses child loggers like `com.example.noisymod.network` and `com.example.noisymod.rendering`.
:::

---

## 2. Hide Debug Messages from a Specific System

**Scenario:** The server level logger produces excessive `DEBUG` output during world loading, but you still want to see its `INFO` and `ERROR` messages.

**Solution:** Use the `level` field to restrict the rule to `DEBUG` only:

```json
{
  "name": "Suppress DEBUG from server level",
  "enabled": true,
  "type": "LOGGER_NAME",
  "pattern": "net.minecraft.server.level",
  "action": "DENY",
  "level": "DEBUG"
}
```

`INFO`, `WARN`, and `ERROR` messages from that logger will still appear normally.

---

## 3. Filter Messages by Content

**Scenario:** Every time the game loads, you see hundreds of "Loaded X recipes" and "Loaded X advancements" messages that clutter the log.

**Solution:** Use `MESSAGE_REGEX` to match the message text:

```json
{
  "name": "Suppress loading count messages",
  "enabled": true,
  "type": "MESSAGE_REGEX",
  "pattern": "Loaded \\d+ (recipes|advancements)",
  "action": "DENY"
}
```

:::note
Backslashes must be doubled in JSON. The regex `\d+` becomes `\\d+` in the config file.
:::

---

## 4. Protect Error Messages with an Allowlist

**Scenario:** You've added several rules to suppress noisy loggers, but you're concerned about missing error messages from those same loggers.

**Solution:** Place an `ALLOW` rule for `ERROR` messages at the top of your rule list, before any `DENY` rules:

```json
{
  "configVersion": 1,
  "enabled": true,
  "rules": [
    {
      "name": "Always allow errors",
      "enabled": true,
      "type": "LEVEL",
      "pattern": "ERROR",
      "action": "ALLOW"
    },
    {
      "name": "Suppress noisy mod",
      "enabled": true,
      "type": "LOGGER_NAME",
      "pattern": "com.example.noisymod",
      "action": "DENY"
    }
  ]
}
```

Because rules are evaluated in order, error messages hit the `ALLOW` rule first and are always displayed — even from loggers that would otherwise be suppressed.

:::warning
Rule order matters. `ALLOW` rules must appear before the `DENY` rules they are meant to override.
:::

---

## 5. Suppress OpenAL and LWJGL Noise

**Scenario:** The LWJGL OpenAL audio system logs dozens of informational messages during startup that aren't useful for most players.

**Solution:** Filter the entire OpenAL logger hierarchy:

```json
{
  "name": "Suppress OpenAL spam",
  "enabled": true,
  "type": "LOGGER_NAME",
  "pattern": "org.lwjgl.openal",
  "action": "DENY"
}
```

---

## 6. Filter Multiple Mod Loggers with Regex

**Scenario:** Several mods from the same author share a common package prefix and all produce excessive logging.

**Solution:** Use `LOGGER_REGEX` to match all of them with a single rule:

```json
{
  "name": "Suppress all mods from author",
  "enabled": true,
  "type": "LOGGER_REGEX",
  "pattern": "^com\\.authorname\\.",
  "action": "DENY"
}
```

This matches any logger whose name starts with `com.authorname.`, covering all of the author's mods in one rule.

---

## 7. Full Modpack Config Example

A comprehensive config for a modpack with several sources of log noise:

```json
{
  "configVersion": 1,
  "enabled": true,
  "rules": [
    {
      "name": "Always allow errors",
      "enabled": true,
      "type": "LEVEL",
      "pattern": "ERROR",
      "action": "ALLOW"
    },
    {
      "name": "Always allow warnings",
      "enabled": true,
      "type": "LEVEL",
      "pattern": "WARN",
      "action": "ALLOW"
    },
    {
      "name": "Suppress OpenAL spam",
      "enabled": true,
      "type": "LOGGER_NAME",
      "pattern": "org.lwjgl.openal",
      "action": "DENY"
    },
    {
      "name": "Suppress loading count messages",
      "enabled": true,
      "type": "MESSAGE_REGEX",
      "pattern": "Loaded \\d+ (recipes|advancements|data packs)",
      "action": "DENY"
    },
    {
      "name": "Suppress server level DEBUG",
      "enabled": true,
      "type": "LOGGER_NAME",
      "pattern": "net.minecraft.server.level",
      "action": "DENY",
      "level": "DEBUG"
    },
    {
      "name": "Suppress noisy rendering mod",
      "enabled": true,
      "type": "LOGGER_NAME",
      "pattern": "com.example.shadermod",
      "action": "DENY"
    }
  ]
}
```

This config ensures errors and warnings are always visible, then suppresses known sources of noise. The rule order is important — allowlist rules come first.

---

## Tips for Writing Rules

1. **Start with `ALLOW` rules** — Place them at the top to protect important messages
2. **Use `LOGGER_NAME` when possible** — It's the most efficient match type and covers child loggers automatically
3. **Use `MESSAGE_REGEX` for content-based filtering** — When you need to match specific message patterns regardless of which logger produces them
4. **Test with `NEUTRAL` first** — Set a new rule's action to `NEUTRAL` to verify it matches without actually filtering anything, then switch to `DENY`
5. **Use the `level` field** — Narrowing a rule to a specific level avoids accidentally suppressing important messages
6. **Name your rules** — The `name` field is for your reference and makes configs easier to maintain

---

## Next Steps

- [Configuration Reference](configuration.md) — Full reference for all config options
- [Troubleshooting](troubleshooting.md) — Common issues and solutions
- [Getting Started](getting-started.md) — Installation and first-time setup
