# Shred UI reference brief

The player accepted Variant B, Round 8 as the starting point for Shred's UI on October 5, 2026 and requested a separate branch containing only that reference. The complete exploration remains in commit `32ca256`. This brief records the current composition and remaining boundaries.

## Outcome and composition

Help the player start guitar practice immediately and return to their supplied material without losing context. Use the accepted dark teal rail, pale background, white cards and restrained green accents. Daily practice and Exercise library are the two destinations. The reference desktop viewport is 1440 × 900 at normal zoom.

Daily practice has a compact three-block routine beside a wide material/check-in panel. The date opens a calendar dropdown. A thin vertical divider slides the material left, leaving a compressed timer and selectable section numbers. Material starts with the active block title; Instructions occupy the full reading width. The library groups Exercises by Practice Goal, with search/filters and a read-first detail panel. New/Edit replaces the detail panel with a form.

## Decisions and user refinements

The [Fretlog-based handoff](https://github.com/aeberts/shred/issues/13) supplies the visual direction. Current user feedback supersedes its permanent calendar, permanent routine and restricted-navigation assumptions: use the date dropdown, optional compact routine, and library navigation. The Exercise action panel was explicitly reframed as self-evaluation and next practice: one confirmation/check-in, free text and the five-step subjective scale. Do not restore the earlier four-button presentation without new direction.

[Exercises](https://github.com/aeberts/shred/issues/5#issuecomment-5958511220) require a title, exactly one Practice Goal and monospaced Instructions. Explanation/Hints are optional. Separate CAGED string-set Exercises can become Learned independently. A goal has at most one optional Exercise Sequence; Exercises can also exist outside it. [Goals](https://github.com/aeberts/shred/issues/2#issuecomment-5957204307) distinguish per-Exercise Learned from goal Integrated. [Session flow](https://github.com/aeberts/shred/issues/6#issuecomment-5959184708) separates time from evidence and keeps transitions manual. [Results](https://github.com/aeberts/shred/issues/7#issuecomment-5960138459) and [Song Sections](https://github.com/aeberts/shred/issues/10#issuecomment-5958830474) supply later history/repertoire requirements.

The subjective scale has no automatic mapping to a formal Result, Learned, Integrated, sequence advancement or future scheduling. Those relationships remain open. Library grouping by goal, fixture sequence/current markers and library-to-future-plan use remain assumptions for further exploration.

## Capability placement

- **Normal practice:** suggested Learning 15 / Mastery 20 / Repertoire 15, current timer/action, active material, Instructions, criterion and Exercise check-in. Session reflection remains separate.
- **On request:** routine expansion/collapse, date/history, guidance, adjustment and inline material editing. Library navigation opens the searchable Exercise collection; New/Edit forms and optional guidance are disclosed there.
- **Later:** goal authoring, sequence management, selecting library material for a Session Plan, formal history/correction, progression decisions, full repertoire/memory/continuation flows, persistence and lifecycle verification.

## Fixtures and limits

Daily examples: CAGED triads (Learning strings 3–5; Mastery strings 1–3 and 2–4), Evening Loop review and Cedar Path Intro–Verse. The library has the four CAGED string sets, I–IV–V voice leading and one fretboard-note activity. Exact goals, criteria, material, notes and history are illustrative. No curriculum is generated.

The prototype uses memory only and reload resets it. Drafts retain their target through normal navigation. Library edits keep the current session's existing material. No production code, tracker decisions, old prototype storage or player data are changed. Acceptance as a visual starting point does not establish production or full lifecycle readiness.
