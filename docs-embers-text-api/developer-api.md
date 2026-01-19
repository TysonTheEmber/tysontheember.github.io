---
sidebar_position: 6
---

# Developer API Reference

This guide covers how to integrate Embers Text API into your Minecraft mod, using the fluent builder pattern and message management system.

## Setup

### Adding the Dependency

Add Embers Text API to your mod's dependencies:

#### build.gradle

```gradle
repositories {
    maven {
        url = "https://www.cursemaven.com"
        content {
            includeGroup "curse.maven"
        }
    }
}

dependencies {
    implementation fg.deobf("curse.maven:embers-text-api-1345948:FILE_ID")
}
```

Replace `FILE_ID` with the latest file ID from [CurseForge](https://www.curseforge.com/minecraft/mc-mods/embers-text-api/files).

### Importing Classes

```java
import com.emberstextapi.EmbersTextAPI;
import com.emberstextapi.message.ImmersiveMessage;
import com.emberstextapi.message.EmbersMessages;
import com.emberstextapi.util.TextAnchor;
import com.emberstextapi.util.TextAlignment;
import com.emberstextapi.util.ShakeType;
```

---

## Creating Messages

### Basic Message Builder

The `ImmersiveMessage.builder()` method uses a fluent builder pattern for creating messages:

```java
ImmersiveMessage message = ImmersiveMessage.builder(100, "Hello, World!")
    .build();
```

**Parameters:**
- `duration` (int) - Display duration in ticks
- `text` (String) - The message to display

### Sending Messages to Players

Use `EmbersTextAPI.sendMessage()` to send messages to players:

```java
ServerPlayer player = // get your player
ImmersiveMessage message = ImmersiveMessage.builder(100, "Welcome!")
    .build();

EmbersTextAPI.sendMessage(player, message);
```

---

## Builder Methods

### Position and Alignment

#### anchor()

Set where the message appears on screen:

```java
.anchor(TextAnchor.CENTER_CENTER)
```

**Available Anchors:**
- `TOP_LEFT`, `TOP_CENTER`, `TOP_RIGHT`
- `CENTER_LEFT`, `CENTER_CENTER`, `CENTER_RIGHT`
- `BOTTOM_LEFT`, `BOTTOM_CENTER`, `BOTTOM_RIGHT`

```java
ImmersiveMessage message = ImmersiveMessage.builder(100, "Centered!")
    .anchor(TextAnchor.CENTER_CENTER)
    .build();
```

#### align()

Set text alignment relative to anchor:

```java
.align(TextAlignment.CENTER)
```

**Available Alignments:**
- `LEFT` - Text extends right from anchor
- `CENTER` - Text centers on anchor
- `RIGHT` - Text extends left from anchor

```java
ImmersiveMessage message = ImmersiveMessage.builder(100, "Right aligned")
    .anchor(TextAnchor.TOP_RIGHT)
    .align(TextAlignment.RIGHT)
    .build();
```

#### offset()

Fine-tune position with pixel offsets:

```java
.offsetX(10)
.offsetY(-20)
```

```java
ImmersiveMessage message = ImmersiveMessage.builder(100, "Offset text")
    .anchor(TextAnchor.CENTER_CENTER)
    .offsetX(50)
    .offsetY(30)
    .build();
```

---

### Colors and Gradients

#### color()

Set a solid color (hex or integer):

```java
.color(0xFF6B6B)  // Hex color
.color(16737643)   // Integer color
```

```java
ImmersiveMessage message = ImmersiveMessage.builder(100, "Red text")
    .color(0xFF0000)
    .build();
```

#### gradient()

Create multi-stop gradients:

```java
.gradient(int... colors)
```

**Two-color gradient:**
```java
ImmersiveMessage message = ImmersiveMessage.builder(100, "Gradient text")
    .gradient(0xFF0000, 0x0000FF)  // Red to blue
    .build();
```

**Multi-stop gradient:**
```java
ImmersiveMessage message = ImmersiveMessage.builder(100, "Rainbow!")
    .gradient(0xFF0000, 0xFFFF00, 0x00FF00, 0x00FFFF, 0x0000FF)
    .build();
```

---

### Animations

#### typewriter()

Create a typing animation effect:

```java
.typewriter(float speed, boolean center)
```

**Parameters:**
- `speed` - Characters per tick (1.0f = 1 char/tick, 2.0f = 2 chars/tick)
- `center` - If true, re-centers text as it types

```java
ImmersiveMessage message = ImmersiveMessage.builder(200, "Typing effect...")
    .typewriter(2.0f, true)
    .anchor(TextAnchor.CENTER_CENTER)
    .build();
```

:::tip Speed Guidelines
- `0.5f` - Slow, dramatic
- `1.0f` - Natural reading pace
- `2.0f` - Quick
- `5.0f+` - Very fast
:::

#### shake()

Add whole-text shake effects:

```java
.shake(ShakeType type, float intensity)
```

**Shake Types:**
- `ShakeType.WAVE` - Smooth wave motion
- `ShakeType.CIRCULAR` - Circular movement
- `ShakeType.RANDOM` - Random jitter

```java
ImmersiveMessage message = ImmersiveMessage.builder(100, "Shaking!")
    .shake(ShakeType.WAVE, 1.5f)
    .build();
```

**Per-character shake:**

```java
.charShake(ShakeType type, float intensity)
```

```java
ImmersiveMessage message = ImmersiveMessage.builder(100, "Each letter shakes!")
    .charShake(ShakeType.RANDOM, 2.0f)
    .build();
```

#### obfuscate()

Add obfuscation with optional reveal:

```java
.obfuscate(String revealMode)
```

**Reveal Modes:**
- `"NONE"` - Always obfuscated
- `"LEFT_TO_RIGHT"` - Reveals from left
- `"RIGHT_TO_LEFT"` - Reveals from right
- `"CENTER_OUT"` - Reveals from center
- `"RANDOM"` - Random character reveal

```java
ImmersiveMessage message = ImmersiveMessage.builder(150, "Secret message")
    .obfuscate("LEFT_TO_RIGHT")
    .build();
```

---

### Fade Effects

#### fadeIn() / fadeOut()

Control fade timing:

```java
.fadeIn(int ticks)
.fadeOut(int ticks)
```

```java
ImmersiveMessage message = ImmersiveMessage.builder(200, "Smooth entrance")
    .fadeIn(40)   // 2 second fade in
    .fadeOut(40)  // 2 second fade out
    .build();
```

---

### Backgrounds

#### backgroundColor()

Set solid background color:

```java
.backgroundColor(int color)
```

```java
ImmersiveMessage message = ImmersiveMessage.builder(100, "With background")
    .backgroundColor(0x000000)  // Black background
    .build();
```

#### backgroundGradient()

Add gradient border to background:

```java
.backgroundGradient(int... colors)
```

```java
ImmersiveMessage message = ImmersiveMessage.builder(100, "Fancy border")
    .backgroundColor(0x000000)
    .backgroundGradient(0xFF0000, 0x0000FF)
    .build();
```

#### background()

Use a textured background:

```java
.background(String texture, String mode, int width, int height, int paddingX, int paddingY)
```

**Modes:**
- `"STRETCH"` - Stretch texture to fit
- `"CROP"` - Crop texture to fit
- `"TILE"` - Tile texture

```java
ImmersiveMessage message = ImmersiveMessage.builder(100, "Textured!")
    .background("minecraft:textures/gui/demo_background.png",
                "STRETCH", 256, 64, 10, 5)
    .build();
```

---

### Text Formatting

#### font()

Use custom fonts:

```java
.font(String fontId)
```

```java
ImmersiveMessage message = ImmersiveMessage.builder(100, "Custom font")
    .font("minecraft:uniform")
    .build();
```

**Built-in Fonts:**
- `"minecraft:default"` - Standard Minecraft font
- `"minecraft:uniform"` - Uniform spacing
- `"minecraft:alt"` - Alternative font
- Custom fonts in `assets/emberstextapi/font/`

#### wrap()

Enable text wrapping at pixel width:

```java
.wrap(int maxWidth)
```

```java
ImmersiveMessage message = ImmersiveMessage.builder(200,
    "This is a very long message that will wrap to multiple lines")
    .wrap(200)
    .build();
```

#### shadow()

Add drop shadow:

```java
.shadow(boolean enabled)
```

```java
ImmersiveMessage message = ImmersiveMessage.builder(100, "With shadow")
    .shadow(true)
    .build();
```

---

## Message Management

### Tracked Messages

Use `EmbersMessages` to create, update, and close messages:

#### open()

Create a tracked message with an ID:

```java
EmbersMessages.open(ServerPlayer player, String messageId, ImmersiveMessage message)
```

```java
ImmersiveMessage message = ImmersiveMessage.builder(1000, "Quest: Find the treasure")
    .anchor(TextAnchor.TOP_CENTER)
    .build();

EmbersMessages.open(player, "quest_objective", message);
```

#### update()

Update an existing tracked message:

```java
EmbersMessages.update(ServerPlayer player, String messageId, ImmersiveMessage newMessage)
```

```java
ImmersiveMessage updated = ImmersiveMessage.builder(1000, "Quest: Return to village")
    .anchor(TextAnchor.TOP_CENTER)
    .color(0x00FF00)
    .build();

EmbersMessages.update(player, "quest_objective", updated);
```

#### close()

Close a specific tracked message:

```java
EmbersMessages.close(ServerPlayer player, String messageId)
```

```java
EmbersMessages.close(player, "quest_objective");
```

#### closeAll()

Close all messages for a player:

```java
EmbersMessages.closeAll(ServerPlayer player)
```

```java
EmbersMessages.closeAll(player);
```

---

## Complete Examples

### Quest Notification System

```java
public class QuestNotifier {

    public void showQuestStart(ServerPlayer player, String questName) {
        ImmersiveMessage message = ImmersiveMessage.builder(200, "New Quest: " + questName)
            .anchor(TextAnchor.CENTER_CENTER)
            .gradient(0xFFD700, 0xFFA500)
            .typewriter(2.0f, true)
            .fadeIn(20)
            .fadeOut(20)
            .backgroundColor(0x000000)
            .shadow(true)
            .build();

        EmbersTextAPI.sendMessage(player, message);
    }

    public void showQuestObjective(ServerPlayer player, String objective) {
        ImmersiveMessage message = ImmersiveMessage.builder(Integer.MAX_VALUE, objective)
            .anchor(TextAnchor.TOP_CENTER)
            .color(0xFFFFFF)
            .offsetY(20)
            .shadow(true)
            .build();

        EmbersMessages.open(player, "current_quest", message);
    }

    public void updateQuestObjective(ServerPlayer player, String newObjective) {
        ImmersiveMessage message = ImmersiveMessage.builder(Integer.MAX_VALUE, newObjective)
            .anchor(TextAnchor.TOP_CENTER)
            .color(0xFFFFFF)
            .offsetY(20)
            .shadow(true)
            .build();

        EmbersMessages.update(player, "current_quest", message);
    }

    public void completeQuest(ServerPlayer player) {
        EmbersMessages.close(player, "current_quest");

        ImmersiveMessage completion = ImmersiveMessage.builder(100, "Quest Complete!")
            .anchor(TextAnchor.CENTER_CENTER)
            .gradient(0x00FF00, 0xFFFF00)
            .shake(ShakeType.WAVE, 1.0f)
            .fadeOut(30)
            .build();

        EmbersTextAPI.sendMessage(player, completion);
    }
}
```

### Boss Health Display

```java
public class BossHealthDisplay {

    public void showBossHealth(ServerPlayer player, String bossName, int health, int maxHealth) {
        float healthPercent = (float) health / maxHealth;
        int barLength = 20;
        int filledBars = (int) (healthPercent * barLength);

        StringBuilder healthBar = new StringBuilder();
        for (int i = 0; i < barLength; i++) {
            healthBar.append(i < filledBars ? "█" : "░");
        }

        String display = String.format("%s\n%s %d/%d",
            bossName, healthBar.toString(), health, maxHealth);

        int color = healthPercent > 0.5 ? 0xFF0000 :
                   healthPercent > 0.25 ? 0xFF6B00 : 0x8B0000;

        ImmersiveMessage message = ImmersiveMessage.builder(Integer.MAX_VALUE, display)
            .anchor(TextAnchor.TOP_CENTER)
            .align(TextAlignment.CENTER)
            .color(color)
            .offsetY(30)
            .shadow(true)
            .build();

        EmbersMessages.update(player, "boss_health", message);
    }

    public void hideBossHealth(ServerPlayer player) {
        EmbersMessages.close(player, "boss_health");
    }
}
```

### Cinematic Dialogue

```java
public class CinematicDialogue {

    public void playDialogueSequence(ServerPlayer player) {
        scheduleMessage(player, 0, "A mysterious voice echoes...", 3.0f);
        scheduleMessage(player, 100, "You shouldn't be here...", 2.0f);
        scheduleMessage(player, 200, "Turn back while you still can!", 2.5f);
    }

    private void scheduleMessage(ServerPlayer player, int delay, String text, float typeSpeed) {
        // Use your preferred scheduling system (Minecraft tick scheduler, etc.)
        server.schedule(() -> {
            ImmersiveMessage message = ImmersiveMessage.builder(150, text)
                .anchor(TextAnchor.BOTTOM_CENTER)
                .align(TextAlignment.CENTER)
                .typewriter(typeSpeed, true)
                .gradient(0xAAAAAA, 0xFFFFFF)
                .fadeIn(10)
                .fadeOut(20)
                .backgroundColor(0x000000)
                .offsetY(-50)
                .build();

            EmbersTextAPI.sendMessage(player, message);
        }, delay);
    }
}
```

### Warning System

```java
public class WarningSystem {

    public void showCriticalWarning(ServerPlayer player, String warning) {
        ImmersiveMessage message = ImmersiveMessage.builder(80, "⚠ " + warning + " ⚠")
            .anchor(TextAnchor.CENTER_CENTER)
            .color(0xFF0000)
            .shake(ShakeType.RANDOM, 2.0f)
            .shadow(true)
            .backgroundColor(0x330000)
            .backgroundGradient(0xFF0000, 0x660000)
            .build();

        EmbersTextAPI.sendMessage(player, message);
    }

    public void showPersistentAlert(ServerPlayer player, String alert) {
        ImmersiveMessage message = ImmersiveMessage.builder(Integer.MAX_VALUE, alert)
            .anchor(TextAnchor.TOP_CENTER)
            .color(0xFFFF00)
            .charShake(ShakeType.WAVE, 0.5f)
            .offsetY(10)
            .shadow(true)
            .build();

        EmbersMessages.open(player, "persistent_alert", message);
    }

    public void clearAlert(ServerPlayer player) {
        EmbersMessages.close(player, "persistent_alert");
    }
}
```

---

## Networking

Embers Text API uses a SimpleChannel for client-server communication. Messages are automatically synchronized when using `EmbersTextAPI.sendMessage()`.

### Custom Packets (Advanced)

If you need to send custom packet data:

```java
// This is handled internally by EmbersTextAPI
// You typically don't need to interact with the network layer directly
```

:::warning
Direct packet manipulation is not recommended. Use the provided API methods for best compatibility.
:::

---

## Best Practices

### Performance

1. **Reuse tracked messages** instead of creating new ones continuously
   ```java
   // Good - updates existing message
   EmbersMessages.update(player, "score", newMessage);

   // Bad - creates new message every tick
   EmbersTextAPI.sendMessage(player, newMessage);
   ```

2. **Clean up messages** when no longer needed
   ```java
   EmbersMessages.close(player, "temporary_message");
   ```

3. **Use appropriate durations** - don't set infinite duration unless necessary

### User Experience

1. **Don't overlap too many messages** - screen space is limited
2. **Use fade effects** for smooth transitions
3. **Match anchor and alignment** for intuitive positioning
4. **Test readability** with different backgrounds and screen sizes

### Compatibility

1. **Check if API is loaded** before sending messages
   ```java
   if (ModList.get().isLoaded("emberstextapi")) {
       EmbersTextAPI.sendMessage(player, message);
   }
   ```

2. **Handle null players** gracefully
   ```java
   if (player != null && player.connection != null) {
       EmbersTextAPI.sendMessage(player, message);
   }
   ```

---

## Troubleshooting

### Messages Not Appearing

1. Verify the player is online and connected
2. Check that duration > 0
3. Ensure message isn't off-screen (check anchor/offset)
4. Verify mod is loaded on both client and server

### Performance Issues

1. Reduce number of simultaneous messages
2. Use simpler effects (avoid multiple shake animations)
3. Close unused tracked messages
4. Optimize typewriter speed for longer text

### Build Errors

1. Verify correct dependency version
2. Check Maven repository is accessible
3. Ensure proper deobfuscation in build.gradle (`fg.deobf()`)

---

## Version Compatibility

### v1 (Current - Stable)

All features documented above are available in v1. This is the current production version.

### v2 (In Development)

v2 will introduce major architectural changes:

**Span-Based Effects System:**
- Apply effects to specific text segments (words, characters, ranges)
- Use animations in quest descriptions, item lore, chat, and tooltips
- Universal text styling system beyond just overlays
- Per-segment effect control

**New Rendering Types:**
- Item rendering inline with text
- Entity rendering in messages
- Advanced texture rendering
- Multiple simultaneous renders

**Enhanced Configuration:**
- More granular effect control
- Improved animation timing and easing
- Better effect composition

**Inspiration:** v2 draws inspiration from [Snownee's Text Animator mod](https://www.curseforge.com/minecraft/mc-mods/text-animator)

**Migration Path:** When v2 releases, v1 APIs will be deprecated but continue to function through a compatibility layer. The shift to span-based effects represents a fundamental architectural change that will enable more powerful and flexible text styling throughout Minecraft.

---

## Next Steps

- Explore [Styling & Effects](styling-effects.md) for visual design tips
- Review [NBT Configuration](nbt-configuration.md) for command-based alternatives
- Check [Examples](examples.md) for more use cases
- Join the community for support and updates
