import { rmSync } from "node:fs";

const directories = [
  "node_modules",
  "dist",
  ".codex_audit",
  "src-tauri/target",
  "src-tauri/gen",
];

const files = [
  ".DS_Store",
  "src-tauri/.DS_Store",
  "CODE_AUDIT_REPORT.md",
  "COMPREHENSIVE_AUDIT_REPORT.md",
];

for (const path of directories) {
  rmSync(path, { recursive: true, force: true });
}

for (const path of files) {
  rmSync(path, { force: true });
}

console.log("Cleanup complete.");
