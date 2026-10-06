// The approved reference uses one Instructions field. The archive retains B/C content.
const simplifyExerciseContent = document.body.dataset.exploration !== 'true'
    || !['b', 'c'].includes(new URLSearchParams(location.search).get('variant'));
const blocks = [{ name: 'Learn something new', type: 'Learning', minutes: 15, summary: 'CAGED triads · strings 3–5', title: 'CAGED triads', subtitle: 'Strings 3–5 · Use triads freely in my playing', instructions: 'Choose a key. On strings 3–5:\n1. Play the root-position triad.\n2. Find the first and second inversions.\n3. Name each chord tone as you play.\nMove slowly between the three shapes.', criterion: 'Choose and connect three triad inversions deliberately in a chosen key.', note: 'Stay in D major. Start with the second inversion, then work back to the root.', learned: false }, { name: 'Make it stick', type: 'Mastery', minutes: 20, summary: 'CAGED triads · strings 1–3, 2–4', title: 'CAGED triads', subtitle: 'Strings 1–3 · Use triads freely in my playing', instructions: 'Choose a key. On strings 1–3:\n1. Play three triad inversions.\n2. Change position without pausing.\n3. Name each chord tone as you play.\nRepeat on strings 2–4 when ready.', criterion: 'Choose and connect three triad inversions deliberately in a chosen key.', note: 'Keep the top note smooth when changing inversions. Try G major next.', learned: true }, { name: 'Repertoire', type: 'Repertoire', minutes: 15, summary: 'Evening Loop review → Cedar Path · Intro–Verse', title: 'Evening Loop', subtitle: 'Whole-song memory review · Playable · due October 3', instructions: 'Play the whole song from memory.\n\nContinue to the end if time allows.\nA timer cue is not a review result.\n\nThen: Cedar Path · Intro → Verse.\nYour saved range is ready to practise.', criterion: 'Assess the whole-song performance when you finish.', note: 'Listen for the transition into the last verse. Keep going through small mistakes.', learned: true }];
const referenceInstructions = blocks.map(block => block.instructions);
if (simplifyExerciseContent) {
    blocks.slice(0, 2).forEach(block => {
        block.instructions = [block.instructions,
            'An inversion changes the lowest chord tone while keeping the triad.',
            'Find the nearest shared chord tone before moving.',
            block.criterion].join('\n\n');
    });
}

