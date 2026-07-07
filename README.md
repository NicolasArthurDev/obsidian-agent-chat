# Agent Chat for Obsidian

> A chatbot for your vault with swappable LLM providers, MCP server connections, and local memory.

Agent Chat adds a conversational AI panel to Obsidian. Talk to a model, let it call
tools exposed by [MCP](https://modelcontextprotocol.io) servers, keep durable memory,
and persist every conversation — all inside your vault, on your machine.

**Vision:** not another "chat with your notes" plugin, but the **MCP-native agent workspace
for Obsidian**. Four pillars set it apart (see [ADR 0005](docs/adr/0005-product-positioning.md)):
bidirectional MCP (be an MCP client _and_ expose the vault as an MCP server for Claude
Desktop, Codex, and Cursor), safe agency over the vault (plan → approve → diff → undo, plus
an OS-aware shell), native multimodal moments (Excalidraw and images to structured notes), and
shareable agent flows.

> **Status:** early development. See the [roadmap](#roadmap) and [CHANGELOG](CHANGELOG.md).
> **Desktop only:** this plugin requires the Obsidian desktop app (it spawns local MCP
> processes and uses Node APIs). It does not run on mobile.

## Features

- **Chat panel** — a dedicated view for talking to an LLM about your notes.
- **Swappable providers** — switch between **Ollama**, **Google Gemini**, **OpenAI**,
  and **Anthropic** without changing anything else.
- **MCP connections** — add, edit, configure, and remove Model Context Protocol servers
  (local `stdio` commands or remote HTTP/SSE endpoints). Their tools become available to
  the agent.
- **Local memory & sessions** — durable memory and full chat history stored on disk under
  `.obsidian/plugins/agent-chat/`.
- **Interoperable** — exposes a public API so other plugins can register custom tools and
  send messages; the agent can trigger Obsidian commands and read/write notes.

## Installation

Until the plugin is in the community catalog, install it manually:

1. Download `main.js`, `manifest.json`, and `styles.css` from the latest
   [release](https://github.com/NicolasArthurDev/obsidian-agent-chat/releases).
2. Copy them into `<your-vault>/.obsidian/plugins/agent-chat/`.
3. Reload Obsidian and enable **Agent Chat** in **Settings → Community plugins**.

For local development, see [docs/development.md](docs/development.md).

## Configuration

Open **Settings → Agent Chat** to configure:

- **System prompt** — the base instruction for the agent.
- **Provider** — pick the active provider and set its API key, base URL, and model.
- **MCP servers** — add and manage connections.
- **Memory** — enable durable memory and set limits.

> **Security note:** API keys are stored in plain text in the plugin's `data.json`, which
> is the Obsidian norm. See [SECURITY.md](SECURITY.md).

## Documentation

- [Architecture](docs/architecture.md)
- [Public API](docs/api.md)
- [Development guide](docs/development.md)
- [Architecture Decision Records](docs/adr/)
- [Feature specifications](docs/specs/)

## Roadmap

| Milestone | Scope                                                         |
| --------- | ------------------------------------------------------------- |
| M0        | Repository foundation, governance, tooling                    |
| M1        | Core architecture, chat view skeleton, settings               |
| M2        | Four providers with streaming                                 |
| M3        | MCP connections and tool calling (the core)                   |
| M4        | Memory and session persistence                                |
| M5        | Public API + vault as an MCP server                           |
| M6        | Safe agency: vault + OS-aware shell tools (approve/diff/undo) |
| M7        | Multimodal: Excalidraw and images to structured notes         |
| M8        | Shareable agent flows                                         |
| M9        | Polish, docs, first release                                   |

## Support

If Agent Chat is useful to you, consider sponsoring its development. Sponsorship funds
maintenance, new providers, and the roadmap features.

- [❤️ Sponsor on GitHub](https://github.com/sponsors/NicolasArthurDev)

Every contribution helps and is genuinely appreciated.

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md),
[GOVERNANCE.md](GOVERNANCE.md), and our [Code of Conduct](CODE_OF_CONDUCT.md).

## License

[MIT](LICENSE) © Nicolas Arthur
