// Palette AI v2 - Service Worker
// Version: v3.0 | S20 (2026-05-08): bumped after pae-video-module.js refactor (result-box moved to bottom + single action-row for IMG parity)
const CACHE = 'palette-ai-v3.0';
const ASSETS = ['/palette-ai-v2/', '/palette-ai-v2/index.html', '/palette-ai-v2/manifest.json', '/palette-ai-v2/pae-v2-module.js', '/palette-ai-v2/pae-video-module.js'];
self.addEventListener('install', function(e) { e.waitUntil(caches.open(CACHE).then(function(c) { return c.addAll(ASSETS); })); self.skipWaiting(); });
self.addEventListener('activate', function(e) { e.waitUntil(caches.keys().then(function(keys) { return Promise.all(keys.filter(function(k) { return k !== CACHE; }).map(function(k) { return caches.delete(k); })); })); self.clients.claim(); });
self.addEventListener('fetch', function(e) {
  if (e.request.method !== 'GET') return;
  if (e.request.url.includes('script.google.com')) return;
  const isHTML = e.request.mode === 'navigate' || e.request.url.endsWith('/') || e.request.url.endsWith('/index.html') || e.request.url.endsWith('.html');
  if (isHTML) {
    e.respondWith(fetch(e.request).then(function(r) { if (r && r.status === 200 && r.type === 'basic') { const clone = r.clone(); caches.open(CACHE).then(function(c) { c.put(e.request, clone); }); } return r; }).catch(function() { return caches.match(e.request).then(function(cached) { return cached || caches.match('/palette-ai-v2/index.html'); }); }));
    return;
  }
  e.respondWith(caches.match(e.request).then(function(cached) { if (cached) return cached; return fetch(e.request).then(function(r) { if (r && r.status === 200 && r.type === 'basic') { const clone = r.clone(); caches.open(CACHE).then(function(c) { c.put(e.request, clone); }); } return r; }).catch(function() { if (e.request.mode === 'navigate') return caches.match('/palette-ai-v2/index.html'); }); }));
});
