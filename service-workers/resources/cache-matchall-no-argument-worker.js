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
      return Promise.all([
        cache.put("https://example.com/a", new Response("a")),
        cache.put("https://example.com/b", new Response("b")),
        cache.put("https://example.com/c", new Response("c"))
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
