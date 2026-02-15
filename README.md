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

## Build

```bash
npm run tauri build
```

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
