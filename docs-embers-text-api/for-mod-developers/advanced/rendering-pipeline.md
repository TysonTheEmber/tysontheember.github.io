---
sidebar_position: 2
title: Rendering Pipeline
description: How text travels from ImmersiveMessage creation through six stages to pixels on screen.
---

# Rendering Pipeline

This page explains exactly how a message travels from creation to pixels on screen.

---

## Stage 1: Message Creation (Server)

A mod creates an `ImmersiveMessage` on the server:

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

Or from markup:

```java
List<TextSpan> spans = MarkupParser.parse("<rainbow><bold>Hello!</bold></rainbow>");
ImmersiveMessage msg = new ImmersiveMessage(spans, 200f);
```

---

## Stage 2: Network Transmission

```java
EmbersTextAPI.sendMessage(serverPlayer, msg);
```

Internally this:
1. Serializes the `ImmersiveMessage` to NBT (including all `TextSpan` data).
2. Wraps it in an `S2C_OpenMessagePacket` with a unique UUID.
3. Sends via the platform's network channel.

| Loader | Transport |
|---|---|
| Forge 1.20.1 | Forge `SimpleChannel` with manual buffer encoding |
| NeoForge 1.21.1 | NeoForge `StreamCodec` system |
| Fabric | Fabric Networking API with custom codecs |

On the client, the packet handler deserializes the NBT back into an `ImmersiveMessage`.

---

## Stage 3: Client-Side Storage

```java
ClientMessageManager.open(uuid, message)
```

The message is wrapped in an `ActiveMessage` and stored in a `ConcurrentHashMap<UUID, ActiveMessage>`. It is now part of the active message set and will be ticked and rendered every frame.

---

## Stage 4: Per-Tick Updates

Each game tick, `ClientMessageManager.onClientTick()` iterates all active messages:

- Increments each message's `age` counter.
- Checks if `age >= duration` — if so, removes the message.
- Checks if the GUI scale has changed and clears the `TextLayoutCache` if needed.
- Advances channel queues: if all messages in a channel's current step have expired, the next step begins.

---

## Stage 5: Per-Frame Rendering

Each frame, the loader-specific HUD callback invokes `ClientMessageManager.render(...)`.

Before drawing, the renderer:
1. Enables blend, disables depth test, resets shader color.
2. Applies a positive GUI Z translate (`+200`) to keep immersive text above vanilla HUD elements.

For each active message:

### 5a. Position Calculation

Screen position is computed from:
- `anchor` → normalized x/y factors (0.0–1.0)
- `xOffset` / `yOffset` → pixel adjustments
- `scale` → size multiplier

### 5b. Background Rendering

If a background is enabled, `BackgroundRenderer` draws a colored rectangle (optionally with gradient or border) behind where the text will appear.

### 5c. Text Rendering — The Core Loop

For each `TextSpan` in the message:

1. **Iterate characters** in the span's content string.
2. For each character:
   - Create an `EffectSettings` object with base properties (index, codepoint, color from TextColor, alpha = 1.0).
   - **Apply each effect** in the span's effect list, in order. Each effect's `apply(EffectSettings)` modifies the settings in place.
   - After all effects run, the final `EffectSettings` state determines how the character is drawn.
3. **Render the glyph** using `BakedGlyphMixin.emberstextapi$render()`.

### 5d. Sibling Layer Rendering

Effects like neon and glitch add "sibling" layers to `EffectSettings`. Each sibling is an additional character copy with different position/color/alpha, rendered as an extra pass. This is how multi-ring glows and slice displacement work.

### 5e. Fade Alpha

The message-level fade-in/fade-out timing adjusts a global alpha multiplier applied on top of all per-character alpha values.

Alpha bytes in the `0..3` range are collapsed to `0`. This protects against a vanilla font behavior where near-zero alpha can appear as fully opaque for one frame during fade transitions.

---

## Stage 6: Glyph Rendering (BakedGlyphMixin)

`BakedGlyphMixin` intercepts Minecraft's `BakedGlyph.render()` method. When the custom path is active:

1. Reads position offset (`x`, `y`) from `EffectSettings`.
2. Reads color (`r`, `g`, `b`, `a`) from `EffectSettings`.
3. Applies rotation if `rot != 0` (matrix transform on the pose stack).
4. Applies vertical masking (`maskTop`, `maskBottom`) for glitch slice effects.
5. Handles italic slant if the character style requires it.
6. Draws the glyph vertices with the transformed position and color.

---

## Tooltip Rendering

The effect system also works in standard Minecraft tooltips and text components via a mixin on `LiteralContentsMixin`. When a `TextSpan` with effects is rendered as part of a tooltip, the same per-character pipeline runs. `ViewStateTracker` prevents typewriter/obfuscation animations from resetting every time a tooltip re-renders (which happens frequently on hover).

---

## Performance Considerations

- **`TextLayoutCache`** caches text layout calculations. Cleared automatically on GUI scale change.
- **`NeonEffect`** uses pre-computed trigonometry lookup tables instead of calling `Math.cos`/`Math.sin` per sample.
- **Quality presets** on NeonEffect: `q=1` = 6 samples, `q=2` = 12 samples, `q=3` = 20 samples per character.
- **Sibling layers** (neon, glitch) add rendering cost proportional to character count × quality × sibling count. Use `q=1` for neon on long strings.
- Effects are processed sequentially per character. Stacking many complex effects grows cost linearly.

| Effect | Extra Passes Per Character |
|---|---|
| Neon (q=1) | ~6 |
| Neon (q=2) | ~12 |
| Neon (q=3) | ~20 |
| Glitch (slices=2) | 1 slice (+ optional chromatic) |
| Glitch (slices=4) | 3 slices |
