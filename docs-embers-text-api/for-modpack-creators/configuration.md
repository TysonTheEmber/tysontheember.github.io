---
sidebar_position: 7
title: Configuration
description: All config options — controlling effects, chat markup permissions, immersive message limits, and more.
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

## Disabled Effects

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

---

## Limits

### `maxMessageDuration`

| Type | Default | Side |
|---|---|---|
| Integer (ticks) | `0` (unlimited) | Client |

Maximum duration for any immersive message, in ticks (20 ticks = 1 second). Messages with longer durations are not displayed. Set to `0` for no limit.

### `maxActiveMessages`

| Type | Default | Side |
|---|---|---|
| Integer | `0` (unlimited) | Client |

Maximum number of immersive messages that can be on screen simultaneously. When the limit is reached, new messages are silently dropped until an existing message expires. Set to `0` for no limit.

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
```

**`config/emberstextapi-client.toml`:**
```toml
[general]
    immersiveMessagesEnabled = true

[effects]
    disabledEffects = []

[limits]
    maxMessageDuration = 0
    maxActiveMessages = 0
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
  "maxMessageDuration": 0,
  "maxActiveMessages": 0
}
```
