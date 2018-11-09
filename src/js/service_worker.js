const cacheName = 'Sudoku-game';
const files = [
  '/index.html',
  '/style.css',
  '/bundle.js',
  '/favicon-96x96.png'  
];

this.addEventListener('install', event => {
  this.skipWaiting();
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(files))
  );
});

this.addEventListener('activate', event => {
  this.clients.claim();
  const cacheWhiteList = [cacheName];
  event.waitUntil(
    caches.keys()
      .then(cacheNames => Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhiteList.includes(cacheName)) return caches.delete(cacheName);
        })
      ))
  );
});
this.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }
      return fetch(event.request)
        .then(response => {
          caches.open(cacheName)
            .then(cache => {
              cache.put(event.request.url, response);
            })
            .catch(err => console.error(err));
          return response.clone();
        });
    }).catch(err => console.error(err))
  );
});