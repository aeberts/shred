# Shred

A guitar practice tracker and a real-software test project for Sporklift.

## Current state

This is a Vite, React, and TypeScript starter. It shows a landing page.
Practice entry, saved sessions, and progress tracking are not implemented.
The earlier Reagent prototype remains in Git history at `9d4cd39`.

## Reference UI prototype

The selected UI starting point is **Variant B, Round 8**, with Daily practice and
the Exercise library. Open its [guide](prototypes/daily-practice/ui-explore/README.md)
for the local preview, decisions and known limits. It is a disposable prototype;
the production starter does not yet implement these workflows.

The full UI exploration is preserved in commit `32ca256`. The reference branch
`codex/ui-reference-b-round-8` contains only the selected composition.

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
