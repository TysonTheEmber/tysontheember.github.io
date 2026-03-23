---
sidebar_position: 4
---

# Chain Flattening

When you define multiple remaps that form a chain (A→B and B→C), RemapIDs automatically resolves them into a direct mapping (A→C). This simplifies configuration and avoids unnecessary intermediate lookups.

## How Chains Work

If your config files contain:

```json
{
  "remaps": [
    { "source": "modA:silver_ingot", "target": "modB:silver_ingot" },
    { "source": "modB:silver_ingot", "target": "thermal:silver_ingot" }
  ]
}
```

RemapIDs flattens these into:

- `modA:silver_ingot` → `thermal:silver_ingot`
- `modB:silver_ingot` → `thermal:silver_ingot`

The intermediate mapping is resolved automatically. Both original source IDs end up pointing to the final target.

---

## Chain Depth Limit

Chains are resolved up to a maximum depth of **10**. If a chain exceeds this limit, it is treated as likely circular and rejected with an error in the log.

For most real-world use cases, chains are only 2-3 levels deep. If you hit the depth limit, check for accidental cycles.

---

## Circular Detection

RemapIDs detects and rejects circular mappings. If your config contains:

```json
{
  "remaps": [
    { "source": "modA:silver_ingot", "target": "modB:silver_ingot" },
    { "source": "modB:silver_ingot", "target": "modA:silver_ingot" }
  ]
}
```

Both mappings are rejected and an error is logged. Self-remaps (a source that maps to itself) are silently dropped.

---

## When Chains Are Useful

### Migrating through multiple mod replacements

If your modpack previously replaced Mod A with Mod B, and now you're replacing Mod B with Mod C, you can keep the old A→B remap and simply add B→C. Players with items from any generation will resolve to the current mod:

**File: `01-old-migration.json`**
```json
{
  "remaps": [
    { "source": "modA:silver_ingot", "target": "modB:silver_ingot", "types": ["item"] }
  ]
}
```

**File: `02-new-migration.json`**
```json
{
  "remaps": [
    { "source": "modB:silver_ingot", "target": "thermal:silver_ingot", "types": ["item"] }
  ]
}
```

RemapIDs flattens these across files — the alphabetical processing order ensures both files are loaded before chain resolution runs.

### Organizing remaps across files

Because chain flattening works across multiple config files, you can keep remaps organized by mod or migration phase without worrying about dependencies between files.

:::warning
Chains exceeding 10 levels are treated as likely circular and are rejected. If you need very deep migrations, consider collapsing intermediate steps into direct mappings.
:::

