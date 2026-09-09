/* ---- island placement: polar. radius = age (newest near the centre, oldest at the rim),
   angle ~ gaussian around each section's bearing. resample on collision, widening as it goes. ---- */
function gauss(){let u=0,v=0;while(!u)u=Math.random();while(!v)v=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)}
const BEARING={substack:-0.6,lesswrong:-2.5,papers:2.5,contact:0.6};   // radians; screen y is down
const R_MIN=230,R_MAX=760;
const NODE_W=300,NODE_H=90;   // exclusion box, since islands are wide and short
function placeAll(){
  const placed=[[CX-40,CY,520,60],[CX,CY-60,140,30]]; // keep the centre line and name clear
  const dated=[];for(const sec of Object.keys(BEARING))for(const it of ITEMS[sec])if(it.date&&!isNaN(new Date(it.date)))dated.push(+new Date(it.date));
  const newest=dated.length?Math.max(...dated):Date.now(),oldest=dated.length?Math.min(...dated):newest-1;
  const span=Math.max(1,newest-oldest);
  const out={};
  for(const sec of Object.keys(BEARING)){const n=ITEMS[sec].length;if(!n)continue;out[sec]=[];
    const sigA=Math.min(.9,.25+.08*n);   // angular spread grows with count
    for(let i=0;i<n;i++){const it=ITEMS[sec][i];
      const t=it.date&&!isNaN(new Date(it.date))?+new Date(it.date):null;
      const base=sec==='contact'?R_MAX*.8:t===null?R_MAX:R_MIN+(R_MAX-R_MIN)*((newest-t)/span);
      let p,ok=false,tries=0,w=1;
      while(!ok&&tries<80){const a=BEARING[sec]+gauss()*sigA*w,r=base+gauss()*40*w;tries++;
        p=[CX+Math.cos(a)*r-NODE_W/2,CY+Math.sin(a)*r-NODE_H/2];
        p[0]=Math.min(FW-NODE_W-40,Math.max(40,p[0]));p[1]=Math.min(FH-NODE_H-40,Math.max(40,p[1]));
        ok=placed.every(q=>Math.abs(p[0]-q[0])>=(NODE_W+q[2])/2*.85||Math.abs(p[1]-q[1])>=(NODE_H+q[3])/2*1.1);
        if(tries%20===0)w*=1.3}
      placed.push([p[0],p[1],NODE_W,NODE_H]);out[sec].push(p)}}
  return out}

function buildItems(D){
  ITEMS.substack=(D.substack||[]).map(p=>({k:"substack",t:p.title,d:p.subtitle||"",date:p.date,meta:fmtDate(p.date),links:[["read on substack",p.url]]}));
  ITEMS.lesswrong=(D.lesswrong||[]).map(p=>({k:"lesswrong",t:p.title,d:p.subtitle||"",date:p.date,meta:fmtDate(p.date)+(p.karma!=null?` · ${p.karma} karma`:""),links:[["read on lesswrong",p.url]]}));
  ITEMS.papers=CONFIG.papers.map(p=>({k:"paper",t:p.title,d:p.sub,date:p.date,meta:p.meta,links:p.links}));
  ITEMS.contact=[{k:"door",t:"contact",d:"Technical director, Geodesic Research. Cambridge, UK.",meta:"",
    body:`<p>Email is best. If you work on alignment inside a frontier lab and have an experiment you'd like run in the open, especially so.</p>`,
    links:[CONFIG.email?["email","mailto:"+CONFIG.email.join("@")]:null,["geodesic research",CONFIG.geodesic],["scholar",CONFIG.scholar],["substack",CONFIG.substack],["lesswrong",CONFIG.lesswrong]].filter(Boolean)}];
}
function fmtDate(s){if(!s)return"";const d=new Date(s);return isNaN(d)?s:d.toLocaleDateString('en-GB',{year:'numeric',month:'short',day:'numeric'})}
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

function buildField(){
  field.querySelectorAll('.node[data-i]:not(#nameNode)').forEach(n=>n.remove());
  $('#centre').style.left=(CX-260)+'px';$('#centre').style.top=(CY-10)+'px';
  $('#nameNode').style.left=(CX-60)+'px';$('#nameNode').style.top=(CY-70)+'px';
  const pos=placeAll();
  for(const sec in pos)pos[sec].forEach((p,i)=>{const it=ITEMS[sec][i];const b=document.createElement('button');b.className='node';b.dataset.sec=sec;b.dataset.i=i;b.style.left=p[0]+'px';b.style.top=p[1]+'px';
    b.innerHTML=`<span class="k">${it.k}${it.date?' · '+esc(fmtDate(it.date)):''}</span><span class="t">${esc(it.t)}</span>${it.d?`<span class="d">${esc(it.d)}</span>`:''}`;field.appendChild(b)});
  syncBubble();
}
function syncBubble(){const f2=$('#field2');f2.innerHTML=field.innerHTML;f2.querySelectorAll('[id]').forEach(n=>n.removeAttribute('id'));f2.querySelectorAll('button').forEach(b=>b.tabIndex=-1);syncChrome()}
function syncChrome(){ // the corner buttons, sound toggle and theme card also live inside the bubble, in the next theme
  const b=$('#bubble');b.querySelectorAll('.chrome').forEach(n=>n.remove());
  const wrap=document.createElement('div');wrap.className='chrome';
  const pin=(src,clone)=>{const r=src.getBoundingClientRect();clone.classList.add('pin');clone.style.left=r.left+'px';clone.style.top=r.top+'px';clone.style.width=r.width+'px';clone.style.height=r.height+'px';clone.style.right='auto';clone.style.bottom='auto';return clone};
  const strip=c=>{c.removeAttribute('id');c.querySelectorAll('[id]').forEach(n=>n.removeAttribute('id'));c.querySelectorAll('button').forEach(x=>x.tabIndex=-1);return c};
  for(const src of document.querySelectorAll('#corner button')){const c=strip(src.cloneNode(true));c.style.color='var(--ink)';c.style.overflow='hidden';wrap.appendChild(pin(src,c))}
  const so=$('#sound');const sc=strip(so.cloneNode(true));sc.style.color=so.classList.contains('on')?'var(--acc)':'var(--ink)';sc.style.overflow='hidden';wrap.appendChild(pin(so,sc));
  const rv=$('#reveal');if(rv.classList.contains('on')){const rc=document.createElement('div');rc.className='reveal on';pin(rv,rc);
    rc.innerHTML=revealHTML(nextTheme,'next theme');rc.querySelectorAll('button').forEach(x=>x.tabIndex=-1);try{drawSpectrum(rc.querySelector('canvas'),nextTheme)}catch{}wrap.appendChild(rc)}
  b.appendChild(wrap)}
