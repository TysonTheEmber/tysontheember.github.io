---
sidebar_position: 7
title: Configuration
description: All config options — controlling effects, chat markup permissions, immersive message limits, accessibility, performance, and server-side abuse prevention.
---

# Configuration

Embers Text API ships with sensible defaults and requires no configuration to get started. For server operators who want fine-grained control, a full config system is available.

---

## Config File Locations

| Loader | File(s) | Location |
|---|---|---|
| Forge / NeoForge | `emberstextapi-common.toml` (server) | `config/` |
| Forge / NeoForge | `emberstextapi-client.toml` (client) | `config/` |
| Fabric | `emberstextapi.json` (all options) | `config/` |

On Forge and NeoForge, server-side options live in the **common** config (synced to all players), while client-side options live in the **client** config (per-player). On Fabric, everything is in a single JSON file.

Config files are created automatically on first launch.

---

## General

### `welcomeMessageEnabled`

| Type | Default | Side |
|---|---|---|
| Boolean | `true` | Server |

When enabled, new players see a one-time info message about ETA on first join.

### `immersiveMessagesEnabled`

| Type | Default | Side |
|---|---|---|
| Boolean | `true` | Client |

Master toggle for immersive messages. When set to `false`, all immersive messages (from commands, API, or queues) are silently ignored on the client — nothing renders on screen.

:::tip
This is a **client-side** setting. Each player controls whether they see immersive messages. Server operators cannot force this off for other players, but players can use it to opt out of on-screen text.
:::

---

## Effects

### `disabledEffects`

| Type | Default | Side |
|---|---|---|
| List of strings | `[]` (empty) | Client |

A list of effect names to disable. Disabled effects render as plain text — the tag is still parsed, but the effect does nothing.

**Forge / NeoForge example** (`emberstextapi-client.toml`):
```toml
[effects]
    disabledEffects = ["glitch", "shake", "turbulence"]
```

**Fabric example** (`emberstextapi.json`):
```json
{
  "disabledEffects": ["glitch", "shake", "turbulence"]
}
```

This disables the effects everywhere: chat markup, immersive messages, and API calls. The text content still appears — only the visual effect is suppressed.

:::note
Effect names are case-insensitive. Both `"Rainbow"` and `"rainbow"` work. Aliases are separate entries — disabling `"rainbow"` does not automatically disable `"rainb"`. Add both if needed.
:::

**All effect names:** `rainbow`, `rainb`, `grad`, `gradient`, `color`, `col`, `pulse`, `fade`, `wave`, `bounce`, `swing`, `turb`, `turbulence`, `shake`, `circle`, `wiggle`, `pend`, `pendulum`, `scroll`, `glitch`, `neon`, `glow`, `shadow`, `typewriter`, `type`, `obfuscate`, `obf`

### `reduceMotion`

| Type | Default | Side |
|---|---|---|
| Boolean | `false` | Client |

An accessibility toggle that disables all positional/motion effects while keeping color effects working. When enabled, the following effects are treated as disabled:

`wave`, `bounce`, `swing`, `shake`, `circle`, `wiggle`, `pendulum`, `pend`, `turbulence`, `turb`, `scroll`

Color-based effects like `rainbow`, `gradient`, `pulse`, `fade`, `neon`, and `color` continue to work normally.

**Forge / NeoForge example** (`emberstextapi-client.toml`):
```toml
[effects]
    reduceMotion = true
```

**Fabric example** (`emberstextapi.json`):
```json
{
  "reduceMotion": true
}
```

:::tip
This is useful for players who experience motion sickness or find moving text distracting. It provides a single toggle instead of requiring each motion effect to be listed individually in `disabledEffects`.
:::

### `maxNeonQuality`

| Type | Default | Range | Side |
|---|---|---|---|
| Integer | `3` | 1–3 | Client |

Caps the maximum quality level for neon/glow effects. The neon effect uses multi-ring sampling that can be expensive on lower-end hardware. This setting limits how many samples are used, regardless of what the markup requests.

| Value | Quality | Samples per character |
|---|---|---|
| `1` | Fast | ~6 |
| `2` | Balanced | ~12 |
| `3` | Quality (default) | ~20 |

If a message uses `<neon q=3>` but the config has `maxNeonQuality = 1`, the effect renders at quality 1.

**Forge / NeoForge example** (`emberstextapi-client.toml`):
```toml
[effects]
    maxNeonQuality = 1
```

---

## Chat Markup Permissions

These settings control which players can use markup tags like `<rainbow>` in regular chat messages.

