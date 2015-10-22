onmessage = function(evt) {
  var port = evt.data.port;
  self.clients.claim()
    .then(function() {
      port.postMessage("PASS");
    })
    .catch(function(error) {
      port.postMessage(error.message);
    });
}
