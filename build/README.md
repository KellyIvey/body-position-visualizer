# Build Icons

Place your app icon files here for packaging:

| File | Platform | Size |
|------|----------|------|
| `icon.ico` | Windows | 256×256 px (ICO format) |
| `icon.icns` | macOS | 512×512 px (ICNS format) |
| `icon.png` | Linux | 512×512 px (PNG format) |

**If no icons are provided**, `electron-builder` will use a default Electron icon.

## Generating icons

You can create all three formats from a single 1024×1024 PNG using:
```bash
# Install the tool
npm install -g electron-icon-builder

# Generate all formats from a source PNG
electron-icon-builder --input=./source-icon.png --output=./build
```
