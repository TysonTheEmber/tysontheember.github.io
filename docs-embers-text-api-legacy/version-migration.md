---
sidebar_position: 8
---

# Version Migration Guide

Understanding the differences between v1 and v2, and how to prepare for the transition.

## Version Overview

### v1 (Current - Stable)

**Status:** Production Ready
**Support:** Active, will continue to work after v2 release
**Deprecation:** Features will be marked deprecated when v2 releases, but remain functional

v1 is the current public version of Embers Text API. It provides all core functionality including:
- Text styling (colors, gradients, fonts)
- Animations (typewriter, shake, obfuscation)
- Backgrounds (solid, gradient, textured)
- Message management (tracked messages)
- Full command support

### v2 (In Development)

**Status:** Beta/Development
**Availability:** Not yet publicly released
**Focus:** Improved API structure, performance, and new features

v2 is being actively developed and will introduce:
- Enhanced builder pattern with improved method chaining
- New animation systems and effects
- Better performance optimizations
- Improved message management API
- Backward compatibility layer for v1 code

---

## Current v1 Features

All documentation in this guide covers v1 features, which are stable and production-ready:

### ✅ Fully Supported in v1

- **Commands:**
  - `/emberstextapi test`
  - `/emberstextapi send`
  - `/emberstextapi sendcustom`

- **Builder API:**
  - `ImmersiveMessage.builder()`
  - Fluent method chaining
  - All styling methods

- **Message Management:**
  - `EmbersMessages.open()`
  - `EmbersMessages.update()`
  - `EmbersMessages.close()`
  - `EmbersMessages.closeAll()`

- **Effects:**
  - Colors and gradients
  - Typewriter animation
  - Shake effects (wave, circular, random)
  - Obfuscation with reveal modes
  - Backgrounds (solid, gradient, textured)
  - Fade in/out

- **Positioning:**
  - 9 anchor points
  - Text alignment
  - Pixel offsets
  - Text wrapping

---

## What's Coming in v2

:::caution Development Status
v2 features listed below are in development and subject to change. This is not a final specification.
:::

### Expected Improvements

#### 1. Span-Based Effects System

**Major Change:** v2 moves from whole-render effects to span-based effects, allowing fine-grained control over text segments.

**v1 (Current):**
```java
// Effects apply to entire text
ImmersiveMessage message = ImmersiveMessage.builder(100, "Text")
    .gradient(0xFF0000, 0x0000FF)
    .typewriter(2.0f, true)
    .build();
```

**v2 (Planned):**
```java
// Effects can be applied to specific spans/segments
// Allows effects within quest text, item descriptions, etc.
```

This enables:
- Per-word or per-character styling
- Mixed effects in single text
- Integration with vanilla text components
- Effects in item descriptions, quest text, tooltips

#### 2. Global Styling System

v2 introduces global styling that can be used anywhere in Minecraft:
- Quest systems
- Item descriptions
- Chat messages
- Tooltips
- Any text component

This makes effects universally applicable rather than limited to overlay messages.

#### 3. New Rendering Capabilities

Beyond text-only rendering, v2 adds:

**Item Rendering:**
- Display items inline with text
- Animated item displays
- Item tooltips integration

**Entity Rendering:**
- Render entities in overlays
- Animated entity displays
- Entity preview in text

**Texture Rendering:**
- Advanced texture integration
- Custom texture animations
- More flexible texture modes

**Additional Effects:**
- More animation types
- Enhanced visual effects
- Better composition options

#### 4. Multiple Simultaneous Renders

v2 supports displaying multiple renders at once:
- Layer multiple text overlays
- Combine text + items + entities
- Complex HUD compositions
- Rich multimedia displays

#### 5. Improved Effect Configuration

Enhanced configuration system:
- More granular effect control
- Better parameter customization
- Improved effect timing
- Animation easing and curves
- Per-effect configuration profiles

#### 6. Inspiration from Text Animator

