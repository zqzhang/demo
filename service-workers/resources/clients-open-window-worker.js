onmessage = function(evt) {
  var port = evt.data.port;
  var url = new URL("open-window-iframe.html", location).href;
  clients.openWindow(url)
    .then(function(client) {
      var message = { url: client.url,
                      frameType: client.frameType,
                      visiblityState: client.visibilityState,
                      focused: client.focused };
      port.postMessage(message);
    });
}
