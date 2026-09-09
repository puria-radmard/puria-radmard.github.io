/* ---- boot: no data lives in this file ---- */
async function boot(){
  let D={substack:[],lesswrong:[]};
  if(window.__FEED__)D=window.__FEED__;
  else try{const r=await fetch(CONFIG.feedUrl,{cache:'no-store'});if(!r.ok)throw 0;D=await r.json();if(D.errors)console.warn('feed partial',D.errors)}
  catch{console.warn('no feed: data/feed.json not found')}
  buildItems(D);buildField();renderL1();centreOn(CX,CY);
  const m=location.hash.match(/^#(\w+)\/(\d+)$/);if(m&&ITEMS[m[1]]&&ITEMS[m[1]][+m[2]])showItem(m[1],+m[2]);
}
boot();
