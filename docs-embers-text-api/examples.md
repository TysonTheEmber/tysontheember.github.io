---
sidebar_position: 7
---

# Examples & Tutorials

Practical examples and use cases for Embers Text API.

## Quick Examples

### 1. Welcome Message

Show a welcoming message when players join:

**Command:**
```
/emberstextapi sendcustom @p {
  anchor:"CENTER_CENTER",
  gradient:[0x4ECDC4,0x45B7D1,0x6C5CE7],
  typewriter:2.0f,
  typewriterCenter:1b,
  fadeIn:30,
  fadeOut:30,
  shadow:1b
} 180 "Welcome to the Server!"
```

**API:**
```java
@SubscribeEvent
public void onPlayerJoin(PlayerEvent.PlayerLoggedInEvent event) {
    if (event.getEntity() instanceof ServerPlayer player) {
        ImmersiveMessage message = ImmersiveMessage.builder(180, "Welcome to the Server!")
            .anchor(TextAnchor.CENTER_CENTER)
            .gradient(0x4ECDC4, 0x45B7D1, 0x6C5CE7)
            .typewriter(2.0f, true)
            .fadeIn(30)
            .fadeOut(30)
            .shadow(true)
            .build();

        EmbersTextAPI.sendMessage(player, message);
    }
}
```

---

### 2. Death Message

Dramatic death screen effect:

**Command:**
```
/emberstextapi sendcustom @p {
  anchor:"CENTER_CENTER",
  color:0xFF0000,
  charShakeRandom:2.5f,
  fadeIn:10,
  fadeOut:40,
  shadow:1b,
  bgColor:0x000000
} 100 "YOU DIED"
```

**API:**
```java
@SubscribeEvent
public void onPlayerDeath(LivingDeathEvent event) {
    if (event.getEntity() instanceof ServerPlayer player) {
        ImmersiveMessage message = ImmersiveMessage.builder(100, "YOU DIED")
            .anchor(TextAnchor.CENTER_CENTER)
            .color(0xFF0000)
            .charShake(ShakeType.RANDOM, 2.5f)
            .fadeIn(10)
            .fadeOut(40)
            .shadow(true)
            .backgroundColor(0x000000)
            .build();

        EmbersTextAPI.sendMessage(player, message);
    }
}
```

---

### 3. Boss Health Bar

Display and update boss health:

**Command (Initial):**
```
/emberstextapi sendcustom @p {
  anchor:"TOP_CENTER",
  align:"CENTER",
  gradient:[0xFF0000,0xFF6B6B],
  offsetY:30,
  shadow:1b
} 999999 "Dragon Boss ████████████████████ 1000/1000"
```

**API:**
```java
public class BossHealthDisplay {
    private static final int MAX_BARS = 20;

    public void updateBossHealth(ServerPlayer player, String bossName, int health, int maxHealth) {
        float healthPercent = (float) health / maxHealth;
        int filledBars = Math.round(healthPercent * MAX_BARS);

        // Create health bar
        StringBuilder healthBar = new StringBuilder();
        for (int i = 0; i < MAX_BARS; i++) {
            healthBar.append(i < filledBars ? "█" : "░");
        }

        String display = String.format("%s %s %d/%d",
            bossName, healthBar.toString(), health, maxHealth);

        // Color based on health
        int startColor = healthPercent > 0.5 ? 0xFF0000 :
                        healthPercent > 0.25 ? 0xFF6B00 : 0x8B0000;
        int endColor = healthPercent > 0.5 ? 0xFF6B6B :
                      healthPercent > 0.25 ? 0xFFA500 : 0xFF0000;

        ImmersiveMessage message = ImmersiveMessage.builder(Integer.MAX_VALUE, display)
            .anchor(TextAnchor.TOP_CENTER)
            .align(TextAlignment.CENTER)
            .gradient(startColor, endColor)
            .offsetY(30)
            .shadow(true)
            .build();

        EmbersMessages.update(player, "boss_health", message);
    }

    public void showBoss(ServerPlayer player, String bossName, int health, int maxHealth) {
        // Initial display
        updateBossHealth(player, bossName, health, maxHealth);
    }

    public void hideBoss(ServerPlayer player) {
        EmbersMessages.close(player, "boss_health");
    }
}
```

---

### 4. Quest System

