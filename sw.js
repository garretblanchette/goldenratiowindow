const C='isitacat-v1';
const ASSETS=['/','/index.html','/manifest.webmanifest','/icon-192.png','/icon-512.png','/icon.svg'];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(C).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(u.origin!==location.origin) return; // let the TF.js CDN load normally
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
