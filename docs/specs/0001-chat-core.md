# SPEC 0001 — Chat core

- **Status:** Accepted
- **Milestone:** M1
- **Date:** 2026-07-07

## Summary

The core chat experience: a dedicated view where the user exchanges messages with an LLM,
with a system prompt and streaming responses.

## Motivation

This is the plugin's primary surface. Everything else (providers, MCP, memory) plugs into
the chat loop.

## Requirements

- A `ChatView` (`ItemView`) opened via a ribbon icon and a command, mountable in the sidebar.
- Conversation model: an ordered list of `Message` entities with roles
  (`system` | `user` | `assistant` | `tool`).
- The configured `system_prompt` is prepended to each request.
- `ChatService.send()` sends the conversation to the active `LlmProvider` and streams the
  assistant reply into the UI as it arrives.
- Errors (network, auth) are surfaced clearly without crashing the view.
- Non-functional: the view remains responsive during streaming; no blocking calls on the UI
  thread.

## Design

- `domain/chat`: `Message`, `Conversation`, `Role`.
- `domain/provider`: `LlmProvider` port with `chat(request): AsyncIterable<ChatChunk>`.
- `application/ChatService`: orchestrates send → stream → append, and later the tool loop.
- `presentation`: `ChatView` mounts a Svelte `ChatPanel` (`MessageList`, `MessageInput`).

## Out of scope

Tool calling (SPEC 0003), persistence (SPEC 0004), provider specifics (SPEC 0002).

## Open questions

- Markdown rendering strategy for assistant messages (Obsidian `MarkdownRenderer` vs. custom).
