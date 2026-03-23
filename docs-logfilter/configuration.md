---
sidebar_position: 3
---

# Configuration Reference

Complete reference for all options in `config/logfilter.json`.

## Overview

All configuration is done through a single JSON file at `config/logfilter.json`. The file is auto-generated with defaults on first launch. Changes are hot-reloaded automatically — no restart required.

:::tip JSON Validation
If your rules aren't taking effect, check for JSON syntax errors. A misplaced comma or missing bracket will cause the file to fail silently, falling back to defaults.
:::

---

## configVersion

Internal version number for future config format compatibility.

**Type:** Integer
**Default:** `1`

```json
"configVersion": 1
```

Do not change this value unless instructed by a future update.

---

## enabled

Master toggle for all log filtering.

**Type:** Boolean
**Default:** `true`

```json
"enabled": true
```

Set to `false` to disable all filtering without removing the mod or deleting your rules. Individual rules retain their own `enabled` state.

---

## rules

An array of filter rules. Rules are evaluated in order — the first matching rule determines the outcome for that log message.

**Type:** Array of rule objects
**Default:** Five example rules (all disabled)

Each rule has the following fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | String | No | A descriptive label for the rule (for your reference only) |
| `enabled` | Boolean | No | Whether this rule is active. Default: `true` |
| `type` | String | Yes | The matching strategy. See [Rule Types](#rule-types) |
| `pattern` | String | Yes | The pattern to match against. Interpretation depends on `type` |
| `action` | String | Yes | What to do when the rule matches. See [Actions](#actions) |
| `level` | String | No | Restrict this rule to a specific log level. See [Level Restriction](#level-restriction) |

---

## Rule Types

The `type` field determines how the `pattern` is matched against each log message.

| Type | Matches Against | Pattern Format | Match Behavior |
|------|----------------|----------------|----------------|
| `MESSAGE_REGEX` | The formatted log message text | Java regex | Partial match (`find()`) |
| `LOGGER_NAME` | The logger's name (e.g., `net.minecraft.server.level.ServerLevel`) | Exact string | Exact match or hierarchy prefix |
| `LOGGER_REGEX` | The logger's name | Java regex | Partial match (`find()`) |
| `LEVEL` | The log level | Level name | Exact match |

### MESSAGE_REGEX

Matches against the formatted log message content using a Java regular expression. The pattern uses `find()`, meaning it matches if the pattern appears anywhere in the message — it does not need to match the entire message.

```json
{
  "name": "Suppress advancement loading",
  "enabled": true,
  "type": "MESSAGE_REGEX",
  "pattern": "Loaded \\d+ advancements",
  "action": "DENY"
}
```

:::note
Backslashes must be doubled in JSON. The regex `\d+` is written as `\\d+` in the config file.
:::

---

### LOGGER_NAME

Matches against the logger's name using exact string comparison or hierarchy prefix matching. A pattern of `net.minecraft.server.level` will match:

- `net.minecraft.server.level` (exact match)
- `net.minecraft.server.level.ServerLevel` (child logger)
- `net.minecraft.server.level.DistanceManager` (child logger)

But will **not** match:

- `net.minecraft.server` (parent logger)
- `net.minecraft.server.leveldata` (different hierarchy — no `.` separator)

```json
{
  "name": "Suppress server level loggers",
  "enabled": true,
  "type": "LOGGER_NAME",
  "pattern": "net.minecraft.server.level",
  "action": "DENY"
}
```

---

### LOGGER_REGEX

Matches against the logger's name using a Java regular expression. Like `MESSAGE_REGEX`, the pattern uses `find()` for partial matching.

```json
{
  "name": "Suppress all Forge loggers",
  "enabled": true,
  "type": "LOGGER_REGEX",
  "pattern": "^net\\.minecraftforge\\.",
  "action": "DENY"
}
```

---

### LEVEL

Matches log messages by their log level. The `pattern` field should contain the level name.

Valid level values: `TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR`, `FATAL`

```json
{
  "name": "Always allow error messages",
  "enabled": true,
  "type": "LEVEL",
  "pattern": "ERROR",
  "action": "ALLOW"
}
```

---

## Actions

The `action` field determines what happens when a rule matches.

| Action | Effect | Log4j2 Result |
|--------|--------|---------------|
| `DENY` | The message is suppressed and will not appear in the console or log file | `DENY` |
| `ALLOW` | The message is explicitly permitted, bypassing any later `DENY` rules | `ACCEPT` |
| `NEUTRAL` | No decision — continue evaluating subsequent rules | `NEUTRAL` |

:::tip
Use `ALLOW` rules early in your rule list to protect important messages from being caught by broader `DENY` rules later. For example, always allow `ERROR` messages before denying an entire logger hierarchy.
:::

---

## Level Restriction

Any rule can optionally include a `level` field to restrict it to messages of a specific log level. The rule will only match if both the pattern and the level match.

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

This rule suppresses `DEBUG` messages from `net.minecraft.server.level` and its child loggers, but allows `INFO`, `WARN`, and `ERROR` messages through.

Valid level values: `TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR`, `FATAL`

If the `level` field is omitted or set to `null`, the rule matches messages at any level.

---

## Rule Evaluation Order

Rules are evaluated in the order they appear in the `rules` array. The first rule that matches a log message determines the outcome.

1. If the master `enabled` flag is `false`, all messages pass through unfiltered
2. LogFilter's own messages (logger name `LogFilter`) are never filtered
3. For each enabled rule, in order:
   - If the rule has a `level` restriction and the message level doesn't match, skip the rule
   - If the pattern matches (based on `type`), return the rule's `action`
4. If no rules match, the message passes through unchanged (`NEUTRAL`)

:::warning
Rule order matters. Place `ALLOW` rules before `DENY` rules when you need to protect specific messages from broader filters.
:::

---

## Complete Default Config

```json
{
  "configVersion": 1,
  "enabled": true,
  "rules": [
    {
      "name": "Suppress OpenAL info spam",
      "enabled": false,
      "type": "LOGGER_NAME",
      "pattern": "org.lwjgl.openal",
      "action": "DENY"
    },
    {
      "name": "Suppress advancement loading",
      "enabled": false,
      "type": "MESSAGE_REGEX",
      "pattern": "Loaded \\d+ advancements",
      "action": "DENY"
    },
    {
      "name": "Suppress DEBUG from server level",
      "enabled": false,
      "type": "LOGGER_NAME",
      "pattern": "net.minecraft.server.level",
      "action": "DENY",
      "level": "DEBUG"
    },
    {
      "name": "Suppress recipe loading messages",
      "enabled": false,
      "type": "MESSAGE_REGEX",
      "pattern": "Loaded \\d+ recipes",
      "action": "DENY"
    },
    {
      "name": "Always allow error messages",
      "enabled": false,
      "type": "LEVEL",
      "pattern": "ERROR",
      "action": "ALLOW"
    }
  ]
}
```

---

## Next Steps

- [Examples](examples.md) — Real-world log filtering scenarios
- [Troubleshooting](troubleshooting.md) — Common issues and solutions
- [Getting Started](getting-started.md) — Installation and first-time setup
