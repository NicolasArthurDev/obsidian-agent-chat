# ADR 0005 — Product positioning: an MCP-native agent workspace

- **Status:** Accepted
- **Date:** 2026-07-07

## Context

The Obsidian AI space is crowded with "chat with your notes" and RAG plugins. Competing
there means arriving late with no differentiation. We need a defensible position and features
that drive adoption rather than commodity chat.

## Decision

Position Agent Chat as **the MCP-native agent workspace for Obsidian**, not another chatbot.
Basic chat and note context are table stakes; the product's value rests on four pillars:

1. **Bidirectional MCP** — be an excellent MCP _client_ (so web/Playwright, GitHub, shell,
   and other capabilities arrive as connectable servers, not bespoke code) and also expose
   the _vault as an MCP server_ so external agents (Claude Desktop, Codex, Cursor, Claude
   Code) can read and write it. See SPEC 0003 and SPEC 0006.
2. **Safe agency over the vault** — plan → approve → dry-run → diff → undo, an allowlist, and
   local-first operation with Ollama. Turn the risk of autonomous file and shell actions into
   a trust differentiator. See SPEC 0007.
3. **Native multimodal moments** — turn Excalidraw sketches and images into structured notes.
   A high-signal, demo-friendly acquisition hook. See SPEC 0008.
4. **Shareable agent flows** — named agents with their own prompt and tools, hand-offs, and
   saved, shareable recipes that create a community content loop. See SPEC 0009.

MCP is the backbone: the `ToolRegistry` merges MCP tools, custom tools, and built-in tools,
and the same abstraction powers all four pillars.

## Consequences

- Capability grows with the MCP ecosystem instead of our integration backlog.
- Higher bar for safety UX (approvals, sandboxing, undo) — treated as a feature, not overhead.
- Roadmap after M4 leads with these pillars rather than a generic public API.
- Privacy/local-first (Ollama) is a first-class marketing and trust position.
