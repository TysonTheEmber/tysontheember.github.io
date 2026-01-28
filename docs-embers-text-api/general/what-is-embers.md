---
sidebar_position: 1
title: What Is Embers Text API?
description: Introduction to the mod and what it does.
---

# What Is Embers Text API?

Embers Text API is a Minecraft mod that adds rich, animated, and interactive text rendering to the game. It gives mod developers and modpack creators the ability to display on-screen messages with visual effects — things like rainbow color transitions, bouncing text, neon glows, typewriter reveals, and much more — all without writing complex rendering code from scratch.

## The Problem It Solves

Minecraft's built-in text system is functional but limited. By default:

- Text is plain or uses basic formatting codes (bold, italic, color).
- There is no support for animated effects on text.
- Displaying rich on-screen messages (like a title, a tutorial prompt, or a quest notification) requires building custom rendering logic.
- Each mod that wants fancy text has to re-invent the wheel.

Embers Text API solves this by providing:

1. **A shared effect system** — Any mod can use the same set of built-in visual effects without duplicating code.
2. **Markup-based text styling** — Text can be styled using simple XML-like tags, similar to how HTML works, making it accessible for JSON configuration and in-game commands.
3. **Immersive Messages** — Full-featured on-screen messages that support positioning, backgrounds, animations, and fade effects.
4. **Per-character rendering control** — Effects are applied individually to each character, enabling smooth wave patterns, per-letter color gradients, and complex multi-layered visuals.

## Who Is This For?

| Audience | How They Use It |
|---|---|
| **Players** | See animated text in mods that use this API. No action needed — it works automatically. |
| **Modpack Creators** | Use markup syntax in config files, commands, or JSON to style text without writing Java code. |
| **Mod Developers** | Integrate the API into your mod to display rich text, register custom effects, and leverage the full rendering pipeline. |

## Version Information

| Property | Value |
|---|---|
| Mod Version | 2.0.0 |
| Minecraft Version | 1.20.1 |
| Mod Loader | Forge (47.4.0) |
| Java Version | 17 |

## What's New in v2

Version 2 is a major overhaul of the text rendering system. Key changes from v1:

- **Unified Effect System** — All visual effects (rainbow, wave, shake, glitch, neon, etc.) are now part of a single composable registry. In v1, many of these were hardcoded or implemented as separate one-off systems.
- **Span-Based Rendering** — Messages are composed of `TextSpan` objects. Each span carries its own text, styling, and effects. This replaces the older global-styling approach.
- **Effect Composition** — Multiple effects can be stacked on the same text span. A single word can simultaneously have a rainbow color cycle and a wave motion.
- **Preset System** — Bundles of effects and styles can be packaged into reusable JSON presets, usable directly from markup tags.
- **Typewriter and Obfuscation Effects** — These are now first-class effects in the registry, with full support for looping, reset delays, sounds, and multiple reveal directions.
