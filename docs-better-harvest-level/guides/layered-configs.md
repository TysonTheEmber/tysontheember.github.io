---
sidebar_position: 2
---

# Layered Config Files

BHL supports splitting overrides across multiple JSON files for better organization. This is especially useful in large modpacks with dozens of mods.

---

## How It Works

For both block and tool overrides, BHL loads:

1. The **base file** — `blocks.json` or `tools.json`
2. **Layered files** — any file matching `blocks_<name>.json` or `tools_<name>.json`

Layered files are discovered automatically and processed in **alphabetical order** after the base file. All overrides from all files are merged into a single list.

---

## Example Directory Layout

```
config/betterharvestlevel/
├── tiers.json
├── blocks.json              # Base block overrides
├── blocks_create.json       # Create mod block overrides
├── blocks_mekanism.json     # Mekanism block overrides
├── blocks_thermal.json      # Thermal block overrides
├── tools.json               # Base tool overrides
├── tools_create.json        # Create mod tool overrides
├── tools_tinkers.json       # Tinkers' Construct tool overrides
└── equivalences.json
```

---

## File Format

Each layered file uses the same format as the base file:

```json
{
  "configVersion": 1,
  "overrides": [
    {
      "target": "create",
      "type": "mod",
      "requiredTier": "iron"
    },
    {
      "target": "create:blaze_burner",
      "type": "block",
      "requiredTier": "diamond"
    }
  ]
}
```

---

## Naming Convention

The `<name>` portion of layered files can be anything — it's just for your organization. Common patterns:

| Pattern | Example | Use Case |
|---------|---------|----------|
| Mod name | `blocks_create.json` | One file per mod |
| Category | `blocks_ores.json` | Group by block type |
| Priority | `blocks_01_early.json` | Control processing order |

:::tip
Since files load alphabetically, you can use numeric prefixes to control processing order when it matters: `blocks_01_base.json`, `blocks_02_create.json`, etc.
:::

---

## When to Use Layered Files

- **Large modpacks** — Keep overrides organized per-mod instead of one massive file
- **Shareable configs** — Distribute mod-specific override files independently
- **Conditional loading** — Add or remove a file to toggle overrides for a specific mod without editing the base config
