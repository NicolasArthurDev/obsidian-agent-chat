# Project Governance

This document describes how the Agent Chat project is run.

## Roles

- **Maintainer** — has write access, reviews and merges pull requests, cuts releases, and
  sets the project's direction. The current maintainer is **Nicolas Arthur**
  (@NicolasArthurDev).
- **Contributor** — anyone who submits issues, pull requests, or documentation.

## Decision making

- Day-to-day changes are decided by the maintainer through the pull request review process.
- Significant or architectural changes are proposed as an
  [ADR](docs/adr/) or a [spec](docs/specs/) and discussed in an issue or pull request before
  implementation.
- The maintainer has the final say. As the community grows, additional maintainers may be
  invited based on sustained, high-quality contributions.

## Adding maintainers

A contributor may be invited to become a maintainer after a track record of quality
contributions and constructive participation. Invitations are extended by an existing
maintainer.

## Releases

Releases follow [Semantic Versioning](https://semver.org/). The release process is automated
via the GitHub Actions workflow triggered by version tags. See
[docs/development.md](docs/development.md).

## Changing this document

Changes to governance are made through a pull request and require maintainer approval.
