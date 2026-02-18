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
// Protocol version: "4"
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

No fields. Clears the entire active message set and all channel queues.

**Handler:** `ClientMessageManager.closeAll()`

---

### S2C_OpenQueuePacket

Sends a full ordered sequence of message steps to the client on a named channel. Steps play sequentially — the next step starts only after every message in the current step has expired.

**Wire format:**
```
writeUtf(channel)
writeVarInt(stepCount)
for each step:
    writeVarInt(messageCount)
    for each message:
        writeUUID(id)
        writeNbt(serializedImmersiveMessage)
```

| Field | Type | Description |
|---|---|---|
| `channel` | `String` | Named channel identifier. Multiple channels run independently. |
| `ids` | `List<List<UUID>>` | Per-step, per-message UUIDs for lifecycle tracking. |
| `stepData` | `List<List<CompoundTag>>` | Per-step, per-message serialized `ImmersiveMessage` data. |

**Handler:** `ClientMessageManager.enqueueSteps(channel, steps)`

If the channel already has active messages, the new steps are appended to the end of its queue.

---

### S2C_ClearQueuePacket

Clears pending queue steps from a named channel, or all channels.

```java
public record S2C_ClearQueuePacket(String channel)
```

| Field | Type | Description |
|---|---|---|
| `channel` | `String` | The channel to clear. An **empty string** clears all channels and closes all active messages immediately. |

**Handler:**
- Empty channel: `ClientMessageManager.clearAllQueues()`
- Named channel: `ClientMessageManager.clearQueue(channel)`

---

## Sending Messages — NetworkHelper API

The `NetworkHelper` interface provides all server-side send methods. Obtain the singleton via `NetworkHelper.getInstance()`.

### Individual Messages

```java
/** Send a new message to a player (generates a random UUID internally). */
void sendMessage(ServerPlayer player, ImmersiveMessage message)

/** Send a new message with an explicit UUID. */
void sendOpenMessage(ServerPlayer player, ImmersiveMessage message)

/** Update an existing message by its string UUID. */
void sendUpdateMessage(ServerPlayer player, String messageId, ImmersiveMessage message)

/** Close a specific message by its string UUID. */
void sendCloseMessage(ServerPlayer player, String messageId)

/** Close all active messages on the client (also clears all queues). */
void sendCloseAllMessages(ServerPlayer player)
```

### Queue Operations

```java
/**
 * Send a full queue of steps to a player on a named channel.
 * Steps is a list of lists — outer list = sequential steps,
 * inner list = messages to display simultaneously within that step.
 * If the channel already has an active queue, the steps are appended.
 */
void sendQueue(ServerPlayer player, String channel, List<List<ImmersiveMessage>> steps)

/**
 * Clear pending (not-yet-started) steps from a named channel.
 * The currently displaying step is not interrupted.
 */
void sendClearQueue(ServerPlayer player, String channel)

/**
 * Clear all channel queues and close all active messages immediately.
 */
void sendClearAllQueues(ServerPlayer player)
```

### Convenience Static Helper

For the most common case (sending a single new message):

```java
// Forge / NeoForge
import net.tysontheember.emberstextapi.EmbersTextAPI;
EmbersTextAPI.sendMessage(serverPlayer, immersiveMessage);

// Fabric
import net.tysontheember.emberstextapi.fabric.EmbersTextAPIFabric;
EmbersTextAPIFabric.sendMessage(serverPlayer, immersiveMessage);
```

This internally generates a new UUID, serializes the message to NBT, and sends an `S2C_OpenMessagePacket`.

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

The client-side manager that stores and processes active messages and queues.

**Package:** `net.tysontheember.emberstextapi.client`

### Individual Message Methods

```java
/** Open (create) a new message. */
public static void open(UUID id, ImmersiveMessage message)

/** Update an existing message. */
public static void update(UUID id, ImmersiveMessage message)

/** Close (remove) a specific message. */
public static void close(UUID id)

/** Close all active messages (does not clear pending queue steps). */
public static void closeAll()

/** Called each game tick — handles age tracking, expiry, and queue advancement. */
public static void onClientTick()

/** Called each frame — renders all active messages. */
public static void onRenderGui()
```

### Queue Methods

```java
/**
 * Enqueue a list of steps on a named channel.
 * If the channel has no active messages, the first step is started immediately.
 * Otherwise, the steps are appended to the channel's pending queue.
 */
public static void enqueueSteps(String channel, List<QueueStep> steps)

/**
 * Clear all pending (not yet started) steps for the named channel.
 * The currently active step continues until its messages expire naturally.
 */
public static void clearQueue(String channel)

/**
 * Close all active messages and clear all channel queues immediately.
 */
public static void clearAllQueues()
```

### Queue Data Types

```java
/** A single message within a queue step. */
public record QueuedMessage(UUID id, ImmersiveMessage message)

/** One sequential step — all messages in this list are displayed simultaneously. */
public record QueueStep(List<QueuedMessage> messages)
```

### Queue Advancement Logic

On each tick, after processing message expiry, `ClientMessageManager` checks each active channel:

1. If all UUIDs that were started for a channel are no longer in the active set (i.e., they have all expired), the next `QueueStep` is dequeued.
2. The next step's messages are opened via `open()`, and their UUIDs are registered as the channel's new active set.
3. If the queue is empty, the channel entry is removed automatically.

Individual messages and queue messages coexist freely — queue channels only advance based on their own tracked UUIDs.

Messages are stored in a `ConcurrentHashMap<UUID, ActiveMessage>` for thread-safe access.
