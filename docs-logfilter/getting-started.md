---
sidebar_position: 2
---

# Getting Started

## Installation

1. Download LogFilter for your mod loader and Minecraft version
2. Place the `.jar` file in your `mods/` folder
3. Launch the game

On first launch, LogFilter automatically generates a default config file at:

```
config/logfilter.json
```

:::tip
No other mods are required. LogFilter has zero dependencies beyond libraries that ship with every mod loader.
:::

## Config File Location

The config file is always located in the game's `config/` directory, regardless of mod loader:

| Launcher | Typical Path |
|----------|-------------|
| CurseForge | `.minecraft/config/logfilter.json` |
| Prism / MultiMC | `instances/<name>/.minecraft/config/logfilter.json` |
| Server | `config/logfilter.json` (relative to server root) |

---

## Quick Start: Suppress a Noisy Logger

The default config comes with several example rules, all disabled. Here's how to enable one:

### Step 1: Open the Config File

Open `config/logfilter.json` in a text editor.

### Step 2: Enable a Rule

Find the "Suppress OpenAL info spam" rule and change `"enabled"` from `false` to `true`:

```json
{
  "name": "Suppress OpenAL info spam",
  "enabled": true,
  "type": "LOGGER_NAME",
  "pattern": "org.lwjgl.openal",
  "action": "DENY"
}
```

### Step 3: Save the File

Save the file. LogFilter detects the change automatically and reloads within about half a second. You should see a message in the log:

```
[LogFilter] LogFilter config reloaded: 5 rules (1 enabled)
```

:::note
No restart is needed. LogFilter watches the config file for changes and hot-reloads automatically.
:::

---

## Default Configuration

Here is the complete default config generated on first launch:

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

All default rules are disabled. Enable individual rules by setting `"enabled": true`.

---

## Next Steps

- [Configuration Reference](configuration.md) — Detailed documentation for every config option
- [Examples](examples.md) — Real-world log filtering scenarios
- [Troubleshooting](troubleshooting.md) — Common issues and solutions
