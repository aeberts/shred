# Guided practice interface exploration

This disposable prototype supports [issue 12](https://github.com/aeberts/shred/issues/12) and the open planning decision in [issue 8](https://github.com/aeberts/shred/issues/8). It continues from candidate `2e582f17f860d69754bdf4e9ff8a84adf0541104`, which remains in Git history. Live player feedback must decide the interface.

## Run

1. Open [guided-practice.html](guided-practice.html) in a current desktop browser. No build is required.
2. If local storage is blocked for file URLs, run `python3 -m http.server 4192 --bind 127.0.0.1` from the repository root. Open `http://127.0.0.1:4192/prototypes/issue-8/guided-practice.html`. Stop the server with Ctrl+C when finished.
3. Accept the suggested 15 / 20 / 15 minute plan. Use **Choose material** to change selections. Select **Prepare session**, then **Resume / start timer**.
4. Read and practise in the active workspace. A manual block change pauses the timer. In mastery, use the named Exercise selector to reach every selected Exercise. In repertoire, choose **Memory review** or **Song Sections / Practice Range**.
5. Select **Edit material** to change Instructions, Explanation, Hints or criteria. **Hide editor** keeps the draft. **Cancel edit · restore saved text and note** discards that target's draft and restores saved text and notes. Save Next Time Notes beside the material.
6. Use **Previous Practice Sessions** to browse dated read-only records. The current timer and pause control remain visible. **Return to current session** restores the workspace. Browsing does not pause a running timer: it keeps counting real practice time.
7. End the session to see planned/actual time, confirmed work and evidence IDs. Save a continuation note or start fresh. Reload restores saved sessions paused; it excludes time away.

For an evaluation, open the **Evaluation area** below the workspace. It contains guided walkthroughs, demo time/date changes, raw Song Order editing, reload and save-failure controls. **Add labelled sample sessions** adds three samples across two earlier dates, including two distinguishable entries on one date. It preserves existing data and does not duplicate the same sample set. Samples are never added automatically. An empty history explains how to begin.

## Input, evidence and saving

Drafts stay with their original Exercise, shared Song Section, new assessment target or corrected Result during in-page navigation. Guidance toggles, material/block changes and history browsing retain them. A Result rejected for a missing assessment keeps measurement, unit, context, note and date; the local error focuses the assessment field. Submission brings the feedback and relevant field or save action into view below the sticky timer. Other form actions also retain their field or action focus, show feedback beside that control, and focus the relevant field after validation. Correction retains the record ID, original criterion/material and entry position. Test Context remains editable.

Practice Confirmation, Result assessment, Learned and Integrated are separate decisions. A Learned decision offers the next Exercise but keeps current material until the player switches. A range has no learned state. Repeated sections share their material, state and notes. Song memory mode hides all Instructions, Explanation and Hints, including editors. Review completion needs an explicit rating; timer completion supplies none.

The existing storage key is `shred-issue-8-prototype-v1`. Saved material, notes, durations, ranges, evidence and elapsed time survive reload. Previous version-1 records without the new session snapshot fields still load. Their history identifies selections that were not captured. Unsaved in-page drafts do **not** survive reload. **Simulate save failure** reports that changes are only in memory beside the action and in the save status. It cannot claim durable success. **Reset all illustrative data** replaces this prototype's saved work; guided scenario selection requests confirmation before that reset.

## Walkthroughs

Every step activates the same rendered buttons, fields and disclosures used in free play. Demo time/date changes are labelled shortcuts. The two reopen steps use actual page reloads.

| Scenario | Check |
| --- | --- |
| Normal session | Prepare, confirm actual practice, make an independent Learned decision, retain displayed material, pause at block changes, assess a review, end early. |
| Mastery interruption / reopen | Advance eight demo minutes in 20-minute mastery; actual reload returns paused with 12 minutes and a saved note. Fresh start retains notes and resets timers. |
| Range / memory / relearning | Select named occurrences 2–4, save the shared Verse note and reload. Hide all material, expand the range, learn section/song separately, then relearn Verse while reviews remain active. |
| Result / correction / shared history | Save one Result in both histories. Change current material/criterion, correct the original ID, and retain original context. Direct goal assessment, confirmation and notes remain independent. |
| Overtime / later continuation | Reach two minutes overtime without assessment. Leave review unfinished, end, then continue the same attempt on a later demo date. Schedule from finish date. |
| Short / empty blocks | Empty mastery/review selections, a zero-minute block, early ending, no automatic evidence and fresh defaults. |

## Candidate evidence and next evaluation

The [issue 12 delivery record](https://github.com/aeberts/shred/issues/12) links the exact implementation commit, implementation checks and independent QA verdict. Use that commit when evaluating; do not infer candidate identity from a preview URL. The original [prototype delivery record](https://github.com/aeberts/shred/issues/8#issuecomment-5960829476) describes the prior candidate.

Implementation evidence is kept in the delivery workspace's `.graph-dev/focused-model.log`, `focused-browser.json`, `typecheck.log`, `lint.log` and `build.log`. Focused model checks cover validation, idempotency, original Result context/order, block pause, saved-state compatibility and review continuation. The isolated-browser smoke covers keyboard preparation, Result rejection/correction, target-owned drafts, non-destructive samples, history while running/paused, real mastery reload, save failure and focus across timer ticks. Independent QA owns the six walkthroughs and the full desktop/narrow interaction suite once per candidate. Its issue note records screenshots, actual user actions, starting state, visible and durable results, and unverified paths.

For the next live evaluation, use 1440 × 900 and 640 × 900 Mac browser panels. Prepare with the keyboard; read Instructions with the timer visible. Reproduce the missing-assessment and unsaved-note cases. Browse earlier dates while running and paused. Return, save only the intended target's note, then complete all six scenarios. End with the compact summary. Player feedback and the parent planning decision remain open after technical delivery.

## Material and known limits

The four CAGED string sets and later I–IV–V, vi/ii and improvisation exercises reflect the resolved progression. All directions, criteria, songs and seeded history are invented illustrative material, not approved curriculum. No copyrighted song material is supplied. The first two Exercises and one earlier confirmation day for the third are seeded to make mastery and guidance visible immediately.

This is one local HTML file. It adds no production application code, dependencies, accounts, playback, tab widget, import, full library editor or deployment. Cedar Path has editable Song Sections; the other songs demonstrate review selection and priority. Raw Song Order editing uses the three existing section IDs in the evaluation area.

Local storage is a prototype reload experiment. It has no backup, multi-tab coordination or production recovery policy. Full correction/deletion workflows for reviews, Practice Confirmations and learning evidence remain outside this pass. Results support correction and deletion. Current same-day Results are ordered by performance date, then assessment entry order; correction keeps that position. Earlier session details preserve each Result's recorded criterion/material, while an explicit correction remains reflected in both evidence histories.

Review intervals retain the agreed 1 → 3 → 7 → 14 → 30 calendar-day steps. Finish date is separate from entry date. Duration changes apply to the active session and retain elapsed time; **Save as defaults** also sets future plans. An explicit no-review choice remains selected on preparation. The prototype retains original optional evidence semantics and does not resolve production saving/recovery in [issue 11](https://github.com/aeberts/shred/issues/11).
