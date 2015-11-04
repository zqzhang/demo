onmessage = function(evt) {
  var port = evt.data.port;
  clients.openWindow("about:blank")
    .then(function(client) {
      port.postMessage({
        isClient: client instanceof WindowClient,
        url: client.url
      });
    }, function(error) {
      port.postMessage(error.name);
    });
}