v2 is inspired by [Snownee's Text Animator mod](https://www.curseforge.com/minecraft/mc-mods/text-animator), incorporating similar concepts:
- Text animation techniques
- Span-based styling approach
- Universal text effect application
- Rich formatting capabilities

---

## Key Differences: v1 vs v2

### v1: Overlay-Focused
- Effects apply to entire overlay messages
- Primarily for HUD/screen overlays
- Whole-text animations
- Single render per message

### v2: Universal Text Effects
- Span-based effects for granular control
- Works anywhere text appears in Minecraft
- Per-segment animations
- Multiple simultaneous renders
- Item/entity/texture rendering
- Global styling system

### Migration Impact

The shift from whole-render to span-based effects represents a significant architectural change. While v1 code will continue to work through a compatibility layer, taking full advantage of v2 will require understanding the new span-based paradigm.

---

## Preparing for v2

### Best Practices for v1 Code

To make your v1 code easier to migrate when v2 releases:

#### 1. Use Abstraction Layers

**Instead of:**
```java
// Direct API calls throughout your code
EmbersTextAPI.sendMessage(player,
    ImmersiveMessage.builder(100, "Text").build());
```

**Do this:**
```java
// Centralized wrapper
public class MessageHelper {
    public static void sendMessage(ServerPlayer player, String text, int duration) {
        ImmersiveMessage message = ImmersiveMessage.builder(duration, text)
            .build();
        EmbersTextAPI.sendMessage(player, message);
    }
}

// Usage
MessageHelper.sendMessage(player, "Text", 100);
```

This makes it easier to update all messages in one place when v2 releases.

#### 2. Centralize Message Configurations

**Instead of:**
```java
// Scattered configuration
.gradient(0xFF0000, 0x0000FF)
.typewriter(2.0f, true)
.shadow(true)
```

**Do this:**
```java
// Reusable configurations
public class MessageStyles {
    public static ImmersiveMessage.Builder applyQuestStyle(ImmersiveMessage.Builder builder) {
        return builder
            .gradient(0xFFD700, 0xFFA500)
            .shadow(true)
            .anchor(TextAnchor.TOP_CENTER);
    }
}

// Usage
ImmersiveMessage message = ImmersiveMessage.builder(100, "Quest text")
    .apply(MessageStyles::applyQuestStyle)
    .build();
```

#### 3. Document Your Dependencies

Keep track of which v1 features you're using:

```java
/**
 * Uses Embers Text API v1 features:
 * - ImmersiveMessage.builder()
 * - EmbersMessages.update()
 * - Gradient colors
 * - Typewriter animation
 *
 * Migration notes for v2:
 * - Check if gradient API has changed
 * - Verify typewriter centering still works
 */
public class MyQuestSystem {
    // ...
}
```

#### 4. Use Versioned Imports (When Possible)

```java
// If v2 provides a compatibility layer, you might see:
import com.emberstextapi.v1.ImmersiveMessage;  // Explicit v1
// vs
import com.emberstextapi.ImmersiveMessage;     // Latest version
```

---

## Deprecation Timeline

### When v2 Releases

1. **v1 continues to work** - No immediate changes required
2. **Deprecation warnings** - IDE will show warnings on v1 APIs
3. **Documentation updated** - v2 becomes the recommended version
4. **Migration guide published** - Detailed steps for upgrading

### Expected Deprecation Process

```
v2.0 Release
  ↓
v1 marked deprecated (but functional)
  ↓
6-12 months migration period
  ↓
v1 compatibility may be removed in future major version
```

:::note
The exact timeline will be announced when v2 is released. v1 will be supported for a significant transition period.
:::

---

## Migration Strategy

When v2 releases, follow this approach:

### Phase 1: Assessment (Week 1)

1. **Read v2 documentation** thoroughly
2. **Review changelog** for breaking changes
3. **Check compatibility layer** availability
4. **Identify affected code** in your project
5. **Test in development** environment

### Phase 2: Testing (Week 2-3)

1. **Create test branch** for migration
2. **Update dependencies** to v2
3. **Fix deprecation warnings** one module at a time
4. **Test all message displays** visually
5. **Verify animations** work as expected

### Phase 3: Migration (Week 4+)

1. **Update code** following v2 patterns
2. **Refactor abstractions** if needed
3. **Update tests** for new API
4. **Document changes** in your codebase
5. **Deploy to production** when stable

### Phase 4: Optimization

1. **Use v2-exclusive features** where beneficial
2. **Improve performance** with v2 optimizations
3. **Clean up** old compatibility code
4. **Update documentation** for your users

---

## Backward Compatibility

### What Will Likely Stay Compatible

Based on typical API evolution:

✅ **Probably Safe:**
- Basic message creation
- Core positioning (anchors)
- Standard colors and gradients
- Simple animations
- NBT command structure

⚠️ **May Change:**
- Advanced builder methods
- Message management internals
- Custom network packets
- Internal renderer hooks

❌ **May Be Removed:**
- Deprecated methods
- Legacy compatibility code
- Internal/private APIs

---

## Staying Updated

### How to Track v2 Development

1. **GitHub Repository:**
   - Watch for releases
   - Read commit messages
   - Check milestone progress

2. **Community Channels:**
   - Join Discord/Forum discussions
   - Follow developer announcements
   - Participate in beta testing

3. **Documentation:**
   - Subscribe to documentation updates
   - Check for migration guides
   - Review API changelogs

### When to Upgrade

**Upgrade Early If:**
- You're starting a new project
- You need v2-exclusive features
- You have time for thorough testing
- You want to provide feedback

**Wait If:**
- Your v1 code is stable in production
- You don't need new features immediately
- Your project is in critical development phase
- You prefer battle-tested releases

---

## FAQ

### Will my v1 code break when v2 releases?

No. v1 code will continue to work. You'll see deprecation warnings, but functionality remains.

### How long will v1 be supported?

The exact timeline will be announced with v2, but expect at least 6-12 months of full support.

### Can I use v1 and v2 simultaneously?

This depends on v2's implementation. Typically, you'll use one version at a time per project.

### Will commands change?

Commands will likely remain similar or have v2 equivalents. The `/emberstextapi` command structure should be familiar.

### Do I need to update immediately?

No. Update when you're ready and have time to test thoroughly.

### Will there be breaking changes?

Some APIs may change, but a compatibility layer is expected to ease migration.

---

## Resources

### Current (v1) Resources

- [Getting Started](getting-started.md)
- [Commands Reference](commands.md)
- [Developer API](developer-api.md)
- [Styling & Effects](styling-effects.md)
- [NBT Configuration](nbt-configuration.md)
- [Examples](examples.md)

### When v2 Releases

Watch for:
- v2 Migration Guide
- v2 API Documentation
- v2 Examples
- Changelog and Release Notes
- Community Migration Stories

---

## Feedback

If you have concerns about the v1 → v2 transition:

1. **Open an issue** on GitHub
2. **Join community discussions** about migration
3. **Share your use cases** to help shape v2
4. **Report compatibility problems** during beta testing

Your feedback helps ensure a smooth transition for all users!

---

## Summary

- **v1 is stable** and will remain functional
- **v2 is in development** with improvements
- **No immediate action needed** - v1 works great
- **Plan ahead** by following best practices
- **Migration path** will be clearly documented
- **Plenty of time** to upgrade when v2 releases

Continue building with v1 confidently. When v2 arrives, you'll have clear migration guidance and ample time to upgrade.
