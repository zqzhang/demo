onmessage = function(evt) {
  var port = evt.data.port;

  self.clients.matchAll()
    .then(function(clients) {
      try {
        var client = clients[0];
        client.navigate("about:blank");  
      }catch(ex) {
        port.postMessage(ex.name);
      }
    });
}
