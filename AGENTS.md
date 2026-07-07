# Agent guide — Agent Chat

Guidance for AI coding agents and human contributors working in this repository. Read this
alongside [docs/architecture.md](docs/architecture.md) and [CONTRIBUTING.md](CONTRIBUTING.md).

## What this project is

Agent Chat is a **desktop-only** Obsidian plugin that adds a chatbot with swappable LLM
providers (Ollama, Gemini, OpenAI, Anthropic), MCP server connections, local memory, and a
public API for other plugins. Entry point `src/main.ts` compiles to `main.js`.

## Non-negotiable rules

- **English only** — code, comments, docs, commits, issues, and PRs.
- **File size** — keep files at or under ~200 lines (enforced by ESLint `max-lines`). Split
  by responsibility.
- **Clean Architecture + OOP** — respect the layer boundaries (domain → application →
  infrastructure → presentation). Dependencies point inward. Never import Obsidian or Node
  from `domain/`.
- **Conventional Commits** — `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`.
- **No AI co-authorship trailers** — do not add `Co-Authored-By` or session/assistant
  trailers to commits. This is a hard requirement.
- **Spec-first** — non-trivial features get a spec in [docs/specs/](docs/specs/) before
  implementation, and specs are updated in the same PR that changes behavior.

## Architecture at a glance

```
src/
  main.ts            Plugin lifecycle + dependency injection only
  domain/            Entities + ports (interfaces); pure TypeScript
  application/       Use-case services (ChatService, McpManager, ...)
  infrastructure/    Adapters: providers, MCP, storage, HTTP
  presentation/      ChatView (ItemView) + Svelte components + settings
  api/               Public plugin API
  shared/            Cross-cutting helpers
```

- Adapters implement domain ports; `main.ts` wires them into services.
- Provider switching = re-instantiate one `LlmProvider` via `ProviderFactory`.
- Streaming uses Node `https`; simple calls may use Obsidian `requestUrl`.

## Toolchain

| Command             | Purpose                                   |
| ------------------- | ----------------------------------------- |
| `npm run dev`       | esbuild watch build                       |
| `npm run build`     | typecheck + production build              |
| `npm run typecheck` | Type-check via `svelte-check`             |
| `npm run lint`      | ESLint (Obsidian rules + file-size limit) |
| `npm run format`    | Prettier                                  |
| `npm test`          | Vitest                                    |

UI is Svelte compiled via `esbuild-svelte`. Tests use Vitest with an `obsidian` mock; focus
tests on the pure domain and application layers.

## Obsidian specifics

- Register everything that needs cleanup with `this.register*` so unload is clean.
- Persist settings via `loadData()` / `saveData()`. Never change the plugin `id`
  (`agent-chat`) after release.
- Storage lives under `this.manifest.dir` (`memory/` and `sessions/`), accessed through
  `app.vault.adapter`. Do not write outside the vault.
- Desktop-only: Node/Electron APIs are allowed; `isDesktopOnly` is `true`.

## Security and privacy

- API keys are stored in `data.json` (plain text, Obsidian norm) — document, don't hide.
- MCP `stdio` servers run local commands; treat configs as trusted-only and warn users.
- No telemetry. Only contact provider/MCP endpoints the user configures.

## References

- [Architecture](docs/architecture.md) · [ADRs](docs/adr/) · [Specs](docs/specs/)
- Obsidian API: https://docs.obsidian.md
- Developer policies: https://docs.obsidian.md/Developer+policies
- MCP: https://modelcontextprotocol.io
