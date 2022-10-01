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
});
