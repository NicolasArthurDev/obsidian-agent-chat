# SPEC 0009 — Shareable agent flows

- **Status:** Draft
- **Milestone:** M8
- **Date:** 2026-07-07

## Summary

Named agents with their own system prompt and tool set, able to hand off to one another,
saved as reusable and shareable "flows."

## Motivation

Flows turn one-off prompting into reusable recipes and create a community content loop:
users share flows, which drives discovery and adoption (ADR 0005).

## Requirements

- Define an **agent**: name, description, system prompt, allowed tools (MCP/custom/built-in),
  provider/model override, and approval policy.
- Define a **flow**: an ordered or conditional composition of agents with hand-offs; the
  output of one step feeds the next.
- Run a flow from the chat or a command; show per-step progress and let the user intervene.
- **Import/export** flows as portable files (shareable via the vault or externally).
- Ship a few starter flows (e.g. research-and-summarize, sketch-to-spec, vault-tidy).
- Non-functional: a failing step surfaces clearly and does not corrupt the vault; every
  mutating step honors the SPEC 0007 safety layer.

## Design

- `domain/flow`: `AgentDefinition`, `FlowDefinition`, `FlowStep`.
- `application/FlowRunner`: executes steps, manages hand-offs and shared context.
- Reuses `ChatService`, `ProviderFactory`, and `ToolExecutionService`.
- `infrastructure`: flow serialization (import/export).
- Presentation: a flow library UI (list, run, import/export) and a simple editor.

## Out of scope

A visual node-graph editor and parallel multi-agent fan-out (possible later).

## Open questions

- File format for portable flows (JSON vs. Markdown-with-frontmatter).
- Whether flows can be triggered by vault events or only manually.
