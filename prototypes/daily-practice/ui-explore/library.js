// Disposable library fixtures. No storage or Session Plan mutation.
const libraryGoals=[
 {id:'triads',name:'Use triads freely in my playing',criterion:'Choose and connect triad inversions deliberately in a chosen key.',sequence:'CAGED triads & voice leading'},
 {id:'fretboard',name:'Find notes across the fretboard',criterion:'Locate a requested note on any string without working up from an open string.',sequence:null}
];
const triadExplanation='An inversion changes the lowest chord tone while keeping the same three chord tones. Connect the shapes by finding the nearest shared note.';
const triadHints='Name the root first.\nLook for a chord tone that stays on the same fret.\nMove slowly enough to hear each voice.';
const libraryExercises=[
 {id:'triads-13',goal:'triads',title:'CAGED triads · strings 1–3',learned:true,order:1,instructions:blocks[1].instructions,explanation:triadExplanation,hints:triadHints,note:blocks[1].note},
 {id:'triads-24',goal:'triads',title:'CAGED triads · strings 2–4',learned:true,order:2,instructions:blocks[1].instructions.replaceAll('1–3','2–4').replace('Repeat on strings 2–4 when ready.','Return to strings 1–3 when ready.'),explanation:triadExplanation,hints:triadHints,note:'Start in G major. Keep the top note smooth.'},
 {id:'triads-35',goal:'triads',title:'CAGED triads · strings 3–5',learned:false,order:3,current:true,instructions:blocks[0].instructions,explanation:triadExplanation,hints:triadHints,note:blocks[0].note},
 {id:'triads-46',goal:'triads',title:'CAGED triads · strings 4–6',learned:false,order:4,instructions:'Choose a key. On strings 4–6:\n1. Find the root-position triad.\n2. Find its first and second inversions.\n3. Name the chord tones as you play.\nConnect the three shapes slowly.',explanation:triadExplanation,hints:triadHints,note:''},
 {id:'voice-leading',goal:'triads',title:'Connect I–IV–V triads',learned:false,order:5,instructions:'Choose one key and one string set.\n1. Play I, IV and V using the nearest triad shapes.\n2. Keep common tones where possible.\n3. Listen for the smallest movement in each voice.\nTry another position when the changes feel clear.',explanation:'Voice leading follows the movement of each note through a progression.',hints:'Keep one shared note in place when you can.',note:''},
 {id:'fretboard-notes',goal:'fretboard',title:'Find a note on every string',learned:false,order:null,instructions:'Choose a note at random.\nFind it once on each of the six strings.\nSay the note name before playing.\nRepeat with a different note.',explanation:'The same note appears in several places on the fretboard.',hints:'Use the octave shapes to check your answer.',note:''}
];
let librarySelected='triads-35',libraryEditing=null,libraryViewOpen=false,libraryNewCount=0;
const libraryDrafts=new Map();
let libraryQuery='',libraryGoalFilter='all',libraryStateFilter='all';
const libraryDailyView=document.querySelector('main.main');

function libraryStateName(exercise){return exercise.learned?'Mastery':'Learning';}
function librarySequence(goalId){return libraryExercises.filter(exercise=>exercise.goal===goalId&&exercise.order!==null).sort((a,b)=>a.order-b.order);}
function libraryVisibleExercises(){const query=libraryQuery.trim().toLowerCase();return libraryExercises.filter(exercise=>{const goal=libraryGoals.find(item=>item.id===exercise.goal);return (libraryGoalFilter==='all'||exercise.goal===libraryGoalFilter)&&(libraryStateFilter==='all'||libraryStateName(exercise).toLowerCase()===libraryStateFilter)&&(!query||[exercise.title,goal.name,exercise.instructions].join(' ').toLowerCase().includes(query));});}