Complete quest tracking system:

**API:**
```java
public class QuestSystem {

    public void startQuest(ServerPlayer player, String questName, String objective) {
        // Show quest start announcement
        ImmersiveMessage announcement = ImmersiveMessage.builder(200, "New Quest: " + questName)
            .anchor(TextAnchor.CENTER_CENTER)
            .gradient(0xFFD700, 0xFFA500)
            .typewriter(2.0f, true)
            .fadeIn(20)
            .fadeOut(20)
            .shadow(true)
            .backgroundColor(0x000000)
            .backgroundGradient(0xFFD700, 0xFF8C00)
            .build();

        EmbersTextAPI.sendMessage(player, announcement);

        // Show persistent objective after delay
        scheduleTask(() -> {
            ImmersiveMessage objectiveMsg = ImmersiveMessage.builder(Integer.MAX_VALUE, "◆ " + objective)
                .anchor(TextAnchor.TOP_CENTER)
                .color(0xFFFFFF)
                .offsetY(20)
                .shadow(true)
                .backgroundColor(0x1A1A1A)
                .build();

            EmbersMessages.open(player, "quest_objective", objectiveMsg);
        }, 100); // 5 seconds delay
    }

    public void updateObjective(ServerPlayer player, String newObjective) {
        ImmersiveMessage message = ImmersiveMessage.builder(Integer.MAX_VALUE, "◆ " + newObjective)
            .anchor(TextAnchor.TOP_CENTER)
            .color(0xFFFFFF)
            .offsetY(20)
            .shadow(true)
            .backgroundColor(0x1A1A1A)
            .build();

        EmbersMessages.update(player, "quest_objective", message);
    }

    public void completeQuest(ServerPlayer player, String questName) {
        // Remove objective
        EmbersMessages.close(player, "quest_objective");

        // Show completion message
        ImmersiveMessage completion = ImmersiveMessage.builder(120, "Quest Complete: " + questName)
            .anchor(TextAnchor.CENTER_CENTER)
            .gradient(0x00FF00, 0xFFFF00, 0x00FF00)
            .shake(ShakeType.WAVE, 1.0f)
            .fadeIn(10)
            .fadeOut(30)
            .shadow(true)
            .backgroundColor(0x003300)
            .build();

        EmbersTextAPI.sendMessage(player, completion);
    }
}
```

---

### 5. Countdown Timer

Display a countdown for events:

**API:**
```java
public class CountdownTimer {

    public void startCountdown(ServerPlayer player, int seconds) {
        new BukkitRunnable() {
            int remaining = seconds;

            @Override
            public void run() {
                if (remaining <= 0) {
                    showGo(player);
                    cancel();
                    return;
                }

                showNumber(player, remaining);
                remaining--;
            }
        }.runTaskTimer(plugin, 0L, 20L); // Every second
    }

    private void showNumber(ServerPlayer player, int number) {
        int color = number <= 3 ? 0xFF0000 : 0xFFFF00;
        float shake = number <= 3 ? 2.0f : 0.5f;

        ImmersiveMessage message = ImmersiveMessage.builder(25, String.valueOf(number))
            .anchor(TextAnchor.CENTER_CENTER)
            .color(color)
            .shake(ShakeType.RANDOM, shake)
            .fadeIn(2)
            .fadeOut(10)
            .shadow(true)
            .build();

        EmbersTextAPI.sendMessage(player, message);
    }

    private void showGo(ServerPlayer player) {
        ImmersiveMessage message = ImmersiveMessage.builder(40, "GO!")
            .anchor(TextAnchor.CENTER_CENTER)
            .gradient(0x00FF00, 0xFFFF00)
            .shake(ShakeType.WAVE, 1.5f)
            .fadeOut(20)
            .shadow(true)
            .build();

        EmbersTextAPI.sendMessage(player, message);
    }
}
```

---

### 6. Dialogue System

NPC dialogue with character-by-character typing:

