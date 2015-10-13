self.clients.matchAll().then(function(clients) {
  client.postMessage("started up!");
});


self.addEventListener("activate", function(evt) {

});

self.addEventListener('fetch', function(evt) {
  evt.respondWith(new Response());
});

self.addEventListener("message", function(evt) {

});

