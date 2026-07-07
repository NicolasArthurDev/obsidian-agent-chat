# CLAUDE.md

Guidance for Claude Code (and other AI agents) in this repository.

**Read [AGENTS.md](AGENTS.md) first** — it holds the full contributor guide. This file
highlights the rules most easily missed.

## Hard rules

- **No AI co-authorship trailers on commits.** Do not add `Co-Authored-By: Claude`, a
  `Claude-Session` trailer, or any assistant attribution. Commit as the human author only.
- **English only** in all code, comments, docs, and commit messages.
- **~200 lines per file maximum** (ESLint `max-lines`). Split by responsibility.
- **Clean Architecture** — `domain/` is pure; never import Obsidian or Node there.
  Dependencies point inward.
- **Conventional Commits.**
- **Spec-first** — add or update a spec in `docs/specs/` for non-trivial changes.

## Before you finish a change

- `npm run lint`, `npm test`, and `npm run build` must pass.
- Update the relevant spec/doc and `CHANGELOG.md` when behavior changes.

## Project shape

Desktop-only Obsidian chatbot plugin. See [docs/architecture.md](docs/architecture.md) for
the layer map and [docs/specs/](docs/specs/) for feature specs. Milestone plan is tracked in
the README roadmap.
