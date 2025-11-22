const CACHE_NAME = 'kannada-kids-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './src/app.js',
  './src/data/kannada-lessons.js',
  './src/utils/storage.js',
  './src/utils/audio.js',
  './src/components/Navigation.js',
  './src/components/Progress.js',
  './src/components/Lesson.js',
  './src/games/MatchingGame.js',
  './src/games/TracingGame.js',
  './src/games/ListeningGame.js'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch from cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Update Service Worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
