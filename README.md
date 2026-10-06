# Shred

A guitar practice tracker and a real-software test project for Sporklift.

## Current state

This is a Vite, React, and TypeScript starter. It shows a landing page.
Practice entry, saved sessions, and progress tracking are not implemented.
The earlier Reagent prototype remains in Git history at `9d4cd39`.

## Reference UI prototype

The approved UI reference is **Inline reference (A), alphaTab round 6**, accepted
on October 6, 2026. It includes Daily practice, goal authoring and collapsible
goal groups in the Exercise library, one Instructions field per Exercise, and
Guitar Pro upload, track preview and replacement through alphaTab. Open its
[guide](prototypes/daily-practice/alphatab-explore/README.md) for the local preview,
accepted behavior and known limits. Future prototype work should extend this
reference. The production starter does not yet implement these workflows.

The new reference is committed on `codex/ui-explore-alphatab`, based on
`d8e38c7`. Its guide links the archived A/B/C comparison and feedback rounds.
The previous Variant B round 8 reference remains at `d8e38c7`; the earlier full
UI exploration remains at `32ca256`.

## Run locally

Use Node.js 20.19 or later in the 20.x series, or Node.js 22.12 or later.

```sh
npm ci
npm run dev
```

Open the local URL that Vite prints. Press Ctrl+C to stop the server.

## Check the code

```sh
npm run typecheck
npm run lint
npm run build
```

The build output is in `dist/`. Run `npm run preview` to inspect the build.

## Sporklift trial

The first proposed feature is to record a practice session and view it after
reopening the app. Its scope and delivery contract still need to be defined.
Sporklift currently targets SporkTest. Repository configuration and target
validation must support `aeberts/shred` before a live trial starts here.
