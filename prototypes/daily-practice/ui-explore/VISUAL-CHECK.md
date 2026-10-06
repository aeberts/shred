# Round-one visual check

Inspected rendered Chrome screenshots at **1440 × 900**, device scale 1, **100% zoom**, on 2026-10-05. The comparison strip is outside the product layout. Screenshots use the same initial Learning state, 15:00, date and fixture content.

- [A · Session desk](screenshots/a.png): all three routine cards and Start block are visible. Calendar is above the music stand. Full sample Instructions, criterion and Next Time Note are visible; secondary material actions sit at the viewport's lower edge. Strongest resemblance to the reference's two-column card composition.
- [B · Music first](screenshots/b.png): all three cards and the full-width Start block are visible. The wider Instructions and separate note margin fit together. Calendar and dated session list share the shallow header. Reflection is near the viewport's lower edge.
- [C · Session notebook](screenshots/c.png): timer, routine sequence, Instructions and note appear together. The month and previous-session list fit below the stand. Current material takes precedence over calendar browsing.

Compared each candidate with the supplied Fretlog screenshot. Adopted the dark teal rail, restrained green, pale page, white cards and readable hierarchy. Deliberately replaced reference warm-up/completion/tab controls with the issue's three-block routine and monospaced material. No horizontal overflow at the target viewport. The document continues vertically for its footer; ordinary scrolling is available.

Performed one bounded visual correction: removed excess vertical gaps and blank instruction lines, without reducing text sizes. Captured and inspected all three final screenshots afterward.

## Minimal interaction check

For each direction, exercised the rendered Start action; browsed October 4 while running; verified two distinct same-day entries; returned; selected Mastery and verified pause plus 20:00; reached both mastery targets; applied a Learning note and returned to it after block changes; revealed guidance; applied a 12-minute duration; and checked that session reflection survived history browsing. These checks passed. No browser script errors were reported.

This is a first-round composition check, not independent QA or full issue-13 functional acceptance. Evidence recording, correction/validation, full target-owned drafts, reload/storage, song/range/memory lifecycles, narrow layout and the six original guided scenarios were not verified. See README.md for precise limits. Existing prototype storage was never accessed.

## Round 2 — B with date dropdown

Rendered and visually inspected both closed and open states in the user's 1245 × 1327 browser viewport and the original 1440 × 900 comparison viewport. The closed stand starts at the workspace top (142.5 px at the comparison viewport) and fills the right column. The dropdown aligns to the top-right date, overlays the stand, and does not shift the routine or timer. Readable Instructions, target selector, Next Time Note and three routine cards remain apparent when closed.

Screenshots: `b-round-2-closed.png` and `b-round-2-open.png` at the user's viewport; `b-round-2-desktop-closed.png` and `b-round-2-desktop-open.png` at the comparison viewport. Original round-one screenshots and source are preserved.

Focused rendered checks passed: clicking the date opens the calendar; Escape closes it and returns focus to the date; Arrow Down opens it with focus on today; clicking outside dismisses; selecting October 4 closes the dropdown and shows two read-only same-day sessions; history browsing leaves the running timer running and session reflection intact; returning restores the selected Mastery material; return focus lands on the material title. The temporary viewport override was reset and the browser was left on B with the calendar closed.

These checks cover this calendar refinement. Earlier full-lifecycle prototype limits remain in force.

## Round 3 — full-width Instructions

Visually inspected the selected B layout in the user's 1412 × 1327 browser viewport. Instructions occupy the full content width; the permanent note column and generic music-stand title are absent. The panel heading starts with Learn something new and changes to Make it stick / Repertoire through the rendered routine controls. Exercise and Song titles remain below the block heading. Screenshot: `b-round-3.png`.

Focused checks passed for all three headings and the absence of the note column. Practice actions → View note opens the original Learning note; Cancel retains it and restores focus to Practice actions. The browser was left on Learning with the optional panels closed. Full lifecycle limits remain unchanged.

## Round 4 — visible action panel

Rendered and visually inspected B at the user's 1412 × 1327 viewport and at 1440 × 900. The full-width Instructions, three routine cards, timer and new action panel are visible together. Four distinct Exercise decision buttons fit in one row. The note editor uses the width below the buttons, rather than a side column. At the comparison viewport the initial controls fit above the bottom edge. Screenshot: b-round-4.png.

Focused checks: Record Result shows inline prototype feedback without opening a modal; note drafts survive a block change and return; Discard changes restores the prior note; Save note reports an in-memory update; Edit material opens an inline editor and Cancel restores prior Instructions. Repertoire shows Record review and Open range controls without a modal. Browser was left in the initial Learning state with the calendar and material editor closed; viewport override was reset. Evidence recording and full lifecycle acceptance remain unimplemented.