**API:**
```java
public class DialogueSystem {

    public void playDialogue(ServerPlayer player, String npcName, String... lines) {
        int delay = 0;

        for (String line : lines) {
            scheduleDialogueLine(player, npcName, line, delay);

            // Calculate delay for next line (typing time + pause)
            int typingTime = (int) (line.length() / 1.5f) * 20; // 1.5 chars/tick
            delay += typingTime + 60; // Add 3 second pause between lines
        }
    }

    private void scheduleDialogueLine(ServerPlayer player, String npcName, String line, int delay) {
        scheduleTask(() -> {
            String fullText = String.format("<%s> %s", npcName, line);

            ImmersiveMessage message = ImmersiveMessage.builder(200, fullText)
                .anchor(TextAnchor.BOTTOM_CENTER)
                .typewriter(1.5f, false)
                .gradient(0xAAAAAA, 0xFFFFFF)
                .wrap(300)
                .offsetY(-50)
                .shadow(true)
                .backgroundColor(0x000000)
                .backgroundGradient(0x4A4A4A, 0x2A2A2A)
                .fadeIn(10)
                .fadeOut(20)
                .build();

            EmbersTextAPI.sendMessage(player, message);
        }, delay);
    }
}

// Usage:
dialogueSystem.playDialogue(player, "Elder Wizard",
    "Greetings, young adventurer.",
    "I sense great power within you.",
    "But you must first prove yourself worthy.",
    "Go forth and face the trials ahead!"
);
```

---

### 7. Achievement System

Minecraft-style achievements:

**API:**
```java
public class AchievementDisplay {

    public void showAchievement(ServerPlayer player, String title, String description) {
        String fullText = String.format("Achievement Unlocked!\n%s\n%s", title, description);

        ImmersiveMessage message = ImmersiveMessage.builder(120, fullText)
            .anchor(TextAnchor.TOP_RIGHT)
            .align(TextAlignment.RIGHT)
            .gradient(0xFFD700, 0xFFFF00)
            .typewriter(3.0f, false)
            .offsetX(-10)
            .offsetY(10)
            .shadow(true)
            .fadeIn(20)
            .fadeOut(60)
            .background("minecraft:textures/gui/achievement/achievement_background.png",
                       "STRETCH", 200, 50, 8, 8)
            .build();

        EmbersTextAPI.sendMessage(player, message);

        // Play sound effect
        player.playSound(player.blockPosition(),
            SoundEvents.PLAYER_LEVELUP,
            SoundSource.PLAYERS,
            0.5f, 1.0f);
    }
}

// Usage:
achievementDisplay.showAchievement(player,
    "Monster Hunter",
    "Defeat 100 monsters");
```

---

### 8. Damage Numbers

Floating damage indicators:

**API:**
```java
public class DamageIndicator {

    @SubscribeEvent
    public void onEntityDamage(LivingHurtEvent event) {
        if (event.getSource().getEntity() instanceof ServerPlayer player) {
            float damage = event.getAmount();
            showDamage(player, (int) damage);
        }
    }

    private void showDamage(ServerPlayer player, int damage) {
        // Determine color based on damage
        int color;
        if (damage >= 10) color = 0xFF0000;        // Red - high damage
        else if (damage >= 5) color = 0xFF6B00;    // Orange - medium
        else color = 0xFFFFFF;                      // White - low

        String text = "-" + damage + " HP";

        ImmersiveMessage message = ImmersiveMessage.builder(40, text)
            .anchor(TextAnchor.CENTER_CENTER)
            .color(color)
            .charShake(ShakeType.RANDOM, 3.0f)
            .offsetY(-30)
            .shadow(true)
            .fadeOut(20)
            .build();

        EmbersTextAPI.sendMessage(player, message);
    }
}
```

---

### 9. Warning System

Tiered warning system for dangerous areas:

