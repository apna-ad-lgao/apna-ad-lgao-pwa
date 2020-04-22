/* eslint-disable */
// fix broken service worker in v2.0.9
const DIRTY_CACHE = 'sw-precache-v3-pre-cache-v2.0.9';

self.addEventListener('install', () => {
  // Skip over the "waiting" lifecycle state, to ensure that our
  // new service worker is activated immediately, even if there's
  // another tab open controlled by our older service worker code.
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  self.registration.unregister();
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => cacheNames.filter(cacheName => cacheName.indexOf(DIRTY_CACHE) !== -1))
      .then(cachesToDelete => Promise.all(
        cachesToDelete.map(cacheToDelete => caches.delete(cacheToDelete)),
      ))
      .then(() => self.clients.claim()),
  );
});
