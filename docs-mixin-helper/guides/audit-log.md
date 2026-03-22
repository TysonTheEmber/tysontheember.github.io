---
sidebar_position: 4
---

# Audit Log

The audit log generates a comprehensive JSON report of every mixin config loaded in your game. It's your primary tool for discovering mixin class names, understanding what mods are modifying, and diagnosing conflicts.

## Enabling the Audit Log

The audit log is enabled by default. Verify it's on in `config/mixinhelper.json`:

```json
"audit": {
  "enabled": true,
  "outputFile": "config/mixinhelper-report.json",
  "includeAnnotations": true
}
```

After launching the game, the report is written to the path specified in `outputFile`.

---

## Reading the Report

The report is a JSON object with top-level metadata and a `mixinConfigs` array. Each entry in the array represents one mixin config:

```json
{
  "generatedAt": "2026-03-22T12:00:00Z",
  "totalMixinConfigs": 42,
  "totalMixins": 318,
  "blacklistedCount": 2,
  "mixinConfigs": [
    {
      "name": "examplemod.mixins.json",
      "packageName": "com.example.examplemod.mixin",
      "priority": 1000,
      "pluginClass": "com.example.examplemod.MixinPlugin",
      "mixins": [
        {
          "className": "com.example.examplemod.mixin.MixinLevel",
          "annotations": ["@Inject", "@Redirect"],
          "side": "common",
          "blacklisted": false
        },
        {
          "className": "com.example.examplemod.mixin.client.MixinLevelRenderer",
          "annotations": ["@Inject", "@ModifyVariable"],
          "side": "client",
          "blacklisted": false
        }
      ]
    }
  ],
  "blacklistedMixins": [
    {
      "className": "com.example.examplemod.mixin.MixinDisabled",
      "reason": "Blacklisted by individual mixin rule"
    }
  ]
}
```

### Top-Level Fields

| Field | Description |
|-------|-------------|
| `generatedAt` | Timestamp when the report was generated |
| `totalMixinConfigs` | Total number of mixin configs loaded |
| `totalMixins` | Total number of individual mixins across all configs |
| `blacklistedCount` | Number of mixins blocked by Mixin Helper |
| `mixinConfigs` | Array of mixin config entries (see below) |
| `blacklistedMixins` | Mixins that were blocked, with reasons |

### Config Entry Fields

| Field | Description |
|-------|-------------|
| `name` | The mixin config filename (use this for config blacklisting) |
| `packageName` | Base package for the mixin classes |
| `priority` | The effective priority of this config |
| `pluginClass` | The mixin plugin class, if any |
| `mixins` | All mixins in this config, with their side and annotations |

### Mixin Entry Fields

| Field | Description |
|-------|-------------|
| `className` | Fully qualified mixin class name |
| `annotations` | Mixin framework annotations used (if `includeAnnotations` is enabled) |
| `side` | Which side this mixin applies to: `common`, `client`, or `server` |
| `blacklisted` | Whether this mixin was blocked by Mixin Helper |

---

## Using the Report for Blacklisting

### Finding a Mixin to Blacklist

1. Open the report and search for the mod name or target class
2. Find the `className` of the mixin you want to block
3. Add it to `blacklist.mixins` in your config

**Example workflow:**

You know `Create` is conflicting with another mod on `Level`. Search the report for `create`:

```json
{
  "name": "create.mixins.json",
  "packageName": "com.simibubi.create.mixin",
  "mixins": [
    {
      "className": "com.simibubi.create.mixin.MixinLevel",
      "annotations": ["@Inject"],
      "side": "common",
      "blacklisted": false
    }
  ]
}
```

Now add it to your blacklist:

```json
"blacklist": {
  "mixins": ["com.simibubi.create.mixin.MixinLevel"]
}
```

### Finding a Config to Blacklist

Use the `name` field directly:

```json
"blacklist": {
  "mixinConfigs": ["create.mixins.json"]
}
```

---

## Annotation Information

When `includeAnnotations` is `true`, the report shows which Mixin framework annotations each mixin class uses. This helps you understand what a mixin does before deciding whether to blacklist it.

### Annotation Quick Reference

| Annotation | What It Does | Conflict Risk |
|-----------|-------------|---------------|
| `@Inject` | Injects code at a specific point | Low — multiple can coexist |
| `@Redirect` | Replaces a single method call | **High** — only one per target |
| `@Overwrite` | Replaces an entire method | **High** — only one per target |
| `@ModifyArg` | Changes an argument to a method call | Medium |
| `@ModifyVariable` | Changes a local variable | Medium |
| `@ModifyConstant` | Changes a constant value | Medium |
| `@Accessor` | Adds a getter/setter for private fields | Low |
| `@Invoker` | Exposes a private method | Low |
| `@WrapOperation` | Wraps a method call | Medium |

:::tip
Mixins using `@Redirect` or `@Overwrite` are the most likely to conflict with other mods. Prioritize investigating these when diagnosing issues.
:::

---

## Customizing the Report

### Output Location

Change where the report is written:

```json
"audit": {
  "outputFile": "logs/mixin-audit.json"
}
```

### Disable Annotation Scanning

If you don't need annotation data and want slightly faster startup:

```json
"audit": {
  "includeAnnotations": false
}
```

### Disable the Audit Entirely

```json
"audit": {
  "enabled": false
}
```

---

## Next Steps

- [Blacklisting Guide](blacklisting.md) — Use the audit report to identify and block mixins
- [Priority Control](priorities.md) — Reorder mixins based on what the report reveals
- [Configuration Reference](../configuration.md) — Full config documentation