function renderLibraryList(){
 const visible=libraryVisibleExercises();
 $('library-count').textContent=`${visible.length} ${visible.length===1?'exercise':'exercises'}`;
 $('library-list').innerHTML=visible.length?libraryGoals.map(goal=>{
  const exercises=visible.filter(exercise=>exercise.goal===goal.id);if(!exercises.length)return '';
  return `<section class="library-group"><h2>${escapeText(goal.name)}</h2><p class="library-group-sub">${goal.sequence?'Sequence · '+escapeText(goal.sequence):'Individual exercises'}</p>${exercises.map(exercise=>`<button class="library-item" data-library-exercise="${exercise.id}" aria-pressed="${exercise.id===librarySelected}" aria-label="${escapeText(exercise.title)}"><span class="library-item-index" aria-hidden="true">${exercise.order===null?'♫':librarySequence(goal.id).indexOf(exercise)+1}</span><span class="library-item-body"><span class="library-item-title">${escapeText(exercise.title)}</span><span class="library-item-meta"><span>${libraryStateName(exercise)}</span>${exercise.current?'<span class="current-marker">Current for learning</span>':''}${exercise.order===null&&goal.sequence?'<span>Outside sequence</span>':''}</span></span></button>`).join('')}</section>`;
 }).join(''):'<div class="library-empty">No exercises match these filters.<button class="text-button" id="clear-library-filters">Clear filters</button></div>';
 document.querySelectorAll('[data-library-exercise]').forEach(button=>button.onclick=()=>{librarySelected=button.dataset.libraryExercise;libraryEditing=null;renderLibraryList();renderLibraryDetail();document.querySelector(`[data-library-exercise="${librarySelected}"]`).focus({preventScroll:true});});
 if($('clear-library-filters'))$('clear-library-filters').onclick=()=>{libraryQuery='';libraryGoalFilter='all';libraryStateFilter='all';$('library-search').value='';$('library-goal-filter').value='all';$('library-state-filter').value='all';applyLibraryFilters();$('library-search').focus();};
}

function applyLibraryFilters(){
 const visible=libraryVisibleExercises();
 if(!visible.some(exercise=>exercise.id===librarySelected)){librarySelected=visible[0]?.id??null;libraryEditing=null;}
 renderLibraryList();renderLibraryDetail();
}

function renderLibraryDetail(feedback=''){
 if(libraryEditing){renderLibraryEditor();return;}
 const exercise=libraryExercises.find(item=>item.id===librarySelected);
 if(!exercise){$('library-detail').innerHTML='<div class="library-empty">Select an exercise to read its material.</div>';return;}
 const goal=libraryGoals.find(item=>item.id===exercise.goal);
 const sequence=librarySequence(goal.id);
 const next=sequence.find(item=>item.order>exercise.order);
 $('library-detail').innerHTML=`<div class="library-detail-top"><div><p class="stand-kicker">EXERCISE</p><h2 class="stand-title">${escapeText(exercise.title)}</h2><span class="badge">${exercise.learned?'Learned · mastery practice':'Learning'}</span></div><button class="text-button" id="library-edit">Edit exercise</button></div>
 <div class="library-goal"><span class="small-label">Practice goal</span><strong>${escapeText(goal.name)}</strong><p>${escapeText(goal.criterion)}</p></div>
 <span class="small-label">Instructions</span><pre class="material">${escapeText(exercise.instructions)}</pre>
 ${exercise.order!==null?`<div class="library-sequence"><span><strong>Exercise ${sequence.indexOf(exercise)+1} of ${sequence.length}</strong>${exercise.current?' · current for learning':''}</span><span>${next?'Next in sequence: '+escapeText(next.title):'Last in this sequence'}</span></div>`:'<div class="library-sequence">Individual exercise · outside a sequence</div>'}
 ${(exercise.explanation||exercise.hints)?`<div class="library-guidance"><span class="small-label">Optional guidance</span>${exercise.explanation?`<details><summary>Explanation</summary><pre class="material">${escapeText(exercise.explanation)}</pre></details>`:''}${exercise.hints?`<details><summary>Hints</summary><pre class="material">${escapeText(exercise.hints)}</pre></details>`:''}</div>`:''}
 ${exercise.note?`<div class="library-detail-note"><span class="small-label">Where to pick up</span><p>${escapeText(exercise.note)}</p></div>`:''}<p class="library-feedback" role="status">${escapeText(feedback)}</p>`;
 $('library-edit').onclick=()=>{libraryEditing=exercise.id;if(!libraryDrafts.has(exercise.id))libraryDrafts.set(exercise.id,{...exercise});renderLibraryEditor();$('library-title-input').focus();};
}

