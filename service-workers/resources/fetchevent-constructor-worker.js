importScripts("../../support/testharness.js");
importScripts("../../support/testharnessreport.js");

var url = new URL("blank-iframe.html", location).toString();
var req = new Request(url);

test(function() {
  var event = new FetchEvent("FetchEvent", {request: req});
  assert_equals(event.type, "FetchEvent", "FetchEvent type");
  assert_false(event.isReload);
  assert_equals(event.request.url, url, "the initial request value");
  assert_equals(event.clientId, null, "the initial clientId value");
}, "FetchEvent constructor with type.");

test(function() {
  var event = new FetchEvent("FetchEvent", {request: req, isReload: true, clientId: "client-id-value"});
  assert_equals(event.type, "FetchEvent", "FetchEvent type");
  assert_true(event.isReload, "isReload is true");
  assert_equals(event.request.url, url, "the request value");
  assert_equals(event.clientId, "client-id-value", "the clientId value");  
}, "FetchEvent constructor with initial FetchEventInit.");
