---
sidebar_position: 5
title: Networking
description: Server-to-client packets, NetworkHelper API, and ClientMessageManager.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Networking

Embers Text API uses server-to-client packets for all message delivery. This page covers the NetworkHelper API, packet types, and client-side message management.

**Package:** `net.tysontheember.emberstextapi.network`

---

## Quick Start

For the most common case — send a new message to a player:

<Tabs groupId="loader">
<TabItem value="forge-neo" label="Forge / NeoForge">

```java
import net.tysontheember.emberstextapi.EmbersTextAPI;

EmbersTextAPI.sendMessage(serverPlayer, immersiveMessage);
```

</TabItem>
<TabItem value="fabric" label="Fabric">

```java
import net.tysontheember.emberstextapi.fabric.EmbersTextAPIFabric;

EmbersTextAPIFabric.sendMessage(serverPlayer, immersiveMessage);
```

</TabItem>
</Tabs>

---

## NetworkHelper API

For full control over the message lifecycle, use `NetworkHelper`:

```java
NetworkHelper net = NetworkHelper.getInstance();
```

### Individual Message Methods

```java
// Send a new message (generates UUID automatically)
net.sendMessage(ServerPlayer player, ImmersiveMessage message)

// Send with explicit UUID tracking
net.sendOpenMessage(ServerPlayer player, ImmersiveMessage message)

// Update an existing message before it expires
net.sendUpdateMessage(ServerPlayer player, String messageId, ImmersiveMessage message)

// Close a specific message immediately
net.sendCloseMessage(ServerPlayer player, String messageId)

// Close all active messages across all channels
net.sendCloseAllMessages(ServerPlayer player)
```

### Queue Methods

```java
// Send an ordered sequence of steps on a named channel
// steps: outer list = sequential steps, inner list = simultaneous messages per step
net.sendQueue(ServerPlayer player, String channel, List<List<ImmersiveMessage>> steps)

// Clear pending (not-yet-started) steps from a channel
net.sendClearQueue(ServerPlayer player, String channel)

// Clear all channels and close all messages immediately
net.sendClearAllQueues(ServerPlayer player)
```

---

## Packet Types

All communication is server-to-client (S2C). There are 6 packet types:

### `S2C_OpenMessagePacket`

Creates a new on-screen message.

```java
public record S2C_OpenMessagePacket(UUID id, CompoundTag nbt)
```

| Field | Description |
|---|---|
| `id` | Unique identifier for this message — used for updates and removal |
| `nbt` | Serialized `ImmersiveMessage` (all spans, effects, positioning, etc.) |

**Handler:** `ClientMessageManager.open(id, message)`

---

### `S2C_UpdateMessagePacket`

Replaces an existing message's content without removing and re-creating it.

```java
public record S2C_UpdateMessagePacket(UUID id, CompoundTag nbt)
```

Use this to refresh a message before it expires, or to change content/effects mid-display.

**Handler:** `ClientMessageManager.update(id, message)`

---

### `S2C_CloseMessagePacket`

Removes a specific message.

```java
public record S2C_CloseMessagePacket(UUID id)
```

**Handler:** `ClientMessageManager.close(id)`

---

### `S2C_CloseAllMessagesPacket`

Removes all active messages and clears all queues.

```java
public record S2C_CloseAllMessagesPacket()
```

**Handler:** `ClientMessageManager.closeAll()`

---

### `S2C_OpenQueuePacket`

Sends a full ordered sequence of steps on a named channel.

| Field | Type | Description |
|---|---|---|
| `channel` | `String` | Named channel identifier |
| `ids` | `List<List<UUID>>` | Per-step, per-message UUIDs |
| `stepData` | `List<List<CompoundTag>>` | Per-step, per-message serialized messages |

If the channel already has an active queue, the new steps are **appended**.

**Handler:** `ClientMessageManager.enqueueSteps(channel, steps)`

---

### `S2C_ClearQueuePacket`

Clears pending steps from a channel, or all channels.

```java
public record S2C_ClearQueuePacket(String channel)
```

- **Named channel:** Removes pending steps; current step plays to completion.
- **Empty string:** Clears all channels and closes all active messages immediately.

**Handler:** `ClientMessageManager.clearQueue(channel)` or `ClientMessageManager.clearAllQueues()`

---

## Network Channel Registration

The network channel is registered automatically during mod initialization. The registration method differs by loader:

| Loader | Mechanism |
|---|---|
| Forge 1.20.1 | Forge `SimpleChannel` during `FMLCommonSetupEvent` |
| NeoForge 1.21.1 | NeoForge `StreamCodec` system at mod init |
| Fabric | Fabric Networking API with custom packet codecs |

The packet payload structure and client handling are identical across all loaders.

:::note
You don't need to register any network channels yourself — ETA handles this automatically during its own mod initialization.
:::

---

## ClientMessageManager

The client-side manager that stores and renders all active messages.

**Package:** `net.tysontheember.emberstextapi.client`

### Message Lifecycle

```java
ClientMessageManager.open(UUID id, ImmersiveMessage message)    // Add to active set
ClientMessageManager.update(UUID id, ImmersiveMessage message)  // Replace existing
ClientMessageManager.close(UUID id)                             // Remove specific
ClientMessageManager.closeAll()                                 // Remove all
```

### Queue Operations

```java
// Enqueue steps; starts immediately if channel is idle
ClientMessageManager.enqueueSteps(String channel, List<QueueStep> steps)

// Cancel pending steps (current step plays to completion)
ClientMessageManager.clearQueue(String channel)

// Cancel all queues and close all messages
ClientMessageManager.clearAllQueues()
```

### Queue Data Types

```java
// One message within a queue step
public record QueuedMessage(UUID id, ImmersiveMessage message)

// One sequential step — all messages in this list display simultaneously
public record QueueStep(List<QueuedMessage> messages)
```

### Queue Advancement Logic

On each tick, after processing message expiry:

1. If all UUIDs tracked for a channel have expired, the next `QueueStep` is dequeued.
2. The step's messages are opened via `open()`, and their UUIDs become the channel's active set.
3. When the queue is empty, the channel entry is removed.

Individual messages and queue messages coexist freely — channels only advance based on their own tracked UUIDs.

Messages are stored in a `ConcurrentHashMap<UUID, ActiveMessage>`.

---

## Effect Serialization

Effects within spans are serialized as strings:

```
effectName key1=value1 key2=value2
```

On deserialization, `EffectRegistry.parseTag()` recreates the effect instance. If an effect name is unrecognized on the receiving client (e.g., a custom effect from a mod the client doesn't have), it is logged and skipped — the message still renders without that effect.

---

## Serialization Limits

These limits are enforced during TextSpan serialization to prevent malicious data:

| Property | Limit |
|---|---|
| Content length | 65,536 characters |
| Item/Entity ID length | 256 characters |
| Effect tag string length | 512 characters |
| Array sizes | 256 entries |
| Scale values | 100.0 |
| Offset values | 10,000.0 |

Values exceeding limits are clamped. No exception is thrown.
