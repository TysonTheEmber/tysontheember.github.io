---
sidebar_position: 4
title: Compatibility
description: Performance guidance, known compatibility notes, HUD layering, font renderers, and integration tips.
---

# Compatibility

---

## Supported Loaders and Versions

| Minecraft | Loaders | Java | Status |
|---|---|---|---|
| 1.20.1 | Forge 47.4.0, Fabric | 17+ | Fully supported |
| 1.21.1 | NeoForge, Fabric | 21+ | Fully supported |

The API surface is identical on all loaders. Differences are limited to the mod entry point and network registration.

:::note
On MC 1.21.1, some internal Minecraft APIs differ from 1.20.1 (e.g., `ResourceLocation.fromNamespaceAndPath()` vs. the constructor, `BuiltInRegistries.ITEM` vs. `ForgeRegistries.ITEMS`). These differences are handled internally — the public API is identical across all loaders and versions.
:::

---

## HUD / Chat Layering

Immersive messages are rendered in a HUD layer intentionally ordered **after** vanilla chat. This prevents chat background and chat glyphs from hiding immersive overlays when they overlap.

| Loader | Render Hook | Chat Ordering |
|---|---|---|
| Forge 1.20.1 | `RegisterGuiOverlaysEvent` | `registerAbove(VanillaGuiOverlay.CHAT_PANEL, ...)` |
| NeoForge 1.21.1 | `RegisterGuiLayersEvent` | `registerAbove(VanillaGuiLayers.CHAT, ...)` |
| Fabric 1.20.1 / 1.21.1 | `HudRenderCallback` | Callback runs after `InGameHud` chat rendering |

The render path also forces standard HUD state (`blend on`, `depth test off`, color reset) and uses a positive GUI Z translate to keep immersive content visually on top without changing layout logic.

---

## Font Renderers

ETA hooks into Minecraft's `BakedGlyph` rendering at the character level. This means it works with:
- The default Minecraft font renderer
- Custom fonts loaded via resource packs (using the `<font>` tag)
- Any font that produces `BakedGlyph` objects through the standard pipeline

It does **not** work with external text rendering libraries that bypass Minecraft's glyph system entirely.

The immersive renderer normalizes very low alpha bytes (`0..3`) to `0` before glyph draw. This avoids a vanilla font edge case where near-zero alpha can appear as fully opaque for a single frame during fade-in/fade-out.

---

## Other Text Mods

If another mod also hooks into `BakedGlyph` or `StringRenderer`, there may be conflicts depending on mixin priority. ETA's mixin only activates its custom path when an `EffectSettings` object is present — otherwise it falls through to vanilla rendering. This means:

- Text not using ETA effects renders completely normally.
- Conflicts are most likely when two mods both try to modify the same glyph rendering call.

If you encounter a conflict with another mod, report it with the mod combination and mixin configuration. Priority adjustments in the mixin config can usually resolve ordering conflicts.

---

## FTB Quests Integration

ETA includes an optional mixin for FTB Quests (`QuestScreenMixin`) that enables immersive messages to render in quest UI screens. This mixin is included in the mixin config but **gracefully fails** if FTB Quests is not present — no errors are thrown.

---

## Performance Considerations

### Per-Character Cost

Effects are applied per character per frame:

```
Cost ≈ (character count) × (effects per character) × (effect complexity)
```

Most simple effects (wave, shake, rainbow) are very cheap — a few math operations per character. Complex effects (neon, glitch) are more expensive because they create sibling layers.

### Sibling Layer Cost

| Effect | Extra Render Passes Per Character |
|---|---|
| Neon (q=1) | ~6 |
| Neon (q=2, default) | ~12 |
| Neon (q=3) | ~20 |
| Glitch (slices=2) | 1 slice layer (+ optional chromatic) |
| Glitch (slices=4) | 3 slice layers |

**Recommendation:** Use `q=1` for neon on messages with many characters. Reserve `q=3` for short hero text (titles, single words). Don't stack neon on top of glitch on 50-character strings.

### TextLayoutCache

`TextLayoutCache` caches computed text layouts and is cleared automatically when the GUI scale changes. It significantly reduces redundant layout calculations for messages that don't change between frames.

---

## Integration Tips

### Always Send from the Server Thread

```java
EmbersTextAPI.sendMessage(serverPlayer, immersiveMessage);
```

Never construct or render `ImmersiveMessage` objects directly on the client side. Rendering is always client-only; sending is always server-only.

### Thread Safety

- `EffectRegistry` is thread-safe for reads after initialization.
- Effect registration must happen during mod initialization events, not at arbitrary runtime.
- `ClientMessageManager` operations happen on the main client thread.

### Message Lifecycle

- Messages have a finite duration (in ticks). Plan your durations accordingly.
- Use `fadeIn` / `fadeOut` to avoid jarring appearance/disappearance.
- For persistent UI elements: use `sendUpdateMessage()` to refresh a message before it expires, rather than closing and reopening it.

### Avoiding Common Pitfalls

1. **Don't stack many neon effects.** At `q=2`, neon on a 50-character message generates 600 extra render passes per frame.
2. **Don't send a message every tick.** Use `sendUpdateMessage()` with the same UUID to update content without creating new network traffic.
3. **Don't register effects too early.** Register during `FMLClientSetupEvent` (Forge/NeoForge) or `onInitializeClient()` (Fabric), not earlier.
4. **Always use `ValidationHelper.clamp()`** for numeric parameters in custom effects to prevent extreme values.
5. **Don't depend on specific message UUIDs** across server restarts — UUIDs are generated fresh each time `sendMessage()` is called.
