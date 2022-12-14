const cacheName = "v1";
const cacheAssets = ["index.html", "about.html", "js/script.js"];

//life cycle of service worker: register, install, activate
//call install event
self.addEventListener("install", (e) => {
  console.log("Service Worker: Installed");
  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log("Service Worker: Caching Files");
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

//call activate event
self.addEventListener("activate", (e) => {
  console.log("Service Worker: Activated");
  //Remove unwanted caches
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("Service Worker: Clearing Old Cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

//call fetch event

self.addEventListener("fetch", (e) => {
  console.log("Service Worker: Fetching");
  //check if online, if offline err, then use cached files
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
