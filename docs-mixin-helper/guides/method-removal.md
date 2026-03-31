---
sidebar_position: 3
---

# Method Removal & Modification

Mixin Helper can surgically remove or neutralize methods from target classes after all mixins have been applied. This is useful when blacklisting an entire mixin is too aggressive, but a specific injected method is causing problems.

## Actions

### nop (No Operation)

Replaces the method body with a type-appropriate default return:

- `void` methods → empty body
- `boolean` methods → `return false`
- Numeric methods → `return 0`
- Object methods → `return null`

The method signature remains intact, so other code that calls it will not crash — it simply does nothing.

```json
{
  "targetClass": "net.minecraft.world.level.Level",
  "method": "problematicMethod",
  "action": "nop"
}
```

### remove

Deletes the method entirely from the class bytecode.

```json
{
  "targetClass": "net.minecraft.world.level.Level",
  "method": "problematicMethod",
  "action": "remove"
}
```

:::warning
The `remove` action will cause a `NoSuchMethodError` if any code attempts to call the removed method. Use `nop` unless you are certain the method is never called directly.
:::

---

## Method Matching

Three ways to identify the method to target.

### By Exact Name

Match a method by its name. If multiple methods share the same name (overloads), all matching methods are affected.

```json
{
  "targetClass": "net.minecraft.world.level.Level",
  "method": "tickPlayers",
  "action": "nop"
}
```

### By Name and Descriptor

Add a descriptor to match a specific overload. The descriptor follows Java bytecode format.

```json
{
  "targetClass": "net.minecraft.world.level.Level",
  "method": "tickPlayers",
  "descriptor": "()V",
  "action": "nop"
}
```

#### Common Descriptors

| Descriptor | Meaning |
|-----------|---------|
| `()V` | No parameters, returns void |
| `(I)V` | Takes an int, returns void |
| `(Z)Z` | Takes a boolean, returns boolean |
| `(Ljava/lang/String;)V` | Takes a String, returns void |
| `(II)I` | Takes two ints, returns int |

### By Regex Pattern

Match multiple methods using a regular expression on the method name.

```json
{
  "targetClass": "net.minecraft.client.gui.screens.Screen",
  "methodPattern": "render.*",
  "action": "nop"
}
```

This matches any method whose name starts with `render` — e.g., `render`, `renderBackground`, `renderTooltip`.

:::tip
Use `methodPattern` when a mod injects several related methods that you want to disable at once.
:::

---

## Multiple Rules

You can define multiple rules. They are applied in order:

```json
"methodRemovals": {
  "rules": [
    {
      "targetClass": "net.minecraft.world.level.Level",
      "method": "tickPlayers",
      "action": "nop"
    },
    {
      "targetClass": "net.minecraft.client.gui.screens.Screen",
      "methodPattern": "customRender.*",
      "action": "remove"
    }
  ]
}
```

---

:::info Guardrails
Method removal and nop operations on [protected classes](guardrails.md) (chunk generation, palette containers, threading, etc.) are blocked by the guardrails system by default. If a method removal rule targets a protected class, it will be skipped unless `guardrails.bypassProtectedClasses` is enabled.
:::

## When to Use Method Removal

| Scenario | Recommended Action |
|----------|-------------------|
| Injected method causes a crash | `nop` — safest fix |
| Injected method causes visual glitches | `nop` — method still callable |
| Method is confirmed unused by any code | `remove` — cleanest option |
| Multiple related injected methods to disable | `methodPattern` + `nop` |

### Method Removal vs Blacklisting

- **Blacklisting** prevents a mixin from loading at all — none of its changes apply
- **Method removal** lets the mixin apply normally, then strips a specific method afterward

Use method removal when a mixin does several things and you only want to undo one of them.

---

## Verifying Method Removal

Enable debug logging to confirm your rules are being applied:

```json
"debug": {
  "logMethodRemovals": true
}
```

Check the game log for confirmation:

```
[MixinHelper] Nop'd method: tickPlayers()V in net.minecraft.world.level.Level
[MixinHelper] Removed method: customRenderOverlay in net.minecraft.client.gui.screens.Screen
```

