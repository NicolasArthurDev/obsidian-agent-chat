# SPEC 0008 — Multimodal: images and Excalidraw to structured notes

- **Status:** Draft
- **Milestone:** M7
- **Date:** 2026-07-07

## Summary

Turn images and Excalidraw sketches into structured notes: a hand-drawn draft becomes a PRD,
a diagram becomes a spec, a whiteboard photo becomes an organized outline.

## Motivation

A high-signal, demo-friendly capability that is native to how Obsidian users work (Excalidraw
is heavily used) and serves as an acquisition hook (ADR 0005).

## Requirements

- Accept image input from: an attached image note, a pasted/dropped image, or an Excalidraw
  drawing in the vault.
- For Excalidraw, use the embedded/exported PNG as the vision input.
- Send the image to a vision-capable provider/model and produce a structured Markdown note
  from a chosen template (PRD, spec, outline, task list, or custom).
- Insert the result as a new note or into the current note, with a preview before writing
  (via the SPEC 0007 safety layer).
- Non-functional: only providers/models that support vision are offered; clear messaging when
  the active model cannot process images.

## Design

- `domain/provider`: extend `ChatRequest` to carry image parts; providers advertise vision
  capability.
- Provider adapters translate image parts to each API's multimodal format.
- `application`: an `ImageToNoteService` orchestrating capture → prompt → note creation.
- `infrastructure`: read Excalidraw files and extract the PNG; read vault image attachments.
- Presentation: a command and a drop target; template picker; result preview.

## Out of scope

Editing images, generating images, and OCR beyond what the vision model provides.

## Open questions

- Default templates to ship and how users define custom ones.
- Handling large images (downscaling) to fit model limits and control cost.
