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
      var url = new URL(urls[0], location).toString();
      var request = new Request(url);
      return cache.keys(request, {mode: "no-cors"});
    }).then(function(request) {
      port.postMessage({
        isRequest: request instanceof Request,
        url: request.url
      });
    });
}
