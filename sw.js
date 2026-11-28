// 앱 버전 표시(이 파일이 바뀌어야 새 버전이 깔림)
const V='hanzi-cam-v54';
// 인식 엔진(모델·wasm·opencv·청크)은 이름이 바뀌지 않는 한 영구 보관
const E='hanzi-engine-1';
// 앱 파일·사전: 저장본을 바로 쓰고 뒤에서 새로 받아 둠 (버전이 바뀌어도 통째로 다시 받지 않음)
const A='hanzi-app-1';
const CH=["chunk-3RNHDNP5.js", "chunk-BW7VIC66.js", "chunk-NTIUPAKQ.js", "chunk-U2AOCXNP.js"];
const PRE=['./','index.html','app.js','manifest.json','icon-192.png'];
const isEng=p=>/\/(models|ort|vendor)\//.test(p)||/\/chunk-[^/]+\.js$/.test(p);
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(A).then(c=>c.addAll(PRE)).catch(()=>{}))});
self.addEventListener('activate',e=>e.waitUntil((async()=>{
  for(const k of await caches.keys())if(k!==A&&k!==E&&k!=='share')await caches.delete(k);
  const ec=await caches.open(E);
  for(const r of await ec.keys()){const m=r.url.match(/chunk-[^/]+\.js$/);if(m&&CH.length&&!CH.includes(m[0]))await ec.delete(r)}
  await self.clients.claim();
})()));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);
  if(e.request.method==='POST'&&u.pathname.endsWith('/share-target')){e.respondWith((async()=>{try{const fd=await e.request.formData();const f=fd.get('image');if(f){const c=await caches.open('share');await c.put('shared-image',new Response(f))}}catch(err){}return Response.redirect('./?shared=1',303)})());return}
  if(e.request.method!=='GET'||u.origin!==location.origin)return;
  if(isEng(u.pathname)){e.respondWith(caches.open(E).then(async c=>{const hit=await c.match(e.request,{ignoreSearch:true});if(hit)return hit;
    const r=await fetch(e.request);if(r.ok)c.put(e.request,r.clone());return r}));return}
  e.respondWith(caches.open(A).then(async c=>{const hit=await c.match(e.request,{ignoreSearch:true});
    const net=fetch(e.request,{cache:'no-cache'}).then(r=>{if(r.ok)c.put(e.request,r.clone());return r});
    if(hit){e.waitUntil(net.catch(()=>{}));return hit}
    return net}))});
