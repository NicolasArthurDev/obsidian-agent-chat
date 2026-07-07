# ADR 0004 — Storage location for memory and sessions

- **Status:** Accepted
- **Date:** 2026-07-07

## Context

The agent needs durable memory and persisted chat sessions. Options were storing them as
user-visible vault notes or inside the plugin's own directory. We want reliable, structured
storage that does not clutter the user's note graph.

## Decision

Store both under the plugin directory, using `this.manifest.dir`:

- `.obsidian/plugins/agent-chat/memory/` — durable agent memory entries.
- `.obsidian/plugins/agent-chat/sessions/` — one file per conversation.

Access is through `app.vault.adapter`, creating directories lazily.

## Consequences

- Data stays out of the user's visible notes and search index.
- Files are portable with the vault and easy to back up or delete.
- Not directly editable as notes by other plugins; interop happens through the public API
  instead. A future export-to-note feature can be added if requested.
