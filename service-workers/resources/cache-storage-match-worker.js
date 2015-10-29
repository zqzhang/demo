importScripts("./cache-storage-common-worker.js");

var url = new URL("./blank-iframe.html", location).toString();
var request = new Request(url);
var response;

self.oninstall = function(evt) {
  evt.waitUntil(
    fetch(request)
      .then(function(res) {
        response = res;
        return caches.open(CACHE_NAME);
      })
      .then(function(cache) {
        return cache.put(request, response);
      })
  );
};

self.onmessage = function(evt) {
  var port = evt.data.port;

  caches.match(request)
    .then(function(res) {
      var message = { status: res.status,
                      url: res.url
                    };
      port.postMessage(message);
    });
};
