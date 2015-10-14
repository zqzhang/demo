self.clients.matchAll().then(function(clients) {
  clients.forEach(function(client) {
    client.postMessage("started up!");
  });
});

self.addEventListener('fetch', function(evt) {
  evt.respondWith(new Response());
});

