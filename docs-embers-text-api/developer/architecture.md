---
sidebar_position: 1
title: Architecture Overview
description: How the mod is structured, its major systems, and how they relate.
---

# Architecture Overview

This page describes the internal structure of Embers Text API v2, how its major systems relate to each other, and where each piece of functionality lives in the codebase.

---

## Multiloader Architecture

The project uses a multiloader structure with shared common modules per Minecraft version:

```
EmbersTextAPI/
├── common-1.20.1/          # Shared code for MC 1.20.1
├── common-1.21.1/          # Shared code for MC 1.21.1
├── forge-1.20.1/           # Forge loader implementation
├── fabric-1.20.1/          # Fabric loader implementation (MC 1.20.1)
├── fabric-1.21.1/          # Fabric loader implementation (MC 1.21.1)
└── neoforge-1.21.1/        # NeoForge loader implementation
```

Each **common** module contains the full API, effects, markup parser, serialization, and client logic. The **loader** modules contain platform-specific code: mod entry points, event bus registration, network channel setup, and mixins.

This means the API surface is identical across all loaders — the same effects, markup syntax, and Java API work on Forge, NeoForge, and Fabric.

---

## Package Layout (Common Module)

```
net.tysontheember.emberstextapi/
├── accessor/                        # Mixin duck interfaces
│   ├── ETABakedGlyph
│   └── ETAStyle
├── client/                          # Client-side message management
│   ├── ClientMessageManager         # Stores and ticks all active messages
│   ├── ActiveMessage                # Wrapper for a single active message
│   ├── TextLayoutCache              # Caches text layout calculations
│   └── ViewStateTracker             # Tracks message view start times
├── immersivemessages/
│   ├── api/                         # Public API — the classes you interact with
│   │   ├── ImmersiveMessage         # The main message class
│   │   ├── TextSpan                 # A styled span of text
│   │   ├── MarkupParser             # Parses XML-style markup into TextSpans
│   │   ├── TextAnchor               # Screen positioning enum
│   │   ├── ObfuscateMode            # Obfuscation direction enum
│   │   └── ShakeType                # Legacy shake type enum
│   ├── effects/                     # The effect system
│   │   ├── Effect                   # Core effect interface
│   │   ├── BaseEffect               # Abstract base with parameter helpers
│   │   ├── EffectRegistry           # Central effect registry
│   │   ├── EffectSettings           # Per-character mutable rendering state
│   │   ├── visual/                  # All 18 built-in effect implementations
│   │   ├── params/                  # Parameter parsing and validation
│   │   ├── preset/                  # Effect presets (JSON-based bundles)
│   │   └── ...
│   └── util/                        # Utilities (color parsing, etc.)
├── network/                         # Platform-agnostic network handler interface
├── platform/                        # Platform abstraction interfaces
│   ├── NetworkHelper                # Network abstraction
│   ├── ConfigHelper                 # Config abstraction
│   └── PlatformHelper               # General platform utilities
├── serialization/                   # TextSpan codec and serialization
├── typewriter/                      # Typewriter animation state management
└── util/                            # Cross-cutting utilities
```

### Loader Module (Forge 1.20.1)

```
forge-1.20.1/
├── EmbersTextAPI                    # @Mod entry point, Forge event bus
├── mixin/                           # Forge-specific mixins
│   ├── StyleMixin
│   └── client/
│       ├── BakedGlyphMixin
│       ├── StringRenderOutputMixin
│       └── ...
└── network/                         # Forge SimpleChannel packets
```

### Loader Module (NeoForge 1.21.1)

```
neoforge-1.21.1/
├── EmbersTextAPI                    # @Mod entry point, NeoForge event bus
├── mixin/                           # NeoForge-specific mixins
│   ├── StyleMixin
│   └── client/
│       ├── BakedGlyphMixin
│       ├── StringRenderOutputMixin
│       └── ...
└── network/                         # NeoForge StreamCodec packets
```

### Loader Module (Fabric)

```
fabric-1.20.1/ (or fabric-1.21.1/)
├── EmbersTextAPIFabric              # ModInitializer entry point
├── EmbersTextAPIFabricClient        # ClientModInitializer entry point
├── commands/                        # Fabric command registration
├── network/fabric/                  # Fabric Networking API packets
└── welcome/                         # Player join handler
```

---

## System Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│  Server Side                                                     │
│                                                                  │
│  Mod Code creates ImmersiveMessage                               │
│       │                                                          │
│       ▼                                                          │
│  EmbersTextAPI.sendMessage(player, message)                      │
│       │                                                          │
│       ▼                                                          │
│  S2C_OpenMessagePacket (NBT serialized)                          │
└──────────────────────┬──────────────────────────────────────────┘
                       │  Network
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│  Client Side                                                     │
│                                                                  │
│  Packet Handler deserializes → ImmersiveMessage                  │
│       │                                                          │
│       ▼                                                          │
│  ClientMessageManager.open(uuid, message)                        │
│       │                                                          │
│       ▼                                                          │
│  Per-tick: ActiveMessage.tick() — age tracking, expiry           │
│       │                                                          │
│       ▼                                                          │
│  Per-frame: Loader HUD callback → ClientMessageManager.render()  │
│            (ordered after vanilla chat)                          │
│       │                                                          │
│       ├── For each TextSpan:                                     │
│       │     ├── For each character:                              │
│       │     │     ├── Create EffectSettings                      │
│       │     │     ├── Apply Effect #1                            │
│       │     │     ├── Apply Effect #2                            │
│       │     │     └── ...                                        │
│       │     └── Render via BakedGlyphMixin                       │
│       └── Render background (if enabled)                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## Key Architectural Decisions

