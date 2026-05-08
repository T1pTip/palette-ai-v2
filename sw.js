// Palette AI v2 - Service Worker
// Version: v3.1 | S21 (2026-05-08): Auto-reload on SW activation — transparent updates for stuck mobile users
//   When a new SW activates, it forces all open tabs to navigate() → reloads with fresh HTML/JS automatically.
//   Existing users on cached old SW will get this update on their next visit, then auto-reload once.
const CACHE = 'palette-ai-v3.1';
const ASSETS = ['/palette-ai-v2/', '/palette-ai-v2/index.html', '/palette-ai-v2/manifest.json', '/palette-ai-v2/pae-v2-module.js', '/palette-ai-v2/pae-video-module.js'];

self.addEventListener('install', function(e) {
  e.waitUntil(caches.open(CACHE).then(function(c) { return c.addAll(ASSETS); }));
  self.skipWaiting();
});

// S21: activate handler now force-reloads all clients to pick up new HTML/JS transparently.
// This makes the next visit auto-update for stuck cached users.
self.addEventListener('activate', function(e) {
  e.waitUntil((async function() {
    // 1. Delete old caches
    var keys = await caches.keys();
    await Promise.all(keys.filter(function(k) { return k !== CACHE; }).map(function(k) { return caches.delete(k); }));
    // 2. Take control of all clients (including those not yet controlled)
    await self.clients.claim();
    // 3. Force-reload all top-level clients to pick up new HTML/JS.
    // postMessage works if HTML has the listener (S21 index.html). navigate() works regardless — universal fallback.
    var clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (var i = 0; i < clients.length; i++) {
      var client = clients[i];
      // Only reload top-level navigations (not iframes, workers, etc.)
      if (client.frameType && client.frameType !== 'top-level' && client.frameType !== 'auxiliary') continue;
      // Belt-and-suspenders: postMessage first (lightweight), navigate() second (universal)
      try { client.postMessage({ type: 'SW_NEW_VERSION', version: CACHE }); } catch(err) {}
      try { await client.navigate(client.url); } catch(err) { /* navigate() not allowed in some contexts; postMessage may have caught it */ }
    }
  })());
});

// S21: Allow page-side code to ask the new SW to skip waiting (used by index.html updatefound handler)
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
