# ADR 0003 — Svelte for the chat UI

- **Status:** Accepted
- **Date:** 2026-07-07

## Context

The chat panel is the most UI-heavy part of the plugin: a streaming message list, an input
box, and connection-management screens. Plain DOM manipulation would produce long, imperative
files that conflict with the ~200-line limit. The UI layer must also stay decoupled from
business logic.

## Decision

Use **Svelte** for presentation components, compiled through `esbuild-svelte`. Business logic
stays in plain TypeScript classes in the application and domain layers; components are thin
and call into services. Svelte's small runtime keeps the bundle lean and is idiomatic in the
Obsidian ecosystem.

## Consequences

- Reactive, compact components; easier to keep files small.
- Adds `svelte`, `esbuild-svelte`, and `svelte-check` to the toolchain.
- Presentation logic must not leak into components beyond view concerns.
