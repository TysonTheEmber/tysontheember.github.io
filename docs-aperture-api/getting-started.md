---
sidebar_position: 2
---

# Getting Started

This guide will help you get up and running with Aperture API for creating cinematic camera paths in Minecraft.

## Prerequisites

Before installing Aperture API, ensure you have:

- **Minecraft Java Edition** (version 1.20.1)
- **Forge Mod Loader** (for Minecraft 1.20.1)
- **Java 17** or newer installed

## Installation

### Step 1: Install Forge

1. Download [Forge 1.20.1](https://files.minecraftforge.net/) installer
2. Run the installer and select "Install client"
3. Launch Minecraft with the Forge profile to verify installation

### Step 2: Install Aperture API

1. Download the latest Aperture API `.jar` file from:
   - [GitHub Releases](https://github.com/TysonTheEmber/Aperture-API)
   - [Modrinth](https://modrinth.com/user/TysonTheEmber)
   - [CurseForge](https://www.curseforge.com/members/tysontheember/projects)

2. Locate your Minecraft installation folder:
   - **Windows**: `%APPDATA%\.minecraft`
   - **macOS**: `~/Library/Application Support/minecraft`
   - **Linux**: `~/.minecraft`

3. Place the `.jar` file in the `mods` folder
4. Launch Minecraft with the Forge 1.20.1 profile

## First Steps

### Accessing the Camera Editor

Once in-game, you can access the camera editor using:

```mcfunction
/aperture
```

This opens the main editor interface where you can:
- Create camera paths
- Add keyframes
- Adjust interpolation settings
- Preview your animations

### Basic Camera Commands

Get familiar with these essential commands:

```mcfunction
/aperture help       - Display help information
/aperture version    - Show mod version
/aperture api        - Display API information
```

### Camera Playback Commands

Control camera playback with the `/camera` command:

```mcfunction
/camera list         - List all saved camera paths
/camera play <name>  - Play a camera path
/camera stop         - Stop current playback
/camera reset        - Reset camera to default position
```

## Creating Your First Camera Path

1. **Open the Editor**
   ```mcfunction
   /aperture
   ```

2. **Add Keyframes**
   - Position your camera where you want a keyframe
   - Use the editor interface to add keyframes to your path

3. **Adjust Interpolation**
   - Choose between Catmull-Rom, Bezier, cosine, or step interpolation
   - Each method provides different smoothing characteristics

4. **Preview Your Path**
   - Use the playback controls to preview your camera movement
   - Adjust keyframes as needed for smooth motion

5. **Save Your Path**
   - Name and save your camera path for later use
   - Paths can be loaded and edited at any time

## Understanding Path Interpolation

Aperture API supports multiple interpolation methods:

- **Catmull-Rom**: Smooth curves passing through all keyframes
- **Bezier**: Precise control with adjustable curve handles
- **Cosine**: Smooth acceleration/deceleration between points
- **Step**: Instant transitions between keyframes (no interpolation)

## Tips for Beginners

:::tip
- **Start Simple**: Begin with 2-3 keyframes to understand path behavior
- **Use Preview**: Always preview your paths before recording
- **Experiment**: Try different interpolation methods to see what works best
- **Save Often**: Save your paths frequently to avoid losing work
- **Constant Speed**: Enable constant-speed playback for smoother results
:::

## Next Steps

Now that you're set up, explore:
- [Commands](commands.md) - Complete command reference
- [Path System](path-system.md) - Deep dive into camera paths
- [Examples](examples.md) - Real-world usage examples
- [Developer API](developer-api.md) - Integrate Aperture into your mod

## Troubleshooting

### Mod Not Loading

- Verify you're using Forge 1.20.1
- Check that Java 17 or newer is installed
- Ensure the `.jar` file is in the correct `mods` folder

### Commands Not Working

- Make sure you have operator permissions (or are in single-player)
- Verify the mod loaded by checking the mods list in-game
- Check the console for any error messages

### Performance Issues

- Reduce render distance while editing paths
- Close other applications to free up system resources
- Ensure your graphics drivers are up to date

## Getting Help

If you encounter issues:
- Check the full documentation for detailed information
- Search existing [GitHub Issues](https://github.com/TysonTheEmber/Aperture-API/issues)
- Report new bugs with detailed reproduction steps
