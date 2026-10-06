# Daily practice — comparison brief

Help the player pick up the guitar and practise immediately, with their routine, current action and supplied material in view. Shred stays open on a local Mac during practice. The normal path is to read the suggested routine, start a block, practise, pause or select another block, then reflect. This is a disposable UI comparison for [issue 13](https://github.com/aeberts/shred/issues/13), not its full implementation.

## Binding decisions

Follow the [Fretlog-based handoff](https://github.com/aeberts/shred/issues/13) and supplied screenshot: dark teal rail, pale background, white cards, green accents, date above the workspace. Exactly three persistent blocks: Learning 15 minutes, Mastery 20, Repertoire 15. Start requires no configuration. Selecting a block pauses. Duration and material overrides sit behind Adjust routine. Keep the timer usable while browsing history.

[Exercises](https://github.com/aeberts/shred/issues/5#issuecomment-5958511220) use essential monospaced Instructions, optional Explanation/Hints and target-owned Next Time Notes. [Session flow](https://github.com/aeberts/shred/issues/6#issuecomment-5959184708) separates time from evidence, keeps manual transitions and permits overtime. [Results](https://github.com/aeberts/shred/issues/7#issuecomment-5960138459) keep Practice Confirmation, Result, Learned and Integrated independent. [Song Sections](https://github.com/aeberts/shred/issues/10#issuecomment-5958830474) use shared state, manual memory hiding, and ranges without a Learned state.

No warm-up block, automatic completion, tab player, audio, invented navigation destinations, production storage or tracker closure. Full lifecycle behavior remains required for a later implementation round.

## Evidence and assumptions

Inspected `/Users/zand/Desktop/Screenshot 2026-10-05 at 1.48.23 PM.jpg` (the actual filename contains a narrow space before PM). Adopt its palette, rail and generous hierarchy; omit its four-block/52-minute routine, checkboxes and tab controls because issue 13 supersedes those reference details. The screenshot is at 80%; the comparison uses 100% browser zoom. The nearby application is a starter with no established product shell; no design documents are present. Read CONTEXT.md and the previous prototype's guide and fixtures at commit 637dc0a. Preserve that prototype and its storage.

## Shared screen and content

Target: 1440 × 900 desktop at 100% zoom. Monday, 5 October 2026 is a labelled fixture date. Initial state: suggested Learning block, 15:00, ready to start. Learning: CAGED triads, strings 3–5; Mastery: strings 1–3 and 2–4; Repertoire: Evening Loop review, then Cedar Path Intro → Verse. Titles reflect settled examples; instructions, criteria, songs, notes and dated history are illustrative, not approved curriculum. All three candidates use the same content and behavior.

- **A — Session desk:** a generous session card on the left; month calendar above the music stand on the right. The routine is the first visual anchor. Best reference fidelity; material has less width.
- **B — Music first:** a compact routine column, a wide music stand, and a shallow calendar/history area above it. Instructions dominate once the block is chosen. More reading room; the routine is less prominent.
- **C — Session notebook:** the routine forms a left-hand sequence; the music stand leads the right-hand column, with calendar/history below. The current task leads, then reference. Strong task continuity; calendar discovery is lower on the page.

## Capability placement

**Visible during normal use:** date, exactly three suggested blocks and durations, active outline, timer and Start/Pause/Resume, selected Instructions, criterion/latest Result, saved Next Time Note, session reflection and calendar. These orient the player without setup.

**Available on request:** Adjust routine (durations/defaults and selections); guidance; material editing and note editing; separate practice/assessment/learning decisions; mastery target selection; read-only dated sessions, including same-day entries. These depend on the player's current material or deliberate override.

**Later prototype round:** full Result validation/correction, section/range editing and memory behavior, learning/integration history, saved-state/reload, save failures, interrupted review continuation, narrow-layout refinement and the six guided scenarios. They remain required but do not determine the first composition choice. Round one uses only in-memory demonstration interactions and explicitly marks these limits.

Evaluation controls live in the comparison strip and README, outside the product composition. No storage key is used, no old data is copied, and refresh resets fixtures.

## Selected direction — round 2

The player chose **B · Music first** and said the direction was much better. Their requested refinement moves the entire practice calendar into a dropdown under the top-right date. The music stand moves up and fills the right column. This explicit feedback supersedes the earlier assumption that the calendar must stay permanently visible. The primary workflow and domain decisions stay binding.

Scope of this round: date-triggered calendar, dismissal and read-only date selection. Normal screen: calendar hidden, stand aligned with the session heading. Open screen: right-aligned calendar and recent sessions overlay the stand, without shifting the workspace or blocking the timer. Click date to toggle; Arrow Down opens and focuses the current date; Escape closes and returns focus; clicking or moving focus outside dismisses. Choosing a date closes the dropdown, opens clearly dated read-only history, and retains current timer/session reflection. Return to today restores the material with useful focus.

Round-one source is preserved in `round-one.html`, with its original screenshots. No new alternatives were generated. Full per-target drafts, evidence recording and persistence are still deferred; this round does not claim full issue-13 acceptance.

## B refinement — round 3

The player requested full-width Instructions and removal of the permanent Next Time Note column. The right panel now starts with the active block name: Learn something new, Make it stick, or Repertoire. Exercise/Song titles remain below it. The note column is removed; note viewing/editing is available through Practice actions (or Review actions), so it uses no normal reading width. This interprets the request as a placement change; no note data is discarded. The round-two source and screenshots are preserved. Scope: heading and reading width, with a focused check of block changes and optional note access.

## B refinement — round 4

The player requested an always-visible action panel instead of a link and modal. The panel now sits below full-width Instructions. It exposes independent Practice Confirmation, Result, Exercise learning and Practice Goal integration buttons, with small ownership labels. Repertoire substitutes whole-song review and section/range actions. Next Time Note / review note editing is visible below those actions, taking height rather than reading width. Edit material opens an inline editor. This explicit feedback changes the earlier on-request placement of practice decisions; their independence remains binding.

This slice explores availability and hierarchy. Evidence, learning/integration and review/range buttons remain labelled workflows with local prototype feedback; they record no evidence or decisions. Note and Instructions edits work in memory. Notes and editor drafts persist across in-page block/history returns at the existing simplified block-level ownership boundary; full per-Exercise ownership and persistence remain deferred. Previous source is preserved in round-three.html. No tracker or production updates were made.

## B refinement — round 5: self-evaluation and next practice

The player redefined the Exercise panel around self-evaluation and deciding what to practise next time. Requested changes: combine I practised this / Record Result in one button; free-form annotation; replace the Exercise learning button with five slider steps (1 shaky, 2 coming along, 3 comfortable, 4 feeling it, 5 nailed it); question the relevance of Review goal. Current explicit direction takes precedence over the earlier four-button presentation.

Learning and Mastery now show Your practice check-in: an optional five-step slider, a larger Thoughts & next time box, and one Save practice check-in button. No rating is selected initially. Labels can be clicked; the slider supports keyboard input. Saving explicitly confirms practice and stores the subjective rating/annotation together in memory. Update practice check-in corrects the same current-session check-in. Drafts and check-ins are owned by the selected Exercise, including each mastery string set. Timer activity or changing a slider alone saves nothing.

Removed the separate practice/result, Learned and Review goal buttons from the Exercise panel. The rating is treated as subjective reflection; it does not map automatically to criterion assessments (met/partly met/not met), Learned, Integrated, sequence movement, a new plan or a Song Review schedule. This is a provisional UI/interaction experiment, not a resolved replacement for every earlier evidence decision. Repertoire's distinct review/range demonstration remains unchanged in this slice.

The annotation supplies a human reminder for next practice. How ratings should affect future suggestions, and where formal goal assessment/learning decisions belong if still required, remain design questions for a later feedback round. No tracker decisions were closed or rewritten. Previous source and screenshots are preserved in round-four.html and b-round-4.png.

## B refinement — round 6: collapsible session routine

The player requested collapsing Today's session to give the current material more space. Hide routine removes the left card/reflection column from view and expands the active material/check-in to the full workspace width. The existing timer becomes a sticky, full-width session bar with Adjust routine and Show routine; Start/Pause/Resume continues to operate on the same timer. Expanding restores all three routine cards and the session reflection. This explicit user request permits hiding the routine in a player-chosen reading mode; the initial page still shows all three cards.

Collapsing changes layout only: it does not pause/resume, reset timers, change blocks/material, save evidence or discard drafts. To switch blocks or end the session, restore the routine. The date dropdown remains independent. In short desktop viewports the wider panel may need vertical scrolling; the compact timer bar remains available. Round-five source is preserved in round-five.html.

## B refinement — round 7: vertical collapse band

The player clarified that the control should be a thin band between the routine headers and the current material panel. Clicking it should slide the material over the routine's former space, leaving a compressed timer and section numbers. This supersedes round six's horizontal-bar interpretation. The question for this slice is whether the narrow rail retains orientation and useful controls while widening the material.

The divider is now a full-height, keyboard-operable button. A short width transition moves the material panel left, reducing the routine from 340 px to 84 px at the comparison viewport. The rail retains the active timer/type and timer control, plus selectable 01, 02 and 03 with active highlighting, tooltips and accessible full names. Expand restores routine descriptions, adjustment and session reflection/end controls. Reduced-motion preference disables the transition. Layout changes retain existing timer and draft state; section selection follows the existing pause-and-switch behavior. Round-six source is preserved. No domain, evidence, storage or production decisions changed.

## B refinement — round 8: Exercise library

The player accepted the round-seven composition and requested a separate Exercise library accessible from the dark left rail. This explicitly authorises the new navigation destination and supersedes issue 13's earlier restriction against extra destinations and library exploration. Preserve round seven as the Daily practice base.

The first library slice explores browsing by Practice Goal, selecting readable material, and authoring a supplied Exercise. The settled [Exercise resolution](https://github.com/aeberts/shred/issues/5#issuecomment-5958511220) requires title, exactly one Practice Goal and Instructions, with optional monospaced Explanation/Hints. Optional sequences belong to one goal; Exercises can also stand outside a sequence. The [goal resolution](https://github.com/aeberts/shred/issues/2#issuecomment-5957204307) keeps per-Exercise Learned distinct from goal integration. Round-five subjective ratings do not automatically change either state.

Visible in normal library use: search, goal/purpose filters, goal-grouped Exercise list, selected Instructions/goal/sequence context, and current-session timer. On request: Explanation/Hints and inline New/Edit forms. Later rounds: goal authoring, sequence creation/reordering/current selection, learning/history controls, choosing library material for a Session Plan, and persistence. The grouping by goal is a presentation assumption to evaluate, not a new product decision.

Six fixtures include the four separate CAGED string-set Exercises, I–IV–V voice leading and one fretboard-note activity. Goal names, criteria, text, sequence order/current marker and learned states are illustrative. No curriculum is generated. Library drafts belong to their selected Exercise; new drafts have a separate slot. Browsing changes no timer state or practice evidence. Ordinary library edits preserve learning state. The current session retains its existing material; the library-to-future-plan relationship remains unresolved. No tracker/production data changed.
