importScripts("./cache-storage-common-worker.js");

self.oninstall = function(evt) {
  evt.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
};

self.onmessage = function(evt) {
  var port = evt.data.port;

  caches.open(CACHE_NAME)
    .then(function(cache) {
      var message = { isCacheStorage: caches instanceof CacheStorage,
                      returnCache: cache instanceof Cache
                    };
      port.postMessage(message);
    });
}
