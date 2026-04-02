const CACHE_NAME = 'tamajit-portfolio-v1';

self.addEventListener('install', (event) => {
  // Use skipWaiting to activate the new Service Worker immediately
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Remove old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // A simple pass-through fetch that caches only basic static image assets 
  // Mostly exists to satisfy PWA requirements.
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') {
    return;
  }

  // Very basic network-first strategy for page requests
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match(request))
    );
    return;
  }
});
