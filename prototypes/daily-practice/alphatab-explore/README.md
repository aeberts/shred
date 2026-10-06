# Shred reference UI · Inline reference, round 6

The player approved **A · Inline reference through round 6** as Shred's new reference prototype on October 6, 2026. Future prototype work should extend this composition. It includes local Guitar Pro upload, track preview and replacement, collapsible goals, goal authoring and one free-form Instructions field above alphaTab. The default page has no variant selector; B/C remain available on a separate comparison archive.

Built from commit `d8e38c7f8eb4e67b46e82a677e1f9b98bd574fde`, on branch `codex/ui-explore-alphatab`. This supersedes the previous reference in `../ui-explore/`. Approval establishes the UI starting point; the React starter and production workflows remain separate.

From the repository root, run:

```sh
python3 -m http.server 4193 --bind 127.0.0.1
```

Open [Daily practice](http://127.0.0.1:4193/prototypes/daily-practice/alphatab-explore/) or the [Exercise library](http://127.0.0.1:4193/prototypes/daily-practice/alphatab-explore/?panel=library). Existing links with `variant=a` still open the approved reference. The left rail switches between these two destinations.

## Comparison archive

The separate `comparison.html` page retains the A/B/C selector and earlier alternatives as evidence:

- [A · Inline reference](http://127.0.0.1:4193/prototypes/daily-practice/alphatab-explore/comparison.html?variant=a): expanded routine beside Instructions, tab and check-in. Familiar composition; the check-in requires more scrolling.
- [B · Music stand](http://127.0.0.1:4193/prototypes/daily-practice/alphatab-explore/comparison.html?variant=b): compact routine beside wider Instructions and tab. Open the check-in below the score; expand the routine for full section labels and session reflection.
- [C · Practice desk](http://127.0.0.1:4193/prototypes/daily-practice/alphatab-explore/comparison.html?variant=c): timer and routine across the top, Instructions and tab beside the check-in. More reflection space; less routine detail.

Press Ctrl+C to stop a server you started. The server already running on 4193 can serve this directory. No npm install or build is needed for this prototype.

## Try the material

1. Start the Learning timer. Read the free-form Instructions and the D-major sample below them. In A, click the arrow or Instructions label to hide/show the text. Enter and Space also work. The tab stays visible, and each Exercise keeps its display choice across normal navigation. Reload restores the default open state.
2. Change View to Tab + notation.
3. Open Edit tab. Change the alphaTex source and select Apply tab. Invalid source keeps the previous score and shows a nearby error. Cancel restores the applied source. Remove tab leaves the free-form Instructions and an Add tab area.
4. Select Mastery. Switch between string sets 1–3 and 2–4. Each target has separate tab material.
5. Open the Exercise library. Select an exercise to see its Instructions and tab. Edit exercise continues to handle free-form text; Add/Edit tab handles separate notation. New exercise creates text first, then allows Add tab.

Tab edits are shared by the exercise in Daily practice and the library within this preview. Text editing retains the reference's behavior: library text edits do not update the current Session Plan. Changing direction in the comparison archive reloads the page and resets all edits, timers and check-ins. The approved reference has no comparison switcher.

Text/tab editors, routine adjustment and calendar remain available on request. In selected A, there are no separate Explanation, Hint or Criterion displays or editor fields, and no Show guidance control. All that material is editable as Instructions. B/C retain the earlier content structure as comparison evidence. No audio playback, backing track, loop controls, speed adjustment, visual score authoring, persistent storage, backend, production workflow or tracker update is implemented. Song reviews do not display the exercise tab. Mobile refinement and long-score behavior follow selection.

The local vendor directory contains alphaTab and Bravura assets with their licenses. No remote scripts or soundfonts are loaded, and the production dependency manifests were not changed. See [BRIEF.md](BRIEF.md) for constraints, capability placement and references; see [VISUAL-CHECK.md](VISUAL-CHECK.md) for the bounded checks.

## Screenshots

Current approved-reference captures at 1445 × 1301: [Daily practice](screenshots/reference-daily-practice.jpg) and [Exercise library](screenshots/reference-exercise-library.jpg). They show the approval banner and single reference composition. The images below retain the exploration history.

Captured at 1440 × 900 and normal zoom, with the same Learning fixture:

- [A · Inline reference](screenshots/a.jpg)
- [B · Music stand](screenshots/b.jpg)
- [C · Practice desk](screenshots/c.jpg)

Round 2 screenshots at the annotated 1445 × 1301 viewport: [Instructions open](screenshots/a-round-2-open.jpg) and [Instructions hidden](screenshots/a-round-2-closed.jpg). A is the approved reference; these earlier captures document its evolution.

## Round 3 · one Instructions field

The player's latest feedback removes separate Explanation, Hint and Criterion sections. The existing sample material has been moved into Instructions in Learning, Mastery and the Exercise library. Use Edit material in practice or Edit exercise in the library to change it. The tab remains below Instructions, and the disclosure still hides/shows only the free-form text. Latest Result remains separate from authored content.

Rendered screenshots: [Instructions open](screenshots/a-round-3-open.jpg), [Instructions hidden](screenshots/a-round-3-closed.jpg), at 1445 × 1301. Earlier screenshots record earlier rounds.

## Round 4 · goals and supporting exercises

1. Select a goal objective in the left list. Its summary shows supporting exercises, learned exercises and exercises with a saved check-in in this preview. The latest reflection comes from the current Learning/Mastery targets. These are activity counts; they do not set goal completion.
2. Select New goal. Enter the ability you want to develop and optional notes. Save the goal before adding exercises if useful.
3. Select Add exercise beneath a goal or in its summary. The form preselects that goal. An Exercise belongs to one goal and starts as Learning, outside a sequence. Its Instructions and optional tab remain exercise-owned.
4. Select Edit goal to change its objective or notes. Renaming retains the same supporting exercises. Cancel discards unapplied changes. Goal drafts survive navigation to practice and back.
5. Save a practice check-in in Daily practice, then open the matching goal summary. Its latest reflection updates. Saving again replaces that target's current check-in; this prototype does not maintain a check-in history.

Goal authoring and summaries use in-memory fixtures. Reload resets goals, exercises and check-ins. New library exercises do not become active Session Plan targets in this round. No goal completion control, automatic progress percentage, sequence authoring or production persistence is implemented.

Rendered screenshots at 1445 × 1301: [Goal summary](screenshots/a-round-4-goal.jpg), [New goal form](screenshots/a-round-4-goal-form.jpg), [Empty goal](screenshots/a-round-4-empty-goal.jpg). Example text is invented fixture material.

## Round 5 · fold exercises into their goal

Use the arrow beside a goal objective to hide or show its exercises. Enter and Space also work. The goal name, Edit goal and exercise count stay visible when folded. Select the goal name to open its summary independently of the disclosure. An open Exercise or editing draft stays in the right panel when its parent group is folded.

Each goal starts expanded and remembers its own choice during navigation, filtering and goal edits. Selecting an Exercise from the right-hand goal summary, or saving an Exercise, opens its parent group so the selected item is visible. Reload restores the expanded defaults.

Rendered screenshots at 1445 × 1301: [Exercises expanded](screenshots/a-round-5-expanded.jpg), [Triad exercises collapsed](screenshots/a-round-5-collapsed.jpg).

## Round 6 · Guitar Pro upload and replacement

1. Select Upload Guitar Pro in an Exercise's tab area. Choose a `.gp`, `.gpx`, `.gp3`, `.gp4` or `.gp5` file. GP8 and GP7 use `.gp`.
2. Select a track and inspect its preview. Select Attach tab to replace the sample or attach the file to a text-only Exercise. The original attached tab stays in place until you apply the preview.
3. Use Track beneath the attached file name to change the displayed track. The file and track choice follow the Exercise between the library and its matching practice target.
4. To edit imported music, open the original file in Guitar Pro, save your changes, then select Replace Guitar Pro here. Preview the replacement and select Replace attached tab. Cancel or an unreadable file leaves the attached tab intact.
5. Use Tab options → Remove tab to detach it while retaining Instructions. The earlier alphaTex editor remains available for sample/text-authored tabs; it does not edit an imported GP binary.

Files are parsed locally by vendored alphaTab 1.8.4, with audio disabled. The browser retains them only in memory; reload resets attachments. Import previews survive normal navigation. This round displays one complete track at a time; excerpt selection, bulk import, external Guitar Pro launching, file export and persistent storage remain outside the prototype.

The compatibility reference is [alphaTab's GP8 format guide](https://alphatab.net/docs/formats/guitar-pro-8/). Rendered checks used the alphaTab project's own GP8 and GP5 compatibility fixtures, not the player's files. Screenshots at 1445 × 1301: [Guitar Pro preview](screenshots/a-round-6-import-preview.jpg), [Attached Guitar Pro file](screenshots/a-round-6-attached.jpg). These test files contain short synthetic material.
