---
sidebar_position: 0
title: Introduction
description: Welcome to Embers Text API v2 documentation.
---

# Embers Text API v2

Welcome to the official documentation for **Embers Text API v2** — a comprehensive text rendering API for Minecraft 1.20.1 (Forge).

---

## What Is This?

Embers Text API gives Minecraft mods the ability to display rich, animated, and interactive text on screen. It provides:

- **18 built-in visual effects** — rainbow, gradient, wave, shake, bounce, glitch, neon glow, typewriter, and more.
- **A markup language** — XML-style tags for declarative text styling in config files, commands, and JSON.
- **Immersive Messages** — Full-featured on-screen messages with positioning, backgrounds, fade animations, and per-character effects.
- **A composable effect system** — Stack multiple effects on the same text. Each effect modifies the rendering state independently.
- **Inline items and entities** — Render Minecraft item icons and entity models directly within text.

---

## Quick Start

### Markup Example

```markup
<neon r=2><rainbow><bold>Hello, World!</bold></rainbow></neon>
```

This creates bold text with a cycling rainbow color wrapped in a neon glow.

### Java Example

```java
import net.tysontheember.emberstextapi.EmbersTextAPI;
import net.tysontheember.emberstextapi.immersivemessages.api.*;

List<TextSpan> spans = MarkupParser.parse(
    "<rainbow><bold>Welcome!</bold></rainbow> " +
    "<color value=#AAAAAA>Enjoy your stay.</color>"
);

ImmersiveMessage msg = new ImmersiveMessage(spans, 200f);
msg.setAnchor(TextAnchor.CENTER_CENTER);
msg.fadeIn(30);
msg.fadeOut(30);

EmbersTextAPI.sendMessage(player, msg);
```

---

## Documentation Structure

This documentation is organized into four sections:

| Section | Who It's For | What It Covers |
|---|---|---|
| **[General Guide](./general/what-is-embers.md)** | Players, modpack creators, non-programmers | What the mod does, how to use effects via markup, effect reference |
| **[Mod Developer Guide](./developer/architecture.md)** | Mod developers | Architecture, rendering pipeline, effect system design, custom effects |
| **[API Reference](./api-reference/immersive-message.md)** | Developers needing precise class/method documentation | Full class docs, method signatures, serialization details |
| **[Examples](./examples/simple-examples.md)** | Anyone wanting concrete code | Simple and advanced examples with annotations |

---

## Version & Compatibility

| Property | Value |
|---|---|
| Mod Version | 2.0.0 |
| Minecraft | 1.20.1 |
| Mod Loader | Forge 47.4.0 |
| Java | 17 |

---

## What's New in v2

- **Unified Effect Registry** — All effects (color, motion, special, animation) live in one composable system.
- **Span-Based Rendering** — Each piece of text has independent styling and effects.
- **Effect Composition** — Stack multiple effects on the same span.
- **Preset System** — Reusable effect bundles defined in JSON.
- **Typewriter & Obfuscation as Effects** — Full-featured character reveal/hide animations in the effect system.
- **Inline Items and Entities** — Render item icons and entity models within text spans.
