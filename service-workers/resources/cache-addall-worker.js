importScripts("./cache-storage-common-worker.js");

var array = [ "./blank-iframe.html",
              "./open-window-iframe.html",
              "empty-worker.js"];

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
      var requests = array.map(function(url) {
        return new Request(url);
      });
      cache.addAll(requests)
        .then(function(result) {
          port.postMessage(result);
        });
    });
}
