---
sidebar_position: 4
title: Creating Custom Effects
description: Step-by-step guide to writing and registering your own effects.
---

# Creating Custom Effects

This guide walks through creating a custom effect from scratch and registering it so it can be used in markup and programmatically.

---

## Step 1: Implement the Effect

Create a class that extends `BaseEffect`:

```java
package com.yourmod.effects;

import net.minecraft.Util;
import net.minecraft.util.Mth;
import net.tysontheember.emberstextapi.immersivemessages.effects.BaseEffect;
import net.tysontheember.emberstextapi.immersivemessages.effects.EffectSettings;
import net.tysontheember.emberstextapi.immersivemessages.effects.params.Params;
import org.jetbrains.annotations.NotNull;

/**
 * A custom effect that rotates each character based on its index,
 * creating a fan-out rotation pattern.
 */
public class FanEffect extends BaseEffect {

    private final float maxAngle;  // Maximum rotation in radians
    private final float speed;     // Rotation speed multiplier

    public FanEffect(@NotNull Params params) {
        super(params);
        // Parse parameters with defaults
        this.maxAngle = params.getDouble("angle")
            .map(Number::floatValue)
            .orElse(0.5f);  // Default: ~28 degrees
        this.speed = params.getDouble("f")
            .map(Number::floatValue)
            .orElse(1.0f);
    }

    @Override
    public void apply(@NotNull EffectSettings settings) {
        // Skip shadow layer — shadows shouldn't rotate
        if (settings.isShadow) {
            return;
        }

        // Calculate time-based oscillation
        float time = Util.getMillis() * 0.002f * speed;

        // Each character gets a rotation proportional to its index
        // This creates a "fan" where characters at the edges rotate more
        float normalizedIndex = settings.index * 0.1f;  // Scale factor
        settings.rot += Mth.sin(time + normalizedIndex) * maxAngle * normalizedIndex;
    }

    @NotNull
    @Override
    public String getName() {
        return "fan";
    }
}
```

### Key Points

- **Extend `BaseEffect`** — it handles parameter storage and provides color parsing helpers.
- **Accept `Params` in the constructor** — this is how parameters from markup are passed in.
- **Modify `EffectSettings` in `apply()`** — this is where the visual transformation happens.
- **Return a consistent name from `getName()`** — this is used for serialization.
- **Check `settings.isShadow`** if your effect shouldn't modify shadows.

---

## Step 2: Register the Effect

Register your effect during your mod's client setup event. The specific event class depends on your loader:

### Forge 1.20.1

```java
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.event.lifecycle.FMLClientSetupEvent;
import net.tysontheember.emberstextapi.immersivemessages.effects.EffectRegistry;

public class YourMod {

    @SubscribeEvent
    public static void onClientSetup(FMLClientSetupEvent event) {
        event.enqueueWork(() -> {
            EffectRegistry.register("fan", FanEffect::new);
        });
    }
}
```

### NeoForge 1.21.1

```java
import net.neoforged.fml.event.lifecycle.FMLClientSetupEvent;
import net.neoforged.bus.api.SubscribeEvent;
import net.tysontheember.emberstextapi.immersivemessages.effects.EffectRegistry;

public class YourMod {

    @SubscribeEvent
    public static void onClientSetup(FMLClientSetupEvent event) {
        event.enqueueWork(() -> {
            EffectRegistry.register("fan", FanEffect::new);
        });
    }
}
```

### Fabric (1.20.1 and 1.21.1)

```java
import net.fabricmc.api.ClientModInitializer;
import net.tysontheember.emberstextapi.immersivemessages.effects.EffectRegistry;

public class YourModClient implements ClientModInitializer {

    @Override
    public void onInitializeClient() {
        EffectRegistry.register("fan", FanEffect::new);
    }
}
```

> **Important:** Registration must happen during client setup (or later), because the built-in effects are initialized during Embers Text API's own client setup. If you register during an earlier event, your effect may be available but the registry may not be locked yet.

> **Important:** You cannot overwrite built-in effect names after the registry is locked. Use a unique name for your custom effect.

---

## Step 3: Use It in Markup

Once registered, your effect is immediately available in markup:

```markup
<fan>Fan rotation effect</fan>
<fan angle=1.0 f=2.0>Strong fast fan</fan>
```

And programmatically:

```java
TextSpan span = new TextSpan("Fan text")
    .effect("fan angle=0.8 f=1.5");

// Or via the registry directly:
Effect fanEffect = EffectRegistry.parseTag("fan angle=0.8");
span.addEffect(fanEffect);
```

---

## Parameter Parsing Conventions

The `Params` interface provides typed access to parameters:

| Method | Returns | Use For |
|---|---|---|
| `getDouble(key)` | `OptionalDouble` | Numeric values (speed, amplitude, etc.) |
| `getBoolean(key)` | `OptionalBoolean` | Flag values |
| `getString(key)` | `Optional<String>` | Text values (color hex, sound IDs, etc.) |

Always provide sensible defaults using `.orElse()`. Never assume a parameter is present.

---

## Multi-Layer Effects (Siblings)

If your effect needs to render additional character layers (like a glow or a shadow copy), use siblings:

```java
@Override
public void apply(@NotNull EffectSettings settings) {
    // Create a glow layer behind the character
    EffectSettings glowLayer = settings.copy();
    glowLayer.x += 0;  // Same position
    glowLayer.y += 0;
    glowLayer.r = 1.0f;  // White glow
    glowLayer.g = 1.0f;
    glowLayer.b = 1.0f;
    glowLayer.a *= 0.3f; // Semi-transparent
    glowLayer.scale *= 1.2f; // Slightly larger

    settings.addSibling(glowLayer);

    // Main character renders normally (no changes to settings)
}
```

Siblings are rendered as additional passes after the main character.

---

## Validation Best Practices

Use `ValidationHelper.clamp()` to keep parameter values in safe ranges:

```java
import net.tysontheember.emberstextapi.immersivemessages.effects.params.ValidationHelper;

this.amplitude = ValidationHelper.clamp("myeffect", "a",
    params.getDouble("a").map(Number::floatValue).orElse(1.0f),
    0f,    // minimum
    50f    // maximum
);
```

This logs a warning if the value was clamped and prevents extreme values from causing rendering issues.

---

## Testing Your Effect

1. Add the effect to your mod and register it during client setup.
2. Use the `/immersive` command (if available in your test environment) or create a simple test message.
3. Check the client log for any registration warnings or errors.
4. Verify the effect appears correctly in-game.

You can also write unit tests that create effect instances directly and verify their behavior on mock `EffectSettings` objects.