**API:**
```java
public class WarningSystem {

    public void showWarning(ServerPlayer player, WarningLevel level, String message) {
        switch (level) {
            case INFO -> showInfo(player, message);
            case WARNING -> showWarning(player, message);
            case DANGER -> showDanger(player, message);
            case CRITICAL -> showCritical(player, message);
        }
    }

    private void showInfo(ServerPlayer player, String text) {
        ImmersiveMessage message = ImmersiveMessage.builder(60, "ℹ " + text)
            .anchor(TextAnchor.TOP_CENTER)
            .color(0x4ECDC4)
            .offsetY(10)
            .shadow(true)
            .fadeIn(10)
            .fadeOut(10)
            .build();

        EmbersTextAPI.sendMessage(player, message);
    }

    private void showWarning(ServerPlayer player, String text) {
        ImmersiveMessage message = ImmersiveMessage.builder(80, "⚠ " + text)
            .anchor(TextAnchor.TOP_CENTER)
            .color(0xFFFF00)
            .charShake(ShakeType.WAVE, 0.5f)
            .offsetY(10)
            .shadow(true)
            .backgroundColor(0x333300)
            .fadeIn(10)
            .fadeOut(10)
            .build();

        EmbersTextAPI.sendMessage(player, message);
    }

    private void showDanger(ServerPlayer player, String text) {
        ImmersiveMessage message = ImmersiveMessage.builder(80, "⚠ " + text + " ⚠")
            .anchor(TextAnchor.CENTER_CENTER)
            .color(0xFF6B00)
            .shake(ShakeType.RANDOM, 1.5f)
            .shadow(true)
            .backgroundColor(0x331A00)
            .backgroundGradient(0xFF6B00, 0x994400)
            .build();

        EmbersTextAPI.sendMessage(player, message);
    }

    private void showCritical(ServerPlayer player, String text) {
        ImmersiveMessage message = ImmersiveMessage.builder(80, "⚠ " + text + " ⚠")
            .anchor(TextAnchor.CENTER_CENTER)
            .color(0xFF0000)
            .charShake(ShakeType.RANDOM, 2.5f)
            .shadow(true)
            .backgroundColor(0x330000)
            .backgroundGradient(0xFF0000, 0x660000)
            .build();

        EmbersTextAPI.sendMessage(player, message);
    }

    enum WarningLevel {
        INFO, WARNING, DANGER, CRITICAL
    }
}

// Usage:
warningSystem.showWarning(player, WarningLevel.WARNING, "Dangerous area ahead");
warningSystem.showWarning(player, WarningLevel.CRITICAL, "EXTREME HEAT");
```

---

### 10. Cinematic Sequence

Create movie-like text sequences:

**API:**
```java
public class CinematicSequence {

    public void playIntroSequence(ServerPlayer player) {
        // Fade in from black
        showBlackScreen(player, 0, 100);

        // Title sequence
        scheduleText(player, 40, "Long ago...", 1.0f);
        scheduleText(player, 140, "In a forgotten realm...", 1.0f);
        scheduleText(player, 240, "A great evil awakened.", 1.2f);

        // Main title with dramatic effect
        scheduleTask(() -> {
            ImmersiveMessage title = ImmersiveMessage.builder(200, "THE SHADOW RISING")
                .anchor(TextAnchor.CENTER_CENTER)
                .gradient(0x8B0000, 0xFF0000, 0x8B0000)
                .shake(ShakeType.WAVE, 0.5f)
                .fadeIn(60)
                .fadeOut(60)
                .shadow(true)
                .build();

            EmbersTextAPI.sendMessage(player, title);
        }, 340);

        // Fade to gameplay
        scheduleTask(() -> {
            EmbersMessages.closeAll(player);
        }, 540);
    }

    private void scheduleText(ServerPlayer player, int delay, String text, float typeSpeed) {
        scheduleTask(() -> {
            ImmersiveMessage message = ImmersiveMessage.builder(120, text)
                .anchor(TextAnchor.CENTER_CENTER)
                .gradient(0xAAAAAA, 0xFFFFFF)
                .typewriter(typeSpeed, true)
                .fadeIn(20)
                .fadeOut(20)
                .shadow(true)
                .build();

            EmbersTextAPI.sendMessage(player, message);
        }, delay);
    }

    private void showBlackScreen(ServerPlayer player, int delay, int duration) {
        scheduleTask(() -> {
            ImmersiveMessage black = ImmersiveMessage.builder(duration, " ")
                .anchor(TextAnchor.CENTER_CENTER)
                .backgroundColor(0x000000)
                .build();

            EmbersTextAPI.sendMessage(player, black);
        }, delay);
    }
}
```

---

## Command Examples

### Server Announcements

**Restart Warning:**
```
/emberstextapi sendcustom @a {anchor:"TOP_CENTER",color:0xFF6B00,charShakeWave:0.5f,shadow:1b,bgColor:0x331A00} 200 "Server restarting in 10 minutes!"
```

