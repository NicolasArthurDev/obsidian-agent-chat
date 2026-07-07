# Security Policy

## Supported versions

Agent Chat is in early development. Security fixes are applied to the latest released
version only until a stable `1.0.0` is published.

## Reporting a vulnerability

Please **do not** open a public issue for security vulnerabilities.

Instead, report privately via one of:

- GitHub's [private vulnerability reporting](https://github.com/NicolasArthurDev/obsidian-agent-chat/security/advisories/new)
- Email: **nicolasarthur1806@gmail.com**

Include a description, reproduction steps, and the impact you observed. We aim to acknowledge
reports within 7 days and to provide a remediation timeline after triage.

## Data handling notes

Users should be aware of the following by design:

- **API keys** for LLM providers are stored in plain text in the plugin's `data.json` file
  inside the vault. Anyone with filesystem access to the vault can read them. This mirrors
  how Obsidian stores plugin settings.
- **MCP `stdio` servers** run local commands you configure. Only add servers and commands
  you trust — they execute with your user privileges.
- **Chat sessions and memory** are stored unencrypted under
  `.obsidian/plugins/agent-chat/`.
- **Outbound requests** are sent to the provider and MCP endpoints you configure. No
  telemetry is collected by the plugin.
