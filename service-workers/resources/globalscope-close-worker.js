self.onmessage = function(evt) {
  self.clients.matchAll().then(function(clients) {
    clients.forEach(function(client) {
      try {
        close();
        client.postMessage("Doesn't throw exception.");
      } catch(ex) {
        client.postMessage(ex.name == "InvalidAccessError");
      }
    });
  });
};
