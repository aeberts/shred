# Guided practice interface exploration

This is a disposable prototype for [issue 8](https://github.com/aeberts/shred/issues/8). It explores preparation, three timed blocks, exercise and song material, independent confirmations and assessments, and paused resumption. Live player feedback must decide the interface. The issue remains open.

## Run

1. Open `guided-practice.html` in a current desktop browser. No installation or build is required.
2. Use **Free play**, or open **Guided walkthroughs** and select a scenario.
3. Confirm the explicit demo reset. Follow each step and inspect the current state and dated history.
4. For a reopen check, use the same file or browser origin. Reload is a real page reload, and restores timers paused.

If your browser blocks local storage for `file:` URLs, run `python3 -m http.server 4188 --bind 127.0.0.1` from the repository root. Open `http://127.0.0.1:4188/prototypes/issue-8/guided-practice.html`. Stop the server with Ctrl+C. This server only serves static prototype files.

The demo stores data in local browser storage under `shred-issue-8-prototype-v1`. **Reset all illustrative data** replaces this prototype's saved work. It does not use production data. **Simulate save failure** demonstrates an unsaved state; reload may lose changes. Do not treat this storage experiment as the design for issue 11.

## Walkthroughs

| Scenario | Check |
| --- | --- |
| Normal session | Select material, count a confirmed Practice Day, make an independent Learned decision, keep displayed material, pause between blocks, assess a review, end early. |
| Mastery interruption / reopen | Advance exactly eight demo minutes in 20-minute mastery; actual reload returns paused with 12 minutes remaining and a preserved note. Fresh start keeps notes and resets timers. |
| Range / memory / relearning | Repeated sections share material and state. Actual reload keeps occurrences 2–4 and the Verse note. Memory mode hides all material. Range expansion creates no learned range state. Targeted relearning keeps whole-song reviews active. |
| Result / correction / shared history | One Result is visible in both histories. Correction updates its ID. Changed criteria do not rewrite original context. Direct goal assessment, practice confirmation and continuation note remain separate. |
| Overtime / later continuation | Timer reaches two minutes overtime without assessment. Actually interrupted review persists across ended sessions. Continue it on a later demo date and schedule from finish date. |
| Short / empty blocks | Empty mastery and review selections, zero-minute block, early ending, no automatic evidence, fresh default durations. |

Advance-time buttons and the example-date control are disclosed shortcuts. Normal timers use a real one-second update. The model takes explicit elapsed seconds; browser storage and the clock are kept outside it. All walkthrough steps call the same model actions as free play, with disclosed demo setup and time changes.

## Material and scope

The four CAGED string sets and subsequent I–IV–V, vi/ii and improvisation exercises reflect the resolved progression. All exercise directions, criteria, song titles, song text and seeded history are **invented illustrative material**, not player-approved curriculum. No copyrighted song material is supplied. The player can edit Instructions, Explanation, Hints, criteria and Next Time Notes.

This is one local, self-contained HTML file. No production application changes, dependencies, accounts, playback, tab component, imports, deployment or migration are included. Only Cedar Path has an editable section learning view; other invented songs demonstrate review selection and priority. The first two exercises and one earlier confirmation day for the third are seeded to make mastery and guidance visible immediately.

## Remaining decisions and limits

- Player-run feedback on the normal session and interruptions remains required. A QA PASS means ready for that walkthrough, not approval or issue resolution.
- Local storage is a prototype-only reload experiment. There is no backup, multi-tab coordination or production recovery policy. A visible failed-save message prevents a false saved claim.
- Corrections and deletion are demonstrated for Results. Full correction/deletion workflows for review ratings, Practice Confirmations and learning evidence are not built into this disposable interface. Production correction/recalculation details remain with issue 11; the retained dated evidence can be inspected here.
- The demo validates common duration, range, selection and assessment inputs. It does not attempt a production storage schema or import validation layer.
- Section selection and notes persist, but the prototype has no full song library editor. Editable Song Order reuses the three invented section IDs.
- Review interval behavior uses the agreed 1 → 3 → 7 → 14 → 30 calendar-day steps. This interface does not expose interval settings or review history corrections. Reviews use an explicit performance finish date separate from entry date.
- This prototype does not settle production architecture. Keep it on its disposable branch and preserve the original planning and glossary.
