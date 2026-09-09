/* ---- view: pan + zoom ---- */
let x=0,y=0,z=1.5,drag=null,pinch=null,anim=null;   // start zoomed in so island text is legible
const ZMIN=.35,ZMAX=2.5;
function clampView(){const W=innerWidth,H=innerHeight;x=Math.min(0,Math.max(W-FW*z,x));y=Math.min(0,Math.max(H-FH*z,y))}
function place(){clampView();const t=`translate(${x}px,${y}px) scale(${z})`;field.style.transform=t;$('#field2').style.transform=t}
function centreOn(px,py){x=innerWidth/2-px*z;y=innerHeight/2-py*z;place()}
function zoomAt(nz,cx,cy){nz=Math.min(ZMAX,Math.max(ZMIN,nz));x=cx-(cx-x)*(nz/z);y=cy-(cy-y)*(nz/z);z=nz;place()}
function goHome(){ // animate translation only; zoom stays
  if(anim)cancelAnimationFrame(anim);const tx=innerWidth/2-CX*z,ty=innerHeight/2-CY*z,sx=x,sy=y,t0=performance.now(),D=520;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const step=t=>{let p=reduce?1:Math.min(1,(t-t0)/D);p=1-Math.pow(1-p,3);x=sx+(tx-sx)*p;y=sy+(ty-sy)*p;place();if(p<1)anim=requestAnimationFrame(step)};anim=requestAnimationFrame(step)}

const ptrs=new Map();
stage.addEventListener('pointerdown',e=>{ptrs.set(e.pointerId,e);
  if(ptrs.size===2){stage.setPointerCapture(e.pointerId);const[a,b]=[...ptrs.values()];pinch={d:Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY),z};drag=null;return}
  if(e.target.closest('.node'))return;stage.setPointerCapture(e.pointerId);drag={sx:e.clientX,sy:e.clientY,ox:x,oy:y};stage.classList.add('dragging')});
stage.addEventListener('pointermove',e=>{if(!ptrs.has(e.pointerId))return;ptrs.set(e.pointerId,e);
  if(pinch&&ptrs.size===2){const[a,b]=[...ptrs.values()];const d=Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY);zoomAt(pinch.z*d/pinch.d,(a.clientX+b.clientX)/2,(a.clientY+b.clientY)/2);return}
  if(!drag)return;x=drag.ox+e.clientX-drag.sx;y=drag.oy+e.clientY-drag.sy;place()});
const up=e=>{ptrs.delete(e.pointerId);if(ptrs.size<2)pinch=null;
  const wasDrag=drag&&Math.hypot(e.clientX-drag.sx,e.clientY-drag.sy)>4;
  if(!ptrs.size){if(drag&&!wasDrag&&!e.target.closest('.node'))bubbleClick(e.clientX,e.clientY);drag=null;stage.classList.remove('dragging')}};
stage.addEventListener('pointerup',up);stage.addEventListener('pointercancel',up);
stage.addEventListener('wheel',e=>{e.preventDefault();
  if(e.ctrlKey||e.metaKey)zoomAt(z*Math.exp(-e.deltaY*.0025),e.clientX,e.clientY);
  else{x-=e.deltaX;y-=e.deltaY;place()}},{passive:false});
document.addEventListener('keydown',e=>{const s=80;
  if(e.key==='ArrowLeft'){x+=s;place()}if(e.key==='ArrowRight'){x-=s;place()}if(e.key==='ArrowUp'){y+=s;place()}if(e.key==='ArrowDown'){y-=s;place()}
  if(e.key==='+'||e.key==='=')zoomAt(z*1.2,innerWidth/2,innerHeight/2);if(e.key==='-')zoomAt(z/1.2,innerWidth/2,innerHeight/2);
  if(e.key==='0')goHome();if(e.key==='Escape')closePanel();if(e.key==='i')togglePanel()});
addEventListener('resize',()=>{place();if(bub)syncChrome()});
$('#home').onclick=goHome;
