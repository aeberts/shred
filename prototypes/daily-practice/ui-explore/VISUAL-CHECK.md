# Reference UI verification

Variant B, Round 8 is the selected UI starting point. Previous rendered exploration checks and screenshots remain in commit `32ca256`. This branch removes alternative directions and earlier rounds while retaining the selected interactions.

The cleanup removes the A/C selector, CSS and JavaScript branches, preserves the B composition, and separates the practice assets into local CSS/JavaScript. No storage or domain workflow was added.

## Focused checks

Rendered and visually inspected Daily practice at 1440 × 900 and the compact routine/library at the user's 1361 × 1301 viewport. The three suggested blocks, reading width, five-step check-in, date dropdown, compact numbered rail and goal-grouped library retain the selected B composition. The comparison switcher is gone; the banner identifies Variant B, Round 8. No horizontal overflow was observed.

Focused rendered checks passed: start and collapse retain the running timer; history browsing leaves it running and Return to today restores the draft; compact Pause and section switching operate; returning to Learning retains the rating/annotation; Save check-in confirms practice in memory. Library search returns the matching Exercise, Mastery filters to two, an inline edit saves without changing Learned, and Return to practice retains the timer, collapse state and check-in. The direct `?panel=library` link opens the library. Tests were reset to clean fixtures before final capture.

JavaScript syntax checks passed for practice.js and library.js. Source inspection found no A/C selectors, variant-selection code or earlier-round assets in the reference. The temporary viewport override was reset. These checks cover extraction of the chosen prototype, not full issue-13 readiness.

Current screenshots: `daily-practice.png`, `daily-practice-collapsed.png` and `exercise-library.png`. The full earlier evidence remains in the exploration archive.

## Known limits

Material/order overrides, default saving, formal Result history/correction, goal/progression decisions, sequence management, full repertoire/memory/continuation flows, library-to-plan use and persistent recovery remain partial or unexplored. The React starter is separate from this prototype.
