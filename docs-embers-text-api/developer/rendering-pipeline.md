---
sidebar_position: 2
title: Rendering Pipeline
description: How text rendering works under the hood, from message to screen.
---

# Rendering Pipeline

This page explains exactly how a message travels from creation to pixels on screen.

---

## Stage 1: Message Creation (Server)

A mod creates an `ImmersiveMessage` on the server side:

```java
ImmersiveMessage msg = new ImmersiveMessage(Component.literal("Hello!"), 200f);
msg.anchor(TextAnchor.MIDDLE);
msg.background(true);
msg.backgroundColors(
    new ImmersiveColor(0x60000000),
    new ImmersiveColor(0xAAFFFFFF),
    new ImmersiveColor(0xAA000000)
);
msg.fadeInTicks(20);
msg.fadeOutTicks(20);
```

Alternatively, a message can be constructed from a list of `TextSpan` objects (parsed from markup):

```java
List<TextSpan> spans = MarkupParser.parse("<rainbow><bold>Hello!</bold></rainbow>");
ImmersiveMessage msg = new ImmersiveMessage(spans, 200f);
```

---

## Stage 2: Network Transmission

The message is sent to a player via:

```java
EmbersTextAPI.sendMessage(serverPlayer, msg);
```

Internally this:
1. Serializes the `ImmersiveMessage` to NBT (including all `TextSpan` data).
2. Wraps it in an `S2C_OpenMessagePacket` with a unique UUID.
3. Sends it via the platform's network channel.

The network transport differs by loader:
- **Forge 1.20.1** — Uses Forge's `SimpleChannel` with manual buffer encoding.
- **NeoForge 1.21.1** — Uses NeoForge's `StreamCodec` system for packet serialization.
- **Fabric** — Uses the Fabric Networking API with custom packet codecs.

On the client, the packet handler deserializes the NBT back into an `ImmersiveMessage`.

---

## Stage 3: Client-Side Storage

`ClientMessageManager.open(uuid, message)` wraps the message in an `ActiveMessage` and stores it in a concurrent map keyed by UUID.

The message is now part of the active message set and will be ticked and rendered every frame.

---

## Stage 4: Per-Tick Updates

Each game tick, `ClientMessageManager.onClientTick()` iterates all active messages:

- Increments each message's `age` counter.
- Checks if `age >= duration` — if so, removes the message.
- Handles GUI scale changes (clears the `TextLayoutCache`).

---

## Stage 5: Per-Frame Rendering

Each frame, the loader-specific HUD callback invokes `ClientMessageManager.render(...)`:

- **Forge 1.20.1** — Registered via `RegisterGuiOverlaysEvent`, ordered with `registerAbove(VanillaGuiOverlay.CHAT_PANEL, ...)`.
- **NeoForge 1.21.1** — Registered via `RegisterGuiLayersEvent`, ordered with `registerAbove(VanillaGuiLayers.CHAT, ...)`.
- **Fabric 1.20.1 / 1.21.1** — Rendered from `HudRenderCallback`, which runs after `InGameHud` (including chat).

This guarantees immersive messages draw after chat, so chat background/text cannot overdraw them.

Before drawing, the renderer enables blend, disables depth test, resets shader color, and applies a positive GUI Z translate (`+200`) for stable top-layer HUD rendering. For each active message:

### 5a. Position Calculation

The message's screen position is calculated from:
- `anchor` (TextAnchor enum → normalized x/y factors)
- `xOffset` / `yOffset` (pixel adjustments)
- `scale` (size multiplier)

### 5b. Background Rendering

If the message has a background enabled, the `BackgroundRenderer` draws a colored rectangle (optionally with gradient or border) behind where the text will appear.

### 5c. Text Rendering — The Core Loop

For each `TextSpan` in the message:

1. **Iterate characters** in the span's content string.
2. For each character:
   - Create an `EffectSettings` object with the character's base properties (index, codepoint, color from the span's TextColor, alpha = 1.0).
   - **Apply each effect** in the span's effect list, in order. Each effect's `apply(EffectSettings)` method modifies the settings in place.
   - After all effects run, the final `EffectSettings` state determines how the character is drawn.
3. **Render the glyph** using `BakedGlyphMixin.emberstextapi$render()`.

### 5d. Sibling Layer Rendering

Some effects (neon, glitch) add "sibling" layers to `EffectSettings`. These are additional copies of the character with different position/color/alpha, rendered as extra passes. This is how multi-ring glows and slice displacement work.

### 5e. Fade Alpha

The message-level fade-in/fade-out timing adjusts a global alpha multiplier that is applied on top of all per-character alpha values.

For immersive message text rendering, alpha bytes in the `0..3` range are collapsed to `0`. This protects against a vanilla font behavior that can interpret near-zero alpha as fully opaque and produce a single-frame flash at fade boundaries.

---

## Stage 6: Glyph Rendering (BakedGlyphMixin)

The `BakedGlyphMixin` intercepts Minecraft's `BakedGlyph.render()` method. When the custom rendering path is active, it:

1. Reads position offset (`x`, `y`) from `EffectSettings`.
2. Reads color (`r`, `g`, `b`, `a`) from `EffectSettings`.
3. Applies rotation if `rot != 0`.
4. Applies vertical masking (`maskTop`, `maskBottom`) for glitch slice effects.
5. Handles italic slant if the character style requires it.
6. Draws the glyph vertices with the transformed position and color.

---

## Tooltip Rendering (Non-ImmersiveMessage)

The effect system also works in standard Minecraft tooltips and text components, not just ImmersiveMessages. When a `TextSpan` with effects is rendered as part of a tooltip (via the mixin on `LiteralContentsMixin`), the same per-character effect pipeline runs. The `ViewStateTracker` prevents typewriter/obfuscation animations from resetting every time a tooltip re-renders (which happens frequently on hover).

---

## Performance Considerations

- **TextLayoutCache** caches text layout calculations to avoid recomputation every frame.
- **NeonEffect** uses pre-computed trigonometry lookup tables instead of calling `Math.cos`/`Math.sin` per sample.
- **Quality presets** on NeonEffect let you trade visual quality for performance (6, 12, or 20 samples).
- **Sibling layers** (used by neon and glitch) add rendering cost. Complex effects on large amounts of text can be expensive. Use quality=1 for neon on low-end systems.
- Effects are processed sequentially per character. If you stack many effects, the per-character cost grows linearly.
