---
sidebar_position: 1
hide_table_of_contents: false
custom_edit_url: null
---

<style>{`
  @media (min-width: 997px) {
    .theme-doc-sidebar-container {
      visibility: hidden !important;
    }
  }
`}</style>

# EmberForge Documentation

Welcome to the official documentation hub for **EmberForge** - innovative Minecraft mods and creative projects by TysonTheEmber.

## Featured Projects

Use the sidebar to navigate to documentation for each project:

- **Embers Text API** - Animated in-game overlays, banners, and cinematic messaging
- **Aperture API** - Forge cinematic camera tooling with in-game editing and path exports
- **Spelunkery+** - Compatibility expansion for mining progression and underground loot

## How to Read This Documentation

This section explains the formatting conventions and navigation features used throughout the documentation.

### Navigation

- **Left Sidebar** - Browse all documentation pages for the current section
- **Right Sidebar** - Jump to specific sections within the current page (Table of Contents)
- **Top Navigation Bar** - Switch between different mod documentation and return to the main site
- **Breadcrumbs** - Shows your current location in the documentation hierarchy

### Text Formatting

Throughout the documentation, different text styles convey different meanings:

- `Code text` - File names, class names, methods, variables, or short code snippets
  - Example: Edit the `config.json` file or call the `render()` method
- **Bold text** - Important warnings, UI elements, or project names
  - Example: Click the **Save** button or **Warning:** This action cannot be undone
- *Italic text* - Emphasis or first introduction of technical terms
  - Example: This is *not* recommended

### Code Blocks

Code examples appear in highlighted blocks with the programming language specified:

```java
// Java code example
public void exampleMethod() {
    System.out.println("Hello World");
}
```

```json
// JSON configuration example
{
  "setting": "value"
}
```

You can copy code blocks using the copy button in the top-right corner of each code block.

### Callouts and Admonitions

Important information is highlighted using special callout boxes:

> **Note:** Provides additional helpful information or context.

> **Warning:** Alerts you to potential issues or important considerations.

> **Tip:** Offers suggestions or best practices.

### Links

- Blue underlined text indicates clickable links
- Internal links navigate to other documentation pages
- External links open in a new tab (look for the ↗ icon)

### Tables

Information like version compatibility is presented in tables for easy scanning:

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data     | Data     | Data     |

### Lists

- **Bulleted lists** (like this one) show related items in no particular order
- **Numbered lists** show sequential steps or ordered information

### Screenshots and Images

Images include captions and descriptions to provide context. Click on images to view them at full size.

### Search

Use the search bar (if available) in the top navigation to quickly find specific topics across all documentation.

---

## Documentation Standards

This section outlines the rules and conventions for writing EmberForge documentation.

### General Writing Rules

1. **Clarity First** - Write for users who may be unfamiliar with the project. Explain concepts clearly without assuming prior knowledge.

2. **Active Voice** - Use active voice instead of passive. Write "Click the button" not "The button should be clicked."

3. **Present Tense** - Describe features in present tense. Write "The API renders text" not "The API will render text."

4. **Consistent Terminology** - Use the same terms throughout. Don't alternate between "player," "user," and "person."

5. **Version Specificity** - Always specify which mod versions and Minecraft versions the documentation applies to.

### Document Structure

Each major feature or mod should follow this structure:

```markdown
# Feature/Mod Name

Brief description (1-2 sentences)

## Overview

What it does and why it exists

## Installation

Step-by-step installation instructions

## Getting Started

Basic usage guide with examples

## Features

Detailed feature documentation

## Configuration

Configuration options and examples

## Troubleshooting

Common issues and solutions

## API Reference (if applicable)

Technical details for developers
```

### Code Block Conventions

#### Java Code

Always specify the language for syntax highlighting:

```java
// Good example
public class ExampleMod {
    public static void initialize() {
        System.out.println("Mod initialized!");
    }
}
```

#### JSON Configuration

Include comments explaining each field:

```json
{
  "enabled": true,          // Enable or disable the feature
  "renderDistance": 64,     // Maximum render distance in blocks
  "defaultColor": "#FFFFFF" // Default text color in hex format
}
```

