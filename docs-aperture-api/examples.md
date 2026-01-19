---
sidebar_position: 6
---

# Examples

Practical examples demonstrating how to use Aperture API for various cinematic scenarios.

## Basic Examples

### Example 1: Simple Flythrough

Create a basic camera flythrough using the in-game editor.

**Objective**: Create a smooth camera path that flies through a building.

**Steps**:

1. Open the editor:
   ```
   /aperture
   ```

2. Position your camera at the starting point (outside the building)

3. Add first keyframe in the editor interface

4. Move to the next position (entrance of building)

5. Add second keyframe

6. Continue adding keyframes through the building

7. Set interpolation to **Catmull-Rom** for smooth curves

8. Enable **constant-speed playback**

9. Preview and adjust as needed

10. Save the path:
    ```
    Name: building_tour
    ```

11. Play the finished path:
    ```
    /camera play building_tour
    ```

**Result**: A smooth camera movement that flows naturally through the building.

---

### Example 2: Cinematic Reveal

Create a dramatic reveal shot that starts close and pulls back.

**Objective**: Start with a tight shot on an object, then pull back to reveal the full scene.

**Keyframe Setup**:

- **Keyframe 1** (0s):
  - Position: Close to subject
  - FOV: 30 (zoomed in)
  - Rotation: Focused on subject

- **Keyframe 2** (3s):
  - Position: Medium distance
  - FOV: 50
  - Rotation: Still centered on subject

- **Keyframe 3** (6s):
  - Position: Far back, elevated
  - FOV: 70 (wide angle)
  - Rotation: Showing entire scene

**Settings**:
- Interpolation: **Cosine** (for smooth acceleration/deceleration)
- Duration: 6 seconds
- Constant-speed: Enabled

**Result**: A professional reveal that smoothly transitions from detail to context.

---

### Example 3: Orbit Shot

Create a camera that orbits around a central point of interest.

**Objective**: Circle around a structure while keeping it centered in frame.

**Technique**:

1. Choose your center point (e.g., a statue or building)

2. Place 8-12 keyframes in a circle around the center:
   - Each keyframe faces the center
   - Maintain constant distance from center
   - Evenly space keyframes around the circle

3. Settings:
   - Interpolation: **Catmull-Rom**
   - Ensure first and last keyframes align for smooth looping
   - Constant rotation speed

**Pro Tip**: Use the same Y-coordinate for all keyframes to maintain level orbit, or vary Y for a spiral effect.

**Result**: Smooth circular motion keeping the subject in center frame.

---

## Intermediate Examples

### Example 4: Multi-Segment Path

Combine different interpolation methods in one path.

**Scenario**: Castle cinematic with varied movement styles.

**Segment 1: Approach** (0-5s)
- Interpolation: **Bezier**
- Custom curve approaching castle gates
- Slow, deliberate movement

**Segment 2: Gate Entry** (5-7s)
- Interpolation: **Cosine**
- Smooth deceleration through gates
- Ease to a stop

**Segment 3: Interior Pan** (7-12s)
- Interpolation: **Catmull-Rom**
- Flowing movement through great hall
- Constant speed

**Segment 4: Tower Ascent** (12-15s)
- Interpolation: **Cosine**
- Smooth acceleration upward
- Reveal from tower top

**Implementation**:
- Create each segment as separate path sections
- Carefully align endpoints
- Test transitions between segments
- Adjust timing for smooth flow

---

### Example 5: Dynamic Action Follow

Track a moving subject (player or entity).

**Objective**: Follow a player performing parkour.

**Technique**:

1. Record the subject's movement first (or plan the route)

2. Create keyframes that track alongside:
   - Position slightly behind and to the side
   - Rotation pointing at predicted subject position
   - Match subject's speed in path timing

3. Settings:
   - Interpolation: **Catmull-Rom** for smooth tracking
   - Constant-speed: **Disabled** (to match action pacing)
   - Add lead/lag keyframes for dramatic effect

4. Fine-tuning:
   - Preview alongside actual subject movement
   - Adjust timing to stay synchronized
   - Add anticipation keyframes before major moves

**Advanced**: Use API to programmatically adjust path based on actual subject position.

---

### Example 6: Establishing Shot Sequence

Create a sequence of shots that establish a location.

**Shot 1: Wide Establishing** (0-4s)
- High, distant view of entire area
- Slow pan across landscape
- Interpolation: Cosine

**Shot 2: Medium Approach** (4-8s)
- Move toward main feature
- Focus on key structures
- Interpolation: Catmull-Rom

**Shot 3: Detail Close-up** (8-10s)
- Close on specific detail
- Slow, steady movement
- Interpolation: Cosine

**Shot 4: Connecting Movement** (10-14s)
- Link back to wider context
- Reveal spatial relationships
- Interpolation: Catmull-Rom

**Implementation**:
```
/camera play establishing_wide
/camera play establishing_approach
/camera play establishing_detail
/camera play establishing_connect
```

