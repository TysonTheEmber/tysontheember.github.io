---
sidebar_position: 4
---

# Camera Path System

Understanding the camera path system is essential for creating smooth, professional cinematics with Aperture API.

## Overview

The path system in Aperture API uses mathematical curve interpolation to create smooth camera movements between keyframes. The system supports multiple interpolation methods, each offering different characteristics for your cinematics.

## Path Components

### Keyframes

Keyframes are the fundamental building blocks of camera paths. Each keyframe stores:

- **Position**: XYZ coordinates in the world
- **Rotation**: Pitch and yaw angles
- **Roll**: Camera roll angle (optional)
- **Field of View**: Camera FOV value (optional)
- **Timestamp**: Position along the path timeline

### Path Timeline

The timeline represents the duration and progression of your camera movement:

- Measured in ticks or seconds
- Keyframes are placed at specific points along the timeline
- Interpolation fills the gaps between keyframes
- Duration affects playback speed

### Gizmos

Visual editing tools in the editor:

- **Position Gizmo**: Move keyframes in 3D space
- **Rotation Gizmo**: Adjust camera angles
- **Path Visualization**: See the complete camera path
- **Overlay Rendering**: Visual feedback for editing

---

## Interpolation Methods

Aperture API supports four interpolation methods, each suited for different cinematic needs.

### Catmull-Rom Spline

**Best for**: Smooth, flowing camera movements that pass through all keyframes.

**Characteristics**:
- Guaranteed to pass through every keyframe
- Smooth curves with natural acceleration
- Predictable behavior
- Good general-purpose choice

**Use cases**:
- Scenic flyovers
- Smooth camera tours
- Natural-looking movements

**Mathematical behavior**: Uses neighboring keyframes to calculate curve tangents, ensuring smooth transitions while passing exactly through each point.

### Bezier Curves

**Best for**: Precise control over curve shapes and custom camera movements.

**Characteristics**:
- Adjustable control points (handles)
- Fine-tuned curve shaping
- May not pass through all keyframes (depends on handle positions)
- Maximum artistic control

**Use cases**:
- Complex custom movements
- Artistic camera work
- Precise timing requirements
- Professional cinematography

**Mathematical behavior**: Uses control points to define curve shape. Each keyframe can have handles that influence the curve entering and leaving that point.

### Cosine Interpolation

**Best for**: Smooth acceleration and deceleration between keyframes.

**Characteristics**:
- Eased transitions (ease-in, ease-out)
- Smooth start and stop at keyframes
- Simple, predictable behavior
- No overshoot or oscillation

**Use cases**:
- Camera stops and starts
- Slow, deliberate movements
- Dramatic reveals
- Stable, controlled motion

**Mathematical behavior**: Uses cosine function to create S-curve easing between points, providing smooth acceleration at the start and deceleration at the end.

### Step (Linear)

**Best for**: Instant transitions and deliberate, mechanical movements.

**Characteristics**:
- No interpolation (instant jumps)
- Straight-line motion between points
- Constant velocity
- Sharp transitions

**Use cases**:
- Security camera effects
- Timelapse sequences
- Jump cuts
- Special effects

**Mathematical behavior**: Direct linear interpolation or instant jumps between keyframes with no smoothing.

---

## Path Playback

### Constant-Speed Playback

Aperture API includes constant-speed path preview, which ensures:

- Uniform velocity along the path
- Predictable timing
- Smoother visual results
- Easier synchronization with audio/events

### Variable-Speed Playback

Alternative playback where speed varies based on:

- Keyframe spacing in timeline
- Interpolation characteristics
- Custom speed curves (via API)

---

## Path Editor Interface

### Editor Screens

The in-game editor provides:

1. **Timeline View**: Visualize keyframe placement
2. **3D Viewport**: See path in world space
3. **Properties Panel**: Adjust keyframe settings
4. **Playback Controls**: Preview and test animations

### Visual Overlays

Overlays help visualize:

- Path trajectory (line showing camera movement)
- Keyframe markers (positions along the path)
- Camera frustum (field of view cone)
- Grid and reference axes

### Gizmo Controls

Interactive manipulation tools:

