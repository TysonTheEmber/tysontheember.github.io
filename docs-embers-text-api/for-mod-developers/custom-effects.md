---
sidebar_position: 9
title: Custom Effects
description: Step-by-step guide to building and registering your own text effects.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Custom Effects

This guide walks through creating a custom effect from scratch and registering it so it works in markup and programmatically.

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

    private final float maxAngle;
    private final float speed;

    public FanEffect(@NotNull Params params) {
        super(params);
        this.maxAngle = params.getDouble("angle")
            .map(Number::floatValue)
            .orElse(0.5f);  // Default: ~28 degrees
        this.speed = params.getDouble("f")
            .map(Number::floatValue)
            .orElse(1.0f);
    }

    @Override
    public void apply(@NotNull EffectSettings settings) {
        if (settings.isShadow) {
            return;  // Don't rotate shadows
        }

        float time = Util.getMillis() * 0.002f * speed;
        float normalizedIndex = settings.index * 0.1f;
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
- **Accept `Params` in the constructor** — this is how markup parameters are passed in.
- **Modify `EffectSettings` in `apply()`** — this is where the visual transformation happens.
- **Return a consistent name from `getName()`** — used for serialization and registry lookup.
- **Check `settings.isShadow`** if your effect shouldn't modify shadow rendering.

---

## Step 2: Register the Effect

Register during your mod's **client setup** event:

<Tabs groupId="loader">
<TabItem value="forge" label="Forge 1.20.1">

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

</TabItem>
<TabItem value="neoforge" label="NeoForge 1.21.1">

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

</TabItem>
<TabItem value="fabric" label="Fabric">

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

</TabItem>
</Tabs>

:::note
Registration must happen during client setup or later — after ETA has initialized and locked the built-in effects. You cannot overwrite built-in effect names. Use a unique name.
:::

---

## Step 3: Use It

Once registered, your effect is available in markup:

```markup
<fan>Fan rotation effect</fan>
<fan angle=1.0 f=2.0>Strong fast fan</fan>
```

And programmatically:

```java
TextSpan span = new TextSpan("Fan text")
    .effect("fan angle=0.8 f=1.5");

// Or via the registry:
Effect fanEffect = EffectRegistry.parseTag("fan angle=0.8");
span.addEffect(fanEffect);
```

---

## Parameter Parsing

The `Params` interface provides typed access to markup parameters:

| Method | Returns | Use For |
|---|---|---|
| `getDouble(key)` | `OptionalDouble` | Numeric values (speed, amplitude, etc.) |
| `getBoolean(key)` | `OptionalBoolean` | Flag values |
| `getString(key)` | `Optional<String>` | Text values (color hex, sound IDs, etc.) |

Always provide sensible defaults using `.orElse()`. Never assume a parameter is present.

```java
this.amplitude = params.getDouble("a")
    .map(Number::floatValue)
    .orElse(1.0f);

this.enabled = params.getBoolean("on")
    .orElse(true);

this.colorHex = params.getString("col")
    .orElse("FFFFFF");
```

---

## Validation

Use `ValidationHelper.clamp()` to keep parameter values in safe ranges:

```java
import net.tysontheember.emberstextapi.immersivemessages.effects.params.ValidationHelper;

this.amplitude = ValidationHelper.clamp(
    "myeffect",  // Effect name (for log messages)
    "a",         // Parameter name (for log messages)
    params.getDouble("a").map(Number::floatValue).orElse(1.0f),
    0f,          // Minimum
    50f          // Maximum
);
```

This logs a warning if the value was clamped and prevents extreme values from causing rendering issues.

---

## Multi-Layer Effects (Siblings)

If your effect needs to render additional character layers (glow, shadow copy, displaced slice), add siblings:

```java
@Override
public void apply(@NotNull EffectSettings settings) {
    // Create a glow copy of this character
    EffectSettings glow = settings.copy();
    glow.r = 1.0f;
    glow.g = 0.8f;
    glow.b = 0.0f;    // Orange glow
    glow.a *= 0.25f;   // 25% opacity
    glow.scale *= 1.3f; // Slightly larger

    settings.addSibling(glow);

    // The main character renders normally (no changes to settings)
}
```

Siblings are rendered as additional passes after the main character. The neon and glitch effects use this mechanism extensively.

:::tip
Siblings add per-character render cost. Use them sparingly on messages with many characters.
:::

---

## Color Parsing

`BaseEffect` provides color parsing helpers:

```java
// From a Params parameter named "col"
float[] rgb = parseColor(params, "col", new float[]{1f, 1f, 1f});  // Default white

// From a hex string directly
Optional<float[]> rgb = parseColor("#FF0000");

// Then use in apply():
settings.r = rgb[0];
settings.g = rgb[1];
settings.b = rgb[2];
```

---

## Testing Your Effect

1. Register the effect during client setup.
2. Run the game and use `/eta send @p 100 <fan>Test</fan>`.
3. Check the client log for registration warnings or errors.
4. Adjust parameters and iterate.

For unit tests, create effect instances directly and verify their behavior on mock `EffectSettings` objects:

```java
Params params = TypedParams.of("angle", 0.5, "f", 1.0);
FanEffect effect = new FanEffect(params);

EffectSettings settings = new EffectSettings();
settings.index = 0;
effect.apply(settings);

// Verify the effect modified rot as expected
```