Or combine into single path with varied pacing.

---

## Advanced Examples

### Example 7: Programmatic Path Creation

Use the API to generate paths procedurally.

```java
import net.tysontheember.apertureapi.api.*;

public class ProceduralPath {
    public static CameraPath createSpiralPath(Vec3 center,
                                             double radius,
                                             double height,
                                             int keyframes) {
        CameraPath path = new CameraPath("spiral");

        for (int i = 0; i < keyframes; i++) {
            double angle = (Math.PI * 2 * i) / keyframes;
            double x = center.x + Math.cos(angle) * radius;
            double y = center.y + (height * i) / keyframes;
            double z = center.z + Math.sin(angle) * radius;

            // Calculate rotation to face center
            double yaw = Math.toDegrees(Math.atan2(
                center.z - z,
                center.x - x
            ));

            Keyframe kf = Keyframe.builder()
                .position(x, y, z)
                .rotation(0, (float) yaw)
                .time(i * 0.5f)
                .build();

            path.addKeyframe(kf);
        }

        path.setInterpolation(InterpolationType.CATMULL_ROM);
        return path;
    }
}

// Usage
CameraPath spiral = ProceduralPath.createSpiralPath(
    new Vec3(0, 64, 0),  // Center
    50,                   // Radius
    30,                   // Height
    20                    // Keyframes
);

CameraController.getInstance().playPath(spiral);
```

**Result**: Automatically generated spiral path around a point.

---

### Example 8: Camera Shake Effect

Add camera shake using modifiers.

```java
import net.tysontheember.apertureapi.api.*;

public class CameraShakeModifier implements CameraModifier {
    private final float intensity;
    private final float frequency;

    public CameraShakeModifier(float intensity, float frequency) {
        this.intensity = intensity;
        this.frequency = frequency;
    }

    @Override
    public void apply(CameraState state, float time) {
        // Perlin-like noise for natural shake
        double shakeX = Math.sin(time * frequency) * intensity;
        double shakeY = Math.cos(time * frequency * 1.3) * intensity;
        double shakeZ = Math.sin(time * frequency * 0.7) * intensity;

        state.addOffset(shakeX, shakeY, shakeZ);

        // Subtle rotation shake
        float shakePitch = (float)(Math.sin(time * frequency * 2) * intensity * 2);
        float shakeYaw = (float)(Math.cos(time * frequency * 2.3) * intensity * 2);

        state.addRotation(shakePitch, shakeYaw);
    }
}

// Apply to path
CameraPath path = loadPath("action_scene");
path.addModifier(new CameraShakeModifier(0.1f, 10.0f));
CameraController.getInstance().playPath(path);
```

**Use Cases**:
- Earthquake effects
- Explosion impacts
- Intense action sequences
- Handheld camera simulation

---

### Example 9: Synchronized Multi-Camera

Coordinate multiple camera paths with events.

```java
import net.tysontheember.apertureapi.api.*;
import net.tysontheember.apertureapi.api.events.*;

public class MultiCameraDirector {
    private final List<CameraPath> shots;
    private int currentShot = 0;

    @SubscribeEvent
    public void onCameraStop(CameraEvent.Stop event) {
        // Automatically transition to next shot
        currentShot++;
        if (currentShot < shots.size()) {
            CameraPath nextShot = shots.get(currentShot);
            CameraController.getInstance().playPath(nextShot);
        }
    }

    public void playSequence() {
        currentShot = 0;
        CameraController.getInstance().playPath(shots.get(0));
    }
}

// Setup
MultiCameraDirector director = new MultiCameraDirector();
director.addShot(wideShot);
director.addShot(mediumShot);
director.addShot(closeUpShot);
director.playSequence();
```

**Result**: Automatic sequencing through multiple camera angles.

---

### Example 10: Time-Lapse with Camera Movement

Combine camera path with time manipulation.

```java
import net.tysontheember.apertureapi.api.*;

public class TimeLapsePath {
    public static void createTimeLapse(CameraPath path,
                                      int tickSpeed) {
        CameraController controller = CameraController.getInstance();

        // Listen for camera ticks
        controller.addEventListener(new CameraEventListener() {
            @Override
            public void onTick(CameraEvent.Tick event) {
                // Speed up time while camera moves
                MinecraftServer server = event.getServer();
                if (server != null) {
                    // Advance time
                    server.getOverworld().setDayTime(
                        server.getOverworld().getDayTime() + tickSpeed
                    );
                }
            }
        });

        // Play the path
        controller.playPath(path);
    }
}

// Create sunrise time-lapse with camera movement
CameraPath sunrisePath = createPath("sunrise_path");
TimeLapsePath.createTimeLapse(sunrisePath, 20); // 20x speed
```

**Result**: Camera movement synchronized with accelerated time.

---

## Creative Techniques

### Dolly Zoom (Vertigo Effect)

