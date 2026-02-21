---
sidebar_position: 1
title: Getting Started
description: Add Embers Text API as a Gradle dependency for Fabric, NeoForge, and Forge.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Getting Started (Mod Developers)

Embers Text API is published to a public Maven repository. Add it as a dependency in your Gradle build to get access to the full Java API.

---

## Maven Repository

```
https://maven.tysontheember.dev
```

<Tabs groupId="gradle-dsl">
<TabItem value="groovy" label="Groovy DSL">

```groovy title="build.gradle"
repositories {
    maven { url = 'https://maven.tysontheember.dev' }
}
```

</TabItem>
<TabItem value="kotlin" label="Kotlin DSL">

```kotlin title="build.gradle.kts"
repositories {
    maven("https://maven.tysontheember.dev")
}
```

</TabItem>
</Tabs>

---

## Dependency Snippets

Replace `VERSION` with the release you want (e.g. `2.4.0`). See [GitHub releases](https://github.com/TysonTheEmber/EmbersTextAPI/releases) for the latest version.

**Group ID:** `net.tysontheember.emberstextapi`

| Loader | Minecraft | Artifact ID |
|---|---|---|
| Fabric | 1.20.1 | `emberstextapi-fabric-1.20.1` |
| Fabric | 1.21.1 | `emberstextapi-fabric-1.21.1` |
| NeoForge | 1.21.1 | `emberstextapi-neoforge-1.21.1` |
| Forge | 1.20.1 | `emberstextapi-forge-1.20.1` |

<Tabs groupId="loader">
<TabItem value="fabric-1211" label="Fabric 1.21.1">

<Tabs groupId="gradle-dsl">
<TabItem value="groovy" label="Groovy DSL">

```groovy title="build.gradle"
dependencies {
    modImplementation "net.tysontheember.emberstextapi:emberstextapi-fabric-1.21.1:VERSION"
}
```

</TabItem>
<TabItem value="kotlin" label="Kotlin DSL">

```kotlin title="build.gradle.kts"
dependencies {
    modImplementation("net.tysontheember.emberstextapi:emberstextapi-fabric-1.21.1:VERSION")
}
```

</TabItem>
</Tabs>

</TabItem>
<TabItem value="neoforge" label="NeoForge 1.21.1">

<Tabs groupId="gradle-dsl">
<TabItem value="groovy" label="Groovy DSL">

```groovy title="build.gradle"
dependencies {
    implementation "net.tysontheember.emberstextapi:emberstextapi-neoforge-1.21.1:VERSION"
}
```

</TabItem>
<TabItem value="kotlin" label="Kotlin DSL">

```kotlin title="build.gradle.kts"
dependencies {
    implementation("net.tysontheember.emberstextapi:emberstextapi-neoforge-1.21.1:VERSION")
}
```

</TabItem>
</Tabs>

</TabItem>
<TabItem value="fabric-1201" label="Fabric 1.20.1">

<Tabs groupId="gradle-dsl">
<TabItem value="groovy" label="Groovy DSL">

```groovy title="build.gradle"
dependencies {
    modImplementation "net.tysontheember.emberstextapi:emberstextapi-fabric-1.20.1:VERSION"
}
```

</TabItem>
<TabItem value="kotlin" label="Kotlin DSL">

```kotlin title="build.gradle.kts"
dependencies {
    modImplementation("net.tysontheember.emberstextapi:emberstextapi-fabric-1.20.1:VERSION")
}
```

</TabItem>
</Tabs>

</TabItem>
<TabItem value="forge" label="Forge 1.20.1">

<Tabs groupId="gradle-dsl">
<TabItem value="groovy" label="Groovy DSL">

```groovy title="build.gradle"
dependencies {
    // fg.deobf() is required — see note below
    implementation fg.deobf("net.tysontheember.emberstextapi:emberstextapi-forge-1.20.1:VERSION")
}
```

</TabItem>
<TabItem value="kotlin" label="Kotlin DSL">

```kotlin title="build.gradle.kts"
dependencies {
    implementation(fg.deobf("net.tysontheember.emberstextapi:emberstextapi-forge-1.20.1:VERSION"))
}
```

</TabItem>
</Tabs>

:::warning Forge 1.20.1 — SRG-mapped JAR
The Forge 1.20.1 artifact uses SRG (intermediate) names. You **must** wrap it with `fg.deobf()` so ForgeGradle remaps it back to Mojang names for your compile classpath. This is standard practice for Forge mod dependencies on this Minecraft version.
:::

</TabItem>
</Tabs>

---

## Sources JARs

Every artifact ships a sources JAR (classifier `sources`). Your IDE picks it up automatically — no extra configuration needed.

---

## Which Artifact to Use?

Use the artifact matching your loader and Minecraft version. The Fabric and NeoForge artifacts include all shared API code.

If you're writing a multiloader mod with your own common module, depend on the loader-specific artifact in the appropriate loader subproject only.

---

## Versioning

Versions follow `MAJOR.MINOR.PATCH` (e.g., `2.4.0`). The mod version is separate from the Minecraft version — the MC version is part of the artifact ID.

Only release versions are published. There are no snapshot builds.

---

## Next Steps

- **[Sending Messages](./sending-messages.md)** — Create your first `ImmersiveMessage` and send it to a player
- **[Markup in Java](./markup-in-java.md)** — Use `MarkupParser` to parse markup strings
- **[Custom Effects](./custom-effects.md)** — Extend the effect system with your own effects
