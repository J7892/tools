self.addEventListener('fetch', (event) => {
  // This allows the app to work offline by fetching from cache
  // For now, it just passes through to the network
  event.respondWith(fetch(event.request));
});