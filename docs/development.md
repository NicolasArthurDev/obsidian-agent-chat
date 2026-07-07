# Development guide

## Prerequisites

- Node.js 20, 22, or 24
- Obsidian desktop (the plugin is desktop-only)
- A test vault you can safely modify

## Setup

```bash
git clone https://github.com/NicolasArthurDev/obsidian-agent-chat.git
cd obsidian-agent-chat
npm install
```

To develop against a real vault, symlink or clone the repo into
`<your-vault>/.obsidian/plugins/agent-chat/`, or copy the build outputs there.

## Common commands

| Command              | Purpose                                                  |
| -------------------- | -------------------------------------------------------- |
| `npm run dev`        | Build in watch mode (esbuild)                            |
| `npm run build`      | Type-check and produce a production `main.js`            |
| `npm run typecheck`  | Type-check `.ts` and `.svelte` via `svelte-check`        |
| `npm run lint`       | ESLint (includes Obsidian rules and the file-size limit) |
| `npm run format`     | Format with Prettier                                     |
| `npm test`           | Run unit tests with Vitest                               |
| `npm run test:watch` | Vitest in watch mode                                     |

## Testing

Unit tests target the **domain** and **application** layers, which are pure and do not
require Obsidian. A lightweight `obsidian` mock is provided for tests that touch adapters.
Prefer testing behavior through the application services against fake adapters.

## Releasing

1. Update `minAppVersion` in `manifest.json` if needed.
2. Run `npm version <patch|minor|major>` — this bumps `manifest.json`, `versions.json`, and
   `package.json`, and stages them.
3. Push the tag. The **Release Obsidian plugin** workflow builds and drafts a GitHub release
   with `main.js`, `manifest.json`, and `styles.css`.
4. Publish the drafted release.

## Conventions

- English only, everywhere.
- Conventional Commits, no AI co-authorship trailers.
- Keep files at or under ~200 lines and respect the architecture layering.
