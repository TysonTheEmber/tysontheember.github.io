---
sidebar_position: 5
---

# Troubleshooting & FAQ

## Common Issues

### Overrides Not Taking Effect

If your block or tool overrides don't seem to be working:

1. **Check JSON syntax** — Use a JSON validator. A misplaced comma or missing bracket causes the file to fail silently
2. **Verify file location** — Files must be in `config/betterharvestlevel/` and follow the naming convention (`blocks.json`, `blocks_*.json`, `tools.json`, `tools_*.json`)
3. **Check the game log** — Search for `[BetterHarvestLevel]` messages. The mod logs how many overrides were loaded and any warnings
4. **Reload config** — Run `/bhl reload` or restart the game

---

### Block Still Mineable Without Correct Tier

If a block can still be mined and drops items without the required tier tool:

1. **Verify the override type** — Make sure you're using the correct type (`block`, `tag`, `mod`, or `regex`) for your target
2. **Check for conflicting overrides** — A more specific override (e.g., direct block ID) takes priority over a broader one (e.g., mod namespace)
3. **Verify the tier name** — The `requiredTier` must exactly match a tier `name` from `tiers.json`
4. **Use `/bhl check`** — Look at the block and run `/bhl check` to see what tier BHL thinks it requires

---

### Custom Tier Not Appearing

If a custom tier you defined isn't recognized:

1. **Check `tiers.json` syntax** — Ensure the tier entry is valid JSON with all required fields
2. **Set `builtIn` to `false`** — Custom tiers must have `builtIn: false`
3. **Restart the game** — On Forge and NeoForge, new tier definitions require a full restart
4. **Run `/bhl info`** — Check if the tier appears in the registered tiers list

---

### Jade Not Showing BHL Tier Info

If Jade tooltips show default harvest info instead of BHL tier info:

1. **Verify Jade is installed** — BHL's Jade integration only activates when Jade is present
2. **Check the block has a BHL override** — Jade falls back to default display for blocks without BHL overrides
3. **Check Jade version compatibility** — Ensure your Jade version matches your Minecraft version

---

### JSON Syntax Errors

Common JSON mistakes:

- **Trailing comma** — `"tiers": ["iron",]` (remove the final comma)
- **Single quotes** — `'iron'` (use double quotes: `"iron"`)
- **Unquoted keys** — `name: "value"` (must be `"name": "value"`)
- **Missing comma** between entries in arrays

:::tip
Use a JSON validator or your editor's built-in JSON checking to catch these before launching.
:::

---

## FAQ

### Does BHL work on servers?

Yes. Install it on the server. All tier checks and override resolution happen server-side. Jade integration is client-side but will display tier info for any server running BHL.

---

### Does it affect performance?

Negligible. Override resolution happens once at startup (and on `/bhl reload`). Runtime tier checks are simple HashMap lookups with no per-tick overhead.

---

### Does it work with modded tools and blocks?

Yes — that is its primary purpose. BHL can assign tiers to any tool and set requirements for any block, regardless of which mod adds them. Use the `mod`, `tag`, or `regex` override types to target modded content.

---

### Can I use it alongside other harvest level mods?

It depends. BHL uses mixins to intercept mining checks, which may conflict with other mods that modify the same methods. If you encounter issues, check the game log for mixin errors and consider using [Mixin Helper](/mixin-helper/intro) to manage mixin priorities.

---

### How do layered config files interact?

All layered files (`blocks_*.json`, `tools_*.json`) are merged into a single list with the base file. They're processed alphabetically. If two files define overrides for the same block, the later file's override takes precedence. See [Layered Configs](guides/layered-configs.md) for details.

---

### Do I need to restart or can I use `/bhl reload`?

Most changes can be hot-reloaded with `/bhl reload`:

| Change | Restart Required? |
|--------|-------------------|
| Block overrides | No — `/bhl reload` works |
| Tool overrides | No — `/bhl reload` works |
| Equivalence groups | No — `/bhl reload` works |
| Custom tier definitions (Fabric) | No — `/bhl reload` works |
| Custom tier definitions (Forge/NeoForge) | Yes — tiers are registered at startup |

---

### What happens if a referenced tier doesn't exist?

If a block or tool override references a tier name that isn't defined in `tiers.json`, the override is skipped and a warning is logged. Check the game log for `[BetterHarvestLevel]` messages.

---

## Getting Help

1. **Check the game log** — Search for `[BetterHarvestLevel]` to find warnings and info messages
2. **Use `/bhl info`** — Verify your tiers and overrides loaded correctly
3. **Use `/bhl check`** — Inspect specific blocks and tools to debug tier assignments
4. **Validate your JSON** — Most issues are caused by syntax errors in config files
5. **Join the [Discord Server](https://discord.gg/GCN2Hv4Qzr)** — Get help from the community
