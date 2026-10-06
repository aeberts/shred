// Approved reference plus archived comparison. Fixtures live in memory; no audio or storage.
const variant = document.body.dataset.exploration === 'true'
    && ['a', 'b', 'c'].includes(new URLSearchParams(location.search).get('variant'))
    ? new URLSearchParams(location.search).get('variant') : 'a';
document.body.dataset.layout = variant;
document.querySelectorAll('[data-variant]').forEach(link => {
    link.setAttribute('aria-current', link.dataset.variant === variant ? 'page' : 'false');
    if (libraryViewOpen) link.href += '&panel=library';
});

const tabFixtures = new Map([
    ['triads-35', { strings: '3–5', chords: ['(5.5 4.4 2.3)', '(9.5 7.4 7.3)', '(12.5 12.4 11.3)'] }],
    ['triads-13', { strings: '1–3', chords: ['(7.3 7.2 5.1)', '(11.3 10.2 10.1)', '(14.3 15.2 14.1)'] }],
    ['triads-24', { strings: '2–4', chords: ['(12.4 11.3 10.2)', '(4.4 2.3 3.2)', '(7.4 7.3 7.2)'] }],
    ['triads-46', { strings: '4–6', chords: ['(10.6 9.5 7.4)', '(2.6 0.5 0.4)', '(5.6 5.5 4.4)'] }]
]);
const tabSources = new Map([...tabFixtures].map(([key, fixture]) => [key,
    '\\tempo 60\n.\n' + fixture.chords.map((chord, i) =>
        `\\section "${['Root position', '1st inversion', '2nd inversion'][i]}" :2 ${chord} ${chord}`
    ).join(' |\n')
]));
const tabDrafts = new Map(), scoreModes = new Map();
const originalTabSources = new Map(tabSources);
const instructionsExpanded = new Map();
function bindInstructionsDisclosure(key, material, prefix) {
    if (variant !== 'a') return;
    const expanded = instructionsExpanded.get(key) ?? true;
    material.id = prefix + '-instructions';
    material.hidden = !expanded;
    const label = material.previousElementSibling.querySelector?.('.small-label')
        || material.previousElementSibling;
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'small-label instructions-disclosure';
    toggle.id = prefix + '-instructions-toggle';
    toggle.dataset.instructionsKey = key;
    toggle.setAttribute('aria-controls', material.id);
    toggle.innerHTML = '<span class="instructions-arrow" aria-hidden="true">▸</span> Instructions';
    const update = (button, open) => {
        $(button.getAttribute('aria-controls')).hidden = !open;
        button.setAttribute('aria-expanded', String(open));
        button.title = (open ? 'Hide' : 'Show') + ' Instructions';
    };
    update(toggle, expanded);
    toggle.onclick = () => {
        const open = material.hidden;
        instructionsExpanded.set(key, open);
        document.querySelectorAll('.instructions-disclosure').forEach(button => {
            if (button.dataset.instructionsKey === key) update(button, open);
        });
    };
    label.replaceWith(toggle);
}
let checkInOpen = false;
const liveTabs = new Map();
function destroyTab(hostId) {
    for (const id of [hostId, hostId + '-import-preview']) {
        liveTabs.get(id)?.destroy(); liveTabs.delete(id);
    }
}
function tabApiSettings(mode) {
    return {
        core: { fontDirectory: 'vendor/alphatab/font/', useWorkers: false, engine: 'svg' },
        display: { staveProfile: mode === 'score' ? 'ScoreTab' : 'Tab', scale: 1, barsPerRow: 3, justifyLastSystem: true, padding: [12, 18, 8, 18] },
        player: { enablePlayer: false }
    };
}
function scoreMarkup(key, hostId, canEdit = true) {
    const fixture = tabFixtures.get(key), source = tabSources.get(key), file = variant === 'a' && gpTabFiles.get(key);
    const hasTab = source || file, isSample = !file && source && source === originalTabSources.get(key);
    return `<section class="tab-card" aria-label="Exercise tablature">
        <div class="tab-heading"><div><h4>Tablature</h4><p>${file ? escapeText(file.name) : source ? isSample ? `D major · strings ${fixture.strings} · 60 bpm` : 'Your tab material' : 'Optional material for this exercise'}</p></div>
        <div class="tab-tools">${hasTab ? `<label class="score-mode-label">View<select aria-label="Notation view" id="${hostId}-mode"><option value="tab">Tab</option><option value="score">Tab + notation</option></select></label>` : ''}${canEdit ? `${variant === 'a' ? `<button class="gp-upload-button" id="${hostId}-upload">${file ? 'Replace Guitar Pro' : 'Upload Guitar Pro'}</button>` : ''}<button class="text-button" id="${hostId}-edit">${file ? 'Tab options' : source ? 'Edit tab' : 'Add tab'}</button>` : ''}</div></div>
        ${variant === 'a' && canEdit ? gpPanelMarkup(key, hostId) + gpTrackMarkup(key, hostId) : ''}
        ${hasTab ? `<div class="score-frame"><div id="${hostId}" class="alpha-host" aria-label="${isSample ? 'D major triad inversions' : 'Exercise tab material'}"></div><p class="tab-error" id="${hostId}-error" role="status">Loading tablature…</p></div><p class="tab-caption">${isSample ? 'Three inversions · two slow strums per shape' : file ? 'Guitar Pro tab attached to this exercise' : 'Tab material attached to this exercise'}</p>` : `<div class="tab-empty">${variant === 'a' ? 'Keep text-only instructions, or upload a Guitar Pro tab below them.' : 'Keep text-only instructions, or add tablature below them.'}</div>`}
        <div class="tab-editor" id="${hostId}-editor" hidden>${file ? '<p class="gp-help">Edit the original file in Guitar Pro, save it, then use Replace Guitar Pro. Removing it here keeps your Instructions.</p>' : `<label for="${hostId}-source">Tab source · alphaTex</label><textarea id="${hostId}-source" spellcheck="false">${escapeText(tabDrafts.get(key) ?? source ?? '\\tempo 60\n.\n:4 0.6 2.6 3.6 2.6')}</textarea><p class="sub">Instructions above stay separate. Changes apply to this preview only.</p>`}<div class="editor-buttons"><button id="${hostId}-cancel">Cancel</button><button id="${hostId}-remove">Remove tab</button>${file ? '' : `<button class="primary" id="${hostId}-apply">Apply tab</button>`}</div><p id="${hostId}-validation" class="tab-error" role="status"></p></div>
    </section>`;
}
function mountTab(key, hostId, rerender) {
    const host = $(hostId), source = tabSources.get(key), mode = scoreModes.get(key) || 'tab', file = variant === 'a' && gpTabFiles.get(key);
    if (host && (source || file)) {
        try {
            if (!window.alphaTab) throw new Error('The local alphaTab library did not load.');
            const api = new alphaTab.AlphaTabApi(host, tabApiSettings(mode));
            liveTabs.set(hostId, api);
            const errorLabel = $(hostId + '-error');
            api.error.on(() => { if (errorLabel.isConnected) errorLabel.textContent = file ? 'This track could not be displayed. Choose another track or replace the file.' : 'This tab could not be rendered. Edit the tab source to correct it.'; });
            api.renderFinished.on(() => { if (errorLabel.isConnected) errorLabel.textContent = ''; });
            if (file) api.renderScore(file.score, [file.trackIndex]); else api.tex(source);
            if (file) $(hostId + '-track').onchange = event => { file.trackIndex = Number(event.target.value); api.renderScore(file.score, [file.trackIndex]); };
            $(hostId + '-mode').value = mode;
            $(hostId + '-mode').onchange = event => {
                scoreModes.set(key, event.target.value);
                api.settings.display.staveProfile = event.target.value === 'score' ? alphaTab.StaveProfile.ScoreTab : alphaTab.StaveProfile.Tab;
                api.updateSettings(); api.render();
            };
        } catch (error) { $(hostId + '-error').textContent = error.message; }
    }
    if (!$(hostId + '-edit')) return;
    if (variant === 'a') mountGpImport(key, hostId, rerender);
    $(hostId + '-edit').onclick = () => {
        if (variant === 'a') { gpTabOpen.set(key, false); $(hostId + '-import-panel').hidden = true; destroyTab(hostId + '-import-preview'); }
        $(hostId + '-editor').hidden = false; ($(hostId + '-source') || $(hostId + '-cancel')).focus();
    };
    if ($(hostId + '-source')) $(hostId + '-source').oninput = event => tabDrafts.set(key, event.target.value);
    $(hostId + '-cancel').onclick = () => { tabDrafts.delete(key); if ($(hostId + '-source')) $(hostId + '-source').value = source || ''; $(hostId + '-editor').hidden = true; $(hostId + '-edit').focus(); };
    $(hostId + '-remove').onclick = () => { tabSources.delete(key); gpTabFiles.delete(key); tabDrafts.delete(key); gpTabDrafts.delete(key); gpTabOpen.set(key, false); rerender(); $(hostId + '-edit').focus(); };
    if (!$(hostId + '-apply')) return;
    $(hostId + '-apply').onclick = () => {
        const value = $(hostId + '-source').value.trim();
        try {
            if (!value) throw new Error('Enter tab material, or use Remove tab.');
            const importer = new alphaTab.importer.AlphaTexImporter();
            importer.initFromString(value, new alphaTab.Settings());
            importer.readScore();
            tabSources.set(key, value); tabDrafts.delete(key); rerender(); $(hostId + '-edit').focus();
        } catch { $(hostId + '-validation').textContent = 'The tab source is not valid alphaTex. Correct it before applying.'; $(hostId + '-source').focus(); }
    };
}

