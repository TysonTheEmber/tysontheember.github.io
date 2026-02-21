---
sidebar_position: 1
title: Architecture Overview
description: Multiloader structure, package layout, system diagram, and initialization flow.
---

# Architecture Overview

This page describes the internal structure of Embers Text API v2, its major systems, and how they relate.

---

## Multiloader Architecture

The project uses a multiloader structure with shared common modules per Minecraft version:

```
EmbersTextAPI/
├── common-1.20.1/          # Shared code for MC 1.20.1 (source-only, no JAR)
├── common-1.21.1/          # Shared code for MC 1.21.1 (source-only, no JAR)
├── forge-1.20.1/           # Forge loader implementation
├── fabric-1.20.1/          # Fabric loader implementation (MC 1.20.1)
├── fabric-1.21.1/          # Fabric loader implementation (MC 1.21.1)
└── neoforge-1.21.1/        # NeoForge loader implementation
```

Each **common** module contains the full API, effects, markup parser, serialization, and client logic. The **loader** modules contain platform-specific code: mod entry points, event bus registration, network channel setup, and mixins.

The common modules do not produce JARs — loader modules pull in their source directly via Gradle sourceSet configuration.

The API surface is identical across all loaders — the same effects, markup syntax, and Java API work on Forge, NeoForge, and Fabric.

---

## Package Layout

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
│   ├── api/                         # Public API
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
│   │   ├── visual/                  # 19 built-in effect implementations
│   │   ├── params/                  # Parameter parsing and validation
│   │   └── preset/                  # Effect presets (JSON-based bundles)
│   └── util/                        # Color parsing, ImmersiveColor
├── network/                         # Platform-agnostic network handler interface
├── platform/                        # Platform abstraction interfaces
│   ├── NetworkHelper                # Network abstraction
│   ├── ConfigHelper                 # Config abstraction
│   └── PlatformHelper               # General platform utilities
├── serialization/                   # TextSpan codec and serialization
├── typewriter/                      # Typewriter animation state management
└── util/                            # Cross-cutting utilities
```

---

## Loader Module Structure

### Forge 1.20.1

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

### NeoForge 1.21.1

```
neoforge-1.21.1/
├── EmbersTextAPI                    # @Mod entry point, NeoForge event bus
├── mixin/                           # NeoForge-specific mixins
│   └── client/
│       ├── BakedGlyphMixin
│       └── ...
└── network/                         # NeoForge StreamCodec packets
```

### Fabric

```
fabric-1.21.1/
├── EmbersTextAPIFabric              # ModInitializer (server-side init)
├── EmbersTextAPIFabricClient        # ClientModInitializer (client-side init)
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
                       │  Network (platform-specific transport)
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
│  Per-frame: HUD callback → ClientMessageManager.render()         │
│            (ordered above vanilla chat)                          │
│       │                                                          │
│       ├── For each TextSpan:                                     │
│       │     ├── For each character:                              │
│       │     │     ├── Create EffectSettings                      │
│       │     │     ├── Apply Effect #1                            │
│       │     │     ├── Apply Effect #2 ...                        │
│       │     │     └── Render via BakedGlyphMixin                 │
│       │     └── Render siblings (neon layers, glitch slices)     │
│       └── Render background (if enabled)                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## Key Architectural Decisions

### 1. Span-Based Rendering

Messages are not rendered as a single styled block. They are decomposed into a list of `TextSpan` objects. Each span has its own:
- Text content
- Color and formatting (bold, italic, etc.)
- List of effects
- Optional item or entity rendering

This allows different parts of the same message to have completely different visual treatments.

### 2. Per-Character Effect Application

Effects are not applied to entire spans at once. For each character, an `EffectSettings` object is created and passed through the effect chain. This enables:
- Wave patterns (each character at a different phase)
- Per-character color gradients
- Typewriter animations
- Glitch slice effects at character boundaries

### 3. Registry-Based Effect System

All effects are registered in `EffectRegistry`. This means:
- Built-in effects are locked after initialization.
- Third-party mods can register effects with unique names.
- Effects are created by name from markup or programmatic strings.
- The registry is thread-safe using `ConcurrentHashMap`.

### 4. Mixin-Based Rendering Hook

ETA hooks into Minecraft's character-level rendering pipeline via a mixin on `BakedGlyph`. The mixin adds a custom rendering method (`emberstextapi$render`) that accepts an `EffectSettings` object and applies position, color, alpha, rotation, and masking transforms. This is the lowest level at which per-character customization is possible without replacing the entire text renderer.

### 5. Network Serialization via NBT

Messages are serialized to `CompoundTag` (NBT) for network transmission. Each `TextSpan` is then serialized to a `FriendlyByteBuf` with validation (max lengths, range clamping).

---

## Initialization Flow

### Forge 1.20.1

1. `EmbersTextAPI` constructor registers event listeners.
2. `commonSetup` (`FMLCommonSetupEvent`) registers the Forge `SimpleChannel`.
3. `onClientSetup` (`FMLClientSetupEvent`) initializes the effect registry and locks it.
4. `RegisterGuiOverlaysEvent` registers the HUD overlay above the chat panel.
5. At runtime, messages are sent/received and rendered each frame.

### NeoForge 1.21.1

1. `EmbersTextAPI` constructor registers event listeners.
2. Network packets are registered using `StreamCodec` at mod init.
3. Client setup initializes the effect registry and locks it.
4. `RegisterGuiLayersEvent` registers the GUI layer above chat.

### Fabric (1.20.1 and 1.21.1)

1. `EmbersTextAPIFabric` (`ModInitializer`) registers config, networking, commands, and join handler.
2. `EmbersTextAPIFabricClient` (`ClientModInitializer`) initializes the effect registry and locks it, and registers client event handlers.
3. `HudRenderCallback` runs after `InGameHud` (including chat).

### Render Ordering

| Loader | Registration | Chat Ordering |
|---|---|---|
| Forge 1.20.1 | `RegisterGuiOverlaysEvent` | `registerAbove(VanillaGuiOverlay.CHAT_PANEL, ...)` |
| NeoForge 1.21.1 | `RegisterGuiLayersEvent` | `registerAbove(VanillaGuiLayers.CHAT, ...)` |
| Fabric | `HudRenderCallback` | Runs after `InGameHud` chat rendering |

:::note
The API surface is identical on all loaders. Differences are limited to the mod entry point and network registration — the effect system, markup parser, and rendering pipeline are shared.
:::
