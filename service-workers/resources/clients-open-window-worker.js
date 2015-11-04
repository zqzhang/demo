onmessage = function(evt) {
  var port = evt.data.port;
  var url = new URL("open-window-iframe.html", location).toString();
  clients.openWindow(url)
    .then(function(client) {
      port.postMessage({ 
        url: client.url,
        frameType: client.frameType,
        visiblityState: client.visibilityState,
        focused: client.focused
      });
    }, function(error) {
      port.postMessage(error.name);
    });
}
