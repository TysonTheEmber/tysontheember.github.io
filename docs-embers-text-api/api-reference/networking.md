---
sidebar_position: 6
title: Networking and Packets
description: Server-to-client packet types, serialization, and the network protocol.
---

# Networking and Packets

Embers Text API communicates between server and client using custom network packets. All message transmission is server-to-client.

**Package:** `net.tysontheember.emberstextapi.network`

---

## Network Channel

The network channel registration differs by loader:

### Forge 1.20.1

Registered during `FMLCommonSetupEvent` using Forge's `SimpleChannel`:

```java
// Registers all S2C packets on the Forge SimpleChannel
// Protocol version: "3"
```

### NeoForge 1.21.1

Registered using NeoForge's `StreamCodec` system during mod initialization. Packets use NeoForge's built-in codec-based serialization.

### Fabric (1.20.1 and 1.21.1)

Registered using the Fabric Networking API with custom packet codecs. The `FabricNetworkHandler` handles packet registration and `FabricClientPacketHandlers` processes incoming packets on the client.

:::note
The packet types, payload structure, and client handling are identical across all loaders. Only the network transport layer differs.
:::

---

## Packet Types

### S2C_OpenMessagePacket

Creates a new on-screen message on the client.

```java
public record S2C_OpenMessagePacket(UUID id, CompoundTag nbt)
```

| Field | Type | Description |
|---|---|---|
| `id` | `UUID` | Unique identifier for this message. Used for subsequent updates or removal. |
| `nbt` | `CompoundTag` | Serialized `ImmersiveMessage` data (all spans, effects, positioning, etc.). |

**Handler:** `ClientMessageManager.open(id, deserializedMessage)`

---

### S2C_UpdateMessagePacket

Updates an existing message's properties without removing and re-creating it.

```java
public record S2C_UpdateMessagePacket(UUID id, CompoundTag nbt)
```

| Field | Type | Description |
|---|---|---|
| `id` | `UUID` | The UUID of the message to update (must match a previously opened message). |
| `nbt` | `CompoundTag` | New serialized message data. Replaces the existing message state. |

**Handler:** `ClientMessageManager.update(id, deserializedMessage)`

Use this to refresh a message before it expires, or to change its content/effects mid-display.

---

### S2C_CloseMessagePacket

Removes a specific message from the client.

```java
public record S2C_CloseMessagePacket(UUID id)
```

| Field | Type | Description |
|---|---|---|
| `id` | `UUID` | The UUID of the message to remove. |

**Handler:** `ClientMessageManager.close(id)`

---

### S2C_CloseAllMessagesPacket

Removes all active messages from the client.

```java
public record S2C_CloseAllMessagesPacket()
```

No fields. Clears the entire active message set.

**Handler:** `ClientMessageManager.closeAll()`

---

## Convenience Method

For the most common case (sending a new message), use the static helper:

```java
// Forge / NeoForge
import net.tysontheember.emberstextapi.EmbersTextAPI;
EmbersTextAPI.sendMessage(serverPlayer, immersiveMessage);

// Fabric
import net.tysontheember.emberstextapi.fabric.EmbersTextAPIFabric;
EmbersTextAPIFabric.sendMessage(serverPlayer, immersiveMessage);
```

This internally:
1. Generates a new UUID.
2. Serializes the message to NBT.
3. Sends an `S2C_OpenMessagePacket`.

---

## TextSpan Serialization

Each `TextSpan` in a message is serialized to a `FriendlyByteBuf` with validation:

| Property | Max Value |
|---|---|
| Content length | 65,536 characters |
| Item/Entity ID length | 256 characters |
| Effect tag string length | 512 characters |
| Array sizes (gradient colors, etc.) | 256 entries |
| Item stack count | 64 |
| Scale values | 100.0 |
| Offset values | 10,000.0 |

Values exceeding these limits are clamped during serialization. This prevents malicious or accidental oversized data from being transmitted.

---

## Effect Serialization

Effects within spans are serialized as strings in the format:

```
effectName key1=value1 key2=value2
```

On deserialization, `EffectRegistry.parseTag()` recreates the effect instance. If an effect name is not recognized on the receiving client (e.g., a custom effect from a mod that the client doesn't have), it is logged and skipped — the message still renders, just without that effect.

---

## ClientMessageManager

The client-side manager that stores and processes active messages.

**Package:** `net.tysontheember.emberstextapi.client`

```java
/** Open (create) a new message. */
public static void open(UUID id, ImmersiveMessage message)

/** Update an existing message. */
public static void update(UUID id, ImmersiveMessage message)

/** Close (remove) a specific message. */
public static void close(UUID id)

/** Close all active messages. */
public static void closeAll()

/** Called each game tick — handles age tracking and expiry. */
public static void onClientTick()

/** Called each frame — renders all active messages. */
public static void onRenderGui()
```

Messages are stored in a `ConcurrentHashMap<UUID, ActiveMessage>` for thread-safe access.