let active = 0, running = false, started = false, elapsed = [0, 0, 0], notes = blocks.map(b => b.note), guidance = false, historyDate = null, masteryTarget = 0, returnFocus = null;
const $ = id => document.getElementById(id);
const escapeText = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function renderRoutine() { $('routine').innerHTML = blocks.map((b, i) => `<button class="block ${active === i ? 'active' : ''}" data-block="${i}" aria-label="${escapeText('0' + (i + 1) + ' · ' + b.name + ' · ' + b.minutes + ' minutes')}" title="${escapeText(b.name)}" aria-pressed="${active === i}"><span class="number">0${i + 1}</span><span class="block-body"><span class="block-name">${b.name}</span><span class="block-purpose">${b.type}${i === 0 ? ' · one idea to explore' : i === 1 ? ' · build on what you know' : ' · put it into a song'}</span><span class="block-summary">${b.summary}</span></span><span class="duration">${b.minutes} min</span></button>`).join(''); document.querySelectorAll('[data-block]').forEach(button => button.onclick = () => { active = +button.dataset.block; running = false; historyDate = null; guidance = false; renderRoutine(); renderStand(); renderCalendar(); updateTimer(); document.querySelector(`[data-block="${active}"]`).focus(); }); }
function updateTimer() { const b = blocks[active], left = b.minutes * 60 - elapsed[active], s = Math.abs(left); $('timer-number').textContent = `${left < 0 ? '+' : ''}${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`; $('timer-label').textContent = b.type; $('timer-state').textContent = left < 0 ? 'overtime · continue or switch blocks' : `remaining · ${running ? 'practising' : elapsed[active] ? 'paused' : 'ready to start'}`; const actionLabel = running ? 'Pause' : elapsed[active] ? 'Resume' : 'Start'; $('timer-action').textContent = sessionCollapsed ? (running ? 'Ⅱ' : '▷') : (running ? 'Ⅱ  Pause' : elapsed[active] ? '▷  Resume' : '▷  Start block'); $('timer-action').setAttribute('aria-label', actionLabel + ' ' + b.type + ' timer'); $('timer-action').title = actionLabel + ' block'; $('session-status').textContent = started ? `${Math.floor(elapsed.reduce((a, b) => a + b, 0) / 60)} minutes logged · ${running ? 'practising' : 'paused'}` : 'Suggested routine · ready when you are'; }
$('timer-action').onclick = () => { running = !running; started = true; updateTimer(); };
setInterval(() => { if (running) {
    elapsed[active]++;
    updateTimer();
} }, 1000);
const recentHtml = () => `<div class="recent"><span class="small-label">Last practice</span><button onclick="openHistory(4)">Sunday, October 4<small>Morning · 42 min · ended</small></button><button onclick="openHistory(4)">Sunday, October 4<small>Evening · 18 min · unfinished</small></button><button onclick="openHistory(3)">Saturday, October 3<small>Afternoon · 38 min · ended</small></button></div>`;
function renderCalendar() { let days = '<span></span><span></span><span></span>'; for (let d = 1; d <= 31; d++)
    days += `<button class="day ${d === 5 ? 'today' : d > 5 ? 'future' : ''} ${[3, 4].includes(d) ? 'logged' : ''} ${historyDate === d ? 'selected' : ''}" ${d > 5 ? 'disabled' : ''} aria-label="October ${d}${d === 5 ? ', today' : ''}" onclick="${d === 5 ? 'returnToday()' : `openHistory(${d})`}">${d}</button>`; $('calendar').innerHTML = `<div class="panel-head calendar-head"><h2>Practice calendar</h2><span style="color:#8ea2a3">▦</span></div><div class="calendar-body"><p class="month">October 2026 <span>Local practice dates</span></p><div class="calendar-grid">${['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(x => `<span class="weekday">${x}</span>`).join('')}${days}</div><div class="calendar-foot"><span><i class="dot"></i>Practice logged</span><span>Select a day to look back</span></div></div>${recentHtml()}`; }