- **Translate**: Move keyframes in 3D space
- **Rotate**: Adjust camera angles
- **Scale**: Modify FOV or other parameters
- **Time**: Adjust keyframe position on timeline

---

## Creating Effective Paths

### Path Planning

Before creating your path:

1. **Scout locations**: Find interesting viewpoints
2. **Plan keyframes**: Decide on key moments
3. **Choose interpolation**: Select method based on desired feel
4. **Consider timing**: Plan duration and pacing

### Keyframe Placement

**Best practices**:

- Start simple (2-3 keyframes) and add complexity
- Space keyframes based on movement speed
- Use more keyframes for complex movements
- Fewer keyframes for simple motions

**Common mistakes**:

- Too many keyframes (creates jittery motion)
- Uneven spacing (causes speed variations)
- Extreme angle changes (jarring transitions)
- Insufficient testing (always preview!)

### Smooth Movement Tips

1. **Gentle Curves**: Avoid sharp direction changes
2. **Consistent Speed**: Use constant-speed playback
3. **Gradual Rotation**: Limit rotation between keyframes
4. **FOV Stability**: Change FOV slowly or not at all
5. **Test Frequently**: Preview after each change

---

## Advanced Path Techniques

### Multi-Segment Paths

Combine different interpolation methods:

1. Bezier for the opening curve
2. Catmull-Rom for smooth middle section
3. Cosine for eased ending

### Dynamic Camera Work

Create engaging cinematics:

- **Reveal Shots**: Start tight, pull back to reveal scene
- **Tracking Shots**: Follow moving subjects
- **Orbit Shots**: Rotate around point of interest
- **Dolly Zoom**: FOV changes while moving

### Path Modifiers

Fine-tune your paths:

- Adjust individual keyframe timing
- Modify interpolation per segment
- Add intermediate keyframes for detail
- Remove unnecessary keyframes to simplify

---

## Path Export and Sharing

### Export Formats

Export paths for:

- Backup and version control
- Sharing with other users
- External processing
- Integration with other tools

### Path Files

Paths are stored as:

- Structured data files
- Human-readable format (when possible)
- Preserves all keyframe data
- Includes interpolation settings

---

## Technical Details

### Mathematical Implementation

The path system uses:

- **Catmull-Rom**: Cardinal spline with tension parameter
- **Bezier**: Cubic Bezier curves with control points
- **Cosine**: Cosine-based easing functions
- **Step**: Linear or instant interpolation

### Performance Considerations

Path complexity affects performance:

- More keyframes = more calculations
- Complex interpolation (Bezier) is slower than simple (step)
- Constant-speed requires additional computation
- Editor rendering has overhead

**Optimization tips**:

- Use minimum necessary keyframes
- Disable overlays when not needed
- Close editor during playback
- Reduce render distance while editing

### Coordinate System

Aperture API uses Minecraft's coordinate system:

- **X**: East (+) / West (-)
- **Y**: Up (+) / Down (-)
- **Z**: South (+) / North (-)
- **Rotation**: Degrees (0-360)
- **Pitch**: Degrees (-90 to +90)

---

## Troubleshooting

### Path Not Smooth

**Causes**:
- Too many keyframes
- Inappropriate interpolation method
- Extreme spacing between keyframes

**Solutions**:
- Reduce keyframe count
- Try different interpolation (Catmull-Rom or Cosine)
- Enable constant-speed playback

### Camera Overshoots

**Causes**:
- Catmull-Rom spline behavior
- Keyframe placement

**Solutions**:
- Switch to Bezier or Cosine interpolation
- Adjust keyframe positions
- Add intermediate keyframes to constrain path

### Unexpected Camera Rotation

**Causes**:
- Large rotation changes between keyframes
- Gimbal lock issues

**Solutions**:
- Add intermediate keyframes with gradual rotation
- Adjust rotation angles
- Use roll compensation

### Performance Issues

**Causes**:
- Too many paths loaded
- Complex Bezier curves
- Heavy overlay rendering

**Solutions**:
- Delete unused paths
- Simplify curves
- Disable overlays
- Close other applications

---

## Related Documentation

- [Getting Started](getting-started.md) - Basic path creation
- [Commands](commands.md) - Path management commands
- [Developer API](developer-api.md) - Programmatic path control
- [Examples](examples.md) - Path creation examples
