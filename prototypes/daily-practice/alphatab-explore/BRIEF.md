# Shred approved reference · Inline reference

The player approved A through alphaTab round 6 as Shred's new reference prototype on October 6, 2026. The default `index.html` always opens this composition and has an approval banner instead of the A/B/C selector. `comparison.html` preserves the alternatives. This supersedes the earlier reference at base commit `d8e38c7`; future UI work should begin here. Acceptance does not change the in-memory boundary or establish production readiness. The rounds below retain the design evidence and accepted refinements.

Help the player read an Exercise, use its tab while practising, and capture a check-in without losing their place. Extend the accepted dark teal rail, pale canvas, white cards and restrained green accents from base commit `d8e38c7f8eb4e67b46e82a677e1f9b98bd574fde`. Primary screen: Daily practice, Learning, CAGED triads on strings 3–5. Compare at 1440 × 900, 100% zoom. All material is invented fixture content dated October 5, 2026.

## Binding behavior and scope

The current request adds a separate alphaTab display below retained free-form Instructions. Instructions are visible by default, editable and monospaced. In the selected A direction, the player can hide and show the text with a disclosure beside Instructions; tablature remains visible. Tab is optional exercise material, not hidden guidance. The same placement appears in the Exercise library. Learning and Mastery targets keep their own tab source. Tab view changes do not affect the timer, check-in, Learned state or goal integration. Block transitions remain manual and pause the timer. The five-step check-in and session reflection stay separate.

