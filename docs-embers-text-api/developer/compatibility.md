---
sidebar_position: 5
title: Performance and Compatibility
description: Performance guidance, known compatibility notes, and integration tips.
---

# Performance and Compatibility

---

## Performance Considerations

### Per-Character Cost

Effects are applied per character per frame. The cost of rendering a message is approximately:

```
Cost ≈ (number of characters) × (number of effects per character) × (effect complexity)
```

Most simple effects (wave, shake, rainbow) are very cheap — a few math operations per character. Complex effects (neon, glitch) are more expensive because they create sibling layers.

### Sibling Layer Cost

Each sibling layer is an additional glyph render pass. Effects that create siblings:

| Effect | Siblings Per Character |
|---|---|
| Neon (q=1) | ~6 glow layers |
| Neon (q=2) | ~12 glow layers |
| Neon (q=3) | ~20 glow layers |
| Glitch (slices=2) | 1 slice layer (+ optional chromatic) |
| Glitch (slices=4) | 3 slice layers |

**Recommendation:** Use `q=1` for neon on messages with many characters. Reserve `q=3` for short hero text (titles, single words).

### TextLayoutCache

The `TextLayoutCache` caches computed text layouts. It is automatically cleared when the GUI scale changes. This significantly reduces redundant layout calculations for messages that don't change.

### Typewriter and Obfuscation Tracks

Animation tracks (typewriter, obfuscate) are cached and reused across frames. They use stable cache keys so that the same text content always maps to the same track, preventing unnecessary re-animation.

---

## Compatibility Notes

### Font Renderers

Embers Text API hooks into Minecraft's `BakedGlyph` rendering at the lowest level. This means it works with:
- The default font renderer
- Custom fonts loaded via resource packs (the `<font>` tag)
- Any font that produces `BakedGlyph` objects through the standard pipeline

It does **not** work with external text rendering libraries that bypass Minecraft's glyph system entirely.

### Other Text Mods

If another mod also hooks into `BakedGlyph` or `StringRenderer`, there may be conflicts depending on mixin priority. Embers Text API's mixin only activates its custom path when an `EffectSettings` object is present — otherwise it falls through to vanilla rendering. This means:
- Text not using Embers Text API effects renders normally.
- Conflicts are most likely when two mods both try to modify the same glyph rendering call.

### FTB Quests Integration

Embers Text API includes an optional mixin for FTB Quests (`QuestScreenMixin`) that enables immersive messages in quest UI screens. This mixin is included in the mixin config but will gracefully fail if FTB Quests is not present.

### Architectury API

The mod lists Architectury API as a dependency. This is used for cross-platform compatibility utilities but does not mean the mod supports Fabric or NeoForge directly — it is a Forge mod for Minecraft 1.20.1.

---

## Integration Tips for Mod Developers

### Sending Messages

Always send messages from the server side using:

```java
EmbersTextAPI.sendMessage(serverPlayer, immersiveMessage);
```

Do not attempt to create or render `ImmersiveMessage` objects directly on the server — rendering is client-only.

### Thread Safety

- `EffectRegistry` is thread-safe for reads after initialization.
- Effect registration should happen during mod initialization events, not at arbitrary runtime.
- `ClientMessageManager` operations happen on the main thread.

### Message Lifecycle

- Messages have a finite duration (in ticks). Plan your durations accordingly.
- Use `fadeIn` / `fadeOut` to avoid jarring appearance/disappearance.
- For persistent UI elements, use the update mechanism: send an `S2C_UpdateMessagePacket` to refresh a message before it expires.

### Avoiding Common Pitfalls

1. **Don't stack too many neon effects.** Each neon effect on each character generates 6–20 sibling layers. On a 50-character message at q=2, that's 600 extra render passes per frame.
2. **Don't send messages every tick.** Each `sendMessage` call creates a new network packet. For updating messages, use the update packet with the same UUID.
3. **Don't register effects in `commonSetup`.** The effect registry is initialized during `clientSetup`. Register your effects there or later.
4. **Use `ValidationHelper.clamp()`** for all numeric parameters to prevent extreme values.
