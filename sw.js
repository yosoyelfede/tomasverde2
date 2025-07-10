// Context7-Based Service Worker for Optimal Caching

const CACHE_NAME = 'tomasverde-v1.1';
const STATIC_CACHE = 'tomasverde-static-v1.1';
const DYNAMIC_CACHE = 'tomasverde-dynamic-v1.1';

// Critical resources to cache immediately
const CRITICAL_ASSETS = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/css/performance-fix.css',
  '/fonts/fonts-optimized.css',
  '/js/main.js',
  '/js/performance-optimized.js',
  '/fonts/bread-forest.otf',
  '/img/logo.svg',
  '/img/hero.webp'
];

// Install event - cache critical resources
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => {
        return cache.addAll(CRITICAL_ASSETS);
      })
    ])
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - implement cache strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Handle different resource types with appropriate strategies
  if (request.destination === 'image') {
    // Cache First strategy for images
    event.respondWith(cacheFirst(request, DYNAMIC_CACHE));
  } else if (request.destination === 'font') {
    // Cache First strategy for fonts
    event.respondWith(cacheFirst(request, STATIC_CACHE));
  } else if (request.destination === 'style' || request.destination === 'script') {
    // Stale While Revalidate for CSS/JS
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
  } else if (request.destination === 'document') {
    // Network First for HTML documents
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
  } else {
    // Default to Network First
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
  }
});

// Cache First Strategy
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(request);
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log('Fetch failed for:', request.url);
    throw error;
  }
}

// Network First Strategy
async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  
  try {
    const response = await fetch(request);
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    throw error;
  }
}

// Stale While Revalidate Strategy
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  // Fetch in background to update cache
  const fetchPromise = fetch(request).then(response => {
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  });
  
  // Return cached version immediately if available
  return cached || fetchPromise;
} 