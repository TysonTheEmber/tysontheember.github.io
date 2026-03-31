---
sidebar_position: 1
---

# Loot Log

Loot Log is a highly customizable pickup notifier HUD mod for Minecraft. It displays items and XP as players collect them in real-time with smooth animations, configurable visuals, filtering options, and per-item customization through JSON overrides.

## Key Features

| Feature | Description |
|---------|-------------|
| **Real-Time Pickup Tracking** | Displays item and XP pickups as they happen with smooth entrance animations |
| **Smart Stacking** | Automatically combines duplicate pickups with count display (+3) and inventory total (x64) |
| **6 Background Styles** | None, Solid, Tooltip, Texture (9-slice), Banner (multi-layer), and Flat — each fully customizable |
| **Animation System** | Fade, slide, scale, stagger delay, and 4 easing functions for polished entrance/exit effects |
| **Icon Effects** | Configurable glow (4 shapes), shadow, bounce, and pickup pulse effects on item icons |
| **Per-Item JSON Overrides** | Customize any item's appearance, sound, duration, and text via JSON files with 5-layer priority matching |
| **Filtering** | Blacklist or whitelist items and mods to control what appears in the HUD |
| **Sound Notifications** | Optional pickup sounds with configurable sound ID, volume, and pitch |
| **EmbersTextAPI Integration** | Apply rich text effects like rainbow colors and glowing text to item names |
| **YACL Config GUI** | Full in-game configuration screen when YACL is installed — no file editing required |

## Supported Platforms

| Loader | Minecraft Version | Status |
|--------|-------------------|--------|
| Forge | 1.20.1 | Supported |
| Fabric | 1.20.1 | Supported |
| NeoForge | 1.21.1 | Supported |
| Fabric | 1.21.1 | Supported |

## How It Works

1. **Pickup detection** — A mixin intercepts item and XP pickup packets on the client. When the local player picks up an item or experience orb, the event is captured before the vanilla handler processes it
2. **Processing** — The pickup is filtered against blacklist/whitelist rules, matched against JSON overrides using a 5-layer priority system (mod → rarity → regex → tag → exact item ID), and either stacked with an existing entry or added as a new notification
3. **Rendering** — Each entry is rendered as a HUD popup with configurable background, icon effects, text formatting, and animations. Entries fade in, display for a configurable duration, then fade out with optional slide and scale effects

## Dependencies

| Dependency | Required | Description |
|------------|----------|-------------|
| Mod Loader | Yes | Forge 47.4.10+, Fabric, or NeoForge 21.1.220+ |
| YACL v3.3+ | No | Enables full in-game configuration GUI |
| Mod Menu | No | Adds a config button in Fabric's mod list (Fabric only) |
| EmbersTextAPI v2.9.1+ | No | Enables rich text effects in override text fields |

:::tip
All optional dependencies are detected automatically at runtime. Install them for extra features, or leave them out — Loot Log works standalone with no required dependencies.
:::
