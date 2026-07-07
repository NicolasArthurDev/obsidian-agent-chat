# Architecture

Agent Chat follows a **Clean Architecture** with clear layer boundaries. Dependencies point
**inward**: outer layers depend on inner layers, never the reverse. The domain layer knows
nothing about Obsidian, Node, or any provider SDK.

## Layers

```
presentation  ─┐        Svelte components, ItemView, settings tab
                │  depends on
application   ─┤        use cases / services orchestrating the domain
                │  depends on
domain        ─┘        entities + ports (interfaces); pure TypeScript
    ▲
    │ implemented by
infrastructure          adapters: provider clients, MCP client, storage
```

- **domain/** — Entities (`Message`, `Conversation`) and **ports** (interfaces such as
  `LlmProvider`, `McpClient`, `MemoryStore`, `Tool`). No I/O, no framework imports.
- **application/** — Services (`ChatService`, `McpManager`, `MemoryService`,
  `SessionService`, `ToolExecutionService`) that implement use cases by depending only on
  domain ports.
- **infrastructure/** — Adapters that implement the ports using real technology: the four
  provider clients, the MCP SDK adapter, and vault-backed storage.
- **presentation/** — The Svelte chat UI, the Obsidian `ItemView` that hosts it, and the
  settings tab.
- **api/** — The public API surface exposed to other plugins.
- **shared/** — Small cross-cutting helpers (result types, logging, id generation).

## Directory map

```
src/
  main.ts                 Plugin entry: wiring only
  domain/                 Entities and ports
  application/            Use-case services
  infrastructure/         Adapters (providers, MCP, storage, HTTP)
  presentation/           ChatView, Svelte components, settings
  api/                    Public plugin API
  shared/                 Cross-cutting utilities
```

## Key design rules

- **File size:** files stay at or below ~200 lines (ESLint `max-lines`). Split by
  responsibility, not by arbitrary cuts.
- **Dependency injection:** `main.ts` composes the object graph and injects adapters into
  services. Services never `new` their own adapters.
- **Provider swapping:** `ProviderFactory` returns an `LlmProvider` from settings. Changing
  provider re-instantiates one object; nothing else changes.
- **Streaming:** providers expose `chat()` returning an `AsyncIterable` of chunks. Streaming
  uses Node `https` (desktop-only) to avoid browser CORS; simple calls may use Obsidian's
  `requestUrl`.
- **Tool loop:** `ChatService` drives the provider → tool-call → tool-result → provider loop
  until the model returns a final answer. `ToolExecutionService` routes each call to an MCP
  tool, a custom-registered tool, or an Obsidian command.

See the [Architecture Decision Records](adr/) for the rationale behind these choices and the
[specifications](specs/) for feature-level detail.
