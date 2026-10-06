# Approved alphaTab reference · bounded verification

## Reference acceptance · October 6, 2026

The player approved A through round 6 as Shred's new reference. The repository README now points here and the previous guide links forward to it. The default page always uses A and identifies the approval date; its A/B/C switcher moved to `comparison.html`. All feedback-round assets and checks below remain committed evidence.

Focused promotion checks passed: the default URL rendered the A layout with an alphaTab SVG score and no comparison links; practice/library navigation retained a running timer; the goal summary and exercise disclosure worked; the direct `?panel=library` URL opened the library. The archived B and C links rendered their respective layouts and valid SVG scores. Visually inspected the approved Daily practice and library at 1445 × 1301 and normal zoom. Captures: `reference-daily-practice.jpg`, `reference-exercise-library.jpg`. The viewport override was reset and test state returned to clean fixtures.

JavaScript syntax checks passed for practice.js, library.js, explore.js and guitar-pro.js. Promotion adds no production workflow or storage. The unrelated untracked CONTEXT.md is excluded from the reference commit.

## Original comparison checks

Rendered and visually inspected A, B and C in the Codex in-app browser at 1440 × 900 and 100% zoom. Comparable screenshots start at the top of each page with the same Learning fixture. All show the timer/Start action, free-form Instructions and a real SVG score from alphaTab. No horizontal page overflow, rendering error, overlapping text or clipped tab numbers was observed. A continues to the check-in below the initial viewport. B's check-in disclosure begins at the lower edge and is reachable by scrolling. C shows the check-in beside the score. Vertical scrolling is a deliberate comparison tradeoff.

One bounded visual correction pass widened the material cards to fill their columns, justified the final score system and reduced spare score padding. The three alternatives differ through routine placement, score width and check-in placement, while preserving Instructions above tablature. Narrow layouts and longer scores were not visually verified in this round.

Focused browser checks passed:

- Applying valid alphaTex replaces the score, retains Instructions and changes sample metadata to an honest custom-tab label. Invalid alphaTex shows a nearby error and keeps the last applied score. Cancel returns to that applied source.
- Mastery switches to the correct 2–4 Instructions and tab fixture. Tab + notation renders staff notation and tablature.
- A Learning tab edited in Daily practice also renders in the matching library Exercise. A text-only fretboard Exercise keeps its Instructions and can add a tab.
- B can edit free-form Instructions while its check-in is closed. The updated text and score remain visible; the optional check-in opens normally. Browsing the library and returning keeps the edited Instructions, score and running timer.
- A/B/C direct URLs render valid SVG scores, with no horizontal page overflow, at the reference viewport. Final screenshots reset all test edits and timers to the same fixture.

JavaScript syntax checks passed for practice.js, library.js and explore.js. These are disposable prototype checks; no production regression suite, independent QA cycle or full domain/lifecycle verification was run. No storage, tracker state, root dependencies or existing reference files were changed. The unrelated untracked CONTEXT.md was read for terminology and left intact.

## Selected A · round 2 checks

Rendered and visually inspected open/hidden Instructions at the annotated 1445 × 1301 viewport and normal zoom. The small arrow beside Instructions points down when open and right when closed. Hiding the text brings the tab and check-in upward without hiding either. No horizontal overflow was observed. Screenshots: `a-round-2-open.jpg` and `a-round-2-closed.jpg`; original A/B/C screenshots remain unchanged.

Focused checks passed for mouse, Enter and Space activation, aria-expanded/aria-controls, keeping the running timer and check-in draft intact, independent default-open state for a Mastery Exercise, retaining the hidden Learning state after switching back, and synchronizing the state between practice and library. Editing hidden Instructions retained both the applied text and the collapsed state. Reload reset the fixture and restored default-open Instructions. One synchronization defect found during this check was corrected and the affected navigation sequence was repeated successfully. JavaScript syntax checking passed. No new delivery or lifecycle scope was added.

## Selected A · round 3 checks

Removed the separate Explanation, Hint and Criterion sections and Show guidance from A. Merged existing sample text into Instructions in practice and library fixtures. Library New/Edit now presents Title, Practice Goal and Instructions without separate guidance fields. Mastery's Latest Result remains separate. B/C retain the previous composition and content model.