function renderStand() { if (historyDate !== null) {
    renderHistory();
    return;
} const b = blocks[active]; const subtitle = active === 1 ? `Strings ${masteryTarget === 0 ? '1–3' : '2–4'} · Use triads freely in my playing` : b.subtitle; const instructions = active === 1 && masteryTarget === 1 ? b.instructions.replaceAll('1–3', '2–4').replace('Repeat on strings 2–4 when ready.', 'Return to strings 1–3 when ready.') : b.instructions; $('stand').innerHTML = `<div class="panel-head"><h2>${b.name}</h2>${''}</div><p class="stand-kicker">${active === 2 ? 'SONG REVIEW' : 'EXERCISE · ' + (b.learned ? 'LEARNED' : 'LEARNING')}</p><h3 class="stand-title">${b.title}</h3><p class="stand-sub">${subtitle}</p>${active === 1 ? '<select class="target-select" aria-label="Mastery exercise" id="mastery-target"><option value="0">CAGED triads · strings 1–3</option><option value="1">CAGED triads · strings 2–4</option></select>' : ''}<div class="reading-grid"><div><div class="material-meta"><span class="small-label">${active === 2 ? 'Your review' : 'Instructions'}</span>${simplifyExerciseContent ? '' : `<button class="text-button" id="guidance-action">${guidance ? 'Hide guidance' : 'Show guidance'}</button>`}</div><pre class="material">${escapeText(instructions)}</pre>${simplifyExerciseContent ? (active === 1 ? '<p class="result-summary"><strong>Latest Result</strong> &nbsp; Partly met · October 4</p>' : active === 2 ? `<p class="criterion"><strong>Review</strong> &nbsp; ${b.criterion}</p>` : '') : `<div class="guidance" id="guidance" ${guidance ? '' : 'hidden'}><strong>Explanation</strong><br>An inversion changes the lowest chord tone while keeping the triad.<br><strong>Hint</strong><br>Find the nearest shared chord tone before moving.</div><p class="criterion"><strong>${active === 2 ? 'Review' : 'Criterion'}</strong> &nbsp; ${b.criterion}${active === 1 ? '<br><strong>Latest Result</strong> &nbsp; Partly met · October 4' : ''}</p>`}</div>${''}</div>${inlineActionPanel()}`; if ($('guidance-action')) $('guidance-action').onclick = () => { guidance = !guidance; $('guidance').hidden = !guidance; $('guidance-action').textContent = guidance ? 'Hide guidance' : 'Show guidance'; }; bindInlineActions(); if ($('mastery-target')) {
    $('mastery-target').value = masteryTarget;
    $('mastery-target').onchange = e => { masteryTarget = +e.target.value; renderStand(); $('mastery-target').focus(); };
} }
function openHistory(d) { closeCalendar(); historyDate = d; renderCalendar(); renderStand(); $('return-today').focus(); }
function returnToday() { const fromHistory = document.activeElement?.id === 'return-today'; const fromCalendar = $('calendar').contains(document.activeElement); closeCalendar(); historyDate = null; renderCalendar(); renderStand(); if (fromCalendar)
    $('calendar-trigger').focus();
else if (fromHistory) {
    const title = $('stand').querySelector('.stand-title');
    title.setAttribute('tabindex', '-1');
    title.focus({ preventScroll: true });
} }
function renderHistory() { const has = [3, 4].includes(historyDate); $('stand').innerHTML = `<div class="panel-head"><h2>October ${historyDate} · looking back</h2><span class="badge">Read-only</span></div><button class="text-button" id="return-today">← Return to today's session</button><div class="history">${has ? `<p>Illustrative sessions · current timer ${running ? 'continues' : 'stays paused'}.</p><div class="history-session"><strong>${historyDate === 4 ? 'Morning' : 'Afternoon'} · ${historyDate === 4 ? '42' : '38'} minutes · ended</strong><small>Planned: Learning 15 · Mastery 20 · Repertoire 15</small><small>Actual: Learning 12 · Mastery 18 · Repertoire ${historyDate === 4 ? '12' : '8'}</small><small>Practised: CAGED triads · strings 1–3</small><small>Result: Partly met · three inversions in D major</small><small>Review: Evening Loop · Playable</small><small>Selected range: Cedar Path · Intro → Verse</small><small>Session note: Keep chord changes quiet and even.</small></div>${historyDate === 4 ? '<div class="history-session"><strong>Evening · 18 minutes · unfinished</strong><small>Planned: 15 / 20 / 15 min · Actual: 0 / 18 / 0 min</small><small>CAGED triads · strings 2–4 · no Result recorded</small><small>Continuation: Try the same shapes in G major.</small></div>' : ''}` : '<p>No sessions on this date. Choose a marked date or return to today.</p>'}</div>`; $('return-today').onclick = returnToday; }
function openModal(title, html) { returnFocus = document.activeElement; $('modal-title').textContent = title; $('modal-content').innerHTML = html; $('modal-backdrop').classList.add('open'); $('close-modal').focus(); }
function closeModal() { $('modal-backdrop').classList.remove('open'); if (returnFocus?.isConnected)
    returnFocus.focus(); }
$('close-modal').onclick = closeModal;
$('modal-backdrop').onclick = e => { if (e.target === $('modal-backdrop'))
    closeModal(); };
