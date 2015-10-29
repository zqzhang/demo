importScripts("./cache-storage-common-worker.js");

var names = [ "cache_1", "cache_2"];

self.oninstall = function(evt) {
  evt.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    }).then(function() {
      return Promise.all(
        names.map(function(name) {
          return caches.open(name);
        })
      );
    })
  );
};

self.onmessage = function(evt) {
  var port = evt.data.port;
  caches.keys()
    .then(function(keys) {
      var message = { isArray: Array.isArray(keys),
                      keyArray: keys,
                      expected: names
                    };
      port.postMessage(message);
    });
};
