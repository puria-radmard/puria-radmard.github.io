/* ---- bubble of another theme ----
   click background: a soft circle of a different palette + font opens at the click and grows with each click.
   it decays when left alone. if it swallows the whole viewport it becomes the norm and a fresh theme is drawn.
   refresh resets to matrix. */
const FONTS=[['"Cormorant Garamond",serif',1.15],['"Space Grotesk",sans-serif',1],['"Instrument Serif",serif',1.12],['"Courier Prime",monospace',1],
  ['"VT323",monospace',1.3],['"Special Elite",monospace',1],['"Unbounded",sans-serif',.9],['"Syne Mono",monospace',1],['"EB Garamond",serif',1.15],['"Major Mono Display",monospace',.95],['"Redacted Script",cursive',1.1]];
const logu=(a,b)=>Math.exp(Math.log(a)+Math.random()*(Math.log(b)-Math.log(a)));
function hsl(h,s,l){return `hsl(${h} ${s}% ${l}%)`}
function lum(h,s,l){ // relative luminance from hsl via rgb
  s/=100;l/=100;const k=n=>(n+h/30)%12,a=s*Math.min(l,1-l),f=n=>l-a*Math.max(-1,Math.min(k(n)-3,Math.min(9-k(n),1)));
  const lin=c=>c<=.03928?c/12.92:Math.pow((c+.055)/1.055,2.4);return .2126*lin(f(0))+.7152*lin(f(8))+.0722*lin(f(4))}
const contrast=(a,b)=>(Math.max(a,b)+.05)/(Math.min(a,b)+.05);
function randomTheme(){
  const bh=Math.random()*360,bs=20+Math.random()*70,bl=Math.random()<.5?4+Math.random()*18:80+Math.random()*16;const bL=lum(bh,bs,bl);
  let ink,acc,tries=0;
  do{const h=Math.random()*360,s=Math.random()*40,l=bl<50?78+Math.random()*20:5+Math.random()*22;ink=[h,s,l]}while(contrast(lum(...ink),bL)<7&&++tries<200);   // rejection: ink must read on ground
  tries=0;
  do{const h=(bh+90+Math.random()*180)%360,s=70+Math.random()*30,l=bl<50?50+Math.random()*25:30+Math.random()*25;acc=[h,s,l]}
  while((contrast(lum(...acc),bL)<3.5||Math.abs(((acc[0]-ink[0]+540)%360)-180)>150)&&++tries<200); // accent readable and not the ink's hue
  const dl=bl<50?ink[2]-38:ink[2]+38;
  const f=FONTS[(Math.random()*FONTS.length)|0];
  return{bg:hsl(bh,bs,bl),ink:hsl(...ink),acc:hsl(...acc),dim:hsl(ink[0],ink[1],dl),rule:hsl(bh,bs,bl<50?bl+10:bl-10),font:f[0],fs:f[1],spectrum:randomSpectrum()};
}
function applyTheme(el,t){el.style.setProperty('--bg',t.bg);el.style.setProperty('--ink',t.ink);el.style.setProperty('--acc',t.acc);el.style.setProperty('--dim',t.dim);el.style.setProperty('--rule',t.rule);el.style.setProperty('--font',t.font);el.style.setProperty('--fsz',(13*t.fs)+'px')}
const MATRIX={bg:'#000',ink:'#fff',acc:'#00ff41',dim:'#7a7a7a',rule:'#2a2a2a',font:'"IBM Plex Mono",monospace',fs:1,spectrum:{name:'white',hp:0,lp:0,peaks:[]}};
let theme=MATRIX,bub=null,nextTheme=randomTheme();
const SOFT=70;
function bubbleClick(cx,cy){
  const now=performance.now();
  if(!bub){bub={x:cx,y:cy,r:0,last:now};applyTheme($('#bubble'),nextTheme);$('#bubble').classList.add('on');syncBubble();requestAnimationFrame(tickBubble)}
  bub.x=cx;bub.y=cy;bub.r+=(farthestCorner()+SOFT)/8*1.15;bub.last=now;   // ~8 quick clicks to swallow the screen
  drawBubble()}
