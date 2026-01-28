---
sidebar_position: 1
title: Architecture Overview
description: How the mod is structured, its major systems, and how they relate.
---

# Architecture Overview

This page describes the internal structure of Embers Text API v2, how its major systems relate to each other, and where each piece of functionality lives in the codebase.

---

## Package Layout

```
net.tysontheember.emberstextapi/
├── EmbersTextAPI                    # Main mod entry point (@Mod class)
├── config/                          # Forge configuration system
│   └── ModConfig
├── client/                          # Client-side message management
│   ├── ClientMessageManager         # Stores and ticks all active messages
│   ├── ActiveMessage                # Wrapper for a single active message
│   ├── TextLayoutCache              # Caches text layout calculations
│   └── ...
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
├── net/                             # Network packet definitions
│   ├── S2C_OpenMessagePacket
│   ├── S2C_UpdateMessagePacket
│   ├── S2C_CloseMessagePacket
│   └── S2C_CloseAllMessagesPacket
├── network/                         # Network channel registration
│   └── Network
├── mixin/                           # Mixin classes for rendering integration
│   ├── StyleMixin                   # Global item rendering
│   └── client/
│       ├── BakedGlyphMixin          # Per-character effect rendering hook
│       ├── StringSplitterMixin      # Text layout caching
│       └── ...
├── duck/                            # Mixin duck interfaces
│   ├── ETABakedGlyph
│   └── ETAStyle
├── typewriter/                      # Typewriter animation state management
└── util/                            # Cross-cutting utilities
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
│  Per-frame: ImmersiveMessage.render()                            │
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

1. `EmbersTextAPI` constructor registers event listeners and mod config.
2. `commonSetup` (FMLCommonSetupEvent) registers the network channel.
3. `onClientSetup` (FMLClientSetupEvent, client-only) initializes the effect registry with all built-in effects and locks it.
4. At runtime, messages are sent/received via network packets and rendered each frame by `ClientMessageManager`.
