const CACHE_NAME = 'notes-tasks-v2';
const ASSETS_TO_CACHE = [
  './notesmerged.html',
  './quill.snow.css',
  './quill.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Install event: Cache the essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Fetch event: Network-first approach (falls back to cache if offline or 404)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});

// Activate event: Clean up old caches if we update the CACHE_NAME
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