document.addEventListener('keydown', e => { if (e.key === 'Escape' && $('modal-backdrop').classList.contains('open'))
    closeModal(); if (e.key === 'Tab' && $('modal-backdrop').classList.contains('open')) {
    const a = [...document.querySelectorAll('.modal button,.modal input,.modal textarea,.modal select')].filter(x => !x.disabled);
    if (e.shiftKey && document.activeElement === a[0]) {
        e.preventDefault();
        a.at(-1).focus();
    }
    else if (!e.shiftKey && document.activeElement === a.at(-1)) {
        e.preventDefault();
        a[0].focus();
    }
} });
let toastTimeout;
function toast(message) { $('toast').textContent = message; $('toast').classList.add('show'); clearTimeout(toastTimeout); toastTimeout = setTimeout(() => $('toast').classList.remove('show'), 3500); }
$('adjust').onclick = () => { openModal('Adjust routine', `<p class="sub">Suggested material is ready to use. Overrides are optional.</p>${blocks.map((b, i) => `<div class="duration-row"><span>${b.name}</span><input id="duration-${i}" type="number" min="0" max="180" value="${b.minutes}" aria-label="${b.type} minutes"></div>`).join('')}<label>Learning material</label><select><option>CAGED triads · strings 3–5</option><option>CAGED triads · strings 4–6</option></select><label>Mastery targets</label><p class="sub">CAGED triads · strings 1–3 and 2–4</p><label>Repertoire order</label><select><option>Song review → Section / Practice Range</option><option>Section / Practice Range → Song review</option></select><p class="sub">Material and order selection is a placement preview.</p><div class="row"><button id="defaults">Save as defaults</button><button class="primary" id="apply-routine">Apply durations</button></div><div id="adjust-feedback" role="status"></div>`); $('apply-routine').onclick = () => { let vals = blocks.map((b, i) => +$('duration-' + i).value); if (vals.some(v => !Number.isFinite(v) || v < 0 || v > 180)) {
    $('adjust-feedback').textContent = 'Use a duration from 0 to 180 minutes.';
    return;
} vals.forEach((v, i) => blocks[i].minutes = v); renderRoutine(); updateTimer(); document.querySelector('.rail-total').innerHTML = vals.reduce((a, b) => a + b, 0) + '<span>min</span>'; closeModal(); toast('Durations applied for this preview.'); }; $('defaults').onclick = () => { $('adjust-feedback').className = 'local-feedback'; $('adjust-feedback').textContent = 'Defaults are not saved in this preview.'; }; };
$('reflection').oninput = () => { $('reflection-status').textContent = 'Draft in this preview only'; };
$('end-session').onclick = () => { running = false; updateTimer(); openModal('Session reflection', `<p class="sub">${Math.floor(elapsed.reduce((a, b) => a + b, 0) / 60)} minutes logged · time only</p><p>${escapeText($('reflection').value) || 'No reflection written yet.'}</p><p class="sub" style="margin-top:15px">Ending and later continuation will be developed in the selected prototype. No assessment or evidence was recorded.</p><div class="row"><button class="primary" onclick="closeModal()">Return to practice</button></div>`); };
const noteDrafts = [...notes], materialDrafts = blocks.map(b => b.instructions), materialEditors = [false, false, false], actionFeedback = ['', '', ''];
function inlineActionPanel() {
    if (active !== 2)
        return checkInPanel();
    const repertoire = active === 2, b = blocks[active];
    const actions = repertoire ? [
        ['Song review', 'Record review', 'Assess the whole-song attempt.'],
        ['Section practice', 'Open range', 'Cedar Path · Intro → Verse.']
    ] : [
        ['Practice', 'I practised this', 'Confirm practice for today.'],
        ['Assessment', 'Record Result', 'Test against the criterion.'],
        ['Exercise learning', b.learned ? 'Return to learning' : 'I got this', b.learned ? 'Revisit this Exercise.' : 'Move this Exercise to mastery.'],
        ['Goal integration', 'Review goal', 'Judge repeated evidence.']
    ];
    return `<section class="practice-panel" aria-label="${repertoire ? 'Review' : 'Practice'} actions">
 <div class="practice-panel-head"><h4>${repertoire ? 'Review actions' : 'Practice actions'}</h4><button class="text-button" id="edit-material" aria-expanded="${materialEditors[active]}" aria-controls="inline-material-editor">${materialEditors[active] ? 'Hide editor' : 'Edit material'}</button></div>
 <div class="action-grid ${repertoire ? 'review-actions' : ''}">${actions.map(a => `<div class="action-item"><span class="action-label">${a[0]}</span><button data-preview-action="${a[1]}">${a[1]}</button><p>${a[2]}</p></div>`).join('')}</div>
 <div class="inline-note"><label for="inline-note-draft">${repertoire ? 'Review note' : 'Next time note'}</label><div class="inline-note-row"><textarea id="inline-note-draft">${escapeText(noteDrafts[active])}</textarea><div class="inline-note-controls"><button id="apply-inline-note">Save note</button><button class="text-button" id="discard-inline-note">Discard changes</button></div></div></div>
 <div class="inline-status" id="inline-action-feedback" role="status">${escapeText(actionFeedback[active])}</div>
 <div class="inline-material-editor" id="inline-material-editor" ${materialEditors[active] ? '' : 'hidden'}><label for="inline-instructions">Edit Instructions</label><textarea id="inline-instructions">${escapeText(materialDrafts[active])}</textarea><div class="editor-buttons"><button id="cancel-inline-material">Cancel edit</button><button id="apply-inline-material">Apply in preview</button></div></div>
 </section>`;
}
function bindInlineActions() {
    if (active !== 2) {
        bindCheckIn();
        return;
    }
    const target = active;
    const feedback = message => { actionFeedback[target] = message; $('inline-action-feedback').textContent = message; };
    $('inline-note-draft').oninput = () => { noteDrafts[target] = $('inline-note-draft').value; };
    $('apply-inline-note').onclick = () => { notes[target] = noteDrafts[target]; feedback('Note updated in this preview only.'); };
    $('discard-inline-note').onclick = () => { noteDrafts[target] = notes[target]; $('inline-note-draft').value = notes[target]; feedback('Draft discarded. Previous note restored.'); };
    document.querySelectorAll('[data-preview-action]').forEach(button => button.onclick = () => { feedback(`${button.dataset.previewAction}: this workflow is not implemented in this prototype. No evidence was recorded.`); });
    $('edit-material').onclick = () => { materialEditors[target] = !materialEditors[target]; $('inline-material-editor').hidden = !materialEditors[target]; $('edit-material').textContent = materialEditors[target] ? 'Hide editor' : 'Edit material'; $('edit-material').setAttribute('aria-expanded', String(materialEditors[target])); if (materialEditors[target])
        $('inline-instructions').focus(); };
    $('inline-instructions').oninput = () => { materialDrafts[target] = $('inline-instructions').value; };
    $('cancel-inline-material').onclick = () => { materialDrafts[target] = blocks[target].instructions; materialEditors[target] = false; renderStand(); $('edit-material').focus(); feedback('Edit cancelled. Previous Instructions kept.'); };
    $('apply-inline-material').onclick = () => { blocks[target].instructions = materialDrafts[target]; materialEditors[target] = false; renderStand(); $('edit-material').focus(); feedback('Instructions updated in this preview only.'); };
}
const confidenceLabels = ['shaky', 'coming along', 'comfortable', 'feeling it', 'nailed it'];
const checkInDrafts = new Map(), practiceCheckIns = new Map();
function checkInKey() { return active === 1 ? 'mastery-' + masteryTarget : 'learning'; }
function checkInDraft() { const key = checkInKey(); if (!checkInDrafts.has(key))
    checkInDrafts.set(key, { rating: null, thoughts: notes[active], feedback: '' }); return checkInDrafts.get(key); }
