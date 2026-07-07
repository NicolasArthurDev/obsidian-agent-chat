# ADR 0002 — Desktop-only build and MCP transports

- **Status:** Accepted
- **Date:** 2026-07-07

## Context

The Model Context Protocol supports local servers over `stdio` (spawned child processes) and
remote servers over HTTP/SSE. Spawning processes and using Node APIs is only possible in the
Obsidian desktop app. Streaming LLM responses in the renderer is also easier without browser
CORS restrictions, which Node networking avoids.

## Decision

Ship as **desktop-only** (`isDesktopOnly: true`). Support both MCP transports: `stdio` via
`StdioClientTransport` and remote via `StreamableHTTPClientTransport` / `SSEClientTransport`
from `@modelcontextprotocol/sdk`. Use Node `https` for provider streaming and Obsidian
`requestUrl` for simple non-streaming calls.

## Consequences

- Full MCP capability, including local tool servers.
- No mobile support; this is an explicit non-goal for now.
- Networking code depends on Node builtins, which esbuild marks as external.
