# ADR 0001 — Clean Architecture with ports and adapters

- **Status:** Accepted
- **Date:** 2026-07-07

## Context

Agent Chat has several interchangeable external dependencies (four LLM providers, MCP
servers, on-disk storage) and must remain testable and maintainable as an open-source
project. We want provider swapping to be trivial and business logic to be verifiable without
Obsidian or the network.

## Decision

Adopt Clean Architecture with four layers — domain, application, infrastructure,
presentation — plus small `api/` and `shared/` folders. The domain defines entities and
**ports** (interfaces); infrastructure provides adapters implementing those ports.
Dependencies point inward; `main.ts` performs dependency injection.

## Consequences

- Domain and application layers are pure and unit-testable with fakes.
- Adding a provider means adding one adapter; no service changes.
- Slightly more indirection and boilerplate than a flat structure.
- Enforced by ESLint import boundaries and the file-size limit.
