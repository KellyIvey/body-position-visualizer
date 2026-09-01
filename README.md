# Body Position & Articulation Visualizer

> An interactive 3D web application for visualizing human body positions and joint articulations.
> Also available as a **standalone desktop app** for Windows, macOS, and Linux — no browser needed!

![Screenshot Placeholder](docs/screenshot.png)

## Features

- **Interactive 3D Human Figure** — Geometric primitive-based rigged figure with hierarchical joint transforms
- **Joint Articulation Controls** — Sliders for every major joint (head, spine, shoulders, elbows, wrists, hips, knees, ankles)
- **Preset Pose Library** — T-Pose, A-Pose, Standing Neutral, Sitting, Walking, Running, Squat, Arms Raised
- **Side-by-Side Comparison** — Toggle compare mode to view two poses simultaneously
- **Articulation Info Panel** — Live table of all joint angles
- **Export / Import** — Save pose as JSON, load from JSON file, screenshot as PNG

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 + TypeScript | UI framework (strict mode) |
| Vite | Build tool & dev server |
| Three.js + React Three Fiber | 3D rendering |
| @react-three/drei | R3F helpers (OrbitControls, Grid, etc.) |
| Zustand | State management |
| Tailwind CSS | Styling |
| **Electron** | **Desktop app wrapper** |
| Vitest + RTL | Unit testing |

## Setup (Web / Browser)

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Desktop App

### Run as desktop app (development)

```bash
npm install
npm run electron:dev
```

A native window will open — no browser required.

### Build an installer (distributable)

```bash
# Build for your current platform (auto-detects Windows / Mac / Linux)
npm run electron:build

# Or target a specific platform:
npm run electron:build:win    # Windows → release/Body Position Visualizer Setup.exe
npm run electron:build:mac    # macOS  → release/Body Position Visualizer.dmg
npm run electron:build:linux  # Linux  → release/Body Position Visualizer.AppImage
```

The installer/package will appear in the `release/` folder. Double-click it to install and run — **no Node.js or browser needed** on the end user's machine.

> **Note:** To add a custom icon, place `icon.ico` (Windows), `icon.icns` (macOS), and `icon.png` (Linux) in the `build/` folder. See `build/README.md` for details.

## Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_APP_TITLE` | Application title shown in browser | `Body Position & Articulation Visualizer` |
| `VITE_APP_VERSION` | App version string | `0.1.0` |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |

## Testing

```bash
npm run test
```

Tests are located in `tests/` and cover:
- Pose store (Zustand state)
- Pose presets utility
- Export/import utilities
- `usePose` hook

## Architecture

```
src/
├── components/
│   ├── viewer/     # 3D scene, human figure, comparison view
│   ├── controls/   # Joint sliders, pose library
│   ├── panels/     # Info display, export controls
│   └── layout/     # Header, sidebar
├── store/          # Zustand stores (pose, UI state)
├── hooks/          # usePose, useExport
├── utils/          # jointConfig, posePresets, exportUtils
└── types/          # TypeScript interfaces
```

## Usage

1. **Adjust Joints** — Use the Joints tab sliders to manipulate individual joint angles in real-time
2. **Apply Presets** — Click a pose in the Poses tab to instantly apply a predefined position
3. **Compare Poses** — Click "Compare" to open split view; use Pose A/B buttons to switch editing target
4. **Camera Controls** — Orbit (left-drag), zoom (scroll), pan (right-drag)
5. **Export** — Screenshot or save pose as JSON from the Export tab
6. **Import** — Load a previously exported JSON pose file
