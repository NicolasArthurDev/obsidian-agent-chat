# SPEC 0002 — Providers

- **Status:** Accepted
- **Milestone:** M2
- **Date:** 2026-07-07

## Summary

Swappable LLM providers behind a single port: Ollama, Google Gemini, OpenAI, and Anthropic.

## Motivation

Users have different accounts, budgets, and privacy needs. Switching providers should be a
settings change, not a code change.

## Requirements

- One `LlmProvider` port implemented by four adapters.
- Each adapter handles its own auth, request shape, streaming format, and tool-call schema.
- Per-provider settings: API key, base URL (where applicable), and model.
- `ProviderFactory` builds the active provider from settings; switching re-instantiates only
  that object.
- Streaming via Node `https` (SSE); non-streaming fallback via Obsidian `requestUrl`.
- Errors map to a common error type with a user-readable message.
- Non-functional: no provider SDKs bundled; thin custom clients only.

## Design

- `infrastructure/providers`: `OllamaProvider`, `GeminiProvider`, `OpenAiProvider`,
  `AnthropicProvider`, plus `ProviderFactory`.
- `infrastructure/http`: `StreamingHttpClient` (Node `https` SSE) and `RequestUrlClient`.
- Provider-specific request/response translation stays inside each adapter.

## Out of scope

Prompt caching, cost tracking, and image/audio inputs (future specs).

## Open questions

- Default models per provider and how to surface model discovery.
- Confirm current Anthropic model IDs at implementation time.