## Round 5 — self-evaluation check-in

Inspected the rendered check-in at 1412 × 1327 and 1440 × 900. The full-width Instructions, routine/timer, five labelled slider positions, annotation and combined save action are visible together. Performed one spacing correction: reduced unused minimum Instruction height and enlarged the annotation. In the saved example at 1440 × 900, the update button ends at 865.5 px and full nearby feedback ends at 891 px. Screenshot: b-round-5.png. It contains illustrative rating/thoughts, not player evidence.

Focused rendered checks passed: save with no rating confirms practice without assigning a rating; keyboard Home selects 1 shaky; label selection chooses 3 comfortable; save changes to Update practice check-in; rating 5 nailed it leaves EXERCISE · LEARNING and timer unchanged; history return retains saved rating and thoughts; two mastery targets retain separate unsaved annotations. Corrections update the current check-in in memory. The viewport override was reset and the browser was left on the illustrative Learning check-in.

No production persistence, canonical Result/Practice Day history, progression rules or Song Review scheduling were implemented or accepted by this check.

## Round 6 — collapsible session panel

Inspected the expanded/collapsed layout at 1361 × 1301 and the collapsed scrolling state at 1440 × 900. Hiding the routine removes the left column and expands the Instructions and check-in to the full content width. At the comparison viewport Instructions measure 1115 px wide. The timer stays in the session bar; scrolling to the check-in leaves that bar visible.

Focused rendered checks passed: collapse while running leaves Pause available; Pause operates from the compact bar; restoring shows exactly three cards and retained session reflection; rating/text drafts survive collapse/restore; Enter on the toggle collapses the panel. No timer or evidence changes are triggered by the layout toggle. The viewport override was reset; browser left collapsed and paused with illustrative draft content. Source/screenshot from the previous round preserved. Full lifecycle limitations remain.

## Round 7 — sliding material panel and numbered rail

Visually inspected the expanded and collapsed B layout at 1440 × 900. The 12 px vertical band occupies a 22 px divider column. Clicking it reduces the routine from 340 px to 84 px; the material panel moves from x=590 to x=334 and gains 256 px. Collapsed Instructions measure 1009 px wide. Timer and numbered sections remain visible beside the wider Instructions/check-in. No horizontal overflow was observed. Screenshots: b-round-7-expanded.png and b-round-7-collapsed.png.

Focused rendered checks passed: collapse with a running Learning timer retains Pause; compact Pause operates; 02 opens Mastery and 03 opens Repertoire while collapsed; returning to 01 retains its rating and annotation; Enter expands the divider and restores the routine. Collapse itself does not pause, change sections or save a check-in. Reload restores the initial fixture. Browser left on the initial Learning view, collapsed, with the temporary viewport override reset. Previous source and screenshots remain available; full lifecycle limitations remain.

## Round 8 — Exercise library

Rendered and visually inspected B's library at 1440 × 900. It uses the accepted rail, palette and card styles. Search and filters sit above a goal-grouped list and read-first detail panel. All six initial Exercise rows are visible; the last ends at 890.5 px. Selected Instructions and sequence context are visible together. Optional guidance/continuation content uses vertical scrolling. No horizontal overflow was observed. One density correction reduced row padding while retaining normal-size text. New/Edit forms occupy the same detail panel without a modal.

Focused rendered checks passed: title/content search opens the matching Exercise; no-match state offers Clear filters; Mastery shows two Exercises; the fretboard goal shows one; Explanation opens without changing learning state; edits save in memory and preserve state; required-field errors focus Title; a supplied Exercise adds as Learning outside the sequence; moving an Exercise to another goal removes it from the old sequence, whose displayed positions/count update. Library editor drafts survive Daily practice navigation. Browsing while running preserves Pause; pausing in the library updates the same timer. Return preserves the collapsed practice rail, original session Instructions and check-in annotation. Test additions/edits were reset before capture.

Screenshots: b-round-8-library-desktop.png (1440 × 900), b-round-8-library.png (complete library view at the user's 1361 × 1301 viewport) and b-round-8-new-exercise.png. Cancel creation also returns to the original Exercise without adding an item. The temporary viewport override was reset; the browser was left on the library with original fixtures, and the user's visible practice text/annotation were retained through the reload used to load this slice. Previous source is preserved in round-seven.html. JavaScript syntax check passed. This is a library composition/interaction slice, not full library or issue-13 acceptance. Sequence management, future-plan use, progression/history controls and persistent storage remain unexplored.
