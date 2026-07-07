# SPEC 0005 — Public API and interop

- **Status:** Draft
- **Milestone:** M5
- **Date:** 2026-07-07

## Summary

Expose a public API so other plugins can register tools, send messages, and observe events;
let the agent invoke Obsidian commands and read/write notes.

## Motivation

Interoperability makes Agent Chat a platform rather than a silo, and lets the ecosystem
extend it without forking.

## Requirements

- Expose `api` on the plugin instance, reachable via
  `app.plugins.plugins["agent-chat"].api`.
- Methods: `sendMessage`, `registerTool`, `unregisterTool`, `listProviders`, `on`.
- `registerTool` returns a disposer; registered tools merge with MCP tools in the loop.
- Built-in tools let the agent run Obsidian commands and read/write vault notes (guarded).
- Non-functional: the API is versioned; breaking changes are documented in the changelog.

## Design

- `api/AgentChatApi`: the public surface, backed by application services.
- `application/ToolExecutionService`: routes to MCP tools, custom tools, and built-in
  Obsidian tools.
- Events emitted through a small typed emitter in `shared/`.

## Out of scope

A stable `1.0.0` contract (this is a draft until the shape settles).

## Open questions

- Permission model for note-writing and command-execution tools.
- Whether to support multiple concurrent chat sessions via the API.
