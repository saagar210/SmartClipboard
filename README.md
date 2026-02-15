# SmartClipboard

A macOS clipboard history manager with smart categorization, full-text search, and sensitive data detection.

## Features

### Core Features (Phase 1 ✅ + Phase 2 ✅)

- ✅ **System-wide clipboard monitoring** — Captures text automatically in the background
- ✅ **Local SQLite storage** — All data stays on your Mac
- ✅ **Smart categorization** — Automatically detects URLs, emails, errors, commands, code, IPs, paths
- ✅ **Sensitive data protection** — Detects and auto-excludes credit cards, SSNs, phone numbers
- ✅ **Full-text search with filters** — Search by content + filter by category
- ✅ **Deduplication** — SHA256 hash-based, never stores the same content twice
- ✅ **Favorites** — Pin important items to the top
- ✅ **App exclusions** — Exclude password managers and other sensitive apps
- ✅ **Menu bar app** — Lives in your system tray, non-intrusive
- ✅ **Keyboard shortcuts** — `⌘⇧V` to toggle, `/` or `⌘F` to search
- ✅ **Retention policy** — Auto-cleanup of old items (default: 30 days)
- ✅ **Settings panel** — Configure retention, max items, privacy settings
- ✅ **Detail view** — Double-click or ⌘+click for full item view with stats

## Installation

```bash
# Install dependencies
npm install

# Run in development mode
npm run tauri dev

# Build for production
npm run tauri build
```

## Usage

1. Launch the app — It appears as a clipboard icon in your menu bar
2. Copy anything — The app automatically captures clipboard content
3. Open history — Click the menu bar icon or press `⌘⇧V`
4. Re-copy — Click any item or press Enter to copy it back to clipboard

### Keyboard Shortcuts

- `⌘⇧V` — Open/close clipboard history
- `/` or `⌘F` — Focus search bar
- `↑` / `↓` — Navigate items
- `Enter` — Copy selected item to clipboard
- `⌘+Click` or **Double-click** — View item details
- `Escape` — Close window

## Tech Stack

- **Backend:** Rust + Tauri 2
- **Frontend:** React 19 + TypeScript + Tailwind CSS 4
- **Database:** SQLite with FTS5
- **Clipboard:** arboard

## Security Checks

```bash
# Frontend supply-chain audit
npm run audit:npm

# Rust advisory audit (uses .cargo/audit.toml policy)
npm run audit:rust

# Run both
npm run audit
```

Note: `.cargo/audit.toml` contains reviewed temporary ignores for transitive,
cross-platform Tauri dependencies. Revisit this list when upgrading Tauri/wry.

## License

MIT
