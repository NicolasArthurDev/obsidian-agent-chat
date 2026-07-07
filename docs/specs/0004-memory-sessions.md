# SPEC 0004 — Memory and sessions

- **Status:** Accepted
- **Milestone:** M4
- **Date:** 2026-07-07

## Summary

Persist chat sessions and maintain durable agent memory on disk under the plugin directory.

## Motivation

Users expect conversations to survive reloads, and the agent benefits from durable context
across sessions.

## Requirements

- Sessions: one file per conversation in `.obsidian/plugins/agent-chat/sessions/`.
  List, open, save (autosave on change), rename, and delete.
- Memory: durable entries in `.obsidian/plugins/agent-chat/memory/`. Add, list, and remove.
- Memory can be toggled on/off and has a size/entry limit.
- When enabled, relevant memory is injected into the system context for each request.
- Directories are created lazily via `app.vault.adapter`.
- Non-functional: writes are atomic enough to avoid corrupting files on crash; data is
  unencrypted (documented in SECURITY.md).

## Design

- `domain/memory`: `MemoryEntry`, `MemoryStore` port.
- `infrastructure/storage`: `VaultSessionStore`, `VaultMemoryStore` using `app.vault.adapter`
  and `manifest.dir`.
- `application`: `SessionService`, `MemoryService`.
- `presentation`: session list UI; memory settings panel.

## Out of scope

Semantic/vector memory and retrieval ranking (future); cross-device sync.

## Open questions

- File format: JSON vs. Markdown-with-frontmatter for sessions.
- Memory injection strategy: full dump vs. summarized vs. recency-limited.
