// Palette AI v2 - Service Worker
// Version: v3.2 | S21.6 (2026-05-08): Restored v1 banner-based update flow.
//   activate handler: cache cleanup + clients.claim() only (no force-reload).
//   The clients.claim() triggers controllerchange event on page → installSwUpdateBanner shows
//   the "גירסה חדשה זמינה" banner with "רענן" button (UX from v1).
const CACHE = 'palette-ai-v3.2';
const ASSETS = ['/palette-ai-v2/', '/palette-ai-v2/index.html', '/palette-ai-v2/manifest.json', '/palette-ai-v2/pae-v2-module.js', '/palette-ai-v2/pae-video-module.js'];

self.addEventListener('install', function(e) {
  e.waitUntil(caches.open(CACHE).then(function(c) { return c.addAll(ASSETS); }));
  self.skipWaiting();
});

// S21.6: Simple v1-style activate \u2014 cache cleanup + claim only.
// claim() fires controllerchange on the page \u2192 installSwUpdateBanner shows the banner.
self.addEventListener('activate', function(e) {
  e.waitUntil((async function() {
    var keys = await caches.keys();
    await Promise.all(keys.filter(function(k) { return k !== CACHE; }).map(function(k) { return caches.delete(k); }));
    await self.clients.claim();
  })());
});

// Allow page-side code to ask the new SW to skip waiting (used by index.html updatefound handler)
self.addEventListener('message', function(e) {
  if (e.data && e.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

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
