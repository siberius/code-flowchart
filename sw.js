'use strict';
const PREFIX='codeflowchart-hefaistos-';
const CACHE=PREFIX+'2026-10-30-v6';
const ASSETS=['./','./index.html','./manifest.json','./icons/favicon.svg','./icons/apple-touch-icon.png','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png','./favicon.ico'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith(PREFIX)&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||!ASSETS.some(path=>new URL(path,self.registration.scope).href===event.request.url))return;event.respondWith(caches.open(CACHE).then(async cache=>(await cache.match(event.request))||fetch(event.request)));});
