---
sidebar_position: 2
---

# Animations

Loot Log uses a multi-stage animation pipeline to create smooth, polished pickup notifications. Every animation parameter is configurable.

---

## Animation Timeline

Each entry follows this lifecycle:

1. **Fade In** (`fadeInMs`, default 300ms) — Entry fades from transparent to opaque with optional slide and scale effects
2. **Display** (`displayDurationMs`, default 5000ms) — Entry is fully visible
3. **Fade Out** (`fadeOutMs`, default 500ms) — Entry fades out with optional reverse slide

---

## Slide Animation

Entries slide in horizontally from the screen edge. The slide distance and easing curve control how the animation feels.

| Setting | Default | Range | Description |
|---------|---------|-------|-------------|
| `slideDistance` | `220` | 0–500 | Pixels the entry slides during fade-in |
| `slideEasing` | `QUAD_OUT` | — | Easing curve for the slide |
| `fadeOutSlide` | `true` | — | Reverse the slide during fade-out |

---

## Easing Functions

| Easing | Description |
|--------|-------------|
| `QUAD_OUT` | Smooth deceleration — the default, natural-feeling ease |
| `CUBIC_OUT` | Stronger deceleration — faster start, smoother stop |
| `BACK_OUT` | Slight overshoot past the target, then settle back |
| `ELASTIC_OUT` | Springy bounce effect — overshoots and oscillates |

---

## Scale Entrance

When enabled, entries scale up from a smaller size during fade-in, creating a pop-in effect.

| Setting | Default | Range | Description |
|---------|---------|-------|-------------|
| `scaleEntrance` | `false` | — | Enable scale pop-in |
| `entranceScaleStart` | `0.8` | 0.1–1.0 | Starting scale (animates to 1.0) |

---

## Stagger Delay

When multiple entries are visible, stagger delay adds a progressive offset to each entry's animation. The first entry animates immediately; subsequent entries are delayed.

| Setting | Default | Range | Description |
|---------|---------|-------|-------------|
| `staggerDelayMs` | `0` | 0–500 | Delay per entry in milliseconds |

:::tip
A stagger delay of 50–100ms creates a pleasing cascade effect when picking up multiple items at once.
:::

---

## Vertical Transitions

When entries appear or disappear, existing entries smoothly shift to fill the gap rather than snapping to their new position.

| Setting | Default | Range | Description |
|---------|---------|-------|-------------|
| `verticalAnimSpeed` | `0.3` | 0–1 | Transition speed. Lower = faster, higher = smoother |
