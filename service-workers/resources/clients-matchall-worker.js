onmessage = function(evt) {
  var port = evt.data.port;
  var clientsUrls = [];

  self.clients.matchAll().then(function(clients) {
    clients.forEach(function(client) {
      clientsUrls.push(client.url);
    });
    port.postMessage(clientsUrls);
  });
}
