self.addEventListener("fetch", function(event) {
  event.respondWith(new Response("response text"));
});

