// Selected A: local Guitar Pro files, held in memory and owned by an Exercise.
const gpTabFiles = new Map(), gpTabDrafts = new Map(), gpTabOpen = new Map();
const gpReadRequests = new Map();
function gpTrackOptions(score, selected) {
    return score.tracks.map(track => `<option value="${track.index}" ${track.index === selected ? 'selected' : ''}>${track.index + 1} · ${escapeText(track.name || 'Unnamed track')}</option>`).join('');
}
function gpPanelMarkup(key, hostId) {
    const draft = gpTabDrafts.get(key), applied = gpTabFiles.get(key);
    return `<section class="gp-import-panel" id="${hostId}-import-panel" ${gpTabOpen.get(key) ? '' : 'hidden'} aria-label="Guitar Pro import">
        <h4>${applied ? 'Replace Guitar Pro tab' : 'Upload Guitar Pro tab'}</h4>
        <p class="gp-help">Choose a file, preview a track, then attach it to this exercise.</p>
        <label class="gp-field-label" for="${hostId}-file">Guitar Pro file</label><input id="${hostId}-file" type="file" accept=".gp,.gpx,.gp3,.gp4,.gp5">
        <p class="gp-help">GP8/GP7 .gp · GP6 .gpx · GP3–5. Files stay on this device in this preview.</p>
        <div id="${hostId}-import-content">${draft ? gpPreviewMarkup(draft, hostId) : ''}</div>
        <p class="tab-error" id="${hostId}-import-status" role="status"></p>
        <div class="editor-buttons"><button id="${hostId}-import-cancel">Cancel</button><button class="primary" id="${hostId}-import-apply" disabled>${applied ? 'Replace attached tab' : 'Attach tab'}</button></div>
    </section>`;
}
function gpPreviewMarkup(draft, hostId) {
    return `<p class="gp-file-name">${escapeText(draft.name)}${draft.score.title ? ' · ' + escapeText(draft.score.title) : ''}</p>
        <label class="gp-field-label" for="${hostId}-preview-track">Track to attach</label><select id="${hostId}-preview-track">${gpTrackOptions(draft.score, draft.trackIndex)}</select>
        <p class="gp-preview-label">Preview · selected track</p><div class="score-frame gp-preview"><div class="alpha-host" id="${hostId}-import-preview" aria-label="Guitar Pro track preview"></div></div>`;
}
function gpTrackMarkup(key, hostId) {
    const file = gpTabFiles.get(key);
    return file ? `<div class="gp-attached-track"><label for="${hostId}-track">Track</label><select id="${hostId}-track">${gpTrackOptions(file.score, file.trackIndex)}</select><span>Edit in Guitar Pro, save, then replace the file here.</span></div>` : '';
}
function renderGpPreview(key, hostId) {
    const draft = gpTabDrafts.get(key), host = $(hostId + '-import-preview');
    if (!draft || !host) return;
    destroyTab(hostId + '-import-preview');
    const apply = $(hostId + '-import-apply'), status = $(hostId + '-import-status');
    apply.disabled = true;
    try {
        const api = new alphaTab.AlphaTabApi(host, tabApiSettings(scoreModes.get(key) || 'tab'));
        liveTabs.set(hostId + '-import-preview', api);
        api.error.on(() => { if (status.isConnected) { status.textContent = 'This track could not be displayed. Choose another track or file.'; apply.disabled = true; } });
        api.renderFinished.on(() => { if (apply.isConnected && gpTabDrafts.get(key) === draft) { apply.disabled = false; status.textContent = ''; } });
        api.renderScore(draft.score, [draft.trackIndex]);
        $(hostId + '-preview-track').onchange = event => {
            draft.trackIndex = Number(event.target.value); renderGpPreview(key, hostId);
        };
    } catch { status.textContent = 'This track could not be displayed. Choose another file.'; }
}
function mountGpImport(key, hostId, rerender) {
    const upload = $(hostId + '-upload'), panel = $(hostId + '-import-panel');
    if (!upload) return;
    upload.onclick = () => {
        gpTabOpen.set(key, true); panel.hidden = false;
        $(hostId + '-editor').hidden = true;
        if (gpTabDrafts.has(key)) renderGpPreview(key, hostId);
        $(hostId + '-file').focus();
    };
    $(hostId + '-file').onchange = async event => {
        const file = event.target.files[0];
        if (!file) return;
        const request = {}; gpReadRequests.set(key, request);
        const status = $(hostId + '-import-status');
        $(hostId + '-import-apply').disabled = true;
        gpTabDrafts.delete(key); destroyTab(hostId + '-import-preview');
        $(hostId + '-import-content').innerHTML = '';
        status.textContent = 'Reading Guitar Pro file…';
        try {
            if (!/\.(gp|gpx|gp3|gp4|gp5)$/i.test(file.name)) throw new Error('format');
            const bytes = new Uint8Array(await file.arrayBuffer());
            if (gpReadRequests.get(key) !== request) return;
            const score = alphaTab.importer.ScoreLoader.loadScoreFromBytes(bytes, new alphaTab.Settings());
            if (!score.tracks.length || !score.masterBars.length) throw new Error('empty');
            const first = score.tracks.find(track => !track.isPercussion && track.staves.some(staff => staff.tuning.length)) || score.tracks[0];
            const draft = { name: file.name, bytes, score, trackIndex: first.index };
            gpTabDrafts.set(key, draft);
            if (status.isConnected) {
                $(hostId + '-import-content').innerHTML = gpPreviewMarkup(draft, hostId);
                renderGpPreview(key, hostId);
            }
        } catch {
            if (gpReadRequests.get(key) === request && status.isConnected) status.textContent = 'This file could not be read. Choose a valid, unlocked Guitar Pro file. Your attached tab is unchanged.';
        }
    };
    $(hostId + '-import-cancel').onclick = () => {
        gpReadRequests.delete(key); gpTabDrafts.delete(key); gpTabOpen.set(key, false);
        destroyTab(hostId + '-import-preview'); panel.hidden = true;
        $(hostId + '-import-content').innerHTML = ''; $(hostId + '-file').value = '';
        $(hostId + '-import-status').textContent = ''; upload.focus();
    };
    $(hostId + '-import-apply').onclick = () => {
        const draft = gpTabDrafts.get(key);
        if (!draft || $(hostId + '-import-apply').disabled) return;
        gpTabFiles.set(key, draft); tabSources.delete(key); tabDrafts.delete(key);
        gpTabDrafts.delete(key); gpReadRequests.delete(key); gpTabOpen.set(key, false);
        rerender(); $(hostId + '-upload').focus();
    };
    if (gpTabOpen.get(key) && gpTabDrafts.has(key)) renderGpPreview(key, hostId);
}
