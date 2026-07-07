# Public API

> **Status:** planned for milestone M5. This document describes the intended surface; it is
> subject to change until `1.0.0`.

Other plugins can integrate with Agent Chat through an API object exposed on the plugin
instance:

```ts
const agentChat = app.plugins.plugins['agent-chat']?.api;
if (agentChat) {
	// ...
}
```

## Intended methods

| Method                        | Description                                                                 |
| ----------------------------- | --------------------------------------------------------------------------- |
| `sendMessage(text, options?)` | Send a message to the agent and receive the response (streamed or awaited). |
| `registerTool(tool)`          | Register a custom tool the agent can call. Returns a disposer.              |
| `unregisterTool(name)`        | Remove a previously registered tool.                                        |
| `listProviders()`             | List the available and currently active providers.                          |
| `on(event, handler)`          | Subscribe to events (e.g. message sent, tool called).                       |

## Custom tools

A custom tool describes a callable capability:

```ts
interface AgentTool {
	name: string;
	description: string;
	inputSchema: object; // JSON Schema
	run(input: unknown): Promise<unknown>;
}
```

Registered tools are merged with tools discovered from MCP servers and offered to the model
during the tool-calling loop.

## Stability

Until `1.0.0`, the API may change between minor versions. Breaking changes will be noted in
the [CHANGELOG](../CHANGELOG.md).
