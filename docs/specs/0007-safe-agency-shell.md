# SPEC 0007 — Safe agency and shell tools

- **Status:** Draft
- **Milestone:** M6
- **Date:** 2026-07-07

## Summary

Let the agent take real actions — edit notes and run shell commands — behind a safety layer
that keeps the user in control: plan, approve, dry-run, diff, and undo.

## Motivation

Autonomous file and shell actions are the highest-value and highest-risk capability. Making
them safe by default turns the risk into a trust differentiator (ADR 0005), which matters
especially to Obsidian's privacy-conscious community.

## Requirements

### Safety layer (applies to all mutating tools)

- **Approval policy:** ask before each action, ask once per session, or auto-approve within
  an allowlist. Default: ask.
- **Dry-run + diff:** preview changes (file diffs, command to be run) before execution.
- **Undo:** revert note changes; integrate with Obsidian file history where possible.
- **Scoping:** file operations restricted to the vault; no access outside it.

### Vault tools

- Read, create, update, append, and delete notes; move/rename; read metadata.

### Shell tool

- Execute a command via the OS-appropriate shell:
    - **Windows → PowerShell**
    - **Linux/macOS → bash** (the priority target)
- Detect the OS at runtime and select the shell accordingly; allow an override in settings.
- **Command allowlist** and per-command approval; block by default. Show the resolved command
  and working directory before running.
- Capture stdout/stderr and exit code; stream output back into the chat.
- Non-functional: never execute remote-fetched code; time out long-running commands.

## Design

- `domain/tool`: extend `Tool` with a `mutating` flag and an approval contract.
- `application/ToolExecutionService`: enforces the approval/dry-run/undo pipeline uniformly.
- `infrastructure/tools/ShellTool`: OS detection + `child_process` execution (desktop-only).
- `infrastructure/tools/VaultTools`: note operations via `app.vault`.
- Presentation: an approval prompt component and a settings panel for policy and allowlists.

## Out of scope

Full container sandboxing; interactive TTY programs.

## Open questions

- Granularity of the command allowlist (exact commands vs. prefixes vs. patterns).
- Whether to require a Git-backed vault to guarantee undo for shell side effects.