[Exercise resolution](https://github.com/aeberts/shred/issues/5#issuecomment-5958511220) supplies the content model and per-exercise ownership. [Session flow](https://github.com/aeberts/shred/issues/6#issuecomment-5959184708) separates timers from evidence. The local untracked CONTEXT.md supplies domain terminology; this exploration does not edit it. The [accepted base brief](../ui-explore/BRIEF.md) and [reference guide](../ui-explore/README.md) record the player's later refinements. No docs/ directory or separate Wayfinder map exists in this checkout. Those explicit refinements supersede the permanent calendar and older action-panel details in [issue 13](https://github.com/aeberts/shred/issues/13).

Earlier resolutions defer tab widgets from the first usable version. The current request supersedes that exclusion for this disposable exploration only. It does not settle production scope, progression or evidence policy. Tabs are absent from the whole-song memory review; repertoire and song-section tab integration remain outside this round.

## Shared scenario and reference

Use the same free-form Instructions in all variants: choose a key, play root position and both inversions, name chord tones and connect shapes slowly. The displayed sample chooses D major, standard tuning and two half-note strums per shape at 60 bpm. Learning uses strings 3–5; Mastery offers 1–3 and 2–4. The library also includes 4–6; text-only activities have an empty optional tab area. No curriculum or saved player content is generated.

Use [alphaTab 1.8.4](https://github.com/CoderLine/alphaTab) from the npm package, vendored inside this disposable prototype. Render alphaTex through AlphaTabApi.tex(), with local Bravura fonts, SVG output and audio disabled. The app starter and its dependency manifests stay at the base commit.

## Directions

| Direction | First view and normal start | Main content | Secondary controls | Tradeoff |
| --- | --- | --- | --- | --- |
| A · Inline reference | Expanded routine and Start block beside the exercise | Instructions, tab and check-in in one vertical card | Instructions disclosure and editors open inline; calendar from date | Closest to the reference, but longer reading and check-in scroll |
| B · Music stand | Compact numbered routine, timer and wide exercise | Instructions followed by a wide score | Check-in disclosure below; routine can expand; editors inline | More score width, but section names and reflection require expansion |
| C · Practice desk | Timer and three sections across the top | Instructions and tab on the left; check-in on the right | Session reflection disclosure below; editing and guidance inline | Reflection stays beside the music, but routine loses detailed context |

## Capability placement

- **Visible during normal use:** Instructions and optional tab area; current timer/Start; exercise title/target; tab-only or tab-plus-notation view. These support actual practice.
- **Available on request:** Instructions disclosure, tab source editing/add/remove, text editing, exercise library, calendar/history, routine adjustments. B also discloses the check-in; C discloses session reflection. These support preparation or reflection without crowding the score.
- **Later prototype round:** bulk file import, playback, looping, speed controls, visual notation authoring, longer scores, narrow layouts, applying library edits to Session Plans, persistence, recovery and full progression workflows. They are unnecessary to choose this composition. Single Guitar Pro file import is demonstrated in selected A, round 6.

No production delivery, issue updates, storage, backend, deployment or independent QA cycle is part of this round. Reload resets everything. The player selected A · Inline reference. Its feedback rounds are recorded below; B/C and their first-round screenshots remain comparison evidence.

## Selected A · round 2

The player chose A and requested a disclosure arrow beside Instructions. The question for this slice is whether the player can make more room for the tab while keeping the text easy to recover. Instructions open by default. Clicking the label/arrow or using Enter/Space toggles only the free-form text. Each Exercise remembers its choice in memory across Learning/Mastery, history and library navigation. The practice and library views share that choice. Editing the Instructions does not reset it. Reload returns to the default open state.

| Capability | Chosen location | Status | Source |
| --- | --- | --- | --- |
| Hide/show Instructions | Arrow beside Instructions in A practice and library | Demonstrated | Current annotation 1 |
| Keep tablature visible | Separate card below the disclosure | Demonstrated | Original alphaTab request |
| Retain exercise state and drafts | In-memory exercise-owned disclosure map | Demonstrated | Current refinement and UI Explore deepening guidance |
| Persistent display preferences | Later round | Not explored | Disposable prototype boundary |

## Selected A · round 3

Current user direction supersedes the earlier separate Explanation, Hint and Criterion presentation for the selected prototype. Consolidate that authored material into free-form Instructions, including the library's authoring form. Remove Show guidance from A. Preserve the tab, disclosure, Practice Goal association, check-in and independent Latest Result display. Preserve B/C as comparison evidence.

Existing sample prose is merged once when fixtures initialize; edits thereafter use the one Instructions field. Library text edits still do not rewrite the current session's existing material. No tracker resolutions, original reference assets, domain glossary, persistent data or production workflows are modified. This slice asks whether a single editable, foldable material area supplies enough clarity without extra sections.

## Selected A · round 4

The player requested learning goals in the Exercise library: a goal defines the objective, and exercises supply ways to reach it. This slice asks whether goal authoring and the exercise roll-up make that relationship clear. Keep the library's two-column composition. Goal objectives become selectable group headings; the right panel shows the selected goal or Exercise.

| Capability | Chosen location | Status | Source |
| --- | --- | --- | --- |
| Create a goal with an objective and optional notes | New goal beside New exercise; inline editor | Demonstrated | Current goal request |
| Edit a goal while retaining its exercises | Edit goal beside group heading and in summary | Demonstrated | Accepted goal suggestions |
| Begin with an empty goal | Left group and right empty summary | Demonstrated | Accepted goal suggestions |
| Add an Exercise to a goal | Add exercise in group and summary; preselected goal | Demonstrated | Accepted goal suggestions |
| See supporting activity | Goal summary: supporting, learned and checked-in Exercise counts; latest reflection | Demonstrated | Accepted roll-up suggestion |
| Preserve authored drafts during navigation | In-memory goal-owned drafts | Demonstrated | UI Explore deepening guidance |
| Declare goal achievement and maintain history | Later round | Not explored | Existing evidence policy and disposable boundary |

Each Exercise belongs to one goal in this exploration. Each goal can contain zero or more Exercises. Goal names can change without changing their IDs or Exercise associations. Supporting activity does not automatically complete the goal. The current preview keeps one check-in per active practice target, so the count is labelled **Exercises checked in**; it is not a count of historical practice sessions. Goal notes are optional context for the objective. Exercise directions remain in Instructions.

Fixture membership and the current Learning/Mastery targets supply the roll-up. New goals and Exercises do not rewrite the active Session Plan. Search and filters remain available above the library; normal practice keeps the existing score and check-in composition. No production data model, storage, deletion, goal achievement controls or tracker updates are added. Inspect this round at the annotated 1445 × 1301 viewport, 100% zoom.

## Selected A · round 5

The player accepted the goal flow and requested folding Exercises into their parent goal. Add a disclosure arrow beside each library goal objective. This slice asks whether collapsing a goal reduces list density while preserving access to its summary and current Exercise.

The arrow controls the sequence label, Exercise rows and Add exercise shortcut below that goal. Its objective, Edit goal and exercise count remain visible. The objective still opens the goal summary. Groups begin expanded; an in-memory map keyed by goal ID retains independent display choices across navigation, filters and renames. Folding changes only the list region and keeps the selected Exercise, score and editing draft in place. Selecting an Exercise from the summary or saving one opens its parent group for orientation. Reload resets disclosure choices. Mouse, Enter and Space activation and aria-expanded/aria-controls are demonstrated. No persistence or production scope is added.

## Selected A · round 6

The player prefers uploading existing Guitar Pro tabs and editing them in GP8. The slice asks whether local import, track preview and file replacement support that workflow clearly. Upload Guitar Pro is visible beside the tab view controls. The file picker and preview open on request; replacing the attachment requires an explicit Attach/Replace action after parsing and rendering. Cancel and invalid files retain the applied material. Instructions stay separate.

| Capability | Chosen location | Status | Source |
| --- | --- | --- | --- |
| Choose a Guitar Pro file | Upload Guitar Pro in A practice/library tab heading | Demonstrated | Current annotation |
| Preview and select a track | Inline import panel | Demonstrated with actual GP8 and GP5 files | Current preference and [format support](https://alphatab.net/docs/formats/guitar-pro-8/) |
| Edit imported music | Edit original in GP8, then Replace Guitar Pro | Replacement demonstrated; external editor remains player-owned | Current preference |
| Retain per-Exercise tab ownership | In-memory file/track maps shared between library and practice | Demonstrated | Original alphaTab request |
| Remove attachment, retain Instructions | Tab options below heading | Demonstrated | Existing tab behavior |
| Excerpts, bulk imports and durable file storage | Later round | Not explored | Disposable scope |

The importer reads local bytes through [ScoreLoader.loadScoreFromBytes](https://alphatab.net/docs/reference/types/importer/scoreloader/). The parsed Score renders through the existing alphaTab instance with a selected track index. Pending previews remain separate from applied tabs and survive navigation. Unsupported or locked files show a nearby error. This round neither sends files to a server nor writes back to the original file. Reload resets all attachments and drafts. Audio remains disabled; full selected tracks are displayed rather than excerpts. Compatibility fixtures come from [alphaTab test data](https://github.com/CoderLine/alphaTab/tree/develop/packages/alphatab/test-data); they are temporary verification inputs, not new curriculum content.