function renderLibraryEditor(){
 const draft=libraryDrafts.get(libraryEditing),isNew=libraryEditing==='new';
 $('library-detail').innerHTML=`<div class="library-detail-top"><div><p class="stand-kicker">${isNew?'ADD TO YOUR LIBRARY':'EXERCISE MATERIAL'}</p><h2 class="stand-title">${isNew?'New exercise':'Edit exercise'}</h2></div><span class="badge">${isNew?'Learning':libraryStateName(draft)}</span></div><form class="library-form" id="library-form" novalidate>
 <label for="library-title-input">Title</label><input id="library-title-input" required value="${escapeText(draft.title)}" placeholder="e.g. Triad inversions in G major">
 <label for="library-goal-input">Practice goal</label><select id="library-goal-input" required>${libraryGoals.map(goal=>`<option value="${goal.id}" ${draft.goal===goal.id?'selected':''}>${escapeText(goal.name)}</option>`).join('')}</select>
 <label for="library-instructions-input">Instructions</label><textarea id="library-instructions-input" required placeholder="Write the directions and material you need to practise.">${escapeText(draft.instructions)}</textarea>
 <details ${draft.explanation||draft.hints?'open':''}><summary>Explanation & hints · optional</summary><label for="library-explanation-input">Explanation</label><textarea id="library-explanation-input">${escapeText(draft.explanation)}</textarea><label for="library-hints-input">Hints</label><textarea id="library-hints-input">${escapeText(draft.hints)}</textarea></details>
 <p class="library-feedback ${isNew?'':'muted'}">${isNew?'Starts outside a sequence. You can organise it later.':'Editing material keeps its learning state.'}</p><div class="library-form-footer"><button type="button" id="library-cancel-edit">Cancel</button><button class="primary" type="submit">${isNew?'Add exercise':'Save exercise'}</button></div><p class="library-feedback" id="library-save-feedback" role="status"></p></form>`;
 const fields=[['title','library-title-input'],['goal','library-goal-input'],['instructions','library-instructions-input'],['explanation','library-explanation-input'],['hints','library-hints-input']];
 fields.forEach(([field,id])=>$(id).oninput=()=>{draft[field]=$(id).value;$(id).removeAttribute('aria-invalid');});
 $('library-cancel-edit').onclick=()=>{const id=libraryEditing;libraryDrafts.delete(id);libraryEditing=null;renderLibraryDetail();if($('library-edit'))$('library-edit').focus();else $('library-add').focus();};
 $('library-form').onsubmit=event=>{
  event.preventDefault();const missing=fields.slice(0,3).filter(([field])=>!draft[field].trim());
  if(missing.length){$('library-save-feedback').classList.add('error');$('library-save-feedback').textContent='Add a title, a practice goal and instructions before saving.';missing.forEach(([,id])=>$(id).setAttribute('aria-invalid','true'));$(missing[0][1]).focus();return;}
  if(isNew){const exercise={...draft,id:'custom-'+(++libraryNewCount),title:draft.title.trim()};libraryExercises.push(exercise);librarySelected=exercise.id;libraryQuery='';libraryGoalFilter='all';libraryStateFilter='all';$('library-search').value='';$('library-goal-filter').value='all';$('library-state-filter').value='all';}
  else {const exercise=libraryExercises.find(item=>item.id===libraryEditing),previousGoal=exercise.goal;Object.assign(exercise,{title:draft.title.trim(),goal:draft.goal,instructions:draft.instructions,explanation:draft.explanation,hints:draft.hints});if(exercise.goal!==previousGoal){exercise.order=null;exercise.current=false;}}
  if(!libraryVisibleExercises().some(exercise=>exercise.id===librarySelected)){libraryQuery='';libraryGoalFilter='all';libraryStateFilter='all';$('library-search').value='';$('library-goal-filter').value='all';$('library-state-filter').value='all';}
  libraryDrafts.delete(libraryEditing);libraryEditing=null;renderLibraryList();renderLibraryDetail(isNew?'Exercise added to this preview. Reload resets the library.':'Exercise updated in this preview. Reload resets the library.');$('library-edit').focus({preventScroll:true});
 };
}

