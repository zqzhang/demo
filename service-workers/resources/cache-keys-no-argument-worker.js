importScripts("./cache-storage-common-worker.js");

var urls = [ "./blank-iframe.html",
              "empty-worker.js",
              "https://www.example.com"];

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
      var requests = urls.map(function(url) {
        return new Request(url, {mode: "no-cors"});
      });
      return cache.addAll(requests);
    })
  );
};

self.onmessage = function(evt) {
  var port = evt.data.port;
  caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.keys();
    }).then(function(requests) {
      port.postMessage({
        isArray: Array.isArray(requests),
        isRequest: requests[0] instanceof Request,
        requestsLength: requests.length
      });
    });
}