function checkInPanel() {
    const draft = checkInDraft(), saved = practiceCheckIns.has(checkInKey());
    return `<section class="practice-panel checkin-panel" aria-label="Practice check-in">
 <div class="practice-panel-head"><h4>Your practice check-in</h4><button class="text-button" id="edit-material" aria-expanded="${materialEditors[active]}" aria-controls="inline-material-editor">${materialEditors[active] ? 'Hide editor' : 'Edit material'}</button></div>
 <div class="rating-head"><label for="confidence-rating">How did it feel?</label><span class="rating-selection ${draft.rating !== null ? 'chosen' : ''}" id="rating-selection">${draft.rating === null ? 'Choose a rating · optional' : draft.rating + ' · ' + confidenceLabels[draft.rating - 1]}</span></div>
 <div class="rating-control"><input type="range" id="confidence-rating" min="1" max="5" step="1" value="${draft.rating ?? 3}" class="${draft.rating === null ? 'unrated' : ''}" aria-valuetext="${draft.rating === null ? 'Not rated' : draft.rating + ' · ' + confidenceLabels[draft.rating - 1]}"></div>
 <div class="rating-labels">${confidenceLabels.map((label, i) => `<button type="button" data-rating="${i + 1}" class="${draft.rating === i + 1 ? 'selected' : ''}" aria-pressed="${draft.rating === i + 1}"><span>${i + 1}</span>${label}</button>`).join('')}</div>
 <label class="thoughts-label" for="checkin-thoughts">Thoughts & next time</label><textarea class="checkin-thoughts" id="checkin-thoughts" placeholder="What felt solid? What needs another pass? Where will you start next time?">${escapeText(draft.thoughts)}</textarea>
 <div class="checkin-footer"><p class="sub">A check-in records your practice and reflection together.</p><button class="primary" id="save-checkin">${saved ? 'Update practice check-in' : 'Save practice check-in'}</button></div>
 <div class="checkin-status" id="checkin-status" role="status">${escapeText(draft.feedback)}</div>
 <div class="inline-material-editor" id="inline-material-editor" ${materialEditors[active] ? '' : 'hidden'}><label for="inline-instructions">Edit Instructions</label><textarea id="inline-instructions">${escapeText(materialDrafts[active])}</textarea><div class="editor-buttons"><button id="cancel-inline-material">Cancel edit</button><button id="apply-inline-material">Apply in preview</button></div></div>
 </section>`;
}
function bindCheckIn() {
    const target = active, key = checkInKey(), draft = checkInDraft();
    const feedback = message => { draft.feedback = message; $('checkin-status').textContent = message; };
    const chooseRating = value => { draft.rating = Number(value); $('confidence-rating').value = draft.rating; $('confidence-rating').classList.remove('unrated'); $('confidence-rating').setAttribute('aria-valuetext', draft.rating + ' · ' + confidenceLabels[draft.rating - 1]); $('rating-selection').textContent = draft.rating + ' · ' + confidenceLabels[draft.rating - 1]; $('rating-selection').classList.add('chosen'); document.querySelectorAll('[data-rating]').forEach(button => { const selected = Number(button.dataset.rating) === draft.rating; button.classList.toggle('selected', selected); button.setAttribute('aria-pressed', String(selected)); }); feedback('Unsaved check-in.'); };
    $('confidence-rating').oninput = e => chooseRating(e.target.value);
    $('confidence-rating').onkeydown = e => { if (draft.rating === null && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(e.key)) {
        e.preventDefault();
        chooseRating(e.key === 'End' ? 5 : e.key === 'Home' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? 2 : 4);
    } };
    document.querySelectorAll('[data-rating]').forEach(button => button.onclick = () => chooseRating(button.dataset.rating));
    $('checkin-thoughts').oninput = () => { draft.thoughts = $('checkin-thoughts').value; feedback('Unsaved check-in.'); };
    $('save-checkin').onclick = () => { const old = practiceCheckIns.get(key); practiceCheckIns.set(key, { id: old?.id || 'check-in-' + (practiceCheckIns.size + 1), target: key, updatedAt: Date.now(), material: document.querySelector('.stand-title').textContent, selection: document.querySelector('.stand-sub').textContent, date: '2026-10-05', confirmedPractice: true, rating: draft.rating, ratingLabel: draft.rating === null ? null : confidenceLabels[draft.rating - 1], thoughts: draft.thoughts }); $('save-checkin').textContent = 'Update practice check-in'; feedback(`Check-in ${old ? 'updated' : 'saved'} in this preview${draft.rating === null ? '' : ': ' + confidenceLabels[draft.rating - 1]}. Practice confirmed; your reflection is kept with this material. Refresh resets this preview.`); };
    $('edit-material').onclick = () => { materialEditors[target] = !materialEditors[target]; $('inline-material-editor').hidden = !materialEditors[target]; $('edit-material').textContent = materialEditors[target] ? 'Hide editor' : 'Edit material'; $('edit-material').setAttribute('aria-expanded', String(materialEditors[target])); if (materialEditors[target])
        $('inline-instructions').focus(); };
    $('inline-instructions').oninput = () => { materialDrafts[target] = $('inline-instructions').value; };
    $('cancel-inline-material').onclick = () => { materialDrafts[target] = blocks[target].instructions; materialEditors[target] = false; renderStand(); $('edit-material').focus(); feedback('Edit cancelled. Previous Instructions kept.'); };
    $('apply-inline-material').onclick = () => { blocks[target].instructions = materialDrafts[target]; materialEditors[target] = false; renderStand(); $('edit-material').focus(); feedback('Instructions updated in this preview only.'); };
}
let calendarOpen = false;
function closeCalendar(focusTrigger = false) { calendarOpen = false; $('calendar').hidden = true; $('calendar-trigger').setAttribute('aria-expanded', 'false'); if (focusTrigger)
    $('calendar-trigger').focus(); }
