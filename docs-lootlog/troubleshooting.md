---
sidebar_position: 7
---

# Troubleshooting & FAQ

## Common Issues

### Overrides Not Loading

If your override customizations aren't appearing:

1. **Check file location** — Override files must be in `config/lootlog/overrides/` and end with `.json`
2. **Check the filename** — Files starting with `_` are skipped (e.g., `_example.json` is ignored)
3. **Validate JSON syntax** — Use a JSON validator. A misplaced comma or missing bracket causes silent failure
4. **Verify match rule** — Every override needs a valid `match` with both `type` and `id` fields
5. **Reload** — Run `/lootlog reload` in-game after making changes

---

### HUD Not Appearing

If pickup notifications aren't showing at all:

1. **Check `showItems` and `showXp`** — Ensure these aren't set to `false` in your config
2. **Check filtering** — An active whitelist with no matching items will hide everything
3. **Check scale and offset** — A very small `scale` or large offset could push entries off-screen
4. **Enable `clampToScreen`** — Set to `true` to prevent entries from rendering outside the visible area
5. **Check for mod conflicts** — Other HUD mods may overlap or interfere

---

### Sounds Not Playing

If pickup sounds aren't working:

1. **Check `soundEnabled`** — Must be `true` in the global config or set via an override
2. **Verify the sound ID** — Must be a valid Minecraft sound resource location (e.g., `minecraft:entity.item.pickup`)
3. **Check volume** — Ensure `soundVolume` is above 0 and your in-game sound settings aren't muted
4. **Check in-game sound category** — Loot Log sounds play through the Master sound category

---

### Config Changes Not Taking Effect

1. **YACL GUI** — Changes apply immediately when using the in-game config screen
2. **File edits** — Restart the game or use the platform-specific reload mechanism
3. **Override files** — Run `/lootlog reload` to hot-reload override JSON files

:::note
The `/lootlog reload` command only reloads override files, not the main configuration. For config changes made via file editing, a game restart is needed.
:::

---

### JSON Syntax Errors

Common JSON mistakes:

- **Trailing comma** — `"overrides": [{ ... },]` (remove the final comma)
- **Single quotes** — `'item'` (use double quotes: `"item"`)
- **Unquoted keys** — `match: {}` (must be `"match": {}`)
- **Missing comma** between entries in arrays
- **Comments** — JSON does not support `//` or `/* */` comments (use `"_comment"` fields instead)

:::tip
Use a JSON validator or your editor's built-in JSON checking to catch these before launching.
:::

---

## FAQ

### Is Loot Log client-side only?

Yes. Loot Log runs entirely on the client. No server installation is needed. It works on any server, including vanilla servers, without the server having the mod installed.

---

### Does it affect performance?

Negligible. Pickup handling is a simple filter-and-render pipeline that runs on the client thread. Animation math uses pure functions with no allocations. Override resolution happens once per pickup, not per frame.

---

### Is YACL required?

No. YACL is optional. Without it, you configure Loot Log by editing the config file directly. When YACL is installed, a full in-game GUI is available with labeled sections for every setting.

---

### Does it work with modded items?

Yes. Loot Log intercepts all item pickups regardless of which mod adds them. Use override match types like `mod`, `tag`, or `regex` to target modded items specifically.

---

### Can I use it alongside other HUD mods?

Yes. Loot Log renders its own HUD layer and doesn't modify other mods. Position it in a different screen corner using the `anchor` and offset settings to avoid overlap.

---

### How do I reset to default config?

Delete the config file (`config/lootlog.toml` on Forge, or the JSON config on Fabric/NeoForge) and restart the game. A fresh default config will be generated.

---

### How do whitelist and blacklist interact?

If a whitelist is set, it acts as an allow-list — only matching items pass through. The blacklist then filters from those results. If only a blacklist is set, everything is shown except blacklisted items. See [Filtering Guide](guides/filtering.md) for details.

---

### What rarity names can I use in overrides?

Vanilla rarities: `common`, `uncommon`, `rare`, `epic` (all lowercase). Modded rarities also work — use the lowercased enum name. Set the log level to DEBUG to discover rarity names for modded items.

---

## Getting Help

1. **Check the game log** — Search for `LootLog` messages to find warnings about failed overrides or config issues
2. **Run `/lootlog reload`** — Reloads override files and logs how many were loaded
3. **Validate your JSON** — Most override issues are caused by syntax errors
4. **Join the [Discord Server](https://discord.gg/GCN2Hv4Qzr)** — Get help from the community
