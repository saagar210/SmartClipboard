# SmartClipboard

SmartClipboard is a macOS menu bar clipboard manager built with Tauri + React.
It captures text and images, stores history locally, supports fast search, and
adds privacy-aware filtering for sensitive content.

Current app version: `0.1.0`

## Highlights

- System-wide clipboard monitoring (text + image)
- Local SQLite storage with FTS5 search
- Smart categorization: URL, email, error, code, command, IP, path, misc
- Sensitive-content detection with auto-exclusion controls
- SHA256-based deduplication
- Favorites, app-level exclusions, retention cleanup, max-item limit
- Menu bar UX with global shortcut (`CmdOrCtrl+Shift+V`)
- Item detail view with image preview and syntax-highlighted code blocks

## Security and Reliability

- Tauri CSP is explicitly configured (not `null`) in:
  - `src-tauri/tauri.conf.json`
- Filesystem image reads are path-bounded and DB-authorized.
- Clipboard image persistence uses validated PNG encoding.
- Regression tests cover backend image/DB behavior and frontend list navigation.
- CI runs frontend build/test/audit plus Rust audit/build/test.

## Requirements

- macOS 13+
- Node.js 20+
- Rust stable toolchain

## Quick Start

```bash
npm install
npm run tauri dev
```

## Lean Dev Mode (Low Disk)

```bash
npm run dev:lean
```

This still runs the normal Tauri development flow (`npm run tauri dev`) but uses
ephemeral cache/build locations for:

- Rust target output (`CARGO_TARGET_DIR`)
- Vite dev cache (`VITE_CACHE_DIR`)

When the process exits, temporary lean-mode artifacts are removed automatically.

Tradeoff:

- Lower persistent disk usage between runs
- Slower startup/compile on each fresh lean run vs reusing `src-tauri/target`

## Build

```bash
npm run tauri build
```

## Maintenance

```bash
# Remove only heavy build artifacts (keeps dependencies)
npm run clean:heavy

# Remove all reproducible local caches/artifacts (includes node_modules)
npm run clean:full
```

After running `npm run clean:full`, reinstall dependencies before development:

```bash
npm install
```

## Common Commands

| Command | Purpose |
| --- | --- |
| `npm install` | Install frontend dependencies |
| `npm run tauri dev` | Run the app in development mode |
| `npm run dev:lean` | Run development mode with ephemeral build caches |
| `npm run tauri build` | Build a production app bundle |
| `npm run test -- --run` | Run frontend tests once |
| `npm run build` | Build frontend production assets |
| `npm run audit` | Run npm + Rust dependency audits |
| `npm run clean:heavy` | Remove heavy build artifacts only |
| `npm run clean:full` | Remove all reproducible local caches/artifacts |
| `npm run clean` | Alias for `npm run clean:full` |

## Quality Gates

```bash
# Frontend tests
npm run test -- --run

# Frontend production build
npm run build

# Full dependency audits
npm run audit

# Rust checks
cargo test --manifest-path src-tauri/Cargo.toml
cargo build --manifest-path src-tauri/Cargo.toml
```

## Keyboard Shortcuts

- `CmdOrCtrl+Shift+V` toggle window
- `/` or `Cmd+F` focus search
- `↑` / `↓` navigate list
- `Enter` copy selected item
- `Cmd+Click` or double-click open detail view
- `Escape` hide window

## Project Structure

- `src/` React UI and IPC client
- `src-tauri/src/` Rust backend, clipboard monitor, handlers, DB layer
- `src-tauri/migrations/` SQLite schema migrations
- `.github/workflows/ci.yml` CI quality gates
- `.cargo/audit.toml` Rust advisory policy configuration

## Notes on Rust Audit Policy

`cargo audit` is enforced via `npm run audit:rust` and CI.
The reviewed ignore list in `.cargo/audit.toml` is for transitive, mostly
cross-platform dependencies from Tauri/wry and should be re-evaluated on every
Tauri or wry upgrade.

## License

MIT
