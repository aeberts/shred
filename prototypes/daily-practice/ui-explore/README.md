# Shred reference UI — Variant B, Round 8

This previous reference was superseded on October 6, 2026 by the approved [Inline reference with alphaTab](../alphatab-explore/README.md). Future prototype work should extend that new reference. This directory preserves the earlier Daily practice and Exercise library composition; its original acceptance notes follow below.

This was the player's chosen starting point for Shred's UI. It contains one reference composition: Daily practice and the Exercise library. It is a disposable prototype, not the production application.

## Open the prototype

From the repository root, run:

```sh
python3 -m http.server 4193 --bind 127.0.0.1
```

Open [Daily practice](http://127.0.0.1:4193/prototypes/daily-practice/ui-explore/) or the [Exercise library](http://127.0.0.1:4193/prototypes/daily-practice/ui-explore/?panel=library). Use the left rail to switch panels. Press Ctrl+C to stop the server. The prototype uses local HTML, CSS and JavaScript with no external dependencies. Existing links with `variant=b` still open this same UI; there is no variant selector.

## Daily practice

The suggested routine has three blocks: Learning (15 minutes), Mastery (20) and Repertoire (15). Start/Pause/Resume counts real time. Selecting a numbered block pauses and shows its material. Expiry permits overtime and creates no practice evidence.

Click the thin vertical band to slide the material panel left. The routine compresses into a rail containing the active timer and sections 01–03. Click again to expand. The timer, active section, check-in draft and session reflection remain intact. Reduced-motion settings disable the transition.

Click the top-right date to open the calendar. Escape, another click or focus outside dismisses it. Arrow Down opens it and focuses today. Past dates show read-only sample sessions; Return to today restores the material and leaves the timer intact.

Learning and Mastery use one practice check-in: an optional five-step rating (shaky, coming along, comfortable, feeling it, nailed it), Thoughts & next time, and Save/Update practice check-in. Exercise-owned drafts survive block, mastery-target and history navigation. A check-in does not automatically change Learned, Integrated, the sequence, the next plan or Song Review scheduling. Session reflection remains separate.

## Exercise library

Search by title, goal or Instructions. Filter by Practice Goal or Learning/Mastery. Select an Exercise to read its Instructions, goal, sequence context, optional Explanation/Hints and continuation note. The session timer remains available while browsing; returning retains the current section, collapse state, draft and session material.

New exercise and Edit exercise open an inline editor. Title, one existing Practice Goal and Instructions are required. Explanation/Hints are optional and use monospaced text. Add/save work in memory; Cancel discards the selected editor draft. New Exercises start outside the sequence. Ordinary edits preserve the fixture learning state. Changing the goal removes sequence membership.

## Limits and next work

All examples, criteria, learned states, notes and history are fixtures dated October 5, 2026. Reload resets the prototype. It uses no storage key and does not read, migrate or overwrite other player data. Library edits affect library fixtures only; applying them to future Session Plans is not yet explored.

Duration changes, material editing, notes, library authoring and check-ins demonstrate local interactions. Material/order overrides and default saving, Repertoire review/range controls, end/continuation, formal Result history/correction, progression decisions, goal authoring, sequence management and persistent recovery remain partial or unexplored. Narrow layouts have basic styling but do not establish full lifecycle readiness. This reference is accepted as a UI starting point, not full issue-13 acceptance.

See [BRIEF.md](BRIEF.md) for decisions and [VISUAL-CHECK.md](VISUAL-CHECK.md) for verification. Current screenshots are in `screenshots/`.

## Exploration archive

The complete A/B/C exploration, rounds 1–8, screenshots and feedback notes are preserved in commit `32ca2566f86f8864dc704c921b0423f1c5905c00` on `master` (commit message: Preserve Shred UI exploration through round 8). This branch contains only the selected reference. For example:

```sh
git show 32ca256:prototypes/daily-practice/ui-explore/README.md
```