document.addEventListener('pointermove',e=>{if(bub&&e.pointerType!=='touch'){bub.x=e.clientX;bub.y=e.clientY}});  // the cursor is the centre of emanation
function drawBubble(){const m=`radial-gradient(circle at ${bub.x}px ${bub.y}px, #000 ${Math.max(0,bub.r-SOFT)}px, transparent ${bub.r+SOFT}px)`;const b=$('#bubble');b.style.maskImage=m;b.style.webkitMaskImage=m}
function farthestCorner(){return Math.max(...[[0,0],[innerWidth,0],[0,innerHeight],[innerWidth,innerHeight]].map(c=>Math.hypot(c[0]-bub.x,c[1]-bub.y)))}
let lastT=0;
function tickBubble(t){if(!bub)return;const dt=Math.min(.1,(t-(lastT||t))/1000);lastT=t;
  if(bub.r-SOFT>=farthestCorner()){ // swallowed everything: becomes the norm
    theme=nextTheme;applyTheme(document.documentElement,theme);$('#bubble').classList.remove('on');bub=null;nextTheme=randomTheme();promoteAudio();renderReveal();return}
  bub.r-=dt*(30+bub.r*.28);   // decays from the moment you stop
  setMix(Math.min(1,bub.r/farthestCorner()));
  if(bub.r<=0){$('#bubble').classList.remove('on');bub=null;setMix(0);return}
  drawBubble();requestAnimationFrame(tickBubble)}

/* ---- each theme has a noise spectrum: white noise shaped by a highpass, a lowpass and a few resonant peaks ---- */
function randomSpectrum(){const n=1+(Math.random()*3|0);const peaks=[];for(let i=0;i<n;i++)peaks.push({f:logu(60,6000),q:2+Math.random()*12,g:6+Math.random()*14});
  const hp=Math.random()<.6?logu(30,500):0,lp=Math.random()<.7?logu(700,14000):0;
  const name=(hp>200?'thin ':hp?'':'heavy ')+(lp&&lp<2000?'muffled ':lp?'':'bright ')+(n>2?'ringing':n>1?'hollow':'toned')+' noise';
  return{name,hp,lp,peaks}}
let actx=null,noise=null,master=null,chainA=null,chainB=null,mix=0;
function ensureCtx(){if(actx)return actx;actx=new(window.AudioContext||window.webkitAudioContext)();
  const len=actx.sampleRate*2,buf=actx.createBuffer(1,len,actx.sampleRate),d=buf.getChannelData(0);for(let i=0;i<len;i++)d[i]=Math.random()*2-1;
  noise=actx.createBufferSource();noise.buffer=buf;noise.loop=true;master=actx.createGain();master.gain.value=0;master.connect(actx.destination);
  chainA=buildChain(theme.spectrum,1);chainB=buildChain(nextTheme.spectrum,0);noise.start();return actx}
function buildChain(sp,g){const filters=[];let node=noise;
  if(sp.hp){const f=actx.createBiquadFilter();f.type='highpass';f.frequency.value=sp.hp;filters.push(f)}
  if(sp.lp){const f=actx.createBiquadFilter();f.type='lowpass';f.frequency.value=sp.lp;filters.push(f)}
  for(const p of sp.peaks){const f=actx.createBiquadFilter();f.type='peaking';f.frequency.value=p.f;f.Q.value=p.q;f.gain.value=p.g;filters.push(f)}
  for(const f of filters){node.connect(f);node=f}const gain=actx.createGain();gain.gain.value=g;node.connect(gain);gain.connect(master);return{filters,gain}}
