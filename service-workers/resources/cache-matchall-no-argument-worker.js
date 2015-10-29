importScripts("./cache-storage-common-worker.js");

self.oninstall = function(evt) {
  evt.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    }).then(function() {
      return caches.open(CACHE_NAME);
    }).then(function(cache) {
      var response = new Response("PASS", {status: 200});
      return Promise.all([
        cache.put(new Request("https://www.example.com", {mode: "no-cors"}), response),
        cache.put(new Request("https://www.example.com#1", {mode: "no-cors"}), response),
        cache.put(new Request("https://www.example.com#2", {mode: "no-cors"}), response)
      ]);
    })
  );
};

self.onmessage = function(evt) {
  var port = evt.data.port;

  caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.matchAll();
    }).then(function(res) {
      port.postMessage({
        isArray: Array.isArray(res),
        isResponse: res[0] instanceof Response,
        responseLength: res.length,
      });
    });
}
