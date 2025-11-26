---
sidebar_position: 5
---

# Developer API

This guide covers integrating Aperture API into your own Minecraft Forge mods and working with the camera path system programmatically.

## Overview

Aperture API provides a clean, minimal public API for:

- Creating and manipulating camera paths
- Controlling playback programmatically
- Integrating cinematic cameras into your mod
- Extending functionality with custom features

## Project Setup

### Adding Aperture API as a Dependency

#### Gradle Setup (build.gradle)

```gradle
repositories {
    maven {
        url = "https://www.cursemaven.com"
        content {
            includeGroup "curse.maven"
        }
    }
}

dependencies {
    implementation fg.deobf("curse.maven:aperture-api-1350829:FILE_ID")
}
```

Replace `FILE_ID` with the latest file ID from [CurseForge](https://www.curseforge.com/minecraft/mc-mods/aperture-api/files).

#### Development Environment

**Requirements**:
- Java 17 or higher
- Forge 1.20.1
- Gradle (wrapper provided)

---

## Core API Concepts

### Package Structure

The API is organized under `net.tysontheember.apertureapi`:

```
net.tysontheember.apertureapi/
├── api/          - Public API interfaces and classes
├── client/       - Client-side UI, gizmos, overlays
├── command/      - Command registration
├── commands/     - Command implementations
├── path/         - Path mathematical models
├── util/         - Utility helpers
└── common/       - Shared networking and state
```

### API Design Principles

- **Minimal Surface Area**: Only essential classes are public
- **Package-Private by Default**: Internal implementation details are hidden
- **Documented Public APIs**: All public methods include Javadoc
- **Immutability Where Possible**: Reduces bugs and improves thread safety

---

## Working with Camera Paths

### Creating a Camera Path

```java
import net.tysontheember.apertureapi.api.CameraPath;
import net.tysontheember.apertureapi.api.Keyframe;
import net.tysontheember.apertureapi.api.InterpolationType;

// Create a new camera path
CameraPath path = new CameraPath("my_cinematic");

// Add keyframes
Keyframe keyframe1 = new Keyframe(
    new Vec3(100, 64, 100),  // Position
    new Vec2(0, 180),        // Rotation (pitch, yaw)
    0.0f                      // Time (in seconds)
);

Keyframe keyframe2 = new Keyframe(
    new Vec3(150, 70, 150),
    new Vec2(10, 200),
    5.0f
);

path.addKeyframe(keyframe1);
path.addKeyframe(keyframe2);

// Set interpolation method
path.setInterpolation(InterpolationType.CATMULL_ROM);
```

### Keyframe Properties

```java
// Create a keyframe with full properties
Keyframe keyframe = Keyframe.builder()
    .position(x, y, z)
    .rotation(pitch, yaw)
    .roll(rollAngle)           // Optional
    .fov(fieldOfView)          // Optional
    .time(timeInSeconds)
    .build();

// Access keyframe data
Vec3 position = keyframe.getPosition();
Vec2 rotation = keyframe.getRotation();
float time = keyframe.getTime();
```

### Interpolation Types

```java
import net.tysontheember.apertureapi.api.InterpolationType;

// Available interpolation methods
InterpolationType.CATMULL_ROM  // Smooth spline through points
InterpolationType.BEZIER       // Bezier curves with control points
InterpolationType.COSINE       // Cosine easing
InterpolationType.STEP         // Linear/instant transitions
```

---

## Camera Playback Control

### Playing a Path

```java
import net.tysontheember.apertureapi.api.CameraController;

// Get the camera controller
CameraController controller = CameraController.getInstance();

// Play a path
controller.playPath(path);

// Play with options
controller.playPath(path, PlaybackOptions.builder()
    .constantSpeed(true)
    .loop(false)
    .speed(1.0f)
    .build());
```

### Playback Control

```java
// Stop playback
controller.stopPlayback();

// Pause/Resume
controller.pausePlayback();
controller.resumePlayback();

// Check playback state
boolean isPlaying = controller.isPlaying();
float currentTime = controller.getCurrentTime();
CameraPath currentPath = controller.getCurrentPath();
```

### Playback Events

```java
import net.tysontheember.apertureapi.api.events.CameraEvent;

// Listen for playback events
@SubscribeEvent
public void onCameraStart(CameraEvent.Start event) {
    CameraPath path = event.getPath();
    // Handle playback start
}

@SubscribeEvent
public void onCameraStop(CameraEvent.Stop event) {
    // Handle playback stop
}

@SubscribeEvent
public void onCameraTick(CameraEvent.Tick event) {
    float currentTime = event.getTime();
    Vec3 cameraPos = event.getPosition();
    // Handle each tick of playback
}
```

---

## Path Management

### Saving and Loading Paths

```java
import net.tysontheember.apertureapi.api.PathManager;

// Get the path manager
PathManager pathManager = PathManager.getInstance();

// Save a path
pathManager.savePath(path);

// Load a path
CameraPath loadedPath = pathManager.loadPath("my_cinematic");

// List all paths
List<String> pathNames = pathManager.listPaths();

// Delete a path
pathManager.deletePath("my_cinematic");
```

### Path Serialization

```java
// Export path to JSON
String json = path.toJson();

// Import path from JSON
CameraPath imported = CameraPath.fromJson(json);

// Export to file
path.exportToFile(new File("path.json"));

// Import from file
CameraPath fromFile = CameraPath.importFromFile(new File("path.json"));
```

---

## Advanced Features

### Custom Interpolation

Implement custom interpolation methods:

```java
import net.tysontheember.apertureapi.api.Interpolator;

public class CustomInterpolator implements Interpolator {
    @Override
    public Vec3 interpolatePosition(Keyframe k1, Keyframe k2, float t) {
        // Custom position interpolation logic
        return customLerp(k1.getPosition(), k2.getPosition(), t);
    }

    @Override
    public Vec2 interpolateRotation(Keyframe k1, Keyframe k2, float t) {
        // Custom rotation interpolation logic
        return customRotationLerp(k1.getRotation(), k2.getRotation(), t);
    }
}

// Register custom interpolator
path.setCustomInterpolator(new CustomInterpolator());
```

### Camera Modifiers

Apply modifiers to camera paths:

```java
import net.tysontheember.apertureapi.api.CameraModifier;

// Create a camera shake modifier
public class CameraShake implements CameraModifier {
    @Override
    public void apply(CameraState state, float time) {
        // Add shake to camera position/rotation
        state.addOffset(
            Math.sin(time * 10) * 0.1,
            Math.cos(time * 10) * 0.1,
            0
        );
    }
}

// Apply modifier to path
path.addModifier(new CameraShake());
```

### Path Utilities

```java
import net.tysontheember.apertureapi.util.PathUtils;

// Calculate path length
double length = PathUtils.calculateLength(path);

// Get position at specific time
Vec3 position = PathUtils.getPositionAt(path, 2.5f);

// Get rotation at specific time
Vec2 rotation = PathUtils.getRotationAt(path, 2.5f);

// Reverse a path
CameraPath reversed = PathUtils.reverse(path);

// Concatenate paths
CameraPath combined = PathUtils.concatenate(path1, path2);
```

---

## Client-Side Integration

### Editor Integration

Access the camera editor programmatically:

```java
import net.tysontheember.apertureapi.client.ApertureEditor;

// Open editor with a specific path
ApertureEditor.openEditor(path);

// Close editor
ApertureEditor.closeEditor();

// Check if editor is open
boolean isOpen = ApertureEditor.isEditorOpen();
```

### Custom Gizmos

Create custom gizmos for the editor:

```java
import net.tysontheember.apertureapi.client.gizmo.Gizmo;

public class CustomGizmo extends Gizmo {
    @Override
    public void render(PoseStack poseStack, MultiBufferSource buffer,
                      float partialTicks) {
        // Custom rendering logic
    }

    @Override
    public boolean handleClick(double mouseX, double mouseY) {
        // Handle user interaction
        return true;
    }
}

// Register custom gizmo
ApertureEditor.registerGizmo(new CustomGizmo());
```

### Overlay Rendering

Add custom overlays to the editor:

```java
import net.tysontheember.apertureapi.client.overlay.Overlay;

public class PathInfoOverlay extends Overlay {
    @Override
    public void render(GuiGraphics graphics, float partialTicks) {
        // Render custom overlay information
        graphics.drawString(font, "Path Info", 10, 10, 0xFFFFFF);
    }
}

// Register overlay
ApertureEditor.registerOverlay(new PathInfoOverlay());
```

---

## Networking and Multiplayer

### Syncing Paths

Synchronize paths across clients:

```java
import net.tysontheember.apertureapi.common.network.PacketHandler;

// Send path to clients
PacketHandler.sendPathToClients(path);

// Send path to specific player
PacketHandler.sendPathToPlayer(path, serverPlayer);

// Request path from server
PacketHandler.requestPathFromServer("path_name");
```

### Server-Side Control

Control cameras on the server:

```java
// Server-side playback for specific player
CameraController.playPathForPlayer(serverPlayer, path);

// Stop playback for all players
CameraController.stopAllPlayback();
```

---

## Code Standards and Best Practices

### Following Aperture API Standards

When contributing or extending:

1. **Use Google Java Format**:
   ```bash
   ./gradlew spotlessApply
   ```

2. **Run Code Quality Checks**:
   ```bash
   ./gradlew check
   ```

3. **Package-Private by Default**:
   - Only make classes public when necessary
   - Keep implementation details internal

4. **Document Public APIs**:
   - All public methods must have Javadoc
   - Include parameter descriptions and return values
   - Provide usage examples for complex APIs

### Example: Well-Documented API Method

```java
/**
 * Creates a new camera path with the specified name.
 *
 * <p>The path is created with default settings and no keyframes.
 * Keyframes must be added using {@link #addKeyframe(Keyframe)} before
 * the path can be played.
 *
 * @param name the unique name for this camera path
 * @return a new CameraPath instance
 * @throws IllegalArgumentException if name is null or empty
 *
 * @see #addKeyframe(Keyframe)
 * @see CameraController#playPath(CameraPath)
 */
public static CameraPath createPath(String name) {
    if (name == null || name.isEmpty()) {
        throw new IllegalArgumentException("Path name cannot be null or empty");
    }
    return new CameraPath(name);
}
```

---

## Building and Testing

### Build Commands

```bash
# Build the project
./gradlew assemble

# Run development client
./gradlew runClient

# Run tests
./gradlew test

# Format code
./gradlew spotlessApply

# Run all checks
./gradlew check
```

### Testing Your Integration

```java
import net.tysontheember.apertureapi.test.TestUtils;

@Test
public void testPathCreation() {
    CameraPath path = TestUtils.createTestPath();

    assertEquals(2, path.getKeyframes().size());
    assertEquals(InterpolationType.CATMULL_ROM, path.getInterpolationType());
}

@Test
public void testInterpolation() {
    CameraPath path = TestUtils.createTestPath();
    Vec3 midpoint = PathUtils.getPositionAt(path, 2.5f);

    assertNotNull(midpoint);
    // Verify interpolation results
}
```

---

## API Reference

### Core Classes

| Class | Package | Description |
|-------|---------|-------------|
| `CameraPath` | `api` | Represents a camera path |
| `Keyframe` | `api` | Individual keyframe data |
| `CameraController` | `api` | Playback control |
| `PathManager` | `api` | Path storage and loading |
| `InterpolationType` | `api` | Interpolation methods |

### Common Utilities

| Class | Package | Description |
|-------|---------|-------------|
| `PathUtils` | `util` | Path manipulation utilities |
| `MathUtils` | `util` | Mathematical helpers |
| `RenderUtils` | `util` | Rendering utilities |

---

## Examples and Sample Code

See the [Examples](examples.md) documentation for complete working examples of:

- Creating cinematic sequences
- Custom interpolation implementations
- Integration with other mods
- Advanced camera effects

---

## Getting Help

### Documentation Resources

- [Aperture API Javadoc](https://docs.tysontheember.net/apertureapi) (when available)
- [Source Code](https://github.com/TysonTheEmber/Aperture-API)
- [Examples](examples.md)

### Community Support

- **GitHub Issues**: Report bugs or request features
- **Discussions**: Ask questions and share projects
- **Pull Requests**: Contribute improvements

---

## License

Aperture API is licensed under **GPL-3.0**. When using the API:

- Your mod must also be GPL-3.0 compatible
- Include appropriate license notices
- Credit Aperture API in your project

See the [LICENSE](https://github.com/TysonTheEmber/Aperture-API/blob/main/LICENSE) file for full terms.
