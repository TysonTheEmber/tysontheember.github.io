---
sidebar_position: 1
---

# LogFilter

LogFilter is a highly configurable log filtering mod for Minecraft that gives you complete control over which log messages appear in your console and log files. Define rules to suppress noisy output, filter by log level, match logger names or message content with regex — all from a single JSON config file that hot-reloads without restarting the game.

## Key Features

| Feature | Description |
|---------|-------------|
| **Message Regex Filtering** | Match and filter log messages using Java regex patterns |
| **Logger Name Filtering** | Suppress output from specific loggers or entire logger hierarchies |
| **Log Level Filtering** | Filter messages by level (DEBUG, INFO, WARN, ERROR) |
| **Multiple Actions** | Deny, allow, or remain neutral on matched messages |
| **Hot-Reload** | Config changes are detected and applied automatically — no restart required |
| **Per-Rule Control** | Enable or disable individual rules without removing them |

## Supported Platforms

| Loader | Minecraft Version | Status |
|--------|-------------------|--------|
| Forge | 1.20.1 | Supported |
| Fabric | 1.20.1 | Supported |
| Fabric | 1.21.1 | Supported |
| NeoForge | 1.21.1 | Supported |

## How It Works

LogFilter attaches a configurable filter to the Log4j2 root logger during mod initialization. Every log message passes through this filter before being displayed or written to file. The filter evaluates your rules in order — the first matching rule determines whether the message is denied, allowed, or passed through unchanged.

The mod monitors its config file for changes using a background watcher thread. When you edit and save `logfilter.json`, the new rules are loaded and applied within about half a second — no game restart needed.

:::tip
LogFilter never filters its own messages. You will always see `[LogFilter]` initialization and reload messages in the log regardless of your rules.
:::