Create the famous "dolly zoom" effect by moving camera while adjusting FOV.

**Keyframe Setup**:

- **Keyframe 1**:
  - Position: Close to subject
  - FOV: 70
  - Subject fills 50% of frame

- **Keyframe 2**:
  - Position: Far from subject
  - FOV: 30
  - Subject still fills 50% of frame (maintained through FOV change)

**Settings**:
- Interpolation: **Bezier** (for precise control)
- Coordinate FOV change with distance change
- Keep subject size constant in frame

**Effect**: Background appears to compress or expand while subject remains same size.

---

### Impossible Geometry

Create paths that utilize Minecraft's teleportation for impossible movements.

**Technique**:
1. Create path segment ending at location A
2. Place identical keyframe at location B
3. Use **Step** interpolation between them
4. Continue path from location B

**Result**: Instant "teleport" cuts that appear as continuous movement through impossible spaces.

---

### Dutch Angle (Tilted Camera)

Add dramatic tension with camera roll.

**Implementation**:
```java
Keyframe tiltedKeyframe = Keyframe.builder()
    .position(x, y, z)
    .rotation(pitch, yaw)
    .roll(15.0f)  // 15-degree tilt
    .build();
```

**Variations**:
- Gradual roll during movement
- Sudden roll for impact moments
- Return to level for resolution

---

## Troubleshooting Examples

### Fixing Jerky Motion

**Problem**: Path appears jerky or stuttery.

**Solution**:
1. Reduce number of keyframes
2. Enable constant-speed playback
3. Check interpolation method (try Catmull-Rom)
4. Ensure even keyframe spacing

### Fixing Overshoot

**Problem**: Camera overshoots or curves unexpectedly.

**Solution**:
1. Switch from Catmull-Rom to Cosine or Bezier
2. Add intermediate constraint keyframes
3. Adjust control handles (Bezier mode)

### Synchronizing with Music

**Problem**: Camera movement doesn't match audio.

**Solution**:
1. Import audio into video editor first
2. Note timestamps for key beats/moments
3. Place keyframes at exact times
4. Adjust duration and timing precisely
5. Use Step interpolation for instant cuts on beats

---

## Real-World Scenarios

### Building Showcase

**Goal**: Show off a detailed build comprehensively.

**Path Strategy**:
1. Exterior orbit at multiple heights
2. Approach shots from cardinal directions
3. Interior room-by-room tour
4. Detail close-ups on special features
5. Final pull-back to wide shot

**Duration**: 2-3 minutes
**Keyframes**: 30-50
**Interpolation**: Mix of Catmull-Rom and Cosine

---

### Story Trailer

**Goal**: Create dramatic trailer for a Minecraft story/map.

**Shot List**:
1. Establishing shot of world
2. Quick cuts of key locations (Step interpolation)
3. Character introductions (slow, Cosine)
4. Action sequences (dynamic, Catmull-Rom)
5. Climactic moment (dramatic, Bezier)
6. Title reveal (simple, Cosine)

**Editing**: Combine multiple paths with external video editor.

---

### Tutorial Video

**Goal**: Clear, educational camera work for tutorial content.

**Guidelines**:
- Slower movements for clarity
- Cosine interpolation for smooth starts/stops
- Position camera for optimal visibility
- Avoid distracting movements
- Return to neutral positions between demonstrations

---

## Performance Tips

### Optimizing Complex Paths

For paths with many keyframes:

1. **Reduce Resolution**: Fewer keyframes where possible
2. **Disable Overlays**: Turn off editor overlays during playback
3. **Simplify Interpolation**: Use Step or Cosine instead of Bezier
4. **Lower Render Distance**: Reduce during path editing
5. **Close Other Applications**: Free system resources

### Batch Processing

Process multiple paths efficiently:

```java
List<CameraPath> paths = loadAllPaths();
for (CameraPath path : paths) {
    // Process path
    CameraController.getInstance().playPath(path);
    // Export/record
    exportPath(path);
}
```

---

## Further Learning

### Recommended Progression

1. Start with simple 2-3 keyframe paths
2. Experiment with each interpolation type
3. Create basic cinematics (flythrough, orbit, reveal)
4. Combine multiple paths into sequences
5. Explore API integration
6. Create custom effects and modifiers

### Resources

- [Path System](path-system.md) - Deep dive into path mechanics
- [Developer API](developer-api.md) - Programmatic control
- [Commands](commands.md) - Complete command reference

---

## Community Examples

Share your creations and learn from others:

- **GitHub Discussions**: Share techniques and paths
- **Video Showcases**: Post your cinematics
- **Path Files**: Export and share interesting paths
- **Tutorials**: Create guides for specific techniques

---

## Next Steps

Now that you've seen various examples:

1. **Practice**: Recreate these examples in your world
2. **Experiment**: Modify examples to create variations
3. **Create**: Design your own unique camera movements
4. **Share**: Contribute your examples to the community

Happy filming!