**Event Starting:**
```
/emberstextapi sendcustom @a {anchor:"CENTER_CENTER",gradient:[0xFFD700,0xFFA500,0xFFD700],typewriter:2.0f,typewriterCenter:1b,fadeIn:30,fadeOut:30,shadow:1b} 180 "PVP EVENT STARTING NOW!"
```

### Player Notifications

**Low Health Warning:**
```
/emberstextapi sendcustom @p {anchor:"CENTER_CENTER",color:0xFF0000,shakeRandom:2.0f,fadeIn:5,fadeOut:20} 60 "LOW HEALTH!"
```

**Item Received:**
```
/emberstextapi sendcustom @p {anchor:"TOP_RIGHT",align:"RIGHT",gradient:[0x00FF00,0x7FFF00],typewriter:3.0f,offsetX:-10,offsetY:10,shadow:1b,fadeIn:10,fadeOut:40} 80 "Received: Diamond Sword"
```

### Location-Based

**Entering Area:**
```
/emberstextapi sendcustom @p {anchor:"BOTTOM_CENTER",gradient:[0x4ECDC4,0x45B7D1],typewriter:1.5f,offsetY:-40,shadow:1b,fadeIn:20,fadeOut:20} 100 "Entering: The Forbidden Forest"
```

**Discovery:**
```
/emberstextapi sendcustom @p {anchor:"CENTER_CENTER",obfuscate:1b,obfuscateReveal:"CENTER_OUT",gradient:[0xFFD700,0xFFFFFF],fadeIn:40,shadow:1b} 150 "Ancient Temple Discovered"
```

---

## Best Practices

### Timing

1. **Short messages** (1-5 words): 60-100 ticks
2. **Medium messages** (5-15 words): 100-150 ticks
3. **Long messages** (15+ words): 150-200+ ticks
4. **Add typing time**: text_length / typewriter_speed * 20

### Layering Messages

Use different anchors to show multiple messages simultaneously:

```java
// Objective at top
EmbersMessages.open(player, "objective", objectiveMsg
    .anchor(TextAnchor.TOP_CENTER));

// Dialogue at bottom
EmbersTextAPI.sendMessage(player, dialogueMsg
    .anchor(TextAnchor.BOTTOM_CENTER));

// Warning in center
EmbersTextAPI.sendMessage(player, warningMsg
    .anchor(TextAnchor.CENTER_CENTER));
```

### Performance

1. **Limit simultaneous effects** - Max 3-4 animations at once
2. **Use tracked messages** for persistent displays
3. **Clean up** when messages are no longer needed
4. **Avoid infinite durations** unless necessary

---

## Common Patterns

### Pattern: Status Display

```java
public void updateStatus(ServerPlayer player, String key, String value) {
    String display = key + ": " + value;

    ImmersiveMessage message = ImmersiveMessage.builder(Integer.MAX_VALUE, display)
        .anchor(TextAnchor.TOP_LEFT)
        .color(0xFFFFFF)
        .offsetX(10)
        .offsetY(10)
        .shadow(true)
        .build();

    EmbersMessages.update(player, "status_" + key, message);
}
```

### Pattern: Temporary Alert

```java
public void alert(ServerPlayer player, String text, int duration) {
    ImmersiveMessage message = ImmersiveMessage.builder(duration, text)
        .anchor(TextAnchor.CENTER_CENTER)
        .color(0xFFFF00)
        .shake(ShakeType.WAVE, 1.0f)
        .fadeIn(5)
        .fadeOut(20)
        .shadow(true)
        .build();

    EmbersTextAPI.sendMessage(player, message);
}
```

### Pattern: Subtitle

```java
public void subtitle(ServerPlayer player, String text, int duration) {
    ImmersiveMessage message = ImmersiveMessage.builder(duration, text)
        .anchor(TextAnchor.BOTTOM_CENTER)
        .align(TextAlignment.CENTER)
        .color(0xFFFFFF)
        .offsetY(-80)
        .wrap(300)
        .shadow(true)
        .fadeIn(5)
        .fadeOut(5)
        .build();

    EmbersTextAPI.sendMessage(player, message);
}
```

---

## Next Steps

- Reference all available options: [NBT Configuration](nbt-configuration.md)
- Learn about effects: [Styling & Effects](styling-effects.md)
- Understand the API: [Developer API](developer-api.md)
- Try the demos: `/emberstextapi test 1-9`
