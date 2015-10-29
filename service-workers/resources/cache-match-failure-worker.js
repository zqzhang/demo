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
      var request = new Request(url, {mode: "no-cors"});
      var response = new Response("PASS", {status: 200});
      return cache.put(request, response);
    })
  );
};

self.onmessage = function(evt) {
  var port = evt.data.port;

  caches.open(CACHE_NAME)
    .then(function(cache) {
      var request = new Request("https://www.text.com");
      return cache.match(request);
    })
    .then(function(res) {
      port.postMessage(res == undefined);
    });
}