Rendered checks passed: Learning Instructions contain the former guidance and criterion text; Mastery has no criterion/guidance display and retains Latest Result; the library contains the merged prose without a repeated goal-criterion paragraph or optional guidance sections; the single Instructions field saves edited text successfully and the tab still renders. Cancel edit returns to normal practice. JavaScript syntax checks passed for practice.js, library.js and explore.js. Revised asset URLs ensure a normal browser reload loads the changed files.

Visually inspected Instructions open and folded at 1445 × 1301 and normal zoom. The tab and check-in remain distinct and usable, with no horizontal page overflow. Final captures reset test edits to fixtures: `a-round-3-open.jpg` and `a-round-3-closed.jpg`. Original screenshots and earlier-round evidence are retained.

## Selected A · round 4 checks

Focused rendered-control checks passed: an empty objective is rejected beside the form; a goal can be saved without Exercises; Add exercise preselects the selected goal; saving creates an Exercise under that goal; renaming the objective retains the supporting Exercise and updates filter/search labels; cancelling an edit keeps the saved goal; cancelling a new Exercise returns to its goal; a goal draft survives Daily practice/library navigation. Saving a Learning check-in updates the matching goal's checked-in Exercise count and latest reflection. The count describes current target check-ins rather than a historical total.

Visually inspected goal summary, goal form and empty goal at 1445 × 1301 and normal zoom. Goal controls and supporting states fit without clipping or overlap. The current practice view still renders the single Instructions disclosure, alphaTab and check-in. Captures: `a-round-4-goal.jpg`, `a-round-4-goal-form.jpg`, `a-round-4-empty-goal.jpg`. Final goal summary uses the original fixture plus an illustrative saved reflection; screenshots of authoring use clearly invented example text.

JavaScript syntax checks passed for practice.js, library.js and explore.js. This round remains in-memory and provisional. It does not validate production goal completion, historical reporting, long lists, narrow layouts or changes to the active Session Plan. Original A/B/C comparison screenshots remain unchanged.

## Selected A · round 5 checks

Rendered checks passed: the triad disclosure hides its Exercise rows, sequence label and Add exercise shortcut while leaving its name, Edit goal and counts visible; the fretboard group remains expanded independently; Enter expands and Space collapses; the closed choice survives Daily practice/library navigation and goal filtering. Folding and unfolding leave an open Exercise editor's title draft intact. Cancel restores the saved Exercise. Selecting a child from the right-hand goal summary opens its parent group and selects the matching list item. The current Exercise and alphaTab score remain visible while its list group is folded.

Visually inspected expanded and collapsed groups at 1445 × 1301 and normal zoom. Arrows indicate the state, text fits without overlap, and the page has no horizontal overflow. The selected Exercise's longer content continues below the viewport. Captures: `a-round-5-expanded.jpg` and `a-round-5-collapsed.jpg`. JavaScript syntax checking passed for library.js. Display state is retained in memory and resets on reload; B/C and earlier screenshots remain comparison evidence.

## Selected A · round 6 checks

Rendered-control checks used actual alphaTab test files: GP8 `layout-configuration-multi-track-all.gp` and `e.gp`, plus GP5 `chords.gp5`. File selection produced a real SVG preview; selecting track 3 attached that track from the multi-track file. A second GP8 file replaced the first only after applying. Cancelling a valid replacement retained the original. A deliberately invalid `.gp` displayed a nearby error, disabled replacement and retained the attached score; alphaTab's importer also logged the expected parse failure. A pending preview survived practice/library navigation. The matching Mastery target rendered the applied GP8 file. GP5 attached to a text-only Exercise, Tab + notation rendered, and Remove tab retained Instructions and restored the upload action.

Visually inspected import preview and attached score at 1445 × 1301, normal zoom, with Instructions folded to give the file preview room. Filename, selected track, preview and apply/cancel controls fit without overlap or horizontal overflow. Captures: `a-round-6-import-preview.jpg`, `a-round-6-attached.jpg`. JavaScript syntax checks passed for guitar-pro.js and explore.js. The bounded checks do not establish compatibility with the player's entire GP collection, encrypted files, long scores or narrow layouts. All file data stays in memory; production persistence, external editing and excerpt authoring are not implemented.
