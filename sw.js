const CACHE="daily-wishes-v22";
const FILES=["./","./index.html","./manifest.json","./icon.svg","./messages.json"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>Promise.all(FILES.map(u=>fetch(new Request(u,{cache:"reload"})).then(r=>r.ok&&c.put(u,r)).catch(()=>{})))))});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{
 if(e.request.method!=="GET")return;
 e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request).then(m=>m||caches.match("./index.html"))));
});
