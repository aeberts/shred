# Tablature components for Shred

Researched 2026-10-02. Planning context: [Research tablature components for Shred](https://github.com/aeberts/shred/issues/4), within [Wayfinder: Shred first usable version](https://github.com/aeberts/shred/issues/1).

## Finding

**alphaTab is the strongest candidate to evaluate if Shred needs imported guitar exercises, playback, and passage loops.** VexFlow is a credible option for displaying exercises that Shred describes in its own structured format. OpenSheetMusicDisplay is a credible MusicXML display alternative. abcjs is viable when exercises are supplied as ABC notation, but needs closer scrutiny for prescribed string and fret positions. These are research recommendations, not a component selection or a decision to include tablature in the first version.

The conclusions below come from official documentation, pinned source files, and GitHub release and commit metadata. No component was installed or tested in Shred. Integration complexity and local-operation conclusions are inferences from these sources.

## Comparison

| Candidate | Exercise input and display | Audio and practice controls | Fit for Shred |
| --- | --- | --- | --- |
| **alphaTab** | Guitar Pro 3–7, MusicXML, CapXML, and alphaTex; notation and guitar tablature. | Built-in MIDI synthesis using a SoundFont; selectable playback range, looping, speed control, seek, and cursor. | Broadest documented match for imported guitar exercises. Shred must supply its application controls. [Introduction](https://alphatab.net/docs/introduction), [API](https://alphatab.net/docs/reference/api/). |
| **VexFlow** | TypeScript rendering API; explicit notes, strings, frets, and layout. SVG or Canvas. It is not a documented Guitar Pro or MusicXML import/player pipeline. | No integrated audio player or passage-loop workflow found in its documented renderer API. Shred would supply them. | Good for small exercises generated from Shred's own data; substantially more work for imported scores and audio. [README](https://github.com/vexflow/vexflow/blob/5.0.0/README.md), [TabNote source](https://github.com/vexflow/vexflow/blob/5.0.0/src/tabnote.ts). |
| **OpenSheetMusicDisplay (OSMD)** | MusicXML, including guitar tablature, bends, and glissandi; built on VexFlow. | Public package is a renderer; official README advertises the audio player as sponsor early access. | Useful if MusicXML display is sufficient. Sponsor playback terms and local-operation behavior need separate investigation before depending on it. [README](https://github.com/opensheetmusicdisplay/opensheetmusicdisplay/blob/2.2.0/README.md). |
| **abcjs** | ABC text; guitar tablature generated below standard notation, with tuning and capo options. | Web Audio synthesis, seek, whole-tune loop, tempo control, and animation callbacks. A selectable A–B passage-loop control was not established. | Useful for ABC-based exercises; no Guitar Pro import found. Exact fingering fidelity remains an open check. [Tablature](https://docs.abcjs.net/visual/tablature), [Audio](https://docs.abcjs.net/audio/synthesized-sound). |

## alphaTab: most complete practice candidate

The documented loaders accept a score model, `ArrayBuffer`, `Uint8Array`, or a URL. This means Shred can provide a selected local file's bytes without uploading the exercise. alphaTex provides a textual way to write exercises. Format support does not establish faithful rendering of every possible file or playing technique. [Load API](https://alphatab.net/docs/reference/api/load), [alphaTex](https://alphatab.net/docs/alphatex/introduction).

Playback has a range expressed in MIDI ticks, a loop switch, and a relative speed setting. Default interaction supports mouse selection of a playback range and seeking by clicking a beat. These are useful primitives for repeating a passage at reduced speed. Shred still needs controls and must save any exercise position or loop that should survive reopening. [Playback range](https://alphatab.net/docs/reference/api/playbackrange), [Looping](https://alphatab.net/docs/reference/api/islooping), [Speed](https://alphatab.net/docs/reference/api/playbackspeed), [User interaction](https://alphatab.net/docs/reference/settings/player/enableuserinteraction).

There is an official Vite plugin. It handles Web Workers and Audio Worklets and copies fonts and the bundled SONiVOX SoundFont to the build. The plugin manifest at v1.8.4 declares Vite `^7 || ^8` and Node `>=20.19.0`; Shred's current package manifest uses Vite `^8.3.0` and a compatible Node range. This is declared compatibility, not a tested integration. TypeScript declarations and ESM exports are supplied. [Vite guide](https://alphatab.net/docs/getting-started/installation-vite), [Plugin package](https://github.com/CoderLine/alphaTab/blob/v1.8.4/packages/vite/package.json), [Library package](https://github.com/CoderLine/alphaTab/blob/v1.8.4/packages/alphatab/package.json), [Shred package](https://github.com/aeberts/shred/blob/7f9e92d/package.json).

**Local operation is feasible by configuration:** serve the script, workers, worklet, fonts, SoundFont, and exercises from the local app. The tutorial's CDN URLs are examples, not a requirement. SoundFonts may be loaded from bytes or a local URL; SF2 and SF3 are supported. No remote synthesis service is documented. This does not imply that Shred works while its local server is stopped or that browser storage is already solved. [Web installation](https://alphatab.net/docs/getting-started/installation-web), [SoundFont loading](https://alphatab.net/docs/reference/api/loadsoundfont).

alphaTab describes itself as an SDK rather than a complete drop-in component. React mounting, cleanup, errors, track choice, controls, and persistence remain application work. Complexity is moderate for a simple viewer/player and higher for editing or reliable restoration of passages. This estimate follows the library's documented integration model. [Introduction](https://alphatab.net/docs/introduction), [Web installation](https://alphatab.net/docs/getting-started/installation-web).

## Alternatives and asset constraints

**VexFlow:** its npm package provides ESM exports and TypeScript types, making Vite integration plausible. Its version 5 example loads Bravura and Academico web fonts from a CDN; a local app should serve chosen fonts locally and retain their notices. Rendering is comparatively simple when Shred already knows the notes and frets. Parsing supplied scores and building a player would add separate responsibilities. [Package](https://github.com/vexflow/vexflow/blob/5.0.0/package.json), [README](https://github.com/vexflow/vexflow/blob/5.0.0/README.md).

**OSMD:** the official quick start uses an npm import and loads MusicXML or compressed `.mxl`. Local score bytes/text and a locally bundled renderer avoid requiring a score service. The public renderer has TypeScript support; compatibility with this exact Vite build remains untested. Its cursor is not evidence that the public package has synthesized audio. [Getting started](https://github.com/opensheetmusicdisplay/opensheetmusicdisplay/wiki/Getting-Started), [README](https://github.com/opensheetmusicdisplay/opensheetmusicdisplay/blob/2.2.0/README.md).

**abcjs:** the package supplies TypeScript declarations. Audio normally fetches samples from a remote SoundFont location; the audio guide explicitly allows local samples through `soundFontUrl`. Its controller provides looping and tempo controls, but loops the tune. Its documented tablature options do not establish control of every note's string/fret choice; test this before using it for positional fretboard exercises. Local sample licensing must be checked separately from the MIT code license. [Package](https://github.com/paulrosen/abcjs/blob/v6.7.1/package.json), [Audio guide](https://docs.abcjs.net/audio/synthesized-sound), [Tablature guide](https://docs.abcjs.net/visual/tablature), [Sample repository notes](https://paulrosen.github.io/midi-js-soundfonts/).

For browser audio, allow an explicit player action to start sound. AudioWorklets require a secure context; localhost and loopback addresses qualify. This fits a locally served Mac app. Audio device behavior, browser permissions, and actual Safari/Chrome operation should be checked when a component is chosen. [Mozilla autoplay guide](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay), [AudioWorklet](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorklet), [Secure contexts](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Secure_Contexts).

## License and maintenance snapshot

Dates are UTC dates from GitHub metadata, checked on 2026-10-02. A recent commit shows activity, not a support guarantee.

| Candidate | Code license verified | Latest published release observed | Recent default-branch activity observed |
| --- | --- | --- | --- |
| alphaTab | [MPL-2.0](https://github.com/CoderLine/alphaTab/blob/v1.8.4/packages/alphatab/LICENSE). Integrated library notices are listed in [LICENSE.header](https://github.com/CoderLine/alphaTab/blob/v1.8.4/packages/alphatab/LICENSE.header). | [v1.8.4](https://github.com/CoderLine/alphaTab/releases/tag/v1.8.4), 2026-07-05 | [Commit](https://github.com/CoderLine/alphaTab/commit/20942cf2ebb49eb2db93cfba270a8fd85852685b), 2026-10-01 |
| VexFlow | [MIT](https://github.com/vexflow/vexflow/blob/5.0.0/LICENSE) | [5.0.0](https://github.com/vexflow/vexflow/releases/tag/5.0.0), 2025-03-05 | [Commit](https://github.com/vexflow/vexflow/commit/192c46554f574d6beeb08c71ef42de5308521521), 2026-09-16 |
| OSMD | [BSD-3-Clause](https://github.com/opensheetmusicdisplay/opensheetmusicdisplay/blob/2.2.0/LICENSE) for public code; sponsor player terms not established here. | [2.2.0](https://github.com/opensheetmusicdisplay/opensheetmusicdisplay/releases/tag/2.2.0), 2026-10-02 | [Commit](https://github.com/opensheetmusicdisplay/opensheetmusicdisplay/commit/e4aea3880df75d39ae3fdfaffbd1fbca72138c81), 2026-10-02 |
| abcjs | [MIT](https://github.com/paulrosen/abcjs/blob/v6.7.1/LICENSE.md) | [v6.7.1](https://github.com/paulrosen/abcjs/releases/tag/v6.7.1), 2026-09-21 | [Commit](https://github.com/paulrosen/abcjs/commit/914065f99e2eb0c45b046d698b939bc71a8b8d40), 2026-09-21 |

The bundled alphaTab SONiVOX asset carries [Apache-2.0](https://github.com/CoderLine/alphaTab/blob/v1.8.4/packages/alphatab/font/sonivox/LICENSE). Bravura is licensed under SIL OFL-1.1 by its [upstream font project](https://github.com/steinbergmedia/bravura). Library, font, sample, and supplied exercise notices are separate. Preserve relevant notices for whichever package and assets are used.

VexTab is a text syntax/reference implementation associated with VexFlow, but **its license differs from VexFlow's MIT license**: non-commercial use is allowed and commercial use requires contacting the author. It is not the preferred default input path for Shred given the other candidates. [VexTab license](https://github.com/0xfe/vextab/blob/3a5e00d858ae98934ba545f9bef5eb923e17e402/LICENSE).

## Inputs for the human scope decision

1. Obtain one or two real supplied exercises and identify their source format. A Guitar Pro file, MusicXML score, ABC text, PDF/image, and plain ASCII tab imply different paths.
2. Decide whether first-version practice requires display only, synthesized playback, tempo adjustment, or repeating a selected passage. alphaTab supports the widest documented combination.
3. If playback/import is required, evaluate alphaTab first with the actual exercise, its required string/fret positions, and a selected loop. Confirm local-only asset loading, a production Vite build, and behavior in the player's chosen Mac browser. No integration proof was required or attempted in this research ticket.
4. If no component fits the actual material, a low-complexity fallback is supplied text or locally stored image/PDF material alongside practice guidance. This preserves the exercise without pretending it is machine-readable; it supplies no note-aware playback, timing, or loops. This fallback is a proposal for the later scope discussion.

The remaining product choices belong to [Define user-supplied exercises and tablature support](https://github.com/aeberts/shred/issues/5). This research establishes credible candidates and constraints; it does not resolve that ticket.
