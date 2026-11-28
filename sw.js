const C='hanzi-cam-v49';
// 인식 엔진(모델·wasm·opencv)은 버전과 상관없이 따로 보관 → 앱을 고쳐도 다시 받지 않음
const E='hanzi-engine-1';
const CH=["chunk-3RNHDNP5.js", "chunk-6SLTANZM.js", "chunk-6VLL7WE2.js", "chunk-7VC2J3N6.js", "chunk-A5ZQKWW3.js", "chunk-AF3V2E4A.js", "chunk-BW7VIC66.js", "chunk-BYTZ2HWZ.js", "chunk-DD2F7PD6.js", "chunk-HDHMYVRZ.js", "chunk-HIYUQRJ6.js", "chunk-HJCWMV6D.js", "chunk-IIIDMEIH.js", "chunk-JLLDSYNY.js", "chunk-JTV3Q3KC.js", "chunk-MJORJPVK.js", "chunk-MSHQDCYT.js", "chunk-NEO2M5OV.js", "chunk-NTIUPAKQ.js", "chunk-OW3GTWUR.js", "chunk-P2BH57ES.js", "chunk-QNP3XEWE.js", "chunk-RFY7EFDI.js", "chunk-SUZQL7UM.js", "chunk-X5SI4PBW.js", "chunk-Y5MZOH4T.js", "chunk-ZMQBEPTM.js"];
const PRE=['./','index.html','app.js','hun.json','words.json','ko.json','food.json','zhko.json','manifest.json','intro_street.jpg','intro_menu.jpg','intro_station.jpg','icon-192.png'];
const isEng=p=>/\/(models|ort)\//.test(p)||/\/chunk-[^/]+\.js$/.test(p);
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(PRE)).catch(()=>{}))});
self.addEventListener('activate',e=>e.waitUntil((async()=>{
  for(const k of await caches.keys())if(k!==C&&k!==E&&k!=='share')await caches.delete(k);
  const ec=await caches.open(E);
  for(const r of await ec.keys()){const m=r.url.match(/chunk-[^/]+\.js$/);if(m&&CH.length&&!CH.includes(m[0]))await ec.delete(r)}
  await self.clients.claim();
})()));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);
  if(e.request.method==='POST'&&u.pathname.endsWith('/share-target')){e.respondWith((async()=>{try{const fd=await e.request.formData();const f=fd.get('image');if(f){const c=await caches.open('share');await c.put('shared-image',new Response(f))}}catch(err){}return Response.redirect('./?shared=1',303)})());return}
  if(e.request.method!=='GET'||u.origin!==location.origin)return;
  if(isEng(u.pathname)){e.respondWith(caches.open(E).then(async c=>{const hit=await c.match(e.request,{ignoreSearch:true});if(hit)return hit;
    const r=await fetch(e.request);if(r.ok)c.put(e.request,r.clone());return r}));return}
  e.respondWith(caches.open(C).then(async c=>{const hit=await c.match(e.request,{ignoreSearch:true});
    try{const r=await fetch(e.request);if(r.ok)c.put(e.request,r.clone());return r}catch(err){if(hit)return hit;throw err}}))});
