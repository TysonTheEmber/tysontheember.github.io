---
sidebar_position: 3
---

# Configuration Reference

Complete reference for every Loot Log configuration setting. All settings are stored in `.minecraft/config/lootlog.json` and apply client-side only.

:::tip In-Game GUI
Install [YACL v3.3+](https://modrinth.com/mod/yacl) for a full in-game configuration screen. Open it from Mod Menu (Fabric) or the Mods list (Forge/NeoForge) -- no file editing required.
:::

---

## General

Control core HUD behavior: how long entries stay visible, how many can appear at once, and what pickup types to display.

| Setting | Type | Default | Range | Description |
|---------|------|---------|-------|-------------|
| `displayDurationMs` | long | `5000` | `500` - `30000` | How long each entry stays visible in milliseconds |
| `maxEntries` | int | `10` | `1` - `30` | Maximum simultaneous entries on screen |
| `combineMode` | CombineMode | `ALWAYS` | `ALWAYS`, `NEVER`, `EXCLUDE_NAMED` | Controls stacking of duplicate pickups |
| `showItems` | boolean | `true` | -- | Show item pickups in the HUD |
| `showXp` | boolean | `true` | -- | Show XP pickups in the HUD |

### combineMode

Determines how the mod handles duplicate pickups:

- **`ALWAYS`** -- Stack all duplicate pickups into a single entry with an incrementing count.
- **`NEVER`** -- Create a new entry for every pickup event, even duplicates.
- **`EXCLUDE_NAMED`** -- Stack duplicates except for items with custom names (renamed via anvil, lore, etc.).

:::note
Named items often carry unique enchantments or significance. Use `EXCLUDE_NAMED` to give them individual entries while still stacking generic pickups.
:::

---

## Position

Control where the HUD appears on screen and how entries are arranged.

| Setting | Type | Default | Range | Description |
|---------|------|---------|-------|-------------|
| `anchor` | HudAnchor | `BOTTOM_RIGHT` | `TOP_LEFT`, `TOP_RIGHT`, `BOTTOM_LEFT`, `BOTTOM_RIGHT` | Screen corner for the HUD |
| `xOffset` | int | `5` | `0` - `500` | Horizontal distance from screen edge in pixels |
| `yOffset` | int | `5` | `0` - `500` | Vertical distance from screen edge in pixels |
| `entrySpacing` | int | `2` | `0` - `20` | Vertical gap between entries in pixels |
| `scale` | float | `1.0` | `0.25` - `4.0` | Global HUD scale factor |
| `clampToScreen` | boolean | `true` | -- | Prevent entries from rendering off-screen |
| `growthDirection` | GrowthDirection | `NORMAL` | `NORMAL`, `INVERSE` | Direction new entries grow from the anchor |

### growthDirection

- **`NORMAL`** -- Entries grow away from the nearest screen edge. A `BOTTOM_RIGHT` anchor grows upward; a `TOP_LEFT` anchor grows downward.
- **`INVERSE`** -- Reverses the growth direction. Useful for placing the newest entry at the top or bottom regardless of anchor position.

---

## Animation

Fine-tune entrance and exit animations for a polished feel.

| Setting | Type | Default | Range | Description |
|---------|------|---------|-------|-------------|
| `fadeInMs` | long | `300` | `0` - `2000` | Fade-in duration in milliseconds |
| `fadeOutMs` | long | `500` | `0` - `2000` | Fade-out duration in milliseconds |
| `slideDistance` | float | `220.0` | `0` - `500` | Horizontal slide distance in pixels for entrance animation |
| `fadeOutSlide` | boolean | `true` | -- | Enable slide-out during fade-out |
| `verticalAnimSpeed` | float | `0.3` | `0` - `1` | Vertical transition speed when entries shift. `0` = instant, `1` = slowest |
| `slideEasing` | Easing | `QUAD_OUT` | `QUAD_OUT`, `CUBIC_OUT`, `BACK_OUT`, `ELASTIC_OUT` | Easing curve for the slide animation |
| `scaleEntrance` | boolean | `false` | -- | Enable scale pop-in effect on entry appearance |
| `entranceScaleStart` | float | `0.8` | `0.1` - `1.0` | Starting scale for the entrance effect (scales up to `1.0`) |
| `staggerDelayMs` | int | `0` | `0` - `500` | Delay between sequential entry appearances in milliseconds |

### slideEasing

Each easing curve produces a different feel for the slide-in animation:

| Easing | Behavior |
|--------|----------|
| `QUAD_OUT` | Smooth deceleration -- the default, natural-feeling stop |
| `CUBIC_OUT` | Slightly sharper deceleration than quadratic |
| `BACK_OUT` | Overshoots the target slightly, then settles back |
| `ELASTIC_OUT` | Bouncy, spring-like overshoot with oscillation |

:::tip
Start with the defaults. If the HUD feels too mechanical, try `BACK_OUT` for subtle overshoot. Use `ELASTIC_OUT` sparingly -- it draws attention.
:::

---

## Appearance

Control the visual style of each entry: backgrounds, text colors, layout, and formatting.

| Setting | Type | Default | Range | Description |
|---------|------|---------|-------|-------------|
| `decoration` | String | `null` | -- | Banner decoration preset name (e.g., `"default_banner"`, `"gilded"`, `"ribbon"`) |
| `backgroundStyle` | BackgroundStyle | `BANNER` | `NONE`, `SOLID`, `TOOLTIP`, `TEXTURE`, `BANNER`, `FLAT` | Background rendering style |
| `backgroundColor` | int (ARGB) | `0xAA000000` | -- | Background color for `SOLID` and `FLAT` styles |
| `backgroundHPadding` | int | `4` | `0` - `20` | Horizontal padding around content in pixels |
| `backgroundVPadding` | int | `2` | `0` - `20` | Vertical padding around content in pixels |
| `maxNameWidth` | int | `150` | `0` - `500` | Maximum item name width in pixels before truncation |
| `countColor` | int (ARGB) | `0xFFAAAAAA` | -- | Color for the pickup count text |
| `nameColorOverride` | int (ARGB) | `0xFFFFFFFF` | -- | Override color for item names (used when `useRarityColors` is `false`) |
| `showCount` | boolean | `true` | -- | Show pickup count (e.g., `+3`) |
| `useRarityColors` | boolean | `true` | -- | Color item names by rarity |
| `iconOnRight` | boolean | `true` | -- | Place item icon on the right side of the entry |
| `textShadow` | boolean | `true` | -- | Render text with a drop shadow |
| `showCountRight` | boolean | `true` | -- | Show inventory total count on the right side |
| `animateXpColor` | boolean | `true` | -- | Animate XP orb text color |
| `abbreviateCounts` | boolean | `true` | -- | Abbreviate large numbers (e.g., `1500` becomes `1.5K`) |

### backgroundStyle

| Style | Description |
|-------|-------------|
| `NONE` | No background -- entries float directly on the HUD |
| `SOLID` | Flat rectangle using `backgroundColor` |
| `TOOLTIP` | Minecraft tooltip-style background with border |
| `TEXTURE` | Custom 9-slice texture background |
| `BANNER` | Multi-layer banner with body, accent, and decoration support |
| `FLAT` | Simplified flat layout with configurable element order |

### useRarityColors

When enabled, item names are colored according to their Minecraft rarity tier:

| Rarity | Color |
|--------|-------|
| Common | White |
| Uncommon | Yellow |
| Rare | Aqua |
| Epic | Pink |

Set `useRarityColors` to `false` and use `nameColorOverride` to apply a single uniform color to all item names.

---

## Banner / Flat Layout

Configure element arrangement inside `BANNER` and `FLAT` background styles.

| Setting | Type | Default | Range | Description |
|---------|------|---------|-------|-------------|
| `bannerElementOrder` | String | `"PICKUP_COUNT,NAME,ICON,TOTAL_COUNT"` | -- | Comma-separated order of elements |
| `decorativeEdgeInset` | int | `6` | `0` - `50` | Inset from banner edges for content placement in pixels |
| `iconToNameGap` | int | `4` | `0` - `20` | Gap between icon and name in pixels |
| `nameToCountGap` | int | `4` | `0` - `20` | Gap between name and count in pixels |

### bannerElementOrder

Controls the left-to-right order of elements inside the entry. Provide a comma-separated list of these tokens:

- `PICKUP_COUNT` -- The pickup count text (e.g., `+3`)
- `NAME` -- The item or XP name
- `ICON` -- The item icon
- `TOTAL_COUNT` -- The inventory total (e.g., `x64`)

Rearrange or omit tokens to customize the layout. For example, `"ICON,NAME,PICKUP_COUNT"` places the icon first and hides the total count.

---

## Banner Body Layer

Configure the primary body texture layer of the banner background.

| Setting | Type | Default | Range | Description |
|---------|------|---------|-------|-------------|
| `bodyAlpha` | float | `1.0` | `0` - `1` | Opacity of the banner body layer |
| `bodyTint` | int (ARGB) | `0xFFFFFFFF` | -- | Tint color applied to the body texture |
| `bodyAnimSpeed` | int | `4` | `0` - `100` | Animation speed for spritesheet body textures (ticks per frame) |

---

## Banner Accent Layer

Configure the secondary overlay layer drawn on top of the banner body.

| Setting | Type | Default | Range | Description |
|---------|------|---------|-------|-------------|
| `showAccent` | boolean | `true` | -- | Show the accent/overlay layer |
| `accentAlpha` | float | `1.0` | `0` - `1` | Opacity of the accent layer |
| `accentTint` | int (ARGB) | `0xFFFFFFFF` | -- | Tint color applied to the accent texture |
| `accentAnimSpeed` | int | `4` | `0` - `100` | Animation speed for spritesheet accent textures (ticks per frame) |
| `accentXOffset` | int | `0` | `-50` - `50` | Horizontal offset for the accent layer in pixels |
| `accentYOffset` | int | `0` | `-50` - `50` | Vertical offset for the accent layer in pixels |
| `accentAnchor` | AccentAnchor | `ICON` | `ICON`, `CENTER`, `EDGE` | Where the accent layer anchors relative to the entry |

### accentAnchor

| Value | Behavior |
|-------|----------|
| `ICON` | Accent is positioned relative to the item icon |
| `CENTER` | Accent is centered within the entry |
| `EDGE` | Accent is aligned to the entry edge closest to the screen border |

---

## Effect Targeting

| Setting | Type | Default | Range | Description |
|---------|------|---------|-------|-------------|
| `effectTarget` | EffectTarget | `ALL` | `ALL`, `ITEMS_ONLY`, `XP_ONLY` | Which pickup types receive visual effects (glow, shadow, pulse) |

Use this to apply icon effects selectively. For example, set `ITEMS_ONLY` to add glow effects to item pickups while keeping XP entries plain.

---

## Pickup Pulse

Animate existing entries when their count updates (e.g., picking up more of the same item).

| Setting | Type | Default | Range | Description |
|---------|------|---------|-------|-------------|
| `pickupPulseEnabled` | boolean | `true` | -- | Enable pulse animation on count update |
| `pickupPulseDurationMs` | int | `200` | `50` - `1000` | Duration of the pulse animation in milliseconds |

### Per-Element Pulse Strengths

Each element can pulse independently with separate scale and alpha intensity. Scale strengths range from `0` to `0.5` and alpha strengths range from `0` to `1`.

| Setting | Default | Description |
|---------|---------|-------------|
| `pickupPulseIconScaleStrength` | `0.05` | Icon scale pulse intensity |
| `pickupPulseIconAlphaStrength` | `0.05` | Icon alpha pulse intensity |
| `pickupPulseNameScaleStrength` | `0.05` | Name text scale pulse intensity |
| `pickupPulseNameAlphaStrength` | `0.0` | Name text alpha pulse intensity |
| `pickupPulseTotalCountScaleStrength` | `0.05` | Total count scale pulse intensity |
| `pickupPulseTotalCountAlphaStrength` | `0.0` | Total count alpha pulse intensity |
| `pickupPulseBodyScaleStrength` | `0.0` | Banner body scale pulse intensity |
| `pickupPulseBodyAlphaStrength` | `0.0` | Banner body alpha pulse intensity |
| `pickupPulseAccentScaleStrength` | `0.0` | Banner accent scale pulse intensity |
| `pickupPulseAccentAlphaStrength` | `0.0` | Banner accent alpha pulse intensity |
| `pickupPulseOverallScaleStrength` | `0.05` | Entire entry scale pulse intensity |
| `pickupPulseOverallAlphaStrength` | `0.0` | Entire entry alpha pulse intensity |

:::tip
A small scale pulse on the icon (`0.05`) gives satisfying visual feedback without being distracting. Increase `pickupPulseOverallScaleStrength` to make the whole entry "pop" on update.
:::

---

## Progress Bar

Display a thin bar that shrinks as the entry's display time elapses.

| Setting | Type | Default | Range | Description |
|---------|------|---------|-------|-------------|
| `showProgressBar` | boolean | `false` | -- | Show a progress bar indicating remaining display time |
| `progressBarColor` | int (ARGB) | `0x80FFFFFF` | -- | Color of the progress bar |
| `progressBarHeight` | int | `1` | `1` - `3` | Height of the progress bar in pixels |

---

## Icon Glow

Add a colored glow effect around the item icon.

| Setting | Type | Default | Range | Description |
|---------|------|---------|-------|-------------|
| `iconGlowEnabled` | boolean | `false` | -- | Enable glow effect around the item icon |
| `iconGlowColor` | int (ARGB) | `0xAAFFFFFF` | -- | Color of the glow |
| `iconGlowRadius` | int | `3` | `0` - `8` | Radius of the glow in pixels |
| `iconGlowShape` | IconShape | `CIRCLE` | `CIRCLE`, `SQUARE`, `DIAMOND`, `ITEM` | Shape of the glow |
| `iconGlowSoftness` | float | `1.5` | `0.5` - `5.0` | How gradually the glow fades at its edges |
| `iconGlowPulseSpeed` | float | `0.0` | `0` - `10` | Glow pulsing speed in oscillations per second. `0` disables pulsing |
| `iconGlowPulseMin` | float | `0.5` | `0` - `1` | Minimum brightness during pulse |
| `iconGlowPulseMax` | float | `1.0` | `0` - `1` | Maximum brightness during pulse |

### iconGlowShape

| Shape | Description |
|-------|-------------|
| `CIRCLE` | Circular glow emanating from the icon center |
| `SQUARE` | Rectangular glow matching the icon bounds |
| `DIAMOND` | Diamond-shaped (rotated square) glow |
| `ITEM` | Glow follows the actual silhouette of the item texture |

---

## Icon Shadow

Add a drop shadow beneath the item icon for depth.

| Setting | Type | Default | Range | Description |
|---------|------|---------|-------|-------------|
| `iconShadowEnabled` | boolean | `false` | -- | Enable drop shadow under the item icon |
| `iconShadowColor` | int (ARGB) | `0x80000000` | -- | Color of the shadow |
| `iconShadowOffsetX` | int | `1` | `0` - `4` | Horizontal shadow offset in pixels |
| `iconShadowOffsetY` | int | `1` | `0` - `4` | Vertical shadow offset in pixels |
| `iconShadowRadius` | int | `1` | `0` - `4` | Shadow blur radius in pixels |
| `iconShadowShape` | IconShape | `ITEM` | `CIRCLE`, `SQUARE`, `DIAMOND`, `ITEM` | Shape of the shadow |
| `iconShadowSoftness` | float | `1.5` | `0.5` - `5.0` | How gradually the shadow fades at its edges |

---

## Sound

Play a sound effect when an item is picked up.

| Setting | Type | Default | Range | Description |
|---------|------|---------|-------|-------------|
| `soundEnabled` | boolean | `false` | -- | Play a sound on item pickup |
| `soundId` | String | `"minecraft:entity.item.pickup"` | -- | Minecraft sound resource location |
| `soundVolume` | float | `0.5` | `0` - `1` | Sound volume |
| `soundPitch` | float | `1.0` | `0.5` - `2` | Sound pitch |

:::warning
The sound plays for every pickup event. In areas with heavy item drops (mob farms, mining), frequent sounds can become overwhelming. Consider pairing this with a higher `displayDurationMs` or using `combineMode: ALWAYS` to reduce the number of triggered events.
:::

---

## Filtering

Control which items appear in the HUD using blacklists and whitelists.

| Setting | Type | Default | Range | Description |
|---------|------|---------|-------|-------------|
| `itemBlacklist` | String list | `[]` | -- | Item IDs to hide (e.g., `"minecraft:dirt"`) |
| `itemWhitelist` | String list | `[]` | -- | If non-empty, only these items are shown |
| `modBlacklist` | String list | `[]` | -- | Mod namespaces to hide (e.g., `"minecraft"`) |
| `modWhitelist` | String list | `[]` | -- | If non-empty, only items from these mods are shown |

### Filter Priority

Filters are evaluated in the following order:

1. **Whitelist** -- If a whitelist is non-empty, only matching items pass. Everything else is hidden.
2. **Blacklist** -- If no whitelist is active, blacklisted items are hidden. Everything else passes.

Item-level filters (`itemBlacklist`, `itemWhitelist`) and mod-level filters (`modBlacklist`, `modWhitelist`) are evaluated independently. An item must pass both to appear in the HUD.

:::note Color Format
All color settings in Loot Log use **ARGB hexadecimal** format: `0xAARRGGBB`. The first byte (`AA`) controls alpha (opacity), where `FF` is fully opaque and `00` is fully transparent. For example, `0xAA000000` is a semi-transparent black and `0xFFFF0000` is a fully opaque red.
:::