### 1. Span-Based Rendering

Messages are not rendered as a single styled block. Instead, they are decomposed into a list of `TextSpan` objects. Each span has its own:
- Text content
- Color and formatting (bold, italic, etc.)
- List of effects
- Optional item or entity rendering

This allows different parts of the same message to have completely different visual treatments.

### 2. Per-Character Effect Application

Effects are not applied to entire spans at once. Instead, for each character being rendered, an `EffectSettings` object is created and passed through the effect chain. This enables:
- Wave patterns (each character at a different phase)
- Per-character color gradients
- Typewriter animations (characters revealed individually)
- Glitch effects (slicing at character boundaries)

### 3. Registry-Based Effect System

All effects are registered in a central `EffectRegistry`. This means:
- Built-in effects are locked after initialization (can't be overwritten).
- Third-party mods can register new effects with unique names.
- Effects are created by name from markup or programmatic strings.
- The registry is thread-safe using `ConcurrentHashMap`.

### 4. Mixin-Based Rendering Hook

Embers Text API hooks into Minecraft's character-level rendering pipeline via a mixin on `BakedGlyph`. This is the lowest level at which per-character customization is possible without replacing the entire text renderer. The mixin adds a custom rendering method (`emberstextapi$render`) that accepts an `EffectSettings` object and applies position, color, alpha, rotation, and masking transforms.

### 5. Network Serialization via TextSpan

When messages are sent from server to client, each `TextSpan` is serialized to a network buffer using custom `encode`/`decode` methods. This includes all styling, effects (as serialized strings), and content properties. The serialization includes validation (max lengths, range clamping) to prevent malicious or malformed data.

---

## Mod Initialization Flow

The initialization sequence is the same across all loaders, though the specific event classes and entry points differ:

### Forge 1.20.1

1. `EmbersTextAPI` constructor registers event listeners and mod config.
2. `commonSetup` (`FMLCommonSetupEvent`) registers the network channel via Forge's `SimpleChannel`.
3. `onClientSetup` (`FMLClientSetupEvent`, client-only) initializes the effect registry with all built-in effects and locks it.
4. During client mod-event registration, a HUD overlay is registered with `RegisterGuiOverlaysEvent` using `registerAbove(VanillaGuiOverlay.CHAT_PANEL, ...)`.
5. At runtime, messages are sent/received via network packets and rendered each frame by `ClientMessageManager` in that chat-above overlay layer.

### NeoForge 1.21.1

1. `EmbersTextAPI` constructor registers event listeners.
2. Network packets are registered using NeoForge's `StreamCodec` system.
3. Client setup initializes the effect registry with all built-in effects and locks it.
4. During client mod-event registration, a GUI layer is registered with `RegisterGuiLayersEvent` using `registerAbove(VanillaGuiLayers.CHAT, ...)`.
5. At runtime, messages are sent/received via network packets and rendered each frame by `ClientMessageManager` in that chat-above layer.

### Fabric (1.20.1 and 1.21.1)

1. `EmbersTextAPIFabric` (`ModInitializer`) registers config, networking, commands, and player join handler.
2. `EmbersTextAPIFabricClient` (`ClientModInitializer`) initializes the effect registry with all built-in effects and locks it, and registers client-side event handlers.
3. Rendering is registered through `HudRenderCallback`, which fires after `InGameHud` (including chat).
4. At runtime, messages are sent/received via Fabric Networking API and rendered each frame by `ClientMessageManager` in this post-chat HUD callback.

### Render Ordering Summary

| Loader | HUD Render Registration | Chat Ordering |
|---|---|---|
| Forge 1.20.1 | `RegisterGuiOverlaysEvent` | `registerAbove(VanillaGuiOverlay.CHAT_PANEL, ...)` |
| NeoForge 1.21.1 | `RegisterGuiLayersEvent` | `registerAbove(VanillaGuiLayers.CHAT, ...)` |
| Fabric 1.20.1 / 1.21.1 | `HudRenderCallback` | Callback runs after `InGameHud` chat rendering |

All loaders use standard HUD render state (blend enabled, depth test disabled, color reset) and a positive GUI Z translate so immersive text stays visible over chat without altering message layout logic.

:::note
The API surface is identical on all loaders. The differences are limited to the mod entry point and network registration — the effect system, markup parser, and rendering pipeline are shared code in the common modules.
:::
