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
  var url = new URL("./blank-iframe.html", location).toString();

  caches.open(CACHE_NAME)
    .then(function(cache) {
      var request = new Request(url);
      cache.add(request)
        .then(function(result) {
          port.postMessage(result);
        });
    });
}
