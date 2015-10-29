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
  var request = new Request(url, {mode: "no-cors"});
  var promiseResult;
  var cache;

  caches.open(CACHE_NAME)
    .then(function(c1) {
      cache = c1;
      return cache.put(request, new Response("PASS", {status: 200}));
    })
    .then(function(result) {
      promiseResult = result;
      return cache.match(request);
    })
    .then(function(res) {
      return res.text();
    }).then(function(value) {
      port.postMessage({
        putResult: promiseResult,
        responseText: value
      });
    });
}
