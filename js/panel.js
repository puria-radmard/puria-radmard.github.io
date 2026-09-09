/* ---- panel: stage 1 index only, stage 2 section list, stage 3 item ---- */
function openPanel(){panel.classList.add('open')}
function closePanel(){ // close = go home: panel shut, island deselected, url reset, geography untouched
  panel.classList.remove('open');stageTo(1);current={sec:null,i:null};renderL1();
  field.querySelectorAll('.node.on').forEach(n=>n.classList.remove('on'));syncBubble();
  try{history.replaceState(null,'',location.pathname+location.search)}catch{}
  goHome()}
function togglePanel(){if(panel.classList.contains('open'))closePanel();else{stageTo(1);openPanel()}}
function stageTo(n){$('#c2').classList.toggle('on',n>=2);$('#c3').classList.toggle('on',n>=3)}
$('#close').onclick=closePanel;$('#idx').onclick=togglePanel;

function renderL1(){$('#l1').innerHTML=Object.keys(SECTIONS).map(s=>`<li><button data-sec="${s}" class="${current.sec===s?'on':''}">${SECTIONS[s]}<small>${s==='contact'?'':ITEMS[s].length+' item'+(ITEMS[s].length===1?'':'s')}</small></button></li>`).join('')}
function showSection(sec){current.sec=sec;renderL1();$('#h2').textContent=SECTIONS[sec];
  $('#l2').innerHTML=ITEMS[sec].length?ITEMS[sec].map((it,i)=>`<li><button data-sec="${sec}" data-i="${i}" class="${current.i===i?'on':''}">${esc(it.t)}<small>${esc(it.meta||it.d)}</small></button></li>`).join(''):`<li class="empty">nothing here yet</li>`;
  openPanel()}
function showItem(sec,i){current.sec=sec;current.i=i;showSection(sec);const it=ITEMS[sec][i];
  $('#detail').innerHTML=`<h1>${esc(it.t)}</h1><p class="meta">${esc(it.meta)}</p>${it.d?`<p>${esc(it.d)}</p>`:''}${it.body||''}<div class="links">${it.links.map(l=>`<a href="${l[1]}" target="_blank" rel="noopener">${l[0]}</a>`).join('')}</div>`;
  stageTo(3);field.querySelectorAll('.node.on').forEach(n=>n.classList.remove('on'));const n=field.querySelector(`.node[data-sec="${sec}"][data-i="${i}"]`);if(n)n.classList.add('on');syncBubble();
  try{history.replaceState(null,'',`#${sec}/${i}`)}catch{}}
document.addEventListener('click',e=>{const b=e.target.closest('[data-sec]');if(!b)return;
  if(b.dataset.i!=null)showItem(b.dataset.sec,+b.dataset.i);else{current.i=null;stageTo(2);showSection(b.dataset.sec)}});
