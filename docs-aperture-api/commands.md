---
sidebar_position: 3
---

# Commands Reference

Complete reference for all Aperture API commands. All commands require operator permissions in multiplayer.

## `/aperture` Command

The main command for accessing Aperture API features and information.

### Syntax

```mcfunction
/aperture [subcommand]
```

### Subcommands

#### `help`

Display help information about Aperture API commands and features.

```mcfunction
/aperture help
```

**Output**: Shows available commands and basic usage information.

#### `version`

Display the current version of Aperture API.

```mcfunction
/aperture version
```

**Output**: Shows the mod version number.

#### `api`

Display API information for developers.

```mcfunction
/aperture api
```

**Output**: Shows API version and integration details.

---

## `/camera` Command

Manage camera paths and playback controls.

### Syntax

```mcfunction
/camera <subcommand> [arguments]
```

### Playback Subcommands

#### `list`

List all saved camera paths.

```mcfunction
/camera list
```

**Output**: Displays all available camera paths with their names.

**Example**:
```
Available camera paths:
- intro_scene
- flythrough
- dramatic_zoom
```

#### `play`

Play a saved camera path.

```mcfunction
/camera play <path_name>
```

**Parameters**:
- `<path_name>` - The name of the camera path to play

**Example**:
```mcfunction
/camera play intro_scene
```

**Output**: Starts playback of the specified camera path.

#### `stop`

Stop the currently playing camera path.

```mcfunction
/camera stop
```

**Output**: Halts camera playback and returns camera control to the player.

#### `reset`

Reset the camera to its default position.

```mcfunction
/camera reset
```

**Output**: Resets camera position and rotation to the player's current view.

### Configuration Subcommands

Camera configuration commands allow you to adjust playback settings and path parameters.

:::note
Additional configuration subcommands may be available through the in-game editor interface.
:::

### Export Subcommands

Export camera paths for external use or backup.

:::note
Specific export syntax is handled through the editor interface and API.
:::

---

## Command Usage Examples

### Basic Workflow

1. **Create a new path in the editor**:
   ```mcfunction
   /aperture
   ```

2. **List available paths**:
   ```mcfunction
   /camera list
   ```

3. **Play a specific path**:
   ```mcfunction
   /camera play my_cinematic
   ```

4. **Stop playback**:
   ```mcfunction
   /camera stop
   ```

5. **Reset camera position**:
   ```mcfunction
   /camera reset
   ```

### Quick Reference

| Command | Description |
|---------|-------------|
| `/aperture` | Open camera editor |
| `/aperture help` | Show help information |
| `/aperture version` | Display mod version |
| `/aperture api` | Show API information |
| `/camera list` | List all camera paths |
| `/camera play <name>` | Play a camera path |
| `/camera stop` | Stop current playback |
| `/camera reset` | Reset camera position |

---

## Command Permissions

### Single Player

All commands are available by default in single-player worlds.

### Multiplayer

In multiplayer environments:
- Requires **operator level 2** or higher
- Server operators can grant permissions via `/op <player>`
- Commands affect only the executing player's camera

### Permission Levels

| Command | Required Level |
|---------|----------------|
| `/aperture` | Operator (level 2) |
| `/camera` | Operator (level 2) |

---

## Command Tips

### Path Naming

When creating and saving paths:
- Use descriptive names (e.g., `castle_flythrough` instead of `path1`)
- Avoid spaces (use underscores or hyphens)
- Keep names short but meaningful
- Use consistent naming conventions

### Playback Control

- Use `/camera stop` before switching paths
- Reset the camera after playback for normal gameplay
- Preview paths in the editor before finalizing

### Performance

- Limit the number of saved paths to improve load times
- Delete unused paths to keep your workspace clean
- Complex paths with many keyframes may impact performance

---

## Troubleshooting

### "Unknown command" Error

**Cause**: Aperture API is not loaded or installed correctly.

**Solution**:
- Verify the mod is in your `mods` folder
- Check that you're running Forge 1.20.1
- Restart Minecraft after installing

### "Insufficient permissions" Error

**Cause**: You don't have operator permissions.

**Solution**:
- In single-player, enable cheats when creating the world
- In multiplayer, ask a server admin for operator status
- Use `/op <your_username>` (requires console access)

### Path Not Found

**Cause**: The specified path name doesn't exist.

**Solution**:
- Use `/camera list` to see available paths
- Check spelling and capitalization (names are case-sensitive)
- Ensure the path was saved correctly in the editor

### Camera Not Moving

**Cause**: Path may be too short or have playback issues.

**Solution**:
- Verify the path has at least 2 keyframes
- Check that keyframes are spaced apart
- Try a different interpolation method
- Ensure constant-speed mode is configured correctly

---

## Advanced Usage

### Command Chaining

In some cases, you may want to chain commands:

```mcfunction
/camera stop
/camera reset
/camera play new_path
```

### Scripting and Automation

For developers and advanced users:
- Commands can be executed via command blocks
- Use function files (`.mcfunction`) for automated sequences
- Integrate with other mods via the Aperture API

---

## Related Documentation

- [Getting Started](getting-started.md) - Setup and basic usage
- [Path System](path-system.md) - Understanding camera paths
- [Developer API](developer-api.md) - Programmatic control
- [Examples](examples.md) - Real-world command usage
