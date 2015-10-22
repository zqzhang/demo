onmessage = function(evt) {
  var port = evt.data.port;
  var clientsUrls = [];

  self.clients.matchAll().then(function(clients) {
    clients.forEach(function(client) {
      clientsUrls.push(client.url);
    });
    clientsUrls.sort(function(a, b) { return a[0] > b[0] ? 1 : -1; });
    port.postMessage(clientsUrls);
  });
}