#### Command Examples

Use shell/bash for command line examples:

```bash
# Installing dependencies
./gradlew build

# Running the development environment
./gradlew runClient
```

### Formatting Guidelines

#### Inline Code

Use backticks for:
- File names: `config.json`
- Class names: `TextRenderer`
- Method names: `initialize()`
- Variable names: `renderDistance`
- Short code snippets: `player.setPosition(x, y, z)`

#### Bold Text

Use bold for:
- **UI elements**: Click the **Settings** button
- **Important warnings**: **Warning:** This will reset all configurations
- **Project names**: **Embers Text API**

#### Italic Text

Use italics sparingly for:
- *Emphasis*: This is *not* recommended
- *First introduction* of technical terms

#### Lists

**Ordered lists** for sequential steps:

1. Download the mod file
2. Place it in the `mods` folder
3. Restart Minecraft

**Unordered lists** for non-sequential items:

- Supports Minecraft 1.20.1
- Compatible with Forge
- Requires Java 17 or higher

### Version Compatibility

Always include version information in a consistent format:

```markdown
## Compatibility

| Mod Version | Minecraft Version | Forge Version | Status         |
|-------------|-------------------|---------------|----------------|
| 2.0.x       | 1.20.1            | 47.0.0+       | ✅ Stable      |
| 1.5.x       | 1.19.2            | 43.0.0+       | ⚠️ Legacy      |
| 1.0.x       | 1.18.2            | 40.0.0+       | ❌ Unsupported |
```

### Links and References

#### External Links

Use descriptive link text:

```markdown
<!-- Good -->
Download from [Modrinth](https://modrinth.com/mod/example)

<!-- Bad -->
Click [here](https://modrinth.com/mod/example) to download
```

#### Internal Links

Link to other documentation pages:

```markdown
See the [Configuration Guide](./configuration.md) for more details.
```

### Screenshots and Media

When including images:

1. **Use descriptive alt text**: `![The main configuration screen showing render settings](./images/config-screen.png)`

2. **Keep file sizes reasonable**: Optimize images before uploading (prefer PNG for UI, JPG for screenshots)

3. **Store in organized folders**: Place images in an `images/` or `assets/` subfolder

4. **Add captions when needed**:

```markdown
![Configuration interface](./images/config.png)
*Figure 1: The main configuration interface with default settings*
```

### Troubleshooting Section Format

Structure troubleshooting entries consistently:

```markdown
### Issue: Mod crashes on startup

**Symptoms:**
- Game crashes when loading
- Error message mentions `NullPointerException`

**Cause:**
Missing or incompatible dependency mod

**Solution:**
1. Check the mod requirements
2. Install all required dependencies
3. Ensure version compatibility
```

### Changelog Format

Use this structure for version history:

```markdown
## Version 2.0.0 (2024-01-15)

### Added
- New feature descriptions
- New configuration options

### Changed
- Modified behaviors
- Updated dependencies

### Fixed
- Bug fixes
- Performance improvements

### Removed
- Deprecated features
- Obsolete configurations
```

### Admonitions and Callouts

Use clear formatting for warnings and notes:

```markdown
> **Note:** This feature requires server-side installation.

> **Warning:** Changing this value may cause performance issues.

> **Tip:** Use the command `/reload` to apply config changes without restarting.
```

## Contributing to Documentation

Found an error or want to improve the docs?

1. Visit the [GitHub repository](https://github.com/TysonTheEmber)
2. Navigate to the `docs/` folder
3. Submit a pull request with your changes
4. Follow the documentation standards outlined above

## Quick Links

- **GitHub**: [TysonTheEmber](https://github.com/TysonTheEmber)
- **Modrinth**: [View all mods](https://modrinth.com/user/TysonTheEmber)
- **CurseForge**: [View all projects](https://www.curseforge.com/members/tysontheember/projects)

## Getting Help

If you need assistance:

1. **Check the docs** - Use the sidebar to find relevant documentation
2. **Search existing issues** - Someone may have already solved your problem, check the discord and existing issues
3. **Open an issue** - Create a new issue on the GitHub repository
