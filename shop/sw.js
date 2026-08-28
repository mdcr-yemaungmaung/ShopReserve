const CACHE_NAME = 'shop-reserve-v1';
const OFFLINE_URL = '/offline.html';

// Install service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        './',
        './index.html',
        './manifest.webmanifest',
        './css/design-system.css',
        './css/layouts.css',
        './css/components.css',
        './js/app.js',
        './shared/js/app.js',
        './shared/js/router.js',
        './shared/js/components.js',
        './shared/theme/theme-engine.js',
        './shared/theme/theme-manager.js'
      ]);
    })
  );
});

// Fetch event with caching strategy
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }
  
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached response if found
      if (response) {
        return response;
      }
      
      // Clone request because it's a one-time use
      const fetchRequest = event.request.clone();
      
      return fetch(fetchRequest).then((response) => {
        // Check if valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        
        // Clone response because it's a stream
        const responseToCache = response.clone();
        
        // Open cache and add response
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        
        return response;
      }).catch(() => {
        // Return offline page if fetch fails
        return caches.match(OFFLINE_URL);
      });
    })
  );
});

// Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            // Keep current cache and offline page
            return cacheName !== CACHE_NAME && cacheName !== OFFLINE_URL;
          })
          .map((cacheName) => {
            return caches.delete(cacheName);
          })
      );
    })
  );
});