const baseRenderStand = renderStand;
renderStand = function () {
    destroyTab('practice-score'); baseRenderStand();
    if (historyDate !== null || active === 2) return;
    const key = active === 0 ? 'triads-35' : masteryTarget === 0 ? 'triads-13' : 'triads-24';
    const reading = $('stand').querySelector('.reading-grid');
    reading.classList.add('exercise-reading');
    const material = reading.firstElementChild;
    bindInstructionsDisclosure(key, material.querySelector('.material'), 'practice');
    material.querySelector('.material').insertAdjacentHTML('afterend', scoreMarkup(key, 'practice-score'));
    if (variant === 'b') {
        const panel = $('stand').querySelector('.checkin-panel');
        panel.insertAdjacentHTML('beforebegin', `<button class="checkin-disclosure" id="checkin-disclosure" aria-expanded="${checkInOpen}" aria-controls="practice-checkin-body">${checkInOpen ? 'Hide' : 'Open'} practice check-in <span>Rating, thoughts & next time ${checkInOpen ? '⌃' : '⌄'}</span></button>`);
        panel.id = 'practice-checkin-body'; panel.hidden = !checkInOpen;
        $('checkin-disclosure').onclick = () => {
            checkInOpen = !checkInOpen; panel.hidden = !checkInOpen;
            $('checkin-disclosure').setAttribute('aria-expanded', String(checkInOpen));
            $('checkin-disclosure').innerHTML = `${checkInOpen ? 'Hide' : 'Open'} practice check-in <span>Rating, thoughts & next time ${checkInOpen ? '⌃' : '⌄'}</span>`;
        };
        // Editing stays reachable while the optional check-in is closed.
        const edit = $('edit-material');
        $('stand').querySelector('.panel-head').append(edit);
        const editor = $('inline-material-editor');
        $('stand').append(editor);
    }
    mountTab(key, 'practice-score', renderStand);
};
const baseLibraryDetail = renderLibraryDetail;
renderLibraryDetail = function (feedback = '') {
    destroyTab('library-score'); baseLibraryDetail(feedback);
    if (libraryEditing || !librarySelected) return;
    const material = $('library-detail').querySelector('pre.material');
    if (!material) return;
    bindInstructionsDisclosure(librarySelected, material, 'library');
    material.insertAdjacentHTML('afterend', scoreMarkup(librarySelected, 'library-score'));
    if (libraryViewOpen) mountTab(librarySelected, 'library-score', renderLibraryDetail);
};
const baseLibraryEditor = renderLibraryEditor;
renderLibraryEditor = function () { destroyTab('library-score'); baseLibraryEditor(); };
const baseShowLibrary = showLibrary;
showLibrary = function (open) {
    baseShowLibrary(open);
    if (open) renderLibraryDetail();
    else liveTabs.get('practice-score')?.render();
    document.querySelectorAll('[data-variant]').forEach(link => link.href = `?variant=${link.dataset.variant}${open ? '&panel=library' : ''}`);
};
// Refresh navigation handlers installed by the reference before these wrappers.
$('nav-library').onclick = () => showLibrary(true);
$('nav-daily').onclick = $('library-return').onclick = () => showLibrary(false);

if (variant === 'b') $('routine-toggle').click();
if (variant === 'c') {
    // C puts the timer and manual section navigation across the top.
    document.querySelector('.today-panel').insertAdjacentHTML('afterend', '<details class="session-reflection-disclosure"><summary>Session reflection</summary></details>');
    document.querySelector('.session-reflection-disclosure').append($('reflection-area'));
    document.querySelector('.page-head>div').append($('adjust'));
}
renderStand(); renderLibraryDetail();
