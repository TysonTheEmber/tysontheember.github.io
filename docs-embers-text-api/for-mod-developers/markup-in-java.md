---
sidebar_position: 4
title: Markup in Java
description: Using MarkupParser to convert markup strings to TextSpan lists in your Java code.
---

# Markup in Java

`MarkupParser` converts markup strings (XML-style tags) into `TextSpan` lists. This lets you use the same markup syntax from commands in your Java code.

**Package:** `net.tysontheember.emberstextapi.immersivemessages.api`

---

## Parsing Markup

```java
import net.tysontheember.emberstextapi.immersivemessages.api.MarkupParser;
import net.tysontheember.emberstextapi.immersivemessages.api.TextSpan;

List<TextSpan> spans = MarkupParser.parse("<rainbow>Hello!</rainbow>");
```

The result is a list of `TextSpan` objects ready to use in an `ImmersiveMessage`.

---

## The `fromMarkup` Shorthand

For the common case of "parse markup and create a message", use the factory method:

```java
ImmersiveMessage msg = ImmersiveMessage.fromMarkup(200f,
    "<neon r=2><rainbow><bold>Welcome!</bold></rainbow></neon>"
);
```

This is equivalent to:

```java
List<TextSpan> spans = MarkupParser.parse(
    "<neon r=2><rainbow><bold>Welcome!</bold></rainbow></neon>"
);
ImmersiveMessage msg = new ImmersiveMessage(spans, 200f);
```

The `fromMarkup` version also stores the original markup source in the message for later reference.

---

## Utility Methods

### Extract Plain Text

Strips all markup tags and returns the raw text content:

```java
List<TextSpan> spans = MarkupParser.parse("<rainbow>Hello!</rainbow> World");
String plain = MarkupParser.toPlainText(spans);  // "Hello! World"
```

### Wrap Plain Text (No Markup)

Creates a single-span list from plain text, with no effects:

```java
List<TextSpan> simple = MarkupParser.fromPlainText("Plain message");
```

---

## Complete Markup Syntax

All markup supported by commands works identically in Java strings.

### Style Tags

```java
MarkupParser.parse("<bold>Bold</bold>");
MarkupParser.parse("<italic>Italic</italic>");
MarkupParser.parse("<b><i>Bold and italic</i></b>");
MarkupParser.parse("<u>Underlined</u>");
MarkupParser.parse("<s>Strikethrough</s>");
```

### Color Tag

```java
MarkupParser.parse("<color value=#FF0000>Red text</color>");
MarkupParser.parse("<c value=FF8800>Orange</c>");
```

### Effect Tags

All 19 built-in effects work as tags:

```java
MarkupParser.parse("<rainbow>Cycling colors</rainbow>");
MarkupParser.parse("<wave a=2.0 f=1.5>Tall fast waves</wave>");
MarkupParser.parse("<neon r=3 i=2.0>Bright glow</neon>");
MarkupParser.parse("<typewriter speed=30>Types out character by character</typewriter>");
MarkupParser.parse("<glitch s=0.15 c=0.5>Chromatic glitch</glitch>");
```

### Layout Tags (Global)

Layout tags set properties on the whole message:

```java
MarkupParser.parse("<anchor value=MIDDLE>Centered</anchor>");
MarkupParser.parse("<scale value=1.5>Big text</scale>");
MarkupParser.parse("<offset x=10 y=-20>Shifted</offset>");
MarkupParser.parse("<bg color=#60000000>With background</bg>");
MarkupParser.parse("<fade in=20 out=20>With global fade</fade>");
```

### Inline Items and Entities

```java
MarkupParser.parse("You earned <item id=minecraft:diamond count=3/>!");
MarkupParser.parse("Beware the <entity id=minecraft:creeper scale=0.5/>!");
```

### Presets

```java
MarkupParser.parse("<epic>ACHIEVEMENT UNLOCKED!</epic>");
MarkupParser.parse("<legendary>Legendary Item Found!</legendary>");
```

---

## Nesting

Tags nest the same way as in commands. Effects and styles are inherited:

```java
MarkupParser.parse(
    "<neon r=2>" +
    "  <rainbow><bold>Title Text</bold></rainbow>" +
    "  <color value=#AAAAAA> — subtitle here</color>" +
    "</neon>"
);
```

---

## Working with Results Programmatically

After parsing, you can work with the resulting `TextSpan` list:

```java
List<TextSpan> spans = MarkupParser.parse(
    "<rainbow>First section</rainbow> plain text <wave>last section</wave>"
);

// Iterate spans
for (TextSpan span : spans) {
    System.out.println(span.getContent());
    System.out.println("Effects: " + span.getEffects().size());
}

// Modify a span (e.g., boost its scale)
spans.get(0).scale = 1.5f;

// Build message from modified spans
ImmersiveMessage msg = new ImmersiveMessage(spans, 100f);
```

---

## Best Practices

- Use `ImmersiveMessage.fromMarkup()` for simple cases — it's the most concise.
- Use `MarkupParser.parse()` when you need to manipulate the spans before creating the message.
- For messages with no effects, use `ImmersiveMessage.builder(duration, text)` or `new ImmersiveMessage(Component.literal(text), duration)`.
- Markup strings can be loaded from config files, NBT data, or any string source — the parser is stateless and thread-safe for reads.