function setMix(m){mix=m;if(!actx)return;const t=actx.currentTime;chainA.gain.gain.setTargetAtTime(1-m,t,.05);chainB.gain.gain.setTargetAtTime(m,t,.05)}
function promoteAudio(){if(!actx)return;chainA.gain.disconnect();chainA.filters.forEach(f=>f.disconnect());chainA=chainB;chainB=buildChain(nextTheme.spectrum,0);setMix(0)}
let soundOn=false;
$('#sound').onclick=async()=>{if(!(window.AudioContext||window.webkitAudioContext)){$('#sound').textContent='no audio here';return}ensureCtx();if(actx.state==='suspended')await actx.resume();soundOn=!soundOn;
  master.gain.setTargetAtTime(soundOn?.06:0,actx.currentTime,.2);$('#sound').textContent=soundOn?'sound on':'sound off';$('#sound').classList.toggle('on',soundOn);if(bub)syncChrome()};

/* ---- reveal: the current theme's font, palette and spectrum ---- */
function response(sp,freqs){const out=new Float32Array(freqs.length).fill(1);if(!(window.AudioContext||window.webkitAudioContext))return out;if(!actx)ensureCtx();
  const mk=(type,f,q,g)=>{const b=actx.createBiquadFilter();b.type=type;b.frequency.value=f;if(q)b.Q.value=q;if(g)b.gain.value=g;return b};
  const fs=[];if(sp.hp)fs.push(mk('highpass',sp.hp));if(sp.lp)fs.push(mk('lowpass',sp.lp));for(const p of sp.peaks)fs.push(mk('peaking',p.f,p.q,p.g));
  const mag=new Float32Array(freqs.length),ph=new Float32Array(freqs.length);for(const f of fs){f.getFrequencyResponse(freqs,mag,ph);for(let i=0;i<out.length;i++)out[i]*=mag[i]}return out}
function revealHTML(t,label){return `<h3>${label}</h3><button class="copytheme">copy</button>
   <div class="fontline">${t.font.split(',')[0].replace(/"/g,'')}</div>
   <div class="sw"><i style="background:${t.bg}"></i><i style="background:${t.ink}"></i><i style="background:${t.acc}"></i><i style="background:${t.dim}"></i></div>
   <div class="row"><span>ground</span><b>${t.bg}</b></div><div class="row"><span>ink</span><b>${t.ink}</b></div><div class="row"><span>signal</span><b>${t.acc}</b></div>
   <div class="row" style="margin-top:8px"><span>spectrum</span><b>${t.spectrum.name}</b></div><canvas width="232" height="60"></canvas>`}
function drawSpectrum(cv,t){const g=cv.getContext('2d');if(!g)return;const N=232,freqs=new Float32Array(N);for(let i=0;i<N;i++)freqs[i]=20*Math.pow(1000,i/(N-1));
  const m=response(t.spectrum,freqs);g.clearRect(0,0,N,60);g.strokeStyle=t.acc;g.lineWidth=1;g.beginPath();
  for(let i=0;i<N;i++){const db=20*Math.log10(Math.max(1e-4,m[i]));const y=60-((db+30)/50)*60;i?g.lineTo(i,y):g.moveTo(i,y)}g.stroke()}
function renderReveal(){const r=$('#reveal');if(!r.classList.contains('on'))return;const t=theme;
  r.innerHTML=revealHTML(t,'current theme');drawSpectrum(r.querySelector('canvas'),t);
  r.querySelector('.copytheme').onclick=async()=>{const b=r.querySelector('.copytheme');
    const j=JSON.stringify({ground:t.bg,ink:t.ink,signal:t.acc,dim:t.dim,rule:t.rule,font:t.font,fontScale:t.fs,spectrum:t.spectrum},null,2);
    try{await navigator.clipboard.writeText(j);b.textContent='copied'}catch{b.textContent='select & copy';console.log(j)}setTimeout(()=>b.textContent='copy',1400)}
  if(bub)syncChrome()}
$('#theme').onclick=()=>{$('#reveal').classList.toggle('on');renderReveal();if(bub)syncChrome()};
