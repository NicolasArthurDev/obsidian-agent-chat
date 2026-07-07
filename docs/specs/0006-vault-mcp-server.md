# SPEC 0006 — Vault as an MCP server

- **Status:** Draft
- **Milestone:** M5
- **Date:** 2026-07-07

## Summary

Expose the current vault as a Model Context Protocol **server** so external agents — Claude
Desktop, Codex, Cursor, Claude Code, and any MCP client — can read and write notes through a
standard interface.

## Motivation

Being an MCP client makes Agent Chat powerful inside Obsidian. Being an MCP _server_ makes the
vault a first-class participant in every other agent's workflow, driving adoption beyond the
Obsidian community. This bidirectional stance is our core differentiator (ADR 0005).

## Requirements

- Run a local MCP server (stdio and/or HTTP) that advertises vault tools and resources:
  list/read/search notes, create/update/append/delete notes, and read metadata.
- All write operations go through the same safety layer as internal tools (SPEC 0007):
  scoping, approval policy, and undo.
- The server is opt-in and clearly indicates when it is running and what is exposed.
- Configurable exposure: whole vault, an allowlist of folders, or read-only mode.
- Non-functional: no access outside the vault; the server binds locally by default.

## Design

- `infrastructure/mcp/VaultMcpServer`: wraps the `@modelcontextprotocol/sdk` server with a
  transport, backed by `app.vault` operations.
- Reuses the vault built-in tools and safety layer from SPEC 0007.
- Presentation: a settings panel to start/stop, choose transport, and set exposure scope.

## Out of scope

Authentication for remote exposure and multi-vault serving (future).

## Open questions

- Default transport for interop with Claude Desktop (stdio via a launcher vs. local HTTP).
- How to surface connection details/credentials to paste into external clients.