### `markupPermissionMode`

| Type | Default | Side |
|---|---|---|
| String | `"NONE"` | Server |

| Value | Behavior |
|---|---|
| `NONE` | No restrictions — all players can use markup in chat |
| `WHITELIST` | Only players listed in `markupPlayerList` can use markup |
| `BLACKLIST` | Players listed in `markupPlayerList` cannot use markup; everyone else can |

### `markupPlayerList`

| Type | Default | Side |
|---|---|---|
| List of strings | `[]` (empty) | Server |

Player UUIDs for the whitelist or blacklist. UUIDs are case-insensitive.

**Forge / NeoForge example** (`emberstextapi-common.toml`):
```toml
[markup]
    markupPermissionMode = "BLACKLIST"
    markupPlayerList = ["550e8400-e29b-41d4-a716-446655440000"]
```

**Fabric example** (`emberstextapi.json`):
```json
{
  "markupPermissionMode": "WHITELIST",
  "markupPlayerList": [
    "550e8400-e29b-41d4-a716-446655440000",
    "6ba7b810-9dad-11d1-80b4-00c04fd430c8"
  ]
}
```

When a player who is not allowed to use markup sends a chat message containing tags, all tags are silently stripped — the plain text content is preserved and broadcast normally.

:::tip
To find a player's UUID, use a site like [NameMC](https://namemc.com/) or the `/data get entity @p` command in-game.
:::

### `disallowedMarkupTags`

| Type | Default | Side |
|---|---|---|
| List of strings | `[]` (empty) | Server |

Specific markup tags to strip from player-authored chat messages. Unlike `disabledEffects` (which is client-side and disables effects everywhere), this only affects chat — effects sent via the API or commands still work.

This is useful for modpack developers who want to allow most effects in chat but ban specific ones (e.g., `glitch` or `neon`) that are too distracting or performance-heavy.

**Forge / NeoForge example** (`emberstextapi-common.toml`):
```toml
[markup]
    disallowedMarkupTags = ["glitch", "neon", "glow"]
```

**Fabric example** (`emberstextapi.json`):
```json
{
  "disallowedMarkupTags": ["glitch", "neon", "glow"]
}
```

:::note
Tag names are case-insensitive. Remember to include aliases if you want to fully block an effect — e.g., both `"neon"` and `"glow"`, or both `"turbulence"` and `"turb"`.
:::

---

## Anvil

### `anvilNameMaxLength`

| Type | Default | Side |
|---|---|---|
| Integer | `50` | Server |

Maximum character length for item names in the anvil. Vanilla Minecraft limits names to 50 characters. Increase this to allow longer names — useful for items with markup-styled names.

**Forge / NeoForge example** (`emberstextapi-common.toml`):
```toml
[anvil]
    anvilNameMaxLength = 200
```

**Fabric example** (`emberstextapi.json`):
```json
{
  "anvilNameMaxLength": 200
}
```

---

## Client-Side Limits

### `maxMessageDuration`

| Type | Default | Range | Side |
|---|---|---|---|
| Integer (ticks) | `0` (unlimited) | 0–72000 | Client |

Maximum duration for any immersive message, in ticks (20 ticks = 1 second). Messages with longer durations (or unlimited duration) are capped to this value. Set to `0` for no limit.

### `maxActiveMessages`

| Type | Default | Range | Side |
|---|---|---|---|
| Integer | `0` (unlimited) | 0–100 | Client |

Maximum number of immersive messages that can be on screen simultaneously. When the limit is reached, new messages are silently dropped until an existing message expires. Set to `0` for no limit.

---

## Server-Side Message Limits {#server-limits}

These settings are enforced on the server before messages are sent to clients. They protect all players regardless of their individual client config, and are particularly useful for modpack developers.

### `maxServerMessageDuration`

| Type | Default | Range | Side |
|---|---|---|---|
| Integer (ticks) | `1200` | 0–72000 | Server |

Server-enforced maximum message duration in ticks. Messages with longer durations (or unlimited duration) are capped to this value before being sent. `1200` ticks = 60 seconds. Set to `0` for no limit.

**Forge / NeoForge example** (`emberstextapi-common.toml`):
```toml
[messages]
    maxServerMessageDuration = 600
```

:::note
Both `maxServerMessageDuration` (server) and `maxMessageDuration` (client) are enforced independently. The effective cap is the stricter of the two. For example, if the server limit is 1200 and a player sets their client limit to 200, messages will be capped at 200 for that player.
:::

