const C='hanzi-cam-v21';
const PRE=['./','index.html','app.js','hun.json','words.json','ko.json','food.json','en.json','manifest.json','intro.jpg','icon-192.png','models/ch_PP-OCRv4_det_infer.onnx','models/ch_PP-OCRv4_rec_infer.onnx','models/ppocr_keys_v1.txt','ort/ort-wasm-simd-threaded.mjs','ort/ort-wasm-simd-threaded.wasm'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(PRE.filter(p=>!p.endsWith('.onnx')&&!p.endsWith('.wasm'))).catch(()=>{})))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
  const big=/\.(onnx|wasm)$/.test(u.pathname)||/chunk-/.test(u.pathname);
  e.respondWith(caches.open(C).then(async c=>{const hit=await c.match(e.request,{ignoreSearch:true});
    if(hit&&big)return hit;
    try{const r=await fetch(e.request);if(r.ok)c.put(e.request,r.clone());return r}catch(err){if(hit)return hit;throw err}}))});
