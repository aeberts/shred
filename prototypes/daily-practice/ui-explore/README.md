# Daily practice: three UI directions

A disposable first comparison using the ui-explore skill and [issue 13](https://github.com/aeberts/shred/issues/13). Open [BRIEF.md](BRIEF.md) for decisions, assumptions and capability placement.

From `/Users/zand/dev/shred`, run:

```sh
python3 -m http.server 4193 --bind 127.0.0.1
```

Open `http://127.0.0.1:4193/prototypes/daily-practice/ui-explore/?variant=a`. Use the comparison strip to select A, B or C. Change `variant=a` to `variant=b` or `variant=c` for direct links. Press Ctrl+C to stop the server. You can also open index.html directly; it has no external dependencies.

Use 1440 × 900 and normal browser zoom for this comparison. All directions start with the same suggested Learning block and fixture material. Start/Pause/Resume counts real time. Selecting a block pauses and shows its material. Timer expiry measures overtime; it creates no evidence. Adjust routine applies durations in memory. Guidance, target selection, note/material editing and dated read-only sample sessions demonstrate placement. History preserves the current timer. Session reflection is separate from a target note or evidence.

## Limits

Round one compares composition, not full issue-13 acceptance. All material, notes, songs and history are illustrative. Fixtures use October 5, 2026. No storage key is used; refresh resets the preview. No existing data or previous prototype is read, copied, migrated or overwritten. No application code, dependencies, GitHub records or Fretlog content changed.

Material/order overrides, default saving, Practice Confirmation, Result, Learned, Integrated, full review/section/range and memory flows are placement previews only. Mastery note/material ownership is simplified at block level in this first round; full per-Exercise drafts are deferred and are required later. Saved-state/reload, validation/correction, save failures, review continuation, narrow-layout refinement and the six guided scenarios remain for the selected prototype round. Do not use this comparison as evidence of full functional readiness or player acceptance.

## Comparison

| Direction | Organizing idea | Main tradeoff |
| --- | --- | --- |
| A · Session desk | Routine leads inside a spacious session card; calendar above material. | Closest to Fretlog; narrower reading area. |
| B · Music first | Slim routine column; wide material with a separate note margin; shallow calendar/history header. | Most space for reading; routine has less emphasis. |
| C · Session notebook | Routine as a sequence; music stand above calendar/history. | Immediate task comes first; calendar sits lower. |

Screenshots and visual inspection notes are in `screenshots/` and `VISUAL-CHECK.md`. Select A/B/C or a hybrid before deepening. No independent QA cycle or production delivery is part of this round.

## Selected B · round 2

The current `index.html` defaults to B. Click the top-right date to open the practice calendar dropdown. The calendar no longer occupies the normal workspace, so the music stand starts beside Today's session and fills that column. Click the date again, press Escape, click outside, or move keyboard focus outside to dismiss. Arrow Down from the date opens the calendar and focuses today. Choosing a past date closes the dropdown and opens read-only session details; the current timer remains available. Return to today restores the material.

The original comparison is preserved at `round-one.html?variant=b`. Its screenshots remain `screenshots/a.png`, `b.png` and `c.png`. Round-two screenshots are named `b-round-2-*`. The prototype limits above still apply.

## B · round 3

The selected material panel uses the active block name as its heading. Instructions occupy the full available width. The permanent note column is removed; view or edit a target note from Practice actions / Review actions. Round-two source is preserved at `round-two.html?variant=b`; its screenshots remain unchanged. New screenshot: `screenshots/b-round-3.png`.

## B · round 4

Practice / Review actions are always visible in a panel below Instructions. The buttons keep practice, assessment, Exercise learning and goal integration separate. Notes are editable inline, with Save note and Discard changes. Edit material opens an inline editor with Apply in preview / Cancel edit; no modal is used by these controls. Instructions retain the full panel width.

Evidence, learning/integration and review/range buttons are placement previews and show nearby feedback explaining that no evidence was recorded. Notes and Instructions can be changed in memory; refresh resets them. The earlier ownership/persistence limits remain. Round-three source is preserved at `round-three.html?variant=b`. Screenshot: `screenshots/b-round-4.png`.

## B · round 5: practice check-in

Learning and Mastery use one Save practice check-in action for practice confirmation plus subjective self-evaluation and a Thoughts & next time annotation. Choose one of five slider positions: shaky, coming along, comfortable, feeling it, nailed it. Rating is optional and initially unselected. Click a label, drag the slider, or use its keyboard controls. Saved check-ins can be updated in place.

These check-ins work in memory and reset on refresh. Each selected Exercise retains its own draft/rating on block, mastery-target and history navigation. A rating does not automatically change Learned, Integrated, sequence position, the next Session Plan or Song Review scheduling. The prototype does not yet map check-ins into formal criterion-based Result history. Repertoire review/range controls remain the previous placement demonstration.

Review goal is removed from the Exercise panel. It previously represented a separate longer-term goal integration decision. The player is now evaluating a reflection/next-practice workflow; remaining progression and goal-assessment semantics await further feedback. Source before this round: round-four.html. Screenshot: screenshots/b-round-5.png.

## B · round 6: collapse the routine

Select Hide routine beside Today's session to expand the current material/check-in across the workspace. A sticky session bar retains timer, Start/Pause/Resume, Adjust routine and Show routine. Show routine restores the three blocks and session reflection. Collapse/expand preserves the current timer, active block, rating, annotation and reflection. Restore the routine to choose a different block or end the session.

This is an in-page layout preference; refresh restores the initial expanded fixture. At a short desktop viewport, scroll to the lower check-in while the timer bar stays visible. Previous source: round-five.html. Screenshots: b-round-6-collapsed.png and b-round-6-scrolled.png.

## B · round 7: sliding panel and compact rail

Click the thin vertical band between Today's session and the material panel. The material panel slides left as the routine compresses into an 84 px rail with the active timer, Start/Pause/Resume control and selectable sections 01–03. Click the band again to restore the full routine. Hover a numbered section for its name; full section names remain available to assistive technology. The active section stays highlighted.

This replaces the round-six horizontal session bar. Section switching works directly from the compact rail; expand for Adjust routine, session reflection or End session. Collapse/expand preserves the timer, active section and check-in draft. Motion respects the browser's reduced-motion preference. Reload restores the expanded fixture. Previous source: round-six.html. Screenshots: b-round-7-expanded.png and b-round-7-collapsed.png.

## B · round 8: Exercise library

Open Exercise library from the left navigation, or use `?variant=b&panel=library`. The accepted round-seven Daily practice screen remains available from the same rail. The library groups six illustrative Exercises by Practice Goal. Search titles, goals or Instructions; filter by goal or Learning/Mastery; select an Exercise to read its Instructions, sequence context, optional Explanation/Hints and continuation note.

New exercise and Edit exercise open an editor in the detail panel. Title, one existing Practice Goal and Instructions are required. Explanation and Hints are optional. Add/save work in memory; Cancel discards that editor draft. Drafts survive normal selection/navigation until cancelled. New Exercises start outside the sequence. Editing ordinary material preserves the Exercise's fixture learning state; changing its goal removes its sequence membership.

The session timer stays available while browsing. Start/Pause/Resume affects the current session, independently of the library selection. Returning to Daily practice retains the active section, collapse state, practice draft and session material. Library edits currently affect library fixtures only; applying them to a future Session Plan remains unexplored. Reload resets the library. No storage, real player data, sequence reordering, goal creation, progression controls or scheduling were added.

The current prototype now uses local `library.css` and `library.js` beside index.html; it still has no external dependencies. Round-seven's self-contained source is preserved at round-seven.html. Screenshots: b-round-8-library-desktop.png, b-round-8-library.png and b-round-8-new-exercise.png.