### `maxServerActiveMessages`

| Type | Default | Range | Side |
|---|---|---|---|
| Integer | `10` | 0–100 | Server |

Server-enforced maximum simultaneous messages per player. Set to `0` for no limit.

**Forge / NeoForge example** (`emberstextapi-common.toml`):
```toml
[messages]
    maxServerActiveMessages = 5
```

### `maxQueueSize`

| Type | Default | Range | Side |
|---|---|---|---|
| Integer | `50` | 0–1000 | Server |

Maximum pending steps per queue channel. Prevents memory exhaustion from excessively large queues. When the limit is reached, additional steps are silently dropped. Set to `0` for no limit.

**Forge / NeoForge example** (`emberstextapi-common.toml`):
```toml
[messages]
    maxQueueSize = 25
```

### `allowedEffects`

| Type | Default | Side |
|---|---|---|
| List of strings | `[]` (empty) | Server |

If non-empty, only effects in this list are allowed in server-sent messages. Effects not in the list are replaced with no-ops (plain text). An empty list means all effects are allowed.

This is an **allowlist** — it controls what effects the server will send to clients, providing server-side control over what API consumers and commands can use.

**Forge / NeoForge example** (`emberstextapi-common.toml`):
```toml
[messages]
    allowedEffects = ["rainbow", "gradient", "color", "fade", "pulse"]
```

**Fabric example** (`emberstextapi.json`):
```json
{
  "allowedEffects": ["rainbow", "gradient", "color", "fade", "pulse"]
}
```

:::tip
Use this for modpacks where you want to limit which effects other mods or datapacks can use, without affecting what players can type in chat (chat is controlled by `disallowedMarkupTags`).
:::

---

## Performance

### `textLayoutCacheSize`

| Type | Default | Range | Side |
|---|---|---|---|
| Integer | `256` | 64–2048 | Client |

Maximum entries in the text layout cache (LRU). Higher values use more memory but avoid recomputing character widths and line breaks for frequently rendered text. Lower values are suitable for memory-constrained environments.

**Forge / NeoForge example** (`emberstextapi-client.toml`):
```toml
[performance]
    textLayoutCacheSize = 128
```

### `sdfEnabled`

| Type | Default | Side |
|---|---|---|
| Boolean | `true` | Client |

Master toggle for SDF (Signed Distance Field) font rendering. When set to `false`, SDF fonts (like the bundled Norse font) fall back to vanilla bitmap rendering.

Disable this if you experience GPU compatibility issues or visual glitches with custom fonts.

**Forge / NeoForge example** (`emberstextapi-client.toml`):
```toml
[performance]
    sdfEnabled = false
```

**Fabric example** (`emberstextapi.json`):
```json
{
  "sdfEnabled": false
}
```

:::warning
Disabling SDF rendering means any fonts that rely on it (such as `emberstextapi:norse`) will not render correctly. Text using those fonts will fall back to Minecraft's default font.
:::

---

## Full Config Examples

### Forge / NeoForge

**`config/emberstextapi-common.toml`:**
```toml
[general]
    welcomeMessageEnabled = true

[markup]
    markupPermissionMode = "NONE"
    markupPlayerList = []
    disallowedMarkupTags = []

[messages]
    maxServerMessageDuration = 1200
    maxServerActiveMessages = 10
    maxQueueSize = 50
    allowedEffects = []

[anvil]
    anvilNameMaxLength = 50
```

**`config/emberstextapi-client.toml`:**
```toml
[general]
    immersiveMessagesEnabled = true

[effects]
    disabledEffects = []
    reduceMotion = false
    maxNeonQuality = 3

[limits]
    maxMessageDuration = 0
    maxActiveMessages = 0

[performance]
    textLayoutCacheSize = 256
    sdfEnabled = true
```

### Fabric

**`config/emberstextapi.json`:**
```json
{
  "welcomeMessageEnabled": true,
  "immersiveMessagesEnabled": true,
  "disabledEffects": [],
  "markupPermissionMode": "NONE",
  "markupPlayerList": [],
  "disallowedMarkupTags": [],
  "maxMessageDuration": 0,
  "maxActiveMessages": 0,
  "anvilNameMaxLength": 50,
  "maxServerMessageDuration": 1200,
  "maxServerActiveMessages": 10,
  "maxQueueSize": 50,
  "allowedEffects": [],
  "reduceMotion": false,
  "maxNeonQuality": 3,
  "textLayoutCacheSize": 256,
  "sdfEnabled": true
}
```