function updateLibraryTimer(){
 if(!libraryViewOpen||!$('library-session-time'))return;
 $('library-session-time').textContent=$('timer-number').textContent;
 $('library-session-title').textContent=blocks[active].name;
 $('library-session-state').textContent=running?'practising':elapsed[active]?'paused':'ready to start';
 $('library-session-action').textContent=running?'Ⅱ Pause':elapsed[active]?'▷ Resume':'▷ Start';
 $('library-session-action').setAttribute('aria-label',(running?'Pause':elapsed[active]?'Resume':'Start')+' current session timer');
}

function showLibrary(open){
 libraryViewOpen=open;if(open)closeCalendar();libraryDailyView.hidden=open;$('library-view').hidden=!open;
 $('nav-daily').toggleAttribute('aria-current',!open);$('nav-library').toggleAttribute('aria-current',open);(open?$('nav-library'):$('nav-daily')).setAttribute('aria-current','page');
 if(open){updateLibraryTimer();$('library-page-title').focus({preventScroll:true});}else{$('nav-daily').focus({preventScroll:true});}
}

if(variant==='b'){
 libraryDailyView.id='daily-view';
 const nav=document.createElement('nav');nav.className='space-nav';nav.setAttribute('aria-label','Practice space');nav.innerHTML='<button id="nav-daily" aria-current="page" aria-controls="daily-view"><span aria-hidden="true">♫</span>Daily practice</button><button id="nav-library" aria-controls="library-view"><span aria-hidden="true">▤</span>Exercise library</button>';document.querySelector('.nav-current').replaceWith(nav);
 const view=document.createElement('main');view.id='library-view';view.className='main library-view';view.hidden=true;
 view.innerHTML=`<header class="page-head"><div><p class="eyebrow">Your practice material</p><h1 id="library-page-title" tabindex="-1">Exercise library</h1><p class="library-intro">Keep the exercises you want to return to.</p></div><button class="primary" id="library-add">+ New exercise</button></header>
 <section class="library-session" aria-label="Current practice session"><div><span class="small-label">Today's session</span><p class="library-session-title" id="library-session-title"></p></div><span class="library-session-clock" id="library-session-time"></span><span class="library-session-state" id="library-session-state"></span><button id="library-session-action"></button><button class="text-button" id="library-return">Return to practice ↗</button></section>
 <div class="library-toolbar"><div><label for="library-search">Find an exercise</label><input id="library-search" type="search" placeholder="Search titles, goals or instructions"></div><div><label for="library-goal-filter">Practice goal</label><select id="library-goal-filter"><option value="all">All goals</option>${libraryGoals.map(goal=>`<option value="${goal.id}">${escapeText(goal.name)}</option>`).join('')}</select></div><div><label for="library-state-filter">Practice purpose</label><select id="library-state-filter"><option value="all">Learning & mastery</option><option value="learning">Learning</option><option value="mastery">Mastery</option></select></div></div>
 <div class="library-workspace"><section aria-label="Exercises"><div class="library-list-head"><strong>Your exercises</strong><span id="library-count"></span></div><div id="library-list"></div></section><section class="panel library-detail" id="library-detail" aria-label="Selected exercise"></section></div>`;
 libraryDailyView.after(view);
 $('nav-library').onclick=()=>showLibrary(true);$('nav-daily').onclick=()=>showLibrary(false);$('library-return').onclick=()=>showLibrary(false);$('library-session-action').onclick=()=>{$('timer-action').click();updateLibraryTimer();};
 $('library-search').oninput=event=>{libraryQuery=event.target.value;applyLibraryFilters();};$('library-goal-filter').onchange=event=>{libraryGoalFilter=event.target.value;applyLibraryFilters();};$('library-state-filter').onchange=event=>{libraryStateFilter=event.target.value;applyLibraryFilters();};
 $('library-add').onclick=()=>{libraryEditing='new';if(!libraryDrafts.has('new'))libraryDrafts.set('new',{title:'',goal:libraryGoalFilter==='all'?'triads':libraryGoalFilter,instructions:'',explanation:'',hints:'',note:'',learned:false,order:null});renderLibraryEditor();$('library-title-input').focus();};
 renderLibraryList();renderLibraryDetail();
 document.querySelector('.comparison>span:last-child').textContent='Round 8 / Exercise library';
 setInterval(updateLibraryTimer,1000);
 if(new URLSearchParams(location.search).get('panel')==='library')showLibrary(true);
}