function openCalendar(focusDay = false) { calendarOpen = true; $('calendar').hidden = false; $('calendar-trigger').setAttribute('aria-expanded', 'true'); if (focusDay)
    $('calendar').querySelector('.selected,.today').focus(); }
{
    const oldDate = document.querySelector('.date');
    const menu = document.createElement('div');
    menu.className = 'date-menu';
    const trigger = document.createElement('button');
    trigger.className = 'date date-trigger';
    trigger.id = 'calendar-trigger';
    trigger.type = 'button';
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', 'calendar');
    trigger.innerHTML = '<span aria-hidden="true">▦</span> Monday, October 5, 2026 <span class="date-chevron" aria-hidden="true">⌄</span>';
    oldDate.replaceWith(menu);
    menu.append(trigger, $('calendar'));
    $('calendar').hidden = true;
    $('calendar').setAttribute('aria-label', 'Practice calendar');
    trigger.onclick = () => calendarOpen ? closeCalendar() : openCalendar();
    trigger.onkeydown = e => { if (e.key === 'ArrowDown') {
        e.preventDefault();
        openCalendar(true);
    } };
    document.addEventListener('pointerdown', e => { if (calendarOpen && !menu.contains(e.target))
        closeCalendar(); });
    document.addEventListener('focusin', e => { if (calendarOpen && !menu.contains(e.target))
        closeCalendar(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && calendarOpen) {
        e.preventDefault();
        closeCalendar(true);
    } });
}
let sessionCollapsed = false;
{
    const panel = document.querySelector('.today-panel');
    panel.id = 'session-panel';
    const toggle = document.createElement('button');
    toggle.id = 'routine-toggle';
    toggle.type = 'button';
    toggle.className = 'routine-splitter';
    toggle.innerHTML = '<span aria-hidden="true">‹</span>';
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-controls', 'session-panel');
    toggle.setAttribute('aria-label', 'Collapse routine');
    toggle.title = 'Collapse routine';
    panel.after(toggle);
    toggle.onclick = () => { sessionCollapsed = !sessionCollapsed; document.body.classList.toggle('session-collapsed', sessionCollapsed); $('routine').hidden = false; $('reflection-area').hidden = sessionCollapsed; toggle.innerHTML = sessionCollapsed ? '<span aria-hidden="true">›</span>' : '<span aria-hidden="true">‹</span>'; toggle.setAttribute('aria-expanded', String(!sessionCollapsed)); const label = sessionCollapsed ? 'Expand routine' : 'Collapse routine'; toggle.setAttribute('aria-label', label); toggle.title = label; updateTimer(); };
}
renderRoutine();
renderCalendar();
renderStand();
updateTimer();
