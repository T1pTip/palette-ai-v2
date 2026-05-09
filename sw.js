// Palette AI v2 — Service Worker
// Version: v3.5 | BUG-PAE-019 (2026-05-09): engine pills = switch + copy + open AI site.
//   - activate handler: cache cleanup + clients.claim() + broadcast PAE_NEW_VERSION
//   - fetch handler: version.json ALWAYS network (never cached)
//   - HTML: network-first
//   - Other assets: cache-first
const CACHE = 'palette-ai-v3.5';
const VERSION = '3.5';
const ASSETS = [
  '/palette-ai-v2/',
  '/palette-ai-v2/index.html',
  '/palette-ai-v2/manifest.json',
  '/palette-ai-v2/pae-v2-module.js',
  '/palette-ai-v2/pae-video-module.js',
  '/palette-ai-v2/version.json'
];

self.addEventListener('install', function(e) {
  e.waitUntil(caches.open(CACHE).then(function(c) { return c.addAll(ASSETS); }));
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil((async function() {
    // Cleanup old caches
    var keys = await caches.keys();
    await Promise.all(keys.filter(function(k) { return k !== CACHE; }).map(function(k) { return caches.delete(k); }));
    // Take control
    await self.clients.claim();
    // S22: Broadcast new version to all clients (Path B)
    try {
      var clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      for (var i = 0; i < clients.length; i++) {
        try { clients[i].postMessage({ type: 'PAE_NEW_VERSION', version: VERSION }); } catch(err) {}
      }
    } catch(err) {}
  })());
});

self.addEventListener('message', function(e) {
  if (e.data && e.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', function(e) {
  if (e.request.method !== 'GET') return;
  if (e.request.url.includes('script.google.com')) return;

  // S22: version.json — ALWAYS fetch from network (never serve from cache)
  if (e.request.url.indexOf('/version.json') !== -1) {
    e.respondWith(fetch(e.request).catch(function() { return caches.match(e.request); }));
    return;
  }

  var isHTML = e.request.mode === 'navigate'
            || e.request.url.endsWith('/')
            || e.request.url.endsWith('/index.html')
            || e.request.url.endsWith('.html');

  if (isHTML) {
    // Network-first for HTML
    e.respondWith(
      fetch(e.request).then(function(r) {
        if (r && r.status === 200 && r.type === 'basic') {
          var clone = r.clone();
          caches.open(CACHE).then(function(c) { c.put(e.request, clone); });
        }
        return r;
      }).catch(function() {
        return caches.match(e.request).then(function(cached) {
          return cached || caches.match('/palette-ai-v2/index.html');
        });
      })
    );
    return;
  }

  // Cache-first for other assets
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      if (cached) return cached;
      return fetch(e.request).then(function(r) {
        if (r && r.status === 200 && r.type === 'basic') {
          var clone = r.clone();
          caches.open(CACHE).then(function(c) { c.put(e.request, clone); });
        }
        return r;
      }).catch(function() {
        if (e.request.mode === 'navigate') return caches.match('/palette-ai-v2/index.html');
      });
    })
  );
});
